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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n\nvar form = document.querySelector('form');\nvar input = document.querySelector('.form-input');\nvar messageDiv = document.querySelector('.messages');\nvar swapbtn = document.getElementById('change_user');\nvar avatar = document.querySelector('.ava-img');\nvar currentUser = 'me';\nvar companion = '';\nvar currentUrl = window.location.href;\nvar url = new URL(currentUrl);\nvar chatId = url.searchParams.get('id');\nvar chats = getMessagesFromLocalStorage();\nif (chatId && chats[chatId]) {\n  companion = chats[chatId].participants.find(function (p) {\n    return p !== currentUser;\n  }) || 'Собеседник';\n  document.querySelector('.username').textContent = companion;\n  avatar.src = chats[chatId].image;\n  displayMessages(chatId);\n} else {\n  console.log(\"chatId не найден\");\n}\nswapbtn.textContent = currentUser;\nform.addEventListener('submit', handleSubmit);\nswapbtn.addEventListener('click', swapUsers);\nfunction handleSubmit(event) {\n  event.preventDefault();\n  var messageText = input.value.trim();\n  if (messageText) {\n    var message = {\n      text: messageText,\n      sender: currentUser,\n      time: new Date().toISOString()\n    };\n    saveMessagesToLocalStorage(chatId, message);\n    input.value = '';\n    addNewMesage(message);\n    scrollToBottom();\n  }\n}\nfunction swapUsers() {\n  currentUser = currentUser === 'me' ? 'me' : companion;\n  updateHeader();\n}\nfunction updateHeader() {\n  document.querySelector('.username').textContent = currentUser === 'me' ? companion : currentUser;\n  swapbtn.textContent = currentUser;\n}\nfunction saveMessagesToLocalStorage(chatId, message) {\n  var chats = getMessagesFromLocalStorage();\n  if (!chats[chatId]) {\n    chats[chatId] = {\n      id: chatId,\n      name: \"\\u0427\\u0430\\u0442 \".concat(chatId),\n      participants: [currentUser, companion],\n      messages: []\n    };\n  }\n  chats[chatId].messages.push(message);\n  localStorage.setItem('chats', JSON.stringify(chats));\n}\nfunction getMessagesFromLocalStorage() {\n  var storedChats = localStorage.getItem('chats');\n  return storedChats ? JSON.parse(storedChats) : {};\n}\nfunction displayMessages(chatId) {\n  var chats = getMessagesFromLocalStorage();\n  var messages = chats[chatId] ? chats[chatId].messages : [];\n  messageDiv.innerHTML = '';\n  if (messages.length === 0) {\n    return;\n  }\n  messages.forEach(function (message) {\n    var messageElement = document.createElement('div');\n    messageElement.classList.add('message-item', message.sender === 'me' ? 'user2' : 'user');\n    messageElement.innerHTML = \"\\n            <strong>\".concat(message.sender, \"</strong> <em class='timestamp'>\").concat(new Date(message.time).toLocaleTimeString([], {\n      hour: '2-digit',\n      minute: '2-digit'\n    }), \"</em><br>\\n            \").concat(message.text, \"\\n        \");\n    messageDiv.appendChild(messageElement);\n  });\n  scrollToBottom();\n}\nfunction scrollToBottom() {\n  messageDiv.scrollTop = messageDiv.scrollHeight;\n}\nfunction addNewMesage(message) {\n  var messageElement = document.createElement('div');\n  messageElement.classList.add('message-item', message.sender === 'me' ? 'user' : 'user2');\n  messageElement.classList.add('bounceIn');\n  messageElement.innerHTML = \"\\n        <strong>\".concat(message.sender, \"</strong> <em class='timestamp'>\").concat(new Date(message.time).toLocaleTimeString([], {\n    hour: '2-digit',\n    minute: '2-digit'\n  }), \"</em><br>\\n        \").concat(message.text, \"\\n    \");\n  messageElement.addEventListener('animationend', function () {\n    messageElement.classList.remove('bounceIn');\n  });\n  messageDiv.appendChild(messageElement);\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });