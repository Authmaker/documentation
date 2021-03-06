'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: '@authmaker/documentation',
    environment,
    rootURL: '/',
    locationType: 'trailing-history',
    historySupportMiddleware: true,

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'ember-meta': {
      description: 'Authmaker Beginner Documentation'
    },

    guidemaker: {
      title: 'Authmaker Documentation',
      logo: '/images/logo.svg',
      copyright: 'Stone Circle Design Limited',
      social: {
        github: 'authmaker',
        twitter: 'authmaker',
      },
      sourceRepo: 'https://github.com/authmaker/documentation',
    },

    algolia: {
      algoliaId: 'EUXSOLYEM4',
      algoliaKey: '17fae2d7d0064205f77c9f69e6efe151',
      indexName: 'beginner-guides'
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
