const express = require("express");
const req = require("express/lib/request");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const port = process.env.PORT || 3000;

const pokedex = [
  {
    id: 1,
    numero: "001",
    nome: "Bulbasaur",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    descricao:
      "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    tipo: "Grass",
    altura: "0.7 m",
    peso: "6.9 kg",
    categoria: "Seed",
    habilidade: "Overgrow",
  },
  {
    id: 2,
    numero: "004",
    nome: "Charmander",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png",
    descricao:
      "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    tipo: "Fire",
    altura: "0.6 m",
    peso: "8.5 kg",
    categoria: "Lizard",
    habilidade: "Blaze",
  },
  {
    id: 3,
    numero: "007",
    nome: "Squirtle",
    imagem: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png",
    descricao:
      "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    tipo: "Water",
    altura: "0.5 m",
    peso: "9.0 kg",
    categoria: "Tiny Turtle",
    habilidade: "Torrent",
  },
];

let pokemon = undefined;
let message = "";

//Rotas do projeto
app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);

  res.render("index", { pokedex, pokemon, message });
});

app.post("/create", (req, res) => {
  const pokemon = req.body;
  pokemon.id = pokedex.length + 1;
  pokedex.push(pokemon);
  message = "O cadastro do seu pokemon foi realizado com sucesso!"
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  pokemon = pokedex.find((pokemon) => pokemon.id === id);
  res.redirect("/#cadastro");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newPokemon = req.body;
  newPokemon.id = id + 1;
  pokedex[id] = newPokemon;
  pokemon = undefined;
  message = "O cadastro do seu pokemon foi atualizado com sucesso!"
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete pokedex[id];
  message = "O seu pokemon foi deletado com sucesso!"
  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log("Servidor rodando em http://localhost:3000")
);
