import { LitElement, html, css } from 'lit-element';

class VideoTranscript extends LitElement {
  static get properties() {
    return {
      cues: { type: Array },
      activecues: { type: Array }
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        ul {
          list-style-type: none;
          width: 300px;
          height: 90vh;
          padding: 0;
          margin: 0;
          overflow-y: auto;
          padding: 10px;
        }

        li {
          padding: 3px 6px;
        }

        li.active {
          background: #ddd;
        }
      `
    ];
  }

  constructor() {
    super();
    this.cues = [];
  }

  /**
   * Create an unnumbered list with all cues from Array
   * cues.
   *
   * @return {litHtml} html containing the list with all items
   */
  render () {
    return html`
      <h2>Transkript</h2>
      <ul>
        ${this.cues.map(cue=>{
          return html`<li data-id="${cue.id}" data-starttime="${cue.startTime}">
            ${cue.text}
          </li>`;
        })}
      </ul>
    `;
  }

  /**
   * The list has been added to the DOM, add event listener to detect
   * when user clicks on a cue and generate a "jumToTimecode" event
   * that contains the start time for the given cue.
   */
  firstUpdated() {
    this.shadowRoot.querySelector('ul').addEventListener('click', e=>{
      if (e.path[0].tagName=='LI') { // User clicked on a cue
        this.dispatchEvent(new CustomEvent("jumpToTimecode", {
          bubbles: true,
          composed: true,
          detail:{
            timeCode:e.path[0].dataset.starttime
          }
        }));
      }
    });
  }

  /**
   * Called whenever any of the properties changes.
   * Used to manipulate the active class in the list of cues
   * and scroll the list to keep the active cue as sentered as possible.
   *
   * @param  {[Array]} changedProperties [description]
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName=='activecues') {   // Only act when the activecues property changes
        this.shadowRoot.querySelectorAll('li').forEach(li=>{  // Remove class=active from all items in list
          li.classList.remove('active');
        });
        this.activecues.forEach(startTime=>{  // Add class=active to active cues and center list on active cue
          this.shadowRoot.querySelector(`[data-starttime="${startTime}"]`).classList.add('active');
          // console.log(this.shadowRoot.querySelectorAll(`[data-starttime="${startTime}"]`));
          const node = this.shadowRoot.querySelector(`[data-starttime="${startTime}"]`);
          const parent = node.parentElement;
          const height = parent.clientHeight;
          const top = node.offsetTop - parent.offsetTop;
          if (top<height/2) {       // Active element is not half way down
            parent.scrollTop = 0;
          } else {                  // Scroll to show active element centered
            parent.scrollTop = top- height/2;
          }
        });
      }
    });
  }
}

customElements.define('video-transcript', VideoTranscript);
