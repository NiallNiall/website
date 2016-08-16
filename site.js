module.exports = {
  "vendor": [],
  "scripts": {},
  "styles": {
    "prefix": ["> 1%", "last 2 versions", "IE >= 9"],
    "include": []
  },
  "metalsmith": {
    "metadata": {
      "site": {
        "url": "https://github.com/evocode/metalsmith-base"
      },
      "sociallinks": [
            {
              "img": "LinkedIn-black.svg",
              "link": "https://uk.linkedin.com/in/niall-henn-14691156",
            },
            {
              "img": "Twitter-black.svg",
              "link": "http://www.twitter.com/niallhenn",
            },
            {
              "img": "Soundcloud-black.svg",
              "link": "https://soundcloud.com/nialll",
            },
            {
              "img": "Vimeo-black.svg",
              "link": "http://www.vimeo.com/niallhenn",
            }
      ]
    },
    "config": {
      "contentRoot": "./content",
      "assetRoot": "./sources",
      "scriptRoot": "./scripts",
      "styleRoot": "./styles",
      "layoutRoot": "./layouts",
      "destRoot": "./build"
    },
    "plugins": {
      "metalsmith-drafts": {},
      "metalsmith-markdown": {
        "smartypants": true,
        "smartLists": true,
        "gfm": true,
        "tables": true
      },
      "metalsmith-excerpts": {},
      "metalsmith-permalinks": {
        "pattern": ":collection/:title"
      },
      "metalsmith-collections": {
        "blog": {
          "sortBy": "date",
          "reverse": true
        },
        "experiments": {
          "sortBy": "date",
          "reverse": false
        },
        "commercial-print": {
          "sortBy": "date",
          "reverse": false,
          "refer": true
        }
      },
      "metalsmith-pagination": {
        "collections.blog": {
          "perPage": 6,
          "layout": "blog.html",
          "first": "blog/index.html",
          "noPageOne": true,
          "path": "blog/:num/index.html"
        }
      },
      "metalsmith-layouts": {
        "engine": "handlebars",
        "directory": "./layouts",
        "partials": "./layouts/partials"
      },
      "metalsmith-assets": {
        "source": "./sources",
        "destination": "./"
      },
      "metalsmith-html-minifier": {
        "_metalsmith_if": "production",
        "removeAttributeQuotes": false,
        "keepClosingSlash": true
      }
    }
  }
}
