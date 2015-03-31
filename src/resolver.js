var _ = require('lodash');

var pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

var Resolver = function(base) {
  this.base = base || '';
  this._cache = {};

  _.bindAll(this, 'cacheResults', 'getCached', 'resolve');
};

Resolver.prototype.cacheResults = function(results) {
  var objects = _.zipObject(_.pluck(results.results, 'id'), results.results);
  _.extend(this._cache, objects);
};

Resolver.prototype.getCached = function(id) {
  return this._cache[id];
}

Resolver.prototype.resolve = function(ctx, isBroken) {
  var path = '';
  switch(ctx.type) {
    case 'issue':
      path = this.resolveIssue(ctx);
      break;
    case 'article':
      path = this.resolveArticle(ctx);
      break;
    default:
      throw "Could not resolve link" + ctx;
      return "#";
  }

  return this.base + path;
};

Resolver.prototype.resolveArticle = function(ctx) {
  var issues = _.filter(this._cache, function(document) {
    if (document.type != 'issue') return false;

    return _.filter(document.fragments['issue.articles'].value, function(article) {
      return article.article.value.document.id == ctx.id;
    }).length > 0
  });

  if (issues.length != 1) { throw "Cannot resolve article. Duplicate issues found: " + ctx }

  var issueNumber = pad(issues[0].get('issue.issue_number').asText(), 2);
  return '/issue' + issueNumber +'/' + ctx.slug;
};

Resolver.prototype.resolveIssue = function(ctx) {
  var issue = this.getCached(ctx.id);
  var issueNumber = issue.get('issue.issue_number').asText();
  return '/issue' + pad(issueNumber, 2) + '/index/';
};

module.exports = Resolver;
