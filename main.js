const posts = document.querySelector(".posts");



const loadData = async () => {

  let response = await fetch("./posts.json");
  let data = await response.json();


  data.forEach(post => {
    console.log(post);

    posts.innerHTML += `

        <div class="post">
        <div class="post-header">
        <h1>${post.title}</h1>
        <p>${post.content}</p>
        
        </div>
          <p>
            <span>${post.author}</span>
            <span>${post.date}</span>
          </p>
          <img
            src="${post.imageURL}"
            alt=""
          />
        </div>
        
        
        `
  })


}
loadData();

