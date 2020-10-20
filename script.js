
//credentials
var key ='9nhcxVL4VrdhKROjUC86WCom3OYLr5gQW5LZk50A6K0xZu4YA7'
var secret =  'RIDQqA66hFUvBT9VrgShe8PjEeUIiXtzzuUTH9GV'
// Call details
//var locationA = 'ri77'; don't really need?
var status = 'adoptable';

const petForm = document.querySelector('#pet-form');
petForm.addEventListener('submit', fetchAnimals);

//Fetch Animals From API
function fetchAnimals() {
  console.log(fetchAnimals);
  //e.preventDefault();
  //Get User Input
  var a = document.getElementById("animal");  
  //const animal = a.options[a.selectedIndex].value;
  const animal = $('#animal').val();
  const zip = document.getElementById('zip').value;


fetch('https://api.petfinder.com/v2/oauth2/token', {
	method: 'POST',
	body: 'grant_type=client_credentials&client_id=' + key + '&client_secret=' + secret,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
}).then(function (resp) {

	// Return the response as JSON
	return resp.json();

}).then(function (data) {

	// Log the API data
	console.log('token', data);

	// Return a second API call
	// This one uses the token we received for authentication
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
.then(responseJson => displayResults(responseJson))
.catch(error => alert('Something went wrong. Try again later.'));
/*
}).then(function (resp) {

	// Return the API response as JSON
	return resp.json();

}).then(function (data) {

	// Log the pet data
	console.log('pets', data);

}).catch(function (err) {

	// Log any errors
	console.log('something went wrong', err);

});
};
*/

//Show Listings of Pets
/*
function showAnimals(pets) {
  const results = document.querySelector('#results');
  //Clear First
  results.innerHTML = '';
  //Loop Through Pets
  pets.forEach((pet) => {    const div = document.createElement('div');
    div.classList.add('card', 'card-body', 'mb-3');
    div.innerHTML = `
      <div class = 'row'>
        <div class='col-sm-6'>
          <h4>${pet.name.$t} (${pet.age.$t})</h4>
        </div>
      </div>
    `;

    results.appendChild(div);
    
  });
}
*/
}
function displayResults(responseJson) {
  console.log(JSON.stringify(responseJson.animals));
  let html = '';
  for (let i=0; i<responseJson.animals.length; i++) {
    if (responseJson.animals[i].photos.length > 0) {
      html += `<img src="${responseJson.animals[i].photos[0].small}" /><br/><p>${responseJson.animals[i].contact.email}</p>`
    }
  }
  $('#results').empty();
  $('#results').html(html);
  //empty(); moved down one here from $('results').empty();
  //$('results').append(`<img src="${responseJson.animals}" alt='adoptable pets'`);
}

function watchForm() {
  console.log(watchForm);
  $('form').submit(event => {
    event.preventDefault();
    $('.results').removeClass('hidden');
    fetchAnimals();
  })
}


$(function() {
  console.log('App loaded! Waiting for submit!');
  watchForm();
})