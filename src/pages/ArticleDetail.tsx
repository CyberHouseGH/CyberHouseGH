import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { getArticleById } from '../lib/firebase';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  category: string;
}

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) return;

      const { success, article, error } = await getArticleById(id);

      if (error) {
        setError(error);
      } else if (article) {
        setArticle(article as Article);
      }

      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-600 mb-4">{error || 'Article not found'}</p>
        <Link
          to="/news"
          className="flex items-center text-cyan-500 hover:text-cyan-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          to="/news"
          className="flex items-center text-cyan-500 hover:text-cyan-600 mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="/image10.jpeg"
            alt={article.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {article.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <User className="h-4 w-4 mr-1" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

            <div className="prose max-w-none">
              {article.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}