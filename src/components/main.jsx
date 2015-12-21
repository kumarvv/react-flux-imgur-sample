var React = require('react'); 
var Header = require('./header');
var TopicList = require('./topic-list');

module.exports = React.createClass({
	render: function() { 
		return <div>
			<Header/>
			{this.contents()}
		</div>;
	}, 

	contents: function() { 
		if (this.props.children) { 
			return this.props.children; 
		} else { 
			return <TopicList/>
		}
	}
}); 
