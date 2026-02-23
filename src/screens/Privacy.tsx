// src/screens/Privacy.tsx
import React from "react";

const Privacy: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>Privacy Policy</h1>
      <p>
        MathCrow is an educational tool for students to practice math. Protecting your
        privacy is important to us.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We only collect information necessary to provide your learning experience, such as
        your username, progress, and settings. No personal data is sold or shared.
      </p>

      <h2>Cookies and Analytics</h2>
      <p>
        We do not use advertising cookies. Minimal analytics may be used to improve the
        app experience, and all data is anonymous.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        MathCrow uses Firebase for authentication and storing user data. Google services
        may be used for login, but student data is kept private.
      </p>

      <h2>Contact</h2>
      <p>Email: <a href="mailto:support@mathcrow.org">support@mathcrow.org</a></p>
    </div>
  );
};

export default Privacy;