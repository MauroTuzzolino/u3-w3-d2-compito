import React from "react";
import { Container } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <Container className="text-center">
        <small>
          © {new Date().getFullYear()} OrbitalNow – Tutti i diritti riservati.
          <br />
          Powered by React, TypeScript e l’API di Spaceflight News.
        </small>
      </Container>
    </footer>
  );
};

export default Footer;
