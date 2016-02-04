var response;
var checkInput = '';

function sendOmdbRequest(filmInput) {
    var omdbResponse = new XMLHttpRequest();

    omdbResponse.onreadystatechange = omdbResponseHandler(omdbResponse);
    var uri = 'http://www.omdbapi.com/?t=' + filmInput.replace(/ /g, '+') + '&y=&plot=short&r=json';
    omdbResponse.open('GET', uri, true);
    omdbResponse.send();
}


function omdbResponseHandler(xhr) {
    if( xhr.readyState === 4 && xhr.status === 200 ){
        response = JSON.parse(xhr.responseText);
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
