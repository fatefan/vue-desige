var packageInfo = require('./package.json');
var zipper = require('zip-local');
var d = new Date();
var zipName = packageInfo.name + "_" + packageInfo.version+"#"+(d.getMonth()+1)+"-"+d.getDate()+"__"+d.getHours()+"--"+d.getMinutes();
zipper.sync.zip("build/").compress().save('zip/'+zipName+ ".zip");