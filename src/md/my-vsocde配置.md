## 我的vscodeIDE user-settings：
```js
{
    "workbench.iconTheme": "material-icon-theme",
    "terminal.external.windowsExec": "C:\\Program Files\\Git\\git-bash.exe",
    "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
    "files.autoSave": "off",
    "editor.formatOnSave": false,
    "git.confirmSync": false,
    "git.enableSmartCommit": true,
    "prettier.tabWidth": 4,
    "prettier.singleQuote": true,
    //使用eslint的规则格式化
    // Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
    "prettier.eslintIntegration": true,
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    // 为指定的语法定义配置文件或使用带有特定规则的配置文件。
    "emmet.syntaxProfiles": {
        "vue-html": "html",
        "vue": "html"
        // "javascript": "jsx" // js文件中使用emmet缩写语法（貌似不起作用）
    },
    // 在默认不支持 Emmet 的语言中启用 Emmet 缩写功能。在此添加该语言与支持 Emmet 的语言之间的映射。
    "emmet.includeLanguages": {
        "vue-html": "html",
        "javascript": "javascriptreact"
    },
    //eslint关联以下格式文件
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "vue",
        "html"
    ],
    "workbench.panel.location": "bottom",
    // const defaultHtmlOptions: HTMLBeautifyOptions = {
    //     brace_style: 'collapse', // [collapse|expand|end-expand|none]
    //     end_with_newline: false, // End output with newline
    //     indent_char: ' ', // Indentation character
    //     indent_handlebars: false, // e.g. {{#foo}}, {{/foo}}
    //     indent_inner_html: false, // Indent <head> and <body> sections
    //     indent_scripts: 'keep', // [keep|separate|normal]
    //     indent_size: 2, // Indentation size
    //     indent_with_tabs: false,
    //     max_preserve_newlines: 1, // Maximum number of line breaks to be preserved in one chunk (0 disables)
    //     preserve_newlines: true, // Whether existing line breaks before elements should be preserved
    //     unformatted: [
    //       'area',
    //       'base',
    //       'br',
    //       'col',
    //       'embed',
    //       'hr',
    //       'img',
    //       'input',
    //       'keygen',
    //       'link',
    //       'menuitem',
    //       'meta',
    //       'param',
    //       'source',
    //       'track',
    //       'wbr'
    //     ],
    //     wrap_line_length: 0, // Lines should wrap at next opportunity after this number of characters (0 disables)
    //     wrap_attributes: 'auto' as any
    //     // Wrap attributes to new lines [auto|force|force-aligned|force-expand-multiline] ["auto"]
    //   };
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            " wrap_attributes": "force"
        }
    },
    "gitlens.advanced.messages": {
        "suppressCommitHasNoPreviousCommitWarning": false,
        "suppressCommitNotFoundWarning": false,
        "suppressFileNotUnderSourceControlWarning": false,
        "suppressGitVersionWarning": false,
        "suppressLineUncommittedWarning": false,
        "suppressNoRepositoryWarning": false,
        "suppressUpdateNotice": false,
        "suppressWelcomeNotice": true
    },
    "git.autofetch": true,
    // 所有json文件关联json with comments 格式：在json中可以写注释
    "files.associations": {
        "*.json": "jsonc"
    },
    // GPM GIT项目所在目录
    "gitProjectManager.baseProjectsFolders": [
        "D:\\hongde-qf"
    ]
}
```
