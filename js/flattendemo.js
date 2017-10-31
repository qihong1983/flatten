var unflatten2 = function(table) {
  var result = {};

  for (var path in table) {
    var cursor = result,
      length = path.length,
      property = "",
      index = 0;

    while (index < length) {
      var char = path.charAt(index);

      if (char === "[") {
        var start = index + 1,
          end = path.indexOf("]", start),
          cursor = cursor[property] = cursor[property] || [],
          property = path.slice(start, end),
          index = end + 1;
      } else {
        var cursor = cursor[property] = cursor[property] || {},
          start = char === "." ? index + 1 : index,
          bracket = path.indexOf("[", start),
          dot = path.indexOf(".", start);

        if (bracket < 0 && dot < 0) var end = index = length;
        else if (bracket < 0) var end = index = dot;
        else if (dot < 0) var end = index = bracket;
        else var end = index = bracket < dot ? bracket : dot;

        var property = path.slice(start, end);
      }
    }

    cursor[property] = table[path];
  }

  return result[""];
}

var unflatten1 = function(data) {

  "use strict";
  if (Object(data) !== data || Array.isArray(data))
    return data;
  var result = {},
    cur, prop, parts, idx;
  for (var p in data) {
    cur = result, prop = "";
    parts = p.split(".");
    for (var i = 0; i < parts.length; i++) {
      idx = !isNaN(parseInt(parts[i]));
      cur = cur[prop] || (cur[prop] = (idx ? [] : {}));
      prop = parts[i];
    }
    cur[prop] = data[p];
  }
  return result[""];
}
var flatten1 = function(data) {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop ? prop + "." + i : "" + i);
      if (l == 0)
        result[prop] = [];
    } else {
      var isEmpty = true;
      for (var p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + "." + p : p);
      }
      if (isEmpty)
        result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}

////

var flatten2 = (function(isArray, wrapped) {
  return function(table) {
    return reduce("", {}, table);
  };

  function reduce(path, accumulator, table) {
    if (isArray(table)) {

      accumulator[path] = table;
    } else {
      var empty = true;

      if (path) {
        for (var property in table) {
          var item = table[property],
            property = path + "." + property,
            empty = false;
          if (wrapped(item) !== item) accumulator[property] = item;
          else reduce(property, accumulator, item);
        }
      } else {
        for (var property in table) {
          var item = table[property],
            empty = false;
          if (wrapped(item) !== item) accumulator[property] = item;
          else reduce(property, accumulator, item);
        }
      }

      if (empty) accumulator[path] = table;
    }

    return accumulator;
  }
}(Array.isArray, Object));


/**
 * @class FlattenDemo
 * @constructor
 * @param opt {object} 参数
 */

function FlattenDemo(opt) {
  if (!(this instanceof FlattenDemo)) {
    return new FlattenDemo(opt);
  }

  this.data = null;
}


FlattenDemo.prototype = {
  init: function() {
    this.getData();
  },
  getData: function() {
    var data = {};
    this.ajax("./js/data.json", 'post', data, this.setData.bind(this));
  },
  setData: function(msg) {
    // console.log(msg, 'msg');

    this.data = msg;
    this.addEvent();


    // flatten1(msg);
  },
  addEvent: function() {
    $('#j_data').off('click').on('click', function(e) {

      e.stopPropagation();
      console.log(this.data);
      return false;
    }.bind(this));

    $("#j_flattenData").off('click').on('click', function(e) {
      e.stopPropagation();
      // console.log();
      console.log(flatten1(this.data));

      return false;
    }.bind(this));
  },
  /**
   * 基于jquery ajax 二次封装的ajax
   */
  ajax: function(url, type, data, callback) {
    type = type || 'get';
    $.ajax({
      url: url,
      type: type,
      data: data,
      dataType: 'json',
      error: function(jqXHR, textStatus, errorThrown) {
        // alert(textStatus);
      },
      success: function(respData, textStatus, jqXHR) {
        callback(respData);
      }.bind(this)

    });
  }
}