"use client";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [positions, setPositions] = useState({ net: [], day: [] });

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/api/user/getPositions"
        );

        if (response.ok) {
          const data = await response.json();
          console.log("data: ", data);
          setPositions(data);
        } else {
          console.error("Failed to fetch positions");
        }
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Positions</h2>
        {positions && (
          <div>
            <p>Net: {positions.net}</p>
            <p>Day: {positions.day}</p>
          </div>
        )}
      </div>
      {/* Other dashboard content */}
    </div>
  );
};

export default Dashboard;
