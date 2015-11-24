define('borrowers/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'borrowers/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _borrowersConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_borrowersConfigEnvironment['default'].APP.name, _borrowersConfigEnvironment['default'].APP.version)
  };
});