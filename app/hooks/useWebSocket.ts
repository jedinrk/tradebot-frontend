import { useEffect, useState } from "react";

const useWebSocket = () => {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    console.log("useWebSocket useEffect");
    const ws = new WebSocket("ws://127.0.0.1:8080"); // Replace with your backend WebSocket URL

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
      const message = JSON.parse(event.data);
      console.log("message", message);
      if (message.accessToken !== "") {
        const access_token: string = message.accessToken;
        // Handle received access token, e.g., update UI or perform actions
        console.log("Received access token:", access_token);
        setAccessToken(access_token);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      // Clean up WebSocket connection on unmount if needed
      ws.close();
    };
  }, []);

  return { accessToken, setAccessToken };
};

export default useWebSocket;
