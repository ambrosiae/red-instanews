$('.choose').on('change', function(){
  event.preventDefault();
  
  $('.header').css({'height':'8rem','padding-top':'2rem'});
  
  $('.load').css('display', 'block');

  var newsSection = $('#choose').val();
  var key = 'e36a9556acdd4164bd355b361d3a195b';
  var url = 'https://api.nytimes.com/svc/topstories/v2/' + newsSection + '.json?api-key=' + key;
    
  $.ajax({
    url: url,
    method: 'GET'
  }).done(function(newsResults) {
    $('.load').css('display', 'none');
  var news = newsResults.results.slice(0,12);
  //   console.log(news);
  
  var filtered = $.grep(news, function(grep){
    return grep.multimedia.length>0
  });
    console.log(filtered);
   
  $('.news').empty();
  
  $.each(news, function (index, value){
    $('.news').append('<li><a class="news-link" href="' + value.short_url + '">' + '<img src="' + value.multimedia[4].url + '" alt="photo" class="news-photo"></a><p class="news-abstract">' + value.abstract + '</p></li>')
  });

  $('.news-link').hover(function(){
    $(this).find('news-abstract').css('z-index', '200')
  });

  }).fail(function(err) {
    console.log('error');
  });



  });
  
  // $('#logo').fadeIn(2000);