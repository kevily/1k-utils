module.exports = {
    title: '1k-utils',
    tagline: 'The tagline of my site',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    favicon: 'img/favicon.ico',
    organizationName: '1k', // Usually your GitHub org/user name.
    projectName: '1k-utils', // Usually your repo name.
    themeConfig: {
        navbar: {
            title: '1k-utils',
            logo: {
                alt: '1k-utils Logo',
                src: 'img/logo.svg'
            }
        }
    },
    plugins: [
        [
            require.resolve('@easyops-cn/docusaurus-search-local'),
            {
                // ... Your options.
                // `hashed` is recommended as long-term-cache of index file is possible.
                hashed: true,
                // For Docs using Chinese, The `language` is recommended to set to:
                // ```
                language: ['en', 'zh']
                // ```
                // When applying `zh` in language, please install `nodejieba` in your project.
            }
        ]
    ],
    presets: [
        [
            '@docusaurus/preset-classic',
            {
                docs: {
                    sidebarItemsGenerator: async function ({
                        defaultSidebarItemsGenerator,
                        ...args
                    }) {
                        return await defaultSidebarItemsGenerator(args)
                    }
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css')
                }
            }
        ]
    ]
}
