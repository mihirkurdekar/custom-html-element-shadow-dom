class MyIcon extends HTMLElement {
  constructor() {
    super();
    this._color = null;
    const shadowRoot = this.attachShadow({ mode: "open" });
    var object = document.createElement('object');
    object.data = 'android.svg';
    object.type = 'image/svg+xml';
    shadowRoot.appendChild(object);
    object.addEventListener('load', function () {
      object.contentDocument.querySelector('g').setAttribute('fill', object.parentNode.host.attributes['color'].value);
    });
  }

  static get observedAttributes() { return ["color"]; }

  attributeChangedCallback(name, oldValue, newValue) {
    // name will always be "country" due to observedAttributes
    this._color = newValue;
    this._updateRendering();
  }
  connectedCallback() {
    this._updateRendering();
  }

  get color() {
    return this._color;
  }
  set color(v) {
    this.setAttribute("color", v);
  }

  _updateRendering() {
    // Left as an exercise for the reader. But, you'll probably want to
    // check this.ownerDocument.defaultView to see if we've bee1n
    // inserted into a document with a browsing context, and avoid
    // doing any work if not.
    if (this.shadowRoot.querySelector('object').contentDocument != null) {
      var doc = this.shadowRoot.querySelector('object').contentDocument;
      if (doc.querySelector('g') != null) {
        doc.querySelector('g').setAttribute('fill', this._color);
      }
    }
  }
}
customElements.define("my-icon", MyIcon);