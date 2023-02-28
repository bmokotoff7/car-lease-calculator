/* DOM Elements from index.html */

/* HEADER */
/* nav-bar-div */
const navBarCalculatorBtn = document.getElementById("nav-bar-calculator-btn");
const navBarSavedLeasesBtn = document.getElementById("nav-bar-saved-leases-btn");

/* CALCULATOR TAB */
const calculatorWrapperEl = document.getElementById("calculator-wrapper");
/* car-info-div */
const carInfoDiv = document.getElementById("car-info-div");
const carYearEl = document.getElementById("car-year");
const carMakeEl = document.getElementById("car-make");
const carModelEl = document.getElementById("car-model");
const carTrimEl = document.getElementById("car-trim");
/* price-info-div */
const leaseInfoHeading = document.getElementById("lease-info-heading");
const leaseInfoExplained = document.getElementById("lease-info-explained");
const msrpEl = document.getElementById("msrp");
const netCapCostEl = document.getElementById("net-cap-cost");
const downPaymentEl = document.getElementById("down-payment");
const residualValueEl = document.getElementById("residual-value");
const moneyFactorEl = document.getElementById("money-factor");
const leaseTermEl = document.getElementById("lease-term");
const annualMileageEl = document.getElementById("annual-mileage");
const taxRateEl = document.getElementById("tax-rate");
/* calculate-button-div */
const calculatePaymentBtn = document.getElementById("calculate-payment-btn");
const calculateErrorMessage = document.getElementById("calculate-error-message");
/* monthly-payment-info-div */
const paymentInfoCarEl = document.getElementById("payment-info-car");
const paymentInfoTable = document.getElementById("payment-info-table");
const monthlyPaymentTableEl = document.getElementById("monthly-payment-table");
const monthlyDepreciationTableEl = document.getElementById("monthly-depreciation-table");
const monthlyRentChargeTableEl = document.getElementById("monthly-rent-charge-table");
const monthlyTaxTableEl = document.getElementById("monthly-tax-table");
const monthlyMileageAdjustmentTableEl = document.getElementById("monthly-mileage-adjustment-table");
const totalDepreciationTableEl = document.getElementById("total-depreciation-table");
const totalRentChargeTableEl = document.getElementById("total-rent-charge-table");
const totalTaxTableEl = document.getElementById("total-tax-table");
const totalMileageAdjustmentTableEl = document.getElementById("total-mileage-adjustment-table");
const totalMonthlyPaymentsTableEl = document.getElementById("total-monthly-payments-table");
const totalLeaseCostTableEl = document.getElementById("total-lease-cost-table");
const buyoutPriceTableEl = document.getElementById("buyout-price-table");
/* save-btn-div */
const saveLeaseBtn = document.getElementById("save-lease-btn");
/* clear-calculator-div */
const clearInputFieldsBtn = document.getElementById("clear-input-fields-btn");
/* clear-without-saving-confirmation-popup */
const clearWithoutSavingPopup = document.getElementById("clear-without-saving-confirmation-popup");
const clearWithoutSavingYesBtn = document.getElementById("clear-without-saving-yes-btn");
const clearWithoutSavingNoBtn = document.getElementById("clear-without-saving-no-btn");

/* SAVED LEASES TAB */
const savedLeasesWrapperEl = document.getElementById("saved-leases-wrapper");
/* saved-leases-list */
const savedLeasesListEl = document.getElementById("saved-leases-list");
/* no-saved-leases-message */
const noSavedLeasesMessage = document.getElementById("no-saved-leases-message");
/* delete-all-btn-div */
const deleteAllBtn = document.getElementById("delete-all-btn");
/* delete-all-confirmation-popup */
const deleteAllPopup = document.getElementById("delete-all-confirmation-popup");
const deleteAllYesBtn = document.getElementById("delete-all-yes-btn");
const deleteAllNoBtn = document.getElementById("delete-all-no-btn");
/* End DOM Elements */

/* Array containing all DOM user input elements */
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
/* Array used to hold saved leases (holds LeaseInfo objects) */
let mySavedLeases = [];
/* Holds saved leases from LocalStorage */
const savedLeasesFromLocalStorage = JSON.parse(localStorage.getItem("mySavedLeases"));
/* Holds the current LeaseInfo object and is passed in when "Save Lease" is clicked */
let currentLease = "";

