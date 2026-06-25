package com.finance.forecasting;

import java.util.HashMap;
import java.util.Map;

/**
 * Recursive financial forecasting utilities.
 *
 * Demonstrates three recursive techniques:
 *   1. {@link #futureValue}          - compound growth at a constant rate  (linear recursion, O(n))
 *   2. {@link #forecastWithRates}    - growth driven by a series of rates  (linear recursion, O(n))
 *   3. {@link #naiveTrend} vs        - a self-similar (Fibonacci-style) trend that shows how a
 *      {@link #memoizedTrend}          naive recursion explodes to O(2^n) and how memoization
 *                                      brings it back down to O(n).
 */
public final class ForecastCalculator {

    private ForecastCalculator() {
        // utility class - no instances
    }

    /**
     * Future value with a constant periodic growth rate, computed recursively.
     *
     * FV(0)         = presentValue
     * FV(periods)   = FV(periods - 1) * (1 + growthRate)
     *
     * Equivalent closed form: presentValue * (1 + growthRate)^periods.
     *
     * Time:  O(n)  (one multiplication per period)
     * Space: O(n)  (call-stack depth)
     *
     * @param presentValue value today (must be >= 0 for a meaningful forecast)
     * @param growthRate   periodic growth rate as a decimal (e.g. 0.08 for 8%)
     * @param periods      number of periods to project forward (must be >= 0)
     * @return projected future value
     */
    public static double futureValue(double presentValue, double growthRate, int periods) {
        if (periods < 0) {
            throw new IllegalArgumentException("periods must be >= 0, got " + periods);
        }
        // Base case: no more periods to project.
        if (periods == 0) {
            return presentValue;
        }
        // Recursive case: project one period less, then apply this period's growth.
        return futureValue(presentValue, growthRate, periods - 1) * (1 + growthRate);
    }

    /**
     * Forecast using a different growth rate for each period, applied recursively
     * from the present value through every rate in the array.
     *
     * Time:  O(n) where n = rates.length
     * Space: O(n)
     *
     * @param presentValue value today
     * @param rates        per-period growth rates (decimals)
     * @param index        starting index (call with 0)
     * @return projected value after applying all rates
     */
    public static double forecastWithRates(double presentValue, double[] rates, int index) {
        if (rates == null) {
            throw new IllegalArgumentException("rates must not be null");
        }
        // Base case: all rates consumed.
        if (index == rates.length) {
            return presentValue;
        }
        // Apply the current period's growth, then recurse on the rest.
        return forecastWithRates(presentValue * (1 + rates[index]), rates, index + 1);
    }

    /**
     * NAIVE self-similar trend forecast.
     *
     * Models a trend where each period's value is the sum of the two previous
     * periods (a Fibonacci-style growth often used to illustrate recursion):
     *
     *   value(0) = base0
     *   value(1) = base1
     *   value(n) = value(n-1) + value(n-2)
     *
     * Because it recomputes the same subproblems repeatedly, this version is
     * EXPONENTIAL: Time O(2^n). It is included to demonstrate the problem that
     * the memoized version below fixes.
     */
    public static double naiveTrend(int n, double base0, double base1) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be >= 0, got " + n);
        }
        if (n == 0) {
            return base0;
        }
        if (n == 1) {
            return base1;
        }
        return naiveTrend(n - 1, base0, base1) + naiveTrend(n - 2, base0, base1);
    }

    /**
     * OPTIMIZED self-similar trend forecast using memoization (top-down DP).
     *
     * Each value(n) is computed once and cached, so the same subproblem is never
     * recomputed. This reduces the cost from O(2^n) to O(n).
     *
     * @param memo a cache mapping period -> value (pass a fresh map, e.g. new HashMap<>())
     */
    public static double memoizedTrend(int n, double base0, double base1, Map<Integer, Double> memo) {
        if (n < 0) {
            throw new IllegalArgumentException("n must be >= 0, got " + n);
        }
        if (n == 0) {
            return base0;
        }
        if (n == 1) {
            return base1;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);   // already computed - reuse it
        }
        double result = memoizedTrend(n - 1, base0, base1, memo)
                      + memoizedTrend(n - 2, base0, base1, memo);
        memo.put(n, result);
        return result;
    }

    /** Convenience overload that allocates the memo cache for the caller. */
    public static double memoizedTrend(int n, double base0, double base1) {
        return memoizedTrend(n, base0, base1, new HashMap<>());
    }
}
