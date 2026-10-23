const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// In-memory array storing grievance records
let complaints = [
  {
    id: 101,
    college: "ABC Institute of Technology",
    category: "Fee Issues",
    description: "Extra fee demanded without receipt",
    status: "Pending"
  },
  {
    id: 102,
    college: "Thiagarajar College of Engineering",
    category: "Hostel/Infrastructure",
    description: "food in hostel is too oily",
    status: "Pending"
  }
];

// Helper counter for auto-incrementing Ticket IDs
let nextId = 103;

// 1. GET all complaints (Used by dashboard.html)
app.get('/api/complaints', (req, res) => {
  res.json(complaints);
});

// 2. POST new complaint (Used by index.html submission form)
app.post('/api/complaints', (req, res) => {
  const { college, category, description } = req.body;

  if (!college || !description) {
    return res.status(400).json({ error: 'College and description are required.' });
  }

  const newComplaint = {
    id: nextId++,
    college,
    category: category || 'General',
    description,
    status: 'Pending'
  };

  complaints.push(newComplaint);
  console.log(`[NEW COMPLAINT RECEIVED] Ticket #${newComplaint.id} - ${newComplaint.college}`);

  res.status(201).json({
    success: true,
    message: 'Complaint registered successfully',
    ticket_id: newComplaint.id,
    complaint: newComplaint
  });
});

// 3. PATCH mark as resolved (Used by dashboard action button)
app.patch('/api/complaints/:id/resolve', (req, res) => {
  const { id } = req.params;
  const complaint = complaints.find(c => String(c.id) === String(id));

  if (!complaint) {
    return res.status(404).json({ error: 'Complaint not found.' });
  }

  complaint.status = 'Resolved';
  console.log(`[STATUS UPDATED] Ticket #${complaint.id} marked as Resolved.`);

  res.json({
    success: true,
    message: 'Status updated to Resolved',
    complaint
  });
});

// Start the Express server on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
  console.log(`=========================================`);
  console.log(`AICTE Backend Server running on port ${PORT}`);
  console.log(`Access locally: http://localhost:${PORT}/api/complaints`);
  console.log(`Access across LAN: http://192.168.1.228:${PORT}/api/complaints`);
  console.log(`=========================================`);
});