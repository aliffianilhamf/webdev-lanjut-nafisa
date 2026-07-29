// Contoh 1: async function dengan return nilai biasa
async function getData() {
  return "Hello World";
}

getData().then(console.log);
// Output: "Hello World"

// Contoh 2: async function dengan return Promise
async function getNumber() {
  return Promise.resolve(42);
}

getNumber().then(console.log);
// Output: 42

// contoh fetch data dari API menggunakan async/await
async function fetchData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
    );
    const data = await response.json();
    console.log("Data fetched successfully:");
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
