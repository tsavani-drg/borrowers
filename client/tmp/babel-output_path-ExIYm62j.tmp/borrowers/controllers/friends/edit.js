define('borrowers/controllers/friends/edit', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    isValid: _ember['default'].computed('model.email', 'model.firstName', 'model.lastName', 'model.twitter', function () {
      return !_ember['default'].isEmpty(this.get('model.email')) && !_ember['default'].isEmpty(this.get('model.firstName')) && !_ember['default'].isEmpty(this.get('model.lastName')) && !_ember['default'].isEmpty(this.get('model.twitter'));
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
        this.transitionToRoute('friends.show', this.get('model'));
        return false;
      }
    }
  });
});