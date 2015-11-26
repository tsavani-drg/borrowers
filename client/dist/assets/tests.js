define('borrowers/tests/adapters/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - adapters');
  QUnit.test('adapters/application.js should pass jshint', function (assert) {
    assert.ok(false, 'adapters/application.js should pass jshint.\nadapters/application.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nadapters/application.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('app.js should pass jshint', function (assert) {
    assert.ok(false, 'app.js should pass jshint.\napp.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 3, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 4, col 1, \'import\' is only available in ES6 (use esnext option).\napp.js: line 6, col 1, \'let\' is available in ES6 (use esnext option) or Mozilla JS extensions (use moz).\napp.js: line 13, col 3, \'object short notation\' is available in ES6 (use esnext option) or Mozilla JS extensions (use moz).\napp.js: line 18, col 1, \'export\' is only available in ES6 (use esnext option).\n\n7 errors');
  });
});
define('borrowers/tests/controllers/friends/base.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/friends');
  QUnit.test('controllers/friends/base.js should pass jshint', function (assert) {
    assert.ok(false, 'controllers/friends/base.js should pass jshint.\ncontrollers/friends/base.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/friends/base.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\ncontrollers/friends/base.js: line 6, col 5, Bad line breaking before \'&&\'.\n\n3 errors');
  });
});
define('borrowers/tests/controllers/friends/edit.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/friends');
  QUnit.test('controllers/friends/edit.js should pass jshint', function (assert) {
    assert.ok(false, 'controllers/friends/edit.js should pass jshint.\ncontrollers/friends/edit.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/friends/edit.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/controllers/friends/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - controllers/friends');
  QUnit.test('controllers/friends/new.js should pass jshint', function (assert) {
    assert.ok(false, 'controllers/friends/new.js should pass jshint.\ncontrollers/friends/new.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\ncontrollers/friends/new.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('borrowers/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/destroy-app.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('borrowers/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'borrowers/tests/helpers/start-app', 'borrowers/tests/helpers/destroy-app'], function (exports, _qunit, _borrowersTestsHelpersStartApp, _borrowersTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _borrowersTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _borrowersTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});
define('borrowers/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/module-for-acceptance.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('borrowers/tests/helpers/resolver', ['exports', 'ember/resolver', 'borrowers/config/environment'], function (exports, _emberResolver, _borrowersConfigEnvironment) {

  var resolver = _emberResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _borrowersConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _borrowersConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('borrowers/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/resolver.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('borrowers/tests/helpers/start-app', ['exports', 'ember', 'borrowers/app', 'borrowers/config/environment'], function (exports, _ember, _borrowersApp, _borrowersConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _borrowersConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _borrowersApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('borrowers/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers');
  QUnit.test('helpers/start-app.js should pass jshint', function (assert) {
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('borrowers/tests/models/friend.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - models');
  QUnit.test('models/friend.js should pass jshint', function (assert) {
    assert.ok(false, 'models/friend.js should pass jshint.\nmodels/friend.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/friend.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\nmodels/friend.js: line 4, col 1, \'export\' is only available in ES6 (use esnext option).\n\n3 errors');
  });
});
define('borrowers/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('router.js should pass jshint', function (assert) {
    assert.ok(false, 'router.js should pass jshint.\nrouter.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 2, col 1, \'import\' is only available in ES6 (use esnext option).\nrouter.js: line 4, col 1, \'const\' is available in ES6 (use esnext option) or Mozilla JS extensions (use moz).\nrouter.js: line 18, col 1, \'export\' is only available in ES6 (use esnext option).\n\n4 errors');
  });
});
define('borrowers/tests/routes/application.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/application.js should pass jshint', function (assert) {
    assert.ok(false, 'routes/application.js should pass jshint.\nroutes/application.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/application.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/routes/friends/edit.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/friends');
  QUnit.test('routes/friends/edit.js should pass jshint', function (assert) {
    assert.ok(false, 'routes/friends/edit.js should pass jshint.\nroutes/friends/edit.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/friends/edit.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/routes/friends/index.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/friends');
  QUnit.test('routes/friends/index.js should pass jshint', function (assert) {
    assert.ok(false, 'routes/friends/index.js should pass jshint.\nroutes/friends/index.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/friends/index.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/routes/friends/new.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/friends');
  QUnit.test('routes/friends/new.js should pass jshint', function (assert) {
    assert.ok(false, 'routes/friends/new.js should pass jshint.\nroutes/friends/new.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/friends/new.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/routes/friends/show.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes/friends');
  QUnit.test('routes/friends/show.js should pass jshint', function (assert) {
    assert.ok(false, 'routes/friends/show.js should pass jshint.\nroutes/friends/show.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/friends/show.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/routes/friends.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - routes');
  QUnit.test('routes/friends.js should pass jshint', function (assert) {
    assert.ok(false, 'routes/friends.js should pass jshint.\nroutes/friends.js: line 1, col 1, \'import\' is only available in ES6 (use esnext option).\nroutes/friends.js: line 3, col 1, \'export\' is only available in ES6 (use esnext option).\n\n2 errors');
  });
});
define('borrowers/tests/test-helper', ['exports', 'borrowers/tests/helpers/resolver', 'ember-qunit'], function (exports, _borrowersTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_borrowersTestsHelpersResolver['default']);
});
define('borrowers/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - .');
  QUnit.test('test-helper.js should pass jshint', function (assert) {
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('borrowers/tests/unit/adapters/application-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('borrowers/tests/unit/adapters/application-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/adapters');
  QUnit.test('unit/adapters/application-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/adapters/application-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/controllers/friends/base-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:friends/base', 'Unit | Controller | friends/base', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('borrowers/tests/unit/controllers/friends/base-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/friends');
  QUnit.test('unit/controllers/friends/base-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/controllers/friends/base-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/controllers/friends/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:friends/edit', 'Unit | Controller | friends/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('borrowers/tests/unit/controllers/friends/edit-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/friends');
  QUnit.test('unit/controllers/friends/edit-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/controllers/friends/edit-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/controllers/friends/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('controller:friends/new', 'Unit | Controller | friends/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('borrowers/tests/unit/controllers/friends/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/controllers/friends');
  QUnit.test('unit/controllers/friends/new-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/controllers/friends/new-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/models/friend-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('friend', 'Unit | Model | friend', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('borrowers/tests/unit/models/friend-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/models');
  QUnit.test('unit/models/friend-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/models/friend-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/routes/friends/edit-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:friends/edit', 'Unit | Route | friends/edit', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('borrowers/tests/unit/routes/friends/edit-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/friends');
  QUnit.test('unit/routes/friends/edit-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/routes/friends/edit-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/routes/friends/index-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:friends/index', 'Unit | Route | friends/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('borrowers/tests/unit/routes/friends/index-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/friends');
  QUnit.test('unit/routes/friends/index-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/routes/friends/index-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/routes/friends/new-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:friends/new', 'Unit | Route | friends/new', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('borrowers/tests/unit/routes/friends/new-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/friends');
  QUnit.test('unit/routes/friends/new-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/routes/friends/new-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/routes/friends/show-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:friends/show', 'Unit | Route | friends/show', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('borrowers/tests/unit/routes/friends/show-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes/friends');
  QUnit.test('unit/routes/friends/show-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/routes/friends/show-test.js should pass jshint.');
  });
});
define('borrowers/tests/unit/routes/friends-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:friends', 'Unit | Route | friends', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('borrowers/tests/unit/routes/friends-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/routes');
  QUnit.test('unit/routes/friends-test.js should pass jshint', function (assert) {
    assert.ok(true, 'unit/routes/friends-test.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('borrowers/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map