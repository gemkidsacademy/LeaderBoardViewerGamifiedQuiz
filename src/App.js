import { useState } from "react";

export default function LeaderboardViewer() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");
  const correctPassword = "123";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleViewLeaderboard = (type) => {
    if (!selectedYear && type !== 'accumulative') {
      alert("Please select a year");
      return;
    }
    // TODO: Call backend API to fetch leaderboard
    if(type === 'accumulative') {
      alert(`Fetching accumulative leaderboard`);
    } else {
      alert(`Fetching leaderboard for ${selectedYear}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl grid gap-6">
        {!isAuthenticated ? (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold text-center">Leadership Board Gem Kids Academy</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none"
              placeholder="Enter password"
              required
            />
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Card 1: Year-specific leaderboard */}
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
              <h3 className="text-lg font-semibold text-center">View Leaderboard (Year-specific)</h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full p-3 border rounded-xl focus:outline-none mt-4"
              >
                <option value="">Select Year</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
              </select>
              <button
                onClick={() => handleViewLeaderboard('year')}
                className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 mt-4"
              >
                View Leaderboard
              </button>
            </div>

            {/* Card 2: Accumulative leaderboard */}
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
              <h3 className="text-lg font-semibold text-center">View Leaderboard (Accumulative)</h3>
              <button
                onClick={() => handleViewLeaderboard('accumulative')}
                className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 mt-4"
              >
                View Leaderboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
