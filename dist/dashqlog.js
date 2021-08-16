window["DashjsQlog"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/idb/build/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, deleteDB, openDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteDB", function() { return deleteDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDB", function() { return openDB; });
/* harmony import */ var _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wrap-idb-value.js */ "./node_modules/idb/build/esm/wrap-idb-value.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unwrap", function() { return _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["u"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return _wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"]; });




/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"])(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"])(request.result), event.oldVersion, event.newVersion, Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"])(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking)
            db.addEventListener('versionchange', () => blocking());
    })
        .catch(() => { });
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    return Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["w"])(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        const returnVal = await target[targetFuncName](...args);
        if (isWrite)
            await tx.done;
        return returnVal;
    };
    cachedMethods.set(prop, method);
    return method;
}
Object(_wrap_idb_value_js__WEBPACK_IMPORTED_MODULE_0__["r"])((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));




/***/ }),

/***/ "./node_modules/idb/build/esm/wrap-idb-value.js":
/*!******************************************************!*\
  !*** ./node_modules/idb/build/esm/wrap-idb-value.js ***!
  \******************************************************/
/*! exports provided: a, i, r, u, w */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return reverseTransformCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return instanceOfAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return replaceTraps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "u", function() { return unwrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "w", function() { return wrap; });
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);




/***/ }),

/***/ "./src/dashjsQlog.ts":
/*!***************************!*\
  !*** ./src/dashjsQlog.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.DashjsQlog = void 0;
class DashjsQlog {
    constructor(mediaPlayer, mediaPlayerEvents) {
        this.mediaPlayer = mediaPlayer;
        this.hook(mediaPlayerEvents);
    }
    dummy() {
        // console.log(arguments);
        // console.log("I Happened :D");
    }
    // NATIVE EVENTS
    // DASH JS EVENTS
    onBufferUpdate() {
        console.log(arguments);
    }
    hook(mediaPlayerEvents) {
        const eventHooks = {
            [mediaPlayerEvents.AST_IN_FUTURE]: this.dummy,
            [mediaPlayerEvents.BUFFER_EMPTY]: this.onBufferUpdate,
            [mediaPlayerEvents.BUFFER_LOADED]: this.onBufferUpdate,
            [mediaPlayerEvents.BUFFER_LEVEL_STATE_CHANGED]: this.onBufferUpdate,
            [mediaPlayerEvents.ERROR]: this.dummy,
            [mediaPlayerEvents.FRAGMENT_LOADING_COMPLETED]: this.dummy,
            // [mediaPlayerEvents.FRAGMENT_LOADING_PROGRESS]: this.dummy,
            [mediaPlayerEvents.FRAGMENT_LOADING_STARTED]: this.dummy,
            [mediaPlayerEvents.FRAGMENT_LOADING_ABANDONED]: this.dummy,
            [mediaPlayerEvents.LOG]: this.dummy,
            [mediaPlayerEvents.MANIFEST_LOADED]: this.dummy,
            [mediaPlayerEvents.METRICS_CHANGED]: this.dummy,
            [mediaPlayerEvents.METRIC_CHANGED]: this.dummy,
            [mediaPlayerEvents.METRIC_ADDED]: this.dummy,
            [mediaPlayerEvents.METRIC_UPDATED]: this.dummy,
            [mediaPlayerEvents.PERIOD_SWITCH_COMPLETED]: this.dummy,
            [mediaPlayerEvents.PERIOD_SWITCH_STARTED]: this.dummy,
            [mediaPlayerEvents.QUALITY_CHANGE_REQUESTED]: this.dummy,
            [mediaPlayerEvents.QUALITY_CHANGE_RENDERED]: this.dummy,
            [mediaPlayerEvents.TRACK_CHANGE_RENDERED]: this.dummy,
            // [mediaPlayerEvents.SOURCE_INITIALIZED]: this.dummy,
            // [mediaPlayerEvents.STREAM_INITIALIZING]: this.dummy,
            [mediaPlayerEvents.STREAM_INITIALIZED]: this.dummy,
            // [mediaPlayerEvents.STREAM_TEARDOWN_COMPLETE]: this.dummy,
            [mediaPlayerEvents.TEXT_TRACKS_ADDED]: this.dummy,
            [mediaPlayerEvents.TEXT_TRACK_ADDED]: this.dummy,
            [mediaPlayerEvents.TTML_PARSED]: this.dummy,
            // [mediaPlayerEvents.TTML_TO_PARSE]: this.dummy,
            // [mediaPlayerEvents.CAPTION_RENDERED]: this.dummy,
            // [mediaPlayerEvents.CAPTION_CONTAINER_RESIZE]: this.dummy,
            [mediaPlayerEvents.CAN_PLAY]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_ENDED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_ERROR]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_NOT_ALLOWED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_METADATA_LOADED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_PAUSED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_PLAYING]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_PROGRESS]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_RATE_CHANGED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_SEEKED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_SEEKING]: this.dummy,
            // [mediaPlayerEvents.PLAYBACK_SEEK_ASKED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_STALLED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_STARTED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_TIME_UPDATED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_WAITING]: this.dummy,
        };
        console.log(eventHooks);
        for (let key in eventHooks) {
            // @ts-ignore
            this.mediaPlayer.on(key, eventHooks[key]);
        }
    }
}
exports.DashjsQlog = DashjsQlog;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(/*! ./dashjsQlog */ "./src/dashjsQlog.ts"), exports);
__exportStar(__webpack_require__(/*! ./videoQlog */ "./src/videoQlog.ts"), exports);


/***/ }),

/***/ "./src/qlog-schema.ts":
/*!****************************!*\
  !*** ./src/qlog-schema.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: FIXME: export from the proper qlog package once that's updated
// export * from "@quictools/qlog-schema/draft-02/QLog";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadyState = exports.InteractionState = exports.MediaType = exports.NetworkEventType = exports.BufferEventType = exports.ABREventType = exports.PlaybackEventType = exports.QPACKHeaderBlockPresentationTypeName = exports.QPACKInstructionTypeName = exports.ApplicationError = exports.HTTP3FrameTypeName = exports.CryptoError = exports.TransportError = exports.ErrorSpace = exports.QUICFrameTypeName = exports.GenericEventType = exports.QPACKEventType = exports.H3StreamType = exports.HTTP3EventType = exports.StreamState = exports.PacketType = exports.ConnectionState = exports.KeyType = exports.RecoveryEventType = exports.SecurityEventType = exports.TransportEventType = exports.ConnectivityEventType = exports.EventCategory = exports.IDefaultEventFieldNames = exports.TimeFormat = exports.VantagePointType = exports.LogFormat = exports.Defaults = void 0;
// ================================================================== //
// Interface for QLog version draft-02
// ================================================================== //
class Defaults {
}
exports.Defaults = Defaults;
Defaults.versionName = "draft-02";
Defaults.versionAliases = ["draft-02", "draft-02-RC1"];
var LogFormat;
(function (LogFormat) {
    LogFormat["JSON"] = "JSON";
    LogFormat["NDJSON"] = "NDJSON";
})(LogFormat = exports.LogFormat || (exports.LogFormat = {}));
var VantagePointType;
(function (VantagePointType) {
    VantagePointType["client"] = "client";
    VantagePointType["server"] = "server";
    VantagePointType["network"] = "network";
    VantagePointType["unknown"] = "unknown";
})(VantagePointType = exports.VantagePointType || (exports.VantagePointType = {}));
var TimeFormat;
(function (TimeFormat) {
    TimeFormat["absolute"] = "absolute";
    TimeFormat["relative"] = "relative";
    TimeFormat["delta"] = "delta";
})(TimeFormat = exports.TimeFormat || (exports.TimeFormat = {}));
// event names defined in the main schema, for easier usage
var IDefaultEventFieldNames;
(function (IDefaultEventFieldNames) {
    IDefaultEventFieldNames["category"] = "category";
    IDefaultEventFieldNames["event"] = "event";
    IDefaultEventFieldNames["data"] = "data";
    IDefaultEventFieldNames["time"] = "time";
    IDefaultEventFieldNames["relative_time"] = "relative_time";
    IDefaultEventFieldNames["delta_time"] = "delta_time";
})(IDefaultEventFieldNames = exports.IDefaultEventFieldNames || (exports.IDefaultEventFieldNames = {}));
// ================================================================== //
// Based on QUIC draft 23
// ================================================================== //
var EventCategory;
(function (EventCategory) {
    EventCategory["connectivity"] = "connectivity";
    EventCategory["security"] = "security";
    EventCategory["transport"] = "transport";
    EventCategory["recovery"] = "recovery";
    EventCategory["http"] = "http";
    EventCategory["qpack"] = "qpack";
    EventCategory["error"] = "error";
    EventCategory["warning"] = "warning";
    EventCategory["info"] = "info";
    EventCategory["debug"] = "debug";
    EventCategory["verbose"] = "verbose";
    EventCategory["simulation"] = "simulation";
    // JHERBOTS
    // Video categories
    EventCategory["playback"] = "playback";
    EventCategory["abr"] = "abr";
    EventCategory["network"] = "network";
    EventCategory["buffer"] = "buffer";
})(EventCategory = exports.EventCategory || (exports.EventCategory = {}));
var ConnectivityEventType;
(function (ConnectivityEventType) {
    ConnectivityEventType["server_listening"] = "server_listening";
    ConnectivityEventType["connection_started"] = "connection_started";
    ConnectivityEventType["connection_id_updated"] = "connection_id_updated";
    ConnectivityEventType["spin_bit_updated"] = "spin_bit_updated";
    ConnectivityEventType["connection_state_updated"] = "connection_state_updated";
})(ConnectivityEventType = exports.ConnectivityEventType || (exports.ConnectivityEventType = {}));
var TransportEventType;
(function (TransportEventType) {
    TransportEventType["parameters_set"] = "parameters_set";
    TransportEventType["datagrams_sent"] = "datagrams_sent";
    TransportEventType["datagrams_received"] = "datagrams_received";
    TransportEventType["datagram_dropped"] = "datagram_dropped";
    TransportEventType["packet_sent"] = "packet_sent";
    TransportEventType["packet_received"] = "packet_received";
    TransportEventType["packet_dropped"] = "packet_dropped";
    TransportEventType["packet_buffered"] = "packet_buffered";
    TransportEventType["frames_processed"] = "frames_processed";
    TransportEventType["stream_state_updated"] = "stream_state_updated";
})(TransportEventType = exports.TransportEventType || (exports.TransportEventType = {}));
var SecurityEventType;
(function (SecurityEventType) {
    SecurityEventType["key_updated"] = "key_updated";
    SecurityEventType["key_retired"] = "key_retired";
})(SecurityEventType = exports.SecurityEventType || (exports.SecurityEventType = {}));
var RecoveryEventType;
(function (RecoveryEventType) {
    RecoveryEventType["parameters_set"] = "parameters_set";
    RecoveryEventType["metrics_updated"] = "metrics_updated";
    RecoveryEventType["congestion_state_updated"] = "congestion_state_updated";
    RecoveryEventType["loss_timer_set"] = "loss_timer_set";
    RecoveryEventType["loss_timer_triggered"] = "loss_timer_triggered";
    RecoveryEventType["packet_lost"] = "packet_lost";
    RecoveryEventType["marked_for_retransmit"] = "marked_for_retransmit";
})(RecoveryEventType = exports.RecoveryEventType || (exports.RecoveryEventType = {}));
// ================================================================== //
var KeyType;
(function (KeyType) {
    KeyType["server_initial_secret"] = "server_initial_secret";
    KeyType["client_initial_secret"] = "client_initial_secret";
    KeyType["server_handshake_secret"] = "server_handshake_secret";
    KeyType["client_handshake_secret"] = "client_handshake_secret";
    KeyType["server_0rtt_secret"] = "server_0rtt_secret";
    KeyType["client_0rtt_secret"] = "client_0rtt_secret";
    KeyType["server_1rtt_secret"] = "server_1rtt_secret";
    KeyType["client_1rtt_secret"] = "client_1rtt_secret";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
var ConnectionState;
(function (ConnectionState) {
    ConnectionState["attempted"] = "attempted";
    ConnectionState["reset"] = "reset";
    ConnectionState["handshake"] = "handshake";
    ConnectionState["active"] = "active";
    ConnectionState["keepalive"] = "keepalive";
    ConnectionState["draining"] = "draining";
    ConnectionState["closed"] = "closed";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
var PacketType;
(function (PacketType) {
    PacketType["initial"] = "initial";
    PacketType["handshake"] = "handshake";
    PacketType["zerortt"] = "0RTT";
    PacketType["onertt"] = "1RTT";
    PacketType["retry"] = "retry";
    PacketType["version_negotiation"] = "version_negotiation";
    PacketType["stateless_reset"] = "stateless_reset";
    PacketType["unknown"] = "unknown";
})(PacketType = exports.PacketType || (exports.PacketType = {}));
var StreamState;
(function (StreamState) {
    // bidirectional stream states, draft-23 3.4.
    StreamState[StreamState["idle"] = 0] = "idle";
    StreamState[StreamState["open"] = 1] = "open";
    StreamState[StreamState["half_closed_local"] = 2] = "half_closed_local";
    StreamState[StreamState["half_closed_remote"] = 3] = "half_closed_remote";
    StreamState[StreamState["closed"] = 4] = "closed";
    // sending-side stream states, draft-23 3.1.
    StreamState[StreamState["ready"] = 5] = "ready";
    StreamState[StreamState["send"] = 6] = "send";
    StreamState[StreamState["data_sent"] = 7] = "data_sent";
    StreamState[StreamState["reset_sent"] = 8] = "reset_sent";
    StreamState[StreamState["reset_received"] = 9] = "reset_received";
    // receive-side stream states, draft-23 3.2.
    StreamState[StreamState["receive"] = 10] = "receive";
    StreamState[StreamState["size_known"] = 11] = "size_known";
    StreamState[StreamState["data_read"] = 12] = "data_read";
    StreamState[StreamState["reset_read"] = 13] = "reset_read";
    // both-side states
    StreamState[StreamState["data_received"] = 14] = "data_received";
    // qlog-defined
    StreamState[StreamState["destroyed"] = 15] = "destroyed";
})(StreamState = exports.StreamState || (exports.StreamState = {}));
var HTTP3EventType;
(function (HTTP3EventType) {
    HTTP3EventType["parameters_set"] = "parameters_set";
    HTTP3EventType["stream_type_set"] = "stream_type_set";
    HTTP3EventType["frame_created"] = "frame_created";
    HTTP3EventType["frame_parsed"] = "frame_parsed";
    HTTP3EventType["data_moved"] = "data_moved";
    HTTP3EventType["datagram_received"] = "data_received";
    HTTP3EventType["dependency_update"] = "dependency_update";
})(HTTP3EventType = exports.HTTP3EventType || (exports.HTTP3EventType = {}));
var H3StreamType;
(function (H3StreamType) {
    H3StreamType["data"] = "data";
    H3StreamType["control"] = "control";
    H3StreamType["push"] = "push";
    H3StreamType["reserved"] = "reserved";
    H3StreamType["qpack_encode"] = "qpack_encode";
    H3StreamType["qpack_decode"] = "qpack_decode";
})(H3StreamType = exports.H3StreamType || (exports.H3StreamType = {}));
// ================================================================== //
// QPACK
// export type HTTP3EventType = IEventH3FrameCreated | IEventH3FrameParsed | IEventH3DataMoved | IEventH3DataReceived | IEventH3DependencyUpdate;
// note: here, we use HTTP3 for clarity
// in the spec, the category is just "http"!
var QPACKEventType;
(function (QPACKEventType) {
    QPACKEventType["state_updated"] = "state_updated";
    QPACKEventType["stream_state_updated"] = "stream_state_updated";
    QPACKEventType["dynamic_table_updated"] = "dynamic_table_updated";
    QPACKEventType["headers_encoded"] = "headers_encoded";
    QPACKEventType["headers_decoded"] = "headers_decoded";
    QPACKEventType["instruction_sent"] = "instruction_sent";
    QPACKEventType["instruction_received"] = "instruction_received";
})(QPACKEventType = exports.QPACKEventType || (exports.QPACKEventType = {}));
// ================================================================== //
// Generic
var GenericEventType;
(function (GenericEventType) {
    GenericEventType["connection_error"] = "connection_error";
    GenericEventType["application_error"] = "application_error";
    GenericEventType["internal_error"] = "internal_error";
    GenericEventType["internal_warning"] = "internal_warning";
    GenericEventType["message"] = "message";
    GenericEventType["marker"] = "marker";
})(GenericEventType = exports.GenericEventType || (exports.GenericEventType = {}));
// ================================================================== //
// Based on QUIC draft-23
// ================================================================== //
var QUICFrameTypeName;
(function (QUICFrameTypeName) {
    QUICFrameTypeName["padding"] = "padding";
    QUICFrameTypeName["ping"] = "ping";
    QUICFrameTypeName["ack"] = "ack";
    QUICFrameTypeName["reset_stream"] = "reset_stream";
    QUICFrameTypeName["stop_sending"] = "stop_sending";
    QUICFrameTypeName["crypto"] = "crypto";
    QUICFrameTypeName["new_token"] = "new_token";
    QUICFrameTypeName["stream"] = "stream";
    QUICFrameTypeName["max_data"] = "max_data";
    QUICFrameTypeName["max_stream_data"] = "max_stream_data";
    QUICFrameTypeName["max_streams"] = "max_streams";
    QUICFrameTypeName["data_blocked"] = "data_blocked";
    QUICFrameTypeName["stream_data_blocked"] = "stream_data_blocked";
    QUICFrameTypeName["streams_blocked"] = "streams_blocked";
    QUICFrameTypeName["new_connection_id"] = "new_connection_id";
    QUICFrameTypeName["retire_connection_id"] = "retire_connection_id";
    QUICFrameTypeName["path_challenge"] = "path_challenge";
    QUICFrameTypeName["path_response"] = "path_response";
    QUICFrameTypeName["connection_close"] = "connection_close";
    QUICFrameTypeName["application_close"] = "application_close";
    QUICFrameTypeName["unknown_frame_type"] = "unknown_frame_type";
})(QUICFrameTypeName = exports.QUICFrameTypeName || (exports.QUICFrameTypeName = {}));
var ErrorSpace;
(function (ErrorSpace) {
    ErrorSpace["transport_error"] = "transport_error";
    ErrorSpace["application_error"] = "application_error";
})(ErrorSpace = exports.ErrorSpace || (exports.ErrorSpace = {}));
var TransportError;
(function (TransportError) {
    TransportError["no_error"] = "no_error";
    TransportError["internal_error"] = "internal_error";
    TransportError["server_busy"] = "server_busy";
    TransportError["flow_control_error"] = "flow_control_error";
    TransportError["stream_limit_error"] = "stream_limit_error";
    TransportError["stream_state_error"] = "stream_state_error";
    TransportError["final_size_error"] = "final_size_error";
    TransportError["frame_encoding_error"] = "frame_encoding_error";
    TransportError["transport_parameter_error"] = "transport_parameter_error";
    TransportError["protocol_violation"] = "protocol_violation";
    TransportError["invalid_migration"] = "invalid_migration";
    TransportError["crypto_buffer_exceeded"] = "crypto_buffer_exceeded";
    TransportError["unknown"] = "unknown";
})(TransportError = exports.TransportError || (exports.TransportError = {}));
var CryptoError;
(function (CryptoError) {
    CryptoError["prefix"] = "crypto_error_";
})(CryptoError = exports.CryptoError || (exports.CryptoError = {}));
// ================================================================== //
var HTTP3FrameTypeName;
(function (HTTP3FrameTypeName) {
    HTTP3FrameTypeName["data"] = "data";
    HTTP3FrameTypeName["headers"] = "headers";
    HTTP3FrameTypeName["cancel_push"] = "cancel_push";
    HTTP3FrameTypeName["settings"] = "settings";
    HTTP3FrameTypeName["push_promise"] = "push_promise";
    HTTP3FrameTypeName["goaway"] = "goaway";
    HTTP3FrameTypeName["max_push_id"] = "max_push_id";
    HTTP3FrameTypeName["duplicate_push"] = "duplicate_push";
    HTTP3FrameTypeName["reserved"] = "reserved";
    HTTP3FrameTypeName["unknown"] = "unknown";
})(HTTP3FrameTypeName = exports.HTTP3FrameTypeName || (exports.HTTP3FrameTypeName = {}));
var ApplicationError;
(function (ApplicationError) {
    ApplicationError["http_no_error"] = "http_no_error";
    ApplicationError["http_general_protocol_error"] = "http_general_protocol_error";
    ApplicationError["http_internal_error"] = "http_internal_error";
    ApplicationError["http_request_cancelled"] = "http_request_cancelled";
    ApplicationError["http_request_incomplete"] = "http_incomplete_request";
    ApplicationError["http_connect_error"] = "http_connect_error";
    ApplicationError["http_frame_error"] = "http_frame_error";
    ApplicationError["http_excessive_load"] = "http_excessive_load";
    ApplicationError["http_version_fallback"] = "http_version_fallback";
    ApplicationError["http_id_error"] = "http_id_error";
    ApplicationError["http_stream_creation_error"] = "http_stream_creation_error";
    ApplicationError["http_closed_critical_stream"] = "http_closed_critical_stream";
    ApplicationError["http_early_response"] = "http_early_response";
    ApplicationError["http_missing_settings"] = "http_missing_settings";
    ApplicationError["http_frame_unexpected"] = "http_unexpected_frame";
    ApplicationError["http_request_rejected"] = "http_request_rejected";
    ApplicationError["http_settings_error"] = "http_settings_error";
    ApplicationError["unknown"] = "unknown";
})(ApplicationError = exports.ApplicationError || (exports.ApplicationError = {}));
// ================================================================== //
var QPACKInstructionTypeName;
(function (QPACKInstructionTypeName) {
    QPACKInstructionTypeName["set_dynamic_table_capacity"] = "set_dynamic_table_capacity";
    QPACKInstructionTypeName["insert_with_name_reference"] = "insert_with_name_reference";
    QPACKInstructionTypeName["insert_without_name_reference"] = "insert_without_name_reference";
    QPACKInstructionTypeName["duplicate"] = "duplicate";
    QPACKInstructionTypeName["header_acknowledgement"] = "header_acknowledgement";
    QPACKInstructionTypeName["stream_cancellation"] = "stream_cancellation";
    QPACKInstructionTypeName["insert_count_increment"] = "insert_count_increment";
})(QPACKInstructionTypeName = exports.QPACKInstructionTypeName || (exports.QPACKInstructionTypeName = {}));
var QPACKHeaderBlockPresentationTypeName;
(function (QPACKHeaderBlockPresentationTypeName) {
    QPACKHeaderBlockPresentationTypeName["indexed_header"] = "indexed_header";
    QPACKHeaderBlockPresentationTypeName["literal_with_name"] = "literal_with_name";
    QPACKHeaderBlockPresentationTypeName["literal_without_name"] = "literal_without_name";
})(QPACKHeaderBlockPresentationTypeName = exports.QPACKHeaderBlockPresentationTypeName || (exports.QPACKHeaderBlockPresentationTypeName = {}));
// export type VideoEventType = IBufferLevelUpdate | IPlayerInteraction | IRepresentationSwitch;
//////////////////
// ABR Event types
//////////////////
var PlaybackEventType;
(function (PlaybackEventType) {
    PlaybackEventType["stream_initialised"] = "stream_initialised";
    PlaybackEventType["player_interaction"] = "player_interaction";
    PlaybackEventType["rebuffer"] = "rebuffer";
    PlaybackEventType["stream_end"] = "stream_end";
    PlaybackEventType["playhead_progress"] = "playhead_progress";
})(PlaybackEventType = exports.PlaybackEventType || (exports.PlaybackEventType = {}));
var ABREventType;
(function (ABREventType) {
    ABREventType["switch"] = "switch";
    ABREventType["readystate_change"] = "readystate_change";
})(ABREventType = exports.ABREventType || (exports.ABREventType = {}));
var BufferEventType;
(function (BufferEventType) {
    BufferEventType["occupancy_update"] = "occupancy_update";
})(BufferEventType = exports.BufferEventType || (exports.BufferEventType = {}));
var NetworkEventType;
(function (NetworkEventType) {
    NetworkEventType["request"] = "request";
    NetworkEventType["request_update"] = "request_update";
    NetworkEventType["abort"] = "abort";
})(NetworkEventType = exports.NetworkEventType || (exports.NetworkEventType = {}));
/////////////////////////
// ABR Event Data fields
/////////////////////////
var MediaType;
(function (MediaType) {
    MediaType["video"] = "video";
    MediaType["audio"] = "audio";
    MediaType["subtitles"] = "subtitles";
    MediaType["other"] = "other";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
var InteractionState;
(function (InteractionState) {
    InteractionState["play"] = "play";
    InteractionState["pause"] = "pause";
    InteractionState["seek"] = "seek";
    InteractionState["speed"] = "speed";
})(InteractionState = exports.InteractionState || (exports.InteractionState = {}));
var ReadyState;
(function (ReadyState) {
    ReadyState[ReadyState["have_nothing"] = 0] = "have_nothing";
    ReadyState[ReadyState["have_metadata"] = 1] = "have_metadata";
    ReadyState[ReadyState["have_current_data"] = 2] = "have_current_data";
    ReadyState[ReadyState["have_future_data"] = 3] = "have_future_data";
    ReadyState[ReadyState["have_enough_data"] = 4] = "have_enough_data";
})(ReadyState = exports.ReadyState || (exports.ReadyState = {}));
///////////////////////////////////////////////////////////////////////////
// export enum VideoEventData {
//     buffer_level_update = "buffer_level_updated",
//     player_interaction = "player_interaction",
//     representation_switch = "representation_switch",
//     progress_update = "progress_update"// TEMPORARY
// }
//
//
//
// export interface IBufferLevelUpdate {
//     media_type:MediaType,
//     level:number
// }
//
// export enum PlayerState {
//     play = "play",
//     pause = "pause",
//     seek = "seek"
// }
//
// export interface IPlayerInteraction {
//     state:PlayerState,
//     autoplay?:boolean // only if state === PlayerState.play
// }
//
// export interface IRepresentationSwitch {
//     media_type:MediaType,
//     representation_name?:string,
//     representation_index?:number
//     subrepresentation_level?:number // Linked to subsegment ssix level
// }


/***/ }),

