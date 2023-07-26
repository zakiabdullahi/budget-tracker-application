const email = document.querySelector("#email");
const password = document.querySelector("#password");

const btn = document.querySelector("#Login");

const getUsers = () => {

    let users = JSON.parse(localStorage.getItem("users")) || [];


    return users;
}
// console.log(getUsers());




// getId();


const showError = (input, message) => {


    let parent = input.parentElement;

    let small = parent.querySelector("small");
    small.style.display = "block";
    small.innerHTML = message;

    // input.style.border = "2px solid red";
    input.classList.add("error");


}
const showSuccess = (input, message) => {

    // input.style.border = "2px solid green";
    input.classList.remove("error");

    input.classList.add("success");

    let parent = input.parentElement;

    let small = parent.querySelector("small");
    small.style.display = "block";
    small.innerHTML = message;


}


const checkEmpty = (input) => {


    input.forEach((item) => {

        // console.log(item.value);

        if (item.value == "") {

            showError(item, "This field is required!");
            // console.log("0")
        } else {
            showSuccess(item, "");

        }
        // console.log(item)


    })

}
const checkLogin = (input) => {


    let email = input[0];
    let password = input[1];


    let data = getUsers();

    let user = data.find((u) => u.email === email.value);

    console.log(user);

    if (email.value == "" && password.value == "") {


        // checkEmpty([email, password]);
        showError(email, "This field is required!");
        showError(password, "This field is required!");



    } else {


        if (!user) {
            showError(email, "");
            showError(password, "");
            iziToast.error({
                title: 'Error',
                message: 'Invalid email or password!',
                position: 'topRight',
            });



        } else if (user) {

            if (email.value !== user.email || password.value !== user.password) {
                showError(email, "Invalid email or password!");
                showError(password, "");
                iziToast.error({
                    title: 'Error',
                    message: 'Invalid email or password!',
                    position: 'topRight',
                });
            } else {

                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = "./app/index.html";


            }


        }
    }

}
// let user = data.filter(item => item.email === email.value);

// console.log(user)

// if (email.value == "" && password.value == "") {
//     showError(email, "This field is required!");
//     showError(password, "This field is required!");

// } else {
//     if (user.length != "") {
//         if (email.value !== user[0].email || password.value !== user[0].password) {
//             showError(email, "Invalid email or password!");
//             showError(password, "");
//             iziToast.error({
//                 title: 'Error',
//                 message: 'Invalid email or password!',
//                 position: 'topRight',
//             });
//         } else {

//             localStorage.setItem("currentUser", JSON.stringify(user));
//             window.location.href = "./app/index.html";


//         }



//     } else {
//         showError(email, "");
//         showError(password, "");
//         iziToast.error({
//             title: 'Error',
//             message: 'Invalid email or password!',
//             position: 'topRight',
//         });

//     }
// }




btn.addEventListener("click", (e) => {
    e.preventDefault();

    // addUserToTheLocalStorage([name, email, password]);
    checkLogin([email, password]);


    // console.log("Clcik")

})