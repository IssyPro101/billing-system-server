const express = require('express');
const cors = require('cors')
const DB = require("./classes/DB")
const app = express();

const PORT = 3001;
app.use(cors());
app.use(express.json())

const db = new DB;

// Route to get user count
app.get("/api/getUserCount", (req, res) => {
    const result = db.getUserCount();
    res.send({"userCount": result});
});

// Get all user objects
app.get("/api/getAll", (req, res) => {
    const result = db.getAllUsers();
    res.send({"users": result});
});

// Route to get user
app.get("/api/getFromId/:id", (req, res) => {

    const id = req.params.id;
    const result = db.getUser(id);
    if (result) {
        res.send({"user": result, "id": id});
    } else {
        res.status(500);
        res.json({ error: "User not found." });
    }

});

// Route to add user
app.post('/api/create', (req, res) => {

    const password = req.body.password;
    const email = req.body.email;

    const allUsers = db.getAllUsers();
    const userCount = db.getUserCount();
    let user;
    for (let i = 0; i < userCount; i++) {
        console.log(allUsers[i])
        if (allUsers[i].email === email) {
            user = allUsers[i];
        }
    }

    if (user) {
        res.send({"user": user, method: "login"});
    } else {
        const result = db.createUser(
            email,
            password
        );
        res.send({"user": result, method: "signup"});
    }


})

// Add points to user
app.put('/api/points/:id', (req, res) => {

    const id = req.params.id;
    const points = req.body.points;

    const user = db.getUser(parseInt(id));
    const result = user.addUserPoints(points)
    res.send({"message": result});

});

// Get points of user
app.get('/api/points/:id', (req, res) => {

    const id = req.params.id;
    const points = req.body.points;
  
    const user = db.getUser(id);
    const result = user.getUserPoints(points)
    res.send({"points": result});

});

// Get all menu items
app.get('/api/menu/items', (req, res) => {
    const items = db.getMenuItems();;

    res.send({
        items
    }) 
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})