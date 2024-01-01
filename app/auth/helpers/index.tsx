
export const getLoginUrl = async (): Promise<string> => {
  return `https://kite.zerodha.com/connect/login?v=3&api_key=${process.env.API_KEY}`;
};
