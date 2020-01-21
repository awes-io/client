import Vue from 'vue'

Vue.prototype._getTitle = function(title) {
    return 'Component <' + title + ' />'
}
Vue.prototype._getMetaTitle = function(title) {
    return '<' + title + ' /> :: Live preview - Awes.io'
}
Vue.prototype._getMetaDescription = function(title) {
    return {
        hid: 'description',
        name: 'description',
        content: 'Live preview of Awes.io UI component - <' + title + ' />'
    }
}
