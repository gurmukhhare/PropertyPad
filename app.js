
function pageLoadFunc(){

	var url = "http://127.0.0.1:5000/get_location_names";  
  $.get(url,function(data, status) {

      if(data) {
          var mylocations = data.locations;
          var chooseLocation = document.getElementById("chooseLocation");
          $('#chooseLocation').empty();

          for(var i in mylocations) {
              var opt = new Option(mylocations[i]);
              $('#chooseLocation').append(opt);
          }
      }
  });
}


function estimatePrice() {
  var area = document.getElementById("uiSqft");
  var bhk = grabBHK();
  var baths = grabBaths();
  var location = document.getElementById("chooseLocation");
  var prices = document.getElementById("priceEstimate");

  var url = "http://127.0.0.1:5000/predict_home_price"; 

  $.post(url, {
      total_sqft: parseFloat(area.value),
      bhk: bhk,
      bath: baths,
      location: location.value
  },function(data, status) {
  	  console.log(data.Predicted_price);
      prices.innerHTML = "<h2>$" + ((((data.Predicted_Price)*100000)/56).toFixed(2)).toString() + " CAD</h2>";
  });
}


function grabBaths() {
  var bathInput = document.getElementsByName("bathInput");
  for(var i in bathInput) {
    if(bathInput[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1;
}


function grabBHK() {
  var bhkInput = document.getElementsByName("bhkInput");
  for(var i in bhkInput) {
    if(bhkInput[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1;
}


window.onload = pageLoadFunc;

