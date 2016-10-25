System.register('xengine/mdeditor/components/TextEditorSimpleMDE', ['flarum/components/TextEditor', 'flarum/components/LoadingIndicator', 'flarum/helpers/listItems'], function (_export) {
    /* global $ */
    /* global m */
    /* global tinymce */

    'use strict';

    var TextEditor, LoadingIndicator, listItems, TextEditorSimpleMDE;
    return {
        setters: [function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor['default'];
        }, function (_flarumComponentsLoadingIndicator) {
            LoadingIndicator = _flarumComponentsLoadingIndicator['default'];
        }, function (_flarumHelpersListItems) {
            listItems = _flarumHelpersListItems['default'];
        }],
        execute: function () {
            TextEditorSimpleMDE = (function (_TextEditor) {
                babelHelpers.inherits(TextEditorSimpleMDE, _TextEditor);

                function TextEditorSimpleMDE() {
                    babelHelpers.classCallCheck(this, TextEditorSimpleMDE);
                    babelHelpers.get(Object.getPrototypeOf(TextEditorSimpleMDE.prototype), 'constructor', this).apply(this, arguments);
                }

                babelHelpers.createClass(TextEditorSimpleMDE, [{
                    key: 'init',
                    value: function init() {
                        this.value = m.prop(this.props.value || '');
                        this.loading = false;
                        m.redraw(true);
                    }
                }, {
                    key: 'view',
                    value: function view() {
                        return m(
                            'div',
                            { className: 'TextEditor TextEditor-SimpleMDE' },
                            this.loading ? m(
                                'p',
                                { className: 'TextEditor-placeholder' },
                                LoadingIndicator.component({ size: 'large' })
                            ) : m(
                                'div',
                                null,
                                m(
                                    'div',
                                    null,
                                    m('textarea', { config: this.configTextarea.bind(this), 'class': 'TextEditor-Container' })
                                ),
                                m(
                                    'ul',
                                    { className: 'TextEditor-controls Composer-footer' },
                                    listItems(this.controlItems().toArray())
                                )
                            )
                        );
                    }
                }, {
                    key: 'configTextarea',
                    value: function configTextarea(element, isInitialized) {
                        if (isInitialized) return;
                        console.log('mael');
                        this.simpleMDE = new SimpleMDE({
                            element: element,
                            spellChecker: false,
                            placeholder: this.props.placeholder
                        });
                        this.editorInited(this.simpleMDE);
                    }
                }, {
                    key: 'editorInited',
                    value: function editorInited(editor) {
                        var _this = this;

                        editor.value(this.value());
                        var onChange = function onChange() {
                            _this.oninput(editor.value());
                        };
                        editor.codemirror.on('change', onChange);
                    }
                }, {
                    key: 'setValue',
                    value: function setValue(value) {
                        this.simpleMDE.value(value);
                    }
                }, {
                    key: 'onunload',
                    value: function onunload() {
                        var editor = this.simpleMDE();
                        if (editor) {
                            editor.toTextArea();
                            this.simpleMDE = null;
                        }
                        babelHelpers.get(Object.getPrototypeOf(TextEditorSimpleMDE.prototype), 'onunload', this).call(this);
                    }
                }, {
                    key: 'onsubmit',
                    value: function onsubmit() {
                        var editor = this.simpleMDE;
                        if (editor) {
                            this.oninput(editor.value());
                        }
                        babelHelpers.get(Object.getPrototypeOf(TextEditorSimpleMDE.prototype), 'onsubmit', this).call(this);
                    }
                }]);
                return TextEditorSimpleMDE;
            })(TextEditor);

            _export('default', TextEditorSimpleMDE);
        }
    };
});;
System.register('xengine/mdeditor/main', ['flarum/extend', 'flarum/app', 'flarum/components/ComposerBody', 'xengine/mdeditor/components/TextEditorSimpleMDE'], function (_export) {
    'use strict';

    var extend, app, ComposerBody, TextEditorSimpleMDE;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp['default'];
        }, function (_flarumComponentsComposerBody) {
            ComposerBody = _flarumComponentsComposerBody['default'];
        }, function (_xengineMdeditorComponentsTextEditorSimpleMDE) {
            TextEditorSimpleMDE = _xengineMdeditorComponentsTextEditorSimpleMDE['default'];
        }],
        execute: function () {

            app.initializers.add('xengine-mdeditor', function () {
                extend(ComposerBody.prototype, 'init', function init() {
                    this.editor = new TextEditorSimpleMDE({
                        submitLabel: this.props.submitLabel,
                        placeholder: this.props.placeholder,
                        onchange: this.content,
                        onsubmit: this.onsubmit.bind(this),
                        value: this.content()
                    });
                });
            });
        }
    };
});