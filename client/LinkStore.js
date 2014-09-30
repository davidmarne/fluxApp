var AppDispatcher = require('./AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var $ = require('jquery');

var recentLinks = [];

function pushLink(data){
    for(var i = 0, n = data.length; i < n; i++){
        if(!recentLinks[data[i].id]){
            recentLinks[data[i].id] = data[i];
        }
    }
}

var LinkStore = merge(EventEmitter.prototype, {

    emitChange: function() {
        this.emit('update');
    },

    addChangeListener: function(callback) {
        this.on('update', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('update', callback);
    },

    getCurrent: function(){
        return recentLinks;
    },

    poll: function(){
        $.ajax({
            url: 'links.json',
            dataType: 'json',
            success: function(data) {
                pushLink(data.links);
                this.emitChange();
            }.bind(this)
        });
    },

    markRead: function(index){
        recentLinks[index].read = true;
        this.emitChange();
    },

    dispatcherIndex:  AppDispatcher.register(function(payload){
        var actionType = payload.action.actionType;

        switch(actionType) {
            case 'poll':
                LinkStore.poll();
                break;
            case 'markRead':
                var index = payload.action.index;
                LinkStore.markRead(index);
        }
        return true;
    })
});

module.exports = LinkStore;