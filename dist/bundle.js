/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --bg-color1: #fafafa;\n  --bg-color2: #3e4a61;\n  --primary: #e08d28;\n  --secondary: #e04c28;\n  --accent: #29e0e0;\n  --text-color: #426161;\n  --text2-color: white;\n  --text3-color: #614842;\n  --border-radius-card: 8px;\n  --shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);\n  --img-aspect-ratio: 556 / 370;\n}\n\n* {\n  -ms-overflow-style: none; /* for Internet Explorer, Edge */\n  scrollbar-width: none; /* for Firefox */\n  overflow-y: scroll;\n}\n\n* ::-webkit-scrollbar {\n  display: none; /* for Chrome, Safari, and Opera */\n}\n\nbody {\n  background-color: var(--bg-color1);\n  color: var(--text-color);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n  /* font-family: 'Gloria Hallelujah', cursive;\n  font-weight: 400;\n  font-style: normal; */\n  font-family: \"Lato\", sans-serif;\n  font-weight: 300;\n  font-style: normal;\n}\n\nbody > * {\n  width: 100%;\n}\n\n.icon-button {\n  width: 40px;\n  aspect-ratio: 1/1;\n  border: none;\n  padding: 0;\n  background-color: rgba(0, 0, 0, 0);\n  transition: all 0.4s ease-in-out;\n  position: absolute;\n}\n.icon-button:hover {\n  transform: scale(1.1);\n}\n\n.icon-button > svg {\n  width: 100%;\n  height: auto;\n  opacity: 1;\n  fill: var(--accent);\n}\n.icon-button > svg:hover {\n  cursor: pointer;\n  filter: brightness(1.3);\n}\n\nh1 {\n  align-self: center;\n  color: var(--text2-color);\n  font-family: \"Rock Salt\", cursive;\n  font-weight: 400;\n  font-style: normal;\n  font-size: min(4vw, 70px);\n  margin: 0;\n}\n\n.hidden {\n  display: none;\n}\n\n/*--- Landing Page ---*/\n.menu-bar {\n  display: flex;\n  flex-direction: row;\n  width: 80vw;\n  justify-content: center;\n  position: relative;\n  background: var(--bg-color2);\n  box-shadow: var(--shadow);\n  position: absolute;\n  top: 0;\n}\n\n.hamburger {\n  width: 6vw;\n  position: absolute;\n  left: 2%;\n  top: 50%;\n  transform: translate(0%, -50%);\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 99vh;\n  width: 100%;\n  position: relative;\n  background-color: var(--text3-color);\n}\n\n.carousel {\n  width: 60vw;\n  height: 60vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n\n.landing-image {\n  aspect-ratio: var(--img-aspect-ratio);\n  width: 20vw;\n  position: absolute;\n  cursor: pointer;\n  box-shadow: var(--shadow);\n  border-radius: var(--border-radius-card);\n  overflow: hidden;\n}\n.landing-image > img {\n  width: 100%;\n  object-fit: cover;\n  transition: all 1s ease-in-out;\n}\n.landing-image > img:hover {\n  transform: scale(1.1);\n}\n\n#landing-image-1 {\n  width: 35vw;\n  position: relative;\n  z-index: 2;\n}\n\n#landing-image-2 {\n  top: 1em;\n  left: 1em;\n}\n#landing-image-2 > img {\n  transform-origin: bottom right;\n}\n\n#landing-image-3 {\n  top: 1em;\n  right: 1em;\n}\n#landing-image-3 > img {\n  transform-origin: bottom left;\n}\n\n#landing-image-4 {\n  bottom: 1em;\n  left: 1em;\n}\n#landing-image-4 > img {\n  transform-origin: top right;\n}\n\n#landing-image-5 {\n  bottom: 1em;\n  right: 1em;\n}\n#landing-image-5 > img {\n  transform-origin: top left;\n}\n\n#to-bottom {\n  top: 1em;\n  right: 1em;\n}\n\n/* --- Recipes Container ---*/\n#my-recipes-toggle {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n  width: 15vw;\n}\n\n#my-recipes-checkbox {\n  width: 45px;\n  aspect-ratio: 1/1;\n  transform: 0.5;\n}\n\n.show-my-recipes-lable {\n  width: 20vw;\n  font-size: 1.6vw;\n}\n\n.filter-tag-box {\n  width: 30vw;\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n#filter-by-tag {\n  width: 20vw;\n  height: 3.5vw;\n  font-family: \"Lato\", sans-serif;\n  font-weight: 300;\n  font-style: normal;\n  font-size: 1.6vw;\n}\n\n.filter-by-tag-lable {\n  font-size: 1.7vw;\n}\n\n.search-box {\n  width: 30vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.search-by-name {\n  width: 30vw;\n  height: 3vw;\n  font-family: \"Lato\", sans-serif;\n  font-weight: bold;\n  font-size: 1.6vw;\n}\n\ncontainer {\n  position: relative;\n  height: 100vh;\n  overflow-y: scroll;\n  background-color: var(--text3-color);\n}\n\ncontainer header {\n  background: var(--bg-color2);\n  color: var(--text2-color);\n  display: flex;\n  justify-content: space-around;\n  flex-direction: row;\n  position: sticky;\n  top: 0;\n  box-shadow: var(--shadow);\n  z-index: 2;\n  padding: 1em;\n}\n\n.recipes-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  overflow-y: scroll;\n  background-color: var(--text3-color);\n  font-size: min(1.6vw, 23px);\n  font-weight: bold;\n}\n\n.recipe-card {\n  width: 20%;\n  max-width: 250px;\n  min-width: 125px;\n  aspect-ratio: 4.5/5;\n  border: solid thin var(--text-color);\n  border-radius: var(--border-radius-card);\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  gap: 0.25em;\n  text-align: center;\n  overflow: hidden;\n  box-shadow: var(--shadow);\n  background-color: var(--bg-color1);\n}\n.recipe-card > div {\n  border-top: inherit;\n  width: 100%;\n  aspect-ratio: var(--img-aspect-ratio);\n  overflow: hidden;\n}\n.recipe-card:hover {\n  cursor: pointer;\n}\n.recipe-card:hover img {\n  transform: scale(1.2);\n}\n\n.recipe-card img {\n  width: 100%;\n  height: auto;\n  transition: all 0.5s ease-in-out;\n}\n\n#to-top {\n  position: relative;\n}\n\n/* --- Featured Recipe ---*/\n#featured-recipe {\n  position: fixed;\n  gap: 2em;\n  top: 0;\n  left: 120vw;\n  height: 100vh;\n  width: 100vw;\n  background-color: var(--bg-color2);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 3;\n  transition: transform 1.2s ease-in-out;\n}\n\n#featured-recipe.unhide {\n  transform: translateX(-120%);\n}\n\n#featured-recipe > div {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap-reverse;\n  justify-content: space-evenly;\n  padding: 40px;\n}\n\n#featured-recipe article {\n  width: 50vw;\n}\n\naside {\n  flex-basis: 30%;\n  min-width: 240px;\n}\n\n.article-style {\n  flex-basis: 70%;\n}\n\narticle h4 {\n  color: var(--primary);\n}\n\n#featured-tag-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1em;\n}\n#featured-tag-list > span {\n  color: var(--secondary);\n  border: thin solid var(--secondary);\n  padding: 0.5em;\n}\n\n#close-featured-recipe {\n  top: 1em;\n  right: 1em;\n}\n\n.heart {\n  top: 1em;\n  left: 1em;\n}\n\nh2 {\n  flex: 0 0 auto;\n}\n\n#featured-recipe > img {\n  border-radius: var(--border-radius-card);\n}\n\nh4 {\n  margin-block-end: 0.2em;\n}\n\n#featured-recipe p {\n  margin-block-start: 0em;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,oBAAA;EACA,oBAAA;EACA,kBAAA;EACA,oBAAA;EACA,iBAAA;EACA,qBAAA;EACA,oBAAA;EACA,sBAAA;EACA,yBAAA;EACA,4CAAA;EACA,6BAAA;AACF;;AAEA;EACE,wBAAA,EAAA,gCAAA;EACA,qBAAA,EAAA,gBAAA;EACA,kBAAA;AACF;;AACA;EACE,aAAA,EAAA,kCAAA;AAEF;;AACA;EACE,kCAAA;EACA,wBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,kBAAA;EACA,WAAA;EACA,SAAA;EACA,UAAA;EAEA;;uBAAA;EAIA,+BAAA;EACA,gBAAA;EACA,kBAAA;AAAF;;AAGA;EACE,WAAA;AAAF;;AAGA;EACE,WAAA;EACA,iBAAA;EACA,YAAA;EACA,UAAA;EACA,kCAAA;EACA,gCAAA;EACA,kBAAA;AAAF;AAEE;EACE,qBAAA;AAAJ;;AAIA;EACE,WAAA;EACA,YAAA;EACA,UAAA;EACA,mBAAA;AADF;AAGE;EACE,eAAA;EACA,uBAAA;AADJ;;AAKA;EACE,kBAAA;EACA,yBAAA;EACA,iCAAA;EACA,gBAAA;EACA,kBAAA;EACA,yBAAA;EACA,SAAA;AAFF;;AAKA;EACE,aAAA;AAFF;;AAIA,uBAAA;AACA;EACE,aAAA;EACA,mBAAA;EACA,WAAA;EACA,uBAAA;EACA,kBAAA;EACA,4BAAA;EACA,yBAAA;EACA,kBAAA;EACA,MAAA;AADF;;AAIA;EACE,UAAA;EACA,kBAAA;EACA,QAAA;EACA,QAAA;EACA,8BAAA;AADF;;AAIA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,oCAAA;AADF;;AAIA;EACE,WAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;AADF;;AAIA;EACE,qCAAA;EACA,WAAA;EACA,kBAAA;EACA,eAAA;EACA,yBAAA;EACA,wCAAA;EACA,gBAAA;AADF;AAGE;EACE,WAAA;EACA,iBAAA;EACA,8BAAA;AADJ;AAEI;EACE,qBAAA;AAAN;;AAQA;EACE,WAAA;EACA,kBAAA;EACA,UAAA;AALF;;AAQA;EACE,QAAA;EACA,SAAA;AALF;AAOE;EACE,8BAAA;AALJ;;AASA;EACE,QAAA;EACA,UAAA;AANF;AAOE;EACE,6BAAA;AALJ;;AASA;EACE,WAAA;EACA,SAAA;AANF;AAOE;EACE,2BAAA;AALJ;;AASA;EACE,WAAA;EACA,UAAA;AANF;AAOE;EACE,0BAAA;AALJ;;AASA;EACE,QAAA;EACA,UAAA;AANF;;AAQA,6BAAA;AACA;EACE,aAAA;EACA,mBAAA;EACA,yBAAA;EACA,mBAAA;EACA,WAAA;AALF;;AAQA;EACE,WAAA;EACA,iBAAA;EACA,cAAA;AALF;;AAQA;EACE,WAAA;EACA,gBAAA;AALF;;AAQA;EACE,WAAA;EACA,aAAA;EACA,mBAAA;EACA,6BAAA;AALF;;AAQA;EACE,WAAA;EACA,aAAA;EACA,+BAAA;EACA,gBAAA;EACA,kBAAA;EACA,gBAAA;AALF;;AAQA;EACE,gBAAA;AALF;;AAQA;EACE,WAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;AALF;;AAQA;EACE,WAAA;EACA,WAAA;EACA,+BAAA;EACA,iBAAA;EACA,gBAAA;AALF;;AASA;EACE,kBAAA;EACA,aAAA;EACA,kBAAA;EACA,oCAAA;AANF;;AASA;EACE,4BAAA;EACA,yBAAA;EACA,aAAA;EACA,6BAAA;EACA,mBAAA;EACA,gBAAA;EACA,MAAA;EACA,yBAAA;EACA,UAAA;EACA,YAAA;AANF;;AASA;EACE,aAAA;EACA,eAAA;EACA,6BAAA;EACA,kBAAA;EACA,oCAAA;EACA,2BAAA;EACA,iBAAA;AANF;;AASA;EACE,UAAA;EACA,gBAAA;EACA,gBAAA;EACA,mBAAA;EACA,oCAAA;EACA,wCAAA;EACA,aAAA;EACA,sBAAA;EACA,yBAAA;EACA,WAAA;EACA,kBAAA;EACA,gBAAA;EACA,yBAAA;EACA,kCAAA;AANF;AAQE;EACE,mBAAA;EACA,WAAA;EACA,qCAAA;EACA,gBAAA;AANJ;AASE;EACE,eAAA;AAPJ;AAUE;EACE,qBAAA;AARJ;;AAYA;EACE,WAAA;EACA,YAAA;EACA,gCAAA;AATF;;AAYA;EACE,kBAAA;AATF;;AAWA,2BAAA;AACA;EACE,eAAA;EACA,QAAA;EACA,MAAA;EACA,WAAA;EACA,aAAA;EACA,YAAA;EACA,kCAAA;EACA,YAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,UAAA;EACA,sCAAA;AARF;;AAWA;EACE,4BAAA;AARF;;AAWA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,6BAAA;EACA,aAAA;AARF;;AAWA;EACE,WAAA;AARF;;AAWA;EACE,eAAA;EACA,gBAAA;AARF;;AAWA;EACE,eAAA;AARF;;AAWA;EACE,qBAAA;AARF;;AAWA;EACE,aAAA;EACA,eAAA;EACA,QAAA;AARF;AAUE;EACE,uBAAA;EACA,mCAAA;EACA,cAAA;AARJ;;AAYA;EACE,QAAA;EACA,UAAA;AATF;;AAYA;EACE,QAAA;EACA,SAAA;AATF;;AAYA;EACE,cAAA;AATF;;AAYA;EACE,wCAAA;AATF;;AAYA;EACE,uBAAA;AATF;;AAYA;EACA,uBAAA;AATA","sourcesContent":[":root {\n  --bg-color1: #fafafa;\n  --bg-color2: #3e4a61;\n  --primary: #e08d28;\n  --secondary: #e04c28;\n  --accent: #29e0e0;\n  --text-color: #426161;\n  --text2-color: white;\n  --text3-color: #614842;\n  --border-radius-card: 8px;\n  --shadow: 4px 8px 8px hsl(0deg 0% 0% / 0.38);\n  --img-aspect-ratio: 556 / 370;\n}\n\n* {\n  -ms-overflow-style: none; /* for Internet Explorer, Edge */\n  scrollbar-width: none; /* for Firefox */\n  overflow-y: scroll;\n}\n* ::-webkit-scrollbar {\n  display: none; /* for Chrome, Safari, and Opera */\n}\n\nbody {\n  background-color: var(--bg-color1);\n  color: var(--text-color);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: relative;\n  width: 100%;\n  margin: 0;\n  padding: 0;\n\n  /* font-family: 'Gloria Hallelujah', cursive;\n  font-weight: 400;\n  font-style: normal; */\n\n  font-family: 'Lato', sans-serif;\n  font-weight: 300;\n  font-style: normal;\n}\n\nbody > * {\n  width: 100%;\n}\n\n.icon-button {\n  width: 40px;\n  aspect-ratio: 1 / 1;\n  border: none;\n  padding: 0;\n  background-color: rgba(0, 0, 0, 0);\n  transition: all 0.4s ease-in-out;\n  position: absolute;\n\n  &:hover {\n    transform: scale(1.1);\n  }\n}\n\n.icon-button > svg {\n  width: 100%;\n  height: auto;\n  opacity: 1;\n  fill: var(--accent);\n\n  &:hover {\n    cursor: pointer;\n    filter: brightness(1.3);\n  }\n}\n\nh1 {\n  align-self: center;\n  color: var(--text2-color);\n  font-family: 'Rock Salt', cursive;\n  font-weight: 400;\n  font-style: normal;\n  font-size: min(4vw, 70px);\n  margin: 0;\n}\n\n.hidden {\n  display: none;\n}\n/*--- Landing Page ---*/\n.menu-bar {\n  display: flex;\n  flex-direction: row;\n  width: 80vw;\n  justify-content: center;\n  position: relative;\n  background: var(--bg-color2);\n  box-shadow: var(--shadow);\n  position: absolute;\n  top: 0;\n}\n\n.hamburger {\n  width: 6vw;\n  position: absolute;\n  left: 2%;\n  top: 50%;\n  transform: translate(0%, -50%);\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  height: 99vh;\n  width: 100%;\n  position: relative;\n  background-color: var(--text3-color);\n}\n\n.carousel {\n  width: 60vw;\n  height: 60vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n}\n\n.landing-image {\n  aspect-ratio: var(--img-aspect-ratio);\n  width: 20vw;\n  position: absolute;\n  cursor: pointer;\n  box-shadow: var(--shadow);\n  border-radius: var(--border-radius-card);\n  overflow: hidden;\n\n  & > img {\n    width: 100%;\n    object-fit: cover;\n    transition: all 1s ease-in-out;\n    &:hover {\n      transform: scale(1.1);\n    }\n  }\n}\n\n.landing-image > img {\n}\n\n#landing-image-1 {\n  width: 35vw;\n  position: relative;\n  z-index: 2;\n}\n\n#landing-image-2 {\n  top: 1em;\n  left: 1em;\n\n  & > img {\n    transform-origin: bottom right;\n  }\n}\n\n#landing-image-3 {\n  top: 1em;\n  right: 1em;\n  & > img {\n    transform-origin: bottom left;\n  }\n}\n\n#landing-image-4 {\n  bottom: 1em;\n  left: 1em;\n  & > img {\n    transform-origin: top right;\n  }\n}\n\n#landing-image-5 {\n  bottom: 1em;\n  right: 1em;\n  & > img {\n    transform-origin: top left;\n  }\n}\n\n#to-bottom {\n  top: 1em;\n  right: 1em;\n}\n/* --- Recipes Container ---*/\n#my-recipes-toggle {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  align-items: center;\n  width: 15vw;\n}\n\n#my-recipes-checkbox {\n  width: 45px;\n  aspect-ratio: 1 / 1;\n  transform: 0.5;\n}\n\n.show-my-recipes-lable {\n  width: 20vw;\n  font-size: 1.6vw;\n}\n\n.filter-tag-box {\n  width: 30vw;\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n#filter-by-tag {\n  width: 20vw;\n  height: 3.5vw;\n  font-family: 'Lato', sans-serif;\n  font-weight: 300;\n  font-style: normal;\n  font-size: 1.6vw;\n}\n\n.filter-by-tag-lable {\n  font-size: 1.7vw;\n}\n\n.search-box {\n  width: 30vw;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.search-by-name {\n  width: 30vw;\n  height: 3vw;\n  font-family: 'Lato', sans-serif;\n  font-weight: bold;\n  font-size: 1.6vw;\n}\n\n\ncontainer {\n  position: relative;\n  height: 100vh;\n  overflow-y: scroll;\n  background-color: var(--text3-color);\n}\n\ncontainer header {\n  background: var(--bg-color2);\n  color: var(--text2-color);\n  display: flex;\n  justify-content: space-around;\n  flex-direction: row;\n  position: sticky;\n  top: 0;\n  box-shadow: var(--shadow);\n  z-index: 2;\n  padding: 1em;\n}\n\n.recipes-container {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-evenly;\n  overflow-y: scroll;\n  background-color: var(--text3-color);\n  font-size: min(1.60vw, 23px);\n  font-weight: bold;\n}\n\n.recipe-card {\n  width: 20%;\n  max-width: 250px;\n  min-width: 125px;\n  aspect-ratio: 4.5 / 5;\n  border: solid thin var(--text-color);\n  border-radius: var(--border-radius-card);\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  gap: 0.25em;\n  text-align: center;\n  overflow: hidden;\n  box-shadow: var(--shadow);\n  background-color: var(--bg-color1);\n\n  & > div {\n    border-top: inherit;\n    width: 100%;\n    aspect-ratio: var(--img-aspect-ratio);\n    overflow: hidden;\n  }\n\n  &:hover {\n    cursor: pointer;\n  }\n\n  &:hover img {\n    transform: scale(1.2);\n  }\n}\n\n.recipe-card img {\n  width: 100%;\n  height: auto;\n  transition: all 0.5s ease-in-out;\n}\n\n#to-top {\n  position: relative;\n}\n/* --- Featured Recipe ---*/\n#featured-recipe {\n  position: fixed;\n  gap: 2em;\n  top: 0;\n  left: 120vw;\n  height: 100vh;\n  width: 100vw;\n  background-color: var(--bg-color2);\n  color: white;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  z-index: 3;\n  transition: transform 1.2s ease-in-out;\n}\n\n#featured-recipe.unhide {\n  transform: translateX(-120%);\n}\n\n#featured-recipe > div {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap-reverse;\n  justify-content: space-evenly;\n  padding: 40px;\n}\n\n#featured-recipe article {\n  width: 50vw;\n}\n\naside {\n  flex-basis: 30%;\n  min-width: 240px;\n}\n\n.article-style {\n  flex-basis: 70%;\n}\n\narticle h4 {\n  color: var(--primary);\n}\n\n#featured-tag-list {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1em;\n\n  & > span {\n    color: var(--secondary);\n    border: thin solid var(--secondary);\n    padding: 0.5em;\n  }\n}\n\n#close-featured-recipe {\n  top: 1em;\n  right: 1em;\n}\n\n.heart {\n  top: 1em;\n  left: 1em;\n}\n\nh2 {\n  flex: 0 0 auto;\n}\n\n#featured-recipe > img {\n  border-radius: var(--border-radius-card);\n}\n\nh4 {\n  margin-block-end: 0.2em;\n}\n\n#featured-recipe p {\nmargin-block-start: 0em;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchData: () => (/* binding */ fetchData)
/* harmony export */ });
const fetchData = type => {
  const data = fetch(
    `https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${type}`
  )
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
  return data;
};


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/turing-logo.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/hamburger.svg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createImage: () => (/* binding */ createImage),
/* harmony export */   createRecipeCard: () => (/* binding */ createRecipeCard),
/* harmony export */   displayRecipeTags: () => (/* binding */ displayRecipeTags),
/* harmony export */   displayRecipes: () => (/* binding */ displayRecipes),
/* harmony export */   updateDomWithAPIData: () => (/* binding */ updateDomWithAPIData),
/* harmony export */   updateFeaturedRecipe: () => (/* binding */ updateFeaturedRecipe)
/* harmony export */ });
/* harmony import */ var _ingredients__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _recipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(11);


