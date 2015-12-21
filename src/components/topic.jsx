var React = require('react'); 
var Reflux = require('reflux');
var ImageStore = require('../stores/image_store'); 
var Actions = require('../actions/actions'); 
var ReactRouter = require('react-router');
var Link = ReactRouter.Link; 
var ImagePreview = require('./image_preview')

module.exports = React.createClass({ 
	mixins: [
		Reflux.listenTo(ImageStore, 'onChange')
	], 

	getInitialState: function() { 
		return { 
			images: [] 
		}
	},

	componentWillMount: function() { 
		Actions.getImages(this.props.params.id);  
	},

	componentWillReceiveProps: function(nextProps) { 
		console.log("now=" + this.props.params.id + ", next="+ nextProps.params.id);
		Actions.getImages(nextProps.params.id);
		return true; 
	}, 

	renderImages: function() { 
		return this.state.images.slice(0, 20).map(function(image) {
			return <ImagePreview key={image.id} {...image} />
		}); 
	}, 

	render: function() { 
		return <div className="topic">
			{this.renderImages()}
		</div>;
	}, 

	onChange: function(e, images) { 
		this.setState({images: images}); 
	}
}); 
