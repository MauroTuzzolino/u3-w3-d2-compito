import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/NavBar";
import Footer from "./components/Footer";
import Articles from "./components/Articles";
import ArticleDetails from "./components/ArticleDetails";

const App: React.FC = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <AppNavbar />
        <main className="container my-4">
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route path="/details/:id" element={<ArticleDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
