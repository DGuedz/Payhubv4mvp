#!/usr/bin/env node
/**
 * PAYHUB SDK Smoke Test
 * Valida integração do SDK com endpoints críticos
 * 
 * Usage:
 * BASE_URL=http://localhost:3000 JWT_SECRET='dev-secret-123' npx tsx scripts/sdk-smoke.ts
 */

import { createSDK } from '../sdk/payhub';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

// ────────────────────────────────────────────────────────────────────────────────
// Config
// ────────────────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-123';

// ────────────────────────────────────────────────────────────────────────────────
// Helper: Generate JWT
// ────────────────────────────────────────────────────────────────────────────────

function generateToken(): string {
  return jwt.sign(
    {
      merchantId: 'test-merchant',
      role: 'merchant',
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// ────────────────────────────────────────────────────────────────────────────────
// Helper: Load Real Artifacts
// ────────────────────────────────────────────────────────────────────────────────

function loadArtifacts() {
  const artifactsPath = path.join(process.cwd(), 'docs', 'ARTIFACTS_DEVNET_REAL.json');
  if (fs.existsSync(artifactsPath)) {
    return JSON.parse(fs.readFileSync(artifactsPath, 'utf-8'));
  }
  return null;
}

// ────────────────────────────────────────────────────────────────────────────────
// Main Smoke Test
// ────────────────────────────────────────────────────────────────────────────────

async function runSmokeTest() {
  console.log('🚀 PAYHUB SDK Smoke Test\n');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`JWT Secret: ${JWT_SECRET ? '✓ Set' : '✗ Not set'}\n`);

  // Generate token
  const token = generateToken();
  console.log('✓ JWT generated\n');

  // Initialize SDK
  const sdk = createSDK({
    baseUrl: BASE_URL,
    token,
  });
  console.log('✓ SDK initialized\n');

  // Load artifacts for real addresses
  const artifacts = loadArtifacts();
  const sourceAccount = artifacts?.walletClassic || 'rN7n7otQDd6FczFgLdllWMNBD9A8yB7ZrH';
  const destinationAccount = artifacts?.walletAMMPayer || 'rDEST1NAT1ON7otQDd6FczFgLdllWMNBD9A';

  const results = {
    ok: true,
    tests: {} as Record<string, any>,
  };

  // ──────────────────────────────────────────────────────────────────────────────
  // Test 1: AMM Quote
  // ──────────────────────────────────────────────────────────────────────────────
  try {
    console.log('📊 Testing AMM Quote...');
    const deliverCurrency = sdk.currencyHex('RLUSD');
    const deliverIssuer = artifacts?.issuerRLUSD || 'rUPyoX7KL3Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1';
    
    const ammResult = await sdk.amm.quote({
      sourceAccount,
      destinationAccount,
      deliverCurrency,
      deliverIssuer,
      deliverValue: '1',
    });

    results.tests.amm = ammResult;
    console.log(`  pathsCount: ${ammResult.pathsCount}`);
    console.log(`  status: ${ammResult.ok ? '✓ OK' : '✗ FAILED'}\n`);
  } catch (error) {
    console.error('  ✗ AMM test failed:', error);
    results.ok = false;
    results.tests.amm = { ok: false, error: String(error) };
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // Test 2: Compliance CSV
  // ──────────────────────────────────────────────────────────────────────────────
  try {
    console.log('📄 Testing Compliance CSV...');
    const csv = await sdk.compliance.exportCSV();
    results.tests.compliance = {
      ok: true,
      length: csv.length,
      preview: csv.substring(0, 100) + '...',
    };
    console.log(`  CSV length: ${csv.length} bytes`);
    console.log(`  status: ✓ OK\n`);
  } catch (error) {
    console.error('  ✗ Compliance test failed:', error);
    results.ok = false;
    results.tests.compliance = { ok: false, error: String(error) };
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // Test 3: Security Alerts
  // ──────────────────────────────────────────────────────────────────────────────
  try {
    console.log('🔒 Testing Security Alerts...');
    const alertsResult = await sdk.security.alerts();
    results.tests.security = alertsResult;
    console.log(`  alerts count: ${alertsResult.alerts?.length || 0}`);
    console.log(`  status: ${alertsResult.ok ? '✓ OK' : '✗ FAILED'}\n`);
  } catch (error) {
    console.error('  ✗ Security test failed:', error);
    results.ok = false;
    results.tests.security = { ok: false, error: String(error) };
  }

  // ──────────────────────────────────────────────────────────────────────────────
  // Summary
  // ──────────────────────────────────────────────────────────────────────────────
  console.log('═══════════════════════════════════════════════════════════════');
  console.log(`\n${results.ok ? '✅' : '❌'} Smoke Test ${results.ok ? 'PASSED' : 'FAILED'}\n`);
  console.log('Results:');
  console.log(JSON.stringify(results, null, 2));
  console.log('\n═══════════════════════════════════════════════════════════════\n');

  // Exit with appropriate code
  process.exit(results.ok ? 0 : 1);
}

// ────────────────────────────────────────────────────────────────────────────────
// Run
// ────────────────────────────────────────────────────────────────────────────────

runSmokeTest().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
