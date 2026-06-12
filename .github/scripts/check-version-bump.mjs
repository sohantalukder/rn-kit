#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const baseRef = process.argv[2];

if (!baseRef) {
  console.error('Usage: node .github/scripts/check-version-bump.mjs <base-ref>');
  process.exit(1);
}

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));
const readJsonFromGit = (ref, path) =>
  JSON.parse(execFileSync('git', ['show', `${ref}:${path}`], { encoding: 'utf8' }));

const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

const currentPackage = readJson('package.json');
const currentLock = readJson('package-lock.json');
const basePackage = readJsonFromGit(baseRef, 'package.json');

const currentVersion = currentPackage.version;
const baseVersion = basePackage.version;
const lockVersion = currentLock.version;
const lockRootVersion = currentLock.packages?.['']?.version;

if (!versionPattern.test(currentVersion)) {
  console.error(`package.json version must be a valid semver version. Found: ${currentVersion}`);
  process.exit(1);
}

if (currentVersion === baseVersion) {
  console.error(
    `package.json version must change before merging to main. Current and base version are both ${currentVersion}.`
  );
  process.exit(1);
}

if (lockVersion !== currentVersion || lockRootVersion !== currentVersion) {
  console.error(
    `package-lock.json version values must match package.json (${currentVersion}). Found top-level=${lockVersion}, root=${lockRootVersion}.`
  );
  process.exit(1);
}

console.log(`Version bump detected: ${baseVersion} -> ${currentVersion}`);
