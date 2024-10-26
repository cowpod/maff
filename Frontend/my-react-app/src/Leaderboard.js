import "./Leaderboard.css"
import { useState } from 'react';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchLeaderboard = async () => {
  const apiRes = await fetch(`http://127.0.0.1:4000/leaderboard`);
  if (!apiRes.ok) {
    throw new Error("Error fetching Leaderboard data");
  }
  const response = apiRes.json();
  console.log(response);
  return response;
}

const Leaderboard = () => {
    const { data: LeaderboardData = [], isLoading, error } = useQuery({queryFn: fetchLeaderboard});

    if (isLoading) return <div>Loading Leaderboard...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    // console.log(data)
    return (
        <table className="leaderboard-table">
            <thead className="leaderboard-header">
                <tr>
                    <th className="leaderboard-header-cell">Rank</th>
                    <th className="leaderboard-header-cell">Name</th>
                    <th className="leaderboard-header-cell">Score</th>
                </tr>
            </thead>
            <tbody className="leaderboard-body">
                {LeaderboardData.map((row, index) => (
                    <tr className="leaderboard-row" key={index}>
                        <td className="leaderboard-cell">{index + 1}</td>
                        <td className="leaderboard-cell">{row.name}</td>
                        <td className="leaderboard-cell">{row.SCORE}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Leaderboard; 
