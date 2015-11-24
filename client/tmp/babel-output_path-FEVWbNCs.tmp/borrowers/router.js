define('borrowers/router', ['exports', 'ember', 'borrowers/config/environment'], function (exports, _ember, _borrowersConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _borrowersConfigEnvironment['default'].locationType
  });

  Router.map(function () {
    // this.resource('friend', function(){ });
    this.route('friends', function () {
      this.route('new');
      this.route('show', { path: ':friend_id' });
      this.route('edit', { path: ':friend_id/edit' });
    });
  });

  exports['default'] = Router;
});