// --- // Variables // --- //

// --- // DOM Nodes // --- //
var recipesContainer = document.querySelector('.recipes-container');
var featuredRecipe = document.getElementById('featured-recipe');
var tagFilterSelector = document.getElementById('filter-by-tag');
const heartIconOutlined = document.getElementById('heart-icon-outlined');
const heartIconFilled = document.getElementById('heart-icon-filled');
const landingImages = document.querySelectorAll('.landing-image');
// -- featured recipe -- //
const featHeader = featuredRecipe.querySelector('h2');
const featImg = featuredRecipe.querySelector('img');
const featIngredientsList = featuredRecipe.querySelector(
  '#featured-ingredients-list'
);
const featCostOfIngredients = featuredRecipe.querySelector(
  '#cost-of-ingredients'
);
const featTags = featuredRecipe.querySelector('#featured-tag-list');
const featInstructions = featuredRecipe.querySelector('#featured-instructions');
// --- // Event Listeners // --- //

// --- // Functions // --- //
const updateDomWithAPIData = (recipes, recipeTags, imageIds) => {
  displayRecipes(recipes, recipesContainer);
  displayRecipeTags(recipeTags);
  fillLandingImages(recipes, imageIds);
};

function fillLandingImages(recipes, landImageIds) {
  landingImages.forEach(image => {
    var randomRecipe = (0,_recipes__WEBPACK_IMPORTED_MODULE_1__.getRandomRecipe)(recipes);
    while (landImageIds.includes(randomRecipe.id)) {
      randomRecipe = (0,_recipes__WEBPACK_IMPORTED_MODULE_1__.getRandomRecipe)(recipes);
    }

    landImageIds.push(randomRecipe.id);
    const recipeImage = createImage(
      randomRecipe.image,
      `Image of ${randomRecipe.name} dish`
    );

    recipeImage.id = randomRecipe.id;
    image.appendChild(recipeImage);
  });
}

