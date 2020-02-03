let urlCourse = 'http://mimmimi.com/webb3/projekt/backend/rest.php/course';

const listedCoursesElement = document.getElementById("listedCourses");
let course1 = document.getElementById("course1");
let course2 = document.getElementById("course2");
let course3 = document.getElementById("course3");
let course4 = document.getElementById("course4");

let courseTitle1 = document.getElementById("courseTitle1");
let courseTitle2 = document.getElementById("courseTitle2");
let courseTitle3 = document.getElementById("courseTitle3");
let courseTitle4 = document.getElementById("courseTitle4");

let readMoreButtonCourses = document.getElementById("readMoreButtonCourses");
readMoreButtonCourses.addEventListener('click', readMoreOrLessCourses, false);


window.onload = getCourse(); 

function readMoreOrLessCourses() {

    if(readMoreButtonCourses.innerHTML == "Läs mer") {
        getFullCourses();
    } else {
        getCourse(); 
    }
}


//Hämtar kurser 
function getCourse() {

    fetch(urlCourse)
        .then(function(response) {

            if (response.status !== 200) {
                console.log('Fel vid hämtning av alla kurser' + response.status);
                return;
            }
            response.json().then(function(data) {
                displayCourses(data); 
            });
        }
    )
    .catch((error) => console.log('FEL med getCourse: ' + error));
}


//Visar kursnamn
function displayCourses(data) {

    courseTitle1.innerHTML = "";
    courseTitle2.innerHTML = "";
    courseTitle3.innerHTML = "";
    courseTitle4.innerHTML = "";

    course1.innerHTML = "";
    course2.innerHTML = "";
    course3.innerHTML = "";
    course4.innerHTML = "";
    readMoreButtonCourses.innerHTML = "Läs mer";

    courseTitle7.innerHTML = "Kursnamn";
    course7.innerHTML = "";
    data.forEach((row) => {
        course7.innerHTML += row['COURSENAME'] + "<br/>"; 
    });
} 


function getFullCourses() {

    fetch(urlCourse)
        .then(function(response) {

            if (response.status !== 200) {
                console.log('Fel vid hämtning av alla kurser' + response.status);
                return;
            }
            response.json().then(function(data) {
                displayFullCourses(data); 
            });
        }
    )
    .catch((error) => console.log('FEL med getCourse: ' + error));
}

//Efter klick på "läs mer"
function displayFullCourses(data) {

    courseTitle1.innerHTML = "Skola";
    courseTitle2.innerHTML = "Kursnamn";
    courseTitle3.innerHTML = "Startdatum";
    courseTitle4.innerHTML = "Slutdatum";
    courseTitle7.innerHTML = "";

    course1.innerHTML = "";
    course2.innerHTML = "";
    course3.innerHTML = "";
    course4.innerHTML = "";
    course7.innerHTML = "";
    readMoreButtonCourses.innerHTML = "Läs mindre";

    data.forEach((row) => {

        course1.innerHTML += row['SCHOOL'] + "<br/>"; 
        course2.innerHTML += row['COURSENAME'] + "<br/>";
        course3.innerHTML += row['STARTDATE'] + "<br/>";
        course4.innerHTML += row['ENDDATE'] + "<br/>";
    });
}