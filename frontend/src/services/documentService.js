import api from './api.js'

// GET all documents

export const getDocuments = async () => {
    try {
        const response = await api.get('/documents')
        return response.data
    } catch (e) {
        console.error(`Error fetching documents: ${e}`)
        throw e
    }
}