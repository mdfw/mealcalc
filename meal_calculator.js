var taxrate = 0.08;

var Dish = function(description, cost) {
    this.desc = description;
    this.cost = cost;
}
/* 
A diner object with:
    * Name
    * list of dishes (what they ate, and how much it cost)
    * A method to add the total of the dishes
    * A method to calculate tax for this diner
    * A method to calculate the tip for this diner
*/
var Diner = function(name, dishes, tip_percentage){
    this.name = name;
    this.dishes = dishes;
    this.tip_percentage = tip_percentage;
}

Diner.prototype.dishes_total = function() {
    var total_cost = 0;
    this.dishes.forEach(function(dish){
        total_cost = total_cost + dish.cost;
    })
    return total_cost;
}

Diner.prototype.tax_amount = function(diners_taxrate) {
    return this.dishes_total() * diners_taxrate;
}

Diner.prototype.tip_amount = function() {
    return this.dishes_total() * this.tip_percentage;
}
/*
A bill object with:
    * list of diners
    * method to total and print the total of all diners, including tax
    * method to total and print diners tips
    * method to print a breakdown for each diner including their name, total, tax and tip
*/
var Bill = function(diners) {
    this.diners = diners;
}

Bill.prototype.total = function() {
    var bill_total = 0;
    this.diners.forEach(function(this_diner) {
        bill_total = bill_total + this_diner.dishes_total() + this_diner.tax_amount(taxrate);
    });
    return bill_total;
}

Bill.prototype.print_total = function() {
    console.log("The total bill is $" + this.total() + ".");
    
}
Bill.prototype.print_tips = function() {
    this.diners.forEach(function(this_diner) {
        console.log( this_diner.name + " tips $" + this_diner.tip_amount() + ".");
    });
}
Bill.prototype.print_breakdown = function() {
    this.diners.forEach(function(this_diner) {
        var ate = this_diner.dishes[0].desc + "($" + this_diner.dishes[0].cost + ") and " + this_diner.dishes[1].desc + "($" + this_diner.dishes[1].cost + ")" ;
        console.log( this_diner.name + " ate " + ate + " - Total: $" + this_diner.dishes_total() + ", Tax: $" + this_diner.tax_amount(taxrate) + ", Tip $" + this_diner.tip_amount() + ".");
    });
}

/*
Dummy data that creates:
    * 1 bill
    * 3 diners that are on the same bill
    * 2 dishes for each diner
*/
var avo = new Dish("Avocado Dip", 6.79);
var hummus = new Dish("Hummus", 4.99);
var fajitas = new Dish("Fajitas", 10.79);
var enchiladas = new Dish("Chicken Enchiladas", 10.69);
var mahi = new Dish("Mahi Mahi", 11.79);
var taco = new Dish("Fish Tacos", 7.99);

var david = new Diner("David", [avo,fajitas], 0.18);
var jackson = new Diner("Jackson", [hummus, enchiladas], 0.21);
var fariq = new Diner("Fariq", [mahi, taco], 0.20);

var their_bill = new Bill([david,jackson,fariq]);
their_bill.print_total();
their_bill.print_tips();
their_bill.print_breakdown();

/*
Output:
    * Print the total for the bill
    * Print the total tip for the waitress
    * Print a breakdown for each person
*/