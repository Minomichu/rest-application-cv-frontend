let urlWork = 'http://mimmimi.com/webb3/projekt/backend/rest.php/work';

const listedWorkElement = document.getElementById("listedWork");
let work1 = document.getElementById("work1");
let work2 = document.getElementById("work2");
let work3 = document.getElementById("work3");
let work4 = document.getElementById("work4");

let workTitle1 = document.getElementById("workTitle1");
let workTitle2 = document.getElementById("workTitle2");
let workTitle3 = document.getElementById("workTitle3");
let workTitle4 = document.getElementById("workTitle4");

let readMoreButtonWork = document.getElementById("readMoreButtonWork");
readMoreButtonWork.addEventListener('click', readMoreOrLessWork, false);


window.onload = getWork(); 

function readMoreOrLessWork() {

    if(readMoreButtonWork.innerHTML == "Läs mer") {
        getFullWork();
    } else {
        getWork(); 
    }
}


//Hämtar kurser 
function getWork() {

    fetch(urlWork)
        .then(function(response) {

            if (response.status !== 200) {
                console.log('Fel vid hämtning av alla jobb' + response.status);
                return;
            }
            response.json().then(function(data) {
                displayWork(data); 
            });
        }
    )
    .catch((error) => console.log('FEL med getWork: ' + error));
}


//Visar kursnamn
function displayWork(data) {

    workTitle1.innerHTML = "";
    workTitle2.innerHTML = "";
    workTitle3.innerHTML = "";
    workTitle4.innerHTML = "";

    work1.innerHTML = "";
    work2.innerHTML = "";
    work3.innerHTML = "";
    work4.innerHTML = "";
    readMoreButtonWork.innerHTML = "Läs mer";

    workTitle1.innerHTML = "Arbetsplats";
    work1.innerHTML = "";
    data.forEach((row) => {
        work1.innerHTML += row['WORKPLACE'] + "<br/>"; 
    });
} 


//Efter klick på "läs mer"
function getFullWork() {

    fetch(urlWork)
        .then(function(response) {

            if (response.status !== 200) {
                console.log('Fel vid hämtning av alla jobb' + response.status);
                return;
            }
            response.json().then(function(data) {
                displayFullWork(data); 
            });
        }
    )
    .catch((error) => console.log('FEL med getWork: ' + error));
}


function displayFullWork(data) {

    workTitle1.innerHTML = "Arbetsplats";
    workTitle2.innerHTML = "Yrke";
    workTitle3.innerHTML = "Startdatum";
    workTitle4.innerHTML = "Slutdatum";

    work1.innerHTML = "";
    work2.innerHTML = "";
    work3.innerHTML = "";
    work4.innerHTML = "";
    readMoreButtonWork.innerHTML = "Läs mindre";

    data.forEach((row) => {

        work1.innerHTML += row['WORKPLACE'] + "<br/>"; 
        work2.innerHTML += row['TITLE'] + "<br/>";
        work3.innerHTML += row['STARTDATE'] + "<br/>";
        work4.innerHTML += row['ENDDATE'] + "<br/>";
    });
}