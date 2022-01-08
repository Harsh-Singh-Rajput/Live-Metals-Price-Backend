//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const ejs = require("ejs");
const cors = require('cors');
const env = require("dotenv").config();
const { get } = require("express/lib/request");
const app = express();

app.use(cors({
    origin:'*'
}));



app.use(express.json());



app.post("/getPrice", async function(req, res){
    console.log("In server 2");
    console.log(req.body);
    // data = res.json(req.body);
    // console.log('data ',data);
    const data = await getLivePrice(req.body.input);
    console.log(data);
    res.send(data);
})


// API call for getting live Metals Price 
 function getLivePrice(input){
    let Au = "XAU_1K,XAU_2K,XAU_3K,XAU_4K,XAU_5K,XAU_6K,XAU_7K,XAU_8K,XAU_9K,XAU_10K,XAU_11K,XAU_12K,XAU_13K,XAU_14K,XAU_15K,XAU_16K,XAU_17K,XAU_18K,XAU_19K,XAU_20K,XAU_21K,XAU_22K,XAU_23K,XAU_24K, " 
    let baseURL = 'https://live-metal-prices.p.rapidapi.com/v1/latest/'
    var options = {
      method: 'GET',
      url:  baseURL + Au + ',XAG,PL,PA,INR,USD,EUR,' + input + '/USD/gram',
      headers: {
        'x-rapidapi-host': 'live-metal-prices.p.rapidapi.com',
        'x-rapidapi-key': process.env.API_KEY
      }
    };
    
    const result =  axios.request(options).then( function (response) {
        // console.log(response.data.rates);
        const price =   response.data.rates;
        return price;

    }).catch(function (error) {
        console.error(error);
    });
    
    return result;

}










app.listen( process.env.Port || 5000, function(req, res){
    console.log("Running Server on Port 5000");
})