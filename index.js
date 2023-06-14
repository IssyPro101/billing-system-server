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

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    const result = db.createUser(firstName, lastName, email);
    res.send({"message": result});
})

// Add points to user
app.post('/api/points/:id', (req, res) => {

    const id = req.params.id;
    const points = req.body.points;
  
    const user = db.getUser(id);
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
    const items = db.getMenuItems();
    const prices = db.getMenuPrices();

    res.send({
        items,
        prices
    }) 
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})