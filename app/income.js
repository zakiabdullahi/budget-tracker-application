let budgetId = document.querySelector('#budgetId');
let name = document.querySelector('#name');
let date = document.querySelector('#IncomeDate');
let amount = document.querySelector('#amount');
let addIncome = document.querySelector('#addIncome');
let IncomeContainer = document.querySelector(".IncomeContainer");

const currname = document.querySelector("#currentname");


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

currname.innerHTML = currentUser.name;
// console.log(currUser.name);

const getBudGets = () => {

    let budgets = JSON.parse(localStorage.getItem("budgets")) || [];


    return budgets;
}


const getIncome = () => {

    let incomes = JSON.parse(localStorage.getItem("Incomes")) || [];
    return incomes;
}


const loadData = () => {

    let IncomeList = getIncome();


    IncomeList.forEach(item => {


        if (item.userId == currentUser.id) {
            IncomeContainer.innerHTML += `
            <div class="income">
                 <span>${item.budgetId}</span>
                 <span> <i class="fa-solid fa-calendar-days"></i>${item.date}</span>
              <span> <i class="fa-solid fa-dollar-sign"></i>${item.amount}</span>
           </div>
        `

        }








    })



}

// loadData();
document.addEventListener("DOMContentLoaded", loadData);
const getId = () => {

    let id = "IncomeId" + Math.random().toString(16).slice(2);
    return id;
    // console.log(id);
}



// console.log(getBudGets());
// console.log(getUsers());


const fillbudget = () => {

    let budgets = getBudGets();

    let html = `<option value="choose">choose</option>`;
    budgets.forEach(item => {

        if (item.userId === currentUser.id) {

            html += `<option value="${item.id}">${item.name}</option>`
        }




    })



    budgetId.innerHTML = html;




}
fillbudget();
const showError = (input, message) => {


    // let parent = input.parentElement;

    // let small = parent.querySelector("small");
    // small.style.display = "block";
    // small.innerHTML = message;

    input.style.border = "2px solid red";


}
const showSuccess = (input, message) => {

    input.style.border = "2px solid green";
    // let parent = input.parentElement;

    // let small = parent.querySelector("small");
    // small.style.display = "block";
    // small.innerHTML = message;

    setTimeout(() => {
        input.style.border = "none";

    }, 1000)

}


const checkEmpty = (input) => {


    input.forEach((item) => {

        // console.log(item.value);

        if (item.value == "") {

            showError(item, "This field is required!");
            // console.log("0")
        } else if (item.value == "choose") {
            showError(item, "This field is required!");

        }

        else {
            showSuccess(item, "");

        }
        // console.log(item)


    })

}

const addIncomeToTheLocalStorage = (data) => {

    let budgetId = data[0];
    let date = data[1];
    let amount = data[2];



    checkEmpty([budgetId, date, amount]);




    if (budgetId.value !== "" && date.value !== "" && amount.value !== "") {



        let Income = {

            id: getId(),
            userId: currentUser.id,
            budgetId: budgetId.value,
            date: date.value,
            amount: amount.value




        }

        console.log(Income);

        let incomes = getIncome();


        incomes.push(Income);



        localStorage.setItem("Incomes", JSON.stringify(incomes));
        budgetId.value = "";
        date.value = "";
        amount.value = "";
        IncomeContainer.innerHTML = "";

        loadData();





    }





}




addIncome.addEventListener("click", (e) => {
    e.preventDefault();

    addIncomeToTheLocalStorage([budgetId, date, amount]);


})