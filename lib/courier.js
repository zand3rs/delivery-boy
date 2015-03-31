var Memori = require("memori");

//==============================================================================

module.exports = Courier;

//==============================================================================

//-- single connection
var cache = null;

function Courier(id) {
  this._id = id || 0;
  this._queue = "message:" + this._id;

  Object.defineProperty(this, "id", {
    get: function() {
      return this._id;
    }
  });

  Object.defineProperty(this, "queue", {
    get: function() {
      return this._queue;
    }
  });

  Object.defineProperty(this, "cache", {
    get: function() {
      if (!cache) {
        cache = new Memori({prefix: "courier:"});
      }
      return cache;
    }
  });
}

//==============================================================================

Courier.prototype.send = function(message, done) {
  var self = this;

  self.cache.push(self.queue, message, function(err) {
    done(err);
  });
};


//------------------------------------------------------------------------------

Courier.prototype.recv = function(done) {
  var self = this;
  var retry = 0;

  function poll() {
    self.cache.pop(self.queue, function(err, message) {
      if (err || message || ++retry >= 30) {
        return done(err, message);
      }
      setTimeout(poll, 999);
    });
  }

  poll();
};

//==============================================================================
