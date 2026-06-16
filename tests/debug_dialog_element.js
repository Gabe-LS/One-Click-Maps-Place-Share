// Paste in Console BEFORE clicking share.
// Checks if Maps uses native <dialog> elements.

// 1. Check for existing <dialog> elements
var dialogs = document.querySelectorAll('dialog');
console.log('Existing <dialog> elements:', dialogs.length);
for (var i = 0; i < dialogs.length; i++) {
  console.log('  ', dialogs[i].outerHTML.substring(0, 200));
}

// 2. Monkey-patch showModal to catch it being called
var origShow = HTMLDialogElement.prototype.showModal;
HTMLDialogElement.prototype.showModal = function() {
  console.log('showModal() called on:', this.tagName, this.className, this.id);
  console.log('  HTML:', this.outerHTML.substring(0, 300));
  debugger;
  return origShow.apply(this, arguments);
};

// 3. Also patch show()
var origShowNm = HTMLDialogElement.prototype.show;
HTMLDialogElement.prototype.show = function() {
  console.log('show() called on:', this.tagName, this.className, this.id);
  debugger;
  return origShowNm.apply(this, arguments);
};

console.log('[GMBS debug] <dialog> observer active — click share now');
