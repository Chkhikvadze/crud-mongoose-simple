/**
 * Created by giga on 7/10/12.
 */

var that = this;

module.exports.response = function (status, message, data) {
    var res = {};
    res.status = status;
    if (message) res.message = message;
    res.data = data || {};

    return res;
};

module.exports.success = function (data) {
    return that.response(200, "", data);
};

module.exports.error = function (status) {
    return that.response(500, "Oops something went wrong");
};

module.exports.not_found = function () {
    return that.response(404, "Not Found");
};

module.exports.not_authorized = function () {
    return that.response(401, "Not Authorized");
};

module.exports.forbidden = function () {
    return that.response(403, "Forbidden");
};

module.exports.conflict = function (message) {
    return that.response(409, message);
};

module.exports.bad_request = function (message) {
    return that.response(400, message);
};