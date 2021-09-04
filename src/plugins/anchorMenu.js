/* ========================================================================
 * anchor menu v0.1
 *
 * ========================================================================
 * Copyright 2021-2021
 * Licensed under MIT
 * ======================================================================== */
+function ($) {
    'use strict';

    var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];

    var uriAttrs = [
        'background',
        'cite',
        'href',
        'itemtype',
        'longdesc',
        'poster',
        'src',
        'xlink:href'
    ]

    var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i

    var DefaultWhitelist = {
        // Global attributes allowed on any supplied element below.
        '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
        a: ['target', 'href', 'title', 'rel'],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ['src', 'alt', 'title', 'width', 'height'],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
    }

    /**
   * A pattern that recognizes a commonly useful subset of URLs that are safe.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */
    var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi

    /**
     * A pattern that matches safe data URLs. Only matches image, video and audio types.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */
    var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i

    function allowedAttribute(attr, allowedAttributeList) {
        var attrName = attr.nodeName.toLowerCase()

        if ($.inArray(attrName, allowedAttributeList) !== -1) {
            if ($.inArray(attrName, uriAttrs) !== -1) {
                return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN))
            }

            return true
        }

        var regExp = $(allowedAttributeList).filter(function (index, value) {
            return value instanceof RegExp
        })

        // Check if a regular expression validates the attribute.
        for (var i = 0, l = regExp.length; i < l; i++) {
            if (attrName.match(regExp[i])) {
                return true
            }
        }

        return false
    }

    function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
        if (unsafeHtml.length === 0) {
            return unsafeHtml
        }

        if (sanitizeFn && typeof sanitizeFn === 'function') {
            return sanitizeFn(unsafeHtml)
        }

        // IE 8 and below don't support createHTMLDocument
        if (!document.implementation || !document.implementation.createHTMLDocument) {
            return unsafeHtml
        }

        var createdDocument = document.implementation.createHTMLDocument('sanitization')
        createdDocument.body.innerHTML = unsafeHtml

        var whitelistKeys = $.map(whiteList, function (el, i) { return i })
        var elements = $(createdDocument.body).find('*')

        for (var i = 0, len = elements.length; i < len; i++) {
            var el = elements[i]
            var elName = el.nodeName.toLowerCase()

            if ($.inArray(elName, whitelistKeys) === -1) {
                el.parentNode.removeChild(el)

                continue
            }

            var attributeList = $.map(el.attributes, function (el) { return el })
            var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || [])

            for (var j = 0, len2 = attributeList.length; j < len2; j++) {
                if (!allowedAttribute(attributeList[j], whitelistedAttributes)) {
                    el.removeAttribute(attributeList[j].nodeName)
                }
            }
        }

        return createdDocument.body.innerHTML
    }

    // ANCHOR MENU PUBLIC CLASS DEFINITION
    // ===============================
    var AnchorMenu = function (element, options) {
        this.type = null
        this.options = null
        this.enabled = null
        this.timeout = null
        this.$element = null

        this.init('anchorMenu', element, options);
    }

    AnchorMenu.VERSION = '0.0.1';

    AnchorMenu.TRANSITION_DURATION = 150;

    AnchorMenu.DEFAULTS = {
        source: "*", // 源文档
        levelOne: "h3", //一级标题
        levelTwo: "h4", //二级标题（暂不支持更多级）
        width: 200, //容器宽度
        height: 400, //容器高度
        padding: 20, //内部间距
        offTop: 100, //滚动切换导航时离顶部的距离

        delay: 0,
        // delay: {show: number; hide: number};
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        sanitize: true,
        sanitizeFn: null,
        whiteList: DefaultWhitelist
    };

    AnchorMenu.prototype.init = function (type, element, options) {
        this.enabled = true;
        this.type = type;
        this.$element = $(element);
        this.options = this.getDefaults(options);
    }

    AnchorMenu.prototype.getDefaults = function () {
        return AnchorMenu.DEFAULTS;
    }

    AnchorMenu.prototype.getOptions = function (options) {
        var dataAttributes = this.$element.data();

        for (var dataAttr in dataAttributes) {
            if (dataAttributes.hasOwnProperty(dataAttr) && $.inArray(dataAttr, DISALLOWED_ATTRIBUTES) !== -1) {
                delete dataAttributes[dataAttr]
            }
        }

        options = $.extend({}, this.getDefaults(), dataAttributes, options);

        if (options.delay && typeof options.delay == 'number') {
            options.delay = {
                show: options.delay,
                hide: options.delay
            }
        }

        if (options.sanitize) {
            options.template = sanitizeHtml(options.template, options.whiteList, options.sanitizeFn)
        }

        return options;
    }

}(jQuery);
