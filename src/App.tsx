import React from "react";
import CustomNavbar from "./components/NavBar";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import "./App.css";

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <CustomNavbar />

      <main className="container my-4">
        <h1>Benvenuto su OrbitalNow</h1>
        <h2>Ultime Notizie</h2>
        <Articles />
      </main>

      <Footer />
    </div>
  );
};

export default App;
