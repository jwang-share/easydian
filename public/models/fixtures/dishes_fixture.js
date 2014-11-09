/**
 * This is fixture for test without Dishes Restful API.
 */
Apps.DishesData = {};

can.fixture('GET /dishes', function () {
    return [
        {'_id': can.fixture.rand(10000000, 999999), 'cooker': 'Miss Zhang', 'header': 'Excellent', 'description': 'Description', 'style': 'western-style', 'link': 'www.edian.com', 'name': 'Ken De Ji2', 'alt': 'XXXXXX', 'img': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'cooker': 'Miss Wang',  'header': 'Excellent', 'description': 'Description', 'style': 'western-style', 'link': 'www.edian.com', 'name': 'Ken De Ji1', 'alt': 'YYYYYYYY', 'img': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'cooker': 'Miss Gao',   'header': 'Excellent', 'description': 'Description', 'style': 'western-style', 'link': 'www.edian.com', 'name': 'Ken De Ji2', 'alt': 'ZZZZZZZ', 'img': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'}
    ];
});

can.fixture('GET /dishes/ads', function () {
    return [
        {'link': 'www.edian.com', 'shoplogo': '/images/slider/' + can.fixture.rand(1, 3) + '.jpg'},
        {'link': 'www.edian.com', 'shoplogo': '/images/slider/' + can.fixture.rand(1, 3) + '.jpg'},
        {'link': 'www.edian.com', 'shoplogo': '/images/slider/' + can.fixture.rand(1, 3) + '.jpg'}
    ];
});

can.fixture('GET /dishes/promotion', function () {
    return [
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'chinese-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'chinese-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'},
        {'_id': can.fixture.rand(10000000, 999999), 'description': 'Description', 'style': 'western-style', 'shopwebsite': 'www.edian.com', 'shopname': 'Ken De Ji', 'shoplogo': '/images/portfolio/' + can.fixture.rand(1, 9) + '.jpg'}
    ];
});

can.fixture('GET /dishes/{id}', function () {
    return {'_id': can.fixture.rand(10000000, 999999), 'shopbadt': [90, 70, 80, 90, 100, 110, 120], 'shopgoodt': [15, 25, 35, 45, 55, 65, 75]};
});

can.fixture('POST /dishes', function () {
    return true;
});

can.fixture('PUT /dishes/{id}', function () {
    return true;
});

can.fixture('DELETE /dishes/{id}', function () {
    return true;
});

can.fixture('GET /canyin/shop/{id}/comments', function () {
    return [
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site, has inline comments I like this site, has inline comments I like this site, has inline comments I like this site, has inline comments I like this site, has inline comments I like this site, has inline comments', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Tom Sawyer', 'comment': 'I like this site, has inline comments', 'createtime': '25 Apr 2013'},
        {'_id': can.fixture.rand(10000000, 999999), 'username': 'Adam White', 'comment': 'I like this site', 'createtime': '25 Apr 2013'}
    ];
});

can.fixture('GET /canyin/shop/{id}/comment', function () {
    return {'_id': 22222, 'username': 'Guest', 'comment': 'I like this site', 'createtime': '25 Apr 2013'};
});
