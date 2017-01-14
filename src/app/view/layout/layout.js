var _template = require("./layout.html");
var c_task = require("context/task");

module.exports = Evening.View.extend({
    viewTemplate: _template,

    construct: function() {
        this.handle_no_todo();
        this.handle_item_count();
    },

    post_render: function() {
        // Require and import stylesheets
        require("../../../../node_modules/todomvc-common/base.css");
        require("../../../../node_modules/todomvc-app-css/index.css");
    },

    events: {
        "keyup .new-todo": "add_new_todo",
        "click .clear-completed": "clear_completed"
    },

    /**
     * Handle collection changes affecting to layout
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#no-todos
     */
    handle_no_todo: function() {
        var collection = Evening.repository.get("collection", "tasks");
        this.listenTo(collection, "add", function(){
            if(collection.length == 0) {
                this.$(".main").hide();
                this.$(".footer").hide();
            } else {
                this.$(".main").show();
                this.$(".footer").show();
            }
        }.bind(this));

        // Manually trigger add event on first run
        collection.trigger("add");
    },

    // Handle adding new todo item
    // @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#new-todo
    add_new_todo: function(ev){
        if(ev.keyCode == 13) {
            var name = $(ev.currentTarget).val().trim();
            if(name.length == 0) return;

            var task = new c_task.model({
                title: name
            });

            Evening.repository.get("collection", "tasks").push(task);

            $(ev.currentTarget).val("");
        }
    },

    handle_item_count: function() {
        var collection = Evening.repository.get("collection", "tasks");
        this.listenTo(collection, "add remove change reset", function(){
            var count = collection.where({completed: false}).length;
            var item_count_html = "<strong>"+count+"</strong> item left";
            if(count > 1) {
                item_count_html = "<strong>"+count+"</strong> items left";
            }
            this.$(".todo-count").html(item_count_html);

            var count = collection.where({completed: true}).length;
            if(count > 0) {
                this.$(".clear-completed").show();
            } else {
                this.$(".clear-completed").hide();
            }
        });
    },

    clear_completed: function() {
        var collection = Evening.repository.get("collection", "tasks");
        var completed = collection.where({completed: true});
        _.each(completed, function(task){
            task.destroy();
        });
    }
});