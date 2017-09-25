/**
 * Created by Anna on 25.09.2017.
 */
const N = process.argv[2];
const {exec} = require('child_process');
for( let i = 0; i < N; i++){
    console.log(`Client ${i} is started`);
    exec("node client.js");
}
