$(document).ready(function() {
  //button
  $(".btn").click(function() {
    var query = $(".search").val();
    console.log("click: " + query);

    $(".item-container").empty();

    getData(query);
  });

  $(".textlink").click(function() {
    var query = $(this).text();
    console.log("click: " + query);

    $(".item-container").empty();

    getData(query);
  });
});

function getData(searchQuery) {
  // my api key

  var key = "88YLUCmMOwenXtYSgHRYMW7WUCzKQCJu";

  var searchUrl = "https://data.nma.gov.au/object?title=" + searchQuery;

  $.getJSON(searchUrl, function(apiData) {
    console.log("in search query");

    console.log(apiData);

    // loop through data

    for (i = 0; i < apiData.data.length; i++) {
      var r = apiData.data[i];

      // create an item

      var item = $('<div class="item">');

      item.append("<h3>" + r.title + "</h3>");

      // show physical description

      item.append("<p>" + r.physicalDescription + "</p>");

      // check to see if the array exists before trying to set work type

      if (r.additionalType != undefined) {
        var workType = r.additionalType[0];
      }
      // show the jewellery title
      if (r.medium != undefined) {
        var workMaterial = r.medium[0].title;
      }

      // show the jewellery work material
      item.append("<p>" + workType + " &middot; " + workMaterial + "</p>");

      $(".item-container").append(item);
    }
  });
}
