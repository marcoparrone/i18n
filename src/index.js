/*
 * i18n.js - Internationalization library for JavaScript.
 *
 * Copyright (c) 2021 Marco Parrone.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

export default class I18n {
    constructor (callback_after_translation, language, messages_path, localstorage_prefix, supported_languages) {
        this.callback_after_translation = (callback_after_translation) ? callback_after_translation : () => {};
        this.language = (language) ? language : '';
        this.messages_path = (messages_path) ? messages_path : 'i18n/';
        this.localstorage_prefix = (localstorage_prefix) ? localstorage_prefix : 'i18n_lib_';
        this.supported_languages = (supported_languages) ? supported_languages : ['en', 'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it', 'ja', 'jw', 'kn', 'kk', 'km', 'rw', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms', 'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu', 'he', 'zh'];
        this.text = '';

        this.change_language = this.change_language.bind(this);
        this.load_language_from_localstorage = this.load_language_from_localstorage.bind(this);
        this.load_language_from_navigator = this.load_language_from_navigator.bind(this);
        this.save_language_to_localStorage = this.save_language_to_localStorage.bind(this);
        this.translate = this.translate.bind(this);
        this.change_language = this.change_language.bind(this);
        this.change_language_and_translate = this.change_language_and_translate.bind(this);
        this.change_language_translate_and_save_to_localStorage = this.change_language_translate_and_save_to_localStorage.bind(this);

        if (!this.language || this.language === '') {
            this.load_language_from_localstorage();
        }
        if (!this.language || this.language === '') {
            this.load_language_from_navigator();
        }
        if (!this.language || this.language === '') {
            this.change_language('en');
        }
        this.translate();
    }

    change_language (newlang) {
        if (this.supported_languages.includes(newlang)) {
            this.language = newlang;
            return true;
        }
        return false;
    }

    load_language_from_localstorage () {
        this.change_language(localStorage.getItem(this.localstorage_prefix + 'language'));
    }

    load_language_from_navigator() {
        if (navigator && navigator.languages) {
            this.change_language(navigator.languages.find(lang => {return this.supported_languages.includes(lang)}));
        }
    }

    save_language_to_localStorage () {
        localStorage.setItem(this.localstorage_prefix + 'language', JSON.stringify(this.language));
    }

    translate () {
        let newtext;
        fetch(this.messages_path + this.language + '.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error ('Network response was not ok');
            } else {
              return response.json();
            }
        })
        .then((messages) => {
            newtext = messages;
            if (newtext !== []) {
                this.text = newtext;
                this.callback_after_translation();
            }
          })
        .catch(error => {
          console.error('Cannot fetch i18n/' + this.language + '.json: ', error);
        });
    }

    change_language_and_translate (newlang) {
        if (this.change_language(newlang)) {
            this.translate();
        }
    }

    change_language_translate_and_save_to_localStorage (newlang) {
        if (this.change_language(newlang)) {
            this.translate();
            this.save_language_to_localStorage ();
        }
    }
}