#!/usr/bin/env node
/*
Thanks to https://www.foaas.com for the amazing service. Credit to Tom Cully (https://github.com/tomdionysus)
*/

const https = require('https');

//checking user provided parameters to see if valid FOaaS command is provided
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

// defining variables for http request
var options;
var pathToFuck = '/';

// loop through relevant parameters (after foaas-cli command) and append to path for http request
for (let i = 2; i < process.argv.length; i++) 
{
  pathToFuck += process.argv[i] + '/';
}

// define get request options
options = 
{
  hostname: 'foaas.com',
  path: pathToFuck,
  headers: {
    'Accept': 'application/json',
  },
}

// make the API call to FOaaS
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
