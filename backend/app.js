const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const thumbsupply = require('thumbsupply');

const app = express();
app.use(cors());

const { MongoClient } = require('mongodb');

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://chirpadmin:chirpadmin@cluster0.cjetq.mongodb.net/test";
    const client = new MongoClient(uri, {useUnifiedTopology: true});
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate DB calls
        await  listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.get('/video', (req, res) => {
    res.sendFile('assets/sample.mp4', { root: __dirname });
});

app.get('/videos', (req, res) => res.json(videos));

app.get('/video/:id/data', (req, res) => {
    const id = parseInt(req.params.id, 10);
    res.json(videos[id]);
});

app.get('/video/:id', (req, res) => {
    const path = `assets/${req.params.id}.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

app.get('/video/:id/poster', (req, res) => {
    thumbsupply.generateThumbnail(`assets/${req.params.id}.mp4`)
    .then(thumb => res.sendFile(thumb));
});

app.listen(3000, () => {
    console.log('Listening on port 3000!')
});