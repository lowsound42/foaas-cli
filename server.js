#!/usr/bin/env node

const { get } = require('http');
const https = require('https');

const checkParams = () => {
  if ((process.argv[2] == null) || (process.argv[3] == null)){
    console.log('Try one of these formats:' + '\n' + 
    '1) foaas me :name' + '\n' + 
    '2) foaas zero :name' + '\n' +
    '3) foaas madison :name :from');
    return process.exit(0);
  }
}

checkParams();

var options;

if (process.argv[4]){
   options = {
    hostname: 'foaas.com',
    path: `/${[process.argv[2]]}/${process.argv[3]}/${process.argv[4]}`,
    headers: {
      'Accept': 'application/json',
    },
  }
} else {
  options = {
    hostname: 'foaas.com',
    path: `/${[process.argv[2]]}/${process.argv[3]}`,
    headers: {
      'Accept': 'application/json',
    },
  }
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
