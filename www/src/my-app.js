/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import './my-icons.js';
import './user-status.js';
import './video-list-view.js';
import './playlist-list-view.js';
import './video-view.js';

import store from './redux/store/index';

// console.log('store.getState().video: ', store.getState().video)

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class MyApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

        .user {
          float: right;
          width: 64px;
          height: 100%;
          border: 1px solid red;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <!-- Menu -->
      <app-drawer-layout fullbleed="" narrow="{{narrow}}">
        <!-- Drawer content -->
        <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
          <app-toolbar>Meny</app-toolbar>
          <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a name="register" href="[[rootPath]]register">Registrer deg</a>
            <template is="dom-if" if="{{user.isAdmin}}">
              <!-- Only admins will see this. -->
              <a name="videolist" href="[[rootPath]]videolist">Videoer</a>
              <a name="videoupload" href="[[rootPath]]videoupload">Last opp video</a>
              <a name="playlistlist" href="[[rootPath]]playlistlist">Spillelister</a>
              <a name="playlistcreate" href="[[rootPath]]playlistcreate">Opprett spilleliste</a>
              <a name="admin" href="[[rootPath]]admin">Rediger brukere</a>
            </template>
            <template is="dom-if" if="{{user.isTeacher}}">
              <!-- Only teachers will see this. -->
              <a name="videolist" href="[[rootPath]]videolist">Videoer</a>
              <a name="videoupload" href="[[rootPath]]videoupload">Last opp video</a>
              <a name="playlistlist" href="[[rootPath]]playlistlist">Spillelister</a>
              <a name="playlistcreate" href="[[rootPath]]playlistcreate">Opprett spilleliste</a>
            </template>
            <template is="dom-if" if="{{user.isStudent}}">
              <!-- Only students will see this. -->
              <a name="videolist" href="[[rootPath]]videolist">Videoer</a>
              <a name="playlistlist" href="[[rootPath]]playlistlist">Spillelister</a>
            </template>
          </iron-selector>
        </app-drawer>

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">
          <!-- Header -->
          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
              <template is="dom-if" if="{{user.isAdmin}}">
              <div main-title="">Admin </div> 
              </template>
              <template is="dom-if" if="{{user.isTeacher}}">
              <div main-title="">Lærer </div> 
              </template>
              <template is="dom-if" if="{{user.isStudent}}">
              <div main-title="">Student </div> 
              </template>
              <div main-title="">Velkommen til NTNUs videoopplastning </div> 
              <user-status></user-status>
            </app-toolbar>
          </app-header>

          <!-- Page content -->
          <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
            <my-view1 name="register"></my-view1>
            <admin-view1 name="admin"></admin-view1>
            <video-list-view name="videolist"></video-list-view>
            <playlist-list-view name="playlistlist"></playlist-list-view>
            <video-view name="video" videoid="[[videoid]]"></video-view>
            <playlist-view name="playlist" playlistid="[[playlistid]]"></playlist-view>
            <video-upload-view name="videoupload"></video-upload-view>
            <playlist-create-view name="playlistcreate"></playlist-create-view>
            <admin-view2 name="admin2"><admin-view2>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>
      </app-drawer-layout>
    `;
  }


  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      routeData: Object,
      subroute: Object,
      user: {
        type: Object,
        value: { student: false, teacher: false, admin: false }
      }
    };
  }

  constructor() {
    super();
    const data = store.getState();
    this.user = data.user;
    store.subscribe((state)=>{
      this.user = store.getState().user;
    })
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }

  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = 'register';
    } else if (['register', 'admin', 'admin2', 'videolist', 'video', 'videoupload', 'playlist', 'playlistcreate', 'playlistlist'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case 'register':
        import('./my-view1.js');
        break;
      case 'admin':
        import('./admin-view1.js');
        break;
      case 'admin2':
        import('./admin-view2.js');
        break;
      case 'videolist':
        import('./video-list-view.js');
        break;
      case 'video':
        import('./video-view.js');
        break;
      case 'videoupload':
        import('./video-upload-view.js');
        break;
      case 'playlistcreate':
        import('./playlist-create-view.js');
        break;
      case 'playlistlist':
        import('./playlist-list-view.js');
        break;
      case 'playlist':
        import('./playlist-view.js');
        break;
      case 'view404':
        import('./my-view404.js');
        break;
    }
  }
}

window.customElements.define('my-app', MyApp);