const createRecipeCard = recipe => {
  const recipeCard = document.createElement('figure');
  recipeCard.setAttribute('class', 'recipe-card');
  // recipeContainer.appendChild(recipeCard);
  const recipeTitle = document.createElement('figcaption');
  recipeTitle.innerText = recipe.name;
  recipeCard.appendChild(recipeTitle);
  const imageContainter = document.createElement('div');
  recipeCard.appendChild(imageContainter);
  const recipeImage = createImage(recipe.image, `Image of ${recipe.name} dish`);
  imageContainter.appendChild(recipeImage);
  // const recipeCardID = recipe.id
  recipeCard.id = recipe.id;
  return recipeCard;
};

const displayRecipes = (recipeList, recipesContainer) => {
  recipesContainer.innerHTML = '';
  recipeList.forEach(recipe => {
    const recipeCard = createRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
};

const createImage = (imageSource, imageAlt) => {
  const recipeImg = document.createElement('img');
  recipeImg.src = imageSource;
  recipeImg.alt = imageAlt;
  return recipeImg;
};

const updateFeaturedRecipe = (recipe, user, allIngredients) => {
  featHeader.innerText = recipe.name;

  featImg.src = recipe.image;
  featImg.alt = `Image of ${recipe.name} dish`;

  const ingredients = (0,_ingredients__WEBPACK_IMPORTED_MODULE_0__.getIngredientsInfo)(allIngredients, recipe.ingredients);
  
  featIngredientsList.innerHTML = '';
  ingredients.forEach(ingredient =>
    featIngredientsList.appendChild(createIngredientNode(ingredient))
  );

  const ingredientCosts = (0,_recipes__WEBPACK_IMPORTED_MODULE_1__.estimateCostPerRecipeIngredients)(
    allIngredients,
    recipe
  );
  const recipeTotalCost = (0,_recipes__WEBPACK_IMPORTED_MODULE_1__.estimateCostPerRecipe)(ingredientCosts);

  featCostOfIngredients.innerText = recipeTotalCost;

  featInstructions.innerHTML = '';

  recipe.instructions.forEach(instruction =>
    featInstructions.appendChild(createInstructionNode(instruction))
  );

  featTags.innerHTML = '';
  recipe.tags.forEach(tag => featTags.appendChild(createTagNode(tag)));

  updateHeartIconsByUser(recipe.id, user);
};

const updateHeartIconsByUser = (recipeId, user) => {
  [heartIconOutlined, heartIconFilled].forEach(icon =>
    icon.classList.remove('hidden')
  );

  if (user.recipesToCook.includes(recipeId)) {
    heartIconOutlined.classList.add('hidden');
  } else {
    heartIconFilled.classList.add('hidden');
  }
};

const createIngredientNode = ingredient => {
  const { id, name, quantity } = ingredient;
  let { amount, unit } = quantity;
  const element = document.createElement('li');
  element.id = id;
  amount = Math.round(amount * 100) / 100;
  element.innerText = `${amount} ${unit} ${name}`;
  return element;
};

const createInstructionNode = instructionInfo => {
  const { instruction, number } = instructionInfo;
  const element = document.createElement('div');
  const heading = document.createElement('h4');
  heading.innerText = `STEP ${number}`;
  const paragraph = document.createElement('p');
  paragraph.innerText = instruction;
  element.appendChild(heading);
  element.append(paragraph);
  return element;
};

const createTagNode = tag => {
  const element = document.createElement('span');
  element.innerText = tag;
  return element;
};

const displayRecipeTags = tags => {
  tagFilterSelector.appendChild(createTagSelector(''));
  tags.forEach(tag => {
    tagFilterSelector.appendChild(createTagSelector(tag));
  });
};

const createTagSelector = tag => {
  const option = document.createElement('option');
  option.setAttribute('value', tag);
  option.innerText = tag;
  return option;
};


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   estimateCostPerIngredient: () => (/* binding */ estimateCostPerIngredient),
/* harmony export */   getIngredientNames: () => (/* binding */ getIngredientNames),
/* harmony export */   getIngredientsInfo: () => (/* binding */ getIngredientsInfo)
/* harmony export */ });
const getIngredientNames = (ingredients, ingredientIDs) => {
  const ingredientNamesList = ingredientIDs.map(id => {
    let currentIngredient = ingredients.find(
      ingredient => ingredient.id === id
    );
    return currentIngredient.name;
  });
  return ingredientNamesList;
};

