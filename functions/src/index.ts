import { setGlobalOptions } from "firebase-functions/v2/options";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();
const db = admin.firestore();

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
      isTeacher: true,
      classroomId: code,
    });
  });

  const result: CreateClassroomResultType = { classroomId: code };
  return result;
});

