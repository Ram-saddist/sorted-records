// index.js
/*
1. run the code initially when you start the server to insert 50 records into mongoose database by uncommenting the lines from 15 to 65 (indianCities) and 82 to 102 (for loop).
2. once you see the 50 records inserted succesfully you can comment again and start the frontend sever and its code 
*/

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const DataModel = require('./models/dataModel');
const cors =require("cors")
const app = express();
const PORT = process.env.PORT || 5000;

/*
const indianCities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Ahmedabad',
    'Pune',
    'Jaipur',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Indore',
    'Thane',
    'Bhopal',
    'Visakhapatnam',
    'Pimpri-Chinchwad',
    'Patna',
    'Vadodara',
    'Ghaziabad',
    'Ludhiana',
    'Agra',
    'Nashik',
    'Faridabad',
    'Meerut',
    'Rajkot',
    'Kalyan-Dombivali',
    'Vasai-Virar',
    'Varanasi',
    'Srinagar',
    'Aurangabad',
    'Dhanbad',
    'Amritsar',
    'Navi Mumbai',
    'Allahabad',
    'Ranchi',
    'Howrah',
    'Jabalpur',
    'Gwalior',
    'Coimbatore',
    'Vijayawada',
    'Jodhpur',
    'Madurai',
    'Raipur',
    'Kota',
    'Chandigarh',
    'Guwahati',
  ];
*/

//Middleware for parsing JSON and URL-encoded data

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
});

// Check for MongoDB connection success
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');
  /* 
    for (let i = 1; i <= 50; i++) {
    const newData = new DataModel({
      sno: i,
      customerName: `Customer ${i}`,
      age: Math.floor(Math.random() * 40) + 20, // Random age between 20 and 59
      phone: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`, // Indian phone number format
      location: indianCities[Math.floor(Math.random() * indianCities.length)], // Random Indian city name
    });

    try {
      await newData.save();
      console.log(`Record ${i} saved successfully`);
    } catch (error) {
      console.error(`Error saving record ${i}:`, error.message);
    }
  }

  console.log('All records created and saved');
  
  */


  // You can now proceed with defining your routes and middleware here
});

app.get('/api/data', async (req, res) => {
    try {
      const records = await DataModel.find();
      res.json(records);
      console.log(records)
    } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
