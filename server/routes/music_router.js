const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "songs";`;
    pool.query(queryText).then( (result) => {     
        // console.log('We have results!', result);
        res.send(result.rows);
    }).catch( (error) => {
        console.log( 'Error making query:', error );
        res.sendStatus(500);
    });
});

router.post('/', (req, res) => {
    console.log("HELLO FROM THE POST", req.body);
    const newSong = req.body;
    const queryText = `INSERT INTO "songs" ("artist", "track", "rank", "published")
    VALUES ('${newSong.artist}', '${newSong.track}', ${newSong.rank}, '${newSong.published}');`;
    pool.query(queryText).then( (result) => {
        console.log('Post result:', result);
        res.sendStatus(201);
    }).catch( (error) => {
        console.log( 'Error making query:', error );
        res.sendStatus(500);
    });
});

module.exports = router;