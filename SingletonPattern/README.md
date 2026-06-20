# Singleton Pattern Implementation - Logging Utility

## Overview
This project demonstrates the **Singleton Design Pattern** using a logging utility class. The Singleton pattern ensures that a class has only one instance throughout the application lifecycle and provides a global point of access to that instance.

## Why Use Singleton for Logging?
- **Single Instance**: Only one logger instance exists, ensuring consistent logging behavior
- **Global Access**: Any class can easily access the logger via `getInstance()`
- **Resource Efficiency**: Avoids creating multiple logger instances unnecessarily
- **Centralized State**: All logs are handled by the same instance

## Project Structure
```
SingletonPattern/
├── src/
│   ├── main/java/com/logging/
│   │   ├── Logger.java              (Eager Initialization)
│   │   ├── LazyLogger.java          (Lazy Initialization with sync)
│   │   └── BillPughLogger.java      (Bill Pugh Implementation)
│   └── test/java/com/logging/
│       └── SingletonTest.java       (Test and demonstration)
└── README.md
```

## Three Singleton Implementations

### 1. **Logger - Eager Initialization (Thread-Safe by Default)**

```java
private static final Logger instance = new Logger();

private Logger() { }

public static Logger getInstance() {
    return instance;
}
```

**Characteristics:**
- Instance created when class loads
- Thread-safe by default (JVM guarantees)
- Simple and straightforward
- Useful when the object is always needed or creation is not expensive

**Pros:**
- Simple to understand and implement
- Thread-safe
- No synchronization overhead

**Cons:**
- Instance is created even if never used (memory waste)
- No lazy loading

### 2. **LazyLogger - Lazy Initialization with Synchronization**

```java
private static LazyLogger instance = null;

private LazyLogger() { }

public static synchronized LazyLogger getInstance() {
    if (instance == null) {
        instance = new LazyLogger();
    }
    return instance;
}
```

**Characteristics:**
- Instance created only when first requested
- Thread-safe using `synchronized` keyword
- Every call to `getInstance()` acquires a lock

**Pros:**
- Lazy loading (instance created only when needed)
- Thread-safe

**Cons:**
- Performance overhead due to synchronization
- Lock acquired on every call, not just creation

### 3. **BillPughLogger - Bill Pugh Implementation (RECOMMENDED)**

```java
private BillPughLogger() { }

private static class SingletonHelper {
    private static final BillPughLogger INSTANCE = new BillPughLogger();
}

public static BillPughLogger getInstance() {
    return SingletonHelper.INSTANCE;
}
```

**Characteristics:**
- Lazy initialization without synchronization
- Uses inner static helper class
- Inner class loaded only when `getInstance()` is called
- JVM guarantees thread-safety during class loading

**Pros:**
- Lazy loading
- Thread-safe without synchronization overhead
- Best performance among all approaches
- Most elegant solution

**Cons:**
- Slightly more complex than eager initialization

## How to Compile and Run

### Using Command Line:

```bash
# Navigate to the project directory
cd SingletonPattern

# Compile
javac -d bin src/main/java/com/logging/*.java
javac -d bin -cp bin src/test/java/com/logging/*.java

# Run the test
java -cp bin com.logging.SingletonTest
```

### Using an IDE (IntelliJ, Eclipse, VS Code):
1. Open the project
2. Right-click on `SingletonTest.java`
3. Select "Run SingletonTest"

## Test Output Explanation

The `SingletonTest` class demonstrates:

1. **Instance Equality**: Shows that multiple calls to `getInstance()` return the same object
   - `logger1 == logger2` returns `true`
   - Both have the same hash code

2. **Logging Functionality**: Tests the logging methods with different severity levels
   - Info, Warning, Error, and Debug messages

3. **Thread Safety**: Creates multiple threads to verify that all threads get the same instance
   - All threads log with the same instance
   - All threads have the same hash code

## Key Points to Remember

✓ **Private Constructor**: Prevents instantiation from outside
✓ **Static Instance**: Holds the single instance
✓ **getInstance()**: Public static method to access the instance
✓ **Thread-Safe**: Implementation should be thread-safe
✓ **Single Instance**: Only one instance exists throughout application lifecycle

## Common Issues and Solutions

### Issue 1: Multiple Instances Created
**Problem**: Each `getInstance()` call creates a new instance
**Solution**: Ensure static instance is initialized once

### Issue 2: Thread Safety Issues
**Problem**: Different threads get different instances in concurrent access
**Solution**: Use synchronization or Bill Pugh pattern

### Issue 3: Reflection Attack
**Problem**: Reflection can break the singleton pattern
**Solution**: Throw exception in private constructor

```java
private Logger() {
    if (instance != null) {
        throw new IllegalStateException("Already initialized");
    }
}
```

### Issue 4: Serialization Issue
**Problem**: Deserializing creates a new instance
**Solution**: Implement `readResolve()` method

```java
protected Object readResolve() {
    return getInstance();
}
```

## Comparison Table

| Feature | Eager | Lazy (Sync) | Bill Pugh |
|---------|-------|------------|----------|
| Thread-Safe | ✓ | ✓ | ✓ |
| Lazy Loading | ✗ | ✓ | ✓ |
| Synchronization | ✗ | ✓ | ✗ |
| Performance | Good | Fair | Excellent |
| Complexity | Low | Low | Medium |
| **Recommended** | For simple cases | Rarely | **Yes** |

## Real-World Use Cases

1. **Logging**: Database connections, file handles, thread pools
2. **Configuration Managers**: Application settings
3. **Thread Pools**: Resource management
4. **Caches**: In-memory caching systems
5. **GUI Frameworks**: Single instance of application window

## When NOT to Use Singleton

- When you need multiple configurations
- When testing requires dependency injection
- When dealing with multiple instances for scalability
- Global state management (use with caution)

## Conclusion

The Singleton pattern is useful for ensuring a single instance throughout the application lifecycle. Among the three implementations:

- Use **Eager** for simple cases where the object is always needed
- Avoid **Lazy (Sync)** due to synchronization overhead
- Use **Bill Pugh** for most cases - it's the best balance of laziness and performance

Happy coding! 🚀
