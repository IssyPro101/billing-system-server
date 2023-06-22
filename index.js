// Import the necessary dependencies
const express = require('express'); // Express for building the server API
const cors = require('cors') // CORS for cross origin resource sharing
const DB = require("./classes/DB") // Custom class for handling the database

// Initialize the express application
const app = express();

// Set the port for the server
const PORT = 3001;

// Use the CORS middleware to handle cross-origin requests
app.use(cors()); 

// Use Express's built-in JSON parser to handle JSON payload
app.use(express.json())

// Initialize an instance of the DB class
const db = new DB; 

// Define an endpoint to get the count of users
app.get("/api/getUserCount", (request, response) => {
    // Get the count of users from the DB class
    const result = db.getUserCount(); 

    // Send the count of users as a JSON object
    response.send({ "userCount": result }); 
});

// Define an endpoint to get all user data
app.get("/api/getAll", (request, response) => {
    // Get all users from the DB class
    const result = db.getAllUsers(); 

    // Send all user data as a JSON object
    response.send({ "users": result }); 
});

// Define an endpoint to get a specific user based on ID
app.get("/api/getFromId/:userId", (request, response) => {
    // Get the user ID from the request parameters
    const userId = request.params.userId;

    // Get the user based on ID from the DB class
    const result = db.getUser(parseInt(userId));

    // If a user is found, send the user data as a JSON object
    if (result) {
        response.send({ "user": result });
    } else {
        // If a user is not found, send an error with status code 500
        response.status(500);
        response.json({ error: "User not found." });
    }
});

// Define an endpoint to handle user creation or login
app.post('/api/create', (request, response) => {
    // Get password and email from the request body
    const password = request.body.password;
    const email = request.body.email;

    // Get all users from the DB class
    const allUsers = db.getAllUsers();

    // Get the count of users from the DB class
    const userCount = db.getUserCount();

    let user;

    // Check if a user with the same email and password exists
    for (let i = 0; i < userCount; i++) {
        if (allUsers[i].email === email) {
            if (allUsers[i].password === password) {
                user = allUsers[i];
            } else {
                // If password does not match, send an error with status code 500
                response.status(500);
                response.json({ error: "Wrong password." });
                return;
            }
        }
    }

    // If a user is found, send the user data and login method
    if (user) {
        response.send({ "user": user, method: "login" });
    } else {
        // If a user is not found, create a new user and send the user data and signup method
        const result = db.createUser(email, password);
        response.send({ "user": result, method: "signup" });
    }
})

// Define an endpoint to get a user's points
app.get('/api/points/:userId', (request, response) => {
    // Get the user ID from the request parameters
    const userId = request.params.userId;

    // Get the user based on ID from the DB class
    const user = db.getUser(parseInt(userId));

    // If a user is found, send the user's points as a JSON object
    if (user) {
        const result = user.points
        response.send({ "points": result });
    } else {
        // If a user is not found, send an error with status code 500
        response.status(500);
        response.json({ error: "User not found." });
    }
});

// Define an endpoint to get a user's funds
app.get('/api/funds/:userId', (request, response) => {
    // Get the user ID from the request parameters
    const userId = request.params.userId

    // Get the user based on ID from the DB class
    const user = db.getUser(parseInt(userId));

    // If a user is found, get the user's funds and send it as a JSON object
    if (user) {
        const result = user.getUserFunds()
        response.send({ "funds": result });
    } else {
        // If a user is not found, send an error with status code 500
        response.status(500);
        response.json({ error: "User not found." });
    }
})

// Define an endpoint to add funds to a user's account
app.put('/api/funds/:userId', (request, response) => {
    // Get the user ID and points from the request parameters and body
    const userId = request.params.userId
    const points = request.body.points

    // Get the user based on ID from the DB class
    const user = db.getUser(parseInt(userId));

    // If a user is found, get the user's current funds and add the points to it
    if (user) {
        const currentFunds = user.getUserFunds();
        // If adding the points would not exceed $1000, add the funds and send a success message
        if ((currentFunds + points) <= 1000) {
            const result = user.addUserFunds(points)
            response.send({ "message": result });
        } else {
            // If adding the points would exceed $1000, send an error with status code 500
            response.status(500);
            response.json({ error: "Max funds limit of $1000 reached." });
        }
    } else {
        // If a user is not found, send an error with status code 500
        response.status(500);
        response.json({ error: "User not found." });
    }
})

// Define an endpoint to get all menu items
app.get('/api/menu/items', (request, response) => {
    // Get all menu items from the DB class
    const items = db.getMenuItems();

    // Send all menu items as a JSON object
    response.send({ items })
});

// Define an endpoint to get required points for discounts
app.get('/api/requiredPoints', (request, response) => {
    // Get the required points for discounts from the DB class
    const requiredPoints = db.getRequiredPoints();

    // Send the required points for discounts as a JSON object
    response.send({ requiredPoints })
});

// Define an endpoint to get the points gained per order
app.get('/api/order/points', (request, response) => {
    // Get the points per order from the DB class
    const points = db.getPointsPerOrder();

    // Send the points per order as a JSON object
    response.send({ "points": points })
})

// Define an endpoint to submit an order
app.post('/api/order/create', (request, response) => {
    // Get the user ID, item, discount and current date from the request body and Date function
    const userId = request.body.userId;
    const item = request.body.item;
    const discount = request.body.discount;
    const date = Date.now()

    // Get the user based on ID from the DB class
    const user = db.getUser(parseInt(userId));

    // If the order uses a discount
    if (discount) {
        // Get the user's points and the required points for discounts
        const userPoints = user.getUserPoints();
        const requiredPoints = db.getRequiredPoints();
    
        // If the user has enough points for the discount, create the order and send the order as a JSON object
        if (userPoints >= requiredPoints[discount]) {
            const order = db.createOrder(userId, item, date, discount);
            response.send({ "order": order });
        } else {
            // If the user does not have enough points, send an error with status code 500
            response.status(500);
            response.json({ error: "Not enough points for discount." });
        }
    } else {
        // If the order does not use a discount, create the order and send the order as a JSON object
        const order = db.createOrder(userId, item, date, discount);
        response.send({ "order": order });
    }
})

// Define an endpoint to get a user's orders
app.get('/api/order/:userId', (request, response) => {
    // Get the user ID from the request parameters
    const userId = request.params.userId;

    // Get the user's orders from the DB class
    const orders = db.getUserOrders(userId);

    // Send the user's orders as a JSON object
    response.send({ "userOrders": orders });
})

// Start the server and log a success message
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
