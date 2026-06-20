package com.logging;

/**
 * SingletonTest Class
 * 
 * This class demonstrates and tests the Singleton pattern implementation.
 * It verifies that:
 * 1. Only one instance exists
 * 2. getInstance() always returns the same instance
 * 3. Logging functionality works correctly
 */
public class SingletonTest {
    
    public static void main(String[] args) {
        System.out.println("=== Testing Eager Initialized Logger ===\n");
        testEagerLogger();
        
        System.out.println("\n\n=== Testing Lazy Initialized Logger ===\n");
        testLazyLogger();
        
        System.out.println("\n\n=== Testing Bill Pugh Singleton Logger ===\n");
        testBillPughLogger();
        
        System.out.println("\n\n=== Testing Thread Safety ===\n");
        testThreadSafety();
    }
    
    /**
     * Tests the Eager Initialized Logger Singleton
     */
    private static void testEagerLogger() {
        System.out.println("Getting first instance...");
        Logger logger1 = Logger.getInstance();
        System.out.println("First instance: " + logger1);
        
        System.out.println("\nGetting second instance...");
        Logger logger2 = Logger.getInstance();
        System.out.println("Second instance: " + logger2);
        
        System.out.println("\nAre they the same instance? " + (logger1 == logger2));
        System.out.println("Hash code 1: " + logger1.hashCode());
        System.out.println("Hash code 2: " + logger2.hashCode());
        
        System.out.println("\nTesting logging methods:");
        logger1.info("This is an info message");
        logger2.warning("This is a warning message");
        logger1.error("This is an error message");
        logger2.debug("This is a debug message");
    }
    
    /**
     * Tests the Lazy Initialized Logger Singleton
     */
    private static void testLazyLogger() {
        System.out.println("Getting first instance...");
        LazyLogger logger1 = LazyLogger.getInstance();
        System.out.println("First instance: " + logger1);
        
        System.out.println("\nGetting second instance...");
        LazyLogger logger2 = LazyLogger.getInstance();
        System.out.println("Second instance: " + logger2);
        
        System.out.println("\nAre they the same instance? " + (logger1 == logger2));
        System.out.println("Hash code 1: " + logger1.hashCode());
        System.out.println("Hash code 2: " + logger2.hashCode());
        
        System.out.println("\nTesting logging methods:");
        logger1.info("This is an info message from LazyLogger");
        logger2.warning("This is a warning message from LazyLogger");
    }
    
    /**
     * Tests the Bill Pugh Singleton Logger
     */
    private static void testBillPughLogger() {
        System.out.println("Getting first instance...");
        BillPughLogger logger1 = BillPughLogger.getInstance();
        System.out.println("First instance: " + logger1);
        
        System.out.println("\nGetting second instance...");
        BillPughLogger logger2 = BillPughLogger.getInstance();
        System.out.println("Second instance: " + logger2);
        
        System.out.println("\nAre they the same instance? " + (logger1 == logger2));
        System.out.println("Hash code 1: " + logger1.hashCode());
        System.out.println("Hash code 2: " + logger2.hashCode());
        
        System.out.println("\nTesting logging methods:");
        logger1.info("This is an info message from BillPughLogger");
        logger2.warning("This is a warning message from BillPughLogger");
    }
    
    /**
     * Tests Thread Safety of the Singleton
     * Demonstrates that multiple threads get the same instance
     */
    private static void testThreadSafety() {
        System.out.println("Creating 5 threads to test thread safety...\n");
        
        Thread[] threads = new Thread[5];
        
        for (int i = 0; i < 5; i++) {
            final int threadNumber = i + 1;
            threads[i] = new Thread(() -> {
                Logger logger = Logger.getInstance();
                logger.info("Thread " + threadNumber + " - Instance: " + logger);
                logger.info("Thread " + threadNumber + " - Hash code: " + logger.hashCode());
            });
        }
        
        // Start all threads
        for (Thread thread : threads) {
            thread.start();
        }
        
        // Wait for all threads to complete
        for (Thread thread : threads) {
            try {
                thread.join();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        
        System.out.println("\nAll threads completed. All threads should have the same hash code.");
    }
}
