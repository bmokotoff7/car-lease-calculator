class Car {
    /**
     * Constructs a new Car object
     * @param year - model year of Car
     * @param make - Car maker/manufacturer/brand
     * @param model - Car model name
     * @param trim - trim level of Car
     */
    constructor(year, make, model, trim) {
        this.year = year;
        this.make = make;
        this.model = model;
        this.trim = trim;
    }
}

class LeaseInfo {
    /**
     * Constructs a new LeaseInfo object to hold all information related to a car lease calculation
     * @param car - a new or existing Car object
     * @param msrp - Manufacturer Suggested Retail Price of the car
     * @param netCapCost - the net capitalized cost of the car (negotiated selling price)
     * @param downPayment - the total down payment made on the car
     * @param residualValue - the value of the car at the end of the lease term; represented as a percentage
     * @param moneyFactor - the interest rate on the lease
     * @param leaseTerm - the number of months in the lease
     */
    constructor(car, msrp, netCapCost, downPayment, residualValue, moneyFactor, leaseTerm) {
        this.car = car;
        this.msrp = msrp;
        this.netCapCost = netCapCost;
        this.downPayment = downPayment;
        this.residualValue = residualValue;
        this.moneyFactor = moneyFactor;
        this.leaseTerm = leaseTerm;
    }
}

// create function to calculate adjusted capitalized cost (takes car object as a field)

// create function to convert money factor to an equivalent interest rate

// create a function to calculate the total depreciation

// create a function to calculate the estimated buyout price

// create a function to calculate the monthly depreciation

// create a function to calculate the total rent charge

// create a function to calculate the monthly rent charge

// create a function to calculate the monthly payment

// create a function to calculate total of monthly payments

// create a function to calculate total cost (total cost of monthly payments + down payment)