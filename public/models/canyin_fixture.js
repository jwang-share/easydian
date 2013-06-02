/**
 * This is fixture for test without Canyin Restful API.
 */
Apps.canyinData = {};
Apps.canyinData.time = 0;

Apps.canyinData.test = {
    "name" : 'Canyin Fake Data',
    "global" : {

    },
    'load' : {
    }
};

var random = function(min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
};

can.fixture('GET /canyin/shops', function() {
    return Apps.canyinData.test;
});

can.fixture('GET /canyin/shop/{id}', function() {
    return Apps.canyinData.test;
});

can.fixture('POST /canyin/shop', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}', function() {
    return 'OK';
});

can.fixture('DELETE /canyin/shop/{id}', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}/visit', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}/bad', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}/good', function() {
    return 'OK';
});

can.fixture('GET /canyin/shop/{id}/comments', function() {
    return 'OK';
});

can.fixture('PUT /canyin/shop/{id}/comment', function() {
    return 'OK';
});

can.fixture('POST /canyin/shop/{id}/comment', function() {
    return 'OK';
});

can.fixture('DELETE /canyin/shop/{id}/comment', function() {
    return 'OK';
});

can.fixture('GET /canyin/shop/{id}/news', function() {
    return Apps.canyinData.test;
});
