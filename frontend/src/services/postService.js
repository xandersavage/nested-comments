import api from './api.js'

// GET all posts
export const getPosts = async () => {
  try {
    const response = await api.get('/posts')
    return response.data
  } catch (e) {
    console.error(`Error fetching posts: ${e}`)
    throw e
  }
}