// import React from 'react';
// import { GameState, Player } from '../types/game';

// interface ResultsScreenProps {
//   gameState: GameState;
//   player: Player;
//   onPlayAgain: () => void;
//   onBackToMenu: () => void;
// }

// const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
//   gameState, 
//   player, 
//   onPlayAgain, 
//   onBackToMenu 
// }) => {
//   const totalQuestions = gameState.currentQuiz?.questions.length || 0;
//   const correctAnswers = Math.floor(gameState.score / 10);
//   const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
//   const xpEarned = gameState.score + (gameState.streak * 5);
//   const newLevel = Math.floor((player.xp + xpEarned) / 1000) + 1;

//   const getPerformanceMessage = () => {
//     if (accuracy >= 90) return { message: "Outstanding! 🌟", color: "text-yellow-600" };
//     if (accuracy >= 80) return { message: "Excellent! 🎉", color: "text-green-600" };
//     if (accuracy >= 70) return { message: "Good job! 👍", color: "text-blue-600" };
//     if (accuracy >= 60) return { message: "Not bad! 💪", color: "text-orange-600" };
//     return { message: "Keep practicing! 📚", color: "text-red-600" };
//   };

//   const performance = getPerformanceMessage();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-5xl font-bold mb-4" style={{ color: '#2563eb' }}>Quiz Complete! 🎯</h1>
//           <p className={`text-2xl font-semibold ${performance.color}`}>
//             {performance.message}
//           </p>
//         </div>

//         {/* Results Card */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Score */}
//             <div className="text-center p-4">
//               <h2 className="text-6xl font-bold" style={{ color: '#2563eb' }}>{gameState.score}</h2>
//               <p className="text-lg font-medium">Total Score</p>
//               <p className="text-sm text-gray-500">+{xpEarned} XP earned</p>
//             </div>

//             {/* Accuracy */}
//             <div className="text-center p-4">
//               <h2 className="text-6xl font-bold" style={{ color: '#16a34a' }}>{accuracy}%</h2>
//               <p className="text-lg font-medium">Accuracy</p>
//               <p className="text-sm text-gray-500">{correctAnswers} of {totalQuestions} correct</p>
//             </div>

//             {/* Streak */}
//             <div className="text-center p-4">
//               <h2 className="text-6xl font-bold" style={{ color: '#ca8a04' }}>{gameState.streak}</h2>
//               <p className="text-lg font-medium">Best Streak</p>
//               <p className="text-sm text-gray-500">Consecutive correct answers</p>
//             </div>
//           </div>

//           {/* Detailed Stats */}
//           <div className="mt-8 pt-8 border-t border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Quiz Details</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="flex justify-between py-2">
//                 <span className="text-gray-600">Topic:</span>
//                 <span className="font-medium capitalize">{gameState.currentQuiz?.topic || 'All'}</span>
//               </div>
//               <div className="flex justify-between py-2">
//                 <span className="text-gray-600">Difficulty:</span>
//                 <span className="font-medium capitalize">{gameState.currentQuiz?.difficulty || 'Advanced'}</span>
//               </div>
//               <div className="flex justify-between py-2">
//                 <span className="text-gray-600">Region:</span>
//                 <span className="font-medium capitalize">{gameState.currentQuiz?.region || 'All'}</span>
//               </div>
//               <div className="flex justify-between py-2">
//                 <span className="text-gray-600">Hints Used:</span>
//                 <span className="font-medium">{gameState.hintsUsed}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Level Up Notification */}
//         {newLevel > player.level && (
//           <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 mb-8 text-center">
//             <div className="text-4xl mb-2">🎉</div>
//             <h3 className="text-2xl font-bold text-white mb-2">Level Up!</h3>
//             <p className="text-white text-lg">
//               You've reached level {newLevel}! New regions and features unlocked!
//             </p>
//           </div>
//         )}

//         {/* Badge Notifications */}
//         {gameState.streak >= 5 && (
//           <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl p-6 mb-8 text-center">
//             <div className="text-4xl mb-2">🏆</div>
//             <h3 className="text-2xl font-bold text-white mb-2">Streak Master!</h3>
//             <p className="text-white text-lg">
//               Amazing {gameState.streak} question streak! You're on fire! 🔥
//             </p>
//           </div>
//         )}

