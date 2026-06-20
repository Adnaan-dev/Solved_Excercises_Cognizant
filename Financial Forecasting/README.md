# Financial Forecasting (Recursive)

A financial forecasting tool that predicts future values from past data using
**recursive** algorithms.

## Project Structure
```
Financial Forecasting/
├── src/
│   ├── main/java/com/finance/forecasting/
│   │   ├── ForecastCalculator.java   # recursive forecasting methods
│   │   └── ForecastDemo.java         # runnable demonstration
│   └── test/java/com/finance/forecasting/
│       └── ForecastCalculatorTest.java
└── README.md
```

## 1. Understand Recursive Algorithms

**Recursion** is when a method solves a problem by calling itself on a smaller
version of the same problem until it reaches a **base case** that can be answered
directly. Every recursive solution needs two parts:

- **Base case** — the simplest input, solved without further recursion
  (here: `futureValue(..., 0)` returns the present value).
- **Recursive case** — reduces the problem toward the base case
  (here: project one period less, then apply this period's growth).

**Why it simplifies problems:** forecasting is naturally self-referential — the
value next year is "this year's value grown by one period." Recursion expresses
that definition directly:

```
FV(0)       = presentValue
FV(periods) = FV(periods - 1) * (1 + growthRate)
```

This mirrors the mathematical recurrence with almost no extra bookkeeping
(no explicit loop counters or accumulators).

## 2 & 3. Setup and Implementation

`ForecastCalculator` provides:

| Method | Purpose |
|--------|---------|
| `futureValue(pv, rate, periods)` | Compound growth at a **constant** rate, recursively. |
| `forecastWithRates(pv, rates[], index)` | Growth driven by a **series** of per-period rates. |
| `naiveTrend(n, b0, b1)` | A self-similar (Fibonacci-style) trend — intentionally slow. |
| `memoizedTrend(n, b0, b1)` | The same trend, optimized with memoization. |

## 4. Analysis

### Time Complexity

- **`futureValue` and `forecastWithRates`** — these are **linear recursions**:
  each call makes exactly **one** recursive call and reduces the problem by one
  period. So they run in **O(n)** time and use **O(n)** stack space, where `n`
  is the number of periods.

- **`naiveTrend`** — this is a **tree recursion**: each call makes **two**
  recursive calls, recomputing the same subproblems over and over. Its cost grows
  like the Fibonacci sequence, i.e. **O(2ⁿ)** (exponential). At `n = 40` this is
  already billions of calls.

### How to Optimize (avoid excessive computation)

The exponential blow-up comes from **recomputing overlapping subproblems**.
Standard fixes:

1. **Memoization (top-down DP)** — cache each result the first time it is
   computed and reuse it afterward. This is what `memoizedTrend` does, reducing
   `naiveTrend`'s **O(2ⁿ)** down to **O(n)**. The demo shows both producing the
   same answer with a large speedup.
2. **Tabulation / iteration (bottom-up DP)** — replace recursion with a loop,
   giving O(n) time and O(1) space and avoiding stack-overflow risk.
3. **Closed form when one exists** — `futureValue` equals `PV * (1 + rate)^n`,
   computable in O(log n) (or O(1) with `Math.pow`), removing recursion entirely.
4. **Guard the base/edge cases** — validate inputs (negative periods are
   rejected) so recursion always terminates.

The tests confirm the recursive results match the closed-form formula and that
the memoized version produces identical results to the naive one.

## Compile and Run

### Compile
```bash
cd "Financial Forecasting"
mkdir -p bin
javac -d bin src/main/java/com/finance/forecasting/*.java
javac -d bin -cp bin src/test/java/com/finance/forecasting/*.java
```

### Run Demo
```bash
java -cp bin com.finance.forecasting.ForecastDemo
```

### Run Tests
```bash
java -cp bin com.finance.forecasting.ForecastCalculatorTest
```
