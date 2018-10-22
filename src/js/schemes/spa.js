const navegateSPA = (hash, loadHash = false) => {
  if(!hash) return false

  var url
  (hash == '#/' || hash == '#/index' || !hash) ? url = 'home.html' : url = hash.substr(2)+'.html'
  fetch(url)
    .then(resp => resp.text())
    .then(html => {
      let parser = new DOMParser()
      let doc = parser.parseFromString(html, 'text/html')
      if(!loadHash) {
        let selectors = doc.querySelector('[spa-selector]').attributes['spa-selector'].value.split(' ')
        selectors.push('title'); 
        selectors.forEach((selectorItem) => {
          let docSelectorTEXT = doc.querySelector(selectorItem).innerHTML
          let selectorDOM = document.querySelector(selectorItem)
          selectorDOM.innerHTML = docSelectorTEXT
        })
      } else {
        let docSelectorTEXT = doc.querySelector('html').innerHTML
        let selectorDOM = document.querySelector('html')
        selectorDOM.innerHTML = docSelectorTEXT
      }
    })
}

const loadHashUrl = (loadHash) => {
  location.hash ? loadHash = location.hash : loadHash = '#/'
  navegateSPA(loadHash, true)
}; loadHashUrl()

window.onhashchange = e => {
  navegateSPA(location.hash)
}
