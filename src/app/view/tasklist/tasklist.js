var _tmpl_list = require("./list.html");
var _tmpl_list_item = require("./list_item.html");

/**
 * Implements logic for one todo list item
 * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
 */
var _view_list_item = Evening.View.extend({
    viewTemplate: _tmpl_list_item,

    tagName: "li",

    bindings: {
        ".title": "text: title",
        ".edit": "value: title",
        ".toggle": "checked: completed",
        ":el": "toggle: visible, classes:{completed: completed}"
    },

    events: {
        "dblclick label": "enable_edit_mode",
        "keyup .edit": "disable_edit_mode",
        "click .destroy": "destroy"
    },

    construct: function(){
        // Nothing to construct
    },

    /**
     * Enables editing mode for the list item
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#editing
     */
    enable_edit_mode: function() {
        this.$el.addClass("editing");
        this.$(".edit").focus();
    },

    /**
     * Disables editing mode for the list item
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#editing
     */
    disable_edit_mode: function(ev) {
        if(ev.keyCode == 13) {
            this.$el.removeClass("editing");
        }
    },

    destroy: function() {
        this.model.destroy();
        this.remove();
    }
});

module.exports = Evening.View.extend({
    viewTemplate: _tmpl_list,
    _view_list_item: _view_list_item,

    bindings: {
        ".todo-list": "collection: $collection, itemView: '_view_list_item'"
    },

    construct: function() {
        // Nothign to do
    },

    filter: function(type) {
        // Handle filtering
        _.each(this.collection.models, function(task) {
            if(type == null) {
                task.set("visible", true);
            } else {
                task.set("visible", false);
            }

            if(type == "active" && task.get("completed") === false) {
                task.set("visible", true);
            }

            if(type == "completed" && task.get("completed") === true) {
                task.set("visible", true);
            }
        });
    }
});