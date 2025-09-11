"use strict";

module.exports = {
  bicycle: bicycleModel(),
};

function bicycleModel() {
  const db = {
    1: { brand: "Veloretti", color: "green" },
    2: { brand: "Batavus", color: "yellow" },
  };

  return {
    read,
  };

  // This function, named 'read', is used to retrieve a bicycle entry from the in-memory 'db' object by its 'id'.
  // It takes two arguments: 'id' (the identifier of the bicycle) and 'cb' (a callback function).
  // If the 'db' does not contain an entry for the given 'id', it calls the callback asynchronously with an error ("not found").
  // If the entry exists, it calls the callback asynchronously with 'null' as the error and the bicycle data as the result.
  function read(id, cb) {
    if (!db.hasOwnProperty(id)) {
      const err = Error("not found");
      setImmediate(() => cb(err));
      return;
    }
    setImmediate(() => cb(null, db[id]));
  }
}
