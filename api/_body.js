// Reads a JSON request body safely. Hosts differ: some hand over an object,
// some a raw string, and some nothing at all (e.g. no JSON Content-Type).
module.exports = function readBody(req) {
  let b = req.body;
  if (typeof b === 'string' || Buffer.isBuffer(b)) {
    try { b = JSON.parse(String(b)); } catch (e) { b = null; }
  }
  return b && typeof b === 'object' ? b : {};
};
