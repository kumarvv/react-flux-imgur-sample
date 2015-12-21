var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic_store'); 
var Actions = require('../actions/actions'); 
var ReactRouter = require('react-router');
var Link = ReactRouter.Link; 

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(TopicStore, 'onChange')
	], 

	getInitialState: function() { 
		return { 
			topics: [] 
		}
	},

	componentWillMount: function() { 
		Actions.getTopics();  
	},

	renderTopics: function() { 
		return this.state.topics.map(function(topic, i) {
			return <Link to={"topics/" + topic.id} key={topic.id} className="list-group-item">
				<h4>{topic.name}</h4>
				<p>{topic.description}</p>
			</Link>;
		}); 
	},

	render: function() { 
		return <div className="list-group">
			{this.renderTopics()}
		</div>; 
	}, 

	onChange: function(e, topics) { 
		this.setState({topics: topics});
	}
}); 
