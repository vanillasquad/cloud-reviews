var form = document.getElementById('film-search');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var key = document.getElementById('api-key').value;
    if (!document.cookie && key === '') {
        alert('put your api key in the box fool');
        return;
    }
    if (!document.cookie && key !== '') {
        document.cookie = 'api-key=' + key;
        console.log(document.cookie['api-key']);
    }
});


// document.getElementById('submit-btn').addEventListener('click', function(e) {
//     e.preventDefault();
//     var filmInput = document.getElementById('film-input').value.replace(/ /g, '+');
//     console.log(filmInput);
//     var uri = 'http://www.omdbapi.com/?t=' + filmInput + '&y=&plot=short&r=json';
//     omdbResponse.open('GET', uri, true);
//     omdbResponse.send();
// });
