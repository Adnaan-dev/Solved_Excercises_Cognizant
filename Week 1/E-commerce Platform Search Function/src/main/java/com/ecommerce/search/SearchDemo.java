package com.ecommerce.search;

/**
 * Demo application that runs both search algorithms and shows the
 * number of comparisons each one performs, illustrating O(n) vs O(log n).
 */
public class SearchDemo {

    public static void main(String[] args) {
        Product[] products = {
            new Product(1, "Wireless Mouse", "Electronics"),
            new Product(2, "Laptop Sleeve", "Accessories"),
            new Product(3, "Bluetooth Headphones", "Audio"),
            new Product(4, "Office Chair", "Furniture"),
            new Product(5, "USB-C Hub", "Electronics"),
            new Product(6, "Mechanical Keyboard", "Electronics"),
            new Product(7, "Standing Desk", "Furniture"),
            new Product(8, "Webcam", "Electronics")
        };

        SearchEngine engine = new SearchEngine(products);

        System.out.println("Catalog size: " + engine.size() + " products\n");

        runComparison(engine, "Office Chair");   // present
        runComparison(engine, "Webcam");         // present (last in original order)
        runComparison(engine, "Tablet");         // absent
    }

    private static void runComparison(SearchEngine engine, String name) {
        System.out.println("Searching for: \"" + name + "\"");

        SearchEngine.SearchResult linear = engine.linearSearchByName(name);
        SearchEngine.SearchResult binary = engine.binarySearchByName(name);

        System.out.printf("  Linear search : %-9s (%d comparisons)%n",
                linear.isFound() ? "FOUND" : "NOT FOUND", linear.getComparisons());
        System.out.printf("  Binary search : %-9s (%d comparisons)%n",
                binary.isFound() ? "FOUND" : "NOT FOUND", binary.getComparisons());
        System.out.println();
    }
}