const getIngredientsInfo = (ingredients, recipeIngredients) => {
  const updatedIngredients = recipeIngredients.map(ingredient => {
    const ingredientInfo = ingredients.find(
      currentIngredient => currentIngredient.id === ingredient.id
    );
    ingredient.name = ingredientInfo.name;
    ingredient.estimatedCostInCents = ingredientInfo.estimatedCostInCents;

    return ingredient;
  });

  return updatedIngredients;
};

const estimateCostPerIngredient = (ingredients, recipeIngredient) => {
  // const unitCost = 0
  let ingredient = ingredients.find(
    currentIngredient => recipeIngredient.id === currentIngredient.id
  );
  let { estimatedCostInCents } = ingredient;
  let amount = recipeIngredient.quantity.amount;
  let cost = estimatedCostInCents * amount;

  return cost;
};


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   estimateCostPerRecipe: () => (/* binding */ estimateCostPerRecipe),
/* harmony export */   estimateCostPerRecipeIngredients: () => (/* binding */ estimateCostPerRecipeIngredients),
/* harmony export */   filterRecipesByName: () => (/* binding */ filterRecipesByName),
/* harmony export */   filterRecipesByTag: () => (/* binding */ filterRecipesByTag),
/* harmony export */   findRecipe: () => (/* binding */ findRecipe),
/* harmony export */   findRecipeIngredients: () => (/* binding */ findRecipeIngredients),
/* harmony export */   findRecipeInstructions: () => (/* binding */ findRecipeInstructions),
/* harmony export */   getAllRecipeTags: () => (/* binding */ getAllRecipeTags),
/* harmony export */   getRandomRecipe: () => (/* binding */ getRandomRecipe)
/* harmony export */ });
/* harmony import */ var _ingredients__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


