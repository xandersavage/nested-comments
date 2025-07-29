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