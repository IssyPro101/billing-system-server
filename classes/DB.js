
const User = require("./User");

class DB {
    constructor() {
        this.users = {};
        this.userCount = 0;
        this.menuItems = [
            {
                "name": "Chicken",
                "description": "Nice tasting chicken",
                "price": 5
            },
            {
                "name": "Beef",
                "description": "Nice tasting beef",
                "price": 7
            },
            {
                "name": "Rice",
                "description": "Nice tasting rice",
                "price": 9
            }
        ];
    }

    getUserCount() {
        return this.userCount;
    }

    createUser(email, password) {
        const user = new User(this.userCount, email, password);
        const userId = this.userCount;
        this.users[userId] = user;
        this.userCount += 1;
        return user;
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
}

module.exports = DB;