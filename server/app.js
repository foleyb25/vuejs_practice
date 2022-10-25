require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { application } = require('express');

const app = express();
const port = process.env.PORT ? process.env.PORT : 5002
const db_uri = process.env.DB_URI ? process.env.DB_URI : "mongodb+srv://foleyb25:B184you2!!$@cluster0.joeicow.mongodb.net/?retryWrites=true&w=majority"

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("./uploads"));

// database connection
mongoose.connect(db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to the database!"))
.catch((err) => console.log(err))

//Routes prefix
app.use('', require("./routes/routes"));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname+"/dist/"));
    app.get("*", (req,res) => {
        res.sendFile(__dirname+"/dist/index.html")
    })
}

app.listen(port, () => console.log(`server is running at http://localhost:${port}`));