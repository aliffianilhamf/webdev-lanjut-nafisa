// =========================================
// MODULE 4: EVENT EMITTER PRACTICAL EXAMPLES
// =========================================

const EventEmitter = require('events');

// -----------------------------------------
// 1. Basic Event Emitter
// -----------------------------------------
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

console.log('=== 1. BASIC EVENT EMITTER ===\n');

myEmitter.on('greeting', (name) => {
  console.log(`Hello, ${name}!`);
});

myEmitter.on('greeting', (name) => {
  console.log(`How are you, ${name}?`);
});

myEmitter.emit('greeting', 'Alice');
console.log(`Number of listeners: ${myEmitter.listenerCount('greeting')}\n`);

// -----------------------------------------
// 2. Once Listener (hanya dipanggil sekali)
// -----------------------------------------
console.log('=== 2. ONCE LISTENER ===\n');

const onceEmitter = new EventEmitter();

onceEmitter.once('oneTime', () => {
  console.log('This will only run once!');
});

onceEmitter.emit('oneTime');
onceEmitter.emit('oneTime'); // Tidak akan dijalankan
console.log('Second emit ignored (as expected)\n');

// -----------------------------------------
// 3. File Uploader dengan Event Emitter
// -----------------------------------------
console.log('=== 3. FILE UPLOADER ===\n');

class FileUploader extends EventEmitter {
  constructor() {
    super();
    this.progress = 0;
  }

  upload(file) {
    this.emit('start', file.name);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      this.emit('progress', progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        this.emit('complete', file.name);
      }
    }, 500);
  }
}

const uploader = new FileUploader();

uploader.on('start', (fileName) => {
  console.log(`Starting upload: ${fileName}`);
});

uploader.on('progress', (percent) => {
  const bar = '█'.repeat(percent / 5) + '░'.repeat(20 - percent / 5);
  console.log(`Upload progress: ${bar} ${percent}%`);
});

uploader.on('complete', (fileName) => {
  console.log(`✓ Upload complete: ${fileName}\n`);
});

uploader.upload({ name: 'document.pdf' });

// -----------------------------------------
// 4. Chat Server Simulasi
// -----------------------------------------
setTimeout(() => {
  console.log('=== 4. CHAT SERVER ===\n');
  
  class ChatServer extends EventEmitter {
    constructor() {
      super();
      this.users = [];
      this.messages = [];
    }
    
    joinUser(username) {
      this.users.push(username);
      this.emit('userJoined', username, this.users.length);
    }
    
    leaveUser(username) {
      this.users = this.users.filter(u => u !== username);
      this.emit('userLeft', username, this.users.length);
    }
    
    sendMessage(username, message) {
      const msg = { username, message, time: new Date().toLocaleTimeString() };
      this.messages.push(msg);
      this.emit('message', msg);
    }
  }
  
  const chat = new ChatServer();
  
  chat.on('userJoined', (user, count) => {
    console.log(`[${new Date().toLocaleTimeString()}] User ${user} joined! (Online: ${count})`);
  });
  
  chat.on('userLeft', (user, count) => {
    console.log(`[${new Date().toLocaleTimeString()}] User ${user} left! (Online: ${count})`);
  });
  
  chat.on('message', (msg) => {
    console.log(`[${msg.time}] ${msg.username}: ${msg.message}`);
  });
  
  chat.on('error', (error) => {
    console.error('Chat error:', error.message);
  });
  
  // Simulate chat activity
  chat.joinUser('Alice');
  chat.joinUser('Bob');
  
  setTimeout(() => chat.sendMessage('Alice', 'Hello everyone!'), 300);
  setTimeout(() => chat.sendMessage('Bob', 'Hi Alice!'), 600);
  setTimeout(() => chat.sendMessage('Alice', 'How are you?'), 900);
  setTimeout(() => chat.leaveUser('Bob'), 1200);
  setTimeout(() => chat.sendMessage('Alice', 'Goodbye!'), 1500);
  
}, 3000);

// -----------------------------------------
// 5. Custom Event Emitter untuk Error Handling
// -----------------------------------------
setTimeout(() => {
  console.log('\n=== 5. CUSTOM ERROR HANDLING ===\n');
  
  class SafeEmitter extends EventEmitter {
    constructor() {
      super();
      this.on('error', (err) => {
        console.error('Caught error:', err.message);
      });
    }
    
    doSomething(value) {
      this.emit('error', new Error(`Invalid value: ${value}`));
    }
  }
  
  const safe = new SafeEmitter();
  safe.doSomething(-1);
  
}, 5000);

// -----------------------------------------
// 6. Event Emitter dengan tipe data kompleks
// -----------------------------------------
setTimeout(() => {
  console.log('\n=== 6. COMPLEX DATA EVENTS ===\n');
  
  class DataProcessor extends EventEmitter {
    process(data) {
      console.log('Processing:', data);
      
      this.emit('progress', {
        step: 'parse',
        status: 'success',
        timestamp: Date.now()
      });
      
      this.emit('complete', {
        result: data.map(item => item * 2),
        count: data.length,
        time: Date.now()
      });
    }
  }
  
  const proc = new DataProcessor();
  
  proc.on('progress', (status) => {
    console.log(`Step: ${status.step}, Status: ${status.status}`);
  });
  
  proc.on('complete', (result) => {
    console.log(`Complete: ${result.result.length} items processed`);
    console.log('Result:', result.result);
  });
  
  proc.process([1, 2, 3, 4, 5]);
  
}, 7000);

// -----------------------------------------
// 7. Memory Management: Cleanup Listeners
// -----------------------------------------
setTimeout(() => {
  console.log('\n=== 7. MEMORY MANAGEMENT ===\n');
  
  class TempComponent extends EventEmitter {
    constructor() {
      super();
      this.data = [];
    }
    
    addData(item) {
      this.data.push(item);
      this.emit('dataAdded', item);
    }
    
    destroy() {
      this.removeAllListeners();
      this.data = null;
      console.log('Component destroyed, all listeners removed');
    }
  }
  
  const comp = new TempComponent();
  
  const listener1 = (item) => console.log(`Listener 1: ${item}`);
  const listener2 = (item) => console.log(`Listener 2: ${item}`);
  
  comp.on('dataAdded', listener1);
  comp.on('dataAdded', listener2);
  
  comp.addData('Test item');
  console.log(`Listeners count: ${comp.listenerCount('dataAdded')}`);
  
  // Cleanup
  comp.destroy();
  console.log(`Listeners after destroy: ${comp.listenerCount('dataAdded')}`);
  
}, 9000);

console.log('\nEvent Emitter examples scheduled...');
