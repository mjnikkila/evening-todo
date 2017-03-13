/**
 * Implements logic for one todo list item
 * @module view/tasklist/item
 * @see {@link https://github.com/tastejs/todomvc/blob/master/app-spec.md#item}
 */
module.exports = Evening.View.extend({
    /**
     * View html template as a string
     * @see {@link https://eveningjs.org/doc.html#gs_hello_world}
     */
    viewTemplate: require("./item.html"),

    /**
     * Template root element name
     * @see {@link http://backbonejs.org/#View-el}
     */
    tagName: "li",

    /**
     * Epoxy.js bindings
     * @see {@link http://epoxyjs.org/documentation.html#binding-handlers}
     */
    bindings: {
        ".title": "text: title",
        ".edit": "value: title",
        ".toggle": "checked: completed",
        ":el": "toggle: visible, classes:{completed: completed}"
    },

    /**
     * Backbone.js events
     * {@link http://backbonejs.org/#View-events}
     */
    events: {
        "dblclick label": "enable_edit_mode",
        "keyup .edit": "disable_edit_mode",
        "click .destroy": "destroy"
    },

    /**
     * Enables editing mode for the list item
     * @see {@link https://github.com/tastejs/todomvc/blob/master/app-spec.md#item}
     * @see {@link https://github.com/tastejs/todomvc/blob/master/app-spec.md#editing}
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

    /**
     * Destroy the attached model and remove view from the DOM
     */
    destroy: function() {
        this.model.destroy();
        this.remove();
    }
});