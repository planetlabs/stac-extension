# Contributing

All contributions are subject to the [STAC Specification Code of Conduct](https://github.com/radiantearth/stac-spec/blob/master/CODE_OF_CONDUCT.md). For contributions, please follow the [STAC specification contributing guide](https://github.com/radiantearth/stac-spec/blob/master/CONTRIBUTING.md) Instructions for running tests are copied here for convenience.

If you spot a bug or have an idea for a feature, please [create an issue](https://github.com/planetlabs/stac-extension/issues).  For simple fixes or features, you can [create a pull request](https://github.com/planetlabs/stac-extension/pulls), but it is a good idea to have discussion on an issue before sinking a lot of time into a pull request.

## Running tests

Pull requests have to pass the tests before they can be merged. You can run the same tests locally with [Node](https://nodejs.org/).  First you'll need to install everything with `npm`. Navigate to the root of the repository and on your command line run:

```bash
npm install
```

Then to check markdown formatting and test the examples against the JSON schema, you can run:

```bash
npm test
```

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
