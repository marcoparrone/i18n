# i18n
Internationalization library for JavaScript

## Installation

```sh
npm install @marcoparrone/i18n
```

## Webpack Usage

```js
import I18n from '@marcoparrone/i18n';
```

## Initialization

The constructor accepts these optional parameters:

 * callback_after_translation: a callback function which will be called after the translation (for example, a function which will reload all the strings in the web page);
 * language: the target language: if not provided, it will be loaded from localStorage or from the user browser, or it will default to 'en';
 * messages_path: path where to find the localization files, which must be named language.json: for example, en.json, it.json, etc... defaults to "i18n/";
 * localstorage_prefix: the prefix for loading and saving the language setting in the browser localStorage. defaults to "i18n_lib_" (the language will be saved to the "i18n_lib_language" localStorage item);
 * supported_languages: an array containing the codes for the supported languages. defaults to:
```js
 ['en', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu', 'he', 'zh']
```

In this example, this.saveState is a function which reloads the translated strings:

```js
this.i18n = new I18n(this.saveState);
```

## Changing language

For changing the language, it's possible to call the change_language_translate_and_save_to_localStorage method, which accepts the language code as parameter.

In this example, event.target.value cotains the code of the selected language (for example, 'en', 'it', etc...):

```js
this.i18n.change_language_translate_and_save_to_localStorage(event.target.value);
```

## Providing the translations

The translations must be available in the messages_path path which was configured during the initialization, for example:

```sh
$ ls public/i18n/
af.json  bn.json   cy.json  es.json  fy.json  haw.json  hu.json  iw.json  kn.json  lo.json  ml.json  ne.json  pl.json  sd.json  so.json  sw.json  tl.json  uz.json     zh-TW.json
am.json  bs.json   da.json  et.json  ga.json  he.json   hy.json  ja.json  ko.json  lt.json  mn.json  nl.json  ps.json  si.json  sq.json  ta.json  tr.json  vi.json     zh.json
ar.json  ca.json   de.json  eu.json  gd.json  hi.json   id.json  jw.json  ku.json  lv.json  mr.json  no.json  pt.json  sk.json  sr.json  te.json  tt.json  xh.json     zu.json
az.json  ceb.json  el.json  fa.json  gl.json  hmn.json  ig.json  ka.json  ky.json  mg.json  ms.json  ny.json  ro.json  sl.json  st.json  tg.json  ug.json  yi.json
be.json  co.json   en.json  fi.json  gu.json  hr.json   is.json  kk.json  la.json  mi.json  mt.json  or.json  ru.json  sm.json  su.json  th.json  uk.json  yo.json
bg.json  cs.json   eo.json  fr.json  ha.json  ht.json   it.json  km.json  lb.json  mk.json  my.json  pa.json  rw.json  sn.json  sv.json  tk.json  ur.json  zh-CN.json
$ cat  public/i18n/en.json
{
    "text_appname": "Tic Tac Toe",
    "text_restart_label": "restart game",
    "text_settings_label": "settings",
    "text_help_label": "help",
    "text_about_label": "about",
    "text_close_label": "close",
    "text_youwon": "You Won!",
    "text_youlost": "You Lost!",
    "text_drawn": "The game was drawn!",
}
```

## Using the translations

The translations are available in the text instance variable.

for example, inside a custom react component, this method reloads the strings:

```js
const defaultText = require ('./en.json');

//...
class Board extends React.Component {
//...
    saveState () {
      if (this.i18n.text) {
        this.setState({
//...
            text_appname: this.i18n.text['text_appname'],
            text_restart_label: this.i18n.text['text_restart_label'],
            text_settings_label: this.i18n.text['text_settings_label'],
            text_help_label: this.i18n.text['text_help_label'],
            text_about_label: this.i18n.text['text_about_label'],
            text_close_label: this.i18n.text['text_close_label'],
            text_youwon: this.i18n.text['text_youwon'],
            text_youlost: this.i18n.text['text_youlost'],
            text_drawn: this.i18n.text['text_drawn'],
//...
        });
      } else {
        this.setState({
//...
          text_appname: defaultText['text_appname'],
          text_restart_label: defaultText['text_restart_label'],
          text_settings_label: defaultText['text_settings_label'],
          text_help_label: defaultText['text_help_label'],
          text_about_label: defaultText['text_about_label'],
          text_close_label: defaultText['text_close_label'],
          text_youwon: defaultText['text_youwon'],
          text_youlost: defaultText['text_youlost'],
          text_drawn: defaultText['text_drawn'],
//...
        });
      }
    }
//...
```

