// Paste this in DevTools Console, then click the share button.
// It will pause (debugger) on the exact element that gets a
// semi-transparent background, showing its tag, class, and
// which attribute changed.

new MutationObserver(function(m) {
  m.forEach(function(r) {
    if (r.type === 'attributes') {
      var el = r.target;
      var rect = el.getBoundingClientRect();
      if (rect.width > 500 && rect.height > 500) {
        var bg = getComputedStyle(el).backgroundColor;
        var opacity = getComputedStyle(el).opacity;
        if ((bg.includes('0.') && bg !== 'rgba(0, 0, 0, 0)') || opacity !== '1') {
          console.log('BACKDROP FOUND:', {
            tag: el.tagName,
            class: el.className,
            id: el.id,
            role: el.getAttribute('role'),
            ariaModal: el.getAttribute('aria-modal'),
            attr: r.attributeName,
            oldValue: r.oldValue,
            bg: bg,
            opacity: opacity,
            zIndex: getComputedStyle(el).zIndex,
            html: el.outerHTML.substring(0, 300)
          });
          debugger;
        }
      }
    }
    // Also check for new nodes with dark backgrounds
    if (r.type === 'childList') {
      for (var i = 0; i < r.addedNodes.length; i++) {
        var node = r.addedNodes[i];
        if (node.nodeType !== 1) continue;
        var rect2 = node.getBoundingClientRect();
        if (rect2.width > 500 && rect2.height > 500) {
          var bg2 = getComputedStyle(node).backgroundColor;
          if (bg2.includes('0.') && bg2 !== 'rgba(0, 0, 0, 0)') {
            console.log('NEW BACKDROP NODE:', {
              tag: node.tagName,
              class: node.className,
              bg: bg2,
              html: node.outerHTML.substring(0, 300)
            });
            debugger;
          }
        }
      }
    }
  });
}).observe(document.body, {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['class', 'style', 'aria-modal', 'role'],
  attributeOldValue: true
});

console.log('[GMBS debug] Backdrop observer active — click the share button now');
