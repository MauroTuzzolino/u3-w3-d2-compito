import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Container } from "react-bootstrap";

// Creo un'interfaccia per descrivere la struttura dell'articolo che ricevo dall'API
interface Article {
  id: number;
  title: string;
  image_url: string;
  summary: string;
  published_at: string;
  updated_at: string;
  url: string;
  news_site: string;
  featured: boolean;
}

const ArticleDetails: React.FC = () => {
  // Uso useParams per recuperare l'id dall'URL
  const { id } = useParams<{ id: string }>();

  // Creo uno stato per salvare l'articolo caricato e un flag di caricamento
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.spaceflightnewsapi.net/v4/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento dell’articolo:", err);
        setLoading(false);
      });
  }, [id]);

  // Se sto ancora caricando, mostro uno spinner
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  // Se per qualche motivo l'articolo è nullo, mostro un messaggio
  if (!article) {
    return <p>Articolo non trovato.</p>;
  }

  // Altrimenti, mostro tutti i dettagli dell'articolo
  return (
    <Container>
      <h1>{article.title}</h1>

      <p className="text-muted">
        Pubblicato: {new Date(article.published_at).toLocaleString()}
        <br />
        Ultimo aggiornamento: {new Date(article.updated_at).toLocaleString()}
      </p>

      <img src={article.image_url} alt={article.title} className="img-fluid my-4" style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }} />

      <p>
        <strong>Fonte:</strong> {article.news_site}
      </p>
      <p>
        <strong>Featured:</strong> {article.featured ? "Sì" : "No"}
      </p>
      <p>{article.summary}</p>

      {/* Link all'articolo originale */}
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        Vai all’articolo originale
      </a>
    </Container>
  );
};

export default ArticleDetails;
