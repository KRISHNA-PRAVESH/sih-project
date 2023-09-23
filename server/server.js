// Require the framework and instantiate it
const fastify = require('fastify')({ logger: false })
const twilio = require('twilio');
require('dotenv').config();

// Declare a route
fastify.get('/', function handler (request, reply) {
  reply.send({ hello: 'world' })
})


//The post request consists of an alert , 
//the alert message has the details about the gas the worker is exposed to , its level of ppm , employee id , employee_id location
fastify.post('/alert',async(req,res)=>{
 try{
  res.header('Access-Control-Allow-Origin', '*');
   //sending sms to the superviser contains the details
  //  const alertMessage = JSON.stringify(req.body,null,2);
      alertMessage = req.body
   await sendSMS(alertMessage);
   console.log("SMS Sent to the supervisor")
   res.status(200);
 }
 catch(err){
   console.log(err);
   res.status(500).send(new Error('Error sending sms'));
 }

})




//Utilities
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = new twilio(accountSid, authToken);

//sending SMS with the details
async function sendSMS(alertMessage){
    try{
        await client.messages.create({
            body: alertMessage,
            to: '+91 9159721841', 
            from: '+14789997735' 
        })
        .then((message) => console.log(message.sid));
    }
    catch(err){
        console.log(err);
    }
    
    
}




// Run the server!
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  else{
    console.log("Server is Up and listening at port 3000")
  }
})


// // Export the Express app as a Firebase Cloud Function
// exports.api = functions.https.onRequest(app);