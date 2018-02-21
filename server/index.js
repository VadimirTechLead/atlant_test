var http = require("http");
var static = require("node-static");
var web3 = require("web3");
var file = new static.Server("./public");
const port = process.env.PORT || 3000;
const Koa = require('koa');
const app = new Koa();
 
// response
app.use(ctx => {
  console.log()
  ctx.body = 'Hello Koa';
});
 
app.listen(port);
console.log(port + " PORT");