"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [positions, setPositions] = useState({ net: [], day: [] });

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        console.log("fetchPos: ", process.env.BACKEND_URL);
        const authResponse = await fetch(
          `${process.env.BACKEND_URL}/api/auth/isAuthorized?user_id=TZ1921`
        );

        if (authResponse.ok) {
          const authData = await authResponse.json();
          if (authData && authData.accessToken && authData.status !== "error") {
            const positionsResponse = await fetch(
              `${process.env.BACKEND_URL}/api/user/getPositions`
            );

            if (positionsResponse.ok) {
              const positionsData = await positionsResponse.json();
              console.log("positionsData: ", positionsData);
              if (positionsData.status === "error") {
                console.error("Access Token not available or status is error");
                router.push("/");
              } else {
                setPositions(positionsData);
              }
            } else {
              console.error("Failed to fetch positions");
            }
          } else {
            console.error("Access Token not available or status is error");
            router.push("/");
          }
        } else {
          console.error("Failed to check authorization");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPositions();
  }, [router]);

  return (
    <div>
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
