import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signInWithEmail: async () => { },
  signUpWithEmail: async () => { }
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSignIn = async (email: string, password: string) => {
    try {
      console.log('Attempting email sign in...');
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Email sign in successful:', result.user.uid);
      setError(null);
    } catch (error: any) {
      console.error('Email sign in error:', error);
      setError('Failed to sign in. Please check your credentials.');
      throw error;
    }
  };

  const handleEmailSignUp = async (email: string, password: string) => {
    try {
      console.log('Attempting email sign up...');
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Email sign up successful:', result.user.uid);
      setError(null);
    } catch (error: any) {
      console.error('Email sign up error:', error);
      setError('Failed to create account. Please try again.');
      throw error;
    }
  };

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');

    const unsubscribe = onAuthStateChanged(auth,
      (user) => {
        console.log('Auth state changed:', user ? 'User is signed in' : 'No user');

        if (user) {
          console.log('User details:', {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName
          });
        }

        setUser(user);
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error:', error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => {
      console.log('AuthProvider: Cleaning up auth state listener');
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    signInWithEmail: handleEmailSignIn,
    signUpWithEmail: handleEmailSignUp
  };

  console.log('AuthProvider: Current state:', {
    user: !!user,
    loading,
    error
  });

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}