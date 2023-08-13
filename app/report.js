const name = document.querySelector("#currentname");
const totalIncome = document.querySelector("#totalIncome");
const totalExpense = document.querySelector("#totalExpense");
const rev = document.querySelector("#rev");
const incomeReport = document.querySelector(".Income-report");
const expenseReport = document.querySelector(".expense-report");


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

name.innerHTML = currentUser.name;

const getCategories = () => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    return categories;
}
console.log(getCategories())

const categoriesData = getCategories();
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


}
getTotalExpense();




let IncomeList = getIncome();
let expenseList = getExpense();

// let filtredIncome = IncomeList.filter(item => item.userId == currentUser.id);
// console.log(filtredIncome)
// let filtredExpense = expenseList.filter(item => item.userId == currentUser.id);
// console.log(filtredExpense)

const loadIncome = () => {




    IncomeList.forEach(item => {

        if (item.userId == currentUser.id) {

            incomeReport.innerHTML += `
             <div class="recent-item">
             <span> <i class="fa-solid fa-calendar-days"></i>${item.date}</span>
                  <span>${item.budgetId}</span>
                  

                  <span> <i class="fa-solid fa-dollar-sign"></i>${item.amount}</span>


                </div>
    
    
         `
        }


    })

    incomeReport.innerHTML += `
    <div class="recent-item">
             <span> </span>
             <span></span>
             <span> <i class="fa-solid fa-dollar-sign"></i>${total_income}</span>


             </div>
    
    
    `



}
loadIncome();

const loadExpense = () => {

    categoriesData.forEach((item) => {


    })



    expenseList.forEach(item => {

        const cat = categoriesData.filter((i) => i.id == item.categoryId);
        console.log("Cat", cat)



        if (item.userId == currentUser.id) {
            expenseReport.innerHTML += `
             <div class="recent-item">
             <span> <i class="fa-solid fa-calendar-days"></i>${item.date}</span>

             <span>${cat.length > 0 && cat[0].name} </span>

             <span> <i class="fa-solid fa-dollar-sign"></i>${item.amount}</span>
        </div>`
        }



    })

    expenseReport.innerHTML += `
    <div class="recent-item">
             <span> </span>
             <span></span>
             <span> <i class="fa-solid fa-dollar-sign"></i>${total_expense}</span>


             </div>
    
    
    `




}

loadExpense();



const print = document.querySelectorAll("#print");

print[0].addEventListener('click', () => {

    PrintIncome();

})
print[1].addEventListener('click', () => {

    PrintExpense();

})


function PrintIncome() {


    let newWindow = window.open("");

    newWindow.document.write(`<html><head><title></title>`);

    newWindow.document.write(`<style media="print">
    
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;0,700;1,200;1,300;1,600;1,700&display=swap');
     
    body{
        font-family: 'Poppins', sans-serif;
      
        
    }
    .recent-Income {
        width: 100%;
        padding: 20px;
        margin-top: 100px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        border-radius: 5px;
      }

    .recent-item{
        width: 100%;
        padding: 20px;
        height: 60px;
        border-bottom:1px solid #ccc;

        display: flex;
        gap: 25px;
    }
    .recent-item span {
        width: 40%;
      
      }


    

  

      
    </style>`)

    newWindow.document.write(`</head><body>`);

    // newWindow.document.write(``);


    newWindow.document.write(incomeReport.innerHTML);

    newWindow.document.write(`</body></html>`);

    newWindow.print();
    newWindow.close();


}
function PrintExpense() {


    let newWindow = window.open("");

    newWindow.document.write(`<html><head><title></title>`);

    newWindow.document.write(`<style media="print">
    
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,600;0,700;1,200;1,300;1,600;1,700&display=swap');
     
    body{
        font-family: 'Poppins', sans-serif;
      
        
    }

     .recent-Expense {
        padding: 20px;
        background: #e1c0cd;
        margin-top: 100px;
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        border-radius: 5px;
      }
      .recent-item {
        width: 100%;
        padding: 20px;
        height: 60px;
        background-color: #cf97aa;
        border-bottom:1px solid #ccc;

        border-radius: 10px;
        display: flex;
        gap: 25px;
      }

      .recent-item span {
        width: 40%;
       
      }
  


    

  

      
    </style>`)

    newWindow.document.write(`</head><body>`);

    // newWindow.document.write(``);


    newWindow.document.write(expenseReport.innerHTML);

    newWindow.document.write(`</body></html>`);

    newWindow.print();
    newWindow.close();


}