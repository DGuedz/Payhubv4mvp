const http = require('http');

const PORT = 3001;

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = req.url;
  
  // Helper to send JSON
  const sendJson = (data) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'POST') {
    if (url === '/api/trustline-rlusd') {
      return sendJson({ txHash: 'MOCK_TX_HASH_TRUSTLINE', sequence: 1001 });
    }
    if (url === '/api/escrow-create') {
      return sendJson({ 
        owner: 'rMOCK_OWNER_ADDRESS', 
        offerSequence: 2002, 
        txHash: 'MOCK_TX_HASH_ESCROW_CREATE' 
      });
    }
    if (url === '/api/escrow-finish') {
      return sendJson({ txHash: 'MOCK_TX_HASH_ESCROW_FINISH', sequence: 3003 });
    }
    if (url === '/api/v1/merchant/yield/activate') {
      return sendJson({ status: 'ACTIVE' });
    }
  }

  if (req.method === 'GET') {
    if (url === '/api/security/alerts') {
      return sendJson({ alerts: [] });
    }
  }

  // Not found
  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`Mock Gateway running on port ${PORT}`);
});
