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
    <a class="nav-link" onclick="loadNews('${element.category_id}')">${element.category_name}</a> `
        ul.appendChild(li);
    });   
};
setManue();

const loadNews =  (id) => {
    const url =` https://openapi.programming-hero.com/api/news/category/${id} `
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data))
}
const displayNews =async  (id) =>{
    const newsDiv = document.getElementById('card-container');
    newsDiv.innerHTML=``;
    id.data.forEach(element =>{
        const {title,details,author,total_view,image_url} = element;
    const createDiv =document.createElement('div');
    createDiv.classList.add('card','my-3')
    createDiv.innerHTML = `
            <div class="row">
            <div class="col-md-4">
              <img
                class="img-fluid rounded-start"
                alt="..."src="${image_url}"/>
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
                  <button id='modal_btn' class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Author Detail</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
          
    newsDiv.appendChild(createDiv);
    })
};
