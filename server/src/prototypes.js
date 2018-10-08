// Strings
String.prototype.handleWhitespace = function() {
  return this.trim().replace(/\n\s*\n\s*\n/g, '\n\n');
};
