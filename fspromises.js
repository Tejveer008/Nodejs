const fs = require("fs/promises");
const path = require("path");

const fileName ='fsPromises.txt';
const filePath =path.join(__dirname, fileName);
 const file = __dirname;


// fs
// .readdir(file)
// .then((data) => console.log(data))
// .catch((err) =>console.error(err));


// const filePath1 = __dirname;
// fs.readdir(filePath1)
// .then((data)=> console.log(data))
// .catch((err)=>console.log(err));

// <-------------------------------------------------------------->
// fs.writeFile(filePath,"Hello Their I'm Promises!","utf-8")
// .then(console.log("File Created Successfully!"))
// .catch((err)=>console.log(err));

// fs.promises.readFile(filePath,"utf-8")
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err));

// fs.appendFile(filePath,"\nThis is a updated text.","utf-8")
// .then(console.log("File Updated Successfully!"))
// .catch((err)=>console.log(err));

// fs.unlink(filePath,"utf-8")
// .then(console.log("Deleted Successfully!"))
// .catch((err)=>console.log(err));