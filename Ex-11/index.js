const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let cards = [];
let nextId = 1;

app.get("/cards", (req, res) => {
  res.json(cards);
});

app.post("/cards", (req, res) => {
  const { suit, value } = req.body || {};
  if (!suit || !value) {
    return res.status(400).json({ error: "Suit and value are required" });
  }

  const newCard = { id: nextId++, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

app.get("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find(c => c.id === cardId);

  if (!card) {
    return res.status(404).json({ error: "Card not found" });
  }
  res.json(card);
});

app.delete("/cards/:id", (req, res) => {
  const cardId = parseInt(req.params.id);
  const cardIndex = cards.findIndex(c => c.id === cardId);

  if (cardIndex === -1) {
    return res.status(404).json({ error: "Card not found" });
  }

  const deletedCard = cards.splice(cardIndex, 1)[0];
  res.json({ message: "Card deleted", card: deletedCard });
});

app.listen(PORT, () => {
  csonsole.log(`Server running at http://localhost:${PORT}`);
});
