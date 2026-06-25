# Factory Method Pattern - Document Management System

## Overview
This project demonstrates the **Factory Method Design Pattern** using a document management system. The Factory Method pattern is a creational design pattern that provides an interface for creating objects, but lets subclasses decide which class to instantiate.

## Project Structure
```
FactoryMethodPattern/
├── src/
│   ├── main/java/com/document/
│   │   ├── models/
│   │   │   ├── Document.java              (Interface)
│   │   │   ├── WordDocument.java          (Concrete Product)
│   │   │   ├── PDFDocument.java           (Concrete Product)
│   │   │   └── ExcelDocument.java         (Concrete Product)
│   │   └── factory/
│   │       ├── DocumentFactory.java              (Abstract Creator)
│   │       ├── WordDocumentFactory.java          (Concrete Creator)
│   │       ├── PDFDocumentFactory.java           (Concrete Creator)
│   │       ├── ExcelDocumentFactory.java         (Concrete Creator)
│   │       └── DocumentFactoryProvider.java      (Utility Factory)
│   └── test/java/com/document/
│       ├── FactoryMethodTest.java                (Basic tests)
│       ├── DocumentFactoryProviderTest.java      (Provider tests)
│       └── DocumentManagementApplication.java    (Real-world example)
├── bin/
└── README.md
```

## Pattern Components

### 1. **Product (Document Interface)**
```java
public interface Document {
    void open();
    void create();
    void save(String filename);
    void close();
    String getDocumentType();
    String getFileExtension();
    void print();
    Date getLastModified();
    String getDocumentInfo();
}
```

### 2. **Concrete Products**
- **WordDocument** - Creates .docx files
- **PDFDocument** - Creates .pdf files
- **ExcelDocument** - Creates .xlsx files

Each implements the Document interface with type-specific behavior.

### 3. **Creator (Abstract Factory)**
```java
public abstract class DocumentFactory {
    public abstract Document createDocument();
    
    public Document getDocument() {
        Document document = createDocument();
        return document;
    }
}
```

### 4. **Concrete Creators**
- **WordDocumentFactory** - Creates WordDocument instances
- **PDFDocumentFactory** - Creates PDFDocument instances
- **ExcelDocumentFactory** - Creates ExcelDocument instances

### 5. **Factory Provider (Utility)**
```java
public class DocumentFactoryProvider {
    public static Document createDocument(DocumentType type) {
        switch (type) {
            case WORD: return new WordDocumentFactory().getDocument();
            case PDF: return new PDFDocumentFactory().getDocument();
            case EXCEL: return new ExcelDocumentFactory().getDocument();
        }
    }
}
```

## Key Benefits

✓ **Loose Coupling**: Client code doesn't depend on concrete document classes
✓ **Easy to Extend**: Adding new document types requires minimal changes
✓ **Centralized Creation**: All object creation logic is in one place
✓ **Flexibility**: The actual class instantiated can be determined at runtime
✓ **Polymorphism**: All documents can be treated uniformly through the interface

## How to Compile and Run

### Compile
```bash
cd FactoryMethodPattern
mkdir -p bin
javac -d bin src/main/java/com/document/models/*.java
javac -d bin src/main/java/com/document/factory/*.java
javac -d bin -cp bin src/test/java/com/document/*.java
```

### Run Tests
```bash
# Basic Factory Method tests
java -cp bin com.document.FactoryMethodTest

# Factory Provider tests
java -cp bin com.document.DocumentFactoryProviderTest

# Real-world application
java -cp bin com.document.DocumentManagementApplication
```

## Pattern Comparison

### Factory Method vs Other Patterns

| Aspect | Factory Method | Abstract Factory | Builder |
|--------|---|---|---|
| Purpose | Create single object | Create families of objects | Build complex objects |
| Complexity | Low | High | Medium |
| Use Case | One product family | Multiple related families | Step-by-step construction |
| **This Project** | ✓ | For multiple product families | When objects are complex |

## Real-World Applications

### ✓ Good Uses

1. **Document Management** (This example)
   - Different document types with common interface

