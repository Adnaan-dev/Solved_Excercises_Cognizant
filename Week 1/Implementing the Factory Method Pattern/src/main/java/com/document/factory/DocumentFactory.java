package com.document.factory;

import com.document.models.Document;

/**
 * Abstract Document Factory
 * 
 * This abstract class defines the factory method pattern.
 * It declares the abstract factory method that subclasses must implement.
 */
public abstract class DocumentFactory {
    
    /**
     * Factory Method - Abstract method that must be implemented by subclasses
     * This method creates and returns a Document instance
     * 
     * @return a concrete Document implementation
     */
    public abstract Document createDocument();
    
    /**
     * Template method - Uses the factory method to create and process a document
     * This demonstrates the Template Method Pattern combined with Factory Method
     * 
     * @return the created document
     */
    public Document getDocument() {
        System.out.println("DocumentFactory: Using factory method to create document...");
        Document document = createDocument();
        System.out.println("DocumentFactory: Document created successfully\n");
        return document;
    }
}
