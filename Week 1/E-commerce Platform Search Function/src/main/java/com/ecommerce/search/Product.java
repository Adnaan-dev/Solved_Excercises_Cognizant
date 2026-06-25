package com.ecommerce.search;

/**
 * Product model for the e-commerce search function.
 *
 * Exposes the attributes the platform searches on:
 * productId, productName and category.
 */
public class Product {

    private final int productId;
    private final String productName;
    private final String category;

    public Product(int productId, String productName, String category) {
        this.productId = productId;
        this.productName = productName;
        this.category = category;
    }

    public int getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public String toString() {
        return String.format("Product{productId=%d, productName='%s', category='%s'}",
                productId, productName, category);
    }
}
