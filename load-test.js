/**
 * Simple Load Testing Script for IAPSMGC CON 2026
 * 
 * This script simulates concurrent users accessing the website
 * to test performance under load.
 * 
 * Usage:
 *   node load-test.js <url> <concurrent-users> <duration-seconds>
 * 
 * Example:
 *   node load-test.js http://localhost:3000 100 60
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');
const https = require('https');
const { URL } = require('url');

// Configuration
const args = process.argv.slice(2);
const targetUrl = args[0] || 'http://localhost:3000';
const concurrentUsers = parseInt(args[1]) || 100;
const durationSeconds = parseInt(args[2]) || 60;

// Pages to test
const pages = [
    '/',
    '/register',
    '/committee/organizing-team',
    '/registration/author-guidelines',
];

// Statistics
const stats = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalResponseTime: 0,
    minResponseTime: Infinity,
    maxResponseTime: 0,
    responseTimes: [],
    errors: {},
};

// Make a single request
function makeRequest(url) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;

        const req = client.get(url, (res) => {
            res.on('data', () => {
                // Ignore data
            });

            res.on('end', () => {
                const responseTime = Date.now() - startTime;

                stats.totalRequests++;
                if (res.statusCode === 200) {
                    stats.successfulRequests++;
                } else {
                    stats.failedRequests++;
                    stats.errors[res.statusCode] = (stats.errors[res.statusCode] || 0) + 1;
                }

                stats.totalResponseTime += responseTime;
                stats.responseTimes.push(responseTime);
                stats.minResponseTime = Math.min(stats.minResponseTime, responseTime);
                stats.maxResponseTime = Math.max(stats.maxResponseTime, responseTime);

                resolve({
                    statusCode: res.statusCode,
                    responseTime,
                });
            });
        });

        req.on('error', (error) => {
            stats.totalRequests++;
            stats.failedRequests++;
            stats.errors[error.code] = (stats.errors[error.code] || 0) + 1;
            resolve({
                error: error.message,
                responseTime: Date.now() - startTime,
            });
        });

        req.setTimeout(10000, () => {
            req.destroy();
            stats.totalRequests++;
            stats.failedRequests++;
            stats.errors['TIMEOUT'] = (stats.errors['TIMEOUT'] || 0) + 1;
            resolve({
                error: 'Timeout',
                responseTime: Date.now() - startTime,
            });
        });
    });
}

// Simulate a single user session
async function simulateUser() {
    const startTime = Date.now();
    const endTime = startTime + (durationSeconds * 1000);

    while (Date.now() < endTime) {
        // Random page selection
        const page = pages[Math.floor(Math.random() * pages.length)];
        const url = `${targetUrl}${page}`;

        await makeRequest(url);

        // Random delay between requests (1-5 seconds)
        const delay = 1000 + Math.random() * 4000;
        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

// Calculate percentile
function percentile(arr, p) {
    if (arr.length === 0) return 0;
    const sorted = arr.slice().sort((a, b) => a - b);
    const index = Math.ceil((p / 100) * sorted.length) - 1;
    return sorted[index];
}

// Print statistics
function printStats() {
    console.log('\n' + '='.repeat(60));
    console.log('LOAD TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`\nTest Configuration:`);
    console.log(`  Target URL: ${targetUrl}`);
    console.log(`  Concurrent Users: ${concurrentUsers}`);
    console.log(`  Duration: ${durationSeconds} seconds`);
    console.log(`  Pages Tested: ${pages.join(', ')}`);

    console.log(`\nRequest Statistics:`);
    console.log(`  Total Requests: ${stats.totalRequests}`);
    console.log(`  Successful: ${stats.successfulRequests} (${((stats.successfulRequests / stats.totalRequests) * 100).toFixed(2)}%)`);
    console.log(`  Failed: ${stats.failedRequests} (${((stats.failedRequests / stats.totalRequests) * 100).toFixed(2)}%)`);
    console.log(`  Requests/sec: ${(stats.totalRequests / durationSeconds).toFixed(2)}`);

    if (stats.responseTimes.length > 0) {
        console.log(`\nResponse Time Statistics (ms):`);
        console.log(`  Average: ${(stats.totalResponseTime / stats.responseTimes.length).toFixed(2)}`);
        console.log(`  Min: ${stats.minResponseTime}`);
        console.log(`  Max: ${stats.maxResponseTime}`);
        console.log(`  P50 (Median): ${percentile(stats.responseTimes, 50)}`);
        console.log(`  P95: ${percentile(stats.responseTimes, 95)}`);
        console.log(`  P99: ${percentile(stats.responseTimes, 99)}`);
    }

    if (Object.keys(stats.errors).length > 0) {
        console.log(`\nErrors:`);
        Object.entries(stats.errors).forEach(([code, count]) => {
            console.log(`  ${code}: ${count}`);
        });
    }

    console.log(`\nPerformance Assessment:`);
    const avgResponseTime = stats.totalResponseTime / stats.responseTimes.length;
    const successRate = (stats.successfulRequests / stats.totalRequests) * 100;

    if (successRate >= 99 && avgResponseTime < 1000) {
        console.log(`  ✅ EXCELLENT - Ready for production`);
    } else if (successRate >= 95 && avgResponseTime < 2000) {
        console.log(`  ✓ GOOD - Acceptable performance`);
    } else if (successRate >= 90 && avgResponseTime < 3000) {
        console.log(`  ⚠ FAIR - May need optimization`);
    } else {
        console.log(`  ❌ POOR - Optimization required`);
    }

    console.log('\n' + '='.repeat(60) + '\n');
}

// Main execution
async function runLoadTest() {
    console.log('\n🚀 Starting Load Test...\n');
    console.log(`Target: ${targetUrl}`);
    console.log(`Concurrent Users: ${concurrentUsers}`);
    console.log(`Duration: ${durationSeconds} seconds`);
    console.log(`\nTest in progress...`);

    const startTime = Date.now();

    // Create progress indicator
    const progressInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const progress = Math.min(100, (elapsed / durationSeconds) * 100);
        const bar = '█'.repeat(Math.floor(progress / 2)) + '░'.repeat(50 - Math.floor(progress / 2));
        process.stdout.write(`\r[${bar}] ${progress.toFixed(0)}% | Requests: ${stats.totalRequests} | Success: ${stats.successfulRequests} | Failed: ${stats.failedRequests}`);
    }, 1000);

    // Start all concurrent users
    const users = [];
    for (let i = 0; i < concurrentUsers; i++) {
        users.push(simulateUser(i));
    }

    // Wait for all users to complete
    await Promise.all(users);

    clearInterval(progressInterval);
    process.stdout.write('\n');

    // Print results
    printStats();
}

// Error handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    printStats();
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('\n\nTest interrupted by user');
    printStats();
    process.exit(0);
});

// Run the test
runLoadTest().catch((error) => {
    console.error('Load test failed:', error);
    process.exit(1);
});
