package com.ecommerce.search;

/**
 * Test harness for the SearchEngine. Verifies that linear and binary
 * search return the same, correct results for present and absent products.
 */
public class SearchEngineTest {

    private static int testsRun = 0;

    public static void main(String[] args) {
        Product[] products = {
            new Product(1, "Smartphone", "Electronics"),
            new Product(2, "Smartwatch", "Wearables"),
            new Product(3, "Tablet", "Electronics"),
            new Product(4, "Laptop", "Computers"),
            new Product(5, "Headphones", "Audio")
        };

        SearchEngine engine = new SearchEngine(products);

        // --- Linear search ---
        assertFound(engine.linearSearchByName("Smartphone"), 1, "linear: Smartphone");
        assertFound(engine.linearSearchByName("Headphones"), 5, "linear: Headphones");
        assertNotFound(engine.linearSearchByName("Camera"), "linear: Camera (absent)");

        // --- Binary search ---
        assertFound(engine.binarySearchByName("Smartphone"), 1, "binary: Smartphone");
        assertFound(engine.binarySearchByName("Laptop"), 4, "binary: Laptop");
        assertNotFound(engine.binarySearchByName("Camera"), "binary: Camera (absent)");

        // --- Case-insensitive matching ---
        assertFound(engine.linearSearchByName("tablet"), 3, "linear: case-insensitive");
        assertFound(engine.binarySearchByName("TABLET"), 3, "binary: case-insensitive");

        // --- Both algorithms agree ---
        assertSameProduct(
            engine.linearSearchByName("Smartwatch"),
            engine.binarySearchByName("Smartwatch"),
            "linear and binary agree on Smartwatch");

        System.out.println("All " + testsRun + " tests passed.");
    }

    private static void assertFound(SearchEngine.SearchResult result, int expectedId, String message) {
        testsRun++;
        if (!result.isFound()) {
            throw new AssertionError(message + " -> expected a match but found none");
        }
        if (result.getProduct().getProductId() != expectedId) {
            throw new AssertionError(message + " -> expected productId " + expectedId
                    + " but got " + result.getProduct().getProductId());
        }
    }

    private static void assertNotFound(SearchEngine.SearchResult result, String message) {
        testsRun++;
        if (result.isFound()) {
            throw new AssertionError(message + " -> expected no match but found "
                    + result.getProduct());
        }
    }

    private static void assertSameProduct(SearchEngine.SearchResult a,
                                          SearchEngine.SearchResult b, String message) {
        testsRun++;
        if (!a.isFound() || !b.isFound()
                || a.getProduct().getProductId() != b.getProduct().getProductId()) {
            throw new AssertionError(message + " -> results differ");
        }
    }
}
