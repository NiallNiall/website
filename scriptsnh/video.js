var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);

var videoPlay = document.getElementById('fs-video');
if (videoPlay) {
  var $videoContainer = $('#fs-video-container');
  var videoClose = $videoContainer.find('.btn-close')[0];

  videoClose.addEventListener('click', function(e) {
    videoStop()
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) { videoStop() }
  });

  var videoStop = function() {
    $videoContainer.fadeOut(350, function() {
      player.pause();
    });
  }

  videoPlay.addEventListener('click', function(e) {
    
    player.play();

    $('#fs-video-container').fadeIn(350, function() {
      $(this).css('display', 'flex');
    });
  });
}
