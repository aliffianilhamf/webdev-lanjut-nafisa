// =========================================
// MODULE 4: ASYNC/AWAIT PRACTICAL EXAMPLES
// =========================================

// 1. Basic Async Function
async function getData() {
  return "Hello World";
}

console.log('--- Basic Async Function ---');
getData().then(console.log);

// 2. Async/Await dengan Error Handling
async function fetchWithTryCatch() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    console.log('--- Data fetched successfully ---');
    console.log(data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// 3. Parallel Execution dengan Promise.all
async function fetchParallel() {
  const start = Date.now();
  
  const [post1, post2, post3] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/2').then(r => r.json()),
    fetch('https://jsonplaceholder.typicode.com/posts/3').then(r => r.json())
  ]);
  
  console.log('--- Parallel Fetch Complete ---');
  console.log(`Time taken: ${Date.now() - start}ms`);
  console.log('Post 1:', post1.title);
  console.log('Post 2:', post2.title);
  console.log('Post 3:', post3.title);
}

// 4. Serial Execution (untuk perbandingan)
async function fetchSerial() {
  const start = Date.now();
  
  const post1 = await fetch('https://jsonplaceholder.typicode.com/posts/1').then(r => r.json());
  const post2 = await fetch('https://jsonplaceholder.typicode.com/posts/2').then(r => r.json());
  const post3 = await fetch('https://jsonplaceholder.typicode.com/posts/3').then(r => r.json());
  
  console.log('--- Serial Fetch Complete ---');
  console.log(`Time taken: ${Date.now() - start}ms`);
}

// 5. Custom Async Function dengan Delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function delayedGreeting(name) {
  await delay(1000);
  console.log(`Hello, ${name}! (after 1 second delay)`);
  
  await delay(1000);
  console.log(`How are you, ${name}? (after 2 seconds total)`);
  
  await delay(1000);
  console.log(`Goodbye, ${name}! (after 3 seconds total)`);
}

// 6. Database Operations Simulation (Mock)
const mockDatabase = {
  users: [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ],
  
  async getUserById(id) {
    await delay(500);
    const user = this.users.find(u => u.id === id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  },
  
  async getAllUsers() {
    await delay(300);
    return this.users;
  }
};

async function databaseOperations() {
  try {
    console.log('--- Database Operations ---');
    
    const allUsers = await mockDatabase.getAllUsers();
    console.log('All users:', allUsers);
    
    const user = await mockDatabase.getUserById(2);
    console.log('User 2:', user);
    
  } catch (error) {
    console.error('Database error:', error.message);
  }
}

// 7. API Call with Error Handling
async function fetchWithCustomHandling() {
  try {
    console.log('--- Fetch with Custom Handling ---');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Fetched data:', data);
    
  } catch (error) {
    console.error('Custom error handling:', error.message);
  }
}

// 8. Chaining Operations
async function chainedOperations() {
  try {
    console.log('--- Chained Operations ---');
    
    const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const user = await userResponse.json();
    console.log('User:', user.name);
    
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`);
    const posts = await postsResponse.json();
    console.log(`Posts count: ${posts.length}`);
    
    const firstPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}`);
    const postDetails = await firstPost.json();
    console.log('First post title:', postDetails.title);
    
  } catch (error) {
    console.error('Chained operation error:', error);
  }
}

// 9. Rate Limiting dengan Async/Await
async function fetchWithRateLimiting(urls, delayMs = 1000) {
  const results = [];
  
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      results.push(data);
      console.log(`Fetched: ${url}`);
    } catch (error) {
      console.error(`Error fetching ${url}:`, error.message);
    }
    
    await delay(delayMs);
  }
  
  return results;
}

// 10. Retry Logic
async function fetchWithRetry(url, maxRetries = 3, delayMs = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Attempt ${i + 1}/${maxRetries}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      console.log(`Attempt failed, retrying in ${delayMs}ms...`);
      await delay(delayMs);
    }
  }
}

console.log('=== MODULE 4: ASYNC/AWAIT DEMO ===\n');

console.log('1. Basic Async Function:');
getData().then(console.log);

setTimeout(() => {
  console.log('\n2. Fetch with Error Handling:');
  fetchWithTryCatch();
}, 1000);

setTimeout(() => {
  console.log('\n3. Parallel Fetch (faster):');
  fetchParallel();
}, 2000);

setTimeout(() => {
  console.log('\n4. Serial Fetch (slower):');
  fetchSerial();
}, 3000);

setTimeout(() => {
  console.log('\n5. Delayed Greeting:');
  delayedGreeting('Student');
}, 4000);

setTimeout(() => {
  console.log('\n6. Database Operations:');
  databaseOperations();
}, 8000);

setTimeout(() => {
  console.log('\n7. Fetch with Custom Error Handling:');
  fetchWithCustomHandling();
}, 9000);

setTimeout(() => {
  console.log('\n8. Chained Operations:');
  chainedOperations();
}, 10000);

setTimeout(() => {
  console.log('\n9. Rate Limited Fetch:');
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];
  fetchWithRateLimiting(urls, 1500).then(results => {
    console.log('All results:', results.map(r => r.title));
  });
}, 11000);

setTimeout(() => {
  console.log('\n10. Fetch with Retry:');
  fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1', 2, 500)
    .then(data => console.log('Success:', data.title))
    .catch(error => console.error('Failed after retries:', error.message));
}, 13000);
