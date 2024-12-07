const express = require('express')
const mongoose = require('mongoose')
const app = express()
//const User = require('./models/User')
const userRoutes = require('./routes/userRoutes');

app.get('/', (req, res) => {
    res.send('Welcome to BusEke API')
})


app.use(express.json());

app.use('/api/users', userRoutes);

// app.post('/user', async(req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.status(200).json(user);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({message: error.message})
//     }
// })


mongoose.connect('mongodb+srv://admin:admin01@cluster0.4zsmx.mongodb.net/BusEkeDB?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('successfully connected')
    app.listen(3000, () => {
        console.log('Port is 3000')
    });
}).catch((error) => {
    console.log(error)
})