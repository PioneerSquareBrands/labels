/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.html2canvas = factory());
}(this, (function () { 'use strict';

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __awaiter(thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
          function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
          function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
          function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
  }

  function __generator(thisArg, body) {
      var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
      function verb(n) { return function (v) { return step([n, v]); }; }
      function step(op) {
          if (f) throw new TypeError("Generator is already executing.");
          while (_) try {
              if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                  case 0: case 1: t = op; break;
                  case 4: _.label++; return { value: op[1], done: false };
                  case 5: _.label++; y = op[1]; op = [0]; continue;
                  case 7: op = _.ops.pop(); _.trys.pop(); continue;
                  default:
                      if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                      if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                      if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                      if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                      if (t[2]) _.ops.pop();
                      _.trys.pop(); continue;
              }
              op = body.call(thisArg, _);
          } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
          if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
      }
  }

  function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
          }
      }
      return to.concat(ar || from);
  }

  var Bounds = /** @class */ (function () {
      function Bounds(left, top, width, height) {
          this.left = left;
          this.top = top;
          this.width = width;
          this.height = height;
      }
      Bounds.prototype.add = function (x, y, w, h) {
          return new Bounds(this.left + x, this.top + y, this.width + w, this.height + h);
      };
      Bounds.fromClientRect = function (context, clientRect) {
          return new Bounds(clientRect.left + context.windowBounds.left, clientRect.top + context.windowBounds.top, clientRect.width, clientRect.height);
      };
      Bounds.fromDOMRectList = function (context, domRectList) {
          var domRect = Array.from(domRectList).find(function (rect) { return rect.width !== 0; });
          return domRect
              ? new Bounds(domRect.left + context.windowBounds.left, domRect.top + context.windowBounds.top, domRect.width, domRect.height)
              : Bounds.EMPTY;
      };
      Bounds.EMPTY = new Bounds(0, 0, 0, 0);
      return Bounds;
  }());
  var parseBounds = function (context, node) {
      return Bounds.fromClientRect(context, node.getBoundingClientRect());
  };
  var parseDocumentSize = function (document) {
      var body = document.body;
      var documentElement = document.documentElement;
      if (!body || !documentElement) {
          throw new Error("Unable to get document size");
      }
      var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
      var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
      return new Bounds(0, 0, width, height);
  };

  /*
   * css-line-break 2.1.0 <https://github.com/niklasvh/css-line-break#readme>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var toCodePoints$1 = function (str) {
      var codePoints = [];
      var i = 0;
      var length = str.length;
      while (i < length) {
          var value = str.charCodeAt(i++);
          if (value >= 0xd800 && value <= 0xdbff && i < length) {
              var extra = str.charCodeAt(i++);
              if ((extra & 0xfc00) === 0xdc00) {
                  codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
              }
              else {
                  codePoints.push(value);
                  i--;
              }
          }
          else {
              codePoints.push(value);
          }
      }
      return codePoints;
  };
  var fromCodePoint$1 = function () {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          codePoints[_i] = arguments[_i];
      }
      if (String.fromCodePoint) {
          return String.fromCodePoint.apply(String, codePoints);
      }
      var length = codePoints.length;
      if (!length) {
          return '';
      }
      var codeUnits = [];
      var index = -1;
      var result = '';
      while (++index < length) {
          var codePoint = codePoints[index];
          if (codePoint <= 0xffff) {
              codeUnits.push(codePoint);
          }
          else {
              codePoint -= 0x10000;
              codeUnits.push((codePoint >> 10) + 0xd800, (codePoint % 0x400) + 0xdc00);
          }
          if (index + 1 === length || codeUnits.length > 0x4000) {
              result += String.fromCharCode.apply(String, codeUnits);
              codeUnits.length = 0;
          }
      }
      return result;
  };
  var chars$2 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup$2 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i$2 = 0; i$2 < chars$2.length; i$2++) {
      lookup$2[chars$2.charCodeAt(i$2)] = i$2;
  }

  /*
   * utrie 1.0.2 <https://github.com/niklasvh/utrie>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var chars$1$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup$1$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i$1$1 = 0; i$1$1 < chars$1$1.length; i$1$1++) {
      lookup$1$1[chars$1$1.charCodeAt(i$1$1)] = i$1$1;
  }
  var decode$1 = function (base64) {
      var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
      if (base64[base64.length - 1] === '=') {
          bufferLength--;
          if (base64[base64.length - 2] === '=') {
              bufferLength--;
          }
      }
      var buffer = typeof ArrayBuffer !== 'undefined' &&
          typeof Uint8Array !== 'undefined' &&
          typeof Uint8Array.prototype.slice !== 'undefined'
          ? new ArrayBuffer(bufferLength)
          : new Array(bufferLength);
      var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
      for (i = 0; i < len; i += 4) {
          encoded1 = lookup$1$1[base64.charCodeAt(i)];
          encoded2 = lookup$1$1[base64.charCodeAt(i + 1)];
          encoded3 = lookup$1$1[base64.charCodeAt(i + 2)];
          encoded4 = lookup$1$1[base64.charCodeAt(i + 3)];
          bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
          bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
          bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }
      return buffer;
  };
  var polyUint16Array$1 = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 2) {
          bytes.push((buffer[i + 1] << 8) | buffer[i]);
      }
      return bytes;
  };
  var polyUint32Array$1 = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 4) {
          bytes.push((buffer[i + 3] << 24) | (buffer[i + 2] << 16) | (buffer[i + 1] << 8) | buffer[i]);
      }
      return bytes;
  };

  /** Shift size for getting the index-2 table offset. */
  var UTRIE2_SHIFT_2$1 = 5;
  /** Shift size for getting the index-1 table offset. */
  var UTRIE2_SHIFT_1$1 = 6 + 5;
  /**
   * Shift size for shifting left the index array values.
   * Increases possible data size with 16-bit index values at the cost
   * of compactability.
   * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
   */
  var UTRIE2_INDEX_SHIFT$1 = 2;
  /**
   * Difference between the two shift sizes,
   * for getting an index-1 offset from an index-2 offset. 6=11-5
   */
  var UTRIE2_SHIFT_1_2$1 = UTRIE2_SHIFT_1$1 - UTRIE2_SHIFT_2$1;
  /**
   * The part of the index-2 table for U+D800..U+DBFF stores values for
   * lead surrogate code _units_ not code _points_.
   * Values for lead surrogate code _points_ are indexed with this portion of the table.
   * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
   */
  var UTRIE2_LSCP_INDEX_2_OFFSET$1 = 0x10000 >> UTRIE2_SHIFT_2$1;
  /** Number of entries in a data block. 32=0x20 */
  var UTRIE2_DATA_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_2$1;
  /** Mask for getting the lower bits for the in-data-block offset. */
  var UTRIE2_DATA_MASK$1 = UTRIE2_DATA_BLOCK_LENGTH$1 - 1;
  var UTRIE2_LSCP_INDEX_2_LENGTH$1 = 0x400 >> UTRIE2_SHIFT_2$1;
  /** Count the lengths of both BMP pieces. 2080=0x820 */
  var UTRIE2_INDEX_2_BMP_LENGTH$1 = UTRIE2_LSCP_INDEX_2_OFFSET$1 + UTRIE2_LSCP_INDEX_2_LENGTH$1;
  /**
   * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
   * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
   */
  var UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 = UTRIE2_INDEX_2_BMP_LENGTH$1;
  var UTRIE2_UTF8_2B_INDEX_2_LENGTH$1 = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
  /**
   * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
   * Variable length, for code points up to highStart, where the last single-value range starts.
   * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
   * (For 0x100000 supplementary code points U+10000..U+10ffff.)
   *
   * The part of the index-2 table for supplementary code points starts
   * after this index-1 table.
   *
   * Both the index-1 table and the following part of the index-2 table
   * are omitted completely if there is only BMP data.
   */
  var UTRIE2_INDEX_1_OFFSET$1 = UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 + UTRIE2_UTF8_2B_INDEX_2_LENGTH$1;
  /**
   * Number of index-1 entries for the BMP. 32=0x20
   * This part of the index-1 table is omitted from the serialized form.
   */
  var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 = 0x10000 >> UTRIE2_SHIFT_1$1;
  /** Number of entries in an index-2 block. 64=0x40 */
  var UTRIE2_INDEX_2_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_1_2$1;
  /** Mask for getting the lower bits for the in-index-2-block offset. */
  var UTRIE2_INDEX_2_MASK$1 = UTRIE2_INDEX_2_BLOCK_LENGTH$1 - 1;
  var slice16$1 = function (view, start, end) {
      if (view.slice) {
          return view.slice(start, end);
      }
      return new Uint16Array(Array.prototype.slice.call(view, start, end));
  };
  var slice32$1 = function (view, start, end) {
      if (view.slice) {
          return view.slice(start, end);
      }
      return new Uint32Array(Array.prototype.slice.call(view, start, end));
  };
  var createTrieFromBase64$1 = function (base64, _byteLength) {
      var buffer = decode$1(base64);
      var view32 = Array.isArray(buffer) ? polyUint32Array$1(buffer) : new Uint32Array(buffer);
      var view16 = Array.isArray(buffer) ? polyUint16Array$1(buffer) : new Uint16Array(buffer);
      var headerLength = 24;
      var index = slice16$1(view16, headerLength / 2, view32[4] / 2);
      var data = view32[5] === 2
          ? slice16$1(view16, (headerLength + view32[4]) / 2)
          : slice32$1(view32, Math.ceil((headerLength + view32[4]) / 4));
      return new Trie$1(view32[0], view32[1], view32[2], view32[3], index, data);
  };
  var Trie$1 = /** @class */ (function () {
      function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
          this.initialValue = initialValue;
          this.errorValue = errorValue;
          this.highStart = highStart;
          this.highValueIndex = highValueIndex;
          this.index = index;
          this.data = data;
      }
      /**
       * Get the value for a code point as stored in the Trie.
       *
       * @param codePoint the code point
       * @return the value
       */
      Trie.prototype.get = function (codePoint) {
          var ix;
          if (codePoint >= 0) {
              if (codePoint < 0x0d800 || (codePoint > 0x0dbff && codePoint <= 0x0ffff)) {
                  // Ordinary BMP code point, excluding leading surrogates.
                  // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                  // 16 bit data is stored in the index array itself.
                  ix = this.index[codePoint >> UTRIE2_SHIFT_2$1];
                  ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                  return this.data[ix];
              }
              if (codePoint <= 0xffff) {
                  // Lead Surrogate Code Point.  A Separate index section is stored for
                  // lead surrogate code units and code points.
                  //   The main index has the code unit data.
                  //   For this function, we need the code point data.
                  // Note: this expression could be refactored for slightly improved efficiency, but
                  //       surrogate code points will be so rare in practice that it's not worth it.
                  ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET$1 + ((codePoint - 0xd800) >> UTRIE2_SHIFT_2$1)];
                  ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                  return this.data[ix];
              }
              if (codePoint < this.highStart) {
                  // Supplemental code point, use two-level lookup.
                  ix = UTRIE2_INDEX_1_OFFSET$1 - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 + (codePoint >> UTRIE2_SHIFT_1$1);
                  ix = this.index[ix];
                  ix += (codePoint >> UTRIE2_SHIFT_2$1) & UTRIE2_INDEX_2_MASK$1;
                  ix = this.index[ix];
                  ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                  return this.data[ix];
              }
              if (codePoint <= 0x10ffff) {
                  return this.data[this.highValueIndex];
              }
          }
          // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
          return this.errorValue;
      };
      return Trie;
  }());

  /*
   * base64-arraybuffer 1.0.2 <https://github.com/niklasvh/base64-arraybuffer>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var chars$3 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup$3 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i$3 = 0; i$3 < chars$3.length; i$3++) {
      lookup$3[chars$3.charCodeAt(i$3)] = i$3;
  }

  var base64$1 = 'KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==';

  var LETTER_NUMBER_MODIFIER = 50;
  // Non-tailorable Line Breaking Classes
  var BK = 1; //  Cause a line break (after)
  var CR$1 = 2; //  Cause a line break (after), except between CR and LF
  var LF$1 = 3; //  Cause a line break (after)
  var CM = 4; //  Prohibit a line break between the character and the preceding character
  var NL = 5; //  Cause a line break (after)
  var WJ = 7; //  Prohibit line breaks before and after
  var ZW = 8; //  Provide a break opportunity
  var GL = 9; //  Prohibit line breaks before and after
  var SP = 10; // Enable indirect line breaks
  var ZWJ$1 = 11; // Prohibit line breaks within joiner sequences
  // Break Opportunities
  var B2 = 12; //  Provide a line break opportunity before and after the character
  var BA = 13; //  Generally provide a line break opportunity after the character
  var BB = 14; //  Generally provide a line break opportunity before the character
  var HY = 15; //  Provide a line break opportunity after the character, except in numeric context
  var CB = 16; //   Provide a line break opportunity contingent on additional information
  // Characters Prohibiting Certain Breaks
  var CL = 17; //  Prohibit line breaks before
  var CP = 18; //  Prohibit line breaks before
  var EX = 19; //  Prohibit line breaks before
  var IN = 20; //  Allow only indirect line breaks between pairs
  var NS = 21; //  Allow only indirect line breaks before
  var OP = 22; //  Prohibit line breaks after
  var QU = 23; //  Act like they are both opening and closing
  // Numeric Context
  var IS = 24; //  Prevent breaks after any and before numeric
  var NU = 25; //  Form numeric expressions for line breaking purposes
  var PO = 26; //  Do not break following a numeric expression
  var PR = 27; //  Do not break in front of a numeric expression
  var SY = 28; //  Prevent a break before; and allow a break after
  // Other Characters
  var AI = 29; //  Act like AL when the resolvedEAW is N; otherwise; act as ID
  var AL = 30; //  Are alphabetic characters or symbols that are used with alphabetic characters
  var CJ = 31; //  Treat as NS or ID for strict or normal breaking.
  var EB = 32; //  Do not break from following Emoji Modifier
  var EM = 33; //  Do not break from preceding Emoji Base
  var H2 = 34; //  Form Korean syllable blocks
  var H3 = 35; //  Form Korean syllable blocks
  var HL = 36; //  Do not break around a following hyphen; otherwise act as Alphabetic
  var ID = 37; //  Break before or after; except in some numeric context
  var JL = 38; //  Form Korean syllable blocks
  var JV = 39; //  Form Korean syllable blocks
  var JT = 40; //  Form Korean syllable blocks
  var RI$1 = 41; //  Keep pairs together. For pairs; break before and after other classes
  var SA = 42; //  Provide a line break opportunity contingent on additional, language-specific context analysis
  var XX = 43; //  Have as yet unknown line breaking behavior or unassigned code positions
  var ea_OP = [0x2329, 0xff08];
  var BREAK_MANDATORY = '!';
  var BREAK_NOT_ALLOWED$1 = '×';
  var BREAK_ALLOWED$1 = '÷';
  var UnicodeTrie$1 = createTrieFromBase64$1(base64$1);
  var ALPHABETICS = [AL, HL];
  var HARD_LINE_BREAKS = [BK, CR$1, LF$1, NL];
  var SPACE$1 = [SP, ZW];
  var PREFIX_POSTFIX = [PR, PO];
  var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE$1);
  var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
  var HYPHEN = [HY, BA];
  var codePointsToCharacterClasses = function (codePoints, lineBreak) {
      if (lineBreak === void 0) { lineBreak = 'strict'; }
      var types = [];
      var indices = [];
      var categories = [];
      codePoints.forEach(function (codePoint, index) {
          var classType = UnicodeTrie$1.get(codePoint);
          if (classType > LETTER_NUMBER_MODIFIER) {
              categories.push(true);
              classType -= LETTER_NUMBER_MODIFIER;
          }
          else {
              categories.push(false);
          }
          if (['normal', 'auto', 'loose'].indexOf(lineBreak) !== -1) {
              // U+2010, – U+2013, 〜 U+301C, ゠ U+30A0
              if ([0x2010, 0x2013, 0x301c, 0x30a0].indexOf(codePoint) !== -1) {
                  indices.push(index);
                  return types.push(CB);
              }
          }
          if (classType === CM || classType === ZWJ$1) {
              // LB10 Treat any remaining combining mark or ZWJ as AL.
              if (index === 0) {
                  indices.push(index);
                  return types.push(AL);
              }
              // LB9 Do not break a combining character sequence; treat it as if it has the line breaking class of
              // the base character in all of the following rules. Treat ZWJ as if it were CM.
              var prev = types[index - 1];
              if (LINE_BREAKS.indexOf(prev) === -1) {
                  indices.push(indices[index - 1]);
                  return types.push(prev);
              }
              indices.push(index);
              return types.push(AL);
          }
          indices.push(index);
          if (classType === CJ) {
              return types.push(lineBreak === 'strict' ? NS : ID);
          }
          if (classType === SA) {
              return types.push(AL);
          }
          if (classType === AI) {
              return types.push(AL);
          }
          // For supplementary characters, a useful default is to treat characters in the range 10000..1FFFD as AL
          // and characters in the ranges 20000..2FFFD and 30000..3FFFD as ID, until the implementation can be revised
          // to take into account the actual line breaking properties for these characters.
          if (classType === XX) {
              if ((codePoint >= 0x20000 && codePoint <= 0x2fffd) || (codePoint >= 0x30000 && codePoint <= 0x3fffd)) {
                  return types.push(ID);
              }
              else {
                  return types.push(AL);
              }
          }
          types.push(classType);
      });
      return [indices, types, categories];
  };
  var isAdjacentWithSpaceIgnored = function (a, b, currentIndex, classTypes) {
      var current = classTypes[currentIndex];
      if (Array.isArray(a) ? a.indexOf(current) !== -1 : a === current) {
          var i = currentIndex;
          while (i <= classTypes.length) {
              i++;
              var next = classTypes[i];
              if (next === b) {
                  return true;
              }
              if (next !== SP) {
                  break;
              }
          }
      }
      if (current === SP) {
          var i = currentIndex;
          while (i > 0) {
              i--;
              var prev = classTypes[i];
              if (Array.isArray(a) ? a.indexOf(prev) !== -1 : a === prev) {
                  var n = currentIndex;
                  while (n <= classTypes.length) {
                      n++;
                      var next = classTypes[n];
                      if (next === b) {
                          return true;
                      }
                      if (next !== SP) {
                          break;
                      }
                  }
              }
              if (prev !== SP) {
                  break;
              }
          }
      }
      return false;
  };
  var previousNonSpaceClassType = function (currentIndex, classTypes) {
      var i = currentIndex;
      while (i >= 0) {
          var type = classTypes[i];
          if (type === SP) {
              i--;
          }
          else {
              return type;
          }
      }
      return 0;
  };
  var _lineBreakAtIndex = function (codePoints, classTypes, indicies, index, forbiddenBreaks) {
      if (indicies[index] === 0) {
          return BREAK_NOT_ALLOWED$1;
      }
      var currentIndex = index - 1;
      if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
          return BREAK_NOT_ALLOWED$1;
      }
      var beforeIndex = currentIndex - 1;
      var afterIndex = currentIndex + 1;
      var current = classTypes[currentIndex];
      // LB4 Always break after hard line breaks.
      // LB5 Treat CR followed by LF, as well as CR, LF, and NL as hard line breaks.
      var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
      var next = classTypes[afterIndex];
      if (current === CR$1 && next === LF$1) {
          return BREAK_NOT_ALLOWED$1;
      }
      if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
          return BREAK_MANDATORY;
      }
      // LB6 Do not break before hard line breaks.
      if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB7 Do not break before spaces or zero width space.
      if (SPACE$1.indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB8 Break before any character following a zero-width space, even if one or more spaces intervene.
      if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
          return BREAK_ALLOWED$1;
      }
      // LB8a Do not break after a zero width joiner.
      if (UnicodeTrie$1.get(codePoints[currentIndex]) === ZWJ$1) {
          return BREAK_NOT_ALLOWED$1;
      }
      // zwj emojis
      if ((current === EB || current === EM) && UnicodeTrie$1.get(codePoints[afterIndex]) === ZWJ$1) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB11 Do not break before or after Word joiner and related characters.
      if (current === WJ || next === WJ) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB12 Do not break after NBSP and related characters.
      if (current === GL) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB12a Do not break before NBSP and related characters, except after spaces and hyphens.
      if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB13 Do not break before ‘]’ or ‘!’ or ‘;’ or ‘/’, even after spaces.
      if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB14 Do not break after ‘[’, even after spaces.
      if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB15 Do not break within ‘”[’, even with intervening spaces.
      if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB16 Do not break between closing punctuation and a nonstarter (lb=NS), even with intervening spaces.
      if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB17 Do not break within ‘——’, even with intervening spaces.
      if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB18 Break after spaces.
      if (current === SP) {
          return BREAK_ALLOWED$1;
      }
      // LB19 Do not break before or after quotation marks, such as ‘ ” ’.
      if (current === QU || next === QU) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB20 Break before and after unresolved CB.
      if (next === CB || current === CB) {
          return BREAK_ALLOWED$1;
      }
      // LB21 Do not break before hyphen-minus, other hyphens, fixed-width spaces, small kana, and other non-starters, or after acute accents.
      if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB21a Don't break after Hebrew + Hyphen.
      if (before === HL && HYPHEN.indexOf(current) !== -1) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB21b Don’t break between Solidus and Hebrew letters.
      if (current === SY && next === HL) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB22 Do not break before ellipsis.
      if (next === IN) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB23 Do not break between digits and letters.
      if ((ALPHABETICS.indexOf(next) !== -1 && current === NU) || (ALPHABETICS.indexOf(current) !== -1 && next === NU)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB23a Do not break between numeric prefixes and ideographs, or between ideographs and numeric postfixes.
      if ((current === PR && [ID, EB, EM].indexOf(next) !== -1) ||
          ([ID, EB, EM].indexOf(current) !== -1 && next === PO)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB24 Do not break between numeric prefix/postfix and letters, or between letters and prefix/postfix.
      if ((ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1) ||
          (PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB25 Do not break between the following pairs of classes relevant to numbers:
      if (
      // (PR | PO) × ( OP | HY )? NU
      ([PR, PO].indexOf(current) !== -1 &&
          (next === NU || ([OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU))) ||
          // ( OP | HY ) × NU
          ([OP, HY].indexOf(current) !== -1 && next === NU) ||
          // NU ×	(NU | SY | IS)
          (current === NU && [NU, SY, IS].indexOf(next) !== -1)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // NU (NU | SY | IS)* × (NU | SY | IS | CL | CP)
      if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
          var prevIndex = currentIndex;
          while (prevIndex >= 0) {
              var type = classTypes[prevIndex];
              if (type === NU) {
                  return BREAK_NOT_ALLOWED$1;
              }
              else if ([SY, IS].indexOf(type) !== -1) {
                  prevIndex--;
              }
              else {
                  break;
              }
          }
      }
      // NU (NU | SY | IS)* (CL | CP)? × (PO | PR))
      if ([PR, PO].indexOf(next) !== -1) {
          var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
          while (prevIndex >= 0) {
              var type = classTypes[prevIndex];
              if (type === NU) {
                  return BREAK_NOT_ALLOWED$1;
              }
              else if ([SY, IS].indexOf(type) !== -1) {
                  prevIndex--;
              }
              else {
                  break;
              }
          }
      }
      // LB26 Do not break a Korean syllable.
      if ((JL === current && [JL, JV, H2, H3].indexOf(next) !== -1) ||
          ([JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1) ||
          ([JT, H3].indexOf(current) !== -1 && next === JT)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB27 Treat a Korean Syllable Block the same as ID.
      if ((KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1) ||
          (KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB28 Do not break between alphabetics (“at”).
      if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB29 Do not break between numeric punctuation and alphabetics (“e.g.”).
      if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB30 Do not break between letters, numbers, or ordinary symbols and opening or closing parentheses.
      if ((ALPHABETICS.concat(NU).indexOf(current) !== -1 &&
          next === OP &&
          ea_OP.indexOf(codePoints[afterIndex]) === -1) ||
          (ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP)) {
          return BREAK_NOT_ALLOWED$1;
      }
      // LB30a Break between two regional indicator symbols if and only if there are an even number of regional
      // indicators preceding the position of the break.
      if (current === RI$1 && next === RI$1) {
          var i = indicies[currentIndex];
          var count = 1;
          while (i > 0) {
              i--;
              if (classTypes[i] === RI$1) {
                  count++;
              }
              else {
                  break;
              }
          }
          if (count % 2 !== 0) {
              return BREAK_NOT_ALLOWED$1;
          }
      }
      // LB30b Do not break between an emoji base and an emoji modifier.
      if (current === EB && next === EM) {
          return BREAK_NOT_ALLOWED$1;
      }
      return BREAK_ALLOWED$1;
  };
  var cssFormattedClasses = function (codePoints, options) {
      if (!options) {
          options = { lineBreak: 'normal', wordBreak: 'normal' };
      }
      var _a = codePointsToCharacterClasses(codePoints, options.lineBreak), indicies = _a[0], classTypes = _a[1], isLetterNumber = _a[2];
      if (options.wordBreak === 'break-all' || options.wordBreak === 'break-word') {
          classTypes = classTypes.map(function (type) { return ([NU, AL, SA].indexOf(type) !== -1 ? ID : type); });
      }
      var forbiddenBreakpoints = options.wordBreak === 'keep-all'
          ? isLetterNumber.map(function (letterNumber, i) {
              return letterNumber && codePoints[i] >= 0x4e00 && codePoints[i] <= 0x9fff;
          })
          : undefined;
      return [indicies, classTypes, forbiddenBreakpoints];
  };
  var Break = /** @class */ (function () {
      function Break(codePoints, lineBreak, start, end) {
          this.codePoints = codePoints;
          this.required = lineBreak === BREAK_MANDATORY;
          this.start = start;
          this.end = end;
      }
      Break.prototype.slice = function () {
          return fromCodePoint$1.apply(void 0, this.codePoints.slice(this.start, this.end));
      };
      return Break;
  }());
  var LineBreaker = function (str, options) {
      var codePoints = toCodePoints$1(str);
      var _a = cssFormattedClasses(codePoints, options), indicies = _a[0], classTypes = _a[1], forbiddenBreakpoints = _a[2];
      var length = codePoints.length;
      var lastEnd = 0;
      var nextIndex = 0;
      return {
          next: function () {
              if (nextIndex >= length) {
                  return { done: true, value: null };
              }
              var lineBreak = BREAK_NOT_ALLOWED$1;
              while (nextIndex < length &&
                  (lineBreak = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) ===
                      BREAK_NOT_ALLOWED$1) { }
              if (lineBreak !== BREAK_NOT_ALLOWED$1 || nextIndex === length) {
                  var value = new Break(codePoints, lineBreak, lastEnd, nextIndex);
                  lastEnd = nextIndex;
                  return { value: value, done: false };
              }
              return { done: true, value: null };
          },
      };
  };

  // https://www.w3.org/TR/css-syntax-3
  var FLAG_UNRESTRICTED = 1 << 0;
  var FLAG_ID = 1 << 1;
  var FLAG_INTEGER = 1 << 2;
  var FLAG_NUMBER = 1 << 3;
  var LINE_FEED = 0x000a;
  var SOLIDUS = 0x002f;
  var REVERSE_SOLIDUS = 0x005c;
  var CHARACTER_TABULATION = 0x0009;
  var SPACE = 0x0020;
  var QUOTATION_MARK = 0x0022;
  var EQUALS_SIGN = 0x003d;
  var NUMBER_SIGN = 0x0023;
  var DOLLAR_SIGN = 0x0024;
  var PERCENTAGE_SIGN = 0x0025;
  var APOSTROPHE = 0x0027;
  var LEFT_PARENTHESIS = 0x0028;
  var RIGHT_PARENTHESIS = 0x0029;
  var LOW_LINE = 0x005f;
  var HYPHEN_MINUS = 0x002d;
  var EXCLAMATION_MARK = 0x0021;
  var LESS_THAN_SIGN = 0x003c;
  var GREATER_THAN_SIGN = 0x003e;
  var COMMERCIAL_AT = 0x0040;
  var LEFT_SQUARE_BRACKET = 0x005b;
  var RIGHT_SQUARE_BRACKET = 0x005d;
  var CIRCUMFLEX_ACCENT = 0x003d;
  var LEFT_CURLY_BRACKET = 0x007b;
  var QUESTION_MARK = 0x003f;
  var RIGHT_CURLY_BRACKET = 0x007d;
  var VERTICAL_LINE = 0x007c;
  var TILDE = 0x007e;
  var CONTROL = 0x0080;
  var REPLACEMENT_CHARACTER = 0xfffd;
  var ASTERISK = 0x002a;
  var PLUS_SIGN = 0x002b;
  var COMMA = 0x002c;
  var COLON = 0x003a;
  var SEMICOLON = 0x003b;
  var FULL_STOP = 0x002e;
  var NULL = 0x0000;
  var BACKSPACE = 0x0008;
  var LINE_TABULATION = 0x000b;
  var SHIFT_OUT = 0x000e;
  var INFORMATION_SEPARATOR_ONE = 0x001f;
  var DELETE = 0x007f;
  var EOF = -1;
  var ZERO = 0x0030;
  var a = 0x0061;
  var e = 0x0065;
  var f = 0x0066;
  var u = 0x0075;
  var z = 0x007a;
  var A = 0x0041;
  var E = 0x0045;
  var F = 0x0046;
  var U = 0x0055;
  var Z = 0x005a;
  var isDigit = function (codePoint) { return codePoint >= ZERO && codePoint <= 0x0039; };
  var isSurrogateCodePoint = function (codePoint) { return codePoint >= 0xd800 && codePoint <= 0xdfff; };
  var isHex = function (codePoint) {
      return isDigit(codePoint) || (codePoint >= A && codePoint <= F) || (codePoint >= a && codePoint <= f);
  };
  var isLowerCaseLetter = function (codePoint) { return codePoint >= a && codePoint <= z; };
  var isUpperCaseLetter = function (codePoint) { return codePoint >= A && codePoint <= Z; };
  var isLetter = function (codePoint) { return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint); };
  var isNonASCIICodePoint = function (codePoint) { return codePoint >= CONTROL; };
  var isWhiteSpace = function (codePoint) {
      return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE;
  };
  var isNameStartCodePoint = function (codePoint) {
      return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
  };
  var isNameCodePoint = function (codePoint) {
      return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
  };
  var isNonPrintableCodePoint = function (codePoint) {
      return ((codePoint >= NULL && codePoint <= BACKSPACE) ||
          codePoint === LINE_TABULATION ||
          (codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE) ||
          codePoint === DELETE);
  };
  var isValidEscape = function (c1, c2) {
      if (c1 !== REVERSE_SOLIDUS) {
          return false;
      }
      return c2 !== LINE_FEED;
  };
  var isIdentifierStart = function (c1, c2, c3) {
      if (c1 === HYPHEN_MINUS) {
          return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
      }
      else if (isNameStartCodePoint(c1)) {
          return true;
      }
      else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
          return true;
      }
      return false;
  };
  var isNumberStart = function (c1, c2, c3) {
      if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
          if (isDigit(c2)) {
              return true;
          }
          return c2 === FULL_STOP && isDigit(c3);
      }
      if (c1 === FULL_STOP) {
          return isDigit(c2);
      }
      return isDigit(c1);
  };
  var stringToNumber = function (codePoints) {
      var c = 0;
      var sign = 1;
      if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
          if (codePoints[c] === HYPHEN_MINUS) {
              sign = -1;
          }
          c++;
      }
      var integers = [];
      while (isDigit(codePoints[c])) {
          integers.push(codePoints[c++]);
      }
      var int = integers.length ? parseInt(fromCodePoint$1.apply(void 0, integers), 10) : 0;
      if (codePoints[c] === FULL_STOP) {
          c++;
      }
      var fraction = [];
      while (isDigit(codePoints[c])) {
          fraction.push(codePoints[c++]);
      }
      var fracd = fraction.length;
      var frac = fracd ? parseInt(fromCodePoint$1.apply(void 0, fraction), 10) : 0;
      if (codePoints[c] === E || codePoints[c] === e) {
          c++;
      }
      var expsign = 1;
      if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
          if (codePoints[c] === HYPHEN_MINUS) {
              expsign = -1;
          }
          c++;
      }
      var exponent = [];
      while (isDigit(codePoints[c])) {
          exponent.push(codePoints[c++]);
      }
      var exp = exponent.length ? parseInt(fromCodePoint$1.apply(void 0, exponent), 10) : 0;
      return sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
  };
  var LEFT_PARENTHESIS_TOKEN = {
      type: 2 /* LEFT_PARENTHESIS_TOKEN */
  };
  var RIGHT_PARENTHESIS_TOKEN = {
      type: 3 /* RIGHT_PARENTHESIS_TOKEN */
  };
  var COMMA_TOKEN = { type: 4 /* COMMA_TOKEN */ };
  var SUFFIX_MATCH_TOKEN = { type: 13 /* SUFFIX_MATCH_TOKEN */ };
  var PREFIX_MATCH_TOKEN = { type: 8 /* PREFIX_MATCH_TOKEN */ };
  var COLUMN_TOKEN = { type: 21 /* COLUMN_TOKEN */ };
  var DASH_MATCH_TOKEN = { type: 9 /* DASH_MATCH_TOKEN */ };
  var INCLUDE_MATCH_TOKEN = { type: 10 /* INCLUDE_MATCH_TOKEN */ };
  var LEFT_CURLY_BRACKET_TOKEN = {
      type: 11 /* LEFT_CURLY_BRACKET_TOKEN */
  };
  var RIGHT_CURLY_BRACKET_TOKEN = {
      type: 12 /* RIGHT_CURLY_BRACKET_TOKEN */
  };
  var SUBSTRING_MATCH_TOKEN = { type: 14 /* SUBSTRING_MATCH_TOKEN */ };
  var BAD_URL_TOKEN = { type: 23 /* BAD_URL_TOKEN */ };
  var BAD_STRING_TOKEN = { type: 1 /* BAD_STRING_TOKEN */ };
  var CDO_TOKEN = { type: 25 /* CDO_TOKEN */ };
  var CDC_TOKEN = { type: 24 /* CDC_TOKEN */ };
  var COLON_TOKEN = { type: 26 /* COLON_TOKEN */ };
  var SEMICOLON_TOKEN = { type: 27 /* SEMICOLON_TOKEN */ };
  var LEFT_SQUARE_BRACKET_TOKEN = {
      type: 28 /* LEFT_SQUARE_BRACKET_TOKEN */
  };
  var RIGHT_SQUARE_BRACKET_TOKEN = {
      type: 29 /* RIGHT_SQUARE_BRACKET_TOKEN */
  };
  var WHITESPACE_TOKEN = { type: 31 /* WHITESPACE_TOKEN */ };
  var EOF_TOKEN = { type: 32 /* EOF_TOKEN */ };
  var Tokenizer = /** @class */ (function () {
      function Tokenizer() {
          this._value = [];
      }
      Tokenizer.prototype.write = function (chunk) {
          this._value = this._value.concat(toCodePoints$1(chunk));
      };
      Tokenizer.prototype.read = function () {
          var tokens = [];
          var token = this.consumeToken();
          while (token !== EOF_TOKEN) {
              tokens.push(token);
              token = this.consumeToken();
          }
          return tokens;
      };
      Tokenizer.prototype.consumeToken = function () {
          var codePoint = this.consumeCodePoint();
          switch (codePoint) {
              case QUOTATION_MARK:
                  return this.consumeStringToken(QUOTATION_MARK);
              case NUMBER_SIGN:
                  var c1 = this.peekCodePoint(0);
                  var c2 = this.peekCodePoint(1);
                  var c3 = this.peekCodePoint(2);
                  if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
                      var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
                      var value = this.consumeName();
                      return { type: 5 /* HASH_TOKEN */, value: value, flags: flags };
                  }
                  break;
              case DOLLAR_SIGN:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return SUFFIX_MATCH_TOKEN;
                  }
                  break;
              case APOSTROPHE:
                  return this.consumeStringToken(APOSTROPHE);
              case LEFT_PARENTHESIS:
                  return LEFT_PARENTHESIS_TOKEN;
              case RIGHT_PARENTHESIS:
                  return RIGHT_PARENTHESIS_TOKEN;
              case ASTERISK:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return SUBSTRING_MATCH_TOKEN;
                  }
                  break;
              case PLUS_SIGN:
                  if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeNumericToken();
                  }
                  break;
              case COMMA:
                  return COMMA_TOKEN;
              case HYPHEN_MINUS:
                  var e1 = codePoint;
                  var e2 = this.peekCodePoint(0);
                  var e3 = this.peekCodePoint(1);
                  if (isNumberStart(e1, e2, e3)) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeNumericToken();
                  }
                  if (isIdentifierStart(e1, e2, e3)) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeIdentLikeToken();
                  }
                  if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
                      this.consumeCodePoint();
                      this.consumeCodePoint();
                      return CDC_TOKEN;
                  }
                  break;
              case FULL_STOP:
                  if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeNumericToken();
                  }
                  break;
              case SOLIDUS:
                  if (this.peekCodePoint(0) === ASTERISK) {
                      this.consumeCodePoint();
                      while (true) {
                          var c = this.consumeCodePoint();
                          if (c === ASTERISK) {
                              c = this.consumeCodePoint();
                              if (c === SOLIDUS) {
                                  return this.consumeToken();
                              }
                          }
                          if (c === EOF) {
                              return this.consumeToken();
                          }
                      }
                  }
                  break;
              case COLON:
                  return COLON_TOKEN;
              case SEMICOLON:
                  return SEMICOLON_TOKEN;
              case LESS_THAN_SIGN:
                  if (this.peekCodePoint(0) === EXCLAMATION_MARK &&
                      this.peekCodePoint(1) === HYPHEN_MINUS &&
                      this.peekCodePoint(2) === HYPHEN_MINUS) {
                      this.consumeCodePoint();
                      this.consumeCodePoint();
                      return CDO_TOKEN;
                  }
                  break;
              case COMMERCIAL_AT:
                  var a1 = this.peekCodePoint(0);
                  var a2 = this.peekCodePoint(1);
                  var a3 = this.peekCodePoint(2);
                  if (isIdentifierStart(a1, a2, a3)) {
                      var value = this.consumeName();
                      return { type: 7 /* AT_KEYWORD_TOKEN */, value: value };
                  }
                  break;
              case LEFT_SQUARE_BRACKET:
                  return LEFT_SQUARE_BRACKET_TOKEN;
              case REVERSE_SOLIDUS:
                  if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                      this.reconsumeCodePoint(codePoint);
                      return this.consumeIdentLikeToken();
                  }
                  break;
              case RIGHT_SQUARE_BRACKET:
                  return RIGHT_SQUARE_BRACKET_TOKEN;
              case CIRCUMFLEX_ACCENT:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return PREFIX_MATCH_TOKEN;
                  }
                  break;
              case LEFT_CURLY_BRACKET:
                  return LEFT_CURLY_BRACKET_TOKEN;
              case RIGHT_CURLY_BRACKET:
                  return RIGHT_CURLY_BRACKET_TOKEN;
              case u:
              case U:
                  var u1 = this.peekCodePoint(0);
                  var u2 = this.peekCodePoint(1);
                  if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
                      this.consumeCodePoint();
                      this.consumeUnicodeRangeToken();
                  }
                  this.reconsumeCodePoint(codePoint);
                  return this.consumeIdentLikeToken();
              case VERTICAL_LINE:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return DASH_MATCH_TOKEN;
                  }
                  if (this.peekCodePoint(0) === VERTICAL_LINE) {
                      this.consumeCodePoint();
                      return COLUMN_TOKEN;
                  }
                  break;
              case TILDE:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                      this.consumeCodePoint();
                      return INCLUDE_MATCH_TOKEN;
                  }
                  break;
              case EOF:
                  return EOF_TOKEN;
          }
          if (isWhiteSpace(codePoint)) {
              this.consumeWhiteSpace();
              return WHITESPACE_TOKEN;
          }
          if (isDigit(codePoint)) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeNumericToken();
          }
          if (isNameStartCodePoint(codePoint)) {
              this.reconsumeCodePoint(codePoint);
              return this.consumeIdentLikeToken();
          }
          return { type: 6 /* DELIM_TOKEN */, value: fromCodePoint$1(codePoint) };
      };
      Tokenizer.prototype.consumeCodePoint = function () {
          var value = this._value.shift();
          return typeof value === 'undefined' ? -1 : value;
      };
      Tokenizer.prototype.reconsumeCodePoint = function (codePoint) {
          this._value.unshift(codePoint);
      };
      Tokenizer.prototype.peekCodePoint = function (delta) {
          if (delta >= this._value.length) {
              return -1;
          }
          return this._value[delta];
      };
      Tokenizer.prototype.consumeUnicodeRangeToken = function () {
          var digits = [];
          var codePoint = this.consumeCodePoint();
          while (isHex(codePoint) && digits.length < 6) {
              digits.push(codePoint);
              codePoint = this.consumeCodePoint();
          }
          var questionMarks = false;
          while (codePoint === QUESTION_MARK && digits.length < 6) {
              digits.push(codePoint);
              codePoint = this.consumeCodePoint();
              questionMarks = true;
          }
          if (questionMarks) {
              var start_1 = parseInt(fromCodePoint$1.apply(void 0, digits.map(function (digit) { return (digit === QUESTION_MARK ? ZERO : digit); })), 16);
              var end = parseInt(fromCodePoint$1.apply(void 0, digits.map(function (digit) { return (digit === QUESTION_MARK ? F : digit); })), 16);
              return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start_1, end: end };
          }
          var start = parseInt(fromCodePoint$1.apply(void 0, digits), 16);
          if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
              this.consumeCodePoint();
              codePoint = this.consumeCodePoint();
              var endDigits = [];
              while (isHex(codePoint) && endDigits.length < 6) {
                  endDigits.push(codePoint);
                  codePoint = this.consumeCodePoint();
              }
              var end = parseInt(fromCodePoint$1.apply(void 0, endDigits), 16);
              return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start, end: end };
          }
          else {
              return { type: 30 /* UNICODE_RANGE_TOKEN */, start: start, end: start };
          }
      };
      Tokenizer.prototype.consumeIdentLikeToken = function () {
          var value = this.consumeName();
          if (value.toLowerCase() === 'url' && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
              this.consumeCodePoint();
              return this.consumeUrlToken();
          }
          else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
              this.consumeCodePoint();
              return { type: 19 /* FUNCTION_TOKEN */, value: value };
          }
          return { type: 20 /* IDENT_TOKEN */, value: value };
      };
      Tokenizer.prototype.consumeUrlToken = function () {
          var value = [];
          this.consumeWhiteSpace();
          if (this.peekCodePoint(0) === EOF) {
              return { type: 22 /* URL_TOKEN */, value: '' };
          }
          var next = this.peekCodePoint(0);
          if (next === APOSTROPHE || next === QUOTATION_MARK) {
              var stringToken = this.consumeStringToken(this.consumeCodePoint());
              if (stringToken.type === 0 /* STRING_TOKEN */) {
                  this.consumeWhiteSpace();
                  if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                      this.consumeCodePoint();
                      return { type: 22 /* URL_TOKEN */, value: stringToken.value };
                  }
              }
              this.consumeBadUrlRemnants();
              return BAD_URL_TOKEN;
          }
          while (true) {
              var codePoint = this.consumeCodePoint();
              if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
                  return { type: 22 /* URL_TOKEN */, value: fromCodePoint$1.apply(void 0, value) };
              }
              else if (isWhiteSpace(codePoint)) {
                  this.consumeWhiteSpace();
                  if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                      this.consumeCodePoint();
                      return { type: 22 /* URL_TOKEN */, value: fromCodePoint$1.apply(void 0, value) };
                  }
                  this.consumeBadUrlRemnants();
                  return BAD_URL_TOKEN;
              }
              else if (codePoint === QUOTATION_MARK ||
                  codePoint === APOSTROPHE ||
                  codePoint === LEFT_PARENTHESIS ||
                  isNonPrintableCodePoint(codePoint)) {
                  this.consumeBadUrlRemnants();
                  return BAD_URL_TOKEN;
              }
              else if (codePoint === REVERSE_SOLIDUS) {
                  if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                      value.push(this.consumeEscapedCodePoint());
                  }
                  else {
                      this.consumeBadUrlRemnants();
                      return BAD_URL_TOKEN;
                  }
              }
              else {
                  value.push(codePoint);
              }
          }
      };
      Tokenizer.prototype.consumeWhiteSpace = function () {
          while (isWhiteSpace(this.peekCodePoint(0))) {
              this.consumeCodePoint();
          }
      };
      Tokenizer.prototype.consumeBadUrlRemnants = function () {
          while (true) {
              var codePoint = this.consumeCodePoint();
              if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
                  return;
              }
              if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                  this.consumeEscapedCodePoint();
              }
          }
      };
      Tokenizer.prototype.consumeStringSlice = function (count) {
          var SLICE_STACK_SIZE = 50000;
          var value = '';
          while (count > 0) {
              var amount = Math.min(SLICE_STACK_SIZE, count);
              value += fromCodePoint$1.apply(void 0, this._value.splice(0, amount));
              count -= amount;
          }
          this._value.shift();
          return value;
      };
      Tokenizer.prototype.consumeStringToken = function (endingCodePoint) {
          var value = '';
          var i = 0;
          do {
              var codePoint = this._value[i];
              if (codePoint === EOF || codePoint === undefined || codePoint === endingCodePoint) {
                  value += this.consumeStringSlice(i);
                  return { type: 0 /* STRING_TOKEN */, value: value };
              }
              if (codePoint === LINE_FEED) {
                  this._value.splice(0, i);
                  return BAD_STRING_TOKEN;
              }
              if (codePoint === REVERSE_SOLIDUS) {
                  var next = this._value[i + 1];
                  if (next !== EOF && next !== undefined) {
                      if (next === LINE_FEED) {
                          value += this.consumeStringSlice(i);
                          i = -1;
                          this._value.shift();
                      }
                      else if (isValidEscape(codePoint, next)) {
                          value += this.consumeStringSlice(i);
                          value += fromCodePoint$1(this.consumeEscapedCodePoint());
                          i = -1;
                      }
                  }
              }
              i++;
          } while (true);
      };
      Tokenizer.prototype.consumeNumber = function () {
          var repr = [];
          var type = FLAG_INTEGER;
          var c1 = this.peekCodePoint(0);
          if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
              repr.push(this.consumeCodePoint());
          }
          while (isDigit(this.peekCodePoint(0))) {
              repr.push(this.consumeCodePoint());
          }
          c1 = this.peekCodePoint(0);
          var c2 = this.peekCodePoint(1);
          if (c1 === FULL_STOP && isDigit(c2)) {
              repr.push(this.consumeCodePoint(), this.consumeCodePoint());
              type = FLAG_NUMBER;
              while (isDigit(this.peekCodePoint(0))) {
                  repr.push(this.consumeCodePoint());
              }
          }
          c1 = this.peekCodePoint(0);
          c2 = this.peekCodePoint(1);
          var c3 = this.peekCodePoint(2);
          if ((c1 === E || c1 === e) && (((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3)) || isDigit(c2))) {
              repr.push(this.consumeCodePoint(), this.consumeCodePoint());
              type = FLAG_NUMBER;
              while (isDigit(this.peekCodePoint(0))) {
                  repr.push(this.consumeCodePoint());
              }
          }
          return [stringToNumber(repr), type];
      };
      Tokenizer.prototype.consumeNumericToken = function () {
          var _a = this.consumeNumber(), number = _a[0], flags = _a[1];
          var c1 = this.peekCodePoint(0);
          var c2 = this.peekCodePoint(1);
          var c3 = this.peekCodePoint(2);
          if (isIdentifierStart(c1, c2, c3)) {
              var unit = this.consumeName();
              return { type: 15 /* DIMENSION_TOKEN */, number: number, flags: flags, unit: unit };
          }
          if (c1 === PERCENTAGE_SIGN) {
              this.consumeCodePoint();
              return { type: 16 /* PERCENTAGE_TOKEN */, number: number, flags: flags };
          }
          return { type: 17 /* NUMBER_TOKEN */, number: number, flags: flags };
      };
      Tokenizer.prototype.consumeEscapedCodePoint = function () {
          var codePoint = this.consumeCodePoint();
          if (isHex(codePoint)) {
              var hex = fromCodePoint$1(codePoint);
              while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
                  hex += fromCodePoint$1(this.consumeCodePoint());
              }
              if (isWhiteSpace(this.peekCodePoint(0))) {
                  this.consumeCodePoint();
              }
              var hexCodePoint = parseInt(hex, 16);
              if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 0x10ffff) {
                  return REPLACEMENT_CHARACTER;
              }
              return hexCodePoint;
          }
          if (codePoint === EOF) {
              return REPLACEMENT_CHARACTER;
          }
          return codePoint;
      };
      Tokenizer.prototype.consumeName = function () {
          var result = '';
          while (true) {
              var codePoint = this.consumeCodePoint();
              if (isNameCodePoint(codePoint)) {
                  result += fromCodePoint$1(codePoint);
              }
              else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                  result += fromCodePoint$1(this.consumeEscapedCodePoint());
              }
              else {
                  this.reconsumeCodePoint(codePoint);
                  return result;
              }
          }
      };
      return Tokenizer;
  }());

  var Parser = /** @class */ (function () {
      function Parser(tokens) {
          this._tokens = tokens;
      }
      Parser.create = function (value) {
          var tokenizer = new Tokenizer();
          tokenizer.write(value);
          return new Parser(tokenizer.read());
      };
      Parser.parseValue = function (value) {
          return Parser.create(value).parseComponentValue();
      };
      Parser.parseValues = function (value) {
          return Parser.create(value).parseComponentValues();
      };
      Parser.prototype.parseComponentValue = function () {
          var token = this.consumeToken();
          while (token.type === 31 /* WHITESPACE_TOKEN */) {
              token = this.consumeToken();
          }
          if (token.type === 32 /* EOF_TOKEN */) {
              throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
          }
          this.reconsumeToken(token);
          var value = this.consumeComponentValue();
          do {
              token = this.consumeToken();
          } while (token.type === 31 /* WHITESPACE_TOKEN */);
          if (token.type === 32 /* EOF_TOKEN */) {
              return value;
          }
          throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
      };
      Parser.prototype.parseComponentValues = function () {
          var values = [];
          while (true) {
              var value = this.consumeComponentValue();
              if (value.type === 32 /* EOF_TOKEN */) {
                  return values;
              }
              values.push(value);
              values.push();
          }
      };
      Parser.prototype.consumeComponentValue = function () {
          var token = this.consumeToken();
          switch (token.type) {
              case 11 /* LEFT_CURLY_BRACKET_TOKEN */:
              case 28 /* LEFT_SQUARE_BRACKET_TOKEN */:
              case 2 /* LEFT_PARENTHESIS_TOKEN */:
                  return this.consumeSimpleBlock(token.type);
              case 19 /* FUNCTION_TOKEN */:
                  return this.consumeFunction(token);
          }
          return token;
      };
      Parser.prototype.consumeSimpleBlock = function (type) {
          var block = { type: type, values: [] };
          var token = this.consumeToken();
          while (true) {
              if (token.type === 32 /* EOF_TOKEN */ || isEndingTokenFor(token, type)) {
                  return block;
              }
              this.reconsumeToken(token);
              block.values.push(this.consumeComponentValue());
              token = this.consumeToken();
          }
      };
      Parser.prototype.consumeFunction = function (functionToken) {
          var cssFunction = {
              name: functionToken.value,
              values: [],
              type: 18 /* FUNCTION */
          };
          while (true) {
              var token = this.consumeToken();
              if (token.type === 32 /* EOF_TOKEN */ || token.type === 3 /* RIGHT_PARENTHESIS_TOKEN */) {
                  return cssFunction;
              }
              this.reconsumeToken(token);
              cssFunction.values.push(this.consumeComponentValue());
          }
      };
      Parser.prototype.consumeToken = function () {
          var token = this._tokens.shift();
          return typeof token === 'undefined' ? EOF_TOKEN : token;
      };
      Parser.prototype.reconsumeToken = function (token) {
          this._tokens.unshift(token);
      };
      return Parser;
  }());
  var isDimensionToken = function (token) { return token.type === 15 /* DIMENSION_TOKEN */; };
  var isNumberToken = function (token) { return token.type === 17 /* NUMBER_TOKEN */; };
  var isIdentToken = function (token) { return token.type === 20 /* IDENT_TOKEN */; };
  var isStringToken = function (token) { return token.type === 0 /* STRING_TOKEN */; };
  var isIdentWithValue = function (token, value) {
      return isIdentToken(token) && token.value === value;
  };
  var nonWhiteSpace = function (token) { return token.type !== 31 /* WHITESPACE_TOKEN */; };
  var nonFunctionArgSeparator = function (token) {
      return token.type !== 31 /* WHITESPACE_TOKEN */ && token.type !== 4 /* COMMA_TOKEN */;
  };
  var parseFunctionArgs = function (tokens) {
      var args = [];
      var arg = [];
      tokens.forEach(function (token) {
          if (token.type === 4 /* COMMA_TOKEN */) {
              if (arg.length === 0) {
                  throw new Error("Error parsing function args, zero tokens for arg");
              }
              args.push(arg);
              arg = [];
              return;
          }
          if (token.type !== 31 /* WHITESPACE_TOKEN */) {
              arg.push(token);
          }
      });
      if (arg.length) {
          args.push(arg);
      }
      return args;
  };
  var isEndingTokenFor = function (token, type) {
      if (type === 11 /* LEFT_CURLY_BRACKET_TOKEN */ && token.type === 12 /* RIGHT_CURLY_BRACKET_TOKEN */) {
          return true;
      }
      if (type === 28 /* LEFT_SQUARE_BRACKET_TOKEN */ && token.type === 29 /* RIGHT_SQUARE_BRACKET_TOKEN */) {
          return true;
      }
      return type === 2 /* LEFT_PARENTHESIS_TOKEN */ && token.type === 3 /* RIGHT_PARENTHESIS_TOKEN */;
  };

  var isLength = function (token) {
      return token.type === 17 /* NUMBER_TOKEN */ || token.type === 15 /* DIMENSION_TOKEN */;
  };

  var isLengthPercentage = function (token) {
      return token.type === 16 /* PERCENTAGE_TOKEN */ || isLength(token);
  };
  var parseLengthPercentageTuple = function (tokens) {
      return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
  };
  var ZERO_LENGTH = {
      type: 17 /* NUMBER_TOKEN */,
      number: 0,
      flags: FLAG_INTEGER
  };
  var FIFTY_PERCENT = {
      type: 16 /* PERCENTAGE_TOKEN */,
      number: 50,
      flags: FLAG_INTEGER
  };
  var HUNDRED_PERCENT = {
      type: 16 /* PERCENTAGE_TOKEN */,
      number: 100,
      flags: FLAG_INTEGER
  };
  var getAbsoluteValueForTuple = function (tuple, width, height) {
      var x = tuple[0], y = tuple[1];
      return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== 'undefined' ? y : x, height)];
  };
  var getAbsoluteValue = function (token, parent) {
      if (token.type === 16 /* PERCENTAGE_TOKEN */) {
          return (token.number / 100) * parent;
      }
      if (isDimensionToken(token)) {
          switch (token.unit) {
              case 'rem':
              case 'em':
                  return 16 * token.number; // TODO use correct font-size
              case 'px':
              default:
                  return token.number;
          }
      }
      return token.number;
  };

  var DEG = 'deg';
  var GRAD = 'grad';
  var RAD = 'rad';
  var TURN = 'turn';
  var angle = {
      name: 'angle',
      parse: function (_context, value) {
          if (value.type === 15 /* DIMENSION_TOKEN */) {
              switch (value.unit) {
                  case DEG:
                      return (Math.PI * value.number) / 180;
                  case GRAD:
                      return (Math.PI / 200) * value.number;
                  case RAD:
                      return value.number;
                  case TURN:
                      return Math.PI * 2 * value.number;
              }
          }
          throw new Error("Unsupported angle type");
      }
  };
  var isAngle = function (value) {
      if (value.type === 15 /* DIMENSION_TOKEN */) {
          if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
              return true;
          }
      }
      return false;
  };
  var parseNamedSide = function (tokens) {
      var sideOrCorner = tokens
          .filter(isIdentToken)
          .map(function (ident) { return ident.value; })
          .join(' ');
      switch (sideOrCorner) {
          case 'to bottom right':
          case 'to right bottom':
          case 'left top':
          case 'top left':
              return [ZERO_LENGTH, ZERO_LENGTH];
          case 'to top':
          case 'bottom':
              return deg(0);
          case 'to bottom left':
          case 'to left bottom':
          case 'right top':
          case 'top right':
              return [ZERO_LENGTH, HUNDRED_PERCENT];
          case 'to right':
          case 'left':
              return deg(90);
          case 'to top left':
          case 'to left top':
          case 'right bottom':
          case 'bottom right':
              return [HUNDRED_PERCENT, HUNDRED_PERCENT];
          case 'to bottom':
          case 'top':
              return deg(180);
          case 'to top right':
          case 'to right top':
          case 'left bottom':
          case 'bottom left':
              return [HUNDRED_PERCENT, ZERO_LENGTH];
          case 'to left':
          case 'right':
              return deg(270);
      }
      return 0;
  };
  var deg = function (deg) { return (Math.PI * deg) / 180; };

  var color$1 = {
      name: 'color',
      parse: function (context, value) {
          if (value.type === 18 /* FUNCTION */) {
              var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
              if (typeof colorFunction === 'undefined') {
                  throw new Error("Attempting to parse an unsupported color function \"" + value.name + "\"");
              }
              return colorFunction(context, value.values);
          }
          if (value.type === 5 /* HASH_TOKEN */) {
              if (value.value.length === 3) {
                  var r = value.value.substring(0, 1);
                  var g = value.value.substring(1, 2);
                  var b = value.value.substring(2, 3);
                  return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
              }
              if (value.value.length === 4) {
                  var r = value.value.substring(0, 1);
                  var g = value.value.substring(1, 2);
                  var b = value.value.substring(2, 3);
                  var a = value.value.substring(3, 4);
                  return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a + a, 16) / 255);
              }
              if (value.value.length === 6) {
                  var r = value.value.substring(0, 2);
                  var g = value.value.substring(2, 4);
                  var b = value.value.substring(4, 6);
                  return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
              }
              if (value.value.length === 8) {
                  var r = value.value.substring(0, 2);
                  var g = value.value.substring(2, 4);
                  var b = value.value.substring(4, 6);
                  var a = value.value.substring(6, 8);
                  return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a, 16) / 255);
              }
          }
          if (value.type === 20 /* IDENT_TOKEN */) {
              var namedColor = COLORS[value.value.toUpperCase()];
              if (typeof namedColor !== 'undefined') {
                  return namedColor;
              }
          }
          return COLORS.TRANSPARENT;
      }
  };
  var isTransparent = function (color) { return (0xff & color) === 0; };
  var asString = function (color) {
      var alpha = 0xff & color;
      var blue = 0xff & (color >> 8);
      var green = 0xff & (color >> 16);
      var red = 0xff & (color >> 24);
      return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
  };
  var pack = function (r, g, b, a) {
      return ((r << 24) | (g << 16) | (b << 8) | (Math.round(a * 255) << 0)) >>> 0;
  };
  var getTokenColorValue = function (token, i) {
      if (token.type === 17 /* NUMBER_TOKEN */) {
          return token.number;
      }
      if (token.type === 16 /* PERCENTAGE_TOKEN */) {
          var max = i === 3 ? 1 : 255;
          return i === 3 ? (token.number / 100) * max : Math.round((token.number / 100) * max);
      }
      return 0;
  };
  var rgb = function (_context, args) {
      var tokens = args.filter(nonFunctionArgSeparator);
      if (tokens.length === 3) {
          var _a = tokens.map(getTokenColorValue), r = _a[0], g = _a[1], b = _a[2];
          return pack(r, g, b, 1);
      }
      if (tokens.length === 4) {
          var _b = tokens.map(getTokenColorValue), r = _b[0], g = _b[1], b = _b[2], a = _b[3];
          return pack(r, g, b, a);
      }
      return 0;
  };
  function hue2rgb(t1, t2, hue) {
      if (hue < 0) {
          hue += 1;
      }
      if (hue >= 1) {
          hue -= 1;
      }
      if (hue < 1 / 6) {
          return (t2 - t1) * hue * 6 + t1;
      }
      else if (hue < 1 / 2) {
          return t2;
      }
      else if (hue < 2 / 3) {
          return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
      }
      else {
          return t1;
      }
  }
  var hsl = function (context, args) {
      var tokens = args.filter(nonFunctionArgSeparator);
      var hue = tokens[0], saturation = tokens[1], lightness = tokens[2], alpha = tokens[3];
      var h = (hue.type === 17 /* NUMBER_TOKEN */ ? deg(hue.number) : angle.parse(context, hue)) / (Math.PI * 2);
      var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
      var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
      var a = typeof alpha !== 'undefined' && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
      if (s === 0) {
          return pack(l * 255, l * 255, l * 255, 1);
      }
      var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
      var t1 = l * 2 - t2;
      var r = hue2rgb(t1, t2, h + 1 / 3);
      var g = hue2rgb(t1, t2, h);
      var b = hue2rgb(t1, t2, h - 1 / 3);
      return pack(r * 255, g * 255, b * 255, a);
  };
  var SUPPORTED_COLOR_FUNCTIONS = {
      hsl: hsl,
      hsla: hsl,
      rgb: rgb,
      rgba: rgb
  };
  var parseColor = function (context, value) {
      return color$1.parse(context, Parser.create(value).parseComponentValue());
  };
  var COLORS = {
      ALICEBLUE: 0xf0f8ffff,
      ANTIQUEWHITE: 0xfaebd7ff,
      AQUA: 0x00ffffff,
      AQUAMARINE: 0x7fffd4ff,
      AZURE: 0xf0ffffff,
      BEIGE: 0xf5f5dcff,
      BISQUE: 0xffe4c4ff,
      BLACK: 0x000000ff,
      BLANCHEDALMOND: 0xffebcdff,
      BLUE: 0x0000ffff,
      BLUEVIOLET: 0x8a2be2ff,
      BROWN: 0xa52a2aff,
      BURLYWOOD: 0xdeb887ff,
      CADETBLUE: 0x5f9ea0ff,
      CHARTREUSE: 0x7fff00ff,
      CHOCOLATE: 0xd2691eff,
      CORAL: 0xff7f50ff,
      CORNFLOWERBLUE: 0x6495edff,
      CORNSILK: 0xfff8dcff,
      CRIMSON: 0xdc143cff,
      CYAN: 0x00ffffff,
      DARKBLUE: 0x00008bff,
      DARKCYAN: 0x008b8bff,
      DARKGOLDENROD: 0xb886bbff,
      DARKGRAY: 0xa9a9a9ff,
      DARKGREEN: 0x006400ff,
      DARKGREY: 0xa9a9a9ff,
      DARKKHAKI: 0xbdb76bff,
      DARKMAGENTA: 0x8b008bff,
      DARKOLIVEGREEN: 0x556b2fff,
      DARKORANGE: 0xff8c00ff,
      DARKORCHID: 0x9932ccff,
      DARKRED: 0x8b0000ff,
      DARKSALMON: 0xe9967aff,
      DARKSEAGREEN: 0x8fbc8fff,
      DARKSLATEBLUE: 0x483d8bff,
      DARKSLATEGRAY: 0x2f4f4fff,
      DARKSLATEGREY: 0x2f4f4fff,
      DARKTURQUOISE: 0x00ced1ff,
      DARKVIOLET: 0x9400d3ff,
      DEEPPINK: 0xff1493ff,
      DEEPSKYBLUE: 0x00bfffff,
      DIMGRAY: 0x696969ff,
      DIMGREY: 0x696969ff,
      DODGERBLUE: 0x1e90ffff,
      FIREBRICK: 0xb22222ff,
      FLORALWHITE: 0xfffaf0ff,
      FORESTGREEN: 0x228b22ff,
      FUCHSIA: 0xff00ffff,
      GAINSBORO: 0xdcdcdcff,
      GHOSTWHITE: 0xf8f8ffff,
      GOLD: 0xffd700ff,
      GOLDENROD: 0xdaa520ff,
      GRAY: 0x808080ff,
      GREEN: 0x008000ff,
      GREENYELLOW: 0xadff2fff,
      GREY: 0x808080ff,
      HONEYDEW: 0xf0fff0ff,
      HOTPINK: 0xff69b4ff,
      INDIANRED: 0xcd5c5cff,
      INDIGO: 0x4b0082ff,
      IVORY: 0xfffff0ff,
      KHAKI: 0xf0e68cff,
      LAVENDER: 0xe6e6faff,
      LAVENDERBLUSH: 0xfff0f5ff,
      LAWNGREEN: 0x7cfc00ff,
      LEMONCHIFFON: 0xfffacdff,
      LIGHTBLUE: 0xadd8e6ff,
      LIGHTCORAL: 0xf08080ff,
      LIGHTCYAN: 0xe0ffffff,
      LIGHTGOLDENRODYELLOW: 0xfafad2ff,
      LIGHTGRAY: 0xd3d3d3ff,
      LIGHTGREEN: 0x90ee90ff,
      LIGHTGREY: 0xd3d3d3ff,
      LIGHTPINK: 0xffb6c1ff,
      LIGHTSALMON: 0xffa07aff,
      LIGHTSEAGREEN: 0x20b2aaff,
      LIGHTSKYBLUE: 0x87cefaff,
      LIGHTSLATEGRAY: 0x778899ff,
      LIGHTSLATEGREY: 0x778899ff,
      LIGHTSTEELBLUE: 0xb0c4deff,
      LIGHTYELLOW: 0xffffe0ff,
      LIME: 0x00ff00ff,
      LIMEGREEN: 0x32cd32ff,
      LINEN: 0xfaf0e6ff,
      MAGENTA: 0xff00ffff,
      MAROON: 0x800000ff,
      MEDIUMAQUAMARINE: 0x66cdaaff,
      MEDIUMBLUE: 0x0000cdff,
      MEDIUMORCHID: 0xba55d3ff,
      MEDIUMPURPLE: 0x9370dbff,
      MEDIUMSEAGREEN: 0x3cb371ff,
      MEDIUMSLATEBLUE: 0x7b68eeff,
      MEDIUMSPRINGGREEN: 0x00fa9aff,
      MEDIUMTURQUOISE: 0x48d1ccff,
      MEDIUMVIOLETRED: 0xc71585ff,
      MIDNIGHTBLUE: 0x191970ff,
      MINTCREAM: 0xf5fffaff,
      MISTYROSE: 0xffe4e1ff,
      MOCCASIN: 0xffe4b5ff,
      NAVAJOWHITE: 0xffdeadff,
      NAVY: 0x000080ff,
      OLDLACE: 0xfdf5e6ff,
      OLIVE: 0x808000ff,
      OLIVEDRAB: 0x6b8e23ff,
      ORANGE: 0xffa500ff,
      ORANGERED: 0xff4500ff,
      ORCHID: 0xda70d6ff,
      PALEGOLDENROD: 0xeee8aaff,
      PALEGREEN: 0x98fb98ff,
      PALETURQUOISE: 0xafeeeeff,
      PALEVIOLETRED: 0xdb7093ff,
      PAPAYAWHIP: 0xffefd5ff,
      PEACHPUFF: 0xffdab9ff,
      PERU: 0xcd853fff,
      PINK: 0xffc0cbff,
      PLUM: 0xdda0ddff,
      POWDERBLUE: 0xb0e0e6ff,
      PURPLE: 0x800080ff,
      REBECCAPURPLE: 0x663399ff,
      RED: 0xff0000ff,
      ROSYBROWN: 0xbc8f8fff,
      ROYALBLUE: 0x4169e1ff,
      SADDLEBROWN: 0x8b4513ff,
      SALMON: 0xfa8072ff,
      SANDYBROWN: 0xf4a460ff,
      SEAGREEN: 0x2e8b57ff,
      SEASHELL: 0xfff5eeff,
      SIENNA: 0xa0522dff,
      SILVER: 0xc0c0c0ff,
      SKYBLUE: 0x87ceebff,
      SLATEBLUE: 0x6a5acdff,
      SLATEGRAY: 0x708090ff,
      SLATEGREY: 0x708090ff,
      SNOW: 0xfffafaff,
      SPRINGGREEN: 0x00ff7fff,
      STEELBLUE: 0x4682b4ff,
      TAN: 0xd2b48cff,
      TEAL: 0x008080ff,
      THISTLE: 0xd8bfd8ff,
      TOMATO: 0xff6347ff,
      TRANSPARENT: 0x00000000,
      TURQUOISE: 0x40e0d0ff,
      VIOLET: 0xee82eeff,
      WHEAT: 0xf5deb3ff,
      WHITE: 0xffffffff,
      WHITESMOKE: 0xf5f5f5ff,
      YELLOW: 0xffff00ff,
      YELLOWGREEN: 0x9acd32ff
  };

  var backgroundClip = {
      name: 'background-clip',
      initialValue: 'border-box',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          return tokens.map(function (token) {
              if (isIdentToken(token)) {
                  switch (token.value) {
                      case 'padding-box':
                          return 1 /* PADDING_BOX */;
                      case 'content-box':
                          return 2 /* CONTENT_BOX */;
                  }
              }
              return 0 /* BORDER_BOX */;
          });
      }
  };

  var backgroundColor = {
      name: "background-color",
      initialValue: 'transparent',
      prefix: false,
      type: 3 /* TYPE_VALUE */,
      format: 'color'
  };

  var parseColorStop = function (context, args) {
      var color = color$1.parse(context, args[0]);
      var stop = args[1];
      return stop && isLengthPercentage(stop) ? { color: color, stop: stop } : { color: color, stop: null };
  };
  var processColorStops = function (stops, lineLength) {
      var first = stops[0];
      var last = stops[stops.length - 1];
      if (first.stop === null) {
          first.stop = ZERO_LENGTH;
      }
      if (last.stop === null) {
          last.stop = HUNDRED_PERCENT;
      }
      var processStops = [];
      var previous = 0;
      for (var i = 0; i < stops.length; i++) {
          var stop_1 = stops[i].stop;
          if (stop_1 !== null) {
              var absoluteValue = getAbsoluteValue(stop_1, lineLength);
              if (absoluteValue > previous) {
                  processStops.push(absoluteValue);
              }
              else {
                  processStops.push(previous);
              }
              previous = absoluteValue;
          }
          else {
              processStops.push(null);
          }
      }
      var gapBegin = null;
      for (var i = 0; i < processStops.length; i++) {
          var stop_2 = processStops[i];
          if (stop_2 === null) {
              if (gapBegin === null) {
                  gapBegin = i;
              }
          }
          else if (gapBegin !== null) {
              var gapLength = i - gapBegin;
              var beforeGap = processStops[gapBegin - 1];
              var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
              for (var g = 1; g <= gapLength; g++) {
                  processStops[gapBegin + g - 1] = gapValue * g;
              }
              gapBegin = null;
          }
      }
      return stops.map(function (_a, i) {
          var color = _a.color;
          return { color: color, stop: Math.max(Math.min(1, processStops[i] / lineLength), 0) };
      });
  };
  var getAngleFromCorner = function (corner, width, height) {
      var centerX = width / 2;
      var centerY = height / 2;
      var x = getAbsoluteValue(corner[0], width) - centerX;
      var y = centerY - getAbsoluteValue(corner[1], height);
      return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
  };
  var calculateGradientDirection = function (angle, width, height) {
      var radian = typeof angle === 'number' ? angle : getAngleFromCorner(angle, width, height);
      var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
      var halfWidth = width / 2;
      var halfHeight = height / 2;
      var halfLineLength = lineLength / 2;
      var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
      var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
      return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
  };
  var distance = function (a, b) { return Math.sqrt(a * a + b * b); };
  var findCorner = function (width, height, x, y, closest) {
      var corners = [
          [0, 0],
          [0, height],
          [width, 0],
          [width, height]
      ];
      return corners.reduce(function (stat, corner) {
          var cx = corner[0], cy = corner[1];
          var d = distance(x - cx, y - cy);
          if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
              return {
                  optimumCorner: corner,
                  optimumDistance: d
              };
          }
          return stat;
      }, {
          optimumDistance: closest ? Infinity : -Infinity,
          optimumCorner: null
      }).optimumCorner;
  };
  var calculateRadius = function (gradient, x, y, width, height) {
      var rx = 0;
      var ry = 0;
      switch (gradient.size) {
          case 0 /* CLOSEST_SIDE */:
              // The ending shape is sized so that that it exactly meets the side of the gradient box closest to the gradient’s center.
              // If the shape is an ellipse, it exactly meets the closest side in each dimension.
              if (gradient.shape === 0 /* CIRCLE */) {
                  rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
              }
              else if (gradient.shape === 1 /* ELLIPSE */) {
                  rx = Math.min(Math.abs(x), Math.abs(x - width));
                  ry = Math.min(Math.abs(y), Math.abs(y - height));
              }
              break;
          case 2 /* CLOSEST_CORNER */:
              // The ending shape is sized so that that it passes through the corner of the gradient box closest to the gradient’s center.
              // If the shape is an ellipse, the ending shape is given the same aspect-ratio it would have if closest-side were specified.
              if (gradient.shape === 0 /* CIRCLE */) {
                  rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
              }
              else if (gradient.shape === 1 /* ELLIPSE */) {
                  // Compute the ratio ry/rx (which is to be the same as for "closest-side")
                  var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
                  var _a = findCorner(width, height, x, y, true), cx = _a[0], cy = _a[1];
                  rx = distance(cx - x, (cy - y) / c);
                  ry = c * rx;
              }
              break;
          case 1 /* FARTHEST_SIDE */:
              // Same as closest-side, except the ending shape is sized based on the farthest side(s)
              if (gradient.shape === 0 /* CIRCLE */) {
                  rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
              }
              else if (gradient.shape === 1 /* ELLIPSE */) {
                  rx = Math.max(Math.abs(x), Math.abs(x - width));
                  ry = Math.max(Math.abs(y), Math.abs(y - height));
              }
              break;
          case 3 /* FARTHEST_CORNER */:
              // Same as closest-corner, except the ending shape is sized based on the farthest corner.
              // If the shape is an ellipse, the ending shape is given the same aspect ratio it would have if farthest-side were specified.
              if (gradient.shape === 0 /* CIRCLE */) {
                  rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
              }
              else if (gradient.shape === 1 /* ELLIPSE */) {
                  // Compute the ratio ry/rx (which is to be the same as for "farthest-side")
                  var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
                  var _b = findCorner(width, height, x, y, false), cx = _b[0], cy = _b[1];
                  rx = distance(cx - x, (cy - y) / c);
                  ry = c * rx;
              }
              break;
      }
      if (Array.isArray(gradient.size)) {
          rx = getAbsoluteValue(gradient.size[0], width);
          ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
      }
      return [rx, ry];
  };

  var linearGradient = function (context, tokens) {
      var angle$1 = deg(180);
      var stops = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          if (i === 0) {
              var firstToken = arg[0];
              if (firstToken.type === 20 /* IDENT_TOKEN */ && firstToken.value === 'to') {
                  angle$1 = parseNamedSide(arg);
                  return;
              }
              else if (isAngle(firstToken)) {
                  angle$1 = angle.parse(context, firstToken);
                  return;
              }
          }
          var colorStop = parseColorStop(context, arg);
          stops.push(colorStop);
      });
      return { angle: angle$1, stops: stops, type: 1 /* LINEAR_GRADIENT */ };
  };

  var prefixLinearGradient = function (context, tokens) {
      var angle$1 = deg(180);
      var stops = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          if (i === 0) {
              var firstToken = arg[0];
              if (firstToken.type === 20 /* IDENT_TOKEN */ &&
                  ['top', 'left', 'right', 'bottom'].indexOf(firstToken.value) !== -1) {
                  angle$1 = parseNamedSide(arg);
                  return;
              }
              else if (isAngle(firstToken)) {
                  angle$1 = (angle.parse(context, firstToken) + deg(270)) % deg(360);
                  return;
              }
          }
          var colorStop = parseColorStop(context, arg);
          stops.push(colorStop);
      });
      return {
          angle: angle$1,
          stops: stops,
          type: 1 /* LINEAR_GRADIENT */
      };
  };

  var webkitGradient = function (context, tokens) {
      var angle = deg(180);
      var stops = [];
      var type = 1 /* LINEAR_GRADIENT */;
      var shape = 0 /* CIRCLE */;
      var size = 3 /* FARTHEST_CORNER */;
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          var firstToken = arg[0];
          if (i === 0) {
              if (isIdentToken(firstToken) && firstToken.value === 'linear') {
                  type = 1 /* LINEAR_GRADIENT */;
                  return;
              }
              else if (isIdentToken(firstToken) && firstToken.value === 'radial') {
                  type = 2 /* RADIAL_GRADIENT */;
                  return;
              }
          }
          if (firstToken.type === 18 /* FUNCTION */) {
              if (firstToken.name === 'from') {
                  var color = color$1.parse(context, firstToken.values[0]);
                  stops.push({ stop: ZERO_LENGTH, color: color });
              }
              else if (firstToken.name === 'to') {
                  var color = color$1.parse(context, firstToken.values[0]);
                  stops.push({ stop: HUNDRED_PERCENT, color: color });
              }
              else if (firstToken.name === 'color-stop') {
                  var values = firstToken.values.filter(nonFunctionArgSeparator);
                  if (values.length === 2) {
                      var color = color$1.parse(context, values[1]);
                      var stop_1 = values[0];
                      if (isNumberToken(stop_1)) {
                          stops.push({
                              stop: { type: 16 /* PERCENTAGE_TOKEN */, number: stop_1.number * 100, flags: stop_1.flags },
                              color: color
                          });
                      }
                  }
              }
          }
      });
      return type === 1 /* LINEAR_GRADIENT */
          ? {
              angle: (angle + deg(180)) % deg(360),
              stops: stops,
              type: type
          }
          : { size: size, shape: shape, stops: stops, position: position, type: type };
  };

  var CLOSEST_SIDE = 'closest-side';
  var FARTHEST_SIDE = 'farthest-side';
  var CLOSEST_CORNER = 'closest-corner';
  var FARTHEST_CORNER = 'farthest-corner';
  var CIRCLE = 'circle';
  var ELLIPSE = 'ellipse';
  var COVER = 'cover';
  var CONTAIN = 'contain';
  var radialGradient = function (context, tokens) {
      var shape = 0 /* CIRCLE */;
      var size = 3 /* FARTHEST_CORNER */;
      var stops = [];
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          var isColorStop = true;
          if (i === 0) {
              var isAtPosition_1 = false;
              isColorStop = arg.reduce(function (acc, token) {
                  if (isAtPosition_1) {
                      if (isIdentToken(token)) {
                          switch (token.value) {
                              case 'center':
                                  position.push(FIFTY_PERCENT);
                                  return acc;
                              case 'top':
                              case 'left':
                                  position.push(ZERO_LENGTH);
                                  return acc;
                              case 'right':
                              case 'bottom':
                                  position.push(HUNDRED_PERCENT);
                                  return acc;
                          }
                      }
                      else if (isLengthPercentage(token) || isLength(token)) {
                          position.push(token);
                      }
                  }
                  else if (isIdentToken(token)) {
                      switch (token.value) {
                          case CIRCLE:
                              shape = 0 /* CIRCLE */;
                              return false;
                          case ELLIPSE:
                              shape = 1 /* ELLIPSE */;
                              return false;
                          case 'at':
                              isAtPosition_1 = true;
                              return false;
                          case CLOSEST_SIDE:
                              size = 0 /* CLOSEST_SIDE */;
                              return false;
                          case COVER:
                          case FARTHEST_SIDE:
                              size = 1 /* FARTHEST_SIDE */;
                              return false;
                          case CONTAIN:
                          case CLOSEST_CORNER:
                              size = 2 /* CLOSEST_CORNER */;
                              return false;
                          case FARTHEST_CORNER:
                              size = 3 /* FARTHEST_CORNER */;
                              return false;
                      }
                  }
                  else if (isLength(token) || isLengthPercentage(token)) {
                      if (!Array.isArray(size)) {
                          size = [];
                      }
                      size.push(token);
                      return false;
                  }
                  return acc;
              }, isColorStop);
          }
          if (isColorStop) {
              var colorStop = parseColorStop(context, arg);
              stops.push(colorStop);
          }
      });
      return { size: size, shape: shape, stops: stops, position: position, type: 2 /* RADIAL_GRADIENT */ };
  };

  var prefixRadialGradient = function (context, tokens) {
      var shape = 0 /* CIRCLE */;
      var size = 3 /* FARTHEST_CORNER */;
      var stops = [];
      var position = [];
      parseFunctionArgs(tokens).forEach(function (arg, i) {
          var isColorStop = true;
          if (i === 0) {
              isColorStop = arg.reduce(function (acc, token) {
                  if (isIdentToken(token)) {
                      switch (token.value) {
                          case 'center':
                              position.push(FIFTY_PERCENT);
                              return false;
                          case 'top':
                          case 'left':
                              position.push(ZERO_LENGTH);
                              return false;
                          case 'right':
                          case 'bottom':
                              position.push(HUNDRED_PERCENT);
                              return false;
                      }
                  }
                  else if (isLengthPercentage(token) || isLength(token)) {
                      position.push(token);
                      return false;
                  }
                  return acc;
              }, isColorStop);
          }
          else if (i === 1) {
              isColorStop = arg.reduce(function (acc, token) {
                  if (isIdentToken(token)) {
                      switch (token.value) {
                          case CIRCLE:
                              shape = 0 /* CIRCLE */;
                              return false;
                          case ELLIPSE:
                              shape = 1 /* ELLIPSE */;
                              return false;
                          case CONTAIN:
                          case CLOSEST_SIDE:
                              size = 0 /* CLOSEST_SIDE */;
                              return false;
                          case FARTHEST_SIDE:
                              size = 1 /* FARTHEST_SIDE */;
                              return false;
                          case CLOSEST_CORNER:
                              size = 2 /* CLOSEST_CORNER */;
                              return false;
                          case COVER:
                          case FARTHEST_CORNER:
                              size = 3 /* FARTHEST_CORNER */;
                              return false;
                      }
                  }
                  else if (isLength(token) || isLengthPercentage(token)) {
                      if (!Array.isArray(size)) {
                          size = [];
                      }
                      size.push(token);
                      return false;
                  }
                  return acc;
              }, isColorStop);
          }
          if (isColorStop) {
              var colorStop = parseColorStop(context, arg);
              stops.push(colorStop);
          }
      });
      return { size: size, shape: shape, stops: stops, position: position, type: 2 /* RADIAL_GRADIENT */ };
  };

  var isLinearGradient = function (background) {
      return background.type === 1 /* LINEAR_GRADIENT */;
  };
  var isRadialGradient = function (background) {
      return background.type === 2 /* RADIAL_GRADIENT */;
  };
  var image = {
      name: 'image',
      parse: function (context, value) {
          if (value.type === 22 /* URL_TOKEN */) {
              var image_1 = { url: value.value, type: 0 /* URL */ };
              context.cache.addImage(value.value);
              return image_1;
          }
          if (value.type === 18 /* FUNCTION */) {
              var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
              if (typeof imageFunction === 'undefined') {
                  throw new Error("Attempting to parse an unsupported image function \"" + value.name + "\"");
              }
              return imageFunction(context, value.values);
          }
          throw new Error("Unsupported image type " + value.type);
      }
  };
  function isSupportedImage(value) {
      return (!(value.type === 20 /* IDENT_TOKEN */ && value.value === 'none') &&
          (value.type !== 18 /* FUNCTION */ || !!SUPPORTED_IMAGE_FUNCTIONS[value.name]));
  }
  var SUPPORTED_IMAGE_FUNCTIONS = {
      'linear-gradient': linearGradient,
      '-moz-linear-gradient': prefixLinearGradient,
      '-ms-linear-gradient': prefixLinearGradient,
      '-o-linear-gradient': prefixLinearGradient,
      '-webkit-linear-gradient': prefixLinearGradient,
      'radial-gradient': radialGradient,
      '-moz-radial-gradient': prefixRadialGradient,
      '-ms-radial-gradient': prefixRadialGradient,
      '-o-radial-gradient': prefixRadialGradient,
      '-webkit-radial-gradient': prefixRadialGradient,
      '-webkit-gradient': webkitGradient
  };

  var backgroundImage = {
      name: 'background-image',
      initialValue: 'none',
      type: 1 /* LIST */,
      prefix: false,
      parse: function (context, tokens) {
          if (tokens.length === 0) {
              return [];
          }
          var first = tokens[0];
          if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
              return [];
          }
          return tokens
              .filter(function (value) { return nonFunctionArgSeparator(value) && isSupportedImage(value); })
              .map(function (value) { return image.parse(context, value); });
      }
  };

  var backgroundOrigin = {
      name: 'background-origin',
      initialValue: 'border-box',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          return tokens.map(function (token) {
              if (isIdentToken(token)) {
                  switch (token.value) {
                      case 'padding-box':
                          return 1 /* PADDING_BOX */;
                      case 'content-box':
                          return 2 /* CONTENT_BOX */;
                  }
              }
              return 0 /* BORDER_BOX */;
          });
      }
  };

  var backgroundPosition = {
      name: 'background-position',
      initialValue: '0% 0%',
      type: 1 /* LIST */,
      prefix: false,
      parse: function (_context, tokens) {
          return parseFunctionArgs(tokens)
              .map(function (values) { return values.filter(isLengthPercentage); })
              .map(parseLengthPercentageTuple);
      }
  };

  var backgroundRepeat = {
      name: 'background-repeat',
      initialValue: 'repeat',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          return parseFunctionArgs(tokens)
              .map(function (values) {
              return values
                  .filter(isIdentToken)
                  .map(function (token) { return token.value; })
                  .join(' ');
          })
              .map(parseBackgroundRepeat);
      }
  };
  var parseBackgroundRepeat = function (value) {
      switch (value) {
          case 'no-repeat':
              return 1 /* NO_REPEAT */;
          case 'repeat-x':
          case 'repeat no-repeat':
              return 2 /* REPEAT_X */;
          case 'repeat-y':
          case 'no-repeat repeat':
              return 3 /* REPEAT_Y */;
          case 'repeat':
          default:
              return 0 /* REPEAT */;
      }
  };

  var BACKGROUND_SIZE;
  (function (BACKGROUND_SIZE) {
      BACKGROUND_SIZE["AUTO"] = "auto";
      BACKGROUND_SIZE["CONTAIN"] = "contain";
      BACKGROUND_SIZE["COVER"] = "cover";
  })(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
  var backgroundSize = {
      name: 'background-size',
      initialValue: '0',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          return parseFunctionArgs(tokens).map(function (values) { return values.filter(isBackgroundSizeInfoToken); });
      }
  };
  var isBackgroundSizeInfoToken = function (value) {
      return isIdentToken(value) || isLengthPercentage(value);
  };

  var borderColorForSide = function (side) { return ({
      name: "border-" + side + "-color",
      initialValue: 'transparent',
      prefix: false,
      type: 3 /* TYPE_VALUE */,
      format: 'color'
  }); };
  var borderTopColor = borderColorForSide('top');
  var borderRightColor = borderColorForSide('right');
  var borderBottomColor = borderColorForSide('bottom');
  var borderLeftColor = borderColorForSide('left');

  var borderRadiusForSide = function (side) { return ({
      name: "border-radius-" + side,
      initialValue: '0 0',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));
      }
  }); };
  var borderTopLeftRadius = borderRadiusForSide('top-left');
  var borderTopRightRadius = borderRadiusForSide('top-right');
  var borderBottomRightRadius = borderRadiusForSide('bottom-right');
  var borderBottomLeftRadius = borderRadiusForSide('bottom-left');

  var borderStyleForSide = function (side) { return ({
      name: "border-" + side + "-style",
      initialValue: 'solid',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, style) {
          switch (style) {
              case 'none':
                  return 0 /* NONE */;
              case 'dashed':
                  return 2 /* DASHED */;
              case 'dotted':
                  return 3 /* DOTTED */;
              case 'double':
                  return 4 /* DOUBLE */;
          }
          return 1 /* SOLID */;
      }
  }); };
  var borderTopStyle = borderStyleForSide('top');
  var borderRightStyle = borderStyleForSide('right');
  var borderBottomStyle = borderStyleForSide('bottom');
  var borderLeftStyle = borderStyleForSide('left');

  var borderWidthForSide = function (side) { return ({
      name: "border-" + side + "-width",
      initialValue: '0',
      type: 0 /* VALUE */,
      prefix: false,
      parse: function (_context, token) {
          if (isDimensionToken(token)) {
              return token.number;
          }
          return 0;
      }
  }); };
  var borderTopWidth = borderWidthForSide('top');
  var borderRightWidth = borderWidthForSide('right');
  var borderBottomWidth = borderWidthForSide('bottom');
  var borderLeftWidth = borderWidthForSide('left');

  var color = {
      name: "color",
      initialValue: 'transparent',
      prefix: false,
      type: 3 /* TYPE_VALUE */,
      format: 'color'
  };

  var direction = {
      name: 'direction',
      initialValue: 'ltr',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, direction) {
          switch (direction) {
              case 'rtl':
                  return 1 /* RTL */;
              case 'ltr':
              default:
                  return 0 /* LTR */;
          }
      }
  };

  var display = {
      name: 'display',
      initialValue: 'inline-block',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          return tokens.filter(isIdentToken).reduce(function (bit, token) {
              return bit | parseDisplayValue(token.value);
          }, 0 /* NONE */);
      }
  };
  var parseDisplayValue = function (display) {
      switch (display) {
          case 'block':
          case '-webkit-box':
              return 2 /* BLOCK */;
          case 'inline':
              return 4 /* INLINE */;
          case 'run-in':
              return 8 /* RUN_IN */;
          case 'flow':
              return 16 /* FLOW */;
          case 'flow-root':
              return 32 /* FLOW_ROOT */;
          case 'table':
              return 64 /* TABLE */;
          case 'flex':
          case '-webkit-flex':
              return 128 /* FLEX */;
          case 'grid':
          case '-ms-grid':
              return 256 /* GRID */;
          case 'ruby':
              return 512 /* RUBY */;
          case 'subgrid':
              return 1024 /* SUBGRID */;
          case 'list-item':
              return 2048 /* LIST_ITEM */;
          case 'table-row-group':
              return 4096 /* TABLE_ROW_GROUP */;
          case 'table-header-group':
              return 8192 /* TABLE_HEADER_GROUP */;
          case 'table-footer-group':
              return 16384 /* TABLE_FOOTER_GROUP */;
          case 'table-row':
              return 32768 /* TABLE_ROW */;
          case 'table-cell':
              return 65536 /* TABLE_CELL */;
          case 'table-column-group':
              return 131072 /* TABLE_COLUMN_GROUP */;
          case 'table-column':
              return 262144 /* TABLE_COLUMN */;
          case 'table-caption':
              return 524288 /* TABLE_CAPTION */;
          case 'ruby-base':
              return 1048576 /* RUBY_BASE */;
          case 'ruby-text':
              return 2097152 /* RUBY_TEXT */;
          case 'ruby-base-container':
              return 4194304 /* RUBY_BASE_CONTAINER */;
          case 'ruby-text-container':
              return 8388608 /* RUBY_TEXT_CONTAINER */;
          case 'contents':
              return 16777216 /* CONTENTS */;
          case 'inline-block':
              return 33554432 /* INLINE_BLOCK */;
          case 'inline-list-item':
              return 67108864 /* INLINE_LIST_ITEM */;
          case 'inline-table':
              return 134217728 /* INLINE_TABLE */;
          case 'inline-flex':
              return 268435456 /* INLINE_FLEX */;
          case 'inline-grid':
              return 536870912 /* INLINE_GRID */;
      }
      return 0 /* NONE */;
  };

  var float = {
      name: 'float',
      initialValue: 'none',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, float) {
          switch (float) {
              case 'left':
                  return 1 /* LEFT */;
              case 'right':
                  return 2 /* RIGHT */;
              case 'inline-start':
                  return 3 /* INLINE_START */;
              case 'inline-end':
                  return 4 /* INLINE_END */;
          }
          return 0 /* NONE */;
      }
  };

  var letterSpacing = {
      name: 'letter-spacing',
      initialValue: '0',
      prefix: false,
      type: 0 /* VALUE */,
      parse: function (_context, token) {
          if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'normal') {
              return 0;
          }
          if (token.type === 17 /* NUMBER_TOKEN */) {
              return token.number;
          }
          if (token.type === 15 /* DIMENSION_TOKEN */) {
              return token.number;
          }
          return 0;
      }
  };

  var LINE_BREAK;
  (function (LINE_BREAK) {
      LINE_BREAK["NORMAL"] = "normal";
      LINE_BREAK["STRICT"] = "strict";
  })(LINE_BREAK || (LINE_BREAK = {}));
  var lineBreak = {
      name: 'line-break',
      initialValue: 'normal',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, lineBreak) {
          switch (lineBreak) {
              case 'strict':
                  return LINE_BREAK.STRICT;
              case 'normal':
              default:
                  return LINE_BREAK.NORMAL;
          }
      }
  };

  var lineHeight = {
      name: 'line-height',
      initialValue: 'normal',
      prefix: false,
      type: 4 /* TOKEN_VALUE */
  };
  var computeLineHeight = function (token, fontSize) {
      if (isIdentToken(token) && token.value === 'normal') {
          return 1.2 * fontSize;
      }
      else if (token.type === 17 /* NUMBER_TOKEN */) {
          return fontSize * token.number;
      }
      else if (isLengthPercentage(token)) {
          return getAbsoluteValue(token, fontSize);
      }
      return fontSize;
  };

  var listStyleImage = {
      name: 'list-style-image',
      initialValue: 'none',
      type: 0 /* VALUE */,
      prefix: false,
      parse: function (context, token) {
          if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'none') {
              return null;
          }
          return image.parse(context, token);
      }
  };

  var listStylePosition = {
      name: 'list-style-position',
      initialValue: 'outside',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, position) {
          switch (position) {
              case 'inside':
                  return 0 /* INSIDE */;
              case 'outside':
              default:
                  return 1 /* OUTSIDE */;
          }
      }
  };

  var listStyleType = {
      name: 'list-style-type',
      initialValue: 'none',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, type) {
          switch (type) {
              case 'disc':
                  return 0 /* DISC */;
              case 'circle':
                  return 1 /* CIRCLE */;
              case 'square':
                  return 2 /* SQUARE */;
              case 'decimal':
                  return 3 /* DECIMAL */;
              case 'cjk-decimal':
                  return 4 /* CJK_DECIMAL */;
              case 'decimal-leading-zero':
                  return 5 /* DECIMAL_LEADING_ZERO */;
              case 'lower-roman':
                  return 6 /* LOWER_ROMAN */;
              case 'upper-roman':
                  return 7 /* UPPER_ROMAN */;
              case 'lower-greek':
                  return 8 /* LOWER_GREEK */;
              case 'lower-alpha':
                  return 9 /* LOWER_ALPHA */;
              case 'upper-alpha':
                  return 10 /* UPPER_ALPHA */;
              case 'arabic-indic':
                  return 11 /* ARABIC_INDIC */;
              case 'armenian':
                  return 12 /* ARMENIAN */;
              case 'bengali':
                  return 13 /* BENGALI */;
              case 'cambodian':
                  return 14 /* CAMBODIAN */;
              case 'cjk-earthly-branch':
                  return 15 /* CJK_EARTHLY_BRANCH */;
              case 'cjk-heavenly-stem':
                  return 16 /* CJK_HEAVENLY_STEM */;
              case 'cjk-ideographic':
                  return 17 /* CJK_IDEOGRAPHIC */;
              case 'devanagari':
                  return 18 /* DEVANAGARI */;
              case 'ethiopic-numeric':
                  return 19 /* ETHIOPIC_NUMERIC */;
              case 'georgian':
                  return 20 /* GEORGIAN */;
              case 'gujarati':
                  return 21 /* GUJARATI */;
              case 'gurmukhi':
                  return 22 /* GURMUKHI */;
              case 'hebrew':
                  return 22 /* HEBREW */;
              case 'hiragana':
                  return 23 /* HIRAGANA */;
              case 'hiragana-iroha':
                  return 24 /* HIRAGANA_IROHA */;
              case 'japanese-formal':
                  return 25 /* JAPANESE_FORMAL */;
              case 'japanese-informal':
                  return 26 /* JAPANESE_INFORMAL */;
              case 'kannada':
                  return 27 /* KANNADA */;
              case 'katakana':
                  return 28 /* KATAKANA */;
              case 'katakana-iroha':
                  return 29 /* KATAKANA_IROHA */;
              case 'khmer':
                  return 30 /* KHMER */;
              case 'korean-hangul-formal':
                  return 31 /* KOREAN_HANGUL_FORMAL */;
              case 'korean-hanja-formal':
                  return 32 /* KOREAN_HANJA_FORMAL */;
              case 'korean-hanja-informal':
                  return 33 /* KOREAN_HANJA_INFORMAL */;
              case 'lao':
                  return 34 /* LAO */;
              case 'lower-armenian':
                  return 35 /* LOWER_ARMENIAN */;
              case 'malayalam':
                  return 36 /* MALAYALAM */;
              case 'mongolian':
                  return 37 /* MONGOLIAN */;
              case 'myanmar':
                  return 38 /* MYANMAR */;
              case 'oriya':
                  return 39 /* ORIYA */;
              case 'persian':
                  return 40 /* PERSIAN */;
              case 'simp-chinese-formal':
                  return 41 /* SIMP_CHINESE_FORMAL */;
              case 'simp-chinese-informal':
                  return 42 /* SIMP_CHINESE_INFORMAL */;
              case 'tamil':
                  return 43 /* TAMIL */;
              case 'telugu':
                  return 44 /* TELUGU */;
              case 'thai':
                  return 45 /* THAI */;
              case 'tibetan':
                  return 46 /* TIBETAN */;
              case 'trad-chinese-formal':
                  return 47 /* TRAD_CHINESE_FORMAL */;
              case 'trad-chinese-informal':
                  return 48 /* TRAD_CHINESE_INFORMAL */;
              case 'upper-armenian':
                  return 49 /* UPPER_ARMENIAN */;
              case 'disclosure-open':
                  return 50 /* DISCLOSURE_OPEN */;
              case 'disclosure-closed':
                  return 51 /* DISCLOSURE_CLOSED */;
              case 'none':
              default:
                  return -1 /* NONE */;
          }
      }
  };

  var marginForSide = function (side) { return ({
      name: "margin-" + side,
      initialValue: '0',
      prefix: false,
      type: 4 /* TOKEN_VALUE */
  }); };
  var marginTop = marginForSide('top');
  var marginRight = marginForSide('right');
  var marginBottom = marginForSide('bottom');
  var marginLeft = marginForSide('left');

  var overflow = {
      name: 'overflow',
      initialValue: 'visible',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          return tokens.filter(isIdentToken).map(function (overflow) {
              switch (overflow.value) {
                  case 'hidden':
                      return 1 /* HIDDEN */;
                  case 'scroll':
                      return 2 /* SCROLL */;
                  case 'clip':
                      return 3 /* CLIP */;
                  case 'auto':
                      return 4 /* AUTO */;
                  case 'visible':
                  default:
                      return 0 /* VISIBLE */;
              }
          });
      }
  };

  var overflowWrap = {
      name: 'overflow-wrap',
      initialValue: 'normal',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, overflow) {
          switch (overflow) {
              case 'break-word':
                  return "break-word" /* BREAK_WORD */;
              case 'normal':
              default:
                  return "normal" /* NORMAL */;
          }
      }
  };

  var paddingForSide = function (side) { return ({
      name: "padding-" + side,
      initialValue: '0',
      prefix: false,
      type: 3 /* TYPE_VALUE */,
      format: 'length-percentage'
  }); };
  var paddingTop = paddingForSide('top');
  var paddingRight = paddingForSide('right');
  var paddingBottom = paddingForSide('bottom');
  var paddingLeft = paddingForSide('left');

  var textAlign = {
      name: 'text-align',
      initialValue: 'left',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, textAlign) {
          switch (textAlign) {
              case 'right':
                  return 2 /* RIGHT */;
              case 'center':
              case 'justify':
                  return 1 /* CENTER */;
              case 'left':
              default:
                  return 0 /* LEFT */;
          }
      }
  };

  var position = {
      name: 'position',
      initialValue: 'static',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, position) {
          switch (position) {
              case 'relative':
                  return 1 /* RELATIVE */;
              case 'absolute':
                  return 2 /* ABSOLUTE */;
              case 'fixed':
                  return 3 /* FIXED */;
              case 'sticky':
                  return 4 /* STICKY */;
          }
          return 0 /* STATIC */;
      }
  };

  var textShadow = {
      name: 'text-shadow',
      initialValue: 'none',
      type: 1 /* LIST */,
      prefix: false,
      parse: function (context, tokens) {
          if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
              return [];
          }
          return parseFunctionArgs(tokens).map(function (values) {
              var shadow = {
                  color: COLORS.TRANSPARENT,
                  offsetX: ZERO_LENGTH,
                  offsetY: ZERO_LENGTH,
                  blur: ZERO_LENGTH
              };
              var c = 0;
              for (var i = 0; i < values.length; i++) {
                  var token = values[i];
                  if (isLength(token)) {
                      if (c === 0) {
                          shadow.offsetX = token;
                      }
                      else if (c === 1) {
                          shadow.offsetY = token;
                      }
                      else {
                          shadow.blur = token;
                      }
                      c++;
                  }
                  else {
                      shadow.color = color$1.parse(context, token);
                  }
              }
              return shadow;
          });
      }
  };

  var textTransform = {
      name: 'text-transform',
      initialValue: 'none',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, textTransform) {
          switch (textTransform) {
              case 'uppercase':
                  return 2 /* UPPERCASE */;
              case 'lowercase':
                  return 1 /* LOWERCASE */;
              case 'capitalize':
                  return 3 /* CAPITALIZE */;
          }
          return 0 /* NONE */;
      }
  };

  var transform$1 = {
      name: 'transform',
      initialValue: 'none',
      prefix: true,
      type: 0 /* VALUE */,
      parse: function (_context, token) {
          if (token.type === 20 /* IDENT_TOKEN */ && token.value === 'none') {
              return null;
          }
          if (token.type === 18 /* FUNCTION */) {
              var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
              if (typeof transformFunction === 'undefined') {
                  throw new Error("Attempting to parse an unsupported transform function \"" + token.name + "\"");
              }
              return transformFunction(token.values);
          }
          return null;
      }
  };
  var matrix = function (args) {
      var values = args.filter(function (arg) { return arg.type === 17 /* NUMBER_TOKEN */; }).map(function (arg) { return arg.number; });
      return values.length === 6 ? values : null;
  };
  // doesn't support 3D transforms at the moment
  var matrix3d = function (args) {
      var values = args.filter(function (arg) { return arg.type === 17 /* NUMBER_TOKEN */; }).map(function (arg) { return arg.number; });
      var a1 = values[0], b1 = values[1]; values[2]; values[3]; var a2 = values[4], b2 = values[5]; values[6]; values[7]; values[8]; values[9]; values[10]; values[11]; var a4 = values[12], b4 = values[13]; values[14]; values[15];
      return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
  };
  var SUPPORTED_TRANSFORM_FUNCTIONS = {
      matrix: matrix,
      matrix3d: matrix3d
  };

  var DEFAULT_VALUE = {
      type: 16 /* PERCENTAGE_TOKEN */,
      number: 50,
      flags: FLAG_INTEGER
  };
  var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
  var transformOrigin = {
      name: 'transform-origin',
      initialValue: '50% 50%',
      prefix: true,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          var origins = tokens.filter(isLengthPercentage);
          if (origins.length !== 2) {
              return DEFAULT;
          }
          return [origins[0], origins[1]];
      }
  };

  var visibility = {
      name: 'visible',
      initialValue: 'none',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, visibility) {
          switch (visibility) {
              case 'hidden':
                  return 1 /* HIDDEN */;
              case 'collapse':
                  return 2 /* COLLAPSE */;
              case 'visible':
              default:
                  return 0 /* VISIBLE */;
          }
      }
  };

  var WORD_BREAK;
  (function (WORD_BREAK) {
      WORD_BREAK["NORMAL"] = "normal";
      WORD_BREAK["BREAK_ALL"] = "break-all";
      WORD_BREAK["KEEP_ALL"] = "keep-all";
  })(WORD_BREAK || (WORD_BREAK = {}));
  var wordBreak = {
      name: 'word-break',
      initialValue: 'normal',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, wordBreak) {
          switch (wordBreak) {
              case 'break-all':
                  return WORD_BREAK.BREAK_ALL;
              case 'keep-all':
                  return WORD_BREAK.KEEP_ALL;
              case 'normal':
              default:
                  return WORD_BREAK.NORMAL;
          }
      }
  };

  var zIndex = {
      name: 'z-index',
      initialValue: 'auto',
      prefix: false,
      type: 0 /* VALUE */,
      parse: function (_context, token) {
          if (token.type === 20 /* IDENT_TOKEN */) {
              return { auto: true, order: 0 };
          }
          if (isNumberToken(token)) {
              return { auto: false, order: token.number };
          }
          throw new Error("Invalid z-index number parsed");
      }
  };

  var time = {
      name: 'time',
      parse: function (_context, value) {
          if (value.type === 15 /* DIMENSION_TOKEN */) {
              switch (value.unit.toLowerCase()) {
                  case 's':
                      return 1000 * value.number;
                  case 'ms':
                      return value.number;
              }
          }
          throw new Error("Unsupported time type");
      }
  };

  var opacity = {
      name: 'opacity',
      initialValue: '1',
      type: 0 /* VALUE */,
      prefix: false,
      parse: function (_context, token) {
          if (isNumberToken(token)) {
              return token.number;
          }
          return 1;
      }
  };

  var textDecorationColor = {
      name: "text-decoration-color",
      initialValue: 'transparent',
      prefix: false,
      type: 3 /* TYPE_VALUE */,
      format: 'color'
  };

  var textDecorationLine = {
      name: 'text-decoration-line',
      initialValue: 'none',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          return tokens
              .filter(isIdentToken)
              .map(function (token) {
              switch (token.value) {
                  case 'underline':
                      return 1 /* UNDERLINE */;
                  case 'overline':
                      return 2 /* OVERLINE */;
                  case 'line-through':
                      return 3 /* LINE_THROUGH */;
                  case 'none':
                      return 4 /* BLINK */;
              }
              return 0 /* NONE */;
          })
              .filter(function (line) { return line !== 0 /* NONE */; });
      }
  };

  var fontFamily = {
      name: "font-family",
      initialValue: '',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          var accumulator = [];
          var results = [];
          tokens.forEach(function (token) {
              switch (token.type) {
                  case 20 /* IDENT_TOKEN */:
                  case 0 /* STRING_TOKEN */:
                      accumulator.push(token.value);
                      break;
                  case 17 /* NUMBER_TOKEN */:
                      accumulator.push(token.number.toString());
                      break;
                  case 4 /* COMMA_TOKEN */:
                      results.push(accumulator.join(' '));
                      accumulator.length = 0;
                      break;
              }
          });
          if (accumulator.length) {
              results.push(accumulator.join(' '));
          }
          return results.map(function (result) { return (result.indexOf(' ') === -1 ? result : "'" + result + "'"); });
      }
  };

  var fontSize = {
      name: "font-size",
      initialValue: '0',
      prefix: false,
      type: 3 /* TYPE_VALUE */,
      format: 'length'
  };

  var fontWeight = {
      name: 'font-weight',
      initialValue: 'normal',
      type: 0 /* VALUE */,
      prefix: false,
      parse: function (_context, token) {
          if (isNumberToken(token)) {
              return token.number;
          }
          if (isIdentToken(token)) {
              switch (token.value) {
                  case 'bold':
                      return 700;
                  case 'normal':
                  default:
                      return 400;
              }
          }
          return 400;
      }
  };

  var fontVariant = {
      name: 'font-variant',
      initialValue: 'none',
      type: 1 /* LIST */,
      prefix: false,
      parse: function (_context, tokens) {
          return tokens.filter(isIdentToken).map(function (token) { return token.value; });
      }
  };

  var fontStyle = {
      name: 'font-style',
      initialValue: 'normal',
      prefix: false,
      type: 2 /* IDENT_VALUE */,
      parse: function (_context, overflow) {
          switch (overflow) {
              case 'oblique':
                  return "oblique" /* OBLIQUE */;
              case 'italic':
                  return "italic" /* ITALIC */;
              case 'normal':
              default:
                  return "normal" /* NORMAL */;
          }
      }
  };

  var contains = function (bit, value) { return (bit & value) !== 0; };

  var content = {
      name: 'content',
      initialValue: 'none',
      type: 1 /* LIST */,
      prefix: false,
      parse: function (_context, tokens) {
          if (tokens.length === 0) {
              return [];
          }
          var first = tokens[0];
          if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
              return [];
          }
          return tokens;
      }
  };

  var counterIncrement = {
      name: 'counter-increment',
      initialValue: 'none',
      prefix: true,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          if (tokens.length === 0) {
              return null;
          }
          var first = tokens[0];
          if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
              return null;
          }
          var increments = [];
          var filtered = tokens.filter(nonWhiteSpace);
          for (var i = 0; i < filtered.length; i++) {
              var counter = filtered[i];
              var next = filtered[i + 1];
              if (counter.type === 20 /* IDENT_TOKEN */) {
                  var increment = next && isNumberToken(next) ? next.number : 1;
                  increments.push({ counter: counter.value, increment: increment });
              }
          }
          return increments;
      }
  };

  var counterReset = {
      name: 'counter-reset',
      initialValue: 'none',
      prefix: true,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          if (tokens.length === 0) {
              return [];
          }
          var resets = [];
          var filtered = tokens.filter(nonWhiteSpace);
          for (var i = 0; i < filtered.length; i++) {
              var counter = filtered[i];
              var next = filtered[i + 1];
              if (isIdentToken(counter) && counter.value !== 'none') {
                  var reset = next && isNumberToken(next) ? next.number : 0;
                  resets.push({ counter: counter.value, reset: reset });
              }
          }
          return resets;
      }
  };

  var duration = {
      name: 'duration',
      initialValue: '0s',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (context, tokens) {
          return tokens.filter(isDimensionToken).map(function (token) { return time.parse(context, token); });
      }
  };

  var quotes = {
      name: 'quotes',
      initialValue: 'none',
      prefix: true,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          if (tokens.length === 0) {
              return null;
          }
          var first = tokens[0];
          if (first.type === 20 /* IDENT_TOKEN */ && first.value === 'none') {
              return null;
          }
          var quotes = [];
          var filtered = tokens.filter(isStringToken);
          if (filtered.length % 2 !== 0) {
              return null;
          }
          for (var i = 0; i < filtered.length; i += 2) {
              var open_1 = filtered[i].value;
              var close_1 = filtered[i + 1].value;
              quotes.push({ open: open_1, close: close_1 });
          }
          return quotes;
      }
  };
  var getQuote = function (quotes, depth, open) {
      if (!quotes) {
          return '';
      }
      var quote = quotes[Math.min(depth, quotes.length - 1)];
      if (!quote) {
          return '';
      }
      return open ? quote.open : quote.close;
  };

  var boxShadow = {
      name: 'box-shadow',
      initialValue: 'none',
      type: 1 /* LIST */,
      prefix: false,
      parse: function (context, tokens) {
          if (tokens.length === 1 && isIdentWithValue(tokens[0], 'none')) {
              return [];
          }
          return parseFunctionArgs(tokens).map(function (values) {
              var shadow = {
                  color: 0x000000ff,
                  offsetX: ZERO_LENGTH,
                  offsetY: ZERO_LENGTH,
                  blur: ZERO_LENGTH,
                  spread: ZERO_LENGTH,
                  inset: false
              };
              var c = 0;
              for (var i = 0; i < values.length; i++) {
                  var token = values[i];
                  if (isIdentWithValue(token, 'inset')) {
                      shadow.inset = true;
                  }
                  else if (isLength(token)) {
                      if (c === 0) {
                          shadow.offsetX = token;
                      }
                      else if (c === 1) {
                          shadow.offsetY = token;
                      }
                      else if (c === 2) {
                          shadow.blur = token;
                      }
                      else {
                          shadow.spread = token;
                      }
                      c++;
                  }
                  else {
                      shadow.color = color$1.parse(context, token);
                  }
              }
              return shadow;
          });
      }
  };

  var paintOrder = {
      name: 'paint-order',
      initialValue: 'normal',
      prefix: false,
      type: 1 /* LIST */,
      parse: function (_context, tokens) {
          var DEFAULT_VALUE = [0 /* FILL */, 1 /* STROKE */, 2 /* MARKERS */];
          var layers = [];
          tokens.filter(isIdentToken).forEach(function (token) {
              switch (token.value) {
                  case 'stroke':
                      layers.push(1 /* STROKE */);
                      break;
                  case 'fill':
                      layers.push(0 /* FILL */);
                      break;
                  case 'markers':
                      layers.push(2 /* MARKERS */);
                      break;
              }
          });
          DEFAULT_VALUE.forEach(function (value) {
              if (layers.indexOf(value) === -1) {
                  layers.push(value);
              }
          });
          return layers;
      }
  };

  var webkitTextStrokeColor = {
      name: "-webkit-text-stroke-color",
      initialValue: 'currentcolor',
      prefix: false,
      type: 3 /* TYPE_VALUE */,
      format: 'color'
  };

  var webkitTextStrokeWidth = {
      name: "-webkit-text-stroke-width",
      initialValue: '0',
      type: 0 /* VALUE */,
      prefix: false,
      parse: function (_context, token) {
          if (isDimensionToken(token)) {
              return token.number;
          }
          return 0;
      }
  };

  var CSSParsedDeclaration = /** @class */ (function () {
      function CSSParsedDeclaration(context, declaration) {
          var _a, _b;
          this.animationDuration = parse(context, duration, declaration.animationDuration);
          this.backgroundClip = parse(context, backgroundClip, declaration.backgroundClip);
          this.backgroundColor = parse(context, backgroundColor, declaration.backgroundColor);
          this.backgroundImage = parse(context, backgroundImage, declaration.backgroundImage);
          this.backgroundOrigin = parse(context, backgroundOrigin, declaration.backgroundOrigin);
          this.backgroundPosition = parse(context, backgroundPosition, declaration.backgroundPosition);
          this.backgroundRepeat = parse(context, backgroundRepeat, declaration.backgroundRepeat);
          this.backgroundSize = parse(context, backgroundSize, declaration.backgroundSize);
          this.borderTopColor = parse(context, borderTopColor, declaration.borderTopColor);
          this.borderRightColor = parse(context, borderRightColor, declaration.borderRightColor);
          this.borderBottomColor = parse(context, borderBottomColor, declaration.borderBottomColor);
          this.borderLeftColor = parse(context, borderLeftColor, declaration.borderLeftColor);
          this.borderTopLeftRadius = parse(context, borderTopLeftRadius, declaration.borderTopLeftRadius);
          this.borderTopRightRadius = parse(context, borderTopRightRadius, declaration.borderTopRightRadius);
          this.borderBottomRightRadius = parse(context, borderBottomRightRadius, declaration.borderBottomRightRadius);
          this.borderBottomLeftRadius = parse(context, borderBottomLeftRadius, declaration.borderBottomLeftRadius);
          this.borderTopStyle = parse(context, borderTopStyle, declaration.borderTopStyle);
          this.borderRightStyle = parse(context, borderRightStyle, declaration.borderRightStyle);
          this.borderBottomStyle = parse(context, borderBottomStyle, declaration.borderBottomStyle);
          this.borderLeftStyle = parse(context, borderLeftStyle, declaration.borderLeftStyle);
          this.borderTopWidth = parse(context, borderTopWidth, declaration.borderTopWidth);
          this.borderRightWidth = parse(context, borderRightWidth, declaration.borderRightWidth);
          this.borderBottomWidth = parse(context, borderBottomWidth, declaration.borderBottomWidth);
          this.borderLeftWidth = parse(context, borderLeftWidth, declaration.borderLeftWidth);
          this.boxShadow = parse(context, boxShadow, declaration.boxShadow);
          this.color = parse(context, color, declaration.color);
          this.direction = parse(context, direction, declaration.direction);
          this.display = parse(context, display, declaration.display);
          this.float = parse(context, float, declaration.cssFloat);
          this.fontFamily = parse(context, fontFamily, declaration.fontFamily);
          this.fontSize = parse(context, fontSize, declaration.fontSize);
          this.fontStyle = parse(context, fontStyle, declaration.fontStyle);
          this.fontVariant = parse(context, fontVariant, declaration.fontVariant);
          this.fontWeight = parse(context, fontWeight, declaration.fontWeight);
          this.letterSpacing = parse(context, letterSpacing, declaration.letterSpacing);
          this.lineBreak = parse(context, lineBreak, declaration.lineBreak);
          this.lineHeight = parse(context, lineHeight, declaration.lineHeight);
          this.listStyleImage = parse(context, listStyleImage, declaration.listStyleImage);
          this.listStylePosition = parse(context, listStylePosition, declaration.listStylePosition);
          this.listStyleType = parse(context, listStyleType, declaration.listStyleType);
          this.marginTop = parse(context, marginTop, declaration.marginTop);
          this.marginRight = parse(context, marginRight, declaration.marginRight);
          this.marginBottom = parse(context, marginBottom, declaration.marginBottom);
          this.marginLeft = parse(context, marginLeft, declaration.marginLeft);
          this.opacity = parse(context, opacity, declaration.opacity);
          var overflowTuple = parse(context, overflow, declaration.overflow);
          this.overflowX = overflowTuple[0];
          this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
          this.overflowWrap = parse(context, overflowWrap, declaration.overflowWrap);
          this.paddingTop = parse(context, paddingTop, declaration.paddingTop);
          this.paddingRight = parse(context, paddingRight, declaration.paddingRight);
          this.paddingBottom = parse(context, paddingBottom, declaration.paddingBottom);
          this.paddingLeft = parse(context, paddingLeft, declaration.paddingLeft);
          this.paintOrder = parse(context, paintOrder, declaration.paintOrder);
          this.position = parse(context, position, declaration.position);
          this.textAlign = parse(context, textAlign, declaration.textAlign);
          this.textDecorationColor = parse(context, textDecorationColor, (_a = declaration.textDecorationColor) !== null && _a !== void 0 ? _a : declaration.color);
          this.textDecorationLine = parse(context, textDecorationLine, (_b = declaration.textDecorationLine) !== null && _b !== void 0 ? _b : declaration.textDecoration);
          this.textShadow = parse(context, textShadow, declaration.textShadow);
          this.textTransform = parse(context, textTransform, declaration.textTransform);
          this.transform = parse(context, transform$1, declaration.transform);
          this.transformOrigin = parse(context, transformOrigin, declaration.transformOrigin);
          this.visibility = parse(context, visibility, declaration.visibility);
          this.webkitTextStrokeColor = parse(context, webkitTextStrokeColor, declaration.webkitTextStrokeColor);
          this.webkitTextStrokeWidth = parse(context, webkitTextStrokeWidth, declaration.webkitTextStrokeWidth);
          this.wordBreak = parse(context, wordBreak, declaration.wordBreak);
          this.zIndex = parse(context, zIndex, declaration.zIndex);
      }
      CSSParsedDeclaration.prototype.isVisible = function () {
          return this.display > 0 && this.opacity > 0 && this.visibility === 0 /* VISIBLE */;
      };
      CSSParsedDeclaration.prototype.isTransparent = function () {
          return isTransparent(this.backgroundColor);
      };
      CSSParsedDeclaration.prototype.isTransformed = function () {
          return this.transform !== null;
      };
      CSSParsedDeclaration.prototype.isPositioned = function () {
          return this.position !== 0 /* STATIC */;
      };
      CSSParsedDeclaration.prototype.isPositionedWithZIndex = function () {
          return this.isPositioned() && !this.zIndex.auto;
      };
      CSSParsedDeclaration.prototype.isFloating = function () {
          return this.float !== 0 /* NONE */;
      };
      CSSParsedDeclaration.prototype.isInlineLevel = function () {
          return (contains(this.display, 4 /* INLINE */) ||
              contains(this.display, 33554432 /* INLINE_BLOCK */) ||
              contains(this.display, 268435456 /* INLINE_FLEX */) ||
              contains(this.display, 536870912 /* INLINE_GRID */) ||
              contains(this.display, 67108864 /* INLINE_LIST_ITEM */) ||
              contains(this.display, 134217728 /* INLINE_TABLE */));
      };
      return CSSParsedDeclaration;
  }());
  var CSSParsedPseudoDeclaration = /** @class */ (function () {
      function CSSParsedPseudoDeclaration(context, declaration) {
          this.content = parse(context, content, declaration.content);
          this.quotes = parse(context, quotes, declaration.quotes);
      }
      return CSSParsedPseudoDeclaration;
  }());
  var CSSParsedCounterDeclaration = /** @class */ (function () {
      function CSSParsedCounterDeclaration(context, declaration) {
          this.counterIncrement = parse(context, counterIncrement, declaration.counterIncrement);
          this.counterReset = parse(context, counterReset, declaration.counterReset);
      }
      return CSSParsedCounterDeclaration;
  }());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var parse = function (context, descriptor, style) {
      var tokenizer = new Tokenizer();
      var value = style !== null && typeof style !== 'undefined' ? style.toString() : descriptor.initialValue;
      tokenizer.write(value);
      var parser = new Parser(tokenizer.read());
      switch (descriptor.type) {
          case 2 /* IDENT_VALUE */:
              var token = parser.parseComponentValue();
              return descriptor.parse(context, isIdentToken(token) ? token.value : descriptor.initialValue);
          case 0 /* VALUE */:
              return descriptor.parse(context, parser.parseComponentValue());
          case 1 /* LIST */:
              return descriptor.parse(context, parser.parseComponentValues());
          case 4 /* TOKEN_VALUE */:
              return parser.parseComponentValue();
          case 3 /* TYPE_VALUE */:
              switch (descriptor.format) {
                  case 'angle':
                      return angle.parse(context, parser.parseComponentValue());
                  case 'color':
                      return color$1.parse(context, parser.parseComponentValue());
                  case 'image':
                      return image.parse(context, parser.parseComponentValue());
                  case 'length':
                      var length_1 = parser.parseComponentValue();
                      return isLength(length_1) ? length_1 : ZERO_LENGTH;
                  case 'length-percentage':
                      var value_1 = parser.parseComponentValue();
                      return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
                  case 'time':
                      return time.parse(context, parser.parseComponentValue());
              }
              break;
      }
  };

  var elementDebuggerAttribute = 'data-html2canvas-debug';
  var getElementDebugType = function (element) {
      var attribute = element.getAttribute(elementDebuggerAttribute);
      switch (attribute) {
          case 'all':
              return 1 /* ALL */;
          case 'clone':
              return 2 /* CLONE */;
          case 'parse':
              return 3 /* PARSE */;
          case 'render':
              return 4 /* RENDER */;
          default:
              return 0 /* NONE */;
      }
  };
  var isDebugging = function (element, type) {
      var elementType = getElementDebugType(element);
      return elementType === 1 /* ALL */ || type === elementType;
  };

  var ElementContainer = /** @class */ (function () {
      function ElementContainer(context, element) {
          this.context = context;
          this.textNodes = [];
          this.elements = [];
          this.flags = 0;
          if (isDebugging(element, 3 /* PARSE */)) {
              debugger;
          }
          this.styles = new CSSParsedDeclaration(context, window.getComputedStyle(element, null));
          if (isHTMLElementNode(element)) {
              if (this.styles.animationDuration.some(function (duration) { return duration > 0; })) {
                  element.style.animationDuration = '0s';
              }
              if (this.styles.transform !== null) {
                  // getBoundingClientRect takes transforms into account
                  element.style.transform = 'none';
              }
          }
          this.bounds = parseBounds(this.context, element);
          if (isDebugging(element, 4 /* RENDER */)) {
              this.flags |= 16 /* DEBUG_RENDER */;
          }
      }
      return ElementContainer;
  }());

  /*
   * text-segmentation 1.0.3 <https://github.com/niklasvh/text-segmentation>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var base64 = 'AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=';

  /*
   * utrie 1.0.2 <https://github.com/niklasvh/utrie>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var chars$1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i$1 = 0; i$1 < chars$1.length; i$1++) {
      lookup$1[chars$1.charCodeAt(i$1)] = i$1;
  }
  var decode = function (base64) {
      var bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
      if (base64[base64.length - 1] === '=') {
          bufferLength--;
          if (base64[base64.length - 2] === '=') {
              bufferLength--;
          }
      }
      var buffer = typeof ArrayBuffer !== 'undefined' &&
          typeof Uint8Array !== 'undefined' &&
          typeof Uint8Array.prototype.slice !== 'undefined'
          ? new ArrayBuffer(bufferLength)
          : new Array(bufferLength);
      var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
      for (i = 0; i < len; i += 4) {
          encoded1 = lookup$1[base64.charCodeAt(i)];
          encoded2 = lookup$1[base64.charCodeAt(i + 1)];
          encoded3 = lookup$1[base64.charCodeAt(i + 2)];
          encoded4 = lookup$1[base64.charCodeAt(i + 3)];
          bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
          bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
          bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
      }
      return buffer;
  };
  var polyUint16Array = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 2) {
          bytes.push((buffer[i + 1] << 8) | buffer[i]);
      }
      return bytes;
  };
  var polyUint32Array = function (buffer) {
      var length = buffer.length;
      var bytes = [];
      for (var i = 0; i < length; i += 4) {
          bytes.push((buffer[i + 3] << 24) | (buffer[i + 2] << 16) | (buffer[i + 1] << 8) | buffer[i]);
      }
      return bytes;
  };

  /** Shift size for getting the index-2 table offset. */
  var UTRIE2_SHIFT_2 = 5;
  /** Shift size for getting the index-1 table offset. */
  var UTRIE2_SHIFT_1 = 6 + 5;
  /**
   * Shift size for shifting left the index array values.
   * Increases possible data size with 16-bit index values at the cost
   * of compactability.
   * This requires data blocks to be aligned by UTRIE2_DATA_GRANULARITY.
   */
  var UTRIE2_INDEX_SHIFT = 2;
  /**
   * Difference between the two shift sizes,
   * for getting an index-1 offset from an index-2 offset. 6=11-5
   */
  var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
  /**
   * The part of the index-2 table for U+D800..U+DBFF stores values for
   * lead surrogate code _units_ not code _points_.
   * Values for lead surrogate code _points_ are indexed with this portion of the table.
   * Length=32=0x20=0x400>>UTRIE2_SHIFT_2. (There are 1024=0x400 lead surrogates.)
   */
  var UTRIE2_LSCP_INDEX_2_OFFSET = 0x10000 >> UTRIE2_SHIFT_2;
  /** Number of entries in a data block. 32=0x20 */
  var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
  /** Mask for getting the lower bits for the in-data-block offset. */
  var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
  var UTRIE2_LSCP_INDEX_2_LENGTH = 0x400 >> UTRIE2_SHIFT_2;
  /** Count the lengths of both BMP pieces. 2080=0x820 */
  var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
  /**
   * The 2-byte UTF-8 version of the index-2 table follows at offset 2080=0x820.
   * Length 32=0x20 for lead bytes C0..DF, regardless of UTRIE2_SHIFT_2.
   */
  var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
  var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 0x800 >> 6; /* U+0800 is the first code point after 2-byte UTF-8 */
  /**
   * The index-1 table, only used for supplementary code points, at offset 2112=0x840.
   * Variable length, for code points up to highStart, where the last single-value range starts.
   * Maximum length 512=0x200=0x100000>>UTRIE2_SHIFT_1.
   * (For 0x100000 supplementary code points U+10000..U+10ffff.)
   *
   * The part of the index-2 table for supplementary code points starts
   * after this index-1 table.
   *
   * Both the index-1 table and the following part of the index-2 table
   * are omitted completely if there is only BMP data.
   */
  var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
  /**
   * Number of index-1 entries for the BMP. 32=0x20
   * This part of the index-1 table is omitted from the serialized form.
   */
  var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 0x10000 >> UTRIE2_SHIFT_1;
  /** Number of entries in an index-2 block. 64=0x40 */
  var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
  /** Mask for getting the lower bits for the in-index-2-block offset. */
  var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
  var slice16 = function (view, start, end) {
      if (view.slice) {
          return view.slice(start, end);
      }
      return new Uint16Array(Array.prototype.slice.call(view, start, end));
  };
  var slice32 = function (view, start, end) {
      if (view.slice) {
          return view.slice(start, end);
      }
      return new Uint32Array(Array.prototype.slice.call(view, start, end));
  };
  var createTrieFromBase64 = function (base64, _byteLength) {
      var buffer = decode(base64);
      var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
      var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
      var headerLength = 24;
      var index = slice16(view16, headerLength / 2, view32[4] / 2);
      var data = view32[5] === 2
          ? slice16(view16, (headerLength + view32[4]) / 2)
          : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
      return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
  };
  var Trie = /** @class */ (function () {
      function Trie(initialValue, errorValue, highStart, highValueIndex, index, data) {
          this.initialValue = initialValue;
          this.errorValue = errorValue;
          this.highStart = highStart;
          this.highValueIndex = highValueIndex;
          this.index = index;
          this.data = data;
      }
      /**
       * Get the value for a code point as stored in the Trie.
       *
       * @param codePoint the code point
       * @return the value
       */
      Trie.prototype.get = function (codePoint) {
          var ix;
          if (codePoint >= 0) {
              if (codePoint < 0x0d800 || (codePoint > 0x0dbff && codePoint <= 0x0ffff)) {
                  // Ordinary BMP code point, excluding leading surrogates.
                  // BMP uses a single level lookup.  BMP index starts at offset 0 in the Trie2 index.
                  // 16 bit data is stored in the index array itself.
                  ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
              }
              if (codePoint <= 0xffff) {
                  // Lead Surrogate Code Point.  A Separate index section is stored for
                  // lead surrogate code units and code points.
                  //   The main index has the code unit data.
                  //   For this function, we need the code point data.
                  // Note: this expression could be refactored for slightly improved efficiency, but
                  //       surrogate code points will be so rare in practice that it's not worth it.
                  ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + ((codePoint - 0xd800) >> UTRIE2_SHIFT_2)];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
              }
              if (codePoint < this.highStart) {
                  // Supplemental code point, use two-level lookup.
                  ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                  ix = this.index[ix];
                  ix += (codePoint >> UTRIE2_SHIFT_2) & UTRIE2_INDEX_2_MASK;
                  ix = this.index[ix];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
              }
              if (codePoint <= 0x10ffff) {
                  return this.data[this.highValueIndex];
              }
          }
          // Fall through.  The code point is outside of the legal range of 0..0x10ffff.
          return this.errorValue;
      };
      return Trie;
  }());

  /*
   * base64-arraybuffer 1.0.2 <https://github.com/niklasvh/base64-arraybuffer>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   */
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  // Use a lookup table to find the index.
  var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
  }

  var Prepend = 1;
  var CR = 2;
  var LF = 3;
  var Control = 4;
  var Extend = 5;
  var SpacingMark = 7;
  var L = 8;
  var V = 9;
  var T = 10;
  var LV = 11;
  var LVT = 12;
  var ZWJ = 13;
  var Extended_Pictographic = 14;
  var RI = 15;
  var toCodePoints = function (str) {
      var codePoints = [];
      var i = 0;
      var length = str.length;
      while (i < length) {
          var value = str.charCodeAt(i++);
          if (value >= 0xd800 && value <= 0xdbff && i < length) {
              var extra = str.charCodeAt(i++);
              if ((extra & 0xfc00) === 0xdc00) {
                  codePoints.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
              }
              else {
                  codePoints.push(value);
                  i--;
              }
          }
          else {
              codePoints.push(value);
          }
      }
      return codePoints;
  };
  var fromCodePoint = function () {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
          codePoints[_i] = arguments[_i];
      }
      if (String.fromCodePoint) {
          return String.fromCodePoint.apply(String, codePoints);
      }
      var length = codePoints.length;
      if (!length) {
          return '';
      }
      var codeUnits = [];
      var index = -1;
      var result = '';
      while (++index < length) {
          var codePoint = codePoints[index];
          if (codePoint <= 0xffff) {
              codeUnits.push(codePoint);
          }
          else {
              codePoint -= 0x10000;
              codeUnits.push((codePoint >> 10) + 0xd800, (codePoint % 0x400) + 0xdc00);
          }
          if (index + 1 === length || codeUnits.length > 0x4000) {
              result += String.fromCharCode.apply(String, codeUnits);
              codeUnits.length = 0;
          }
      }
      return result;
  };
  var UnicodeTrie = createTrieFromBase64(base64);
  var BREAK_NOT_ALLOWED = '×';
  var BREAK_ALLOWED = '÷';
  var codePointToClass = function (codePoint) { return UnicodeTrie.get(codePoint); };
  var _graphemeBreakAtIndex = function (_codePoints, classTypes, index) {
      var prevIndex = index - 2;
      var prev = classTypes[prevIndex];
      var current = classTypes[index - 1];
      var next = classTypes[index];
      // GB3 Do not break between a CR and LF
      if (current === CR && next === LF) {
          return BREAK_NOT_ALLOWED;
      }
      // GB4 Otherwise, break before and after controls.
      if (current === CR || current === LF || current === Control) {
          return BREAK_ALLOWED;
      }
      // GB5
      if (next === CR || next === LF || next === Control) {
          return BREAK_ALLOWED;
      }
      // Do not break Hangul syllable sequences.
      // GB6
      if (current === L && [L, V, LV, LVT].indexOf(next) !== -1) {
          return BREAK_NOT_ALLOWED;
      }
      // GB7
      if ((current === LV || current === V) && (next === V || next === T)) {
          return BREAK_NOT_ALLOWED;
      }
      // GB8
      if ((current === LVT || current === T) && next === T) {
          return BREAK_NOT_ALLOWED;
      }
      // GB9 Do not break before extending characters or ZWJ.
      if (next === ZWJ || next === Extend) {
          return BREAK_NOT_ALLOWED;
      }
      // Do not break before SpacingMarks, or after Prepend characters.
      // GB9a
      if (next === SpacingMark) {
          return BREAK_NOT_ALLOWED;
      }
      // GB9a
      if (current === Prepend) {
          return BREAK_NOT_ALLOWED;
      }
      // GB11 Do not break within emoji modifier sequences or emoji zwj sequences.
      if (current === ZWJ && next === Extended_Pictographic) {
          while (prev === Extend) {
              prev = classTypes[--prevIndex];
          }
          if (prev === Extended_Pictographic) {
              return BREAK_NOT_ALLOWED;
          }
      }
      // GB12 Do not break within emoji flag sequences.
      // That is, do not break between regional indicator (RI) symbols
      // if there is an odd number of RI characters before the break point.
      if (current === RI && next === RI) {
          var countRI = 0;
          while (prev === RI) {
              countRI++;
              prev = classTypes[--prevIndex];
          }
          if (countRI % 2 === 0) {
              return BREAK_NOT_ALLOWED;
          }
      }
      return BREAK_ALLOWED;
  };
  var GraphemeBreaker = function (str) {
      var codePoints = toCodePoints(str);
      var length = codePoints.length;
      var index = 0;
      var lastEnd = 0;
      var classTypes = codePoints.map(codePointToClass);
      return {
          next: function () {
              if (index >= length) {
                  return { done: true, value: null };
              }
              var graphemeBreak = BREAK_NOT_ALLOWED;
              while (index < length &&
                  (graphemeBreak = _graphemeBreakAtIndex(codePoints, classTypes, ++index)) === BREAK_NOT_ALLOWED) { }
              if (graphemeBreak !== BREAK_NOT_ALLOWED || index === length) {
                  var value = fromCodePoint.apply(null, codePoints.slice(lastEnd, index));
                  lastEnd = index;
                  return { value: value, done: false };
              }
              return { done: true, value: null };
          },
      };
  };
  var splitGraphemes = function (str) {
      var breaker = GraphemeBreaker(str);
      var graphemes = [];
      var bk;
      while (!(bk = breaker.next()).done) {
          if (bk.value) {
              graphemes.push(bk.value.slice());
          }
      }
      return graphemes;
  };

  var testRangeBounds = function (document) {
      var TEST_HEIGHT = 123;
      if (document.createRange) {
          var range = document.createRange();
          if (range.getBoundingClientRect) {
              var testElement = document.createElement('boundtest');
              testElement.style.height = TEST_HEIGHT + "px";
              testElement.style.display = 'block';
              document.body.appendChild(testElement);
              range.selectNode(testElement);
              var rangeBounds = range.getBoundingClientRect();
              var rangeHeight = Math.round(rangeBounds.height);
              document.body.removeChild(testElement);
              if (rangeHeight === TEST_HEIGHT) {
                  return true;
              }
          }
      }
      return false;
  };
  var testIOSLineBreak = function (document) {
      var testElement = document.createElement('boundtest');
      testElement.style.width = '50px';
      testElement.style.display = 'block';
      testElement.style.fontSize = '12px';
      testElement.style.letterSpacing = '0px';
      testElement.style.wordSpacing = '0px';
      document.body.appendChild(testElement);
      var range = document.createRange();
      testElement.innerHTML = typeof ''.repeat === 'function' ? '&#128104;'.repeat(10) : '';
      var node = testElement.firstChild;
      var textList = toCodePoints$1(node.data).map(function (i) { return fromCodePoint$1(i); });
      var offset = 0;
      var prev = {};
      // ios 13 does not handle range getBoundingClientRect line changes correctly #2177
      var supports = textList.every(function (text, i) {
          range.setStart(node, offset);
          range.setEnd(node, offset + text.length);
          var rect = range.getBoundingClientRect();
          offset += text.length;
          var boundAhead = rect.x > prev.x || rect.y > prev.y;
          prev = rect;
          if (i === 0) {
              return true;
          }
          return boundAhead;
      });
      document.body.removeChild(testElement);
      return supports;
  };
  var testCORS = function () { return typeof new Image().crossOrigin !== 'undefined'; };
  var testResponseType = function () { return typeof new XMLHttpRequest().responseType === 'string'; };
  var testSVG = function (document) {
      var img = new Image();
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      if (!ctx) {
          return false;
      }
      img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
      try {
          ctx.drawImage(img, 0, 0);
          canvas.toDataURL();
      }
      catch (e) {
          return false;
      }
      return true;
  };
  var isGreenPixel = function (data) {
      return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
  };
  var testForeignObject = function (document) {
      var canvas = document.createElement('canvas');
      var size = 100;
      canvas.width = size;
      canvas.height = size;
      var ctx = canvas.getContext('2d');
      if (!ctx) {
          return Promise.reject(false);
      }
      ctx.fillStyle = 'rgb(0, 255, 0)';
      ctx.fillRect(0, 0, size, size);
      var img = new Image();
      var greenImageSrc = canvas.toDataURL();
      img.src = greenImageSrc;
      var svg = createForeignObjectSVG(size, size, 0, 0, img);
      ctx.fillStyle = 'red';
      ctx.fillRect(0, 0, size, size);
      return loadSerializedSVG$1(svg)
          .then(function (img) {
          ctx.drawImage(img, 0, 0);
          var data = ctx.getImageData(0, 0, size, size).data;
          ctx.fillStyle = 'red';
          ctx.fillRect(0, 0, size, size);
          var node = document.createElement('div');
          node.style.backgroundImage = "url(" + greenImageSrc + ")";
          node.style.height = size + "px";
          // Firefox 55 does not render inline <img /> tags
          return isGreenPixel(data)
              ? loadSerializedSVG$1(createForeignObjectSVG(size, size, 0, 0, node))
              : Promise.reject(false);
      })
          .then(function (img) {
          ctx.drawImage(img, 0, 0);
          // Edge does not render background-images
          return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
      })
          .catch(function () { return false; });
  };
  var createForeignObjectSVG = function (width, height, x, y, node) {
      var xmlns = 'http://www.w3.org/2000/svg';
      var svg = document.createElementNS(xmlns, 'svg');
      var foreignObject = document.createElementNS(xmlns, 'foreignObject');
      svg.setAttributeNS(null, 'width', width.toString());
      svg.setAttributeNS(null, 'height', height.toString());
      foreignObject.setAttributeNS(null, 'width', '100%');
      foreignObject.setAttributeNS(null, 'height', '100%');
      foreignObject.setAttributeNS(null, 'x', x.toString());
      foreignObject.setAttributeNS(null, 'y', y.toString());
      foreignObject.setAttributeNS(null, 'externalResourcesRequired', 'true');
      svg.appendChild(foreignObject);
      foreignObject.appendChild(node);
      return svg;
  };
  var loadSerializedSVG$1 = function (svg) {
      return new Promise(function (resolve, reject) {
          var img = new Image();
          img.onload = function () { return resolve(img); };
          img.onerror = reject;
          img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
      });
  };
  var FEATURES = {
      get SUPPORT_RANGE_BOUNDS() {
          var value = testRangeBounds(document);
          Object.defineProperty(FEATURES, 'SUPPORT_RANGE_BOUNDS', { value: value });
          return value;
      },
      get SUPPORT_WORD_BREAKING() {
          var value = FEATURES.SUPPORT_RANGE_BOUNDS && testIOSLineBreak(document);
          Object.defineProperty(FEATURES, 'SUPPORT_WORD_BREAKING', { value: value });
          return value;
      },
      get SUPPORT_SVG_DRAWING() {
          var value = testSVG(document);
          Object.defineProperty(FEATURES, 'SUPPORT_SVG_DRAWING', { value: value });
          return value;
      },
      get SUPPORT_FOREIGNOBJECT_DRAWING() {
          var value = typeof Array.from === 'function' && typeof window.fetch === 'function'
              ? testForeignObject(document)
              : Promise.resolve(false);
          Object.defineProperty(FEATURES, 'SUPPORT_FOREIGNOBJECT_DRAWING', { value: value });
          return value;
      },
      get SUPPORT_CORS_IMAGES() {
          var value = testCORS();
          Object.defineProperty(FEATURES, 'SUPPORT_CORS_IMAGES', { value: value });
          return value;
      },
      get SUPPORT_RESPONSE_TYPE() {
          var value = testResponseType();
          Object.defineProperty(FEATURES, 'SUPPORT_RESPONSE_TYPE', { value: value });
          return value;
      },
      get SUPPORT_CORS_XHR() {
          var value = 'withCredentials' in new XMLHttpRequest();
          Object.defineProperty(FEATURES, 'SUPPORT_CORS_XHR', { value: value });
          return value;
      },
      get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          var value = !!(typeof Intl !== 'undefined' && Intl.Segmenter);
          Object.defineProperty(FEATURES, 'SUPPORT_NATIVE_TEXT_SEGMENTATION', { value: value });
          return value;
      }
  };

  var TextBounds = /** @class */ (function () {
      function TextBounds(text, bounds) {
          this.text = text;
          this.bounds = bounds;
      }
      return TextBounds;
  }());
  var parseTextBounds = function (context, value, styles, node) {
      var textList = breakText(value, styles);
      var textBounds = [];
      var offset = 0;
      textList.forEach(function (text) {
          if (styles.textDecorationLine.length || text.trim().length > 0) {
              if (FEATURES.SUPPORT_RANGE_BOUNDS) {
                  var clientRects = createRange(node, offset, text.length).getClientRects();
                  if (clientRects.length > 1) {
                      var subSegments = segmentGraphemes(text);
                      var subOffset_1 = 0;
                      subSegments.forEach(function (subSegment) {
                          textBounds.push(new TextBounds(subSegment, Bounds.fromDOMRectList(context, createRange(node, subOffset_1 + offset, subSegment.length).getClientRects())));
                          subOffset_1 += subSegment.length;
                      });
                  }
                  else {
                      textBounds.push(new TextBounds(text, Bounds.fromDOMRectList(context, clientRects)));
                  }
              }
              else {
                  var replacementNode = node.splitText(text.length);
                  textBounds.push(new TextBounds(text, getWrapperBounds(context, node)));
                  node = replacementNode;
              }
          }
          else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
              node = node.splitText(text.length);
          }
          offset += text.length;
      });
      return textBounds;
  };
  var getWrapperBounds = function (context, node) {
      var ownerDocument = node.ownerDocument;
      if (ownerDocument) {
          var wrapper = ownerDocument.createElement('html2canvaswrapper');
          wrapper.appendChild(node.cloneNode(true));
          var parentNode = node.parentNode;
          if (parentNode) {
              parentNode.replaceChild(wrapper, node);
              var bounds = parseBounds(context, wrapper);
              if (wrapper.firstChild) {
                  parentNode.replaceChild(wrapper.firstChild, wrapper);
              }
              return bounds;
          }
      }
      return Bounds.EMPTY;
  };
  var createRange = function (node, offset, length) {
      var ownerDocument = node.ownerDocument;
      if (!ownerDocument) {
          throw new Error('Node has no owner document');
      }
      var range = ownerDocument.createRange();
      range.setStart(node, offset);
      range.setEnd(node, offset + length);
      return range;
  };
  var segmentGraphemes = function (value) {
      if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          var segmenter = new Intl.Segmenter(void 0, { granularity: 'grapheme' });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return Array.from(segmenter.segment(value)).map(function (segment) { return segment.segment; });
      }
      return splitGraphemes(value);
  };
  var segmentWords = function (value, styles) {
      if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          var segmenter = new Intl.Segmenter(void 0, {
              granularity: 'word'
          });
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return Array.from(segmenter.segment(value)).map(function (segment) { return segment.segment; });
      }
      return breakWords(value, styles);
  };
  var breakText = function (value, styles) {
      return styles.letterSpacing !== 0 ? segmentGraphemes(value) : segmentWords(value, styles);
  };
  // https://drafts.csswg.org/css-text/#word-separator
  var wordSeparators = [0x0020, 0x00a0, 0x1361, 0x10100, 0x10101, 0x1039, 0x1091];
  var breakWords = function (str, styles) {
      var breaker = LineBreaker(str, {
          lineBreak: styles.lineBreak,
          wordBreak: styles.overflowWrap === "break-word" /* BREAK_WORD */ ? 'break-word' : styles.wordBreak
      });
      var words = [];
      var bk;
      var _loop_1 = function () {
          if (bk.value) {
              var value = bk.value.slice();
              var codePoints = toCodePoints$1(value);
              var word_1 = '';
              codePoints.forEach(function (codePoint) {
                  if (wordSeparators.indexOf(codePoint) === -1) {
                      word_1 += fromCodePoint$1(codePoint);
                  }
                  else {
                      if (word_1.length) {
                          words.push(word_1);
                      }
                      words.push(fromCodePoint$1(codePoint));
                      word_1 = '';
                  }
              });
              if (word_1.length) {
                  words.push(word_1);
              }
          }
      };
      while (!(bk = breaker.next()).done) {
          _loop_1();
      }
      return words;
  };

  var TextContainer = /** @class */ (function () {
      function TextContainer(context, node, styles) {
          this.text = transform(node.data, styles.textTransform);
          this.textBounds = parseTextBounds(context, this.text, styles, node);
      }
      return TextContainer;
  }());
  var transform = function (text, transform) {
      switch (transform) {
          case 1 /* LOWERCASE */:
              return text.toLowerCase();
          case 3 /* CAPITALIZE */:
              return text.replace(CAPITALIZE, capitalize);
          case 2 /* UPPERCASE */:
              return text.toUpperCase();
          default:
              return text;
      }
  };
  var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
  var capitalize = function (m, p1, p2) {
      if (m.length > 0) {
          return p1 + p2.toUpperCase();
      }
      return m;
  };

  var ImageElementContainer = /** @class */ (function (_super) {
      __extends(ImageElementContainer, _super);
      function ImageElementContainer(context, img) {
          var _this = _super.call(this, context, img) || this;
          _this.src = img.currentSrc || img.src;
          _this.intrinsicWidth = img.naturalWidth;
          _this.intrinsicHeight = img.naturalHeight;
          _this.context.cache.addImage(_this.src);
          return _this;
      }
      return ImageElementContainer;
  }(ElementContainer));

  var CanvasElementContainer = /** @class */ (function (_super) {
      __extends(CanvasElementContainer, _super);
      function CanvasElementContainer(context, canvas) {
          var _this = _super.call(this, context, canvas) || this;
          _this.canvas = canvas;
          _this.intrinsicWidth = canvas.width;
          _this.intrinsicHeight = canvas.height;
          return _this;
      }
      return CanvasElementContainer;
  }(ElementContainer));

  var SVGElementContainer = /** @class */ (function (_super) {
      __extends(SVGElementContainer, _super);
      function SVGElementContainer(context, img) {
          var _this = _super.call(this, context, img) || this;
          var s = new XMLSerializer();
          var bounds = parseBounds(context, img);
          img.setAttribute('width', bounds.width + "px");
          img.setAttribute('height', bounds.height + "px");
          _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
          _this.intrinsicWidth = img.width.baseVal.value;
          _this.intrinsicHeight = img.height.baseVal.value;
          _this.context.cache.addImage(_this.svg);
          return _this;
      }
      return SVGElementContainer;
  }(ElementContainer));

  var LIElementContainer = /** @class */ (function (_super) {
      __extends(LIElementContainer, _super);
      function LIElementContainer(context, element) {
          var _this = _super.call(this, context, element) || this;
          _this.value = element.value;
          return _this;
      }
      return LIElementContainer;
  }(ElementContainer));

  var OLElementContainer = /** @class */ (function (_super) {
      __extends(OLElementContainer, _super);
      function OLElementContainer(context, element) {
          var _this = _super.call(this, context, element) || this;
          _this.start = element.start;
          _this.reversed = typeof element.reversed === 'boolean' && element.reversed === true;
          return _this;
      }
      return OLElementContainer;
  }(ElementContainer));

  var CHECKBOX_BORDER_RADIUS = [
      {
          type: 15 /* DIMENSION_TOKEN */,
          flags: 0,
          unit: 'px',
          number: 3
      }
  ];
  var RADIO_BORDER_RADIUS = [
      {
          type: 16 /* PERCENTAGE_TOKEN */,
          flags: 0,
          number: 50
      }
  ];
  var reformatInputBounds = function (bounds) {
      if (bounds.width > bounds.height) {
          return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
      }
      else if (bounds.width < bounds.height) {
          return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
      }
      return bounds;
  };
  var getInputValue = function (node) {
      var value = node.type === PASSWORD ? new Array(node.value.length + 1).join('\u2022') : node.value;
      return value.length === 0 ? node.placeholder || '' : value;
  };
  var CHECKBOX = 'checkbox';
  var RADIO = 'radio';
  var PASSWORD = 'password';
  var INPUT_COLOR = 0x2a2a2aff;
  var InputElementContainer = /** @class */ (function (_super) {
      __extends(InputElementContainer, _super);
      function InputElementContainer(context, input) {
          var _this = _super.call(this, context, input) || this;
          _this.type = input.type.toLowerCase();
          _this.checked = input.checked;
          _this.value = getInputValue(input);
          if (_this.type === CHECKBOX || _this.type === RADIO) {
              _this.styles.backgroundColor = 0xdededeff;
              _this.styles.borderTopColor =
                  _this.styles.borderRightColor =
                      _this.styles.borderBottomColor =
                          _this.styles.borderLeftColor =
                              0xa5a5a5ff;
              _this.styles.borderTopWidth =
                  _this.styles.borderRightWidth =
                      _this.styles.borderBottomWidth =
                          _this.styles.borderLeftWidth =
                              1;
              _this.styles.borderTopStyle =
                  _this.styles.borderRightStyle =
                      _this.styles.borderBottomStyle =
                          _this.styles.borderLeftStyle =
                              1 /* SOLID */;
              _this.styles.backgroundClip = [0 /* BORDER_BOX */];
              _this.styles.backgroundOrigin = [0 /* BORDER_BOX */];
              _this.bounds = reformatInputBounds(_this.bounds);
          }
          switch (_this.type) {
              case CHECKBOX:
                  _this.styles.borderTopRightRadius =
                      _this.styles.borderTopLeftRadius =
                          _this.styles.borderBottomRightRadius =
                              _this.styles.borderBottomLeftRadius =
                                  CHECKBOX_BORDER_RADIUS;
                  break;
              case RADIO:
                  _this.styles.borderTopRightRadius =
                      _this.styles.borderTopLeftRadius =
                          _this.styles.borderBottomRightRadius =
                              _this.styles.borderBottomLeftRadius =
                                  RADIO_BORDER_RADIUS;
                  break;
          }
          return _this;
      }
      return InputElementContainer;
  }(ElementContainer));

  var SelectElementContainer = /** @class */ (function (_super) {
      __extends(SelectElementContainer, _super);
      function SelectElementContainer(context, element) {
          var _this = _super.call(this, context, element) || this;
          var option = element.options[element.selectedIndex || 0];
          _this.value = option ? option.text || '' : '';
          return _this;
      }
      return SelectElementContainer;
  }(ElementContainer));

  var TextareaElementContainer = /** @class */ (function (_super) {
      __extends(TextareaElementContainer, _super);
      function TextareaElementContainer(context, element) {
          var _this = _super.call(this, context, element) || this;
          _this.value = element.value;
          return _this;
      }
      return TextareaElementContainer;
  }(ElementContainer));

  var IFrameElementContainer = /** @class */ (function (_super) {
      __extends(IFrameElementContainer, _super);
      function IFrameElementContainer(context, iframe) {
          var _this = _super.call(this, context, iframe) || this;
          _this.src = iframe.src;
          _this.width = parseInt(iframe.width, 10) || 0;
          _this.height = parseInt(iframe.height, 10) || 0;
          _this.backgroundColor = _this.styles.backgroundColor;
          try {
              if (iframe.contentWindow &&
                  iframe.contentWindow.document &&
                  iframe.contentWindow.document.documentElement) {
                  _this.tree = parseTree(context, iframe.contentWindow.document.documentElement);
                  // http://www.w3.org/TR/css3-background/#special-backgrounds
                  var documentBackgroundColor = iframe.contentWindow.document.documentElement
                      ? parseColor(context, getComputedStyle(iframe.contentWindow.document.documentElement).backgroundColor)
                      : COLORS.TRANSPARENT;
                  var bodyBackgroundColor = iframe.contentWindow.document.body
                      ? parseColor(context, getComputedStyle(iframe.contentWindow.document.body).backgroundColor)
                      : COLORS.TRANSPARENT;
                  _this.backgroundColor = isTransparent(documentBackgroundColor)
                      ? isTransparent(bodyBackgroundColor)
                          ? _this.styles.backgroundColor
                          : bodyBackgroundColor
                      : documentBackgroundColor;
              }
          }
          catch (e) { }
          return _this;
      }
      return IFrameElementContainer;
  }(ElementContainer));

  var LIST_OWNERS = ['OL', 'UL', 'MENU'];
  var parseNodeTree = function (context, node, parent, root) {
      for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
          nextNode = childNode.nextSibling;
          if (isTextNode(childNode) && childNode.data.trim().length > 0) {
              parent.textNodes.push(new TextContainer(context, childNode, parent.styles));
          }
          else if (isElementNode(childNode)) {
              if (isSlotElement(childNode) && childNode.assignedNodes) {
                  childNode.assignedNodes().forEach(function (childNode) { return parseNodeTree(context, childNode, parent, root); });
              }
              else {
                  var container = createContainer(context, childNode);
                  if (container.styles.isVisible()) {
                      if (createsRealStackingContext(childNode, container, root)) {
                          container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
                      }
                      else if (createsStackingContext(container.styles)) {
                          container.flags |= 2 /* CREATES_STACKING_CONTEXT */;
                      }
                      if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
                          container.flags |= 8 /* IS_LIST_OWNER */;
                      }
                      parent.elements.push(container);
                      childNode.slot;
                      if (childNode.shadowRoot) {
                          parseNodeTree(context, childNode.shadowRoot, container, root);
                      }
                      else if (!isTextareaElement(childNode) &&
                          !isSVGElement(childNode) &&
                          !isSelectElement(childNode)) {
                          parseNodeTree(context, childNode, container, root);
                      }
                  }
              }
          }
      }
  };
  var createContainer = function (context, element) {
      if (isImageElement(element)) {
          return new ImageElementContainer(context, element);
      }
      if (isCanvasElement(element)) {
          return new CanvasElementContainer(context, element);
      }
      if (isSVGElement(element)) {
          return new SVGElementContainer(context, element);
      }
      if (isLIElement(element)) {
          return new LIElementContainer(context, element);
      }
      if (isOLElement(element)) {
          return new OLElementContainer(context, element);
      }
      if (isInputElement(element)) {
          return new InputElementContainer(context, element);
      }
      if (isSelectElement(element)) {
          return new SelectElementContainer(context, element);
      }
      if (isTextareaElement(element)) {
          return new TextareaElementContainer(context, element);
      }
      if (isIFrameElement(element)) {
          return new IFrameElementContainer(context, element);
      }
      return new ElementContainer(context, element);
  };
  var parseTree = function (context, element) {
      var container = createContainer(context, element);
      container.flags |= 4 /* CREATES_REAL_STACKING_CONTEXT */;
      parseNodeTree(context, element, container, container);
      return container;
  };
  var createsRealStackingContext = function (node, container, root) {
      return (container.styles.isPositionedWithZIndex() ||
          container.styles.opacity < 1 ||
          container.styles.isTransformed() ||
          (isBodyElement(node) && root.styles.isTransparent()));
  };
  var createsStackingContext = function (styles) { return styles.isPositioned() || styles.isFloating(); };
  var isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
  var isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
  var isHTMLElementNode = function (node) {
      return isElementNode(node) && typeof node.style !== 'undefined' && !isSVGElementNode(node);
  };
  var isSVGElementNode = function (element) {
      return typeof element.className === 'object';
  };
  var isLIElement = function (node) { return node.tagName === 'LI'; };
  var isOLElement = function (node) { return node.tagName === 'OL'; };
  var isInputElement = function (node) { return node.tagName === 'INPUT'; };
  var isHTMLElement = function (node) { return node.tagName === 'HTML'; };
  var isSVGElement = function (node) { return node.tagName === 'svg'; };
  var isBodyElement = function (node) { return node.tagName === 'BODY'; };
  var isCanvasElement = function (node) { return node.tagName === 'CANVAS'; };
  var isVideoElement = function (node) { return node.tagName === 'VIDEO'; };
  var isImageElement = function (node) { return node.tagName === 'IMG'; };
  var isIFrameElement = function (node) { return node.tagName === 'IFRAME'; };
  var isStyleElement = function (node) { return node.tagName === 'STYLE'; };
  var isScriptElement = function (node) { return node.tagName === 'SCRIPT'; };
  var isTextareaElement = function (node) { return node.tagName === 'TEXTAREA'; };
  var isSelectElement = function (node) { return node.tagName === 'SELECT'; };
  var isSlotElement = function (node) { return node.tagName === 'SLOT'; };
  // https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
  var isCustomElement = function (node) { return node.tagName.indexOf('-') > 0; };

  var CounterState = /** @class */ (function () {
      function CounterState() {
          this.counters = {};
      }
      CounterState.prototype.getCounterValue = function (name) {
          var counter = this.counters[name];
          if (counter && counter.length) {
              return counter[counter.length - 1];
          }
          return 1;
      };
      CounterState.prototype.getCounterValues = function (name) {
          var counter = this.counters[name];
          return counter ? counter : [];
      };
      CounterState.prototype.pop = function (counters) {
          var _this = this;
          counters.forEach(function (counter) { return _this.counters[counter].pop(); });
      };
      CounterState.prototype.parse = function (style) {
          var _this = this;
          var counterIncrement = style.counterIncrement;
          var counterReset = style.counterReset;
          var canReset = true;
          if (counterIncrement !== null) {
              counterIncrement.forEach(function (entry) {
                  var counter = _this.counters[entry.counter];
                  if (counter && entry.increment !== 0) {
                      canReset = false;
                      if (!counter.length) {
                          counter.push(1);
                      }
                      counter[Math.max(0, counter.length - 1)] += entry.increment;
                  }
              });
          }
          var counterNames = [];
          if (canReset) {
              counterReset.forEach(function (entry) {
                  var counter = _this.counters[entry.counter];
                  counterNames.push(entry.counter);
                  if (!counter) {
                      counter = _this.counters[entry.counter] = [];
                  }
                  counter.push(entry.reset);
              });
          }
          return counterNames;
      };
      return CounterState;
  }());
  var ROMAN_UPPER = {
      integers: [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
      values: ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
  };
  var ARMENIAN = {
      integers: [
          9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90, 80, 70,
          60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
      ],
      values: [
          'Ք',
          'Փ',
          'Ւ',
          'Ց',
          'Ր',
          'Տ',
          'Վ',
          'Ս',
          'Ռ',
          'Ջ',
          'Պ',
          'Չ',
          'Ո',
          'Շ',
          'Ն',
          'Յ',
          'Մ',
          'Ճ',
          'Ղ',
          'Ձ',
          'Հ',
          'Կ',
          'Ծ',
          'Խ',
          'Լ',
          'Ի',
          'Ժ',
          'Թ',
          'Ը',
          'Է',
          'Զ',
          'Ե',
          'Դ',
          'Գ',
          'Բ',
          'Ա'
      ]
  };
  var HEBREW = {
      integers: [
          10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 400, 300, 200, 100, 90, 80, 70, 60, 50, 40, 30, 20,
          19, 18, 17, 16, 15, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
      ],
      values: [
          'י׳',
          'ט׳',
          'ח׳',
          'ז׳',
          'ו׳',
          'ה׳',
          'ד׳',
          'ג׳',
          'ב׳',
          'א׳',
          'ת',
          'ש',
          'ר',
          'ק',
          'צ',
          'פ',
          'ע',
          'ס',
          'נ',
          'מ',
          'ל',
          'כ',
          'יט',
          'יח',
          'יז',
          'טז',
          'טו',
          'י',
          'ט',
          'ח',
          'ז',
          'ו',
          'ה',
          'ד',
          'ג',
          'ב',
          'א'
      ]
  };
  var GEORGIAN = {
      integers: [
          10000, 9000, 8000, 7000, 6000, 5000, 4000, 3000, 2000, 1000, 900, 800, 700, 600, 500, 400, 300, 200, 100, 90,
          80, 70, 60, 50, 40, 30, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
      ],
      values: [
          'ჵ',
          'ჰ',
          'ჯ',
          'ჴ',
          'ხ',
          'ჭ',
          'წ',
          'ძ',
          'ც',
          'ჩ',
          'შ',
          'ყ',
          'ღ',
          'ქ',
          'ფ',
          'ჳ',
          'ტ',
          'ს',
          'რ',
          'ჟ',
          'პ',
          'ო',
          'ჲ',
          'ნ',
          'მ',
          'ლ',
          'კ',
          'ი',
          'თ',
          'ჱ',
          'ზ',
          'ვ',
          'ე',
          'დ',
          'გ',
          'ბ',
          'ა'
      ]
  };
  var createAdditiveCounter = function (value, min, max, symbols, fallback, suffix) {
      if (value < min || value > max) {
          return createCounterText(value, fallback, suffix.length > 0);
      }
      return (symbols.integers.reduce(function (string, integer, index) {
          while (value >= integer) {
              value -= integer;
              string += symbols.values[index];
          }
          return string;
      }, '') + suffix);
  };
  var createCounterStyleWithSymbolResolver = function (value, codePointRangeLength, isNumeric, resolver) {
      var string = '';
      do {
          if (!isNumeric) {
              value--;
          }
          string = resolver(value) + string;
          value /= codePointRangeLength;
      } while (value * codePointRangeLength >= codePointRangeLength);
      return string;
  };
  var createCounterStyleFromRange = function (value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
      var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
      return ((value < 0 ? '-' : '') +
          (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function (codePoint) {
              return fromCodePoint$1(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
          }) +
              suffix));
  };
  var createCounterStyleFromSymbols = function (value, symbols, suffix) {
      if (suffix === void 0) { suffix = '. '; }
      var codePointRangeLength = symbols.length;
      return (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function (codePoint) { return symbols[Math.floor(codePoint % codePointRangeLength)]; }) + suffix);
  };
  var CJK_ZEROS = 1 << 0;
  var CJK_TEN_COEFFICIENTS = 1 << 1;
  var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
  var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
  var createCJKCounter = function (value, numbers, multipliers, negativeSign, suffix, flags) {
      if (value < -9999 || value > 9999) {
          return createCounterText(value, 4 /* CJK_DECIMAL */, suffix.length > 0);
      }
      var tmp = Math.abs(value);
      var string = suffix;
      if (tmp === 0) {
          return numbers[0] + string;
      }
      for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
          var coefficient = tmp % 10;
          if (coefficient === 0 && contains(flags, CJK_ZEROS) && string !== '') {
              string = numbers[coefficient] + string;
          }
          else if (coefficient > 1 ||
              (coefficient === 1 && digit === 0) ||
              (coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_COEFFICIENTS)) ||
              (coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100) ||
              (coefficient === 1 && digit > 1 && contains(flags, CJK_HUNDRED_COEFFICIENTS))) {
              string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : '') + string;
          }
          else if (coefficient === 1 && digit > 0) {
              string = multipliers[digit - 1] + string;
          }
          tmp = Math.floor(tmp / 10);
      }
      return (value < 0 ? negativeSign : '') + string;
  };
  var CHINESE_INFORMAL_MULTIPLIERS = '十百千萬';
  var CHINESE_FORMAL_MULTIPLIERS = '拾佰仟萬';
  var JAPANESE_NEGATIVE = 'マイナス';
  var KOREAN_NEGATIVE = '마이너스';
  var createCounterText = function (value, type, appendSuffix) {
      var defaultSuffix = appendSuffix ? '. ' : '';
      var cjkSuffix = appendSuffix ? '、' : '';
      var koreanSuffix = appendSuffix ? ', ' : '';
      var spaceSuffix = appendSuffix ? ' ' : '';
      switch (type) {
          case 0 /* DISC */:
              return '•' + spaceSuffix;
          case 1 /* CIRCLE */:
              return '◦' + spaceSuffix;
          case 2 /* SQUARE */:
              return '◾' + spaceSuffix;
          case 5 /* DECIMAL_LEADING_ZERO */:
              var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
              return string.length < 4 ? "0" + string : string;
          case 4 /* CJK_DECIMAL */:
              return createCounterStyleFromSymbols(value, '〇一二三四五六七八九', cjkSuffix);
          case 6 /* LOWER_ROMAN */:
              return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3 /* DECIMAL */, defaultSuffix).toLowerCase();
          case 7 /* UPPER_ROMAN */:
              return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3 /* DECIMAL */, defaultSuffix);
          case 8 /* LOWER_GREEK */:
              return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
          case 9 /* LOWER_ALPHA */:
              return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
          case 10 /* UPPER_ALPHA */:
              return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
          case 11 /* ARABIC_INDIC */:
              return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
          case 12 /* ARMENIAN */:
          case 49 /* UPPER_ARMENIAN */:
              return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3 /* DECIMAL */, defaultSuffix);
          case 35 /* LOWER_ARMENIAN */:
              return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3 /* DECIMAL */, defaultSuffix).toLowerCase();
          case 13 /* BENGALI */:
              return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
          case 14 /* CAMBODIAN */:
          case 30 /* KHMER */:
              return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
          case 15 /* CJK_EARTHLY_BRANCH */:
              return createCounterStyleFromSymbols(value, '子丑寅卯辰巳午未申酉戌亥', cjkSuffix);
          case 16 /* CJK_HEAVENLY_STEM */:
              return createCounterStyleFromSymbols(value, '甲乙丙丁戊己庚辛壬癸', cjkSuffix);
          case 17 /* CJK_IDEOGRAPHIC */:
          case 48 /* TRAD_CHINESE_INFORMAL */:
              return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
          case 47 /* TRAD_CHINESE_FORMAL */:
              return createCJKCounter(value, '零壹貳參肆伍陸柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '負', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
          case 42 /* SIMP_CHINESE_INFORMAL */:
              return createCJKCounter(value, '零一二三四五六七八九', CHINESE_INFORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
          case 41 /* SIMP_CHINESE_FORMAL */:
              return createCJKCounter(value, '零壹贰叁肆伍陆柒捌玖', CHINESE_FORMAL_MULTIPLIERS, '负', cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
          case 26 /* JAPANESE_INFORMAL */:
              return createCJKCounter(value, '〇一二三四五六七八九', '十百千万', JAPANESE_NEGATIVE, cjkSuffix, 0);
          case 25 /* JAPANESE_FORMAL */:
              return createCJKCounter(value, '零壱弐参四伍六七八九', '拾百千万', JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
          case 31 /* KOREAN_HANGUL_FORMAL */:
              return createCJKCounter(value, '영일이삼사오육칠팔구', '십백천만', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
          case 33 /* KOREAN_HANJA_INFORMAL */:
              return createCJKCounter(value, '零一二三四五六七八九', '十百千萬', KOREAN_NEGATIVE, koreanSuffix, 0);
          case 32 /* KOREAN_HANJA_FORMAL */:
              return createCJKCounter(value, '零壹貳參四五六七八九', '拾百千', KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
          case 18 /* DEVANAGARI */:
              return createCounterStyleFromRange(value, 0x966, 0x96f, true, defaultSuffix);
          case 20 /* GEORGIAN */:
              return createAdditiveCounter(value, 1, 19999, GEORGIAN, 3 /* DECIMAL */, defaultSuffix);
          case 21 /* GUJARATI */:
              return createCounterStyleFromRange(value, 0xae6, 0xaef, true, defaultSuffix);
          case 22 /* GURMUKHI */:
              return createCounterStyleFromRange(value, 0xa66, 0xa6f, true, defaultSuffix);
          case 22 /* HEBREW */:
              return createAdditiveCounter(value, 1, 10999, HEBREW, 3 /* DECIMAL */, defaultSuffix);
          case 23 /* HIRAGANA */:
              return createCounterStyleFromSymbols(value, 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわゐゑをん');
          case 24 /* HIRAGANA_IROHA */:
              return createCounterStyleFromSymbols(value, 'いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす');
          case 27 /* KANNADA */:
              return createCounterStyleFromRange(value, 0xce6, 0xcef, true, defaultSuffix);
          case 28 /* KATAKANA */:
              return createCounterStyleFromSymbols(value, 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン', cjkSuffix);
          case 29 /* KATAKANA_IROHA */:
              return createCounterStyleFromSymbols(value, 'イロハニホヘトチリヌルヲワカヨタレソツネナラムウヰノオクヤマケフコエテアサキユメミシヱヒモセス', cjkSuffix);
          case 34 /* LAO */:
              return createCounterStyleFromRange(value, 0xed0, 0xed9, true, defaultSuffix);
          case 37 /* MONGOLIAN */:
              return createCounterStyleFromRange(value, 0x1810, 0x1819, true, defaultSuffix);
          case 38 /* MYANMAR */:
              return createCounterStyleFromRange(value, 0x1040, 0x1049, true, defaultSuffix);
          case 39 /* ORIYA */:
              return createCounterStyleFromRange(value, 0xb66, 0xb6f, true, defaultSuffix);
          case 40 /* PERSIAN */:
              return createCounterStyleFromRange(value, 0x6f0, 0x6f9, true, defaultSuffix);
          case 43 /* TAMIL */:
              return createCounterStyleFromRange(value, 0xbe6, 0xbef, true, defaultSuffix);
          case 44 /* TELUGU */:
              return createCounterStyleFromRange(value, 0xc66, 0xc6f, true, defaultSuffix);
          case 45 /* THAI */:
              return createCounterStyleFromRange(value, 0xe50, 0xe59, true, defaultSuffix);
          case 46 /* TIBETAN */:
              return createCounterStyleFromRange(value, 0xf20, 0xf29, true, defaultSuffix);
          case 3 /* DECIMAL */:
          default:
              return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
      }
  };

  var IGNORE_ATTRIBUTE = 'data-html2canvas-ignore';
  var DocumentCloner = /** @class */ (function () {
      function DocumentCloner(context, element, options) {
          this.context = context;
          this.options = options;
          this.scrolledElements = [];
          this.referenceElement = element;
          this.counters = new CounterState();
          this.quoteDepth = 0;
          if (!element.ownerDocument) {
              throw new Error('Cloned element does not have an owner document');
          }
          this.documentElement = this.cloneNode(element.ownerDocument.documentElement, false);
      }
      DocumentCloner.prototype.toIFrame = function (ownerDocument, windowSize) {
          var _this = this;
          var iframe = createIFrameContainer(ownerDocument, windowSize);
          if (!iframe.contentWindow) {
              return Promise.reject("Unable to find iframe window");
          }
          var scrollX = ownerDocument.defaultView.pageXOffset;
          var scrollY = ownerDocument.defaultView.pageYOffset;
          var cloneWindow = iframe.contentWindow;
          var documentClone = cloneWindow.document;
          /* Chrome doesn't detect relative background-images assigned in inline <style> sheets when fetched through getComputedStyle
           if window url is about:blank, we can assign the url to current by writing onto the document
           */
          var iframeLoad = iframeLoader(iframe).then(function () { return __awaiter(_this, void 0, void 0, function () {
              var onclone, referenceElement;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          this.scrolledElements.forEach(restoreNodeScroll);
                          if (cloneWindow) {
                              cloneWindow.scrollTo(windowSize.left, windowSize.top);
                              if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) &&
                                  (cloneWindow.scrollY !== windowSize.top || cloneWindow.scrollX !== windowSize.left)) {
                                  this.context.logger.warn('Unable to restore scroll position for cloned document');
                                  this.context.windowBounds = this.context.windowBounds.add(cloneWindow.scrollX - windowSize.left, cloneWindow.scrollY - windowSize.top, 0, 0);
                              }
                          }
                          onclone = this.options.onclone;
                          referenceElement = this.clonedReferenceElement;
                          if (typeof referenceElement === 'undefined') {
                              return [2 /*return*/, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")];
                          }
                          if (!(documentClone.fonts && documentClone.fonts.ready)) return [3 /*break*/, 2];
                          return [4 /*yield*/, documentClone.fonts.ready];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2:
                          if (!/(AppleWebKit)/g.test(navigator.userAgent)) return [3 /*break*/, 4];
                          return [4 /*yield*/, imagesReady(documentClone)];
                      case 3:
                          _a.sent();
                          _a.label = 4;
                      case 4:
                          if (typeof onclone === 'function') {
                              return [2 /*return*/, Promise.resolve()
                                      .then(function () { return onclone(documentClone, referenceElement); })
                                      .then(function () { return iframe; })];
                          }
                          return [2 /*return*/, iframe];
                  }
              });
          }); });
          documentClone.open();
          documentClone.write(serializeDoctype(document.doctype) + "<html></html>");
          // Chrome scrolls the parent document for some reason after the write to the cloned window???
          restoreOwnerScroll(this.referenceElement.ownerDocument, scrollX, scrollY);
          documentClone.replaceChild(documentClone.adoptNode(this.documentElement), documentClone.documentElement);
          documentClone.close();
          return iframeLoad;
      };
      DocumentCloner.prototype.createElementClone = function (node) {
          if (isDebugging(node, 2 /* CLONE */)) {
              debugger;
          }
          if (isCanvasElement(node)) {
              return this.createCanvasClone(node);
          }
          if (isVideoElement(node)) {
              return this.createVideoClone(node);
          }
          if (isStyleElement(node)) {
              return this.createStyleClone(node);
          }
          var clone = node.cloneNode(false);
          if (isImageElement(clone)) {
              if (isImageElement(node) && node.currentSrc && node.currentSrc !== node.src) {
                  clone.src = node.currentSrc;
                  clone.srcset = '';
              }
              if (clone.loading === 'lazy') {
                  clone.loading = 'eager';
              }
          }
          if (isCustomElement(clone)) {
              return this.createCustomElementClone(clone);
          }
          return clone;
      };
      DocumentCloner.prototype.createCustomElementClone = function (node) {
          var clone = document.createElement('html2canvascustomelement');
          copyCSSStyles(node.style, clone);
          return clone;
      };
      DocumentCloner.prototype.createStyleClone = function (node) {
          try {
              var sheet = node.sheet;
              if (sheet && sheet.cssRules) {
                  var css = [].slice.call(sheet.cssRules, 0).reduce(function (css, rule) {
                      if (rule && typeof rule.cssText === 'string') {
                          return css + rule.cssText;
                      }
                      return css;
                  }, '');
                  var style = node.cloneNode(false);
                  style.textContent = css;
                  return style;
              }
          }
          catch (e) {
              // accessing node.sheet.cssRules throws a DOMException
              this.context.logger.error('Unable to access cssRules property', e);
              if (e.name !== 'SecurityError') {
                  throw e;
              }
          }
          return node.cloneNode(false);
      };
      DocumentCloner.prototype.createCanvasClone = function (canvas) {
          var _a;
          if (this.options.inlineImages && canvas.ownerDocument) {
              var img = canvas.ownerDocument.createElement('img');
              try {
                  img.src = canvas.toDataURL();
                  return img;
              }
              catch (e) {
                  this.context.logger.info("Unable to inline canvas contents, canvas is tainted", canvas);
              }
          }
          var clonedCanvas = canvas.cloneNode(false);
          try {
              clonedCanvas.width = canvas.width;
              clonedCanvas.height = canvas.height;
              var ctx = canvas.getContext('2d');
              var clonedCtx = clonedCanvas.getContext('2d');
              if (clonedCtx) {
                  if (!this.options.allowTaint && ctx) {
                      clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                  }
                  else {
                      var gl = (_a = canvas.getContext('webgl2')) !== null && _a !== void 0 ? _a : canvas.getContext('webgl');
                      if (gl) {
                          var attribs = gl.getContextAttributes();
                          if ((attribs === null || attribs === void 0 ? void 0 : attribs.preserveDrawingBuffer) === false) {
                              this.context.logger.warn('Unable to clone WebGL context as it has preserveDrawingBuffer=false', canvas);
                          }
                      }
                      clonedCtx.drawImage(canvas, 0, 0);
                  }
              }
              return clonedCanvas;
          }
          catch (e) {
              this.context.logger.info("Unable to clone canvas as it is tainted", canvas);
          }
          return clonedCanvas;
      };
      DocumentCloner.prototype.createVideoClone = function (video) {
          var canvas = video.ownerDocument.createElement('canvas');
          canvas.width = video.offsetWidth;
          canvas.height = video.offsetHeight;
          var ctx = canvas.getContext('2d');
          try {
              if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  if (!this.options.allowTaint) {
                      ctx.getImageData(0, 0, canvas.width, canvas.height);
                  }
              }
              return canvas;
          }
          catch (e) {
              this.context.logger.info("Unable to clone video as it is tainted", video);
          }
          var blankCanvas = video.ownerDocument.createElement('canvas');
          blankCanvas.width = video.offsetWidth;
          blankCanvas.height = video.offsetHeight;
          return blankCanvas;
      };
      DocumentCloner.prototype.appendChildNode = function (clone, child, copyStyles) {
          if (!isElementNode(child) ||
              (!isScriptElement(child) &&
                  !child.hasAttribute(IGNORE_ATTRIBUTE) &&
                  (typeof this.options.ignoreElements !== 'function' || !this.options.ignoreElements(child)))) {
              if (!this.options.copyStyles || !isElementNode(child) || !isStyleElement(child)) {
                  clone.appendChild(this.cloneNode(child, copyStyles));
              }
          }
      };
      DocumentCloner.prototype.cloneChildNodes = function (node, clone, copyStyles) {
          var _this = this;
          for (var child = node.shadowRoot ? node.shadowRoot.firstChild : node.firstChild; child; child = child.nextSibling) {
              if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === 'function') {
                  var assignedNodes = child.assignedNodes();
                  if (assignedNodes.length) {
                      assignedNodes.forEach(function (assignedNode) { return _this.appendChildNode(clone, assignedNode, copyStyles); });
                  }
              }
              else {
                  this.appendChildNode(clone, child, copyStyles);
              }
          }
      };
      DocumentCloner.prototype.cloneNode = function (node, copyStyles) {
          if (isTextNode(node)) {
              return document.createTextNode(node.data);
          }
          if (!node.ownerDocument) {
              return node.cloneNode(false);
          }
          var window = node.ownerDocument.defaultView;
          if (window && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
              var clone = this.createElementClone(node);
              clone.style.transitionProperty = 'none';
              var style = window.getComputedStyle(node);
              var styleBefore = window.getComputedStyle(node, ':before');
              var styleAfter = window.getComputedStyle(node, ':after');
              if (this.referenceElement === node && isHTMLElementNode(clone)) {
                  this.clonedReferenceElement = clone;
              }
              if (isBodyElement(clone)) {
                  createPseudoHideStyles(clone);
              }
              var counters = this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
              var before = this.resolvePseudoContent(node, clone, styleBefore, PseudoElementType.BEFORE);
              if (isCustomElement(node)) {
                  copyStyles = true;
              }
              if (!isVideoElement(node)) {
                  this.cloneChildNodes(node, clone, copyStyles);
              }
              if (before) {
                  clone.insertBefore(before, clone.firstChild);
              }
              var after = this.resolvePseudoContent(node, clone, styleAfter, PseudoElementType.AFTER);
              if (after) {
                  clone.appendChild(after);
              }
              this.counters.pop(counters);
              if ((style && (this.options.copyStyles || isSVGElementNode(node)) && !isIFrameElement(node)) ||
                  copyStyles) {
                  copyCSSStyles(style, clone);
              }
              if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
                  this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
              }
              if ((isTextareaElement(node) || isSelectElement(node)) &&
                  (isTextareaElement(clone) || isSelectElement(clone))) {
                  clone.value = node.value;
              }
              return clone;
          }
          return node.cloneNode(false);
      };
      DocumentCloner.prototype.resolvePseudoContent = function (node, clone, style, pseudoElt) {
          var _this = this;
          if (!style) {
              return;
          }
          var value = style.content;
          var document = clone.ownerDocument;
          if (!document || !value || value === 'none' || value === '-moz-alt-content' || style.display === 'none') {
              return;
          }
          this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
          var declaration = new CSSParsedPseudoDeclaration(this.context, style);
          var anonymousReplacedElement = document.createElement('html2canvaspseudoelement');
          copyCSSStyles(style, anonymousReplacedElement);
          declaration.content.forEach(function (token) {
              if (token.type === 0 /* STRING_TOKEN */) {
                  anonymousReplacedElement.appendChild(document.createTextNode(token.value));
              }
              else if (token.type === 22 /* URL_TOKEN */) {
                  var img = document.createElement('img');
                  img.src = token.value;
                  img.style.opacity = '1';
                  anonymousReplacedElement.appendChild(img);
              }
              else if (token.type === 18 /* FUNCTION */) {
                  if (token.name === 'attr') {
                      var attr = token.values.filter(isIdentToken);
                      if (attr.length) {
                          anonymousReplacedElement.appendChild(document.createTextNode(node.getAttribute(attr[0].value) || ''));
                      }
                  }
                  else if (token.name === 'counter') {
                      var _a = token.values.filter(nonFunctionArgSeparator), counter = _a[0], counterStyle = _a[1];
                      if (counter && isIdentToken(counter)) {
                          var counterState = _this.counters.getCounterValue(counter.value);
                          var counterType = counterStyle && isIdentToken(counterStyle)
                              ? listStyleType.parse(_this.context, counterStyle.value)
                              : 3 /* DECIMAL */;
                          anonymousReplacedElement.appendChild(document.createTextNode(createCounterText(counterState, counterType, false)));
                      }
                  }
                  else if (token.name === 'counters') {
                      var _b = token.values.filter(nonFunctionArgSeparator), counter = _b[0], delim = _b[1], counterStyle = _b[2];
                      if (counter && isIdentToken(counter)) {
                          var counterStates = _this.counters.getCounterValues(counter.value);
                          var counterType_1 = counterStyle && isIdentToken(counterStyle)
                              ? listStyleType.parse(_this.context, counterStyle.value)
                              : 3 /* DECIMAL */;
                          var separator = delim && delim.type === 0 /* STRING_TOKEN */ ? delim.value : '';
                          var text = counterStates
                              .map(function (value) { return createCounterText(value, counterType_1, false); })
                              .join(separator);
                          anonymousReplacedElement.appendChild(document.createTextNode(text));
                      }
                  }
                  else ;
              }
              else if (token.type === 20 /* IDENT_TOKEN */) {
                  switch (token.value) {
                      case 'open-quote':
                          anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, _this.quoteDepth++, true)));
                          break;
                      case 'close-quote':
                          anonymousReplacedElement.appendChild(document.createTextNode(getQuote(declaration.quotes, --_this.quoteDepth, false)));
                          break;
                      default:
                          // safari doesn't parse string tokens correctly because of lack of quotes
                          anonymousReplacedElement.appendChild(document.createTextNode(token.value));
                  }
              }
          });
          anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
          var newClassName = pseudoElt === PseudoElementType.BEFORE
              ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE
              : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
          if (isSVGElementNode(clone)) {
              clone.className.baseValue += newClassName;
          }
          else {
              clone.className += newClassName;
          }
          return anonymousReplacedElement;
      };
      DocumentCloner.destroy = function (container) {
          if (container.parentNode) {
              container.parentNode.removeChild(container);
              return true;
          }
          return false;
      };
      return DocumentCloner;
  }());
  var PseudoElementType;
  (function (PseudoElementType) {
      PseudoElementType[PseudoElementType["BEFORE"] = 0] = "BEFORE";
      PseudoElementType[PseudoElementType["AFTER"] = 1] = "AFTER";
  })(PseudoElementType || (PseudoElementType = {}));
  var createIFrameContainer = function (ownerDocument, bounds) {
      var cloneIframeContainer = ownerDocument.createElement('iframe');
      cloneIframeContainer.className = 'html2canvas-container';
      cloneIframeContainer.style.visibility = 'hidden';
      cloneIframeContainer.style.position = 'fixed';
      cloneIframeContainer.style.left = '-10000px';
      cloneIframeContainer.style.top = '0px';
      cloneIframeContainer.style.border = '0';
      cloneIframeContainer.width = bounds.width.toString();
      cloneIframeContainer.height = bounds.height.toString();
      cloneIframeContainer.scrolling = 'no'; // ios won't scroll without it
      cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, 'true');
      ownerDocument.body.appendChild(cloneIframeContainer);
      return cloneIframeContainer;
  };
  var imageReady = function (img) {
      return new Promise(function (resolve) {
          if (img.complete) {
              resolve();
              return;
          }
          if (!img.src) {
              resolve();
              return;
          }
          img.onload = resolve;
          img.onerror = resolve;
      });
  };
  var imagesReady = function (document) {
      return Promise.all([].slice.call(document.images, 0).map(imageReady));
  };
  var iframeLoader = function (iframe) {
      return new Promise(function (resolve, reject) {
          var cloneWindow = iframe.contentWindow;
          if (!cloneWindow) {
              return reject("No window assigned for iframe");
          }
          var documentClone = cloneWindow.document;
          cloneWindow.onload = iframe.onload = function () {
              cloneWindow.onload = iframe.onload = null;
              var interval = setInterval(function () {
                  if (documentClone.body.childNodes.length > 0 && documentClone.readyState === 'complete') {
                      clearInterval(interval);
                      resolve(iframe);
                  }
              }, 50);
          };
      });
  };
  var ignoredStyleProperties = [
      'all',
      'd',
      'content' // Safari shows pseudoelements if content is set
  ];
  var copyCSSStyles = function (style, target) {
      // Edge does not provide value for cssText
      for (var i = style.length - 1; i >= 0; i--) {
          var property = style.item(i);
          if (ignoredStyleProperties.indexOf(property) === -1) {
              target.style.setProperty(property, style.getPropertyValue(property));
          }
      }
      return target;
  };
  var serializeDoctype = function (doctype) {
      var str = '';
      if (doctype) {
          str += '<!DOCTYPE ';
          if (doctype.name) {
              str += doctype.name;
          }
          if (doctype.internalSubset) {
              str += doctype.internalSubset;
          }
          if (doctype.publicId) {
              str += "\"" + doctype.publicId + "\"";
          }
          if (doctype.systemId) {
              str += "\"" + doctype.systemId + "\"";
          }
          str += '>';
      }
      return str;
  };
  var restoreOwnerScroll = function (ownerDocument, x, y) {
      if (ownerDocument &&
          ownerDocument.defaultView &&
          (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
          ownerDocument.defaultView.scrollTo(x, y);
      }
  };
  var restoreNodeScroll = function (_a) {
      var element = _a[0], x = _a[1], y = _a[2];
      element.scrollLeft = x;
      element.scrollTop = y;
  };
  var PSEUDO_BEFORE = ':before';
  var PSEUDO_AFTER = ':after';
  var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = '___html2canvas___pseudoelement_before';
  var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = '___html2canvas___pseudoelement_after';
  var PSEUDO_HIDE_ELEMENT_STYLE = "{\n    content: \"\" !important;\n    display: none !important;\n}";
  var createPseudoHideStyles = function (body) {
      createStyles(body, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
  };
  var createStyles = function (body, styles) {
      var document = body.ownerDocument;
      if (document) {
          var style = document.createElement('style');
          style.textContent = styles;
          body.appendChild(style);
      }
  };

  var CacheStorage = /** @class */ (function () {
      function CacheStorage() {
      }
      CacheStorage.getOrigin = function (url) {
          var link = CacheStorage._link;
          if (!link) {
              return 'about:blank';
          }
          link.href = url;
          link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
          return link.protocol + link.hostname + link.port;
      };
      CacheStorage.isSameOrigin = function (src) {
          return CacheStorage.getOrigin(src) === CacheStorage._origin;
      };
      CacheStorage.setContext = function (window) {
          CacheStorage._link = window.document.createElement('a');
          CacheStorage._origin = CacheStorage.getOrigin(window.location.href);
      };
      CacheStorage._origin = 'about:blank';
      return CacheStorage;
  }());
  var Cache = /** @class */ (function () {
      function Cache(context, _options) {
          this.context = context;
          this._options = _options;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this._cache = {};
      }
      Cache.prototype.addImage = function (src) {
          var result = Promise.resolve();
          if (this.has(src)) {
              return result;
          }
          if (isBlobImage(src) || isRenderable(src)) {
              (this._cache[src] = this.loadImage(src)).catch(function () {
                  // prevent unhandled rejection
              });
              return result;
          }
          return result;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cache.prototype.match = function (src) {
          return this._cache[src];
      };
      Cache.prototype.loadImage = function (key) {
          return __awaiter(this, void 0, void 0, function () {
              var isSameOrigin, useCORS, useProxy, src;
              var _this = this;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          isSameOrigin = CacheStorage.isSameOrigin(key);
                          useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
                          useProxy = !isInlineImage(key) &&
                              !isSameOrigin &&
                              !isBlobImage(key) &&
                              typeof this._options.proxy === 'string' &&
                              FEATURES.SUPPORT_CORS_XHR &&
                              !useCORS;
                          if (!isSameOrigin &&
                              this._options.allowTaint === false &&
                              !isInlineImage(key) &&
                              !isBlobImage(key) &&
                              !useProxy &&
                              !useCORS) {
                              return [2 /*return*/];
                          }
                          src = key;
                          if (!useProxy) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.proxy(src)];
                      case 1:
                          src = _a.sent();
                          _a.label = 2;
                      case 2:
                          this.context.logger.debug("Added image " + key.substring(0, 256));
                          return [4 /*yield*/, new Promise(function (resolve, reject) {
                                  var img = new Image();
                                  img.onload = function () { return resolve(img); };
                                  img.onerror = reject;
                                  //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
                                  if (isInlineBase64Image(src) || useCORS) {
                                      img.crossOrigin = 'anonymous';
                                  }
                                  img.src = src;
                                  if (img.complete === true) {
                                      // Inline XML images may fail to parse, throwing an Error later on
                                      setTimeout(function () { return resolve(img); }, 500);
                                  }
                                  if (_this._options.imageTimeout > 0) {
                                      setTimeout(function () { return reject("Timed out (" + _this._options.imageTimeout + "ms) loading image"); }, _this._options.imageTimeout);
                                  }
                              })];
                      case 3: return [2 /*return*/, _a.sent()];
                  }
              });
          });
      };
      Cache.prototype.has = function (key) {
          return typeof this._cache[key] !== 'undefined';
      };
      Cache.prototype.keys = function () {
          return Promise.resolve(Object.keys(this._cache));
      };
      Cache.prototype.proxy = function (src) {
          var _this = this;
          var proxy = this._options.proxy;
          if (!proxy) {
              throw new Error('No proxy defined');
          }
          var key = src.substring(0, 256);
          return new Promise(function (resolve, reject) {
              var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
              var xhr = new XMLHttpRequest();
              xhr.onload = function () {
                  if (xhr.status === 200) {
                      if (responseType === 'text') {
                          resolve(xhr.response);
                      }
                      else {
                          var reader_1 = new FileReader();
                          reader_1.addEventListener('load', function () { return resolve(reader_1.result); }, false);
                          reader_1.addEventListener('error', function (e) { return reject(e); }, false);
                          reader_1.readAsDataURL(xhr.response);
                      }
                  }
                  else {
                      reject("Failed to proxy resource " + key + " with status code " + xhr.status);
                  }
              };
              xhr.onerror = reject;
              var queryString = proxy.indexOf('?') > -1 ? '&' : '?';
              xhr.open('GET', "" + proxy + queryString + "url=" + encodeURIComponent(src) + "&responseType=" + responseType);
              if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
                  xhr.responseType = responseType;
              }
              if (_this._options.imageTimeout) {
                  var timeout_1 = _this._options.imageTimeout;
                  xhr.timeout = timeout_1;
                  xhr.ontimeout = function () { return reject("Timed out (" + timeout_1 + "ms) proxying " + key); };
              }
              xhr.send();
          });
      };
      return Cache;
  }());
  var INLINE_SVG = /^data:image\/svg\+xml/i;
  var INLINE_BASE64 = /^data:image\/.*;base64,/i;
  var INLINE_IMG = /^data:image\/.*/i;
  var isRenderable = function (src) { return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src); };
  var isInlineImage = function (src) { return INLINE_IMG.test(src); };
  var isInlineBase64Image = function (src) { return INLINE_BASE64.test(src); };
  var isBlobImage = function (src) { return src.substr(0, 4) === 'blob'; };
  var isSVG = function (src) { return src.substr(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src); };

  var Vector = /** @class */ (function () {
      function Vector(x, y) {
          this.type = 0 /* VECTOR */;
          this.x = x;
          this.y = y;
      }
      Vector.prototype.add = function (deltaX, deltaY) {
          return new Vector(this.x + deltaX, this.y + deltaY);
      };
      return Vector;
  }());

  var lerp = function (a, b, t) {
      return new Vector(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
  };
  var BezierCurve = /** @class */ (function () {
      function BezierCurve(start, startControl, endControl, end) {
          this.type = 1 /* BEZIER_CURVE */;
          this.start = start;
          this.startControl = startControl;
          this.endControl = endControl;
          this.end = end;
      }
      BezierCurve.prototype.subdivide = function (t, firstHalf) {
          var ab = lerp(this.start, this.startControl, t);
          var bc = lerp(this.startControl, this.endControl, t);
          var cd = lerp(this.endControl, this.end, t);
          var abbc = lerp(ab, bc, t);
          var bccd = lerp(bc, cd, t);
          var dest = lerp(abbc, bccd, t);
          return firstHalf ? new BezierCurve(this.start, ab, abbc, dest) : new BezierCurve(dest, bccd, cd, this.end);
      };
      BezierCurve.prototype.add = function (deltaX, deltaY) {
          return new BezierCurve(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
      };
      BezierCurve.prototype.reverse = function () {
          return new BezierCurve(this.end, this.endControl, this.startControl, this.start);
      };
      return BezierCurve;
  }());
  var isBezierCurve = function (path) { return path.type === 1 /* BEZIER_CURVE */; };

  var BoundCurves = /** @class */ (function () {
      function BoundCurves(element) {
          var styles = element.styles;
          var bounds = element.bounds;
          var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height), tlh = _a[0], tlv = _a[1];
          var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height), trh = _b[0], trv = _b[1];
          var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height), brh = _c[0], brv = _c[1];
          var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height), blh = _d[0], blv = _d[1];
          var factors = [];
          factors.push((tlh + trh) / bounds.width);
          factors.push((blh + brh) / bounds.width);
          factors.push((tlv + blv) / bounds.height);
          factors.push((trv + brv) / bounds.height);
          var maxFactor = Math.max.apply(Math, factors);
          if (maxFactor > 1) {
              tlh /= maxFactor;
              tlv /= maxFactor;
              trh /= maxFactor;
              trv /= maxFactor;
              brh /= maxFactor;
              brv /= maxFactor;
              blh /= maxFactor;
              blv /= maxFactor;
          }
          var topWidth = bounds.width - trh;
          var rightHeight = bounds.height - brv;
          var bottomWidth = bounds.width - brh;
          var leftHeight = bounds.height - blv;
          var borderTopWidth = styles.borderTopWidth;
          var borderRightWidth = styles.borderRightWidth;
          var borderBottomWidth = styles.borderBottomWidth;
          var borderLeftWidth = styles.borderLeftWidth;
          var paddingTop = getAbsoluteValue(styles.paddingTop, element.bounds.width);
          var paddingRight = getAbsoluteValue(styles.paddingRight, element.bounds.width);
          var paddingBottom = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
          var paddingLeft = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
          this.topLeftBorderDoubleOuterBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth / 3, bounds.top + borderTopWidth / 3, tlh - borderLeftWidth / 3, tlv - borderTopWidth / 3, CORNER.TOP_LEFT)
                  : new Vector(bounds.left + borderLeftWidth / 3, bounds.top + borderTopWidth / 3);
          this.topRightBorderDoubleOuterBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth / 3, trh - borderRightWidth / 3, trv - borderTopWidth / 3, CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width - borderRightWidth / 3, bounds.top + borderTopWidth / 3);
          this.bottomRightBorderDoubleOuterBox =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth / 3, brv - borderBottomWidth / 3, CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width - borderRightWidth / 3, bounds.top + bounds.height - borderBottomWidth / 3);
          this.bottomLeftBorderDoubleOuterBox =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth / 3, bounds.top + leftHeight, blh - borderLeftWidth / 3, blv - borderBottomWidth / 3, CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left + borderLeftWidth / 3, bounds.top + bounds.height - borderBottomWidth / 3);
          this.topLeftBorderDoubleInnerBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3, tlh - (borderLeftWidth * 2) / 3, tlv - (borderTopWidth * 2) / 3, CORNER.TOP_LEFT)
                  : new Vector(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3);
          this.topRightBorderDoubleInnerBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + topWidth, bounds.top + (borderTopWidth * 2) / 3, trh - (borderRightWidth * 2) / 3, trv - (borderTopWidth * 2) / 3, CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width - (borderRightWidth * 2) / 3, bounds.top + (borderTopWidth * 2) / 3);
          this.bottomRightBorderDoubleInnerBox =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - (borderRightWidth * 2) / 3, brv - (borderBottomWidth * 2) / 3, CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width - (borderRightWidth * 2) / 3, bounds.top + bounds.height - (borderBottomWidth * 2) / 3);
          this.bottomLeftBorderDoubleInnerBox =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + leftHeight, blh - (borderLeftWidth * 2) / 3, blv - (borderBottomWidth * 2) / 3, CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left + (borderLeftWidth * 2) / 3, bounds.top + bounds.height - (borderBottomWidth * 2) / 3);
          this.topLeftBorderStroke =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth / 2, bounds.top + borderTopWidth / 2, tlh - borderLeftWidth / 2, tlv - borderTopWidth / 2, CORNER.TOP_LEFT)
                  : new Vector(bounds.left + borderLeftWidth / 2, bounds.top + borderTopWidth / 2);
          this.topRightBorderStroke =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth / 2, trh - borderRightWidth / 2, trv - borderTopWidth / 2, CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width - borderRightWidth / 2, bounds.top + borderTopWidth / 2);
          this.bottomRightBorderStroke =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth / 2, brv - borderBottomWidth / 2, CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width - borderRightWidth / 2, bounds.top + bounds.height - borderBottomWidth / 2);
          this.bottomLeftBorderStroke =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth / 2, bounds.top + leftHeight, blh - borderLeftWidth / 2, blv - borderBottomWidth / 2, CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left + borderLeftWidth / 2, bounds.top + bounds.height - borderBottomWidth / 2);
          this.topLeftBorderBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT)
                  : new Vector(bounds.left, bounds.top);
          this.topRightBorderBox =
              trh > 0 || trv > 0
                  ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width, bounds.top);
          this.bottomRightBorderBox =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
          this.bottomLeftBorderBox =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left, bounds.top + bounds.height);
          this.topLeftPaddingBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth, bounds.top + borderTopWidth, Math.max(0, tlh - borderLeftWidth), Math.max(0, tlv - borderTopWidth), CORNER.TOP_LEFT)
                  : new Vector(bounds.left + borderLeftWidth, bounds.top + borderTopWidth);
          this.topRightPaddingBox =
              trh > 0 || trv > 0
                  ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width - borderRightWidth), bounds.top + borderTopWidth, topWidth > bounds.width + borderRightWidth ? 0 : Math.max(0, trh - borderRightWidth), Math.max(0, trv - borderTopWidth), CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + borderTopWidth);
          this.bottomRightPaddingBox =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth), bounds.top + Math.min(rightHeight, bounds.height - borderBottomWidth), Math.max(0, brh - borderRightWidth), Math.max(0, brv - borderBottomWidth), CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width - borderRightWidth, bounds.top + bounds.height - borderBottomWidth);
          this.bottomLeftPaddingBox =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth, bounds.top + Math.min(leftHeight, bounds.height - borderBottomWidth), Math.max(0, blh - borderLeftWidth), Math.max(0, blv - borderBottomWidth), CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left + borderLeftWidth, bounds.top + bounds.height - borderBottomWidth);
          this.topLeftContentBox =
              tlh > 0 || tlv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop, Math.max(0, tlh - (borderLeftWidth + paddingLeft)), Math.max(0, tlv - (borderTopWidth + paddingTop)), CORNER.TOP_LEFT)
                  : new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + borderTopWidth + paddingTop);
          this.topRightContentBox =
              trh > 0 || trv > 0
                  ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth + paddingLeft), bounds.top + borderTopWidth + paddingTop, topWidth > bounds.width + borderLeftWidth + paddingLeft ? 0 : trh - borderLeftWidth + paddingLeft, trv - (borderTopWidth + paddingTop), CORNER.TOP_RIGHT)
                  : new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + borderTopWidth + paddingTop);
          this.bottomRightContentBox =
              brh > 0 || brv > 0
                  ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth + paddingLeft)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth + paddingTop), Math.max(0, brh - (borderRightWidth + paddingRight)), brv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_RIGHT)
                  : new Vector(bounds.left + bounds.width - (borderRightWidth + paddingRight), bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
          this.bottomLeftContentBox =
              blh > 0 || blv > 0
                  ? getCurvePoints(bounds.left + borderLeftWidth + paddingLeft, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth + paddingLeft)), blv - (borderBottomWidth + paddingBottom), CORNER.BOTTOM_LEFT)
                  : new Vector(bounds.left + borderLeftWidth + paddingLeft, bounds.top + bounds.height - (borderBottomWidth + paddingBottom));
      }
      return BoundCurves;
  }());
  var CORNER;
  (function (CORNER) {
      CORNER[CORNER["TOP_LEFT"] = 0] = "TOP_LEFT";
      CORNER[CORNER["TOP_RIGHT"] = 1] = "TOP_RIGHT";
      CORNER[CORNER["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
      CORNER[CORNER["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
  })(CORNER || (CORNER = {}));
  var getCurvePoints = function (x, y, r1, r2, position) {
      var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
      var ox = r1 * kappa; // control point offset horizontal
      var oy = r2 * kappa; // control point offset vertical
      var xm = x + r1; // x-middle
      var ym = y + r2; // y-middle
      switch (position) {
          case CORNER.TOP_LEFT:
              return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
          case CORNER.TOP_RIGHT:
              return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
          case CORNER.BOTTOM_RIGHT:
              return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
          case CORNER.BOTTOM_LEFT:
          default:
              return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));
      }
  };
  var calculateBorderBoxPath = function (curves) {
      return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
  };
  var calculateContentBoxPath = function (curves) {
      return [
          curves.topLeftContentBox,
          curves.topRightContentBox,
          curves.bottomRightContentBox,
          curves.bottomLeftContentBox
      ];
  };
  var calculatePaddingBoxPath = function (curves) {
      return [
          curves.topLeftPaddingBox,
          curves.topRightPaddingBox,
          curves.bottomRightPaddingBox,
          curves.bottomLeftPaddingBox
      ];
  };

  var TransformEffect = /** @class */ (function () {
      function TransformEffect(offsetX, offsetY, matrix) {
          this.offsetX = offsetX;
          this.offsetY = offsetY;
          this.matrix = matrix;
          this.type = 0 /* TRANSFORM */;
          this.target = 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */;
      }
      return TransformEffect;
  }());
  var ClipEffect = /** @class */ (function () {
      function ClipEffect(path, target) {
          this.path = path;
          this.target = target;
          this.type = 1 /* CLIP */;
      }
      return ClipEffect;
  }());
  var OpacityEffect = /** @class */ (function () {
      function OpacityEffect(opacity) {
          this.opacity = opacity;
          this.type = 2 /* OPACITY */;
          this.target = 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */;
      }
      return OpacityEffect;
  }());
  var isTransformEffect = function (effect) {
      return effect.type === 0 /* TRANSFORM */;
  };
  var isClipEffect = function (effect) { return effect.type === 1 /* CLIP */; };
  var isOpacityEffect = function (effect) { return effect.type === 2 /* OPACITY */; };

  var equalPath = function (a, b) {
      if (a.length === b.length) {
          return a.some(function (v, i) { return v === b[i]; });
      }
      return false;
  };
  var transformPath = function (path, deltaX, deltaY, deltaW, deltaH) {
      return path.map(function (point, index) {
          switch (index) {
              case 0:
                  return point.add(deltaX, deltaY);
              case 1:
                  return point.add(deltaX + deltaW, deltaY);
              case 2:
                  return point.add(deltaX + deltaW, deltaY + deltaH);
              case 3:
                  return point.add(deltaX, deltaY + deltaH);
          }
          return point;
      });
  };

  var StackingContext = /** @class */ (function () {
      function StackingContext(container) {
          this.element = container;
          this.inlineLevel = [];
          this.nonInlineLevel = [];
          this.negativeZIndex = [];
          this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
          this.positiveZIndex = [];
          this.nonPositionedFloats = [];
          this.nonPositionedInlineLevel = [];
      }
      return StackingContext;
  }());
  var ElementPaint = /** @class */ (function () {
      function ElementPaint(container, parent) {
          this.container = container;
          this.parent = parent;
          this.effects = [];
          this.curves = new BoundCurves(this.container);
          if (this.container.styles.opacity < 1) {
              this.effects.push(new OpacityEffect(this.container.styles.opacity));
          }
          if (this.container.styles.transform !== null) {
              var offsetX = this.container.bounds.left + this.container.styles.transformOrigin[0].number;
              var offsetY = this.container.bounds.top + this.container.styles.transformOrigin[1].number;
              var matrix = this.container.styles.transform;
              this.effects.push(new TransformEffect(offsetX, offsetY, matrix));
          }
          if (this.container.styles.overflowX !== 0 /* VISIBLE */) {
              var borderBox = calculateBorderBoxPath(this.curves);
              var paddingBox = calculatePaddingBoxPath(this.curves);
              if (equalPath(borderBox, paddingBox)) {
                  this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
              }
              else {
                  this.effects.push(new ClipEffect(borderBox, 2 /* BACKGROUND_BORDERS */));
                  this.effects.push(new ClipEffect(paddingBox, 4 /* CONTENT */));
              }
          }
      }
      ElementPaint.prototype.getEffects = function (target) {
          var inFlow = [2 /* ABSOLUTE */, 3 /* FIXED */].indexOf(this.container.styles.position) === -1;
          var parent = this.parent;
          var effects = this.effects.slice(0);
          while (parent) {
              var croplessEffects = parent.effects.filter(function (effect) { return !isClipEffect(effect); });
              if (inFlow || parent.container.styles.position !== 0 /* STATIC */ || !parent.parent) {
                  effects.unshift.apply(effects, croplessEffects);
                  inFlow = [2 /* ABSOLUTE */, 3 /* FIXED */].indexOf(parent.container.styles.position) === -1;
                  if (parent.container.styles.overflowX !== 0 /* VISIBLE */) {
                      var borderBox = calculateBorderBoxPath(parent.curves);
                      var paddingBox = calculatePaddingBoxPath(parent.curves);
                      if (!equalPath(borderBox, paddingBox)) {
                          effects.unshift(new ClipEffect(paddingBox, 2 /* BACKGROUND_BORDERS */ | 4 /* CONTENT */));
                      }
                  }
              }
              else {
                  effects.unshift.apply(effects, croplessEffects);
              }
              parent = parent.parent;
          }
          return effects.filter(function (effect) { return contains(effect.target, target); });
      };
      return ElementPaint;
  }());
  var parseStackTree = function (parent, stackingContext, realStackingContext, listItems) {
      parent.container.elements.forEach(function (child) {
          var treatAsRealStackingContext = contains(child.flags, 4 /* CREATES_REAL_STACKING_CONTEXT */);
          var createsStackingContext = contains(child.flags, 2 /* CREATES_STACKING_CONTEXT */);
          var paintContainer = new ElementPaint(child, parent);
          if (contains(child.styles.display, 2048 /* LIST_ITEM */)) {
              listItems.push(paintContainer);
          }
          var listOwnerItems = contains(child.flags, 8 /* IS_LIST_OWNER */) ? [] : listItems;
          if (treatAsRealStackingContext || createsStackingContext) {
              var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
              var stack = new StackingContext(paintContainer);
              if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
                  var order_1 = child.styles.zIndex.order;
                  if (order_1 < 0) {
                      var index_1 = 0;
                      parentStack.negativeZIndex.some(function (current, i) {
                          if (order_1 > current.element.container.styles.zIndex.order) {
                              index_1 = i;
                              return false;
                          }
                          else if (index_1 > 0) {
                              return true;
                          }
                          return false;
                      });
                      parentStack.negativeZIndex.splice(index_1, 0, stack);
                  }
                  else if (order_1 > 0) {
                      var index_2 = 0;
                      parentStack.positiveZIndex.some(function (current, i) {
                          if (order_1 >= current.element.container.styles.zIndex.order) {
                              index_2 = i + 1;
                              return false;
                          }
                          else if (index_2 > 0) {
                              return true;
                          }
                          return false;
                      });
                      parentStack.positiveZIndex.splice(index_2, 0, stack);
                  }
                  else {
                      parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
                  }
              }
              else {
                  if (child.styles.isFloating()) {
                      parentStack.nonPositionedFloats.push(stack);
                  }
                  else {
                      parentStack.nonPositionedInlineLevel.push(stack);
                  }
              }
              parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
          }
          else {
              if (child.styles.isInlineLevel()) {
                  stackingContext.inlineLevel.push(paintContainer);
              }
              else {
                  stackingContext.nonInlineLevel.push(paintContainer);
              }
              parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
          }
          if (contains(child.flags, 8 /* IS_LIST_OWNER */)) {
              processListItems(child, listOwnerItems);
          }
      });
  };
  var processListItems = function (owner, elements) {
      var numbering = owner instanceof OLElementContainer ? owner.start : 1;
      var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
      for (var i = 0; i < elements.length; i++) {
          var item = elements[i];
          if (item.container instanceof LIElementContainer &&
              typeof item.container.value === 'number' &&
              item.container.value !== 0) {
              numbering = item.container.value;
          }
          item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
          numbering += reversed ? -1 : 1;
      }
  };
  var parseStackingContexts = function (container) {
      var paintContainer = new ElementPaint(container, null);
      var root = new StackingContext(paintContainer);
      var listItems = [];
      parseStackTree(paintContainer, root, root, listItems);
      processListItems(paintContainer.container, listItems);
      return root;
  };

  var parsePathForBorder = function (curves, borderSide) {
      switch (borderSide) {
          case 0:
              return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
          case 1:
              return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
          case 2:
              return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
          case 3:
          default:
              return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
      }
  };
  var parsePathForBorderDoubleOuter = function (curves, borderSide) {
      switch (borderSide) {
          case 0:
              return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox, curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox);
          case 1:
              return createPathFromCurves(curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox, curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox);
          case 2:
              return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox, curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox);
          case 3:
          default:
              return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox, curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox);
      }
  };
  var parsePathForBorderDoubleInner = function (curves, borderSide) {
      switch (borderSide) {
          case 0:
              return createPathFromCurves(curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox, curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox);
          case 1:
              return createPathFromCurves(curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox, curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox);
          case 2:
              return createPathFromCurves(curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox);
          case 3:
          default:
              return createPathFromCurves(curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox, curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox);
      }
  };
  var parsePathForBorderStroke = function (curves, borderSide) {
      switch (borderSide) {
          case 0:
              return createStrokePathFromCurves(curves.topLeftBorderStroke, curves.topRightBorderStroke);
          case 1:
              return createStrokePathFromCurves(curves.topRightBorderStroke, curves.bottomRightBorderStroke);
          case 2:
              return createStrokePathFromCurves(curves.bottomRightBorderStroke, curves.bottomLeftBorderStroke);
          case 3:
          default:
              return createStrokePathFromCurves(curves.bottomLeftBorderStroke, curves.topLeftBorderStroke);
      }
  };
  var createStrokePathFromCurves = function (outer1, outer2) {
      var path = [];
      if (isBezierCurve(outer1)) {
          path.push(outer1.subdivide(0.5, false));
      }
      else {
          path.push(outer1);
      }
      if (isBezierCurve(outer2)) {
          path.push(outer2.subdivide(0.5, true));
      }
      else {
          path.push(outer2);
      }
      return path;
  };
  var createPathFromCurves = function (outer1, inner1, outer2, inner2) {
      var path = [];
      if (isBezierCurve(outer1)) {
          path.push(outer1.subdivide(0.5, false));
      }
      else {
          path.push(outer1);
      }
      if (isBezierCurve(outer2)) {
          path.push(outer2.subdivide(0.5, true));
      }
      else {
          path.push(outer2);
      }
      if (isBezierCurve(inner2)) {
          path.push(inner2.subdivide(0.5, true).reverse());
      }
      else {
          path.push(inner2);
      }
      if (isBezierCurve(inner1)) {
          path.push(inner1.subdivide(0.5, false).reverse());
      }
      else {
          path.push(inner1);
      }
      return path;
  };

  var paddingBox = function (element) {
      var bounds = element.bounds;
      var styles = element.styles;
      return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
  };
  var contentBox = function (element) {
      var styles = element.styles;
      var bounds = element.bounds;
      var paddingLeft = getAbsoluteValue(styles.paddingLeft, bounds.width);
      var paddingRight = getAbsoluteValue(styles.paddingRight, bounds.width);
      var paddingTop = getAbsoluteValue(styles.paddingTop, bounds.width);
      var paddingBottom = getAbsoluteValue(styles.paddingBottom, bounds.width);
      return bounds.add(paddingLeft + styles.borderLeftWidth, paddingTop + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft + paddingRight), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop + paddingBottom));
  };

  var calculateBackgroundPositioningArea = function (backgroundOrigin, element) {
      if (backgroundOrigin === 0 /* BORDER_BOX */) {
          return element.bounds;
      }
      if (backgroundOrigin === 2 /* CONTENT_BOX */) {
          return contentBox(element);
      }
      return paddingBox(element);
  };
  var calculateBackgroundPaintingArea = function (backgroundClip, element) {
      if (backgroundClip === 0 /* BORDER_BOX */) {
          return element.bounds;
      }
      if (backgroundClip === 2 /* CONTENT_BOX */) {
          return contentBox(element);
      }
      return paddingBox(element);
  };
  var calculateBackgroundRendering = function (container, index, intrinsicSize) {
      var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index), container);
      var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index), container);
      var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index), intrinsicSize, backgroundPositioningArea);
      var sizeWidth = backgroundImageSize[0], sizeHeight = backgroundImageSize[1];
      var position = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
      var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index), position, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
      var offsetX = Math.round(backgroundPositioningArea.left + position[0]);
      var offsetY = Math.round(backgroundPositioningArea.top + position[1]);
      return [path, offsetX, offsetY, sizeWidth, sizeHeight];
  };
  var isAuto = function (token) { return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO; };
  var hasIntrinsicValue = function (value) { return typeof value === 'number'; };
  var calculateBackgroundSize = function (size, _a, bounds) {
      var intrinsicWidth = _a[0], intrinsicHeight = _a[1], intrinsicProportion = _a[2];
      var first = size[0], second = size[1];
      if (!first) {
          return [0, 0];
      }
      if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
          return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
      }
      var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
      if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
          if (hasIntrinsicValue(intrinsicProportion)) {
              var targetRatio = bounds.width / bounds.height;
              return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER)
                  ? [bounds.width, bounds.width / intrinsicProportion]
                  : [bounds.height * intrinsicProportion, bounds.height];
          }
          return [bounds.width, bounds.height];
      }
      var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
      var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
      var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
      // If the background-size is auto or auto auto:
      if (isAuto(first) && (!second || isAuto(second))) {
          // If the image has both horizontal and vertical intrinsic dimensions, it's rendered at that size.
          if (hasIntrinsicWidth && hasIntrinsicHeight) {
              return [intrinsicWidth, intrinsicHeight];
          }
          // If the image has no intrinsic dimensions and has no intrinsic proportions,
          // it's rendered at the size of the background positioning area.
          if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
              return [bounds.width, bounds.height];
          }
          // TODO If the image has no intrinsic dimensions but has intrinsic proportions, it's rendered as if contain had been specified instead.
          // If the image has only one intrinsic dimension and has intrinsic proportions, it's rendered at the size corresponding to that one dimension.
          // The other dimension is computed using the specified dimension and the intrinsic proportions.
          if (hasIntrinsicDimensions && hasIntrinsicProportion) {
              var width_1 = hasIntrinsicWidth
                  ? intrinsicWidth
                  : intrinsicHeight * intrinsicProportion;
              var height_1 = hasIntrinsicHeight
                  ? intrinsicHeight
                  : intrinsicWidth / intrinsicProportion;
              return [width_1, height_1];
          }
          // If the image has only one intrinsic dimension but has no intrinsic proportions,
          // it's rendered using the specified dimension and the other dimension of the background positioning area.
          var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
          var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
          return [width_2, height_2];
      }
      // If the image has intrinsic proportions, it's stretched to the specified dimension.
      // The unspecified dimension is computed using the specified dimension and the intrinsic proportions.
      if (hasIntrinsicProportion) {
          var width_3 = 0;
          var height_3 = 0;
          if (isLengthPercentage(first)) {
              width_3 = getAbsoluteValue(first, bounds.width);
          }
          else if (isLengthPercentage(second)) {
              height_3 = getAbsoluteValue(second, bounds.height);
          }
          if (isAuto(first)) {
              width_3 = height_3 * intrinsicProportion;
          }
          else if (!second || isAuto(second)) {
              height_3 = width_3 / intrinsicProportion;
          }
          return [width_3, height_3];
      }
      // If the image has no intrinsic proportions, it's stretched to the specified dimension.
      // The unspecified dimension is computed using the image's corresponding intrinsic dimension,
      // if there is one. If there is no such intrinsic dimension,
      // it becomes the corresponding dimension of the background positioning area.
      var width = null;
      var height = null;
      if (isLengthPercentage(first)) {
          width = getAbsoluteValue(first, bounds.width);
      }
      else if (second && isLengthPercentage(second)) {
          height = getAbsoluteValue(second, bounds.height);
      }
      if (width !== null && (!second || isAuto(second))) {
          height =
              hasIntrinsicWidth && hasIntrinsicHeight
                  ? (width / intrinsicWidth) * intrinsicHeight
                  : bounds.height;
      }
      if (height !== null && isAuto(first)) {
          width =
              hasIntrinsicWidth && hasIntrinsicHeight
                  ? (height / intrinsicHeight) * intrinsicWidth
                  : bounds.width;
      }
      if (width !== null && height !== null) {
          return [width, height];
      }
      throw new Error("Unable to calculate background-size for element");
  };
  var getBackgroundValueForIndex = function (values, index) {
      var value = values[index];
      if (typeof value === 'undefined') {
          return values[0];
      }
      return value;
  };
  var calculateBackgroundRepeatPath = function (repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
      var x = _a[0], y = _a[1];
      var width = _b[0], height = _b[1];
      switch (repeat) {
          case 2 /* REPEAT_X */:
              return [
                  new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))
              ];
          case 3 /* REPEAT_Y */:
              return [
                  new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
                  new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
                  new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
                  new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))
              ];
          case 1 /* NO_REPEAT */:
              return [
                  new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
                  new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
                  new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))
              ];
          default:
              return [
                  new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
                  new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
                  new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
                  new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))
              ];
      }
  };

  var SMALL_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  var SAMPLE_TEXT = 'Hidden Text';
  var FontMetrics = /** @class */ (function () {
      function FontMetrics(document) {
          this._data = {};
          this._document = document;
      }
      FontMetrics.prototype.parseMetrics = function (fontFamily, fontSize) {
          var container = this._document.createElement('div');
          var img = this._document.createElement('img');
          var span = this._document.createElement('span');
          var body = this._document.body;
          container.style.visibility = 'hidden';
          container.style.fontFamily = fontFamily;
          container.style.fontSize = fontSize;
          container.style.margin = '0';
          container.style.padding = '0';
          container.style.whiteSpace = 'nowrap';
          body.appendChild(container);
          img.src = SMALL_IMAGE;
          img.width = 1;
          img.height = 1;
          img.style.margin = '0';
          img.style.padding = '0';
          img.style.verticalAlign = 'baseline';
          span.style.fontFamily = fontFamily;
          span.style.fontSize = fontSize;
          span.style.margin = '0';
          span.style.padding = '0';
          span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
          container.appendChild(span);
          container.appendChild(img);
          var baseline = img.offsetTop - span.offsetTop + 2;
          container.removeChild(span);
          container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
          container.style.lineHeight = 'normal';
          img.style.verticalAlign = 'super';
          var middle = img.offsetTop - container.offsetTop + 2;
          body.removeChild(container);
          return { baseline: baseline, middle: middle };
      };
      FontMetrics.prototype.getMetrics = function (fontFamily, fontSize) {
          var key = fontFamily + " " + fontSize;
          if (typeof this._data[key] === 'undefined') {
              this._data[key] = this.parseMetrics(fontFamily, fontSize);
          }
          return this._data[key];
      };
      return FontMetrics;
  }());

  var Renderer = /** @class */ (function () {
      function Renderer(context, options) {
          this.context = context;
          this.options = options;
      }
      return Renderer;
  }());

  var MASK_OFFSET = 10000;
  var CanvasRenderer = /** @class */ (function (_super) {
      __extends(CanvasRenderer, _super);
      function CanvasRenderer(context, options) {
          var _this = _super.call(this, context, options) || this;
          _this._activeEffects = [];
          _this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
          _this.ctx = _this.canvas.getContext('2d');
          if (!options.canvas) {
              _this.canvas.width = Math.floor(options.width * options.scale);
              _this.canvas.height = Math.floor(options.height * options.scale);
              _this.canvas.style.width = options.width + "px";
              _this.canvas.style.height = options.height + "px";
          }
          _this.fontMetrics = new FontMetrics(document);
          _this.ctx.scale(_this.options.scale, _this.options.scale);
          _this.ctx.translate(-options.x, -options.y);
          _this.ctx.textBaseline = 'bottom';
          _this._activeEffects = [];
          _this.context.logger.debug("Canvas renderer initialized (" + options.width + "x" + options.height + ") with scale " + options.scale);
          return _this;
      }
      CanvasRenderer.prototype.applyEffects = function (effects) {
          var _this = this;
          while (this._activeEffects.length) {
              this.popEffect();
          }
          effects.forEach(function (effect) { return _this.applyEffect(effect); });
      };
      CanvasRenderer.prototype.applyEffect = function (effect) {
          this.ctx.save();
          if (isOpacityEffect(effect)) {
              this.ctx.globalAlpha = effect.opacity;
          }
          if (isTransformEffect(effect)) {
              this.ctx.translate(effect.offsetX, effect.offsetY);
              this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
              this.ctx.translate(-effect.offsetX, -effect.offsetY);
          }
          if (isClipEffect(effect)) {
              this.path(effect.path);
              this.ctx.clip();
          }
          this._activeEffects.push(effect);
      };
      CanvasRenderer.prototype.popEffect = function () {
          this._activeEffects.pop();
          this.ctx.restore();
      };
      CanvasRenderer.prototype.renderStack = function (stack) {
          return __awaiter(this, void 0, void 0, function () {
              var styles;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          styles = stack.element.container.styles;
                          if (!styles.isVisible()) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.renderStackContent(stack)];
                      case 1:
                          _a.sent();
                          _a.label = 2;
                      case 2: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderNode = function (paint) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (contains(paint.container.flags, 16 /* DEBUG_RENDER */)) {
                              debugger;
                          }
                          if (!paint.container.styles.isVisible()) return [3 /*break*/, 3];
                          return [4 /*yield*/, this.renderNodeBackgroundAndBorders(paint)];
                      case 1:
                          _a.sent();
                          return [4 /*yield*/, this.renderNodeContent(paint)];
                      case 2:
                          _a.sent();
                          _a.label = 3;
                      case 3: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderTextWithLetterSpacing = function (text, letterSpacing, baseline) {
          var _this = this;
          if (letterSpacing === 0) {
            //this.ctx.textBaseline = 'ideographic';
            text.bounds.top = text.bounds.top - text.bounds.height / 4;
            this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + text.bounds.height);
          }
          else {
              var letters = segmentGraphemes(text.text);
              letters.reduce(function (left, letter) {
                  _this.ctx.fillText(letter, left, text.bounds.top + baseline);
                  return left + _this.ctx.measureText(letter).width;
              }, text.bounds.left);
          }
      };
      CanvasRenderer.prototype.createFontStyle = function (styles) {
          var fontVariant = styles.fontVariant
              .filter(function (variant) { return variant === 'normal' || variant === 'small-caps'; })
              .join('');
          var fontFamily = fixIOSSystemFonts(styles.fontFamily).join(', ');
          var fontSize = isDimensionToken(styles.fontSize)
              ? "" + styles.fontSize.number + styles.fontSize.unit
              : styles.fontSize.number + "px";
          return [
              [styles.fontStyle, fontVariant, styles.fontWeight, fontSize, fontFamily].join(' '),
              fontFamily,
              fontSize
          ];
      };
      CanvasRenderer.prototype.renderTextNode = function (text, styles) {
          return __awaiter(this, void 0, void 0, function () {
              var _a, font, fontFamily, fontSize, _b, baseline, middle, paintOrder;
              var _this = this;
              return __generator(this, function (_c) {
                  _a = this.createFontStyle(styles), font = _a[0], fontFamily = _a[1], fontSize = _a[2];
                  this.ctx.font = font;
                  this.ctx.direction = styles.direction === 1 /* RTL */ ? 'rtl' : 'ltr';
                  this.ctx.textAlign = 'left';
                  this.ctx.textBaseline = 'alphabetic';
                  _b = this.fontMetrics.getMetrics(fontFamily, fontSize), baseline = _b.baseline, middle = _b.middle;
                  paintOrder = styles.paintOrder;
                  text.textBounds.forEach(function (text) {
                      paintOrder.forEach(function (paintOrderLayer) {
                          switch (paintOrderLayer) {
                              case 0 /* FILL */:
                                  _this.ctx.fillStyle = asString(styles.color);
                                  _this.renderTextWithLetterSpacing(text, styles.letterSpacing, baseline);
                                  var textShadows = styles.textShadow;
                                  if (textShadows.length && text.text.trim().length) {
                                      textShadows
                                          .slice(0)
                                          .reverse()
                                          .forEach(function (textShadow) {
                                          _this.ctx.shadowColor = asString(textShadow.color);
                                          _this.ctx.shadowOffsetX = textShadow.offsetX.number * _this.options.scale;
                                          _this.ctx.shadowOffsetY = textShadow.offsetY.number * _this.options.scale;
                                          _this.ctx.shadowBlur = textShadow.blur.number;
                                          _this.renderTextWithLetterSpacing(text, styles.letterSpacing, baseline);
                                      });
                                      _this.ctx.shadowColor = '';
                                      _this.ctx.shadowOffsetX = 0;
                                      _this.ctx.shadowOffsetY = 0;
                                      _this.ctx.shadowBlur = 0;
                                  }
                                  if (styles.textDecorationLine.length) {
                                      _this.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
                                      styles.textDecorationLine.forEach(function (textDecorationLine) {
                                          switch (textDecorationLine) {
                                              case 1 /* UNDERLINE */:
                                                  // Draws a line at the baseline of the font
                                                  // TODO As some browsers display the line as more than 1px if the font-size is big,
                                                  // need to take that into account both in position and size
                                                  _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top + baseline), text.bounds.width, 1);
                                                  break;
                                              case 2 /* OVERLINE */:
                                                  _this.ctx.fillRect(text.bounds.left, Math.round(text.bounds.top), text.bounds.width, 1);
                                                  break;
                                              case 3 /* LINE_THROUGH */:
                                                  // TODO try and find exact position for line-through
                                                  _this.ctx.fillRect(text.bounds.left, Math.ceil(text.bounds.top + middle), text.bounds.width, 1);
                                                  break;
                                          }
                                      });
                                  }
                                  break;
                              case 1 /* STROKE */:
                                  if (styles.webkitTextStrokeWidth && text.text.trim().length) {
                                      _this.ctx.strokeStyle = asString(styles.webkitTextStrokeColor);
                                      _this.ctx.lineWidth = styles.webkitTextStrokeWidth;
                                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                      _this.ctx.lineJoin = !!window.chrome ? 'miter' : 'round';
                                      _this.ctx.strokeText(text.text, text.bounds.left, text.bounds.top + baseline);
                                  }
                                  _this.ctx.strokeStyle = '';
                                  _this.ctx.lineWidth = 0;
                                  _this.ctx.lineJoin = 'miter';
                                  break;
                          }
                      });
                  });
                  return [2 /*return*/];
              });
          });
      };
      CanvasRenderer.prototype.renderReplacedElement = function (container, curves, image) {
          if (image && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
              var box = contentBox(container);
              var path = calculatePaddingBoxPath(curves);
              this.path(path);
              this.ctx.save();
              this.ctx.clip();
              this.ctx.drawImage(image, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
              this.ctx.restore();
          }
      };
      CanvasRenderer.prototype.renderNodeContent = function (paint) {
          return __awaiter(this, void 0, void 0, function () {
              var container, curves, styles, _i, _a, child, image, image, iframeRenderer, canvas, size, _b, fontFamily, fontSize, baseline, bounds, x, textBounds, img, image, url, fontFamily, bounds;
              return __generator(this, function (_c) {
                  switch (_c.label) {
                      case 0:
                          this.applyEffects(paint.getEffects(4 /* CONTENT */));
                          container = paint.container;
                          curves = paint.curves;
                          styles = container.styles;
                          _i = 0, _a = container.textNodes;
                          _c.label = 1;
                      case 1:
                          if (!(_i < _a.length)) return [3 /*break*/, 4];
                          child = _a[_i];
                          return [4 /*yield*/, this.renderTextNode(child, styles)];
                      case 2:
                          _c.sent();
                          _c.label = 3;
                      case 3:
                          _i++;
                          return [3 /*break*/, 1];
                      case 4:
                          if (!(container instanceof ImageElementContainer)) return [3 /*break*/, 8];
                          _c.label = 5;
                      case 5:
                          _c.trys.push([5, 7, , 8]);
                          return [4 /*yield*/, this.context.cache.match(container.src)];
                      case 6:
                          image = _c.sent();
                          this.renderReplacedElement(container, curves, image);
                          return [3 /*break*/, 8];
                      case 7:
                          _c.sent();
                          this.context.logger.error("Error loading image " + container.src);
                          return [3 /*break*/, 8];
                      case 8:
                          if (container instanceof CanvasElementContainer) {
                              this.renderReplacedElement(container, curves, container.canvas);
                          }
                          if (!(container instanceof SVGElementContainer)) return [3 /*break*/, 12];
                          _c.label = 9;
                      case 9:
                          _c.trys.push([9, 11, , 12]);
                          return [4 /*yield*/, this.context.cache.match(container.svg)];
                      case 10:
                          image = _c.sent();
                          this.renderReplacedElement(container, curves, image);
                          return [3 /*break*/, 12];
                      case 11:
                          _c.sent();
                          this.context.logger.error("Error loading svg " + container.svg.substring(0, 255));
                          return [3 /*break*/, 12];
                      case 12:
                          if (!(container instanceof IFrameElementContainer && container.tree)) return [3 /*break*/, 14];
                          iframeRenderer = new CanvasRenderer(this.context, {
                              scale: this.options.scale,
                              backgroundColor: container.backgroundColor,
                              x: 0,
                              y: 0,
                              width: container.width,
                              height: container.height
                          });
                          return [4 /*yield*/, iframeRenderer.render(container.tree)];
                      case 13:
                          canvas = _c.sent();
                          if (container.width && container.height) {
                              this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
                          }
                          _c.label = 14;
                      case 14:
                          if (container instanceof InputElementContainer) {
                              size = Math.min(container.bounds.width, container.bounds.height);
                              if (container.type === CHECKBOX) {
                                  if (container.checked) {
                                      this.ctx.save();
                                      this.path([
                                          new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                                          new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                                          new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                                          new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                                          new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                                          new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                                          new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)
                                      ]);
                                      this.ctx.fillStyle = asString(INPUT_COLOR);
                                      this.ctx.fill();
                                      this.ctx.restore();
                                  }
                              }
                              else if (container.type === RADIO) {
                                  if (container.checked) {
                                      this.ctx.save();
                                      this.ctx.beginPath();
                                      this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                                      this.ctx.fillStyle = asString(INPUT_COLOR);
                                      this.ctx.fill();
                                      this.ctx.restore();
                                  }
                              }
                          }
                          if (isTextInputElement(container) && container.value.length) {
                              _b = this.createFontStyle(styles), fontFamily = _b[0], fontSize = _b[1];
                              baseline = this.fontMetrics.getMetrics(fontFamily, fontSize).baseline;
                              this.ctx.font = fontFamily;
                              this.ctx.fillStyle = asString(styles.color);
                              this.ctx.textBaseline = 'alphabetic';
                              this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                              bounds = contentBox(container);
                              x = 0;
                              switch (container.styles.textAlign) {
                                  case 1 /* CENTER */:
                                      x += bounds.width / 2;
                                      break;
                                  case 2 /* RIGHT */:
                                      x += bounds.width;
                                      break;
                              }
                              textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                              this.ctx.save();
                              this.path([
                                  new Vector(bounds.left, bounds.top),
                                  new Vector(bounds.left + bounds.width, bounds.top),
                                  new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                                  new Vector(bounds.left, bounds.top + bounds.height)
                              ]);
                              this.ctx.clip();
                              this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing, baseline);
                              this.ctx.restore();
                              this.ctx.textBaseline = 'alphabetic';
                              this.ctx.textAlign = 'left';
                          }
                          if (!contains(container.styles.display, 2048 /* LIST_ITEM */)) return [3 /*break*/, 20];
                          if (!(container.styles.listStyleImage !== null)) return [3 /*break*/, 19];
                          img = container.styles.listStyleImage;
                          if (!(img.type === 0 /* URL */)) return [3 /*break*/, 18];
                          image = void 0;
                          url = img.url;
                          _c.label = 15;
                      case 15:
                          _c.trys.push([15, 17, , 18]);
                          return [4 /*yield*/, this.context.cache.match(url)];
                      case 16:
                          image = _c.sent();
                          this.ctx.drawImage(image, container.bounds.left - (image.width + 10), container.bounds.top);
                          return [3 /*break*/, 18];
                      case 17:
                          _c.sent();
                          this.context.logger.error("Error loading list-style-image " + url);
                          return [3 /*break*/, 18];
                      case 18: return [3 /*break*/, 20];
                      case 19:
                          if (paint.listValue && container.styles.listStyleType !== -1 /* NONE */) {
                              fontFamily = this.createFontStyle(styles)[0];
                              this.ctx.font = fontFamily;
                              this.ctx.fillStyle = asString(styles.color);
                              this.ctx.textBaseline = 'middle';
                              this.ctx.textAlign = 'right';
                              bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                              this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 2);
                              this.ctx.textBaseline = 'bottom';
                              this.ctx.textAlign = 'left';
                          }
                          _c.label = 20;
                      case 20: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderStackContent = function (stack) {
          return __awaiter(this, void 0, void 0, function () {
              var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
              return __generator(this, function (_p) {
                  switch (_p.label) {
                      case 0:
                          if (contains(stack.element.container.flags, 16 /* DEBUG_RENDER */)) {
                              debugger;
                          }
                          // https://www.w3.org/TR/css-position-3/#painting-order
                          // 1. the background and borders of the element forming the stacking context.
                          return [4 /*yield*/, this.renderNodeBackgroundAndBorders(stack.element)];
                      case 1:
                          // https://www.w3.org/TR/css-position-3/#painting-order
                          // 1. the background and borders of the element forming the stacking context.
                          _p.sent();
                          _i = 0, _a = stack.negativeZIndex;
                          _p.label = 2;
                      case 2:
                          if (!(_i < _a.length)) return [3 /*break*/, 5];
                          child = _a[_i];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 3:
                          _p.sent();
                          _p.label = 4;
                      case 4:
                          _i++;
                          return [3 /*break*/, 2];
                      case 5: 
                      // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
                      return [4 /*yield*/, this.renderNodeContent(stack.element)];
                      case 6:
                          // 3. For all its in-flow, non-positioned, block-level descendants in tree order:
                          _p.sent();
                          _b = 0, _c = stack.nonInlineLevel;
                          _p.label = 7;
                      case 7:
                          if (!(_b < _c.length)) return [3 /*break*/, 10];
                          child = _c[_b];
                          return [4 /*yield*/, this.renderNode(child)];
                      case 8:
                          _p.sent();
                          _p.label = 9;
                      case 9:
                          _b++;
                          return [3 /*break*/, 7];
                      case 10:
                          _d = 0, _e = stack.nonPositionedFloats;
                          _p.label = 11;
                      case 11:
                          if (!(_d < _e.length)) return [3 /*break*/, 14];
                          child = _e[_d];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 12:
                          _p.sent();
                          _p.label = 13;
                      case 13:
                          _d++;
                          return [3 /*break*/, 11];
                      case 14:
                          _f = 0, _g = stack.nonPositionedInlineLevel;
                          _p.label = 15;
                      case 15:
                          if (!(_f < _g.length)) return [3 /*break*/, 18];
                          child = _g[_f];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 16:
                          _p.sent();
                          _p.label = 17;
                      case 17:
                          _f++;
                          return [3 /*break*/, 15];
                      case 18:
                          _h = 0, _j = stack.inlineLevel;
                          _p.label = 19;
                      case 19:
                          if (!(_h < _j.length)) return [3 /*break*/, 22];
                          child = _j[_h];
                          return [4 /*yield*/, this.renderNode(child)];
                      case 20:
                          _p.sent();
                          _p.label = 21;
                      case 21:
                          _h++;
                          return [3 /*break*/, 19];
                      case 22:
                          _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
                          _p.label = 23;
                      case 23:
                          if (!(_k < _l.length)) return [3 /*break*/, 26];
                          child = _l[_k];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 24:
                          _p.sent();
                          _p.label = 25;
                      case 25:
                          _k++;
                          return [3 /*break*/, 23];
                      case 26:
                          _m = 0, _o = stack.positiveZIndex;
                          _p.label = 27;
                      case 27:
                          if (!(_m < _o.length)) return [3 /*break*/, 30];
                          child = _o[_m];
                          return [4 /*yield*/, this.renderStack(child)];
                      case 28:
                          _p.sent();
                          _p.label = 29;
                      case 29:
                          _m++;
                          return [3 /*break*/, 27];
                      case 30: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.mask = function (paths) {
          this.ctx.beginPath();
          this.ctx.moveTo(0, 0);
          this.ctx.lineTo(this.canvas.width, 0);
          this.ctx.lineTo(this.canvas.width, this.canvas.height);
          this.ctx.lineTo(0, this.canvas.height);
          this.ctx.lineTo(0, 0);
          this.formatPath(paths.slice(0).reverse());
          this.ctx.closePath();
      };
      CanvasRenderer.prototype.path = function (paths) {
          this.ctx.beginPath();
          this.formatPath(paths);
          this.ctx.closePath();
      };
      CanvasRenderer.prototype.formatPath = function (paths) {
          var _this = this;
          paths.forEach(function (point, index) {
              var start = isBezierCurve(point) ? point.start : point;
              if (index === 0) {
                  _this.ctx.moveTo(start.x, start.y);
              }
              else {
                  _this.ctx.lineTo(start.x, start.y);
              }
              if (isBezierCurve(point)) {
                  _this.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
              }
          });
      };
      CanvasRenderer.prototype.renderRepeat = function (path, pattern, offsetX, offsetY) {
          this.path(path);
          this.ctx.fillStyle = pattern;
          this.ctx.translate(offsetX, offsetY);
          this.ctx.fill();
          this.ctx.translate(-offsetX, -offsetY);
      };
      CanvasRenderer.prototype.resizeImage = function (image, width, height) {
          var _a;
          if (image.width === width && image.height === height) {
              return image;
          }
          var ownerDocument = (_a = this.canvas.ownerDocument) !== null && _a !== void 0 ? _a : document;
          var canvas = ownerDocument.createElement('canvas');
          canvas.width = Math.max(1, width);
          canvas.height = Math.max(1, height);
          var ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
          return canvas;
      };
      CanvasRenderer.prototype.renderBackgroundImage = function (container) {
          return __awaiter(this, void 0, void 0, function () {
              var index, _loop_1, this_1, _i, _a, backgroundImage;
              return __generator(this, function (_b) {
                  switch (_b.label) {
                      case 0:
                          index = container.styles.backgroundImage.length - 1;
                          _loop_1 = function (backgroundImage) {
                              var image, url, _c, path, x, y, width, height, pattern, _d, path, x, y, width, height, _e, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _f, path, left, top_1, width, height, position, x, y, _g, rx, ry, radialGradient_1, midX, midY, f, invF;
                              return __generator(this, function (_h) {
                                  switch (_h.label) {
                                      case 0:
                                          if (!(backgroundImage.type === 0 /* URL */)) return [3 /*break*/, 5];
                                          image = void 0;
                                          url = backgroundImage.url;
                                          _h.label = 1;
                                      case 1:
                                          _h.trys.push([1, 3, , 4]);
                                          return [4 /*yield*/, this_1.context.cache.match(url)];
                                      case 2:
                                          image = _h.sent();
                                          return [3 /*break*/, 4];
                                      case 3:
                                          _h.sent();
                                          this_1.context.logger.error("Error loading background-image " + url);
                                          return [3 /*break*/, 4];
                                      case 4:
                                          if (image) {
                                              _c = calculateBackgroundRendering(container, index, [
                                                  image.width,
                                                  image.height,
                                                  image.width / image.height
                                              ]), path = _c[0], x = _c[1], y = _c[2], width = _c[3], height = _c[4];
                                              pattern = this_1.ctx.createPattern(this_1.resizeImage(image, width, height), 'repeat');
                                              this_1.renderRepeat(path, pattern, x, y);
                                          }
                                          return [3 /*break*/, 6];
                                      case 5:
                                          if (isLinearGradient(backgroundImage)) {
                                              _d = calculateBackgroundRendering(container, index, [null, null, null]), path = _d[0], x = _d[1], y = _d[2], width = _d[3], height = _d[4];
                                              _e = calculateGradientDirection(backgroundImage.angle, width, height), lineLength = _e[0], x0 = _e[1], x1 = _e[2], y0 = _e[3], y1 = _e[4];
                                              canvas = document.createElement('canvas');
                                              canvas.width = width;
                                              canvas.height = height;
                                              ctx = canvas.getContext('2d');
                                              gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                                              processColorStops(backgroundImage.stops, lineLength).forEach(function (colorStop) {
                                                  return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                              });
                                              ctx.fillStyle = gradient_1;
                                              ctx.fillRect(0, 0, width, height);
                                              if (width > 0 && height > 0) {
                                                  pattern = this_1.ctx.createPattern(canvas, 'repeat');
                                                  this_1.renderRepeat(path, pattern, x, y);
                                              }
                                          }
                                          else if (isRadialGradient(backgroundImage)) {
                                              _f = calculateBackgroundRendering(container, index, [
                                                  null,
                                                  null,
                                                  null
                                              ]), path = _f[0], left = _f[1], top_1 = _f[2], width = _f[3], height = _f[4];
                                              position = backgroundImage.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage.position;
                                              x = getAbsoluteValue(position[0], width);
                                              y = getAbsoluteValue(position[position.length - 1], height);
                                              _g = calculateRadius(backgroundImage, x, y, width, height), rx = _g[0], ry = _g[1];
                                              if (rx > 0 && ry > 0) {
                                                  radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                                                  processColorStops(backgroundImage.stops, rx * 2).forEach(function (colorStop) {
                                                      return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                                  });
                                                  this_1.path(path);
                                                  this_1.ctx.fillStyle = radialGradient_1;
                                                  if (rx !== ry) {
                                                      midX = container.bounds.left + 0.5 * container.bounds.width;
                                                      midY = container.bounds.top + 0.5 * container.bounds.height;
                                                      f = ry / rx;
                                                      invF = 1 / f;
                                                      this_1.ctx.save();
                                                      this_1.ctx.translate(midX, midY);
                                                      this_1.ctx.transform(1, 0, 0, f, 0, 0);
                                                      this_1.ctx.translate(-midX, -midY);
                                                      this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                                                      this_1.ctx.restore();
                                                  }
                                                  else {
                                                      this_1.ctx.fill();
                                                  }
                                              }
                                          }
                                          _h.label = 6;
                                      case 6:
                                          index--;
                                          return [2 /*return*/];
                                  }
                              });
                          };
                          this_1 = this;
                          _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
                          _b.label = 1;
                      case 1:
                          if (!(_i < _a.length)) return [3 /*break*/, 4];
                          backgroundImage = _a[_i];
                          return [5 /*yield**/, _loop_1(backgroundImage)];
                      case 2:
                          _b.sent();
                          _b.label = 3;
                      case 3:
                          _i++;
                          return [3 /*break*/, 1];
                      case 4: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderSolidBorder = function (color, side, curvePoints) {
          return __awaiter(this, void 0, void 0, function () {
              return __generator(this, function (_a) {
                  this.path(parsePathForBorder(curvePoints, side));
                  this.ctx.fillStyle = asString(color);
                  this.ctx.fill();
                  return [2 /*return*/];
              });
          });
      };
      CanvasRenderer.prototype.renderDoubleBorder = function (color, width, side, curvePoints) {
          return __awaiter(this, void 0, void 0, function () {
              var outerPaths, innerPaths;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (!(width < 3)) return [3 /*break*/, 2];
                          return [4 /*yield*/, this.renderSolidBorder(color, side, curvePoints)];
                      case 1:
                          _a.sent();
                          return [2 /*return*/];
                      case 2:
                          outerPaths = parsePathForBorderDoubleOuter(curvePoints, side);
                          this.path(outerPaths);
                          this.ctx.fillStyle = asString(color);
                          this.ctx.fill();
                          innerPaths = parsePathForBorderDoubleInner(curvePoints, side);
                          this.path(innerPaths);
                          this.ctx.fill();
                          return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderNodeBackgroundAndBorders = function (paint) {
          return __awaiter(this, void 0, void 0, function () {
              var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
              var _this = this;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          this.applyEffects(paint.getEffects(2 /* BACKGROUND_BORDERS */));
                          styles = paint.container.styles;
                          hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
                          borders = [
                              { style: styles.borderTopStyle, color: styles.borderTopColor, width: styles.borderTopWidth },
                              { style: styles.borderRightStyle, color: styles.borderRightColor, width: styles.borderRightWidth },
                              { style: styles.borderBottomStyle, color: styles.borderBottomColor, width: styles.borderBottomWidth },
                              { style: styles.borderLeftStyle, color: styles.borderLeftColor, width: styles.borderLeftWidth }
                          ];
                          backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
                          if (!(hasBackground || styles.boxShadow.length)) return [3 /*break*/, 2];
                          this.ctx.save();
                          this.path(backgroundPaintingArea);
                          this.ctx.clip();
                          if (!isTransparent(styles.backgroundColor)) {
                              this.ctx.fillStyle = asString(styles.backgroundColor);
                              this.ctx.fill();
                          }
                          return [4 /*yield*/, this.renderBackgroundImage(paint.container)];
                      case 1:
                          _a.sent();
                          this.ctx.restore();
                          styles.boxShadow
                              .slice(0)
                              .reverse()
                              .forEach(function (shadow) {
                              _this.ctx.save();
                              var borderBoxArea = calculateBorderBoxPath(paint.curves);
                              var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                              var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                              if (shadow.inset) {
                                  _this.path(borderBoxArea);
                                  _this.ctx.clip();
                                  _this.mask(shadowPaintingArea);
                              }
                              else {
                                  _this.mask(borderBoxArea);
                                  _this.ctx.clip();
                                  _this.path(shadowPaintingArea);
                              }
                              _this.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                              _this.ctx.shadowOffsetY = shadow.offsetY.number;
                              _this.ctx.shadowColor = asString(shadow.color);
                              _this.ctx.shadowBlur = shadow.blur.number;
                              _this.ctx.fillStyle = shadow.inset ? asString(shadow.color) : 'rgba(0,0,0,1)';
                              _this.ctx.fill();
                              _this.ctx.restore();
                          });
                          _a.label = 2;
                      case 2:
                          side = 0;
                          _i = 0, borders_1 = borders;
                          _a.label = 3;
                      case 3:
                          if (!(_i < borders_1.length)) return [3 /*break*/, 13];
                          border = borders_1[_i];
                          if (!(border.style !== 0 /* NONE */ && !isTransparent(border.color) && border.width > 0)) return [3 /*break*/, 11];
                          if (!(border.style === 2 /* DASHED */)) return [3 /*break*/, 5];
                          return [4 /*yield*/, this.renderDashedDottedBorder(border.color, border.width, side, paint.curves, 2 /* DASHED */)];
                      case 4:
                          _a.sent();
                          return [3 /*break*/, 11];
                      case 5:
                          if (!(border.style === 3 /* DOTTED */)) return [3 /*break*/, 7];
                          return [4 /*yield*/, this.renderDashedDottedBorder(border.color, border.width, side, paint.curves, 3 /* DOTTED */)];
                      case 6:
                          _a.sent();
                          return [3 /*break*/, 11];
                      case 7:
                          if (!(border.style === 4 /* DOUBLE */)) return [3 /*break*/, 9];
                          return [4 /*yield*/, this.renderDoubleBorder(border.color, border.width, side, paint.curves)];
                      case 8:
                          _a.sent();
                          return [3 /*break*/, 11];
                      case 9: return [4 /*yield*/, this.renderSolidBorder(border.color, side, paint.curves)];
                      case 10:
                          _a.sent();
                          _a.label = 11;
                      case 11:
                          side++;
                          _a.label = 12;
                      case 12:
                          _i++;
                          return [3 /*break*/, 3];
                      case 13: return [2 /*return*/];
                  }
              });
          });
      };
      CanvasRenderer.prototype.renderDashedDottedBorder = function (color, width, side, curvePoints, style) {
          return __awaiter(this, void 0, void 0, function () {
              var strokePaths, boxPaths, startX, startY, endX, endY, length, dashLength, spaceLength, useLineDash, multiplier, numberOfDashes, minSpace, maxSpace, path1, path2, path1, path2;
              return __generator(this, function (_a) {
                  this.ctx.save();
                  strokePaths = parsePathForBorderStroke(curvePoints, side);
                  boxPaths = parsePathForBorder(curvePoints, side);
                  if (style === 2 /* DASHED */) {
                      this.path(boxPaths);
                      this.ctx.clip();
                  }
                  if (isBezierCurve(boxPaths[0])) {
                      startX = boxPaths[0].start.x;
                      startY = boxPaths[0].start.y;
                  }
                  else {
                      startX = boxPaths[0].x;
                      startY = boxPaths[0].y;
                  }
                  if (isBezierCurve(boxPaths[1])) {
                      endX = boxPaths[1].end.x;
                      endY = boxPaths[1].end.y;
                  }
                  else {
                      endX = boxPaths[1].x;
                      endY = boxPaths[1].y;
                  }
                  if (side === 0 || side === 2) {
                      length = Math.abs(startX - endX);
                  }
                  else {
                      length = Math.abs(startY - endY);
                  }
                  this.ctx.beginPath();
                  if (style === 3 /* DOTTED */) {
                      this.formatPath(strokePaths);
                  }
                  else {
                      this.formatPath(boxPaths.slice(0, 2));
                  }
                  dashLength = width < 3 ? width * 3 : width * 2;
                  spaceLength = width < 3 ? width * 2 : width;
                  if (style === 3 /* DOTTED */) {
                      dashLength = width;
                      spaceLength = width;
                  }
                  useLineDash = true;
                  if (length <= dashLength * 2) {
                      useLineDash = false;
                  }
                  else if (length <= dashLength * 2 + spaceLength) {
                      multiplier = length / (2 * dashLength + spaceLength);
                      dashLength *= multiplier;
                      spaceLength *= multiplier;
                  }
                  else {
                      numberOfDashes = Math.floor((length + spaceLength) / (dashLength + spaceLength));
                      minSpace = (length - numberOfDashes * dashLength) / (numberOfDashes - 1);
                      maxSpace = (length - (numberOfDashes + 1) * dashLength) / numberOfDashes;
                      spaceLength =
                          maxSpace <= 0 || Math.abs(spaceLength - minSpace) < Math.abs(spaceLength - maxSpace)
                              ? minSpace
                              : maxSpace;
                  }
                  if (useLineDash) {
                      if (style === 3 /* DOTTED */) {
                          this.ctx.setLineDash([0, dashLength + spaceLength]);
                      }
                      else {
                          this.ctx.setLineDash([dashLength, spaceLength]);
                      }
                  }
                  if (style === 3 /* DOTTED */) {
                      this.ctx.lineCap = 'round';
                      this.ctx.lineWidth = width;
                  }
                  else {
                      this.ctx.lineWidth = width * 2 + 1.1;
                  }
                  this.ctx.strokeStyle = asString(color);
                  this.ctx.stroke();
                  this.ctx.setLineDash([]);
                  // dashed round edge gap
                  if (style === 2 /* DASHED */) {
                      if (isBezierCurve(boxPaths[0])) {
                          path1 = boxPaths[3];
                          path2 = boxPaths[0];
                          this.ctx.beginPath();
                          this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
                          this.ctx.stroke();
                      }
                      if (isBezierCurve(boxPaths[1])) {
                          path1 = boxPaths[1];
                          path2 = boxPaths[2];
                          this.ctx.beginPath();
                          this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
                          this.ctx.stroke();
                      }
                  }
                  this.ctx.restore();
                  return [2 /*return*/];
              });
          });
      };
      CanvasRenderer.prototype.render = function (element) {
          return __awaiter(this, void 0, void 0, function () {
              var stack;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          if (this.options.backgroundColor) {
                              this.ctx.fillStyle = asString(this.options.backgroundColor);
                              this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height);
                          }
                          stack = parseStackingContexts(element);
                          return [4 /*yield*/, this.renderStack(stack)];
                      case 1:
                          _a.sent();
                          this.applyEffects([]);
                          return [2 /*return*/, this.canvas];
                  }
              });
          });
      };
      return CanvasRenderer;
  }(Renderer));
  var isTextInputElement = function (container) {
      if (container instanceof TextareaElementContainer) {
          return true;
      }
      else if (container instanceof SelectElementContainer) {
          return true;
      }
      else if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
          return true;
      }
      return false;
  };
  var calculateBackgroundCurvedPaintingArea = function (clip, curves) {
      switch (clip) {
          case 0 /* BORDER_BOX */:
              return calculateBorderBoxPath(curves);
          case 2 /* CONTENT_BOX */:
              return calculateContentBoxPath(curves);
          case 1 /* PADDING_BOX */:
          default:
              return calculatePaddingBoxPath(curves);
      }
  };
  var canvasTextAlign = function (textAlign) {
      switch (textAlign) {
          case 1 /* CENTER */:
              return 'center';
          case 2 /* RIGHT */:
              return 'right';
          case 0 /* LEFT */:
          default:
              return 'left';
      }
  };
  // see https://github.com/niklasvh/html2canvas/pull/2645
  var iOSBrokenFonts = ['-apple-system', 'system-ui'];
  var fixIOSSystemFonts = function (fontFamilies) {
      return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent)
          ? fontFamilies.filter(function (fontFamily) { return iOSBrokenFonts.indexOf(fontFamily) === -1; })
          : fontFamilies;
  };

  var ForeignObjectRenderer = /** @class */ (function (_super) {
      __extends(ForeignObjectRenderer, _super);
      function ForeignObjectRenderer(context, options) {
          var _this = _super.call(this, context, options) || this;
          _this.canvas = options.canvas ? options.canvas : document.createElement('canvas');
          _this.ctx = _this.canvas.getContext('2d');
          _this.options = options;
          _this.canvas.width = Math.floor(options.width * options.scale);
          _this.canvas.height = Math.floor(options.height * options.scale);
          _this.canvas.style.width = options.width + "px";
          _this.canvas.style.height = options.height + "px";
          _this.ctx.scale(_this.options.scale, _this.options.scale);
          _this.ctx.translate(-options.x, -options.y);
          _this.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
          return _this;
      }
      ForeignObjectRenderer.prototype.render = function (element) {
          return __awaiter(this, void 0, void 0, function () {
              var svg, img;
              return __generator(this, function (_a) {
                  switch (_a.label) {
                      case 0:
                          svg = createForeignObjectSVG(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, element);
                          return [4 /*yield*/, loadSerializedSVG(svg)];
                      case 1:
                          img = _a.sent();
                          if (this.options.backgroundColor) {
                              this.ctx.fillStyle = asString(this.options.backgroundColor);
                              this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
                          }
                          this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
                          return [2 /*return*/, this.canvas];
                  }
              });
          });
      };
      return ForeignObjectRenderer;
  }(Renderer));
  var loadSerializedSVG = function (svg) {
      return new Promise(function (resolve, reject) {
          var img = new Image();
          img.onload = function () {
              resolve(img);
          };
          img.onerror = reject;
          img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
      });
  };

  var Logger = /** @class */ (function () {
      function Logger(_a) {
          var id = _a.id, enabled = _a.enabled;
          this.id = id;
          this.enabled = enabled;
          this.start = Date.now();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.prototype.debug = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (this.enabled) {
              // eslint-disable-next-line no-console
              if (typeof window !== 'undefined' && window.console && typeof console.debug === 'function') {
                  // eslint-disable-next-line no-console
                  console.debug.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
              }
              else {
                  this.info.apply(this, args);
              }
          }
      };
      Logger.prototype.getTime = function () {
          return Date.now() - this.start;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.prototype.info = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (this.enabled) {
              // eslint-disable-next-line no-console
              if (typeof window !== 'undefined' && window.console && typeof console.info === 'function') {
                  // eslint-disable-next-line no-console
                  console.info.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
              }
          }
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.prototype.warn = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (this.enabled) {
              // eslint-disable-next-line no-console
              if (typeof window !== 'undefined' && window.console && typeof console.warn === 'function') {
                  // eslint-disable-next-line no-console
                  console.warn.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
              }
              else {
                  this.info.apply(this, args);
              }
          }
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Logger.prototype.error = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          if (this.enabled) {
              // eslint-disable-next-line no-console
              if (typeof window !== 'undefined' && window.console && typeof console.error === 'function') {
                  // eslint-disable-next-line no-console
                  console.error.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
              }
              else {
                  this.info.apply(this, args);
              }
          }
      };
      Logger.instances = {};
      return Logger;
  }());

  var Context = /** @class */ (function () {
      function Context(options, windowBounds) {
          var _a;
          this.windowBounds = windowBounds;
          this.instanceName = "#" + Context.instanceCount++;
          this.logger = new Logger({ id: this.instanceName, enabled: options.logging });
          this.cache = (_a = options.cache) !== null && _a !== void 0 ? _a : new Cache(this, options);
      }
      Context.instanceCount = 1;
      return Context;
  }());

  var html2canvas = function (element, options) {
      if (options === void 0) { options = {}; }
      return renderElement(element, options);
  };
  if (typeof window !== 'undefined') {
      CacheStorage.setContext(window);
  }
  var renderElement = function (element, opts) { return __awaiter(void 0, void 0, void 0, function () {
      var ownerDocument, defaultView, resourceOptions, contextOptions, windowOptions, windowBounds, context, foreignObjectRendering, cloneOptions, documentCloner, clonedElement, container, _a, width, height, left, top, backgroundColor, renderOptions, canvas, renderer, root, renderer;
      var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
      return __generator(this, function (_u) {
          switch (_u.label) {
              case 0:
                  if (!element || typeof element !== 'object') {
                      return [2 /*return*/, Promise.reject('Invalid element provided as first argument')];
                  }
                  ownerDocument = element.ownerDocument;
                  if (!ownerDocument) {
                      throw new Error("Element is not attached to a Document");
                  }
                  defaultView = ownerDocument.defaultView;
                  if (!defaultView) {
                      throw new Error("Document is not attached to a Window");
                  }
                  resourceOptions = {
                      allowTaint: (_b = opts.allowTaint) !== null && _b !== void 0 ? _b : false,
                      imageTimeout: (_c = opts.imageTimeout) !== null && _c !== void 0 ? _c : 15000,
                      proxy: opts.proxy,
                      useCORS: (_d = opts.useCORS) !== null && _d !== void 0 ? _d : false
                  };
                  contextOptions = __assign({ logging: (_e = opts.logging) !== null && _e !== void 0 ? _e : true, cache: opts.cache }, resourceOptions);
                  windowOptions = {
                      windowWidth: (_f = opts.windowWidth) !== null && _f !== void 0 ? _f : defaultView.innerWidth,
                      windowHeight: (_g = opts.windowHeight) !== null && _g !== void 0 ? _g : defaultView.innerHeight,
                      scrollX: (_h = opts.scrollX) !== null && _h !== void 0 ? _h : defaultView.pageXOffset,
                      scrollY: (_j = opts.scrollY) !== null && _j !== void 0 ? _j : defaultView.pageYOffset
                  };
                  windowBounds = new Bounds(windowOptions.scrollX, windowOptions.scrollY, windowOptions.windowWidth, windowOptions.windowHeight);
                  context = new Context(contextOptions, windowBounds);
                  foreignObjectRendering = (_k = opts.foreignObjectRendering) !== null && _k !== void 0 ? _k : false;
                  cloneOptions = {
                      allowTaint: (_l = opts.allowTaint) !== null && _l !== void 0 ? _l : false,
                      onclone: opts.onclone,
                      ignoreElements: opts.ignoreElements,
                      inlineImages: foreignObjectRendering,
                      copyStyles: foreignObjectRendering
                  };
                  context.logger.debug("Starting document clone with size " + windowBounds.width + "x" + windowBounds.height + " scrolled to " + -windowBounds.left + "," + -windowBounds.top);
                  documentCloner = new DocumentCloner(context, element, cloneOptions);
                  clonedElement = documentCloner.clonedReferenceElement;
                  if (!clonedElement) {
                      return [2 /*return*/, Promise.reject("Unable to find element in cloned iframe")];
                  }
                  return [4 /*yield*/, documentCloner.toIFrame(ownerDocument, windowBounds)];
              case 1:
                  container = _u.sent();
                  _a = isBodyElement(clonedElement) || isHTMLElement(clonedElement)
                      ? parseDocumentSize(clonedElement.ownerDocument)
                      : parseBounds(context, clonedElement), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
                  backgroundColor = parseBackgroundColor(context, clonedElement, opts.backgroundColor);
                  renderOptions = {
                      canvas: opts.canvas,
                      backgroundColor: backgroundColor,
                      scale: (_o = (_m = opts.scale) !== null && _m !== void 0 ? _m : defaultView.devicePixelRatio) !== null && _o !== void 0 ? _o : 1,
                      x: ((_p = opts.x) !== null && _p !== void 0 ? _p : 0) + left,
                      y: ((_q = opts.y) !== null && _q !== void 0 ? _q : 0) + top,
                      width: (_r = opts.width) !== null && _r !== void 0 ? _r : Math.ceil(width),
                      height: (_s = opts.height) !== null && _s !== void 0 ? _s : Math.ceil(height)
                  };
                  if (!foreignObjectRendering) return [3 /*break*/, 3];
                  context.logger.debug("Document cloned, using foreign object rendering");
                  renderer = new ForeignObjectRenderer(context, renderOptions);
                  return [4 /*yield*/, renderer.render(clonedElement)];
              case 2:
                  canvas = _u.sent();
                  return [3 /*break*/, 5];
              case 3:
                  context.logger.debug("Document cloned, element located at " + left + "," + top + " with size " + width + "x" + height + " using computed rendering");
                  context.logger.debug("Starting DOM parsing");
                  root = parseTree(context, clonedElement);
                  if (backgroundColor === root.styles.backgroundColor) {
                      root.styles.backgroundColor = COLORS.TRANSPARENT;
                  }
                  context.logger.debug("Starting renderer for element at " + renderOptions.x + "," + renderOptions.y + " with size " + renderOptions.width + "x" + renderOptions.height);
                  renderer = new CanvasRenderer(context, renderOptions);
                  return [4 /*yield*/, renderer.render(root)];
              case 4:
                  canvas = _u.sent();
                  _u.label = 5;
              case 5:
                  if ((_t = opts.removeContainer) !== null && _t !== void 0 ? _t : true) {
                      if (!DocumentCloner.destroy(container)) {
                          context.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore");
                      }
                  }
                  context.logger.debug("Finished rendering");
                  return [2 /*return*/, canvas];
          }
      });
  }); };
  var parseBackgroundColor = function (context, element, backgroundColorOverride) {
      var ownerDocument = element.ownerDocument;
      // http://www.w3.org/TR/css3-background/#special-backgrounds
      var documentBackgroundColor = ownerDocument.documentElement
          ? parseColor(context, getComputedStyle(ownerDocument.documentElement).backgroundColor)
          : COLORS.TRANSPARENT;
      var bodyBackgroundColor = ownerDocument.body
          ? parseColor(context, getComputedStyle(ownerDocument.body).backgroundColor)
          : COLORS.TRANSPARENT;
      var defaultBackgroundColor = typeof backgroundColorOverride === 'string'
          ? parseColor(context, backgroundColorOverride)
          : backgroundColorOverride === null
              ? COLORS.TRANSPARENT
              : 0xffffffff;
      return element === ownerDocument.documentElement
          ? isTransparent(documentBackgroundColor)
              ? isTransparent(bodyBackgroundColor)
                  ? defaultBackgroundColor
                  : bodyBackgroundColor
              : documentBackgroundColor
          : defaultBackgroundColor;
  };

  return html2canvas;

})));


/*! JsBarcode v3.11.0 | (c) Johan Lindell | MIT license */
!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=20)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function t(e,n){r(this,t),this.data=e,this.text=n.text||e,this.options=n};e.default=o},function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0});var o,i=e.SET_A=0,u=e.SET_B=1,a=e.SET_C=2,f=(e.SHIFT=98,e.START_A=103),c=e.START_B=104,s=e.START_C=105;e.MODULO=103,e.STOP=106,e.FNC1=207,e.SET_BY_CODE=(o={},r(o,f,i),r(o,c,u),r(o,s,a),o),e.SWAP={101:i,100:u,99:a},e.A_START_CHAR=String.fromCharCode(208),e.B_START_CHAR=String.fromCharCode(209),e.C_START_CHAR=String.fromCharCode(210),e.A_CHARS="[\0-_È-Ï]",e.B_CHARS="[ -È-Ï]",e.C_CHARS="(Ï*[0-9]{2}Ï*)",e.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.SIDE_BIN="101",e.MIDDLE_BIN="01010",e.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},e.EAN2_STRUCTURE=["LL","LG","GL","GG"],e.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],e.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"]},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),o=function(t,e,n){var o=t.split("").map(function(t,n){return r.BINARIES[e[n]]}).map(function(e,n){return e?e[t[n]]:""});if(n){var i=t.length-1;o=o.map(function(t,e){return e<i?t+n:t})}return o.join("")};e.default=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t,e){for(var n=0;n<e;n++)t="0"+t;return t}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(0),c=function(t){return t&&t.__esModule?t:{default:t}}(f),s=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),a(e,[{key:"encode",value:function(){for(var t="110",e=0;e<this.data.length;e++){var n=parseInt(this.data[e]),r=n.toString(2);r=u(r,4-r.length);for(var o=0;o<r.length;o++)t+="0"==r[o]?"100":"110"}return t+="1001",{data:t,text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]+$/)}}]),e}(c.default);e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t};e.default=function(t,e){return r({},t,e)}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(a),c=n(1),s=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t.substring(1),n));return i.bytes=t.split("").map(function(t){return t.charCodeAt(0)}),i}return i(e,t),u(e,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var t=this.bytes,n=t.shift()-105,r=c.SET_BY_CODE[n];if(void 0===r)throw new RangeError("The encoding does not start with a start character.");!0===this.shouldEncodeAsEan128()&&t.unshift(c.FNC1);var o=e.next(t,1,r);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:e.getBar(n)+o.result+e.getBar((o.checksum+n)%c.MODULO)+e.getBar(c.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var t=this.options.ean128||!1;return"string"==typeof t&&(t="true"===t.toLowerCase()),t}}],[{key:"getBar",value:function(t){return c.BARS[t]?c.BARS[t].toString():""}},{key:"correctIndex",value:function(t,e){if(e===c.SET_A){var n=t.shift();return n<32?n+64:n-32}return e===c.SET_B?t.shift()-32:10*(t.shift()-48)+t.shift()-48}},{key:"next",value:function(t,n,r){if(!t.length)return{result:"",checksum:0};var o=void 0,i=void 0;if(t[0]>=200){i=t.shift()-105;var u=c.SWAP[i];void 0!==u?o=e.next(t,n+1,u):(r!==c.SET_A&&r!==c.SET_B||i!==c.SHIFT||(t[0]=r===c.SET_A?t[0]>95?t[0]-96:t[0]:t[0]<32?t[0]+96:t[0]),o=e.next(t,n+1,r))}else i=e.correctIndex(t,r),o=e.next(t,n+1,r);var a=e.getBar(i),f=i*n;return{result:a+o.result,checksum:f+o.checksum}}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";function r(t){for(var e=0,n=0;n<t.length;n++){var r=parseInt(t[n]);(n+t.length)%2==0?e+=r:e+=2*r%10+Math.floor(2*r/10)}return(10-e%10)%10}function o(t){for(var e=0,n=[2,3,4,5,6,7],r=0;r<t.length;r++){e+=n[r%n.length]*parseInt(t[t.length-1-r])}return(11-e%11)%11}Object.defineProperty(e,"__esModule",{value:!0}),e.mod10=r,e.mod11=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return i.name="InvalidInputException",i.symbology=t,i.input=n,i.message='"'+i.input+'" is not a valid input for '+i.symbology,i}return i(e,t),e}(Error),a=function(t){function e(){r(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.name="InvalidElementException",t.message="Not supported type to render on",t}return i(e,t),e}(Error),f=function(t){function e(){r(this,e);var t=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return t.name="NoElementException",t.message="No element to render on.",t}return i(e,t),e}(Error);e.InvalidInputException=u,e.InvalidElementException=a,e.NoElementException=f},function(t,e,n){"use strict";function r(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var n in e)e.hasOwnProperty(n)&&(n=e[n],"string"==typeof t[n]&&(t[n]=parseInt(t[n],10)));return"string"==typeof t.displayValue&&(t.displayValue="false"!=t.displayValue),t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};e.default=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(2),c=n(3),s=r(c),l=n(0),p=r(l),d=function(t){function e(t,n){o(this,e);var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.fontSize=!n.flat&&n.fontSize>10*n.width?10*n.width:n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return u(e,t),a(e,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(t,e){return this.text.substr(t,e)}},{key:"leftEncode",value:function(t,e){return(0,s.default)(t,e)}},{key:"rightText",value:function(t,e){return this.text.substr(t,e)}},{key:"rightEncode",value:function(t,e){return(0,s.default)(t,e)}},{key:"encodeGuarded",value:function(){var t={fontSize:this.fontSize},e={height:this.guardHeight};return[{data:f.SIDE_BIN,options:e},{data:this.leftEncode(),text:this.leftText(),options:t},{data:f.MIDDLE_BIN,options:e},{data:this.rightEncode(),text:this.rightText(),options:t},{data:f.SIDE_BIN,options:e}]}},{key:"encodeFlat",value:function(){return{data:[f.SIDE_BIN,this.leftEncode(),f.MIDDLE_BIN,this.rightEncode(),f.SIDE_BIN].join(""),text:this.text}}}]),e}(p.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t){var e,n=0;for(e=1;e<11;e+=2)n+=parseInt(t[e]);for(e=0;e<11;e+=2)n+=3*parseInt(t[e]);return(10-n%10)%10}Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}();e.checksum=a;var c=n(3),s=r(c),l=n(0),p=r(l),d=function(t){function e(t,n){o(this,e),-1!==t.search(/^[0-9]{11}$/)&&(t+=a(t));var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return r.displayValue=n.displayValue,n.fontSize>10*n.width?r.fontSize=10*n.width:r.fontSize=n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return u(e,t),f(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{12}$/)&&this.data[11]==a(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=(0,s.default)(this.data.substr(0,6),"LLLLLL"),t+="01010",t+=(0,s.default)(this.data.substr(6,6),"RRRRRR"),t+="101",{data:t,text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101"+(0,s.default)(this.data[0],"L"),options:{height:this.guardHeight}}),t.push({data:(0,s.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),t.push({data:"01010",options:{height:this.guardHeight}}),t.push({data:(0,s.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),t.push({data:(0,s.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),t}}]),e}(p.default);e.default=d},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(36),f=n(0),c=function(t){return t&&t.__esModule?t:{default:t}}(f),s=function(t){function e(){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).apply(this,arguments))}return i(e,t),u(e,[{key:"valid",value:function(){return-1!==this.data.search(/^([0-9]{2})+$/)}},{key:"encode",value:function(){var t=this,e=this.data.match(/.{2}/g).map(function(e){return t.encodePair(e)}).join("");return{data:a.START_BIN+e+a.END_BIN,text:this.text}}},{key:"encodePair",value:function(t){var e=a.BINARIES[t[1]];return a.BINARIES[t[0]].split("").map(function(t,n){return("1"===t?"111":"1")+("1"===e[n]?"000":"0")}).join("")}}]),e}(c.default);e.default=s},function(t,e,n){"use strict";function r(t,e){return e.height+(e.displayValue&&t.text.length>0?e.fontSize+e.textMargin:0)+e.marginTop+e.marginBottom}function o(t,e,n){if(n.displayValue&&e<t){if("center"==n.textAlign)return Math.floor((t-e)/2);if("left"==n.textAlign)return 0;if("right"==n.textAlign)return Math.floor(t-e)}return 0}function i(t,e,n){for(var i=0;i<t.length;i++){var u,a=t[i],c=(0,s.default)(e,a.options);u=c.displayValue?f(a.text,c,n):0;var l=a.data.length*c.width;a.width=Math.ceil(Math.max(u,l)),a.height=r(a,c),a.barcodePadding=o(u,l,c)}}function u(t){for(var e=0,n=0;n<t.length;n++)e+=t[n].width;return e}function a(t){for(var e=0,n=0;n<t.length;n++)t[n].height>e&&(e=t[n].height);return e}function f(t,e,n){var r;if(n)r=n;else{if("undefined"==typeof document)return 0;r=document.createElement("canvas").getContext("2d")}return r.font=e.fontOptions+" "+e.fontSize+"px "+e.font,r.measureText(t).width}Object.defineProperty(e,"__esModule",{value:!0}),e.getTotalWidthOfEncodings=e.calculateEncodingAttributes=e.getBarcodePadding=e.getEncodingHeight=e.getMaximumHeightOfEncodings=void 0;var c=n(5),s=function(t){return t&&t.__esModule?t:{default:t}}(c);e.getMaximumHeightOfEncodings=a,e.getEncodingHeight=r,e.getBarcodePadding=o,e.calculateEncodingAttributes=i,e.getTotalWidthOfEncodings=u},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(27),o=n(26),i=n(33),u=n(37),a=n(42),f=n(44),c=n(43),s=n(34);e.default={CODE39:r.CODE39,CODE128:o.CODE128,CODE128A:o.CODE128A,CODE128B:o.CODE128B,CODE128C:o.CODE128C,EAN13:i.EAN13,EAN8:i.EAN8,EAN5:i.EAN5,EAN2:i.EAN2,UPC:i.UPC,UPCE:i.UPCE,ITF14:u.ITF14,ITF:u.ITF,MSI:a.MSI,MSI10:a.MSI10,MSI11:a.MSI11,MSI1010:a.MSI1010,MSI1110:a.MSI1110,pharmacode:f.pharmacode,codabar:c.codabar,GenericBarcode:s.GenericBarcode}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(e){r(this,t),this.api=e}return o(t,[{key:"handleCatch",value:function(t){if("InvalidInputException"!==t.name)throw t;if(this.api._options.valid===this.api._defaults.valid)throw t.message;this.api._options.valid(!1),this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(t){try{var e=t.apply(void 0,arguments);return this.api._options.valid(!0),e}catch(t){return this.handleCatch(t),this.api}}}]),t}();e.default=i},function(t,e,n){"use strict";function r(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){if("string"==typeof t)return i(t);if(Array.isArray(t)){for(var e=[],n=0;n<t.length;n++)e.push(o(t[n]));return e}if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLImageElement)return u(t);if(t&&"svg"===t.nodeName||"undefined"!=typeof SVGElement&&t instanceof SVGElement)return{element:t,options:(0,c.default)(t),renderer:l.default.SVGRenderer};if("undefined"!=typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement)return{element:t,options:(0,c.default)(t),renderer:l.default.CanvasRenderer};if(t&&t.getContext)return{element:t,renderer:l.default.CanvasRenderer};if(t&&"object"===(void 0===t?"undefined":a(t))&&!t.nodeName)return{element:t,renderer:l.default.ObjectRenderer};throw new p.InvalidElementException}function i(t){var e=document.querySelectorAll(t);if(0!==e.length){for(var n=[],r=0;r<e.length;r++)n.push(o(e[r]));return n}}function u(t){var e=document.createElement("canvas");return{element:e,options:(0,c.default)(t),renderer:l.default.CanvasRenderer,afterRender:function(){t.setAttribute("src",e.toDataURL())}}}Object.defineProperty(e,"__esModule",{value:!0});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f=n(45),c=r(f),s=n(47),l=r(s),p=n(8);e.default=o},function(t,e,n){"use strict";function r(t){function e(t){if(Array.isArray(t))for(var r=0;r<t.length;r++)e(t[r]);else t.text=t.text||"",t.data=t.data||"",n.push(t)}var n=[];return e(t),n}Object.defineProperty(e,"__esModule",{value:!0}),e.default=r},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n){t=""+t;var r=new e(t,n);if(!r.valid())throw new E.InvalidInputException(r.constructor.name,t);var o=r.encode();o=(0,p.default)(o);for(var i=0;i<o.length;i++)o[i].options=(0,s.default)(n,o[i].options);return o}function i(){return f.default.CODE128?"CODE128":Object.keys(f.default)[0]}function u(t,e,n){e=(0,p.default)(e);for(var r=0;r<e.length;r++)e[r].options=(0,s.default)(n,e[r].options),(0,h.default)(e[r].options);(0,h.default)(n),new(0,t.renderer)(t.element,e,n).render(),t.afterRender&&t.afterRender()}var a=n(15),f=r(a),c=n(5),s=r(c),l=n(19),p=r(l),d=n(17),h=r(d),y=n(18),b=r(y),_=n(9),v=r(_),g=n(16),O=r(g),E=n(8),w=n(10),m=r(w),j=function(){},x=function(t,e,n){var r=new j;if(void 0===t)throw Error("No element to render on was provided.");return r._renderProperties=(0,b.default)(t),r._encodings=[],r._options=m.default,r._errorHandler=new O.default(r),void 0!==e&&(n=n||{},n.format||(n.format=i()),r.options(n)[n.format](e,n).render()),r};x.getModule=function(t){return f.default[t]};for(var P in f.default)f.default.hasOwnProperty(P)&&function(t,e){j.prototype[e]=j.prototype[e.toUpperCase()]=j.prototype[e.toLowerCase()]=function(n,r){var i=this;return i._errorHandler.wrapBarcodeCall(function(){r.text=void 0===r.text?void 0:""+r.text;var u=(0,s.default)(i._options,r);u=(0,v.default)(u);var a=t[e],f=o(n,a,u);return i._encodings.push(f),i})}}(f.default,P);j.prototype.options=function(t){return this._options=(0,s.default)(this._options,t),this},j.prototype.blank=function(t){var e=new Array(t+1).join("0");return this._encodings.push({data:e}),this},j.prototype.init=function(){if(this._renderProperties){Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]);var t;for(var e in this._renderProperties){t=this._renderProperties[e];var n=(0,s.default)(this._options,t.options);"auto"==n.format&&(n.format=i()),this._errorHandler.wrapBarcodeCall(function(){var e=n.value,r=f.default[n.format.toUpperCase()],i=o(e,r,n);u(t,i,n)})}}},j.prototype.render=function(){if(!this._renderProperties)throw new E.NoElementException;if(Array.isArray(this._renderProperties))for(var t=0;t<this._renderProperties.length;t++)u(this._renderProperties[t],this._encodings,this._options);else u(this._renderProperties,this._encodings,this._options);return this},j.prototype._defaults=m.default,"undefined"!=typeof window&&(window.JsBarcode=x),"undefined"!=typeof jQuery&&(jQuery.fn.JsBarcode=function(t,e){var n=[];return jQuery(this).each(function(){n.push(this)}),x(n,t,e)}),t.exports=x},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(6),f=function(t){return t&&t.__esModule?t:{default:t}}(a),c=n(1),s=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,c.A_START_CHAR+t,n))}return i(e,t),u(e,[{key:"valid",value:function(){return new RegExp("^"+c.A_CHARS+"+$").test(this.data)}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(6),f=function(t){return t&&t.__esModule?t:{default:t}}(a),c=n(1),s=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,c.B_START_CHAR+t,n))}return i(e,t),u(e,[{key:"valid",value:function(){return new RegExp("^"+c.B_CHARS+"+$").test(this.data)}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(6),f=function(t){return t&&t.__esModule?t:{default:t}}(a),c=n(1),s=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,c.C_START_CHAR+t,n))}return i(e,t),u(e,[{key:"valid",value:function(){return new RegExp("^"+c.C_CHARS+"+$").test(this.data)}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=n(6),f=r(a),c=n(25),s=r(c),l=function(t){function e(t,n){if(o(this,e),/^[\x00-\x7F\xC8-\xD3]+$/.test(t))var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,(0,s.default)(t),n));else var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i(r)}return u(e,t),e}(f.default);e.default=l},function(t,e,n){"use strict";function r(t,e){var n=e?i.A_CHARS:i.B_CHARS,u=t.match(new RegExp("^("+n+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(u)return u[1]+String.fromCharCode(204)+o(t.substring(u[1].length));var a=t.match(new RegExp("^"+n+"+"))[0];return a.length===t.length?t:a+String.fromCharCode(e?205:206)+r(t.substring(a.length),!e)}function o(t){var e=f(t),n=e.length;if(n===t.length)return t;t=t.substring(n);var o=u(t)>=a(t);return e+String.fromCharCode(o?206:205)+r(t,o)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1),u=function(t){return t.match(new RegExp("^"+i.A_CHARS+"*"))[0].length},a=function(t){return t.match(new RegExp("^"+i.B_CHARS+"*"))[0].length},f=function(t){return t.match(new RegExp("^"+i.C_CHARS+"*"))[0]};e.default=function(t){var e=void 0;if(f(t).length>=2)e=i.C_START_CHAR+o(t);else{var n=u(t)>a(t);e=(n?i.A_START_CHAR:i.B_START_CHAR)+r(t,n)}return e.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(t,e){return String.fromCharCode(203)+e})}},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.CODE128C=e.CODE128B=e.CODE128A=e.CODE128=void 0;var o=n(24),i=r(o),u=n(21),a=r(u),f=n(22),c=r(f),s=n(23),l=r(s);e.CODE128=i.default,e.CODE128A=a.default,e.CODE128B=c.default,e.CODE128C=l.default},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function u(t){return a(c(t))}function a(t){return b[t].toString(2)}function f(t){return y[t]}function c(t){return y.indexOf(t)}function s(t){for(var e=0,n=0;n<t.length;n++)e+=c(t[n]);return e%=43}Object.defineProperty(e,"__esModule",{value:!0}),e.CODE39=void 0;var l=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),p=n(0),d=function(t){return t&&t.__esModule?t:{default:t}}(p),h=function(t){function e(t,n){return r(this,e),t=t.toUpperCase(),n.mod43&&(t+=f(s(t))),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),l(e,[{key:"encode",value:function(){for(var t=u("*"),e=0;e<this.data.length;e++)t+=u(this.data[e])+"0";return t+=u("*"),{data:t,text:this.text}}},{key:"valid",value:function(){return-1!==this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)}}]),e}(d.default),y=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],b=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];e.CODE39=h},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},f=n(2),c=n(11),s=function(t){return t&&t.__esModule?t:{default:t}}(c),l=function(t){return(10-t.substr(0,12).split("").map(function(t){return+t}).reduce(function(t,e,n){return n%2?t+3*e:t+e},0)%10)%10},p=function(t){function e(t,n){r(this,e),-1!==t.search(/^[0-9]{12}$/)&&(t+=l(t));var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.lastChar=n.lastChar,i}return i(e,t),u(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{13}$/)&&+this.data[12]===l(this.data)}},{key:"leftText",value:function(){return a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var t=this.data.substr(1,6),n=f.EAN13_STRUCTURE[this.data[0]];return a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,t,n)}},{key:"rightText",value:function(){return a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var t=this.data.substr(7,6);return a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,t,"RRRRRR")}},{key:"encodeGuarded",value:function(){var t=a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(t.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(t.push({data:"00"}),t.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),t}}]),e}(s.default);e.default=p},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(2),c=n(3),s=r(c),l=n(0),p=r(l),d=function(t){function e(t,n){return o(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return u(e,t),a(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{2}$/)}},{key:"encode",value:function(){var t=f.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,s.default)(this.data,t,"01"),text:this.text}}}]),e}(p.default);e.default=d},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),f=n(2),c=n(3),s=r(c),l=n(0),p=r(l),d=function(t){return t.split("").map(function(t){return+t}).reduce(function(t,e,n){return n%2?t+9*e:t+3*e},0)%10},h=function(t){function e(t,n){return o(this,e),i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return u(e,t),a(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{5}$/)}},{key:"encode",value:function(){var t=f.EAN5_STRUCTURE[d(this.data)];return{data:"1011"+(0,s.default)(this.data,t,"01"),text:this.text}}}]),e}(p.default);e.default=h},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=function t(e,n,r){null===e&&(e=Function.prototype);var o=Object.getOwnPropertyDescriptor(e,n);if(void 0===o){var i=Object.getPrototypeOf(e);return null===i?void 0:t(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},f=n(11),c=function(t){return t&&t.__esModule?t:{default:t}}(f),s=function(t){return(10-t.substr(0,7).split("").map(function(t){return+t}).reduce(function(t,e,n){return n%2?t+e:t+3*e},0)%10)%10},l=function(t){function e(t,n){return r(this,e),-1!==t.search(/^[0-9]{7}$/)&&(t+=s(t)),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),u(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{8}$/)&&+this.data[7]===s(this.data)}},{key:"leftText",value:function(){return a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var t=this.data.substr(0,4);return a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"leftEncode",this).call(this,t,"LLLL")}},{key:"rightText",value:function(){return a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var t=this.data.substr(4,4);return a(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"rightEncode",this).call(this,t,"RRRR")}}]),e}(c.default);e.default=l},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){for(var n=parseInt(t[t.length-1]),r=h[n],o="",i=0,u=0;u<r.length;u++){var a=r[u];o+="X"===a?t[i++]:a}return""+(o=""+e+o)+(0,d.checksum)(o)}Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=n(3),s=r(c),l=n(0),p=r(l),d=n(12),h=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],y=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],b=function(t){function e(t,n){o(this,e);var r=i(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));if(r.isValid=!1,-1!==t.search(/^[0-9]{6}$/))r.middleDigits=t,r.upcA=a(t,"0"),r.text=n.text||""+r.upcA[0]+t+r.upcA[r.upcA.length-1],r.isValid=!0;else{if(-1===t.search(/^[01][0-9]{7}$/))return i(r);if(r.middleDigits=t.substring(1,t.length-1),r.upcA=a(r.middleDigits,t[0]),r.upcA[r.upcA.length-1]!==t[t.length-1])return i(r);r.isValid=!0}return r.displayValue=n.displayValue,n.fontSize>10*n.width?r.fontSize=10*n.width:r.fontSize=n.fontSize,r.guardHeight=n.height+r.fontSize/2+n.textMargin,r}return u(e,t),f(e,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var t="";return t+="101",t+=this.encodeMiddleDigits(),t+="010101",{data:t,text:this.text}}},{key:"guardedEncoding",value:function(){var t=[];return this.displayValue&&t.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),t.push({data:"101",options:{height:this.guardHeight}}),t.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),t.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&t.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),t}},{key:"encodeMiddleDigits",value:function(){var t=this.upcA[0],e=this.upcA[this.upcA.length-1],n=y[parseInt(e)][parseInt(t)];return(0,s.default)(this.middleDigits,n)}}]),e}(p.default);e.default=b},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.UPCE=e.UPC=e.EAN2=e.EAN5=e.EAN8=e.EAN13=void 0;var o=n(28),i=r(o),u=n(31),a=r(u),f=n(30),c=r(f),s=n(29),l=r(s),p=n(12),d=r(p),h=n(32),y=r(h);e.EAN13=i.default,e.EAN8=a.default,e.EAN5=c.default,e.EAN2=l.default,e.UPC=d.default,e.UPCE=y.default},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.GenericBarcode=void 0;var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(a),c=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),u(e,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),e}(f.default);e.GenericBarcode=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(13),f=function(t){return t&&t.__esModule?t:{default:t}}(a),c=function(t){var e=t.substr(0,13).split("").map(function(t){return parseInt(t,10)}).reduce(function(t,e,n){return t+e*(3-n%2*2)},0);return 10*Math.ceil(e/10)-e},s=function(t){function e(t,n){return r(this,e),-1!==t.search(/^[0-9]{13}$/)&&(t+=c(t)),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),u(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[0-9]{14}$/)&&+this.data[13]===c(this.data)}}]),e}(f.default);e.default=s},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.START_BIN="1010",e.END_BIN="11101",e.BINARIES=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"]},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.ITF14=e.ITF=void 0;var o=n(13),i=r(o),u=n(35),a=r(u);e.ITF=i.default,e.ITF14=a.default},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(4),a=function(t){return t&&t.__esModule?t:{default:t}}(u),f=n(7),c=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t+(0,f.mod10)(t),n))}return i(e,t),e}(a.default);e.default=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(4),a=function(t){return t&&t.__esModule?t:{default:t}}(u),f=n(7),c=function(t){function e(t,n){return r(this,e),t+=(0,f.mod10)(t),t+=(0,f.mod10)(t),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),e}(a.default);e.default=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(4),a=function(t){return t&&t.__esModule?t:{default:t}}(u),f=n(7),c=function(t){function e(t,n){return r(this,e),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t+(0,f.mod11)(t),n))}return i(e,t),e}(a.default);e.default=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(4),a=function(t){return t&&t.__esModule?t:{default:t}}(u),f=n(7),c=function(t){function e(t,n){return r(this,e),t+=(0,f.mod11)(t),t+=(0,f.mod10)(t),o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n))}return i(e,t),e}(a.default);e.default=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.MSI1110=e.MSI1010=e.MSI11=e.MSI10=e.MSI=void 0;var o=n(4),i=r(o),u=n(38),a=r(u),f=n(40),c=r(f),s=n(39),l=r(s),p=n(41),d=r(p);e.MSI=i.default,e.MSI10=a.default,e.MSI11=c.default,e.MSI1010=l.default,e.MSI1110=d.default},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.codabar=void 0;var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(a),c=function(t){function e(t,n){r(this,e),0===t.search(/^[0-9\-\$\:\.\+\/]+$/)&&(t="A"+t+"A");var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t.toUpperCase(),n));return i.text=i.options.text||i.text.replace(/[A-D]/g,""),i}return i(e,t),u(e,[{key:"valid",value:function(){return-1!==this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)}},{key:"encode",value:function(){for(var t=[],e=this.getEncodings(),n=0;n<this.data.length;n++)t.push(e[this.data.charAt(n)]),n!==this.data.length-1&&t.push("0");return{text:this.text,data:t.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"101100110011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),e}(f.default);e.codabar=c},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function o(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0}),e.pharmacode=void 0;var u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),a=n(0),f=function(t){return t&&t.__esModule?t:{default:t}}(a),c=function(t){function e(t,n){r(this,e);var i=o(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));return i.number=parseInt(t,10),i}return i(e,t),u(e,[{key:"encode",value:function(){for(var t=this.number,e="";!isNaN(t)&&0!=t;)t%2==0?(e="11100"+e,t=(t-2)/2):(e="100"+e,t=(t-1)/2);return e=e.slice(0,-2),{data:e,text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),e}(f.default);e.pharmacode=c},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){var e={};for(var n in f.default)f.default.hasOwnProperty(n)&&(t.hasAttribute("jsbarcode-"+n.toLowerCase())&&(e[n]=t.getAttribute("jsbarcode-"+n.toLowerCase())),t.hasAttribute("data-"+n.toLowerCase())&&(e[n]=t.getAttribute("data-"+n.toLowerCase())));return e.value=t.getAttribute("jsbarcode-value")||t.getAttribute("data-value"),e=(0,u.default)(e)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(9),u=r(i),a=n(10),f=r(a);e.default=o},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(5),u=function(t){return t&&t.__esModule?t:{default:t}}(i),a=n(14),f=function(){function t(e,n,o){r(this,t),this.canvas=e,this.encodings=n,this.options=o}return o(t,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var t=0;t<this.encodings.length;t++){var e=(0,u.default)(this.options,this.encodings[t].options);this.drawCanvasBarcode(e,this.encodings[t]),this.drawCanvasText(e,this.encodings[t]),this.moveCanvasDrawing(this.encodings[t])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var t=this.canvas.getContext("2d");t.save(),(0,a.calculateEncodingAttributes)(this.encodings,this.options,t);var e=(0,a.getTotalWidthOfEncodings)(this.encodings),n=(0,a.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=e+this.options.marginLeft+this.options.marginRight,this.canvas.height=n,t.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(t.fillStyle=this.options.background,t.fillRect(0,0,this.canvas.width,this.canvas.height)),t.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(t,e){var n,r=this.canvas.getContext("2d"),o=e.data;n="top"==t.textPosition?t.marginTop+t.fontSize+t.textMargin:t.marginTop,r.fillStyle=t.lineColor;for(var i=0;i<o.length;i++){var u=i*t.width+e.barcodePadding;"1"===o[i]?r.fillRect(u,n,t.width,t.height):o[i]&&r.fillRect(u,n,t.width,t.height*o[i])}}},{key:"drawCanvasText",value:function(t,e){var n=this.canvas.getContext("2d"),r=t.fontOptions+" "+t.fontSize+"px "+t.font;if(t.displayValue){var o,i;i="top"==t.textPosition?t.marginTop+t.fontSize-t.textMargin:t.height+t.textMargin+t.marginTop+t.fontSize,n.font=r,"left"==t.textAlign||e.barcodePadding>0?(o=0,n.textAlign="left"):"right"==t.textAlign?(o=e.width-1,n.textAlign="right"):(o=e.width/2,n.textAlign="center"),n.fillText(e.text,o,i)}}},{key:"moveCanvasDrawing",value:function(t){this.canvas.getContext("2d").translate(t.width,0)}},{key:"restoreCanvas",value:function(){this.canvas.getContext("2d").restore()}}]),t}();e.default=f},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(46),i=r(o),u=n(49),a=r(u),f=n(48),c=r(f);e.default={CanvasRenderer:i.default,SVGRenderer:a.default,ObjectRenderer:c.default}},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=function(){function t(e,n,o){r(this,t),this.object=e,this.encodings=n,this.options=o}return o(t,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),t}();e.default=i},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),i=n(5),u=function(t){return t&&t.__esModule?t:{default:t}}(i),a=n(14),f="http://www.w3.org/2000/svg",c=function(){function t(e,n,o){r(this,t),this.svg=e,this.encodings=n,this.options=o,this.document=o.xmlDocument||document}return o(t,[{key:"render",value:function(){var t=this.options.marginLeft;this.prepareSVG();for(var e=0;e<this.encodings.length;e++){var n=this.encodings[e],r=(0,u.default)(this.options,n.options),o=this.createGroup(t,r.marginTop,this.svg);this.setGroupOptions(o,r),this.drawSvgBarcode(o,r,n),this.drawSVGText(o,r,n),t+=n.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,a.calculateEncodingAttributes)(this.encodings,this.options);var t=(0,a.getTotalWidthOfEncodings)(this.encodings),e=(0,a.getMaximumHeightOfEncodings)(this.encodings),n=t+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(n,e),this.options.background&&this.drawRect(0,0,n,e,this.svg).setAttribute("style","fill:"+this.options.background+";")}},{key:"drawSvgBarcode",value:function(t,e,n){var r,o=n.data;r="top"==e.textPosition?e.fontSize+e.textMargin:0;for(var i=0,u=0,a=0;a<o.length;a++)u=a*e.width+n.barcodePadding,"1"===o[a]?i++:i>0&&(this.drawRect(u-e.width*i,r,e.width*i,e.height,t),i=0);i>0&&this.drawRect(u-e.width*(i-1),r,e.width*i,e.height,t)}},{key:"drawSVGText",value:function(t,e,n){var r=this.document.createElementNS(f,"text");if(e.displayValue){var o,i;r.setAttribute("style","font:"+e.fontOptions+" "+e.fontSize+"px "+e.font),i="top"==e.textPosition?e.fontSize-e.textMargin:e.height+e.textMargin+e.fontSize,"left"==e.textAlign||n.barcodePadding>0?(o=0,r.setAttribute("text-anchor","start")):"right"==e.textAlign?(o=n.width-1,r.setAttribute("text-anchor","end")):(o=n.width/2,r.setAttribute("text-anchor","middle")),r.setAttribute("x",o),r.setAttribute("y",i),r.appendChild(this.document.createTextNode(n.text)),t.appendChild(r)}}},{key:"setSvgAttributes",value:function(t,e){var n=this.svg;n.setAttribute("width",t+"px"),n.setAttribute("height",e+"px"),n.setAttribute("x","0px"),n.setAttribute("y","0px"),n.setAttribute("viewBox","0 0 "+t+" "+e),n.setAttribute("xmlns",f),n.setAttribute("version","1.1"),n.setAttribute("style","transform: translate(0,0)")}},{key:"createGroup",value:function(t,e,n){var r=this.document.createElementNS(f,"g");return r.setAttribute("transform","translate("+t+", "+e+")"),n.appendChild(r),r}},{key:"setGroupOptions",value:function(t,e){t.setAttribute("style","fill:"+e.lineColor+";")}},{key:"drawRect",value:function(t,e,n,r,o){var i=this.document.createElementNS(f,"rect");return i.setAttribute("x",t),i.setAttribute("y",e),i.setAttribute("width",n),i.setAttribute("height",r),o.appendChild(i),i}}]),t}();e.default=c}]);
// !-JS Barcode/UPC

/** https://github.com/datalog/qrcode-svg under MIT license */
'use strict';function QRCode(r){var n,t,o,e,a=[],f=[],i=Math.max,u=Math.min,h=Math.abs,v=Math.ceil,c=/^[0-9]*$/,s=/^[A-Z0-9 $%*+.\/:-]*$/,l="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",g=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],d=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],m={L:[0,1],M:[1,0],Q:[2,3],H:[3,2]},p=function(r,n){for(var t=0,o=8;o--;)t=t<<1^285*(t>>>7)^(n>>>o&1)*r;return t},C=function(r,n){for(var t=[],o=r.length,e=o;e;)for(var a=r[o-e--]^t.shift(),f=n.length;f--;)t[f]^=p(n[f],a);return t},w=function(r){for(var n=[function(){return 0==(t+o)%2},function(){return 0==t%2},function(){return 0==o%3},function(){return 0==(t+o)%3},function(){return 0==((t/2|0)+(o/3|0))%2},function(){return 0==t*o%2+t*o%3},function(){return 0==(t*o%2+t*o%3)%2},function(){return 0==((t+o)%2+t*o%3)%2}][r],t=e;t--;)for(var o=e;o--;)f[t][o]||(a[t][o]^=n())},b=function(){for(var r=function(r,n){n[6]||(r+=e),n.shift(),n.push(r)},n=function(n,o,a){return n&&(r(o,a),o=0),r(o+=e,a),t(a)},t=function(r){var n=r[5],t=n>0&&r[4]==n&&r[3]==3*n&&r[2]==n&&r[1]==n;return(t&&r[6]>=4*n&&r[0]>=n?1:0)+(t&&r[0]>=4*n&&r[6]>=n?1:0)},o=0,f=e*e,i=0,u=e;u--;){for(var c=[0,0,0,0,0,0,0],s=[0,0,0,0,0,0,0],l=!1,g=!1,d=0,m=0,p=e;p--;){a[u][p]==l?5==++d?o+=3:d>5&&o++:(r(d,c),o+=40*t(c),d=1,l=a[u][p]),a[p][u]==g?5==++m?o+=3:m>5&&o++:(r(m,s),o+=40*t(s),m=1,g=a[p][u]);var C=a[u][p];C&&i++,p&&u&&C==a[u][p-1]&&C==a[u-1][p]&&C==a[u-1][p-1]&&(o+=3)}o+=40*n(l,d,c)+40*n(g,m,s)}return o+=10*(v(h(20*i-10*f)/f)-1)},A=function(r,n,t){for(;n--;)t.push(r>>>n&1)},M=function(r,n){return r.numBitsCharCount[(n+7)/17|0]},B=function(r,n){return 0!=(r>>>n&1)},x=function(r,n){for(var t=0,o=r.length;o--;){var e=r[o],a=M(e,n);if(1<<a<=e.numChars)return 1/0;t+=4+a+e.bitData.length}return t},D=function(r){if(r<1||r>40)throw"Version number out of range";var n=(16*r+128)*r+64;if(r>=2){var t=r/7|2;n-=(25*t-10)*t-55,r>=7&&(n-=36)}return n},I=function(r,n){for(var t=2;-2<=t;t--)for(var o=2;-2<=o;o--)E(r+o,n+t,1!=i(h(o),h(t)))},H=function(r,n){for(var t=4;-4<=t;t--)for(var o=4;-4<=o;o--){var a=i(h(o),h(t)),f=r+o,u=n+t;0<=f&&f<e&&0<=u&&u<e&&E(f,u,2!=a&&4!=a)}},$=function(r){for(var n=t[1]<<3|r,o=n,a=10;a--;)o=o<<1^1335*(o>>>9);var f=21522^(n<<10|o);if(f>>>15!=0)throw"Assertion error";for(a=0;a<=5;a++)E(8,a,B(f,a));E(8,7,B(f,6)),E(8,8,B(f,7)),E(7,8,B(f,8));for(a=9;a<15;a++)E(14-a,8,B(f,a));for(a=0;a<8;a++)E(e-1-a,8,B(f,a));for(a=8;a<15;a++)E(8,e-15+a,B(f,a));E(8,e-8,1)},O=function(){for(var r=e;r--;)E(6,r,0==r%2),E(r,6,0==r%2);for(var t=function(){var r=[];if(n>1)for(var t=2+(n/7|0),o=32==n?26:2*v((e-13)/(2*t-2));t--;)r[t]=t*o+6;return r}(),o=r=t.length;o--;)for(var a=r;a--;)0==a&&0==o||0==a&&o==r-1||a==r-1&&0==o||I(t[a],t[o]);H(3,3),H(e-4,3),H(3,e-4),$(0),function(){if(!(7>n)){for(var r=n,t=12;t--;)r=r<<1^7973*(r>>>11);var o=n<<12|r;if(t=18,o>>>18!=0)throw"Assertion error";for(;t--;){var a=e-11+t%3,f=t/3|0,i=B(o,t);E(a,f,i),E(f,a,i)}}}()},Q=function(r){if(r.length!=V(n,t))throw"Invalid argument";for(var o=d[t[0]][n],e=g[t[0]][n],a=D(n)/8|0,f=o-a%o,i=a/o|0,u=[],h=function(r){var n=1,t=[];t[r-1]=1;for(var o=0;o<r;o++){for(var e=0;e<r;e++)t[e]=p(t[e],n)^t[e+1];n=p(n,2)}return t}(e),v=0,c=0;v<o;v++){var s=r.slice(c,c+i-e+(v<f?0:1));c+=s.length;var l=C(s,h);v<f&&s.push(0),u.push(s.concat(l))}var m=[];for(v=0;v<u[0].length;v++)for(var w=0;w<u.length;w++)(v!=i-e||w>=f)&&m.push(u[w][v]);return m},S=function(r){for(var n=[],t=(r=encodeURI(r),0);t<r.length;t++)"%"!=r.charAt(t)?n.push(r.charCodeAt(t)):(n.push(parseInt(r.substr(t+1,2),16)),t+=2);return n},V=function(r,n){return(D(r)/8|0)-g[n[0]][r]*d[n[0]][r]},E=function(r,n,t){a[n][r]=t?1:0,f[n][r]=1},R=function(r){for(var n=[],t=0,o=r;t<o.length;t++){var e=o[t];A(e,8,n)}return{modeBits:4,numBitsCharCount:[8,16,16],numChars:r.length,bitData:n}},Z=function(r){if(!c.test(r))throw"String contains non-numeric characters";for(var n=[],t=0;t<r.length;){var o=u(r.length-t,3);A(parseInt(r.substr(t,o),10),3*o+1,n),t+=o}return{modeBits:1,numBitsCharCount:[10,12,14],numChars:r.length,bitData:n}},z=function(r){if(!s.test(r))throw"String contains unencodable characters in alphanumeric mode";var n,t=[];for(n=0;n+2<=r.length;n+=2){var o=45*l.indexOf(r.charAt(n));o+=l.indexOf(r.charAt(n+1)),A(o,11,t)}return n<r.length&&A(l.indexOf(r.charAt(n)),6,t),{modeBits:2,numBitsCharCount:[9,11,13],numChars:r.length,bitData:t}},L=function(r,n,t,o){var e=function(r){return""==r?[]:c.test(r)?[Z(r)]:s.test(r)?[z(r)]:[R(S(r))]}(r);return U(e,n,t,o)},N=function(r,i,u,h){t=i,o=h;for(var v=e=4*(n=r)+17;v--;)a[v]=[],f[v]=[];if(O(),function(r){for(var n=0,t=1,o=e-1,i=o;i>0;i-=2){6==i&&--i;for(var u=0>(t=-t)?o:0,h=0;h<e;++h){for(var v=i;v>i-2;--v)f[u][v]||(a[u][v]=B(r[n>>>3],7-(7&n)),++n);u+=t}}}(Q(u)),0>o){var c=1e9;for(v=8;v--;){w(v),$(v);var s=b();c>s&&(c=s,o=v),w(v)}}w(o),$(o),f=[]},U=function(r,n,t,o,e,a){if(void 0===e&&(e=1),void 0===a&&(a=40),void 0===o&&(o=-1),void 0===t&&(t=!0),!(1<=e&&e<=a&&a<=40)||o<-1||o>7)throw"Invalid value";for(var f=[],i=236,h=[],v=e;;){var c=x(r,v);if(c<=8*V(v,n))break;if(v>=a)throw"Data too long";v++}if(t)for(var s=(l=[m.H,m.Q,m.M]).length;s--;)c<=8*V(v,l[s])&&(n=l[s]);for(var l=0;l<r.length;l++){var g=r[l];A(g.modeBits,4,f),A(g.numChars,M(g,v),f);for(var d=0,p=g.bitData;d<p.length;d++)f.push(p[d])}if(f.length!=c)throw"Assertion error";var C=8*V(v,n);if(f.length>C)throw"Assertion error";if(A(0,u(4,C-f.length),f),A(0,(8-f.length%8)%8,f),f.length%8!=0)throw"Assertion error";for(;f.length<C;)A(i,8,f),i^=253;for(s=f.length;s--;)h[s>>>3]|=f[s]<<7-(7&s);return N(v,n,h,o)};return function(){function n(r){return/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(r)}function t(r,n){for(var t in r=document.createElementNS(s,r),n||{})r.setAttribute(t,n[t]);return r}var o,f,i,u,v,c,s="http://www.w3.org/2000/svg",l="",g="string"==typeof r?{msg:r}:r||{},d=g.pal||["#000"],p=h(g.dim)||256,C=[1,0,0,1,c=(c=h(g.pad))>-1?c:4,c],w=n(w=d[0])?w:"#000",b=n(b=d[1])?b:0,A=g.vrb?0:1;for(L(g.msg||"",m[g.ecl]||m.M,0==g.ecb?0:1,g.mtx),v=e+2*c,i=e;i--;)for(u=0,f=e;f--;)a[i][f]&&(A?(u++,a[i][f-1]||(l+="M"+f+","+i+"h"+u+"v1h-"+u+"v-1z",u=0)):l+="M"+f+","+i+"h1v1h-1v-1z");return o=t("svg",{viewBox:[0,0,v,v].join(" "),width:p,height:p,fill:w,"shape-rendering":"crispEdges",xmlns:s,version:"1.1"}),b&&o.appendChild(t("path",{fill:b,d:"M0,0V"+v+"H"+v+"V0H0Z"})),o.appendChild(t("path",{transform:"matrix("+C+")",d:l})),o}()}
// !-QR Code

/** https://github.com/datalog/datamatrix-svg under MIT license */
'use strict';function DATAMatrix(r){var e=[],n=0,t=0,f=function(r,n){e[n]=e[n]||[],e[n][r]=1},o=function(r){for(var e=[],n=r.length,t=0;t<n;t++){var f=r.charCodeAt(t),o=t+1<n?r.charCodeAt(t+1):0;f>47&&f<58&&o>47&&o<58?(e.push(10*(f-48)+o+82),t++):f>127?(e.push(235),e.push(f-127&255)):e.push(f+1)}return e},h=function(r,e){var n,t,f=0,h=0,i=r.length,u=[e[0]],a=function(r){h=40*h+r,2==f++&&(u.push(++h>>8),u.push(255&h),f=h=0)};for(n=0;n<i&&(0!=f||n!=i-1);n++){var s=r.charCodeAt(n);for(s>127&&238!=u[0]&&(a(1),a(30),s-=128),t=1;s>e[t];t+=3);var l=e[t+1];if(8==l||9==l&&0==f&&n==i-1)return[];if(l<5&&2==f&&n==i-1)break;l<5&&a(l),a(s-e[t+2])}return 2==f&&238!==u[0]&&a(0),u.push(254),(f>0||n<i)&&(u=u.concat(o(r.substr(n-f)))),u},i=function(r,e){r=unescape(encodeURI(r));var i=o(r),u=i.length,a=h(r,[230,31,0,0,32,9,29,47,1,33,57,9,44,64,1,43,90,9,51,95,1,69,127,2,96,255,1,0]),s=a.length;s>0&&s<u&&(i=a,u=s),(s=(a=h(r,[239,31,0,0,32,9,29,47,1,33,57,9,44,64,1,43,90,2,64,95,1,69,122,9,83,127,2,96,255,1,0])).length)>0&&s<u&&(i=a,u=s),(s=(a=h(r,[238,12,8,0,13,9,13,31,8,0,32,9,29,41,8,0,42,9,41,47,8,0,57,9,44,64,8,0,90,9,51,255,8,0])).length)>0&&s<u&&(i=a,u=s),(s=(a=function(r){for(var e,n=r.length,t=n+1&-4,f=0,h=t>0?[240]:[],i=0;i<t;i++){if(i<t-1){if((e=r.charCodeAt(i))<32||e>94)return[]}else e=31;f=64*f+(63&e),3==(3&i)&&(h.push(f>>16),h.push(f>>8&255),h.push(255&f),f=0)}return t>n?h:h.concat(o(r.substr(0==t?0:t-1)))}(r)).length)>0&&s<u&&(i=a,u=s),(s=(a=function(r){var e=[231],n=r.length;250<n&&e.push(37+(n/250|0)&255),e.push(n%250+149*(e.length+1)%255+1&255);for(var t=0;t<n;t++)e.push(r.charCodeAt(t)+149*(e.length+1)%255+1&255);return e}(r)).length)>0&&s<u&&(i=a,u=s);var l,c,p,v,g,d,w,A,m=1,C=1,b=-1,y=1,M=new Array(70),x=new Array(70),z=new Array(256),E=new Array(255);if(e&&u<50){a=[16,7,28,11,24,14,32,18,32,24,44,28];do{s=(c=a[++b])*(l=6+(12&b))/8}while(s-a[++b]<u);c>25&&(m=2)}else{c=l=6,g=2,a=[5,7,10,12,14,18,20,24,28,36,42,48,56,68,84,112,144,192,224,272,336,408,496,620];do{if(++b==a.length)return[0,0];c>11*g&&(g=4+g&12),s=(c=l+=g)*l>>3}while(s-a[b]<u);c>27&&(C=m=2*(c/54|0)+2),s>255&&(y=2*(s>>9)+2)}for(p=c/m,v=l/C,u<s-(A=a[b])&&(i[u++]=129);u<s-A;)i[u++]=(149*u%253+130)%254;for(A/=y,b=1,g=0;g<255;g++)E[g]=b,z[b]=g,(b+=b)>255&&(b^=301);for(M[A]=0,g=1;g<=A;g++)for(M[b=A-g]=1;b<A;b++)M[b]=M[b+1]^E[(z[M[b]]+g)%255];for(d=0;d<y;d++){for(g=0;g<=A;g++)x[g]=0;for(g=d;g<u;g+=y)for(b=0,j=x[0]^i[g];b<A;b++)x[b]=x[b+1]^(j?E[(z[M[b]]+z[j])%255]:0);for(g=0;g<A;g++)i[u+d+g*y]=x[g]}for(g=0;g<l+2*C;g+=v+2)for(b=0;b<c+2*m;b++)f(b,g+v+1),0==(1&b)&&f(b,g);for(g=0;g<c+2*m;g+=p+2)for(b=0;b<l;b++)f(g,b+2*(b/v|0)+1),1==(1&b)&&f(g+p+1,b+2*(b/v|0));for(A=2,d=0,w=4,y=[0,0,-1,0,-2,0,0,-1,-1,-1,-2,-1,-1,-2,-2,-2],g=0;g<s;w-=A,d+=A){if(w==l-3&&-1==d)a=[c,6-l,c,5-l,c,4-l,c,3-l,c-1,3-l,3,2,2,2,1,2];else if(w==l+1&&1==d&&0==(7&c)&&6==(7&l))a=[c-2,-l,c-3,-l,c-4,-l,c-2,-1-l,c-3,-1-l,c-4,-1-l,c-2,-2,-1,-2];else{if(0==w&&d==c-2&&3&c)continue;if(w<0||d>=c||w>=l||d<0)for(w+=2+(A=-A)/2,d+=2-A/2;w<0||d>=c||w>=l||d<0;)w-=A,d+=A;if(w==l-2&&0==d&&3&c)a=[c-1,3-l,c-1,2-l,c-2,2-l,c-3,2-l,c-4,2-l,0,1,0,0,0,-1];else if(w==l-2&&0==d&&4==(7&c))a=[c-1,5-l,c-1,4-l,c-1,3-l,c-1,2-l,c-2,2-l,0,1,0,0,0,-1];else{if(1==w&&d==c-1&&0==(7&c)&&6==(7&l))continue;a=y}}for(u=i[g++],b=0;u>0;b+=2,u>>=1)if(1&u){var j=d+a[b],k=w+a[b+1];j<0&&(j+=c,k+=4-(c+4&7)),k<0&&(k+=l,j+=4-(l+4&7)),f(j+2*(j/p|0)+1,k+2*(k/v|0)+1)}}for(g=c;3&g;g--)f(g,g);n=c+2*m,t=l+2*C};return function(){function f(r){return/^#[0-9a-f]{3}(?:[0-9a-f]{3})?$/i.test(r)}function o(r,e){for(var n in r=document.createElementNS(g,r),e||{})r.setAttribute(n,e[n]);return r}var h,u,a,s,l,c,p,v=Math.abs,g="http://www.w3.org/2000/svg",d="",w="string"==typeof r?{msg:r}:r||{},A=w.pal||["#000"],m=v(w.dim)||256,C=[1,0,0,1,p=(p=v(w.pad))>-1?p:2,p],b=f(b=A[0])?b:"#000",y=f(y=A[1])?y:0,M=w.vrb?0:1;for(i(w.msg||"",w.rct),l=n+2*p,c=t+2*p,a=t;a--;)for(s=0,u=n;u--;)e[a][u]&&(M?(s++,e[a][u-1]||(d+="M"+u+","+a+"h"+s+"v1h-"+s+"v-1z",s=0)):d+="M"+u+","+a+"h1v1h-1v-1z");return h=o("svg",{viewBox:[0,0,l,c].join(" "),width:m/c*l|0,height:m,fill:b,"shape-rendering":"crispEdges",xmlns:g,version:"1.1"}),y&&h.appendChild(o("path",{fill:y,d:"M0,0v"+c+"h"+l+"V0H0Z"})),h.appendChild(o("path",{transform:"matrix("+C+")",d:d})),h}()}
// !-Data Matrix

/*!
 * iro.js v5.5.2
 * 2016-2021 James Daniel
 * Licensed under MPL 2.0
 * github.com/jaames/iro.js
 */
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).iro=n()}(this,function(){"use strict";var m,s,n,i,o,x={},j=[],r=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function M(t,n){for(var i in n)t[i]=n[i];return t}function y(t){var n=t.parentNode;n&&n.removeChild(t)}function h(t,n,i){var r,e,u,o,l=arguments;if(n=M({},n),3<arguments.length)for(i=[i],r=3;r<arguments.length;r++)i.push(l[r]);if(null!=i&&(n.children=i),null!=t&&null!=t.defaultProps)for(e in t.defaultProps)void 0===n[e]&&(n[e]=t.defaultProps[e]);return o=n.key,null!=(u=n.ref)&&delete n.ref,null!=o&&delete n.key,c(t,n,o,u)}function c(t,n,i,r){var e={type:t,props:n,key:i,ref:r,n:null,i:null,e:0,o:null,l:null,c:null,constructor:void 0};return m.vnode&&m.vnode(e),e}function O(t){return t.children}function I(t,n){this.props=t,this.context=n}function w(t,n){if(null==n)return t.i?w(t.i,t.i.n.indexOf(t)+1):null;for(var i;n<t.n.length;n++)if(null!=(i=t.n[n])&&null!=i.o)return i.o;return"function"==typeof t.type?w(t):null}function a(t){var n,i;if(null!=(t=t.i)&&null!=t.c){for(t.o=t.c.base=null,n=0;n<t.n.length;n++)if(null!=(i=t.n[n])&&null!=i.o){t.o=t.c.base=i.o;break}return a(t)}}function e(t){(!t.f&&(t.f=!0)&&1===s.push(t)||i!==m.debounceRendering)&&(i=m.debounceRendering,(m.debounceRendering||n)(u))}function u(){var t,n,i,r,e,u,o,l;for(s.sort(function(t,n){return n.d.e-t.d.e});t=s.pop();)t.f&&(r=i=void 0,u=(e=(n=t).d).o,o=n.p,l=n.u,n.u=!1,o&&(i=[],r=k(o,e,M({},e),n.w,void 0!==o.ownerSVGElement,null,i,l,null==u?w(e):u),d(i,e),r!=u&&a(e)))}function S(n,i,t,r,e,u,o,l,s){var c,a,f,h,v,d,g,b=t&&t.n||j,p=b.length;if(l==x&&(l=null!=u?u[0]:p?w(t,0):null),c=0,i.n=A(i.n,function(t){if(null!=t){if(t.i=i,t.e=i.e+1,null===(f=b[c])||f&&t.key==f.key&&t.type===f.type)b[c]=void 0;else for(a=0;a<p;a++){if((f=b[a])&&t.key==f.key&&t.type===f.type){b[a]=void 0;break}f=null}if(h=k(n,t,f=f||x,r,e,u,o,null,l,s),(a=t.ref)&&f.ref!=a&&(g=g||[]).push(a,t.c||h,t),null!=h){if(null==d&&(d=h),null!=t.l)h=t.l,t.l=null;else if(u==f||h!=l||null==h.parentNode){t:if(null==l||l.parentNode!==n)n.appendChild(h);else{for(v=l,a=0;(v=v.nextSibling)&&a<p;a+=2)if(v==h)break t;n.insertBefore(h,l)}"option"==i.type&&(n.value="")}l=h.nextSibling,"function"==typeof i.type&&(i.l=h)}}return c++,t}),i.o=d,null!=u&&"function"!=typeof i.type)for(c=u.length;c--;)null!=u[c]&&y(u[c]);for(c=p;c--;)null!=b[c]&&N(b[c],b[c]);if(g)for(c=0;c<g.length;c++)E(g[c],g[++c],g[++c])}function A(t,n,i){if(null==i&&(i=[]),null==t||"boolean"==typeof t)n&&i.push(n(null));else if(Array.isArray(t))for(var r=0;r<t.length;r++)A(t[r],n,i);else i.push(n?n(function(t){if(null==t||"boolean"==typeof t)return null;if("string"==typeof t||"number"==typeof t)return c(null,t,null,null);if(null==t.o&&null==t.c)return t;var n=c(t.type,t.props,t.key,null);return n.o=t.o,n}(t)):t);return i}function f(t,n,i){"-"===n[0]?t.setProperty(n,i):t[n]="number"==typeof i&&!1===r.test(n)?i+"px":null==i?"":i}function R(t,n,i,r,e){var u,o,l,s,c;if("key"===(n=e?"className"===n?"class":n:"class"===n?"className":n)||"children"===n);else if("style"===n)if(u=t.style,"string"==typeof i)u.cssText=i;else{if("string"==typeof r&&(u.cssText="",r=null),r)for(o in r)i&&o in i||f(u,o,"");if(i)for(l in i)r&&i[l]===r[l]||f(u,l,i[l])}else"o"===n[0]&&"n"===n[1]?(s=n!==(n=n.replace(/Capture$/,"")),n=((c=n.toLowerCase())in t?c:n).slice(2),i?(r||t.addEventListener(n,v,s),(t.t||(t.t={}))[n]=i):t.removeEventListener(n,v,s)):"list"!==n&&"tagName"!==n&&"form"!==n&&!e&&n in t?t[n]=null==i?"":i:"function"!=typeof i&&"dangerouslySetInnerHTML"!==n&&(n!==(n=n.replace(/^xlink:?/,""))?null==i||!1===i?t.removeAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase()):t.setAttributeNS("http://www.w3.org/1999/xlink",n.toLowerCase(),i):null==i||!1===i?t.removeAttribute(n):t.setAttribute(n,i))}function v(t){return this.t[t.type](m.event?m.event(t):t)}function k(t,n,i,r,e,u,o,l,s,c){var a,f,h,v,d,g,b,p,y,w,k=n.type;if(void 0!==n.constructor)return null;(a=m.e)&&a(n);try{t:if("function"==typeof k){if(p=n.props,y=(a=k.contextType)&&r[a.c],w=a?y?y.props.value:a.i:r,i.c?b=(f=n.c=i.c).i=f.k:("prototype"in k&&k.prototype.render?n.c=f=new k(p,w):(n.c=f=new I(p,w),f.constructor=k,f.render=z),y&&y.sub(f),f.props=p,f.state||(f.state={}),f.context=w,f.w=r,h=f.f=!0,f.m=[]),null==f.j&&(f.j=f.state),null!=k.getDerivedStateFromProps&&M(f.j==f.state?f.j=M({},f.j):f.j,k.getDerivedStateFromProps(p,f.j)),h)null==k.getDerivedStateFromProps&&null!=f.componentWillMount&&f.componentWillMount(),null!=f.componentDidMount&&o.push(f);else{if(null==k.getDerivedStateFromProps&&null==l&&null!=f.componentWillReceiveProps&&f.componentWillReceiveProps(p,w),!l&&null!=f.shouldComponentUpdate&&!1===f.shouldComponentUpdate(p,f.j,w)){for(f.props=p,f.state=f.j,f.f=!1,(f.d=n).o=null!=s?s!==i.o?s:i.o:null,n.n=i.n,a=0;a<n.n.length;a++)n.n[a]&&(n.n[a].i=n);break t}null!=f.componentWillUpdate&&f.componentWillUpdate(p,f.j,w)}for(v=f.props,d=f.state,f.context=w,f.props=p,f.state=f.j,(a=m.M)&&a(n),f.f=!1,f.d=n,f.p=t,a=f.render(f.props,f.state,f.context),n.n=A(null!=a&&a.type==O&&null==a.key?a.props.children:a),null!=f.getChildContext&&(r=M(M({},r),f.getChildContext())),h||null==f.getSnapshotBeforeUpdate||(g=f.getSnapshotBeforeUpdate(v,d)),S(t,n,i,r,e,u,o,s,c),f.base=n.o;a=f.m.pop();)f.j&&(f.state=f.j),a.call(f);h||null==v||null==f.componentDidUpdate||f.componentDidUpdate(v,d,g),b&&(f.k=f.i=null)}else n.o=function(t,n,i,r,e,u,o,l){var s,c,a,f,h=i.props,v=n.props;if(e="svg"===n.type||e,null==t&&null!=u)for(s=0;s<u.length;s++)if(null!=(c=u[s])&&(null===n.type?3===c.nodeType:c.localName===n.type)){t=c,u[s]=null;break}if(null==t){if(null===n.type)return document.createTextNode(v);t=e?document.createElementNS("http://www.w3.org/2000/svg",n.type):document.createElement(n.type),u=null}return null===n.type?h!==v&&(null!=u&&(u[u.indexOf(t)]=null),t.data=v):n!==i&&(null!=u&&(u=j.slice.call(t.childNodes)),a=(h=i.props||x).dangerouslySetInnerHTML,f=v.dangerouslySetInnerHTML,l||(f||a)&&(f&&a&&f.O==a.O||(t.innerHTML=f&&f.O||"")),function(t,n,i,r,e){var u;for(u in i)u in n||R(t,u,null,i[u],r);for(u in n)e&&"function"!=typeof n[u]||"value"===u||"checked"===u||i[u]===n[u]||R(t,u,n[u],i[u],r)}(t,v,h,e,l),n.n=n.props.children,f||S(t,n,i,r,"foreignObject"!==n.type&&e,u,o,x,l),l||("value"in v&&void 0!==v.value&&v.value!==t.value&&(t.value=null==v.value?"":v.value),"checked"in v&&void 0!==v.checked&&v.checked!==t.checked&&(t.checked=v.checked))),t}(i.o,n,i,r,e,u,o,c);(a=m.diffed)&&a(n)}catch(t){m.o(t,n,i)}return n.o}function d(t,n){for(var i;i=t.pop();)try{i.componentDidMount()}catch(t){m.o(t,i.d)}m.c&&m.c(n)}function E(t,n,i){try{"function"==typeof t?t(n):t.current=n}catch(t){m.o(t,i)}}function N(t,n,i){var r,e,u;if(m.unmount&&m.unmount(t),(r=t.ref)&&E(r,null,n),i||"function"==typeof t.type||(i=null!=(e=t.o)),t.o=t.l=null,null!=(r=t.c)){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(t){m.o(t,n)}r.base=r.p=null}if(r=t.n)for(u=0;u<r.length;u++)r[u]&&N(r[u],n,i);null!=e&&y(e)}function z(t,n,i){return this.constructor(t,i)}function g(t,n){for(var i=0;i<n.length;i++){var r=n[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function b(){return(b=Object.assign||function(t){for(var n=arguments,i=1;i<arguments.length;i++){var r=n[i];for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e])}return t}).apply(this,arguments)}m={},I.prototype.setState=function(t,n){var i=this.j!==this.state&&this.j||(this.j=M({},this.state));"function"==typeof t&&!(t=t(i,this.props))||M(i,t),null!=t&&this.d&&(this.u=!1,n&&this.m.push(n),e(this))},I.prototype.forceUpdate=function(t){this.d&&(t&&this.m.push(t),this.u=!0,e(this))},I.prototype.render=O,s=[],n="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,i=m.debounceRendering,m.o=function(t,n,i){for(var r;n=n.i;)if((r=n.c)&&!r.i)try{if(r.constructor&&null!=r.constructor.getDerivedStateFromError)r.setState(r.constructor.getDerivedStateFromError(t));else{if(null==r.componentDidCatch)continue;r.componentDidCatch(t)}return e(r.k=r)}catch(n){t=n}throw t},o=x;var t="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",l="[\\s|\\(]+("+t+")[,|\\s]+("+t+")[,|\\s]+("+t+")\\s*\\)?",p="[\\s|\\(]+("+t+")[,|\\s]+("+t+")[,|\\s]+("+t+")[,|\\s]+("+t+")\\s*\\)?",_=new RegExp("rgb"+l),H=new RegExp("rgba"+p),P=new RegExp("hsl"+l),$=new RegExp("hsla"+p),T="^(?:#?|0x?)",W="([0-9a-fA-F]{1})",C="([0-9a-fA-F]{2})",D=new RegExp(T+W+W+W+"$"),F=new RegExp(T+W+W+W+W+"$"),L=new RegExp(T+C+C+C+"$"),B=new RegExp(T+C+C+C+C+"$"),q=Math.log,G=Math.round,Z=Math.floor;function J(t,n,i){return Math.min(Math.max(t,n),i)}function K(t,n){var i=-1<t.indexOf("%"),r=parseFloat(t);return i?n/100*r:r}function Q(t){return parseInt(t,16)}function U(t){return t.toString(16).padStart(2,"0")}var V=function(){function l(t,n){this.$={h:0,s:0,v:0,a:1},t&&this.set(t),this.onChange=n,this.initialValue=b({},this.$)}var t=l.prototype;return t.set=function(t){if("string"==typeof t)/^(?:#?|0x?)[0-9a-fA-F]{3,8}$/.test(t)?this.hexString=t:/^rgba?/.test(t)?this.rgbString=t:/^hsla?/.test(t)&&(this.hslString=t);else{if("object"!=typeof t)throw new Error("Invalid color value");t instanceof l?this.hsva=t.hsva:"r"in t&&"g"in t&&"b"in t?this.rgb=t:"h"in t&&"s"in t&&"v"in t?this.hsv=t:"h"in t&&"s"in t&&"l"in t?this.hsl=t:"kelvin"in t&&(this.kelvin=t.kelvin)}},t.setChannel=function(t,n,i){var r;this[t]=b({},this[t],((r={})[n]=i,r))},t.reset=function(){this.hsva=this.initialValue},t.clone=function(){return new l(this)},t.unbind=function(){this.onChange=void 0},l.hsvToRgb=function(t){var n=t.h/60,i=t.s/100,r=t.v/100,e=Z(n),u=n-e,o=r*(1-i),l=r*(1-u*i),s=r*(1-(1-u)*i),c=e%6,a=[s,r,r,l,o,o][c],f=[o,o,s,r,r,l][c];return{r:J(255*[r,l,o,o,s,r][c],0,255),g:J(255*a,0,255),b:J(255*f,0,255)}},l.rgbToHsv=function(t){var n=t.r/255,i=t.g/255,r=t.b/255,e=Math.max(n,i,r),u=Math.min(n,i,r),o=e-u,l=0,s=e,c=0===e?0:o/e;switch(e){case u:l=0;break;case n:l=(i-r)/o+(i<r?6:0);break;case i:l=(r-n)/o+2;break;case r:l=(n-i)/o+4}return{h:60*l%360,s:J(100*c,0,100),v:J(100*s,0,100)}},l.hsvToHsl=function(t){var n=t.s/100,i=t.v/100,r=(2-n)*i,e=r<=1?r:2-r,u=e<1e-9?0:n*i/e;return{h:t.h,s:J(100*u,0,100),l:J(50*r,0,100)}},l.hslToHsv=function(t){var n=2*t.l,i=t.s*(n<=100?n:200-n)/100,r=n+i<1e-9?0:2*i/(n+i);return{h:t.h,s:J(100*r,0,100),v:J((n+i)/2,0,100)}},l.kelvinToRgb=function(t){var n,i,r,e=t/100;return r=e<66?(n=255,i=-155.25485562709179-.44596950469579133*(i=e-2)+104.49216199393888*q(i),e<20?0:.8274096064007395*(r=e-10)-254.76935184120902+115.67994401066147*q(r)):(n=351.97690566805693+.114206453784165*(n=e-55)-40.25366309332127*q(n),i=325.4494125711974+.07943456536662342*(i=e-50)-28.0852963507957*q(i),255),{r:J(Z(n),0,255),g:J(Z(i),0,255),b:J(Z(r),0,255)}},l.rgbToKelvin=function(t){for(var n,i=t.r,r=t.b,e=2e3,u=4e4;.4<u-e;){var o=l.kelvinToRgb(n=.5*(u+e));o.b/o.r>=r/i?u=n:e=n}return n},function(t,n,i){n&&g(t.prototype,n),i&&g(t,i)}(l,[{key:"hsv",get:function(){var t=this.$;return{h:t.h,s:t.s,v:t.v}},set:function(t){var n=this.$;if(t=b({},n,t),this.onChange){var i={h:!1,v:!1,s:!1,a:!1};for(var r in n)i[r]=t[r]!=n[r];this.$=t,(i.h||i.s||i.v||i.a)&&this.onChange(this,i)}else this.$=t}},{key:"hsva",get:function(){return b({},this.$)},set:function(t){this.hsv=t}},{key:"hue",get:function(){return this.$.h},set:function(t){this.hsv={h:t}}},{key:"saturation",get:function(){return this.$.s},set:function(t){this.hsv={s:t}}},{key:"value",get:function(){return this.$.v},set:function(t){this.hsv={v:t}}},{key:"alpha",get:function(){return this.$.a},set:function(t){this.hsv=b({},this.hsv,{a:t})}},{key:"kelvin",get:function(){return l.rgbToKelvin(this.rgb)},set:function(t){this.rgb=l.kelvinToRgb(t)}},{key:"red",get:function(){return this.rgb.r},set:function(t){this.rgb=b({},this.rgb,{r:t})}},{key:"green",get:function(){return this.rgb.g},set:function(t){this.rgb=b({},this.rgb,{g:t})}},{key:"blue",get:function(){return this.rgb.b},set:function(t){this.rgb=b({},this.rgb,{b:t})}},{key:"rgb",get:function(){var t=l.hsvToRgb(this.$),n=t.r,i=t.g,r=t.b;return{r:G(n),g:G(i),b:G(r)}},set:function(t){this.hsv=b({},l.rgbToHsv(t),{a:void 0===t.a?1:t.a})}},{key:"rgba",get:function(){return b({},this.rgb,{a:this.alpha})},set:function(t){this.rgb=t}},{key:"hsl",get:function(){var t=l.hsvToHsl(this.$),n=t.h,i=t.s,r=t.l;return{h:G(n),s:G(i),l:G(r)}},set:function(t){this.hsv=b({},l.hslToHsv(t),{a:void 0===t.a?1:t.a})}},{key:"hsla",get:function(){return b({},this.hsl,{a:this.alpha})},set:function(t){this.hsl=t}},{key:"rgbString",get:function(){var t=this.rgb;return"rgb("+t.r+", "+t.g+", "+t.b+")"},set:function(t){var n,i,r,e,u=1;if((n=_.exec(t))?(i=K(n[1],255),r=K(n[2],255),e=K(n[3],255)):(n=H.exec(t))&&(i=K(n[1],255),r=K(n[2],255),e=K(n[3],255),u=K(n[4],1)),!n)throw new Error("Invalid rgb string");this.rgb={r:i,g:r,b:e,a:u}}},{key:"rgbaString",get:function(){var t=this.rgba;return"rgba("+t.r+", "+t.g+", "+t.b+", "+t.a+")"},set:function(t){this.rgbString=t}},{key:"hexString",get:function(){var t=this.rgb;return"#"+U(t.r)+U(t.g)+U(t.b)},set:function(t){var n,i,r,e,u=255;if((n=D.exec(t))?(i=17*Q(n[1]),r=17*Q(n[2]),e=17*Q(n[3])):(n=F.exec(t))?(i=17*Q(n[1]),r=17*Q(n[2]),e=17*Q(n[3]),u=17*Q(n[4])):(n=L.exec(t))?(i=Q(n[1]),r=Q(n[2]),e=Q(n[3])):(n=B.exec(t))&&(i=Q(n[1]),r=Q(n[2]),e=Q(n[3]),u=Q(n[4])),!n)throw new Error("Invalid hex string");this.rgb={r:i,g:r,b:e,a:u/255}}},{key:"hex8String",get:function(){var t=this.rgba;return"#"+U(t.r)+U(t.g)+U(t.b)+U(Z(255*t.a))},set:function(t){this.hexString=t}},{key:"hslString",get:function(){var t=this.hsl;return"hsl("+t.h+", "+t.s+"%, "+t.l+"%)"},set:function(t){var n,i,r,e,u=1;if((n=P.exec(t))?(i=K(n[1],360),r=K(n[2],100),e=K(n[3],100)):(n=$.exec(t))&&(i=K(n[1],360),r=K(n[2],100),e=K(n[3],100),u=K(n[4],1)),!n)throw new Error("Invalid hsl string");this.hsl={h:i,s:r,l:e,a:u}}},{key:"hslaString",get:function(){var t=this.hsla;return"hsla("+t.h+", "+t.s+"%, "+t.l+"%, "+t.a+")"},set:function(t){this.hslString=t}}]),l}();function X(t){var n,i=t.width,r=t.sliderSize,e=t.borderWidth,u=t.handleRadius,o=t.padding,l=t.sliderShape,s="horizontal"===t.layoutDirection;return r=null!=(n=r)?n:2*o+2*u,"circle"===l?{handleStart:t.padding+t.handleRadius,handleRange:i-2*o-2*u,width:i,height:i,cx:i/2,cy:i/2,radius:i/2-e/2}:{handleStart:r/2,handleRange:i-r,radius:r/2,x:0,y:0,width:s?r:i,height:s?i:r}}function Y(t,n){var i=X(t),r=i.width,e=i.height,u=i.handleRange,o=i.handleStart,l="horizontal"===t.layoutDirection,s=l?r/2:e/2,c=o+function(t,n){var i=n.hsva,r=n.rgb;switch(t.sliderType){case"red":return r.r/2.55;case"green":return r.g/2.55;case"blue":return r.b/2.55;case"alpha":return 100*i.a;case"kelvin":var e=t.minTemperature,u=t.maxTemperature-e,o=(n.kelvin-e)/u*100;return Math.max(0,Math.min(o,100));case"hue":return i.h/=3.6;case"saturation":return i.s;case"value":default:return i.v}}(t,n)/100*u;return l&&(c=-1*c+u+2*o),{x:l?s:c,y:l?c:s}}var tt,nt=2*Math.PI,it=function(t,n){return(t%n+n)%n},rt=function(t,n){return Math.sqrt(t*t+n*n)};function et(t){return t.width/2-t.padding-t.handleRadius-t.borderWidth}function ut(t){var n=t.width/2;return{width:t.width,radius:n-t.borderWidth,cx:n,cy:n}}function ot(t,n,i){var r=t.wheelAngle,e=t.wheelDirection;return i&&"clockwise"===e?n=r+n:"clockwise"===e?n=360-r+n:i&&"anticlockwise"===e?n=r+180-n:"anticlockwise"===e&&(n=r-n),it(n,360)}function lt(t,n,i){var r=ut(t),e=r.cx,u=r.cy,o=et(t);n=e-n,i=u-i;var l=ot(t,Math.atan2(-i,-n)*(360/nt)),s=Math.min(rt(n,i),o);return{h:Math.round(l),s:Math.round(100/o*s)}}function st(t){var n=t.width,i=t.boxHeight;return{width:n,height:null!=i?i:n,radius:t.padding+t.handleRadius}}function ct(t,n,i){var r=st(t),e=r.width,u=r.height,o=r.radius,l=(n-o)/(e-2*o)*100,s=(i-o)/(u-2*o)*100;return{s:Math.max(0,Math.min(l,100)),v:Math.max(0,Math.min(100-s,100))}}function at(t,n,i,r){for(var e=0;e<r.length;e++){var u=r[e].x-n,o=r[e].y-i;if(Math.sqrt(u*u+o*o)<t.handleRadius)return e}return null}function ft(t){return{boxSizing:"border-box",border:t.borderWidth+"px solid "+t.borderColor}}function ht(t,n,i){return t+"-gradient("+n+", "+i.map(function(t){var n=t[0];return t[1]+" "+n+"%"}).join(",")+")"}function vt(t){return"string"==typeof t?t:t+"px"}var dt=["mousemove","touchmove","mouseup","touchend"],gt=function(n){function t(t){n.call(this,t),this.uid=(Math.random()+1).toString(36).substring(5)}return n&&(t.__proto__=n),((t.prototype=Object.create(n&&n.prototype)).constructor=t).prototype.render=function(t){var n=this.handleEvent.bind(this),i={onMouseDown:n,ontouchstart:n},r="horizontal"===t.layoutDirection,e=null===t.margin?t.sliderMargin:t.margin,u={overflow:"visible",display:r?"inline-block":"block"};return 0<t.index&&(u[r?"marginLeft":"marginTop"]=e),h(O,null,t.children(this.uid,i,u))},t.prototype.handleEvent=function(t){var n=this,i=this.props.onInput,r=this.base.getBoundingClientRect();t.preventDefault();var e=t.touches?t.changedTouches[0]:t,u=e.clientX-r.left,o=e.clientY-r.top;switch(t.type){case"mousedown":case"touchstart":!1!==i(u,o,0)&&dt.forEach(function(t){document.addEventListener(t,n,{passive:!1})});break;case"mousemove":case"touchmove":i(u,o,1);break;case"mouseup":case"touchend":i(u,o,2),dt.forEach(function(t){document.removeEventListener(t,n,{passive:!1})})}},t}(I);function bt(t){var n=t.r,i=t.url,r=n,e=n;return h("svg",{className:"IroHandle IroHandle--"+t.index+" "+(t.isActive?"IroHandle--isActive":""),style:{"-webkit-tap-highlight-color":"rgba(0, 0, 0, 0);",transform:"translate("+vt(t.x)+", "+vt(t.y)+")",willChange:"transform",top:vt(-n),left:vt(-n),width:vt(2*n),height:vt(2*n),position:"absolute",overflow:"visible"}},i&&h("use",Object.assign({xlinkHref:function(t){tt=tt||document.getElementsByTagName("base");var n=window.navigator.userAgent,i=/^((?!chrome|android).)*safari/i.test(n),r=/iPhone|iPod|iPad/i.test(n),e=window.location;return(i||r)&&0<tt.length?e.protocol+"//"+e.host+e.pathname+e.search+t:t}(i)},t.props)),!i&&h("circle",{cx:r,cy:e,r:n,fill:"none","stroke-width":2,stroke:"#000"}),!i&&h("circle",{cx:r,cy:e,r:n-2,fill:t.fill,"stroke-width":2,stroke:"#fff"}))}function pt(e){var t=e.activeIndex,u=void 0!==t&&t<e.colors.length?e.colors[t]:e.color,n=X(e),r=n.width,o=n.height,l=n.radius,s=Y(e,u),c=function(t,n){var i=n.hsv,r=n.rgb;switch(t.sliderType){case"red":return[[0,"rgb(0,"+r.g+","+r.b+")"],[100,"rgb(255,"+r.g+","+r.b+")"]];case"green":return[[0,"rgb("+r.r+",0,"+r.b+")"],[100,"rgb("+r.r+",255,"+r.b+")"]];case"blue":return[[0,"rgb("+r.r+","+r.g+",0)"],[100,"rgb("+r.r+","+r.g+",255)"]];case"alpha":return[[0,"rgba("+r.r+","+r.g+","+r.b+",0)"],[100,"rgb("+r.r+","+r.g+","+r.b+")"]];case"kelvin":for(var e=[],u=t.minTemperature,o=t.maxTemperature,l=o-u,s=u,c=0;s<o;s+=l/8,c+=1){var a=V.kelvinToRgb(s),f=a.r,h=a.g,v=a.b;e.push([12.5*c,"rgb("+f+","+h+","+v+")"])}return e;case"hue":return[[0,"#f00"],[16.666,"#ff0"],[33.333,"#0f0"],[50,"#0ff"],[66.666,"#00f"],[83.333,"#f0f"],[100,"#f00"]];case"saturation":var d=V.hsvToHsl({h:i.h,s:0,v:i.v}),g=V.hsvToHsl({h:i.h,s:100,v:i.v});return[[0,"hsl("+d.h+","+d.s+"%,"+d.l+"%)"],[100,"hsl("+g.h+","+g.s+"%,"+g.l+"%)"]];case"value":default:var b=V.hsvToHsl({h:i.h,s:i.s,v:100});return[[0,"#000"],[100,"hsl("+b.h+","+b.s+"%,"+b.l+"%)"]]}}(e,u);return h(gt,Object.assign({},e,{onInput:function(t,n,i){var r=function(t,n,i){var r,e=X(t),u=e.handleRange,o=e.handleStart;r="horizontal"===t.layoutDirection?-1*i+u+o:n-o,r=Math.max(Math.min(r,u),0);var l=Math.round(100/u*r);switch(t.sliderType){case"kelvin":var s=t.minTemperature;return s+l/100*(t.maxTemperature-s);case"alpha":return l/100;case"hue":return 3.6*l;case"red":case"blue":case"green":return 2.55*l;default:return l}}(e,t,n);e.parent.inputActive=!0,u[e.sliderType]=r,e.onInput(i,e.id)}}),function(t,n,i){return h("div",Object.assign({},n,{className:"IroSlider",style:Object.assign({},{position:"relative",width:vt(r),height:vt(o),borderRadius:vt(l),background:"conic-gradient(#ccc 25%, #fff 0 50%, #ccc 0 75%, #fff 0)",backgroundSize:"8px 8px"},i)}),h("div",{className:"IroSliderGradient",style:Object.assign({},{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:vt(l),background:ht("linear","horizontal"===e.layoutDirection?"to top":"to right",c)},ft(e))}),h(bt,{isActive:!0,index:u.index,r:e.handleRadius,url:e.handleSvg,props:e.handleProps,x:s.x,y:s.y}))})}function yt(e){var t=st(e),r=t.width,u=t.height,o=t.radius,l=e.colors,s=e.parent,n=e.activeIndex,c=void 0!==n&&n<e.colors.length?e.colors[n]:e.color,a=function(t,n){return[[[0,"#fff"],[100,"hsl("+n.hue+",100%,50%)"]],[[0,"rgba(0,0,0,0)"],[100,"#000"]]]}(0,c),f=l.map(function(t){return function(t,n){var i=st(t),r=i.width,e=i.height,u=i.radius,o=n.hsv,l=u,s=r-2*u,c=e-2*u;return{x:l+o.s/100*s,y:l+(c-o.v/100*c)}}(e,t)});return h(gt,Object.assign({},e,{onInput:function(t,n,i){if(0===i){var r=at(e,t,n,f);null!==r?s.setActiveColor(r):(s.inputActive=!0,c.hsv=ct(e,t,n),e.onInput(i,e.id))}else 1===i&&(s.inputActive=!0,c.hsv=ct(e,t,n));e.onInput(i,e.id)}}),function(t,n,i){return h("div",Object.assign({},n,{className:"IroBox",style:Object.assign({},{width:vt(r),height:vt(u),position:"relative"},i)}),h("div",{className:"IroBox",style:Object.assign({},{width:"100%",height:"100%",borderRadius:vt(o)},ft(e),{background:ht("linear","to bottom",a[1])+","+ht("linear","to right",a[0])})}),l.filter(function(t){return t!==c}).map(function(t){return h(bt,{isActive:!1,index:t.index,fill:t.hslString,r:e.handleRadius,url:e.handleSvg,props:e.handleProps,x:f[t.index].x,y:f[t.index].y})}),h(bt,{isActive:!0,index:c.index,fill:c.hslString,r:e.activeHandleRadius||e.handleRadius,url:e.handleSvg,props:e.handleProps,x:f[c.index].x,y:f[c.index].y}))})}bt.defaultProps={fill:"none",x:0,y:0,r:8,url:null,props:{x:0,y:0}},pt.defaultProps=Object.assign({},{sliderShape:"bar",sliderType:"value",minTemperature:2200,maxTemperature:11e3});function wt(e){var r=ut(e).width,u=e.colors,o=(e.borderWidth,e.parent),l=e.color,s=l.hsv,c=u.map(function(t){return function(t,n){var i=n.hsv,r=ut(t),e=r.cx,u=r.cy,o=et(t),l=(180+ot(t,i.h,!0))*(nt/360),s=i.s/100*o,c="clockwise"===t.wheelDirection?-1:1;return{x:e+s*Math.cos(l)*c,y:u+s*Math.sin(l)*c}}(e,t)}),a={position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"50%",boxSizing:"border-box"};return h(gt,Object.assign({},e,{onInput:function(t,n,i){if(0===i){if(!function(t,n,i){var r=ut(t),e=r.cx,u=r.cy,o=t.width/2;return rt(e-n,u-i)<o}(e,t,n))return!1;var r=at(e,t,n,c);null!==r?o.setActiveColor(r):(o.inputActive=!0,l.hsv=lt(e,t,n),e.onInput(i,e.id))}else 1===i&&(o.inputActive=!0,l.hsv=lt(e,t,n));e.onInput(i,e.id)}}),function(t,n,i){return h("div",Object.assign({},n,{className:"IroWheel",style:Object.assign({},{width:vt(r),height:vt(r),position:"relative"},i)}),h("div",{className:"IroWheelHue",style:Object.assign({},a,{transform:"rotateZ("+(e.wheelAngle+90)+"deg)",background:"clockwise"===e.wheelDirection?"conic-gradient(red, yellow, lime, aqua, blue, magenta, red)":"conic-gradient(red, magenta, blue, aqua, lime, yellow, red)"})}),h("div",{className:"IroWheelSaturation",style:Object.assign({},a,{background:"radial-gradient(circle closest-side, #fff, transparent)"})}),e.wheelLightness&&h("div",{className:"IroWheelLightness",style:Object.assign({},a,{background:"#000",opacity:1-s.v/100})}),h("div",{className:"IroWheelBorder",style:Object.assign({},a,ft(e))}),u.filter(function(t){return t!==l}).map(function(t){return h(bt,{isActive:!1,index:t.index,fill:t.hslString,r:e.handleRadius,url:e.handleSvg,props:e.handleProps,x:c[t.index].x,y:c[t.index].y})}),h(bt,{isActive:!0,index:l.index,fill:l.hslString,r:e.activeHandleRadius||e.handleRadius,url:e.handleSvg,props:e.handleProps,x:c[l.index].x,y:c[l.index].y}))})}var kt=function(i){function t(t){var n=this;i.call(this,t),this.colors=[],this.inputActive=!1,this.events={},this.activeEvents={},this.deferredEvents={},this.id=t.id,(0<t.colors.length?t.colors:[t.color]).forEach(function(t){return n.addColor(t)}),this.setActiveColor(0),this.state=Object.assign({},t,{color:this.color,colors:this.colors,layout:t.layout})}return i&&(t.__proto__=i),((t.prototype=Object.create(i&&i.prototype)).constructor=t).prototype.addColor=function(t,n){void 0===n&&(n=this.colors.length);var i=new V(t,this.onColorChange.bind(this));this.colors.splice(n,0,i),this.colors.forEach(function(t,n){return t.index=n}),this.state&&this.setState({colors:this.colors}),this.deferredEmit("color:init",i)},t.prototype.removeColor=function(t){var n=this.colors.splice(t,1)[0];n.unbind(),this.colors.forEach(function(t,n){return t.index=n}),this.state&&this.setState({colors:this.colors}),n.index===this.color.index&&this.setActiveColor(0),this.emit("color:remove",n)},t.prototype.setActiveColor=function(t){this.color=this.colors[t],this.state&&this.setState({color:this.color}),this.emit("color:setActive",this.color)},t.prototype.setColors=function(t,n){var i=this;void 0===n&&(n=0),this.colors.forEach(function(t){return t.unbind()}),this.colors=[],t.forEach(function(t){return i.addColor(t)}),this.setActiveColor(n),this.emit("color:setAll",this.colors)},t.prototype.on=function(t,n){var i=this,r=this.events;(Array.isArray(t)?t:[t]).forEach(function(t){(r[t]||(r[t]=[])).push(n),i.deferredEvents[t]&&(i.deferredEvents[t].forEach(function(t){n.apply(null,t)}),i.deferredEvents[t]=[])})},t.prototype.off=function(t,i){var r=this;(Array.isArray(t)?t:[t]).forEach(function(t){var n=r.events[t];n&&n.splice(n.indexOf(i),1)})},t.prototype.emit=function(t){for(var n=this,i=[],r=arguments.length-1;0<r--;)i[r]=arguments[r+1];var e=this.activeEvents;!!e.hasOwnProperty(t)&&e[t]||(e[t]=!0,(this.events[t]||[]).forEach(function(t){return t.apply(n,i)}),e[t]=!1)},t.prototype.deferredEmit=function(t){for(var n,i=[],r=arguments.length-1;0<r--;)i[r]=arguments[r+1];var e=this.deferredEvents;(n=this).emit.apply(n,[t].concat(i)),(e[t]||(e[t]=[])).push(i)},t.prototype.setOptions=function(t){this.setState(t)},t.prototype.resize=function(t){this.setOptions({width:t})},t.prototype.reset=function(){this.colors.forEach(function(t){return t.reset()}),this.setState({colors:this.colors})},t.prototype.onMount=function(t){this.el=t,this.deferredEmit("mount",this)},t.prototype.onColorChange=function(t,n){this.setState({color:this.color}),this.inputActive&&(this.inputActive=!1,this.emit("input:change",t,n)),this.emit("color:change",t,n)},t.prototype.emitInputEvent=function(t,n){0===t?this.emit("input:start",this.color,n):1===t?this.emit("input:move",this.color,n):2===t&&this.emit("input:end",this.color,n)},t.prototype.render=function(t,e){var u=this,n=e.layout;return Array.isArray(n)||(n=[{component:wt},{component:pt}],e.transparency&&n.push({component:pt,options:{sliderType:"alpha"}})),h("div",{class:"IroColorPicker",id:e.id,style:{display:e.display}},n.map(function(t,n){var i=t.component,r=t.options;return h(i,Object.assign({},e,r,{ref:void 0,onInput:u.emitInputEvent.bind(u),parent:u,index:n}))}))},t}(I);kt.defaultProps=Object.assign({},{width:300,height:300,color:"#fff",colors:[],padding:6,layoutDirection:"vertical",borderColor:"#fff",borderWidth:0,handleRadius:8,activeHandleRadius:null,handleSvg:null,handleProps:{x:0,y:0},wheelLightness:!0,wheelAngle:0,wheelDirection:"anticlockwise",sliderSize:null,sliderMargin:12,boxHeight:null},{colors:[],display:"block",id:null,layout:"default",margin:null});var mt,xt,jt,Mt,Ot=(It.prototype=(mt=kt).prototype,Object.assign(It,mt),It.I=mt,It);function It(n,t){var i,r=document.createElement("div");function e(){var t=n instanceof Element?n:document.querySelector(n);t.appendChild(i.base),i.onMount(t)}return function(t,n,i){var r,e,u;m.i&&m.i(t,n),e=(r=i===o)?null:i&&i.n||n.n,t=h(O,null,[t]),u=[],k(n,r?n.n=t:(i||n).n=t,e||x,x,void 0!==n.ownerSVGElement,i&&!r?[i]:e?null:j.slice.call(n.childNodes),u,!1,i||x,r),d(u,t)}(h(mt,Object.assign({},{ref:function(t){return i=t}},t)),r),"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e),i}return(jt=xt=xt||{}).version="5.5.2",jt.Color=V,jt.ColorPicker=Ot,(Mt=jt.ui||(jt.ui={})).h=h,Mt.ComponentBase=gt,Mt.Handle=bt,Mt.Slider=pt,Mt.Wheel=wt,Mt.Box=yt,xt});
// !-iro color picker