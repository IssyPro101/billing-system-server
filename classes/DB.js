
const User = require("./User");
const Order = require("./Order");

class DB {
    constructor() {
        this.users = {};
        this.userCount = 0;
        this.orderCount = 0;
        this.menuItems = {
            "drinks": [
                {
                    "name": "Fanta",
                    "description": "A soft drink with a tingly, fruity taste",
                    "price": 7
                },
                {
                    "name": "Coke",
                    "description": "A carbonated soft drink ",
                    "price": 15
                },
                {
                    "name": "Sprite",
                    "description": "A lemon and lime-flavoured soft drink",
                    "price": 7
                },
                {
                    "name": "7UP",
                    "description": "Fresh spring 7UP.",
                    "price": 5
                },
                {
                    "name": "Water",
                    "description": "Fresh spring water.",
                    "price": 5
                }
            ],
            "food": [
                {
                    "name": "Chicken",
                    "description": "Nice tasting chicken",
                    "price": 7
                },
                {
                    "name": "Beef",
                    "description": "Nice tasting beef",
                    "price": 15
                },
                {
                    "name": "Rice",
                    "description": "Nice tasting rice",
                    "price": 7
                },
                {
                    "name": "Fries",
                    "description": "Crispy fries.",
                    "price": 5
                },
                {
                    "name": "Pasta",
                    "description": "Slurply noodles.",
                    "price": 11
                }
            ],
            "dessert": [
                {
                    "name": "Ice cream",
                    "description": "Chocolate ice cream.",
                    "price": 7
                },
                {
                    "name": "Chocolate",
                    "description": "Bar of chocolate.",
                    "price": 15
                },
                {
                    "name": "Yoghurt",
                    "description": "Tub of yoghurt.",
                    "price": 7
                },
                {
                    "name": "Jelly",
                    "description": "Strawberry jelly.",
                    "price": 5
                },
                {
                    "name": "Marshmallow",
                    "description": "Marshmallows on a stick.",
                    "price": 11
                }
            ]
        }

        this.requiredPoints = {
            5: 10,
            10: 20,
            20: 50
        }

        this.pointsPerOrder = 5;
        this.orders = {}
    }

    getUserCount() {
        return this.userCount;
    }

    createUser(email, password) {
        const newUser = new User(this.userCount, email, password)
        const userId = this.userCount;
        this.users[userId] = newUser;
        this.orders[userId] = []
        this.userCount += 1;
        return newUser;
    }

    getUser(id) {
        return this.users[id];

    }

    getAllUsers() {
        return this.users;
    }

    getMenuItems() {
        return this.menuItems;
    }

    getRequiredPoints() {
        return this.requiredPoints;
    }

    createOrder(userId, item, date, discount) {

        // Add order to user order list
        const newOrder = new Order(this.orderCount, item, userId, date)
        this.orders[userId].push(newOrder)
        this.orderCount += 1;

        // Deduct funds
        if (discount) {
            const discountedPrice = item.price - (item.price * discount / 100);
            this.users[userId].funds -= discountedPrice;
            if (this.users[userId].points >= this.requiredPoints[discount]) {
                this.users[userId].removeUserPoints(this.requiredPoints[discount]);
            }

        } else {
            this.users[userId].funds -= item.price;
            this.users[userId].addUserPoints(this.pointsPerOrder);
        }


        return newOrder;

    }

    getUserOrders(userId) {
        return this.orders[userId]
    }

    getPointsPerOrder() {
        return this.pointsPerOrder;
    }
}

module.exports = DB;