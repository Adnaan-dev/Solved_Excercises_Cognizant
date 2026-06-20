package com.logging;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Bill Pugh Singleton Logger (RECOMMENDED)
 * 
 * This class demonstrates the most recommended Singleton pattern implementation.
 * It uses a static helper class and is thread-safe without synchronization overhead.
 * The inner class is loaded only when getInstance() is called.
 */
public class BillPughLogger {
    
    private static final DateTimeFormatter formatter = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    /**
     * Private constructor to prevent instantiation from outside
     */
    private BillPughLogger() {
        System.out.println("BillPughLogger instance created at: " + LocalDateTime.now().format(formatter));
    }
    
    /**
     * Static helper class - loaded only when getInstance() is called
     * This is the key to the Bill Pugh implementation
     */
    private static class SingletonHelper {
        private static final BillPughLogger INSTANCE = new BillPughLogger();
    }
    
    /**
     * Get the single instance of BillPughLogger
     * Thread-safe and lazy-initialized without synchronization
     * 
     * @return the only instance of BillPughLogger in the application
     */
    public static BillPughLogger getInstance() {
        return SingletonHelper.INSTANCE;
    }
    
    /**
     * Logs an info level message
     */
    public void info(String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] [INFO] " + message);
    }
    
    /**
     * Logs a warning level message
     */
    public void warning(String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] [WARNING] " + message);
    }
    
    /**
     * Logs an error level message
     */
    public void error(String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] [ERROR] " + message);
    }
    
    /**
     * Logs a debug level message
     */
    public void debug(String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] [DEBUG] " + message);
    }
}
