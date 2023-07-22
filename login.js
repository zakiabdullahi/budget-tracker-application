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
        } else {
            showSuccess(item, "");

        }
        // console.log(item)


    })

}
const checkLogin = (input) => {


    let email = input[0];
    let password = input[1];

    checkEmpty([email, password]);


    let data = getUsers();

    let user = data.find((u) => u.email === email.value);

    console.log(user);

    if (!user) {

        showError(email, "Invalid email or password!");
        showError(password, "");

    } else {

        if (email.value !== user.email || password.value !== user.password) {
            showError(email, "Invalid email or password!");
            showError(password, "");
        } else {

            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "./app/index.html";
        }


    }



}









btn.addEventListener("click", (e) => {
    e.preventDefault();

    // addUserToTheLocalStorage([name, email, password]);
    checkLogin([email, password]);


    // console.log("Clcik")

})