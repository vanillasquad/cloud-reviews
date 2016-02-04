var omdbResponse = new XMLHttpRequest();
var response;
var checkInput = '';


omdbResponse.onreadystatechange = function() {
    if( omdbResponse.readyState === 4 && omdbResponse.status === 200 ){
        response = JSON.parse(omdbResponse.responseText);
        omdbResponseHandler(response);
        return response;
    }
};

var omdbResponseHandler = function(responseObject) {
    //if no such film or game exists
    if (responseObject.Response === 'False') {
        checkInput = 'No film here';
    } else if (responseObject.Type !== 'movie') {
        //if something exists but its not a movie
        checkInput = 'Please input a more specific title';
    }
    var pElement = document.createElement('p');
    pElement.innerHTML = checkInput;
    document.getElementById('response-container').appendChild(pElement);
};

domBuilder = function(responseObject) {

};

// document.getElementById('submit-btn').addEventListener('click', function(e) {
//     e.preventDefault();
//     var filmInput = document.getElementById('film-input').value.replace(/ /g, '+');
//     console.log(filmInput);
//     var uri = 'http://www.omdbapi.com/?t=' + filmInput + '&y=&plot=short&r=json';
//     omdbResponse.open('GET', uri, true);
//     omdbResponse.send();
// });
