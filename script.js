/**
 * DOM Elements
 */
// car-info
const carInfoDiv = document.getElementById("car-info-div");
const carYearEl = document.getElementById("car-year");
const carMakeEl = document.getElementById("car-make");
const carModelEl = document.getElementById("car-model");
const carTrimEl = document.getElementById("car-trim");
// price-info
const msrpEl = document.getElementById("msrp");
const netCapCostEl = document.getElementById("net-cap-cost");
const downPaymentEl = document.getElementById("down-payment");
const residualValueEl = document.getElementById("residual-value");
const moneyFactorEl = document.getElementById("money-factor");
const leaseTermEl = document.getElementById("lease-term");
const annualMileageEl = document.getElementById("annual-mileage");
const taxRateEl = document.getElementById("tax-rate");
// calculate-buttons
const calculatePaymentBtn = document.getElementById("calculate-payment-btn");
// monthly-payment-info
const monthlyPaymentEl = document.getElementById("monthly-payment");
const showDetailedInfoBtn = document.getElementById("show-detailed-info-btn");
// detailed-payment-info

/**
 * Car Class
 */
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
} // Car

/**
 * LeaseInfo Class
 */
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
     * @param annualMileage - mileage allowance per year for the lease
     * @param taxRate - tax rate on lease payments
     */
    constructor(car, msrp, netCapCost, downPayment, residualValue, moneyFactor, leaseTerm, annualMileage, taxRate) {
        /**
         * Fields provided by user input
         */
        this.car = car;
        this.msrp = msrp;
        this.netCapCost = netCapCost;
        this.downPayment = downPayment;
        this.residualValue = residualValue;
        this.moneyFactor = moneyFactor;
        this.leaseTerm = leaseTerm;
        this.annualMileage = annualMileage;
        this.taxRate = taxRate;
        /**
         * Fields provided by calculation functions
         */
        this.adjCapCost = null;
        this.equivInterestRate = null;
        this.buyoutPrice = null;
        this.totalDepreciation = null;
        this.totalRentCharge = null;
        this.totalMonthlyPayments = null;
        this.totalLeaseCost = null;
        this.monthlyPayment = null;
        this.monthlyDepreciation = null;
        this.monthlyRentCharge = null;
    }

    /**
     * Calculates the adjusted capitalized cost of the car
     * @param netCapCost - net capitalized cost of the car (negotiated selling price)
     * @param downPayment - the total down payment made on the car
     */
    calculateAdjCapCost(netCapCost, downPayment) {
        this.adjCapCost = netCapCost - downPayment;
    }

    /**
     * Calculates the equivalent conventional interest rate on the lease, as a percentage
     * @param moneyFactor - interest rate on the lease
     */
    calculateEquivalentInterestRate(moneyFactor) {
        this.equivInterestRate = moneyFactor * 2400;
    }

    /**
     * Calculates the estimated buyout price of the car at the end of the lease term (residual value in cash)
     * @param msrp - Manufacturer Suggested Retail Price of the car
     * @param residualValue - the value of the car at the end of the lease term; represented as a percentage
     */
    calculateBuyoutPrice(msrp, residualValue) {
        this.buyoutPrice = msrp * residualValue;
    }

    /**
     * Calculates the total depreciation of the car over the lease term
     * @param adjCapCost - adjusted capitalized cost of the car
     * @param buyoutPrice - the estimated buyout price of the car at the end of the lease term (residual value in cash)
     */
    calculateTotalDepreciation(adjCapCost, buyoutPrice) {
        this.totalDepreciation = adjCapCost - buyoutPrice;
    }

    /**
     * Calculates the monthly depreciation of the car over the lease term
     * @param totalDepreciation - the total depreciation of the car over the lease term
     * @param leaseTerm - the number of months in the lease
     */
    calculateMonthlyDepreciation(totalDepreciation, leaseTerm) {
        this.monthlyDepreciation = totalDepreciation / leaseTerm;
    }

    /**
     * Calculates the monthly rent charge (finance fee) for the lease
     * @param adjCapCost - adjusted capitalized cost of the car
     * @param buyoutPrice - the estimated buyout price of the car at the end of the lease term (residual value in cash)
     * @param moneyFactor - interest rate on the lease
     */
    calculateMonthlyRentCharge(adjCapCost, buyoutPrice, moneyFactor) {
        this.monthlyRentCharge = (adjCapCost + buyoutPrice) * moneyFactor;
    }

    /**
     * Calculates the total rent charge (finance fee) for the lease
     * @param monthlyRentCharge - the monthly rent charge (finance fee) for the lease
     * @param leaseTerm - the number of months in the lease
     */
    calculateTotalRentCharge(monthlyRentCharge, leaseTerm) {
        this.totalRentCharge = monthlyRentCharge * leaseTerm;
    }

    //TODO: add tax rate into calculation
    //TODO: add price adj. based on mileage allowance
    /**
     * Calculates the cost of a monthly payment for the lease
     * @param monthlyDepreciation - total depreciation of the car per month
     * @param monthlyRentCharge - total rent charge on the lease per month
     */
    calculateMonthlyPayment(monthlyDepreciation, monthlyRentCharge) {
        this.monthlyPayment = monthlyDepreciation + monthlyRentCharge;
    }

    /**
     * Calculates the total cost of all monthly payments for the lease
     * @param monthlyPayment - monthly payment made on the lease
     * @param leaseTerm - the number of months in the lease
     */
    calculateTotalMonthlyPayments(monthlyPayment, leaseTerm) {
        this.totalMonthlyPayments = monthlyPayment * leaseTerm;
    }

    /**
     * Calculates the total cost of the lease (monthly payment total + down payment)
     * @param totalMonthlyPayments - the total cost of all monthly payments for the lease
     * @param downPayment - the total down payment made on the car
     */
    calculateTotalLeaseCost(totalMonthlyPayments, downPayment) {
        this.totalLeaseCost = totalMonthlyPayments + downPayment;
    }
} // LeaseInfo

/**
 * Handler for "Calculate Payment" button clicks
 */
calculatePaymentBtn.addEventListener("click", function() {
    var myCar = new Car(carYearEl.value, carMakeEl.value, carModelEl.value, carTrimEl.value);
    carInfoDiv.innerHTML +=
    `<p>${myCar.year} ${myCar.make} ${myCar.model} ${myCar.trim}</p>`;
});