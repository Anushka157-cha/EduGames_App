// import React, { useState } from 'react';
// import MainMenu from './components/MainMenu';
// import QuizScreen from './components/QuizScreen';
// import ResultsScreen from './components/ResultsScreen';
// import ProfileScreen from './components/ProfileScreen';
// import SettingsModal from './components/SettingsModal';
// import LoadingSpinner from './components/LoadingSpinner';
// import { GameState, Player, Quiz } from './types/game';

// function SecondApp() {
//   const [currentScreen, setCurrentScreen] = useState<'menu' | 'quiz' | 'results' | 'profile'>('menu');
//   const [showSettings, setShowSettings] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [gameState, setGameState] = useState<GameState>({
//     currentQuiz: null,
//     currentQuestionIndex: 0,
//     score: 0,
//     timeLeft: 0,
//     isQuizActive: false,
//     selectedAnswer: null,
//     showResult: false,
//     isCorrect: false,
//     streak: 0,
//     hintsUsed: 0,
//     difficulty: 'beginner'
//   });
//   const [player, setPlayer] = useState<Player>({
//     id: '1',
//     name: 'GeoExplorer',
//     level: 1,
//     xp: 0,
//     totalScore: 0,
//     badges: [],
//     unlockedRegions: ['asia', 'europe'],
//     stats: {
//       totalQuizzes: 0,
//       correctAnswers: 0,
//       totalAnswers: 0,
//       streak: 0,
//       bestStreak: 0
//     }
//   });
//   const [settings, setSettings] = useState({
//     soundEnabled: true,
//     animationsEnabled: true,
//     autoAdvance: false,
//     showHints: false,
//     theme: 'light' as 'light' | 'dark' | 'auto'
//   });

//   const startQuiz = (quiz: Quiz) => {
//     setIsLoading(true);
//     setTimeout(() => {
//       setGameState({
//         currentQuiz: quiz,
//         currentQuestionIndex: 0,
//         score: 0,
//         timeLeft: quiz.timeLimit || 20,
//         isQuizActive: true,
//         selectedAnswer: null,
//         showResult: false,
//         isCorrect: false,
//         streak: 0,
//         hintsUsed: 0,
//         difficulty: quiz.difficulty
//       });
//       setCurrentScreen('quiz');
//       setIsLoading(false);
//     }, 1000);
//   };

//   const endQuiz = () => {
//     // Calculate the correct answers based on score (each correct answer is worth 10 points)
//     const correctAnswers = Math.floor(gameState.score / 10);
//     const totalQuestions = gameState.currentQuiz?.questions.length || 0;
    
//     // Update player stats
//     const newPlayer = {
//       ...player,
//       totalScore: player.totalScore + gameState.score,
//       stats: {
//         ...player.stats,
//         totalQuizzes: player.stats.totalQuizzes + 1,
//         correctAnswers: player.stats.correctAnswers + correctAnswers,
//         totalAnswers: player.stats.totalAnswers + totalQuestions,
//         bestStreak: Math.max(player.stats.bestStreak, gameState.streak)
//       }
//     };
    
//     setPlayer(newPlayer);
//     setCurrentScreen('results');
//   };

//   const resetGame = () => {
//     setGameState({
//       currentQuiz: null,
//       currentQuestionIndex: 0,
//       score: 0,
//       timeLeft: 0,
//       isQuizActive: false,
//       selectedAnswer: null,
//       showResult: false,
//       isCorrect: false,
//       streak: 0,
//       hintsUsed: 0,
//       difficulty: 'beginner'
//     });
//     setCurrentScreen('menu');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {isLoading ? (
//         <div className="min-h-screen flex items-center justify-center">
//           <LoadingSpinner size="lg" text="Preparing your quiz..." />
//         </div>
//       ) : (
//         <>
//           {currentScreen === 'menu' && (
//             <MainMenu 
//               onStartQuiz={startQuiz}
//               onViewProfile={() => setCurrentScreen('profile')}
//               onOpenSettings={() => setShowSettings(true)}
//               player={player}
//             />
//           )}
//           {currentScreen === 'quiz' && gameState.currentQuiz && (
//             <QuizScreen 
//               gameState={gameState}
//               setGameState={setGameState}
//               onEndQuiz={endQuiz}
//             />
//           )}
//           {currentScreen === 'results' && gameState.currentQuiz && (
//             <ResultsScreen 
//               gameState={gameState}
//               player={player}
//               onPlayAgain={resetGame}
//               onBackToMenu={() => setCurrentScreen('menu')}
//             />
//           )}
//           {currentScreen === 'profile' && (
//             <ProfileScreen 
//               player={player}
//               onBackToMenu={() => setCurrentScreen('menu')}
//             />
//           )}
//         </>
//       )}
      
