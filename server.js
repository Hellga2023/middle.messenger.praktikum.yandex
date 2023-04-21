const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname+"/dist"));
console.log(__dirname+"/dist");
app.listen(PORT, function () { console.log(`My app listening on port ${PORT}!`);});  

app.get('/*', function(req, res) {
  res.set("Content-Security-Policy", "default-src 'self';" +
  "script-src 'self' https://kit.fontawesome.com/ 'unsafe-eval';" + //todo remove font awesome to remove this unsafe!!!
  "connect-src 'self' https://ya-praktikum.tech/ wss://ya-praktikum.tech/ https://ka-f.fontawesome.com/;" +
  "style-src 'self' 'unsafe-inline';" +
  "font-src 'self' https://ka-f.fontawesome.com/;");
  res.sendFile(__dirname + '/dist/index.html');
});
