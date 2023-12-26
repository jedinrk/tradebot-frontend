import React, { useState, useEffect } from "react";
import { getLoginUrl } from "../auth/helpers";
import useWebSocket from "../hooks/useWebSocket";
import { useRouter } from "next/navigation";

const ZerodhaLogin = () => {
  const [loginUrl, setLoginUrl] = useState("");
  const router = useRouter();

  const { accessToken } = useWebSocket();

  useEffect(() => {
    console.log("accessToken: ", accessToken);
    if (accessToken !== undefined && accessToken !== "") {
      router.push("/dashboard", { scroll: false });
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchLoginUrl = async () => {
      try {
        const response = await getLoginUrl(); // Assuming getLoginUrl is imported from your file
        console.log(response);
        setLoginUrl(response);
      } catch (error) {
        // Handle errors if needed
        console.error("Error fetching login URL:", error);
      }
    };

    fetchLoginUrl();
  }, []);

  return (
    <div>
      {loginUrl && ( // Ensure loginUrl is available before rendering the iframe
        <iframe
          src={loginUrl}
          title="Zerodha Login"
          width={600}
          height={1024}
        ></iframe>
      )}
    </div>
  );
};

export default ZerodhaLogin;
