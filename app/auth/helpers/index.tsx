
export const getLoginUrl = async (): Promise<string> => {
  console.log("API_KEY: ", process.env.API_KEY);
  return `https://kite.zerodha.com/connect/login?v=3&api_key=${process.env.API_KEY}`;
};
