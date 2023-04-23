const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 3000;

/* rate limit to prevent DOS */
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

app.use(express.static(__dirname+"/dist"));
console.log(__dirname+"/dist");
app.listen(PORT, function () { console.log(`My app listening on port ${PORT}!`);});  

app.get('/*', function(req, res) {
  res.set("Content-Security-Policy", "default-src 'self';" +
  "script-src 'self' https://kit.fontawesome.com/ 'unsafe-eval';" + //todo remove font awesome to remove this unsafe!!!
  "connect-src 'self' https://ya-praktikum.tech/ wss://ya-praktikum.tech/ https://ka-f.fontawesome.com/;" +
  "style-src 'self' 'unsafe-inline';" +
  "font-src 'self' https://ka-f.fontawesome.com/;"+
  "img-src 'self' https://ya-praktikum.tech/");
  res.sendFile(__dirname + '/dist/index.html');
});
