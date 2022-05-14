// redacted
let apikey = ''

let reset = document.querySelector('#reset')

let nearestCity = document.querySelector("#nearestCity")
let nearestIndex = document.querySelector('#aqi1')


let select = document.querySelector("#country")
let countriesList = [];
let indivCountry = '';

let selectTwo = document.querySelector("#state")
let statesList = [];
let indivState = '';

let selectThree = document.querySelector("#city")
let citiesList = [];
let indivCity = '';


let city2Index = document.querySelector('#aqi2')


const populate = (array, dropdown) => {
  for (const element of array){
    const option = document.createElement('option')
    option.value = element
    option.textContent = element
    dropdown.appendChild(option)
  }
}


reset.addEventListener('click', function(){
  city2Index.textContent = "";
  const stateDefaultOption = document.createElement('option')
  stateDefaultOption.value = "Choose a state"
  stateDefaultOption.textContent = "Choose a state"
  document.querySelector('#state').replaceChildren(stateDefaultOption)

  selectTwo.setAttribute('disabled', true)

  const cityDefaultOption = document.createElement('option')
  cityDefaultOption.value = "Choose a city"
  cityDefaultOption.textContent = "Choose a city"
  document.querySelector('#city').replaceChildren(cityDefaultOption)

  selectThree.setAttribute('disabled', true)
  indivCountry = '';
  statesList = [];
  indivState = '';
  citiesList = [];
  indivCity = '';
  
  
})


// NEAREST CITY

fetch(`https://api.airvisual.com/v2/nearest_city?key=${apikey}`) //AQI in nearest city based on IP address
.then(res => res.json()) // parse response as JSON
.then(data => {
  
  let nearest = `${data.data.city}, ${data.data.state}, ${data.data.country}`
  console.log(data.data)
  nearestCity.textContent = nearest
  nearestIndex.textContent = data.data.current.pollution.aqius

})

.catch(err => {
  console.log(`error ${err}`)
})



// COUNTRY SELECTION - SELECT

fetch(`https://api.airvisual.com/v2/countries?key=${apikey}`) 
.then(res => res.json()) // parse response as JSON
.then(data => {
  const countryListObject = data.data
  for (const countryObj of countryListObject){
    countriesList.push(countryObj.country)
  }
  populate(countriesList, select)

  select.addEventListener('change', event => {
    statesList = [];
    indivState = '';
    citiesList = [];
    indivCity = '';
    indivCountry = event.target.value
    selectTwo.removeAttribute('disabled') //allow next selection, of state
    callPopStates();
  })

})

.catch(err => {
  console.log(`error ${err}`)
})


// STATE SELECTION - SELECTTWO
// sequence was needed to prevent fetch error
const callPopStates = () => {

  fetch(`https://api.airvisual.com/v2/states?country=${indivCountry}&key=${apikey}`) 
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    const stateListObject = data.data
    for (const stateObj of stateListObject){
      statesList.push(stateObj.state)
    }
    console.log(statesList)
    populate(statesList, selectTwo)

    selectTwo.addEventListener('change', event => {
      citiesList = [];
      indivCity = '';
      indivState = event.target.value
      selectThree.removeAttribute('disabled') //allow next selection, of city
      callPopCities();
    })

  })

  .catch(err => {
    console.log(`error ${err}`)
  })
}


// CITY SELECTION - SELECTTHREE and then return AQI
// sequence was needed to prevent fetch error

const callPopCities = () => {
  
  fetch(`https://api.airvisual.com/v2/cities?state=${indivState}&country=${indivCountry}&key=${apikey}`) 
  .then(res => res.json()) // parse response as JSON
  .then(data => {
    console.log(data)
    const cityListObject = data.data
    for (const cityObj of cityListObject){
      citiesList.push(cityObj.city)
    }
    console.log(citiesList)
    populate(citiesList, selectThree)

    selectThree.addEventListener('change', event => {
      indivCity = event.target.value
      getIndex(indivCountry,indivState,indivCity)
    })

  })

  .catch(err => {
    console.log(`error ${err}`)
  })

  const getIndex = (country,state,city) => {
    fetch(`https://api.airvisual.com/v2/city?city=${indivCity}&state=${indivState}&country=${indivCountry}&key=${apikey}`) //AQI 2
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)

      city2Index.textContent = `${data.data.current.pollution.aqius}`


    })

    .catch(err => {
      console.log(`error ${err}`)
    })
  }
}


