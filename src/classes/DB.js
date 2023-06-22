// Import User class
const User = require("./User");

// Import Order class
const Order = require("./Order");

// Import JSON data of menu items
const menuItems = require("../data/menu-items.json");

// Define a class DB for handling all database operations
class DB {
    constructor() {
        // Initialize an empty object for users
        this.users = {};

        // Initialize a counter for the number of users
        this.userCount = 0;

        // Initialize a counter for the number of orders
        this.orderCount = 0;

        // Initialize menu items from the imported JSON file
        this.menuItems = menuItems;

        // Initialize an object for required points for discount percentages
        this.requiredPoints = {
            5: 10,
            10: 20,
            20: 50
        }

        // Initialize points gained per order
        this.pointsPerOrder = 5;

        // Initialize an empty object for orders
        this.orders = {}
    }

    // Method to get the user count
    getUserCount() {
        return this.userCount;
    }

    // Method to create a new user
    createUser(email, password) {
        // Create a new User instance
        const newUser = new User(this.userCount, email, password)
        // Get the current user count as the user ID
        const userId = this.userCount;
        // Add the new user to the users object
        this.users[userId] = newUser;
        // Initialize an empty array for the user's orders
        this.orders[userId] = []
        // Increment the user count
        this.userCount += 1;
        // Return the new user
        return newUser;
    }

    // Method to get a user by ID
    getUser(id) {
        return this.users[id];
    }

    // Method to get all users
    getAllUsers() {
        return this.users;
    }

    // Method to get all menu items
    getMenuItems() {
        return this.menuItems;
    }

    // Method to get the required points for discounts
    getRequiredPoints() {
        return this.requiredPoints;
    }

    // Method to add a new order
    addOrder(item, userId, date, price, discount) {
        // Create a new Order instance
        const newOrder = new Order(this.orderCount, item, userId, date, price, discount)
        // Add the new order to the user's orders
        this.orders[userId].push(newOrder)
        // Increment the order count
        this.orderCount += 1;
        // Return the new order
        return newOrder;
    }

    // Method to create a new order
    createOrder(userId, item, date, discount) {
        // If the order uses a discount
        if (discount) {
            // Calculate the discounted price
            const discountedPrice = item.price - (item.price * discount / 100);
            // Deduct the discounted price from the user's funds
            this.users[userId].funds -= discountedPrice;
            // Remove the required points from the user
            this.users[userId].removeUserPoints(this.requiredPoints[discount]);

            // Add the order to the user's orders
            const newOrder = this.addOrder(item, userId, date, discountedPrice, discount)
            return newOrder;

        } else {
            // If the order does not use a discount, deduct the price from the user's funds
            this.users[userId].funds -= item.price;
            // Add the points gained per order to the user
            this.users[userId].addUserPoints(this.pointsPerOrder);

            // Add the order to the user's orders
            const newOrder = this.addOrder(item, userId, date, item.price, discount)
            return newOrder;

        }
    }

    // Method to get a user's orders
    getUserOrders(userId) {
        return this.orders[userId]
    }

    // Method to get the points gained per order
    getPointsPerOrder() {
        return this.pointsPerOrder;
    }
}

// Export the DB class
module.exports = DB;
