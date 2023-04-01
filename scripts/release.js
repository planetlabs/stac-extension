import Mustache from 'mustache';
import esMain from 'es-main';
import fse from 'fs-extra';
import yargs from 'yargs';
import {Octokit} from '@octokit/rest';
import {fileURLToPath} from 'node:url';
import {hideBin} from 'yargs/helpers';

/**
 * @typedef {Object} Options
 * @property {string} token The bearer token.
 * @property {string} tag The tag.
 */

const owner = 'planetlabs';
const repo = 'stac-extension';

/**
 * Create a release.
 * @param {Options} options The release options.
 */
async function createRelease(options) {
  const client = new Octokit({auth: options.token});

  const response = await client.rest.repos.createRelease({
    owner,
    repo,
    tag_name: options.tag,
    generate_release_notes: true,
    draft: true,
  });

  const schemaPath = fileURLToPath(new URL('../schema.json', import.meta.url));
  const content = await fse.readFile(schemaPath, {encoding: 'utf-8'});
  const context = {version: options.tag};
  const schemaData = Buffer.from(Mustache.render(content, context), 'utf-8');

  await client.rest.repos.uploadReleaseAsset({
    url: response.data.upload_url,
    name: 'schema.json',
    label: 'JSON Schema',
    headers: {
      'content-type': 'application/json',
      'content-length': schemaData.length,
    },
    data: schemaData,
  });
}

if (esMain(import.meta)) {
  const options = yargs(hideBin(process.argv))
    .option('token', {
      describe: 'The token for auth',
      type: 'string',
    })
    .demandOption('token')
    .option('tag', {
      describe: 'The release tag (e.g. v1.2.3)',
      type: 'string',
    })
    .demandOption('tag')
    .parse();

  createRelease(options).catch(err => {
    process.stderr.write(err.stack + '\n', () => process.exit(1));
  });
}
