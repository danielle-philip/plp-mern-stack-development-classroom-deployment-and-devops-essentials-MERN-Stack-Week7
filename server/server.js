require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(helmet());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
const todoRoutes = require('./routes/todos');
app.use('/api/todos', todoRoutes);
