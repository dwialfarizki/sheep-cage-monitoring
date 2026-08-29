import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import cors from 'cors'; // Import cors
import routerDev from './routes/index.js'; // Pastikan path benar
// hjhjhjhj

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

// Middleware
app.use(logger('dev')); 
app.use(methodOverride('_method')); 
app.use(cookieParser()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); // Parse JSON payloads

// Configure CORS
const corsOptions = {
  origin: 'https://mfapp-ten.vercel.app', 
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, 
};

app.use(cors(corsOptions)); 
app.options('*', cors(corsOptions)); 

// Middleware to ensure all requests are JSON
app.use((req, res, next) => {
  if (req.headers['content-type']?.includes('application/json')) {
    req.headers['content-type'] = 'application/json';
  }
  next();
});


// Debugging middleware for incoming requests
app.use((req, res, next) => {
  console.log('Headers:', req.headers);
  console.log('Raw Body:', req.rawBody); 
  console.log('Parsed Body:', req.body);
  next();
});

app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString(); 
  }
}));


// Root route
app.get('/', (req, res) => {
  console.log("Root route hit");
  res.send('Hello Main Route. Pergi ke /api/{sensor} jika ingin mengakses konten Modern Farming');
});

// API routes
app.use('/api', routerDev);

// Example POST route with detailed validation and logging
app.post('/api/chip', (req, res) => {
  console.log('Received POST Request:');
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);

  const { id, nama_domba, usia, jenis_kelamin } = req.body;

  // Validate input
  if (!id || !nama_domba || !usia || !jenis_kelamin) {
    console.error('Validation Error: Missing required fields');
    return res.status(400).json({
      error: 'Missing required fields',
      details: { id, nama_domba, usia, jenis_kelamin },
    });
  }

  // Log successful data
  console.log('Data validated successfully:', { id, nama_domba, usia, jenis_kelamin });

  res.status(201).json({
    message: 'Data received successfully',
    data: { id, nama_domba, usia, jenis_kelamin },
  });
});

// Handle errors (optional middleware)
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

// Start server only in development mode
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

// Export for production environments (e.g., Railway or Vercel)
export default app;
