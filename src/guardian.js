// var guardian = new XMLHttpRequest();
// var response;
// var commonWords = ['a','i','it','as','an','m','on','to','the','of','if','by','in','and','with','at',
// 'has','had','his','her','its','is','this','that','also','just','who','where','while','when','why',
// 'well','have','been','not','out','from','but','for','you','will','was','their','than','which','were',
// 'one','up','are','all','be','so','she','he','them','we','say','says','them','how','because'];
//
// var fontSizeMax = 58;
//
// guardian.onreadystatechange = function() {
//     if (guardian.readyState === 4 && guardian.status === 200) {
//         response = JSON.parse(guardian.responseText).response;
//         processResponse(response);
//         getWordCloud(response);
//     }
// };
//
// var url = 'http://content.guardianapis.com/search?section=film&show-fields=body&q=the%20godfather%20film&api-key='+apiKey;
// guardian.open('GET', url);
// guardian.send();
//
// if (document.cookie.match(/api_key_guardian=./)) {
//     document.getElementById('form-guardian-key').style.display = "none";
// } else {
//     document.getElementById('form-guardian-key').style.display = "block";
//
//     document.getElementById('form-guardian-key').addEventListener('submit', function(e) {
//         e.preventDefault();
//         document.cookie = 'api_key_guardian=' + e.target.firstElementChild.value;
//         document.getElementById('form-guardian-key').style.display = "none";
//     });
// }
//
//
//
// function processResponse(response) {
//     var targetElement = document.getElementById('form-guardian-key');
//
//     var list = document.createElement('ul');
//     targetElement.appendChild(list);
//
//     response.results.forEach(function(article) {
//         var listItem = document.createElement('li');
//         var contentElement = document.createElement('a');
//
//         contentElement.href = article.webUrl;
//         contentElement.innerHTML = article.webTitle;
//
//         listItem.appendChild(contentElement);
//         list.appendChild(listItem);
//     });
// }
//
// function getWordCloud(response) {
//     // main fuction to get the word cloud
//     var text = '';
//     response.results.forEach(function(article) {
//         text += article.fields.body;
//     });
//     var wordArray = preProcessArticleBody(text);
//     var wordFreq = calculateWordFrequency(wordArray);
//     var wordSize = calculateWordSize(wordFreq);
//
//     arrangeCloud(wordSize);
// }
//
// function preProcessArticleBody(body) {
//     return body.replace(/<[^>]*>/gi,'') // Strip html
//                 .replace(/[^\sa-zA-Z]/g,'') // Strip non-alphabetic, non-whitespace
//                 .replace(/\s{2,}/g, ' ') // Replace multi-space with single space
//                 .trim() // trim whitespace at beginning/end of string
//                 .toLowerCase()
//                 .split(' ')
//                 .filter(function(word) { // remove common words
//                    return commonWords.indexOf(word) == -1;
//                 });
// }
//
// function calculateWordFrequency(wordArray) {
//     var wordFreq = {};
//     wordArray.forEach(function(word) {
//         wordFreq[word] = (word in wordFreq) ? wordFreq[word] + 1 : 1;
//     });
//     return wordFreq;
// }
//
// function calculateWordSize(wordFreq) {
//     var frequencies = Object.keys(wordFreq).map(function(key){return wordFreq[key];}),
//         frequencyMax = Math.max.apply(null, frequencies),
//         frequencyMin = Math.min.apply(null, frequencies),
//         wordSize = {};
//
//     for (var word in wordFreq) {
//         wordSize[word] = Math.ceil(fontSizeMax * (wordFreq[word] - frequencyMin) / (frequencyMax - frequencyMin));
//     }
//     return wordSize;
// }
//
// function arrangeCloud(wordSize) {
//     //arrange stripped text into cloud
//     // work with DOM
//     for (var word in wordSize) {
//         var span = document.createElement('span');
//         span.innerHTML = word;
//         span.style.fontSize = wordSize[word].toString() + 'px';
//         document.getElementById('cloud').appendChild(span);
//     }
// }
