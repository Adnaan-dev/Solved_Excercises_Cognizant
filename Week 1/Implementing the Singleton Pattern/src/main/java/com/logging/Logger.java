package com.logging;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Singleton Logger Class
 * 
 * This class demonstrates the Singleton design pattern.
 * It ensures that only one instance of the Logger exists throughout
 * the application lifecycle, providing a centralized logging mechanism.
 * 
 * Multiple approaches are shown:
 * 1. Eager Initialization (below) - Thread-safe by default
 * 2. Lazy Initialization with synchronized method
 * 3. Bill Pugh Singleton with static helper class (most recommended)
 */
public class Logger {
    
    private static final DateTimeFormatter formatter = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    // Approach 1: Eager Initialization (Thread-safe)
    private static final Logger instance = new Logger();
    
    /**
     * Private constructor to prevent instantiation from outside
     * This is the key to the Singleton pattern
     */
    private Logger() {
        System.out.println("Logger instance created at: " + LocalDateTime.now().format(formatter));
    }
    
    /**
     * Public method to get the single instance of Logger
     * 
     * @return the only instance of Logger in the application
     */
    public static Logger getInstance() {
        return instance;
    }
    
    /**
     * Logs an info level message
     * 
     * @param message the message to log
     */
    public void info(String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] [INFO] " + message);
    }
    
    /**
     * Logs a warning level message
     * 
     * @param message the message to log
     */
    public void warning(String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] [WARNING] " + message);
    }
    
    /**
     * Logs an error level message
     * 
     * @param message the message to log
     */
    public void error(String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] [ERROR] " + message);
    }
    
    /**
     * Logs a debug level message
     * 
     * @param message the message to log
     */
    public void debug(String message) {
        String timestamp = LocalDateTime.now().format(formatter);
        System.out.println("[" + timestamp + "] [DEBUG] " + message);
    }
}
