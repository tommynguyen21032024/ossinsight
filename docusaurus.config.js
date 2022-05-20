// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const path = require('path')
const fs = require('fs')

const getPresets = (fn) => {
  return fs.readFileSync(fn, { encoding: 'utf-8' })
    .split('\n')
    .map(line => line.trim())
    .filter(s => s)
}

const getPrefetched = fn => {
  return JSON.parse(fs.readFileSync(fn, { encoding: 'utf-8'}))
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Open Source Software Analysis and Comparing Tools',
  tagline: ' Deep Insights into Billions of GitHub events',
  url: 'https://ossinsight.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',
  organizationName: 'pingcap',
  projectName: 'ossinsight',
  scripts: [
    'https://api.ossinsight.io/qo/repos/groups/osdb?format=global_variable',
    'https://www.google.com/recaptcha/api.js?render=6LcBQpkfAAAAAFmuSRkRlJxVtmqR34nNawFgKohC'
  ],
  clientModules: [require.resolve("./myClientModule.ts")],
  plugins: [
    path.resolve(__dirname, 'plugins/prefetch'),
    [
      path.resolve(__dirname, 'plugins/dynamic-route'),
      {
        routes: [
          {
            path: '/analyze/:owner/:repo',
            exact: true,
            component: '@site/src/dynamic-pages/analyze',
            params: getPresets('.preset-analyze')
              .map(name => name.split('/'))
              .map(([owner, repo]) => ({ owner, repo }))
          },
          {
            path: '/collections/:slug',
            exact: true,
            component: '@site/src/dynamic-pages/collections',
            params: getPrefetched('.prefetch/collections.json').data.map(({name}) => ({
              slug: require('param-case').paramCase(name)
            }))
          }
        ]
      }
    ],
    [
      '@docusaurus/plugin-content-blog',
      {
        id: '_blog',
        routeBasePath: '_blog',
        path: './_blog',
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            from: '/database/deep-insight-into-open-source-databases',
            to: '/blog/deep-insight-into-open-source-databases',
          },
          {
            from: '/js-framework/deep-insight-into-js-framework-2021',
            to: '/blog/deep-insight-into-js-framework-2021',
          },
          {
            from: '/language/deep-insight-into-programming-languages-2021',
            to: '/blog/deep-insight-into-programming-languages-2021',
          },
          {
            from: '/low-code/deep-insight-into-lowcode-development-tools-2021',
            to: '/blog/deep-insight-into-lowcode-development-tools-2021',
          },
          {
            from: '/web-framework/deep-insight-about-web-framework-2021',
            to: '/blog/deep-insight-into-web-framework-2021',
          },
        ]
      }
    ]
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        pages: {
          exclude: [
            '**/_*/**',
            '**/_*'
          ]
        },
        docs: {
          path: 'insights',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/pingcap/ossinsight/edit/main/',
          routeBasePath: '/',
        },
        blog: {
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          editUrl: 'https://github.com/pingcap/ossinsight/edit/main/',
          feedOptions: {
            type: ['rss'],
            copyright: `Copyright © ${new Date().getFullYear()} PingCAP`,
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: {
          trackingID: 'G-KW4FDPBLLJ',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/share.png',
      metadata: [
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'keywords', content: 'tidb, mysql, github events, oss, compare oss, oss analysis, pingcap'}
      ],
//       hideableSidebar: true,
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      announcementBar: {
        id: 'announcement-20220516',
        content:
          '📢 📢 📢  Latest Blog: <a target="_blank" href="/blog/explore-deep-in-4.6-billion-github-events">Explore Deep in 4.6 Billion GitHub Events</a>, 2022/05/03',
        backgroundColor: '#333',
        textColor: '#fbe99f',
        isCloseable: false,
      },
      navbar: {
        title: 'OSS Insight',
        logo: {
          alt: 'OSS Insight',
          src: 'img/tidb-logo-white.svg',
        },
        style: 'dark',
        items: [
          {
            to: '/collections/open-source-database',
            position: 'left',
            label: 'Collections',
            activeBasePath: '/collections'
          },
          {to: '/try-your-own-dataset/?utm_content=header', label: '🔥 Try Your Own Dataset', position: 'right'},
          {to: '/blog', label: 'Blogs', position: 'right'},
          {
            href: 'https://tidbcloud.com/signup/?utm_source=ossinsight&utm_medium=referral',
            className: 'navbar-item-tidb-cloud',
            position: 'right',
          },
          {
            href: 'https://twitter.com/OSSInsight',
            className: 'navbar-item-twitter',
            position: 'right',
          },
          {
            href: 'https://github.com/pingcap/ossinsight',
            className: 'navbar-item-github',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'OSS Insight',
            items: [
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'Insight',
                to: '/database/deep-insight-into-open-source-databases/',
              },
              {
                label: 'Try Your Own Dataset',
                to: '/try-your-own-dataset/?utm_content=footer',
              },
              {
                label: 'How It Works',
                to: '/blog/how-it-works',
              },
              {
                label: 'Blogs',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Sponsored By',
            items: [
              {
                label: 'TiDB Community',
                href: 'https://en.pingcap.com/community?utm_source=ossinsight&utm_medium=referral',
              },
              {
                label: 'PingCAP',
                href: 'https://en.pingcap.com?utm_source=ossinsight&utm_medium=referral',
              },
            ],
          },
          {
            title: 'Built With',
            items: [
              {
                label: 'GH Archive',
                href: 'http://www.gharchive.org/',
              },
              {
                label: 'GHTorrent',
                href: 'https://ghtorrent.org/',
              },
              {
                label: 'Docusaurus',
                href: 'https://github.com/facebook/docusaurus',
              },
              {
                label: 'Apache ECharts',
                href: 'https://echarts.apache.org/',
              },
              {
                label: 'TiDB Cloud',
                href: 'https://tidbcloud.com/?utm_source=ossinsight&utm_medium=referral',
              },
              {
                label: 'React',
                href: 'https://github.com/facebook/react',
              },
            ],
          },
          {
            title: 'Contacts',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/pingcap/ossinsight',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/OSSInsight',
              },
              {
                label: 'Email',
                href: 'mailto:ossinsight@pingcap.com',
              },
            ],
          },
        ],
        logo: {
          alt: 'OSS Insight Logo',
          src: '/img/pingcap-white-300x79.png',
        },
        copyright: `Copyright &copy; ${new Date().getFullYear()} <a href="https://en.pingcap.com" target="_blank">PingCAP</a>. All Rights Reserved | <a href="https://en.pingcap.com/privacy-policy/" target="_blank">Privacy</a>`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        autoCollapseSidebarCategories: true,
      },
    }),
};

module.exports = config;
