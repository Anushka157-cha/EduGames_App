

// src/components/LeaderboardPage.jsx
import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("score", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setLeaderboardData(users);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <ol>
        {leaderboardData.map((user, index) => (
          <li key={user.id}>
            <span>{index + 1}.</span>
            <span>{user.name}</span>
            <span>{user.score}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default LeaderboardPage;