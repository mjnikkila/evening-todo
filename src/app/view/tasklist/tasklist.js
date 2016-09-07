var _tmpl_list = require("./list.html");
var _tmpl_list_item = require("./list_item.html");

var _view_list_item = Evening.View.extend({
    viewTemplate: _tmpl_list_item,
    tagName: "li",
    bindings: {
        ".title": "text:title"
    }
});

module.exports = Evening.View.extend({
    viewTemplate: _tmpl_list,
    _view_list_item: _view_list_item,

    bindings: {
        ".todo-list": "collection: $collection, itemView: '_view_list_item'"
    },

    construct: function() {
        // Handle https://github.com/tastejs/todomvc/blob/master/app-spec.md#no-todos
        this.handle_no_todos();


    },

    handle_no_todos: function() {
        if(this.collection.length == 0) {
            var $layout = Evening.getRepository("view", "layout").$el;
            $layout.find(".main").hide();
            $layout.find(".footer").hide();
        }
    }
});