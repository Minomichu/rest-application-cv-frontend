let urlWeb = 'http://mimmimi.com/webb3/projekt/backend/rest.php/webpage';

const listedWebElement = document.getElementById("listedWeb");
let web1 = document.getElementById("web1");

let webTitle = document.getElementById("webTitle");
let webBlockElement = document.getElementById("webBlock");

let readMoreButtonWeb = document.getElementById("readMoreButtonWeb");
readMoreButtonWeb.addEventListener('click', readMoreOrLessWeb, false);


window.onload = getWeb(); 

function readMoreOrLessWeb() {

    if(readMoreButtonWeb.innerHTML == "Läs mer") {
        getFullWeb();
    } else {
        getWeb(); 
    } 
}



//Hämtar kurser 
function getWeb() { 

    fetch(urlWeb)
        .then(function(response) {

            if (response.status !== 200) {
                console.log('Fel vid hämtning av alla webbsidor' + response.status);
                return;
            }
            response.json().then(function(data) {
                displayWeb(data); 
            });
        }
    )
    .catch((error) => console.log('FEL med getWeb: ' + error));
}


//Visar kursnamn
function displayWeb(data) {

    webTitle.innerHTML = "";
    web1.innerHTML = "";
    webBlockElement.innerHTML = "";
    readMoreButtonWeb.innerHTML = "Läs mer";
    webTitle.innerHTML = "Hemsida";

    data.forEach((row) => {
        web1.innerHTML += row['WEBNAME'] + "<br/>"; 
    });
} 


function getFullWeb() {

    fetch(urlWeb)
        .then(function(response) {

            if (response.status !== 200) {
                console.log('Fel vid hämtning av alla webbsidor' + response.status);
                return;
            }
            response.json().then(function(data) {
                displayFullWeb(data); 
            });
        }
    )
    .catch((error) => console.log('FEL med getWeb: ' + error));
}

//Efter klick på "läs mer"
function displayFullWeb(data) {

    webTitle.innerHTML = "";
    web1.innerHTML = "";
    webBlockElement.innerHTML = "";
    readMoreButtonWeb.innerHTML = "Läs mindre";

    data.forEach((row) => {

        let webBlockArticle = document.createElement("article");
        let webBlockImageDiv = document.createElement("div");
        webBlockImageDiv.id = "webBlockImageDiv";
        let webBlockTextDiv = document.createElement("div");
        webBlockTextDiv.id = "webBlockTextDiv";
        let webBlockEditDiv = document.createElement("div");
        webBlockEditDiv.id = "webBlockEditDiv";

        let webNumber = row['ID'];

        let webImageInput = document.createElement("img");
        webImageInput.name = "webImageInput";
        webImageInput.id = "webImageInput" + webNumber;
        webImageInput.src += "../admin/webpageImages/" + row['WEBIMAGE'];
        webBlockImageDiv.appendChild(webImageInput);
        webBlockArticle.appendChild(webBlockImageDiv);

        let webNameInput = document.createElement("div");
        webNameInput.type = "text";
        webNameInput.name = "webNameInput";
        webNameInput.id = "webNameInput" + webNumber;
        webNameInput.innerHTML += row['WEBNAME'];
        webBlockTextDiv.appendChild(webNameInput);

        let theLink = row['WEBURL'];
        let webUrlInput = document.createElement("div");
        webUrlInput.type = "text";
        webUrlInput.name = "webUrlInput";
        webUrlInput.id = "webUrlInput" + webNumber;
        webUrlInput.innerHTML += '<a href="http://' + theLink + '"target="_blank">' + theLink + '</a>';
        webBlockTextDiv.appendChild(webUrlInput);

        let smallMarginElement = document.createElement("div");
        smallMarginElement.id = "smallMarginElement";
        webBlockTextDiv.appendChild(smallMarginElement); 

        let webDescriptionInput = document.createElement("div");
        webDescriptionInput.type = "text";
        webDescriptionInput.name = "webDescriptionInput";
        webDescriptionInput.id = "webDescriptionInput" + webNumber;
        webDescriptionInput.innerHTML += row['WEBDESCRIPTION'];
        webBlockTextDiv.appendChild(webDescriptionInput);

        webBlockTextDiv.appendChild(webBlockEditDiv);

        let marginElement = document.createElement("div");
        marginElement.id = "marginElement";

        webBlockArticle.appendChild(webBlockTextDiv);
        webBlockArticle.appendChild(marginElement);

        webBlockElement.appendChild(webBlockArticle);
    });

}