package com.document;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.document.factory.DocumentFactory;
import com.document.factory.ExcelDocumentFactory;
import com.document.factory.PDFDocumentFactory;
import com.document.factory.WordDocumentFactory;
import com.document.models.Document;
import com.document.models.ExcelDocument;
import com.document.models.PDFDocument;
import com.document.models.WordDocument;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * JUnit 5 tests for the Factory Method pattern. Each concrete factory must
 * produce the correct concrete {@link Document} with the expected type and
 * file extension.
 */
class FactoryMethodTest {

    @Test
    @DisplayName("WordDocumentFactory creates a Word document")
    void wordFactory_createsWordDocument() {
        DocumentFactory factory = new WordDocumentFactory();
        Document document = factory.getDocument();

        assertNotNull(document);
        assertTrue(document instanceof WordDocument);
        assertEquals("Microsoft Word Document", document.getDocumentType());
        assertEquals(".docx", document.getFileExtension());
    }

    @Test
    @DisplayName("PDFDocumentFactory creates a PDF document")
    void pdfFactory_createsPdfDocument() {
        DocumentFactory factory = new PDFDocumentFactory();
        Document document = factory.getDocument();

        assertNotNull(document);
        assertTrue(document instanceof PDFDocument);
        assertEquals("Portable Document Format", document.getDocumentType());
        assertEquals(".pdf", document.getFileExtension());
    }

    @Test
    @DisplayName("ExcelDocumentFactory creates an Excel document")
    void excelFactory_createsExcelDocument() {
        DocumentFactory factory = new ExcelDocumentFactory();
        Document document = factory.getDocument();

        assertNotNull(document);
        assertTrue(document instanceof ExcelDocument);
        assertEquals("Microsoft Excel Spreadsheet", document.getDocumentType());
        assertEquals(".xlsx", document.getFileExtension());
    }

    @Test
    @DisplayName("Factories return independent document instances")
    void factory_returnsNewInstanceEachTime() {
        DocumentFactory factory = new WordDocumentFactory();
        Document first = factory.getDocument();
        Document second = factory.getDocument();

        assertNotNull(first);
        assertNotNull(second);
        assertTrue(first != second, "Each call should create a new document instance");
    }
}
