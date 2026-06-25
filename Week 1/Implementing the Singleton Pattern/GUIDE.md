# Singleton Pattern - Complete Implementation Guide

## Exercise Summary

This exercise implements the **Singleton Design Pattern** for a logging utility. The Singleton pattern is a creational design pattern that restricts the instantiation of a class to a single object and provides a global point of access to it.

---

## Step 1: Create a New Java Project

**Directory Structure:**
```
SingletonPattern/
├── src/
│   ├── main/java/com/logging/
│   │   ├── Logger.java
│   │   ├── LazyLogger.java
│   │   └── BillPughLogger.java
│   └── test/java/com/logging/
│       ├── SingletonTest.java
│       └── ApplicationExample.java
├── bin/
├── README.md
└── GUIDE.md (this file)
```

---

## Step 2: Define a Singleton Class

A proper Singleton class must have:

1. **Private Constructor**
   ```java
   private Logger() { }
   ```
   - Prevents external instantiation
   - Ensures no other class can call `new Logger()`

2. **Static Instance Variable**
   ```java
   private static final Logger instance = new Logger();
   ```
   - Holds the single instance
   - Made `final` for thread safety

3. **Public Static Getter Method**
   ```java
   public static Logger getInstance() {
       return instance;
   }
   ```
   - Provides global access to the instance
   - Always returns the same instance

---

## Step 3: Implement the Singleton Pattern

We implemented three approaches:

### Approach 1: Eager Initialization
```java
public class Logger {
    private static final DateTimeFormatter formatter = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    
    private static final Logger instance = new Logger();
    
    private Logger() {
        System.out.println("Logger instance created");
    }
    
    public static Logger getInstance() {
        return instance;
    }
    
    public void info(String message) {
        // logging implementation
    }
}
```

**When to use:**
- Object is always needed
- Creation is lightweight
- Simplicity is important

### Approach 2: Lazy Initialization (Thread-Safe)
```java
public class LazyLogger {
    private static LazyLogger instance = null;
    
    private LazyLogger() { }
    
    public static synchronized LazyLogger getInstance() {
        if (instance == null) {
            instance = new LazyLogger();
        }
        return instance;
    }
}
```

**When to use:**
- Object might not be needed
- Need to avoid unnecessary creation
- (Limited thread safety needed)

### Approach 3: Bill Pugh (RECOMMENDED)
```java
public class BillPughLogger {
    private BillPughLogger() { }
    
    private static class SingletonHelper {
        private static final BillPughLogger INSTANCE = new BillPughLogger();
    }
    
    public static BillPughLogger getInstance() {
        return SingletonHelper.INSTANCE;
    }
}
```

**When to use:**
- Need lazy initialization AND thread safety
- Want best performance
- Working on large-scale applications

---

## Step 4: Test the Singleton Implementation

### Test 1: Verify Single Instance
```java
Logger logger1 = Logger.getInstance();
Logger logger2 = Logger.getInstance();
System.out.println(logger1 == logger2);  // true
System.out.println(logger1.hashCode() == logger2.hashCode());  // true
```

### Test 2: Verify Functionality
```java
Logger logger = Logger.getInstance();
logger.info("Application started");
logger.warning("Check disk space");
logger.error("Connection failed");
```

### Test 3: Verify Thread Safety
```java
for (int i = 0; i < 5; i++) {
    new Thread(() -> {
        Logger logger = Logger.getInstance();
        logger.info("Thread: " + Thread.currentThread().getName());
    }).start();
}
```
All threads should access the same instance.

---

## Common Mistakes and Solutions

### ❌ Mistake 1: Public Constructor
```java
// WRONG
public Logger() { }

Logger l1 = new Logger();
Logger l2 = new Logger();  // Different instances!
```

✅ **Solution:** Always use private constructor

### ❌ Mistake 2: Creating Instance Inside getInstance()
```java
// WRONG - Creates new instance on each call
public static Logger getInstance() {
    return new Logger();
}
```

✅ **Solution:** Create instance once as static field

### ❌ Mistake 3: Forgetting Thread Safety in Lazy Approach
```java
// WRONG - Not thread-safe
private static Logger instance;

public static Logger getInstance() {
    if (instance == null) {
        instance = new Logger();  // Race condition!
    }
    return instance;
}
```

✅ **Solution:** Use synchronized or Bill Pugh pattern

### ❌ Mistake 4: Reflection Attack
```java
// Can break singleton
Constructor<?> constructor = Logger.class.getDeclaredConstructor();
constructor.setAccessible(true);
Logger logger = (Logger) constructor.newInstance();  // New instance!
```

✅ **Solution:** Add check in constructor
```java
private Logger() {
    if (instance != null) {
        throw new IllegalStateException("Instance already exists");
    }
}
```

### ❌ Mistake 5: Serialization Issue
```java
// Breaks singleton after deserialization
Logger logger = Logger.getInstance();
byte[] data = serialize(logger);
Logger logger2 = deserialize(data);  // Different instance!
```

