const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5001
require("dotenv").config()
const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send("personal portfolio is running")
})

app.listen(port , () => {
    console.log(`server running at port ${port}`)
})


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.feigjta.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        const allData = client.db("allData").collection("data");
        
        app.get('/data', async(req, res) => {
            const query = {}
            const result = await allData.find(query).toArray()
            res.send(result)
            console.log(result)
            
        })
            
        app.get('/data/:id' , async(req, res) => {
            const id = req.params.id
            const query = {
                _id: ObjectId(id)
            }
            const result = allData.findOne(query)
            res.send(result)
        })
    }

    finally{
    
       

    }
}

run().catch(console.log)
