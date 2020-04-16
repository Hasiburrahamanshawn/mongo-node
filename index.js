const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const users =["Rana", "Kamal", "Jamal", "Asha", "Moushumi", "Akash"];

const app = express();
app.use(cors());
app.use(bodyParser.json());


const uri = process.env.DB_PATH;
let client = new MongoClient(uri, { useNewUrlParser: true });


app.get('/products', (req, res)=>{
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        console.log("Database connected...");
        collection.find().toArray((err, documents) =>{
            if(err){
                console.log(err);
            }
            else{
                res.send(documents);
            }
            
        })
        client.close();
      });
    
});


app.get('/users/:id', (req, res) =>{
    const id = req.params.id;
    const name = users[id];
    res.send({name, id});
    
});

//post
app.post('/addProduct', (req, res) =>{
    //save to database
    const product = req.body;
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // perform actions on the collection object
        console.log("Database connected...");
        collection.insertOne(product, (err, result) =>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result.ops[0]);
            }
            
        })
        client.close();
      });
      
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening to port 3000'));