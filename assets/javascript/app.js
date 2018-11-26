$(document).ready(function () {
    var topicsArray = ["Dogs", "Cats", "Birds", "Horses"]
    // var userInputButton;
    function showTopicButtons() {
        $("#topic-buttons").empty()
        var topicButtons = []
        for (var i = 0; i < topicsArray.length; i++) {
            var topicButton = $("<button class = 'topic-button'>" + topicsArray[i] + "</button>")
            topicButton.attr("data-animal", topicsArray[i])
            topicButton.text(topicsArray[i])
            topicButtons.push(topicButton)
        }
        $("#topic-buttons").prepend(topicButtons)
    }
    
    // Adding click event listen listener to all buttons
    
    $("#topic-buttons").on("click", ".topic-button", function () {
        // Grabbing and storing the data-animal property value from the button
        var animal = $(this).attr("data-animal");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=VmaPeULXS2UBADSYjHC7xoz9Tex0k3LZ&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .done(function (results) {
                var gifResults = results.data;
                var gifButtons = [];

                for (var i = 0; i < gifResults.length; i++) {
                    var animalDiv = $("<div>");
                    // animalDiv.addClass("gifDiv");
                    var gifRating = $("<p>").text("Rating: " + gifResults[i].rating);
                    // animalDiv.append(gifRating);
                    var gifButton = $("<img class= 'gif-button'>")
                    var gifStill = gifResults[i].images.fixed_height_still.url
                    var gifAnimated = gifResults[i].images.fixed_height.url
                    gifButton.attr("src", gifStill)
                    gifButton.attr("data-still", gifStill)
                    gifButton.attr("data-animated", gifAnimated)
                    gifButtons.push(gifButton)
                    animalDiv.prepend(gifRating);
                    animalDiv.prepend(gifButton);
                    $("#gifs-here").prepend(animalDiv)
                }
                
                console.log(results);

                $(".gif-button").on("click", function () {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animated"));
                        $(this).attr("data-state", "animated");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
    });
    addNewGif();
    showTopicButtons();
    
    function addNewGif(){
        $("#submitBtn").on("click", function(){
            var action = $("#animalUserInput").val();
            if (action == ""){
              alert("You didn't enter an animal");
              return false; // added so user cannot add a blank button
            //   alert("You didn't enter an animal");
            //   $("#animalUserInput").val("");
            }
            topicsArray.push(action);
        
            showTopicButtons();
            return false;
            });
        }


    // NO CODE BELOW THIS LINE
});