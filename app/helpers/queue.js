var Memori = require("memori");

//==============================================================================

module.exports = Queue;

//==============================================================================

//-- single connection
var cache = null;

function Queue(id) {
  this._id = id || 0;
  this._key = "message:" + this._id;

  Object.defineProperty(this, "id", {
    get: function() {
      return this._id;
    }
  });

  Object.defineProperty(this, "key", {
    get: function() {
      return this._key;
    }
  });

  Object.defineProperty(this, "cache", {
    get: function() {
      if (!cache) {
        cache = new Memori({prefix: "delivery-boy:"});
      }
      return cache;
    }
  });
}

//==============================================================================

Queue.prototype.push = function(message, done) {
  var self = this;

  self.cache.push(self.key, message, function(err) {
    done(err);
  });
};


//------------------------------------------------------------------------------

Queue.prototype.pop = function(done) {
  var self = this;
  var retry = 0;

  function poll() {
    self.cache.pop(self.key, function(err, message) {
      if (err || message || ++retry >= 30) {
        return done(err, message);
      }
      setTimeout(poll, 999);
    });
  }

  poll();
};

//==============================================================================
