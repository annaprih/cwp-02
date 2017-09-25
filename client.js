/**
 * Created by Anna on 18.09.2017.
 */
const net = require('net');
const fs = require('fs');
const port = 8124;
let qaJson = JSON.parse(fs.readFileSync("qa.json"));
let ques = qaJson.questions;
let nowQues;
function mixQues(ques){
    for(i=0; i < ques.length; i++){
        let index = Math.floor(Math.random() *(i+1));
        let temp = ques[i];
        ques[i] = ques[index];
        ques[index] = temp;
    }
    return ques;
};
let questions = mixQues(ques);
const client = new net.Socket();

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected to server');
    client.write('QA');

});

client.on('close', function() {
    console.log('Connection closed');
});