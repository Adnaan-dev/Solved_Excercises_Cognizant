package com.logging;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;

import java.util.Collections;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

/**
 * JUnit 5 tests verifying the Singleton pattern for all three logger
 * implementations: only one instance ever exists, and getInstance() always
 * returns that same instance, even across multiple threads.
 */
class SingletonTest {

    @Test
    @DisplayName("Eager Logger returns the same instance")
    void eagerLogger_isSingleton() {
        Logger first = Logger.getInstance();
        Logger second = Logger.getInstance();

        assertSame(first, second);
        assertEquals(first.hashCode(), second.hashCode());
    }

    @Test
    @DisplayName("Lazy Logger returns the same instance")
    void lazyLogger_isSingleton() {
        LazyLogger first = LazyLogger.getInstance();
        LazyLogger second = LazyLogger.getInstance();

        assertSame(first, second);
        assertEquals(first.hashCode(), second.hashCode());
    }

    @Test
    @DisplayName("Bill Pugh Logger returns the same instance")
    void billPughLogger_isSingleton() {
        BillPughLogger first = BillPughLogger.getInstance();
        BillPughLogger second = BillPughLogger.getInstance();

        assertSame(first, second);
        assertEquals(first.hashCode(), second.hashCode());
    }

    @Test
    @DisplayName("All threads observe the same Logger instance (thread safety)")
    void logger_isThreadSafe() throws InterruptedException {
        final int threadCount = 10;
        // A set of identity references; if the singleton holds, size must be 1.
        final Set<Logger> instances =
                Collections.newSetFromMap(new ConcurrentHashMap<>());
        Thread[] threads = new Thread[threadCount];

        for (int i = 0; i < threadCount; i++) {
            threads[i] = new Thread(() -> instances.add(Logger.getInstance()));
        }
        for (Thread t : threads) {
            t.start();
        }
        for (Thread t : threads) {
            t.join();
        }

        assertEquals(1, instances.size(),
                "All threads must receive the exact same Logger instance");
    }
}
