import React from "react";
import DocumentCard from "./DocumentCard.jsx";
import { ALL_DOCUMENTS_DATA } from "../data/documentsData.js";

const DocumentList = () => {
  return (
    <>
      <h2 className={`text-center text-3xl mb-3 font-semibold`}>Documents</h2>
      <p className={`text-gray-700 text-lg text-center mb-5`}>
        Collaborate on documents with contextual feedback
      </p>
      {ALL_DOCUMENTS_DATA.map((document) => (
        // We'll use a simplified DocumentCard for the list view
        // (the one you just made is a full detail page)
        <DocumentCard key={document.id} document={document} />
      ))}
    </>
  );
};

export default DocumentList;
