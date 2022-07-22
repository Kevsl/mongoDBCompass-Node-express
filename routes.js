const express = require("express");
const Joi = require("@hapi/joi");
const { insertItem, getItems, updateQuantity } = require("./db");

const router = express.Router();

const itemSchema = Joi.object().keys({
  name: Joi.string(),
  quantity: Joi.number().integer().min(0),
});

router.post("/item", (req, res) => {
  const item = req.body;
  console.log(req.body);
  const result = itemSchema.validate(item);
  if (result.error) {
    console.log(result.error);
    res.status(400).end();
    return;
  }
  insertItem(item)
    .then(() => {
      res.status(200).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end();
    });
});

module.exports = router;