const findRecipe = (recipesList, recipeID) => {
  const recipe = recipesList.find(
    currentRecipe => currentRecipe.id === recipeID
  );
  return recipe;
};

const findRecipeIngredients = (recipe) => {
  const recipeIngredients = recipe.ingredients;
  const ingredientList = recipeIngredients.map(ingredient => ingredient.id);
  return ingredientList;
};

const findRecipeInstructions = recipe => {
  const recipeInstructions = recipe.instructions.sort(
    (a, b) => a.number - b.number
  );
  const instructionList = recipeInstructions.map(
    instruction => instruction.instruction
  );
  return instructionList;
};

const estimateCostPerRecipeIngredients = (ingredients, recipe) => {
  return recipe.ingredients.map(ingredient =>
    (0,_ingredients__WEBPACK_IMPORTED_MODULE_0__.estimateCostPerIngredient)(ingredients, ingredient)
  );
};

const estimateCostPerRecipe = ingredientCosts => {
  const totalCents = ingredientCosts.reduce((acc, val) => (acc += val), 0);
  const dollars = (totalCents / 100).toFixed(2);
  return Number(dollars);
};

const filterRecipesByTag = (recipesList, tag) => {
  if (!tag) return recipesList;
  return recipesList.filter(recipe => recipe.tags.includes(tag));
};

