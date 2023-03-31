import Mustache from 'mustache';
import esMain from 'es-main';
import fse from 'fs-extra';
import path from 'node:path';
import semver from 'semver';
import {Octokit} from '@octokit/rest';
import {fileURLToPath} from 'node:url';
import {retry} from '@octokit/plugin-retry';

const owner = 'planetlabs';
const repo = 'stac-extension';
const earliestRelease = 'v0.0.0';

const defaultContentUrl = `https://raw.githubusercontent.com/${owner}/${repo}`;
const OctokitClient = Octokit.plugin(retry);

/**
 * @return {Promise<Array<string>>} Release tags sorted latest first.
 */
async function getReleaseTags() {
  process.removeAllListeners('warning');
  const client = new OctokitClient({
    auth: process.env.GITHUB_TOKEN,
  });

  const tags = await client.paginate(
    client.rest.repos.listReleases,
    {owner, repo},
    response => response.data.map(release => release['tag_name'])
  );

  return tags
    .filter(tag => semver.valid(tag) && semver.gte(tag, earliestRelease))
    .sort((a, b) => (semver.gt(a, b) ? -1 : 1));
}

async function getSchema(tag) {
  const url = `${defaultContentUrl}/${tag}/schema.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Unexpected response: ${response.status}`);
  }
  return response.text();
}

/**
 * @typedef {Object} Release
 * @property {string} tag
 * @property {string} schema
 */

/**
 * @param {string} tag The release tag (e.g. 'v1.2.3').
 * @return {Promise<Release>} Release info.
 */
async function getReleaseInfo(tag) {
  const schema = await getSchema(tag);
  return {tag, schema};
}

/**
 * Release info sorted latest first.
 */
async function* eachRelease() {
  const tags = await getReleaseTags();
  for (const tag of tags) {
    yield await getReleaseInfo(tag);
  }
}

async function build({destDir}) {
  for await (const release of eachRelease()) {
    const context = {version: release.tag};
    const schema = Mustache.render(release.schema, context);
    const destPath = path.join(destDir, release.tag, 'schema.json');
    await fse.ensureDir(path.dirname(destPath));
    await fse.writeFile(destPath, schema);
  }
}

if (esMain(import.meta)) {
  const destDir = fileURLToPath(new URL('../build', import.meta.url));

  build({destDir}).catch(err =>
    process.stderr.write(err.stack + '\n', () => process.exit(1))
  );
}
