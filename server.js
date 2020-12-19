const express = require("express");
const app = express();
var formidable = require("express-formidable");
const cors = require("cors");
const javascript = require("./langs/javascript");
const python = require("./langs/python");

app.use(cors());
app.use(formidable());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.send("Hello from express");
});

app.post("/api/code", (req, res) => {
  const newData = req.fields.code;
  const lang = req.fields.lanauge;
  console.log("in the server");
  if (lang == "javascript") {
    javascript.runCode(newData, function (data) {
      //console.log(data);
      res.status(200).json(data);
    });
  }
  if(lang == "python"){
    console.log("in the python shit");
    python.runCode(newData, function (data) {
      //console.log(data);
      res.status(200).json(data);
    });
  }

  // res.send(newData);
});

app.listen(3001);
