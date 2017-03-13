var _tmpl_list = require("./list.html");
var _tmpl_list_item = require("./list_item.html");

/**
 * Implements logic for one todo list item
 * @class
 * @see {@link https://github.com/tastejs/todomvc/blob/master/app-spec.md#item}
 */
var _view_list_item = Evening.View.extend({

    /**
     * @property {string} viewTemplate view html template
     * @see {@link https://eveningjs.org/doc.html#gs_hello_world}
     */
    viewTemplate: _tmpl_list_item,

    /**
     * @property {string} tagName template root element name
     * @see {@link http://backbonejs.org/#View-el}
     */
    tagName: "li",

    /**
     * @property {object} bindings Epoxy.js bindings
     * @see {@link http://epoxyjs.org/documentation.html#binding-handlers}
     */
    bindings: {
        ".title": "text: title",
        ".edit": "value: title",
        ".toggle": "checked: completed",
        ":el": "toggle: visible, classes:{completed: completed}"
    },

    /**
     * @property {object} events Backbone.js events
     * {@link http://backbonejs.org/#View-events|Backbonejs documentation #View-events}
     */
    events: {
        "dblclick label": "enable_edit_mode",
        "keyup .edit": "disable_edit_mode",
        "click .destroy": "destroy"
    },

    /**
     * Enables editing mode for the list item
     * @function
     * @see {@link https://github.com/tastejs/todomvc/blob/master/app-spec.md#item}
     * @see {@link https://github.com/tastejs/todomvc/blob/master/app-spec.md#editing}
     */
    enable_edit_mode: function() {
        this.$el.addClass("editing");
        this.$(".edit").focus();
    },

    /**
     * Disables editing mode for the list item
     * @function
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
     * @see https://github.com/tastejs/todomvc/blob/master/app-spec.md#editing
     */
    disable_edit_mode: function(ev) {
        if(ev.keyCode == 13) {
            this.$el.removeClass("editing");
        }
    },

    /**
     * Destroy the attached model and remove view from the DOM
     * @function
     */
    destroy: function() {
        this.model.destroy();
        this.remove();
    }
});

/**
 * Implements logic for one list view
 * @class
 * @type {Evening.View}
 */
module.exports = Evening.View.extend({
    /**
     * @property {string} viewTemplate view html template
     * @see {@link https://eveningjs.org/doc.html#gs_hello_world}
     */
    viewTemplate: _tmpl_list,

    /**
     * @private
     * @property {object} _view_list_item Evening.View class of a list item
     * @see {@link https://eveningjs.org/doc.html#gs_hello_world}
     */
    _view_list_item: _view_list_item,

    /**
     * @property {object} bindings Epoxy.js bindings
     * @see {@link http://epoxyjs.org/documentation.html#binding-handlers}
     */
    bindings: {
        ".todo-list": "collection: $collection, itemView: '_view_list_item'"
    },

    /**
     * Filter tasklist using type
     * @function
     * @param {string} type of filter used. Possible values active|completed
     */
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