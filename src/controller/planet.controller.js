'use strict';
const repository = require('../repository/planet.repository');
const ValidationContract = require('../validators/fluent-validator');

exports.get = async (request = new Request(), response = new Response(), next) => {
    console.log(request.params)
    if(request.params.id) {
        console.log("ID: ");
    } else if (request.params.page) {
        console.log("PAGE: ");
    } else if (request.params.name) {
        console.log("NAME: ");
    }
    try {
        let data = await repository.getAll(request.params.page || 1);
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(errorCatch(error));
    }
};

exports.getById = async (request = new Request(), response = new Response(), next) => {
    try {
        let data = await repository.getById(request.params.id);
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(errorCatch(error));
    }
};

exports.getByName = async (request = new Request(), response = new Response(), next) => {
    try {
        let data = repository.getByName(request.params.name);
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(errorCatch(error));
    }
};

exports.post = async (request = new Request(), response = new Response(), next) => {
    let constract = new ValidationContract();
    constract.isRequired(request.body.name, "O campo Nome é obrigatório");
    constract.isRequired(request.body.climate, "O campo Clima é obrigatório");
    constract.isRequired(request.body.terrain, "O campo Terreno é obrigatório");

    if (!constract.isValid()) {
        response.status(400).send(constract.errors()).end();
        return;
    }

    try {
        let data = await repository.create(request.body);
        response.status(201).send({
            message: 'Planeta inserido com sucesso!',
            isSuccess: true,
            data: data
        });

    } catch (e) {
        response.status(500).send(errorCatch(e));
    };
}

// exports.delete = async (request = new Request, response = new Response, next) => {
//     try {
//         await repository.delete(request.params.id);
//         response.status(201).send({
//             message: 'Planeta deletado com sucesso!'
//         })
//     } catch (e) {
//         response.status(500).send(errorCatch(e));
//     }
// };

function errorCatch(error) {
    let response = {
        message: 'Falha ao processar a requisição',
        isSuccess: false,
        data: error
    }
    if (error.code === 11000)
        response.message = 'Já existe um registro com o mesmo nome';

    return response;

}