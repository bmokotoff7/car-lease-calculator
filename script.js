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
const calculateErrorMessage = document.getElementById("calculate-error-message");
// monthly-payment-info
const monthlyPaymentEl = document.getElementById("monthly-payment");
const detailedInfoBtn = document.getElementById("detailed-info-btn");
// detailed-payment-info
const showHideTestEl = document.getElementById("show-hide-test");

/**
 * Contains all DOM user input elements
 */
const userInputs = [carYearEl,
                    carMakeEl,
                    carModelEl,
                    carTrimEl,
                    msrpEl,
                    netCapCostEl,
                    downPaymentEl,
                    residualValueEl,
                    moneyFactorEl,
                    leaseTermEl,
                    annualMileageEl,
                    taxRateEl];

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


// may need to initialize new cars as array elements...not sure atm
// car info does not update, but lease info does (maybe just an issue with adding it to the HTML?)
    // try adding this into a premade HTML element in the "detailed payment info" div
/**
 * Handler for "Calculate Payment" button clicks
 */
calculatePaymentBtn.addEventListener("click", function() {
    // clear previous error message
    
    // check that all fields are filled (new function)
    
    // keeping as "let" for now, but could these become "const"?
    let myCar = new Car(carYearEl.value, carMakeEl.value, carModelEl.value, carTrimEl.value);
    let myLeaseInfo = new LeaseInfo(myCar, msrpEl.value, netCapCostEl.value, downPaymentEl.value, residualValueEl.value,
        moneyFactorEl.value, leaseTermEl.value, annualMileageEl.value, taxRateEl.value);
    
    carInfoDiv.innerHTML +=
    `<p>${myCar.year} ${myCar.make} ${myCar.model} ${myCar.trim}</p>`;

    // calculate adj. cap cost
    myLeaseInfo.calculateAdjCapCost(myLeaseInfo.netCapCost, myLeaseInfo.downPayment);
    // calculate equiv. interest rate
    myLeaseInfo.calculateEquivalentInterestRate(myLeaseInfo.moneyFactor);
    // calculate buyout price
    myLeaseInfo.calculateBuyoutPrice(myLeaseInfo.msrp, myLeaseInfo.residualValue);
    // calculate total depreciation
    myLeaseInfo.calculateTotalDepreciation(myLeaseInfo.adjCapCost, myLeaseInfo.buyoutPrice);
    // calculate monthly depreciation
    myLeaseInfo.calculateMonthlyDepreciation(myLeaseInfo.totalDepreciation, myLeaseInfo.leaseTerm);
    // calculate monthly rent charge
    myLeaseInfo.calculateMonthlyRentCharge(myLeaseInfo.adjCapCost, myLeaseInfo.buyoutPrice, myLeaseInfo.moneyFactor);
    // calculate total rent charge
    myLeaseInfo.calculateTotalRentCharge(myLeaseInfo.monthlyRentCharge, myLeaseInfo.leaseTerm);
    // calculate monthly payment
    myLeaseInfo.calculateMonthlyPayment(myLeaseInfo.monthlyDepreciation, myLeaseInfo.monthlyRentCharge);
    // calculate total monthly payments
    myLeaseInfo.calculateTotalMonthlyPayments(myLeaseInfo.monthlyPayment, myLeaseInfo.leaseTerm);
    // calculate total lease cost
    myLeaseInfo.calculateTotalLeaseCost(myLeaseInfo.totalMonthlyPayments, myLeaseInfo.downPayment);

    monthlyPaymentEl.value = myLeaseInfo.monthlyPayment.toFixed(2);

});

/**
 * Handler for "Detailed Info" button clicks
 */
detailedInfoBtn.addEventListener("click", function() {
    if (showHideTestEl.style.display === "none") {
        showHideTestEl.style.display = "block";
        detailedInfoBtn.innerText = "Hide Detailed Payment Info";
    }
    else {
        showHideTestEl.style.display = "none";
        detailedInfoBtn.innerText = "Show Detailed Payment Info";
    }
});

// create function to check if all fields are filled correctly
function checkInputFields(inputFieldsArray) {
    for (let i = 0; i < inputFieldsArray.length; i++) {
        if (inputFieldsArray[i].value === null) { // are they really null?
            calculateErrorMessage.innerText = "Please fill all fields";
            return false;
        }
    }
    return true;
}