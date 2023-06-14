class User {
    constructor(id, username, password, first_name, last_name, email) {
        this.id = id
        this.username = username;
        this.password = password;
        this.firstName = first_name;
        this.lastLame = last_name
        this.email = email;
        this.points = 0;

    }

    getUserPoints() {
        return this.points;
    }

    addUserPoints(points) {
        this.points += points;
        return `${points} have been given to user. Current Points: ${this.points}`;
    }

    eligibleDiscount() {
        const userPoints = this.points;
        
        if (userPoints >= 10 && userPoints < 25) {
            return 5;
        } else if (userPoints >= 25 && userPoints < 50) {
            return 10
        } else if (userPoints >= 50) {
            return 20
        } else {
            return 0;
        }

    }


}


module.exports = User;