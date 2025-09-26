


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes,Navigate, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import HomePage from "./components/HomePage";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import RegisterPage from "./components/RegisterPage";
import LeaderboardPage from "./components/LeaderboardPage";
import ProfilePage from "./components/ProfilePage";
import "./App.css";
import SecondApp from "./SecondApp";
import ChemistryMatchUp  from "./components/ChemistryGame";
import Chatbot from "./components/Chatbot";
import Physics from "./components/Physics";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
// import ServiceWorkerUpdater from "./components/ServiceWorkerUpdater";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};


const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("✅ User accepted install");
        } else {
          console.log("❌ User dismissed install");
        }
        setDeferredPrompt(null);
      });
    }
  };
 
  return (
    <Router>
      <LanguageProvider>
        <div className="app-container">
          {/* ⭐ Stars animation */}
          <div className="stars-container">
            <span className="star star-1"></span>
            <span className="star star-2"></span>
            <span className="star star-3"></span>
            <span className="star star-4"></span>
            <span className="star star-5"></span>
            <span className="star star-6"></span>
            <span className="star star-7"></span>
            <span className="star star-8"></span>
          </div>

          {/* 📲 Install Button (only shows if app is installable) */}
          {deferredPrompt && (
            <div style={{ textAlign: "center", margin: "15px" }}>
              <button
                onClick={handleInstallClick}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                }}
              >
                📲 Install EduGame
              </button>
            </div>
          )}

          {/* Main App Content */}
          <div className="content-wrapper">
            <Routes>
        
         <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
         }/>
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/home" element={
                <PrivateRoute>
<MainContent />
</PrivateRoute>
} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/geography" element={
                <PrivateRoute>

                <SecondApp />
                
                </PrivateRoute>
              }/>
         
            <Route path="/leaderboard" element={
          <PrivateRoute>
            <LeaderboardPage />
          </PrivateRoute>
        } />
         
              {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
             <Route path="/Chemistry" element={
              <PrivateRoute>

              <ChemistryMatchUp/>
              </PrivateRoute>
}/>
              <Route path="/profile" element={
                <PrivateRoute>

                <ProfilePage />
                </PrivateRoute>
} />

              
              <Route path ="/chat" element ={
                <PrivateRoute>

                <Chatbot/>
                </PrivateRoute>

                }/>
          <Route path="/login" element={
            <LoginPage />} />
<Route path="/physics" element={
  
  <PrivateRoute>

  <Physics/>
  </PrivateRoute>

  }/>

            </Routes>
          </div>

          <Navbar />

 {/* <ServiceWorkerUpdater /> */}
 {/* uncomment it to add refresh button */}

        </div>
      </LanguageProvider>
    </Router>


  );
};

export default App;
