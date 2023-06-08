const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const accountSid = "AC9c943440e626d7a7d1e1b33862622f97";
const authToken = "1992baaa6855feff0de4eb1322b6695f";
const twilioClient = require("twilio")(accountSid, authToken);

// Body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hey this is Yummy API running 🥳");
});

//.
//Set up the Twilio webhook for incoming messages.
app.post("/incoming", (req, res) => {
  const message = req.body.Body;
  const phoneNumber = req.body.From;

  // Process user's message and send appropriate response
  handleIncomingMessage(phoneNumber, message);

  res.set("Content-Type", "text/plain");
  res.send("OK");
  //res.sendStatus(200);
});

//Process user messages.
function handleIncomingMessage(phoneNumber, message) {
  // Check user's authentication status and route to appropriate function
  const isAuthenticated = checkAuthentication(phoneNumber);

  if (!isAuthenticated) {
    // User is not authenticated, handle sign up or sign in
    handleAuthentication(phoneNumber, message);
  } else {
    // User is authenticated, handle trip request or other actions
    handleUserActions(phoneNumber, message);
  }
}

//Use a session management library or
//a database to store user authentication status and information.
function checkAuthentication(phoneNumber) {
  // Check if the user is authenticated based on phone number
  // Implement your logic to check the user's authentication status (e.g., check a database)
  // Return true if the user is authenticated, false otherwise
}

function handleAuthentication(phoneNumber, message) {
  // Handle user sign up or sign in based on message content
  // Update the user's authentication status and store their information (e.g., in a session or database)
}

function handleUserActions(phoneNumber, message) {
  if (message.toLowerCase() === "request trip") {
    // Handle trip request
    const pickupLocation = ""; // Get pickup location from user
    const destinationLocation = ""; // Get destination location from user
    const paymentMethod = ""; // Get payment method from user (cash or Pago movil)

    handleTripRequest(
      phoneNumber,
      pickupLocation,
      destinationLocation,
      paymentMethod
    );
  } else if (message.toLowerCase() === "wallet balance") {
    // Handle wallet balance check
    handleWalletBalance(phoneNumber);
  } else {
    // Handle other user actions
  }
}

function handleTripRequest(
  phoneNumber,
  pickupLocation,
  destinationLocation,
  paymentMethod
) {
  // Request a trip using the Yummy Rides API or the mock API function
  const driver = requestTrip(
    phoneNumber,
    pickupLocation,
    destinationLocation,
    paymentMethod
  );

  // Send confirmation message to the user with driver information, vehicle details, etc.
  sendMessage(
    phoneNumber,
    `Driver assigned: ${driver.name}, Vehicle: ${driver.vehicle}, Distance: ${driver.distance}`
  );
}

function handleWalletBalance(phoneNumber) {
  // Get wallet balance using the Yummy Rides API or the mock API function
  const walletBalance = getWalletBalance(phoneNumber);

  // Send wallet balance to the user
  sendMessage(phoneNumber, `Your wallet balance is ${walletBalance}`);
}

function sendMessage(phoneNumber, message) {
  twilioClient.messages
    .create({
      body: message,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phoneNumber}`,
    })
    .then((message) => console.log(`Message sent with SID: ${message.sid}`))
    .catch((error) => console.error(`Error sending message: ${error}`));
}

//.
// Mock API function to get wallet balance
function getWalletBalance(phoneNumber) {
  // Simulate API request to get the user's wallet balance
  // Return mock data
  const mockWalletBalance = 100; // Replace with actual wallet balance data
  return mockWalletBalance;
}

// Mock API function to request a trip
function requestTrip(
  phoneNumber,
  pickupLocation,
  destinationLocation,
  paymentMethod
) {
  // Simulate API request to request a trip
  // Return mock data (e.g., driver information, estimated time of arrival, etc.)
  const mockDriver = {
    name: "John Doe",
    vehicle: "Toyota Corolla",
    distance: "2 km",
  };
  return mockDriver;
}

// Mock API function to complete a trip
function completeTrip(phoneNumber, tripId) {
  // Simulate API request to complete the trip
  // Return mock data (e.g., trip details, payment amount, etc.)
  // Complete the trip using the mock API function
  // Return mock data
  const mockTrip = {
    id: tripId,
    amount: 20, // Replace with actual payment amount
  };

  return mockTrip;
}
