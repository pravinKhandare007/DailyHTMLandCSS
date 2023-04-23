//fetching data
const data = fetch('./data.json')
                .then((response) => response.json())
                .then((json) => {return json});

//id variable is used as a pointer to iterate through idArray
let id = 0;

//idArray arrray variable is used to store the id of all the reume objects and idArray changes as we search for a specific job 
//when searched for a job idArray includes only the ids of objects that have the same job
let idArray = [];

//search functinality
const search = document.getElementById("search-box");
search.addEventListener("keypress", intermideateResponse );

//next fnctonality
const next = document.getElementById("next");
next.addEventListener('click', getNextResume);

//previous functionality
const previous = document.getElementById("previous");
previous.addEventListener('click', getPreviousResume);

start();

function start(){
    data.then( function(result){
        let objArray = result.resume;
        for(const element in objArray){
            idArray.push(objArray[element].id - 1 ); 
        }
        writeDataIntoIndexhtml(idArray[0]);
        hidePreviousButton();
    });
}

function hideNextButton(){
    document.getElementById("next").style.display = "none";
}

function hidePreviousButton(){
    document.getElementById("previous").style.display = "none";
}

function showNextButton(){
    document.getElementById("next").style.display = "block";
}

function showPreviousButtton(){
    document.getElementById("previous").style.display = "block";
}

function getPreviousResume(){
    id--;
    writeDataIntoIndexhtml(idArray[id]);
    if( id == 0 ) hidePreviousButton();
    if( id < (idArray.length - 1)) showNextButton();
}


function getNextResume(){
    id++;
    writeDataIntoIndexhtml(idArray[id]); 
    if( id == (idArray.length-1) ) hideNextButton();
    if( id > 0 ) showPreviousButtton();
}

//the data promise is resolved so we can use "then" method/function ? on it to manipulate data

function resetId(){
    console.log("reset id start");
    id = 0;
    console.log("reset id stop");
}

function resetIdArray(){
    console.log("reset idArray start")
    data.then( function(result){
        let objArray = result.resume;
        idArray.length = 0;
        for(const element in objArray){
            idArray.push(objArray[element].id - 1 ); 
        }
        //console.log("idArray reseted");
        //console.log("this is idArray[0]: "+ idArray[0]);
    });
    console.log("reset idArray stop");
};

function hideResumeTemplate(){
    document.getElementById('resume-template').style.display= "none";
};

function showResumeTemplate(){
    document.getElementById('resume-template').style.display= "block";
}

function hideErrorMessage(){
    document.getElementById('error-message').style.display= "none";
}

function showErrorMessage(){
    document.getElementById('error-message').style.display= "block";
}

function intermideateResponse(e){
    if (e.keyCode === 13) {
        inputResponse(search.value);
      }
}

function inputResponse(e){
    //console.log(e);
    //console.log(search.value)
    if(search.value == ""){
        hidePreviousButton();
        hideErrorMessage();
        showResumeTemplate();
        showNextButton();
        resetId();
        resetIdArray();
        writeDataIntoIndexhtml(id);   
    } 
    else{
        let input = search.value;
        data.then( function(result){
            let objArray = result.resume;
            idArray.length = 0;
            for(const element in objArray){
                if(objArray[element].basics.AppliedFor.toLowerCase() === input.toLowerCase()){
                    idArray.push(objArray[element].id - 1 );
                }
            }
        if(idArray.length == 0){
            hideResumeTemplate();
            showErrorMessage();
            hideNextButton();
            hidePreviousButton();

        }
        else{
            console.log(idArray.length == 1)
            if( idArray.length == 1) {
                //hideErrorMessage();
                hideNextButton();
                hidePreviousButton();
                resetId();
                writeDataIntoIndexhtml(idArray[id]);
            }
            else{
                resetId();
                hideErrorMessage();
                writeDataIntoIndexhtml(idArray[id]);
                showNextButton();
            }
        }
    })
    }
};

function writeDataIntoIndexhtml(id) {
    console.log("upload started");
    data.then(function(result) {
        let objArray = result.resume;

        document.getElementById("name").innerText = objArray[id].basics.name;
        document.getElementById("postion").innerText = objArray[id].basics.AppliedFor;
        document.getElementById("phone-number").innerText = objArray[id].basics.phone;
        document.getElementById("gmail").innerText = objArray[id].basics.email;
        document.getElementById("linkedin").innerText = objArray[id].basics.profiles.url;

        // Inserting technical skills array
        let skillsArray = objArray[id].skills.keywords;
        let str = skillsArray.join('<br>');
        let templateString = `<p>  ${str} </p>`;
        document.getElementById("skills").innerHTML = templateString;

        // Now inserting hobbies the same way
        let hobbiesArray = objArray[id].interests.hobbies;
        let hobbiesString = hobbiesArray.join('<br>');
        let hobbiesInnerHtml = `<p> ${hobbiesString} </p>`
        document.getElementById("hobbies").innerHTML = hobbiesInnerHtml;

        // Starting to fill part-2
        document.getElementById("company-name").innerText = objArray[id].work["Company Name"];
        document.getElementById("position").innerText = objArray[id].work.Position;
        document.getElementById("start-date").innerText = objArray[id].work["Start Date"];
        document.getElementById("end-date").innerText = objArray[id].work["End Date"];
        document.getElementById("summary").innerText = objArray[id].work.Summary;

        // Filling Projects
        document.getElementById("project-name").innerText = objArray[id].projects.name;
        document.getElementById("project-description").innerText = objArray[id].projects.description;

        // Education
        let ugObject = objArray[id].education.UG;
        let ugArray = Object.values(ugObject);
        let stringOfUgArray = ugArray.join(', ');
        document.getElementById("UG").innerText = stringOfUgArray;

        let ssObject = objArray[id].education["Senior Secondary"];
        let ssArray = Object.values(ssObject);
        let stringOfSsArray = ssArray.join(', ');
        document.getElementById("SS").innerText = stringOfSsArray;

        let highSchoolObject = objArray[id].education["High School"];
        let highSchoolArray = Object.values(highSchoolObject);
        let stringOfHighSchoolArray = highSchoolArray.join(', ');
        document.getElementById("HS").innerText = stringOfHighSchoolArray;

        document.getElementById("internship-company-name").innerText = objArray[id].Internship["Company Name"];
        document.getElementById("internship-position").innerText = objArray[id].Internship["Position"];
        document.getElementById("internship-start-date").innerText = objArray[id].Internship["Start Date"];
        document.getElementById("internship-end-date").innerText = objArray[id].Internship["End Date"];
        document.getElementById("internship-summary").innerText = objArray[id].Internship["Summary"];

        // Achievements
        document.getElementById("achievement-summary").innerText = objArray[id].achievements.Summary;

        console.log("upload finished");
    });
};



