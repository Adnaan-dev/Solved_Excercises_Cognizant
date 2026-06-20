package com.logging;

/**
 * Practical Application Example
 * 
 * This class demonstrates how to use the Singleton Logger
 * in a real-world application scenario.
 */
public class ApplicationExample {
    
    public static void main(String[] args) {
        Logger logger = Logger.getInstance();
        
        logger.info("=== Application Started ===");
        
        // Simulate different modules using the same logger
        UserService userService = new UserService();
        ProductService productService = new ProductService();
        OrderService orderService = new OrderService();
        
        logger.info("=== Executing User Operations ===");
        userService.createUser("John Doe");
        userService.updateUser("John Doe", "john.doe@example.com");
        
        logger.info("=== Executing Product Operations ===");
        productService.addProduct("Laptop", 999.99);
        productService.listProducts();
        
        logger.info("=== Executing Order Operations ===");
        orderService.placeOrder("John Doe", "Laptop");
        
        logger.info("=== Application Completed Successfully ===");
    }
    
    /**
     * UserService demonstrating Singleton Logger usage
     */
    static class UserService {
        private Logger logger = Logger.getInstance();
        
        public void createUser(String userName) {
            logger.info("Creating user: " + userName);
        }
        
        public void updateUser(String userName, String email) {
            logger.info("Updating user: " + userName + " with email: " + email);
        }
    }
    
    /**
     * ProductService demonstrating Singleton Logger usage
     */
    static class ProductService {
        private Logger logger = Logger.getInstance();
        
        public void addProduct(String productName, double price) {
            logger.info("Adding product: " + productName + " with price: $" + price);
        }
        
        public void listProducts() {
            logger.info("Listing all products");
        }
    }
    
    /**
     * OrderService demonstrating Singleton Logger usage
     */
    static class OrderService {
        private Logger logger = Logger.getInstance();
        
        public void placeOrder(String userName, String productName) {
            logger.info("Placing order for user: " + userName + ", product: " + productName);
            
            try {
                // Simulate order processing
                Thread.sleep(1000);
                logger.info("Order placed successfully for: " + userName);
            } catch (InterruptedException e) {
                logger.error("Error placing order: " + e.getMessage());
            }
        }
    }
}
