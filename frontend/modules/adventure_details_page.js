import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get('adventure');

  // Place holder for functionality to work in the Stubs
  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
  const data = await res.json();
  return data;
  }
  catch(err){
    return null;
  }


  // Place holder for functionality to work in the Stubs

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
let name=document.getElementById("adventure-name");
name.innerHTML=adventure.name;
let sub=document.getElementById("adventure-subtitle");
sub.innerHTML=adventure.subtitle;
let content=document.getElementById("adventure-content");
content.innerHTML=adventure.content;
let phot=document.getElementById("photo-gallery");
for(let i=0;i<adventure.images.length;i++){
  phot.innerHTML += `<img src="${adventure.images[i]}" class="activity-card-image">`
}

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photo=document.getElementById("photo-gallery");
  photo.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="inner">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
let deep=document.getElementById("inner");
for(let i=0;i<images.length;i++){
  deep.innerHTML += `<div class="carousel-item ${i === 0 ? "active" : ""}">
  <img src="${images[i]}" class="d-block w-100">
</div>`
}
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
  if(adventure.available){
    
document.getElementById('reservation-panel-sold-out').style.display = "none";
document.getElementById('reservation-panel-available').style.display = "block";
document.getElementById('reservation-person-cost').innerHTML=adventure.costPerHead;


  }
else{
  document.getElementById('reservation-panel-sold-out').style.display = "block";
  document.getElementById('reservation-panel-available').style.display = "none";

}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
document.getElementById('reservation-cost').innerHTML= persons*adventure.costPerHead;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
document.getElementById('myForm').addEventListener('submit',async (event) =>{
  event.preventDefault();
  try{
    let form = document.getElementById('myForm');
    console.log(form.elements.name.value)
    console.log(form.elements.date.value)
    console.log(form.elements.person.value)
    console.log(adventure.id)

    await fetch(config.backendEndpoint+'/reservations/new',{
      method: 'POST',
      body: JSON.stringify({
        name: form.elements.name.value,
        date: form.elements.date.value,
        person: form.elements.person.value,
        adventure: adventure.id
      }),
      headers: {
            "content-type": "application/json; charset=UTF-8"
          } 
    })

    alert('Success!');
  }
  catch(e){
    alert('Failed!');
  }
})
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
if(adventure.reserved){
document.getElementById('reserved-banner').style.display="block";
}
else{
  document.getElementById('reserved-banner').style.display="none";
}
  
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
