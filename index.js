const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');

const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} asswords :p`);
});

app.post('/api/form', (req, res) => {


	nodemailer.createTestAccount((err, account) => {
		const htmlEmail = `
			<h3>Contact Details</h3>
			<ul>
				<li>${req.body.type}</li>
				<li>Email: ${req.body.email}</li>
			</ul>
		`


		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'legally.co@gmail.com',
        		pass: 'poopypants'
			}
		})


		let mailOptions = {
			from: 'legally.co@gmail.com',
			to: 'legally.co@gmail.com',
			replyTo: 'legally.co@gmail.com',
			subject: req.body.type + ': ' + req.body.email,
			text: req.body.type + '\n' + req.body.email,
			html: htmlEmail
		}


		console.log(htmlEmail)
		console.log(req.body)

		transporter.sendMail(mailOptions, (err, info) => {
			if(err) {
				return console.log(err)
			}

		})

	})

})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});




const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
