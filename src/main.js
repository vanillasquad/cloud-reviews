var form = document.getElementById('film-search');
form.addEventListener('submit', function(e) {
    e.preventDefault();


    var filmInput = document.getElementById('film-input').value;
    guardianKey = document.getElementById('api-key').value;

    sendOmdbRequest(filmInput);
    sendGuardianRequest(filmInput, guardianKey);

    document.getElementById('film-search').reset();
});

function sendOmdbRequest(filmInput) {
    var uri = 'http://www.omdbapi.com/?t=' + filmInput.replace(/ /g, '+') + '&y=&plot=short&r=json';
    omdbResponse.open('GET', uri, true);
    omdbResponse.send();
}
