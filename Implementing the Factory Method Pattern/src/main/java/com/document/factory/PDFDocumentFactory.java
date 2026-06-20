package com.document.factory;

import com.document.models.Document;
import com.document.models.PDFDocument;

/**
 * PDF Document Factory
 * 
 * Concrete factory that creates PDF documents
 */
public class PDFDocumentFactory extends DocumentFactory {
    
    @Override
    public Document createDocument() {
        return new PDFDocument();
    }
}
