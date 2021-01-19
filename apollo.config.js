module.exports = {
  client: {
    service: {
      name: 'NodeJs Starter Kit',
      // run this to get the schema.json file
      // $ npx apollo schema:download --endpoint=http://localhost:8080/graphql schema.json
      // localSchemaFile: './schema.json',
      url: 'http://localhost:8080/graphql',
      skipSSLValidation: true
    },
    includes: ['modules/**/client-react/graphql/**'],
    // local @client quries are exclude if included causes bug potential solution https://github.com/apollographql/apollo-tooling/issues/366
    excludes: ['node_modules/*', 'modules/**/client-react/graphql/*.client.graphql']
  }
};
