let budgetId = document.querySelector('#budgetId');
let amount = document.querySelector('#amount');
let date = document.querySelector('#date');
let addSaving = document.querySelector('#addSaving');
let SavingContainer = document.querySelector(".SavingContainer");

const currname = document.querySelector("#currentname");


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

currname.innerHTML = currentUser.name;
// console.log(currUser.name);

const getSavings = () => {

    let Savings = JSON.parse(localStorage.getItem("Savings")) || [];


    return Savings;
}
const getBudGets = () => {

    let budgets = JSON.parse(localStorage.getItem("budgets")) || [];


    return budgets;
}





const loadData = () => {

    let savingList = getSavings();


    savingList.forEach(item => {


        if (item.userId == currentUser.id) {


            SavingContainer.innerHTML += `
             <div class="saving">
                  <span>${item.budgetId}</span>
                  <span> <i class="fa-solid fa-dollar-sign"></i>${item.amount}</span>
                  <span> <i class="fa-solid fa-calendar-days"></i>${item.date}</span>
             
                </div>
    
         `
        }









    })



}

// loadData();
document.addEventListener("DOMContentLoaded", loadData);
const getId = () => {

    let id = "Sid" + Math.random().toString(16).slice(2);
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
            showSuccess(item, "");

        }
        // console.log(item)


    })

}

const addSavingToTheLocalStorage = (data) => {

    let budgetId = data[0];
    let amount = data[1];
    let date = data[2];



    checkEmpty([budgetId, amount, date]);




    if (budgetId.value !== "" && amount.value !== "" && date.value !== "") {



        let Saving = {

            id: getId(),
            userId: currentUser.id,
            budgetId: budgetId.value,
            amount: amount.value,
            date: date.value,


        }

        // console.log(Saving);

        let SavingData = getSavings();


        SavingData.push(Saving);



        localStorage.setItem("Savings", JSON.stringify(SavingData));
        iziToast.success({
            title: 'Success',
            message: 'Successfully added A Saving!',
            position: 'topRight',
            timeout: 3000,

        });
        budgetId.value = "";
        amount.value = "";
        date.value = "";

        budgetId.classList.remove("success");
        amount.classList.remove("success");
        date.classList.remove("success");

        setTimeout(() => {


            SavingContainer.innerHTML = "";

            loadData();

        }, 3000)





    }





}




addSaving.addEventListener("click", (e) => {
    e.preventDefault();

    addSavingToTheLocalStorage([budgetId, amount, date]);


})