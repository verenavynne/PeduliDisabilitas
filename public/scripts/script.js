
const navbarMenu= document.querySelector('.Menu');

document.querySelector('#hamburger').onclick = ()=>{
    navbarMenu.classList.toggle('active')
}



const hamburger = document.querySelector('#hamburger');

document.addEventListener('click', function(e){
    if(!hamburger.contains(e.target)&& !navbarMenu.contains(e.target)){
        navbarMenu.classList.remove('active');
    }
})

document.querySelectorAll('.Menu a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

document.querySelectorAll('.hero a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});