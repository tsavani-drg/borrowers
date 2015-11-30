import Ember from 'ember';

export default Ember.Controller.extend({
  isValid: Ember.computed('model.description', function() {
    return !Ember.isEmpty(this.get('model.description'));
  }),

  actions:{
    save:function(){
      if (this.get('isValid')) {
        return true;
      }  
      else{
        this.set('errorMessage','You have to fill all the fields');
        return false;
      }   
    },
    cancel:function(){
      return true;
    }
  }  
});