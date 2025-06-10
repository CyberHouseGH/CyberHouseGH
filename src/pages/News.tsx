
import React, { useState, useEffect } from 'react';
import { Calendar, User, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createArticle, db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

// Add new interfaces for the news API
interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  author: string;
}

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  image?: string;
  excerpt?: string;
}

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Trends');

  const categories = [
    'All',
    'Trends',
    'Education',
    'Events',
    'Student Contributions',
    'Career Tips'
  ];

  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState<string | null>(null);

  // Fetch articles from Firebase
  useEffect(() => {
    const fetchArticles = async () => {
      console.log('Starting to fetch articles...');
      try {
        const articlesRef = collection(db, 'articles');
        console.log('Created articles reference');

        const q = query(articlesRef, orderBy('date', 'desc'));
        console.log('Created query');

        console.log('Executing query...');
        const querySnapshot = await getDocs(q);
        console.log('Query executed, got snapshot');

        const fetchedArticles: Article[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Article;
          fetchedArticles.push({
            ...data,
            id: doc.id,
            image: '/image1.jpeg',
            excerpt: data.content.substring(0, 150) + '...'
          });
        });

        console.log('Fetched articles:', fetchedArticles.length);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Failed to fetch articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []); // Remove authLoading dependency since we allow public read

  // Add new useEffect for fetching live news
  useEffect(() => {
    const fetchNews = async () => {
      setNewsLoading(true);
      setNewsError(null);
      try {
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        console.log('API Key available:', !!API_KEY); // Debug line

        if (!API_KEY) {
          throw new Error('News API key is not configured');
        }

        // Log the full URL we're trying to fetch (remove this in production)
        const url = `https://newsapi.org/v2/everything?q=cybersecurity+tips+AND+security&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
        console.log('Fetching from:', url); // Debug line

        const response = await fetch(url);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch news');
        }

        const data = await response.json();
        console.log('API Response:', data); // Debug line

        if (!data.articles || !Array.isArray(data.articles)) {
          throw new Error('Invalid response format from News API');
        }

        setNewsArticles(data.articles.slice(0, 6));
      } catch (error) {
        console.error('Error fetching news:', error);
        setNewsError(error instanceof Error ? error.message : 'Failed to fetch news');
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please log in to submit an article');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const articleId = uuidv4();
      const result = await createArticle({
        id: articleId,
        title,
        content,
        author: user.email || 'Anonymous',
        category
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      // Add the new article to the state
      const newArticle: Article = {
        id: articleId,
        title,
        content,
        author: user.email || 'Anonymous',
        category,
        date: new Date().toISOString(),
        image: '/image5.jpeg',
        excerpt: content.substring(0, 150) + '...'
      };

      setArticles(prevArticles => [newArticle, ...prevArticles]);
      setSuccess('Article submitted successfully!');
      setTitle('');
      setContent('');
      setCategory('Trends');
      setTimeout(() => {
        setShowSubmitModal(false);
        setSuccess(null);
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Failed to submit article');
    } finally {
      setSubmitting(false);
    }
  };

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  // Update the return statement to show loading state only for data loading
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">News & Articles</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Stay informed with the latest cybersecurity news, trends, and community updates.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${category === selectedCategory
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Cybersecurity News Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Latest Cybersecurity Updates</h2>

          {newsLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          )}

          {newsError && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg mb-8">
              <p>{newsError}</p>
            </div>
          )}

          {!newsLoading && !newsError && newsArticles.length === 0 && (
            <div className="text-center text-gray-300">
              <p>No news articles available at the moment.</p>
            </div>
          )}

          {!newsLoading && !newsError && newsArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article, index) => (
                <article key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/fallback-image.jpg'; // Add a fallback image
                        e.currentTarget.onerror = null; // Prevent infinite loop
                      }}
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-2">{article.description}</p>
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-cyan-400 hover:text-cyan-300"
                    >
                      Read Full Article <ArrowRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {article.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">{article.title}</h2>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="h-4 w-4 mr-1" />
                      <span className="mr-4">{article.author}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                    <Link
                      to={`/news/${article.id}`}
                      className="inline-flex items-center text-cyan-500 hover:text-cyan-600"
                    >
                      Read More <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Submit Article CTA */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Share Your Knowledge</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Are you a student or professional with insights to share? Submit your article and contribute to our community.
          </p>
          <button
            onClick={() => setShowSubmitModal(true)}
            className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors inline-block"
          >
            Submit an Article
          </button>
        </div>
      </section>

      {/* Submit Article Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Submit Your Article</h2>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {categories.filter(cat => cat !== 'All').map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={10}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-cyan-500 text-white px-6 py-2 rounded-md hover:bg-cyan-600 transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}