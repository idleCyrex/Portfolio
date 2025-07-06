const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Resend } = require('resend');

dotenv.config();

const app = express();
const port = 3001;

const corsOptions = {
  origin: ['https://idlee.xyz', 'http://localhost:3000'],
};

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', async (req, res) => {
  const { name, email, comment } = req.body;

  try {
    await resend.emails.send({
      to: 'mail@gmail.com',
      from: 'idle <contact@idlee.xyz>',
      subject: `Contact Form Submission from ${name}`,
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Comment: ${comment}</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});