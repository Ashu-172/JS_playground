//const kafka = require("kafkajs").Kafka
const {Kafka} = require("kafkajs")

run();
async function run(){
    try{
        //establishing tcp connection
        const kafka = new Kafka({
            "clientId":"app",
            "brokers":["mywinpc:9092"]
        })

        //Creating Consumer
        const consumer = kafka.consumer({
            "groupId":  "test"
        })
        console.log("connecting...")
        await consumer.connect()
        console.log("connected.!")

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning":true
        })
        
        await consumer.run({
            "eachMessage": async result => {
                console.log(`Topic: ${result.topic}`)
                console.log(`Partition: ${result.partition}`)
                console.log(`Message: ${result.message}`)
                console.log()
            }
        })

    }
    catch(ex){
        console.log(`Something Bad happened  ${ex}`)
    }
    
}