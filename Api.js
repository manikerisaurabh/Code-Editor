const express = require("express");
const app = express();
const compiler = require("compilex");
const bodyP = require("body-parser");
const options = {stats:true};
compiler.init(options);
app.use(bodyP.json());
app.use("/codemirror-5.65.16",express.static("E:/project/Editor/codemirror-5.65.16"));
app.get("/", function(req, res) {
    compiler.flush(function() {
        console.log("deleted");
    })
    res.sendFile("E:/project/Editor/index.html")
});

app.post("/compile", function(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try {
        if(lang == "Cpp" || lang == "C") {
            if(!input) {
                var envData = { OS : "windows", cmd: "g++", options: {timeout:10000}}; 
                compiler.compileCPP( envData , code , function(data){
                    if(data.output) {
                        res.send(data);
                    } else {
                        res.send({output: "Error!!"});
                    }
                }); 
            } else {
                var envData = { OS : "windows", cmd: "g++", options: {timeout:10000}}; 
                compiler.compileCPPWithInput( envData , code , input, function(data){
                    if(data.output) {
                        res.send(data);
                    } else {
                        res.send({output: "Error!!"});
                    }
                }); 
            }
        } else if(lang == "Java") {
            if(!input) {
                var envData = { OS : "windows"}; 
                compiler.compileJava( envData , code , function(data){
                if(data.output) {
                    res.send(data);
                } else {
                    res.send({output: "Error!!"});
                }
                }); 
            }  else {
                var envData = { OS : "windows"}; 
                compiler.compileJavaWithInput( envData , code , input, function(data){
                    if(data.output) {
                        res.send(data);
                    } else {
                        res.send({output: "Error!!"});
                    }
                }); 
            }
        } else if(lang == "Python") {
            if(!input) {
                var envData = { OS : "windows"}; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output) {
                        res.send(data);
                    } else {
                        res.send({output: "Error!!"});
                        

                    }
                }); 
            } else {
                var envData = { OS : "windows"}; 
                compiler.compilePythonWithInput( envData , code , input, function(data){
                    if(data.output) {
                        res.send(data);
                    } else {
                        res.send({output: "Error!!"});
                    }
                }); 
            }
        }
        
    } catch(e) {
        console.log(e);
    }
});

app.listen(8000);


//code": "public class Main {public static void main(String args[]) {System.out.println('hii');}}",