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

var filmNotFound = document.getElementById('no-film');
var wrongInput = document.getElementById('wrong-film');
var omdbResponseHandler = function(responseObject) {
    //if no such film or game exists
    if (responseObject.Response === 'False') {
        filmNotFound.className = 'show';
    } else if (responseObject.Type !== 'movie') {
        //if something exists but its not a movie
        wrongInput.className = 'show';
    } else {
        domBuilder(responseObject);
    }
};

domBuilder = function(responseObject) {
    var title = document.createElement('H1');
    title.innerHTML = responseObject.Title;
    title.className = 'title';
    document.getElementById('response-container').appendChild(title);
    var poster = document.createElement('img');
    poster.src = responseObject.Poster;
    poster.className = 'poster';
    document.getElementById('response-container').appendChild(poster);
    var rating = document.createElement('H3');
    rating.innerHTML = responseObject.imdbRating;
    rating.className = 'info';
    document.getElementById('response-container').appendChild(rating);
    var plot = document.createElement('H4');
    plot.innerHTML = responseObject.Plot;
    plot.className = 'info';
    document.getElementById('response-container').appendChild(plot);
};

document.getElementById('submit-btn').addEventListener('click', function(e) {
    e.preventDefault();
    var details = document.getElementById('response-container');
    while (details.firstChild) {
        details.removeChild(details.firstChild);
    }
    filmNotFound.className = 'hide';
    wrongInput.className = 'hide';
    var filmInput = document.getElementById('film-input').value.replace(/ /g, '+');
    var uri = 'http://www.omdbapi.com/?t=' + filmInput + '&y=&plot=short&r=json';
    omdbResponse.open('GET', uri, true);
    omdbResponse.send();
});
