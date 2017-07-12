$container = $('.photo-container')[0]

$(document).ready ->
  $src = $('.album-src')[0]
  data = $src.getElementsByClassName('src')
  cnt = 0
  for datum in data
    $image = new Image()
    $image.src = datum.innerHTML
    ++cnt
    $image = resizeCenterImage($image)
    # $($image).attr('onclick', datum.getAttribute('onclick'))
    $container.append($image)
  
    r		= Math.floor(Math.random()*41)-20
    if cnt < data.length
      $($image).css({
        '-moz-transform'	:'rotate('+r+'deg)',
        '-webkit-transform'	:'rotate('+r+'deg)',
        'transform'			:'rotate('+r+'deg)'
      })
  
  initHammer(photo) for photo in document.getElementsByClassName('photo-container')[0].getElementsByTagName('img')
  
  return

@initHammer = (el) ->
  mc = new Hammer.Manager(el)
  mc.add( new Hammer.Pan() )
  mc.on 'pan', nextPhoto
  return
  
@nextPhoto = () ->
  $current 	= $($('.photo-container')[0]).find('img:last')
  r			= Math.floor(Math.random()*41)-20
  
  currentPositions = {
    marginLeft	: -($current[0].height/2)-50+'px',
    marginTop	: -($current[0].height/2)-20+'px'
  }
  
  $new_current = $current.prev()
  
  $current.animate {
    'marginLeft': '250px'
    'marginTop': '-385px'
  }, 250, ->
    $(this).insertBefore($($('.photo-container')[0]).find('img:first')).css(
      '-moz-transform': 'rotate(' + r + 'deg)'
      '-webkit-transform': 'rotate(' + r + 'deg)'
      'transform': 'rotate(' + r + 'deg)').animate {
      'marginLeft': currentPositions.marginLeft
      'marginTop': currentPositions.marginTop
      }, 250, ->
        $new_current.css(
          '-moz-transform': 'rotate(0deg)'
          '-webkit-transform': 'rotate(0deg)'
          'transform': 'rotate(0deg)')
        return
    return
  return
  
@resizeCenterImage = ($image) ->
  theImage 	= new Image()
  theImage.src 	= $image.getAttribute("src")
  imgwidth 	= theImage.width
  imgheight 	= theImage.height
  
  containerwidth  = 260
  containerheight = 180
  
  if imgwidth	> containerwidth
    newwidth = containerwidth
    ratio = imgwidth / containerwidth
    newheight = imgheight / ratio
    if(newheight > containerheight)
      newnewheight = containerheight
      newratio = newheight/containerheight
      newnewwidth =newwidth/newratio
      theImage.width = newnewwidth
      theImage.height= newnewheight
    
    else
      theImage.width = newwidth
      theImage.height= newheight
  
  
  else if imgheight > containerheight
    newheight = containerheight
    ratio = imgheight / containerheight
    newwidth = imgwidth / ratio
    if newwidth > containerwidth
      newnewwidth = containerwidth
      newratio = newwidth/containerwidth
      newnewheight =newheight/newratio
      theImage.height = newnewheight
      theImage.width= newnewwidth
    
    else
      theImage.width = newwidth
      theImage.height= newheight
    
  
  $($image).css({
    'width'			:theImage.width,
    'height'		:theImage.height,
    'margin-top'	:-(theImage.height/2)-10+'px',
    'margin-left'	:-(theImage.width/2)-10+'px'
  })
  return $image