package com.document.factory;

import com.document.models.Document;
import com.document.models.ExcelDocument;

/**
 * Excel Document Factory
 * 
 * Concrete factory that creates Excel documents
 */
public class ExcelDocumentFactory extends DocumentFactory {
    
    @Override
    public Document createDocument() {
        return new ExcelDocument();
    }
}
