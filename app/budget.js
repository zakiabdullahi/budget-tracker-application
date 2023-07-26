let name = document.querySelector('#name');
let startDate = document.querySelector('#startDate');
let endDate = document.querySelector('#endDate');
let amount = document.querySelector('#amount');
let addBudget = document.querySelector('#addBudget');

let budgetContainer = document.querySelector(".budgets");
console.log(budgetContainer)

const currname = document.querySelector("#currentname");


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

currname.innerHTML = currentUser.name;
// console.log(currUser.name);




const getBudGets = () => {

    let budGets = JSON.parse(localStorage.getItem("budgets")) || [];


    return budGets;
}


const loadData = () => {

    let budgetList = getBudGets();








    budgetList.forEach(item => {



        if (item.userId == currentUser.id) {
            console.log(item)
            budgetContainer.innerHTML += `
         <div class="budget">
              <span>${item.userId}</span>
              <span><img src="./images/budget.svg" />${item.name}</span>
              <span><i class="fa-solid fa-calendar-days"></i>${item.startDate}</span>
              <span> <i class="fa-solid fa-calendar-days"></i>${item.endDate}</span>
              <span> <i class="fa-solid fa-dollar-sign"></i>${item.amount}</span>
            </div>


     `

        }





    })



}

// loadData();
document.addEventListener("DOMContentLoaded", loadData);
const getId = () => {

    let id = "budgetId" + Math.random().toString(16).slice(2);
    return id;
    // console.log(id);
}

const getUsers = () => {

    let users = JSON.parse(localStorage.getItem("users")) || [];


    return users;
}

console.log(getBudGets());
// console.log(getUsers());




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

            showSuccess(item);





        }
        // console.log(item)


    })

}

const addBudgetToTheLocalStorage = (data) => {

    let name = data[0];
    let startDate = data[1];
    let endDate = data[2];
    let amount = data[3];



    checkEmpty([name, startDate, endDate, amount]);




    if (name.value !== "" && startDate.value !== "" && endDate.value !== "" && amount.value !== "") {



        let budget = {

            id: getId(),
            userId: currentUser.id,
            name: name.value,
            startDate: startDate.value,
            endDate: endDate.value,
            amount: amount.value




        }


        let budgets = getBudGets();


        budgets.push(budget);



        localStorage.setItem("budgets", JSON.stringify(budgets));
        iziToast.success({
            title: 'Success',
            message: 'Successfully added A budget!',
            position: 'topRight',

        });
        name.value = "";
        startDate.value = "";
        endDate.value = "";
        amount.value = "";

        name.classList.remove("success");
        startDate.classList.remove("success");
        endDate.classList.remove("success");
        amount.classList.remove("success");

        budgetContainer.innerHTML = "";

        loadData();





    }





}




addBudget.addEventListener("click", (e) => {
    e.preventDefault();

    addBudgetToTheLocalStorage([name, startDate, endDate, amount]);


})