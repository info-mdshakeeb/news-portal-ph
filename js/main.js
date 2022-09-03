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
        console.log(element)
    const createDiv =document.createElement('div');
    createDiv.classList.add('card','my-3')
    createDiv.innerHTML = `
    <div class="row ">
    <div class="col-md-4">
      <img class="img-fluid rounded-start" alt="..." src="${element.image_url}" />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.details.slice(0,500)}...</p>
      </div>
    </div>
  </div>`
    newsDiv.appendChild(createDiv);
    })
}
displayNews();

