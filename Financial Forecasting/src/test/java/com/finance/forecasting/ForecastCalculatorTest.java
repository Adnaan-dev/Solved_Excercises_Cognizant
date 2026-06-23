package com.finance.forecasting;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * JUnit 5 tests for {@link ForecastCalculator}.
 */
class ForecastCalculatorTest {

    private static final double EPS = 1e-6;

    @Test
    @DisplayName("Future value with 0 periods returns the present value unchanged")
    void futureValue_baseCase() {
        assertEquals(1000.0, ForecastCalculator.futureValue(1000, 0.10, 0), EPS);
    }

    @Test
    @DisplayName("Recursive future value equals the closed form PV * (1+r)^n")
    void futureValue_matchesClosedForm() {
        double pv = 5000, r = 0.07;
        for (int n = 0; n <= 25; n++) {
            double expected = pv * Math.pow(1 + r, n);
            assertEquals(expected, ForecastCalculator.futureValue(pv, r, n), EPS,
                    "futureValue vs closed form at n=" + n);
        }
    }

    @Test
    @DisplayName("Applying rates one-by-one equals multiplying the growth factors")
    void forecastWithRates_multipliesGrowthFactors() {
        double pv = 2000;
        double[] rates = {0.05, 0.10, -0.02, 0.08};
        double expected = pv * 1.05 * 1.10 * 0.98 * 1.08;
        assertEquals(expected, ForecastCalculator.forecastWithRates(pv, rates, 0), EPS);
    }

    @Test
    @DisplayName("Memoized trend produces identical results to the naive version")
    void memoizedTrend_matchesNaive() {
        double b0 = 100, b1 = 110;
        for (int n = 0; n <= 25; n++) {
            double naive = ForecastCalculator.naiveTrend(n, b0, b1);
            double memo = ForecastCalculator.memoizedTrend(n, b0, b1);
            assertEquals(naive, memo, EPS, "memoized == naive at n=" + n);
        }
    }

    @Test
    @DisplayName("Negative periods are rejected with IllegalArgumentException")
    void futureValue_negativePeriodsRejected() {
        assertThrows(IllegalArgumentException.class,
                () -> ForecastCalculator.futureValue(1000, 0.05, -1));
    }
}
