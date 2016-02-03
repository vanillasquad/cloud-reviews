describe("omdbResponse", function() {
    var input;
    var uri;

    beforeEach(function(done) {
        input = "home+alone";
        uri = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&r=json';
        done();
    });

    it("should return an object", function(done) {

        omdbResponse.open('GET', uri, true);
        omdbResponse.send();

        setTimeout(function() {
            expect(typeof response).toBe("object");
            done();
        }, 2000);
    });

    it('should return the rating of the film', function(done) {
        omdbResponse.open('GET', uri, true);
        omdbResponse.send();
        setTimeout(function() {
            expect(typeof parseInt(response.imdbRating)).toBe("number");
            done();
        },1000);
    });

    it('should return the plot of the film', function(done) {
        omdbResponse.open('GET', uri, true);
        omdbResponse.send();
        setTimeout(function() {
            expect(typeof response.Plot).toBe("string");
            done();
        },1000);
    });
});

describe("Handling omdb response object which is not a film", function(){

    beforeEach(function(done) {
        checkInput = "";
        done();
    });


    it("should know if title is left empty", function(done){
        var input = '';
        var uri = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&r=json';
        omdbResponse.open('GET', uri, true);
        omdbResponse.send();
        setTimeout(function() {
            expect(checkInput).toBe("No film here");
            done();
        }, 1000);
    });

    it("should know if title is left empty", function(done){
        var input = 'pirates+of+the+caribbean';
        var uri = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&r=json';
        omdbResponse.open('GET', uri, true);
        omdbResponse.send();
        setTimeout(function() {
            expect(checkInput).toBe("Please input a more specific title");
            done();
        }, 1000);
    });
});

describe('Handling posters', function() {
    it('response for movies returns link for poster', function(done) {
        var input = 'gladiator';
        var uri = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&r=json';
        omdbResponse.open('GET', uri, true);
        omdbResponse.send();
        setTimeout(function() {
            expect(response.Poster.search(/http/)).not.toBe(-1);
            done();
        }, 1000);
    });

    it('response for games returns N/A for poster', function(done) {
        var input = 'pirates+of+the+caribbean';
        var uri = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&r=json';
        omdbResponse.open('GET', uri, true);
        omdbResponse.send();
        setTimeout(function(){
            expect(response.Poster).toBe('N/A');
            done();
        }, 1000);

    });
});
