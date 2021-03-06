/**
 * Created by giga on 7/11/16.
 */
function getPersonList(){


    var query = { where : {},  skip: 10, limit: 20 };

    query.where= {
        'occupation': { "$regex": "host", "$options": "i" },
        'name.last': 'Ghost',
        'age': { $gt: 17, $lt: 66 },
        'likes': { $in: ['vaporizing', 'talking'] }
    };

    query.select = 'name occupation';

    query.sort = '-occupation';

    $.get('http://localhost:3000/api/person/list', query, function(result, status){
		console.log(result);
    });
}



function getPersonListByPagination(){

    var query = { where : {}, page : 2, pageSize : 25};

    query.select = 'name occupation';

    query.sort = '-occupation';

    $.get('http://localhost:3000/api/person/list', query, function(result, status){
		console.log(result);
    });
}

