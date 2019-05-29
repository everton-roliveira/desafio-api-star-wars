'use strict';
const repository = require('../repository/planet.repository');
const ValidationContract = require('../validators/fluent-validator');

exports.get = async (request = new Request(), response = new Response(), next) => {
    try {
        let data = await repository.getAll();
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

exports.getAleatory = async (request = new Request(), response = new Response(), next) => {
    try {
        let data = await repository.getAleatory();
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(errorCatch(error));
    }
};

exports.getByName = async (request = new Request(), response = new Response(), next) => {
    try {
        let data = await repository.getByName(request.params.name);
        response.status(200).send(data);
    } catch (error) {
        response.status(500).send(errorCatch(error));
    }
};


exports.post = async (request = new Request(), response = new Response(), next) => {
    let constract = new ValidationContract();
    constract = validate(request.body);

    if (!constract.isValid) {
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

exports.update = async (request = new Request(), response = new Response(), next) => {
    let constract = new ValidationContract();
    constract = validate(request.body);

    if (!constract.isValid) {
        response.status(400).send(constract.errors()).end();
        return;
    }

    try {
        await repository.update(request.params.id, request.body);
        let dataAtualizada = await repository.getById(request.params.id);
        response.status(201).send({
            message: 'Planeta atualizado com sucesso!',
            isSuccess: true,
            data: dataAtualizada
        });
    } catch (e) {
        response.status(500).send(errorCatch(e));
    }
}

exports.delete = async (request = new Request, response = new Response, next) => {
    try {
        await repository.delete(request.params.id);
        response.status(201).send({
            message: 'Planeta deletado com sucesso!',
            isSuccess: true
        })
    } catch (e) {
        response.status(500).send(errorCatch(e));
    }
};

function validate(planet) {
    let constract = new ValidationContract();
    constract.isRequired(planet.name, "O campo Nome é obrigatório");
    constract.isRequired(planet.climate, "O campo Clima é obrigatório");
    constract.isRequired(planet.terrain, "O campo Terreno é obrigatório");
    return constract
}

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