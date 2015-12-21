var React = require('react'); 
var Reflux = require('reflux'); 
var ImageStore = require('../stores/image_store'); 
var CommentStore = require('../stores/comment_store'); 
var Actions = require('../actions/actions');
var CommentBox = require('./comment_box');

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(ImageStore, 'onChange'), 
		Reflux.listenTo(CommentStore, 'onChange') 
	], 

	getInitialState: function() { 
		return { 
			image: null
		}
	}, 

	componentWillMount: function() { 
		Actions.getImage(this.props.params.id); 
	},

	render: function() { 
		return <div>
			{this.state.image ? this.renderContent() : null}
		</div>; 
	}, 

	renderContent: function() { 
		return <div className="image-detail"> 
			<div className="panel panel-default">
				<div className="panel-heading">
					<h4>{this.state.image.title}</h4>
				</div> 
				<div className="panel-body">
					{this.renderImage()}
				</div>
				<div className="panel-footer">
					<h5>{this.state.image.description}</h5>
				</div>
				<h3>Comments</h3>
				{this.renderComments()}
			</div>
		</div>;
	},

	renderImage: function() { 
		if (this.state.image.animated) { 
			return <video preload="auto" autoPlay="autoplay" loop="loop" webkit-playsinline>
				<source src={this.state.image.mp4} type="video/mp4"/>
			</video>; 
		} else { 
			return <img src={this.state.image.link}/>;
		}
	}, 

	renderComments: function() { 
		if (!this.state.comments) { 
			return null; 
		}

		return <CommentBox comments={this.state.comments} />; 
	},

	onChange: function() { 
		this.setState({
			image: ImageStore.find(this.props.params.id), 
			comments: CommentStore.comment 
		});
	}
})
