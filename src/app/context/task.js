var model = Evening.Model.extend({
    defaults: {
        title: "",
        description: "",
        completed: false,
        visible: true
    }
});

var collection = Evening.Collection.extend({
    model: model
});

/**
 * @module context/task
 */
module.exports = {
    model: model,
    collection: collection
};