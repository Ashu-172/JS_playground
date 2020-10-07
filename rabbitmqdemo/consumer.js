const amqp = require("amqplib");

connect();

async function connect() {
  try {
    const conn = await amqp.connect("amqp://localhost:5672");
    const channel = await conn.createChannel();
    const result = await channel.assertQueue("jobs");

    /**Consuming Message*/
    console.log("Waiting for Msgs");
    channel.consume("jobs", (message) => {
      const output = JSON.parse(message.content.toString());
      console.log(`receive Job with number ${output.number}`);

      /** Acknowledgment - Msg ill be removed from the queue
       * (we can do stuff here and send ack for some event on some condition)
       */
      if (true) channel.ack(message);
    });
  } catch (ex) {
    console.error(ex);
  }
}
