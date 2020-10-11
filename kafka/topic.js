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

        //Admin interface to create topic
        const admin  =kafka.admin();
        console.log("connecting...")
        await admin.connect()
        console.log("connected.!")

        //creating topic with 2 partitions "A-M" & "N-Z"
        await admin.createTopics({
            "topics":[{
                "topic":"Users",
                "numPartitions":2
            }]
        })
        console.log("Topic created Successfully!")
    }
    catch(ex){
        console.log(`Something Bad happened  ${ex}`)
    }
    finally{
        process.exit(0)
    }
}