define('borrowers/models/friend', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    firstName: _emberData['default'].attr('string'),
    lastName: _emberData['default'].attr('string'),
    email: _emberData['default'].attr('string'),
    twitter: _emberData['default'].attr('string'),
    totalArticles: _emberData['default'].attr('number')
  });
});