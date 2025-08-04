import api from './api.js'

export const getCommentsForPost = async (postId) => {
    if (!postId) throw new Error('Post ID is required to fetch comments.')

    try {
        const response = await api.get(`/posts/${postId}/comments`)
        return response.data
    } catch (e) {
        console.error(`Error fetching comments for post ${postId}:`, e)
        throw e
    }
}

export const getCommentsForDocument = async (docId) => {
    if (!docId) throw new Error('Document ID is required to fetch comments')

    try {
        const response = await api.get(`/documents/${docId}/comments`)
        return response.data
    } catch (e) {
        console.error(`Error fetching comments for document ${docId} `, e)
        throw e
    }
}

export const createPostComment = async ({postId, text}) => {
    if (!postId || !text) {
        throw new Error('Post ID and comment text are required')
    }

    try {
        const response = await api.post(`/posts/${postId}/comments`, {text})
        return response.data
    } catch (e) {
        console.error(`Error creating comment for post ${postId}: `, e)
        throw e
    }
}

export const createDocumentComment = async({docId, text}) => {
    console.log('Here is the text: ', text)
    if (!docId || !text) {
        throw new Error('Document ID and comment text are required')
    }

    try {
        const response = await api.post(`/documents/${docId}/comments`, {text})
        return response.data
    } catch (e) {
        console.error(`Error creating comment for document ${docId}: `, e)
        throw e
    }
}

export const createCommentReply = async ({parentCommentId, text}) => {
    if (!parentCommentId || !text) {
        throw new Error('Parent Comment ID and reply text are required')
    }

    try {
        const response = await api.post(`/comments/${parentCommentId}/replies`, {text})
        return response.data
    } catch (e) {
        console.error(`Error creating reply for comment ${parentCommentId}: `, e)
        throw e
    }
}