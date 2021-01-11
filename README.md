# Prosjekt 2 - IMT2291 - Våren 2019 #

Rediger readme filen og legg inn navnene på deltakerne på gruppen før dere begynner med noe annet :-).

Beskrivelsen til oppgaven finnes i [Wikien til det opprinnelige prosjektet](https://bitbucket.org/okolloen/imt2291-prosjekt2-2019/wiki/Home).

Bruk Wikien til deres eget prosjekt til å dokumentere prosjektet slik det er beskrevet i oppgaven.


## Group Members
Kenneth Tran and Pål Syvertsen Stakvik.

Initially we had Sebastian Hellander on our team, but from early on he went absent, for some weeks, until he one day announced that he was leaving the group. He had not contributed to our project yet, so for this project we were only two students working on it.


## Notices

### Use Chrome
Our site only works fully in Chrome. In eg. Firefox the login-popup doesn't appear when you click at the log-in icon in the top-right corner. Also video transcript doesn't display in Firefox.

### App isn't fully SPA
We're aware of that our site is not fully a single page application, to access some of our pages the browser will do a refresh before the user arrives to it. In addition, any permanent changes you're doing to the site content, like uploading a new video or changing another user's type, one has to refresh the page in order to see the change.

The refreshing when navigating between different pages is something which we tried to avoid, but couldn't. In order to do a refresh-less pageswap, we would normally use <a>-tags to be the “door” to the new page. But since it was too difficult to implement event-handlers in <a>-tags, we decided to use <button>-tags as the “doorway”. Using <button> would unfortunately cause the browser to do a reload.

## Logging in
To log in, click the person silhouette icon in the top-right corner. This will bring up a log-in pop-up.

## Username & password for pre-registered user
### Username	–	Password

admin@ntnu.no	– admin

## Usage

Make sure you do not have any conflicting volumes, run : docker volume prune

Download dependencies with npm, go into the www folder (on the host machine) and run: npm install

First time usage, rebuild everything : docker-compose --build

After that, start with : docker-compose up -d 

Go to : http://localhost:8080 to view the page

Run test : docker-compose exec test bash
then : codecept run

NOTE: comment out the correct line 76/77 depending on if you want to run tests
or view the page on localhost:8080
