package com.finance.forecasting;

/**
 * Test harness for ForecastCalculator (plain Java assertions, no framework needed).
 */
public class ForecastCalculatorTest {

    private static final double EPS = 1e-6;
    private static int testsRun = 0;

    public static void main(String[] args) {
        testBaseCase();
        testMatchesClosedForm();
        testVariableRates();
        testMemoizedMatchesNaive();
        testNegativePeriodsRejected();

        System.out.println("All " + testsRun + " tests passed.");
    }

    /** FV with 0 periods returns the present value unchanged. */
    private static void testBaseCase() {
        assertClose(ForecastCalculator.futureValue(1000, 0.10, 0), 1000,
                "futureValue base case (0 periods)");
    }

    /** Recursive FV must equal the closed form PV * (1+r)^n. */
    private static void testMatchesClosedForm() {
        double pv = 5000, r = 0.07;
        for (int n = 0; n <= 25; n++) {
            double expected = pv * Math.pow(1 + r, n);
            assertClose(ForecastCalculator.futureValue(pv, r, n), expected,
                    "futureValue vs closed form at n=" + n);
        }
    }

    /** Applying rates one-by-one equals multiplying the growth factors. */
    private static void testVariableRates() {
        double pv = 2000;
        double[] rates = {0.05, 0.10, -0.02, 0.08};
        double expected = pv * 1.05 * 1.10 * 0.98 * 1.08;
        assertClose(ForecastCalculator.forecastWithRates(pv, rates, 0), expected,
                "forecastWithRates");
    }

    /** Memoized trend must produce identical results to the naive version. */
    private static void testMemoizedMatchesNaive() {
        double b0 = 100, b1 = 110;
        for (int n = 0; n <= 25; n++) {
            double naive = ForecastCalculator.naiveTrend(n, b0, b1);
            double memo = ForecastCalculator.memoizedTrend(n, b0, b1);
            assertClose(memo, naive, "memoized == naive at n=" + n);
        }
    }

    /** Negative periods are invalid input. */
    private static void testNegativePeriodsRejected() {
        testsRun++;
        try {
            ForecastCalculator.futureValue(1000, 0.05, -1);
            throw new AssertionError("expected IllegalArgumentException for negative periods");
        } catch (IllegalArgumentException expected) {
            // correct behavior
        }
    }

    private static void assertClose(double actual, double expected, String message) {
        testsRun++;
        if (Math.abs(actual - expected) > EPS) {
            throw new AssertionError(message + " -> expected " + expected + " but got " + actual);
        }
    }
}
