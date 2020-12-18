const express=require('express');
const app=express();
var formidable = require("express-formidable");
const cors = require("cors");
const javascript = require("./langs/javascript");

app.use(cors());
app.use(formidable());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.get('/api',(req,res)=>{
	res.send("Hello from express");
})


app.post('/api/code', (req, res) => {
	const newData=req.fields.jscode;
	console.log("in the server");
	javascript.runCode(newData,function(data){
		console.log(data);
		res.json(data);
	})	
	// res.send(newData);
  });


app.listen(3001);
