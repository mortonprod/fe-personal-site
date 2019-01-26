function  HtmlFinder(opts) {
  opts = typeof opts === 'object' ? opts: {};
  const className = opts.className ? opts.className : "element"
  const elements = document.getElementsByClassName(className);
  const getIndexToElement = () => {
    const indexToElement = new Map();
    let index = 0;
    for(let el of elements) {
      indexToElement.set(index, el);
      console.debug(`EL: ${JSON.stringify(el.getBoundingClientRect())}`);
      index++;
    }
    return indexToElement;
  }
  return {
    getIndexToElement
  }
}

export {HtmlFinder}