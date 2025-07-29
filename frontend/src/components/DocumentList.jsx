import React from "react";
import DocumentCard from "./DocumentCard.jsx";
// import { ALL_DOCUMENTS_DATA } from "../data/documentsData.js";
import {useQuery} from "@tanstack/react-query";
import {getDocuments} from "../services/documentService.js";

const DocumentList = () => {
    const {data:documents, isLoading, isError, error, isFetching} = useQuery({
        queryKey: ['documents'],
        queryFn: getDocuments,
        staleTime: 30 * 60 * 1000
    })

    // --- Conditional Rendering based on state ---
    if (isLoading) {
        return <div className="p-4 text-center text-gray-500">Loading documents...</div>;
    }

    if (isError) { // Use isError directly from useQuery
        // The 'error' object from useQuery contains details about the error
        return <div className="p-4 text-center text-red-500">Error: {error?.message || "Failed to load posts."}</div>;
    }

  return (
    <>
      <h2 className={`text-center text-3xl mb-3 font-semibold`}>Documents</h2>
      <p className={`text-gray-700 text-lg text-center mb-5`}>
        Collaborate on documents with contextual feedback
      </p>
        {documents && documents.length > 0 ? (
            documents.map(doc => (
                <DocumentCard key={doc._id} document={doc} />
            ))
        ) : (
            <p className={`text-center text-gray-500`}>No documents available</p>
        )}
    </>
  );
};

export default DocumentList;
