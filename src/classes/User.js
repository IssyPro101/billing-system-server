// Define a class User to represent a user
class User {
    // Define the constructor for the class
    constructor(id, email, password) {
        // The id of the user
        this.id = id;

        // The email of the user
        this.email = email;

        // The password of the user.
        this.password = password;

        // Initialize the user's points to 0
        this.points = 0;

        // Initialize the user's funds to 100
        this.funds = 100;
    }

    // Method to get the user's points
    getUserPoints() {
        return this.points;
    }

    // Method to get the user's funds
    getUserFunds() {
        return this.funds;
    }

    // Method to add points to the user
    addUserPoints(points) {
        // Add the points to the user's current points
        this.points += points;

        // Return a message indicating the points have been added
        return `${points} points have been given to user.`;
    }

    // Method to remove points from the user
    removeUserPoints(points) {
        // Subtract the points from the user's current points
        this.points -= points;

        // Return a message indicating the points have been removed
        return `${points} points have removed given to user.`;

    }

    // Method to add funds to the user
    addUserFunds(funds) {
        // Add the funds to the user's current funds
        this.funds += funds;

        // Return a message indicating the funds have been added
        return `${funds} funds have been given to user.`;
    }

    // Set user funds to 1000
    setFundsTo1000() {
        // Add the points to the user's current points
        this.funds = 1000;

        // Return a message indicating the points have been added
        return `User now has 1000 funds.`;
    }
}

// Export the User class so it can be used in other files
module.exports = User;
