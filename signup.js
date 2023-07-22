const name = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const btn = document.querySelector("#singUp");

const getUsers = () => {

    let users = JSON.parse(localStorage.getItem("users")) || [];


    return users;
}
// console.log(getUsers());
const getId = () => {

    let id = "user" + Math.random().toString(16).slice(2);
    return id;
    // console.log(id);
}



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

const addUserToTheLocalStorage = (user) => {

    let name = user[0];
    let email = user[1];
    let password = user[2];

    // console.log(user)
    checkEmpty([name, email, password]);

    let data = getUsers();

    let userExist = data.find((user) => user.email === email.value);
    console.log(userExist);

    if (userExist) {
        showError(email, "Email Already Exist");


    } else if (!userExist) {
        if (name.value !== "" && email.value !== "" && password.value !== "") {



            let user = {
                id: getId(),
                name: name.value,
                email: email.value,
                password: password.value
            }

            // console.log(user);

            let users = getUsers();

            users.push(user);

            localStorage.setItem("users", JSON.stringify(users));
            name.value = ""
            email.value = ""
            password.value = ""
            window.location.href = "./login.html"


        }




    }






}









btn.addEventListener("click", (e) => {
    e.preventDefault();

    addUserToTheLocalStorage([name, email, password]);


    // console.log("Clcik")

})