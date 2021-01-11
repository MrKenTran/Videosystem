import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
class StudentView2 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <div class="circle">1</div>
        <h1>Upload a video </h1>
      </div>
    `;
  }
}

customElements.define('student-view2', StudentView2);
