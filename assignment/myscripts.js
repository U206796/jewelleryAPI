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

  var searchUrl = "https://data.nma.gov.au/object?title=" + searchQuery + "&limit=100" ;


  $.getJSON(searchUrl, function(apiData) {
    console.log("in search query");

    console.log(apiData);

    // loop through data

    for (i = 0; i < apiData.data.length; i++) {
      var r = apiData.data[i];

      //define additional type as variable
      var addType = r.additionalType[0];

      var jewel = ["Jewellery","Necklace","Bracelet", "Brooch"]; //could I create an array for the additionalType?

//addType == "Zoological specimens"

      if (addType == jewel[0] || addType == jewel[1] || addType == jewel[2] || addType == jewel[3]){ //"Jewellery") {
      //   //not a jewellery item
         console.log('here')
      //return
        
      } else {
        //jewellery item
        if (addType == "Zoological specimens") {
          return;
        }

        //console.log('jewellery: '+ r.title);

        var item = $('<div class="item">');

        item.append("<h3>" + r.title + "</h3>");
  
        if (r.additionalType != undefined) {
          var workType = r.additionalType[0];
        }
        // show the jewellery title
        if (r.medium != undefined) {
          var workMaterial = r.medium[0].title;
        }

        if (r.hasVersion != undefined) {
          item.append("<img src='" + r.hasVersion[0].hasVersion[0].identifier + "' >")
        }
        // show the jewellery work material
        item.append("<p>" + workType + " &middot; " + workMaterial + "</p>");
       
        // show physical description
  
        item.append("<p>" + r.physicalDescription + "</p>");
      }
      // check to see if the array exists before trying to set work type

      $(".item-container").append(item);

    }
  });
}
