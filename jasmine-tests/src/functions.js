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
    } else {
        domBuilder(responseObject);
    }
    var pElement = document.createElement('p');
    pElement.innerHTML = checkInput;
    document.getElementById('response-container').appendChild(pElement);
};

domBuilder = function(responseObject) {
    var poster = document.createElement('img');
    poster.src = responseObject.Poster;
    document.getElementById('response-container').appendChild(poster);
    var rating = document.createElement('P');
    rating.innerHTML = responseObject.imdbRating;
    document.getElementById('response-container').appendChild(rating);
    var plot = document.createElement('P');
    plot.innerHTML = responseObject.Plot;
    document.getElementById('response-container').appendChild(plot);
};
