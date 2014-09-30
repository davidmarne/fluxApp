var AppDispatcher = require('./AppDispatcher');

var Actions = {
    poll: function(){
        AppDispatcher.handleViewAction({
            actionType: 'poll'
        });
    },
    markRead: function(index){
        AppDispatcher.handleViewAction({
            actionType: 'markRead',
            index: index
        });
    }
};

module.exports = Actions;