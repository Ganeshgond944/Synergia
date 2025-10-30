const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let bookings = [
  {
    id: 1,
    participantName: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    eventName: "Synergia 2025",
    registrationDate: new Date().toISOString()
  },
  {
    id: 2,
    participantName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    eventName: "Synergia 2025",
    registrationDate: new Date().toISOString()
  }
];

let nextId = 3;

// 1. GET /api/bookings 
app.get('/api/bookings', (req, res) => {
  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings
  });
});

// 2. POST /api/bookings 
app.post('/api/bookings', (req, res) => {
  const { participantName, email, phone } = req.body;


  if (!participantName || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Please provide participantName, email, and phone'
    });
  }


  const newBooking = {
    id: nextId++,
    participantName,
    email,
    phone,
    eventName: "Synergia 2025",
    registrationDate: new Date().toISOString()
  };

  bookings.push(newBooking);

  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: newBooking
  });
});

// 3. GET /api/bookings/id
app.get('/api/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const booking = bookings.find(b => b.id === id);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: `Booking with ID ${id} not found`
    });
  }

  res.status(200).json({
    success: true,
    data: booking
  });
});

// 4. PUT /api/bookings/:id
app.put('/api/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { participantName, email, phone } = req.body;

  const bookingIndex = bookings.findIndex(b => b.id === id);

  if (bookingIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Booking with ID ${id} not found`
    });
  }

  if (participantName) bookings[bookingIndex].participantName = participantName;
  if (email) bookings[bookingIndex].email = email;
  if (phone) bookings[bookingIndex].phone = phone;

  res.status(200).json({
    success: true,
    message: 'Booking updated successfully',
    data: bookings[bookingIndex]
  });
});

// 5. DELETE /api/bookings/:id 
app.delete('/api/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const bookingIndex = bookings.findIndex(b => b.id === id);

  if (bookingIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Booking with ID ${id} not found`
    });
  }

  const deletedBooking = bookings.splice(bookingIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Booking cancelled successfully',
    data: deletedBooking
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Synergia Event Booking API',
    endpoints: {
      'GET /api/bookings': 'Get all event bookings',
      'POST /api/bookings': 'Create a new booking',
      'GET /api/bookings/:id': 'Get booking by ID',
      'PUT /api/bookings/:id': 'Update participant details',
      'DELETE /api/bookings/:id': 'Cancel a booking'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Synergia Event Booking API is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});
