# E-commerce Platform Search Function

## Overview
This project implements and compares two classic search algorithms for an
e-commerce product catalog: **linear search** and **binary search**. Products
are searched by `productName`.

## Project Structure
```
E-commerce Platform Search Function/
├── src/
│   ├── main/java/com/ecommerce/search/
│   │   ├── Product.java         # productId, productName, category
│   │   ├── SearchEngine.java    # linear + binary search
│   │   └── SearchDemo.java      # runs both and counts comparisons
│   └── test/java/com/ecommerce/search/
│       └── SearchEngineTest.java
└── README.md
```

## 1. Understand Asymptotic Notation

**Big O notation** describes how an algorithm's running time (or memory) grows
as the input size `n` grows, ignoring constant factors and lower-order terms.
It lets us compare algorithms independently of hardware and focus on
scalability — how the cost behaves as the catalog gets large.

**Search scenarios:**

| Scenario | Meaning | Linear Search | Binary Search |
|----------|---------|---------------|---------------|
| Best case | Fewest comparisons | `O(1)` — match is first element | `O(1)` — match is the middle element |
| Average case | Typical input | `O(n)` | `O(log n)` |
| Worst case | Most comparisons | `O(n)` — match last / absent | `O(log n)` — match absent |

## 2. Setup
`Product` holds the searchable attributes `productId`, `productName` and
`category`.

## 3. Implementation
- **Linear search** (`linearSearchByName`) scans the array element by element.
  Works on data in any order.
- **Binary search** (`binarySearchByName`) requires a **sorted** array. The
  engine keeps a copy sorted by `productName` and repeatedly halves the search
  range.
- Each search returns a `SearchResult` reporting whether the product was found
  and how many comparisons it took, making the complexity difference visible.

## 4. Analysis

- **Linear search — O(n):** simple, needs no sorting, works on unsorted data,
  but cost grows linearly with catalog size. For 1,000,000 products a missing
  item costs up to 1,000,000 comparisons.
- **Binary search — O(log n):** dramatically faster, but the data must be kept
  sorted by the search key. For 1,000,000 products it takes at most ~20
  comparisons.

**Which is more suitable for the platform?**
For a large, relatively stable product catalog that is read (searched) far more
often than it changes, **binary search** is the better choice: keep the catalog
sorted by the search key once, then enjoy `O(log n)` lookups. Linear search is
only preferable for very small catalogs or data that changes so frequently that
maintaining sort order is not worthwhile. In practice, production e-commerce
platforms go a step further and use indexed structures (hash maps / inverted
indexes / search engines like Elasticsearch) for `O(1)`–`O(log n)` lookups,
which build on the same asymptotic reasoning shown here.

## Compile and Run

### Compile
```bash
cd "E-commerce Platform Search Function"
mkdir -p bin
javac -d bin src/main/java/com/ecommerce/search/*.java
javac -d bin -cp bin src/test/java/com/ecommerce/search/*.java
```

### Run Demo
```bash
java -cp bin com.ecommerce.search.SearchDemo
```

### Run Test
```bash
java -cp bin com.ecommerce.search.SearchEngineTest
```
