import axios from 'axios'
import { postsApp } from '../config/config'
import { postsAPI } from '../config/api'

export const CREATE_POST_SUCCESSFUL = 'CREATE_POST_SUCCESSFUL'
export const CREATE_POST_FAILED = 'CREATE_POST_FAILED'
export const UPLOAD_FILES_SUCCESSFUL = 'UPLOAD_FILES_SUCCESSFUL'
export const UPLOAD_FILES_FAILED = 'UPLOAD_FILES_FAILED'
export const LIST_POSTS_SUCCESSFUL = 'LIST_POSTS_SUCCESSFUL'
export const LIST_POSTS_FAILED = 'LIST_POSTS_FAILED'

export function create(title, content, userId) {
    return dispatch => {
        axios.post(postsApp.baseUrl + postsAPI.createPost,
			{
				title: title,
				content: content,
				userId,
			})
		.then(function(res){
			if (res && res.data && res.data.result) {
				dispatch(createSuccess())
			}
		}).catch(function(err) {
			dispatch(createFail(err))
		})
    }
}

function createSuccess() {
	return {
		type: CREATE_POST_SUCCESSFUL,
	}
}

function createFail(error) {
	return {
		type: CREATE_POST_FAILED,
	}
}

export function uploadFiles(files) {
    return dispatch => {
        axios.post(postsApp.baseUrl + postsAPI.uploadPhotos, files)
		.then(function(res){
			if (res && res.data && res.data.result) {
				dispatch(uploadSuccess(res.data.filepath))
			}
		}).catch(function(err) {
			dispatch(uploadFail(err))
		})
    }
}

function uploadSuccess(filepath) {
	return {
		type: UPLOAD_FILES_SUCCESSFUL,
		filepath: filepath,
	}
}

function uploadFail(error) {
	return {
		type: UPLOAD_FILES_FAILED,
	}
}

export function listposts() {
    return dispatch => {
        axios.get(postsApp.baseUrl + postsAPI.listposts)
		.then(function(res){
			if (res && res.data ) {
				console.log(res.data.posts)
				console.log("actionok")
				dispatch(listSuccess(res.data.posts))
			}
		}).catch(function(err) {
			dispatch(listFail(err))
		})
    }
}

function listSuccess(posts) {
	console.log("inlistsuccess" + posts + "out")
	return {
		type: LIST_POSTS_SUCCESSFUL,
		posts: posts,
	}
}

function listFail(error) {
	return {
		type: LIST_POSTS_FAILED,
	}
}