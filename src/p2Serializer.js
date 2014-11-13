module.exports = function(element, content) {
    if (element.type == 'label') {
        if (element.data.label == 'code') {
            return '<span class="inline-code"><code>'+ content +'</code></span>';
        }
    }

	if (element.label) {
		if (element.label == 'blockquote' && element.type === 'paragraph') {
			return '<blockquote><p>'+ content +'</p></blockquote>';
		} else if (element.label == 'code') {
			return '<pre><code class="gist">'+ content +'</code></pre>';
		}
	}

	return null;
}
