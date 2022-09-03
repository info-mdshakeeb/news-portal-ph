const loadProducts = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    return data;
}
const setAllManue = async()=>{
    const data = await loadProducts();
    const ul = document.getElementById('navbar-ul-id');
   data.data.news_category.forEach(element => {
    console.log(element);
    const li = document.createElement('li');
    li.classList.add('nav-item')
    li.innerHTML = `
    <a class="nav-link ">${element.category_name}</a> `
    ul.appendChild(li);
   });
}
    

 setAllManue();