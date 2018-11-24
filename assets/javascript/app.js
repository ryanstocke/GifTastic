$(document).ready(function () {

    var topicsArray = ["Dogs", "Cats", "Birds"]
    function showTopicButtons(){
       $("#topic-buttons").empty()
       var topicButtons = []
       for (var i = 0; i < topicsArray.length; i++){
        var topicButton = $("<button class = 'topic-button'>")
        topicButton.attr("data-animal", topicsArray[i])
        topicButton.text(topicsArray[i])
        topicButtons.push(topicButton)
       } 
       $("#topic-buttons").append(topicButtons)
    }

    // Adding click event listen listener to all buttons
    $("#topic-buttons").on("click", ".topic-button",function () {
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
                for (var i = 0; i < gifResults.length; i++){
                    var gifButton = $("<img class= 'gif-button'>")
                    var gifAnimated = gifResults[i].images.original.url
                    var gifStill = gifResults[i].images.original_still.url
                    gifButton.attr("src", gifStill)
                    gifButton.attr("data-still", gifStill)
                    gifButton.attr("data-animated", gifAnimated)
                    gifButtons.push(gifButton)
                    // if (gifButton === "still") {
                    //     $(this).attr("src", $(this).attr("data-animate"));
                    //     $(this).attr("data-state", "animate");
                    //   } else {
                    //     $(this).attr("src", $(this).attr("data-still"));
                    //     $(this).attr("data-state", "still");
                    //   }
                }
                $("#gifs-here").append(gifButtons)
                console.log(results);
                
            })
    });

    showTopicButtons()

    // NO CODE BELOW THIS LINE
})