// Mood's array
var topics = ['Drama', 'Happy', 'Tired', 'Romantic'];

// ========================================================

function showGif(){

    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10&rating=pg";

     $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
         console.log(response);
        $("#topicsView").empty();
        for (var i = 0; i < response.data.length; i++){

            var rating = response.data[i].rating;
            var imageUrl = response.data[i].images.fixed_height.url;
             var imageStillUrl = response.data[i].images.fixed_height_still.url;

            var image = $("<img>");
            var ratingText = $("<p id='rating'>" + "Rating: " + rating + "</p>");

            
            image.attr('src', imageStillUrl);
            image.attr('alt', 'gif');
            image.attr('data-state', 'still');
            image.attr('data-still', imageStillUrl);
            image.attr('data-animate', imageUrl);


            $('#topicsView').prepend(image, ratingText);
            checkState ();
        }
     }); 
} 

function renderButtons(){ 

    $('#buttonsView').empty();

    for (var i = 0; i < topics.length; i++){

        var newButton = $('<button class="btn btn-warning">') 
        newButton.addClass('mood');
        newButton.attr('data-name', topics[i]); 
        newButton.text(topics[i]); 
        $('#buttonsView').append(newButton); 
    }
}

$('#addMood').on('click', function(){

    var mood = $('#moodInput').val().trim();

    topics.push(mood);
    
    renderButtons();

    return false;
})


$(document).on('click', '.mood', showGif);

renderButtons();

function checkState(){
    $('img').on('click', function(){
  var state = $(this).attr('data-state'); 
  if (state == 'still'){
  $(this).attr('src', $(this).data('animate'));
  $(this).attr('data-state', 'animate');
  }else{
  $(this).attr('src', $(this).data('still'));
  $(this).attr('data-state', 'still');
}

    });
};