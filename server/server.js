var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

var readJSON = function(){
	var fileContent = fs.readFileSync('links.json');
	var dataJSON = JSON.parse(fileContent);
	var data = [];

	for(var i = 0; i < dataJSON.length; i++){
		data.push(dataJSON[i]);
		console.log(data[i]);
	}

	return data;
}

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/links.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var data = readJSON();
  res.send(JSON.stringify(data));
});

app.listen(3000);

console.log('Server started: http://localhost:3000/');
