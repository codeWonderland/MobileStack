// Generated by CoffeeScript 1.12.6
(function() {
  var $container, mq;

  mq = window.matchMedia("(max-width: 768px)");

  $container = $('.photo-container')[0];

  $(document).ready(function() {
    var i;
    if (sessionStorage.getItem("photoIndex") === null) {
      sessionStorage.setItem("photoIndex", 0);
    }
    $container.innerHTML = '<p class="end-text">Oh hey, you\'ve gone <br /> through \'em all</p><a class="btn center-btn" onclick="refreshStack()">Start Over</a>';
    initStack(parseInt(sessionStorage.getItem("photoIndex")));
    i = 0;
    while (i < parseInt(sessionStorage.getItem("photoIndex"))) {
      removeLast();
      i++;
    }
    $($('.photo-container')[0]).find('img:last').animate({
      '-moz-transform': 'rotate(0deg)',
      '-webkit-transform': 'rotate(0deg)',
      'transform': 'rotate(0deg)'
    });
  });

  this.refreshStack = function() {
    sessionStorage.setItem("photoIndex", 0);
    return initStack(0);
  };

  this.initStack = function(n) {
    var $image, $src, cnt, data, datum, j, k, len, len1, photo, r, ref;
    $src = $('.album-src')[0];
    data = reverseArray($src.getElementsByTagName('img'));
    cnt = 0;
    for (j = 0, len = data.length; j < len; j++) {
      datum = data[j];
      $image = new Image();
      $image.src = datum.getAttribute('src');
      ++cnt;
      $image = resizeCenterImage($image);
      $($image).attr('onclick', datum.getAttribute('onclick'));
      $container.append($image);
      r = Math.floor(Math.random() * 41) - 20;
      if (cnt < data.length) {
        $($image).css({
          '-moz-transform': 'rotate(' + r + 'deg)',
          '-webkit-transform': 'rotate(' + r + 'deg)',
          'transform': 'rotate(' + r + 'deg)'
        });
      }
    }
    ref = document.getElementsByClassName('photo-container')[0].getElementsByTagName('img');
    for (k = 0, len1 = ref.length; k < len1; k++) {
      photo = ref[k];
      initHammer(photo);
    }
  };

  this.reverseArray = function(array) {
    var i, temp;
    i = array.length;
    temp = [];
    while (i >= 0) {
      temp.push(array[i]);
      i--;
    }
    temp.shift();
    return temp;
  };

  this.initHammer = function(el) {
    var mc;
    mc = new Hammer.Manager(el);
    mc.add(new Hammer.Swipe());
    mc.on('swiperight', nextPhoto);
  };

  this.nextPhoto = function() {
    var $current, $new_current, nextIndex;
    nextIndex = parseInt(sessionStorage.getItem("photoIndex")) + 1;
    sessionStorage.setItem("photoIndex", nextIndex);
    $current = $($('.photo-container')[0]).find('img:last');
    $new_current = $current.prev();
    $current.animate({
      'marginLeft': '250px',
      'marginTop': '-385px'
    }, 500);
    $new_current.css({
      '-moz-transform': 'rotate(0deg)',
      '-webkit-transform': 'rotate(0deg)',
      'transform': 'rotate(0deg)'
    });
    setTimeout(removeLast, 600);
  };

  this.removeLast = function() {
    $($('.photo-container')[0]).find('img:last').remove();
  };

  this.resizeCenterImage = function($image) {
    var containerheight, containerwidth, imgheight, imgwidth, newheight, newnewheight, newnewwidth, newratio, newwidth, ratio, theImage;
    theImage = new Image();
    theImage.src = $image.getAttribute("src");
    imgwidth = theImage.width;
    imgheight = theImage.height;
    containerwidth = 330;
    containerheight = 230;
    if (imgwidth > containerwidth) {
      newwidth = containerwidth;
      ratio = imgwidth / containerwidth;
      newheight = imgheight / ratio;
      if (newheight > containerheight) {
        newnewheight = containerheight;
        newratio = newheight / containerheight;
        newnewwidth = newwidth / newratio;
        theImage.width = newnewwidth;
        theImage.height = newnewheight;
      } else {
        theImage.width = newwidth;
        theImage.height = newheight;
      }
    } else if (imgheight > containerheight) {
      newheight = containerheight;
      ratio = imgheight / containerheight;
      newwidth = imgwidth / ratio;
      if (newwidth > containerwidth) {
        newnewwidth = containerwidth;
        newratio = newwidth / containerwidth;
        newnewheight = newheight / newratio;
        theImage.height = newnewheight;
        theImage.width = newnewwidth;
      } else {
        theImage.width = newwidth;
        theImage.height = newheight;
      }
    }
    $($image).css({
      'width': theImage.width,
      'height': theImage.height,
      'margin-top': -(theImage.height / 2) - 10 + 'px',
      'margin-left': -(theImage.width / 2) - 10 + 'px'
    });
    return $image;
  };

}).call(this);

//# sourceMappingURL=script.js.map
