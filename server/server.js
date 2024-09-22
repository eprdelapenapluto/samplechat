const io = require("socket.io")(3000, {
    cors: {
        origin: "http://localhost:3001", methods: [
        "GET",
        "POST", 
        ]
    }
}) //1. the server is running on port 3000 and the origin the client side is running on localhost:3001

io.on("connection", (socket) => {
    console.log("A user is connected");
    socket.on("message", (message, roomName) => {
        console.log(message, roomName);
        io.emit("message", message); // this runs message event and gets message variable to be send on all the clients connected to this server
    })
})

console.log("hello");