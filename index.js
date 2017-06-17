var express = require('express');
var url = require('url');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/*app.get('/', function(request, response) {
  response.render('pages/index');
});*/

app.get('/rate', function(request, response) {
	var q = url.parse(request.url, true).query;
	var weight = Number(q.weight);
	var mail = q.mail;
	var price = calculateRate(weight, mail);
	var params = {mailType: mail, weights: weight, cost: price};
response.render('pages/rate', params);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function calculateRate(weight, mail) {
	var price;
	
	switch(mail) {
	    case "Letters (Stamped)":
	        if (weight <= 1) {
			price = ".49";
		} else if (weight <= 2) {
			price = ".70";
		} else if (weight <= 3) {
			price = ".91";
		} else if (weight <= 3.5) {
			price = "1.12";
		} else if (weight > 3.5) {
			price = "this is to hevey to be mailed as a Letter";
		}
        	break;
	    case "Letters (Metered)":
	        if (weight <= 1) {
                        price = ".46";
                } else if (weight <= 2) {
                        price = ".67";
                } else if (weight <= 3) {
                        price = ".88";
                } else if (weight <= 3.5) {
                        price = "1.09";
                } else if (weight > 3.5) { 
                        price = "this is to hevey to be mailed as a Letter";
                } 
        	break;
   	    case "Large Envelopes (Flats)":
                if (weight <= 1) {
                        price = ".98";
                } else if (weight <= 2) {
                        price = "1.19";
                } else if (weight <= 3) {
                        price = "1.40";
                } else if (weight <= 4) {
                        price = "1.61";
                } else if (weight <= 5) { 
                        price = "1.82";
                } else if (weight <= 6) { 
                        price = "2.03";
                }else if (weight <= 7) { 
                        price = "2.24";
                }else if (weight <= 8) { 
                        price = "2.45";
                }else if (weight <= 9) { 
                        price = "2.66";
                }else if (weight <= 10) { 
                        price = "2.87";
                }else if (weight <= 11) { 
                        price = "3.08";
                }else if (weight <= 12) { 
                        price = "3.29";
                }else if (weight <= 13) { 
                        price = "3.50";
                }else if (weight > 13) { 
                        price = "This is to hevey to be mailed in a Large Envelope";
                }
                break;
	    case "Parcels":
                if (weight <= 4) {
                        price = "2.67";
                } else if (weight <= 5) { 
                        price = "2.85";
                } else if (weight <= 6) { 
                        price = "3.03";
                }else if (weight <= 7) { 
                        price = "3.21";
                }else if (weight <= 8) { 
                        price = "3.39";
                }else if (weight <= 9) { 
                        price = "3.57";
                }else if (weight <= 10) { 
                        price = "3.75";
                }else if (weight <= 11) { 
                        price = "3.93";
                }else if (weight <= 12) { 
                        price = "4.11";
                }else if (weight <= 13) { 
                        price = "4.29";
                }else if (weight > 13) { 
                        price = "This is to hevey to be mailed as a parcel";
                }
                break;
    	default:
		price = "This is embarrassing. Something went wrong. please try again";
        	break;
   }
	return price;
}