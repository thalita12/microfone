var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

let diagnosticPara = document.querySelector('.output');
let testBtn = document.querySelector('button');

function testSpeech() {
  testBtn.disabled = true;
  testBtn.style.background = '#00bd56';
  diagnosticPara.textContent = 'Estou te ouvindo...';

  let recognition = new SpeechRecognition();
  let speechRecognitionList = new SpeechGrammarList();

  recognition.grammars = speechRecognitionList;
  recognition.lang = 'pt-BR';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
    // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
    // It has a getter so it can be accessed like an array
    // The first [0] returns the SpeechRecognitionResult at position 0.
    // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
    // These also have getters so they can be accessed like arrays.
    // The second [0] returns the SpeechRecognitionAlternative at position 0.
    // We then return the transcript property of the SpeechRecognitionAlternative object
    let speechResult = event.results[0][0].transcript;
    diagnosticPara.textContent = `${speechResult}.`;
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  recognition.onspeechend = function() {
    recognition.stop();
    testBtn.disabled = false;
    testBtn.style.background = '#878ecd';
  }

  recognition.onerror = function(event) {
    testBtn.disabled = false;
    testBtn.style.background = '#878ecd';
    diagnosticPara.textContent = 'Error occurred in recognition: ' + event.error;
  }
}

testBtn.addEventListener('click', testSpeech);
