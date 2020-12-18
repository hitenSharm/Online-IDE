const fs = require("fs");
const { v1: uuidv1, validate } = require("uuid");
const exec = require("child_process").exec;

const validateCode = (code) =>{
    wordsLike = ["require(", "exports.", "module.exports"];
    var validate=!wordsLike.some((shit) => {
        return code.includes(shit);
      });

      return validate;
}

const coderunner =(code,func) =>{
    console.log(code);
    if(validateCode(code)){
        var fileName=uuidv1();
        var realFile=fileName+ ".js";
        fs.writeFile(realFile, code, function (err) {
            if (err){
                console.log(err);           
            }
            else{
               var command="node "+realFile;
               exec(command,{timeout: 5000, maxBuffer: 50000},(err, stdout, stderr) =>{
                   if(err){                   
                    console.error(`exec error: ${err}`);
                    console.log("stderr : ",stderr);
                    var msg=err.toString();
                    if(err.toString().includes("ERR_CHILD_PROCESS_STDIO_MAXBUFFER")){
                        msg="maxBuffer exceeded.there may be an infinite loop!";                        
                    }else{
                        msg=stderr;                       
                    }
                    func({codeoutput:msg},realFile);
                   }else{
                    func({ codeoutput: stdout }, realFile);
                   }

                   
               })
            }
          });    
        
    
    }else{
        func({ stdout: "Not allowed!" }); 
    }
}

const runCode= (code,func) => {
    coderunner(code,function(data , file=null){
        if(file){
            fs.unlink(file,(err)=>{
                if(err)
                console.error(err);
            });
        }
        func(data);
    })
}

module.exports = { runCode: runCode };