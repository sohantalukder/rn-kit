# Publishing

This package is ready to live in its own Git repository.

## First Repository Setup

```sh
git init
git add .
git commit -m "Initial UI library release"
git branch -M main
git remote add origin git@github.com:sohantalukder/rn-kit.git
git push -u origin main
```

Update `package.json` if you choose a different GitHub repository URL.

## Local Verification

```sh
npm ci
npm run typecheck
npm run build
npm run pack:dry-run
```

If your local npm cache has permission issues, use a temporary cache:

```sh
npm --cache /private/tmp/rn-kit-npm-cache pack --dry-run
```

## Publish To npm

```sh
npm login
npm publish --access public
```

For prerelease versions such as `0.1.0-beta.1`, publish with an explicit npm
dist-tag:

```sh
npm publish --access public --tag beta
```

For the first public release, make sure the package name in `package.json` is available on npm:

```sh
npm view @sohantalukder/rn-kit
```

If it returns a 404, the name is available.

## Automated Main Branch Release

Every pull request into `main` must bump the package version in `package.json`
and keep `package-lock.json` in sync. The CI version guard also checks direct
pushes to `main`.

After a successful `main` build, docs deploy, and npm publish, GitHub Actions
creates a GitHub release for `v<package version>` with generated release notes.
