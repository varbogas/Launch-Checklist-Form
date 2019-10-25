// Write your JavaScript code here!
window.addEventListener("load", function() {
   // put DOM code here to ensure elements have been loaded
   console.log('window loaded');
});


window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoWeightInput = document.querySelector("input[name=cargoWeight]");


      let submitButtonClick = document.getElementById("formSubmit");
      let faultyItemsDiv = document.getElementById("faultyItems");
   
      //Update pilot names
      let pilotStatusDiv = document.getElementById("pilotStatus");
      let copilotStatusDiv = document.getElementById("copilotStatus");
   
      //Update fuel and cargo levels
      let fuelLevelDiv = document.getElementById("fuelStatus");
      let cargoLevelDiv = document.getElementById("cargoStatus");
   
      //Update h2 header to red and not ready for launch
      let launchHeader = document.getElementById("launchStatus");


      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoWeightInput.value === "") {
         alert("All fields are required!");
         // Stop the form submission
         event.preventDefault();
      }

      //Check for valid string for pilot name
      //let letters = /^[a-zA-Z]*$/
      let letters = /^[a-zA-Z ]*$/
      if (!pilotNameInput.value.match(letters)) {
         alert("Pilot Name: " + pilotNameInput.value + " is not a string");
         // stop the form submission
         event.preventDefault();
      }   
 
      //Check for valid string for copilot name
      if (!copilotNameInput.value.match(letters)) {
         alert("Co-pilot Name: " + copilotNameInput.value + " is not a string");
         // stop the form submission
         event.preventDefault();
      }            

      //Check for valid number for fuel level input
      if (isNaN(fuelLevelInput.value) === true) {
         alert("Fuel Level (gal): " + fuelLevelInput.value + " is not a number");
         // stop the form submission
         event.preventDefault();
      }

      //Check for valid number for cargo weight input
      if (isNaN(cargoWeightInput.value) === true) {
         alert("Fuel Level (gal): " + cargoWeightInput.value + " is not a number");
         // stop the form submission
         event.preventDefault();
      }  

      //Fuel level below 10000kg
      if(fuelLevelInput.value <= 10000){
         faultyItemsDiv.style.visibility = 'visible';
         pilotStatusDiv.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatusDiv.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         fuelLevelDiv.innerHTML = "Fuel level too low for launch";
         launchHeader.style.color = "red";
         launchHeader.innerHTML = "Shuttle not ready for launch";
         event.preventDefault();
      }

      //Mass level above 10000kg
      if(cargoWeightInput.value > 10000){
         faultyItemsDiv.style.visibility = 'visible';
         pilotStatusDiv.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatusDiv.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         cargoLevelDiv.innerHTML = "Cargo mass too high for launch";
         launchHeader.style.color = "red";
         launchHeader.innerHTML = "Shuttle not ready for launch";
         event.preventDefault();
      }


      //Fuel level above 10000kg and mass level below 10000kg
      if(fuelLevelInput.value >= 10000 && cargoWeightInput.value < 10000){
         launchHeader.style.color = "green";
         launchHeader.innerHTML = "Shuttle is ready for launch";
         faultyItemsDiv.style.visibility = 'visible';
         pilotStatusDiv.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`;
         copilotStatusDiv.innerHTML = `Co-pilot ${copilotNameInput.value} is ready for launch`;
         event.preventDefault();
      }
      
   });

});


function planetDestination() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
   return response.json();
 
   })
 
   .then(function(json) {
     let containerTag = document.getElementById("missionTarget");
     let planetInfo = `<h2>Mission Destination</h2>
      <ol>
         <li>Name: ${json[1].name}</li>
         <li>Diameter: ${json[1].diameter}</li>
         <li>Star: ${json[1].star}</li>
         <li>Distance from Earth: ${json[1].distance}</li>
         <li>Number of Moons: ${json[1].moons}</li>
      </ol>
      <img src="${json[1].image}">}`;
      containerTag.innerHTML += planetInfo;
   });
 
 }
 
 window.onload = function() {
   planetDestination();
}


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
