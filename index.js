const { sign } = require("./X-Bogus.js");
var http = require('http');
var server = http.createServer(function(req, res) {
	let postData = '';
	if (req.method==='GET')
	{
		res.writeHead(200, {'Content-Type': 'text/plain'});
		var message = 'It works!\n',
		version = 'NodeJS ' + process.versions.node + '\n',
		response = [message, version].join('\n');
		res.end(response);
	} else if (req.method==='POST'){
		req.on('data', chunk => {
			postData += chunk.toString();
		});
		req.on('end', () => {
			let jsonParsed = JSON.parse(postData);
			//console.log(jsonParsed);

			let url = jsonParsed.url;
			let userAgent = jsonParsed.useragent;

			let query = url.includes("?") ? url.split("?")[1] : "";
			let xbogus = sign(query, userAgent);
			let newUrl = url + "&X-Bogus=" + xbogus;

			let objData = {'X-Bogus':xbogus, 'param':newUrl};
			let jsonStr = JSON.stringify(objData,"","\t");

			res.writeHead(200, {'Content-Type': 'application/json;charset=utf-8'});
			res.end(jsonStr);
			//console.log(jsonStr);
			/*const data = JSON.parse(postData);
			res.end(['url:', data.url, 'agent:', data.useragent].join('\n'));*/
		});
	}
    /*res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version, newUrl, postData].join('\n');
    res.end(response);*/
});
server.listen(8188, '0.0.0.0', () => {
  //console.log('start ok')
});