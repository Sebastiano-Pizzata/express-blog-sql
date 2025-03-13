const express = require('express');
const app = express();
const port = 2000;
const cors = require('cors');

const errorsHandler = require("./middlewares/errorsHandler.js")
const errorNotFound = require("./middlewares/errorNotFound.js")
const postsRouter = require("./routers/posts.js")

app.use(cors({
    origin: 'http://localhost:5173'
})
);

app.use(express.json());

app.use(errorsHandler);



app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("Server del mio Blog")
})

app.use("/posts", postsRouter);

app.use(errorNotFound);

app.listen(port, () => {
    console.log(`server ${port}`)
})