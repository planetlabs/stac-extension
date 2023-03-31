# Contributing

All contributions are subject to the [STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md). For contributions, please follow the [STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md) Instructions for running tests are copied here for convenience.

## Running tests

The same checks that run as checks on PR's are part of the repository and can be run locally to verify that changes are valid. To run tests locally, you'll need `npm`, which is a standard part of any [node.js installation](https://nodejs.org/en/download/).

First you'll need to install everything with npm once. Just navigate to the root of this repository and on your command line run:

```bash
npm install
```

Then to check markdown formatting and test the examples against the JSON schema, you can run:

```bash
npm test
```

This will spit out the same texts that you see online, and you can then go and fix your markdown or examples.

If the tests reveal formatting problems with the examples, you can fix them with:

```bash
npm run format-examples
```

## Publishing a new release

Releases are published by creating a new tag.  To tag a new release off the latest commit:

```bash
# replace 1.2.3 with the release version
TAG=v1.2.3
git fetch origin
git checkout main
git reset --hard origin/main
git tag ${TAG}
git push origin ${TAG}
```

This will trigger a run of the [`release.yaml` workflow](./.github/workflows/release.yaml).  When the release job finishes, visit the [releases page](https://github.com/planetlabs/stac-extension/releases) to find the new draft release.  Review the release notes and publish the draft after making any edits.

When a new release is published, the [`publish.yaml` workflow](./.github/workflows/publish.yaml) will update the GitHub pages deployment.  After this workflow completes, the published schema should be available at `https://planetlabs.github.io/stac-extension/${TAG}/schema.json` (where `${TAG}` is the release version).
