// Canvas and context will be global to save on queries
var canvas, context, path, current, is_animating;

// Create a global image to play with
var img = new Image();
// Define the image's onload property
img.onload = function() {
  canvas.width = img.width;
  canvas.height = img.height;
  // Get a copy of the image and clear it in on load
  context.drawImage(img, 0, 0, img.width, img.height);
  var copy = copyImage(img)
  clearImage(img);
  // Burn in the image
  is_animating = setInterval( function() { burnIn( copy, img ) }, 10 );
}

function loadImage (source) {
  // Set the source to the new image
  img.src = source;
  // Set current to the source.
  current = source;
};

function transitionOut (source, animation) {
  is_animating = setInterval( function() { animation( source, img ) }, 10 );
}

function nextImage () {
  // You probably want to instantiate some image array using your images folder.
  if(!is_animating) {
    var images = ['1.jpg', '2.jpg', '3.jpg'];
    for( var i = 0; i < images.length; i++ ) {
      if( ( path + images[i] ) == current ) {
        // Transition the image out and new one in.
        transitionOut( path + images[ (i+1) % 3 ] , burnOut );
        break;
      }
    }
  }
}

window.onload = function() {
  // Get the canvas and context. They will be global.
  canvas = document.getElementById("frame");
  context = canvas.getContext("2d");
  path = './images/';
  
  // Load the initial image
  loadImage( path + '1.jpg' );

  // Add click event listener on the canvas
  canvas.addEventListener("click", nextImage, false);   
};