const filterRecipesByName = (recipesList, name) => {
  return recipesList.filter(recipe => {
    const recipeName = recipe.name.toLowerCase();
    const otherName = name.toLowerCase();

    return recipeName.includes(otherName);
  });
};

const getAllRecipeTags = recipesList => {
  return recipesList
    .reduce((tags, recipe) => {
      recipe.tags.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });

      return tags;
    }, [])
    .sort();
};

const getRandomRecipe = recipes =>
  recipes[Math.floor(Math.random() * recipes.length)];


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addRecipeToUserList: () => (/* binding */ addRecipeToUserList),
/* harmony export */   filterUserRecipes: () => (/* binding */ filterUserRecipes),
/* harmony export */   getRandomUser: () => (/* binding */ getRandomUser),
/* harmony export */   removeRecipeFromUserList: () => (/* binding */ removeRecipeFromUserList)
/* harmony export */ });
const getRandomUser = users =>
  users[Math.floor(Math.random() * users.length)];

const addRecipeToUserList = (user, recipeID) => {
  if (typeof recipeID !== 'number') return user;
  user.recipesToCook.push(recipeID);
  return user;
};

const removeRecipeFromUserList = (user, recipeID) => {
  const recipeIdx = user.recipesToCook.indexOf(recipeID);
  if (recipeIdx !== -1) user.recipesToCook.splice(recipeIdx, 1);
  return user;
};

