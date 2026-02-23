// src/screens/About.tsx
import React from "react";

const About: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>About MathCrow</h1>
      <p>
        MathCrow is a free educational website designed to help students practice
        multiplication and division using the standard algorithm. Our goal is to make
        learning math engaging and effective.
      </p>

      <h2>Who We Serve</h2>
      <p>Students, teachers, and parents looking for safe, educational math practice.</p>

      <h2>Contact</h2>
      <p>Email: <a href="mailto:support@mathcrow.org">support@mathcrow.org</a></p>
    </div>
  );
};

export default About;