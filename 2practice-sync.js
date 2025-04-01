const path= require("path")
const fs = require("fs");
const fileName = "text.txt";
const filePath = path.join(__dirname, fileName);

//Write Data
fs.writeFile(filePath,"This is a initial text", 'utf-8', (err) => {
    if(err) console.log(err);
    else
        console.log("File written successfully");
});

//Read Data
fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err) console.log(err);
    else
        console.log(data);
});

//Append Data
fs.appendFile(filePath,"\nThis is a updated text", 'utf-8', (err) => {
    if(err) console.log(err);
    else
        console.log("File Updated Successfully");
});

//Delete File
fs.unlink(filePath,(err) => {
    if(err) console.log(err);
    else
        console.log("File Deleted successfully");
});