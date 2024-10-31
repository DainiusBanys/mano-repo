const express = require("express");
const app = express();
const quotesRouter = express.Router();
app.use(express.json());
let { quotes } = require("./data");
const { getRandomElement } = require("./utils");

let cors = require("cors");

app.use(cors());

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.use("/api/quotes", quotesRouter);

quotesRouter.get("/random", (req, res, next) => {
  const singeQuote = getRandomElement(quotes);
  res.send(JSON.stringify(singeQuote));
});

quotesRouter.get("/", (req, res, next) => {
  res.send(JSON.stringify(quotes));
});

quotesRouter.get("/author", (req, res, next) => {
  const result = quotes.filter((obj) => {
    return obj.person === req.query.person;
  });
  if (result) {
    let sendResult = JSON.stringify(result);
    res.send(sendResult);
  } else {
    res.send("Error, person not found!");
  }
});

quotesRouter.post("/", (req, res, next) => {
  if (req.body !== null) {
    let citata = req.body.quote;
    let autorius = req.body.person;
    let idNum = quotes.length + 1;
    let newObj = { id: idNum, quote: citata, person: autorius };
    quotes.push(newObj);
    res.send({
      quote: req.body.quote,
      person: req.body.person,
    });
  }
});

// Update an quote
quotesRouter.put("/", (req, res, next) => {
  const quoteUpd = quotes.filter((obj) => {
    const ind = req.query.id;
    return obj.id === ind;
  });
  if (quoteUpd) {
    Object.assign(quotes[req.query.id - 1], req.body);
    res.send(quotes[req.query.id - 1]);
  } else {
    res.status(404).send();
  }
});

// Delete a quote
quotesRouter.delete("/:id", (req, res, next) => {
  const index = quotes.findIndex((obj) => obj.id === Number(req.params.id));

  if (index !== -1) {
    quotes = quotes.filter((obj) => {
      return obj.id !== Number(req.params.id);
    });
    res.send(JSON.stringify(index));
  } else {
    res.status(404).send("Wrong Quote ID");
  }
});