//         {/* Performance Feedback */}
//         <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Feedback</h3>
//           <div className="space-y-3">
//             {accuracy >= 90 && (
//               <p className="text-green-600">🌟 Outstanding performance! You're a geography expert!</p>
//             )}
//             {accuracy >= 80 && accuracy < 90 && (
//               <p className="text-blue-600">🎉 Excellent work! You have a strong grasp of geography!</p>
//             )}
//             {accuracy >= 70 && accuracy < 80 && (
//               <p className="text-yellow-600">👍 Good job! Keep studying to improve even more!</p>
//             )}
//             {accuracy >= 60 && accuracy < 70 && (
//               <p className="text-orange-600">💪 Not bad! Practice more to boost your accuracy!</p>
//             )}
//             {accuracy < 60 && (
//               <p className="text-red-600">📚 Keep practicing! Every expert was once a beginner!</p>
//             )}
            
//             {gameState.streak >= 3 && (
//               <p className="text-purple-600">🔥 Great streak! You're building momentum!</p>
//             )}
            
//             {gameState.hintsUsed === 0 && gameState.currentQuiz?.difficulty !== 'beginner' && (
//               <p className="text-indigo-600">🧠 No hints used! You're very confident!</p>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={onPlayAgain}
//             className="px-8 py-4 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-blue-700"
//             style={{ backgroundColor: '#2563eb' }}
//           >
//             🔄 Play Again
//           </button>
//           <button
//             onClick={onBackToMenu}
//             className="px-8 py-4 bg-gray-600 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
//           >
//             🏠 Main Menu
//           </button>
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
//           <div className="bg-white rounded-lg p-4 text-center shadow-md">
//             <div className="text-2xl font-bold" style={{ color: '#2563eb' }}>{player.stats.totalQuizzes + 1}</div>
//             <div className="text-sm text-gray-600">Total Quizzes</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 text-center shadow-md">
//             <div className="text-2xl font-bold" style={{ color: '#16a34a' }}>
//               {player.stats.totalAnswers > 0 ? Math.round((player.stats.correctAnswers / player.stats.totalAnswers) * 100) : 0}%
//             </div>
//             <div className="text-sm text-gray-600">Overall Accuracy</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 text-center shadow-md">
//             <div className="text-2xl font-bold" style={{ color: '#d97706' }}>{Math.max(player.stats.bestStreak, gameState.streak)}</div>
//             <div className="text-sm text-gray-600">Best Streak</div>
//           </div>
//           <div className="bg-white rounded-lg p-4 text-center shadow-md">
//             <div className="text-2xl font-bold" style={{ color: '#9333ea' }}>
//               {/* {player.level} */}

// <div className="text-2xl font-bold" style={{ color: '#9333ea' }}>{player?.level || 1}</div>

//               </div>
//             <div className="text-sm text-gray-600">Current Level</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultsScreen;






import React from 'react';
import { GameState, Player } from '../types/game';

