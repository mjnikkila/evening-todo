/**
 * Implements business logic for one list view
 * @class
 * @module view/tasklist/list
 * @type {Evening.View}
 */
module.exports = Evening.View.extend({
    /**
     * @see {@link https://eveningjs.org/doc.html#gs_hello_world}
     */
    viewTemplate: require("./list.html"),

    /**
     * @private
     * @see {@link https://eveningjs.org/doc.html#gs_hello_world}
     */
    _view_list_item: require("./item.js"),

    /**
     * @see {@link http://epoxyjs.org/documentation.html#binding-handlers}
     */
    bindings: {
        ".todo-list": "collection: $collection, itemView: '_view_list_item'"
    },

    /**
     * Filter tasklist using type
     * @function
     * @param {string} type The type of filter used. Possible values active, completed
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