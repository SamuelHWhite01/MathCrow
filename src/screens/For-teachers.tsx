// src/screens/ForTeachers.tsx
import React from "react";

const ForTeachers: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Information for Teachers</h1>
      <p>
        MathCrow is designed to be classroom-friendly. Teachers can:
      </p>
      <ul>
        <li>Assign multiplication/division activities</li>
        <li>Monitor student progress</li>
        <li>Ensure students practice safely on school networks</li>
      </ul>

      <h2>Privacy & Safety</h2>
      <p>
        No personal student data is shared outside the app. The platform is safe for K-12
        use.
      </p>

      <h2>Contact</h2>
      <p>Email: <a href="mailto:support@mathcrow.org">support@mathcrow.org</a></p>
    </div>
  );
};

export default ForTeachers;