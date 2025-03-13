const express = require("express");
const router = express.Router();
const { index, show, update, patch, destroy, store } = require("../controllers/controller.js");

// index
router.get("/", index);

// show
router.get("/:id", show);

// store
router.post("/", store);

// update
router.put("/:id", update);

// modify
router.patch("/:id", patch);

// delete
router.delete("/:id", destroy);

module.exports = router;