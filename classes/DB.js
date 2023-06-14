
const User = require("./User");

class DB {
    constructor() {
        this.users = {};
        this.userCount = 0;
        this.menuItems = ["Chicken", "Beef", "Rice"];
        this.menuPrices = [6,8,9];
    }

    getUserCount() {
        return this.userCount;
    }

    createUser(first_name, last_name, email) {
        const user = new User(this.userCount, first_name, last_name, email);
        const userId = this.userCount;
        this.users[userId] = user;
        this.userCount += 1;
        return `User with id ${userId} has been created.`;
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

    getMenuPrices() {
        return this.menuPrices;
    }
}

module.exports = DB;