const isProduction = process.env.NODE_ENV === "production";
const baseURL = isProduction
  ? "https://web-ec013.web.app"
  : "https://localhost:3001";

module.exports = baseURL;

const baseUrlApi = "https://localhost:3001/api";
module.exports = baseUrlApi;
