window.addEventListener("load", function() {
        document.querySelector(".preloader").classList.add("opacity-0");

        setTimeout(function() {
            document.querySelector(".preloader").style.display = "none";
        }, 1000)
    })
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

// aside nav 
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section");
totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        // remove back section class 
        removeBackSectionClass();

        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                // add back section class 
                addBackSectionClass(j);
                // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

function removeBackSectionClass() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSectionClass(num) {

    allSection[num].classList.add("back-section");

}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];

    document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

document.querySelector(".hire-me").addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
    addBackSectionClass(sectionIndex);
})

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}