let budgetId = document.querySelector('#budgetId');
let categoryId = document.querySelector('#categoryId');
let date = document.querySelector('#ExpenseDate');
let amount = document.querySelector('#amount');
let addExpense = document.querySelector('#addExpense');
let ExpsenseContainer = document.querySelector(".ExpsenseContainer");

const currname = document.querySelector("#currentname");


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

currname.innerHTML = currentUser.name;
// console.log(currentUser.name);

console.log("first")

const getExpense = () => {

    let Expenses = JSON.parse(localStorage.getItem("Expense")) || [];


    return Expenses;
}
const getBudGets = () => {

    let budgets = JSON.parse(localStorage.getItem("budgets")) || [];


    return budgets;
}
const getCategories = () => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    return categories;
}

// const getIncome = () => {

//     let incomes = JSON.parse(localStorage.getItem("Incomes")) || [];
//     return incomes;
// }


const loadData = () => {

    let expenseList = getExpense();


    expenseList.forEach(item => {


        if (item.userId == currentUser.id) {
            ExpsenseContainer.innerHTML += `
            <div class="expense">
                 <span>${item.budgetId}</span>
                 <span>${item.categoryId}</span>

                 <span> <i class="fa-solid fa-calendar-days"></i>${item.date}</span>
              <span> <i class="fa-solid fa-dollar-sign"></i>${item.amount}</span>
                
               </div>
   
   
        `
        }






    })



}

loadData();
// document.addEventListener("DOMContentLoaded", loadData);
const getId = () => {

    let id = "ExpenseId" + Math.random().toString(16).slice(2);
    return id;
    // console.log(id);
}



// console.log(getBudGets());
// console.log(getUsers());


console.log(getBudGets())
const fillBudget = () => {

    let budgets = getBudGets();

    let html = `<option value="choose">choose</option>`;
    budgets.forEach(item => {

        if (item.userId === currentUser.id) {

            html += `<option value="${item.id}">${item.name}</option>`
        }




    })




    budgetId.innerHTML = html;




}
fillBudget();

const fillCategories = () => {

    let categories = getCategories();

    let html = `<option value="choose">choose</option>`;
    categories.forEach(item => {



        html += `<option value="${item.id}">${item.name}</option>`




    })



    categoryId.innerHTML = html;




}
fillCategories();
const showError = (input) => {


    console.log(input)

    // input.style.border = "2px solid red";
    input.classList.add("error");


}
const showSuccess = (input) => {

    // input.style.border = "2px solid green";
    input.classList.remove("error");
    input.classList.add("success");


}

// const showErrAmount = (input, message) => {


//     let parent = input.parentElement;
//     // console.log(parent)

//     // input.placeholder = message


//     let label = parent.querySelector("#err");
//     // small.style.display = "block";
//     label.innerHTML = message;

//     input.style.border = "2px solid red";




// }


const checkEmpty = (input) => {


    input.forEach((item) => {

        // console.log(item.value);

        if (item.value == "") {

            showError(item);
            // console.log("0")
        } else if (item.value == "choose") {
            showError(item);

        }

        else {
            showSuccess(item, "");

        }
        // console.log(item)


    })

}

const addExpenseToTheLocalStorage = (data) => {

    let budgetId = data[0];
    let categoryId = data[1];
    let date = data[2];
    let amount = data[3];



    checkEmpty([budgetId, categoryId, date, amount]);

    let income = JSON.parse(localStorage.getItem("Incomes")) || [];
    let expense = JSON.parse(localStorage.getItem("Expense")) || [];
    let total_income = 0;
    let total_expense = 0;

    income.forEach(item => {
        // console.log(item.amount + 4);

        if (item.userId == currentUser.id) {
            total_income += parseInt(item.amount);

        }
    })
    expense.forEach(item => {
        // console.log(item.amount + 4);

        if (item.userId == currentUser.id) {
            total_expense += parseInt(item.amount);

        }
    })
    console.log(total_expense)

    let total_balance = total_income - total_expense;
    console.log("t-balance", total_balance);








    if (budgetId.value !== "" && budgetId.value !== "choose" && categoryId.value !== "choose" && date.value !== "" && amount.value !== "") {



        if (amount.value >= total_balance) {
            showError(amount);
            iziToast.error({
                title: 'Error',
                message: 'insufficient balance 🙂',
                position: 'topRight',
            });

        } else {
            let Expense = {

                id: getId(),
                userId: currentUser.id,
                budgetId: budgetId.value,
                categoryId: categoryId.value,
                date: date.value,
                amount: amount.value
            }

            console.log(Expense);
            let ExpenseList = getExpense();


            ExpenseList.push(Expense);



            localStorage.setItem("Expense", JSON.stringify(ExpenseList));
            iziToast.success({
                title: 'Success',
                message: 'Successfully added A Expense!',
                position: 'topRight',
                timeout: 3000,

            });
            budgetId.value = "";
            categoryId.value = "";
            date.value = "";
            amount.value = "";

            budgetId.classList.remove("success");
            categoryId.classList.remove("success");
            date.classList.remove("success");
            amount.classList.remove("success");

            setTimeout(() => {
                ExpsenseContainer.innerHTML = "";

                loadData();
            }, 3000)

        }



    } else {

        console.log("No nio")



    }







    // let ExpenseList = getExpense();


    // ExpenseList.push(Expense);



    // localStorage.setItem("Expense", JSON.stringify(ExpenseList));
    // budgetId.value = "";
    // categoryId.value = "";
    // date.value = "";
    // amount.value = "";
    // ExpsenseContainer.innerHTML = "";

    // loadData();










}




addExpense.addEventListener("click", (e) => {
    e.preventDefault();

    addExpenseToTheLocalStorage([budgetId, categoryId, date, amount]);


})