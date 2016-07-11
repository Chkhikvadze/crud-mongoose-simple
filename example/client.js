/**
 * Created by giga on 7/11/16.
 */
function getPersonList(){

    var query = { where : {}, select : {},  skip: 10, limit: 20 };

    query.where= {
        occupation: /host/,
        'name.last': 'Ghost',
        age: { $gt: 17, $lt: 66 },
        likes: { $in: ['vaporizing', 'talking'] }
    };

    query.select('name occupation');

    query.sort('-occupation');

    //
    $.get('http://localhost:3000/api/person/list', query, function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}