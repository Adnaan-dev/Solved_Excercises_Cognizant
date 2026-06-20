package com.document.models;

import java.util.Date;

/**
 * Word Document Implementation
 * 
 * Concrete product class for Microsoft Word documents (.docx)
 */
public class WordDocument implements Document {
    
    private String filename;
    private boolean isOpen;
    private Date lastModified;
    private StringBuilder content;
    
    public WordDocument() {
        this.content = new StringBuilder();
        this.isOpen = false;
        System.out.println("[WORD] Word document instance created");
    }
    
    @Override
    public void open() {
        isOpen = true;
        System.out.println("[WORD] Opening Word document: " + filename);
        System.out.println("[WORD] Initializing Word processor...");
        System.out.println("[WORD] Loading formatting styles...");
    }
    
    @Override
    public void create() {
        System.out.println("[WORD] Creating new Word document");
        System.out.println("[WORD] Initializing default styles (Heading, Body, etc.)");
        System.out.println("[WORD] Setting default font: Calibri, size 11pt");
        content = new StringBuilder();
        lastModified = new Date();
    }
    
    @Override
    public void save(String filename) {
        this.filename = filename;
        System.out.println("[WORD] Saving Word document as: " + filename + ".docx");
        System.out.println("[WORD] Compressing content...");
        System.out.println("[WORD] Writing XML structure...");
        lastModified = new Date();
    }
    
    @Override
    public void close() {
        if (isOpen) {
            System.out.println("[WORD] Closing Word document");
            System.out.println("[WORD] Releasing resources...");
            isOpen = false;
        }
    }
    
    @Override
    public String getDocumentType() {
        return "Microsoft Word Document";
    }
    
    @Override
    public String getFileExtension() {
        return ".docx";
    }
    
    @Override
    public void print() {
        if (!isOpen) {
            open();
        }
        System.out.println("[WORD] Sending document to printer...");
        System.out.println("[WORD] Formatting for print (2 pages)...");
        System.out.println("[WORD] Print job queued successfully");
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
