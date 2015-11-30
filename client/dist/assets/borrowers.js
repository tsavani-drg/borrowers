"use strict";
/* jshint ignore:start */

/* jshint ignore:end */

define('borrowers/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].ActiveModelAdapter.extend({
		namespace: ''
	});
});
define('borrowers/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'borrowers/config/environment'], function (exports, _ember, _emberResolver, _emberLoadInitializers, _borrowersConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _borrowersConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _borrowersConfigEnvironment['default'].podModulePrefix,
    Resolver: _emberResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _borrowersConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('borrowers/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'borrowers/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _borrowersConfigEnvironment) {

  var name = _borrowersConfigEnvironment['default'].APP.name;
  var version = _borrowersConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('borrowers/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('borrowers/controllers/articles/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    isValid: _ember['default'].computed('model.description', function () {
      return !_ember['default'].isEmpty(this.get('model.description'));
    }),

    actions: {
      save: function save() {
        if (this.get('isValid')) {
          return true;
        } else {
          this.set('errorMessage', 'You have to fill all the fields');
          return false;
        }
      },
      cancel: function cancel() {
        return true;
      }
    }
  });
});
define('borrowers/controllers/friends/base', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    isValid: _ember['default'].computed('model.firstName', 'model.email', 'model.lastName', 'model.twitter', function () {
      return !_ember['default'].isEmpty(this.get('model.firstName')) && !_ember['default'].isEmpty(this.get('model.email')) && !_ember['default'].isEmpty(this.get('model.lastName')) && !_ember['default'].isEmpty(this.get('model.twitter'));
    }),

    actions: {
      save: function save() {
        if (this.get('isValid')) {
          var _this = this;
          this.get('model').save().then(function (friend) {
            _this.transitionToRoute('friends.show', friend);
          });
        } else {
          this.set('errorMessage', 'You have to fill all the fields');
        }
        return false;
      },
      cancel: function cancel() {
        return true;
      }
    }
  });
});
define('borrowers/controllers/friends/edit', ['exports', 'borrowers/controllers/friends/base'], function (exports, _borrowersControllersFriendsBase) {
  exports['default'] = _borrowersControllersFriendsBase['default'].extend({
    actions: {
      cancel: function cancel() {
        this.transitionToRoute('friends.show', this.get('model'));
        return false;
      }
    }
  });
});
define('borrowers/controllers/friends/new', ['exports', 'borrowers/controllers/friends/base'], function (exports, _borrowersControllersFriendsBase) {
  exports['default'] = _borrowersControllersFriendsBase['default'].extend({
    actions: {
      cancel: function cancel() {
        this.get('model').deleteRecord();
        this.transitionToRoute('friends');
        return false;
      }
    }
  });
});
define('borrowers/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('borrowers/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'borrowers/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _borrowersConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_borrowersConfigEnvironment['default'].APP.name, _borrowersConfigEnvironment['default'].APP.version)
  };
});
define('borrowers/initializers/export-application-global', ['exports', 'ember', 'borrowers/config/environment'], function (exports, _ember, _borrowersConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_borrowersConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _borrowersConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_borrowersConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('borrowers/models/article', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    friend: _emberData['default'].belongsTo('friend'),
    createdAt: _emberData['default'].attr('date'),
    description: _emberData['default'].attr('string'),
    notes: _emberData['default'].attr('string'),
    state: _emberData['default'].attr('string', {
      defaultValue: 'borrowed' })
  });
});
define('borrowers/models/friend', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    articles: _emberData['default'].hasMany('article'),
    firstName: _emberData['default'].attr('string'),
    lastName: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string'),
    twitter: _emberData['default'].attr('string'),
    totalArticles: _emberData['default'].attr('number'),
    fullName: _ember['default'].computed('firstName', 'lastName', function () {
      return this.get('firstName') + ' ' + this.get('lastName');
    })
  });
});
define('borrowers/router', ['exports', 'ember', 'borrowers/config/environment'], function (exports, _ember, _borrowersConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _borrowersConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    // this.resource('friend', function(){ });
    this.route('friends', function () {
      this.route('new');
      this.route('show', { path: ':friend_id' }, function () {
        this.resource('articles', function () {
          this.route('new');
        });
      });
      this.route('edit', { path: ':friend_id/edit' });
    });
  });

  exports['default'] = Router;
});
define('borrowers/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('borrowers/routes/articles/index', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.modelFor('friends/show').get('articles');
    }
  });
});
define('borrowers/routes/articles/new', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.createRecord('article', {
        friend: this.modelFor('friends/show')
      });
    },

    actions: {
      save: function save() {
        var _this = this;
        var model = this.modelFor('articles/new');
        model.save().then(function () {
          _this.transitionTo('articles');
        });
      },

      cancel: function cancel() {
        this.transitionTo('articles');
      }
    }
  });
});
define('borrowers/routes/articles', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('borrowers/routes/friends/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('borrowers/routes/friends/index', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.store.find('friend');
		}
	});
});
define('borrowers/routes/friends/new', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({
		model: function model() {
			return this.store.createRecord('friend');
		}
	});
});
define('borrowers/routes/friends/show', ['exports', 'ember'], function (exports, _ember) {
	exports['default'] = _ember['default'].Route.extend({});
});
define('borrowers/routes/friends', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    actions: {
      save: function save() {
        console.log('save action bubbled to friends route');
        return true;
      },
      cancel: function cancel() {
        console.log('cancel action bubbled to friends route');
        return true;
      },
      'delete': function _delete(friend) {
        var _this = this;
        friend.destroyRecord().then(function () {
          _this.transitionTo('friends.index');
        });
      }
    }
  });
});
define("borrowers/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/application.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "row");
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "full");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [2, 1]), 1, 1);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "partial", ["partials/header"], [], ["loc", [null, [1, 0], [1, 29]]]], ["content", "outlet", ["loc", [null, [5, 4], [5, 14]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/articles/-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 9,
            "column": 7
          }
        },
        "moduleName": "borrowers/templates/articles/-form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        dom.setAttribute(el3, "class", "primary");
        var el4 = dom.createTextNode("Save");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("Cancel");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [7]);
        var element3 = dom.childAt(element1, [9]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 4, 4);
        morphs[3] = dom.createElementMorph(element2);
        morphs[4] = dom.createElementMorph(element3);
        return morphs;
      },
      statements: [["content", "errorMessage", ["loc", [null, [2, 6], [2, 22]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.description", ["loc", [null, [4, 18], [4, 35]]]]], [], []], "placeholder", "Description"], ["loc", [null, [4, 4], [4, 63]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.notes", ["loc", [null, [5, 18], [5, 29]]]]], [], []], "placeholder", "Notes"], ["loc", [null, [5, 4], [5, 51]]]], ["element", "action", ["save"], [], ["loc", [null, [6, 12], [6, 29]]]], ["element", "action", ["cancel"], [], ["loc", [null, [7, 12], [7, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/articles/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 11,
              "column": 2
            },
            "end": {
              "line": 18,
              "column": 2
            }
          },
          "moduleName": "borrowers/templates/articles/index.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode(" \n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" \n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n    ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          return morphs;
        },
        statements: [["content", "article.description", ["loc", [null, [13, 10], [13, 33]]]], ["content", "article.createdAt", ["loc", [null, [14, 10], [14, 31]]]]],
        locals: ["article"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 21,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/articles/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("table");
        dom.setAttribute(el1, "class", "primary");
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode(" \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Description");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Borrowed since");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [11, 21], [11, 26]]]]], [], 0, null, ["loc", [null, [11, 2], [18, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("borrowers/templates/articles/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 27
          }
        },
        "moduleName": "borrowers/templates/articles/new.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        var el2 = dom.createTextNode(" Lending new articles");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "partial", ["articles/form"], [], ["loc", [null, [2, 0], [2, 27]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/articles", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/articles.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/friends/-form", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 12,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/friends/-form.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("form");
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h2");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("fieldset");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("input");
        dom.setAttribute(el3, "type", "submit");
        dom.setAttribute(el3, "value", "Save");
        dom.setAttribute(el3, "class", "primary");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("Cancel");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [3]);
        var element2 = dom.childAt(element1, [15]);
        var morphs = new Array(7);
        morphs[0] = dom.createElementMorph(element0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        morphs[3] = dom.createMorphAt(element1, 4, 4);
        morphs[4] = dom.createMorphAt(element1, 7, 7);
        morphs[5] = dom.createMorphAt(element1, 10, 10);
        morphs[6] = dom.createElementMorph(element2);
        return morphs;
      },
      statements: [["element", "action", ["save"], ["on", "submit"], ["loc", [null, [1, 6], [1, 35]]]], ["content", "errorMessage", ["loc", [null, [2, 6], [2, 22]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.firstName", ["loc", [null, [4, 18], [4, 33]]]]], [], []], "placeholder", "First Name"], ["loc", [null, [4, 4], [4, 60]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.lastName", ["loc", [null, [5, 18], [5, 32]]]]], [], []], "placeholder", "Last Name"], ["loc", [null, [5, 4], [5, 58]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.email", ["loc", [null, [6, 18], [6, 29]]]]], [], []], "placeholder", "email"], ["loc", [null, [6, 4], [6, 51]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "model.twitter", ["loc", [null, [7, 18], [7, 31]]]]], [], []], "placeholder", "twitter"], ["loc", [null, [7, 4], [7, 55]]]], ["element", "action", ["cancel"], [], ["loc", [null, [9, 12], [9, 31]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/friends/edit", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 26
          }
        },
        "moduleName": "borrowers/templates/friends/edit.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Editing ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(2);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "model.fullName", ["loc", [null, [1, 12], [1, 30]]]], ["inline", "partial", ["friends/form"], [], ["loc", [null, [2, 0], [2, 26]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/friends/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "revision": "Ember@1.13.11",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 16,
              "column": 2
            }
          },
          "moduleName": "borrowers/templates/friends/index.hbs"
        },
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("tr");
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" \n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("td");
          var el3 = dom.createElement("a");
          dom.setAttribute(el3, "href", "#");
          var el4 = dom.createTextNode("delete");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n      ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [5, 0]);
          var morphs = new Array(3);
          morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
          morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
          morphs[2] = dom.createElementMorph(element1);
          return morphs;
        },
        statements: [["inline", "link-to", [["get", "friend.fullName", ["loc", [null, [12, 20], [12, 35]]]], "articles", ["get", "friend", ["loc", [null, [12, 47], [12, 53]]]]], [], ["loc", [null, [12, 10], [12, 55]]]], ["content", "friend.totalArticles", ["loc", [null, [13, 10], [13, 34]]]], ["element", "action", ["delete", ["get", "friend", ["loc", [null, [14, 40], [14, 46]]]]], [], ["loc", [null, [14, 22], [14, 48]]]]],
        locals: ["friend"],
        templates: []
      };
    })();
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 19,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/friends/index.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("table");
        dom.setAttribute(el1, "class", "primary");
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("thead");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("tr");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Name");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        var el5 = dom.createTextNode("Articles");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" \n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("th");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("tbody");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0, 3]), 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "model", ["loc", [null, [10, 20], [10, 25]]]]], [], 0, null, ["loc", [null, [10, 2], [16, 11]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("borrowers/templates/friends/new", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 26
          }
        },
        "moduleName": "borrowers/templates/friends/new.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h1");
        var el2 = dom.createTextNode("Adding New Friend");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" \n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["inline", "partial", ["friends/form"], [], ["loc", [null, [2, 0], [2, 26]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/friends/show", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
            "column": 6
          }
        },
        "moduleName": "borrowers/templates/friends/show.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "friend-profile");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createElement("a");
        dom.setAttribute(el3, "href", "#");
        var el4 = dom.createTextNode("delete");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "articles-container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [15, 0]);
        var morphs = new Array(9);
        morphs[0] = dom.createMorphAt(dom.childAt(element0, [1]), 0, 0);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(element0, [5]), 0, 0);
        morphs[3] = dom.createMorphAt(dom.childAt(element0, [7]), 0, 0);
        morphs[4] = dom.createMorphAt(dom.childAt(element0, [9]), 0, 0);
        morphs[5] = dom.createMorphAt(dom.childAt(element0, [11]), 0, 0);
        morphs[6] = dom.createMorphAt(dom.childAt(element0, [13]), 0, 0);
        morphs[7] = dom.createElementMorph(element1);
        morphs[8] = dom.createMorphAt(dom.childAt(fragment, [2]), 1, 1);
        return morphs;
      },
      statements: [["content", "model.firstName", ["loc", [null, [2, 5], [2, 24]]]], ["content", "model.lastName", ["loc", [null, [3, 5], [3, 23]]]], ["content", "model.email", ["loc", [null, [4, 5], [4, 20]]]], ["content", "model.twitter", ["loc", [null, [5, 5], [5, 22]]]], ["inline", "link-to", ["Back", "friends"], [], ["loc", [null, [6, 5], [6, 33]]]], ["inline", "link-to", ["Lend article", "articles.new"], [], ["loc", [null, [7, 5], [7, 46]]]], ["inline", "link-to", ["Edit info", "friends.edit", ["get", "model", ["loc", [null, [8, 42], [8, 47]]]]], [], ["loc", [null, [8, 5], [8, 49]]]], ["element", "action", ["delete", ["get", "model", ["loc", [null, [9, 35], [9, 40]]]]], [], ["loc", [null, [9, 17], [9, 42]]]], ["content", "outlet", ["loc", [null, [13, 2], [13, 12]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/friends", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 10
          }
        },
        "moduleName": "borrowers/templates/friends.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        dom.insertBoundary(fragment, null);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("borrowers/templates/partials/-header", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "revision": "Ember@1.13.11",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 15,
            "column": 0
          }
        },
        "moduleName": "borrowers/templates/partials/-header.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("nav");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" responsive ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("input");
        dom.setAttribute(el2, "id", "bmenu");
        dom.setAttribute(el2, "class", "burgercheck");
        dom.setAttribute(el2, "type", "checkbox");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("label");
        dom.setAttribute(el2, "for", "bmenu");
        dom.setAttribute(el2, "class", "burgermenu");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment(" /responsive ");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  \n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "menu");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" \n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [11]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(element1, 1, 1);
        morphs[2] = dom.createMorphAt(element1, 3, 3);
        morphs[3] = dom.createMorphAt(element1, 5, 5);
        return morphs;
      },
      statements: [["inline", "link-to", ["Borrowers", "index"], ["class", "main"], ["loc", [null, [2, 2], [2, 46]]]], ["inline", "link-to", ["Dashboard", "index"], ["class", "icon-gauge"], ["loc", [null, [10, 4], [10, 54]]]], ["inline", "link-to", ["Friends", "friends"], ["class", "icon-users-1"], ["loc", [null, [11, 4], [11, 56]]]], ["inline", "link-to", ["New Friend", "friends.new"], ["class", "icon-user-add"], ["loc", [null, [12, 4], [12, 64]]]]],
      locals: [],
      templates: []
    };
  })());
});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('borrowers/config/environment', ['ember'], function(Ember) {
  var prefix = 'borrowers';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (!runningTests) {
  require("borrowers/app")["default"].create({"LOG_RESOLVER":true,"LOG_ACTIVE_GENERATION":true,"LOG_VIEW_LOOKUPS":true,"name":"borrowers","version":"0.0.0+7b8dbb79"});
}

/* jshint ignore:end */
//# sourceMappingURL=borrowers.map