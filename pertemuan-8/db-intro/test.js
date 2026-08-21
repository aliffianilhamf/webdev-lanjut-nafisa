require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const axios = require("axios");

const API_URL = "http://localhost:3000/api/books";

async function makeRequests() {
  try {
    // Contoh GET
    const responseGet = await axios.get(`${API_URL}`);
    console.log("GET Axios:", responseGet.data);
  } catch (error) {
    console.error(
      "Error Axios:",
      error.response ? error.response.status : error.message,
    );
  }
}

makeRequests();