//       <SettingsModal
//         isOpen={showSettings}
//         onClose={() => setShowSettings(false)}
//         onSave={setSettings}
//         currentSettings={settings}
//       />
//     </div>
//   );
// }

// export default SecondApp;









// src/SecondApp.jsx

import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';
import ProfileScreen from './components/ProfileScreen';
import SettingsModal from './components/SettingsModal';
import LoadingSpinner from './components/LoadingSpinner';
import { GameState, Quiz } from './types/game';
import { useAuth } from './context/AuthContext'; // Import the useAuth hook

function SecondApp() {
  const { currentUser, updateProgress } = useAuth(); // Use AuthContext to get user and update function

  const [currentScreen, setCurrentScreen] = useState<'menu' | 'quiz' | 'results' | 'profile'>('menu');
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentQuiz: null,
    currentQuestionIndex: 0,
    score: 0,
    timeLeft: 0,
    isQuizActive: false,
    selectedAnswer: null,
    showResult: false,
    isCorrect: false,
    streak: 0,
    hintsUsed: 0,
    difficulty: 'beginner'
  });
  const [settings, setSettings] = useState({
    soundEnabled: true,
    animationsEnabled: true,
    autoAdvance: false,
    showHints: false,
    theme: 'light' as 'light' | 'dark' | 'auto'
  });

  const startQuiz = (quiz: Quiz) => {
    setIsLoading(true);
    setTimeout(() => {
      setGameState({
        currentQuiz: quiz,
        currentQuestionIndex: 0,
        score: 0,
        timeLeft: quiz.timeLimit || 20,
        isQuizActive: true,
        selectedAnswer: null,
        showResult: false,
        isCorrect: false,
        streak: 0,
        hintsUsed: 0,
        difficulty: 'beginner'
      });
      setCurrentScreen('quiz');
      setIsLoading(false);
    }, 1000);
  };

  const endQuiz = async () => {
    // Check if the user is authenticated
    if (!currentUser || !currentUser.uid) {
      console.error("User not authenticated. Cannot save progress.");
      setCurrentScreen('results');
      return;
    }

    const correctAnswers = Math.floor(gameState.score / 10);
    const totalQuestions = gameState.currentQuiz?.questions.length || 0;
    
    // Save the new stats to Firestore using the updateProgress function
    try {
      // You'll need to update your updateProgress function in AuthContext.jsx
      // to handle multiple fields at once, or call it multiple times.
      // Assuming it can handle a single object to update:
      
      const updates = {
        'stats.totalQuizzes': (currentUser.stats?.totalQuizzes || 0) + 1,
        'stats.correctAnswers': (currentUser.stats?.correctAnswers || 0) + correctAnswers,
        'stats.totalAnswers': (currentUser.stats?.totalAnswers || 0) + totalQuestions,
        'stats.bestStreak': Math.max(currentUser.stats?.bestStreak || 0, gameState.streak),
        'totalScore': (currentUser.totalScore || 0) + gameState.score
      };
      
      // Call the function to update the user's document in Firestore
      // You'll need to create this function in AuthContext.jsx
      await updateProgress(currentUser.uid, updates);
      
    } catch (error) {
      console.error("Failed to save progress:", error);
    }
    
    setCurrentScreen('results');
  };

  const resetGame = () => {
    setGameState({
      currentQuiz: null,
      currentQuestionIndex: 0,
      score: 0,
      timeLeft: 0,
      isQuizActive: false,
      selectedAnswer: null,
      showResult: false,
      isCorrect: false,
      streak: 0,
      hintsUsed: 0,
      difficulty: 'beginner'
    });
    setCurrentScreen('menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {isLoading ? (
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Preparing your quiz..." />
        </div>
      ) : (
        <>
          {currentScreen === 'menu' && (
            <MainMenu 
              onStartQuiz={startQuiz}
              onViewProfile={() => setCurrentScreen('profile')}
              onOpenSettings={() => setShowSettings(true)}
              player={currentUser} // Pass currentUser to MainMenu
            />
          )}
          {currentScreen === 'quiz' && gameState.currentQuiz && (
            <QuizScreen 
              gameState={gameState}
              setGameState={setGameState}
              onEndQuiz={endQuiz}
            />
          )}
          {currentScreen === 'results' && gameState.currentQuiz && (
            <ResultsScreen 
              gameState={gameState}
              player={currentUser} // Pass currentUser to ResultsScreen
              onPlayAgain={resetGame}
              onBackToMenu={() => setCurrentScreen('menu')}
            />
          )}
          {currentScreen === 'profile' && (
            <ProfileScreen 
              player={currentUser} // Pass currentUser to ProfileScreen
              onBackToMenu={() => setCurrentScreen('menu')}
            />
          )}
        </>
      )}
      
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onSave={setSettings}
        currentSettings={settings}
      />
    </div>
  );
}

export default SecondApp;