✅ **Solution:** Implement readResolve()
```java
protected Object readResolve() {
    return getInstance();
}
```

---

## Anti-Patterns to Avoid

### 1. Excessive Use of Singleton
- Don't make every utility a singleton
- Use dependency injection instead
- Makes testing harder

### 2. Hiding Dependencies
```java
// BAD - Hidden dependency
public class UserService {
    private Logger logger = Logger.getInstance();
}
```

✅ **GOOD - Explicit dependency injection**
```java
public class UserService {
    private Logger logger;
    
    public UserService(Logger logger) {
        this.logger = logger;
    }
}
```

### 3. Singleton as Global State
```java
// BAD - Uncontrolled global state
Logger.getInstance().setState("debug");  // Affects entire app
```

### 4. Singleton for Objects with Mutable State
```java
// BAD - Thread-safety issues
Logger logger = Logger.getInstance();
logger.setLevel(VERBOSE);  // Affects all users
```

---

## Testing Singleton Classes

### Unit Test Example
```java
@Test
public void testSingletonInstance() {
    Logger logger1 = Logger.getInstance();
    Logger logger2 = Logger.getInstance();
    
    assertSame(logger1, logger2);
    assertEquals(logger1.hashCode(), logger2.hashCode());
}

@Test
public void testThreadSafety() throws InterruptedException {
    Logger[] loggers = new Logger[10];
    
    for (int i = 0; i < 10; i++) {
        new Thread(() -> {
            loggers[i] = Logger.getInstance();
        }).start();
    }
    
    Thread.sleep(1000);
    
    for (int i = 1; i < 10; i++) {
        assertSame(loggers[0], loggers[i]);
    }
}
```

---

## Performance Comparison

| Metric | Eager | Lazy (Sync) | Bill Pugh |
|--------|-------|------------|----------|
| First Access | Created at load | Created on first call | Created on first call |
| Subsequent Access | O(1) | O(1) sync | O(1) |
| Memory Usage | Immediate | On-demand | On-demand |
| Thread Safety | Yes (JVM) | Yes (lock) | Yes (JVM) |
| Synchronization | No | Every call | Only first call |
| **Recommended Use** | Simple apps | Limited | **Best for all** |

---

## Real-World Applications

### ✓ Good Uses for Singleton

1. **Logging Framework** (This example)
   ```java
   Logger logger = Logger.getInstance();
   logger.info("Application event");
   ```

2. **Configuration Manager**
   ```java
   AppConfig config = AppConfig.getInstance();
   String dbUrl = config.getDatabaseUrl();
   ```

3. **Database Connection Pool**
   ```java
   ConnectionPool pool = ConnectionPool.getInstance();
   Connection conn = pool.getConnection();
   ```

4. **Thread Pool**
   ```java
   ExecutorService executor = ThreadPool.getInstance().getExecutor();
   executor.execute(task);
   ```

5. **Application Cache**
   ```java
   Cache cache = Cache.getInstance();
   cache.put("key", value);
   ```

### ✗ Bad Uses for Singleton

- ❌ Business objects with multiple instances needed
- ❌ Objects that maintain user-specific state
- ❌ Testing utilities (makes mocking difficult)
- ❌ Objects that need configuration per use

---

## Dependency Injection Alternative

Instead of:
```java
public class UserService {
    public void createUser(User user) {
        Logger logger = Logger.getInstance();  // Tightly coupled
        logger.info("Creating user...");
    }
}
```

Consider:
```java
public class UserService {
    private final Logger logger;
    
    public UserService(Logger logger) {
        this.logger = logger;  // Loosely coupled
    }
    
    public void createUser(User user) {
        logger.info("Creating user...");
    }
}
```

**Benefits:**
- Easier to test (can inject mock logger)
- More flexible
- Better separation of concerns
- Follows SOLID principles

---

## Conclusion

The **Singleton Pattern** is essential for ensuring a single instance of resource-intensive or centralized components. Key takeaways:

✅ Use **Eager Initialization** for simple, always-needed objects

✅ Use **Bill Pugh Pattern** for most production code (best performance + lazy loading)

✅ Avoid **Lazy with Synchronization** (performance overhead)

✅ Test thoroughly for **thread safety**

✅ Consider **Dependency Injection** as an alternative for better testability

✅ Implement **readResolve()** if your singleton is serializable

---

## Files in This Exercise

1. **Logger.java** - Eager initialization (simplest)
2. **LazyLogger.java** - Lazy with synchronization
3. **BillPughLogger.java** - Bill Pugh (recommended)
4. **SingletonTest.java** - Comprehensive test suite
5. **ApplicationExample.java** - Real-world usage
6. **README.md** - Quick reference guide
7. **GUIDE.md** - This detailed guide

---

Happy Learning! 🚀
