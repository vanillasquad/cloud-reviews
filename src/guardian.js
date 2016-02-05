var commonWords = ['the','and','with','has','had','his','hers','its','is','this','that','also',
'just','who','where','while','when','why','well','have','been','not','out','from','but','for','you',
'will','was','their','than','which','were','one','are','all','she','them','say','says','them','how',
'because','other','see','can','no','us','may','could','theres','film','him','her','lot','hes',
'shes','only','these'];
var fontSizeMax = 58;

function guardianResponseHandler(xhr) {
    return function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            response = JSON.parse(xhr.responseText).response;

            var text = '';
            response.results.forEach(function(article) {
                text += article.fields.body;
            });

            processResponse(response);
            getWordCloud(text);
        }
    };
}

function sendGuardianRequest(filmInput, apiKey) {
    var guardianRequest = new XMLHttpRequest();

    guardianRequest.onreadystatechange = guardianResponseHandler(guardianRequest);

    var searchTerm = encodeURIComponent(filmInput);
    var url = 'http://content.guardianapis.com/search?section=film&show-fields=body&q='+searchTerm+'&api-key='+apiKey;
    guardianRequest.open('GET', url, true);
    guardianRequest.send();
}

function processResponse(response) {
    var targetElement = document.getElementById('guardian-articles');

    var list = document.createElement('ul');
    targetElement.appendChild(list);

    response.results.forEach(function(article) {
        var listItem = document.createElement('li');
        var contentElement = document.createElement('a');

        contentElement.href = article.webUrl;
        contentElement.innerHTML = article.webTitle;

        listItem.appendChild(contentElement);
        list.appendChild(listItem);
    });
}

function getWordCloud(corpus) {
    // main fuction to get the word cloud

    var wordArray = preProcessArticleBody(corpus);
    var wordFreq = calculateWordFrequency(wordArray);
    var wordSize = calculateWordSize(wordFreq);

    arrangeCloud(wordSize);
}

function preProcessArticleBody(body) {
    return body.replace(/<[^>]*>/gi,'') // Strip html
                .replace(/[^\sa-zA-Z]/g,'') // Strip non-alphabetic, non-whitespace
                .replace(/\s{2,}/g, ' ') // Replace multi-space with single space
                .trim() // trim whitespace at beginning/end of string
                .toLowerCase()
                .split(' ')
                .filter(function(word) { // remove common words
                   return commonWords.indexOf(word) == -1 && word.length > 2;
                });
}

function calculateWordFrequency(wordArray) {
    var wordFreq = {};
    wordArray.forEach(function(word) {
        wordFreq[word] = (word in wordFreq) ? wordFreq[word] + 1 : 1;
    });
    for (var word in wordFreq) {
        if (wordFreq[word] < 5) delete wordFreq[word];
    }
    return wordFreq;
}

function calculateWordSize(wordFreq) {
    var frequencies = Object.keys(wordFreq).map(function(key){return wordFreq[key];}),
        frequencyMax = Math.max.apply(null, frequencies),
        frequencyMin = Math.min.apply(null, frequencies),
        wordSize = {};

    for (var word in wordFreq) {
        wordSize[word] = Math.ceil(fontSizeMax * Math.log(wordFreq[word] - frequencyMin) / Math.log(frequencyMax - frequencyMin)) + 2;
    }
    return wordSize;
}

function arrangeCloud(wordSize) {
    //arrange stripped text into cloud
    // work with DOM
    for (var word in wordSize) {
        var wordElement = document.createElement('p');
        wordElement.innerHTML = word;
        wordElement.style.fontSize = wordSize[word].toString() + 'px';
        wordElement.classList.add('word-cloud');
        if (wordSize[word] <= fontSizeMax/3) {
            wordElement.classList.add('light');
        } else if (wordSize[word] <= 2*fontSizeMax/3) {
            wordElement.classList.add('medium');
        } else {
            wordElement.classList.add('dark');
        }
        document.getElementById('cloud').appendChild(wordElement);
    }
}
