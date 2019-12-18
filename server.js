const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const {body, validationResult} = require('express-validator');
const fs = require('fs')
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
    fs.writeFile("./test.txt", JSON.stringify(req.body), function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
    // res.json({ success: "Logged In successfully" });
    res.end();
});

const port = process.env.PORT || 8080;

app.listen(port);