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
const loadNews = async (id) => {
  const url = ` https://openapi.programming-hero.com/api/news/category/${id} `
  const response = await fetch(url)
  const data = await response.json()
  displayNews(data.data);
}
const displayNews = (data) => {
  const newsDiv = document.getElementById('card-container');
  newsDiv.innerHTML = ``;
  data.forEach(element => {
    const { title, details, author, total_view, image_url } = element;
    const createDiv = document.createElement('div');
    createDiv.classList.add('card', 'my-3')
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
                <p class="card-text">${details.length > 200 ? details.slice(0, 200) + "..." : details}</p>
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
                  <button onclick="loadNewsDetail('${element._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Full Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`
    newsDiv.appendChild(createDiv);
  })
};
const loadNewsDetail = async (news_id) => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`
  const response = await fetch(url)
  const data = await response.json()
  displayNewsDetail(data.data[0]);
}

const displayNewsDetail = (data) => {
  console.log(data)
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.innerText = `${data.title}`
  const modalBOdy = document.getElementById('modalBody');
  modalBOdy.innerHTML = `<p>${data.details}</p>`
};