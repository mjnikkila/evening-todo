/**
 * Implements logic for layout
 * @module view/layout/layout
 */
module.exports = Evening.View.extend({

    /**
     * @see {@link https://eveningjs.org/doc.html#gs_hello_world}
     */
    viewTemplate: require("./layout.html"),

    /**
     * Layout constructor
     * @see {@link https://eveningjs.org/doc.html#evening_view}
     */
    construct: function() {
        this._handle_no_todo();
        this._handle_item_count();
    },

    /**
     * Require and import stylesheets after a view has completed rendering
     * @see {@link https://eveningjs.org/doc.html#evening_view}
     */
    post_render: function() {
        require("../../../../node_modules/todomvc-common/base.css");
        require("../../../../node_modules/todomvc-app-css/index.css");
    },

    /**
     * Backbone.js events
     * @see {@link http://backbonejs.org/#View-events}
     */
    events: {
        "keyup .new-todo": "_add_new_todo",
        "click .clear-completed": "_clear_completed"
    },

    /**
     * Add a new todo item on enter key press when .new-todo has a focus
     * @private
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#new-todo
     */
    _add_new_todo: function(ev){
        var c_task = require("context/task");
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

    /**
     * Handle the cases when there are no todos, #main and #footer should be hidden.
     * @private
     * @see {@link https://github.com/tastejs/todomvc/blob/master/app-spec.md#no-todos}
     */
    _handle_no_todo: function() {
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

        // Manually trigger an add event on first run.
        collection.trigger("add");
    },

    /**
     * Handle updating of the item counter and toggling "clear completed" button
     * @private
     * @see {@link https://github.com/tastejs/todomvc/blob/master/app-spec.md#counter}
     */
    _handle_item_count: function() {
        var collection = Evening.repository.get("collection", "tasks");
        this.listenTo(collection, "add remove change reset", function(){
            var count = collection.where({completed: false}).length;
            var item_count_html = count + " item left";
            if(count > 1 || count === 0) {
                item_count_html = count + " items left";
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

    /**
     * Clear completed todo items
     * @private
     */
    _clear_completed: function() {
        var collection = Evening.repository.get("collection", "tasks");
        var completed = collection.where({completed: true}).destroy();
        _.each(completed, function(task){
            task.destroy();
        });
    }
});