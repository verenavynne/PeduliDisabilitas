document.getElementById('form-contactus').addEventListener('submit',(Event)=>{

    Event.preventDefault()

    const name = document.getElementById('fullname').value 
    const email = document.getElementById('email').value
    const number= document.getElementById('phonenum').value
    let country = document.getElementById('country').value
    const message = document.getElementById('message2').value
    const agree = document.getElementById('agree').checked

    console.log("Message content:", message); // Debugging line
    console.log(document.getElementById('message'));


    var fullNamePattern = /^[A-Za-z\s]+$/;

    if(!name.match(fullNamePattern) || name.length<5){
        alert('Your name must only have 5 or more alphabet letters')
        return
    }



    if(!email.endsWith('@gmail.com')){
        alert('Your email must ends with @gmail.com')
        return
    }

    
        var phoneNumberPattern = /^\d{10}$/;
      
        
        var cleanedPhoneNumber = number.replace(/\D/g, '');
        

        if(!cleanedPhoneNumber.match(phoneNumberPattern)){
            alert('The pattern must be "123-456-7890"')
            return
        }
        

    if(country==""){
        alert('Must choose 1 country')
        return
    }

    if(message.length < 10){
        alert('Message must be 10 characters or more')
        return
    }

    if(!agree){
        alert('You must agree with all the terms and conditions')
        return
    }


    alert('Message has been submitted')

    document.getElementById('form-contactus').reset();

    return true;
})

document.addEventListener("DOMContentLoaded", () => {
    const aboutLink = document.getElementById("about");
    const contactLink = document.getElementById("contact");

    function applyActiveClass() {
        const currentUrl = window.location.href;

        aboutLink.classList.remove("active");
        contactLink.classList.remove("active");

        
        if (currentUrl.includes("#contactsec")) {
            contactLink.classList.add("active"); 
        } else if (currentUrl.includes("aboutus.html")) {
            aboutLink.classList.add("active"); 
        }

    }

    
    applyActiveClass();

    
    aboutLink.addEventListener("click", (event) => {
        event.preventDefault();
        applyActiveClass(); 
        window.location.href = aboutLink.getAttribute("href"); 
    });

    contactLink.addEventListener("click", (event) => {
        event.preventDefault();
        applyActiveClass(); 
        window.location.href = contactLink.getAttribute("href"); 
    });


    window.addEventListener("hashchange", () => {
        applyActiveClass(); 
    });
});
