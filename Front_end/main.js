const value = document.querySelector('#text');
const send = document.querySelector('#reload');


function smellsLikeIban(str){
    return /^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/.test(str);
   }
   
   function validateIbanChecksum(iban) {       
     const ibanStripped = iban.replace(/[^A-Z0-9]+/gi,'') //keep numbers and letters only
                              .toUpperCase(); //calculation expects upper-case
     const m = ibanStripped.match(/^([A-Z]{2})([0-9]{2})([A-Z0-9]{9,30})$/);
     if(!m) return false;
     
     const numbericed = (m[3] + m[1] + m[2]).replace(/[A-Z]/g,function(ch){
                           //replace upper-case characters by numbers 10 to 35
                           return (ch.charCodeAt(0)-55); 
                       });
     //The resulting number would be to long for javascript to handle without loosing precision.
     //So the trick is to chop the string up in smaller parts.
     const mod97 = numbericed.match(/\d{1,7}/g)
                             .reduce(function(total, curr){ return Number(total + curr)%97},'');
   
     return (mod97 === 1);
   };
   
   




send.addEventListener('click', () => {
    if(validateIbanChecksum(value.value)){
        fetch(`COME APİ COME APİ URL`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: value.value
            })
        }) 
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

       
        swal("Gönderildi!", "You clicked the button!", "success");
    }
    else{
        swal("Hata!", "Geçersiz IBAN", "error");
    }
});




const ekle = document.querySelector('.ekle');

const g = t=>document.createElement(t);

function banaekle(obj){  
    let tr = g('tr');
    let td = g('td');
    

    let verigir = g('td');
    verigir.innerHTML = obj.title;


    // tr.append(td)
    tr.append(verigir);

    
    ekle.append(tr);
}

const baseurl = ` BACK APİ APİ URL URL URL`;

function getData(){
    fetch(baseurl)
    .then(response => response.json())
    .then(data => 
        
        data.forEach(element => {
            banaekle(element);
            console.log(element.title);
        })
    )
    .catch(err => console.log(err));
}
    


getData();