// certificate item filter 
const filterContainer = document.querySelector(".certificate-filter"),
    filtereBtns = filterContainer.children,
    totalFilterBtn = filtereBtns.length,
    certificateItems = document.querySelectorAll(".certificate-item"),
    totalCertificateItem = certificateItems.length;
for (let i = 0; i < totalFilterBtn; i++) {
    filtereBtns[i].addEventListener("click", function() {
        filterContainer.querySelector(".active").classList.remove("active");
        this.classList.add("active");
        const filterValue = this.getAttribute("data-filter");
        for (let k = 0; k < totalCertificateItem; k++) {
            if (filterValue === certificateItems[k].getAttribute("data-category")) {
                certificateItems[k].classList.remove("hide");
                certificateItems[k].classList.add("show");
            } else {
                certificateItems[k].classList.remove("show");
                certificateItems[k].classList.add("hide");
            }
            if (filterValue === "all") {
                certificateItems[k].classList.remove("hide");
                certificateItems[k].classList.add("show");
            }
        }
    })
}


// certificate lightbox 
const lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox.querySelector(".lightbox-img"),
    lightboxClose = lightbox.querySelector(".lightbox-close"),
    lightboxText = lightbox.querySelector(".caption-text"),
    lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;
for (let i = 0; i < totalCertificateItem; i++) {
    certificateItems[i].addEventListener("click", function() {
        itemIndex = i;
        changeItem();
        toggleLightbox();
    })
}

function prevItem() {
    if (itemIndex == 0) {
        itemIndex = totalCertificateItem - 1;
    } else {
        itemIndex--;
    }
    changeItem();
}

function nextItem() {
    if (itemIndex == totalCertificateItem - 1) {
        itemIndex = 0;
    } else {
        itemIndex++;
    }
    changeItem();
}

function changeItem() {
    imgSrc = certificateItems[itemIndex].querySelector(".certificate-img img").getAttribute("src");
    // console.log(imgSrc);
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = certificateItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalCertificateItem;

}

function toggleLightbox() {
    lightbox.classList.toggle("open");
}


// close lightbox 
lightbox.addEventListener("click", function(event) {
    if (event.target === lightboxClose || event.target === lightbox) {
        toggleLightbox();
    }

})