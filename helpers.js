function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}




var helpers = {
	firstArticleInIssue: function(issue) {
		var groups = issue.getGroup('issue.articles');
		var articleID = groups? groups.toArray()[0].getLink('article').document.id : false;

		if (articleID) {
			var article = issue.loadedDocuments[articleID]
			return article;
		} else {
			return false;
		}
	},

	offsetArticleInIssue: function(issue, article, offset) {
		var searchID = article.id;
		var groups = issue.getGroup('issue.articles');
		groups = groups? groups.toArray() : [];
		var length = groups.length;

		for (var i = 0; i < length; i++) {
			var currentID = groups[i].getLink('article').document.id

			if ((currentID === searchID)) {
				if ((i + offset < length) && (i + offset >= 0)) {
					var foundID = groups[i+offset].getLink('article').document.id;
					return issue.loadedDocuments[foundID];
				} else {
					return false;
				}
			}
		}

		return false;
	},

	nextArticleInIssue: function(issue, article) {
		return this.offsetArticleInIssue(issue, article, 1);
	},

	prevArticleInIssue: function(issue, article) {
		return this.offsetArticleInIssue(issue, article, -1);
	},

	articleURLParams: function(issue, article) {
		return { issueNum: issue.getNumber('issue.issue_number'), slug: article.getText('article.slug') };
	},

	/**
	 * returns the first article from the articles with an id found in the list of linked documents
	 *
	 * note: if issues are able to link to more than just articles, this will need 
	 * to be changed to only search the issue.articles array
	 **/
	articleInIssue: function(articles, issue) {
		var issueArticleIDs = issue.linkedDocuments.map(function(doc) {
			return doc.id;
		});

		for (var i = 0; i < articles.length; i++) {
			if (issueArticleIDs.indexOf(articles[i].id) > -1) {
				return articles[i];
			}
		}

		throw "No article found in issue";
	},

	// Issue related
	issueLabel: function(issue) {
		return 'Issue '+ issue.getText('issue.issue_number') +', '+ issue.getText('issue.issue_date');
	},
	issueLabelShort: function(issue) {
		return 'Issue'+ pad(issue.getText('issue.issue_number'), 2) +', '+ issue.getText('issue.issue_date');
	},

	issuePageNumber: function(issue, article) {
		var articles = issue.getGroup('issue.articles');
		articles = articles? articles.toArray() : [];
		var articleID = article.id;
		var articleIndex = null;

		for(var i = 0; i < articles.length; i++) {
			if (articleID === articles[i].getLink('article').document.id) {
				articleIndex = i + 1;
				break;
			}	
		}

		return 'Page '+ articleIndex +' / '+ articles.length;
	}
};

GLOBAL.helpers = helpers;
