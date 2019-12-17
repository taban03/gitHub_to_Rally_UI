const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const {body, validationResult} = require('express-validator');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Server running");
});

app.post("/submit", (req, res) => {
    const validation_result = validationResult(req);
    if(validation_result.isEmpty() === true){
        console.log("good")
        //User has filled in all the form fields correctly
    }
    else{
        console.log("bad")
        //User has entered some invalid input values
    }
    // res.json({ success: "Logged In successfully" });
    res.end();
});

const port = process.env.PORT || 8080;

app.listen(port);