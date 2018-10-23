const navegateSPA = (url, selector, push = true) => {
  
  if(!url || !selector) return false
  const selectors = selector.split(/[\s,]+/)

  selectors.forEach((selectorItem) => {
    const el = document.querySelector(selectorItem)
    fetch(url)
      .then(resp => resp.text())
      .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, "text/html");
        let docSelector = doc.querySelector(selectorItem).innerHTML
        el.innerHTML = docSelector
      })
  })

  if(push)
    history.pushState({selector}, null, url)
}

document.querySelectorAll('[spa-href]').forEach(link => {
  const url = link.attributes['spa-href'].value
  const selector = link.attributes['spa-selector'].value

  link.onclick = e => {
    e.preventDefault()
    navegateSPA(url, selector)
  }
})

window.onpopstate = e => {
  if(e.state) 
    navegateSPA(window.location.href, e.state.selector, false)
}