/***/ "./src/videoQlog.ts":
/*!**************************!*\
  !*** ./src/videoQlog.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoQlogOverviewManager = exports.VideoQlog = void 0;
const idb = __importStar(__webpack_require__(/*! idb */ "./node_modules/idb/build/esm/index.js"));
const qlog = __importStar(__webpack_require__(/*! ./qlog-schema */ "./src/qlog-schema.ts"));
// Represents a single video trace
class VideoQlog {
    async init(traceName) {
        if (!window.indexedDB) {
            console.error("No support for IndexedDB, halting videoQlog.");
            return;
        }
        this.startTimestamp = new Date().getTime();
        this.startTimer = window.performance.now();
        this.traceName = traceName || this.startTimestamp.toString();
        let databaseName = "videoQlog-" + this.traceName;
        this.logDatabase = await idb.openDB(databaseName, 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains("events")) {
                    db.createObjectStore("events", { autoIncrement: true });
                }
            }
        });
        this.overviewDatabase = new VideoQlogOverviewManager();
        await this.overviewDatabase.init();
        await this.overviewDatabase.registerNewDatabase(databaseName);
    }
    getCurrentTimeOffset() {
        return window.performance.now() - this.startTimer;
    }
    async generateBlob() {
        await this.retrieveLogs().then(logs => {
            let time = new Date(new Date().getTime());
            // https://quiclog.github.io/internet-drafts/draft02/draft-marx-qlog-main-schema.html
            let qlogJson = {
                qlog_version: "draft-02",
                qlog_format: "JSON",
                title: "qlog-abr",
                description: "",
                traces: [
                    {
                        title: "MPEG-DASH dash.js",
                        description: `MPEG-DASH dash.js collection [${time.toISOString()}] [${navigator.userAgent}]`,
                        vantage_point: {
                            name: "DashJS application layer",
                            type: qlog.VantagePointType.client
                        },
                        common_fields: {
                            protocol_type: "QLOG_ABR",
                            reference_time: "" + this.startTimestamp,
                            time_format: "relative",
                        },
                        events: logs
                    }
                ]
            };
            this.generateDownloadEvent(JSON.stringify(qlogJson));
        });
    }
    async retrieveLogs() {
        let logs = await this.logDatabase.getAll("events");
        return logs;
    }
    wrapEventData(category, type, data) {
        return {
            time: this.getCurrentTimeOffset(),
            category: category,
            type: type,
            data: data
        };
    }
    generateDownloadEvent(data) {
        let blob = new Blob([data], { type: "application/json;charset=utf8" });
        let link = window.URL.createObjectURL(blob);
        let domA = document.createElement("a");
        domA.download = "create-name-todo.json";
        domA.href = link;
        document.body.appendChild(domA);
        domA.click();
        document.body.removeChild(domA);
    }
    async registerEvent(eventData) {
        console.log(eventData);
        await this.logDatabase.put("events", eventData);
    }
    // ***
    // Video QLog formatters
    // ***
    // Native events
    // public async onCanPlay(element: HTMLElement)
    async onPlaybackEnded(timestamp) {
        let eventData = {
            playhead_ms: timestamp
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.playback, qlog.PlaybackEventType.stream_end, eventData));
    }
    async onPlayheadProgress(timestamp) {
        let eventData = {
            playhead_ms: timestamp
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.playback, qlog.PlaybackEventType.playhead_progress, eventData));
    }
    async onStreamInitialised(autoplay) {
        let eventData = {
            autoplay: autoplay
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.playback, qlog.PlaybackEventType.stream_initialised, eventData));
    }
    async onStreamEnded(timestamp) {
        let eventData = {
            playhead_ms: timestamp
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.playback, qlog.PlaybackEventType.stream_end, eventData));
    }
    async onRepresentationSwitch(mediaType, newRepName, bitrate) {
        let eventData = {
            media_type: mediaType,
            to_id: newRepName,
            to_bitrate: bitrate
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.abr, qlog.ABREventType.switch, eventData));
    }
    async onReadystateChange(state) {
        let eventData = {
            state: state
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.abr, qlog.ABREventType.readystate_change, eventData));
    }
    async onBufferLevelUpdate(mediaType, level) {
        let eventData = {
            media_type: mediaType,
            playout_ms: level
        };
        await this.registerEvent(this.wrapEventData("video", qlog.BufferEventType.occupancy_update, eventData));
    }
}
exports.VideoQlog = VideoQlog;
class VideoQlogOverviewManager {
    async init() {
        this.overviewDatabase = await idb.openDB("VideoQlog-overview", 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains("overview")) {
                    db.createObjectStore("overview", { autoIncrement: true });
                }
            }
        });
    }
    async clearAll() {
        let databaseNames = await this.overviewDatabase.getAll("overview");
        // console.log(databaseNames);
        databaseNames.forEach(database => {
            idb.deleteDB(database);
        });
        await this.overviewDatabase.clear("overview");
    }
    async registerNewDatabase(databaseName) {
        return this.overviewDatabase.put("overview", databaseName);
    }
}
exports.VideoQlogOverviewManager = VideoQlogOverviewManager;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EYXNoanNRbG9nL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0Rhc2hqc1Fsb2cvLi9ub2RlX21vZHVsZXMvaWRiL2J1aWxkL2VzbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9EYXNoanNRbG9nLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9lc20vd3JhcC1pZGItdmFsdWUuanMiLCJ3ZWJwYWNrOi8vRGFzaGpzUWxvZy8uL3NyYy9kYXNoanNRbG9nLnRzIiwid2VicGFjazovL0Rhc2hqc1Fsb2cvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vRGFzaGpzUWxvZy8uL3NyYy9xbG9nLXNjaGVtYS50cyIsIndlYnBhY2s6Ly9EYXNoanNRbG9nLy4vc3JjL3ZpZGVvUWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQW1FO0FBQ047O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHlDQUF5QyxLQUFLO0FBQzlFO0FBQ0Esd0JBQXdCLDREQUFJO0FBQzVCO0FBQ0E7QUFDQSxvQkFBb0IsNERBQUksc0RBQXNELDREQUFJO0FBQ2xGLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsc0JBQXNCLEVBQUU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsVUFBVSxLQUFLO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNERBQUk7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFMkI7Ozs7Ozs7Ozs7Ozs7QUNsRjVCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsc0JBQXNCLEVBQUU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFcUc7Ozs7Ozs7Ozs7Ozs7QUN4THhGO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDekVhO0FBQ2I7QUFDQTtBQUNBLGtDQUFrQyxvQ0FBb0MsYUFBYSxFQUFFLEVBQUU7QUFDdkYsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQsYUFBYSxtQkFBTyxDQUFDLHlDQUFjO0FBQ25DLGFBQWEsbUJBQU8sQ0FBQyx1Q0FBYTs7Ozs7Ozs7Ozs7OztBQ2JyQjtBQUNiO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMERBQTBEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsK0VBQStFO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDZEQUE2RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9HQUFvRztBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzRUFBc0U7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDhGQUE4RjtBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHFGQUFxRjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0ZBQWtGO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0ZBQWtGO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLG9EQUFvRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRFQUE0RTtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsNkRBQTZEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGdFQUFnRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHlFQUF5RTtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtRUFBbUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMseUVBQXlFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywrRUFBK0U7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0ZBQWtGO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw2REFBNkQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyx5RUFBeUU7QUFDMUU7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxnRUFBZ0U7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHFGQUFxRjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywrRUFBK0U7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHVHQUF1RztBQUN4RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQywySUFBMkk7QUFDNUk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsa0ZBQWtGO0FBQ25GO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxtRUFBbUU7QUFDcEU7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0RUFBNEU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsK0VBQStFO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMERBQTBEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsK0VBQStFO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw2REFBNkQ7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RZYTtBQUNiO0FBQ0E7QUFDQSxrQ0FBa0Msb0NBQW9DLGFBQWEsRUFBRSxFQUFFO0FBQ3ZGLENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EseUNBQXlDLDZCQUE2QjtBQUN0RSxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLHlCQUF5QixtQkFBTyxDQUFDLGtEQUFLO0FBQ3RDLDBCQUEwQixtQkFBTyxDQUFDLDJDQUFlO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Qsc0JBQXNCO0FBQzFFO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBc0UsbUJBQW1CLEtBQUssb0JBQW9CO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMseUJBQXlCLGVBQWU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHNCQUFzQjtBQUM1RTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJkYXNocWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgdyBhcyB3cmFwLCByIGFzIHJlcGxhY2VUcmFwcyB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuZXhwb3J0IHsgdSBhcyB1bndyYXAsIHcgYXMgd3JhcCB9IGZyb20gJy4vd3JhcC1pZGItdmFsdWUuanMnO1xuXG4vKipcbiAqIE9wZW4gYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqIEBwYXJhbSB2ZXJzaW9uIFNjaGVtYSB2ZXJzaW9uLlxuICogQHBhcmFtIGNhbGxiYWNrcyBBZGRpdGlvbmFsIGNhbGxiYWNrcy5cbiAqL1xuZnVuY3Rpb24gb3BlbkRCKG5hbWUsIHZlcnNpb24sIHsgYmxvY2tlZCwgdXBncmFkZSwgYmxvY2tpbmcsIHRlcm1pbmF0ZWQgfSA9IHt9KSB7XG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xuICAgIGNvbnN0IG9wZW5Qcm9taXNlID0gd3JhcChyZXF1ZXN0KTtcbiAgICBpZiAodXBncmFkZSkge1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZ3JhZGVuZWVkZWQnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHVwZ3JhZGUod3JhcChyZXF1ZXN0LnJlc3VsdCksIGV2ZW50Lm9sZFZlcnNpb24sIGV2ZW50Lm5ld1ZlcnNpb24sIHdyYXAocmVxdWVzdC50cmFuc2FjdGlvbikpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGJsb2NrZWQpXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XG4gICAgb3BlblByb21pc2VcbiAgICAgICAgLnRoZW4oKGRiKSA9PiB7XG4gICAgICAgIGlmICh0ZXJtaW5hdGVkKVxuICAgICAgICAgICAgZGIuYWRkRXZlbnRMaXN0ZW5lcignY2xvc2UnLCAoKSA9PiB0ZXJtaW5hdGVkKCkpO1xuICAgICAgICBpZiAoYmxvY2tpbmcpXG4gICAgICAgICAgICBkYi5hZGRFdmVudExpc3RlbmVyKCd2ZXJzaW9uY2hhbmdlJywgKCkgPT4gYmxvY2tpbmcoKSk7XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgcmV0dXJuIG9wZW5Qcm9taXNlO1xufVxuLyoqXG4gKiBEZWxldGUgYSBkYXRhYmFzZS5cbiAqXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cbiAqL1xuZnVuY3Rpb24gZGVsZXRlREIobmFtZSwgeyBibG9ja2VkIH0gPSB7fSkge1xuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSk7XG4gICAgaWYgKGJsb2NrZWQpXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XG4gICAgcmV0dXJuIHdyYXAocmVxdWVzdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xufVxuXG5jb25zdCByZWFkTWV0aG9kcyA9IFsnZ2V0JywgJ2dldEtleScsICdnZXRBbGwnLCAnZ2V0QWxsS2V5cycsICdjb3VudCddO1xuY29uc3Qgd3JpdGVNZXRob2RzID0gWydwdXQnLCAnYWRkJywgJ2RlbGV0ZScsICdjbGVhciddO1xuY29uc3QgY2FjaGVkTWV0aG9kcyA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHtcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBJREJEYXRhYmFzZSAmJlxuICAgICAgICAhKHByb3AgaW4gdGFyZ2V0KSAmJlxuICAgICAgICB0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApKVxuICAgICAgICByZXR1cm4gY2FjaGVkTWV0aG9kcy5nZXQocHJvcCk7XG4gICAgY29uc3QgdGFyZ2V0RnVuY05hbWUgPSBwcm9wLnJlcGxhY2UoL0Zyb21JbmRleCQvLCAnJyk7XG4gICAgY29uc3QgdXNlSW5kZXggPSBwcm9wICE9PSB0YXJnZXRGdW5jTmFtZTtcbiAgICBjb25zdCBpc1dyaXRlID0gd3JpdGVNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKTtcbiAgICBpZiAoXG4gICAgLy8gQmFpbCBpZiB0aGUgdGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHRhcmdldC4gRWcsIGdldEFsbCBpc24ndCBpbiBFZGdlLlxuICAgICEodGFyZ2V0RnVuY05hbWUgaW4gKHVzZUluZGV4ID8gSURCSW5kZXggOiBJREJPYmplY3RTdG9yZSkucHJvdG90eXBlKSB8fFxuICAgICAgICAhKGlzV3JpdGUgfHwgcmVhZE1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG1ldGhvZCA9IGFzeW5jIGZ1bmN0aW9uIChzdG9yZU5hbWUsIC4uLmFyZ3MpIHtcbiAgICAgICAgLy8gaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogdW5kZWZpbmVkIGd6aXBwcyBiZXR0ZXIsIGJ1dCBmYWlscyBpbiBFZGdlIDooXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy50cmFuc2FjdGlvbihzdG9yZU5hbWUsIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seScpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gdHguc3RvcmU7XG4gICAgICAgIGlmICh1c2VJbmRleClcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5pbmRleChhcmdzLnNoaWZ0KCkpO1xuICAgICAgICBjb25zdCByZXR1cm5WYWwgPSBhd2FpdCB0YXJnZXRbdGFyZ2V0RnVuY05hbWVdKC4uLmFyZ3MpO1xuICAgICAgICBpZiAoaXNXcml0ZSlcbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XG4gICAgICAgIHJldHVybiByZXR1cm5WYWw7XG4gICAgfTtcbiAgICBjYWNoZWRNZXRob2RzLnNldChwcm9wLCBtZXRob2QpO1xuICAgIHJldHVybiBtZXRob2Q7XG59XG5yZXBsYWNlVHJhcHMoKG9sZFRyYXBzKSA9PiAoe1xuICAgIC4uLm9sZFRyYXBzLFxuICAgIGdldDogKHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpID0+IGdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSxcbiAgICBoYXM6ICh0YXJnZXQsIHByb3ApID0+ICEhZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuaGFzKHRhcmdldCwgcHJvcCksXG59KSk7XG5cbmV4cG9ydCB7IGRlbGV0ZURCLCBvcGVuREIgfTtcbiIsImNvbnN0IGluc3RhbmNlT2ZBbnkgPSAob2JqZWN0LCBjb25zdHJ1Y3RvcnMpID0+IGNvbnN0cnVjdG9ycy5zb21lKChjKSA9PiBvYmplY3QgaW5zdGFuY2VvZiBjKTtcblxubGV0IGlkYlByb3h5YWJsZVR5cGVzO1xubGV0IGN1cnNvckFkdmFuY2VNZXRob2RzO1xuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXG5mdW5jdGlvbiBnZXRJZGJQcm94eWFibGVUeXBlcygpIHtcbiAgICByZXR1cm4gKGlkYlByb3h5YWJsZVR5cGVzIHx8XG4gICAgICAgIChpZGJQcm94eWFibGVUeXBlcyA9IFtcbiAgICAgICAgICAgIElEQkRhdGFiYXNlLFxuICAgICAgICAgICAgSURCT2JqZWN0U3RvcmUsXG4gICAgICAgICAgICBJREJJbmRleCxcbiAgICAgICAgICAgIElEQkN1cnNvcixcbiAgICAgICAgICAgIElEQlRyYW5zYWN0aW9uLFxuICAgICAgICBdKSk7XG59XG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cbmZ1bmN0aW9uIGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkge1xuICAgIHJldHVybiAoY3Vyc29yQWR2YW5jZU1ldGhvZHMgfHxcbiAgICAgICAgKGN1cnNvckFkdmFuY2VNZXRob2RzID0gW1xuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5hZHZhbmNlLFxuICAgICAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZSxcbiAgICAgICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWVQcmltYXJ5S2V5LFxuICAgICAgICBdKSk7XG59XG5jb25zdCBjdXJzb3JSZXF1ZXN0TWFwID0gbmV3IFdlYWtNYXAoKTtcbmNvbnN0IHRyYW5zYWN0aW9uRG9uZU1hcCA9IG5ldyBXZWFrTWFwKCk7XG5jb25zdCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgdHJhbnNmb3JtQ2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuY29uc3QgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZSh3cmFwKHJlcXVlc3QucmVzdWx0KSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xuICAgIH0pO1xuICAgIHByb21pc2VcbiAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgIC8vIFNpbmNlIGN1cnNvcmluZyByZXVzZXMgdGhlIElEQlJlcXVlc3QgKCpzaWdoKiksIHdlIGNhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWxcbiAgICAgICAgLy8gKHNlZSB3cmFwRnVuY3Rpb24pLlxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJDdXJzb3IpIHtcbiAgICAgICAgICAgIGN1cnNvclJlcXVlc3RNYXAuc2V0KHZhbHVlLCByZXF1ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDYXRjaGluZyB0byBhdm9pZCBcIlVuY2F1Z2h0IFByb21pc2UgZXhjZXB0aW9uc1wiXG4gICAgfSlcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgfSk7XG4gICAgLy8gVGhpcyBtYXBwaW5nIGV4aXN0cyBpbiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYnV0IGRvZXNuJ3QgZG9lc24ndCBleGlzdCBpbiB0cmFuc2Zvcm1DYWNoZS4gVGhpc1xuICAgIC8vIGlzIGJlY2F1c2Ugd2UgY3JlYXRlIG1hbnkgcHJvbWlzZXMgZnJvbSBhIHNpbmdsZSBJREJSZXF1ZXN0LlxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJvbWlzZSwgcmVxdWVzdCk7XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odHgpIHtcbiAgICAvLyBFYXJseSBiYWlsIGlmIHdlJ3ZlIGFscmVhZHkgY3JlYXRlZCBhIGRvbmUgcHJvbWlzZSBmb3IgdGhpcyB0cmFuc2FjdGlvbi5cbiAgICBpZiAodHJhbnNhY3Rpb25Eb25lTWFwLmhhcyh0eCkpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCBkb25lID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBlcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgIHJlamVjdCh0eC5lcnJvciB8fCBuZXcgRE9NRXhjZXB0aW9uKCdBYm9ydEVycm9yJywgJ0Fib3J0RXJyb3InKSk7XG4gICAgICAgICAgICB1bmxpc3RlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XG4gICAgICAgIHR4LmFkZEV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xuICAgIH0pO1xuICAgIC8vIENhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWwuXG4gICAgdHJhbnNhY3Rpb25Eb25lTWFwLnNldCh0eCwgZG9uZSk7XG59XG5sZXQgaWRiUHJveHlUcmFwcyA9IHtcbiAgICBnZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pIHtcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyYW5zYWN0aW9uLmRvbmUuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ2RvbmUnKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkRvbmVNYXAuZ2V0KHRhcmdldCk7XG4gICAgICAgICAgICAvLyBQb2x5ZmlsbCBmb3Igb2JqZWN0U3RvcmVOYW1lcyBiZWNhdXNlIG9mIEVkZ2UuXG4gICAgICAgICAgICBpZiAocHJvcCA9PT0gJ29iamVjdFN0b3JlTmFtZXMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5vYmplY3RTdG9yZU5hbWVzIHx8IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5nZXQodGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE1ha2UgdHguc3RvcmUgcmV0dXJuIHRoZSBvbmx5IHN0b3JlIGluIHRoZSB0cmFuc2FjdGlvbiwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBtYW55LlxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzdG9yZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1sxXVxuICAgICAgICAgICAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICA6IHJlY2VpdmVyLm9iamVjdFN0b3JlKHJlY2VpdmVyLm9iamVjdFN0b3JlTmFtZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEVsc2UgdHJhbnNmb3JtIHdoYXRldmVyIHdlIGdldCBiYWNrLlxuICAgICAgICByZXR1cm4gd3JhcCh0YXJnZXRbcHJvcF0pO1xuICAgIH0sXG4gICAgc2V0KHRhcmdldCwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0W3Byb3BdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgaGFzKHRhcmdldCwgcHJvcCkge1xuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24gJiZcbiAgICAgICAgICAgIChwcm9wID09PSAnZG9uZScgfHwgcHJvcCA9PT0gJ3N0b3JlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldDtcbiAgICB9LFxufTtcbmZ1bmN0aW9uIHJlcGxhY2VUcmFwcyhjYWxsYmFjaykge1xuICAgIGlkYlByb3h5VHJhcHMgPSBjYWxsYmFjayhpZGJQcm94eVRyYXBzKTtcbn1cbmZ1bmN0aW9uIHdyYXBGdW5jdGlvbihmdW5jKSB7XG4gICAgLy8gRHVlIHRvIGV4cGVjdGVkIG9iamVjdCBlcXVhbGl0eSAod2hpY2ggaXMgZW5mb3JjZWQgYnkgdGhlIGNhY2hpbmcgaW4gYHdyYXBgKSwgd2VcbiAgICAvLyBvbmx5IGNyZWF0ZSBvbmUgbmV3IGZ1bmMgcGVyIGZ1bmMuXG4gICAgLy8gRWRnZSBkb2Vzbid0IHN1cHBvcnQgb2JqZWN0U3RvcmVOYW1lcyAoYm9vbyksIHNvIHdlIHBvbHlmaWxsIGl0IGhlcmUuXG4gICAgaWYgKGZ1bmMgPT09IElEQkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiAmJlxuICAgICAgICAhKCdvYmplY3RTdG9yZU5hbWVzJyBpbiBJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RvcmVOYW1lcywgLi4uYXJncykge1xuICAgICAgICAgICAgY29uc3QgdHggPSBmdW5jLmNhbGwodW53cmFwKHRoaXMpLCBzdG9yZU5hbWVzLCAuLi5hcmdzKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5zZXQodHgsIHN0b3JlTmFtZXMuc29ydCA/IHN0b3JlTmFtZXMuc29ydCgpIDogW3N0b3JlTmFtZXNdKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKHR4KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gQ3Vyc29yIG1ldGhvZHMgYXJlIHNwZWNpYWwsIGFzIHRoZSBiZWhhdmlvdXIgaXMgYSBsaXR0bGUgbW9yZSBkaWZmZXJlbnQgdG8gc3RhbmRhcmQgSURCLiBJblxuICAgIC8vIElEQiwgeW91IGFkdmFuY2UgdGhlIGN1cnNvciBhbmQgd2FpdCBmb3IgYSBuZXcgJ3N1Y2Nlc3MnIG9uIHRoZSBJREJSZXF1ZXN0IHRoYXQgZ2F2ZSB5b3UgdGhlXG4gICAgLy8gY3Vyc29yLiBJdCdzIGtpbmRhIGxpa2UgYSBwcm9taXNlIHRoYXQgY2FuIHJlc29sdmUgd2l0aCBtYW55IHZhbHVlcy4gVGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcbiAgICAvLyB3aXRoIHJlYWwgcHJvbWlzZXMsIHNvIGVhY2ggYWR2YW5jZSBtZXRob2RzIHJldHVybnMgYSBuZXcgcHJvbWlzZSBmb3IgdGhlIGN1cnNvciBvYmplY3QsIG9yXG4gICAgLy8gdW5kZWZpbmVkIGlmIHRoZSBlbmQgb2YgdGhlIGN1cnNvciBoYXMgYmVlbiByZWFjaGVkLlxuICAgIGlmIChnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpLmluY2x1ZGVzKGZ1bmMpKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgICAgIGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB3cmFwKGN1cnNvclJlcXVlc3RNYXAuZ2V0KHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcbiAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cbiAgICAgICAgcmV0dXJuIHdyYXAoZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXG4gICAgICAgIHJldHVybiB3cmFwRnVuY3Rpb24odmFsdWUpO1xuICAgIC8vIFRoaXMgZG9lc24ndCByZXR1cm4sIGl0IGp1c3QgY3JlYXRlcyBhICdkb25lJyBwcm9taXNlIGZvciB0aGUgdHJhbnNhY3Rpb24sXG4gICAgLy8gd2hpY2ggaXMgbGF0ZXIgcmV0dXJuZWQgZm9yIHRyYW5zYWN0aW9uLmRvbmUgKHNlZSBpZGJPYmplY3RIYW5kbGVyKS5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJUcmFuc2FjdGlvbilcbiAgICAgICAgY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHZhbHVlKTtcbiAgICBpZiAoaW5zdGFuY2VPZkFueSh2YWx1ZSwgZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSkpXG4gICAgICAgIHJldHVybiBuZXcgUHJveHkodmFsdWUsIGlkYlByb3h5VHJhcHMpO1xuICAgIC8vIFJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrIGlmIHdlJ3JlIG5vdCBnb2luZyB0byB0cmFuc2Zvcm0gaXQuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gd3JhcCh2YWx1ZSkge1xuICAgIC8vIFdlIHNvbWV0aW1lcyBnZW5lcmF0ZSBtdWx0aXBsZSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QgKGVnIHdoZW4gY3Vyc29yaW5nKSwgYmVjYXVzZVxuICAgIC8vIElEQiBpcyB3ZWlyZCBhbmQgYSBzaW5nbGUgSURCUmVxdWVzdCBjYW4geWllbGQgbWFueSByZXNwb25zZXMsIHNvIHRoZXNlIGNhbid0IGJlIGNhY2hlZC5cbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJSZXF1ZXN0KVxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdCh2YWx1ZSk7XG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSB0cmFuc2Zvcm1lZCB0aGlzIHZhbHVlIGJlZm9yZSwgcmV1c2UgdGhlIHRyYW5zZm9ybWVkIHZhbHVlLlxuICAgIC8vIFRoaXMgaXMgZmFzdGVyLCBidXQgaXQgYWxzbyBwcm92aWRlcyBvYmplY3QgZXF1YWxpdHkuXG4gICAgaWYgKHRyYW5zZm9ybUNhY2hlLmhhcyh2YWx1ZSkpXG4gICAgICAgIHJldHVybiB0cmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSk7XG4gICAgLy8gTm90IGFsbCB0eXBlcyBhcmUgdHJhbnNmb3JtZWQuXG4gICAgLy8gVGhlc2UgbWF5IGJlIHByaW1pdGl2ZSB0eXBlcywgc28gdGhleSBjYW4ndCBiZSBXZWFrTWFwIGtleXMuXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICB0cmFuc2Zvcm1DYWNoZS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlLnNldChuZXdWYWx1ZSwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3VmFsdWU7XG59XG5jb25zdCB1bndyYXAgPSAodmFsdWUpID0+IHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuXG5leHBvcnQgeyByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYXMgYSwgaW5zdGFuY2VPZkFueSBhcyBpLCByZXBsYWNlVHJhcHMgYXMgciwgdW53cmFwIGFzIHUsIHdyYXAgYXMgdyB9O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkRhc2hqc1Fsb2cgPSB2b2lkIDA7XG5jbGFzcyBEYXNoanNRbG9nIHtcbiAgICBjb25zdHJ1Y3RvcihtZWRpYVBsYXllciwgbWVkaWFQbGF5ZXJFdmVudHMpIHtcbiAgICAgICAgdGhpcy5tZWRpYVBsYXllciA9IG1lZGlhUGxheWVyO1xuICAgICAgICB0aGlzLmhvb2sobWVkaWFQbGF5ZXJFdmVudHMpO1xuICAgIH1cbiAgICBkdW1teSgpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJJIEhhcHBlbmVkIDpEXCIpO1xuICAgIH1cbiAgICAvLyBOQVRJVkUgRVZFTlRTXG4gICAgLy8gREFTSCBKUyBFVkVOVFNcbiAgICBvbkJ1ZmZlclVwZGF0ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coYXJndW1lbnRzKTtcbiAgICB9XG4gICAgaG9vayhtZWRpYVBsYXllckV2ZW50cykge1xuICAgICAgICBjb25zdCBldmVudEhvb2tzID0ge1xuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLkFTVF9JTl9GVVRVUkVdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLkJVRkZFUl9FTVBUWV06IHRoaXMub25CdWZmZXJVcGRhdGUsXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuQlVGRkVSX0xPQURFRF06IHRoaXMub25CdWZmZXJVcGRhdGUsXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuQlVGRkVSX0xFVkVMX1NUQVRFX0NIQU5HRURdOiB0aGlzLm9uQnVmZmVyVXBkYXRlLFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLkVSUk9SXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5GUkFHTUVOVF9MT0FESU5HX0NPTVBMRVRFRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICAvLyBbbWVkaWFQbGF5ZXJFdmVudHMuRlJBR01FTlRfTE9BRElOR19QUk9HUkVTU106IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuRlJBR01FTlRfTE9BRElOR19TVEFSVEVEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5GUkFHTUVOVF9MT0FESU5HX0FCQU5ET05FRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuTE9HXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5NQU5JRkVTVF9MT0FERURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLk1FVFJJQ1NfQ0hBTkdFRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuTUVUUklDX0NIQU5HRURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLk1FVFJJQ19BRERFRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuTUVUUklDX1VQREFURURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlBFUklPRF9TV0lUQ0hfQ09NUExFVEVEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5QRVJJT0RfU1dJVENIX1NUQVJURURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlFVQUxJVFlfQ0hBTkdFX1JFUVVFU1RFRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuUVVBTElUWV9DSEFOR0VfUkVOREVSRURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlRSQUNLX0NIQU5HRV9SRU5ERVJFRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICAvLyBbbWVkaWFQbGF5ZXJFdmVudHMuU09VUkNFX0lOSVRJQUxJWkVEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIC8vIFttZWRpYVBsYXllckV2ZW50cy5TVFJFQU1fSU5JVElBTElaSU5HXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5TVFJFQU1fSU5JVElBTElaRURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgLy8gW21lZGlhUGxheWVyRXZlbnRzLlNUUkVBTV9URUFSRE9XTl9DT01QTEVURV06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuVEVYVF9UUkFDS1NfQURERURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlRFWFRfVFJBQ0tfQURERURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlRUTUxfUEFSU0VEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIC8vIFttZWRpYVBsYXllckV2ZW50cy5UVE1MX1RPX1BBUlNFXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIC8vIFttZWRpYVBsYXllckV2ZW50cy5DQVBUSU9OX1JFTkRFUkVEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIC8vIFttZWRpYVBsYXllckV2ZW50cy5DQVBUSU9OX0NPTlRBSU5FUl9SRVNJWkVdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLkNBTl9QTEFZXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5QTEFZQkFDS19FTkRFRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuUExBWUJBQ0tfRVJST1JdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlBMQVlCQUNLX05PVF9BTExPV0VEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5QTEFZQkFDS19NRVRBREFUQV9MT0FERURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlBMQVlCQUNLX1BBVVNFRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuUExBWUJBQ0tfUExBWUlOR106IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuUExBWUJBQ0tfUFJPR1JFU1NdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlBMQVlCQUNLX1JBVEVfQ0hBTkdFRF06IHRoaXMuZHVtbXksXG4gICAgICAgICAgICBbbWVkaWFQbGF5ZXJFdmVudHMuUExBWUJBQ0tfU0VFS0VEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5QTEFZQkFDS19TRUVLSU5HXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIC8vIFttZWRpYVBsYXllckV2ZW50cy5QTEFZQkFDS19TRUVLX0FTS0VEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5QTEFZQkFDS19TVEFMTEVEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5QTEFZQkFDS19TVEFSVEVEXTogdGhpcy5kdW1teSxcbiAgICAgICAgICAgIFttZWRpYVBsYXllckV2ZW50cy5QTEFZQkFDS19USU1FX1VQREFURURdOiB0aGlzLmR1bW15LFxuICAgICAgICAgICAgW21lZGlhUGxheWVyRXZlbnRzLlBMQVlCQUNLX1dBSVRJTkddOiB0aGlzLmR1bW15LFxuICAgICAgICB9O1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudEhvb2tzKTtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGV2ZW50SG9va3MpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMubWVkaWFQbGF5ZXIub24oa2V5LCBldmVudEhvb2tzW2tleV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5EYXNoanNRbG9nID0gRGFzaGpzUWxvZztcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vZGFzaGpzUWxvZ1wiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdmlkZW9RbG9nXCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gVE9ETzogRklYTUU6IGV4cG9ydCBmcm9tIHRoZSBwcm9wZXIgcWxvZyBwYWNrYWdlIG9uY2UgdGhhdCdzIHVwZGF0ZWRcbi8vIGV4cG9ydCAqIGZyb20gXCJAcXVpY3Rvb2xzL3Fsb2ctc2NoZW1hL2RyYWZ0LTAyL1FMb2dcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUmVhZHlTdGF0ZSA9IGV4cG9ydHMuSW50ZXJhY3Rpb25TdGF0ZSA9IGV4cG9ydHMuTWVkaWFUeXBlID0gZXhwb3J0cy5OZXR3b3JrRXZlbnRUeXBlID0gZXhwb3J0cy5CdWZmZXJFdmVudFR5cGUgPSBleHBvcnRzLkFCUkV2ZW50VHlwZSA9IGV4cG9ydHMuUGxheWJhY2tFdmVudFR5cGUgPSBleHBvcnRzLlFQQUNLSGVhZGVyQmxvY2tQcmVzZW50YXRpb25UeXBlTmFtZSA9IGV4cG9ydHMuUVBBQ0tJbnN0cnVjdGlvblR5cGVOYW1lID0gZXhwb3J0cy5BcHBsaWNhdGlvbkVycm9yID0gZXhwb3J0cy5IVFRQM0ZyYW1lVHlwZU5hbWUgPSBleHBvcnRzLkNyeXB0b0Vycm9yID0gZXhwb3J0cy5UcmFuc3BvcnRFcnJvciA9IGV4cG9ydHMuRXJyb3JTcGFjZSA9IGV4cG9ydHMuUVVJQ0ZyYW1lVHlwZU5hbWUgPSBleHBvcnRzLkdlbmVyaWNFdmVudFR5cGUgPSBleHBvcnRzLlFQQUNLRXZlbnRUeXBlID0gZXhwb3J0cy5IM1N0cmVhbVR5cGUgPSBleHBvcnRzLkhUVFAzRXZlbnRUeXBlID0gZXhwb3J0cy5TdHJlYW1TdGF0ZSA9IGV4cG9ydHMuUGFja2V0VHlwZSA9IGV4cG9ydHMuQ29ubmVjdGlvblN0YXRlID0gZXhwb3J0cy5LZXlUeXBlID0gZXhwb3J0cy5SZWNvdmVyeUV2ZW50VHlwZSA9IGV4cG9ydHMuU2VjdXJpdHlFdmVudFR5cGUgPSBleHBvcnRzLlRyYW5zcG9ydEV2ZW50VHlwZSA9IGV4cG9ydHMuQ29ubmVjdGl2aXR5RXZlbnRUeXBlID0gZXhwb3J0cy5FdmVudENhdGVnb3J5ID0gZXhwb3J0cy5JRGVmYXVsdEV2ZW50RmllbGROYW1lcyA9IGV4cG9ydHMuVGltZUZvcm1hdCA9IGV4cG9ydHMuVmFudGFnZVBvaW50VHlwZSA9IGV4cG9ydHMuTG9nRm9ybWF0ID0gZXhwb3J0cy5EZWZhdWx0cyA9IHZvaWQgMDtcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuLy8gSW50ZXJmYWNlIGZvciBRTG9nIHZlcnNpb24gZHJhZnQtMDJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuY2xhc3MgRGVmYXVsdHMge1xufVxuZXhwb3J0cy5EZWZhdWx0cyA9IERlZmF1bHRzO1xuRGVmYXVsdHMudmVyc2lvbk5hbWUgPSBcImRyYWZ0LTAyXCI7XG5EZWZhdWx0cy52ZXJzaW9uQWxpYXNlcyA9IFtcImRyYWZ0LTAyXCIsIFwiZHJhZnQtMDItUkMxXCJdO1xudmFyIExvZ0Zvcm1hdDtcbihmdW5jdGlvbiAoTG9nRm9ybWF0KSB7XG4gICAgTG9nRm9ybWF0W1wiSlNPTlwiXSA9IFwiSlNPTlwiO1xuICAgIExvZ0Zvcm1hdFtcIk5ESlNPTlwiXSA9IFwiTkRKU09OXCI7XG59KShMb2dGb3JtYXQgPSBleHBvcnRzLkxvZ0Zvcm1hdCB8fCAoZXhwb3J0cy5Mb2dGb3JtYXQgPSB7fSkpO1xudmFyIFZhbnRhZ2VQb2ludFR5cGU7XG4oZnVuY3Rpb24gKFZhbnRhZ2VQb2ludFR5cGUpIHtcbiAgICBWYW50YWdlUG9pbnRUeXBlW1wiY2xpZW50XCJdID0gXCJjbGllbnRcIjtcbiAgICBWYW50YWdlUG9pbnRUeXBlW1wic2VydmVyXCJdID0gXCJzZXJ2ZXJcIjtcbiAgICBWYW50YWdlUG9pbnRUeXBlW1wibmV0d29ya1wiXSA9IFwibmV0d29ya1wiO1xuICAgIFZhbnRhZ2VQb2ludFR5cGVbXCJ1bmtub3duXCJdID0gXCJ1bmtub3duXCI7XG59KShWYW50YWdlUG9pbnRUeXBlID0gZXhwb3J0cy5WYW50YWdlUG9pbnRUeXBlIHx8IChleHBvcnRzLlZhbnRhZ2VQb2ludFR5cGUgPSB7fSkpO1xudmFyIFRpbWVGb3JtYXQ7XG4oZnVuY3Rpb24gKFRpbWVGb3JtYXQpIHtcbiAgICBUaW1lRm9ybWF0W1wiYWJzb2x1dGVcIl0gPSBcImFic29sdXRlXCI7XG4gICAgVGltZUZvcm1hdFtcInJlbGF0aXZlXCJdID0gXCJyZWxhdGl2ZVwiO1xuICAgIFRpbWVGb3JtYXRbXCJkZWx0YVwiXSA9IFwiZGVsdGFcIjtcbn0pKFRpbWVGb3JtYXQgPSBleHBvcnRzLlRpbWVGb3JtYXQgfHwgKGV4cG9ydHMuVGltZUZvcm1hdCA9IHt9KSk7XG4vLyBldmVudCBuYW1lcyBkZWZpbmVkIGluIHRoZSBtYWluIHNjaGVtYSwgZm9yIGVhc2llciB1c2FnZVxudmFyIElEZWZhdWx0RXZlbnRGaWVsZE5hbWVzO1xuKGZ1bmN0aW9uIChJRGVmYXVsdEV2ZW50RmllbGROYW1lcykge1xuICAgIElEZWZhdWx0RXZlbnRGaWVsZE5hbWVzW1wiY2F0ZWdvcnlcIl0gPSBcImNhdGVnb3J5XCI7XG4gICAgSURlZmF1bHRFdmVudEZpZWxkTmFtZXNbXCJldmVudFwiXSA9IFwiZXZlbnRcIjtcbiAgICBJRGVmYXVsdEV2ZW50RmllbGROYW1lc1tcImRhdGFcIl0gPSBcImRhdGFcIjtcbiAgICBJRGVmYXVsdEV2ZW50RmllbGROYW1lc1tcInRpbWVcIl0gPSBcInRpbWVcIjtcbiAgICBJRGVmYXVsdEV2ZW50RmllbGROYW1lc1tcInJlbGF0aXZlX3RpbWVcIl0gPSBcInJlbGF0aXZlX3RpbWVcIjtcbiAgICBJRGVmYXVsdEV2ZW50RmllbGROYW1lc1tcImRlbHRhX3RpbWVcIl0gPSBcImRlbHRhX3RpbWVcIjtcbn0pKElEZWZhdWx0RXZlbnRGaWVsZE5hbWVzID0gZXhwb3J0cy5JRGVmYXVsdEV2ZW50RmllbGROYW1lcyB8fCAoZXhwb3J0cy5JRGVmYXVsdEV2ZW50RmllbGROYW1lcyA9IHt9KSk7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbi8vIEJhc2VkIG9uIFFVSUMgZHJhZnQgMjNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xudmFyIEV2ZW50Q2F0ZWdvcnk7XG4oZnVuY3Rpb24gKEV2ZW50Q2F0ZWdvcnkpIHtcbiAgICBFdmVudENhdGVnb3J5W1wiY29ubmVjdGl2aXR5XCJdID0gXCJjb25uZWN0aXZpdHlcIjtcbiAgICBFdmVudENhdGVnb3J5W1wic2VjdXJpdHlcIl0gPSBcInNlY3VyaXR5XCI7XG4gICAgRXZlbnRDYXRlZ29yeVtcInRyYW5zcG9ydFwiXSA9IFwidHJhbnNwb3J0XCI7XG4gICAgRXZlbnRDYXRlZ29yeVtcInJlY292ZXJ5XCJdID0gXCJyZWNvdmVyeVwiO1xuICAgIEV2ZW50Q2F0ZWdvcnlbXCJodHRwXCJdID0gXCJodHRwXCI7XG4gICAgRXZlbnRDYXRlZ29yeVtcInFwYWNrXCJdID0gXCJxcGFja1wiO1xuICAgIEV2ZW50Q2F0ZWdvcnlbXCJlcnJvclwiXSA9IFwiZXJyb3JcIjtcbiAgICBFdmVudENhdGVnb3J5W1wid2FybmluZ1wiXSA9IFwid2FybmluZ1wiO1xuICAgIEV2ZW50Q2F0ZWdvcnlbXCJpbmZvXCJdID0gXCJpbmZvXCI7XG4gICAgRXZlbnRDYXRlZ29yeVtcImRlYnVnXCJdID0gXCJkZWJ1Z1wiO1xuICAgIEV2ZW50Q2F0ZWdvcnlbXCJ2ZXJib3NlXCJdID0gXCJ2ZXJib3NlXCI7XG4gICAgRXZlbnRDYXRlZ29yeVtcInNpbXVsYXRpb25cIl0gPSBcInNpbXVsYXRpb25cIjtcbiAgICAvLyBKSEVSQk9UU1xuICAgIC8vIFZpZGVvIGNhdGVnb3JpZXNcbiAgICBFdmVudENhdGVnb3J5W1wicGxheWJhY2tcIl0gPSBcInBsYXliYWNrXCI7XG4gICAgRXZlbnRDYXRlZ29yeVtcImFiclwiXSA9IFwiYWJyXCI7XG4gICAgRXZlbnRDYXRlZ29yeVtcIm5ldHdvcmtcIl0gPSBcIm5ldHdvcmtcIjtcbiAgICBFdmVudENhdGVnb3J5W1wiYnVmZmVyXCJdID0gXCJidWZmZXJcIjtcbn0pKEV2ZW50Q2F0ZWdvcnkgPSBleHBvcnRzLkV2ZW50Q2F0ZWdvcnkgfHwgKGV4cG9ydHMuRXZlbnRDYXRlZ29yeSA9IHt9KSk7XG52YXIgQ29ubmVjdGl2aXR5RXZlbnRUeXBlO1xuKGZ1bmN0aW9uIChDb25uZWN0aXZpdHlFdmVudFR5cGUpIHtcbiAgICBDb25uZWN0aXZpdHlFdmVudFR5cGVbXCJzZXJ2ZXJfbGlzdGVuaW5nXCJdID0gXCJzZXJ2ZXJfbGlzdGVuaW5nXCI7XG4gICAgQ29ubmVjdGl2aXR5RXZlbnRUeXBlW1wiY29ubmVjdGlvbl9zdGFydGVkXCJdID0gXCJjb25uZWN0aW9uX3N0YXJ0ZWRcIjtcbiAgICBDb25uZWN0aXZpdHlFdmVudFR5cGVbXCJjb25uZWN0aW9uX2lkX3VwZGF0ZWRcIl0gPSBcImNvbm5lY3Rpb25faWRfdXBkYXRlZFwiO1xuICAgIENvbm5lY3Rpdml0eUV2ZW50VHlwZVtcInNwaW5fYml0X3VwZGF0ZWRcIl0gPSBcInNwaW5fYml0X3VwZGF0ZWRcIjtcbiAgICBDb25uZWN0aXZpdHlFdmVudFR5cGVbXCJjb25uZWN0aW9uX3N0YXRlX3VwZGF0ZWRcIl0gPSBcImNvbm5lY3Rpb25fc3RhdGVfdXBkYXRlZFwiO1xufSkoQ29ubmVjdGl2aXR5RXZlbnRUeXBlID0gZXhwb3J0cy5Db25uZWN0aXZpdHlFdmVudFR5cGUgfHwgKGV4cG9ydHMuQ29ubmVjdGl2aXR5RXZlbnRUeXBlID0ge30pKTtcbnZhciBUcmFuc3BvcnRFdmVudFR5cGU7XG4oZnVuY3Rpb24gKFRyYW5zcG9ydEV2ZW50VHlwZSkge1xuICAgIFRyYW5zcG9ydEV2ZW50VHlwZVtcInBhcmFtZXRlcnNfc2V0XCJdID0gXCJwYXJhbWV0ZXJzX3NldFwiO1xuICAgIFRyYW5zcG9ydEV2ZW50VHlwZVtcImRhdGFncmFtc19zZW50XCJdID0gXCJkYXRhZ3JhbXNfc2VudFwiO1xuICAgIFRyYW5zcG9ydEV2ZW50VHlwZVtcImRhdGFncmFtc19yZWNlaXZlZFwiXSA9IFwiZGF0YWdyYW1zX3JlY2VpdmVkXCI7XG4gICAgVHJhbnNwb3J0RXZlbnRUeXBlW1wiZGF0YWdyYW1fZHJvcHBlZFwiXSA9IFwiZGF0YWdyYW1fZHJvcHBlZFwiO1xuICAgIFRyYW5zcG9ydEV2ZW50VHlwZVtcInBhY2tldF9zZW50XCJdID0gXCJwYWNrZXRfc2VudFwiO1xuICAgIFRyYW5zcG9ydEV2ZW50VHlwZVtcInBhY2tldF9yZWNlaXZlZFwiXSA9IFwicGFja2V0X3JlY2VpdmVkXCI7XG4gICAgVHJhbnNwb3J0RXZlbnRUeXBlW1wicGFja2V0X2Ryb3BwZWRcIl0gPSBcInBhY2tldF9kcm9wcGVkXCI7XG4gICAgVHJhbnNwb3J0RXZlbnRUeXBlW1wicGFja2V0X2J1ZmZlcmVkXCJdID0gXCJwYWNrZXRfYnVmZmVyZWRcIjtcbiAgICBUcmFuc3BvcnRFdmVudFR5cGVbXCJmcmFtZXNfcHJvY2Vzc2VkXCJdID0gXCJmcmFtZXNfcHJvY2Vzc2VkXCI7XG4gICAgVHJhbnNwb3J0RXZlbnRUeXBlW1wic3RyZWFtX3N0YXRlX3VwZGF0ZWRcIl0gPSBcInN0cmVhbV9zdGF0ZV91cGRhdGVkXCI7XG59KShUcmFuc3BvcnRFdmVudFR5cGUgPSBleHBvcnRzLlRyYW5zcG9ydEV2ZW50VHlwZSB8fCAoZXhwb3J0cy5UcmFuc3BvcnRFdmVudFR5cGUgPSB7fSkpO1xudmFyIFNlY3VyaXR5RXZlbnRUeXBlO1xuKGZ1bmN0aW9uIChTZWN1cml0eUV2ZW50VHlwZSkge1xuICAgIFNlY3VyaXR5RXZlbnRUeXBlW1wia2V5X3VwZGF0ZWRcIl0gPSBcImtleV91cGRhdGVkXCI7XG4gICAgU2VjdXJpdHlFdmVudFR5cGVbXCJrZXlfcmV0aXJlZFwiXSA9IFwia2V5X3JldGlyZWRcIjtcbn0pKFNlY3VyaXR5RXZlbnRUeXBlID0gZXhwb3J0cy5TZWN1cml0eUV2ZW50VHlwZSB8fCAoZXhwb3J0cy5TZWN1cml0eUV2ZW50VHlwZSA9IHt9KSk7XG52YXIgUmVjb3ZlcnlFdmVudFR5cGU7XG4oZnVuY3Rpb24gKFJlY292ZXJ5RXZlbnRUeXBlKSB7XG4gICAgUmVjb3ZlcnlFdmVudFR5cGVbXCJwYXJhbWV0ZXJzX3NldFwiXSA9IFwicGFyYW1ldGVyc19zZXRcIjtcbiAgICBSZWNvdmVyeUV2ZW50VHlwZVtcIm1ldHJpY3NfdXBkYXRlZFwiXSA9IFwibWV0cmljc191cGRhdGVkXCI7XG4gICAgUmVjb3ZlcnlFdmVudFR5cGVbXCJjb25nZXN0aW9uX3N0YXRlX3VwZGF0ZWRcIl0gPSBcImNvbmdlc3Rpb25fc3RhdGVfdXBkYXRlZFwiO1xuICAgIFJlY292ZXJ5RXZlbnRUeXBlW1wibG9zc190aW1lcl9zZXRcIl0gPSBcImxvc3NfdGltZXJfc2V0XCI7XG4gICAgUmVjb3ZlcnlFdmVudFR5cGVbXCJsb3NzX3RpbWVyX3RyaWdnZXJlZFwiXSA9IFwibG9zc190aW1lcl90cmlnZ2VyZWRcIjtcbiAgICBSZWNvdmVyeUV2ZW50VHlwZVtcInBhY2tldF9sb3N0XCJdID0gXCJwYWNrZXRfbG9zdFwiO1xuICAgIFJlY292ZXJ5RXZlbnRUeXBlW1wibWFya2VkX2Zvcl9yZXRyYW5zbWl0XCJdID0gXCJtYXJrZWRfZm9yX3JldHJhbnNtaXRcIjtcbn0pKFJlY292ZXJ5RXZlbnRUeXBlID0gZXhwb3J0cy5SZWNvdmVyeUV2ZW50VHlwZSB8fCAoZXhwb3J0cy5SZWNvdmVyeUV2ZW50VHlwZSA9IHt9KSk7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbnZhciBLZXlUeXBlO1xuKGZ1bmN0aW9uIChLZXlUeXBlKSB7XG4gICAgS2V5VHlwZVtcInNlcnZlcl9pbml0aWFsX3NlY3JldFwiXSA9IFwic2VydmVyX2luaXRpYWxfc2VjcmV0XCI7XG4gICAgS2V5VHlwZVtcImNsaWVudF9pbml0aWFsX3NlY3JldFwiXSA9IFwiY2xpZW50X2luaXRpYWxfc2VjcmV0XCI7XG4gICAgS2V5VHlwZVtcInNlcnZlcl9oYW5kc2hha2Vfc2VjcmV0XCJdID0gXCJzZXJ2ZXJfaGFuZHNoYWtlX3NlY3JldFwiO1xuICAgIEtleVR5cGVbXCJjbGllbnRfaGFuZHNoYWtlX3NlY3JldFwiXSA9IFwiY2xpZW50X2hhbmRzaGFrZV9zZWNyZXRcIjtcbiAgICBLZXlUeXBlW1wic2VydmVyXzBydHRfc2VjcmV0XCJdID0gXCJzZXJ2ZXJfMHJ0dF9zZWNyZXRcIjtcbiAgICBLZXlUeXBlW1wiY2xpZW50XzBydHRfc2VjcmV0XCJdID0gXCJjbGllbnRfMHJ0dF9zZWNyZXRcIjtcbiAgICBLZXlUeXBlW1wic2VydmVyXzFydHRfc2VjcmV0XCJdID0gXCJzZXJ2ZXJfMXJ0dF9zZWNyZXRcIjtcbiAgICBLZXlUeXBlW1wiY2xpZW50XzFydHRfc2VjcmV0XCJdID0gXCJjbGllbnRfMXJ0dF9zZWNyZXRcIjtcbn0pKEtleVR5cGUgPSBleHBvcnRzLktleVR5cGUgfHwgKGV4cG9ydHMuS2V5VHlwZSA9IHt9KSk7XG52YXIgQ29ubmVjdGlvblN0YXRlO1xuKGZ1bmN0aW9uIChDb25uZWN0aW9uU3RhdGUpIHtcbiAgICBDb25uZWN0aW9uU3RhdGVbXCJhdHRlbXB0ZWRcIl0gPSBcImF0dGVtcHRlZFwiO1xuICAgIENvbm5lY3Rpb25TdGF0ZVtcInJlc2V0XCJdID0gXCJyZXNldFwiO1xuICAgIENvbm5lY3Rpb25TdGF0ZVtcImhhbmRzaGFrZVwiXSA9IFwiaGFuZHNoYWtlXCI7XG4gICAgQ29ubmVjdGlvblN0YXRlW1wiYWN0aXZlXCJdID0gXCJhY3RpdmVcIjtcbiAgICBDb25uZWN0aW9uU3RhdGVbXCJrZWVwYWxpdmVcIl0gPSBcImtlZXBhbGl2ZVwiO1xuICAgIENvbm5lY3Rpb25TdGF0ZVtcImRyYWluaW5nXCJdID0gXCJkcmFpbmluZ1wiO1xuICAgIENvbm5lY3Rpb25TdGF0ZVtcImNsb3NlZFwiXSA9IFwiY2xvc2VkXCI7XG59KShDb25uZWN0aW9uU3RhdGUgPSBleHBvcnRzLkNvbm5lY3Rpb25TdGF0ZSB8fCAoZXhwb3J0cy5Db25uZWN0aW9uU3RhdGUgPSB7fSkpO1xudmFyIFBhY2tldFR5cGU7XG4oZnVuY3Rpb24gKFBhY2tldFR5cGUpIHtcbiAgICBQYWNrZXRUeXBlW1wiaW5pdGlhbFwiXSA9IFwiaW5pdGlhbFwiO1xuICAgIFBhY2tldFR5cGVbXCJoYW5kc2hha2VcIl0gPSBcImhhbmRzaGFrZVwiO1xuICAgIFBhY2tldFR5cGVbXCJ6ZXJvcnR0XCJdID0gXCIwUlRUXCI7XG4gICAgUGFja2V0VHlwZVtcIm9uZXJ0dFwiXSA9IFwiMVJUVFwiO1xuICAgIFBhY2tldFR5cGVbXCJyZXRyeVwiXSA9IFwicmV0cnlcIjtcbiAgICBQYWNrZXRUeXBlW1widmVyc2lvbl9uZWdvdGlhdGlvblwiXSA9IFwidmVyc2lvbl9uZWdvdGlhdGlvblwiO1xuICAgIFBhY2tldFR5cGVbXCJzdGF0ZWxlc3NfcmVzZXRcIl0gPSBcInN0YXRlbGVzc19yZXNldFwiO1xuICAgIFBhY2tldFR5cGVbXCJ1bmtub3duXCJdID0gXCJ1bmtub3duXCI7XG59KShQYWNrZXRUeXBlID0gZXhwb3J0cy5QYWNrZXRUeXBlIHx8IChleHBvcnRzLlBhY2tldFR5cGUgPSB7fSkpO1xudmFyIFN0cmVhbVN0YXRlO1xuKGZ1bmN0aW9uIChTdHJlYW1TdGF0ZSkge1xuICAgIC8vIGJpZGlyZWN0aW9uYWwgc3RyZWFtIHN0YXRlcywgZHJhZnQtMjMgMy40LlxuICAgIFN0cmVhbVN0YXRlW1N0cmVhbVN0YXRlW1wiaWRsZVwiXSA9IDBdID0gXCJpZGxlXCI7XG4gICAgU3RyZWFtU3RhdGVbU3RyZWFtU3RhdGVbXCJvcGVuXCJdID0gMV0gPSBcIm9wZW5cIjtcbiAgICBTdHJlYW1TdGF0ZVtTdHJlYW1TdGF0ZVtcImhhbGZfY2xvc2VkX2xvY2FsXCJdID0gMl0gPSBcImhhbGZfY2xvc2VkX2xvY2FsXCI7XG4gICAgU3RyZWFtU3RhdGVbU3RyZWFtU3RhdGVbXCJoYWxmX2Nsb3NlZF9yZW1vdGVcIl0gPSAzXSA9IFwiaGFsZl9jbG9zZWRfcmVtb3RlXCI7XG4gICAgU3RyZWFtU3RhdGVbU3RyZWFtU3RhdGVbXCJjbG9zZWRcIl0gPSA0XSA9IFwiY2xvc2VkXCI7XG4gICAgLy8gc2VuZGluZy1zaWRlIHN0cmVhbSBzdGF0ZXMsIGRyYWZ0LTIzIDMuMS5cbiAgICBTdHJlYW1TdGF0ZVtTdHJlYW1TdGF0ZVtcInJlYWR5XCJdID0gNV0gPSBcInJlYWR5XCI7XG4gICAgU3RyZWFtU3RhdGVbU3RyZWFtU3RhdGVbXCJzZW5kXCJdID0gNl0gPSBcInNlbmRcIjtcbiAgICBTdHJlYW1TdGF0ZVtTdHJlYW1TdGF0ZVtcImRhdGFfc2VudFwiXSA9IDddID0gXCJkYXRhX3NlbnRcIjtcbiAgICBTdHJlYW1TdGF0ZVtTdHJlYW1TdGF0ZVtcInJlc2V0X3NlbnRcIl0gPSA4XSA9IFwicmVzZXRfc2VudFwiO1xuICAgIFN0cmVhbVN0YXRlW1N0cmVhbVN0YXRlW1wicmVzZXRfcmVjZWl2ZWRcIl0gPSA5XSA9IFwicmVzZXRfcmVjZWl2ZWRcIjtcbiAgICAvLyByZWNlaXZlLXNpZGUgc3RyZWFtIHN0YXRlcywgZHJhZnQtMjMgMy4yLlxuICAgIFN0cmVhbVN0YXRlW1N0cmVhbVN0YXRlW1wicmVjZWl2ZVwiXSA9IDEwXSA9IFwicmVjZWl2ZVwiO1xuICAgIFN0cmVhbVN0YXRlW1N0cmVhbVN0YXRlW1wic2l6ZV9rbm93blwiXSA9IDExXSA9IFwic2l6ZV9rbm93blwiO1xuICAgIFN0cmVhbVN0YXRlW1N0cmVhbVN0YXRlW1wiZGF0YV9yZWFkXCJdID0gMTJdID0gXCJkYXRhX3JlYWRcIjtcbiAgICBTdHJlYW1TdGF0ZVtTdHJlYW1TdGF0ZVtcInJlc2V0X3JlYWRcIl0gPSAxM10gPSBcInJlc2V0X3JlYWRcIjtcbiAgICAvLyBib3RoLXNpZGUgc3RhdGVzXG4gICAgU3RyZWFtU3RhdGVbU3RyZWFtU3RhdGVbXCJkYXRhX3JlY2VpdmVkXCJdID0gMTRdID0gXCJkYXRhX3JlY2VpdmVkXCI7XG4gICAgLy8gcWxvZy1kZWZpbmVkXG4gICAgU3RyZWFtU3RhdGVbU3RyZWFtU3RhdGVbXCJkZXN0cm95ZWRcIl0gPSAxNV0gPSBcImRlc3Ryb3llZFwiO1xufSkoU3RyZWFtU3RhdGUgPSBleHBvcnRzLlN0cmVhbVN0YXRlIHx8IChleHBvcnRzLlN0cmVhbVN0YXRlID0ge30pKTtcbnZhciBIVFRQM0V2ZW50VHlwZTtcbihmdW5jdGlvbiAoSFRUUDNFdmVudFR5cGUpIHtcbiAgICBIVFRQM0V2ZW50VHlwZVtcInBhcmFtZXRlcnNfc2V0XCJdID0gXCJwYXJhbWV0ZXJzX3NldFwiO1xuICAgIEhUVFAzRXZlbnRUeXBlW1wic3RyZWFtX3R5cGVfc2V0XCJdID0gXCJzdHJlYW1fdHlwZV9zZXRcIjtcbiAgICBIVFRQM0V2ZW50VHlwZVtcImZyYW1lX2NyZWF0ZWRcIl0gPSBcImZyYW1lX2NyZWF0ZWRcIjtcbiAgICBIVFRQM0V2ZW50VHlwZVtcImZyYW1lX3BhcnNlZFwiXSA9IFwiZnJhbWVfcGFyc2VkXCI7XG4gICAgSFRUUDNFdmVudFR5cGVbXCJkYXRhX21vdmVkXCJdID0gXCJkYXRhX21vdmVkXCI7XG4gICAgSFRUUDNFdmVudFR5cGVbXCJkYXRhZ3JhbV9yZWNlaXZlZFwiXSA9IFwiZGF0YV9yZWNlaXZlZFwiO1xuICAgIEhUVFAzRXZlbnRUeXBlW1wiZGVwZW5kZW5jeV91cGRhdGVcIl0gPSBcImRlcGVuZGVuY3lfdXBkYXRlXCI7XG59KShIVFRQM0V2ZW50VHlwZSA9IGV4cG9ydHMuSFRUUDNFdmVudFR5cGUgfHwgKGV4cG9ydHMuSFRUUDNFdmVudFR5cGUgPSB7fSkpO1xudmFyIEgzU3RyZWFtVHlwZTtcbihmdW5jdGlvbiAoSDNTdHJlYW1UeXBlKSB7XG4gICAgSDNTdHJlYW1UeXBlW1wiZGF0YVwiXSA9IFwiZGF0YVwiO1xuICAgIEgzU3RyZWFtVHlwZVtcImNvbnRyb2xcIl0gPSBcImNvbnRyb2xcIjtcbiAgICBIM1N0cmVhbVR5cGVbXCJwdXNoXCJdID0gXCJwdXNoXCI7XG4gICAgSDNTdHJlYW1UeXBlW1wicmVzZXJ2ZWRcIl0gPSBcInJlc2VydmVkXCI7XG4gICAgSDNTdHJlYW1UeXBlW1wicXBhY2tfZW5jb2RlXCJdID0gXCJxcGFja19lbmNvZGVcIjtcbiAgICBIM1N0cmVhbVR5cGVbXCJxcGFja19kZWNvZGVcIl0gPSBcInFwYWNrX2RlY29kZVwiO1xufSkoSDNTdHJlYW1UeXBlID0gZXhwb3J0cy5IM1N0cmVhbVR5cGUgfHwgKGV4cG9ydHMuSDNTdHJlYW1UeXBlID0ge30pKTtcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xuLy8gUVBBQ0tcbi8vIGV4cG9ydCB0eXBlIEhUVFAzRXZlbnRUeXBlID0gSUV2ZW50SDNGcmFtZUNyZWF0ZWQgfCBJRXZlbnRIM0ZyYW1lUGFyc2VkIHwgSUV2ZW50SDNEYXRhTW92ZWQgfCBJRXZlbnRIM0RhdGFSZWNlaXZlZCB8IElFdmVudEgzRGVwZW5kZW5jeVVwZGF0ZTtcbi8vIG5vdGU6IGhlcmUsIHdlIHVzZSBIVFRQMyBmb3IgY2xhcml0eVxuLy8gaW4gdGhlIHNwZWMsIHRoZSBjYXRlZ29yeSBpcyBqdXN0IFwiaHR0cFwiIVxudmFyIFFQQUNLRXZlbnRUeXBlO1xuKGZ1bmN0aW9uIChRUEFDS0V2ZW50VHlwZSkge1xuICAgIFFQQUNLRXZlbnRUeXBlW1wic3RhdGVfdXBkYXRlZFwiXSA9IFwic3RhdGVfdXBkYXRlZFwiO1xuICAgIFFQQUNLRXZlbnRUeXBlW1wic3RyZWFtX3N0YXRlX3VwZGF0ZWRcIl0gPSBcInN0cmVhbV9zdGF0ZV91cGRhdGVkXCI7XG4gICAgUVBBQ0tFdmVudFR5cGVbXCJkeW5hbWljX3RhYmxlX3VwZGF0ZWRcIl0gPSBcImR5bmFtaWNfdGFibGVfdXBkYXRlZFwiO1xuICAgIFFQQUNLRXZlbnRUeXBlW1wiaGVhZGVyc19lbmNvZGVkXCJdID0gXCJoZWFkZXJzX2VuY29kZWRcIjtcbiAgICBRUEFDS0V2ZW50VHlwZVtcImhlYWRlcnNfZGVjb2RlZFwiXSA9IFwiaGVhZGVyc19kZWNvZGVkXCI7XG4gICAgUVBBQ0tFdmVudFR5cGVbXCJpbnN0cnVjdGlvbl9zZW50XCJdID0gXCJpbnN0cnVjdGlvbl9zZW50XCI7XG4gICAgUVBBQ0tFdmVudFR5cGVbXCJpbnN0cnVjdGlvbl9yZWNlaXZlZFwiXSA9IFwiaW5zdHJ1Y3Rpb25fcmVjZWl2ZWRcIjtcbn0pKFFQQUNLRXZlbnRUeXBlID0gZXhwb3J0cy5RUEFDS0V2ZW50VHlwZSB8fCAoZXhwb3J0cy5RUEFDS0V2ZW50VHlwZSA9IHt9KSk7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbi8vIEdlbmVyaWNcbnZhciBHZW5lcmljRXZlbnRUeXBlO1xuKGZ1bmN0aW9uIChHZW5lcmljRXZlbnRUeXBlKSB7XG4gICAgR2VuZXJpY0V2ZW50VHlwZVtcImNvbm5lY3Rpb25fZXJyb3JcIl0gPSBcImNvbm5lY3Rpb25fZXJyb3JcIjtcbiAgICBHZW5lcmljRXZlbnRUeXBlW1wiYXBwbGljYXRpb25fZXJyb3JcIl0gPSBcImFwcGxpY2F0aW9uX2Vycm9yXCI7XG4gICAgR2VuZXJpY0V2ZW50VHlwZVtcImludGVybmFsX2Vycm9yXCJdID0gXCJpbnRlcm5hbF9lcnJvclwiO1xuICAgIEdlbmVyaWNFdmVudFR5cGVbXCJpbnRlcm5hbF93YXJuaW5nXCJdID0gXCJpbnRlcm5hbF93YXJuaW5nXCI7XG4gICAgR2VuZXJpY0V2ZW50VHlwZVtcIm1lc3NhZ2VcIl0gPSBcIm1lc3NhZ2VcIjtcbiAgICBHZW5lcmljRXZlbnRUeXBlW1wibWFya2VyXCJdID0gXCJtYXJrZXJcIjtcbn0pKEdlbmVyaWNFdmVudFR5cGUgPSBleHBvcnRzLkdlbmVyaWNFdmVudFR5cGUgfHwgKGV4cG9ydHMuR2VuZXJpY0V2ZW50VHlwZSA9IHt9KSk7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbi8vIEJhc2VkIG9uIFFVSUMgZHJhZnQtMjNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAvL1xudmFyIFFVSUNGcmFtZVR5cGVOYW1lO1xuKGZ1bmN0aW9uIChRVUlDRnJhbWVUeXBlTmFtZSkge1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wicGFkZGluZ1wiXSA9IFwicGFkZGluZ1wiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wicGluZ1wiXSA9IFwicGluZ1wiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wiYWNrXCJdID0gXCJhY2tcIjtcbiAgICBRVUlDRnJhbWVUeXBlTmFtZVtcInJlc2V0X3N0cmVhbVwiXSA9IFwicmVzZXRfc3RyZWFtXCI7XG4gICAgUVVJQ0ZyYW1lVHlwZU5hbWVbXCJzdG9wX3NlbmRpbmdcIl0gPSBcInN0b3Bfc2VuZGluZ1wiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wiY3J5cHRvXCJdID0gXCJjcnlwdG9cIjtcbiAgICBRVUlDRnJhbWVUeXBlTmFtZVtcIm5ld190b2tlblwiXSA9IFwibmV3X3Rva2VuXCI7XG4gICAgUVVJQ0ZyYW1lVHlwZU5hbWVbXCJzdHJlYW1cIl0gPSBcInN0cmVhbVwiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wibWF4X2RhdGFcIl0gPSBcIm1heF9kYXRhXCI7XG4gICAgUVVJQ0ZyYW1lVHlwZU5hbWVbXCJtYXhfc3RyZWFtX2RhdGFcIl0gPSBcIm1heF9zdHJlYW1fZGF0YVwiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wibWF4X3N0cmVhbXNcIl0gPSBcIm1heF9zdHJlYW1zXCI7XG4gICAgUVVJQ0ZyYW1lVHlwZU5hbWVbXCJkYXRhX2Jsb2NrZWRcIl0gPSBcImRhdGFfYmxvY2tlZFwiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wic3RyZWFtX2RhdGFfYmxvY2tlZFwiXSA9IFwic3RyZWFtX2RhdGFfYmxvY2tlZFwiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wic3RyZWFtc19ibG9ja2VkXCJdID0gXCJzdHJlYW1zX2Jsb2NrZWRcIjtcbiAgICBRVUlDRnJhbWVUeXBlTmFtZVtcIm5ld19jb25uZWN0aW9uX2lkXCJdID0gXCJuZXdfY29ubmVjdGlvbl9pZFwiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1wicmV0aXJlX2Nvbm5lY3Rpb25faWRcIl0gPSBcInJldGlyZV9jb25uZWN0aW9uX2lkXCI7XG4gICAgUVVJQ0ZyYW1lVHlwZU5hbWVbXCJwYXRoX2NoYWxsZW5nZVwiXSA9IFwicGF0aF9jaGFsbGVuZ2VcIjtcbiAgICBRVUlDRnJhbWVUeXBlTmFtZVtcInBhdGhfcmVzcG9uc2VcIl0gPSBcInBhdGhfcmVzcG9uc2VcIjtcbiAgICBRVUlDRnJhbWVUeXBlTmFtZVtcImNvbm5lY3Rpb25fY2xvc2VcIl0gPSBcImNvbm5lY3Rpb25fY2xvc2VcIjtcbiAgICBRVUlDRnJhbWVUeXBlTmFtZVtcImFwcGxpY2F0aW9uX2Nsb3NlXCJdID0gXCJhcHBsaWNhdGlvbl9jbG9zZVwiO1xuICAgIFFVSUNGcmFtZVR5cGVOYW1lW1widW5rbm93bl9mcmFtZV90eXBlXCJdID0gXCJ1bmtub3duX2ZyYW1lX3R5cGVcIjtcbn0pKFFVSUNGcmFtZVR5cGVOYW1lID0gZXhwb3J0cy5RVUlDRnJhbWVUeXBlTmFtZSB8fCAoZXhwb3J0cy5RVUlDRnJhbWVUeXBlTmFtZSA9IHt9KSk7XG52YXIgRXJyb3JTcGFjZTtcbihmdW5jdGlvbiAoRXJyb3JTcGFjZSkge1xuICAgIEVycm9yU3BhY2VbXCJ0cmFuc3BvcnRfZXJyb3JcIl0gPSBcInRyYW5zcG9ydF9lcnJvclwiO1xuICAgIEVycm9yU3BhY2VbXCJhcHBsaWNhdGlvbl9lcnJvclwiXSA9IFwiYXBwbGljYXRpb25fZXJyb3JcIjtcbn0pKEVycm9yU3BhY2UgPSBleHBvcnRzLkVycm9yU3BhY2UgfHwgKGV4cG9ydHMuRXJyb3JTcGFjZSA9IHt9KSk7XG52YXIgVHJhbnNwb3J0RXJyb3I7XG4oZnVuY3Rpb24gKFRyYW5zcG9ydEVycm9yKSB7XG4gICAgVHJhbnNwb3J0RXJyb3JbXCJub19lcnJvclwiXSA9IFwibm9fZXJyb3JcIjtcbiAgICBUcmFuc3BvcnRFcnJvcltcImludGVybmFsX2Vycm9yXCJdID0gXCJpbnRlcm5hbF9lcnJvclwiO1xuICAgIFRyYW5zcG9ydEVycm9yW1wic2VydmVyX2J1c3lcIl0gPSBcInNlcnZlcl9idXN5XCI7XG4gICAgVHJhbnNwb3J0RXJyb3JbXCJmbG93X2NvbnRyb2xfZXJyb3JcIl0gPSBcImZsb3dfY29udHJvbF9lcnJvclwiO1xuICAgIFRyYW5zcG9ydEVycm9yW1wic3RyZWFtX2xpbWl0X2Vycm9yXCJdID0gXCJzdHJlYW1fbGltaXRfZXJyb3JcIjtcbiAgICBUcmFuc3BvcnRFcnJvcltcInN0cmVhbV9zdGF0ZV9lcnJvclwiXSA9IFwic3RyZWFtX3N0YXRlX2Vycm9yXCI7XG4gICAgVHJhbnNwb3J0RXJyb3JbXCJmaW5hbF9zaXplX2Vycm9yXCJdID0gXCJmaW5hbF9zaXplX2Vycm9yXCI7XG4gICAgVHJhbnNwb3J0RXJyb3JbXCJmcmFtZV9lbmNvZGluZ19lcnJvclwiXSA9IFwiZnJhbWVfZW5jb2RpbmdfZXJyb3JcIjtcbiAgICBUcmFuc3BvcnRFcnJvcltcInRyYW5zcG9ydF9wYXJhbWV0ZXJfZXJyb3JcIl0gPSBcInRyYW5zcG9ydF9wYXJhbWV0ZXJfZXJyb3JcIjtcbiAgICBUcmFuc3BvcnRFcnJvcltcInByb3RvY29sX3Zpb2xhdGlvblwiXSA9IFwicHJvdG9jb2xfdmlvbGF0aW9uXCI7XG4gICAgVHJhbnNwb3J0RXJyb3JbXCJpbnZhbGlkX21pZ3JhdGlvblwiXSA9IFwiaW52YWxpZF9taWdyYXRpb25cIjtcbiAgICBUcmFuc3BvcnRFcnJvcltcImNyeXB0b19idWZmZXJfZXhjZWVkZWRcIl0gPSBcImNyeXB0b19idWZmZXJfZXhjZWVkZWRcIjtcbiAgICBUcmFuc3BvcnRFcnJvcltcInVua25vd25cIl0gPSBcInVua25vd25cIjtcbn0pKFRyYW5zcG9ydEVycm9yID0gZXhwb3J0cy5UcmFuc3BvcnRFcnJvciB8fCAoZXhwb3J0cy5UcmFuc3BvcnRFcnJvciA9IHt9KSk7XG52YXIgQ3J5cHRvRXJyb3I7XG4oZnVuY3Rpb24gKENyeXB0b0Vycm9yKSB7XG4gICAgQ3J5cHRvRXJyb3JbXCJwcmVmaXhcIl0gPSBcImNyeXB0b19lcnJvcl9cIjtcbn0pKENyeXB0b0Vycm9yID0gZXhwb3J0cy5DcnlwdG9FcnJvciB8fCAoZXhwb3J0cy5DcnlwdG9FcnJvciA9IHt9KSk7XG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLy9cbnZhciBIVFRQM0ZyYW1lVHlwZU5hbWU7XG4oZnVuY3Rpb24gKEhUVFAzRnJhbWVUeXBlTmFtZSkge1xuICAgIEhUVFAzRnJhbWVUeXBlTmFtZVtcImRhdGFcIl0gPSBcImRhdGFcIjtcbiAgICBIVFRQM0ZyYW1lVHlwZU5hbWVbXCJoZWFkZXJzXCJdID0gXCJoZWFkZXJzXCI7XG4gICAgSFRUUDNGcmFtZVR5cGVOYW1lW1wiY2FuY2VsX3B1c2hcIl0gPSBcImNhbmNlbF9wdXNoXCI7XG4gICAgSFRUUDNGcmFtZVR5cGVOYW1lW1wic2V0dGluZ3NcIl0gPSBcInNldHRpbmdzXCI7XG4gICAgSFRUUDNGcmFtZVR5cGVOYW1lW1wicHVzaF9wcm9taXNlXCJdID0gXCJwdXNoX3Byb21pc2VcIjtcbiAgICBIVFRQM0ZyYW1lVHlwZU5hbWVbXCJnb2F3YXlcIl0gPSBcImdvYXdheVwiO1xuICAgIEhUVFAzRnJhbWVUeXBlTmFtZVtcIm1heF9wdXNoX2lkXCJdID0gXCJtYXhfcHVzaF9pZFwiO1xuICAgIEhUVFAzRnJhbWVUeXBlTmFtZVtcImR1cGxpY2F0ZV9wdXNoXCJdID0gXCJkdXBsaWNhdGVfcHVzaFwiO1xuICAgIEhUVFAzRnJhbWVUeXBlTmFtZVtcInJlc2VydmVkXCJdID0gXCJyZXNlcnZlZFwiO1xuICAgIEhUVFAzRnJhbWVUeXBlTmFtZVtcInVua25vd25cIl0gPSBcInVua25vd25cIjtcbn0pKEhUVFAzRnJhbWVUeXBlTmFtZSA9IGV4cG9ydHMuSFRUUDNGcmFtZVR5cGVOYW1lIHx8IChleHBvcnRzLkhUVFAzRnJhbWVUeXBlTmFtZSA9IHt9KSk7XG52YXIgQXBwbGljYXRpb25FcnJvcjtcbihmdW5jdGlvbiAoQXBwbGljYXRpb25FcnJvcikge1xuICAgIEFwcGxpY2F0aW9uRXJyb3JbXCJodHRwX25vX2Vycm9yXCJdID0gXCJodHRwX25vX2Vycm9yXCI7XG4gICAgQXBwbGljYXRpb25FcnJvcltcImh0dHBfZ2VuZXJhbF9wcm90b2NvbF9lcnJvclwiXSA9IFwiaHR0cF9nZW5lcmFsX3Byb3RvY29sX2Vycm9yXCI7XG4gICAgQXBwbGljYXRpb25FcnJvcltcImh0dHBfaW50ZXJuYWxfZXJyb3JcIl0gPSBcImh0dHBfaW50ZXJuYWxfZXJyb3JcIjtcbiAgICBBcHBsaWNhdGlvbkVycm9yW1wiaHR0cF9yZXF1ZXN0X2NhbmNlbGxlZFwiXSA9IFwiaHR0cF9yZXF1ZXN0X2NhbmNlbGxlZFwiO1xuICAgIEFwcGxpY2F0aW9uRXJyb3JbXCJodHRwX3JlcXVlc3RfaW5jb21wbGV0ZVwiXSA9IFwiaHR0cF9pbmNvbXBsZXRlX3JlcXVlc3RcIjtcbiAgICBBcHBsaWNhdGlvbkVycm9yW1wiaHR0cF9jb25uZWN0X2Vycm9yXCJdID0gXCJodHRwX2Nvbm5lY3RfZXJyb3JcIjtcbiAgICBBcHBsaWNhdGlvbkVycm9yW1wiaHR0cF9mcmFtZV9lcnJvclwiXSA9IFwiaHR0cF9mcmFtZV9lcnJvclwiO1xuICAgIEFwcGxpY2F0aW9uRXJyb3JbXCJodHRwX2V4Y2Vzc2l2ZV9sb2FkXCJdID0gXCJodHRwX2V4Y2Vzc2l2ZV9sb2FkXCI7XG4gICAgQXBwbGljYXRpb25FcnJvcltcImh0dHBfdmVyc2lvbl9mYWxsYmFja1wiXSA9IFwiaHR0cF92ZXJzaW9uX2ZhbGxiYWNrXCI7XG4gICAgQXBwbGljYXRpb25FcnJvcltcImh0dHBfaWRfZXJyb3JcIl0gPSBcImh0dHBfaWRfZXJyb3JcIjtcbiAgICBBcHBsaWNhdGlvbkVycm9yW1wiaHR0cF9zdHJlYW1fY3JlYXRpb25fZXJyb3JcIl0gPSBcImh0dHBfc3RyZWFtX2NyZWF0aW9uX2Vycm9yXCI7XG4gICAgQXBwbGljYXRpb25FcnJvcltcImh0dHBfY2xvc2VkX2NyaXRpY2FsX3N0cmVhbVwiXSA9IFwiaHR0cF9jbG9zZWRfY3JpdGljYWxfc3RyZWFtXCI7XG4gICAgQXBwbGljYXRpb25FcnJvcltcImh0dHBfZWFybHlfcmVzcG9uc2VcIl0gPSBcImh0dHBfZWFybHlfcmVzcG9uc2VcIjtcbiAgICBBcHBsaWNhdGlvbkVycm9yW1wiaHR0cF9taXNzaW5nX3NldHRpbmdzXCJdID0gXCJodHRwX21pc3Npbmdfc2V0dGluZ3NcIjtcbiAgICBBcHBsaWNhdGlvbkVycm9yW1wiaHR0cF9mcmFtZV91bmV4cGVjdGVkXCJdID0gXCJodHRwX3VuZXhwZWN0ZWRfZnJhbWVcIjtcbiAgICBBcHBsaWNhdGlvbkVycm9yW1wiaHR0cF9yZXF1ZXN0X3JlamVjdGVkXCJdID0gXCJodHRwX3JlcXVlc3RfcmVqZWN0ZWRcIjtcbiAgICBBcHBsaWNhdGlvbkVycm9yW1wiaHR0cF9zZXR0aW5nc19lcnJvclwiXSA9IFwiaHR0cF9zZXR0aW5nc19lcnJvclwiO1xuICAgIEFwcGxpY2F0aW9uRXJyb3JbXCJ1bmtub3duXCJdID0gXCJ1bmtub3duXCI7XG59KShBcHBsaWNhdGlvbkVycm9yID0gZXhwb3J0cy5BcHBsaWNhdGlvbkVycm9yIHx8IChleHBvcnRzLkFwcGxpY2F0aW9uRXJyb3IgPSB7fSkpO1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC8vXG52YXIgUVBBQ0tJbnN0cnVjdGlvblR5cGVOYW1lO1xuKGZ1bmN0aW9uIChRUEFDS0luc3RydWN0aW9uVHlwZU5hbWUpIHtcbiAgICBRUEFDS0luc3RydWN0aW9uVHlwZU5hbWVbXCJzZXRfZHluYW1pY190YWJsZV9jYXBhY2l0eVwiXSA9IFwic2V0X2R5bmFtaWNfdGFibGVfY2FwYWNpdHlcIjtcbiAgICBRUEFDS0luc3RydWN0aW9uVHlwZU5hbWVbXCJpbnNlcnRfd2l0aF9uYW1lX3JlZmVyZW5jZVwiXSA9IFwiaW5zZXJ0X3dpdGhfbmFtZV9yZWZlcmVuY2VcIjtcbiAgICBRUEFDS0luc3RydWN0aW9uVHlwZU5hbWVbXCJpbnNlcnRfd2l0aG91dF9uYW1lX3JlZmVyZW5jZVwiXSA9IFwiaW5zZXJ0X3dpdGhvdXRfbmFtZV9yZWZlcmVuY2VcIjtcbiAgICBRUEFDS0luc3RydWN0aW9uVHlwZU5hbWVbXCJkdXBsaWNhdGVcIl0gPSBcImR1cGxpY2F0ZVwiO1xuICAgIFFQQUNLSW5zdHJ1Y3Rpb25UeXBlTmFtZVtcImhlYWRlcl9hY2tub3dsZWRnZW1lbnRcIl0gPSBcImhlYWRlcl9hY2tub3dsZWRnZW1lbnRcIjtcbiAgICBRUEFDS0luc3RydWN0aW9uVHlwZU5hbWVbXCJzdHJlYW1fY2FuY2VsbGF0aW9uXCJdID0gXCJzdHJlYW1fY2FuY2VsbGF0aW9uXCI7XG4gICAgUVBBQ0tJbnN0cnVjdGlvblR5cGVOYW1lW1wiaW5zZXJ0X2NvdW50X2luY3JlbWVudFwiXSA9IFwiaW5zZXJ0X2NvdW50X2luY3JlbWVudFwiO1xufSkoUVBBQ0tJbnN0cnVjdGlvblR5cGVOYW1lID0gZXhwb3J0cy5RUEFDS0luc3RydWN0aW9uVHlwZU5hbWUgfHwgKGV4cG9ydHMuUVBBQ0tJbnN0cnVjdGlvblR5cGVOYW1lID0ge30pKTtcbnZhciBRUEFDS0hlYWRlckJsb2NrUHJlc2VudGF0aW9uVHlwZU5hbWU7XG4oZnVuY3Rpb24gKFFQQUNLSGVhZGVyQmxvY2tQcmVzZW50YXRpb25UeXBlTmFtZSkge1xuICAgIFFQQUNLSGVhZGVyQmxvY2tQcmVzZW50YXRpb25UeXBlTmFtZVtcImluZGV4ZWRfaGVhZGVyXCJdID0gXCJpbmRleGVkX2hlYWRlclwiO1xuICAgIFFQQUNLSGVhZGVyQmxvY2tQcmVzZW50YXRpb25UeXBlTmFtZVtcImxpdGVyYWxfd2l0aF9uYW1lXCJdID0gXCJsaXRlcmFsX3dpdGhfbmFtZVwiO1xuICAgIFFQQUNLSGVhZGVyQmxvY2tQcmVzZW50YXRpb25UeXBlTmFtZVtcImxpdGVyYWxfd2l0aG91dF9uYW1lXCJdID0gXCJsaXRlcmFsX3dpdGhvdXRfbmFtZVwiO1xufSkoUVBBQ0tIZWFkZXJCbG9ja1ByZXNlbnRhdGlvblR5cGVOYW1lID0gZXhwb3J0cy5RUEFDS0hlYWRlckJsb2NrUHJlc2VudGF0aW9uVHlwZU5hbWUgfHwgKGV4cG9ydHMuUVBBQ0tIZWFkZXJCbG9ja1ByZXNlbnRhdGlvblR5cGVOYW1lID0ge30pKTtcbi8vIGV4cG9ydCB0eXBlIFZpZGVvRXZlbnRUeXBlID0gSUJ1ZmZlckxldmVsVXBkYXRlIHwgSVBsYXllckludGVyYWN0aW9uIHwgSVJlcHJlc2VudGF0aW9uU3dpdGNoO1xuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBBQlIgRXZlbnQgdHlwZXNcbi8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIFBsYXliYWNrRXZlbnRUeXBlO1xuKGZ1bmN0aW9uIChQbGF5YmFja0V2ZW50VHlwZSkge1xuICAgIFBsYXliYWNrRXZlbnRUeXBlW1wic3RyZWFtX2luaXRpYWxpc2VkXCJdID0gXCJzdHJlYW1faW5pdGlhbGlzZWRcIjtcbiAgICBQbGF5YmFja0V2ZW50VHlwZVtcInBsYXllcl9pbnRlcmFjdGlvblwiXSA9IFwicGxheWVyX2ludGVyYWN0aW9uXCI7XG4gICAgUGxheWJhY2tFdmVudFR5cGVbXCJyZWJ1ZmZlclwiXSA9IFwicmVidWZmZXJcIjtcbiAgICBQbGF5YmFja0V2ZW50VHlwZVtcInN0cmVhbV9lbmRcIl0gPSBcInN0cmVhbV9lbmRcIjtcbiAgICBQbGF5YmFja0V2ZW50VHlwZVtcInBsYXloZWFkX3Byb2dyZXNzXCJdID0gXCJwbGF5aGVhZF9wcm9ncmVzc1wiO1xufSkoUGxheWJhY2tFdmVudFR5cGUgPSBleHBvcnRzLlBsYXliYWNrRXZlbnRUeXBlIHx8IChleHBvcnRzLlBsYXliYWNrRXZlbnRUeXBlID0ge30pKTtcbnZhciBBQlJFdmVudFR5cGU7XG4oZnVuY3Rpb24gKEFCUkV2ZW50VHlwZSkge1xuICAgIEFCUkV2ZW50VHlwZVtcInN3aXRjaFwiXSA9IFwic3dpdGNoXCI7XG4gICAgQUJSRXZlbnRUeXBlW1wicmVhZHlzdGF0ZV9jaGFuZ2VcIl0gPSBcInJlYWR5c3RhdGVfY2hhbmdlXCI7XG59KShBQlJFdmVudFR5cGUgPSBleHBvcnRzLkFCUkV2ZW50VHlwZSB8fCAoZXhwb3J0cy5BQlJFdmVudFR5cGUgPSB7fSkpO1xudmFyIEJ1ZmZlckV2ZW50VHlwZTtcbihmdW5jdGlvbiAoQnVmZmVyRXZlbnRUeXBlKSB7XG4gICAgQnVmZmVyRXZlbnRUeXBlW1wib2NjdXBhbmN5X3VwZGF0ZVwiXSA9IFwib2NjdXBhbmN5X3VwZGF0ZVwiO1xufSkoQnVmZmVyRXZlbnRUeXBlID0gZXhwb3J0cy5CdWZmZXJFdmVudFR5cGUgfHwgKGV4cG9ydHMuQnVmZmVyRXZlbnRUeXBlID0ge30pKTtcbnZhciBOZXR3b3JrRXZlbnRUeXBlO1xuKGZ1bmN0aW9uIChOZXR3b3JrRXZlbnRUeXBlKSB7XG4gICAgTmV0d29ya0V2ZW50VHlwZVtcInJlcXVlc3RcIl0gPSBcInJlcXVlc3RcIjtcbiAgICBOZXR3b3JrRXZlbnRUeXBlW1wicmVxdWVzdF91cGRhdGVcIl0gPSBcInJlcXVlc3RfdXBkYXRlXCI7XG4gICAgTmV0d29ya0V2ZW50VHlwZVtcImFib3J0XCJdID0gXCJhYm9ydFwiO1xufSkoTmV0d29ya0V2ZW50VHlwZSA9IGV4cG9ydHMuTmV0d29ya0V2ZW50VHlwZSB8fCAoZXhwb3J0cy5OZXR3b3JrRXZlbnRUeXBlID0ge30pKTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFCUiBFdmVudCBEYXRhIGZpZWxkc1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIE1lZGlhVHlwZTtcbihmdW5jdGlvbiAoTWVkaWFUeXBlKSB7XG4gICAgTWVkaWFUeXBlW1widmlkZW9cIl0gPSBcInZpZGVvXCI7XG4gICAgTWVkaWFUeXBlW1wiYXVkaW9cIl0gPSBcImF1ZGlvXCI7XG4gICAgTWVkaWFUeXBlW1wic3VidGl0bGVzXCJdID0gXCJzdWJ0aXRsZXNcIjtcbiAgICBNZWRpYVR5cGVbXCJvdGhlclwiXSA9IFwib3RoZXJcIjtcbn0pKE1lZGlhVHlwZSA9IGV4cG9ydHMuTWVkaWFUeXBlIHx8IChleHBvcnRzLk1lZGlhVHlwZSA9IHt9KSk7XG52YXIgSW50ZXJhY3Rpb25TdGF0ZTtcbihmdW5jdGlvbiAoSW50ZXJhY3Rpb25TdGF0ZSkge1xuICAgIEludGVyYWN0aW9uU3RhdGVbXCJwbGF5XCJdID0gXCJwbGF5XCI7XG4gICAgSW50ZXJhY3Rpb25TdGF0ZVtcInBhdXNlXCJdID0gXCJwYXVzZVwiO1xuICAgIEludGVyYWN0aW9uU3RhdGVbXCJzZWVrXCJdID0gXCJzZWVrXCI7XG4gICAgSW50ZXJhY3Rpb25TdGF0ZVtcInNwZWVkXCJdID0gXCJzcGVlZFwiO1xufSkoSW50ZXJhY3Rpb25TdGF0ZSA9IGV4cG9ydHMuSW50ZXJhY3Rpb25TdGF0ZSB8fCAoZXhwb3J0cy5JbnRlcmFjdGlvblN0YXRlID0ge30pKTtcbnZhciBSZWFkeVN0YXRlO1xuKGZ1bmN0aW9uIChSZWFkeVN0YXRlKSB7XG4gICAgUmVhZHlTdGF0ZVtSZWFkeVN0YXRlW1wiaGF2ZV9ub3RoaW5nXCJdID0gMF0gPSBcImhhdmVfbm90aGluZ1wiO1xuICAgIFJlYWR5U3RhdGVbUmVhZHlTdGF0ZVtcImhhdmVfbWV0YWRhdGFcIl0gPSAxXSA9IFwiaGF2ZV9tZXRhZGF0YVwiO1xuICAgIFJlYWR5U3RhdGVbUmVhZHlTdGF0ZVtcImhhdmVfY3VycmVudF9kYXRhXCJdID0gMl0gPSBcImhhdmVfY3VycmVudF9kYXRhXCI7XG4gICAgUmVhZHlTdGF0ZVtSZWFkeVN0YXRlW1wiaGF2ZV9mdXR1cmVfZGF0YVwiXSA9IDNdID0gXCJoYXZlX2Z1dHVyZV9kYXRhXCI7XG4gICAgUmVhZHlTdGF0ZVtSZWFkeVN0YXRlW1wiaGF2ZV9lbm91Z2hfZGF0YVwiXSA9IDRdID0gXCJoYXZlX2Vub3VnaF9kYXRhXCI7XG59KShSZWFkeVN0YXRlID0gZXhwb3J0cy5SZWFkeVN0YXRlIHx8IChleHBvcnRzLlJlYWR5U3RhdGUgPSB7fSkpO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBleHBvcnQgZW51bSBWaWRlb0V2ZW50RGF0YSB7XG4vLyAgICAgYnVmZmVyX2xldmVsX3VwZGF0ZSA9IFwiYnVmZmVyX2xldmVsX3VwZGF0ZWRcIixcbi8vICAgICBwbGF5ZXJfaW50ZXJhY3Rpb24gPSBcInBsYXllcl9pbnRlcmFjdGlvblwiLFxuLy8gICAgIHJlcHJlc2VudGF0aW9uX3N3aXRjaCA9IFwicmVwcmVzZW50YXRpb25fc3dpdGNoXCIsXG4vLyAgICAgcHJvZ3Jlc3NfdXBkYXRlID0gXCJwcm9ncmVzc191cGRhdGVcIi8vIFRFTVBPUkFSWVxuLy8gfVxuLy9cbi8vXG4vL1xuLy8gZXhwb3J0IGludGVyZmFjZSBJQnVmZmVyTGV2ZWxVcGRhdGUge1xuLy8gICAgIG1lZGlhX3R5cGU6TWVkaWFUeXBlLFxuLy8gICAgIGxldmVsOm51bWJlclxuLy8gfVxuLy9cbi8vIGV4cG9ydCBlbnVtIFBsYXllclN0YXRlIHtcbi8vICAgICBwbGF5ID0gXCJwbGF5XCIsXG4vLyAgICAgcGF1c2UgPSBcInBhdXNlXCIsXG4vLyAgICAgc2VlayA9IFwic2Vla1wiXG4vLyB9XG4vL1xuLy8gZXhwb3J0IGludGVyZmFjZSBJUGxheWVySW50ZXJhY3Rpb24ge1xuLy8gICAgIHN0YXRlOlBsYXllclN0YXRlLFxuLy8gICAgIGF1dG9wbGF5Pzpib29sZWFuIC8vIG9ubHkgaWYgc3RhdGUgPT09IFBsYXllclN0YXRlLnBsYXlcbi8vIH1cbi8vXG4vLyBleHBvcnQgaW50ZXJmYWNlIElSZXByZXNlbnRhdGlvblN3aXRjaCB7XG4vLyAgICAgbWVkaWFfdHlwZTpNZWRpYVR5cGUsXG4vLyAgICAgcmVwcmVzZW50YXRpb25fbmFtZT86c3RyaW5nLFxuLy8gICAgIHJlcHJlc2VudGF0aW9uX2luZGV4PzpudW1iZXJcbi8vICAgICBzdWJyZXByZXNlbnRhdGlvbl9sZXZlbD86bnVtYmVyIC8vIExpbmtlZCB0byBzdWJzZWdtZW50IHNzaXggbGV2ZWxcbi8vIH1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH0pO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZpZGVvUWxvZ092ZXJ2aWV3TWFuYWdlciA9IGV4cG9ydHMuVmlkZW9RbG9nID0gdm9pZCAwO1xuY29uc3QgaWRiID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJpZGJcIikpO1xuY29uc3QgcWxvZyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiLi9xbG9nLXNjaGVtYVwiKSk7XG4vLyBSZXByZXNlbnRzIGEgc2luZ2xlIHZpZGVvIHRyYWNlXG5jbGFzcyBWaWRlb1Fsb2cge1xuICAgIGFzeW5jIGluaXQodHJhY2VOYW1lKSB7XG4gICAgICAgIGlmICghd2luZG93LmluZGV4ZWREQikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIk5vIHN1cHBvcnQgZm9yIEluZGV4ZWREQiwgaGFsdGluZyB2aWRlb1Fsb2cuXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lc3RhbXAgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zdGFydFRpbWVyID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB0aGlzLnRyYWNlTmFtZSA9IHRyYWNlTmFtZSB8fCB0aGlzLnN0YXJ0VGltZXN0YW1wLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBkYXRhYmFzZU5hbWUgPSBcInZpZGVvUWxvZy1cIiArIHRoaXMudHJhY2VOYW1lO1xuICAgICAgICB0aGlzLmxvZ0RhdGFiYXNlID0gYXdhaXQgaWRiLm9wZW5EQihkYXRhYmFzZU5hbWUsIDEsIHtcbiAgICAgICAgICAgIHVwZ3JhZGUoZGIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRiLm9iamVjdFN0b3JlTmFtZXMuY29udGFpbnMoXCJldmVudHNcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgZGIuY3JlYXRlT2JqZWN0U3RvcmUoXCJldmVudHNcIiwgeyBhdXRvSW5jcmVtZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMub3ZlcnZpZXdEYXRhYmFzZSA9IG5ldyBWaWRlb1Fsb2dPdmVydmlld01hbmFnZXIoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5vdmVydmlld0RhdGFiYXNlLmluaXQoKTtcbiAgICAgICAgYXdhaXQgdGhpcy5vdmVydmlld0RhdGFiYXNlLnJlZ2lzdGVyTmV3RGF0YWJhc2UoZGF0YWJhc2VOYW1lKTtcbiAgICB9XG4gICAgZ2V0Q3VycmVudFRpbWVPZmZzZXQoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgLSB0aGlzLnN0YXJ0VGltZXI7XG4gICAgfVxuICAgIGFzeW5jIGdlbmVyYXRlQmxvYigpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZXRyaWV2ZUxvZ3MoKS50aGVuKGxvZ3MgPT4ge1xuICAgICAgICAgICAgbGV0IHRpbWUgPSBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XG4gICAgICAgICAgICAvLyBodHRwczovL3F1aWNsb2cuZ2l0aHViLmlvL2ludGVybmV0LWRyYWZ0cy9kcmFmdDAyL2RyYWZ0LW1hcngtcWxvZy1tYWluLXNjaGVtYS5odG1sXG4gICAgICAgICAgICBsZXQgcWxvZ0pzb24gPSB7XG4gICAgICAgICAgICAgICAgcWxvZ192ZXJzaW9uOiBcImRyYWZ0LTAyXCIsXG4gICAgICAgICAgICAgICAgcWxvZ19mb3JtYXQ6IFwiSlNPTlwiLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBcInFsb2ctYWJyXCIsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXG4gICAgICAgICAgICAgICAgdHJhY2VzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIk1QRUctREFTSCBkYXNoLmpzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYE1QRUctREFTSCBkYXNoLmpzIGNvbGxlY3Rpb24gWyR7dGltZS50b0lTT1N0cmluZygpfV0gWyR7bmF2aWdhdG9yLnVzZXJBZ2VudH1dYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbnRhZ2VfcG9pbnQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkRhc2hKUyBhcHBsaWNhdGlvbiBsYXllclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHFsb2cuVmFudGFnZVBvaW50VHlwZS5jbGllbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tb25fZmllbGRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdG9jb2xfdHlwZTogXCJRTE9HX0FCUlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZmVyZW5jZV90aW1lOiBcIlwiICsgdGhpcy5zdGFydFRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lX2Zvcm1hdDogXCJyZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50czogbG9nc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVEb3dubG9hZEV2ZW50KEpTT04uc3RyaW5naWZ5KHFsb2dKc29uKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyByZXRyaWV2ZUxvZ3MoKSB7XG4gICAgICAgIGxldCBsb2dzID0gYXdhaXQgdGhpcy5sb2dEYXRhYmFzZS5nZXRBbGwoXCJldmVudHNcIik7XG4gICAgICAgIHJldHVybiBsb2dzO1xuICAgIH1cbiAgICB3cmFwRXZlbnREYXRhKGNhdGVnb3J5LCB0eXBlLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0aW1lOiB0aGlzLmdldEN1cnJlbnRUaW1lT2Zmc2V0KCksXG4gICAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZW5lcmF0ZURvd25sb2FkRXZlbnQoZGF0YSkge1xuICAgICAgICBsZXQgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGY4XCIgfSk7XG4gICAgICAgIGxldCBsaW5rID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICAgIGxldCBkb21BID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgIGRvbUEuZG93bmxvYWQgPSBcImNyZWF0ZS1uYW1lLXRvZG8uanNvblwiO1xuICAgICAgICBkb21BLmhyZWYgPSBsaW5rO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvbUEpO1xuICAgICAgICBkb21BLmNsaWNrKCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZG9tQSk7XG4gICAgfVxuICAgIGFzeW5jIHJlZ2lzdGVyRXZlbnQoZXZlbnREYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50RGF0YSk7XG4gICAgICAgIGF3YWl0IHRoaXMubG9nRGF0YWJhc2UucHV0KFwiZXZlbnRzXCIsIGV2ZW50RGF0YSk7XG4gICAgfVxuICAgIC8vICoqKlxuICAgIC8vIFZpZGVvIFFMb2cgZm9ybWF0dGVyc1xuICAgIC8vICoqKlxuICAgIC8vIE5hdGl2ZSBldmVudHNcbiAgICAvLyBwdWJsaWMgYXN5bmMgb25DYW5QbGF5KGVsZW1lbnQ6IEhUTUxFbGVtZW50KVxuICAgIGFzeW5jIG9uUGxheWJhY2tFbmRlZCh0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IGV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIHBsYXloZWFkX21zOiB0aW1lc3RhbXBcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMud3JhcEV2ZW50RGF0YShxbG9nLkV2ZW50Q2F0ZWdvcnkucGxheWJhY2ssIHFsb2cuUGxheWJhY2tFdmVudFR5cGUuc3RyZWFtX2VuZCwgZXZlbnREYXRhKSk7XG4gICAgfVxuICAgIGFzeW5jIG9uUGxheWhlYWRQcm9ncmVzcyh0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IGV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIHBsYXloZWFkX21zOiB0aW1lc3RhbXBcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMud3JhcEV2ZW50RGF0YShxbG9nLkV2ZW50Q2F0ZWdvcnkucGxheWJhY2ssIHFsb2cuUGxheWJhY2tFdmVudFR5cGUucGxheWhlYWRfcHJvZ3Jlc3MsIGV2ZW50RGF0YSkpO1xuICAgIH1cbiAgICBhc3luYyBvblN0cmVhbUluaXRpYWxpc2VkKGF1dG9wbGF5KSB7XG4gICAgICAgIGxldCBldmVudERhdGEgPSB7XG4gICAgICAgICAgICBhdXRvcGxheTogYXV0b3BsYXlcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMud3JhcEV2ZW50RGF0YShxbG9nLkV2ZW50Q2F0ZWdvcnkucGxheWJhY2ssIHFsb2cuUGxheWJhY2tFdmVudFR5cGUuc3RyZWFtX2luaXRpYWxpc2VkLCBldmVudERhdGEpKTtcbiAgICB9XG4gICAgYXN5bmMgb25TdHJlYW1FbmRlZCh0aW1lc3RhbXApIHtcbiAgICAgICAgbGV0IGV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIHBsYXloZWFkX21zOiB0aW1lc3RhbXBcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMud3JhcEV2ZW50RGF0YShxbG9nLkV2ZW50Q2F0ZWdvcnkucGxheWJhY2ssIHFsb2cuUGxheWJhY2tFdmVudFR5cGUuc3RyZWFtX2VuZCwgZXZlbnREYXRhKSk7XG4gICAgfVxuICAgIGFzeW5jIG9uUmVwcmVzZW50YXRpb25Td2l0Y2gobWVkaWFUeXBlLCBuZXdSZXBOYW1lLCBiaXRyYXRlKSB7XG4gICAgICAgIGxldCBldmVudERhdGEgPSB7XG4gICAgICAgICAgICBtZWRpYV90eXBlOiBtZWRpYVR5cGUsXG4gICAgICAgICAgICB0b19pZDogbmV3UmVwTmFtZSxcbiAgICAgICAgICAgIHRvX2JpdHJhdGU6IGJpdHJhdGVcbiAgICAgICAgfTtcbiAgICAgICAgYXdhaXQgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMud3JhcEV2ZW50RGF0YShxbG9nLkV2ZW50Q2F0ZWdvcnkuYWJyLCBxbG9nLkFCUkV2ZW50VHlwZS5zd2l0Y2gsIGV2ZW50RGF0YSkpO1xuICAgIH1cbiAgICBhc3luYyBvblJlYWR5c3RhdGVDaGFuZ2Uoc3RhdGUpIHtcbiAgICAgICAgbGV0IGV2ZW50RGF0YSA9IHtcbiAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICB9O1xuICAgICAgICBhd2FpdCB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy53cmFwRXZlbnREYXRhKHFsb2cuRXZlbnRDYXRlZ29yeS5hYnIsIHFsb2cuQUJSRXZlbnRUeXBlLnJlYWR5c3RhdGVfY2hhbmdlLCBldmVudERhdGEpKTtcbiAgICB9XG4gICAgYXN5bmMgb25CdWZmZXJMZXZlbFVwZGF0ZShtZWRpYVR5cGUsIGxldmVsKSB7XG4gICAgICAgIGxldCBldmVudERhdGEgPSB7XG4gICAgICAgICAgICBtZWRpYV90eXBlOiBtZWRpYVR5cGUsXG4gICAgICAgICAgICBwbGF5b3V0X21zOiBsZXZlbFxuICAgICAgICB9O1xuICAgICAgICBhd2FpdCB0aGlzLnJlZ2lzdGVyRXZlbnQodGhpcy53cmFwRXZlbnREYXRhKFwidmlkZW9cIiwgcWxvZy5CdWZmZXJFdmVudFR5cGUub2NjdXBhbmN5X3VwZGF0ZSwgZXZlbnREYXRhKSk7XG4gICAgfVxufVxuZXhwb3J0cy5WaWRlb1Fsb2cgPSBWaWRlb1Fsb2c7XG5jbGFzcyBWaWRlb1Fsb2dPdmVydmlld01hbmFnZXIge1xuICAgIGFzeW5jIGluaXQoKSB7XG4gICAgICAgIHRoaXMub3ZlcnZpZXdEYXRhYmFzZSA9IGF3YWl0IGlkYi5vcGVuREIoXCJWaWRlb1Fsb2ctb3ZlcnZpZXdcIiwgMSwge1xuICAgICAgICAgICAgdXBncmFkZShkYikge1xuICAgICAgICAgICAgICAgIGlmICghZGIub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhcIm92ZXJ2aWV3XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRiLmNyZWF0ZU9iamVjdFN0b3JlKFwib3ZlcnZpZXdcIiwgeyBhdXRvSW5jcmVtZW50OiB0cnVlIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGNsZWFyQWxsKCkge1xuICAgICAgICBsZXQgZGF0YWJhc2VOYW1lcyA9IGF3YWl0IHRoaXMub3ZlcnZpZXdEYXRhYmFzZS5nZXRBbGwoXCJvdmVydmlld1wiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YWJhc2VOYW1lcyk7XG4gICAgICAgIGRhdGFiYXNlTmFtZXMuZm9yRWFjaChkYXRhYmFzZSA9PiB7XG4gICAgICAgICAgICBpZGIuZGVsZXRlREIoZGF0YWJhc2UpO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5vdmVydmlld0RhdGFiYXNlLmNsZWFyKFwib3ZlcnZpZXdcIik7XG4gICAgfVxuICAgIGFzeW5jIHJlZ2lzdGVyTmV3RGF0YWJhc2UoZGF0YWJhc2VOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm92ZXJ2aWV3RGF0YWJhc2UucHV0KFwib3ZlcnZpZXdcIiwgZGF0YWJhc2VOYW1lKTtcbiAgICB9XG59XG5leHBvcnRzLlZpZGVvUWxvZ092ZXJ2aWV3TWFuYWdlciA9IFZpZGVvUWxvZ092ZXJ2aWV3TWFuYWdlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=