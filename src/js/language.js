let urlLanguage = 'http://mimmimi.com/webb3/projekt/backend/rest.php/language';

let speakLanguage = document.getElementById("speakLanguage");
let languageTitle = document.getElementById("languageTitle");


window.onload = getLanguage(); 

//Hämtar språk
function getLanguage() {

    fetch(urlLanguage)
        .then(function(response) {

            if (response.status !== 200) {
                console.log('Fel vid hämtning av alla språk' + response.status);
                return;
            }
            response.json().then(function(data) {
                displayFullLanguage(data); 
            });
        }
    )
    .catch((error) => console.log('FEL med getLanguage: ' + error));
}


//Visar språk
function displayFullLanguage(data) {

    languageTitle.innerHTML = "SPRÅK";
    speakLanguage.innerHTML = "";

    data.forEach((row) => {

        speakLanguage.innerHTML += row['SPEAK'] + "<div class='bottomSpace'></div>"; 
    });
}