const filterUserRecipes = (recipes, userList) => {
  return recipes.filter(recipe => userList.includes(recipe.id));
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _images_turing_logo_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _images_hamburger_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _recipes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);


// --- // Images // --- //


// --- // Methods // --- //




// --- // Variables // --- //
var allRecipes = [];
var allUsers = [];
var allIngredients = [];
var featuredRecipe = {};
var filteredRecipes = [];
var recipeTags = [];
var currentUser = {};
var landingImageRecipeIds = [];
// --- // DOM Nodes // --- //
// -- containers -- //
const recipesContainer = document.querySelector('.recipes-container');
const featuredRecipeContainer = document.getElementById('featured-recipe');
const landingImages = document.querySelectorAll('.landing-image');
const carouselContainer = document.querySelector('.carousel');
// -- buttons -- //
const closeFeaturedRecipeBtn = document.getElementById('close-featured-recipe');
const toggleMyRecipesBtn = document.querySelector('.heart');
const toTopBtn = document.getElementById('to-top');
const toBottomBtn = document.getElementById('to-bottom');
// -- other -- //
const myRecipesCheckBox = document.getElementById('my-recipes-checkbox');
const tagFilterInput = document.getElementById('filter-by-tag');
const nameFilterInput = document.getElementById('filter-by-name');
// --- // Event Listeners // --- //
window.addEventListener('load', start);

