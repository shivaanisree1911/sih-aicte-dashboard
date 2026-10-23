const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory list to store complaints for the demo
let complaints = [
  {
    id: 101,
    college: "ABC Institute of Technology",
    category: "Fee Issues",
    description: "Extra fee demanded without receipt",
    status: "Pending"
  }
];

// GET endpoint to fetch complaints
app.get('/api/complaints', (req, res) => {
  res.json(complaints);
});

// POST endpoint to add a new complaint
app.post('/api/complaints', (req, res) => {
  const newComplaint = {
    id: complaints.length + 101,
    ...req.body,
    status: "Pending"
  };
  complaints.push(newComplaint);
  res.status(201).json(newComplaint);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});