package com.document.factory;

import com.document.models.Document;
import com.document.models.WordDocument;

/**
 * Word Document Factory
 * 
 * Concrete factory that creates Word documents
 */
public class WordDocumentFactory extends DocumentFactory {
    
    @Override
    public Document createDocument() {
        return new WordDocument();
    }
}
