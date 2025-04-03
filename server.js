const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware pour lire le JSON
app.use(express.json());

// Charger les données depuis data.json
const loadData = () => {
  const data = fs.readFileSync("data.json");
  return JSON.parse(data);
};

// Sauvegarder les données dans data.json
const saveData = (data) => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

//  Route GET pour récupérer tous les produits
app.get("/products", (req, res) => {
  const data = loadData();
  res.json(data.products);
});

//  Route POST pour ajouter un produit
app.post("/products", (req, res) => {
  const data = loadData();
  const newProduct = req.body;
  newProduct.id = data.products.length + 1; // Générer un nouvel ID
  data.products.push(newProduct);
  saveData(data);
  res.status(201).json(newProduct);
});

//  Route GET pour récupérer toutes les commandes
app.get("/orders", (req, res) => {
  const data = loadData();
  res.json(data.orders);
});

// Route POST pour créer une nouvelle commande
app.post("/orders", (req, res) => {
  const data = loadData();
  const newOrder = req.body;
  newOrder.id = data.orders.length + 1;
  data.orders.push(newOrder);
  saveData(data);
  res.status(201).json(newOrder);
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
