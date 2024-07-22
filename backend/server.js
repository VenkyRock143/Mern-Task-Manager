const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const path = require('path');

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use('/api/tasks', require('./routes/taskRoutes'));

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));
  
//     app.get('*', (req, res) =>
//       res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
//     );
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
