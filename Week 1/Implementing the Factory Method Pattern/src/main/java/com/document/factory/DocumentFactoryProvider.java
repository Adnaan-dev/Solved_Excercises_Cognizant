package com.document.factory;

import com.document.models.Document;

/**
 * Document Factory Provider
 * 
 * A static utility class that provides a simple way to create documents
 * by type name. This is an alternative to using individual factory classes.
 */
public class DocumentFactoryProvider {
    
    /**
     * Enum for document types
     */
    public enum DocumentType {
        WORD, PDF, EXCEL
    }
    
    /**
     * Create a document by type
     * 
     * @param type the type of document to create
     * @return the created document
     * @throws IllegalArgumentException if type is not recognized
     */
    public static Document createDocument(DocumentType type) {
        System.out.println("DocumentFactoryProvider: Creating document of type: " + type);
        
        switch (type) {
            case WORD:
                return new WordDocumentFactory().getDocument();
            case PDF:
                return new PDFDocumentFactory().getDocument();
            case EXCEL:
                return new ExcelDocumentFactory().getDocument();
            default:
                throw new IllegalArgumentException("Unknown document type: " + type);
        }
    }
    
    /**
     * Create a document by string name
     * 
     * @param typeName the name of the document type (WORD, PDF, EXCEL)
     * @return the created document
     * @throws IllegalArgumentException if type name is not recognized
     */
    public static Document createDocument(String typeName) {
        try {
            DocumentType type = DocumentType.valueOf(typeName.toUpperCase());
            return createDocument(type);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Unknown document type: " + typeName + 
                   ". Supported types: WORD, PDF, EXCEL");
        }
    }
}
