# i18n
Internationalization library for JavaScript

## Installation

```sh
npm install @marcoparrone/i18n
```

## Usage

After the installation, to import the module:

```js
import I18n from '@marcoparrone/i18n';
```

Read further for more information.

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
this.i18n = new I18n(() => {this.forceUpdate()});
```

## Changing language

For changing the language, it's possible to call the change_language_translate_and_save_to_localStorage method, which accepts the language code as parameter.

In this example, event.target.value cotains the code of the selected language (for example, 'en', 'it', etc...):

```js
this.i18n.change_language_translate_and_save_to_localStorage(language);
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
    "text_appname": "Notes",
    "text_add_label": "add a note",
    "text_settings_label": "settings",
    "text_importexport_label": "import and export notes",
    "text_help_label": "help",
    "text_about_label": "about"
}
```

## Using the translations

In the following examle you can see how to use the libray.

```js
//...
import I18n from '@marcoparrone/i18n';
//...
const defaultText = require ('./en.json');

//...
class Board extends React.Component {
//...
  constructor(props) {
//...
        this.i18n = { language: 'en', text: defaultText};
//...
  }
//...
  componentDidMount() {
//...
    // Localize the User Interface.
    this.i18n = new I18n(() => {this.forceUpdate()});
//...
  }
//...
  handleSettingsChange(/* ... */ language) {
//...
    if (this.i18n.language !== language) {
      this.i18n.change_language_translate_and_save_to_localStorage(language);
//...
    }
//...
  }
//...
  render() {
//...
    return (
			<AppWithTopBar refprop={this.notesListRef} lang={this.i18n.language} appname={this.i18n.text['text_appname']}
			  icons={[{label: this.i18n.text['text_add_label'], icon: 'add', callback: () => this.addNote()},
//...
								{label: this.i18n.text['text_about_label'], icon: 'info', callback: () =>  open_dialog(this.notesListRef, 'about')}]} >
...
        </AppWithTopBar>
    );
  }
}
//...
```
