module.exports = function() {
    var c_task = require("context/task");
    var v_layout = require("view/layout/layout");
    var v_tasklist = require("view/tasklist/tasklist");

    var layout = new v_layout({
        name: "layout",
        el: "body"
    });

    // Generate some test data for app
    var task_collection = new c_task.collection([
        //{"title": "Task 1", "description": "This is task 1"},
        //{"title": "Task 2", "description": "This is task 2"}
    ]);

    // Render app main view
    new v_tasklist({
        name: "tasklist",
        el: layout.$el.find(".main"),
        collection: task_collection
    });
};