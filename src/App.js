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

  const handleViewLeaderboard = () => {
    if (!selectedYear) {
      alert("Please select a year");
      return;
    }
    // TODO: Call backend API to fetch leaderboard for selectedYear
    alert(`Fetching leaderboard for ${selectedYear}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        {!isAuthenticated ? (
          <form onSubmit={handleSubmit} className="space-y-4">
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
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-green-600">Welcome!</h2>
            <p className="mt-2 text-gray-700">You have successfully unlocked this page.</p>
            <div className="flex flex-col space-y-3 mt-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full p-3 border rounded-xl focus:outline-none"
              >
                <option value="">Select Year</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
              </select>
              <button
                onClick={handleViewLeaderboard}
                className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
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
