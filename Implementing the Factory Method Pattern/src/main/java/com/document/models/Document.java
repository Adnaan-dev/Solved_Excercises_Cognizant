package com.document.models;

import java.io.IOException;
import java.util.Date;

/**
 * Document Interface
 * 
 * This interface defines the contract for all document types.
 * It represents the product that the factory will create.
 */
public interface Document {
    
    /**
     * Open the document
     */
    void open();
    
    /**
     * Create a new document
     */
    void create();
    
    /**
     * Save the document
     * 
     * @param filename the name to save the document as
     */
    void save(String filename);
    
    /**
     * Close the document
     */
    void close();
    
    /**
     * Get the document type
     * 
     * @return the type of the document
     */
    String getDocumentType();
    
    /**
     * Get the file extension
     * 
     * @return the file extension (e.g., .docx, .pdf, .xlsx)
     */
    String getFileExtension();
    
    /**
     * Print the document
     */
    void print();
    
    /**
     * Get the last modified date
     * 
     * @return the last modified date
     */
    Date getLastModified();
    
    /**
     * Get document properties
     * 
     * @return document information as a string
     */
    String getDocumentInfo();
}
