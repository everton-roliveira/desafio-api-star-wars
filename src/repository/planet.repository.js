'use strict';
const mongoose = require('mongoose');
const Planet = mongoose.model('Planet');

exports.create = async (data) => {
    let planet = new Planet(data);
    return await planet.save();
};

exports.getAll = async (page) => {
    let perPage = 5;
    let query = {};

    query.skip = size * (pageNo - 1);
    query.limit = size;

    Planet.count({}, (err,totalCount) => {
        P
    })
    let planets = await Planet.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
    const data = {
        current: page,
        planets: planets
    }
    return data;
};

exports.getById = async (id) => {
    return await Planet.findOne({ _id: id });
};

// exports.getByName = async (name) => {
//     return await Planet.findOne({ name: name });
// }

// exports.delete = async (id) => {
//     await Planet.findByIdAndDelete({ _id: id });
// };


// router.get('/products/:page', (req, res, next) => {
//     var perPage = 9 
//     var page = req.params.page || 1

//     Product.find({})
//         .skip((perPage * page) - perPage)
//         .limit(perPage)
//         .exec((err, products) => {
//             Product.count().exec((err, count) => {
//                 if (err) return next(err)
//                 res.render('main/products', {
//                     products: products,
//                     current: page,
//                     pages: Math.ceil(count / perPage)
//                 });
//             });
//         });
// });