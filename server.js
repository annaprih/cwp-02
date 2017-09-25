/**
 * Created by Anna on 18.09.2017.
 */
const net = require('net');
const fs = require('fs');
const port = 8124;
let seed = 0;

const server = net.createServer(client => {
    let qaJson = JSON.parse(fs.readFileSync("qa.json"));
    let ques = qaJson.questions;
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
    client.setEncoding('utf8');
    client.id = Date.now() + seed++;
    console.log(client.id,`Client ${client.id} is connected`);

    client.once('data', msg => {

        if(msg == 'QA'){
            console.log(client.id, 'Message from client is true');
            client.write('ACK', "UTF-8", ans => {
                client.on('data', question => {
                    let temp = questions.pop();
                    client.write(temp.answer);
                    console.log(client.id, `Client question: ${question}`);
                    console.log(client.id, `Server Answer: ${temp.answer}`);
                });
            });
        }
        else {
            console.log(client.id, 'Message from client is false');
            client.write('DEC');
            client.destroy();
        }
    });

    client.on('end', () => {
        console.log(client.id, `Client ${client.id} disconnected`)
    });
});


server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});
