export var hasObjectObserve = (function detectObjectObserve() {
  if (typeof (<any>Object).observe !== 'function') {
    return false;
  }

  var records = [];

  function callback(recs) {
    records = recs;
  }

  var test:any = {};
  (<any>Object).observe(test, callback);
  test.id = 1;
  test.id = 2;
  delete test.id;

  (<any>Object).deliverChangeRecords(callback);
  if (records.length !== 3)
    return false;

  if (records[0].type != 'add' ||
      records[1].type != 'update' ||
      records[2].type != 'delete') {
    return false;
  }

  (<any>Object).unobserve(test, callback);

  return true;
})();

export var hasArrayObserve = (function detectArrayObserve() {
  if (typeof (<any>Array).observe !== 'function') {
    return false;
  }

  var records = [];

  function callback(recs) {
    records = recs;
  }

  var arr = [];
  (<any>Array).observe(arr, callback);
  arr.push(1, 2);
  arr.length = 0;

  (<any>Object).deliverChangeRecords(callback);
  if (records.length !== 2)
    return false;

  if (records[0].type != 'splice' ||
      records[1].type != 'splice') {
    return false;
  }

  (<any>Array).unobserve(arr, callback);

  return true;
})();
