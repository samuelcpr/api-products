import { Router, request, response } from "express";
import {v4 as uuid} from "uuid"; 
import {autenticador} from "./middleware"

const router = Router();

interface ProductosDTO {
    nome: string;
    descricao: string;
    preco: number;
    id: string;
}

const produtos: ProductosDTO [] = [];

router.get("/produtos/findByName", (request, response) => {
    const {nome} = request.query;
    const produto = produtos.filter((p)=> p.nome.includes(String(nome)));
    return response.json(produto);
});

router.get("/produtos/:id", (request, response)=> {
    const {id} = request.params;
    const produto = produtos.filter((produto) => produto.id ==id);
    return response.json(produto);
});

router.post("/produtos", autenticador, (request, response)=> {
    const {nome, descricao, preco} = request.body;
    const produtoExistente = produtos.find(
        (produto)=> produto.nome == nome
    );

    if (produtoExistente) {
        return response.status(400).json({message: "produto já existe!"})
    }

    const produto: ProductosDTO = {
        descricao,
        nome,
        preco,
        id: uuid()
    };

    produtos.push(produto);

    return response.json(produto);
});

router.put("/produtos/:id", autenticador, (request, response) => {
    const {id} = request.params;
    const {nome, descricao, preco} = request.body;

    const produtoIndex = produtos.findIndex((produto) => produto.id == id);

    if (produtoIndex == -1) {
        return response.status(400).json({message: "produto não existe"})
    }

    const produto: ProductosDTO = Object.assign({
        nome,
        descricao,
        preco
    });

    produtos[produtoIndex] = produto;

    return response.json(produto)
});

export{router}
