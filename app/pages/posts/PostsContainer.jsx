import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreatePost from './CreatePost'
import { uploadFiles } from '../../actions/postActions'

class PostsContainer extends Component {
	render() {
		return (
			<div>
				<CreatePost
					userSigninState = {this.props.userSigninState}
					uploadFilesHandler = {this.uploadFilesHandler.bind(this)}
					filesUploadState = {this.props.filesUploadState}
				/>
			</div>
		)
	}

	uploadFilesHandler(files){
		this.props.dispatch(uploadFiles(files))
	}
}

function select(state) {
	return {
		userSigninState: state.userSigninState,
		filesUploadState: state.filesUploadState,
	}
}

export default connect(select)(PostsContainer)