package com.logging;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Lazy Initialized Singleton Logger
 * 
 * This class demonstrates lazy initialization of the Singleton pattern.
 * The instance is created only when first requested.
 * Thread-safe using synchronized method.
 */
public class LazyLogger {
    
    // Instance not initialized at class loading time
    private static LazyLogger instance = null;
    
    private static final DateTimeFormatter formatter = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    /**
     * Private constructor to prevent instantiation from outside
     */
    private LazyLogger() {
        System.out.println("LazyLogger instance created at: " + LocalDateTime.now().format(formatter));
    }
    
    /**
     * Synchronized method to get the single instance (Thread-safe but slower)
     * 
     * @return the only instance of LazyLogger in the application
     */
    public static synchronized LazyLogger getInstance() {
        if (instance == null) {
            instance = new LazyLogger();
        }
        return instance;
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
