// Architecture rules from docs/adr/0002 (folders and import direction).
// Run with `npm run depcruise`.
/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'features-are-isolated',
      comment:
        'A feature never imports another feature; compose them in a route instead.',
      severity: 'error',
      from: { path: '^src/features/([^/]+)/' },
      to: {
        path: '^src/features/',
        pathNot: '^src/features/$1/',
      },
    },
    {
      name: 'features-do-not-reach-up',
      comment: 'Features are used by routes, never the other way round.',
      severity: 'error',
      from: { path: '^src/features/' },
      to: { path: '^src/(routes|app)/' },
    },
    {
      name: 'shared-code-is-shared',
      comment:
        'components/, lib/, hooks/ and api/ know nothing about features, routes or the app shell.',
      severity: 'error',
      from: { path: '^src/(components|lib|hooks|api)/' },
      to: { path: '^src/(features|routes|app)/' },
    },
    {
      name: 'ui-primitives-stay-primitive',
      comment:
        'components/ui holds the shadcn primitives: they import only each other and lib/.',
      severity: 'error',
      from: { path: '^src/components/ui/' },
      to: { path: '^src/', pathNot: '^src/(components/ui|lib)/' },
    },
    {
      name: 'routes-do-not-import-the-shell',
      comment:
        'app/ builds the router from routes/; routes get what they need from the router context.',
      severity: 'error',
      from: { path: '^src/routes/' },
      to: { path: '^src/app/' },
    },
    {
      name: 'no-test-code-in-src',
      severity: 'error',
      from: { path: '^src/', pathNot: ['\\.test\\.tsx?$', '^src/testing/'] },
      to: { path: ['^src/testing/', '\\.test\\.tsx?$'] },
    },
    {
      name: 'no-dev-dependencies-in-src',
      comment: 'Only test code may import dev dependencies such as msw.',
      severity: 'error',
      from: { path: '^src/', pathNot: ['\\.test\\.tsx?$', '^src/testing/'] },
      to: { dependencyTypes: ['npm-dev'], dependencyTypesNot: ['type-only'] },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    exclude: { path: '^src/routeTree\\.gen\\.ts$' },
    tsPreCompilationDeps: true,
    tsConfig: { fileName: 'tsconfig.app.json' },
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'browser', 'default', 'types'],
    },
  },
}
