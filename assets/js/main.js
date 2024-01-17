import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

//LAZY VIDEO
document.addEventListener("DOMContentLoaded", function() {
    const video = document.querySelector("video.lazy");
    if ("IntersectionObserver" in window) {
        const videoObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.load();
                    entry.target.setAttribute('autoplay', true);
                    entry.target.classList.remove("lazy");
                    videoObserver.unobserve(entry.target);
                }
            });
        });
        videoObserver.observe(video);
    }
});

//Masonry Gallery
// init Masonry
const grid = document.querySelector('.grid-imgs');
const msnry = new Masonry(grid);
// layout Masonry after each image loads
imagesLoaded(grid, () => {
    msnry.layout();
})  
 
//FILTER GALLERY
const filterContainer = document.querySelector(".gallery-menu");
const galleryItems = document.querySelectorAll(".grid-imgs .grid-item");

filterContainer.addEventListener("click", (event) =>{
    if(event.target.classList.contains("gallery-menu__item")){
        filterContainer.querySelector(".gallery-menu__item--active").classList.remove("gallery-menu__item--active"); //disables existing active 'filter-item'
        event.target.classList.add("gallery-menu__item--active"); // activate new 'filter-item' on the select item
        const filterValue = event.target.getAttribute("data-filter");
        galleryItems.forEach((item) =>{
            if(item.classList.contains(filterValue) || filterValue === 'all'){
                item.classList.remove("hide");
                item.classList.add("show");
                msnry.layout();
            }
            else{
                item.classList.remove("show");
                item.classList.add("hide");
            }
        });
    }
});

/*FORM VALIDATION*/
const form = document.getElementById('form');
const name = document.getElementById('nome');
const email = document.getElementById('email');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkInputs();
    if((name.checkValidity()) && (email.checkValidity())){
        const small = form.querySelector('small');
        small.className = 'sucess-form';
    }
})

function checkInputs(){
    form.querySelectorAll('input').forEach(function(input){
        input.addEventListener('input', () => {
            input.setCustomValidity('');
            input.checkValidity();
        });
        input.addEventListener('invalid', () => {
            input.setCustomValidity('Preenche o campo.');
        })
    });
}