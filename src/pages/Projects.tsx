import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { submitProject, db, auth } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import AuthDialog from '../components/AuthDialog';

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  status: string;
  createdAt: string;
  userProfile: UserProfile;
}

export default function Projects() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    console.log('Projects component mounted');
    console.log('Firebase db instance:', db ? 'Initialized' : 'Not initialized');
    console.log('Current auth state:', auth.currentUser ? 'Authenticated' : 'Not authenticated');

    let unsubscribe: (() => void) | undefined;

    const setupProjectsListener = async () => {
      try {
        if (!db) {
          throw new Error('Firestore not initialized');
        }

        const projectsRef = collection(db, 'projects');
        console.log('Created projects reference:', projectsRef.path);

        const q = query(projectsRef, orderBy('createdAt', 'desc'));
        console.log('Created query with orderBy');

        console.log('Setting up real-time listener...');
        unsubscribe = onSnapshot(q,
          (snapshot) => {
            console.log('Received snapshot update');
            const fetchedProjects: Project[] = [];
            snapshot.forEach((doc) => {
              console.log('Processing document:', doc.id);
              fetchedProjects.push({ id: doc.id, ...doc.data() } as Project);
            });
            console.log('Fetched projects:', fetchedProjects.length);
            setProjects(fetchedProjects);
            setLoading(false);
          },
          (error) => {
            console.error('Error in snapshot listener:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            setError('Failed to fetch projects. Please try again later.');
            setLoading(false);
          }
        );
      } catch (error: any) {
        console.error('Error setting up projects listener:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        setError('Failed to fetch projects. Please try again later.');
        setLoading(false);
      }
    };

    if (!authLoading) {
      setupProjectsListener();
    }

    return () => {
      console.log('Cleaning up projects listener');
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) {
      setShowAuthDialog(true);
      return;
    }

    if (!title.trim()) {
      setError('Please enter a project title');
      return;
    }

    if (!description.trim()) {
      setError('Please enter a project description');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const userProfile = {
        name: name.trim(),
        email: auth.currentUser.email || '',
        avatar: auth.currentUser.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=random`
      };

      const result = await submitProject({
        title: title.trim(),
        description: description.trim(),
        userId: auth.currentUser.uid,
        userProfile
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      setSuccess('Project submitted successfully!');

      // Reset form
      setTitle('');
      setDescription('');
      setName('');

    } catch (error: any) {
      console.error('Error submitting project:', error);
      setError(error.message || 'Failed to submit project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthDialog(false);
  };

  if (authLoading || loading) {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">Student Projects</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto text-center">
            Submit your project ideas for review and guidance from our expert mentors.
          </p>
        </div>
      </section>

      {/* Project Submission */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Submit Your Project Idea</h2>
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
            {!user && (
              <div className="mb-6 p-4 bg-cyan-50 text-cyan-800 rounded-md">
                Please{' '}
                <button
                  onClick={() => setShowAuthDialog(true)}
                  className="text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  sign in
                </button>{' '}
                to submit a project.
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                  placeholder="Enter your project title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Project Description
                </label>
                <textarea
                  id="description"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                  placeholder="Describe your project idea, goals, and any specific areas where you need guidance..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-cyan-500 text-white px-6 py-3 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Recent Submissions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12">Recent Project Submissions</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={project.userProfile?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(project.userProfile?.name || 'Anonymous')}&background=random`}
                        alt={project.userProfile?.name}
                        className="h-12 w-12 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{project.userProfile?.name}</h3>
                        <p className="text-sm text-gray-500">{project.userProfile?.email}</p>
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold mb-3">{project.title}</h4>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex justify-between items-center">
                      <span className={`text-sm px-3 py-1 rounded-full ${project.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        project.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                        {project.status}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Get Expert Guidance</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experienced mentors are here to help you with your projects. Get feedback, suggestions, and guidance to improve your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/mentors"
              className="bg-cyan-500 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-cyan-600 transition-colors"
            >
              Find a Mentor
            </Link>
            <Link
              to="/contact"
              className="bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={handleAuthSuccess}
        mode="login"
      />
    </div>
  );
}