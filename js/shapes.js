/**
 * Shapes
 * 
 * Object to create and mange the shapes game
 * 
 * @author Dom Hastings
 */
var Shapes = {
  /**
   * options
   * 
   * @var object The main options
   */
  'options': {
    // the event to register can be mousedown or mouseover
    'event': 'mousedown',
    // the number of shapes to show
    'number': 6,
    // the number of rounds in one game
    'times': 25,
    // the size of the shapes in pixels
    'size': 200,
    // the 'level' equates to the number of shapes and colours to use
    'level': 5,
    // has precedence over the level and returns this many colours
    'colours': null,
    // has precedence over the level and returns this many shapes
    'shapes': null,
    // the game mode: 0 = shapes only, 1 = colours only, 2 = shapes and colours
    'mode': 2
  },
  
  /**
   * events
   * 
   * @var object Lookup for 'nice' names of the events
   */
  'events': {
    'mouseover': 'Touch',
    'mousedown': 'Click'
  },
  
  /**
   * shapes
   * 
   * @var array The shapes available, must have images with the same name in /img/
   */
  'shapes': [
    'circle',
    'triangle',
    'square',
    'star',
    'oval',
    'pentagon',
    'hexagon',
    'heptagon',
    'octogon',
    'trapezium',
    'parallelogram'
  ],
  
  /**
   * colours
   * 
   * @var array The colours available, must have class with the same name in css.css
   */
  'colours': [
    'red',
    'blue',
    'yellow',
    'green',
    'orange',
    'purple',
    'white',
    'black',
    'grey',
    'pink',
    'brown'
  ],
  
  /**
   * objective
   * 
   * @var string The current objective
   */
  'objective': '',

  /**
   * timer
   * 
   * @var number The current time since the round started
   */
  'timer': 0,

  /**
   * times
   * 
   * @var number Starts off as the number of rounds per game and is decremented each round
   */
  'times': null,

  /**
   * colour
   * 
   * @var string The current colour objective
   */
  'colour': '',

  /**
   * shape
   * 
   * @var string The current shape objective
   */
  'shape': '',
  
  /**
   * stats
   * 
   * @var array The stats for this game
   */
  'stats': [],
  
  /**
   * used
   * 
   * @var array Data for each shape, used to prevent overlapping
   */
  'used': [],
  
  init: function(options) {
    $.extend(this.options, options || {});
    
    if (!$('div.game-area').length) {
      $('body').mousedown(function(event) {
        event.preventDefault();
      }).append('<div class="game-area"></div>');
    }
    
    this.times = this.options.times;
    
    this.used = [];
    
    this.clear();
    
    this.addShapes();
  },
  
  clear: function() {
    $('div.game-area').empty();
  },
  
  reload: function() {
    this.times--;
    
    this.used = [];
    
    this.clear();
    
    if (this.times > 0) {
      this.addShapes();

    } else {
      var average = 0;
      
      for (var i = 0; i < this.stats.length; i++) {
        average += this.stats[i].time;
      }
      
      average /= this.stats.length;
      
      Application.message('You\'re all done!');
      
      $('div.game-area').html('<br/><br/><br/><br/><p><strong>Well done!</strong></p><p>You\'ve finished ' + this.options.times + ' find' + ((this.options.times == 1) ? '' : 's')  + '!</p><p>Your average time to find the shape was ' + (average / 1000) + 's</p>');
    }
  },
  
  addShapes: function() {
    $('div.game-area').append('<p class="objective"></p>');
    
    var available = this.getAvailable();

    for (var i = 0; i < available.length; i++) {
      var shape = available[i].shape;
      var colour = available[i].colour;

      var shapeNode = this.addShape(shape, colour);
      
      if (i == 0) {
        this.shape = shape;
        this.colour = colour;

        if (this.options.mode == 0) {
          this.objective = this.events[this.options.event] + ' the ' + this.shape + '.';
          
        } else if (this.options.mode == 1) {
          this.objective = this.events[this.options.event] + ' the ' + this.colour + ' shape.';
          
        } else if (this.options.mode == 2) {
          this.objective = this.events[this.options.event] + ' the ' + this.colour + ' ' + this.shape + '.';
        }
        
        Application.speak(this.objective);

        $(shapeNode).bind(this.options.event, function(event) {
          Shapes.stats.push({
            'time': (new Date().getTime() - Shapes.timer),
            'objective': Shapes.objective
          });

          Application.message('That\'s right! Well done!', 'success');
          
          Shapes.clear();
          
          window.setTimeout(function() {
            Shapes.reload();
          }, 2500);
        });

      } else {
        $(shapeNode).bind(this.options.event, function(event) {
          event.preventDefault();
          Application.message('This is a' + ($(this).data('colour').startsVowel() ? 'n' : '') + ' ' + $(this).data('colour') + ' ' + $(this).data('shape') + ', not the ' + Shapes.colour  + ' ' + Shapes.shape + '!', 'error');
        });
      }
    }
    
    $('p.objective').html(this.objective);
    
    this.timer = new Date().getTime();
  },
  
  getAvailable: function() {
    var r = [];
    
    var shapes = this.shapes.slice().splice(0, this.options.shapes || this.options.level);
    var colours = this.colours.slice().splice(0, this.options.colours || this.options.level);
    
    if (this.options.mode == 0) {
      for (var i = 0; i < shapes.length; i++) {
        r.push({
          'shape': shapes[i],
          'colour': colours.shuffle()[0]
        });
      }
      
    } else if (this.options.mode == 1) {
      for (var j = 0; j < colours.length; j++) {
        r.push({
          'shape': shapes.shuffle()[0],
          'colour': colours[j]
        });
      }
      
    } else if (this.options.mode == 2) {
      for (var i = 0; i < shapes.length; i++) {
        for (var j = 0; j < colours.length; j++) {
          r.push({
            'shape': shapes[i],
            'colour': colours[j]
          });
        }
      }
    }
    
    return r.shuffle().shuffle().splice(0, this.options.number);
  },
  
  addShape: function(shape, colour) {
    var shapeNode = $('<img class="shape ' + colour + '" src="img/' + shape + '.png" height="' + this.options.size + '" width="' + this.options.size + '"/>');
    shapeNode.css(this.getRandomPos());
    
    $(shapeNode).data('shape', shape).data('colour', colour);
    
    $('div.game-area').append(shapeNode);
    
    return shapeNode;
  },
  
  getRandomPos: function() {
    var maxX = $('div.game-area').width() - this.options.size;
    var maxY = $('div.game-area').height() - this.options.size;
      
    var x = 0;

    var left = Math.random() * maxX;
    var top = Math.random() * maxY;
    
    while (!this.isValidPos(left, top)) {
      left = Math.random() * maxX;
      top = Math.random() * maxY;
    
      if (x++ > (this.options.number * 20)) {
        break;
      }
    }
    
    return this.used[this.used.push({
      'left': left,
      'top': top
    }) - 1];
  },
  
  isValidPos: function(left, top) {
    var leftMax = left + this.options.size;
    var topMax = top + this.options.size;
    
    for (var i = 0; i < this.used.length; i++) {
      if (
        (
          left.between(this.used[i].left, (this.used[i].left + this.options.size)) &&
          top.between(this.used[i].top, (this.used[i].top + this.options.size))
        ) || (
          left.between(this.used[i].left, (this.used[i].left + this.options.size)) &&
          topMax.between(this.used[i].top, (this.used[i].top + this.options.size))
        ) || (
          leftMax.between(this.used[i].left, (this.used[i].left + this.options.size)) &&
          top.between(this.used[i].top, (this.used[i].top + this.options.size))
        ) || (
          leftMax.between(this.used[i].left, (this.used[i].left + this.options.size)) &&
          topMax.between(this.used[i].top, (this.used[i].top + this.options.size))
        )
      ) {
        return false;
      }
    }
    
    return true;
  },
  
  changeOptions: function() {
    $('#options').dialog('open');
  }
}