
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  return params.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
  const data = await res.json();
  return data;
  }
  catch(err){
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach((key) => {
    let container = document.createElement("div");
  container.setAttribute("class","activity-card col-sm-12 col-md-6 col-lg-3 mb-4");
  container.innerHTML=`
        <a href="detail/?adventure=${key.id}" id="${key.id}">
          <div class="category-banner"> ${key.category}</div>
          
          <img class="activity-card-image" src=${key.image}>
          <p>${key.name}<p><p>${key.costPerHead}<p> 
          <p>Duration:${key.duration}<p>`
          document.getElementById("data").appendChild(container);
  });}



//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter(function (e){
    return e.duration >= low && e.duration <= high;
  });
 return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
// let filteredList = list.filter(function (e){
//   return e.category == categoryList;
// });
// return filteredList;
const filteredList = list.filter(adventure => categoryList.includes(adventure.category))
return filteredList;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = [];
  if(filters["duration"].length > 0 && filters["category"].length > 0){
    filteredList = filterByCategory(list, filters["category"]);
    const myArr = filters["duration"].split("-")
    let low = myArr[0];
    let high = myArr[1];
   filteredList = filterByDuration(filteredList, low, high);
  }
  else if(filters["duration"].length > 0 && filters["category"].length == 0){
    const myArr = filters["duration"].split("-")
    let low = myArr[0];
    let high = myArr[1];
    filteredList = filterByDuration(list, low, high);
  }
  else if(filters["duration"].length == 0 && filters["category"].length > 0){
    filteredList = filterByCategory(list, filters["category"]);
  }
  else{
   filteredList = list;
   
  }
  
  

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
localStorage.setItem('filters',JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(localStorage.getItem('filters'));
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // filters.forEach((key) => {
  //   let container = document.createElement("div");
  // container.setAttribute("class","category-filter");
  // container.innerHTML=`${key.category}`;
  // document.getElementById("category-list").appendChild(container);
  let pillsDisplay =  document.getElementById("category-list");
  for( let pills of filters.category){
    pillsDisplay.innerHTML +=  `
                                  <div style="position:relative">
                                  <div class="category-filter">${pills}</div>
                                  
                                  </div>
                                  `
  }
  }


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
