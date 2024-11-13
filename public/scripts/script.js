
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