2. **Connection Pooling**
   - Database, HTTP, WebSocket connections

3. **Logger Creation**
   - File logger, Console logger, Network logger

4. **UI Framework**
   - Different button styles, themes

5. **Data Source Creation**
   - JSON, XML, CSV, Database sources

6. **Message Queue Producers**
   - Kafka, RabbitMQ, Azure Service Bus

### ✗ Not Appropriate For

- When object creation is simple
- When only one type of object exists
- When client code directly instantiates objects

## Common Implementation Patterns

### Pattern 1: Using Separate Factory Classes (This Project)
```java
DocumentFactory factory = new WordDocumentFactory();
Document doc = factory.getDocument();
```

**Pros:** Clear separation, easy to extend
**Cons:** More classes to manage

### Pattern 2: Static Factory Method
```java
public class DocumentFactory {
    public static Document createWordDocument() {
        return new WordDocument();
    }
    
    public static Document createPDFDocument() {
        return new PDFDocument();
    }
}
```

**Pros:** Simple, no inheritance needed
**Cons:** Less extensible

### Pattern 3: Using Factory Provider with Enum
```java
Document doc = DocumentFactoryProvider.createDocument(
    DocumentFactoryProvider.DocumentType.WORD);
```

**Pros:** Type-safe, flexible
**Cons:** All types must be known at compile time

## Anti-Patterns to Avoid

### ❌ Violating Single Responsibility
```java
// WRONG - Factory creates and configures
public Document createDocument() {
    Document doc = new WordDocument();
    doc.setFormat("Arial");
    doc.setSize(12);
    return doc;
}
```

✅ **Better:** Separate creation from configuration
```java
public Document createDocument() {
    return new WordDocument();
}

// Configuration done by client
Document doc = factory.createDocument();
doc.configure(config);
```

### ❌ Over-Engineering
```java
// WRONG - Too many layers for simple objects
DocumentFactory -> DocumentFactoryProvider -> DocumentFactoryBuilder
    -> DocumentFactoryRegistry -> ...
```

✅ **Better:** Use simplest pattern that solves the problem

### ❌ Factory Logic in Conditionals
```java
// WRONG - Client code has type switching logic
if (type.equals("WORD")) {
    doc = new WordDocument();
} else if (type.equals("PDF")) {
    doc = new PDFDocument();
}
```

✅ **Better:** Encapsulate logic in factory

## Test Output Example

```
### TEST 1: Basic Factory Method Usage ###

Creating Word document using WordDocumentFactory:
DocumentFactory: Using factory method to create document...
[WORD] Word document instance created
DocumentFactory: Document created successfully

Creating new Word document
...
```

## File Size and Complexity

- **Total Lines of Code:** ~500 (including documentation)
- **Number of Classes:** 10 (3 products, 4 factories, 3 tests)
- **Complexity Level:** Beginner-Friendly (Easy to understand and extend)

## Best Practices

1. **Use Interface/Abstract Class** for products
2. **Separate Creation Logic** from usage
3. **Keep Factories Simple** - focus on object creation
4. **Document Type Requirements** clearly
5. **Provide Multiple Factory Access Patterns** (like DocumentFactoryProvider)
6. **Handle Invalid Types** gracefully
7. **Test Factory Methods** thoroughly

## Extending the Pattern

### Adding New Document Type
1. Create concrete product class
```java
public class PowerPointDocument implements Document { ... }
```

2. Create factory for it
```java
public class PowerPointDocumentFactory extends DocumentFactory { ... }
```

3. Update DocumentFactoryProvider
```java
case POWERPOINT:
    return new PowerPointDocumentFactory().getDocument();
```

That's it! No changes needed to existing code.

## Conclusion

The Factory Method pattern is ideal for:
- Creating objects without specifying their exact classes
- Supporting multiple product types with a common interface
- Making applications extensible without modifying existing code
- Implementing the Open/Closed Principle (open for extension, closed for modification)

This example demonstrates the pattern in a practical, easy-to-understand document management context. 🚀
