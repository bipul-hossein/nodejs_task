const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(cors())
app.use (express.json())



const uri = `mongodb+srv://nodejs_task:N2M2sd4TQzo03bvK@cluster0.jvivwjj.mongodb.net/?retryWrites=true&w=majority`

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const UserCollection = client.db("nodejs_task").collection("students_details");

        app.get('/students', async (req, res) => {
            const query = {}
            const cursor = UserCollection.find(query);
            const students = await cursor.toArray();
            res.send(students);

        })

        app.post('/student', async (req, res) => {
            const student = req.body
           const result = await UserCollection.insertOne(student);
            console.log(student);
            res.send(student)
          })
          
          app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) }
            const result = await UserCollection.deleteOne(query)
            console.log(result);
            res.send(result)
          })
          app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
          const query = { _id: ObjectId(id) }
            const result = await UserCollection.findOne(query)
            console.log(result);
            res.send(result) 
          })

    } finally { }
}
run().catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log('Example app listening on port', port);
});
