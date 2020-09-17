#!/usr/bin/env node

const https = require('https');

const checkParams = () => {
  if ((process.argv[2] == null)){
    console.log('Try one of these formats:' + '\n' + 
    '1) foaas-cli me :name' + '\n' + 
    '2) foaas-cli zero :name' + '\n' +
    '3) foaas-cli madison :name :from' + '\n' +
    'There are tons of others, check out the amazing https://www.foaas.com for other combos and go nuts');
    return process.exit(0);
  }
}

checkParams();

var options;
var pathToFuck = '/';


for (let i = 2; i < process.argv.length; i++) 
{
  pathToFuck += process.argv[i] + '/';
}


options = 
{
  hostname: 'foaas.com',
  path: pathToFuck,
  headers: {
    'Accept': 'application/json',
  },
}


https.get(options, res => {
  res.setEncoding("utf-8");
  let body = "";
  res.on("data", data => {
    body += data;
  });
  res.on("end", () => {
    body = JSON.parse(body);
    console.log(body.message + '\n'  + body.subtitle);
  })
})
