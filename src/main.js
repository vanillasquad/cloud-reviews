
var form = document.getElementById('film-search');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearDOM();

    //get user input - film name and guardian key
    var filmInput = document.getElementById('film-input').value;
    guardianKey = document.getElementById('api-key').value;

    //omdb and Guardian responses dealt with in the following files
    sendOmdbRequest(filmInput);
    sendGuardianRequest(filmInput, guardianKey);

    //clear the input field
    document.getElementById('film-search').reset();
});


function clearDOM() {
    document.getElementById('response-container').innerHTML = '';
    document.getElementById('guardian-articles').innerHTML = '';
    document.getElementById('cloud').innerHTML = '';
}
