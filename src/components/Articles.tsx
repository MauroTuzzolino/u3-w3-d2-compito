import React, { useEffect, useState } from "react";
import { Card, Spinner, Row, Col, Container } from "react-bootstrap";

// Definisco il tipo Article in base ai dati restituiti dall'API
interface Article {
  id: number;
  title: string;
  image_url: string;
  summary: string;
  published_at: string;
  url: string;
}

const Articles: React.FC = () => {
  // Stato per gli articoli e per il caricamento iniziale
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles?limit=8")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento degli articoli:", err);
        setLoading(false);
      });
  }, []);

  // Se sto ancora caricando, mostro uno spinner centrale
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
            <Card className="h-100">
              <Card.Img variant="top" src={article.image_url} alt={article.title} style={{ height: "220px", objectFit: "cover" }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{article.title}</Card.Title>

                {/* Data pubblicazione in formato leggibile */}
                <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {new Date(article.published_at).toLocaleDateString()}
                </Card.Text>

                {/* Riassunto breve (massimo 100 caratteri) */}
                <Card.Text className="flex-grow-1">{article.summary.slice(0, 100)}...</Card.Text>

                {/* Bottone per leggere l'articolo completo*/}
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="mt-auto btn btn-primary btn-sm">
                  Leggi di più
                </a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Articles;
