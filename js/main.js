const loadManuedata = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}
const setManue = async () => {
    const data = await loadManuedata();
    const ul = document.getElementById('navbar-ul-id');
    data.data.news_category.forEach(element => {
        const li = document.createElement('li');
        li.classList.add('nav-item')
        li.innerHTML = `
    <a class="nav-link ">${element.category_name}</a> `
        ul.appendChild(li);
    });
}
setManue();
const loadNews = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/category/01');
    const data = await response.json();
    return data;
}
const displayNews = async () =>{
    const data = await loadNews();
    const newsDiv = document.getElementById('card-container');
    data.data.forEach(element =>{
        const {title,details,author,total_view,image_url} = element;
    const createDiv =document.createElement('div');
    createDiv.classList.add('card','my-3')
    createDiv.innerHTML = `
    <div class="row">
            <div class="col-md-4">
              <img
                class="img-fluid rounded-start"
                alt="..."
                src="${image_url}"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.length > 200 ? details.slice(0,200) + "..." :details}</p>
                <div class="row">
                  <div class="col-1">
                    <img class="img-fluid rounded-circle" alt="No image" src="${author.img}" />
                  </div>
                  <div class="col-md-4 ">
                  <div class="">${author.name}</div>
                  <div class="">${author.published_date}</div></div>
                  <div class="col-md-4">
                  <i class="fa-solid fa-eye"></i>
                  ${total_view}</div>
                  <div class="col-md-3">
                  <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="readFullMessage('${author.img}','${author.name}','${author.published_date}')">Author Detail</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
    newsDiv.appendChild(createDiv);
    })
};
const readFullMessage = (img, name, date) =>{
    const moduleDiv = document.getElementById('module');
    const createDiv = document.createElement('div');
    moduleDiv.textContent = '';
    createDiv.innerHTML =`
                <div class="card border-0">
                  <img src="${img}" class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">"${name}"</h5>
                    <p class="card-text">
                     "${date}"
                    </p>
                  </div>
                </div>`
    moduleDiv.appendChild(createDiv);
  }
displayNews();
