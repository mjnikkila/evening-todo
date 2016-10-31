var _tmpl_list = require("./list.html");
var _tmpl_list_item = require("./list_item.html");

/**
 * Implements one todo item logic
 * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
 */
var _view_list_item = Evening.View.extend({
    viewTemplate: _tmpl_list_item,
    tagName: "li",
    bindings: {
        ".title": "text: title",
        ".edit": "value: title",
        ".toggle": "checked: completed"
    },

    events: {
        "dblclick label": "enable_edit_mode",
        "keyup .edit": "disable_edit_mode",
        "click .destroy": "destroy"
    },

    construct: function(){
        this.listenTo(this.model, "change:completed", function(model){
            if(model.get("completed") == true) {
                this.$el.addClass("completed");
            } else {
                this.$el.removeClass("completed");
            }
        }.bind(this));
    },

    /**
     * Toggles editing mode for the item
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#editing
     */
    enable_edit_mode: function() {
        this.$el.addClass("editing");
        this.$(".edit").focus();
    },

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
    }
});