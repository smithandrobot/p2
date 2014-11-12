module.exports = function(element, content) {
	if (element.label) {
		if (element.label == 'blockquote' && element.type === 'paragraph') {
			return '<blockquote><p>'+ content +'</p></blockquote>';
		} else {
			// console.log(element);
			// console.log(content);
		}
	}


	return null;
}
