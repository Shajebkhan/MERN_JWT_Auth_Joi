
const express = require('express');
const cors = require('cors');   // don't forget this
const app = express();
require('dotenv').config();
require('./models/db')
const authRouter = require("./routes/AuthRouter");
const prodRoute = require("./routes/ProductRouter")

const PORT = process.env.PORT || 8080;

app.use(express.json());   // replaces bodyparser.json()
app.use(cors());           // allow cross-origin requests
app.use('/auth', authRouter)
app.use('/products', prodRoute)


app.get('/ping', (req, res) => {
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on ${PORT}`);
});