/* Lease Calculation Constants */
const DEFAULT_MILEAGE = 12000;
const COST_PER_MILE = 0.05;

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

    /**
     * Returns string of format: Year Make Model Trim
     */
    toString() {
        return `${this.year} ${this.make} ${this.model} ${this.trim}`;
    }

    /**
     * Returns string of format: YearMakeModelTrim
     */
    toIdString() {
        return `${this.year}${this.make}${this.model}${this.trim}`;
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
        this.adjCapCost = 0;
        this.equivInterestRate = 0;
        this.buyoutPrice = 0;
        this.totalDepreciation = 0;
        this.totalRentCharge = 0;
        this.monthlyMileageAdjustment = 0;
        this.totalMileageAdjustment = 0;
        this.totalMonthlyPayments = 0;
        this.totalLeaseCost = 0;
        this.monthlyPayment = 0;
        this.monthlyDepreciation = 0;
        this.monthlyRentCharge = 0;
        this.monthlyTax = 0;
        this.totalTax = 0;
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
     * @param residualValue - the value of the car at the end of the lease term, represented as a percentage
     */
    calculateBuyoutPrice(msrp, residualValue) {
        this.buyoutPrice = msrp * (residualValue / 100);
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

    /**
     * Calculates the monthly price adjustment due to annual mileage
     * @param annualMileage - mileage allowance per year for the lease
     */
    calculateMonthlyMileageAdjustment(annualMileage) {
        if (annualMileage < DEFAULT_MILEAGE) {
            this.monthlyMileageAdjustment = (((DEFAULT_MILEAGE - annualMileage) * COST_PER_MILE) * (-1)) / 12;
        }
        else if (annualMileage > DEFAULT_MILEAGE) {
            this.monthlyMileageAdjustment = ((annualMileage - DEFAULT_MILEAGE) * COST_PER_MILE) / 12;
        }
        else {
            this.monthlyMileageAdjustment = 0;
        }
    }

    /**
     * Calculates the total price adjustment due to annual mileage
     * @param monthlyMileageAdjustment - monthly price adjustment due to annual mileage
     * @param leaseTerm - the number of months in the lease
     */
    calculateTotalMileageAdjustment(monthlyMileageAdjustment, leaseTerm) {
        this.totalMileageAdjustment = monthlyMileageAdjustment * leaseTerm;
    }

    /**
     * Calculates the total tax charged on the lease
     * @param monthlyTax - tax charged on each lease payment
     * @param leaseTerm - the number of months in the lease
     */
    calculateTotalTax(monthlyTax, leaseTerm) {
        this.totalTax = monthlyTax * leaseTerm;
    }

    /**
     * Calculates the cost of a monthly payment for the lease and the monthly tax
     * @param monthlyDepreciation - total depreciation of the car per month
     * @param monthlyRentCharge - total rent charge on the lease per month
     */
    calculateMonthlyPayment(monthlyDepreciation, monthlyRentCharge, monthlyMileageAdjustment, taxRate) {
        this.monthlyPayment = (monthlyDepreciation + monthlyRentCharge + monthlyMileageAdjustment) * (1 + Number((taxRate / 100)));
        this.monthlyTax = this.monthlyPayment - (monthlyDepreciation + monthlyRentCharge + monthlyMileageAdjustment);
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
        this.totalLeaseCost = Number(totalMonthlyPayments) + Number(downPayment);
    }
} // LeaseInfo

/**--------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

/* Renders saved leases upon startup, if there are saved leases */
if (savedLeasesFromLocalStorage) {
    mySavedLeases = savedLeasesFromLocalStorage;
    render(mySavedLeases);
}
else {
    deleteAllBtn.style.display = "none";
    noSavedLeasesMessage.style.display = "block";
}

/* FUNCTIONS */

/**
 * Renders the current list of saved leases
 * @param savedLeasesArray - array containing all saved leases from localStorage
 */
function render(savedLeasesArray) {
    let carList = "";
    for (let i = 0; i < savedLeasesArray.length; i++) {
        carList += 
        `<li>
            <h3 id=id="saved-lease-car-${i}">${savedLeasesArray[i].car.toString()}</h3>
            <table id="saved-lease-table-${i}">
                <tr>
                    <td class="table-bottom-section monthly-payment-table-row">Monthly Payment:</td>
                    <td class="table-bottom-section monthly-payment-table-row" id="monthly-payment-table">$${savedLeasesArray[i].monthlyPayment.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Monthly Depreciation:</td>
                    <td id="monthly-depreciation-table">$${savedLeasesArray[i].monthlyDepreciation.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Monthly Rent Charge:</td>
                    <td id="monthly-rent-charge-table">$${savedLeasesArray[i].monthlyRentCharge.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Monthly Tax:</td>
                    <td id="monthly-tax-table">$${savedLeasesArray[i].monthlyTax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td class="table-bottom-section">Monthly Mileage Adjustment:</td>
                    <td class="table-bottom-section" id="monthly-mileage-adjustment-table">$${savedLeasesArray[i].monthlyMileageAdjustment.toFixed(2)}</td>
                </tr>

                <tr>
                    <td>Total Depreciation:</td>
                    <td id="total-depreciation-table">$${savedLeasesArray[i].totalDepreciation.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total Rent Charge:</td>
                    <td id="total-rent-charge-table">$${savedLeasesArray[i].totalRentCharge.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total Tax:</td>
                    <td id="total-tax-table">$${savedLeasesArray[i].totalTax.toFixed(2)}</td>
                </tr>
                <tr>
                    <td class="table-bottom-section">Total Mileage Adjustment:</td>
                    <td class="table-bottom-section" id="total-mileage-adjustment-table">$${savedLeasesArray[i].totalMileageAdjustment.toFixed(2)}</td>
                </tr>

                <tr>
                    <td>Total Cost of Monthly Payments:</td>
                    <td id="total-monthly-payments-table">$${savedLeasesArray[i].totalMonthlyPayments.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Total Lease Cost (incl. down payment):</td>
                    <td id="total-lease-cost-table">$${savedLeasesArray[i].totalLeaseCost.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>End of Lease Buyout Price:</td>
                    <td id="buyout-price-table">$${savedLeasesArray[i].buyoutPrice.toFixed(2)}</td>
                </tr>
            </table>
        </li>`;
    }
    savedLeasesListEl.innerHTML = carList;
}

/**
 * Sets input fields back to their default styling
 * @param inputFieldsArray - an array containing all user input fields
 */
function resetInputFieldStyling(inputFieldsArray) {
    for (let i = 0; i < inputFieldsArray.length; i++) {
        inputFieldsArray[i].style.border = "0px solid"
        inputFieldsArray[i].style.borderColor = "#293241";
        calculateErrorMessage.style.display = "none";
    }
}

/**
 * Checks if all fields are filled correctly
 * @param inputFieldsArray - array containing all user input fields
 * @returns true if all fields are filled correctly, false otherwise
 */
function checkInputFields(inputFieldsArray) {
    let totalEmptyFields = 0;
    for (let i = 0; i < inputFieldsArray.length; i++) {
        if (inputFieldsArray[i].value === "") {
            inputFieldsArray[i].style.border = "2px solid"
            inputFieldsArray[i].style.borderColor = "#ee512a";
            calculateErrorMessage.style.display = "block";
            calculateErrorMessage.innerText = "Please fill required fields";
            totalEmptyFields++;
        }
        else {
            inputFieldsArray[i].style.border = "0px solid"
            inputFieldsArray[i].style.borderColor = "#293241";
        }
    }
    if (totalEmptyFields > 0) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * Clears all user input fields
 * @param inputFieldsArray - array containing all user input fields
 */
function clearInputFields(inputFieldsArray) {
    for (let i = 0; i < inputFieldsArray.length; i++) {
        inputFieldsArray[i].value = "";
        inputFieldsArray[i].style.border = "0px solid"
        inputFieldsArray[i].style.borderColor = "#293241";
    }
    calculateErrorMessage.style.display = "none";
}

/* EVENT LISTENERS */

/**
 * Handler for Nav Bar "Calculator" button clicks
 */
navBarCalculatorBtn.addEventListener("click", function() {
    calculatorWrapperEl.style.display = "block";
    savedLeasesWrapperEl.style.display = "none";
    navBarCalculatorBtn.style.fontWeight = "bold";
    navBarCalculatorBtn.style.textDecoration = "underline";
    navBarSavedLeasesBtn.style.fontWeight = "normal";
    navBarSavedLeasesBtn.style.textDecoration = "none";
});

/**
 * Handler for Nav Bar "Saved Leases" button clicks
 */
navBarSavedLeasesBtn.addEventListener("click", function() {
    calculatorWrapperEl.style.display = "none";
    savedLeasesWrapperEl.style.display = "block";
    navBarCalculatorBtn.style.fontWeight = "normal";
    navBarCalculatorBtn.style.textDecoration = "none";
    navBarSavedLeasesBtn.style.fontWeight = "bold";
    navBarSavedLeasesBtn.style.textDecoration = "underline"
});

/**
 * Handler for clicks on "Lease Information" heading
 */
leaseInfoHeading.addEventListener("click", function() {
    if (leaseInfoExplained.style.display === "block") {
        leaseInfoExplained.style.display = "none";
    }
    else {
        leaseInfoExplained.style.display = "block";
    }
})

/**
 * Handler for "Calculate Payment" button clicks
 */
calculatePaymentBtn.addEventListener("click", function() {
    // clear previous error message and reset styling
    calculateErrorMessage.innerText = "";
    saveLeaseBtn.style.background = `linear-gradient(
        to right bottom, 
        rgba(255, 255, 255, 0.5), 
        rgba(255, 255, 255, 0.3)
    )`;
    saveLeaseBtn.textContent = "Save Lease";
    saveLeaseBtn.style.color = "#293241";
    saveLeaseBtn.style.fontWeight = "normal";
    saveLeaseBtn.disabled = false;
    
    // check that all fields are filled
    let myInputs = checkInputFields(userInputs);
    if (myInputs === true) {

        // reset input field styling
        resetInputFieldStyling(userInputs);

        // create Car and LeaseInfo objects
        let myCar = new Car(carYearEl.value, carMakeEl.value, carModelEl.value, carTrimEl.value);
        let myLeaseInfo = new LeaseInfo(myCar.toString(), msrpEl.value, netCapCostEl.value, downPaymentEl.value, residualValueEl.value,
            moneyFactorEl.value, leaseTermEl.value, annualMileageEl.value, taxRateEl.value);

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
        // calculate monthly mileage price adjustment
        myLeaseInfo.calculateMonthlyMileageAdjustment(myLeaseInfo.annualMileage);
        // calculate total mileage price adjustment
        myLeaseInfo.calculateTotalMileageAdjustment(myLeaseInfo.monthlyMileageAdjustment, myLeaseInfo.leaseTerm);
        // calculate monthly payment and monthly tax
        myLeaseInfo.calculateMonthlyPayment(myLeaseInfo.monthlyDepreciation, myLeaseInfo.monthlyRentCharge, myLeaseInfo.monthlyMileageAdjustment, myLeaseInfo.taxRate);
        // calculate total tax
        myLeaseInfo.calculateTotalTax(myLeaseInfo.monthlyTax, myLeaseInfo.leaseTerm);
        // calculate total monthly payments
        myLeaseInfo.calculateTotalMonthlyPayments(myLeaseInfo.monthlyPayment, myLeaseInfo.leaseTerm);
        // calculate total lease cost
        myLeaseInfo.calculateTotalLeaseCost(myLeaseInfo.totalMonthlyPayments, myLeaseInfo.downPayment);

        // populate lease info table
        paymentInfoCarEl.innerText = myCar.toString();
        monthlyPaymentTableEl.innerText = `$${myLeaseInfo.monthlyPayment.toFixed(2)}`;
        monthlyDepreciationTableEl.innerText = `$${myLeaseInfo.monthlyDepreciation.toFixed(2)}`;
        monthlyRentChargeTableEl.innerText = `$${myLeaseInfo.monthlyRentCharge.toFixed(2)}`;
        monthlyTaxTableEl.innerText = `$${myLeaseInfo.monthlyTax.toFixed(2)}`;
        monthlyMileageAdjustmentTableEl.innerText = `$${myLeaseInfo.monthlyMileageAdjustment.toFixed(2)}`;
        totalDepreciationTableEl.innerText = `$${myLeaseInfo.totalDepreciation.toFixed(2)}`;
        totalRentChargeTableEl.innerText = `$${myLeaseInfo.totalRentCharge.toFixed(2)}`;
        totalTaxTableEl.innerText = `$${myLeaseInfo.totalTax.toFixed(2)}`;
        totalMileageAdjustmentTableEl.innerText = `$${myLeaseInfo.totalMileageAdjustment.toFixed(2)}`;
        totalMonthlyPaymentsTableEl.innerText = `$${myLeaseInfo.totalMonthlyPayments.toFixed(2)}`;
        totalLeaseCostTableEl.innerText = `$${myLeaseInfo.totalLeaseCost.toFixed(2)}`;
        buyoutPriceTableEl.innerText = `$${myLeaseInfo.buyoutPrice.toFixed(2)}`;
        paymentInfoTable.style.display = "block";
        paymentInfoTable.scrollIntoView(true);

        currentLease = myLeaseInfo;
        saveLeaseBtn.style.display = "block";
        clearInputFieldsBtn.textContent = "Calculate New Lease";
    }
});

/**
 * Handler for "Save Lease" button clicks
 */
saveLeaseBtn.addEventListener("click", function() {
/*
    saveLeaseBtn.style.background = "#07d885";
    saveLeaseBtn.textContent = "Lease saved";
    saveLeaseBtn.style.color = "white";
    saveLeaseBtn.style.fontWeight = "bold";
*/
    mySavedLeases.unshift(currentLease); // change to add new cars to front of array (top of list)?
    //currentLease = "";
    localStorage.setItem("mySavedLeases", JSON.stringify(mySavedLeases));
    render(mySavedLeases);

    if (mySavedLeases.length === 1) {
        // hide message
        noSavedLeasesMessage.style.display = "none";
        // show delete all button
        deleteAllBtn.style.display = "block";
    }

    saveLeaseBtn.style.background = "#07d885";
    saveLeaseBtn.textContent = "Lease saved";
    saveLeaseBtn.style.color = "white";
    saveLeaseBtn.style.fontWeight = "bold";
    saveLeaseBtn.disabled = true;

})

/**
 * Handler for "Clear Calculator" button clicks
 */
clearInputFieldsBtn.addEventListener("click", function() {
    console.log(currentLease);
    if (currentLease === "") {
        clearInputFields(userInputs);
    }
    else if (currentLease === mySavedLeases[0]) {
        clearInputFields(userInputs);
        clearWithoutSavingPopup.style.display = "none";
        saveLeaseBtn.style.display = "none";
        paymentInfoCarEl.style.display = "none";
        paymentInfoTable.style.display = "none";
        clearInputFieldsBtn.textContent = "Clear Calculator";
        currentLease = "";
    }
    else {
        clearWithoutSavingPopup.style.display = "block";
        clearWithoutSavingPopup.scrollIntoView(true);
    }
});

/**
 * Handler for "Yes" button clicks on clear without saving popup
 */
clearWithoutSavingYesBtn.addEventListener("click", function() {
    clearInputFields(userInputs);
    clearWithoutSavingPopup.style.display = "none";
    saveLeaseBtn.style.display = "none";
    paymentInfoCarEl.style.display = "none";
    paymentInfoTable.style.display = "none";
    clearInputFieldsBtn.textContent = "Clear Calculator";
    currentLease = "";
});

/**
 * Handler for "No" button clicks on clear without saving popup
 */
clearWithoutSavingNoBtn.addEventListener("click", function() {
    clearWithoutSavingPopup.style.display = "none";
});

/**
 * Handler for "Delete All" button clicks
 */
deleteAllBtn.addEventListener("click", function() {
    deleteAllPopup.style.display = "flex";
    deleteAllPopup.scrollIntoView(true);
});

/**
 * Handler for "Yes" button clicks on delete all popup
 */
deleteAllYesBtn.addEventListener("click", function() {
    localStorage.clear();
    mySavedLeases = [];
    render(mySavedLeases);
    deleteAllPopup.style.display = "none";
    // hide delete all button
    deleteAllBtn.style.display = "none";
    // show message
    noSavedLeasesMessage.style.display = "block";
});

/**
 * Handler for "No" button clicks on delete all popup
 */
deleteAllNoBtn.addEventListener("click", function() {
    deleteAllPopup.style.display = "none";
});