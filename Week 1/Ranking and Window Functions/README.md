# SQL Exercise - Advanced Concepts: Ranking & Window Functions

**Goal:** Use `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `OVER()`, and
`PARTITION BY`.

**Scenario:** Find the top 3 most expensive products in each category and
compare how the different ranking functions behave.

## Files
- `ranking_window_functions.sql` — table setup, sample data, and all queries.

## Key Concepts

### `OVER()` and `PARTITION BY`
A **window function** performs a calculation across a set of rows (a "window")
related to the current row, *without collapsing* them like `GROUP BY` does.

- `OVER (...)` defines the window.
- `PARTITION BY Category` restarts the calculation for each category.
- `ORDER BY Price DESC` sets the ordering used to assign ranks (most expensive
  first).

```sql
ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC)
```

### The three ranking functions

Given prices `1500, 1200, 1200, 300, 200` within one category:

| Price | ROW_NUMBER | RANK | DENSE_RANK |
|-------|-----------|------|-----------|
| 1500  | 1 | 1 | 1 |
| 1200  | 2 | 2 | 2 |
| 1200  | 3 | 2 | 2 |
| 300   | 4 | 4 | 3 |
| 200   | 5 | 5 | 4 |

- **`ROW_NUMBER()`** — always unique, sequential, no gaps. Ties are broken
  arbitrarily (add a tie-breaker column for deterministic results).
- **`RANK()`** — tied rows share the same rank, then the next rank **skips**
  (…2, 2, **4**…), leaving gaps.
- **`DENSE_RANK()`** — tied rows share the same rank, and the next rank does
  **not** skip (…2, 2, **3**…), no gaps.

## Top 3 per category — which function to use?

- Use **`ROW_NUMBER() ... WHERE rn <= 3`** when you want **exactly 3 rows** per
  category (ties broken by a tie-breaker).
- Use **`DENSE_RANK() ... WHERE dr <= 3`** when you want the **top 3 price
  levels**, which may return more than 3 rows if products tie at the 3rd price.

A window function can't appear in a `WHERE` clause directly, so both top-3
queries wrap the ranking in a **CTE** and filter on the computed rank.

## How to Run

These queries use standard SQL window functions, supported by:
- SQL Server 2012+
- PostgreSQL (all modern versions)
- MySQL 8.0+
- SQLite 3.25+
- Oracle

Open the `.sql` file in your database client (SSMS, Azure Data Studio,
psql, DBeaver, etc.) and execute it top to bottom. The `CREATE TABLE` /
`INSERT` statements set up the sample data first, then each `SELECT`
demonstrates a step of the exercise.
