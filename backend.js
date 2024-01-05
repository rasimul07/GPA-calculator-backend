const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
const DATABASE = process.env.DATABASE

console.log(typeof(DATABASE));
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors');
app.use(express.json());
app.use(cors());

const userRouter = require('./routes/user');
app.use('/user', userRouter);


mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})