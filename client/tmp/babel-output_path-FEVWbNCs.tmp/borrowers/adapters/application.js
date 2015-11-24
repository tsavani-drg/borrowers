define('borrowers/adapters/application', ['exports', 'ember-data'], function (exports, _emberData) {
	exports['default'] = _emberData['default'].ActiveModelAdapter.extend({
		namespace: ''
	});
});