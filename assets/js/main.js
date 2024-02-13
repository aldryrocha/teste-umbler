import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";

//LAZY VIDEO
//This function observe the viewport, if the video section is on, he starts play. The entries is an array of objects that contains data about the video in the viewport and do the checks
const video = document.querySelector('video.lazy')
const LazyLoadVideo = () => {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.load()
                entry.target.setAttribute('autoplay', true)
                entry.target.classList.remove("lazy")
                videoObserver.unobserve(entry.target)
            }
        })
    })
    videoObserver.observe(video)
}

if(video) {
  LazyLoadVideo()
}

//MANSONRY AND FILTER GALLERY
//This function checks what button was clicked to filter the context related and uses mansory gallery to make the images height fluid inside the section
const filterContainer = document.querySelector(".gallery-menu");
const galleryItems = document.querySelectorAll(".grid-imgs .grid-item");
const grid = document.querySelector('.grid-imgs');
const msnry = new Masonry(grid); // nit Masonry
imagesLoaded(grid, () => msnry.layout()); //layout Masonry after each image loads

const Gallery = () => {
    filterContainer.addEventListener("click", (event) =>{
    const activeItem = filterContainer.querySelector(".gallery-menu__item--active");

        if(event.target.classList.contains("gallery-menu__item")){
            activeItem.classList.remove('gallery-menu__item--active'); //disables existing active 'filter-item'
            event.target.classList.add('gallery-menu__item--active'); //activate new 'filter-item' on the select item
            const filterValue = event.target.getAttribute("data-filter"); //get the item to filter

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
}

if(filterContainer) {
  Gallery()
}

//FORM VALIDATION
//checks if all fields are valid, otherwise error messages will keep showing
const form = document.getElementById('form');
const name = document.getElementById('nome');
const email = document.getElementById('email');

const FormValidation = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    CheckInputs();
    if((name.checkValidity()) && (email.checkValidity())){
        const small = form.querySelector('small');
        small.className = 'sucess-form';
    }
  })
}

const CheckInputs = () => {
    form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('input', () => {
            input.setCustomValidity('');
            input.checkValidity();
        });
        input.addEventListener('invalid', () => {
            input.setCustomValidity('Preenche o campo.');
        })
    });
}

if(form) {
  FormValidation()
}