interface ResultsScreenProps {
  gameState: GameState;
  player: Player;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ 
  gameState, 
  player, 
  onPlayAgain, 
  onBackToMenu 
}) => {
  const totalQuestions = gameState.currentQuiz?.questions.length || 0;
  const correctAnswers = Math.floor(gameState.score / 10);
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const xpEarned = gameState.score + (gameState.streak * 5);

  // Corrected newLevel calculation with optional chaining and a default value
  const newLevel = Math.floor(((player?.xp || 0) + xpEarned) / 1000) + 1;

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return { message: "Outstanding! 🌟", color: "text-yellow-600" };
    if (accuracy >= 80) return { message: "Excellent! 🎉", color: "text-green-600" };
    if (accuracy >= 70) return { message: "Good job! 👍", color: "text-blue-600" };
    if (accuracy >= 60) return { message: "Not bad! 💪", color: "text-orange-600" };
    return { message: "Keep practicing! 📚", color: "text-red-600" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#2563eb' }}>Quiz Complete! 🎯</h1>
          <p className={`text-2xl font-semibold ${performance.color}`}>
            {performance.message}
          </p>
        </div>

        {/* Results Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Score */}
            <div className="text-center p-4">
              <h2 className="text-6xl font-bold" style={{ color: '#2563eb' }}>{gameState.score}</h2>
              <p className="text-lg font-medium">Total Score</p>
              <p className="text-sm text-gray-500">+{xpEarned} XP earned</p>
            </div>

            {/* Accuracy */}
            <div className="text-center p-4">
              <h2 className="text-6xl font-bold" style={{ color: '#16a34a' }}>{accuracy}%</h2>
              <p className="text-lg font-medium">Accuracy</p>
              <p className="text-sm text-gray-500">{correctAnswers} of {totalQuestions} correct</p>
            </div>

            {/* Streak */}
            <div className="text-center p-4">
              <h2 className="text-6xl font-bold" style={{ color: '#ca8a04' }}>{gameState.streak}</h2>
              <p className="text-lg font-medium">Best Streak</p>
              <p className="text-sm text-gray-500">Consecutive correct answers</p>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Quiz Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Topic:</span>
                          <span className="font-medium capitalize">{gameState.currentQuiz?.topic || 'All'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Difficulty:</span>
                <span className="font-medium capitalize">{gameState.currentQuiz?.difficulty || 'Advanced'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Region:</span>
                <span className="font-medium capitalize">{gameState.currentQuiz?.region || 'All'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Hints Used:</span>
                <span className="font-medium">{gameState.hintsUsed}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Level Up Notification */}
        {newLevel > (player?.level || 0) && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 mb-8 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">Level Up!</h3>
            <p className="text-white text-lg">
              You've reached level {newLevel}! New regions and features unlocked!
            </p>
          </div>
        )}

        {/* Badge Notifications */}
        {gameState.streak >= 5 && (
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl p-6 mb-8 text-center">
            <div className="text-4xl mb-2">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">Streak Master!</h3>
            <p className="text-white text-lg">
              Amazing {gameState.streak} question streak! You're on fire! 🔥
            </p>
          </div>
        )}

        {/* Performance Feedback */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Feedback</h3>
          <div className="space-y-3">
            {accuracy >= 90 && (
              <p className="text-green-600">🌟 Outstanding performance! You're a geography expert!</p>
            )}
            {accuracy >= 80 && accuracy < 90 && (
              <p className="text-blue-600">🎉 Excellent work! You have a strong grasp of geography!</p>
            )}
            {accuracy >= 70 && accuracy < 80 && (
              <p className="text-yellow-600">👍 Good job! Keep studying to improve even more!</p>
            )}
            {accuracy >= 60 && accuracy < 70 && (
              <p className="text-orange-600">💪 Not bad! Practice more to boost your accuracy!</p>
            )}
            {accuracy < 60 && (
              <p className="text-red-600">📚 Keep practicing! Every expert was once a beginner!</p>
            )}
            
            {gameState.streak >= 3 && (
              <p className="text-purple-600">🔥 Great streak! You're building momentum!</p>
            )}
            
            {gameState.hintsUsed === 0 && gameState.currentQuiz?.difficulty !== 'beginner' && (
              <p className="text-indigo-600">🧠 No hints used! You're very confident!</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="px-8 py-4 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-blue-700"
            style={{ backgroundColor: '#2563eb' }}
          >
            🔄 Play Again
          </button>
          <button
            onClick={onBackToMenu}
            className="px-8 py-4 bg-gray-600 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            🏠 Main Menu
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            {/* Corrected line: Use parentheses and optional chaining */}
            <div className="text-2xl font-bold" style={{ color: '#2563eb' }}>{(player?.stats?.totalQuizzes || 0) + 1}</div>
            <div className="text-sm text-gray-600">Total Quizzes</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold" style={{ color: '#16a34a' }}>
              {
                (player?.stats?.totalAnswers || 0) > 0 ? 
                Math.round(((player?.stats?.correctAnswers || 0) / (player?.stats?.totalAnswers || 1)) * 100) : 
                0
              }%
            </div>
            <div className="text-sm text-gray-600">Overall Accuracy</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold" style={{ color: '#d97706' }}>
                {Math.max((player?.stats?.bestStreak || 0), gameState.streak)}
            </div>
            <div className="text-sm text-gray-600">Best Streak</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center shadow-md">
            <div className="text-2xl font-bold" style={{ color: '#9333ea' }}>{player?.level || 1}</div>
            <div className="text-sm text-gray-600">Current Level</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;