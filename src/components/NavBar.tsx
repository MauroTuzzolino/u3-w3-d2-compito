import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar: React.FC = () => {
  return (
    <Navbar className="px-4" bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#">🚀 OrbitalNow</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#">News</Nav.Link>
          <Nav.Link href="#">More</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
