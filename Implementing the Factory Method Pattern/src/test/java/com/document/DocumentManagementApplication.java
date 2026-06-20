package com.document;

import com.document.factory.DocumentFactoryProvider;
import com.document.models.Document;

/**
 * Real-World Application Example
 * 
 * Demonstrates a practical document management system using Factory Method
 */
public class DocumentManagementApplication {
    
    static class DocumentRequest {
        String documentType;
        String filename;
        String[] operations;
        
        DocumentRequest(String type, String name, String[] ops) {
            this.documentType = type;
            this.filename = name;
            this.operations = ops;
        }
    }
    
    static class DocumentManager {
        public void processDocumentRequest(DocumentRequest request) {
            System.out.println("\n>>> Processing Document Request <<<");
            System.out.println("Type: " + request.documentType);
            System.out.println("Filename: " + request.filename);
            
            try {
                // Create document using factory provider
                Document document = DocumentFactoryProvider.createDocument(request.documentType);
                
                // Execute requested operations
                for (String operation : request.operations) {
                    executeOperation(document, operation, request.filename);
                }
                
                System.out.println("✓ Request completed successfully\n");
                
            } catch (IllegalArgumentException e) {
                System.err.println("✗ Error: " + e.getMessage() + "\n");
            }
        }
        
        private void executeOperation(Document document, String operation, String filename) {
            switch (operation.toLowerCase()) {
                case "create":
                    document.create();
                    break;
                case "open":
                    document.open();
                    break;
                case "save":
                    document.save(filename);
                    break;
                case "print":
                    document.print();
                    break;
                case "close":
                    document.close();
                    break;
                case "info":
                    System.out.println(document.getDocumentInfo());
                    break;
                default:
                    System.out.println("[WARN] Unknown operation: " + operation);
            }
        }
    }
    
    public static void main(String[] args) {
        System.out.println("=".repeat(70));
        System.out.println("REAL-WORLD APPLICATION: DOCUMENT MANAGEMENT SYSTEM");
        System.out.println("=".repeat(70));
        
        DocumentManager manager = new DocumentManager();
        
        // User Request 1: Create and print a Word report
        DocumentRequest request1 = new DocumentRequest(
            "WORD",
            "quarterly_report",
            new String[]{"create", "save", "print", "close"}
        );
        manager.processDocumentRequest(request1);
        
        // User Request 2: Create and save a PDF
        DocumentRequest request2 = new DocumentRequest(
            "PDF",
            "invoice_2026",
            new String[]{"create", "save", "info"}
        );
        manager.processDocumentRequest(request2);
        
        // User Request 3: Create Excel spreadsheet
        DocumentRequest request3 = new DocumentRequest(
            "EXCEL",
            "sales_data",
            new String[]{"create", "save", "open", "print", "close"}
        );
        manager.processDocumentRequest(request3);
        
        // User Request 4: Invalid document type
        DocumentRequest request4 = new DocumentRequest(
            "POWERPOINT",
            "presentation",
            new String[]{"create"}
        );
        manager.processDocumentRequest(request4);
        
        // User Request 5: Get document info
        DocumentRequest request5 = new DocumentRequest(
            "WORD",
            "memo",
            new String[]{"create", "save", "info"}
        );
        manager.processDocumentRequest(request5);
    }
}
