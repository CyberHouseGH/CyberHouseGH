import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCustomToken
} from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, query, where, orderBy, getDocs, enableIndexedDbPersistence, connectFirestoreEmulator, onSnapshot } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyABHw7WSgNewrkoVwkBe8yjwJMEu2hpCXA",
  authDomain: "cyber-backend-61c8f.firebaseapp.com",
  projectId: "cyber-backend-61c8f",
  storageBucket: "cyber-backend-61c8f.appspot.com",
  messagingSenderId: "281481530819",
  appId: "1:281481530819:web:23fe7c13784f4f7e52c176",
  measurementId: "G-WJXRMGPS8R"
};

// Initialize Firebase
console.log('Initializing Firebase...');
const app = initializeApp(firebaseConfig);
console.log('Firebase app initialized');

// Initialize analytics only if supported and in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
      console.log('Firebase Analytics initialized');
    }
  }).catch(error => {
    console.warn('Firebase Analytics not supported:', error);
  });
}

// Initialize Auth
console.log('Initializing Firebase Auth...');
const auth = getAuth(app);
console.log('Firebase Auth initialized');

// Initialize Firestore
console.log('Initializing Firestore...');
const db = getFirestore(app);
console.log('Firestore initialized');

// Initialize Storage
console.log('Initializing Firebase Storage...');
const storage = getStorage(app);
console.log('Firebase Storage initialized');

// Enable offline persistence
if (typeof window !== 'undefined') {
  console.log('Enabling offline persistence...');
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    } else {
      console.error('Error enabling persistence:', err);
    }
  });
}

// Initialize authentication
const initializeAuth = async () => {
  try {
    // Try to sign in anonymously if no custom token is available
    await signInAnonymously(auth);
    console.log('Signed in anonymously');
  } catch (error) {
    console.error('Error signing in anonymously:', error);
  }
};

// Call initializeAuth
initializeAuth();

// Debug auth state changes
onAuthStateChanged(auth, (user) => {
  console.log('Auth state changed:', user ? 'User is signed in' : 'No user');
  if (user) {
    console.log('User details:', {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      isAnonymous: user.isAnonymous
    });
  }
});

export { app, auth, analytics, db, storage };

// Project submission function
export const submitProject = async ({
  title,
  description,
  userId,
  userProfile
}: {
  title: string;
  description: string;
  userId: string;
  userProfile: {
    name: string;
    email: string;
    avatar?: string;
  };
}): Promise<{ success: boolean; projectId?: string; error?: string }> => {
  try {
    // Create project document in Firestore
    const projectRef = collection(db, 'projects');
    const projectDoc = await addDoc(projectRef, {
      title,
      description,
      userId,
      userProfile,
      status: 'Pending Review',
      createdAt: new Date().toISOString()
    });

    return { success: true, projectId: projectDoc.id };
  } catch (error: any) {
    console.error('Error submitting project:', error);
    return { success: false, error: error.message };
  }
};

// Media upload function with progress tracking
export const uploadMedia = async (
  file: File,
  type: 'image' | 'video',
  userId: string,
  onProgress?: (progress: number) => void
): Promise<{ success: boolean; mediaId?: string; url?: string; error?: string }> => {
  try {
    if (!storage || !db) {
      throw new Error('Firebase services not initialized');
    }

    // Validate file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 50MB limit');
    }

    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, `media/${type}s/${filename}`);

    // Create upload task
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Return a promise that resolves when the upload is complete
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculate and report progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) {
            onProgress(Math.round(progress));
          }
          console.log('Upload progress:', Math.round(progress));
        },
        (error) => {
          // Handle upload errors
          console.error('Upload error:', error);
          reject({ success: false, error: error.message });
        },
        async () => {
          try {
            // Get the download URL
            const url = await getDownloadURL(uploadTask.snapshot.ref);

            // Create media document in Firestore
            const mediaRef = collection(db, 'media');
            const mediaDoc = await addDoc(mediaRef, {
              title: file.name,
              type,
              url,
              userId,
              createdAt: new Date().toISOString()
            });

            resolve({ success: true, mediaId: mediaDoc.id, url });
          } catch (error: any) {
            reject({ success: false, error: error.message });
          }
        }
      );
    });
  } catch (error: any) {
    console.error('Error uploading media:', error);
    return { success: false, error: error.message };
  }
};

