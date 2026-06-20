package com.document;

import com.document.factory.DocumentFactory;
import com.document.factory.WordDocumentFactory;
import com.document.factory.PDFDocumentFactory;
import com.document.factory.ExcelDocumentFactory;
import com.document.models.Document;

/**
 * Factory Method Pattern Test
 * 
 * Demonstrates the Factory Method Pattern for creating documents
 */
public class FactoryMethodTest {
    
    public static void main(String[] args) {
        System.out.println("=" .repeat(70));
        System.out.println("FACTORY METHOD PATTERN - DOCUMENT MANAGEMENT SYSTEM");
        System.out.println("=".repeat(70) + "\n");
        
        testBasicFactoryMethod();
        testDocumentOperations();
        testPolymorphicBehavior();
    }
    
    /**
     * Test 1: Basic Factory Method Usage
     */
    private static void testBasicFactoryMethod() {
        System.out.println("\n### TEST 1: Basic Factory Method Usage ###\n");
        
        // Creating Word document
        System.out.println("Creating Word document using WordDocumentFactory:");
        DocumentFactory wordFactory = new WordDocumentFactory();
        Document wordDoc = wordFactory.getDocument();
        wordDoc.create();
        wordDoc.save("report");
        System.out.println();
        
        // Creating PDF document
        System.out.println("Creating PDF document using PDFDocumentFactory:");
        DocumentFactory pdfFactory = new PDFDocumentFactory();
        Document pdfDoc = pdfFactory.getDocument();
        pdfDoc.create();
        pdfDoc.save("resume");
        System.out.println();
        
        // Creating Excel document
        System.out.println("Creating Excel document using ExcelDocumentFactory:");
        DocumentFactory excelFactory = new ExcelDocumentFactory();
        Document excelDoc = excelFactory.getDocument();
        excelDoc.create();
        excelDoc.save("budget");
        System.out.println();
    }
    
    /**
     * Test 2: Document Operations
     */
    private static void testDocumentOperations() {
        System.out.println("\n### TEST 2: Document Operations ###\n");
        
        // Create and operate on different document types
        Document[] documents = new Document[3];
        
        // Create documents using factories
        documents[0] = new WordDocumentFactory().getDocument();
        documents[1] = new PDFDocumentFactory().getDocument();
        documents[2] = new ExcelDocumentFactory().getDocument();
        
        System.out.println("Performing operations on all documents:\n");
        
        // Perform operations on each document
        for (Document doc : documents) {
            System.out.println("--- Processing " + doc.getDocumentType() + " ---");
            doc.create();
            doc.open();
            doc.save("document_" + System.currentTimeMillis());
            doc.print();
            doc.close();
            System.out.println();
        }
    }
    
    /**
     * Test 3: Polymorphic Behavior
     */
    private static void testPolymorphicBehavior() {
        System.out.println("\n### TEST 3: Polymorphic Behavior & Document Info ###\n");
        
        // Create different documents
        DocumentFactory[] factories = {
            new WordDocumentFactory(),
            new PDFDocumentFactory(),
            new ExcelDocumentFactory()
        };
        
        Document[] documents = new Document[factories.length];
        
        // Create documents polymorphically
        for (int i = 0; i < factories.length; i++) {
            documents[i] = factories[i].getDocument();
        }
        
        System.out.println("Displaying information for all documents:\n");
        
        // Display information for each document
        for (Document doc : documents) {
            doc.create();
            doc.save("document");
            System.out.println(doc.getDocumentInfo());
            System.out.println("-".repeat(60) + "\n");
        }
    }
}
