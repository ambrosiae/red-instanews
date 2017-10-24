$('#choose').on('change', function(){
  event.preventDefault();
  
  $('#header').removeClass('logo-start').addClass('logo-end');
  
  var newsSection = $('#choose').val();
  var key = 'e36a9556acdd4164bd355b361d3a195b';
  var url = 'https://api.nytimes.com/svc/topstories/v2/' + newsSection + '.json?api-key=' + key;
    
  $.ajax({
    url: url,
    method: 'GET'
  }).done(function(news) {
    
  var news = news.results.slice(0,12);
  //   console.log(news);
  
  var filtered = $.grep(news, function(n, i){
    return n.multimedia.length>0});
  console.log(filtered);
  
  // filter(function(multimedia)
  // {if (multimedia >=1) {return news}; {console.log(news);}
   
  $('.news').empty();
  
  $.each(news, function (index, value){
  $('.news').append('<p>' + value.abstract + '</p>' + '<img src=' + value.multimedia[3].url + '>')
  });
  
  
  // }).fail(function(err) {
  //   console.log('error');
  
  
  
  // });
  });
  });
  
  // $('#logo').fadeIn(2000);
  
  // HINTS: .FILTER(), .SLICE(), .HIDE(), .ALWAYS()