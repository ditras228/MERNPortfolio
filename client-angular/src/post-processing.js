const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

const GENERATED_TYPES_PATH = resolve(
  __dirname,
  'generated/graphql.ts'
);

const removeGQLUsing = file => file.replace(new RegExp(/gql`/gm), '`');

const typesFile = readFileSync(GENERATED_TYPES_PATH, { encoding: 'utf-8' });

writeFileSync(GENERATED_TYPES_PATH, removeGQLUsing(typesFile), { encoding: 'utf-8' });
