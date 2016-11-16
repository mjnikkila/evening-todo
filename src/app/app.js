module.exports = function() {
    var c_task = require("context/task");
    var v_layout = require("view/layout/layout");
    var v_tasklist = require("view/tasklist/tasklist");

    /*
     * Initialize default empty task collection
     */
    var task_collection = new c_task.collection();
    Evening.repositoryAdd(task_collection, "tasks");

    new v_layout({
        name: "layout",
        el: "body"
    });

    // Render app main view
    new v_tasklist({
        name: "tasklist",
        el: Evening.repositoryGet("view", "layout").$el.find(".main"),
        collection: task_collection
    });

    /*
     * Implement local storage capabilities
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#persistence
     *
     * We differ a bit from the guidelines since I see that Lockr is better library to use
     * with evening models since it can store objects too
     */
    var Lockr = require("lockr");

    // Bootstrap tasks collection with saved data if any
    task_collection.set(Lockr.get("todos-evening"));

    // Set event handler for collection changes to automatically save tasks
    task_collection.on("add remove change", function(e){
        var models = [];
        _.each(e.collection.models, function(model){
            models.push(model.attributes);
        });
        Lockr.set("todos-evening", models);
    });

    /*
     * Initialize Evening router
     */
    var router = new Evening.Router({
        routes: {
            "*filter": function(type) {
                var view = Evening.repositoryGet("view", "tasklist");
                view.filter(type);

                // Handle filter buttons
                var layout = Evening.repositoryGet("view", "layout");
                layout.$(".filters a").removeClass("selected");

                if(type != null) {
                    layout.$("#btn_filter_"+type).addClass("selected");
                } else {
                    layout.$("#btn_filter_all").addClass("selected");
                }
            }
        }
    });

    // Start routing
    router.start();
};