//const kafka = require("kafkajs").Kafka
const {Kafka} = require("kafkajs")
const msg = process.argv[2];
run(msg);
async function run(msg){
    try{
        //establishing tcp connection
        const kafka = new Kafka({
            "clientId":"app",
            "brokers":["mywinpc:9092"]
        })

        //Creating Procuder
        const producer  =kafka.producer()
        console.log("connecting...")
        await producer.connect()
        console.log("connected.!")

        //deciding partition Key
        //const key = msg[0].toLowerCase() < "n" ? "first" : "second"
        const partition = msg[0].toLowerCase() < "n" ? 0 : 1

        const result = await producer.send({
            "topic":"Users",
            "messages":[
                {
                    //"key": key,
                    "partition":partition,
                    "value": msg 
                }
            ]
        })
        console.log(`message: ${msg} published with partition key ${partition}`);
        console.log(`Result: ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch(ex){
        console.log(`Something Bad happened  ${ex}`)
    }
    finally{
        process.exit(0)
    }
}