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

// 1. GET API: Send all complaints to frontend
app.get('/api/complaints', (req, res) => {
  res.json(complaints);
});

// 2. POST API: Receive new complaint from frontend
app.post('/api/complaints', (req, res) => {
  const newComplaint = {
    id: complaints.length + 101,
    college: req.body.college,
    category: req.body.category,
    description: req.body.description,
    status: "Pending"
  };
  complaints.push(newComplaint);
  res.json({ success: true, ticket_id: newComplaint.id });
});

// Listen on all network interfaces
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
});