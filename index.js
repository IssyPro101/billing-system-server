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
    const result = db.getUser(parseInt(id));
    if (result) {
        res.send({"user": result, "id": id});
    } else {
        res.status(500);
        res.json({ error: "User not found." });
    }

});

// Route to login or signup
app.post('/api/create', (req, res) => {

    const password = req.body.password;
    const email = req.body.email;

    const allUsers = db.getAllUsers();
    const userCount = db.getUserCount();
    let user;
    for (let i = 0; i < userCount; i++) {
        if (allUsers[i].email === email) {
            if (allUsers[i].password === password) {
                user = allUsers[i];
            } else {
                res.status(500);
                res.json({ error: "Wrong password." });
                return;
            }

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

// Get points of user
app.get('/api/points/:id', (req, res) => {

    const id = req.params.id;
  
    const user = db.getUser(parseInt(id));
    if (user) {
        const result = user.points
        res.send({"points": result});
    } else {
        res.status(500);
        res.json({ error: "User not found." });
    }


});

// Get user funds
app.get('/api/funds/:id', (req, res) => {
    const id = req.params.id

    const user = db.getUser(parseInt(id));
    if (user) {
        const result = user.getUserFunds()
        res.send({"funds": result});
    } else {
        res.status(500);
        res.json({ error: "User not found." });
    }
})

// Add user funds
app.put('/api/funds/:id', (req, res) => {
    const id = req.params.id
    const points = req.body.points

    const user = db.getUser(parseInt(id));
    if (user) {
        const currentFunds = user.getUserFunds();
        if ((currentFunds + points) <= 1000) {
            const result = user.addUserFunds(points)
            res.send({"message": result});
        } else {
            res.status(500);
            res.json({ error: "Max funds limit of $1000 reached." });    
        }

    } else {
        res.status(500);
        res.json({ error: "User not found." });
    }
})

// Get all menu items
app.get('/api/menu/items', (req, res) => {
    const items = db.getMenuItems();

    res.send({
        items
    }) 
});

// Get required points
app.get('/api/requiredPoints', (req, res) => {
    const requiredPoints = db.getRequiredPoints();

    res.send({
        requiredPoints
    }) 
});

// Get points per order
app.get('/api/order/points', (req, res) => {
    const points = db.getPointsPerOrder();
    res.send({
        "points": points
    }) 
})

// Submit order
app.post('/api/order/create', (req, res) => {

    const userId = req.body.userId;
    const item = req.body.item;
    const discount = req.body.discount;
    const date = Date.now()

    const order = db.createOrder(userId, item, date, discount);
    res.send({"order": order});


})

// Get user orders
app.get('/api/order/:id', (req, res) => {

    const userId = req.params.id;

    const orders = db.getUserOrders(userId);
    res.send({"userOrders": orders});


})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})