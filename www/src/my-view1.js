import { LitElement, html, css } from 'lit-element';


class MyView1 extends LitElement {
  static get properties () {
  return {
    showLogin: {
      type: Boolean,
      value: false
    },
    showStatus: {
      type: Boolean,
      value: false
    },
    loggedIn: {
      type: Boolean,
      value: false
    },
    admin: {
      type: Boolean,
      value: false
    },
    teacher: {
      type: Boolean,
      value: false
    },
    student: {
      type: Boolean,
      value: false
    },
    uname: {
      type: String
    },
    hasAvatar: {
      type: Boolean,
      value: false
    }
  }
}

constructor () {
  super();
  }

  static get styles() {
    return css`
    :host {
      display: block;
    }

    ul {
      list-style-type: none;
    }

    ul li span:first-of-type {
      display: inline-block;
      width: 23em;
    }

    ul li span:nth-of-type(2) {
      display: inline-block;
      width: 14em;
    }

    /* style from shared-styles */
    .card {
      margin: 24px;
      padding: 16px;
      color: #757575;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }

    h1 {
      margin: 16px 0;
      color: #212121;
      font-size: 22px;
    }

    /* Specify the tag's width so that the other tags
    on the same line starts at the same x-axis */
    label {
      display: inline-block;
      width: 8em;
    }

    /* Since the submit button doesn't have
    a label, add a margin-left instead */
    button {
      margin-left: 10em;
    }

    `;
  }
  

  render() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>
  
      <div class="card">
        <h1>Registrer deg</h1>
        <form class="login" onsubmit="javascript: return false;">
          <label for="uname">Brukernavn</label>
          <input type="email" id="uname" name="uname"><br>
          <label for="pwd">Passord</label>
          <input type="password" id="pwd" name="pwd"><br>
          <label for="type">Velg brukertype:</label>
          <select id="type" name="type">
            <option value="student">Student</option>
            <option value="teacher">Laerer</option>
          </select><br>
          <button @click="${this.register}">Registrer</button>
        </form>
      </div> 
      `;
  }

  register(e) {
    const data = new FormData(e.target.form); // Wrap the form in a FormData object
    const values = [...data.values()];
    fetch (`${window.MyAppGlobals.serverURL}api/register.php`, {
        method: 'POST',
        credentials: "include",
        body: data
      }
    ).then(res=>res.json())       // When a reply has arrived
    .then(res=>{
      if (res.status=='SUCCESS') {  // Successfully logged in
        alert('Bruker er registrert, klikk ikonet til høyre for å logge inn.')
      }
      else {
        alert('Brukernavnet er tatt. Prøv et annet.') 
      }                            
    })
  }
}


customElements.define('my-view1', MyView1);


