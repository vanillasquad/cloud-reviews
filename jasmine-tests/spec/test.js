


// twitter tests

describe('Async Twitter API calls', function() {
    // var async = new AsyncSpec(this);

    it('Function gets search results from twitter, given input string', function(done) {
        var userInput = 'godfather';
        setTimeout(function() {
            var results = response;
            expect(typeof results).toBe('object');
            done();
        }, 1000);
    });
});



describe('Word Cloud', function() {

    it('Test can strip out non-wordy characters from article body', function() {
        var text = '<p>The Hunger Games: Mockingjay – Part 2 <a draggable="true" href="http://www.hollywoodreporter.com/news/box-office-hunger-games-wins-844106">held on to the top spot at the US box office at the weekend</a> after posting a spectacular $75.8m (£50.5m) over the long Thanksgiving holiday week.';
        var result = preProcessArticleBody(text);
        expect(result).toEqual('Hunger Games Mockingjay Part held top spot US box office weekend after posting spectacular over long Thanksgiving holiday week'.toLowerCase().split(' '));
    });
});
