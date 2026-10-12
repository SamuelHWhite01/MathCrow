import { setGlobalOptions } from "firebase-functions/v2/options";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();
const db = admin.firestore();
//const STRIPE_PUBLISHABLE_KEY = 'pk_test_1P8NbF9pm0Fflz9zdC5dTvQG';
// Cloud Function: create classroom + promote user to teacher
type CreateClassroomRequestType = {
  className: string;
};
type CreateClassroomResultType = {
  classroomId: string;
};
const generateCode = (length: number = 5): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
    }
    return code;
  }
export const createClassroom = onCall(async (request) => {
  const context = request.auth;
  const data = request.data as CreateClassroomRequestType;

  if (!context) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const uid = context.uid;
  let code = "";
  let classroomRef: FirebaseFirestore.DocumentReference;
  let exists = true;

  while (exists) {
    code = generateCode();
    classroomRef = db.collection("classrooms").doc(code);
    const docSnap = await classroomRef.get();
    exists = docSnap.exists;
  }

  await db.runTransaction(async (t) => {
    t.set(classroomRef, {
      name: data.className || "New Classroom",
    });

    const userRef = db.collection("users").doc(uid);
    t.update(userRef, {
      role: "teacher",
      classroomId: code,
    });
  });

  const result: CreateClassroomResultType = { classroomId: code };
  return result;
});

// Cloud Function: create a student account on behalf of a parent/teacher.
// Students have no email of their own, so we key their Firebase Auth account
// off a synthetic address derived from their chosen username, with their PIN
// standing in for the password.
const STUDENT_EMAIL_DOMAIN = "students.mathcrow.org";
const usernameToEmail = (username: string): string => {
  const sanitized = username
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9._-]/g, "");
  return `${sanitized}@${STUDENT_EMAIL_DOMAIN}`;
};

type CreateStudentAccountRequestType = {
  username: string;
  pin: string;
};
type CreateStudentAccountResultType = {
  uid: string;
};
export const createStudentAccount = onCall(async (request) => {
  const context = request.auth;
  if (!context) {
    throw new HttpsError("unauthenticated", "User must be logged in");
  }

  const data = request.data as CreateStudentAccountRequestType;
  const username = (data.username ?? "").trim();
  const pin = data.pin ?? "";

  if (!username) {
    throw new HttpsError("invalid-argument", "Username is required");
  }
  if (!/^\d{6}$/.test(pin)) {
    throw new HttpsError("invalid-argument", "PIN must be exactly 6 digits");
  }

  const email = usernameToEmail(username);
  if (email === `@${STUDENT_EMAIL_DOMAIN}`) {
    throw new HttpsError("invalid-argument", "Username contains no valid characters");
  }

  const creatorSnap = await db.collection("users").doc(context.uid).get();
  const creatorData = creatorSnap.data();
  const creatorRole = creatorData?.role;
  if (creatorRole !== "parent" && creatorRole !== "teacher") {
    throw new HttpsError(
      "permission-denied",
      "Only parents and teachers can create student accounts"
    );
  }

  let uid: string;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password: pin,
      displayName: username,
    });
    uid = userRecord.uid;
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "auth/email-already-exists"
    ) {
      throw new HttpsError("already-exists", "That username is already taken");
    }
    throw new HttpsError("internal", "Failed to create student account");
  }

  const emptyGrid = Array(144).fill(0);
  await db.collection("users").doc(uid).set({
    timesTableData: { historyGrid: emptyGrid, numCorrect: 0, maxCorrect: 0 },
    divisionTableData: { historyGrid: emptyGrid, numCorrect: 0, maxCorrect: 0 },
    settings: { mode: "SelectedFactor", speedMode: false },
    longMultData: { difficultyScore: [0, 0, 0, 0, 0], numCorrect: 0 },
    role: "student",
    classroomId: creatorData?.classroomId ?? "",
    userName: username,
    firstTimeSetup: true,
    isSubscribed: false,
  });

  const result: CreateStudentAccountResultType = { uid };
  return result;
});

