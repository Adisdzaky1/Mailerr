## Email Sender API

This is a simple API built with Node.js, Express, and Nodemailer that allows you to send emails programmatically using a REST API.

## Motivation

This project was created to provide a simple way to send emails programmatically using Node.js and Nodemailer. It is designed to be easy to use and customize, making it a great starting point for building your own email sending functionality.

## Tech/framework used
- Node.js
- Express
- Nodemailer

## Code Example

To send an email, send a POST request to the ```/api/mail``` endpoint with the following JSON data:

```javascript 
//Example javascript code 
const apiUrl = "https://gmailapi-armanidrisi.vercel.app/api/mail/"; 

const requestBody = { 
  sender: "yourmail@gmail.com", 
  password: "yourpass", 
  recipient: "receiver mail", 
  subject: "subject", 
  message: "msg" 
}; 

fetch(apiUrl, { 
  method: "POST", 
  headers: { 
    "Content-Type": "application/json" 
  }, 
  body: JSON.stringify(requestBody) 
}) 
  .then(response => response.json()) 
  .then(data => console.log(data)) 
  .catch(error => console.error(error)); 


```

## Deploy on your own
### on vercel

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/Armanidrisi/Mailer)


## Credits

This project was created by Arman Idrisi.

## License

This project is licensed under the MIT License. 
