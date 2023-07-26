let name = document.querySelector('#name');
let description = document.querySelector('#description');
let addCategory = document.querySelector('#addCat');

let categoryContainer = document.querySelector(".categories");
// console.log(budgetContainer)

const currname = document.querySelector("#currentname");


let currentUser = JSON.parse(localStorage.getItem("currentUser"));

currname.innerHTML = currentUser.name;
// console.log(currUser.name);




const getCategories = () => {
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    return categories;
}

const loadData = () => {

    let categoryList = getCategories();



    categoryList.forEach(item => {


        if (item.userId == currentUser.id) {


            console.log(item)
            categoryContainer.innerHTML += `
                 <div class="category">
                 <span>${item.name}</span>
                 <p><i class="fa-solid fa-message"></i>${item.description}</p>
                     
                    </div>
        
        
             `
        }







    })



}

// loadData();
document.addEventListener("DOMContentLoaded", loadData);









//     budgetList.forEach(item => {



//         if (item.userId == currentUser.id) {
//             console.log(item)
//             budgetContainer.innerHTML += `
//              <div class="budget">
//                   <span>${item.userId}</span>
//                   <span>${item.name}</span>
//                   <span>${item.startDate}</span>
//                   <span>${item.endDate}</span>
//                   <span>${item.amount}</span>
//                 </div>


//          `

//         }





//     })



// }

// loadData();
// document.addEventListener("DOMContentLoaded", loadData);
const getId = () => {

    let id = "catId" + Math.random().toString(16).slice(2);
    return id;
}


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

const addCatToTheLocalStorage = (data) => {

    let name = data[0];
    let description = data[1];




    checkEmpty([name, description]);




    if (name.value !== "" && description.value !== "") {



        let category = {

            id: getId(),
            userId: currentUser.id,
            name: name.value,
            description: description.value,

        }
        console.log(category);


        let categories = getCategories();


        categories.push(category);

        localStorage.setItem("categories", JSON.stringify(categories));
        iziToast.success({
            title: 'Success',
            message: 'Successfully added A Category!',
            position: 'topRight',

        });
        name.value = "";
        description.value = "";
        name.classList.remove("success");
        description.classList.remove("success");

        setTimeout(() => {

            categoryContainer.innerHTML = "";
            loadData();
        }, 5000)





    }





}




addCategory.addEventListener("click", (e) => {
    e.preventDefault();

    addCatToTheLocalStorage([name, description]);


})