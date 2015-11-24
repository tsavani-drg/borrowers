define('borrowers/models/friend', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
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