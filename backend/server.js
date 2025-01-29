// backend/server.js

const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5001;

// Configure AWS SDK v3 clients
const s3Client = new S3Client({ region: 'us-west-2' });
const sqsClient = new SQSClient({ region: 'us-west-2' });

// Enable CORS for frontend communication
app.use(cors());
app.use(bodyParser.json());

// Upload file to S3
app.post('/upload', async (req, res) => {
  const { file } = req.body; // Get base64-encoded file from frontend
  const buffer = Buffer.from(file, 'base64');

  const params = {
    Bucket: 'your-s3-bucket-name',
    Key: 'uploaded-file.jpg',
    Body: buffer,
    ContentType: 'image/jpeg',
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    res.status(200).send(data);
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    res.status(500).send('Error uploading file to S3');
  }
});

// Send message to SQS
app.post('/send-message', async (req, res) => {
  const { message } = req.body;

  const params = {
    QueueUrl: 'your-sqs-queue-url',
    MessageBody: message,
  };

  try {
    const data = await sqsClient.send(new SendMessageCommand(params));
    res.status(200).send(data);
  } catch (error) {
    console.error('Error sending message to SQS:', error);
    res.status(500).send('Error sending message to SQS');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
