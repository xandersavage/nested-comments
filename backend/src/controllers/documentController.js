import { Document } from '../models/documentModel.js';

export const createDocument = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const author = req.user._id;

    const newDocument = await Document.create({ title, content, author, type });
    res.status(201).json(newDocument);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating document', error: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find().populate(
      'author',
      'username email',
    );
    res.status(200).json(documents);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching documents', error: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.documentId).populate(
      'author',
      'username email',
    );
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching document', error: error.message });
  }
};
