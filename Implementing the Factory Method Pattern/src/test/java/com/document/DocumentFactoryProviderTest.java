package com.document;

import com.document.factory.DocumentFactoryProvider;
import com.document.models.Document;

/**
 * Document Factory Provider Test
 * 
 * Tests the DocumentFactoryProvider utility class
 */
public class DocumentFactoryProviderTest {
    
    public static void main(String[] args) {
        System.out.println("=".repeat(70));
        System.out.println("FACTORY METHOD PATTERN - DOCUMENT FACTORY PROVIDER");
        System.out.println("=".repeat(70) + "\n");
        
        testFactoryProvider();
        testDynamicDocumentCreation();
        testErrorHandling();
    }
    
    /**
     * Test 1: Using Factory Provider with Enum
     */
    private static void testFactoryProvider() {
        System.out.println("\n### TEST 1: Using Factory Provider with Enum ###\n");
        
        // Create documents using enum
        Document wordDoc = DocumentFactoryProvider.createDocument(
            DocumentFactoryProvider.DocumentType.WORD);
        System.out.println("Created: " + wordDoc.getDocumentType());
        wordDoc.create();
        wordDoc.save("sample_word");
        System.out.println();
        
        Document pdfDoc = DocumentFactoryProvider.createDocument(
            DocumentFactoryProvider.DocumentType.PDF);
        System.out.println("Created: " + pdfDoc.getDocumentType());
        pdfDoc.create();
        pdfDoc.save("sample_pdf");
        System.out.println();
        
        Document excelDoc = DocumentFactoryProvider.createDocument(
            DocumentFactoryProvider.DocumentType.EXCEL);
        System.out.println("Created: " + excelDoc.getDocumentType());
        excelDoc.create();
        excelDoc.save("sample_excel");
        System.out.println();
    }
    
    /**
     * Test 2: Dynamic Document Creation from User Input
     */
    private static void testDynamicDocumentCreation() {
        System.out.println("\n### TEST 2: Dynamic Document Creation ###\n");
        
        String[] documentTypes = {"WORD", "PDF", "EXCEL"};
        
        System.out.println("Creating documents based on user input:\n");
        
        for (String type : documentTypes) {
            try {
                System.out.println("User requests: " + type);
                Document doc = DocumentFactoryProvider.createDocument(type);
                doc.create();
                System.out.println("Successfully created: " + doc.getDocumentType());
                System.out.println("File Extension: " + doc.getFileExtension());
                System.out.println();
            } catch (IllegalArgumentException e) {
                System.err.println("Error: " + e.getMessage());
            }
        }
    }
    
    /**
     * Test 3: Error Handling
     */
    private static void testErrorHandling() {
        System.out.println("\n### TEST 3: Error Handling ###\n");
        
        String[] invalidTypes = {"DOC", "POWERPOINT", "TXT", "JSON"};
        
        System.out.println("Testing error handling with invalid document types:\n");
        
        for (String type : invalidTypes) {
            System.out.println("Attempting to create: " + type);
            try {
                Document doc = DocumentFactoryProvider.createDocument(type);
                doc.create();
            } catch (IllegalArgumentException e) {
                System.out.println("✗ Error caught: " + e.getMessage());
            }
            System.out.println();
        }
    }
}
