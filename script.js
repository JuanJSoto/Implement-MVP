function weatherAPI() { 
  weatherKey = '181f464706d1481aa83145425202210';
  //location = zip;
  fetch('https://api.weatherapi.com/v1/current.json?key=' + weatherKey + '&q=' + zip + '&day=1' 
  ).then(response => { 
    if(response.ok) { 
      return response.json(); 
    } 
    throw new Error(response.statusText); 
  }).then(resJson => displayWeather(resJson));
} 

function displayWeather(resJson) {
  $('#weatherResults').empty(); 
  $('#weatherResults').append(`<div id='weatherResults'> <p>${resJson.location.name}</p> <p>${resJson.current.temp_f}</p> </div>`); 
}
//credentials
var key ='9nhcxVL4VrdhKROjUC86WCom3OYLr5gQW5LZk50A6K0xZu4YA7'
var secret =  'RIDQqA66hFUvBT9VrgShe8PjEeUIiXtzzuUTH9GV'

// Call details
var status = 'adoptable';
const petForm = document.querySelector('#pet-form');
petForm.addEventListener('submit', fetchAnimals);

//Fetch Animals From API
function fetchAnimals() {
  var a = document.getElementById("animal");  
  const animal = $('#animal').val();
  zip = document.getElementById('zip').value;


  fetch('https://api.petfinder.com/v2/oauth2/token', {
	  method: 'POST',
	  body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	  }
  }).then(function (resp) {
	  return resp.json();
  }).then(function (data) {
	  return fetch('https://api.petfinder.com/v2/animals?type=' + animal + '&location=' + zip + '&status=' + status, {
		  headers: {
			  'Authorization': data.token_type + ' ' + data.access_token,
			  'Content-Type': 'application/x-www-form-urlencoded'
		  }
	  });
  }).then(response => {
    if(response.ok) {
      return response.json();
    }
  throw new Error(response.statusText);
  })
  .then(responseJson => displayPets(responseJson))
  .catch(error => alert('Something went wrong with Petfinder API. Try again later.'))
}

function displayPets(responseJson) {
  let html = '';
  for (let i=0; i<responseJson.animals.length; i++) {
    const animal = responseJson.animals[i];
    if (animal.photos.length > 0) {
      html += `<img src=${responseJson.animals[i].photos[0].small} />`
    }

    if(animal.contact.email) {
      html += `<br/><p>${animal.contact.email}</p>`;
    }

    if(animal.contact.phone) {
      html += `<br/><p>${animal.contact.phone}</p>`;
    }

    if(animal.contact.address1) {
      html += `<br/><p>${animal.contact.address1}</p>`;
    }
  }
  $('#petResults').empty();
  $('#petResults').html(html);
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    $('.results').removeClass('hidden');
    weatherAPI();
  })
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
})