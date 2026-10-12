// One-off migration: populate the new `role` field on user docs that predate it,
// deriving it from the legacy `isTeacher` boolean, then drop that boolean.
// Not exported from index.ts, so it is never deployed as a Cloud Function.
// Run locally after building: node lib/scripts/backfillRoles.js
// Needs credentials for the math-crow project, e.g. GOOGLE_APPLICATION_CREDENTIALS
// pointing at a service account key, or `gcloud auth application-default login`.
import * as admin from "firebase-admin";

admin.initializeApp({ projectId: "math-crow" });
const db = admin.firestore();

async function backfillRoles() {
  const usersRef = db.collection("users");
  const snapshot = await usersRef.get();

  let migrated = 0;
  let batch = db.batch();
  let opsInBatch = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    if (data.role !== undefined) continue; // already migrated

    const role = data.isTeacher === true ? "teacher" : "student";
    batch.update(docSnap.ref, {
      role,
      isTeacher: admin.firestore.FieldValue.delete(),
    });
    migrated++;
    opsInBatch++;

    if (opsInBatch === 400) {
      await batch.commit();
      batch = db.batch();
      opsInBatch = 0;
    }
  }

  if (opsInBatch > 0) {
    await batch.commit();
  }

  console.log(`Migrated ${migrated} of ${snapshot.size} user docs.`);
}

backfillRoles()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Backfill failed:", err);
    process.exit(1);
  });
