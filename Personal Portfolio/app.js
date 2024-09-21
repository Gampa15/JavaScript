const pageTurn = document.querySelectorAll('.next-btn');
pageTurn.forEach((el, index) =>{
    el.onclick = () =>{
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);
        if(pageTurn.classList.contains('turn')){
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        }
        else{
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    }
})
const pages = document.querySelectorAll('.page.right-page');
const contactMe = document.querySelector('.button.contact');
contactMe.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');
            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    })
}
let totalPages = pages.length;
let pageNumb = 0;
function reverseIndex(){
    pageNumb--;
    if(pageNumb < 0){
        pageNumb = totalPages - 1;
    }
}
const backProfile = document.querySelector('.back-profile');
backProfile.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumb].classList.remove('turn');
            setTimeout(() => {
                reverseIndex();
                pages[pageNumb].style.zIndex = 10 + index;
            }, 500)
        }, (index + 1) * 200 + 100);
    })
}
const coverRight = document.querySelector('.cover.right');
const pageLeft = document.querySelector('.page.left-page');
setTimeout(() => {
    coverRight.classList.add('turn');
}, 2000)
setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2500)
setTimeout(() => {
    pageLeft.style.zIndex = 20;
}, 3000)
pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumb].classList.remove('turn');
        setTimeout(() => {
            reverseIndex();
            pages[pageNumb].style.zIndex = 10 + index;
        }, 500)
    }, (index + 1) * 200 + 2000);
})