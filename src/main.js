var form = document.getElementById('film-search');
form.addEventListener('submit', function(e) {
    e.preventDefault();


    var filmInput = document.getElementById('film-input').value;
    guardianKey = document.getElementById('api-key').value;

    sendOmdbRequest(filmInput);
    sendGuardianRequest(filmInput, guardianKey);

    document.getElementById('film-search').reset();
});
