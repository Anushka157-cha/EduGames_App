







import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'firebase/auth';
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc ,updateDoc, FieldValue
} from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const db = getFirestore();

    // updateProgress
//     const updateProgress = async (uid, progressType) => {
//     const db = getFirestore();
//     const userRef = doc(db, "users", uid);

//     try {
//         await updateDoc(userRef, {
//             [`progress.${progressType}`]: FieldValue.increment(1)
//         });
//         console.log("Progress updated successfully!");
//     } catch (error) {
//         console.error("Error updating progress:", error);
//     }
// };



   const updateProgress = async (uid, updates) => {
        if (!uid) return;
    const db = getFirestore();
    
        const userRef = doc(db, "users", uid);
        try {
            await updateDoc(userRef, updates);
            console.log("User progress updated in Firestore.");
        } catch (error) {
            console.error("Error updating user progress:", error);
        }
    };

    // Signup function: Creates a new user and saves their profile data to Firestore
    const signup = async (email, password, name, userClass, school) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save custom user data to a 'users' collection in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name,
            userClass,
            school,
            email,
             progress: {
            totalQuizzesCompleted: 0,
            totalCoursesCompleted: 0,
            totalSubjectsCompleted: 0
        },
         scores: {}
        });
        
        // Update the current user state with the full profile data
        setCurrentUser({ ...user, name, userClass, school, email });
    };

    // Login function: Signs in an existing user and fetches their profile data
    const login = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    // Logout function: Signs out the current user
    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
    };

    // This effect listens for authentication state changes (e.g., login, logout)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // If a user is logged in, fetch their custom data from Firestore
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // Combine the Firebase user object with the Firestore data
                    setCurrentUser({ ...user, ...docSnap.data() });
                } else {
                    // Fallback if no custom data exists
                    setCurrentUser(user);
                }
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        // Cleanup function for the subscription
        return unsubscribe;
    }, [auth, db]);

    const value = {
        currentUser,
        signup,
        login,
        logout,
         updateProgress,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};