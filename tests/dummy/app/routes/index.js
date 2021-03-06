import Ember from 'ember';
import I18nMixin from '../mixins/i18n';

export default Ember.Route.extend(I18nMixin, {
  countObj: Ember.Object.create({ count: 1000 }),

  beforeModel: function () {
    var i18next = this.get('i18n');
    return i18next.initLibraryAsync();
  },

  model: function () {
    return this.get('countObj');
  },

  actions: {
    changeLanguage: function () {
      var service = this.get('i18n');
      service.set('locale', 'th');
    },

    changeCount: function () {
      this.get('countObj').set('count', 5000);
    }
  }
});