recipesContainer.addEventListener('click', event => {
  const recipeCard = event.target.closest('figure');
  if (recipeCard) {
    const recipeId = Number(recipeCard.id);
    const recipe = (0,_recipes__WEBPACK_IMPORTED_MODULE_5__.findRecipe)(allRecipes, recipeId);
    featuredRecipe = { ...recipe };
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.updateFeaturedRecipe)(featuredRecipe, currentUser, allIngredients);
    featuredRecipeContainer.classList.add('unhide');
  }
});

carouselContainer.addEventListener('click', event => {
  const recipeImg = event.target.closest('img');
  if (recipeImg) {
    const recipeId = Number(recipeImg.id);
    const recipe = (0,_recipes__WEBPACK_IMPORTED_MODULE_5__.findRecipe)(allRecipes, recipeId);
    featuredRecipe = { ...recipe };
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.updateFeaturedRecipe)(featuredRecipe, currentUser, allIngredients);
    featuredRecipeContainer.classList.add('unhide');
  }
});

closeFeaturedRecipeBtn.addEventListener('click', () => {
  featuredRecipeContainer.classList.remove('unhide');
});

toggleMyRecipesBtn.addEventListener('click', () => {
  const icons = toggleMyRecipesBtn.querySelectorAll('svg');
  icons.forEach(icon => {
    icon.classList.toggle('hidden');
  });

  const { id } = featuredRecipe;
  if (currentUser.recipesToCook.includes(id)) {
    currentUser = (0,_users__WEBPACK_IMPORTED_MODULE_6__.removeRecipeFromUserList)(currentUser, id);
  } else {
    currentUser = (0,_users__WEBPACK_IMPORTED_MODULE_6__.addRecipeToUserList)(currentUser, id);
  }
});

toTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

toBottomBtn.addEventListener('click', () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth',
  });
});

tagFilterInput.addEventListener('change', event => {
  const tag = event.target.value;
  filteredRecipes = (0,_recipes__WEBPACK_IMPORTED_MODULE_5__.filterRecipesByTag)(allRecipes, tag);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayRecipes)(filteredRecipes, recipesContainer);
});

nameFilterInput.addEventListener('change', event => {
  const input = event.target.value;
  filteredRecipes = (0,_recipes__WEBPACK_IMPORTED_MODULE_5__.filterRecipesByName)(allRecipes, input);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayRecipes)(filteredRecipes, recipesContainer);
});

myRecipesCheckBox.addEventListener('change', event => {
  if (event.target.checked) {
    filteredRecipes = (0,_users__WEBPACK_IMPORTED_MODULE_6__.filterUserRecipes)(allRecipes, currentUser.recipesToCook);
  } else {
    filteredRecipes = [...allRecipes];
  }
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.displayRecipes)(filteredRecipes, recipesContainer);
});

function start() {
  Promise.all([
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchData)('recipes'),
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchData)('ingredients'),
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.fetchData)('users'),
  ])
    .then(data => {
      updateGlobalVariables(...data);
      (0,_domUpdates__WEBPACK_IMPORTED_MODULE_4__.updateDomWithAPIData)(allRecipes, recipeTags, landingImageRecipeIds);
    })
    .catch(err => console.log(err));
}

function updateGlobalVariables(recipeData, ingredientData, usersData) {
  const { recipes } = recipeData;
  const { ingredients } = ingredientData;
  const { users } = usersData;

  allRecipes = recipes;
  allIngredients = ingredients;
  allUsers = users;

  recipeTags = (0,_recipes__WEBPACK_IMPORTED_MODULE_5__.getAllRecipeTags)(allRecipes);
  currentUser = (0,_users__WEBPACK_IMPORTED_MODULE_6__.getRandomUser)(allUsers);
}

/******/ })()
;
//# sourceMappingURL=bundle.js.map