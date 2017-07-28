webpackJsonp([1],{

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/checkout.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    plans: {
      type: Array,
      required: true
    },
    user: {
      type: Object,
      required: false
    },
    id: {
      type: String,
      required: false
    }
  },
  data: function data() {
    return {
      stripeToken: '',
      stripeEmail: '',
      plan: 1,
      status: false,
      loading: false,
      local_id: null,
      localUser: {},
      email: null
    };
  },
  mounted: function mounted() {
    $('.ui.dropdown').dropdown();
    console.log('user', this.user);

    if (this.user) {
      this.email = this.user.email;
    }

    if (this.id) {
      this.local_id = this.id;
    }

    if (this.local_id) {
      this.loadUser(this.local_id);
    }
  },
  created: function created() {
    var _this = this;

    var t = this;
    this.stripe = StripeCheckout.configure({
      key: Colorpay.stripeKey,
      image: "http://i.usatoday.net/_common/_notches/857b31fa-2754-4722-91af-eb44dbc47690-MARKETPLACE.png",
      locale: "auto",
      token: function token(_token) {
        _this.stripeToken = _token.id;
        _this.stripeEmail = _token.email;
        t.loading = true;
        NProgress.start();
        _this.$http.post('/api/v1/subscriptions', _this.$data).then(function (response) {
          console.log(response.data);
          Vue.toasted.success('Topup Successful!');
          NProgress.done(true);
          t.loading = false;
        }, function (response) {
          return _this.status = response.body.status;
        });
      }
    });
  },

  methods: {
    stripeTopUp: function stripeTopUp() {
      var plan = this.findPlanById(this.plan);
      this.stripe.open({
        email: this.email,
        name: plan.name,
        description: plan.name,
        zipCode: true,
        amount: plan.price
      });
    },
    findPlanById: function findPlanById(id) {
      return this.plans.find(function (plan) {
        return plan.id == id;
      });
    },
    loadUser: function loadUser(id) {
      var t = this;
      this.loading = true;
      NProgress.start();
      this.$http.get('/api/v1/users/' + id).then(function (response) {
        console.log('response.data', response.data);
        t.localUser = response.data;
        t.email = response.data.email;
        t.loading = false;
        NProgress.done(true);
        Vue.toasted.info('Data Loaded Successfully!');
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/home.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			loading: false,
			userData: []
		};
	},
	created: function created() {
		this.loadData();
	},

	methods: {
		loadData: function loadData() {
			var t = this;
			t.loading = true;
			NProgress.start();
			this.$http.get('/api/v1/users').then(function (response) {
				t.userData = response.data.data;
				t.loading = false;
				NProgress.done(true);
				Vue.toasted.success('Data Loaded Successfully!');
			});
		}
	},
	computed: {},
	watch: {}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/payments.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['id'],
  data: function data() {
    return {
      local_id: this.id,
      loading: false,
      userData: {}
    };
  },
  created: function created() {
    if (this.id) {
      this.local_id = this.id;
    }
    if (this.local_id) {
      this.loadData(this.local_id);
    }
  },
  mounted: function mounted() {
    $('table').tablesort();
  },

  methods: {
    loadData: function loadData(id) {
      var t = this;
      this.loading = true;
      NProgress.start();
      this.$http.get('/api/v1/users/' + id).then(function (response) {
        console.log('reseponse.data', response.data);
        t.userData = response.data;
        t.loading = false;
        NProgress.done(true);
      });
    }
  },
  computed: {},
  watch: {}
});
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/users/create.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	mounted: function mounted() {
		var _this = this;

		var script = document.createElement('script');
		script.src = "https://checkout.stripe.com/checkout.js";
		script.onload = function () {
			console.log("Stripe Script loaded and ready");
			_this.configureYourStripe();
		};
		document.body.appendChild(script);
	},
	data: function data() {
		return {
			id: null,
			name: null,
			email_address: null,
			stripe_id: null,
			card_brand: null,
			card_last_four: null,
			trial_ends_at: null
		};
	},

	methods: {
		configureYourStripe: function configureYourStripe() {}
	}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/users/edit.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	mounted: function mounted() {
		console.log('Successfully Mounted');
	},
	data: function data() {
		return {
			stripe_id: null

		};
	}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/users/index.vue":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	created: function created() {},
	mounted: function mounted() {
		console.log('ABC');
	},
	data: function data() {
		return {
			message: 'YOLO'
		};
	}
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/users/show.vue":
/***/ (function(module, exports) {

//
//
//

/***/ }),

/***/ "./node_modules/bezier-easing/src/index.js":
/***/ (function(module, exports) {

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

module.exports = function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  if (mX1 !== mY1 || mX2 !== mY2) {
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    if (mX1 === mY1 && mX2 === mY2) {
      return x; // linear
    }
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
};


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-22af7c0a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/edit.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
exports.push([module.i, "\n[v-cloak] > *[data-v-22af7c0a] { display:none\n}\n[v-cloak][data-v-22af7c0a]::before { content: \"Loading…\"\n}\n", ""]);

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-51b46bfc\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/create.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
exports.push([module.i, "\n[v-cloak] > *[data-v-51b46bfc] { display:none\n}\n[v-cloak][data-v-51b46bfc]::before { content: \"Loading…\"\n}\n", ""]);

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-74f7bf02\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/index.vue":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")();
exports.push([module.i, "\n[v-cloak] > *[data-v-74f7bf02] { display:none\n}\n[v-cloak][data-v-74f7bf02]::before { content: \"Loading…\"\n}\n.body[data-v-74f7bf02] {\n\tbackground: linear-gradient(#2AEEFF,#5580EB) no-repeat 50% fixed !important;\n\tbackground-size: cover !important;\n}\n", ""]);

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uuid/v4.js":
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__("./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__("./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/vue-loader/lib/component-normalizer.js":
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-22af7c0a\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/users/edit.vue":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c("div")
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-22af7c0a", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-51b46bfc\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/users/create.vue":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    staticClass: "ui form"
  }, [_c('h4', {
    staticClass: "ui dividing header"
  }, [_vm._v("Shipping Information")]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('label', [_vm._v("Name")]), _vm._v(" "), _c('div', {
    staticClass: "two fields"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "shipping[first-name]",
      "placeholder": "First Name"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "shipping[last-name]",
      "placeholder": "Last Name"
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('label', [_vm._v("Billing Address")]), _vm._v(" "), _c('div', {
    staticClass: "fields"
  }, [_c('div', {
    staticClass: "twelve wide field"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "shipping[address]",
      "placeholder": "Street Address"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "four wide field"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "shipping[address-2]",
      "placeholder": "Apt #"
    }
  })])])]), _vm._v(" "), _c('h4', {
    staticClass: "ui dividing header"
  }, [_vm._v("Billing Information")]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('label', [_vm._v("Card Type")]), _vm._v(" "), _c('div', {
    staticClass: "ui selection dropdown"
  }, [_c('input', {
    attrs: {
      "type": "hidden",
      "name": "card[type]"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "default text"
  }, [_vm._v("Type")]), _vm._v(" "), _c('i', {
    staticClass: "dropdown icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "menu"
  }, [_c('div', {
    staticClass: "item",
    attrs: {
      "data-value": "visa"
    }
  }, [_c('i', {
    staticClass: "visa icon"
  }), _vm._v("\n          Visa\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "item",
    attrs: {
      "data-value": "amex"
    }
  }, [_c('i', {
    staticClass: "amex icon"
  }), _vm._v("\n          American Express\n        ")]), _vm._v(" "), _c('div', {
    staticClass: "item",
    attrs: {
      "data-value": "discover"
    }
  }, [_c('i', {
    staticClass: "discover icon"
  }), _vm._v("\n          Discover\n        ")])])])]), _vm._v(" "), _c('div', {
    staticClass: "fields"
  }, [_c('div', {
    staticClass: "seven wide field"
  }, [_c('label', [_vm._v("Card Number")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "name": "card[number]",
      "maxlength": "16",
      "placeholder": "Card #"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "three wide field"
  }, [_c('label', [_vm._v("CVC")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "name": "card[cvc]",
      "maxlength": "3",
      "placeholder": "CVC"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "six wide field"
  }, [_c('label', [_vm._v("Expiration")]), _vm._v(" "), _c('div', {
    staticClass: "two fields"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('select', {
    staticClass: "ui fluid search dropdown",
    attrs: {
      "name": "card[expire-month]"
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Month")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "1"
    }
  }, [_vm._v("January")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "2"
    }
  }, [_vm._v("February")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "3"
    }
  }, [_vm._v("March")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "4"
    }
  }, [_vm._v("April")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "5"
    }
  }, [_vm._v("May")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "6"
    }
  }, [_vm._v("June")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "7"
    }
  }, [_vm._v("July")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "8"
    }
  }, [_vm._v("August")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "9"
    }
  }, [_vm._v("September")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "10"
    }
  }, [_vm._v("October")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "11"
    }
  }, [_vm._v("November")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "12"
    }
  }, [_vm._v("December")])])]), _vm._v(" "), _c('div', {
    staticClass: "field"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "card[expire-year]",
      "maxlength": "4",
      "placeholder": "Year"
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "ui button",
    attrs: {
      "tabindex": "0"
    }
  }, [_vm._v("Submit Order")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-51b46bfc", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5343d3c6\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/payments.vue":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(this.loading) ? _c('div', {
    staticClass: "sixteen wide column"
  }, [_c('div', {
    staticClass: "ui segment",
    staticStyle: {
      "height": "200px"
    }
  }, [_c('div', {
    staticClass: "ui inverted dimmer",
    class: {
      active: _vm.loading
    }
  }, [_c('div', {
    staticClass: "ui text large loader"
  }, [_vm._v("Loading")])])])]) : _vm._e(), _vm._v(" "), (!this.loading) ? _c('div', {
    staticClass: "sixteen wide column"
  }, [_c('div', {
    staticClass: "ui icon message"
  }, [_c('i', {
    staticClass: "user icon"
  }), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "header"
  }, [_vm._v("\n          " + _vm._s(_vm.userData.name) + "\n        ")]), _vm._v(" "), _c('p', [_vm._v("Total Balance: " + _vm._s(_vm._.sumBy(_vm.userData.charges, 'amount') / 100))])])]), _vm._v(" "), (_vm.userData.charges.length > 0) ? _c('table', {
    staticClass: "ui celled fluid sortable table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.userData.charges), function(charge, index) {
    return _c('tr', [_c('td', [_c('div', {
      staticClass: "ui ribbon label"
    }, [_vm._v(_vm._s(index + 1))])]), _vm._v(" "), _c('td', [_vm._v("\n            " + _vm._s(_vm._.upperCase(charge.currency)) + "\n          ")]), _vm._v(" "), _c('td', {
      staticClass: "right aligned"
    }, [_vm._v("\n            " + _vm._s(charge.amount / 100) + "\n          ")]), _vm._v(" "), _c('td', [(charge.paid) ? _c('div', {
      staticClass: "ui green red basic label"
    }, [_vm._v("\n              Paid\n            ")]) : _vm._e()]), _vm._v(" "), _c('td', [(charge.refunded) ? _c('div', {
      staticClass: "ui red basic label"
    }, [_vm._v("\n              YES\n            ")]) : _vm._e(), _vm._v(" "), (!charge.refunded) ? _c('div', {
      staticClass: "ui red basic label"
    }, [_vm._v("\n              NO\n            ")]) : _vm._e()]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "ui teal basic label"
    }, [_vm._v(_vm._s(_vm.moment(charge.updated_at).format("DD/MM/YY HH:mm:ss")))])])])
  }))]) : _c('div', [_vm._v("\n      No Payment History!\n    ")])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', {
    staticClass: "one wide"
  }, [_vm._v("Sr. No.")]), _vm._v(" "), _c('th', {
    staticClass: "two wide"
  }, [_vm._v("Currency")]), _vm._v(" "), _c('th', {
    staticClass: "two wide right aligned"
  }, [_vm._v("Amount")]), _vm._v(" "), _c('th', {
    staticClass: "one wide"
  }, [_vm._v("Paid")]), _vm._v(" "), _c('th', {
    staticClass: "one wide"
  }, [_vm._v("Refunded")]), _vm._v(" "), _c('th', {
    staticClass: "two wide"
  }, [_vm._v("Updated At")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5343d3c6", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-71f34542\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/checkout.vue":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    staticClass: "ui form",
    staticStyle: {
      "margin-top": "50px"
    },
    attrs: {
      "action": "/api/v1/subscriptions",
      "method": "POST"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.stripeToken),
      expression: "stripeToken"
    }],
    attrs: {
      "type": "hidden",
      "name": "stripeToken"
    },
    domProps: {
      "value": (_vm.stripeToken)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.stripeToken = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.stripeEmail),
      expression: "stripeEmail"
    }],
    attrs: {
      "type": "hidden",
      "name": "stripeEmail"
    },
    domProps: {
      "value": (_vm.stripeEmail)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.stripeEmail = $event.target.value
      }
    }
  }), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.plan),
      expression: "plan"
    }],
    staticClass: "ui dropdown",
    attrs: {
      "name": "plan"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.plan = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.plans), function(plan) {
    return _c('option', {
      domProps: {
        "value": plan.id
      }
    }, [_vm._v(_vm._s(plan.name))])
  })), _vm._v(" "), _c('button', {
    staticClass: "ui right labeled icon button",
    class: {
      'disabled loading': this.loading
    },
    attrs: {
      "type": "submit"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.stripeTopUp($event)
      }
    }
  }, [_vm._v("Topup via "), _c('i', {
    staticClass: "stripe icon"
  })]), _vm._v(" "), _c('button', {
    staticClass: "ui right labeled icon button",
    class: {
      'disabled': this.loading
    },
    attrs: {
      "type": "submit"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.stripeTopUp($event)
      }
    }
  }, [_vm._v("Topup via "), _c('i', {
    staticClass: "paypal icon"
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.status),
      expression: "status"
    }],
    staticClass: "ui pointing red basic label"
  }, [_vm._v(_vm._s(_vm.status))])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-71f34542", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-74f7bf02\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/users/index.vue":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h3', {
    staticClass: "ui dividing header"
  }, [_vm._v(_vm._s(_vm.message))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-74f7bf02", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-a1ff9106\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/users/show.vue":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c("div")
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a1ff9106", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-f03a0e10\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/home.vue":
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(this.loading) ? _c('div', {
    staticClass: "sixteen wide column"
  }, [_c('div', {
    staticClass: "ui segment",
    staticStyle: {
      "height": "200px"
    }
  }, [_c('div', {
    staticClass: "ui inverted dimmer",
    class: {
      active: _vm.loading
    }
  }, [_c('div', {
    staticClass: "ui text large loader"
  }, [_vm._v("Loading")])])])]) : _vm._e(), _vm._v(" "), (!this.loading) ? _c('div', {
    staticClass: "sixteen wide column"
  }, [_c('div', [_c('table', {
    staticClass: "ui celled fluid table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.userData), function(user, index) {
    return _c('tr', [_c('td', [_c('div', {
      staticClass: "ui ribbon label"
    }, [_vm._v(_vm._s(index + 1))])]), _vm._v(" "), _c('td', [_vm._v("\n\t\t\t      \t" + _vm._s(user.name) + "\n\t\t\t      ")]), _vm._v(" "), _c('td', [_c('a', {
      attrs: {
        "href": 'mailto:' + user.email
      }
    }, [_c('i', {
      staticClass: "mail icon"
    }), _vm._v(" " + _vm._s(user.email))])]), _vm._v(" "), _c('td', [_vm._v("\n\t\t\t      \t" + _vm._s(user.company_name) + "\n\t\t\t      ")]), _vm._v(" "), _c('td', [(user.card_brand) ? _c('span', [_vm._v(_vm._s(user.card_brand))]) : _c('span', [_vm._v("N/A")])]), _vm._v(" "), _c('td', {
      staticClass: "right aligned"
    }, [_vm._v("\n\t\t\t      \t$" + _vm._s(_vm._.sumBy(user.charges, 'amount') / 100) + "\n\t\t\t      ")]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "ui buttons"
    }, [_c('router-link', {
      staticClass: "ui teal basic button",
      attrs: {
        "tag": "button",
        "to": {
          name: 'payments',
          params: {
            id: user.id
          }
        },
        "exact": ""
      }
    }, [_vm._v("\n\t\t\t\t\t\t\t\t\tView Profile\n\t\t\t\t\t\t\t\t")]), _vm._v(" "), _c('router-link', {
      staticClass: "ui red basic button",
      attrs: {
        "tag": "button",
        "to": {
          name: 'checkout',
          params: {
            id: user.id
          }
        },
        "exact": ""
      }
    }, [_vm._v("\n\t\t\t\t          Top up\n\t\t\t\t        ")])], 1)])])
  }))])])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', {
    staticClass: "one wide"
  }, [_vm._v("Sr. No.")]), _vm._v(" "), _c('th', {
    staticClass: "three wide"
  }, [_vm._v("Name")]), _vm._v(" "), _c('th', {
    staticClass: "three wide"
  }, [_vm._v("Email")]), _vm._v(" "), _c('th', {
    staticClass: "three wide"
  }, [_vm._v("Company Name")]), _vm._v(" "), _c('th', {
    staticClass: "one wide"
  }, [_vm._v("Card")]), _vm._v(" "), _c('th', {
    staticClass: "right aligned one wide"
  }, [_vm._v("Balance")]), _vm._v(" "), _c('th', {
    staticClass: "three wide"
  }, [_vm._v("Actions")])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f03a0e10", module.exports)
  }
}

/***/ }),

