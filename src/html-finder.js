function  HtmlFinder(opts) {
  opts = typeof opts === 'object' ? opts: {};
  const className = opts.className ? opts.className : "element"
  const elements = document.getElementsByClassName(className);
  const calc = () => {
    const indexToInfo = new Map();
    let index = 0;
    for(let el of elements) {
      indexToInfo.set(index, el.getBoundingClientRect());
      console.debug(`EL: ${JSON.stringify(el.getBoundingClientRect())}`);
      index++;
    }
    return indexToInfo;
  }
  return {
    calc
  }
}

export {HtmlFinder}