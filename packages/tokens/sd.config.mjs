import StyleDictionary from 'style-dictionary'

const designSystems = ['ds-minimal', 'ds-editorial', 'ds-brutalist']

for (const ds of designSystems) {
  const sd = new StyleDictionary({
    source: [`src/${ds}/*.json`],
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: ds,
        buildPath: `dist/${ds}/`,
        files: [
          {
            destination: 'variables.css',
            format: 'css/variables',
            options: {
              selector: `[data-theme="${ds}"]`,
              outputReferences: true,
            },
          },
        ],
      },
      js: {
        transformGroup: 'js',
        buildPath: `dist/${ds}/`,
        files: [
          {
            destination: 'tokens.js',
            format: 'javascript/es6',
          },
        ],
      },
    },
  })

  await sd.buildAllPlatforms()
  console.log(`✅ ${ds} built successfully`)
}
