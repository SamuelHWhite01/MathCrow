// src/screens/Terms.tsx
import React from "react";

const Terms: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Terms of Service</h1>
      <p>
        Welcome to MathCrow! By using this site, you agree to the following terms.
      </p>

      <h2>Use of the Service</h2>
      <p>
        MathCrow is intended for students and teachers for educational purposes only. You
        may not use the site to distribute malware or inappropriate content.
      </p>

      <h2>Account Responsibility</h2>
      <p>
        Users are responsible for their account credentials. Do not share passwords.
      </p>

      <h2>Content</h2>
      <p>
        All content is owned by MathCrow. You may not copy or redistribute content without
        permission.
      </p>

      <h2>Contact</h2>
      <p>Email: <a href="mailto:support@mathcrow.org">support@mathcrow.org</a></p>
    </div>
  );
};

export default Terms;