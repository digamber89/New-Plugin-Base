/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _tabs_general__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tabs/general */ "./src/tabs/general.js");
/* harmony import */ var _tabs_advanced__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tabs/advanced */ "./src/tabs/advanced.js");


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */



/*Code goes here
* Output : build/index.js
* */

const {
  __
} = wp.i18n;
const {
  render,
  useState,
  useEffect
} = wp.element;
const {
  isEqual
} = lodash;
const {
  apiFetch
} = wp;
const {
  TabPanel,
  Notice,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardDivider,
  CardFooter,
  Spinner
} = wp.components;

const AdminPanel = () => {
  const [settings, setSettings] = useState({}),
        [needSave, setNeedsSave] = useState(false),
        [isSaving, setIsSaving] = useState(false),
        [initialTab, setInitialTab] = useState('general'),
        [notice, setNotice] = useState({
    'show': false,
    'status': 'success',
    'message': 'suffering from success'
  });
  const tabs = [{
    name: 'general',
    title: 'General',
    className: 'tab-one'
  }, {
    name: 'advanced',
    title: 'Advanced',
    className: 'tab-two'
  }]; //on initial mount

  useEffect(() => {
    // console.log(digthisAdminObj);
    apiFetch({
      'url': ajaxurl + '?action=getDigthisAdminSettings'
    }).then(res => {
      setSettings(res);
    });
  }, []);

  const PluginNotice = () => {
    if (!notice.show) return '';
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Notice, {
      status: notice.status,
      onRemove: () => {
        setNotice(prevNotice => {
          let newNotice = { ...prevNotice
          };
          newNotice.show = false;
          return newNotice;
        });
      }
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, notice.message)));
  };

  const savePluginSettings = updateSettings => {
    // apiFetch.use( apiFetch.createNonceMiddleware( nonce ) );
    apiFetch({
      'url': ajaxurl + '?action=saveDigthisAdminSettings',
      'method': 'POST',
      'data': {
        settings: updateSettings,
        nonce: digthisAdminObj.nonce
      }
    }).then(res => {
      setIsSaving(false);
      setSettings(res.settings);
      setNotice(prevNotice => {
        let updateNotice = { ...prevNotice
        };
        updateNotice.show = true;
        updateNotice.status = res.notice.status;
        updateNotice.message = res.notice.message;
        return updateNotice;
      });
      setNeedsSave(true);
    });
  };

  const updateSettingsState = (key, val) => {
    let newSetting = { ...settings
    };
    newSetting[key] = val;
    setSettings(newSetting);
    setNeedsSave(true);
  };

  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Card, {
    size: "small"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardHeader, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h1", null, __('Plugin Settings', 'plugin-base'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PluginNotice, null), (!Object.keys(settings).length || isSaving) && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Spinner, null), !isSaving && Object.keys(settings).length > 0 && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TabPanel, {
    className: "my-tab-panel",
    activeClass: "active-tab",
    initialTabName: initialTab,
    tabs: tabs
  }, tab => {
    if ('general' === tab.name) {
      setInitialTab('general');
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tabs_general__WEBPACK_IMPORTED_MODULE_2__.GeneralTab, {
        settings: settings,
        updateSettings: updateSettingsState
      });
    } else if ('advanced' === tab.name) {
      setInitialTab('advanced');
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tabs_advanced__WEBPACK_IMPORTED_MODULE_3__.AdvancedTab, {
        settings: settings,
        updateSettings: updateSettingsState
      });
    }

    return '';
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardDivider, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardFooter, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Button, {
    className: "button button-large button-primary",
    onClick: () => {
      setIsSaving(true);
      savePluginSettings(settings);
    },
    disabled: !needSave || isSaving,
    isPrimary: true
  }, __('Save', 'plugin-base'))));
};

document.addEventListener('DOMContentLoaded', () => {
  if ('undefined' !== typeof document.getElementById('plugin-base-admin-settings') && null !== document.getElementById('plugin-base-admin-settings')) {
    render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(AdminPanel, null), document.getElementById('plugin-base-admin-settings'));
  }
});

/***/ }),

/***/ "./src/tabs/advanced.js":
/*!******************************!*\
  !*** ./src/tabs/advanced.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AdvancedTab": function() { return /* binding */ AdvancedTab; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  __
} = wp.i18n;
const {
  Fragment
} = wp.element;
const {
  CardBody,
  CardDivider,
  TextControl,
  ToggleControl
} = wp.components;
const AdvancedTab = props => {
  const {
    settings,
    updateSettings
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: "Fixed Background",
    help: 'Set Fixed Background',
    checked: settings && settings['fixedBackground'],
    onChange: value => {
      updateSettings('fixedBackground', value);
    }
  }));
};

/***/ }),

/***/ "./src/tabs/general.js":
/*!*****************************!*\
  !*** ./src/tabs/general.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GeneralTab": function() { return /* binding */ GeneralTab; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  __
} = wp.i18n;
const {
  Fragment
} = wp.element;
const {
  CardBody,
  CardDivider,
  TextControl
} = wp.components;
const GeneralTab = props => {
  const {
    settings,
    updateSettings
  } = props;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardBody, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(TextControl, {
    label: __('Setting', 'plugin-base'),
    placeholder: __('Enter Text', 'plugin-base'),
    value: settings && settings['setting_1'],
    onChange: newVal => updateSettings('setting_1', newVal)
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(CardDivider, null));
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

module.exports = window["wp"]["element"];

/***/ })

/******/ 	});
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
/******/ 			// no module.id needed
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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0,
/******/ 			"style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdigthis_plugin_base"] = self["webpackChunkdigthis_plugin_base"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["style-index"], function() { return __webpack_require__("./src/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map