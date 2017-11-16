const http = require('http')  
const port = 3000

const requestHandler = (request, response) => {
	console.log("#########################################################");
	console.log();
    console.log(now()+" "+request.method+" "+request.url);
	console.log();
    console.log("headers:");
    
    for (var hName in request.headers) {
    	console.log(hName+": "+request.headers[hName]);
    }
  	
    if (request.method == 'POST' || request.method == 'PUT') {
		var payload = '';

		request.on('data', function (data) {
		    payload += data;
		});

		request.on('end', function () {
			console.log();
			console.log("payload");
            console.log(payload);
		    response.end('repeating');
		});
	}
	else {
		response.end('repeating');
	}
	
	console.log();
	console.log("#########################################################");
}

function now() {
	var now = new Date();
    return now.getFullYear() + "-" + ('0' + (now.getMonth()+1)).slice(-2)+"-"+('0' + now.getDate()).slice(-2)+" "
        + ('0' + now.getHours()).slice(-2) + ":" + ('0' + now.getMinutes()).slice(-2) + ":"
        + ('0' + now.getSeconds()).slice(-2) + "." + ('00' + now.getMilliseconds()).slice(-3);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
});
