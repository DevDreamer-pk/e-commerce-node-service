import amqplib from "amqplib";

const rabbitMQConsumer = async () => {
    try {
        const queue = 'tasks';
        const connection = await amqplib.connect('amqp://localhost');

        const channel = await connection.createChannel();

        channel.consume(queue, (msg) => {
            console.log(`Received message: ${msg.content.toString()}`);
            channel.ack(msg);
        })


    } catch (error) {
        console.error("Error connecting to RabbitMQ:", error);
        return { error };
    }
};


export default rabbitMQConsumer