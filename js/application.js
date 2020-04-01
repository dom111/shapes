var Application = {
  'timeouts': {
    'message': null
  },
  
  'options': {
    'message': {
      'duration': 3000,
      'animation': 300
    }
  },
  
  message: function(text, style) {
    if (!style) {
      style = 'info';
    }
    
    this.speak(text);
    
    if ($('div#message').length) {
      $('div#message').html(text).attr('className', style);
      
    } else {
      $('body').append($('<div id="message" class="' + style + '" style="display: none;">' + text + '</div>'));
    }
    
    $('div#message').show(this.options.message.animation);
    
    window.clearTimeout(this.timeouts.message);
    
    this.timeouts.message = window.setTimeout(function() {
      // use global namespace operator!
      $('div#message').hide(Application.options.message.animation);
    }, this.options.message.duration);
  },
  
  speak: function(text) {
    speak(text);
    // if (!$('audio#comms').length) {
    //   $('body').append($('<audio src="http://translate.google.com/translate_tts?tl=en&q=' + escape(text) + '" autoplay="true"></audio>'));
      
    // } else {
    //   if (document.getElementById('comms').ended || text == 'That\'s right! Well done!') {
    //     document.getElementById('comms').src = 'http://translate.google.com/translate_tts?tl=en&q' + escape(text);
    //     document.getElementById('comms').load();
    //     document.getElementById('comms').play();
    //   }
    // }
    
    // if (!$('audio#comms').length) {
    //   $('body').append($('<audio id="comms"></audio>').data('playlist', []));
    //   
    //   document.getElementById('comms').addEventListener('ended', function() {
    //     if ($(this).data('playlist').length) {
    //       this.src = 'http://shapes.dom.pixolium.co.uk/audio/' + $(this).data('playlist').shift() + '.mp3';
    //       this.load();
    //       this.play();
    //     }
    //   }, false);
    // }
    // 
    // text = text.toLowerCase().replace(/[^a-z ]/g, '');
    // 
    // var changes = {
    //   'thats-right-well-done': /thats right well done/,
    //   'this-is': /this is/,
    //   'not-the': /not the/,
    //   'youve-finished': /youve finished/
    // };
    // 
    // for (var replace in changes) {
    //   var search = changes[replace];
    //   
    //   text = text.replace(search, replace);
    // }
    // 
    // $('audio#comms').data('playlist', text.split(' '));
    // 
    // if (document.getElementById('comms').paused || document.getElementById('comms').ended) {
    //   document.getElementById('comms').src = 'http://shapes.dom.pixolium.co.uk/audio/' + $('audio#comms').data('playlist').shift() + '.mp3';
    //   document.getElementById('comms').load();
    //   document.getElementById('comms').play();
    // }
  // },
  // 
  // preloadAudio: function(file) {
  //   $('body').append($('<audio class="preload" src="http://shapes.dom.pixolium.co.uk/audio/' + file + '.mp3" preload></audio>'));
  }
}

if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = function() {
    var r = [];
    var a = this.slice();

    while (a.length > 0) {
      var i = parseInt(Math.random() * a.length);

      r[r.length] = a[i];

      a.splice(i, 1);
    }

    return r;
  }
}

if (!Number.prototype.between) {
  Number.prototype.between = function(min, max) {
    if (this >= min && this <= max) {
      return true;

    } else {
      return false;
    }
  }
}

if (!Number.prototype.toWords) {
  Number.prototype.toWords = function() {
    var th = ['','thousand','million', 'billion','trillion'];
    var dg = ['zero','one','two','three','four', 'five','six','seven','eight','nine'];
    var tn = ['ten','eleven','twelve','thirteen', 'fourteen','fifteen','sixteen', 'seventeen','eighteen','nineteen'];
    var tw = ['twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    
    s = this.toString().replace(/[\, ]/g,'');
    
    if (s != String(parseFloat(s))) {
      return 'not a number';
    }
    
    var x = s.indexOf('.');
    
    if (x == -1) {
      x = s.length;
    }
    
    if (x > 15) {
      return 'too big';
    }
    
    var n = s.split('');
    var str = '';
    var sk = 0;
    
    for (var i = 0; i < x; i++) {
      if ((x - i) % 3 == 2) {
        if (n[i] == '1') {
          str += tn[Number(n[(i + 1)])] + ' ';
          i++;
          sk = 1;
          
        } else if (n[i] != 0) {
          str += tw[(n[i] - 2)] + ' ';
          sk = 1;
        }
        
      } else if (n[i] != 0) {
        str += dg[n[i]] + ' ';
        
        if ((x - i) % 3 == 0) {
          str += 'hundred ';
        }
        
        sk = 1;
      }
      
      if ((x - i) % 3 == 1) {
        if (sk) {
          str += th[(x - i - 1) / 3] + ' ';
        }
        
        sk = 0;
      }
    }
    
    if (x != s.length) {
      var y = s.length;
      str += 'point ';
      
      for (var i = (x + 1); i < y; i++) {
        str += dg[n[i]] + ' ';
      }
    }
    
    return str.replace(/\s+/g, ' ');
  }
}

if (!String.prototype.startsVowel) {
  String.prototype.startsVowel = function() {
    if (this.match(/^[aeiou]/i)) {
      return true;
      
    } else {
      return false;
    }
  }
}
