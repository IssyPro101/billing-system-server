// Define a class Order to represent an order
class Order {
    // Define the constructor for the class
    constructor(id, item, user, date, price, discount) {
        // The id of the order
        this.id = id;

        // The item ordered.
        this.item = item;

        // The user object of who placed the order
        this.user = user;

        // The date the order was placed
        this.date = date;

        // The price of the order.
        this.price = price;

        // The discount applied to the order. For example is 5, then 5%
        this.discount = discount;
    }
}

// Export the Order class so it can be used in other files
module.exports = Order;
