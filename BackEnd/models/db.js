const mongoose = require('mongoose');


const mongo_url = process.env.DB_URL;

mongoose.connect(mongo_url)
    .then(() => {
        console.log("mongoDB connected to compass");
    }).catch((err) => {
        console.log("mongoDB connection failed", err);
    })