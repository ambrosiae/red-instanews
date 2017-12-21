$('#choose').on('change', function(){
  event.preventDefault();
  
  $('#header').removeClass('logo-start').addClass('logo-end');
  
  var newsSection = $('#choose').val();
  var key = 'e36a9556acdd4164bd355b361d3a195b';
  var url = 'https://api.nytimes.com/svc/topstories/v2/' + newsSection + '.json?api-key=' + key;
    
  $.ajax({
    url: url,
    method: 'GET'
  }).done(function(newsResults) {
    
  var news = newsResults.results.slice(0,12);
  //   console.log(news);
  
  var filtered = $.grep(news, function(grep){
    return grep.multimedia.length>0
  });
    console.log(filtered);
   
  $('.news').empty();
  
  $.each(news, function (index, value){
    $('.news').append('<li><a href="' + value.short_url + '">' + '<img src="' + value.multimedia[4].url + '" alt="photo" class="news-photo"></a><p class="news-abstract">' + value.abstract + '</p></li>')
  });
  
  $('.news-photo').hover(function(){
    $('.news-abstract').css('opacity', '100');
    }, function(){
    $('.news-abstract').css('opacity', '0');
});

  }).fail(function(err) {
    console.log('error');
  });



  });
  
  // $('#logo').fadeIn(2000);