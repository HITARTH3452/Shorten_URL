// const express = require("express")
import express from "express";
// const bodyParser = require("body-parser")
import bodyParser from "body-parser";
// const { nanoid } = require('nanoid');
import { nanoid } from "nanoid";

const app = express();
const port = 3000;

const urlDatabase = {};
app.use(express.json())
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , (req, res) => {
    res.sendFile(__dirname, "./index.html");
})


app.post('/shorten' , (req,res) => {
    console.log('start')
   try {
     const longURL = req.body.longURL;
     console.log(longURL)
 
     if(!isValid(longURL)){
         res.status(400).send("URL is Invalid")
     }
 
     const shortUrl = generateShortUrl(longURL);
 
     urlDatabase[shortUrl] = longURL;
 
     res.status(200).send(`Yor shortend url :- https://localhost:${port}/${shortUrl}`);
   } catch (error) {
    console.log(error);
   }
})

app.get(":/shortUrl" , (req,res) => {
    const shortUrl = req.params.shortUrl;
    const longURL = urlDatabase[shortUrl];

    if(longURL) {
        res.redirect(longURL);
    }else{
        res.status(400).send("Url not found")
    }
})

app.listen(port, () => {console.log("Server is runing at 3000")});

function generateShortUrl() {
    return nanoid(8)
}

function isValid(url){
    try{
        new URL(url);
        return true;
    }
    catch(err){
        return false;
    }
}