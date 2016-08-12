// // $(document).ready(function () {
//   //your code here
//   if (window.jQuery) {  
//     alert('it has loaded!!');   // jQuery is loaded  
//   } else {
//       alert('it has not loaded!!');    // jQuery is not loaded
//   }
// // });

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
      $videoContainer.find('#fs-video')[0].pause();
    });
  }

  videoPlay.addEventListener('click', function(e) {
    $videoContainer.find('#fs-video')[0].play();
    $('#fs-video-container').fadeIn(350, function() {
      $(this).css('display', 'flex');
    });
  });
}

