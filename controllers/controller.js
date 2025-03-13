const arrayPosts = require("../data/data.js");
const connection = require("../data/db.js");

// index
function index(req, res) {
    // let filteredPosts = arrayPosts;

    // if (req.query.tags) {
    //     filteredPosts = arrayPosts.filter(element => element.tags.includes(req.query.tags))
    // };

    // res.json(filteredPosts)
    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: 'Database query error'
        })
        res.json(results)
    })
}

// show
function show(req, res) {
    // const id = parseInt(req.params.id)
    // const post = arrayPosts.find(post => post.id === id);

    // if (!post) {

    //     res.status(404);

    //     return res.json({
    //         status: 404,
    //         error: "Not Found",
    //         message: "Post non trovato"
    //     })
    // }
    // res.json(post);

    const { id } = req.params

    const sql = 'SELECT * FROM posts WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({
            error: 'Database error'
        })
        if (results.length === 0) return res.status(404).json({
            status: 404,
            error: 'Not Found',
            message: 'Pizza non trovata'
        })
        res.json(results[0])
    })
}

// store
function store(req, res) {
    const newId = arrayPosts[arrayPosts.length - 1].id + 1;

    const nuovaRicetta = {
        id: newId,
        titolo: req.body.titolo,
        contenuto: req.body.contenuto,
        image: req.body.image,
        tags: req.body.tags
    };
    arrayPosts.push(nuovaRicetta)
    console.log(arrayPosts)

    res.status(201);
    res.json(nuovaRicetta)
}

// update
function update(req, res) {
    const id = parseInt(req.params.id);
    const post = arrayPosts.find(element => element.id === id);

    if (!post) {
        res.status(404);

        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }


    post.titolo = req.body.titolo;
    post.contenuto = req.body.contenuto;
    post.image = req.body.image;
    post.tags = req.body.tags;

    console.log(arrayPosts)
    res.json(post)
}

function patch(req, res) {
    res.send("Modifica parziale del Post" + req.params.id)
}


function destroy(req, res) {
    // const id = parseInt(req.params.id);
    // const post = arrayPosts.find(element => element.id === id);

    // if (!post) {
    //     res.status(404);

    //     return res.json({
    //         status: 404,
    //         error: "Not Found",
    //         message: "Post non trovato"
    //     })

    const { id } = req.params;

    const sql = 'DELETE FROM posts WHERE id = ?'

    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({
            error: 'Database query error'
        })
        res.sendStatus(204)
    })

    // arrayPosts.splice(arrayPosts.indexOf(post))

    // res.sendStatus(204)
}






module.exports = { index, show, update, patch, destroy, store }