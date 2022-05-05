const express = require('express');
const { appendFile } = require('fs');
const mongoose = require('mongoose');
const verigonder = require('./models/verigonder');
const vericek  = require('./models/vericek');
const server = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { Script } = require('vm');






const dburl = '';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {console.log("bağlantı kuruldu")})
  .catch((err) => {console.log(err)});

server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));



server.post('/add', (req, res) => {
    const vergon = new verigonder(req.body);
    vergon.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);    
        });
});


server.post('/up', (req, res) => {
    const ibanup = new vericek(req.body);
    ibanup.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
});

server.get('/back', (req, res) => {

    vericek.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
    
});


server.get('/remove', (req, res) => {
    verigonder.remove({})
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });
});


server.get('/full', (req, res) => {

    verigonder.find({})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.send(err);
        });
    
});



server.listen(process.env.PORT || 5000, () => {
    console.log('Server is running on port 5000');
});



