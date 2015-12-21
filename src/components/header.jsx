var React = require('react');
var Router = require('react-router'); 
var Link = Router.Link; 
var TopicStore = require('../stores/topic_store');
var Reflux = require('reflux');

module.exports = React.createClass({
	mixins: [ 
		Reflux.listenTo(TopicStore, 'onChange')
	], 

	getInitialState: function() { 
		return { 
			topics: []
		}
	},

	renderTopics: function() { 
		return this.state.topics.slice(0,4).map(function(topic) {
			return <li key={topic.id}>
				<Link activeClassName="active" to={"topics/" + topic.id}>
					{topic.name}
				</Link>
			</li>
		});
	},

	render: function() { 
		return <nav className="navbar navbar-default header">
			<div className="container-fluid">
				<Link to="/" className="navbar-brand">
					Imgur Browser
				</Link>
				<ul className="nav navbar-nav navbar-right">
					{this.renderTopics()}
				</ul>
			</div>
		</nav>
	}, 

	onChange: function(e, topics) { 
		this.setState({topics: topics});
	}
}); 
