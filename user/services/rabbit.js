const amqp = require('amqplib');

let channel;
const RABBITMQ_URL = process.env.RABBIT_URL

// Connect to RabbitMQ using the connection URL from the environment variable
async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ:', error);
        process.exit(1);
    }
}

// Publish a message to a specific queue
async function publishToQueue(queue, message) {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));
}

// Subscribe to a specific queue
async function subscribeToQueue(queue, callback) {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    await channel.assertQueue(queue);
    channel.consume(queue, (msg) => {
        if (msg !== null) {
            callback(msg.content.toString());
            channel.ack(msg);
        }
    });
}

// Initialize the RabbitMQ connection
connectRabbitMQ();

module.exports = {
    publishToQueue,
    subscribeToQueue,
    connectRabbitMQ
};