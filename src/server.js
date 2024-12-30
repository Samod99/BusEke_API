require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');
//const User = require('./models/User')
const userRoutes = require('./routes/userRoutes');
const routeRoutes = require('./routes/routeRoutes');
const busRoutes = require('./routes/busRoutes');
const authRoutes = require('./routes/authRoutes');
const timetableRoutes = require('./routes/timetableRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const swaggerSetup = require('./swagger');

app.get('/', (req, res) => {
    res.send('Welcome to BusEke API')
})


app.use(express.json());
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/timetables', timetableRoutes);
app.use('/api/bookings', bookingRoutes);

swaggerSetup(app);

mongoose.connect(process.env.MONGO_DB_URI)
.then(() => {
    console.log('successfully connected')
    app.listen(5000, () => {
        console.log(`API is running on http://localhost:5000`);
        console.log(`Swagger Documentataion running on http://localhost:5000/api-docs`);
    });
}).catch((error) => {
    console.log(error)
})