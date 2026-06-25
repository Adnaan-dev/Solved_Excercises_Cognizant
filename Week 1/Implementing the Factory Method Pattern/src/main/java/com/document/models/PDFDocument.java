package com.document.models;

import java.util.Date;

/**
 * PDF Document Implementation
 * 
 * Concrete product class for PDF documents
 */
public class PDFDocument implements Document {
    
    private String filename;
    private boolean isOpen;
    private Date lastModified;
    private StringBuilder content;
    
    public PDFDocument() {
        this.content = new StringBuilder();
        this.isOpen = false;
        System.out.println("[PDF] PDF document instance created");
    }
    
    @Override
    public void open() {
        isOpen = true;
        System.out.println("[PDF] Opening PDF document: " + filename);
        System.out.println("[PDF] Loading PDF reader...");
        System.out.println("[PDF] Rendering pages...");
    }
    
    @Override
    public void create() {
        System.out.println("[PDF] Creating new PDF document");
        System.out.println("[PDF] Initializing PDF header");
        System.out.println("[PDF] Setting default page size: A4");
        content = new StringBuilder();
        lastModified = new Date();
    }
    
    @Override
    public void save(String filename) {
        this.filename = filename;
        System.out.println("[PDF] Saving PDF document as: " + filename + ".pdf");
        System.out.println("[PDF] Compressing images...");
        System.out.println("[PDF] Embedding fonts...");
        System.out.println("[PDF] Finalizing PDF structure...");
        lastModified = new Date();
    }
    
    @Override
    public void close() {
        if (isOpen) {
            System.out.println("[PDF] Closing PDF document");
            System.out.println("[PDF] Releasing memory...");
            isOpen = false;
        }
    }
    
    @Override
    public String getDocumentType() {
        return "Portable Document Format";
    }
    
    @Override
    public String getFileExtension() {
        return ".pdf";
    }
    
    @Override
    public void print() {
        if (!isOpen) {
            open();
        }
        System.out.println("[PDF] Sending PDF to printer...");
        System.out.println("[PDF] Rendering pages at 300 DPI...");
        System.out.println("[PDF] Print job sent successfully");
    }
    
    @Override
    public Date getLastModified() {
        return lastModified;
    }
    
    @Override
    public String getDocumentInfo() {
        return "Document Type: " + getDocumentType() + 
               "\nExtension: " + getFileExtension() + 
               "\nFilename: " + (filename != null ? filename : "Untitled") +
               "\nLast Modified: " + (lastModified != null ? lastModified : "Never") +
               "\nStatus: " + (isOpen ? "Open" : "Closed");
    }
}
