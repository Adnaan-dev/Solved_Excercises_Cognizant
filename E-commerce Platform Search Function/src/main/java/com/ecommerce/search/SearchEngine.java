package com.ecommerce.search;

import java.util.Arrays;
import java.util.Comparator;

/**
 * Search engine demonstrating two classic search algorithms:
 *
 *   - Linear Search  : scans an unsorted array element by element  -> O(n)
 *   - Binary Search  : repeatedly halves a SORTED array            -> O(log n)
 *
 * Products are searched by productName. The engine keeps:
 *   - {@code products}     : the array in its original order (used by linear search)
 *   - {@code sortedByName} : a copy sorted by productName (required by binary search)
 *
 * Each search returns a {@link SearchResult} that also reports how many
 * comparisons were performed, so the difference in complexity is visible.
 */
public class SearchEngine {

    /** Result of a search: the matched product (or null) and the comparison count. */
    public static class SearchResult {
        private final Product product;
        private final int comparisons;

        public SearchResult(Product product, int comparisons) {
            this.product = product;
            this.comparisons = comparisons;
        }

        public Product getProduct() {
            return product;
        }

        public boolean isFound() {
            return product != null;
        }

        public int getComparisons() {
            return comparisons;
        }
    }

    private final Product[] products;       // original order, for linear search
    private final Product[] sortedByName;   // sorted by name, for binary search

    public SearchEngine(Product[] products) {
        // Defensive copies so external changes do not affect the engine.
        this.products = products.clone();
        this.sortedByName = products.clone();
        Arrays.sort(this.sortedByName,
                Comparator.comparing(p -> p.getProductName().toLowerCase()));
    }

    /**
     * Linear Search - checks each element in turn.
     * Best case  : O(1)   (match is the first element)
     * Average    : O(n)
     * Worst case : O(n)   (match is last, or not present)
     */
    public SearchResult linearSearchByName(String name) {
        int comparisons = 0;
        for (Product product : products) {
            comparisons++;
            if (product.getProductName().equalsIgnoreCase(name)) {
                return new SearchResult(product, comparisons);
            }
        }
        return new SearchResult(null, comparisons);
    }

    /**
     * Binary Search - repeatedly halves the sorted array.
     * Requires the array to be sorted by the search key (productName).
     * Best case  : O(1)        (match is at the middle)
     * Average    : O(log n)
     * Worst case : O(log n)
     */
    public SearchResult binarySearchByName(String name) {
        int comparisons = 0;
        int low = 0;
        int high = sortedByName.length - 1;

        while (low <= high) {
            int mid = (low + high) >>> 1; // avoids integer overflow
            comparisons++;
            int cmp = sortedByName[mid].getProductName().compareToIgnoreCase(name);

            if (cmp == 0) {
                return new SearchResult(sortedByName[mid], comparisons);
            } else if (cmp < 0) {
                low = mid + 1;   // search the right half
            } else {
                high = mid - 1;  // search the left half
            }
        }
        return new SearchResult(null, comparisons);
    }

    /** Number of products held by the engine. */
    public int size() {
        return products.length;
    }
}
