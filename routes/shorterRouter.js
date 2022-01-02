var express = require('express');
var router = express.Router();
const shortid = require('shortid');
const admin = require('../firebase')
const database = admin.database();

router.get('/', function (req, res, next) {
    let id = shortid.generate()
    let query = database.ref('/links/').orderByChild('original').equalTo(req.query.link);
    let link = req.query.link.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
    if (req.query.link != undefined && link != null) {
        query.once('value', function (val) {
            if (val.exists()) {
                res.json({
                    response: [val.val()]
                })
            } else {
                database.ref('/links/' + id)
                    .set({
                        original: req.query.link,
                        shorturl: `https://${req.headers.host}/${id}`
                    })
                res.json({
                    original: req.query.link,
                    shorturl: `https://${req.headers.host}/${id}`
                })
            }
        })
    } else {
        res.send('?link=giveCorrectLink')
    }

});

router.get('/:name', function (req, res, next) {
    database.ref('/links/' + req.params.name).on('value', data => {
        res.redirect(data.val().original)
    })

});

module.exports = router;