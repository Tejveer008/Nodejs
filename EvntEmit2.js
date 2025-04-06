const EventEmitter = require("events");

const emitter = new EventEmitter();


const eventCounts ={

    "user-login":0,
    "user-logout":0,
    "user-purchased":0,
    "profile-updated":0,
};

emitter.on("user-login",(username) =>{
    eventCounts["user-login"]++;
    console.log(`${username} logged in!`);
});

emitter.on("user-logout",(username) =>{
    eventCounts["user-logout"]++;
    console.log(`${username} logout!`);
});

emitter.on("user-purchased",(username,item) =>{
    eventCounts["user-purchased"]++;
    console.log(`${username} purchased ${item}!`);
});

emitter.on("profile-updated",(username,update) =>{
    eventCounts["profile-updated"]++;
    console.log(`${username} updated their ${update}!`);
});

emitter.on("summary",()=>{
    console.log(eventCounts);
});

emitter.emit("user-login","Nodejs");
emitter.emit("user-purchased","Nodejs","Tablet");
emitter.emit("profile-updated","Nodejs","code");
emitter.emit("user-logout","Nodejs");
emitter.emit("summary");