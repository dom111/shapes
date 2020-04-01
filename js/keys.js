var Keys = {
  letters: {
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z'
  },
  
  sentences: [
    'Hello! My name is Indie.',
    'Look at me, I am typing!'
  ],
  
  currentPosition: null,
  currentSentence: null,
  
  init: function() {
    $('body').append($('<div class="game-area"></div>'));
    
    this.currentSentence = this.sentences.randomIndex();
    this.currentPosition = 0;
    
    $('body').keydown(function(event) {
      Keys.check(event.which)
    });
    
    this.showLetter(this.sentences[this.currentSentence].charAt(this.currentPosition).toUpperCase());
  },
  
  check: function(i) {
    if (this.sentences[this.currentSentence].charAt(this.currentPosition).toLowerCase() == this.letters[i]) {
      $('div.currentLetter').fadeOut(function() {
        $(this).css({
          'position': 'relative',
          'float': 'left',
          'top': '0',
          'left': '0',
          'margin': '0',
          'border': '1px solid #000',
          '-webkit-border-radius': '5px',
          '-webkit-box-shadow': '1px 1px 2px #666',
          'font-size': '22px',
          'width': '30px',
          'height': '30px',
          'text-align': 'center',
          'line-height': '30px'
        });
      }).fadeIn().removeClass('currentLetter');
      
      do {
        this.currentPosition++;
      } while (this.sentences[this.currentSentence].charAt(this.currentPosition).match(/[^A-z]/) && this.currentPosition < this.sentences[this.currentSentence].length);
      
      if (this.currentPosition == this.sentences[this.currentSentence].length) {
        Application.message('That\'s right! Well done!');
        $('letter').fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn().fadeOut().fadeIn();
        
      } else {
        this.showLetter(this.sentences[this.currentSentence].charAt(this.currentPosition).toUpperCase());
      }
    }
  },
  
  showLetter: function(l) {
    $('div.game-area').append($('<div class="currentLetter letter"></div>').css({
      'position': 'absolute',
      'top': '50%',
      'left': '50%',
      'margin': '-100px 0 0 -100px',
      'border': '5px solid #000',
      '-webkit-border-radius': '10px',
      '-webkit-box-shadow': '1px 1px 5px #666',
      'font-size': '150px',
      'width': '200px',
      'height': '200px',
      'text-align': 'center',
      'line-height': '200px',
      'font-family': 'Sans-serif'
    }).html(l).addClass(l).fadeIn());
  },
  
  addToBoard: function(l) {
    
  }
}

Array.prototype.randomIndex = function() {
  return Math.round(Math.random() * this.length);
}