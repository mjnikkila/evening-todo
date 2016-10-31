define(function(){
    var model = Evening.Model.extend({
        defaults: {
            title: "",
            description: "",
            completed: false
        }
    });

    var collection = Evening.Collection.extend({
        model: model
    });

    return {
        model: model,
        collection: collection
    };
});