// Create article function
export const createArticle = async (articleData: {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  image?: string;
}) => {
  try {
    if (!db) {
      throw new Error('Firestore not initialized');
    }

    const articleRef = doc(db, 'articles', articleData.id);
    await setDoc(articleRef, {
      ...articleData,
      date: new Date().toISOString()
    });

    return { success: true, articleId: articleData.id };
  } catch (error: any) {
    console.error('Error creating article:', error);
    return { success: false, error: error.message };
  }
};

// Get article by ID
export const getArticleById = async (articleId: string) => {
  try {
    if (!db) {
      throw new Error('Firestore not initialized');
    }

    const articleRef = doc(db, 'articles', articleId);
    const articleSnap = await getDoc(articleRef);

    if (!articleSnap.exists()) {
      throw new Error(`Article with ID '${articleId}' not found`);
    }

    return {
      success: true,
      article: { id: articleSnap.id, ...articleSnap.data() }
    };
  } catch (error: any) {
    console.error('Error fetching article:', error);
    return { success: false, error: error.message };
  }
};

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Generate avatar URL using UI Avatars
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;

    try {
      // Update user profile with display name and avatar
      await updateProfile(user, {
        displayName: name,
        photoURL: avatarUrl
      });

      if (!db) {
        throw new Error('Firestore is not initialized');
      }

      // Try to create the user document in Firestore
      try {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          name: name,
          photoURL: avatarUrl,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } catch (firestoreError: any) {
        console.warn("Failed to create Firestore document:", firestoreError);
        // Continue even if Firestore document creation fails
        // The user is still created in Firebase Auth
      }

      return { user: userCredential.user, error: null };
    } catch (profileError: any) {
      console.error("Error updating profile:", profileError);
      // If profile update fails, we should still return the created user
      return { user: userCredential.user, error: null };
    }
  } catch (error: any) {
    let errorMessage = 'Failed to create account';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered. Please try logging in instead.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password accounts are not enabled. Please contact support.';
        break;
      case 'auth/weak-password':
        errorMessage = 'Please choose a stronger password (at least 6 characters).';
        break;
      default:
        errorMessage = error.message || 'An unexpected error occurred. Please try again.';
    }

    console.error("Registration error:", error);
    return { user: null, error: errorMessage };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    let errorMessage = 'Failed to sign in';

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Please enter a valid email address.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled. Please contact support.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email. Please register first.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      default:
        errorMessage = error.message || 'An unexpected error occurred. Please try again.';
    }

    console.error("Login error:", error);
    return { user: null, error: errorMessage };
  }
};

export const logoutUser = async () => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }

    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    console.error("Logout error:", error);
    return { error: error.message || 'Failed to sign out' };
  }
};

export const resetPassword = async (email: string) => {
  try {
    if (!auth) {
      throw new Error('Firebase Auth is not initialized');
    }
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error: any) {
    console.error("Password reset error:", error);
    return {
      success: false,
      error: error.message || 'Failed to send password reset email'
    };
  }
};

// Contact message submission function
export const sendContactMessage = async ({
  name,
  email,
  subject,
  message
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> => {
  try {
    console.log('Starting to send contact message...');
    console.log('Firebase db instance:', db ? 'Initialized' : 'Not initialized');
    console.log('Current auth state:', auth.currentUser ? 'Authenticated' : 'Not authenticated');

    if (!db) {
      throw new Error('Firestore not initialized');
    }

    const contactRef = collection(db, 'contactMessages');
    console.log('Created contactMessages reference:', contactRef.path);

    const messageData = {
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    console.log('Adding document with data:', messageData);
    const docRef = await addDoc(contactRef, messageData);
    console.log('Document added successfully with ID:', docRef.id);

    return { success: true };
  } catch (error: any) {
    console.error('Error sending contact message:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error details:', error.details);

    // Provide more specific error messages
    let errorMessage = 'Failed to send message';
    if (error.code === 'permission-denied') {
      errorMessage = 'Permission denied. Please try again or contact support.';
    } else if (error.code === 'unavailable') {
      errorMessage = 'Service temporarily unavailable. Please try again later.';
    }

    return { success: false, error: errorMessage };
  }
};