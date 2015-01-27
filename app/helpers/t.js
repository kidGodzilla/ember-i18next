import Stream from 'ember-i18next/utils/stream';

export default function tHelper(params, hash) {
  var path = params.shift();

  var container = this.container;
  var t = container.lookup('utils:t');
  var application = container.lookup('application:main');

  var stream = new Stream(function() {
    return t(path, hash);
  });

  // bind any arguments that are Streams
  for (var i = 0, l = params.length; i < l; i++) {
    var param = params[i];
    if(param && param.isStream){
      param.subscribe(stream.notify, stream);
    }
  }

  application.localeStream.subscribe(stream.notify, stream);

  if (path.isStream) {
    path.subscribe(stream.notify, stream);
  }

  return stream;
}
