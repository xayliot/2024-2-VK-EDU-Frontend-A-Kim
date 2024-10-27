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
/******/ 	return __webpack_require__(__webpack_require__.s = "./components/chats/chats.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/chats/chats.css":
/*!************************************!*\
  !*** ./components/chats/chats.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./components/chats/chats.css?");

/***/ }),

/***/ "./components/chats/chats.js":
/*!***********************************!*\
  !*** ./components/chats/chats.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _chats_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chats.css */ \"./components/chats/chats.css\");\n/* harmony import */ var _chats_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_chats_css__WEBPACK_IMPORTED_MODULE_0__);\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  var createButton = document.querySelector('.create-button button');\n  var chatModal = document.getElementById('chat-modal');\n  var closeModal = document.getElementById('close-modal');\n  var createChatButton = document.getElementById('create-chat');\n  var chatNameInput = document.getElementById('chat-name');\n  var participantNameInput = document.getElementById('participant-name');\n  var chatImageInput = document.getElementById('chat-image');\n  var chatsContainer = document.querySelector('.chats');\n  displayAllChats();\n  createButton.addEventListener('click', function () {\n    chatModal.style.display = 'block';\n  });\n  closeModal.addEventListener('click', function () {\n    chatModal.style.display = 'none';\n  });\n  createChatButton.addEventListener('click', function () {\n    var chatName = chatNameInput.value.trim();\n    var participantName = participantNameInput.value.trim();\n    var chatImage = chatImageInput.value.trim();\n    if (chatName && participantName && chatImage) {\n      var chatId = Date.now().toString();\n      var chatData = {\n        id: chatId,\n        name: chatName,\n        participants: [participantName],\n        image: chatImage,\n        messages: []\n      };\n      var chats = getChatsFromLocalStorage();\n      chats[chatId] = chatData;\n      localStorage.setItem('chats', JSON.stringify(chats));\n      addChatToUI(chatData);\n      chatModal.style.display = 'none';\n      clearModalInputs();\n    }\n  });\n  function truncateText(text, limit) {\n    if (text.length > limit) {\n      return text.substring(0, limit) + '...';\n    }\n    return text;\n  }\n  function addChatToUI(chatData) {\n    var chatElement = document.createElement('a');\n    chatElement.setAttribute('href', \"index.html?id=\".concat(chatData.id));\n    chatElement.classList.add('chat');\n    localStorage.setItem('chatId', chatData.id);\n    var maxLength = 25;\n    var lastMessage = chatData.messages.length > 0 ? chatData.messages[chatData.messages.length - 1].text : 'Нет сообщений';\n    var truncatedMessage = truncateText(lastMessage, maxLength);\n    chatElement.innerHTML = \"\\n        <div class=\\\"div-chat-img\\\">\\n            <img class=\\\"chat-img\\\" src=\\\"\".concat(chatData.image, \"\\\" alt=\\\"\").concat(chatData.name, \"\\\">\\n            </div>\\n            <div class=\\\"name-content\\\">\\n                <div class=\\\"name\\\">\").concat(chatData.name, \"</div>\\n                <div class=\\\"lasttext\\\">\").concat(truncatedMessage, \"</div>\\n            </div>\\n        \");\n    chatsContainer.appendChild(chatElement);\n  }\n  function clearModalInputs() {\n    chatNameInput.value = '';\n    participantNameInput.value = '';\n    chatImageInput.value = '';\n  }\n  function displayAllChats() {\n    var chats = getChatsFromLocalStorage();\n    if (Object.keys(chats).length === 0) {\n      console.log(\"Нет чатов\");\n    } else {\n      chatsContainer.innerHTML = '';\n      Object.keys(chats).forEach(function (chatId) {\n        var chat = chats[chatId];\n        addChatToUI(chat);\n      });\n    }\n  }\n  function getChatsFromLocalStorage() {\n    var storedChats = localStorage.getItem('chats');\n    return storedChats ? JSON.parse(storedChats) : {};\n  }\n});\n\n//# sourceURL=webpack:///./components/chats/chats.js?");

/***/ })

/******/ });