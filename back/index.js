const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://senac:senha@clusteraula.m9hh2oa.mongodb.net/?retryWrites=true&w=majority";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(bodyParser.json());
app.use(cors());


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db('Pizzaria');

async function insere1elemento(usuario, senha) {
    const registrados = db.collection("pizzas");
    const newReg = { usuario: usuario, senha: senha };
    const result = await registrados.insertOne(newReg);
    //console.log(`A pizza inserida foi a: ${result.insertedId}`);
    console.log(`O usuário registrado foi: ${result.insertedId}`);
}

async function insereNelemento() {
    const pizzas = db.collection("pizzas");
    const documents = [
        { nome: "3 Queijos", qtdPedacos: "8" },
        { nome: "Baiana", qtdPedacos: "8" },
        { nome: "Frango Catupiri", qtdPedacos: "8" },
        { nome: "Calabresa", qtdPedacos: "8" },
        { nome: "Hawaiana", qtdPedacos: "8" },
        { nome: "Strognoff", qtdPedacos: "8" },
    ];
    const result = await pizzas.insertMany(documents);
    let ids = result.insertedIds;
    for (let id of Object.values(ids)) {
        console.log(`A pizza inserida foi a: ${id}`);
    }
}

async function selecionarValores() {
    const pizzas = await db.collection('pizzas').find();
    for await (let pizza of pizzas) {
        console.log(pizza);
    }

}

async function editarValor(usuario, senha) {
    const pizzas = db.collection("pizzas");
    const filtro = { usuario: usuario };
    const update = { "$set": { senha: senha } };
    await pizzas.updateOne(filtro, update);
    //selecionarValores();
}

async function deleteValor(usuario) {
    const registrados = db.collection("pizzas");
    //const pizza = await pizzas.findOne(); exclui a primeira da lista
    //pizzas.deleteOne(pizza);
    registrados.findOneAndDelete({ usuario: usuario })
    //selecionarValores();
}

app.post("/usuarios", (req, res) => {
    const { usuario, senha } = req.body;
    insere1elemento(usuario, senha);
    res.json("Inserido!")
});

app.delete("/usuarios", (req, res) => {
    const { usuario } = req.body;
    deleteValor(usuario);
    res.json("Deletado!")
});

app.put("/usuarios", (req, res) => {
    const { usuario, senha } = req.body;
    editarValor(usuario, senha);
    res.json("Editado!")
});

app.listen(3001, () => {
    console.log("Servidor online na porta 3001");
});