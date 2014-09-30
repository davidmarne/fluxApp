/** @jsx React.DOM */
var React = require('react');

var LinkStore = require('./LinkStore');
var Carousel = require('react-bootstrap').Carousel;
var CarouselItem = require('react-bootstrap').CarouselItem;
var ListGroup = require('react-bootstrap').ListGroup;
var Well = require('react-bootstrap').Well;
var Actions = require('./Actions');
var LinkView = require('./LinkView');

function initState() {
    return {
        links: []
    }
}

var LiveLinkViewer = React.createClass({

    getInitialState: function(){
        return initState();
    },
    updateLinks: function(){
        this.setState({links:LinkStore.getCurrent()});
    },
    componentDidMount: function() {
        LinkStore.addChangeListener(this.updateLinks);
        setInterval(Actions.poll, 1000);
    },

    componentWillUnmount: function() {
        LinkStore.removeChangeListener(this.updateLinks);
    },
    getUnreadLinks: function() {
        var linksMarkedUnread = [];
        for(var i = 0, n = this.state.links.length;
                i < n; i++){
            if(!this.state.links[i].read){
                linksMarkedUnread.push(this.state.links[i]);
            }
        }
        return linksMarkedUnread;
    },
    render: function(){
        var links = this.state.links.map(function(link, key){
            return (
                <LinkView link={link} key={key}/>
            );
        });

        var linksMarkedUnread = this.getUnreadLinks();

        var unreadLinks = linksMarkedUnread.map(function(link, key){
            return (
                <LinkView link={link} key={key} unreadColumn={true}/>
            );
        });
        var styleA = {
            width: '40%',
            float: 'left',
            margin: '5%'
        }
        var styleB = {
            width: '40%',
            float: 'right',
            margin: '5%'
        }

        return (
            <div>
                <Well style={styleA}>
                    <h2>All links</h2>
                    <ListGroup>
                        {links}
                    </ListGroup>
                </Well>
                <Well style={styleB}>
                    <h2>Unread links</h2>
                    <ListGroup>
                        {unreadLinks}
                    </ListGroup>
                </Well>
            </div>

        );
    }
});

React.renderComponent(
    <LiveLinkViewer/>,
    document.getElementById('content')
);
