package com.ecommerce.search;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * JUnit 5 tests for {@link SearchEngine}. Verifies that linear and binary
 * search return the same, correct results for present and absent products,
 * including case-insensitive matching.
 */
class SearchEngineTest {

    private SearchEngine engine;

    @BeforeEach
    void setUp() {
        Product[] products = {
            new Product(1, "Smartphone", "Electronics"),
            new Product(2, "Smartwatch", "Wearables"),
            new Product(3, "Tablet", "Electronics"),
            new Product(4, "Laptop", "Computers"),
            new Product(5, "Headphones", "Audio")
        };
        engine = new SearchEngine(products);
    }

    @Test
    @DisplayName("Linear search finds existing products")
    void linearSearch_findsExistingProducts() {
        SearchEngine.SearchResult first = engine.linearSearchByName("Smartphone");
        assertTrue(first.isFound());
        assertEquals(1, first.getProduct().getProductId());

        SearchEngine.SearchResult last = engine.linearSearchByName("Headphones");
        assertTrue(last.isFound());
        assertEquals(5, last.getProduct().getProductId());
    }

    @Test
    @DisplayName("Linear search returns not-found for an absent product")
    void linearSearch_returnsNotFoundForAbsentProduct() {
        SearchEngine.SearchResult result = engine.linearSearchByName("Camera");
        assertFalse(result.isFound());
    }

    @Test
    @DisplayName("Binary search finds existing products")
    void binarySearch_findsExistingProducts() {
        SearchEngine.SearchResult phone = engine.binarySearchByName("Smartphone");
        assertTrue(phone.isFound());
        assertEquals(1, phone.getProduct().getProductId());

        SearchEngine.SearchResult laptop = engine.binarySearchByName("Laptop");
        assertTrue(laptop.isFound());
        assertEquals(4, laptop.getProduct().getProductId());
    }

    @Test
    @DisplayName("Binary search returns not-found for an absent product")
    void binarySearch_returnsNotFoundForAbsentProduct() {
        SearchEngine.SearchResult result = engine.binarySearchByName("Camera");
        assertFalse(result.isFound());
    }

    @Test
    @DisplayName("Both algorithms match names case-insensitively")
    void search_isCaseInsensitive() {
        assertTrue(engine.linearSearchByName("tablet").isFound());
        assertEquals(3, engine.linearSearchByName("tablet").getProduct().getProductId());

        assertTrue(engine.binarySearchByName("TABLET").isFound());
        assertEquals(3, engine.binarySearchByName("TABLET").getProduct().getProductId());
    }

    @Test
    @DisplayName("Linear and binary search agree on the same product")
    void linearAndBinary_agree() {
        SearchEngine.SearchResult linear = engine.linearSearchByName("Smartwatch");
        SearchEngine.SearchResult binary = engine.binarySearchByName("Smartwatch");

        assertTrue(linear.isFound());
        assertTrue(binary.isFound());
        assertEquals(linear.getProduct().getProductId(),
                binary.getProduct().getProductId());
    }
}
