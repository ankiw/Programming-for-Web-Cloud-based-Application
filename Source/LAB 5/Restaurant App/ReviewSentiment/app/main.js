/**
 * Created by AnkitaW on 7/7/2017.
 */
/**
 * Created by Ankita on 9/09/2016.
 */

(function () {
    "use strict";

    var $item = $('');


    var start = function () {

        var apikey = 'd0e7bf68cdda677938e6c186eaf2b755ef737cd8',

            outputMode = 'json',
            mixed = 'mixed',
            showSourceText = '1';


        $("input[type=submit]").on("click", function (evt) {

            var text = $('#userInput').val();
            var urlTarget = $('#urlInput').val();


            if ($('#userInput').val() !== "" && $('#urlInput').val() === "") {
                $("main .container").slideUp(400);

                console.log(text);

                var url = 'http://access.alchemyapi.com/calls/text/TextGetTextSentiment?' + 'apikey=' + apikey + '&text=' + text + '&outputMode=' + outputMode + '&showSourceText=' + showSourceText;


                $.getJSON(url, function (sentimentResponse) {

                    var score = sentimentResponse.docSentiment.score;
                    var sentiment = sentimentResponse.docSentiment.type;
                    var mixed = sentimentResponse.docSentiment.mixed;
                    var inputText = sentimentResponse.text;

                    console.log(inputText);
                    console.log(score);
                    console.log(sentiment);
                    console.log(mixed);

                    if (score < -0.5) {
                        $('<p id="negResponse">This text comes off as really negative. WARNING: You may be burning bridges!</p>').appendTo("main .response");
                    } else if (score < 0) {

                        if (mixed == 1) {
                            $('<p id="slightNegResponse">This text has mixed signals but comes off as mostly negative. WARNING: You may be starting fires that end up burning bridges!</p>').appendTo("main .response");
                        } else {
                            $('<p id="slightNegResponse">This text comes off as slightly negative. WARNING: You may be starting fires that end up burning bridges!</p>').appendTo("main .response");
                        }
                    } else if (sentiment == "neutral") {

                        if (mixed == 1) {
                            $('<p id="neutralResponse">This text has mixed signals but in the end comes off as neutral.</p>').appendTo("main .response");
                        } else {
                            $('<p id="neutralResponse">This text comes off as neutral.</p>').appendTo("main .response");
                        }
                    } else {

                        if (mixed == 1) {
                            $('<p id="posResponse">This text has mixed signals but still comes off as positive.</p>').appendTo("main .response");
                        } else {
                            $('<p id="posResponse">This text comes off as really positive and should be taken well.</p>').appendTo("main .response");
                        }
                    }

                }); //end of getJSON Call

                refresh();


//=============+++++++++++ URL Sentiment +++++++++++++++++++++++========================//


            }  else if ($('#urlInput').val() !== "" && $('#userInput').val() === "") {
                $("main .container").slideUp(400);

                console.log(urlTarget);

                var url = 'http://access.alchemyapi.com/calls/url/URLGetTextSentiment?' + 'apikey=' + apikey + '&url=' + urlTarget + '&outputMode=' + outputMode + '&showSourceText=' + showSourceText;


                $.getJSON(url, function (sentimentResponse) {

                    var score = sentimentResponse.docSentiment.score;
                    var sentiment = sentimentResponse.docSentiment.type;
                    var mixed = sentimentResponse.docSentiment.mixed;
                    var textFromURL = sentimentResponse.text;

                    console.log(textFromURL);
                    console.log(score);
                    console.log(sentiment);
                    console.log(mixed);

                    if (score < -0.5) {
                        $('<p id="negResponse">This webpage comes off as really negative. WARNING: You may be burning bridges!</p>').appendTo("main .response");
                    } else if (score < 0) {

                        if (mixed == 1) {
                            $('<p id="slightNegResponse">This webpage has mixed signals but comes off as mostly negative. WARNING: You may be starting fires that end up burning bridges!</p>').appendTo("main .response");
                        } else {
                            $('<p id="slightNegResponse">This webpage comes off as slightly negative. WARNING: You may be starting fires that end up burning bridges!</p>').appendTo("main .response");
                        }
                    } else if (sentiment == "neutral") {

                        if (mixed == 1) {
                            $('<p id="neutralResponse">This webpage has mixed signals but in the end comes off as neutral.</p>').appendTo("main .response");
                        } else {
                            $('<p id="neutralResponse">This webpage comes off as neutral.</p>').appendTo("main .response");
                        }
                    } else {

                        if (mixed == 1) {
                            $('<p id="posResponse">This webpage has mixed signals but still comes off as positive.</p>').appendTo("main .response");
                        } else {
                            $('<p id="posResponse">This webpage comes off as really positive and should be taken well.</p>').appendTo("main .response");
                        }
                    }

                }); //end of getJSON Call

                refresh();

//=============+++++++++++ error message +++++++++++++++++++++++========================//


            } else {
                console.log('error');
                alert('You forgot to paste in either text or a url for evaluation or maybe you pasted into both. Please try again.');
            };

        }); //button ending

    }; //end of Start function

//=============+++++++++++ refresh function +++++++++++++++++++++++========================//

    var refresh = function () {
        $('#userInput').val("");
        $('#urlInput').val("");

        var $refreshButton = $('<input type="submit" id="refreshButton" value="Do it again!">');
        $refreshButton.insertAfter("main .response")

        $refreshButton.on("click", function (evt) {

            $("#negResponse").hide();
            $("#slightNegResponse").hide();
            $("#neutralResponse").hide();
            $("#posResponse").hide();

            $refreshButton.hide();

            $("main .container").slideDown("slow", function () {
                location.reload(true);
            });
        });

    };


    var main = function () {
        start();

    };

    $(document).ready(main);

}());