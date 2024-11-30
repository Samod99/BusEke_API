const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to BusEke API')
})


mongoose.connect('mongodb+srv://admin:admin01@cluster0.4zsmx.mongodb.net/BusEkeDB?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('successfully connected')
    app.listen(3000, () => {
        console.log('Port is 3000')
    });
}).catch((error) => {
    console.log(error)
})