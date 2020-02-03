let urlPerson = 'http://mimmimi.com/webb3/projekt/backend/rest.php/personal';

const listedPersonalElement = document.getElementById("listedPersonal");
let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let worktitle = document.getElementById("worktitle");

let imagePersonal = document.getElementById("imagePersonal");
let phonePersonal = document.getElementById("phonePersonal");
let emailPersonal = document.getElementById("emailPersonal");
let cityPersonal = document.getElementById("cityPersonal");

let contactTitle = document.getElementById("contactTitle");
let cityTitle = document.getElementById("cityTitle");

window.onload = getPersonal(); 

//Hämtar personinfo
function getPersonal() {

    fetch(urlPerson)
        .then(function(response) {

            if (response.status !== 200) {
                console.log('Fel vid hämtning av all personinfo' + response.status);
                return;
            }
            response.json().then(function(data) {
                displayFullPersonal(data); 
            });
        }
    )
    .catch((error) => console.log('FEL med getPersonal: ' + error));
}


//Visar personlig info
function displayFullPersonal(data) {

    contactTitle.innerHTML = "KONTAKT"; 
    cityTitle.innerHTML = "STAD";

    firstname.innerHTML = "";
    lastname.innerHTML = "";
    worktitle.innerHTML = "";
    imagePersonal.innerHTML = "";
    phonePersonal.innerHTML = "";
    emailPersonal.innerHTML = "";
    cityPersonal.innerHTML = "";

    data.forEach((row) => {
        
        firstname.innerHTML += row['FIRSTNAME'] + "<br/>"; 
        lastname.innerHTML += row['LASTNAME'] + "<br/>"; 
        worktitle.innerHTML += row['WORKTITLE'] + "<br/>"; 

        let imagePersonalElement = document.getElementById("imagePersonal");
        let imagePersonalInput = document.createElement("img");
        imagePersonalInput.name = "imagePersonalInput";
        imagePersonalInput.id = "imagePersonalInput";
        imagePersonalInput.src += "../admin/userImages/" + row['PICTURE']; 
        hej = imagePersonalInput.src;
        imagePersonalElement.appendChild(imagePersonalInput);

        phonePersonal.innerHTML += row['PHONE'] + "<br/>"; 
        emailPersonal.innerHTML += row['EMAIL'] + "<br/>";
        cityPersonal.innerHTML += row['CITY'] + "<br/>";
    });
}