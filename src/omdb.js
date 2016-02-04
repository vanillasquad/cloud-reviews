function sendOmdbRequest(filmInput) {
    var omdbResponse = new XMLHttpRequest();

    omdbResponse.onreadystatechange = omdbResponseHandler(omdbResponse);
    var uri = 'http://www.omdbapi.com/?t=' + filmInput.replace(/ /g, '+') + '&y=&plot=short&r=json';
    omdbResponse.open('GET', uri, true);
    omdbResponse.send();
}

function omdbResponseHandler(xhr) {
    return function() {
        if( xhr.readyState === 4 && xhr.status === 200 ){
            var response = JSON.parse(xhr.responseText);
            omdbResponseHandler(response);
            noFilmCheck(response);
        }
    };
}

function noFilmCheck(responseObject) {
    //if no such film or game exists
    var checkInput;
    if (responseObject.Response === 'False') {
        checkInput = 'Try a different film';
    } else if (responseObject.Type !== 'movie') {
        //if something exists but its not a movie
        checkInput = 'Please input a more specific title';
    } else {
        domBuilder(responseObject);
        checkInput = '';
    }
    var pElement = document.createElement('p');
	pElement.className = 'error';
    pElement.innerHTML = checkInput;
    document.getElementById('response-container').appendChild(pElement);
}

function domBuilder(responseObject) {
	console.log(responseObject);
	var summaryContainer = document.createElement('div');
	summaryContainer.className = 'summary-container'

    var title = document.createElement('P');
    title.innerHTML = responseObject.Title;
    title.className = 'title';
    summaryContainer.appendChild(title);

    var rating = document.createElement('P');
    rating.className = 'rating';
    rating.innerHTML = responseObject.imdbRating;
    summaryContainer.appendChild(rating);

    var plot = document.createElement('P');
    plot.className = 'plot';
    plot.innerHTML = responseObject.Plot;
    summaryContainer.appendChild(plot);

	// var poster = document.createElement('img');
	// poster.src = responseObject.Poster;
	// poster.className = 'poster';

	var responseContainer = document.getElementById('response-container')
	responseContainer.style.background = 'url(' + responseObject.Poster + ')';
	responseContainer.style.backgroundSize = 'cover';
	responseContainer.style.backgroundPosition = '50%';
	responseContainer.appendChild(summaryContainer);
	// responseContainer.appendChild(poster);
}
