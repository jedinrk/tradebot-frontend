import { BASE_URL, API_KEY } from "../../core/backend";

export const getLoginUrl = async (): Promise<string> => {
  console.log("API_KEY: ", process.env.API_KEY);
  return `https://kite.zerodha.com/connect/login?v=3&api_key=jifqcwcybatcw0u1`;
};

export const signin = (user: any) => {
  return fetch(
    `https://kite.zerodha.com/connect/login?v=3&api_key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5500",
      },
      body: JSON.stringify(user),
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
  }

  return fetch(`${BASE_URL}/signout`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

export const authenticate = (data: any, next: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(data.token));
    localStorage.setItem("user_id", JSON.stringify(data.user_id));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage !== null && localStorage.getItem("token")) {
    return JSON.parse(localStorage.getItem("token") || "") || false;
  } else {
    return false;
  }
};
