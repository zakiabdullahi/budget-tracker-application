const name = document.querySelector("#currentname");
const totalIncome = document.querySelector("#totalIncome");
const totalExpense = document.querySelector("#totalExpense");
const rev = document.querySelector("#rev");
const recentIncome = document.querySelector(".recent-Income");
const recentExpense = document.querySelector(".recent-Expense");


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

name.innerHTML = currentUser.name;

const getIncome = () => {

    let incomes = JSON.parse(localStorage.getItem("Incomes")) || [];
    return incomes;
}
const getExpense = () => {

    let Expenses = JSON.parse(localStorage.getItem("Expense")) || [];


    return Expenses;
}
let total_income = 0;
let total_expense = 0;
const getTotalIncome = () => {

    let income = getIncome();


    income.forEach(item => {
        // console.log(item.amount + 4);

        if (item.userId == currentUser.id) {
            total_income += parseInt(item.amount);

        }
    })
    // console.log(total)

    totalIncome.innerHTML = "$" + total_income;

}
getTotalIncome()
const getTotalExpense = () => {

    let expenses = getExpense();


    expenses.forEach(item => {
        console.log(item.amount);

        if (item.userId == currentUser.id) {
            total_expense += parseInt(item.amount);

        }
    })
    // console.log("ex", total)

    totalExpense.innerHTML = "$" + total_expense;

}
getTotalExpense();

const getRev = () => {
    let revenue = total_income - total_expense;
    console.log()

    rev.innerHTML = "$" + revenue;
}
getRev();

// function data() {
//     let arr = [1, 2, 3, 4, 5];
//     let batch = arr.slice(Math.max(arr.length - 5, 0));
//     console.log(batch)

// }
// data();
// console.log(currUser.name);

const getBudGets = () => {

    let budGets = JSON.parse(localStorage.getItem("budgets")) || [];


    return budGets;
}

let budgetList = getBudGets();

let IncomeList = getIncome();
let expenseList = getExpense();

let filtredIncome = IncomeList.filter(item => item.userId == currentUser.id);
console.log(filtredIncome)
let filtredExpense = expenseList.filter(item => item.userId == currentUser.id);
console.log(filtredExpense)


const loadIncome = () => {


    let batch = filtredIncome.slice(Math.max(filtredIncome.length - 5, 0));

    batch.forEach(item => {

        if (item.userId == currentUser.id) {

            recentIncome.innerHTML += `
             <div class="recent-item">
                  <span>${item.budgetId}</span>
                  <span>${item.date}</span>
                  <span>${item.amount}</span>
                </div>
    
    
         `
        }


    })



}
loadIncome();

const loadExpense = () => {

    let batch = filtredExpense.slice(Math.max(filtredExpense.length - 5, 0));
    console.log("batch", batch)

    batch.forEach(item => {

        if (item.userId == currentUser.id) {
            recentExpense.innerHTML += `
             <div class="recent-item">
             <span>${item.budgetId}</span>
             <span>${item.categoryId}</span>
             <span>${item.date}</span>
             <span>${item.amount}</span>
        </div>`
        }



    })



}

loadExpense();

// const loadData = () => {

//     let batch = budgetList.slice(Math.max(budgetList.length - 5, 0));



//     batch.forEach((item) => {
//         // console.log(item)
//         if (item.userId == currentUser.id) {
//             // console.log(item)
//             recentContainer.innerHTML += `
//                     <div class="recent-item">
//                     <span>${item.userId}</span>
//                     <span>${item.name}</span>
//                     <span>${item.startDate}</span>
//                     <span>${item.endDate}</span>
//                     <span>${item.amount}</span>
//                     </div>
//              `
//         }

//     })



// }

// loadData();
// document.addEventListener("DOMContentLoaded", loadData);