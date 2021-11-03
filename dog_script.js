const count = 10;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const apiUrl = 'https://dog.ceo/api/breeds/image/random';


function setAttributes(element,attributes){
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

function imageLoader(){
    console.log('image_loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready = ',ready);
    }
}

function displayPhotos(photosArray){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        setAttributes(item,{
            'href': photo.message,
            'target': '_blank'
        });
        const img = document.createElement('img');
        setAttributes(img,{
            'src':photo.message,
            'alt': "success"
        });
        img.addEventListener('load',imageLoader());
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function collect_images(){
    for (let i=0;i<=count;i++){
        const response = await fetch(apiUrl);
        const data = await response.json();
        photosArray.push(data);
    }
    displayPhotos(photosArray);
}

window.addEventListener('scroll',() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2000 && ready){
        ready = false;
        collect_images();
        photosArray= [];
    }
});

collect_images();