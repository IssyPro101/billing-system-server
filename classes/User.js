class User {
    constructor(id, email, password) {
        this.id = id
        this.email = email;
        this.password = password;
        this.points = 0;
        this.funds = 100;
    }

    getUserPoints() {
        return this.points;
    }

    getUserFunds() {
        return this.funds;
    }

    addUserPoints(points) {
        this.points += points;
        return `${points} points have been given to user. Current Points: ${this.points}`;
    }

    removeUserPoints(points) {
        this.points -= points;
        return `${points} points have removed given to user. Current Points: ${this.points}`;

    }

    addUserFunds(funds) {
        this.funds += funds;
        return `${funds} funds have been given to user. Current Funds: ${this.funds}`;
    }


}


module.exports = User;