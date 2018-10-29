const navegationSPA = (hash, loadHash = false) => {
  if(!hash) return false

  let url
  (hash == '#index' || !hash) ? url = 'home.html' : url = `${hash.substr(1)}.html`
  const insertPromisesDOM = html => {
    let parser = new DOMParser()
    let doc = parser.parseFromString(html, 'text/html')
    if(!loadHash) {
      let selectors = doc.querySelector('[spa-selector]').attributes['spa-selector'].value.split(' ')
      // selectors.push('title', 'meta[name="description"]');  

      selectors.forEach(selectorItem => {
        let docSelectorTEXT = doc.querySelector(selectorItem).innerHTML
        let selectorDOM = document.querySelector(selectorItem)
        if(doc && docSelectorTEXT) {
          selectorDOM.innerHTML = docSelectorTEXT
        } else if(doc && !docSelectorTEXT) {
          let docSelectorTEXT = doc.querySelector(selectorItem)
          selectorDOM.parentNode.replaceChild(docSelectorTEXT, selectorDOM);
        }
      })
    } else {
      let docSelectorTEXT = doc.querySelector('html').innerHTML
      let selectorDOM = document.querySelector('html')
      selectorDOM.innerHTML = docSelectorTEXT
    }
    activeAnchors(hash)
  }
  
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        fetch('404.html')
          .then(response => response.text())
          .then(html => {
            if(html) insertPromisesDOM(html)
          })
      .catch(e => console.log(e))
      }
    })
    .then(html => {
      if(html) insertPromisesDOM(html)
    })
  .catch(e => console.log(e))
}

const activeAnchors = hash => {
  let allAnchors = document.querySelectorAll(`[href]`)
  allAnchors.forEach(o => {
    o.getAttribute('href') == hash ? o.classList.add('-active') : o.classList.remove('-active')
  })
};
 
(function loadHashUrl(loadHash) {
  location.hash ? loadHash = location.hash : loadHash = '#index'
  navegationSPA(loadHash, true)
})()

window.onhashchange = e => {
  navegationSPA(location.hash)
}
