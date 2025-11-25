import { useState } from "react";

export default function LeaderboardViewer() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const [selectedClassAcc, setSelectedClassAcc] = useState("");
  const [selectedDayAcc, setSelectedDayAcc] = useState("");

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [leaderboardType, setLeaderboardType] = useState(""); // 'year' or 'accumulative'
  const correctPassword = "123";

  // ------------------ Authentication ------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  // ------------------ Fetch Leaderboard ------------------
  const handleViewLeaderboard = async (type) => {
    try {
      let className, day, url;

      if (type === "year") {
        if (!selectedClass || !selectedDay) {
          alert("Please select class and day");
          return;
        }
        className = selectedClass;
        day = selectedDay;
        url = `https://web-production-481a5.up.railway.app/api/leaderboard/year/${className}?day=${day}`;
      } else if (type === "accumulative") {
        if (!selectedClassAcc || !selectedDayAcc) {
          alert("Please select class and day");
          return;
        }
        className = selectedClassAcc;
        day = selectedDayAcc;
        url = `https://web-production-481a5.up.railway.app/api/leaderboard/accumulative/${className}?day=${day}`;
      } else {
        alert("Invalid leaderboard type");
        return;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch leaderboard");

      const data = await response.json();
      console.log(`${type === "year" ? "Year-specific" : "Accumulative"} leaderboard:`, data);

      // Normalize leaderboard data
      let entries = [];
      if (type === "year") {
        entries = data; // Year API returns array directly
      } else if (type === "accumulative") {
        entries = data.leaderboard || [];
        // Add class_name and class_day to each row
        entries = entries.map((e) => ({
          ...e,
          class_name: data.class_name,
          class_day: data.class_day,
        }));
      }

      setLeaderboardData(entries);
      setLeaderboardType(type);
    } catch (error) {
      console.error(error);
      alert("Desired leaderboard data does not exist in the database");
    }
  };

  // ------------------ Render Leaderboard Table ------------------
  const renderLeaderboardTable = () => {
    if (!leaderboardData || leaderboardData.length === 0) return <p className="text-center mt-4">No data available.</p>;

    return (
      <table className="w-full mt-4 border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Student</th>
            <th className="border px-2 py-1">Class</th>
            <th className="border px-2 py-1">Day</th>
            <th className="border px-2 py-1">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index} className="text-center">
              <td className="border px-2 py-1">{index + 1}</td>
              <td className="border px-2 py-1">{entry.student_name}</td>
              <td className="border px-2 py-1">{entry.class_name}</td>
              <td className="border px-2 py-1">{entry.class_day}</td>
              <td className="border px-2 py-1">{entry.total_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // ------------------ Main Render ------------------
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
          <div className="flex flex-col gap-6">
            {/* Year-Specific Leaderboard */}
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
              <h3 className="text-lg font-semibold text-center">View Leaderboard (Current Week)</h3>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full p-3 border rounded-xl focus:outline-none mt-4"
              >
                <option value="">Select Class</option>
                <option value="Selective">Selective</option>
                <option value="Kindergarten">Kindergarten</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
                <option value="Year 3">Year 3</option>
                <option value="Year 4">Year 4</option>
                <option value="Year 5">Year 5</option>
                <option value="Year 6">Year 6</option>
                  
              </select>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full p-3 border rounded-xl focus:outline-none mt-4"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Friday">Friday</option>
              </select>
              <button
                onClick={() => handleViewLeaderboard("year")}
                className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 mt-4"
              >
                View Leaderboard
              </button>

              {leaderboardType === "year" && renderLeaderboardTable()}
            </div>

            {/* Accumulative Leaderboard */}
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full">
              <h3 className="text-lg font-semibold text-center">View Leaderboard (Accumulative)</h3>
              <select
                value={selectedClassAcc}
                onChange={(e) => setSelectedClassAcc(e.target.value)}
                className="w-full p-3 border rounded-xl focus:outline-none mt-4"
              >
                <option value="">Select Class</option>
                <option value="Year 1">Year 1</option>
                <option value="Year 2">Year 2</option>
              </select>
              <select
                value={selectedDayAcc}
                onChange={(e) => setSelectedDayAcc(e.target.value)}
                className="w-full p-3 border rounded-xl focus:outline-none mt-4"
              >
                <option value="">Select Day</option>
                <option value="Monday">Monday</option>
                <option value="Friday">Friday</option>
              </select>
              <button
                onClick={() => handleViewLeaderboard("accumulative")}
                className="w-full p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 mt-4"
              >
                View Leaderboard
              </button>

              {leaderboardType === "accumulative" && renderLeaderboardTable()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
