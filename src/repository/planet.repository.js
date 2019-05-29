'use strict';
const mongoose = require('mongoose');
const Planet = mongoose.model('Planet');

exports.create = async (data) => {
    let planet = new Planet(data);
    return await planet.save();
};

exports.update = async (id, data) => {
    return await Planet.findByIdAndUpdate(id, {
        $set: {
            name: data.name,
            climate: data.climate,
            terrain: data.terrain
        }
    });
};

exports.getAll = async () => {
    return await Planet.find();
};

exports.getById = async (id) => {
    return await Planet.findOne({ _id: id });
};

exports.getAleatory = async () => {
    let resultCount = await Planet.countDocuments();
    let rand = await Math.floor(Math.random() * resultCount);
    return await Planet.findOne().limit(-1).skip(rand);
};

exports.getByName = async (name) => {
    return await Planet.find({ name: { '$regex': `${name}`, '$options': 'i' } })
}

exports.delete = async (id) => {
    await Planet.findByIdAndDelete({ _id: id });
};
