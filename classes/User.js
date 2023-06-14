class User {
    constructor(id, email, password) {
        this.id = id
        this.password = password;
        this.email = email;
        this.points = 0;
    }

    getUserPoints() {
        return this.points;
    }

    addUserPoints(points) {
        this.points += points;
        return `${points} points have been given to user. Current Points: ${this.points}`;
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