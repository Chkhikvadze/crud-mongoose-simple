/**
 * Created by giga on 7/10/12.
 */

'use strict';

var response = require('./response.js');
var debug = require('debug')('crud-mongoose-debug');

module.exports = function (options) {
    return {
        list: function (req, res) {
            var query = options.model.find();

            if (req.params.skip && !isNaN(req.params.skip)) {
                query.skip(req.params.skip);
            }

            if (req.params.limit && !isNaN(req.params.limit)) {
                query.limit(req.params.limit);
            }

            if (req.params.limit && !isNaN(req.params.limit)) {
                query.limit(req.params.limit);
            }

            if (req.query.where) {
                var where = JSON.parse(req.query.where);

                query.where(where)
            }


            query.exec(function (err, items) {
                if (err) {
                    debug(err);
                    return res.status(500).json(response.error());
                }

                return res.status(200).json(response.success(items));
            });
        },

        create: function (req, res) {
            var item = new options.model(req.body);
            // assign files
            for (var key in req.files) {
                item[key] = req.files[key].name; // temp
            }
            item.save(function (err, item) {
                if (err) {
                    debug(err);
                    return res.status(400).json(response.bad_request(err.errors));
                }

                return res.status(200).json(response.success(item));
            });
        },

        read: function (req, res) {
            options.model.findById(req.params.id, function (err, item) {
                if (err) {
                    debug(err);
                    return res.status(500).json(response.error());
                }

                if (!item) {
                    return res.status(404).json(response.not_found());
                }

                return res.status(200).json(response.success(item));
            });
        },

        update: function (req, res) {
            options.model.findById(req.params.id, function (err, item) {
                if (err) {
                    debug(err);
                    return res.status(500).json(response.error());
                }

                if (!item) {
                    return res.status(404).json(response.not_found());
                }

                item.set(req.body);

                // assign files
                for (var key in req.files) {
                    item[key] = req.files[key].name; // temp
                }
                item.save(function (err, item) {
                    if (err) {
                        debug(err);
                        // TODO strip unnecassary fields from error
                        return res.status(400).json(response.bad_request(err.errors));
                    }

                    return res.status(200).json(response.success(item));
                });
            });
        },

        delete: function (req, res) {
            options.Model.findById(req.params.id, function (err, item) {
                if (err) {
                    debug(err);
                    return res.status(500).json(response.error());
                }

                if (!item) {
                    return res.status(404).json(response.not_found());
                }

                item.remove(function (err) {
                    if (err) {
                        debug(err);
                        // TODO strip unnecassary fields
                        return res.status(400).json(response.bad_request(err.errors));
                    }

                    return res.status(200).json(response.success());
                });
            });
        }
    };
};