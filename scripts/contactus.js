document.getElementById('form-contactus').addEventListener('submit',(Event)=>{

    Event.preventDefault()

    const name = document.getElementById('fullname').value 
    const email = document.getElementById('email').value
    const number= document.getElementById('phonenum').value
    let country = document.getElementById('country').value
    const message = document.getElementById('message').value
    const agree = document.getElementById('agree').checked

    
    

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
})