/***/ "./node_modules/vue-router/dist/vue-router.esm.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.7.0
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (index$1(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var normalizedPath = normalizePath(path, parent);
  var pathToRegexpOptions = route.pathToRegexpOptions || {};

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = index(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (resolvedDef.__esModule && resolvedDef.default) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      var current = this$1.current;
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  window.location.replace((base + "#" + path));
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.7.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/vue-scrollTo/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BezierEasing = __webpack_require__("./node_modules/bezier-easing/src/index.js");

var _ = exports.utils = {
    $: function(selector) {
        return document.querySelector(selector);
    },
    on: function(element, events, handler) {
        if (!(events instanceof Array)) {
            events = [events];
        }
        for (var i = 0; i < events.length; i++) {
            element.addEventListener(events[i], handler);
        }
    },
    off: function(element, events, handler) {
        if (!(events instanceof Array)) {
            events = [events];
        }
        for (var i = 0; i < events.length; i++) {
            element.removeEventListener(events[i], handler);
        }
    }
};

exports.install = function(Vue) {
    function handleClick(e) {
        e.preventDefault();

        if (typeof this.value === "object") {
            exports.scrollTo(
                this.value.el || this.value.element,
                this.value.duration || 500,
                {
                    easing: (typeof this.value.easing === "string"
                        ? exports.easing[this.value.easing]
                        : this.value.easing) ||
                        exports.easing["ease"],
                    offset: this.value.offset || 0,
                    onDone: this.value.onDone,
                    onCancel: this.value.onCancel
                }
            );
        } else {
            exports.scrollTo(this.value, 500, {
                easing: exports.easing["ease"]
            });
        }
    }

    Vue.directive("scroll-to", {
        bind: function(el, binding) {
            _.on(el, "click", handleClick.bind(binding));
        },
        unbind: function(el) {
            _.off(el, "click", handleClick);
        }
    });
};

exports.scrollTo = function(element, duration, options) {
    if (typeof element === "string") {
        element = _.$(element);
    }

    var page = _.$("html, body");
    var events = [
        "scroll",
        "mousedown",
        "wheel",
        "DOMMouseScroll",
        "mousewheel",
        "keyup",
        "touchmove"
    ];
    var abort = false;

    var abortFn = function() {
        abort = true;
    };

    _.on(page, events, abortFn);

    var initialY = window.pageYOffset;
    var elementY = initialY + element.getBoundingClientRect().top;
    var targetY = document.body.scrollHeight - elementY < window.innerHeight
        ? document.body.scrollHeight - window.innerHeight
        : elementY;

    if (options.offset) {
        targetY += options.offset;
    }

    var diff = targetY - initialY;
    var easing = BezierEasing.apply(BezierEasing, options.easing);
    var start;

    var done = function() {
        _.off(page, events, abortFn);
        if (abort && options.onCancel) options.onCancel();
        if (!abort && options.onDone) options.onDone();
    };

    if (!diff) return;

    window.requestAnimationFrame(function step(timestamp) {
        if (abort) return done();
        if (!start) start = timestamp;

        var time = timestamp - start;
        var progress = Math.min(time / duration, 1);
        progress = easing(progress);

        window.scrollTo(0, initialY + diff * progress);

        if (time < duration) {
            window.requestAnimationFrame(step);
        } else {
            done();
        }
    });
};

exports.easing = {
    ease: [0.25, 0.1, 0.25, 1.0],
    linear: [0.00, 0.0, 1.00, 1.0],
    "ease-in": [0.42, 0.0, 1.00, 1.0],
    "ease-out": [0.00, 0.0, 0.58, 1.0],
    "ease-in-out": [0.42, 0.0, 0.58, 1.0]
};


/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-22af7c0a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/edit.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-22af7c0a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/edit.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("36601318", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-22af7c0a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-22af7c0a\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./edit.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-51b46bfc\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/create.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-51b46bfc\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/create.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("243fc8a6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-51b46bfc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./create.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-51b46bfc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./create.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-74f7bf02\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/index.vue":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-74f7bf02\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/index.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__("./node_modules/vue-style-loader/lib/addStylesClient.js")("74b69316", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-74f7bf02\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-74f7bf02\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/lib/addStylesClient.js":
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__("./node_modules/vue-style-loader/lib/listToStyles.js")

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "./node_modules/vue-style-loader/lib/listToStyles.js":
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),

/***/ "./node_modules/vue-sweetalert/build/vue-sweetalert.js":
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueSweetAlert=t():e.VueSweetAlert=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var a=o[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var o={};return t.m=e,t.c=o,t.p="/build/",t(0)}([function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(1),r=n(a);t.default=r.default},function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=o(6),r=n(a);o(5);var i={};i.install=function(e){e.prototype.$swal=r.default},t.default=i},function(e,t,o){t=e.exports=o(3)(),t.push([e.id,'body.swal2-shown{overflow-y:hidden}.swal2-container,body.swal2-iosfix{position:fixed;left:0;right:0}.swal2-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;top:0;bottom:0;padding:10px;background-color:transparent;z-index:1060}.swal2-container.swal2-fade{-webkit-transition:background-color .1s;transition:background-color .1s}.swal2-container.swal2-shown{background-color:rgba(0,0,0,.4)}.swal2-modal{background-color:#fff;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;border-radius:5px;box-sizing:border-box;text-align:center;margin:auto;overflow-x:hidden;overflow-y:auto;display:none;position:relative}.swal2-modal:focus{outline:none}.swal2-modal.swal2-loading{overflow-y:hidden}.swal2-modal .swal2-title{color:#595959;font-size:30px;text-align:center;font-weight:600;text-transform:none;position:relative;margin:0 0 .4em;padding:0;display:block}.swal2-modal .swal2-spacer{height:10px;color:transparent;border:0}.swal2-modal .swal2-styled{border:0;border-radius:3px;box-shadow:none;color:#fff;cursor:pointer;font-size:17px;font-weight:500;margin:0 5px;padding:10px 32px}.swal2-modal .swal2-styled:not(.swal2-loading)[disabled]{opacity:.4;cursor:no-drop}.swal2-modal .swal2-styled.swal2-loading{box-sizing:border-box;border:4px solid transparent;border-color:transparent;width:40px;height:40px;padding:0;margin:-2px 30px;vertical-align:top;background-color:transparent!important;color:transparent;cursor:default;border-radius:100%;-webkit-animation:rotate-loading 1.5s linear 0s infinite normal;animation:rotate-loading 1.5s linear 0s infinite normal;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-modal .swal2-styled+.swal2-styled{margin-top:15px}.swal2-modal :not(.swal2-styled).swal2-loading:after{display:inline-block;content:"";margin-left:5px;vertical-align:-1px;height:6px;width:6px;border:3px solid #999;border-right-color:transparent;border-radius:50%;-webkit-animation:rotate-loading 1.5s linear 0s infinite normal;animation:rotate-loading 1.5s linear 0s infinite normal}.swal2-modal .swal2-image{margin:20px auto;max-width:100%}.swal2-modal .swal2-close{font-size:36px;line-height:36px;font-family:serif;position:absolute;top:5px;right:13px;cursor:pointer;color:#ccc;-webkit-transition:color .1s ease;transition:color .1s ease}.swal2-modal .swal2-close:hover{color:#d55}.swal2-modal>.swal2-checkbox,.swal2-modal>.swal2-file,.swal2-modal>.swal2-input,.swal2-modal>.swal2-radio,.swal2-modal>.swal2-select,.swal2-modal>.swal2-textarea{display:none}.swal2-modal .swal2-content{font-size:18px;text-align:center;font-weight:300;position:relative;float:none;margin:0;padding:0;line-height:normal;color:#545454}.swal2-modal .swal2-checkbox,.swal2-modal .swal2-file,.swal2-modal .swal2-input,.swal2-modal .swal2-radio,.swal2-modal .swal2-select,.swal2-modal .swal2-textarea{margin:20px auto}.swal2-modal .swal2-file,.swal2-modal .swal2-input,.swal2-modal .swal2-textarea{width:100%;box-sizing:border-box;border-radius:3px;border:1px solid #d9d9d9;font-size:18px;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);-webkit-transition:border-color box-shadow .3s;transition:border-color box-shadow .3s}.swal2-modal .swal2-file.swal2-inputerror,.swal2-modal .swal2-input.swal2-inputerror,.swal2-modal .swal2-textarea.swal2-inputerror{border-color:#f06e57!important}.swal2-modal .swal2-file:focus,.swal2-modal .swal2-input:focus,.swal2-modal .swal2-textarea:focus{outline:none;box-shadow:0 0 3px #c4e6f5;border:1px solid #b4dbed}.swal2-modal .swal2-file:focus::-webkit-input-placeholder,.swal2-modal .swal2-input:focus::-webkit-input-placeholder,.swal2-modal .swal2-textarea:focus::-webkit-input-placeholder{-webkit-transition:opacity .3s ease .03s;transition:opacity .3s ease .03s;opacity:.8}.swal2-modal .swal2-file:focus::-moz-placeholder,.swal2-modal .swal2-input:focus::-moz-placeholder,.swal2-modal .swal2-textarea:focus::-moz-placeholder{-webkit-transition:opacity .3s ease .03s;transition:opacity .3s ease .03s;opacity:.8}.swal2-modal .swal2-file:focus:-ms-input-placeholder,.swal2-modal .swal2-input:focus:-ms-input-placeholder,.swal2-modal .swal2-textarea:focus:-ms-input-placeholder{-webkit-transition:opacity .3s ease .03s;transition:opacity .3s ease .03s;opacity:.8}.swal2-modal .swal2-file:focus::placeholder,.swal2-modal .swal2-input:focus::placeholder,.swal2-modal .swal2-textarea:focus::placeholder{-webkit-transition:opacity .3s ease .03s;transition:opacity .3s ease .03s;opacity:.8}.swal2-modal .swal2-file::-webkit-input-placeholder,.swal2-modal .swal2-input::-webkit-input-placeholder,.swal2-modal .swal2-textarea::-webkit-input-placeholder{color:#e6e6e6}.swal2-modal .swal2-file::-moz-placeholder,.swal2-modal .swal2-input::-moz-placeholder,.swal2-modal .swal2-textarea::-moz-placeholder{color:#e6e6e6}.swal2-modal .swal2-file:-ms-input-placeholder,.swal2-modal .swal2-input:-ms-input-placeholder,.swal2-modal .swal2-textarea:-ms-input-placeholder{color:#e6e6e6}.swal2-modal .swal2-file::placeholder,.swal2-modal .swal2-input::placeholder,.swal2-modal .swal2-textarea::placeholder{color:#e6e6e6}.swal2-modal .swal2-range input{float:left;width:80%}.swal2-modal .swal2-range output{float:right;width:20%;font-size:20px;font-weight:600;text-align:center}.swal2-modal .swal2-range input,.swal2-modal .swal2-range output{height:43px;line-height:43px;vertical-align:middle;margin:20px auto;padding:0}.swal2-modal .swal2-input{height:43px;padding:0 12px}.swal2-modal .swal2-input[type=number]{max-width:150px}.swal2-modal .swal2-file{font-size:20px}.swal2-modal .swal2-textarea{height:108px;padding:12px}.swal2-modal .swal2-select{color:#545454;font-size:inherit;padding:5px 10px;min-width:40%;max-width:100%}.swal2-modal .swal2-radio{border:0}.swal2-modal .swal2-radio label:not(:first-child){margin-left:20px}.swal2-modal .swal2-radio input,.swal2-modal .swal2-radio span{vertical-align:middle}.swal2-modal .swal2-radio input{margin:0 3px 0 0}.swal2-modal .swal2-checkbox{color:#545454}.swal2-modal .swal2-checkbox input,.swal2-modal .swal2-checkbox span{vertical-align:middle}.swal2-modal .swal2-validationerror{background-color:#f0f0f0;margin:0 -20px;overflow:hidden;padding:10px;color:gray;font-size:16px;font-weight:300;display:none}.swal2-modal .swal2-validationerror:before{content:"!";display:inline-block;width:24px;height:24px;border-radius:50%;background-color:#ea7d7d;color:#fff;line-height:24px;text-align:center;margin-right:10px}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media (-ms-high-contrast:active),(-ms-high-contrast:none){.swal2-range input{width:100%!important}.swal2-range output{display:none}}.swal2-icon{width:80px;height:80px;border:4px solid transparent;border-radius:50%;margin:20px auto 30px;padding:0;position:relative;box-sizing:content-box;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon.swal2-error{border-color:#f27474}.swal2-icon.swal2-error .x-mark{position:relative;display:block}.swal2-icon.swal2-error .line{position:absolute;height:5px;width:47px;background-color:#f27474;display:block;top:37px;border-radius:2px}.swal2-icon.swal2-error .line.left{-webkit-transform:rotate(45deg);transform:rotate(45deg);left:17px}.swal2-icon.swal2-error .line.right{-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:16px}.swal2-icon.swal2-warning{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#f8bb86;border-color:#facea8}.swal2-icon.swal2-info,.swal2-icon.swal2-warning{font-size:60px;line-height:80px;text-align:center}.swal2-icon.swal2-info{font-family:Open Sans,sans-serif;color:#3fc3ee;border-color:#9de0f6}.swal2-icon.swal2-question{font-family:Helvetica Neue,Helvetica,Arial,sans-serif;color:#87adbd;border-color:#c9dae1;font-size:60px;line-height:80px;text-align:center}.swal2-icon.swal2-success{border-color:#a5dc86}.swal2-icon.swal2-success:after,.swal2-icon.swal2-success:before{content:"";border-radius:50%;position:absolute;width:60px;height:120px;background:#fff;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success:before{border-radius:120px 0 0 120px;top:-7px;left:-33px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:60px 60px;transform-origin:60px 60px}.swal2-icon.swal2-success:after{border-radius:0 120px 120px 0;top:-11px;left:30px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transform-origin:0 60px;transform-origin:0 60px}.swal2-icon.swal2-success .placeholder{width:80px;height:80px;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;position:absolute;left:-4px;top:-4px;z-index:2}.swal2-icon.swal2-success .fix{width:7px;height:90px;background-color:#fff;position:absolute;left:28px;top:8px;z-index:1;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-icon.swal2-success .line{height:5px;background-color:#a5dc86;display:block;border-radius:2px;position:absolute;z-index:2}.swal2-icon.swal2-success .line.tip{width:25px;left:14px;top:46px;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.swal2-icon.swal2-success .line.long{width:47px;right:8px;top:38px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.swal2-progresssteps{font-weight:600;margin:0 0 20px;padding:0}.swal2-progresssteps li{display:inline-block;position:relative}.swal2-progresssteps .swal2-progresscircle{background:#3085d6;border-radius:2em;color:#fff;height:2em;line-height:2em;text-align:center;width:2em;z-index:20}.swal2-progresssteps .swal2-progresscircle:first-child{margin-left:0}.swal2-progresssteps .swal2-progresscircle:last-child{margin-right:0}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep{background:#3085d6}.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progresscircle,.swal2-progresssteps .swal2-progresscircle.swal2-activeprogressstep~.swal2-progressline{background:#add8e6}.swal2-progresssteps .swal2-progressline{background:#3085d6;height:.4em;margin:0 -1px;z-index:10}[class^=swal2]{-webkit-tap-highlight-color:transparent}@-webkit-keyframes showSweetAlert{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@keyframes showSweetAlert{0%{-webkit-transform:scale(.7);transform:scale(.7)}45%{-webkit-transform:scale(1.05);transform:scale(1.05)}80%{-webkit-transform:scale(.95);transform:scale(.95)}to{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes hideSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}@keyframes hideSweetAlert{0%{-webkit-transform:scale(1);transform:scale(1);opacity:1}to{-webkit-transform:scale(.5);transform:scale(.5);opacity:0}}.swal2-show{-webkit-animation:showSweetAlert .3s;animation:showSweetAlert .3s}.swal2-show.swal2-noanimation{-webkit-animation:none;animation:none}.swal2-hide{-webkit-animation:hideSweetAlert .15s forwards;animation:hideSweetAlert .15s forwards}.swal2-hide.swal2-noanimation{-webkit-animation:none;animation:none}@-webkit-keyframes animate-success-tip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@keyframes animate-success-tip{0%{width:0;left:1px;top:19px}54%{width:0;left:1px;top:19px}70%{width:50px;left:-8px;top:37px}84%{width:17px;left:21px;top:48px}to{width:25px;left:14px;top:45px}}@-webkit-keyframes animate-success-long{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@keyframes animate-success-long{0%{width:0;right:46px;top:54px}65%{width:0;right:46px;top:54px}84%{width:55px;right:0;top:35px}to{width:47px;right:8px;top:38px}}@-webkit-keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}@keyframes rotatePlaceholder{0%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}5%{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}12%{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}to{-webkit-transform:rotate(-405deg);transform:rotate(-405deg)}}.animate-success-tip{-webkit-animation:animate-success-tip .75s;animation:animate-success-tip .75s}.animate-success-long{-webkit-animation:animate-success-long .75s;animation:animate-success-long .75s}.swal2-success.animate:after{-webkit-animation:rotatePlaceholder 4.25s ease-in;animation:rotatePlaceholder 4.25s ease-in}@-webkit-keyframes animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}@keyframes animate-error-icon{0%{-webkit-transform:rotateX(100deg);transform:rotateX(100deg);opacity:0}to{-webkit-transform:rotateX(0deg);transform:rotateX(0deg);opacity:1}}.animate-error-icon{-webkit-animation:animate-error-icon .5s;animation:animate-error-icon .5s}@-webkit-keyframes animate-x-mark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}@keyframes animate-x-mark{0%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}50%{-webkit-transform:scale(.4);transform:scale(.4);margin-top:26px;opacity:0}80%{-webkit-transform:scale(1.15);transform:scale(1.15);margin-top:-6px}to{-webkit-transform:scale(1);transform:scale(1);margin-top:0;opacity:1}}.animate-x-mark{-webkit-animation:animate-x-mark .5s;animation:animate-x-mark .5s}@-webkit-keyframes pulse-warning{0%{border-color:#f8d486}to{border-color:#f8bb86}}@keyframes pulse-warning{0%{border-color:#f8d486}to{border-color:#f8bb86}}.pulse-warning{-webkit-animation:pulse-warning .75s infinite alternate;animation:pulse-warning .75s infinite alternate}@-webkit-keyframes rotate-loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes rotate-loading{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}',""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var o=this[t];o[2]?e.push("@media "+o[2]+"{"+o[1]+"}"):e.push(o[1])}return e.join("")},e.i=function(t,o){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},a=0;a<this.length;a++){var r=this[a][0];"number"==typeof r&&(n[r]=!0)}for(a=0;a<t.length;a++){var i=t[a];"number"==typeof i[0]&&n[i[0]]||(o&&!i[2]?i[2]=o:o&&(i[2]="("+i[2]+") and ("+o+")"),e.push(i))}},e}},function(e,t,o){function n(e,t){for(var o=0;o<e.length;o++){var n=e[o],a=f[n.id];if(a){a.refs++;for(var r=0;r<a.parts.length;r++)a.parts[r](n.parts[r]);for(;r<n.parts.length;r++)a.parts.push(c(n.parts[r],t))}else{for(var i=[],r=0;r<n.parts.length;r++)i.push(c(n.parts[r],t));f[n.id]={id:n.id,refs:1,parts:i}}}}function a(e){for(var t=[],o={},n=0;n<e.length;n++){var a=e[n],r=a[0],i=a[1],s=a[2],l=a[3],c={css:i,media:s,sourceMap:l};o[r]?o[r].parts.push(c):t.push(o[r]={id:r,parts:[c]})}return t}function r(e,t){var o=g(),n=x[x.length-1];if("top"===e.insertAt)n?n.nextSibling?o.insertBefore(t,n.nextSibling):o.appendChild(t):o.insertBefore(t,o.firstChild),x.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");o.appendChild(t)}}function i(e){e.parentNode.removeChild(e);var t=x.indexOf(e);t>=0&&x.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",r(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",r(e,t),t}function c(e,t){var o,n,a;if(t.singleton){var r=b++;o=h||(h=s(t)),n=d.bind(null,o,r,!1),a=d.bind(null,o,r,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(o=l(t),n=p.bind(null,o),a=function(){i(o),o.href&&URL.revokeObjectURL(o.href)}):(o=s(t),n=u.bind(null,o),a=function(){i(o)});return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else a()}}function d(e,t,o,n){var a=o?"":n.css;if(e.styleSheet)e.styleSheet.cssText=y(t,a);else{var r=document.createTextNode(a),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(r,i[t]):e.appendChild(r)}}function u(e,t){var o=t.css,n=t.media;if(n&&e.setAttribute("media",n),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}function p(e,t){var o=t.css,n=t.sourceMap;n&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */");var a=new Blob([o],{type:"text/css"}),r=e.href;e.href=URL.createObjectURL(a),r&&URL.revokeObjectURL(r)}var f={},m=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},w=m(function(){return/msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())}),g=m(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,b=0,x=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=w()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var o=a(e);return n(o,t),function(e){for(var r=[],i=0;i<o.length;i++){var s=o[i],l=f[s.id];l.refs--,r.push(l)}if(e){var c=a(e);n(c,t)}for(var i=0;i<r.length;i++){var l=r[i];if(0===l.refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete f[l.id]}}}};var y=function(){var e=[];return function(t,o){return e[t]=o,e.filter(Boolean).join("\n")}}()},function(e,t,o){var n=o(2);"string"==typeof n&&(n=[[e.id,n,""]]);o(4)(n,{});n.locals&&(e.exports=n.locals)},function(e,t,o){/*!
	 * sweetalert2 v6.4.2
	 * Released under the MIT License.
	 */
!function(t,o){e.exports=o()}(this,function(){"use strict";var e={title:"",titleText:"",text:"",html:"",type:null,customClass:"",target:"body",animation:!0,allowOutsideClick:!0,allowEscapeKey:!0,allowEnterKey:!0,showConfirmButton:!0,showCancelButton:!1,preConfirm:null,confirmButtonText:"OK",confirmButtonColor:"#3085d6",confirmButtonClass:null,cancelButtonText:"Cancel",cancelButtonColor:"#aaa",cancelButtonClass:null,buttonsStyling:!0,reverseButtons:!1,focusCancel:!1,showCloseButton:!1,showLoaderOnConfirm:!1,imageUrl:null,imageWidth:null,imageHeight:null,imageClass:null,timer:null,width:500,padding:20,background:"#fff",input:null,inputPlaceholder:"",inputValue:"",inputOptions:{},inputAutoTrim:!0,inputClass:null,inputAttributes:{},inputValidator:null,progressSteps:[],currentProgressStep:null,progressStepsDistance:"40px",onOpen:null,onClose:null},t="swal2-",o=function(e){var o={};for(var n in e)o[e[n]]=t+e[n];return o},n=o(["container","shown","iosfix","modal","overlay","fade","show","hide","noanimation","close","title","content","spacer","confirm","cancel","icon","image","input","file","range","select","radio","checkbox","textarea","inputerror","validationerror","progresssteps","activeprogressstep","progresscircle","progressline","loading","styled"]),a=o(["success","warning","info","question","error"]),r=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;for(var o="#",n=0;n<3;n++){var a=parseInt(e.substr(2*n,2),16);a=Math.round(Math.min(Math.max(0,a+a*t),255)).toString(16),o+=("00"+a).substr(a.length)}return o},i={previousWindowKeyDown:null,previousActiveElement:null,previousBodyPadding:null},s=function(e){if("undefined"==typeof document)return void console.error("SweetAlert2 requires document to initialize");var t=document.createElement("div");t.className=n.container,t.innerHTML=l;var o=document.querySelector(e.target);o||(console.warn("SweetAlert2: Can't find the target \""+e.target+'"'),o=document.body),o.appendChild(t);var a=d(),r=B(a,n.input),i=B(a,n.file),s=a.querySelector("."+n.range+" input"),c=a.querySelector("."+n.range+" output"),u=B(a,n.select),p=a.querySelector("."+n.checkbox+" input"),f=B(a,n.textarea);return r.oninput=function(){Z.resetValidationError()},r.onkeydown=function(t){setTimeout(function(){13===t.keyCode&&e.allowEnterKey&&(t.stopPropagation(),Z.clickConfirm())},0)},i.onchange=function(){Z.resetValidationError()},s.oninput=function(){Z.resetValidationError(),c.value=s.value},s.onchange=function(){Z.resetValidationError(),s.previousSibling.value=s.value},u.onchange=function(){Z.resetValidationError()},p.onchange=function(){Z.resetValidationError()},f.oninput=function(){Z.resetValidationError()},a},l=('\n <div  role="dialog" aria-labelledby="modalTitleId" aria-describedby="modalContentId" class="'+n.modal+'" tabIndex="-1" >\n   <ul class="'+n.progresssteps+'"></ul>\n   <div class="'+n.icon+" "+a.error+'">\n     <span class="x-mark"><span class="line left"></span><span class="line right"></span></span>\n   </div>\n   <div class="'+n.icon+" "+a.question+'">?</div>\n   <div class="'+n.icon+" "+a.warning+'">!</div>\n   <div class="'+n.icon+" "+a.info+'">i</div>\n   <div class="'+n.icon+" "+a.success+'">\n     <span class="line tip"></span> <span class="line long"></span>\n     <div class="placeholder"></div> <div class="fix"></div>\n   </div>\n   <img class="'+n.image+'">\n   <h2 class="'+n.title+'" id="modalTitleId"></h2>\n   <div id="modalContentId" class="'+n.content+'"></div>\n   <input class="'+n.input+'">\n   <input type="file" class="'+n.file+'">\n   <div class="'+n.range+'">\n     <output></output>\n     <input type="range">\n   </div>\n   <select class="'+n.select+'"></select>\n   <div class="'+n.radio+'"></div>\n   <label for="'+n.checkbox+'" class="'+n.checkbox+'">\n     <input type="checkbox">\n   </label>\n   <textarea class="'+n.textarea+'"></textarea>\n   <div class="'+n.validationerror+'"></div>\n   <hr class="'+n.spacer+'">\n   <button type="button" role="button" tabIndex="0" class="'+n.confirm+'">OK</button>\n   <button type="button" role="button" tabIndex="0" class="'+n.cancel+'">Cancel</button>\n   <span class="'+n.close+'">&times;</span>\n </div>\n').replace(/(^|\n)\s*/g,""),c=function(){return document.body.querySelector("."+n.container)},d=function(){return c()?c().querySelector("."+n.modal):null},u=function(){var e=d();return e.querySelectorAll("."+n.icon)},p=function(e){return c()?c().querySelector("."+e):null},f=function(){return p(n.title)},m=function(){return p(n.content)},w=function(){return p(n.image)},g=function(){return p(n.spacer)},h=function(){return p(n.progresssteps)},b=function(){return p(n.validationerror)},x=function(){return p(n.confirm)},y=function(){return p(n.cancel)},v=function(){return p(n.close)},k=function(e){var o=[x(),y()];return e&&o.reverse(),o.concat(Array.prototype.slice.call(d().querySelectorAll("button:not([class^="+t+"]), input:not([type=hidden]), textarea, select")))},C=function(e,t){return!!e.classList&&e.classList.contains(t)},S=function(e){if(e.focus(),"file"!==e.type){var t=e.value;e.value="",e.value=t}},A=function(e,t){if(e&&t){var o=t.split(/\s+/).filter(Boolean);o.forEach(function(t){e.classList.add(t)})}},E=function(e,t){if(e&&t){var o=t.split(/\s+/).filter(Boolean);o.forEach(function(t){e.classList.remove(t)})}},B=function(e,t){for(var o=0;o<e.childNodes.length;o++)if(C(e.childNodes[o],t))return e.childNodes[o]},P=function(e,t){t||(t="block"),e.style.opacity="",e.style.display=t},L=function(e){e.style.opacity="",e.style.display="none"},T=function(e){for(;e.firstChild;)e.removeChild(e.firstChild)},M=function(e){return e.offsetWidth||e.offsetHeight||e.getClientRects().length},O=function(e,t){e.style.removeProperty?e.style.removeProperty(t):e.style.removeAttribute(t)},z=function(e){if(!M(e))return!1;if("function"==typeof MouseEvent){var t=new MouseEvent("click",{view:window,bubbles:!1,cancelable:!0});e.dispatchEvent(t)}else if(document.createEvent){var o=document.createEvent("MouseEvents");o.initEvent("click",!1,!1),e.dispatchEvent(o)}else document.createEventObject?e.fireEvent("onclick"):"function"==typeof e.onclick&&e.onclick()},q=function(){var e=document.createElement("div"),t={WebkitAnimation:"webkitAnimationEnd",OAnimation:"oAnimationEnd oanimationend",msAnimation:"MSAnimationEnd",animation:"animationend"};for(var o in t)if(t.hasOwnProperty(o)&&void 0!==e.style[o])return t[o];return!1}(),H=function(){if(window.onkeydown=i.previousWindowKeyDown,i.previousActiveElement&&i.previousActiveElement.focus){var e=window.scrollX,t=window.scrollY;i.previousActiveElement.focus(),e&&t&&window.scrollTo(e,t)}},V=function(){var e="ontouchstart"in window||navigator.msMaxTouchPoints;if(e)return 0;var t=document.createElement("div");t.style.width="50px",t.style.height="50px",t.style.overflow="scroll",document.body.appendChild(t);var o=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),o},N=function(e,t){var o=void 0;return function(){var n=function(){o=null,e()};clearTimeout(o),o=setTimeout(n,t)}},j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},U=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},I=U({},e),R=[],K=void 0,D=function(t){var o=d()||s(t);for(var r in t)e.hasOwnProperty(r)||"extraParams"===r||console.warn('SweetAlert2: Unknown parameter "'+r+'"');o.style.width="number"==typeof t.width?t.width+"px":t.width,o.style.padding=t.padding+"px",o.style.background=t.background;var i=f(),l=m(),c=x(),p=y(),b=v();if(t.titleText?i.innerText=t.titleText:i.innerHTML=t.title.split("\n").join("<br>"),t.text||t.html){if("object"===j(t.html))if(l.innerHTML="",0 in t.html)for(var k=0;k in t.html;k++)l.appendChild(t.html[k].cloneNode(!0));else l.appendChild(t.html.cloneNode(!0));else t.html?l.innerHTML=t.html:t.text&&(l.textContent=t.text);P(l)}else L(l);t.showCloseButton?P(b):L(b),o.className=n.modal,t.customClass&&A(o,t.customClass);var C=h(),S=parseInt(null===t.currentProgressStep?Z.getQueueStep():t.currentProgressStep,10);t.progressSteps.length?(P(C),T(C),S>=t.progressSteps.length&&console.warn("SweetAlert2: Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"),t.progressSteps.forEach(function(e,o){var a=document.createElement("li");if(A(a,n.progresscircle),a.innerHTML=e,o===S&&A(a,n.activeprogressstep),C.appendChild(a),o!==t.progressSteps.length-1){var r=document.createElement("li");A(r,n.progressline),r.style.width=t.progressStepsDistance,C.appendChild(r)}})):L(C);for(var B=u(),M=0;M<B.length;M++)L(B[M]);if(t.type){var z=!1;for(var q in a)if(t.type===q){z=!0;break}if(!z)return console.error("SweetAlert2: Unknown alert type: "+t.type),!1;var H=o.querySelector("."+n.icon+"."+a[t.type]);switch(P(H),t.type){case"success":A(H,"animate"),A(H.querySelector(".tip"),"animate-success-tip"),A(H.querySelector(".long"),"animate-success-long");break;case"error":A(H,"animate-error-icon"),A(H.querySelector(".x-mark"),"animate-x-mark");break;case"warning":A(H,"pulse-warning")}}var V=w();t.imageUrl?(V.setAttribute("src",t.imageUrl),P(V),t.imageWidth?V.setAttribute("width",t.imageWidth):V.removeAttribute("width"),t.imageHeight?V.setAttribute("height",t.imageHeight):V.removeAttribute("height"),V.className=n.image,t.imageClass&&A(V,t.imageClass)):L(V),t.showCancelButton?p.style.display="inline-block":L(p),t.showConfirmButton?O(c,"display"):L(c);var N=g();t.showConfirmButton||t.showCancelButton?P(N):L(N),c.innerHTML=t.confirmButtonText,p.innerHTML=t.cancelButtonText,t.buttonsStyling&&(c.style.backgroundColor=t.confirmButtonColor,p.style.backgroundColor=t.cancelButtonColor),c.className=n.confirm,A(c,t.confirmButtonClass),p.className=n.cancel,A(p,t.cancelButtonClass),t.buttonsStyling?(A(c,n.styled),A(p,n.styled)):(E(c,n.styled),E(p,n.styled),c.style.backgroundColor=c.style.borderLeftColor=c.style.borderRightColor="",p.style.backgroundColor=p.style.borderLeftColor=p.style.borderRightColor=""),t.animation===!0?E(o,n.noanimation):A(o,n.noanimation)},W=function(e,t){var o=c(),a=d();e?(A(a,n.show),A(o,n.fade),E(a,n.hide)):E(a,n.fade),P(a),o.style.overflowY="hidden",q&&!C(a,n.noanimation)?a.addEventListener(q,function e(){a.removeEventListener(q,e),o.style.overflowY="auto"}):o.style.overflowY="auto",A(document.documentElement,n.shown),A(document.body,n.shown),A(o,n.shown),X(),Q(),i.previousActiveElement=document.activeElement,null!==t&&"function"==typeof t&&setTimeout(function(){t(a)})},X=function(){null===i.previousBodyPadding&&document.body.scrollHeight>window.innerHeight&&(i.previousBodyPadding=document.body.style.paddingRight,document.body.style.paddingRight=V()+"px")},_=function(){null!==i.previousBodyPadding&&(document.body.style.paddingRight=i.previousBodyPadding,i.previousBodyPadding=null)},Q=function(){var e=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;if(e&&!C(document.body,n.iosfix)){var t=document.body.scrollTop;document.body.style.top=t*-1+"px",A(document.body,n.iosfix)}},Y=function(){if(C(document.body,n.iosfix)){var e=parseInt(document.body.style.top,10);E(document.body,n.iosfix),document.body.style.top="",document.body.scrollTop=e*-1}},Z=function e(){for(var t=arguments.length,o=Array(t),a=0;a<t;a++)o[a]=arguments[a];if(void 0===o[0])return console.error("SweetAlert2 expects at least 1 attribute!"),!1;var s=U({},I);switch(j(o[0])){case"string":s.title=o[0],s.html=o[1],s.type=o[2];break;case"object":U(s,o[0]),s.extraParams=o[0].extraParams,"email"===s.input&&null===s.inputValidator&&(s.inputValidator=function(e){return new Promise(function(t,o){var n=/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;n.test(e)?t():o("Invalid email address")})});break;default:return console.error('SweetAlert2: Unexpected type of argument! Expected "string" or "object", got '+j(o[0])),!1}D(s);var l=c(),u=d();return new Promise(function(t,o){s.timer&&(u.timeout=setTimeout(function(){e.closeModal(s.onClose),o("timer")},s.timer));var a=function(e){if(e=e||s.input,!e)return null;switch(e){case"select":case"textarea":case"file":return B(u,n[e]);case"checkbox":return u.querySelector("."+n.checkbox+" input");case"radio":return u.querySelector("."+n.radio+" input:checked")||u.querySelector("."+n.radio+" input:first-child");case"range":return u.querySelector("."+n.range+" input");default:return B(u,n.input)}},p=function(){var e=a();if(!e)return null;switch(s.input){case"checkbox":return e.checked?1:0;case"radio":return e.checked?e.value:null;case"file":return e.files.length?e.files[0]:null;default:return s.inputAutoTrim?e.value.trim():e.value}};s.input&&setTimeout(function(){var e=a();e&&S(e)},0);for(var C=function(o){s.showLoaderOnConfirm&&e.showLoading(),s.preConfirm?s.preConfirm(o,s.extraParams).then(function(n){e.closeModal(s.onClose),t(n||o)},function(t){e.hideLoading(),t&&e.showValidationError(t)}):(e.closeModal(s.onClose),t(o))},T=function(t){var n=t||window.event,a=n.target||n.srcElement,i=x(),l=y(),c=i===a||i.contains(a),d=l===a||l.contains(a);switch(n.type){case"mouseover":case"mouseup":s.buttonsStyling&&(c?i.style.backgroundColor=r(s.confirmButtonColor,-.1):d&&(l.style.backgroundColor=r(s.cancelButtonColor,-.1)));break;case"mouseout":s.buttonsStyling&&(c?i.style.backgroundColor=s.confirmButtonColor:d&&(l.style.backgroundColor=s.cancelButtonColor));break;case"mousedown":s.buttonsStyling&&(c?i.style.backgroundColor=r(s.confirmButtonColor,-.2):d&&(l.style.backgroundColor=r(s.cancelButtonColor,-.2)));break;case"click":c&&e.isVisible()?(e.disableButtons(),s.input?!function(){var t=p();s.inputValidator?(e.disableInput(),s.inputValidator(t,s.extraParams).then(function(){e.enableButtons(),e.enableInput(),C(t)},function(t){e.enableButtons(),e.enableInput(),t&&e.showValidationError(t)})):C(t)}():C(!0)):d&&e.isVisible()&&(e.disableButtons(),e.closeModal(s.onClose),o("cancel"))}},O=u.querySelectorAll("button"),q=0;q<O.length;q++)O[q].onclick=T,O[q].onmouseover=T,O[q].onmouseout=T,O[q].onmousedown=T;v().onclick=function(){e.closeModal(s.onClose),o("close")},l.onclick=function(t){t.target===l&&s.allowOutsideClick&&(e.closeModal(s.onClose),o("overlay"))};var H=x(),V=y();s.reverseButtons?H.parentNode.insertBefore(V,H):H.parentNode.insertBefore(H,V);var U=function(e,t){for(var o=k(s.focusCancel),n=0;n<o.length;n++){e+=t,e===o.length?e=0:e===-1&&(e=o.length-1);var a=o[e];if(M(a))return a.focus()}},I=function(t){var n=t||window.event,a=n.keyCode||n.which;if([9,13,32,27].indexOf(a)!==-1){for(var r=n.target||n.srcElement,i=k(s.focusCancel),l=-1,c=0;c<i.length;c++)if(r===i[c]){l=c;break}9===a?(n.shiftKey?U(l,-1):U(l,1),n.stopPropagation(),n.preventDefault()):13===a||32===a?l===-1&&s.allowEnterKey&&(s.focusCancel?z(V,n):z(H,n)):27===a&&s.allowEscapeKey===!0&&(e.closeModal(s.onClose),o("esc"))}};i.previousWindowKeyDown=window.onkeydown,window.onkeydown=I,s.buttonsStyling&&(H.style.borderLeftColor=s.confirmButtonColor,H.style.borderRightColor=s.confirmButtonColor),e.showLoading=e.enableLoading=function(){P(g()),P(H,"inline-block"),A(H,n.loading),A(u,n.loading),H.disabled=!0,V.disabled=!0},e.hideLoading=e.disableLoading=function(){s.showConfirmButton||(L(H),s.showCancelButton||L(g())),E(H,n.loading),E(u,n.loading),H.disabled=!1,V.disabled=!1},e.getTitle=function(){return f()},e.getContent=function(){return m()},e.getInput=function(){return a()},e.getImage=function(){return w()},e.getConfirmButton=function(){return x()},e.getCancelButton=function(){return y()},e.enableButtons=function(){H.disabled=!1,V.disabled=!1},e.disableButtons=function(){H.disabled=!0,V.disabled=!0},e.enableConfirmButton=function(){H.disabled=!1},e.disableConfirmButton=function(){H.disabled=!0},e.enableInput=function(){var e=a();if(!e)return!1;if("radio"===e.type)for(var t=e.parentNode.parentNode,o=t.querySelectorAll("input"),n=0;n<o.length;n++)o[n].disabled=!1;else e.disabled=!1},e.disableInput=function(){var e=a();if(!e)return!1;if(e&&"radio"===e.type)for(var t=e.parentNode.parentNode,o=t.querySelectorAll("input"),n=0;n<o.length;n++)o[n].disabled=!0;else e.disabled=!0},e.recalculateHeight=N(function(){var e=d();if(e){var t=e.style.display;e.style.minHeight="",P(e),e.style.minHeight=e.scrollHeight+1+"px",e.style.display=t}},50),e.showValidationError=function(e){var t=b();t.innerHTML=e,P(t);var o=a();o&&(S(o),A(o,n.inputerror))},e.resetValidationError=function(){var t=b();L(t),e.recalculateHeight();var o=a();o&&E(o,n.inputerror)},e.getProgressSteps=function(){return s.progressSteps},e.setProgressSteps=function(e){s.progressSteps=e,D(s)},e.showProgressSteps=function(){P(h())},e.hideProgressSteps=function(){L(h())},e.enableButtons(),e.hideLoading(),e.resetValidationError();for(var R=["input","file","range","select","radio","checkbox","textarea"],X=void 0,_=0;_<R.length;_++){var Q=n[R[_]],Y=B(u,Q);if(X=a(R[_])){for(var Z in X.attributes)if(X.attributes.hasOwnProperty(Z)){var J=X.attributes[Z].name;"type"!==J&&"value"!==J&&X.removeAttribute(J)}for(var $ in s.inputAttributes)X.setAttribute($,s.inputAttributes[$])}Y.className=Q,s.inputClass&&A(Y,s.inputClass),L(Y)}var F=void 0;!function(){switch(s.input){case"text":case"email":case"password":case"number":case"tel":X=B(u,n.input),X.value=s.inputValue,X.placeholder=s.inputPlaceholder,X.type=s.input,P(X);break;case"file":X=B(u,n.file),X.placeholder=s.inputPlaceholder,X.type=s.input,P(X);break;case"range":var e=B(u,n.range),t=e.querySelector("input"),o=e.querySelector("output");t.value=s.inputValue,t.type=s.input,o.value=s.inputValue,P(e);break;case"select":var r=B(u,n.select);if(r.innerHTML="",s.inputPlaceholder){var i=document.createElement("option");i.innerHTML=s.inputPlaceholder,i.value="",i.disabled=!0,i.selected=!0,r.appendChild(i)}F=function(e){for(var t in e){var o=document.createElement("option");o.value=t,o.innerHTML=e[t],s.inputValue===t&&(o.selected=!0),r.appendChild(o)}P(r),r.focus()};break;case"radio":var l=B(u,n.radio);l.innerHTML="",F=function(e){for(var t in e){var o=document.createElement("input"),a=document.createElement("label"),r=document.createElement("span");o.type="radio",o.name=n.radio,o.value=t,s.inputValue===t&&(o.checked=!0),r.innerHTML=e[t],a.appendChild(o),a.appendChild(r),a.for=o.id,l.appendChild(a)}P(l);var i=l.querySelectorAll("input");i.length&&i[0].focus()};break;case"checkbox":var c=B(u,n.checkbox),d=a("checkbox");d.type="checkbox",d.value=1,d.id=n.checkbox,d.checked=Boolean(s.inputValue);var p=c.getElementsByTagName("span");p.length&&c.removeChild(p[0]),p=document.createElement("span"),p.innerHTML=s.inputPlaceholder,c.appendChild(p),P(c);break;case"textarea":var f=B(u,n.textarea);f.value=s.inputValue,f.placeholder=s.inputPlaceholder,P(f);break;case null:break;default:console.error('SweetAlert2: Unexpected type of input! Expected "text", "email", "password", "select", "checkbox", "textarea" or "file", got "'+s.input+'"')}}(),"select"!==s.input&&"radio"!==s.input||(s.inputOptions instanceof Promise?(e.showLoading(),s.inputOptions.then(function(t){e.hideLoading(),F(t)})):"object"===j(s.inputOptions)?F(s.inputOptions):console.error("SweetAlert2: Unexpected type of inputOptions! Expected object or Promise, got "+j(s.inputOptions))),W(s.animation,s.onOpen),s.allowEnterKey?U(-1,1):document.activeElement&&document.activeElement.blur(),c().scrollTop=0,"undefined"==typeof MutationObserver||K||(K=new MutationObserver(e.recalculateHeight),K.observe(u,{childList:!0,characterData:!0,subtree:!0}))})};return Z.isVisible=function(){return!!d()},Z.queue=function(e){R=e;var t=function(){R=[],document.body.removeAttribute("data-swal2-queue-step")},o=[];return new Promise(function(e,n){!function a(r,i){r<R.length?(document.body.setAttribute("data-swal2-queue-step",r),Z(R[r]).then(function(e){o.push(e),a(r+1,i)},function(e){t(),n(e)})):(t(),e(o))}(0)})},Z.getQueueStep=function(){return document.body.getAttribute("data-swal2-queue-step")},Z.insertQueueStep=function(e,t){return t&&t<R.length?R.splice(t,0,e):R.push(e)},Z.deleteQueueStep=function(e){"undefined"!=typeof R[e]&&R.splice(e,1)},Z.close=Z.closeModal=function(e){var t=c(),o=d();if(o){E(o,n.show),A(o,n.hide),clearTimeout(o.timeout),H();var a=function(){t.parentNode.removeChild(t),E(document.documentElement,n.shown),E(document.body,n.shown),_(),Y()};q&&!C(o,n.noanimation)?o.addEventListener(q,function e(){o.removeEventListener(q,e),C(o,n.hide)&&a()}):a(),null!==e&&"function"==typeof e&&setTimeout(function(){e(o)})}},Z.clickConfirm=function(){return x().click()},Z.clickCancel=function(){return y().click()},Z.setDefaults=function(t){if(!t||"object"!==("undefined"==typeof t?"undefined":j(t)))return console.error("SweetAlert2: the argument for setDefaults() is required and has to be a object");for(var o in t)e.hasOwnProperty(o)||"extraParams"===o||(console.warn('SweetAlert2: Unknown parameter "'+o+'"'),delete t[o]);U(I,t)},Z.resetDefaults=function(){I=U({},e)},Z.noop=function(){},Z.version="6.4.2",Z.default=Z,Z}),window.Sweetalert2&&(window.sweetAlert=window.swal=window.Sweetalert2)}])});
//# sourceMappingURL=vue-sweetalert.js.map

