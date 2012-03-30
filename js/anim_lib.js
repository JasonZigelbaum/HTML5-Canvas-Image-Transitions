// ==============
// = Animations =
// ==============
function burnIn (original, image) {
  // Variables
  var data = context.getImageData(0, 0, image.width, image.height);
  var pix = data.data;
  var total = 0
  
  // Animation Loop
  for (var i = 0, n = pix.length; i < n; i += 4) {
      pix[i  ] += (original[i] - pix[i]);
      pix[i+1] += (original[i+1] - pix[i+1]) / 2;
      pix[i+2] += (original[i+2] - pix[i+2]) / 7;
      pix[i+3] += 20;
      if (pix[i+3] >= 255)
        pix[i+3] = 255;
      if (pix[i+3] == original[i+3])
        total++;
  };
  // Draw Effect
  context.putImageData(data, 0, 0);
  
  // Termination Case
  if (total >= (pix.length/4)) {
    clearFadeIn(original, image)
  }
}

function burnOut (source, image) {
  // Variables
  var data = context.getImageData(0, 0, image.width, image.height);
  var pix = data.data;
  var alphaAvg = 0;
  
  // Animation Loop
  for (var i = 0, n = pix.length; i < n; i += 4) {
      pix[i  ] *= 1.3; // red
      pix[i+1] *= 1.1; // green
      pix[i+2] *= 1.0; // blue
      pix[i+3] *= .95;
      // Get the avg of all alphas
      alphaAvg = alphaAvg + pix[i+3];
  }

  // Draw Effect
  context.putImageData(data, 0, 0);

  // Derive average
  alphaAvg = (alphaAvg / pix.length);

  // Termination Case
  if(alphaAvg < 5) {
    zeroAlpha(pix)
    clearFadeOut(data, source, image)
  }
};

// ===========
// = Helpers =
// ===========

function clearFadeIn(original, image) {
  setImage(original, image);
  is_animating = clearInterval(is_animating);
}

// Terminate the Fade Out
function clearFadeOut (data, source, image) {
  context.putImageData(data, 0, 0);
  is_animating = clearInterval(is_animating);
  loadImage(source);
}

function setImage(original, image) {
  // Variables
  var data = context.getImageData(0, 0, image.width, image.height);
  var pix = data.data;
  var total = 0

  // Clear All Pixels Loop
  for (var i = 0, n = pix.length; i < n; i += 4) {
      pix[i  ] = original[i  ];
      pix[i+1] = original[i+1];
      pix[i+2] = original[i+2];
      pix[i+3] = original[i+3];
  };
  
  // Draw to Canvas
  context.putImageData(data, 0, 0);
}

// Copy an image
function copyImage (image) {
  var copy = [];
  var imaged = context.getImageData(0, 0, image.width, image.height);
  var pix = imaged.data;

  // Copy data
  for (var i = 0, n = pix.length; i < n; i += 4) {
    copy.push(pix[i  ]);
    copy.push(pix[i+1]);
    copy.push(pix[i+2]);
    copy.push(pix[i+3]);
  };
  
  return copy;
}

// Clear the image to 0 across the board
function clearImage (image) {
  var copy = [];
  var imaged = context.getImageData(0, 0, image.width, image.height);
  var pix = imaged.data;

  // Copy data
  for (var i = 0, n = pix.length; i < n; i += 4) {
    pix[i  ] = 0;
    pix[i+1] = 0;
    pix[i+2] = 0;
    pix[i+3] = 0;
  };
  
  context.putImageData(imaged, 0, 0);
}

// Clear the alpha to zero
function zeroAlpha (data) {
  for (var i = 0, n = data.length; i < n; i += 4) {
      data[i+3] = 0;
  }
}
