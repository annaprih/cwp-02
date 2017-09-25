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
    client.once('data', data => {
        generQues();
    });
});

function generQues() {
    nowQues = questions.pop();
    client.write(nowQues.question);
    client.once("data", answer => {
        let trueOrFalse;
        if (answer == nowQues.answer) {
            trueOrFalse = 'True answer';
        }
        else {
            trueOrFalse = 'False answer';
        }
        console.log(`Question: ${nowQues.question}\r\n`);
        console.log(`Answer: ${answer}\r\n`);
        console.log(`Server: ${trueOrFalse}\r\n`);

        if (questions.length !== 0) {
            generQues();
        }
        else {
            client.destroy();
        }

    });
};

client.on('close', function() {
    console.log('Connection closed');
});
