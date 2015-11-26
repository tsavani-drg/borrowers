import FriendsBaseController from './base';

export default FriendsBaseController.extend({
  actions:{
    cancel:function(){
      this.get('model').deleteRecord();
      this.transitionToRoute('friends');
      return false;
    }
  }  
});