/***/ }),

/***/ "./node_modules/vue-toasted/dist/vue-toasted.min.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery, jQuery, $) {!function(e,t){if(true)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var r in n)("object"==typeof exports?exports:e)[r]=n[r]}}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/dist/",t(t.s=12)}([function(e,t,n){var r,i;/*! VelocityJS.org (1.4.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */
/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */
!function(e){"use strict";function t(e){var t=e.length,r=n.type(e);return"function"!==r&&!n.isWindow(e)&&(!(1!==e.nodeType||!t)||("array"===r||0===t||"number"==typeof t&&t>0&&t-1 in e))}if(!e.jQuery){var n=function(e,t){return new n.fn.init(e,t)};n.isWindow=function(e){return e&&e===e.window},n.type=function(e){return e?"object"==typeof e||"function"==typeof e?i[a.call(e)]||"object":typeof e:e+""},n.isArray=Array.isArray||function(e){return"array"===n.type(e)},n.isPlainObject=function(e){var t;if(!e||"object"!==n.type(e)||e.nodeType||n.isWindow(e))return!1;try{if(e.constructor&&!o.call(e,"constructor")&&!o.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(e){return!1}for(t in e);return void 0===t||o.call(e,t)},n.each=function(e,n,r){var i,o=0,a=e.length,s=t(e);if(r){if(s)for(;o<a&&(i=n.apply(e[o],r),i!==!1);o++);else for(o in e)if(e.hasOwnProperty(o)&&(i=n.apply(e[o],r),i===!1))break}else if(s)for(;o<a&&(i=n.call(e[o],o,e[o]),i!==!1);o++);else for(o in e)if(e.hasOwnProperty(o)&&(i=n.call(e[o],o,e[o]),i===!1))break;return e},n.data=function(e,t,i){if(void 0===i){var o=e[n.expando],a=o&&r[o];if(void 0===t)return a;if(a&&t in a)return a[t]}else if(void 0!==t){var s=e[n.expando]||(e[n.expando]=++n.uuid);return r[s]=r[s]||{},r[s][t]=i,i}},n.removeData=function(e,t){var i=e[n.expando],o=i&&r[i];o&&(t?n.each(t,function(e,t){delete o[t]}):delete r[i])},n.extend=function(){var e,t,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[l]||{},l++),"object"!=typeof s&&"function"!==n.type(s)&&(s={}),l===u&&(s=this,l--);l<u;l++)if(o=arguments[l])for(i in o)o.hasOwnProperty(i)&&(e=s[i],r=o[i],s!==r&&(c&&r&&(n.isPlainObject(r)||(t=n.isArray(r)))?(t?(t=!1,a=e&&n.isArray(e)?e:[]):a=e&&n.isPlainObject(e)?e:{},s[i]=n.extend(c,a,r)):void 0!==r&&(s[i]=r)));return s},n.queue=function(e,r,i){function o(e,n){var r=n||[];return e&&(t(Object(e))?function(e,t){for(var n=+t.length,r=0,i=e.length;r<n;)e[i++]=t[r++];if(n!==n)for(;void 0!==t[r];)e[i++]=t[r++];return e.length=i,e}(r,"string"==typeof e?[e]:e):[].push.call(r,e)),r}if(e){r=(r||"fx")+"queue";var a=n.data(e,r);return i?(!a||n.isArray(i)?a=n.data(e,r,o(i)):a.push(i),a):a||[]}},n.dequeue=function(e,t){n.each(e.nodeType?[e]:e,function(e,r){t=t||"fx";var i=n.queue(r,t),o=i.shift();"inprogress"===o&&(o=i.shift()),o&&("fx"===t&&i.unshift("inprogress"),o.call(r,function(){n.dequeue(r,t)}))})},n.fn=n.prototype={init:function(e){if(e.nodeType)return this[0]=e,this;throw new Error("Not a DOM node.")},offset:function(){var t=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:t.top+(e.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:t.left+(e.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)}},position:function(){function e(e){for(var t=e.offsetParent;t&&"html"!==t.nodeName.toLowerCase()&&t.style&&"static"===t.style.position;)t=t.offsetParent;return t||document}var t=this[0],r=e(t),i=this.offset(),o=/^(?:body|html)$/i.test(r.nodeName)?{top:0,left:0}:n(r).offset();return i.top-=parseFloat(t.style.marginTop)||0,i.left-=parseFloat(t.style.marginLeft)||0,r.style&&(o.top+=parseFloat(r.style.borderTopWidth)||0,o.left+=parseFloat(r.style.borderLeftWidth)||0),{top:i.top-o.top,left:i.left-o.left}}};var r={};n.expando="velocity"+(new Date).getTime(),n.uuid=0;for(var i={},o=i.hasOwnProperty,a=i.toString,s="Boolean Number String Function Array Date RegExp Object Error".split(" "),l=0;l<s.length;l++)i["[object "+s[l]+"]"]=s[l].toLowerCase();n.fn.init.prototype=n.fn,e.Velocity={Utilities:n}}}(window),function(o){"use strict";"object"==typeof e&&"object"==typeof e.exports?e.exports=o():(r=o,i="function"==typeof r?r.call(t,n,t,e):r,void 0!==i&&(e.exports=i))}(function(){"use strict";return function(e,t,n,r){function i(e){for(var t=-1,n=e?e.length:0,r=[];++t<n;){var i=e[t];i&&r.push(i)}return r}function o(e){return b.isWrapped(e)?e=y.call(e):b.isNode(e)&&(e=[e]),e}function a(e){var t=h.data(e,"velocity");return null===t?r:t}function s(e,t){var n=a(e);n&&n.delayTimer&&!n.delayPaused&&(n.delayRemaining=n.delay-t+n.delayBegin,n.delayPaused=!0,clearTimeout(n.delayTimer.setTimeout))}function l(e,t){var n=a(e);n&&n.delayTimer&&n.delayPaused&&(n.delayPaused=!1,n.delayTimer.setTimeout=setTimeout(n.delayTimer.next,n.delayRemaining))}function u(e){return function(t){return Math.round(t*e)*(1/e)}}function c(e,n,r,i){function o(e,t){return 1-3*t+3*e}function a(e,t){return 3*t-6*e}function s(e){return 3*e}function l(e,t,n){return((o(t,n)*e+a(t,n))*e+s(t))*e}function u(e,t,n){return 3*o(t,n)*e*e+2*a(t,n)*e+s(t)}function c(t,n){for(var i=0;i<g;++i){var o=u(n,e,r);if(0===o)return n;n-=(l(n,e,r)-t)/o}return n}function p(){for(var t=0;t<b;++t)S[t]=l(t*x,e,r)}function f(t,n,i){var o,a,s=0;do a=n+(i-n)/2,o=l(a,e,r)-t,o>0?i=a:n=a;while(Math.abs(o)>v&&++s<y);return a}function d(t){for(var n=0,i=1,o=b-1;i!==o&&S[i]<=t;++i)n+=x;--i;var a=(t-S[i])/(S[i+1]-S[i]),s=n+a*x,l=u(s,e,r);return l>=m?c(t,s):0===l?s:f(t,n,n+x)}function h(){P=!0,e===n&&r===i||p()}var g=4,m=.001,v=1e-7,y=10,b=11,x=1/(b-1),T="Float32Array"in t;if(4!==arguments.length)return!1;for(var w=0;w<4;++w)if("number"!=typeof arguments[w]||isNaN(arguments[w])||!isFinite(arguments[w]))return!1;e=Math.min(e,1),r=Math.min(r,1),e=Math.max(e,0),r=Math.max(r,0);var S=T?new Float32Array(b):new Array(b),P=!1,C=function(t){return P||h(),e===n&&r===i?t:0===t?0:1===t?1:l(d(t),n,i)};C.getControlPoints=function(){return[{x:e,y:n},{x:r,y:i}]};var E="generateBezier("+[e,n,r,i]+")";return C.toString=function(){return E},C}function p(e,t){var n=e;return b.isString(e)?S.Easings[e]||(n=!1):n=b.isArray(e)&&1===e.length?u.apply(null,e):b.isArray(e)&&2===e.length?P.apply(null,e.concat([t])):!(!b.isArray(e)||4!==e.length)&&c.apply(null,e),n===!1&&(n=S.Easings[S.defaults.easing]?S.defaults.easing:w),n}function f(e){if(e){var t=S.timestamp&&e!==!0?e:v.now(),n=S.State.calls.length;n>1e4&&(S.State.calls=i(S.State.calls),n=S.State.calls.length);for(var o=0;o<n;o++)if(S.State.calls[o]){var s=S.State.calls[o],l=s[0],u=s[2],c=s[3],p=!!c,m=null,y=s[5],x=s[6];if(c||(c=S.State.calls[o][3]=t-16),y){if(y.resume!==!0)continue;c=s[3]=Math.round(t-x-16),s[5]=null}x=s[6]=t-c;for(var T=Math.min(x/u.duration,1),w=0,P=l.length;w<P;w++){var E=l[w],V=E.element;if(a(V)){var A=!1;if(u.display!==r&&null!==u.display&&"none"!==u.display){if("flex"===u.display){var N=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];h.each(N,function(e,t){C.setPropertyValue(V,"display",t)})}C.setPropertyValue(V,"display",u.display)}u.visibility!==r&&"hidden"!==u.visibility&&C.setPropertyValue(V,"visibility",u.visibility);for(var O in E)if(E.hasOwnProperty(O)&&"element"!==O){var F,j=E[O],L=b.isString(j.easing)?S.Easings[j.easing]:j.easing;if(b.isString(j.pattern)){var R=1===T?function(e,t,n){var r=j.endValue[t];return n?Math.round(r):r}:function(e,t,n){var r=j.startValue[t],i=j.endValue[t]-r,o=r+i*L(T,u,i);return n?Math.round(o):o};F=j.pattern.replace(/{(\d+)(!)?}/g,R)}else if(1===T)F=j.endValue;else{var z=j.endValue-j.startValue;F=j.startValue+z*L(T,u,z)}if(!p&&F===j.currentValue)continue;if(j.currentValue=F,"tween"===O)m=F;else{var H;if(C.Hooks.registered[O]){H=C.Hooks.getRoot(O);var I=a(V).rootPropertyValueCache[H];I&&(j.rootPropertyValue=I)}var M=C.setPropertyValue(V,O,j.currentValue+(g<9&&0===parseFloat(F)?"":j.unitType),j.rootPropertyValue,j.scrollData);C.Hooks.registered[O]&&(C.Normalizations.registered[H]?a(V).rootPropertyValueCache[H]=C.Normalizations.registered[H]("extract",null,M[1]):a(V).rootPropertyValueCache[H]=M[1]),"transform"===M[0]&&(A=!0)}}u.mobileHA&&a(V).transformCache.translate3d===r&&(a(V).transformCache.translate3d="(0px, 0px, 0px)",A=!0),A&&C.flushTransformCache(V)}}u.display!==r&&"none"!==u.display&&(S.State.calls[o][2].display=!1),u.visibility!==r&&"hidden"!==u.visibility&&(S.State.calls[o][2].visibility=!1),u.progress&&u.progress.call(s[1],s[1],T,Math.max(0,c+u.duration-t),c,m),1===T&&d(o)}}S.State.isTicking&&k(f)}function d(e,t){if(!S.State.calls[e])return!1;for(var n=S.State.calls[e][0],i=S.State.calls[e][1],o=S.State.calls[e][2],s=S.State.calls[e][4],l=!1,u=0,c=n.length;u<c;u++){var p=n[u].element;t||o.loop||("none"===o.display&&C.setPropertyValue(p,"display",o.display),"hidden"===o.visibility&&C.setPropertyValue(p,"visibility",o.visibility));var f=a(p);if(o.loop!==!0&&(h.queue(p)[1]===r||!/\.velocityQueueEntryFlag/i.test(h.queue(p)[1]))&&f){f.isAnimating=!1,f.rootPropertyValueCache={};var d=!1;h.each(C.Lists.transforms3D,function(e,t){var n=/^scale/.test(t)?1:0,i=f.transformCache[t];f.transformCache[t]!==r&&new RegExp("^\\("+n+"[^.]").test(i)&&(d=!0,delete f.transformCache[t])}),o.mobileHA&&(d=!0,delete f.transformCache.translate3d),d&&C.flushTransformCache(p),C.Values.removeClass(p,"velocity-animating")}if(!t&&o.complete&&!o.loop&&u===c-1)try{o.complete.call(i,i)}catch(e){setTimeout(function(){throw e},1)}s&&o.loop!==!0&&s(i),f&&o.loop===!0&&!t&&(h.each(f.tweensContainer,function(e,t){if(/^rotate/.test(e)&&(parseFloat(t.startValue)-parseFloat(t.endValue))%360===0){var n=t.startValue;t.startValue=t.endValue,t.endValue=n}/^backgroundPosition/.test(e)&&100===parseFloat(t.endValue)&&"%"===t.unitType&&(t.endValue=0,t.startValue=100)}),S(p,"reverse",{loop:!0,delay:o.delay})),o.queue!==!1&&h.dequeue(p,o.queue)}S.State.calls[e]=!1;for(var g=0,m=S.State.calls.length;g<m;g++)if(S.State.calls[g]!==!1){l=!0;break}l===!1&&(S.State.isTicking=!1,delete S.State.calls,S.State.calls=[])}var h,g=function(){if(n.documentMode)return n.documentMode;for(var e=7;e>4;e--){var t=n.createElement("div");if(t.innerHTML="<!--[if IE "+e+"]><span></span><![endif]-->",t.getElementsByTagName("span").length)return t=null,e}return r}(),m=function(){var e=0;return t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(t){var n,r=(new Date).getTime();return n=Math.max(0,16-(r-e)),e=r+n,setTimeout(function(){t(r+n)},n)}}(),v=function(){var e=t.performance||{};if(!Object.prototype.hasOwnProperty.call(e,"now")){var n=e.timing&&e.timing.domComplete?e.timing.domComplete:(new Date).getTime();e.now=function(){return(new Date).getTime()-n}}return e}(),y=function(){var e=Array.prototype.slice;try{e.call(n.documentElement)}catch(t){e=function(){for(var e=this.length,t=[];--e>0;)t[e]=this[e];return t}}return e}(),b={isNumber:function(e){return"number"==typeof e},isString:function(e){return"string"==typeof e},isArray:Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)},isFunction:function(e){return"[object Function]"===Object.prototype.toString.call(e)},isNode:function(e){return e&&e.nodeType},isWrapped:function(e){return e&&b.isNumber(e.length)&&!b.isString(e)&&!b.isFunction(e)&&!b.isNode(e)&&(0===e.length||b.isNode(e[0]))},isSVG:function(e){return t.SVGElement&&e instanceof t.SVGElement},isEmptyObject:function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}},x=!1;if(e.fn&&e.fn.jquery?(h=e,x=!0):h=t.Velocity.Utilities,g<=8&&!x)throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");if(g<=7)return void(jQuery.fn.velocity=jQuery.fn.animate);var T=400,w="swing",S={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:t.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:n.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:!1,calls:[],delayedElements:{count:0}},CSS:{},Utilities:h,Redirects:{},Easings:{},Promise:t.Promise,defaults:{queue:"",duration:T,easing:w,begin:r,complete:r,progress:r,display:r,visibility:r,loop:!1,delay:!1,mobileHA:!0,_cacheValues:!0,promiseRejectEmpty:!0},init:function(e){h.data(e,"velocity",{isSVG:b.isSVG(e),isAnimating:!1,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}})},hook:null,mock:!1,version:{major:1,minor:4,patch:3},debug:!1,timestamp:!0,pauseAll:function(e){var t=(new Date).getTime();h.each(S.State.calls,function(t,n){if(n){if(e!==r&&(n[2].queue!==e||n[2].queue===!1))return!0;n[5]={resume:!1}}}),h.each(S.State.delayedElements,function(e,n){n&&s(n,t)})},resumeAll:function(e){var t=(new Date).getTime();h.each(S.State.calls,function(t,n){if(n){if(e!==r&&(n[2].queue!==e||n[2].queue===!1))return!0;n[5]&&(n[5].resume=!0)}}),h.each(S.State.delayedElements,function(e,n){n&&l(n,t)})}};t.pageYOffset!==r?(S.State.scrollAnchor=t,S.State.scrollPropertyLeft="pageXOffset",S.State.scrollPropertyTop="pageYOffset"):(S.State.scrollAnchor=n.documentElement||n.body.parentNode||n.body,S.State.scrollPropertyLeft="scrollLeft",S.State.scrollPropertyTop="scrollTop");var P=function(){function e(e){return-e.tension*e.x-e.friction*e.v}function t(t,n,r){var i={x:t.x+r.dx*n,v:t.v+r.dv*n,tension:t.tension,friction:t.friction};return{dx:i.v,dv:e(i)}}function n(n,r){var i={dx:n.v,dv:e(n)},o=t(n,.5*r,i),a=t(n,.5*r,o),s=t(n,r,a),l=1/6*(i.dx+2*(o.dx+a.dx)+s.dx),u=1/6*(i.dv+2*(o.dv+a.dv)+s.dv);return n.x=n.x+l*r,n.v=n.v+u*r,n}return function e(t,r,i){var o,a,s,l={x:-1,v:0,tension:null,friction:null},u=[0],c=0,p=1e-4,f=.016;for(t=parseFloat(t)||500,r=parseFloat(r)||20,i=i||null,l.tension=t,l.friction=r,o=null!==i,o?(c=e(t,r),a=c/i*f):a=f;;)if(s=n(s||l,a),u.push(1+s.x),c+=16,!(Math.abs(s.x)>p&&Math.abs(s.v)>p))break;return o?function(e){return u[e*(u.length-1)|0]}:c}}();S.Easings={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2},spring:function(e){return 1-Math.cos(4.5*e*Math.PI)*Math.exp(6*-e)}},h.each([["ease",[.25,.1,.25,1]],["ease-in",[.42,0,1,1]],["ease-out",[0,0,.58,1]],["ease-in-out",[.42,0,.58,1]],["easeInSine",[.47,0,.745,.715]],["easeOutSine",[.39,.575,.565,1]],["easeInOutSine",[.445,.05,.55,.95]],["easeInQuad",[.55,.085,.68,.53]],["easeOutQuad",[.25,.46,.45,.94]],["easeInOutQuad",[.455,.03,.515,.955]],["easeInCubic",[.55,.055,.675,.19]],["easeOutCubic",[.215,.61,.355,1]],["easeInOutCubic",[.645,.045,.355,1]],["easeInQuart",[.895,.03,.685,.22]],["easeOutQuart",[.165,.84,.44,1]],["easeInOutQuart",[.77,0,.175,1]],["easeInQuint",[.755,.05,.855,.06]],["easeOutQuint",[.23,1,.32,1]],["easeInOutQuint",[.86,0,.07,1]],["easeInExpo",[.95,.05,.795,.035]],["easeOutExpo",[.19,1,.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[.6,.04,.98,.335]],["easeOutCirc",[.075,.82,.165,1]],["easeInOutCirc",[.785,.135,.15,.86]]],function(e,t){S.Easings[t[0]]=c.apply(null,t[1])});var C=S.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/gi},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"],units:["%","em","ex","ch","rem","vw","vh","vmin","vmax","cm","mm","Q","in","pc","pt","px","deg","grad","rad","turn","s","ms"],colorNames:{aliceblue:"240,248,255",antiquewhite:"250,235,215",aquamarine:"127,255,212",aqua:"0,255,255",azure:"240,255,255",beige:"245,245,220",bisque:"255,228,196",black:"0,0,0",blanchedalmond:"255,235,205",blueviolet:"138,43,226",blue:"0,0,255",brown:"165,42,42",burlywood:"222,184,135",cadetblue:"95,158,160",chartreuse:"127,255,0",chocolate:"210,105,30",coral:"255,127,80",cornflowerblue:"100,149,237",cornsilk:"255,248,220",crimson:"220,20,60",cyan:"0,255,255",darkblue:"0,0,139",darkcyan:"0,139,139",darkgoldenrod:"184,134,11",darkgray:"169,169,169",darkgrey:"169,169,169",darkgreen:"0,100,0",darkkhaki:"189,183,107",darkmagenta:"139,0,139",darkolivegreen:"85,107,47",darkorange:"255,140,0",darkorchid:"153,50,204",darkred:"139,0,0",darksalmon:"233,150,122",darkseagreen:"143,188,143",darkslateblue:"72,61,139",darkslategray:"47,79,79",darkturquoise:"0,206,209",darkviolet:"148,0,211",deeppink:"255,20,147",deepskyblue:"0,191,255",dimgray:"105,105,105",dimgrey:"105,105,105",dodgerblue:"30,144,255",firebrick:"178,34,34",floralwhite:"255,250,240",forestgreen:"34,139,34",fuchsia:"255,0,255",gainsboro:"220,220,220",ghostwhite:"248,248,255",gold:"255,215,0",goldenrod:"218,165,32",gray:"128,128,128",grey:"128,128,128",greenyellow:"173,255,47",green:"0,128,0",honeydew:"240,255,240",hotpink:"255,105,180",indianred:"205,92,92",indigo:"75,0,130",ivory:"255,255,240",khaki:"240,230,140",lavenderblush:"255,240,245",lavender:"230,230,250",lawngreen:"124,252,0",lemonchiffon:"255,250,205",lightblue:"173,216,230",lightcoral:"240,128,128",lightcyan:"224,255,255",lightgoldenrodyellow:"250,250,210",lightgray:"211,211,211",lightgrey:"211,211,211",lightgreen:"144,238,144",lightpink:"255,182,193",lightsalmon:"255,160,122",lightseagreen:"32,178,170",lightskyblue:"135,206,250",lightslategray:"119,136,153",lightsteelblue:"176,196,222",lightyellow:"255,255,224",limegreen:"50,205,50",lime:"0,255,0",linen:"250,240,230",magenta:"255,0,255",maroon:"128,0,0",mediumaquamarine:"102,205,170",mediumblue:"0,0,205",mediumorchid:"186,85,211",mediumpurple:"147,112,219",mediumseagreen:"60,179,113",mediumslateblue:"123,104,238",mediumspringgreen:"0,250,154",mediumturquoise:"72,209,204",mediumvioletred:"199,21,133",midnightblue:"25,25,112",mintcream:"245,255,250",mistyrose:"255,228,225",moccasin:"255,228,181",navajowhite:"255,222,173",navy:"0,0,128",oldlace:"253,245,230",olivedrab:"107,142,35",olive:"128,128,0",orangered:"255,69,0",orange:"255,165,0",orchid:"218,112,214",palegoldenrod:"238,232,170",palegreen:"152,251,152",paleturquoise:"175,238,238",palevioletred:"219,112,147",papayawhip:"255,239,213",peachpuff:"255,218,185",peru:"205,133,63",pink:"255,192,203",plum:"221,160,221",powderblue:"176,224,230",purple:"128,0,128",red:"255,0,0",rosybrown:"188,143,143",royalblue:"65,105,225",saddlebrown:"139,69,19",salmon:"250,128,114",sandybrown:"244,164,96",seagreen:"46,139,87",seashell:"255,245,238",sienna:"160,82,45",silver:"192,192,192",skyblue:"135,206,235",slateblue:"106,90,205",slategray:"112,128,144",snow:"255,250,250",springgreen:"0,255,127",steelblue:"70,130,180",tan:"210,180,140",teal:"0,128,128",thistle:"216,191,216",tomato:"255,99,71",turquoise:"64,224,208",violet:"238,130,238",wheat:"245,222,179",whitesmoke:"245,245,245",white:"255,255,255",yellowgreen:"154,205,50",yellow:"255,255,0"}},Hooks:{templates:{textShadow:["Color X Y Blur","black 0px 0px 0px"],boxShadow:["Color X Y Blur Spread","black 0px 0px 0px 0px"],clip:["Top Right Bottom Left","0px 0px 0px 0px"],backgroundPosition:["X Y","0% 0%"],transformOrigin:["X Y Z","50% 50% 0px"],perspectiveOrigin:["X Y","50% 50%"]},registered:{},register:function(){for(var e=0;e<C.Lists.colors.length;e++){var t="color"===C.Lists.colors[e]?"0 0 0 1":"255 255 255 1";C.Hooks.templates[C.Lists.colors[e]]=["Red Green Blue Alpha",t]}var n,r,i;if(g)for(n in C.Hooks.templates)if(C.Hooks.templates.hasOwnProperty(n)){r=C.Hooks.templates[n],i=r[0].split(" ");var o=r[1].match(C.RegEx.valueSplit);"Color"===i[0]&&(i.push(i.shift()),o.push(o.shift()),C.Hooks.templates[n]=[i.join(" "),o.join(" ")])}for(n in C.Hooks.templates)if(C.Hooks.templates.hasOwnProperty(n)){r=C.Hooks.templates[n],i=r[0].split(" ");for(var a in i)if(i.hasOwnProperty(a)){var s=n+i[a],l=a;C.Hooks.registered[s]=[n,l]}}},getRoot:function(e){var t=C.Hooks.registered[e];return t?t[0]:e},getUnit:function(e,t){var n=(e.substr(t||0,5).match(/^[a-z%]+/)||[])[0]||"";return n&&C.Lists.units.indexOf(n)>=0?n:""},fixColors:function(e){return e.replace(/(rgba?\(\s*)?(\b[a-z]+\b)/g,function(e,t,n){return C.Lists.colorNames.hasOwnProperty(n)?(t?t:"rgba(")+C.Lists.colorNames[n]+(t?"":",1)"):t+n})},cleanRootPropertyValue:function(e,t){return C.RegEx.valueUnwrap.test(t)&&(t=t.match(C.RegEx.valueUnwrap)[1]),C.Values.isCSSNullValue(t)&&(t=C.Hooks.templates[e][1]),t},extractValue:function(e,t){var n=C.Hooks.registered[e];if(n){var r=n[0],i=n[1];return t=C.Hooks.cleanRootPropertyValue(r,t),t.toString().match(C.RegEx.valueSplit)[i]}return t},injectValue:function(e,t,n){var r=C.Hooks.registered[e];if(r){var i,o=r[0],a=r[1];return n=C.Hooks.cleanRootPropertyValue(o,n),i=n.toString().match(C.RegEx.valueSplit),i[a]=t,i.join(" ")}return n}},Normalizations:{registered:{clip:function(e,t,n){switch(e){case"name":return"clip";case"extract":var r;return C.RegEx.wrappedValueAlreadyExtracted.test(n)?r=n:(r=n.toString().match(C.RegEx.valueUnwrap),r=r?r[1].replace(/,(\s+)?/g," "):n),r;case"inject":return"rect("+n+")"}},blur:function(e,t,n){switch(e){case"name":return S.State.isFirefox?"filter":"-webkit-filter";case"extract":var r=parseFloat(n);if(!r&&0!==r){var i=n.toString().match(/blur\(([0-9]+[A-z]+)\)/i);r=i?i[1]:0}return r;case"inject":return parseFloat(n)?"blur("+n+")":"none"}},opacity:function(e,t,n){if(g<=8)switch(e){case"name":return"filter";case"extract":var r=n.toString().match(/alpha\(opacity=(.*)\)/i);return n=r?r[1]/100:1;case"inject":return t.style.zoom=1,parseFloat(n)>=1?"":"alpha(opacity="+parseInt(100*parseFloat(n),10)+")"}else switch(e){case"name":return"opacity";case"extract":return n;case"inject":return n}}},register:function(){function e(e,t,n){if("border-box"===C.getPropertyValue(t,"boxSizing").toString().toLowerCase()===(n||!1)){var r,i,o=0,a="width"===e?["Left","Right"]:["Top","Bottom"],s=["padding"+a[0],"padding"+a[1],"border"+a[0]+"Width","border"+a[1]+"Width"];for(r=0;r<s.length;r++)i=parseFloat(C.getPropertyValue(t,s[r])),isNaN(i)||(o+=i);return n?-o:o}return 0}function t(t,n){return function(r,i,o){switch(r){case"name":return t;case"extract":return parseFloat(o)+e(t,i,n);case"inject":return parseFloat(o)-e(t,i,n)+"px"}}}g&&!(g>9)||S.State.isGingerbread||(C.Lists.transformsBase=C.Lists.transformsBase.concat(C.Lists.transforms3D));for(var n=0;n<C.Lists.transformsBase.length;n++)!function(){var e=C.Lists.transformsBase[n];C.Normalizations.registered[e]=function(t,n,i){switch(t){case"name":return"transform";case"extract":return a(n)===r||a(n).transformCache[e]===r?/^scale/i.test(e)?1:0:a(n).transformCache[e].replace(/[()]/g,"");case"inject":var o=!1;switch(e.substr(0,e.length-1)){case"translate":o=!/(%|px|em|rem|vw|vh|\d)$/i.test(i);break;case"scal":case"scale":S.State.isAndroid&&a(n).transformCache[e]===r&&i<1&&(i=1),o=!/(\d)$/i.test(i);break;case"skew":o=!/(deg|\d)$/i.test(i);break;case"rotate":o=!/(deg|\d)$/i.test(i)}return o||(a(n).transformCache[e]="("+i+")"),a(n).transformCache[e]}}}();for(var i=0;i<C.Lists.colors.length;i++)!function(){var e=C.Lists.colors[i];C.Normalizations.registered[e]=function(t,n,i){switch(t){case"name":return e;case"extract":var o;if(C.RegEx.wrappedValueAlreadyExtracted.test(i))o=i;else{var a,s={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};/^[A-z]+$/i.test(i)?a=s[i]!==r?s[i]:s.black:C.RegEx.isHex.test(i)?a="rgb("+C.Values.hexToRgb(i).join(" ")+")":/^rgba?\(/i.test(i)||(a=s.black),o=(a||i).toString().match(C.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ")}return(!g||g>8)&&3===o.split(" ").length&&(o+=" 1"),o;case"inject":return/^rgb/.test(i)?i:(g<=8?4===i.split(" ").length&&(i=i.split(/\s+/).slice(0,3).join(" ")):3===i.split(" ").length&&(i+=" 1"),(g<=8?"rgb":"rgba")+"("+i.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")")}}}();C.Normalizations.registered.innerWidth=t("width",!0),C.Normalizations.registered.innerHeight=t("height",!0),C.Normalizations.registered.outerWidth=t("width"),C.Normalizations.registered.outerHeight=t("height")}},Names:{camelCase:function(e){return e.replace(/-(\w)/g,function(e,t){return t.toUpperCase()})},SVGAttribute:function(e){var t="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";return(g||S.State.isAndroid&&!S.State.isChrome)&&(t+="|transform"),new RegExp("^("+t+")$","i").test(e)},prefixCheck:function(e){if(S.State.prefixMatches[e])return[S.State.prefixMatches[e],!0];for(var t=["","Webkit","Moz","ms","O"],n=0,r=t.length;n<r;n++){var i;if(i=0===n?e:t[n]+e.replace(/^\w/,function(e){return e.toUpperCase()}),b.isString(S.State.prefixElement.style[i]))return S.State.prefixMatches[e]=i,[i,!0]}return[e,!1]}},Values:{hexToRgb:function(e){var t,n=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;return e=e.replace(n,function(e,t,n,r){return t+t+n+n+r+r}),t=r.exec(e),t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:[0,0,0]},isCSSNullValue:function(e){return!e||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(e)},getUnitType:function(e){return/^(rotate|skew)/i.test(e)?"deg":/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(e)?"":"px"},getDisplayType:function(e){var t=e&&e.tagName.toString().toLowerCase();return/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(t)?"inline":/^(li)$/i.test(t)?"list-item":/^(tr)$/i.test(t)?"table-row":/^(table)$/i.test(t)?"table":/^(tbody)$/i.test(t)?"table-row-group":"block"},addClass:function(e,t){if(e)if(e.classList)e.classList.add(t);else if(b.isString(e.className))e.className+=(e.className.length?" ":"")+t;else{var n=e.getAttribute(g<=7?"className":"class")||"";e.setAttribute("class",n+(n?" ":"")+t)}},removeClass:function(e,t){if(e)if(e.classList)e.classList.remove(t);else if(b.isString(e.className))e.className=e.className.toString().replace(new RegExp("(^|\\s)"+t.split(" ").join("|")+"(\\s|$)","gi")," ");else{var n=e.getAttribute(g<=7?"className":"class")||"";e.setAttribute("class",n.replace(new RegExp("(^|s)"+t.split(" ").join("|")+"(s|$)","gi")," "))}}},getPropertyValue:function(e,n,i,o){function s(e,n){var i=0;if(g<=8)i=h.css(e,n);else{var l=!1;/^(width|height)$/.test(n)&&0===C.getPropertyValue(e,"display")&&(l=!0,C.setPropertyValue(e,"display",C.Values.getDisplayType(e)));var u=function(){l&&C.setPropertyValue(e,"display","none")};if(!o){if("height"===n&&"border-box"!==C.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var c=e.offsetHeight-(parseFloat(C.getPropertyValue(e,"borderTopWidth"))||0)-(parseFloat(C.getPropertyValue(e,"borderBottomWidth"))||0)-(parseFloat(C.getPropertyValue(e,"paddingTop"))||0)-(parseFloat(C.getPropertyValue(e,"paddingBottom"))||0);return u(),c}if("width"===n&&"border-box"!==C.getPropertyValue(e,"boxSizing").toString().toLowerCase()){var p=e.offsetWidth-(parseFloat(C.getPropertyValue(e,"borderLeftWidth"))||0)-(parseFloat(C.getPropertyValue(e,"borderRightWidth"))||0)-(parseFloat(C.getPropertyValue(e,"paddingLeft"))||0)-(parseFloat(C.getPropertyValue(e,"paddingRight"))||0);return u(),p}}var f;f=a(e)===r?t.getComputedStyle(e,null):a(e).computedStyle?a(e).computedStyle:a(e).computedStyle=t.getComputedStyle(e,null),"borderColor"===n&&(n="borderTopColor"),i=9===g&&"filter"===n?f.getPropertyValue(n):f[n],""!==i&&null!==i||(i=e.style[n]),u()}if("auto"===i&&/^(top|right|bottom|left)$/i.test(n)){var d=s(e,"position");("fixed"===d||"absolute"===d&&/top|left/i.test(n))&&(i=h(e).position()[n]+"px")}return i}var l;if(C.Hooks.registered[n]){var u=n,c=C.Hooks.getRoot(u);i===r&&(i=C.getPropertyValue(e,C.Names.prefixCheck(c)[0])),C.Normalizations.registered[c]&&(i=C.Normalizations.registered[c]("extract",e,i)),l=C.Hooks.extractValue(u,i)}else if(C.Normalizations.registered[n]){var p,f;p=C.Normalizations.registered[n]("name",e),"transform"!==p&&(f=s(e,C.Names.prefixCheck(p)[0]),C.Values.isCSSNullValue(f)&&C.Hooks.templates[n]&&(f=C.Hooks.templates[n][1])),l=C.Normalizations.registered[n]("extract",e,f)}if(!/^[\d-]/.test(l)){var d=a(e);if(d&&d.isSVG&&C.Names.SVGAttribute(n))if(/^(height|width)$/i.test(n))try{l=e.getBBox()[n]}catch(e){l=0}else l=e.getAttribute(n);else l=s(e,C.Names.prefixCheck(n)[0])}return C.Values.isCSSNullValue(l)&&(l=0),S.debug>=2&&console.log("Get "+n+": "+l),l},setPropertyValue:function(e,n,r,i,o){var s=n;if("scroll"===n)o.container?o.container["scroll"+o.direction]=r:"Left"===o.direction?t.scrollTo(r,o.alternateValue):t.scrollTo(o.alternateValue,r);else if(C.Normalizations.registered[n]&&"transform"===C.Normalizations.registered[n]("name",e))C.Normalizations.registered[n]("inject",e,r),s="transform",r=a(e).transformCache[n];else{if(C.Hooks.registered[n]){var l=n,u=C.Hooks.getRoot(n);i=i||C.getPropertyValue(e,u),r=C.Hooks.injectValue(l,r,i),n=u}if(C.Normalizations.registered[n]&&(r=C.Normalizations.registered[n]("inject",e,r),n=C.Normalizations.registered[n]("name",e)),s=C.Names.prefixCheck(n)[0],g<=8)try{e.style[s]=r}catch(e){S.debug&&console.log("Browser does not support ["+r+"] for ["+s+"]")}else{var c=a(e);c&&c.isSVG&&C.Names.SVGAttribute(n)?e.setAttribute(n,r):e.style[s]=r}S.debug>=2&&console.log("Set "+n+" ("+s+"): "+r)}return[s,r]},flushTransformCache:function(e){var t="",n=a(e);if((g||S.State.isAndroid&&!S.State.isChrome)&&n&&n.isSVG){var r=function(t){return parseFloat(C.getPropertyValue(e,t))},i={translate:[r("translateX"),r("translateY")],skewX:[r("skewX")],skewY:[r("skewY")],scale:1!==r("scale")?[r("scale"),r("scale")]:[r("scaleX"),r("scaleY")],rotate:[r("rotateZ"),0,0]};h.each(a(e).transformCache,function(e){/^translate/i.test(e)?e="translate":/^scale/i.test(e)?e="scale":/^rotate/i.test(e)&&(e="rotate"),i[e]&&(t+=e+"("+i[e].join(" ")+") ",delete i[e])})}else{var o,s;h.each(a(e).transformCache,function(n){if(o=a(e).transformCache[n],"transformPerspective"===n)return s=o,!0;9===g&&"rotateZ"===n&&(n="rotate"),t+=n+o+" "}),s&&(t="perspective"+s+" "+t)}C.setPropertyValue(e,"transform",t)}};C.Hooks.register(),C.Normalizations.register(),S.hook=function(e,t,n){var i;return e=o(e),h.each(e,function(e,o){if(a(o)===r&&S.init(o),n===r)i===r&&(i=C.getPropertyValue(o,t));else{var s=C.setPropertyValue(o,t,n);"transform"===s[0]&&S.CSS.flushTransformCache(o),i=s}}),i};var E=function(){function e(){return c?P.promise||null:g}function i(e,i){function o(o){var c,d;if(l.begin&&0===V)try{l.begin.call(v,v)}catch(e){setTimeout(function(){throw e},1)}if("scroll"===O){var g,m,T,w=/^x$/i.test(l.axis)?"Left":"Top",E=parseFloat(l.offset)||0;l.container?b.isWrapped(l.container)||b.isNode(l.container)?(l.container=l.container[0]||l.container,g=l.container["scroll"+w],T=g+h(e).position()[w.toLowerCase()]+E):l.container=null:(g=S.State.scrollAnchor[S.State["scrollProperty"+w]],m=S.State.scrollAnchor[S.State["scrollProperty"+("Left"===w?"Top":"Left")]],T=h(e).offset()[w.toLowerCase()]+E),u={scroll:{rootPropertyValue:!1,startValue:g,currentValue:g,endValue:T,unitType:"",easing:l.easing,scrollData:{container:l.container,direction:w,alternateValue:m}},element:e},S.debug&&console.log("tweensContainer (scroll): ",u.scroll,e)}else if("reverse"===O){if(c=a(e),!c)return;if(!c.tweensContainer)return void h.dequeue(e,l.queue);"none"===c.opts.display&&(c.opts.display="auto"),"hidden"===c.opts.visibility&&(c.opts.visibility="visible"),c.opts.loop=!1,c.opts.begin=null,c.opts.complete=null,x.easing||delete l.easing,x.duration||delete l.duration,l=h.extend({},c.opts,l),d=h.extend(!0,{},c?c.tweensContainer:null);for(var A in d)if(d.hasOwnProperty(A)&&"element"!==A){var N=d[A].startValue;d[A].startValue=d[A].currentValue=d[A].endValue,d[A].endValue=N,b.isEmptyObject(x)||(d[A].easing=l.easing),S.debug&&console.log("reverse tweensContainer ("+A+"): "+JSON.stringify(d[A]),e)}u=d}else if("start"===O){c=a(e),c&&c.tweensContainer&&c.isAnimating===!0&&(d=c.tweensContainer);var F=function(t,n){var r,o,a;return b.isFunction(t)&&(t=t.call(e,i,k)),b.isArray(t)?(r=t[0],!b.isArray(t[1])&&/^[\d-]/.test(t[1])||b.isFunction(t[1])||C.RegEx.isHex.test(t[1])?a=t[1]:b.isString(t[1])&&!C.RegEx.isHex.test(t[1])&&S.Easings[t[1]]||b.isArray(t[1])?(o=n?t[1]:p(t[1],l.duration),a=t[2]):a=t[1]||t[2]):r=t,n||(o=o||l.easing),b.isFunction(r)&&(r=r.call(e,i,k)),b.isFunction(a)&&(a=a.call(e,i,k)),[r||0,o,a]},j=function(i,o){var a,p=C.Hooks.getRoot(i),f=!1,g=o[0],m=o[1],v=o[2];if(!(c&&c.isSVG||"tween"===p||C.Names.prefixCheck(p)[1]!==!1||C.Normalizations.registered[p]!==r))return void(S.debug&&console.log("Skipping ["+p+"] due to a lack of browser support."));(l.display!==r&&null!==l.display&&"none"!==l.display||l.visibility!==r&&"hidden"!==l.visibility)&&/opacity|filter/.test(i)&&!v&&0!==g&&(v=0),l._cacheValues&&d&&d[i]?(v===r&&(v=d[i].endValue+d[i].unitType),f=c.rootPropertyValueCache[p]):C.Hooks.registered[i]?v===r?(f=C.getPropertyValue(e,p),v=C.getPropertyValue(e,i,f)):f=C.Hooks.templates[p][1]:v===r&&(v=C.getPropertyValue(e,i));var y,x,T,w=!1,P=function(e,t){var n,r;return r=(t||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(e){return n=e,""}),n||(n=C.Values.getUnitType(e)),[r,n]};if(v!==g&&b.isString(v)&&b.isString(g)){a="";var E=0,k=0,V=[],A=[],N=0,O=0,F=0;for(v=C.Hooks.fixColors(v),g=C.Hooks.fixColors(g);E<v.length&&k<g.length;){var j=v[E],L=g[k];if(/[\d\.-]/.test(j)&&/[\d\.-]/.test(L)){for(var R=j,z=L,I=".",M=".";++E<v.length;){if(j=v[E],j===I)I="..";else if(!/\d/.test(j))break;R+=j}for(;++k<g.length;){if(L=g[k],L===M)M="..";else if(!/\d/.test(L))break;z+=L}var q=C.Hooks.getUnit(v,E),D=C.Hooks.getUnit(g,k);if(E+=q.length,k+=D.length,q===D)R===z?a+=R+q:(a+="{"+V.length+(O?"!":"")+"}"+q,V.push(parseFloat(R)),A.push(parseFloat(z)));else{var W=parseFloat(R),_=parseFloat(z);a+=(N<5?"calc":"")+"("+(W?"{"+V.length+(O?"!":"")+"}":"0")+q+" + "+(_?"{"+(V.length+(W?1:0))+(O?"!":"")+"}":"0")+D+")",W&&(V.push(W),A.push(0)),_&&(V.push(0),A.push(_))}}else{if(j!==L){N=0;break}a+=j,E++,k++,0===N&&"c"===j||1===N&&"a"===j||2===N&&"l"===j||3===N&&"c"===j||N>=4&&"("===j?N++:(N&&N<5||N>=4&&")"===j&&--N<5)&&(N=0),0===O&&"r"===j||1===O&&"g"===j||2===O&&"b"===j||3===O&&"a"===j||O>=3&&"("===j?(3===O&&"a"===j&&(F=1),O++):F&&","===j?++F>3&&(O=F=0):(F&&O<(F?5:4)||O>=(F?4:3)&&")"===j&&--O<(F?5:4))&&(O=F=0)}}E===v.length&&k===g.length||(S.debug&&console.error('Trying to pattern match mis-matched strings ["'+g+'", "'+v+'"]'),a=r),a&&(V.length?(S.debug&&console.log('Pattern found "'+a+'" -> ',V,A,"["+v+","+g+"]"),v=V,g=A,x=T=""):a=r)}a||(y=P(i,v),v=y[0],T=y[1],y=P(i,g),g=y[0].replace(/^([+-\/*])=/,function(e,t){return w=t,""}),x=y[1],v=parseFloat(v)||0,g=parseFloat(g)||0,"%"===x&&(/^(fontSize|lineHeight)$/.test(i)?(g/=100,x="em"):/^scale/.test(i)?(g/=100,x=""):/(Red|Green|Blue)$/i.test(i)&&(g=g/100*255,x="")));var X=function(){var r={myParent:e.parentNode||n.body,position:C.getPropertyValue(e,"position"),fontSize:C.getPropertyValue(e,"fontSize")},i=r.position===H.lastPosition&&r.myParent===H.lastParent,o=r.fontSize===H.lastFontSize;H.lastParent=r.myParent,H.lastPosition=r.position,H.lastFontSize=r.fontSize;var a=100,s={};if(o&&i)s.emToPx=H.lastEmToPx,s.percentToPxWidth=H.lastPercentToPxWidth,s.percentToPxHeight=H.lastPercentToPxHeight;else{var l=c&&c.isSVG?n.createElementNS("http://www.w3.org/2000/svg","rect"):n.createElement("div");S.init(l),r.myParent.appendChild(l),h.each(["overflow","overflowX","overflowY"],function(e,t){S.CSS.setPropertyValue(l,t,"hidden")}),S.CSS.setPropertyValue(l,"position",r.position),S.CSS.setPropertyValue(l,"fontSize",r.fontSize),S.CSS.setPropertyValue(l,"boxSizing","content-box"),h.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(e,t){S.CSS.setPropertyValue(l,t,a+"%")}),S.CSS.setPropertyValue(l,"paddingLeft",a+"em"),s.percentToPxWidth=H.lastPercentToPxWidth=(parseFloat(C.getPropertyValue(l,"width",null,!0))||1)/a,s.percentToPxHeight=H.lastPercentToPxHeight=(parseFloat(C.getPropertyValue(l,"height",null,!0))||1)/a,s.emToPx=H.lastEmToPx=(parseFloat(C.getPropertyValue(l,"paddingLeft"))||1)/a,r.myParent.removeChild(l)}return null===H.remToPx&&(H.remToPx=parseFloat(C.getPropertyValue(n.body,"fontSize"))||16),null===H.vwToPx&&(H.vwToPx=parseFloat(t.innerWidth)/100,H.vhToPx=parseFloat(t.innerHeight)/100),s.remToPx=H.remToPx,s.vwToPx=H.vwToPx,s.vhToPx=H.vhToPx,S.debug>=1&&console.log("Unit ratios: "+JSON.stringify(s),e),s};if(/[\/*]/.test(w))x=T;else if(T!==x&&0!==v)if(0===g)x=T;else{s=s||X();var Y=/margin|padding|left|right|width|text|word|letter/i.test(i)||/X$/.test(i)||"x"===i?"x":"y";switch(T){case"%":v*="x"===Y?s.percentToPxWidth:s.percentToPxHeight;break;case"px":break;default:v*=s[T+"ToPx"]}switch(x){case"%":v*=1/("x"===Y?s.percentToPxWidth:s.percentToPxHeight);break;case"px":break;default:v*=1/s[x+"ToPx"]}}switch(w){case"+":g=v+g;break;case"-":g=v-g;break;case"*":g*=v;break;case"/":g=v/g}u[i]={rootPropertyValue:f,startValue:v,currentValue:v,endValue:g,unitType:x,easing:m},a&&(u[i].pattern=a),S.debug&&console.log("tweensContainer ("+i+"): "+JSON.stringify(u[i]),e)};for(var L in y)if(y.hasOwnProperty(L)){var R=C.Names.camelCase(L),z=F(y[L]);if(C.Lists.colors.indexOf(R)>=0){var M=z[0],q=z[1],D=z[2];if(C.RegEx.isHex.test(M)){for(var W=["Red","Green","Blue"],_=C.Values.hexToRgb(M),X=D?C.Values.hexToRgb(D):r,Y=0;Y<W.length;Y++){var B=[_[Y]];q&&B.push(q),X!==r&&B.push(X[Y]),j(R+W[Y],B)}continue}}j(R,z)}u.element=e}u.element&&(C.Values.addClass(e,"velocity-animating"),I.push(u),c=a(e),c&&(""===l.queue&&(c.tweensContainer=u,c.opts=l),c.isAnimating=!0),V===k-1?(S.State.calls.push([I,v,l,null,P.resolver,null,0]),S.State.isTicking===!1&&(S.State.isTicking=!0,f())):V++)}var s,l=h.extend({},S.defaults,x),u={};switch(a(e)===r&&S.init(e),parseFloat(l.delay)&&l.queue!==!1&&h.queue(e,l.queue,function(t){S.velocityQueueEntryFlag=!0;var n=S.State.delayedElements.count++;S.State.delayedElements[n]=e;var r=function(e){return function(){S.State.delayedElements[e]=!1,t()}}(n);a(e).delayBegin=(new Date).getTime(),a(e).delay=parseFloat(l.delay),a(e).delayTimer={setTimeout:setTimeout(t,parseFloat(l.delay)),next:r}}),l.duration.toString().toLowerCase()){case"fast":l.duration=200;break;case"normal":l.duration=T;break;case"slow":l.duration=600;break;default:l.duration=parseFloat(l.duration)||1}if(S.mock!==!1&&(S.mock===!0?l.duration=l.delay=1:(l.duration*=parseFloat(S.mock)||1,l.delay*=parseFloat(S.mock)||1)),l.easing=p(l.easing,l.duration),l.begin&&!b.isFunction(l.begin)&&(l.begin=null),l.progress&&!b.isFunction(l.progress)&&(l.progress=null),l.complete&&!b.isFunction(l.complete)&&(l.complete=null),l.display!==r&&null!==l.display&&(l.display=l.display.toString().toLowerCase(),"auto"===l.display&&(l.display=S.CSS.Values.getDisplayType(e))),l.visibility!==r&&null!==l.visibility&&(l.visibility=l.visibility.toString().toLowerCase()),l.mobileHA=l.mobileHA&&S.State.isMobile&&!S.State.isGingerbread,l.queue===!1)if(l.delay){var c=S.State.delayedElements.count++;S.State.delayedElements[c]=e;var d=function(e){return function(){S.State.delayedElements[e]=!1,o()}}(c);a(e).delayBegin=(new Date).getTime(),a(e).delay=parseFloat(l.delay),a(e).delayTimer={setTimeout:setTimeout(o,parseFloat(l.delay)),next:d}}else o();else h.queue(e,l.queue,function(e,t){if(t===!0)return P.promise&&P.resolver(v),!0;S.velocityQueueEntryFlag=!0,o(e)});""!==l.queue&&"fx"!==l.queue||"inprogress"===h.queue(e)[0]||h.dequeue(e)}var u,c,g,m,v,y,x,w=arguments[0]&&(arguments[0].p||h.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names||b.isString(arguments[0].properties));b.isWrapped(this)?(c=!1,m=0,v=this,g=this):(c=!0,m=1,v=w?arguments[0].elements||arguments[0].e:arguments[0]);var P={promise:null,resolver:null,rejecter:null};if(c&&S.Promise&&(P.promise=new S.Promise(function(e,t){P.resolver=e,P.rejecter=t})),w?(y=arguments[0].properties||arguments[0].p,x=arguments[0].options||arguments[0].o):(y=arguments[m],x=arguments[m+1]),v=o(v),!v)return void(P.promise&&(y&&x&&x.promiseRejectEmpty===!1?P.resolver():P.rejecter()));var k=v.length,V=0;if(!/^(stop|finish|finishAll|pause|resume)$/i.test(y)&&!h.isPlainObject(x)){var A=m+1;x={};for(var N=A;N<arguments.length;N++)b.isArray(arguments[N])||!/^(fast|normal|slow)$/i.test(arguments[N])&&!/^\d/.test(arguments[N])?b.isString(arguments[N])||b.isArray(arguments[N])?x.easing=arguments[N]:b.isFunction(arguments[N])&&(x.complete=arguments[N]):x.duration=arguments[N]}var O;switch(y){case"scroll":O="scroll";break;case"reverse":O="reverse";break;case"pause":var F=(new Date).getTime();return h.each(v,function(e,t){s(t,F)}),h.each(S.State.calls,function(e,t){var n=!1;t&&h.each(t[1],function(e,i){var o=x===r?"":x;return o!==!0&&t[2].queue!==o&&(x!==r||t[2].queue!==!1)||(h.each(v,function(e,r){if(r===i)return t[5]={resume:!1},n=!0,!1}),!n&&void 0)})}),e();case"resume":return h.each(v,function(e,t){l(t,F)}),h.each(S.State.calls,function(e,t){var n=!1;t&&h.each(t[1],function(e,i){var o=x===r?"":x;return o!==!0&&t[2].queue!==o&&(x!==r||t[2].queue!==!1)||(!t[5]||(h.each(v,function(e,r){if(r===i)return t[5].resume=!0,n=!0,!1}),!n&&void 0))})}),e();case"finish":case"finishAll":case"stop":h.each(v,function(e,t){a(t)&&a(t).delayTimer&&(clearTimeout(a(t).delayTimer.setTimeout),a(t).delayTimer.next&&a(t).delayTimer.next(),delete a(t).delayTimer),"finishAll"!==y||x!==!0&&!b.isString(x)||(h.each(h.queue(t,b.isString(x)?x:""),function(e,t){b.isFunction(t)&&t()}),h.queue(t,b.isString(x)?x:"",[]))});var j=[];return h.each(S.State.calls,function(e,t){t&&h.each(t[1],function(n,i){var o=x===r?"":x;if(o!==!0&&t[2].queue!==o&&(x!==r||t[2].queue!==!1))return!0;h.each(v,function(n,r){if(r===i)if((x===!0||b.isString(x))&&(h.each(h.queue(r,b.isString(x)?x:""),function(e,t){b.isFunction(t)&&t(null,!0)}),h.queue(r,b.isString(x)?x:"",[])),"stop"===y){var s=a(r);s&&s.tweensContainer&&o!==!1&&h.each(s.tweensContainer,function(e,t){t.endValue=t.currentValue}),j.push(e)}else"finish"!==y&&"finishAll"!==y||(t[2].duration=1)})})}),"stop"===y&&(h.each(j,function(e,t){d(t,!0)}),P.promise&&P.resolver(v)),e();default:if(!h.isPlainObject(y)||b.isEmptyObject(y)){if(b.isString(y)&&S.Redirects[y]){u=h.extend({},x);var L=u.duration,R=u.delay||0;return u.backwards===!0&&(v=h.extend(!0,[],v).reverse()),h.each(v,function(e,t){parseFloat(u.stagger)?u.delay=R+parseFloat(u.stagger)*e:b.isFunction(u.stagger)&&(u.delay=R+u.stagger.call(t,e,k)),u.drag&&(u.duration=parseFloat(L)||(/^(callout|transition)/.test(y)?1e3:T),u.duration=Math.max(u.duration*(u.backwards?1-e/k:(e+1)/k),.75*u.duration,200)),S.Redirects[y].call(t,t,u||{},e,k,v,P.promise?P:r)}),e()}var z="Velocity: First argument ("+y+") was not a property map, a known action, or a registered redirect. Aborting.";return P.promise?P.rejecter(new Error(z)):console.log(z),e()}O="start"}var H={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null},I=[];h.each(v,function(e,t){b.isNode(t)&&i(t,e)}),u=h.extend({},S.defaults,x),u.loop=parseInt(u.loop,10);var M=2*u.loop-1;if(u.loop)for(var q=0;q<M;q++){var D={delay:u.delay,progress:u.progress};q===M-1&&(D.display=u.display,D.visibility=u.visibility,D.complete=u.complete),E(v,"reverse",D)}return e()};S=h.extend(E,S),S.animate=E;var k=t.requestAnimationFrame||m;if(!S.State.isMobile&&n.hidden!==r){var V=function(){n.hidden?(k=function(e){return setTimeout(function(){e(!0)},16)},f()):k=t.requestAnimationFrame||m};V(),n.addEventListener("visibilitychange",V)}return e.Velocity=S,e!==t&&(e.fn.velocity=E,e.fn.velocity.defaults=S.defaults),h.each(["Down","Up"],function(e,t){S.Redirects["slide"+t]=function(e,n,i,o,a,s){var l=h.extend({},n),u=l.begin,c=l.complete,p={},f={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""};l.display===r&&(l.display="Down"===t?"inline"===S.CSS.Values.getDisplayType(e)?"inline-block":"block":"none"),l.begin=function(){0===i&&u&&u.call(a,a);for(var n in f)if(f.hasOwnProperty(n)){p[n]=e.style[n];var r=C.getPropertyValue(e,n);f[n]="Down"===t?[r,0]:[0,r]}p.overflow=e.style.overflow,e.style.overflow="hidden"},l.complete=function(){for(var t in p)p.hasOwnProperty(t)&&(e.style[t]=p[t]);i===o-1&&(c&&c.call(a,a),s&&s.resolver(a))},S(e,f,l)}}),h.each(["In","Out"],function(e,t){S.Redirects["fade"+t]=function(e,n,i,o,a,s){var l=h.extend({},n),u=l.complete,c={opacity:"In"===t?1:0};0!==i&&(l.begin=null),l.complete=i!==o-1?null:function(){u&&u.call(a,a),s&&s.resolver(a)},l.display===r&&(l.display="In"===t?"auto":"none"),S(this,c,l)}}),S}(__webpack_provided_window_dot_jQuery||window.Zepto||window,window,window?window.document:void 0)})},function(e,t,n){"use strict";var r=n(7),i=n.n(r),o=n(3);n.d(t,"a",function(){return l});var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s={},l=function(e,t){u.setGlobalOptions(t),u.init(),e.component("toasted",i.a),e.toasted=e.prototype.$toasted=u},u={el:null,init:function(){p()},show:function(e,t){return c(e,t)},success:function(e,t){return t=t||{},t.type="success",c(e,t)},info:function(e,t){return t=t||{},t.type="info",c(e,t)},error:function(e,t){return t=t||{},t.type="error",c(e,t)},global:{},setGlobalOptions:function(e){s=e||{}}},c=function(e,t){if(t=t||{},"object"!==(void 0===t?"undefined":a(t)))return console.error("Options should be a type of object. given : "+t),null;var r=JSON.parse(JSON.stringify(s));return Object.assign(r,t),t=r,n.i(o.a)(e,t)},p=function(){var e=s.globalToasts,t=function(e,t){return"string"==typeof t&&u[t]?u[t].apply(u,[e,{}]):c(e,t)};e&&(Object.keys(e).forEach(function(n){u.global[n]=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return e[n].apply(null,[r,t])}}),delete s.customToasts)}},function(e,t,n){"use strict";var r=n(0),i=n.n(r);n.d(t,"a",function(){return c});var o=this,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=function(e,t){return setTimeout(function(){i()(e,{opacity:0,marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){this[0].parentNode&&this[0].parentNode.removeChild(this[0])}})},t),!0},l=function(e,t){return("object"===("undefined"==typeof HTMLElement?"undefined":a(HTMLElement))?t instanceof HTMLElement:t&&"object"===(void 0===t?"undefined":a(t))&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName)?e.appendChild(t):e.innerHTML=t,o},u=function(e){var t=document.createElement("button");t.innerText="x",t.className="toasted-close",t.addEventListener("click",function(){s(e,0)}),e.appendChild(t)},c=function(e){return{el:e,text:function(t){return l(e,t),this},goAway:function(){return s(e,arguments.length>0&&void 0!==arguments[0]?arguments[0]:800)},addClose:function(){return u(e),this}}}},function(e,t,n){"use strict";var r=n(0),i=n.n(r),o=n(6),a=n.n(o),s=n(2),l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.a=function(e,t){function r(e){var t=document.createElement("div");if(t.classList.add("toasted"),u)for(var n=u.split(" "),r=0,s=n.length;r<s;r++)t.classList.add(n[r]);("object"===("undefined"==typeof HTMLElement?"undefined":l(HTMLElement))?e instanceof HTMLElement:e&&"object"===(void 0===e?"undefined":l(e))&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)?t.appendChild(e):t.innerHTML=e;var c=new a.a(t,{prevent_default:!1});return c.on("pan",function(e){var n=e.deltaX,r=80;t.classList.contains("panning")||t.classList.add("panning");var o=1-Math.abs(n/r);o<0&&(o=0),i()(t,{left:n,opacity:o},{duration:50,queue:!1,easing:"easeOutQuad"})}),c.on("panend",function(e){var n=e.deltaX;Math.abs(n)>80?i()(t,{marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof o&&o(),t.parentNode&&t.parentNode.removeChild(t)}}):(t.classList.remove("panning"),i()(t,{left:0,opacity:1},{duration:300,easing:"easeOutExpo",queue:!1}))}),t}t.className=t.className||null,t.onComplete=t.onComplete||null,t.position=t.position||"top-right",t.duration=t.duration||null,t.theme=t.theme||"primary",t.type=t.type||"default";var o=t.onComplete,u=t.className,c=t.duration;t.theme&&(u=(t.className?t.className:"")+" "+t.theme.trim(),u=u?u.trim():u),t.type&&(u=u+" "+t.type.trim());var p=document.getElementById("toasted-container");null===p&&(p=document.createElement("div"),p.id="toasted-container",document.body.appendChild(p)),p&&(p.className="",p.classList.add(t.position));var f=r(e);e&&p.appendChild(f),f.style.opacity=0,i()(f,{translateY:"-35px",opacity:1},{duration:300,easing:"easeOutCubic",queue:!1});var d,h=c;return null!=h&&(d=setInterval(function(){null===f.parentNode&&window.clearInterval(d),f.classList.contains("panning")||(h-=20),h<=0&&(i()(f,{opacity:0,marginTop:"-40px"},{duration:375,easing:"easeOutExpo",queue:!1,complete:function(){"function"==typeof o&&o(),this[0].parentNode&&this[0].parentNode.removeChild(this[0])}}),window.clearInterval(d))},20)),n.i(s.a)(f)}},function(e,t,n){t=e.exports=n(5)(),t.push([e.i,"#toasted-container{display:block;position:fixed;z-index:10000}#toasted-container .toasted{top:35px;width:auto;clear:both;margin-top:10px;position:relative;max-width:100%;height:auto;word-break:break-all;display:flex;align-items:center;justify-content:space-between}#toasted-container .toasted .btn,#toasted-container .toasted .btn-flat{margin:0;margin-left:3rem}#toasted-container .toasted.rounded{border-radius:24px}#toasted-container .toasted.primary{border-radius:2px;min-height:38px;line-height:1.1em;background-color:#353535;padding:0 20px;font-size:15px;font-weight:300;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}#toasted-container .toasted.primary.success{background:#4caf50}#toasted-container .toasted.primary.error{background:#f44336}#toasted-container .toasted.primary.info{background:#3f51b5}#toasted-container .toasted.bubble{border-radius:30px;min-height:38px;line-height:1.1em;background-color:#ff7043;padding:0 20px;font-size:15px;font-weight:300;color:#fff;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)}#toasted-container .toasted.bubble.success{background:#4caf50}#toasted-container .toasted.bubble.error{background:#f44336}#toasted-container .toasted.bubble.info{background:#3f51b5}#toasted-container .toasted.outline{border-radius:30px;min-height:38px;line-height:1.1em;background-color:#fff;border:1px solid #676767;padding:0 20px;font-size:15px;color:#676767;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);font-weight:700}#toasted-container .toasted.outline.success{color:#4caf50;border-color:#4caf50}#toasted-container .toasted.outline.error{color:#f44336;border-color:#f44336}#toasted-container .toasted.outline.info{color:#3f51b5;border-color:#3f51b5}@media only screen and (max-width:600px){#toasted-container{min-width:100%;bottom:0}}@media only screen and (min-width:601px) and (max-width:992px){#toasted-container{max-width:90%}}@media only screen and (min-width:601px){#toasted-container{max-width:86%}#toasted-container.top-right{top:10%;right:7%}#toasted-container.top-left{top:10%;left:7%}#toasted-container.top-center{top:10%;left:50%;transform:translateX(-50%)}#toasted-container.bottom-right{right:5%;bottom:7%}#toasted-container.bottom-left{left:5%;bottom:7%}#toasted-container.bottom-center{left:50%;transform:translateX(-50%);bottom:7%}#toasted-container.bottom-left .toasted,#toasted-container.top-left .toasted{float:left}}@media only screen and (max-width:600px){.toasted{width:100%;border-radius:0}}@media only screen and (min-width:601px) and (max-width:992px){.toasted{float:left}}@media only screen and (min-width:993px){.toasted{float:right}}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<t.length;i++){var a=t[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),e.push(a))}},e}},function(e,t,n){var r;/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(i,o,a,s){"use strict";function l(e,t,n){return setTimeout(d(e,n),t)}function u(e,t,n){return!!Array.isArray(e)&&(c(e,n[t],n),!0)}function c(e,t,n){var r;if(e)if(e.forEach)e.forEach(t,n);else if(e.length!==s)for(r=0;r<e.length;)t.call(n,e[r],r,e),r++;else for(r in e)e.hasOwnProperty(r)&&t.call(n,e[r],r,e)}function p(e,t,n){var r="DEPRECATED METHOD: "+t+"\n"+n+" AT \n";return function(){var t=new Error("get-stack-trace"),n=t&&t.stack?t.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",o=i.console&&(i.console.warn||i.console.log);return o&&o.call(i.console,r,n),e.apply(this,arguments)}}function f(e,t,n){var r,i=t.prototype;r=e.prototype=Object.create(i),r.constructor=e,r._super=i,n&&ge(r,n)}function d(e,t){return function(){return e.apply(t,arguments)}}function h(e,t){return typeof e==ye?e.apply(t?t[0]||s:s,t):e}function g(e,t){return e===s?t:e}function m(e,t,n){c(x(t),function(t){e.addEventListener(t,n,!1)})}function v(e,t,n){c(x(t),function(t){e.removeEventListener(t,n,!1)})}function y(e,t){for(;e;){if(e==t)return!0;e=e.parentNode}return!1}function b(e,t){return e.indexOf(t)>-1}function x(e){return e.trim().split(/\s+/g)}function T(e,t,n){if(e.indexOf&&!n)return e.indexOf(t);for(var r=0;r<e.length;){if(n&&e[r][n]==t||!n&&e[r]===t)return r;r++}return-1}function w(e){return Array.prototype.slice.call(e,0)}function S(e,t,n){for(var r=[],i=[],o=0;o<e.length;){var a=t?e[o][t]:e[o];T(i,a)<0&&r.push(e[o]),i[o]=a,o++}return n&&(r=t?r.sort(function(e,n){return e[t]>n[t]}):r.sort()),r}function P(e,t){for(var n,r,i=t[0].toUpperCase()+t.slice(1),o=0;o<me.length;){if(n=me[o],r=n?n+i:t,r in e)return r;o++}return s}function C(){return Pe++}function E(e){var t=e.ownerDocument||e;return t.defaultView||t.parentWindow||i}function k(e,t){var n=this;this.manager=e,this.callback=t,this.element=e.element,this.target=e.options.inputTarget,this.domHandler=function(t){h(e.options.enable,[e])&&n.handler(t)},this.init()}function V(e){var t=e.options.inputClass;return new(t?t:ke?W:Ve?Y:Ee?$:D)(e,A)}function A(e,t,n){var r=n.pointers.length,i=n.changedPointers.length,o=t&Le&&r-i===0,a=t&(ze|He)&&r-i===0;n.isFirst=!!o,n.isFinal=!!a,o&&(e.session={}),n.eventType=t,N(e,n),e.emit("hammer.input",n),e.recognize(n),e.session.prevInput=n}function N(e,t){var n=e.session,r=t.pointers,i=r.length;n.firstInput||(n.firstInput=j(t)),i>1&&!n.firstMultiple?n.firstMultiple=j(t):1===i&&(n.firstMultiple=!1);var o=n.firstInput,a=n.firstMultiple,s=a?a.center:o.center,l=t.center=L(r);t.timeStamp=Te(),t.deltaTime=t.timeStamp-o.timeStamp,t.angle=I(s,l),t.distance=H(s,l),O(n,t),t.offsetDirection=z(t.deltaX,t.deltaY);var u=R(t.deltaTime,t.deltaX,t.deltaY);t.overallVelocityX=u.x,t.overallVelocityY=u.y,t.overallVelocity=xe(u.x)>xe(u.y)?u.x:u.y,t.scale=a?q(a.pointers,r):1,t.rotation=a?M(a.pointers,r):0,t.maxPointers=n.prevInput?t.pointers.length>n.prevInput.maxPointers?t.pointers.length:n.prevInput.maxPointers:t.pointers.length,F(n,t);var c=e.element;y(t.srcEvent.target,c)&&(c=t.srcEvent.target),t.target=c}function O(e,t){var n=t.center,r=e.offsetDelta||{},i=e.prevDelta||{},o=e.prevInput||{};t.eventType!==Le&&o.eventType!==ze||(i=e.prevDelta={x:o.deltaX||0,y:o.deltaY||0},r=e.offsetDelta={x:n.x,y:n.y}),t.deltaX=i.x+(n.x-r.x),t.deltaY=i.y+(n.y-r.y)}function F(e,t){var n,r,i,o,a=e.lastInterval||t,l=t.timeStamp-a.timeStamp;if(t.eventType!=He&&(l>je||a.velocity===s)){var u=t.deltaX-a.deltaX,c=t.deltaY-a.deltaY,p=R(l,u,c);r=p.x,i=p.y,n=xe(p.x)>xe(p.y)?p.x:p.y,o=z(u,c),e.lastInterval=t}else n=a.velocity,r=a.velocityX,i=a.velocityY,o=a.direction;t.velocity=n,t.velocityX=r,t.velocityY=i,t.direction=o}function j(e){for(var t=[],n=0;n<e.pointers.length;)t[n]={clientX:be(e.pointers[n].clientX),clientY:be(e.pointers[n].clientY)},n++;return{timeStamp:Te(),pointers:t,center:L(t),deltaX:e.deltaX,deltaY:e.deltaY}}function L(e){var t=e.length;if(1===t)return{x:be(e[0].clientX),y:be(e[0].clientY)};for(var n=0,r=0,i=0;i<t;)n+=e[i].clientX,r+=e[i].clientY,i++;return{x:be(n/t),y:be(r/t)}}function R(e,t,n){return{x:t/e||0,y:n/e||0}}function z(e,t){return e===t?Ie:xe(e)>=xe(t)?e<0?Me:qe:t<0?De:We}function H(e,t,n){n||(n=Be);var r=t[n[0]]-e[n[0]],i=t[n[1]]-e[n[1]];return Math.sqrt(r*r+i*i)}function I(e,t,n){n||(n=Be);var r=t[n[0]]-e[n[0]],i=t[n[1]]-e[n[1]];return 180*Math.atan2(i,r)/Math.PI}function M(e,t){return I(t[1],t[0],$e)+I(e[1],e[0],$e)}function q(e,t){return H(t[0],t[1],$e)/H(e[0],e[1],$e)}function D(){this.evEl=Ge,this.evWin=Qe,this.pressed=!1,k.apply(this,arguments)}function W(){this.evEl=Ke,this.evWin=et,k.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function _(){this.evTarget=nt,this.evWin=rt,this.started=!1,k.apply(this,arguments)}function X(e,t){var n=w(e.touches),r=w(e.changedTouches);return t&(ze|He)&&(n=S(n.concat(r),"identifier",!0)),[n,r]}function Y(){this.evTarget=ot,this.targetIds={},k.apply(this,arguments)}function B(e,t){var n=w(e.touches),r=this.targetIds;if(t&(Le|Re)&&1===n.length)return r[n[0].identifier]=!0,[n,n];var i,o,a=w(e.changedTouches),s=[],l=this.target;if(o=n.filter(function(e){return y(e.target,l)}),t===Le)for(i=0;i<o.length;)r[o[i].identifier]=!0,i++;for(i=0;i<a.length;)r[a[i].identifier]&&s.push(a[i]),t&(ze|He)&&delete r[a[i].identifier],i++;return s.length?[S(o.concat(s),"identifier",!0),s]:void 0}function $(){k.apply(this,arguments);var e=d(this.handler,this);this.touch=new Y(this.manager,e),this.mouse=new D(this.manager,e),this.primaryTouch=null,this.lastTouches=[]}function U(e,t){e&Le?(this.primaryTouch=t.changedPointers[0].identifier,G.call(this,t)):e&(ze|He)&&G.call(this,t)}function G(e){var t=e.changedPointers[0];if(t.identifier===this.primaryTouch){var n={x:t.clientX,y:t.clientY};this.lastTouches.push(n);var r=this.lastTouches,i=function(){var e=r.indexOf(n);e>-1&&r.splice(e,1)};setTimeout(i,at)}}function Q(e){for(var t=e.srcEvent.clientX,n=e.srcEvent.clientY,r=0;r<this.lastTouches.length;r++){var i=this.lastTouches[r],o=Math.abs(t-i.x),a=Math.abs(n-i.y);if(o<=st&&a<=st)return!0}return!1}function Z(e,t){this.manager=e,this.set(t)}function J(e){if(b(e,dt))return dt;var t=b(e,ht),n=b(e,gt);return t&&n?dt:t||n?t?ht:gt:b(e,ft)?ft:pt}function K(){if(!ut)return!1;var e={},t=i.CSS&&i.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){e[n]=!t||i.CSS.supports("touch-action",n)}),e}function ee(e){this.options=ge({},this.defaults,e||{}),this.id=C(),this.manager=null,this.options.enable=g(this.options.enable,!0),this.state=vt,this.simultaneous={},this.requireFail=[]}function te(e){return e&wt?"cancel":e&xt?"end":e&bt?"move":e&yt?"start":""}function ne(e){return e==We?"down":e==De?"up":e==Me?"left":e==qe?"right":""}function re(e,t){var n=t.manager;return n?n.get(e):e}function ie(){ee.apply(this,arguments)}function oe(){ie.apply(this,arguments),this.pX=null,this.pY=null}function ae(){ie.apply(this,arguments)}function se(){ee.apply(this,arguments),this._timer=null,this._input=null}function le(){ie.apply(this,arguments)}function ue(){ie.apply(this,arguments)}function ce(){ee.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function pe(e,t){return t=t||{},t.recognizers=g(t.recognizers,pe.defaults.preset),new fe(e,t)}function fe(e,t){this.options=ge({},pe.defaults,t||{}),this.options.inputTarget=this.options.inputTarget||e,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=e,this.input=V(this),this.touchAction=new Z(this,this.options.touchAction),de(this,!0),c(this.options.recognizers,function(e){var t=this.add(new e[0](e[1]));e[2]&&t.recognizeWith(e[2]),e[3]&&t.requireFailure(e[3])},this)}function de(e,t){var n=e.element;if(n.style){var r;c(e.options.cssProps,function(i,o){r=P(n.style,o),t?(e.oldCssProps[r]=n.style[r],n.style[r]=i):n.style[r]=e.oldCssProps[r]||""}),t||(e.oldCssProps={})}}function he(e,t){var n=o.createEvent("Event");n.initEvent(e,!0,!0),n.gesture=t,t.target.dispatchEvent(n)}var ge,me=["","webkit","Moz","MS","ms","o"],ve=o.createElement("div"),ye="function",be=Math.round,xe=Math.abs,Te=Date.now;ge="function"!=typeof Object.assign?function(e){if(e===s||null===e)throw new TypeError("Cannot convert undefined or null to object");for(var t=Object(e),n=1;n<arguments.length;n++){var r=arguments[n];if(r!==s&&null!==r)for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}return t}:Object.assign;var we=p(function(e,t,n){for(var r=Object.keys(t),i=0;i<r.length;)(!n||n&&e[r[i]]===s)&&(e[r[i]]=t[r[i]]),i++;return e},"extend","Use `assign`."),Se=p(function(e,t){return we(e,t,!0)},"merge","Use `assign`."),Pe=1,Ce=/mobile|tablet|ip(ad|hone|od)|android/i,Ee="ontouchstart"in i,ke=P(i,"PointerEvent")!==s,Ve=Ee&&Ce.test(navigator.userAgent),Ae="touch",Ne="pen",Oe="mouse",Fe="kinect",je=25,Le=1,Re=2,ze=4,He=8,Ie=1,Me=2,qe=4,De=8,We=16,_e=Me|qe,Xe=De|We,Ye=_e|Xe,Be=["x","y"],$e=["clientX","clientY"];k.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(E(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&v(this.element,this.evEl,this.domHandler),this.evTarget&&v(this.target,this.evTarget,this.domHandler),this.evWin&&v(E(this.element),this.evWin,this.domHandler)}};var Ue={mousedown:Le,mousemove:Re,mouseup:ze},Ge="mousedown",Qe="mousemove mouseup";f(D,k,{handler:function(e){var t=Ue[e.type];t&Le&&0===e.button&&(this.pressed=!0),t&Re&&1!==e.which&&(t=ze),this.pressed&&(t&ze&&(this.pressed=!1),this.callback(this.manager,t,{pointers:[e],changedPointers:[e],pointerType:Oe,srcEvent:e}))}});var Ze={pointerdown:Le,pointermove:Re,pointerup:ze,pointercancel:He,pointerout:He},Je={2:Ae,3:Ne,4:Oe,5:Fe},Ke="pointerdown",et="pointermove pointerup pointercancel";i.MSPointerEvent&&!i.PointerEvent&&(Ke="MSPointerDown",et="MSPointerMove MSPointerUp MSPointerCancel"),f(W,k,{handler:function(e){var t=this.store,n=!1,r=e.type.toLowerCase().replace("ms",""),i=Ze[r],o=Je[e.pointerType]||e.pointerType,a=o==Ae,s=T(t,e.pointerId,"pointerId");i&Le&&(0===e.button||a)?s<0&&(t.push(e),s=t.length-1):i&(ze|He)&&(n=!0),s<0||(t[s]=e,this.callback(this.manager,i,{pointers:t,changedPointers:[e],pointerType:o,srcEvent:e}),n&&t.splice(s,1))}});var tt={touchstart:Le,touchmove:Re,touchend:ze,touchcancel:He},nt="touchstart",rt="touchstart touchmove touchend touchcancel";f(_,k,{handler:function(e){var t=tt[e.type];if(t===Le&&(this.started=!0),this.started){var n=X.call(this,e,t);t&(ze|He)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:Ae,srcEvent:e})}}});var it={touchstart:Le,touchmove:Re,touchend:ze,touchcancel:He},ot="touchstart touchmove touchend touchcancel";f(Y,k,{handler:function(e){var t=it[e.type],n=B.call(this,e,t);n&&this.callback(this.manager,t,{pointers:n[0],changedPointers:n[1],pointerType:Ae,srcEvent:e})}});var at=2500,st=25;f($,k,{handler:function(e,t,n){var r=n.pointerType==Ae,i=n.pointerType==Oe;if(!(i&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(r)U.call(this,t,n);else if(i&&Q.call(this,n))return;this.callback(e,t,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var lt=P(ve.style,"touchAction"),ut=lt!==s,ct="compute",pt="auto",ft="manipulation",dt="none",ht="pan-x",gt="pan-y",mt=K();Z.prototype={set:function(e){e==ct&&(e=this.compute()),ut&&this.manager.element.style&&mt[e]&&(this.manager.element.style[lt]=e),this.actions=e.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var e=[];return c(this.manager.recognizers,function(t){h(t.options.enable,[t])&&(e=e.concat(t.getTouchAction()))}),J(e.join(" "))},preventDefaults:function(e){var t=e.srcEvent,n=e.offsetDirection;if(this.manager.session.prevented)return void t.preventDefault();var r=this.actions,i=b(r,dt)&&!mt[dt],o=b(r,gt)&&!mt[gt],a=b(r,ht)&&!mt[ht];if(i){var s=1===e.pointers.length,l=e.distance<2,u=e.deltaTime<250;if(s&&l&&u)return}return a&&o?void 0:i||o&&n&_e||a&&n&Xe?this.preventSrc(t):void 0},preventSrc:function(e){this.manager.session.prevented=!0,e.preventDefault()}};var vt=1,yt=2,bt=4,xt=8,Tt=xt,wt=16,St=32;ee.prototype={defaults:{},set:function(e){return ge(this.options,e),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(e){if(u(e,"recognizeWith",this))return this;var t=this.simultaneous;return e=re(e,this),t[e.id]||(t[e.id]=e,e.recognizeWith(this)),this},dropRecognizeWith:function(e){return u(e,"dropRecognizeWith",this)?this:(e=re(e,this),delete this.simultaneous[e.id],this)},requireFailure:function(e){if(u(e,"requireFailure",this))return this;var t=this.requireFail;return e=re(e,this),T(t,e)===-1&&(t.push(e),e.requireFailure(this)),this},dropRequireFailure:function(e){if(u(e,"dropRequireFailure",this))return this;e=re(e,this);var t=T(this.requireFail,e);return t>-1&&this.requireFail.splice(t,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(e){return!!this.simultaneous[e.id]},emit:function(e){function t(t){n.manager.emit(t,e)}var n=this,r=this.state;r<xt&&t(n.options.event+te(r)),t(n.options.event),e.additionalEvent&&t(e.additionalEvent),r>=xt&&t(n.options.event+te(r))},tryEmit:function(e){if(this.canEmit())return this.emit(e);this.state=St},canEmit:function(){for(var e=0;e<this.requireFail.length;){if(!(this.requireFail[e].state&(St|vt)))return!1;e++}return!0},recognize:function(e){var t=ge({},e);if(!h(this.options.enable,[this,t]))return this.reset(),void(this.state=St);this.state&(Tt|wt|St)&&(this.state=vt),this.state=this.process(t),this.state&(yt|bt|xt|wt)&&this.tryEmit(t)},process:function(e){},getTouchAction:function(){},reset:function(){}},f(ie,ee,{defaults:{pointers:1},attrTest:function(e){var t=this.options.pointers;return 0===t||e.pointers.length===t},process:function(e){var t=this.state,n=e.eventType,r=t&(yt|bt),i=this.attrTest(e);return r&&(n&He||!i)?t|wt:r||i?n&ze?t|xt:t&yt?t|bt:yt:St}}),f(oe,ie,{defaults:{event:"pan",threshold:10,pointers:1,direction:Ye},getTouchAction:function(){var e=this.options.direction,t=[];return e&_e&&t.push(gt),e&Xe&&t.push(ht),t},directionTest:function(e){var t=this.options,n=!0,r=e.distance,i=e.direction,o=e.deltaX,a=e.deltaY;return i&t.direction||(t.direction&_e?(i=0===o?Ie:o<0?Me:qe,n=o!=this.pX,r=Math.abs(e.deltaX)):(i=0===a?Ie:a<0?De:We,n=a!=this.pY,r=Math.abs(e.deltaY))),e.direction=i,n&&r>t.threshold&&i&t.direction},attrTest:function(e){return ie.prototype.attrTest.call(this,e)&&(this.state&yt||!(this.state&yt)&&this.directionTest(e))},emit:function(e){this.pX=e.deltaX,this.pY=e.deltaY;var t=ne(e.direction);t&&(e.additionalEvent=this.options.event+t),this._super.emit.call(this,e)}}),f(ae,ie,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[dt]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.scale-1)>this.options.threshold||this.state&yt)},emit:function(e){if(1!==e.scale){var t=e.scale<1?"in":"out";e.additionalEvent=this.options.event+t}this._super.emit.call(this,e)}}),f(se,ee,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[pt]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,r=e.distance<t.threshold,i=e.deltaTime>t.time;if(this._input=e,!r||!n||e.eventType&(ze|He)&&!i)this.reset();else if(e.eventType&Le)this.reset(),this._timer=l(function(){this.state=Tt,this.tryEmit()},t.time,this);else if(e.eventType&ze)return Tt;return St},reset:function(){clearTimeout(this._timer)},emit:function(e){this.state===Tt&&(e&&e.eventType&ze?this.manager.emit(this.options.event+"up",e):(this._input.timeStamp=Te(),this.manager.emit(this.options.event,this._input)))}}),f(le,ie,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[dt]},attrTest:function(e){return this._super.attrTest.call(this,e)&&(Math.abs(e.rotation)>this.options.threshold||this.state&yt)}}),f(ue,ie,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:_e|Xe,pointers:1},getTouchAction:function(){return oe.prototype.getTouchAction.call(this)},attrTest:function(e){var t,n=this.options.direction;return n&(_e|Xe)?t=e.overallVelocity:n&_e?t=e.overallVelocityX:n&Xe&&(t=e.overallVelocityY),this._super.attrTest.call(this,e)&&n&e.offsetDirection&&e.distance>this.options.threshold&&e.maxPointers==this.options.pointers&&xe(t)>this.options.velocity&&e.eventType&ze},emit:function(e){var t=ne(e.offsetDirection);t&&this.manager.emit(this.options.event+t,e),this.manager.emit(this.options.event,e)}}),f(ce,ee,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ft]},process:function(e){var t=this.options,n=e.pointers.length===t.pointers,r=e.distance<t.threshold,i=e.deltaTime<t.time;if(this.reset(),e.eventType&Le&&0===this.count)return this.failTimeout();if(r&&i&&n){if(e.eventType!=ze)return this.failTimeout();var o=!this.pTime||e.timeStamp-this.pTime<t.interval,a=!this.pCenter||H(this.pCenter,e.center)<t.posThreshold;this.pTime=e.timeStamp,this.pCenter=e.center,a&&o?this.count+=1:this.count=1,this._input=e;if(0===this.count%t.taps)return this.hasRequireFailures()?(this._timer=l(function(){this.state=Tt,this.tryEmit()},t.interval,this),yt):Tt}return St},failTimeout:function(){return this._timer=l(function(){this.state=St},this.options.interval,this),St},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==Tt&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),pe.VERSION="2.0.7",pe.defaults={domEvents:!1,touchAction:ct,enable:!0,inputTarget:null,inputClass:null,preset:[[le,{enable:!1}],[ae,{enable:!1},["rotate"]],[ue,{direction:_e}],[oe,{direction:_e},["swipe"]],[ce],[ce,{event:"doubletap",taps:2},["tap"]],[se]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Pt=2;fe.prototype={set:function(e){return ge(this.options,e),e.touchAction&&this.touchAction.update(),e.inputTarget&&(this.input.destroy(),this.input.target=e.inputTarget,this.input.init()),this},stop:function(e){this.session.stopped=e?Pt:1},recognize:function(e){var t=this.session;if(!t.stopped){this.touchAction.preventDefaults(e);var n,r=this.recognizers,i=t.curRecognizer;(!i||i&&i.state&Tt)&&(i=t.curRecognizer=null);for(var o=0;o<r.length;)n=r[o],t.stopped===Pt||i&&n!=i&&!n.canRecognizeWith(i)?n.reset():n.recognize(e),!i&&n.state&(yt|bt|xt)&&(i=t.curRecognizer=n),o++}},get:function(e){if(e instanceof ee)return e;for(var t=this.recognizers,n=0;n<t.length;n++)if(t[n].options.event==e)return t[n];return null},add:function(e){if(u(e,"add",this))return this;var t=this.get(e.options.event);return t&&this.remove(t),this.recognizers.push(e),e.manager=this,this.touchAction.update(),e},remove:function(e){if(u(e,"remove",this))return this;if(e=this.get(e)){var t=this.recognizers,n=T(t,e);n!==-1&&(t.splice(n,1),this.touchAction.update())}return this},on:function(e,t){if(e!==s&&t!==s){var n=this.handlers;return c(x(e),function(e){n[e]=n[e]||[],n[e].push(t)}),this}},off:function(e,t){if(e!==s){var n=this.handlers;return c(x(e),function(e){t?n[e]&&n[e].splice(T(n[e],t),1):delete n[e]}),this}},emit:function(e,t){this.options.domEvents&&he(e,t);var n=this.handlers[e]&&this.handlers[e].slice();if(n&&n.length){t.type=e,t.preventDefault=function(){t.srcEvent.preventDefault()};for(var r=0;r<n.length;)n[r](t),r++}},destroy:function(){this.element&&de(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},ge(pe,{INPUT_START:Le,INPUT_MOVE:Re,INPUT_END:ze,INPUT_CANCEL:He,STATE_POSSIBLE:vt,STATE_BEGAN:yt,STATE_CHANGED:bt,STATE_ENDED:xt,STATE_RECOGNIZED:Tt,STATE_CANCELLED:wt,STATE_FAILED:St,DIRECTION_NONE:Ie,DIRECTION_LEFT:Me,DIRECTION_RIGHT:qe,DIRECTION_UP:De,DIRECTION_DOWN:We,DIRECTION_HORIZONTAL:_e,DIRECTION_VERTICAL:Xe,DIRECTION_ALL:Ye,Manager:fe,Input:k,TouchAction:Z,TouchInput:Y,MouseInput:D,PointerEventInput:W,TouchMouseInput:$,SingleTouchInput:_,Recognizer:ee,AttrRecognizer:ie,Tap:ce,Pan:oe,Swipe:ue,Pinch:ae,Rotate:le,Press:se,on:m,off:v,each:c,merge:Se,extend:we,assign:ge,inherit:f,bindFn:d,prefixed:P}),(void 0!==i?i:"undefined"!=typeof self?self:{}).Hammer=pe,r=function(){return pe}.call(t,n,t,e),r!==s&&(e.exports=r)}(window,document,"Hammer")},function(e,t,n){n(9);var r=n(8)(null,null,null,null);e.exports=r.exports},function(e,t){e.exports=function(e,t,n,r){var i,o=e=e||{},a=typeof e.default;"object"!==a&&"function"!==a||(i=e,o=e.default);var s="function"==typeof o?o.options:o;if(t&&(s.render=t.render,s.staticRenderFns=t.staticRenderFns),n&&(s._scopeId=n),r){var l=Object.create(s.computed||null);Object.keys(r).forEach(function(e){var t=r[e];l[e]=function(){return t}}),s.computed=l}return{esModule:i,exports:o,options:s}}},function(e,t,n){var r=n(4);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);n(10)("c6dbf2da",r,!0)},function(e,t,n){function r(e){for(var t=0;t<e.length;t++){var n=e[t],r=c[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(a(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{for(var o=[],i=0;i<n.parts.length;i++)o.push(a(n.parts[i]));c[n.id]={id:n.id,refs:1,parts:o}}}}function i(e,t){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=o[0],s=o[1],l=o[2],u=o[3],c={css:s,media:l,sourceMap:u};r[a]?(c.id=e+":"+r[a].parts.length,r[a].parts.push(c)):(c.id=e+":0",n.push(r[a]={id:a,parts:[c]}))}return n}function o(){var e=document.createElement("style");return e.type="text/css",p.appendChild(e),e}function a(e){var t,n,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]'),i=null!=r;if(i&&h)return g;if(m){var a=d++;r=f||(f=o()),t=s.bind(null,r,a,!1),n=s.bind(null,r,a,!0)}else r=r||o(),t=l.bind(null,r),n=function(){r.parentNode.removeChild(r)};return i||t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}function s(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function l(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i=n(11),c={},p=u&&(document.head||document.getElementsByTagName("head")[0]),f=null,d=0,h=!1,g=function(){},m="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n){h=n;var o=i(e,t);return r(o),function(t){for(var n=[],a=0;a<o.length;a++){var s=o[a],l=c[s.id];l.refs--,n.push(l)}t?(o=i(e,t),r(o)):o=[];for(var a=0;a<n.length;a++){var l=n[a];if(0===l.refs){for(var u=0;u<l.parts.length;u++)l.parts[u]();delete c[l.id]}}}};var v=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=o[0],s=o[1],l=o[2],u=o[3],c={id:e+":"+i,css:s,media:l,sourceMap:u};r[a]?r[a].parts.push(c):n.push(r[a]={id:a,parts:[c]})}return n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),i={install:function(e,t){n.i(r.a)(e,t)}};"undefined"!=typeof window&&window.Vue&&(window.Toasted=i),t.default=i}])});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js"), __webpack_require__("./node_modules/jquery/dist/jquery.js"), __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/app.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__("./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_scrollTo__ = __webpack_require__("./node_modules/vue-scrollTo/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_scrollTo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_scrollTo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_sweetalert__ = __webpack_require__("./node_modules/vue-sweetalert/build/vue-sweetalert.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_sweetalert___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_sweetalert__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_toasted__ = __webpack_require__("./node_modules/vue-toasted/dist/vue-toasted.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vue_toasted___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_vue_toasted__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes__ = __webpack_require__("./resources/assets/js/routes.js");
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

__webpack_require__("./resources/assets/js/vendor.js");
__webpack_require__("./resources/assets/js/semantic-ui-tablesort.js");
__webpack_require__("./resources/assets/js/app/custom.js");
window.NProgress = __webpack_require__("./node_modules/nprogress/nprogress.js");
NProgress.configure({ showSpinner: false, trickleSpeed: 1000, easing: 'ease', speed: 700, minimum: 0.3 });

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('checkout', __webpack_require__("./resources/assets/js/components/checkout.vue"));


Vue.use(__WEBPACK_IMPORTED_MODULE_0_vue_router__["a" /* default */]);

// Vue ScrollTo - https://github.com/rigor789/vue-scrollto

Vue.use(__WEBPACK_IMPORTED_MODULE_1_vue_scrollTo___default.a);

// Vue Sweet alert - https://github.com/lishengzxc/vue-sweetalert

Vue.use(__WEBPACK_IMPORTED_MODULE_2_vue_sweetalert___default.a);

// Toast Notification - https://github.com/shakee93/vue-toasted

Vue.use(__WEBPACK_IMPORTED_MODULE_3_vue_toasted___default.a, { position: 'bottom-right', duration: 3000 });

// Register a global custom directive called v-tablesort
Vue.directive('tablesort', {
  inserted: function inserted(el) {
    $(el).tablesort();
  }
});

// Register a global custom directive called v-dropdown
Vue.directive('modal', {
  inserted: function inserted(el) {
    $(el).modal('setting', { detachable: false, autofocus: true, closable: false, transition: 'fade' }).modal('show').addClass('scrolling active');
  }
});

// Filter to display numerical digits
Vue.filter('number', function (value) {
  return (value / 1).toLocaleString('en', { minimumFractionDigits: 3 });
});



// Load the component where id = 'app'
window.onload = function () {
  if (document.getElementById("app")) {
    var app = new Vue({
      el: '#app',
      router: __WEBPACK_IMPORTED_MODULE_4__routes__["a" /* default */]
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/app/custom.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$(document).ready(function () {
    $('.ui.checkbox').checkbox();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/components/checkout.vue":
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")(
  /* script */
  __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/checkout.vue"),
  /* template */
  __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-71f34542\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/checkout.vue"),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/vinayak/Development/colorpay/resources/assets/js/components/checkout.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] checkout.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-71f34542", Component.options)
  } else {
    hotAPI.reload("data-v-71f34542", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/home.vue":
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")(
  /* script */
  __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/home.vue"),
  /* template */
  __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-f03a0e10\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/home.vue"),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/vinayak/Development/colorpay/resources/assets/js/components/home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f03a0e10", Component.options)
  } else {
    hotAPI.reload("data-v-f03a0e10", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/payments.vue":
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")(
  /* script */
  __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/payments.vue"),
  /* template */
  __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-5343d3c6\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/payments.vue"),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/vinayak/Development/colorpay/resources/assets/js/components/payments.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] payments.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5343d3c6", Component.options)
  } else {
    hotAPI.reload("data-v-5343d3c6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/users/create.vue":
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-51b46bfc\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/create.vue")

var Component = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")(
  /* script */
  __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/users/create.vue"),
  /* template */
  __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-51b46bfc\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/users/create.vue"),
  /* scopeId */
  "data-v-51b46bfc",
  /* cssModules */
  null
)
Component.options.__file = "/Users/vinayak/Development/colorpay/resources/assets/js/components/users/create.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] create.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51b46bfc", Component.options)
  } else {
    hotAPI.reload("data-v-51b46bfc", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/users/edit.vue":
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-22af7c0a\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/edit.vue")

var Component = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")(
  /* script */
  __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/users/edit.vue"),
  /* template */
  __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-22af7c0a\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/users/edit.vue"),
  /* scopeId */
  "data-v-22af7c0a",
  /* cssModules */
  null
)
Component.options.__file = "/Users/vinayak/Development/colorpay/resources/assets/js/components/users/edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] edit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-22af7c0a", Component.options)
  } else {
    hotAPI.reload("data-v-22af7c0a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/users/index.vue":
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__("./node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-74f7bf02\",\"scoped\":true,\"hasInlineConfig\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./resources/assets/js/components/users/index.vue")

var Component = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")(
  /* script */
  __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/users/index.vue"),
  /* template */
  __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-74f7bf02\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/users/index.vue"),
  /* scopeId */
  "data-v-74f7bf02",
  /* cssModules */
  null
)
Component.options.__file = "/Users/vinayak/Development/colorpay/resources/assets/js/components/users/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-74f7bf02", Component.options)
  } else {
    hotAPI.reload("data-v-74f7bf02", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/components/users/show.vue":
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__("./node_modules/vue-loader/lib/component-normalizer.js")(
  /* script */
  __webpack_require__("./node_modules/babel-loader/lib/index.js?{\"cacheDirectory\":true,\"presets\":[[\"env\",{\"modules\":false,\"targets\":{\"browsers\":[\"> 2%\"],\"uglify\":true}}]]}!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./resources/assets/js/components/users/show.vue"),
  /* template */
  __webpack_require__("./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-a1ff9106\"}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./resources/assets/js/components/users/show.vue"),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/vinayak/Development/colorpay/resources/assets/js/components/users/show.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] show.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a1ff9106", Component.options)
  } else {
    hotAPI.reload("data-v-a1ff9106", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ "./resources/assets/js/routes.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_router__ = __webpack_require__("./node_modules/vue-router/dist/vue-router.esm.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_checkout_vue__ = __webpack_require__("./resources/assets/js/components/checkout.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_checkout_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_checkout_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_home_vue__ = __webpack_require__("./resources/assets/js/components/home.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_home_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_payments_vue__ = __webpack_require__("./resources/assets/js/components/payments.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_payments_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_payments_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_users_index_vue__ = __webpack_require__("./resources/assets/js/components/users/index.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_users_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_users_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_users_create_vue__ = __webpack_require__("./resources/assets/js/components/users/create.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_users_create_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_users_create_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_users_edit_vue__ = __webpack_require__("./resources/assets/js/components/users/edit.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_users_edit_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_users_edit_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_users_show_vue__ = __webpack_require__("./resources/assets/js/components/users/show.vue");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_users_show_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_users_show_vue__);










var routes = [{
  path: '/',
  name: 'checkout',
  component: __WEBPACK_IMPORTED_MODULE_1__components_checkout_vue___default.a,
  props: true
}, {
  path: '/home',
  name: 'home',
  component: __WEBPACK_IMPORTED_MODULE_2__components_home_vue___default.a,
  props: true
}, {
  path: '/payments',
  name: 'payments',
  component: __WEBPACK_IMPORTED_MODULE_3__components_payments_vue___default.a,
  props: true
}, {
  path: '/users',
  name: 'users.index',
  component: __WEBPACK_IMPORTED_MODULE_4__components_users_index_vue___default.a,
  props: true
}, {
  path: '/users/create',
  name: 'users.create',
  component: __WEBPACK_IMPORTED_MODULE_5__components_users_create_vue___default.a,
  props: true
}, {
  path: '/users/:id',
  name: 'users.show',
  component: __WEBPACK_IMPORTED_MODULE_7__components_users_show_vue___default.a,
  props: true
}];

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0_vue_router__["a" /* default */]({
  mode: 'history',
  routes: routes
}));

// Important To-DO
// https://forum.vuejs.org/t/pass-props-for-different-components-via-one-router-view/1489/2

/***/ }),

/***/ "./resources/assets/js/semantic-ui-tablesort.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {/*
  A simple, lightweight jQuery plugin for creating sortable tables.
  https://github.com/kylefox/jquery-tablesort
  Version 0.0.11
*/

(function ($) {
  $.tablesort = function ($table, settings) {
    var self = this;
    this.$table = $table;
    this.$thead = this.$table.find('thead');
    this.settings = $.extend({}, $.tablesort.defaults, settings);
    this.$sortCells = this.$thead.length > 0 ? this.$thead.find('th:not(.no-sort)') : this.$table.find('th:not(.no-sort)');
    this.$sortCells.on('click.tablesort', function () {
      self.sort($(this));
    });
    this.index = null;
    this.$th = null;
    this.direction = null;
  };

  $.tablesort.prototype = {

    sort: function sort(th, direction) {
      var start = new Date(),
          self = this,
          table = this.$table,
          rowsContainer = table.find('tbody').length > 0 ? table.find('tbody') : table,
          rows = rowsContainer.find('tr').has('td, th'),
          cells = rows.find(':nth-child(' + (th.index() + 1) + ')').filter('td, th'),
          sortBy = th.data().sortBy,
          sortedMap = [];

      var unsortedValues = cells.map(function (idx, cell) {
        if (sortBy) return typeof sortBy === 'function' ? sortBy($(th), $(cell), self) : sortBy;
        return $(this).data().sortValue != null ? $(this).data().sortValue : $(this).text();
      });
      if (unsortedValues.length === 0) return;

      //click on a different column
      if (this.index !== th.index()) {
        this.direction = 'asc';
        this.index = th.index();
      } else if (direction !== 'asc' && direction !== 'desc') this.direction = this.direction === 'asc' ? 'desc' : 'asc';else this.direction = direction;

      direction = this.direction == 'asc' ? 1 : -1;

      self.$table.trigger('tablesort:start', [self]);
      self.log("Sorting by " + this.index + ' ' + this.direction);

      // Try to force a browser redraw
      self.$table.css("display");
      // Run sorting asynchronously on a timeout to force browser redraw after
      // `tablesort:start` callback. Also avoids locking up the browser too much.
      setTimeout(function () {
        self.$sortCells.removeClass(self.settings.asc + ' ' + self.settings.desc);
        for (var i = 0, length = unsortedValues.length; i < length; i++) {
          sortedMap.push({
            index: i,
            cell: cells[i],
            row: rows[i],
            value: unsortedValues[i]
          });
        }

        sortedMap.sort(function (a, b) {
          return self.settings.compare(a.value, b.value) * direction;
        });

        $.each(sortedMap, function (i, entry) {
          rowsContainer.append(entry.row);
        });

        th.addClass(self.settings[self.direction]);

        self.log('Sort finished in ' + (new Date().getTime() - start.getTime()) + 'ms');
        self.$table.trigger('tablesort:complete', [self]);
        //Try to force a browser redraw
        self.$table.css("display");
      }, unsortedValues.length > 2000 ? 200 : 10);
    },

    log: function log(msg) {
      if (($.tablesort.DEBUG || this.settings.debug) && console && console.log) {
        console.log('[tablesort] ' + msg);
      }
    },

    destroy: function destroy() {
      this.$sortCells.off('click.tablesort');
      this.$table.data('tablesort', null);
      return null;
    }

  };

  $.tablesort.DEBUG = false;

  $.tablesort.defaults = {
    debug: $.tablesort.DEBUG,
    asc: 'sorted ascending',
    desc: 'sorted descending',
    compare: function compare(a, b) {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    }
  };

  $.fn.tablesort = function (settings) {
    var table, sortable, previous;
    return this.each(function () {
      table = $(this);
      previous = table.data('tablesort');
      if (previous) {
        previous.destroy();
      }
      table.data('tablesort', new $.tablesort(table, settings));
    });
  };
})(window.Zepto || __webpack_provided_window_dot_jQuery);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ "./resources/assets/js/vendor.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__webpack_provided_window_dot_jQuery) {
window._ = __webpack_require__("./node_modules/lodash/lodash.js");

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

window.$ = __webpack_provided_window_dot_jQuery = __webpack_require__("./node_modules/jquery/dist/jquery.js");

__webpack_require__("./node_modules/semantic-ui/dist/semantic.min.js");

window.moment = __webpack_require__("./node_modules/moment/moment.js");

window.uuid = __webpack_require__("./node_modules/uuid/v4.js");

/**
 * Vue is a modern JavaScript library for building interactive web interfaces
 * using reactive data binding and reusable components. Vue's API is clean
 * and simple, leaving you to focus on building your next great project.
 */

window.Vue = __webpack_require__("./node_modules/vue/dist/vue.common.js");

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = __webpack_require__("./node_modules/axios/dist/axios.js");

window.axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'

};

// window.axios.defaults.headers.common['X-CSRF-TOKEN'] = Colorpay.csrfToken;

// Vue.http.interceptors.push((request, next) => {
// 	request.headers.set('X-CSRF-TOKEN', Colorpay.csrfToken);

// 	next();
// });

Vue.prototype.$http = axios;

/** 
 * This will enable us to use lodash within vue interpolations.
 *  see: https://github.com/JeffreyWay/laravel-mix/issues/417#issuecomment-284460383
 */

Vue.prototype._ = _;
Vue.prototype.moment = moment;
/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from "laravel-echo"

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/jquery/dist/jquery.js")))

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./resources/assets/js/app.js");


/***/ })

},[1]);