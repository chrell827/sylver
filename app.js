$(document).ready(function () {

  var userInput;
  var didSearch = false;


  function clickedSearchBtn(event) {
    $("#search-button").on("click", function () {

      if (didSearch === true) {
        scaleOut();
        setTimeout(function () {
          clearStuff();
          theFunction();
        }, 1500);
      }
      else {
        theFunction();
      }


    });

    $("#word-text").text(userInput);
  }

  function scaleIn() {
    $("#word-text").addClass("scale-in");
    $("#definition").addClass("scale-in");
    $("#type").addClass("scale-in");
    $("#synonyms").addClass("scale-in");
    $("#antonyms").addClass("scale-in");
    $("#image-content").addClass("scale-in");
  }

  function scaleOut() {
    $("#word-text").removeClass("scale-in");
    $("#definition").removeClass("scale-in");
    $("#type").removeClass("scale-in");
    $("#synonyms").removeClass("scale-in");
    $("#antonyms").removeClass("scale-in");
    $("#image-content").removeClass("scale-in");
  }

  function clearStuff() {
    $("#image-content").empty();
  }

  function theFunction() {
    userInput = $("#word-search").val().trim();
    $("#search-content").show();
    $(".card-content").empty();

    var APIKeyThesaurus = "2e33d79f-c228-40c0-9dfb-171729314d2a";
    var queryURLThesaurus = "https://www.dictionaryapi.com/api/v3/references/thesaurus/json/" + userInput + "?key=" + APIKeyThesaurus;
    $.ajax({
      url: queryURLThesaurus,
      method: "GET"
    }).then(function (response) {
      var resultDef = "";

      for (var i = 0; i < 2; i++) {
        if (response[0].shortdef[i] === undefined)
          break;
        resultDef = "&bull;" + response[0].shortdef[i] + "";
        $("#definition-content").append(resultDef + "<br>");
      }
      var resultSyn = " ";
      for (var a = 0; a < 1; a++) {
        resultSyn = "&bull;" + response[0].meta.syns[a] + " ";
        $("#synonym-content").append(resultSyn);
      }

      var resultAnt = " ";
      for (var b = 0; b < 1; b++) {
        if (response[0].meta.ants[b] === undefined) {
          $("#antonym-content").append("N/A");
          break;
        }
        resultAnt = "&bull;" + response[0].meta.ants[b];
        $("#antonym-content").append(resultAnt);
      }
      var resultType = "";
      resultType += "" + response[0].fl + " ";
      $("#type-content").append(resultType);
    });

    var word = userInput.toLowerCase();
    var firstLetter = word.charAt(0).toUpperCase();
    word = word.substring(1, word.length);
    $("#word-text").text(firstLetter + word);

    var apiKeyPixabay = "14072686-25afeb91b6b45125a1704a8a5";
    var queryURLPixabay = "https://pixabay.com/api/?key=" + apiKeyPixabay + "&q=" + userInput + "&image_type=photo";

    $.ajax({
      url: queryURLPixabay,
      method: "GET"
    }).then(function (response) {
      var imageURL;

      for (var z = 0; z < 3; z++) {
        imageURL = response.hits[z].largeImageURL;
        var wordImageDiv = $("<div>");
        var wordImage = $("<img>").attr('src', imageURL);
        wordImage.addClass("word-image img-fluid img-thumbnail rounded");
        $(wordImage).append(imageURL);
        $(wordImageDiv).append(wordImage);
        $("#image-content").append(wordImageDiv);
      }
    });

    didSearch = true;
    scaleIn();
  }
  clickedSearchBtn();
});