import React, { useEffect, useState } from "react";
import { Card, Spinner, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Tipo per i dati articolo restituiti dall'API
interface Article {
  id: number;
  title: string;
  image_url: string;
  summary: string;
  published_at: string;
  url: string;
}

// Componente principale
const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Hook di React Router per la navigazione programmata
  const navigate = useNavigate();

  // Uso useEffect per caricare i dati al montaggio del componente
  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=12") // carico fino a 30 articoli
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.results); // salvo gli articoli nello stato
        setLoading(false); // disattivo il caricamento
      })
      .catch((err) => {
        console.error("Errore nel caricamento degli articoli:", err);
        setLoading(false);
      });
  }, []);

  // Se sto ancora caricando i dati, mostro uno spinner
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p>Caricamento articoli...</p>
      </div>
    );
  }

  return (
    <Container className="my-4">
      <Row className="g-4">
        {articles.map((article) => (
          <Col key={article.id} xs={12} sm={6} md={4} lg={3}>
            {/* Ogni card è cliccabile: reindirizza alla pagina dettaglio */}
            <Card className="h-100 clickable shadow-sm" onClick={() => navigate(`/details/${article.id}`)} style={{ cursor: "pointer" }}>
              {/* Immagine di copertina con altezza fissa e ritaglio */}
              <Card.Img variant="top" src={article.image_url} alt={article.title} style={{ height: "180px", objectFit: "cover" }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{article.title}</Card.Title>
                <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {new Date(article.published_at).toLocaleDateString()}
                </Card.Text>
                <Card.Text className="flex-grow-1">{article.summary.slice(0, 100)}...</Card.Text>
                <div className="mt-auto text-end">
                  <span className="btn btn-outline-primary btn-sm">Scopri di più</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Articles;
