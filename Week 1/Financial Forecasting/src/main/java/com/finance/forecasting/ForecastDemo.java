package com.finance.forecasting;

/**
 * Demo for the recursive financial forecasting tool.
 */
public class ForecastDemo {

    public static void main(String[] args) {
        System.out.println("=".repeat(60));
        System.out.println("FINANCIAL FORECASTING (Recursive)");
        System.out.println("=".repeat(60));

        // 1. Constant-rate compound growth
        double presentValue = 10_000.00;
        double annualRate = 0.08; // 8% per year
        int years = 5;

        System.out.printf("%nProjecting %.2f at %.0f%% for %d years:%n",
                presentValue, annualRate * 100, years);
        for (int year = 0; year <= years; year++) {
            double fv = ForecastCalculator.futureValue(presentValue, annualRate, year);
            System.out.printf("  Year %d: %,.2f%n", year, fv);
        }

        // 2. Forecast with a different rate each year
        double[] rates = {0.05, 0.07, 0.06, 0.10, 0.04};
        double projected = ForecastCalculator.forecastWithRates(presentValue, rates, 0);
        System.out.printf("%nVariable-rate forecast over %d years "
                + "(5%%, 7%%, 6%%, 10%%, 4%%):%n  %,.2f%n", rates.length, projected);

        // 3. Naive vs memoized trend - same answer, very different cost
        System.out.println("\nSelf-similar trend forecast (naive vs memoized):");
        int n = 30;
        double base0 = 100, base1 = 110;

        long t1 = System.nanoTime();
        double naive = ForecastCalculator.naiveTrend(n, base0, base1);
        long t2 = System.nanoTime();
        double memo = ForecastCalculator.memoizedTrend(n, base0, base1);
        long t3 = System.nanoTime();

        System.out.printf("  naiveTrend(%d)    = %,.0f   (took %,d ns)%n", n, naive, (t2 - t1));
        System.out.printf("  memoizedTrend(%d) = %,.0f   (took %,d ns)%n", n, memo, (t3 - t2));
        System.out.printf("  Same result: %b | Memoized speedup: ~%.0fx%n",
                Math.abs(naive - memo) < 1e-6,
                (double) (t2 - t1) / Math.max(1, (t3 - t2)));
    }
}
