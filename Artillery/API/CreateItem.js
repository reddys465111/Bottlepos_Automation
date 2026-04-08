const { faker } = require('@faker-js/faker');
const querystring = require('querystring');

function createItem(context, events, done) {

    try {
        const randomPrice = faker.number.float({
            min: 5,
            max: 500,
            multipleOf: 0.01
        });
        const randomQty = faker.number.int({ min: 1, max: 1 });
        const randomName = faker.commerce.productName();
        const randomCode = faker.number.int({ min: 1000000000, max: 9999999999 }).toString();

        const item = {
            qty: randomQty,
            unitspercase: "1",
            name: "Artillery-" + randomName,
            taxid: "1",
            cost: (randomPrice - 10).toFixed(2),
            price: randomPrice.toFixed(2),
            type: "general",
            categoryid: "101",
            description: "Test item",
            itemtype: "inventoryitem",
            reorder_value: "1",
            reorder_point: "1",
            showtoweb: 1,
            color_code: "#ac725e",
            itemviewonprompt: true,
            codes: [
                {
                    code: randomCode,
                    locationid: "1",
                    amount: "1",
                    upcfull: "0"
                }
            ]
        };

        context.vars.itemString = querystring.stringify({
            data: JSON.stringify(item)

        });
        return done();

    } catch (err) {
        console.log(" Item creation failed:", err.message);
        return done();
    }
}

function validateCreateItem(requestParams, response, context, ee, next) {
    try {
        const body = typeof response.body === 'string'
            ? JSON.parse(response.body)
            : response.body;

        if (!body?.data?.code) {
            console.log(" CREATE ITEM FAILED: 'code' not found");
            ee.emit('error', new Error('Create Item Failed'));
            return next();
        }
        console.log(" ITEM CREATED:", body.data.code);
    } catch (err) {
        console.log(" INVALID JSON RESPONSE");
        ee.emit('error', new Error('Invalid JSON response'));
        return next();
    }

    return next();
}
module.exports = {
    createItem,
    validateCreateItem
};