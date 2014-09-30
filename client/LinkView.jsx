/** @jsx React.DOM */
var React = require('react');
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Button = require('react-bootstrap').Button;
var Actions = require('./Actions');

var LinkView = React.createClass({
    markRead: function(){
        if(!this.props.link.read) {
            Actions.markRead(this.props.link.id);
        }
        window.open(this.props.link.url, '_blank');
    },
    render: function(){
        if(this.props.unreadColumn){
            return (
                <ListGroupItem header={this.props.link.name}>
                    {this.props.link.comments}
                </ListGroupItem>
            );
        }

        if(this.props.link.read){
            return(
                <ListGroupItem onClick={this.markRead} bsStyle="danger" header={this.props.link.name}>
                    {this.props.link.comments}
                </ListGroupItem>
            );
        }

        return (
            <ListGroupItem onClick={this.markRead} header={this.props.link.name}>
                {this.props.link.comments}
            </ListGroupItem>
        );
    }
});

module.exports = LinkView;