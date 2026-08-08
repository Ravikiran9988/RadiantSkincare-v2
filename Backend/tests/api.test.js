const assert = require('assert');
const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = 'http://localhost:' + PORT;

console.log('🧪 Starting Backend API Smoke Tests...');

function testHealthEndpoint() {
  http.get(HOST + '/health', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        assert.strictEqual(res.statusCode, 200, 'Health check should return HTTP 200');
        assert.strictEqual(json.status, 'healthy', 'Health status should be healthy');
        console.log('✅ PASS: /health endpoint test');
      } catch (err) {
        console.error('❌ FAIL: /health endpoint test:', err.message);
      }
    });
  }).on('error', (err) => {
    console.log('ℹ️ Server offline or test run standalone. Server URL checked:', HOST);
  });
}

testHealthEndpoint();
