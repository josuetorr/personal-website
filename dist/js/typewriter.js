
class Typewriter
{
	constructor(options)
	{

		this.container = document.querySelector(options.el);
		this.textNodes = [];
		for (let element of this.container.childNodes)
		{
			this.getTextNodes(element);
		}
	}

	/**
	 * Get all the text nodes of the inner element of the div container.
	 *
	 * @param element	the current element in the html tree of the main container
	 */
	getTextNodes(element)
	{
		if (element.hasChildNodes())	
		{
			for (let child of element.childNodes)
			{
				this.getTextNodes(child);
			}
		}
		else
		{
			let text = element.nodeValue;
			element.nodeValue = '';
			this.textNodes.push({ textNode: element, text: text});
		}
	}

	/**
	 * We begin by selecting the first text node. If the value of currentNode.text is equal to an empty
	 * string, then we selected the next textNode. This is done thanks to current index
	 *
	 */
	type()
	{
		let currentIndex = 0;
		let currentNode = this.textNodes[currentIndex];	
		let intervalId = setInterval(() => 
		{
			if (currentNode.text != '' && currentNode.text)
			{
				currentNode.textNode.nodeValue += currentNode.text.charAt(0);
				currentNode.text = currentNode.text.slice(1);
			}
			else if (currentIndex < this.textNodes.length)
			{
				currentNode = this.textNodes[currentIndex++];
			}
			else
			{
				clearInterval(intervalId);
			}
				
		}, 10);

	}

}

const tw = new Typewriter({
	el: '#typewriter'
});

tw.type();



