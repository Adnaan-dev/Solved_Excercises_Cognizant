package com.document.models;

import java.util.Date;

/**
 * Excel Document Implementation
 * 
 * Concrete product class for Microsoft Excel spreadsheet documents (.xlsx)
 */
public class ExcelDocument implements Document {
    
    private String filename;
    private boolean isOpen;
    private Date lastModified;
    private StringBuilder content;
    
    public ExcelDocument() {
        this.content = new StringBuilder();
        this.isOpen = false;
        System.out.println("[EXCEL] Excel document instance created");
    }
    
    @Override
    public void open() {
        isOpen = true;
        System.out.println("[EXCEL] Opening Excel document: " + filename);
        System.out.println("[EXCEL] Loading spreadsheet engine...");
        System.out.println("[EXCEL] Parsing cell values and formulas...");
    }
    
    @Override
    public void create() {
        System.out.println("[EXCEL] Creating new Excel workbook");
        System.out.println("[EXCEL] Creating default sheet: Sheet1");
        System.out.println("[EXCEL] Setting default column width: Auto");
        content = new StringBuilder();
        lastModified = new Date();
    }
    
    @Override
    public void save(String filename) {
        this.filename = filename;
        System.out.println("[EXCEL] Saving Excel document as: " + filename + ".xlsx");
        System.out.println("[EXCEL] Computing formulas...");
        System.out.println("[EXCEL] Optimizing cell formats...");
        System.out.println("[EXCEL] Writing Excel binary format...");
        lastModified = new Date();
    }
    
    @Override
    public void close() {
        if (isOpen) {
            System.out.println("[EXCEL] Closing Excel document");
            System.out.println("[EXCEL] Clearing formula cache...");
            isOpen = false;
        }
    }
    
    @Override
    public String getDocumentType() {
        return "Microsoft Excel Spreadsheet";
    }
    
    @Override
    public String getFileExtension() {
        return ".xlsx";
    }
    
    @Override
    public void print() {
        if (!isOpen) {
            open();
        }
        System.out.println("[EXCEL] Sending spreadsheet to printer...");
        System.out.println("[EXCEL] Calculating print area...");
        System.out.println("[EXCEL] Adjusting column widths for print (3 pages)...");
        System.out.println("[EXCEL] Print job queued successfully");
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
