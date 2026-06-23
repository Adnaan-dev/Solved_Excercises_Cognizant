package com.document;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;

import com.document.factory.DocumentFactoryProvider;
import com.document.models.Document;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * JUnit 5 tests for {@link DocumentFactoryProvider} - the static utility that
 * creates documents by enum or by type name.
 */
class DocumentFactoryProviderTest {

    @Test
    @DisplayName("Create documents using the DocumentType enum")
    void createByEnum_returnsCorrectDocuments() {
        Document word = DocumentFactoryProvider.createDocument(
                DocumentFactoryProvider.DocumentType.WORD);
        assertNotNull(word);
        assertEquals(".docx", word.getFileExtension());

        Document pdf = DocumentFactoryProvider.createDocument(
                DocumentFactoryProvider.DocumentType.PDF);
        assertNotNull(pdf);
        assertEquals(".pdf", pdf.getFileExtension());

        Document excel = DocumentFactoryProvider.createDocument(
                DocumentFactoryProvider.DocumentType.EXCEL);
        assertNotNull(excel);
        assertEquals(".xlsx", excel.getFileExtension());
    }

    @Test
    @DisplayName("Create documents by type name (case-insensitive)")
    void createByName_isCaseInsensitive() {
        assertEquals(".docx",
                DocumentFactoryProvider.createDocument("word").getFileExtension());
        assertEquals(".pdf",
                DocumentFactoryProvider.createDocument("PDF").getFileExtension());
        assertEquals(".xlsx",
                DocumentFactoryProvider.createDocument("Excel").getFileExtension());
    }

    @Test
    @DisplayName("An unknown type name throws IllegalArgumentException")
    void createByName_unknownType_throws() {
        assertThrows(IllegalArgumentException.class,
                () -> DocumentFactoryProvider.createDocument("JSON"));
        assertThrows(IllegalArgumentException.class,
                () -> DocumentFactoryProvider.createDocument("POWERPOINT"));
    }
}
