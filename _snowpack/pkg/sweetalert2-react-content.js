import { r as react } from './common/index-d0e3fe20.js';
import { r as reactDom } from './common/index-d471eedc.js';
import './common/_commonjsHelpers-eb5a497e.js';

/** @preserve
  * package: sweetalert2-react-content v3.3.1
  * file: dist/sweetalert2-react-content.es.js
  * homepage: https://github.com/sweetalert2/sweetalert2-react-content#readme
  * license: MIT
  **/

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

var mounts = [{
  key: 'title',
  getter: function getter(swal) {
    return swal.getTitle();
  }
}, {
  key: 'html',
  getter: function getter(swal) {
    return swal.getHtmlContainer();
  }
}, {
  key: 'confirmButtonText',
  getter: function getter(swal) {
    return swal.getConfirmButton();
  }
}, {
  key: 'denyButtonText',
  getter: function getter(swal) {
    return swal.getDenyButton();
  }
}, {
  key: 'cancelButtonText',
  getter: function getter(swal) {
    return swal.getCancelButton();
  }
}, {
  key: 'footer',
  getter: function getter(swal) {
    return swal.getFooter();
  }
}, {
  key: 'closeButtonHtml',
  getter: function getter(swal) {
    return swal.getCloseButton();
  }
}, {
  key: 'iconHtml',
  getter: function getter(swal) {
    return swal.getIcon().querySelector('.swal2-icon-content');
  }
}];

var noop = function noop() {}; // eslint-disable-line @typescript-eslint/no-empty-function


var error = function error(message) {
  return new Error("sweetalert2-react-content: ".concat(message));
};

function withReactContent(ParentSwal) {
  return /*#__PURE__*/function (_ParentSwal) {
    _inherits(_class, _ParentSwal);

    var _super = _createSuper(_class);

    function _class() {
      _classCallCheck(this, _class);

      return _super.apply(this, arguments);
    }

    _createClass(_class, [{
      key: "_main",
      value: function _main(params) {
        params = Object.assign({}, params);
        mounts.forEach(function (_ref) {
          var key = _ref.key,
              getter = _ref.getter;

          if ( /*#__PURE__*/react.isValidElement(params[key])) {
            var reactElement = params[key];
            params[key] = ' ';
            var domElement;
            var openHookName = params.onOpen || !ParentSwal.isValidParameter('didOpen') ? 'onOpen' : 'didOpen'; // support legacy onOpen hook

            var superOpenHook = params[openHookName] || noop;

            params[openHookName] = function (element) {
              domElement = getter(ParentSwal);
              domElement && reactDom.render(reactElement, domElement);
              superOpenHook(element);
            };

            var destroyHookName = params.onDestroy || !ParentSwal.isValidParameter('didDestroy') ? 'onDestroy' : 'didDestroy'; // support legacy onDestroy hook

            var superDestroyHook = params[destroyHookName] || noop;

            params[destroyHookName] = function (element) {
              superDestroyHook(element);

              if (domElement) {
                reactDom.unmountComponentAtNode(domElement);
              }
            };
          }
        });
        return _get(_getPrototypeOf(_class.prototype), "_main", this).call(this, params);
      }
    }, {
      key: "update",
      value: function update() {
        throw error('Swal.update() is not yet supported. See https://github.com/sweetalert2/sweetalert2-react-content/issues/73');
      }
    }], [{
      key: "argsToParams",
      value: function argsToParams(args) {
        if ( /*#__PURE__*/react.isValidElement(args[0]) || /*#__PURE__*/react.isValidElement(args[1])) {
          var params = {};
          ['title', 'html', 'icon'].forEach(function (name, index) {
            if (args[index] !== undefined) {
              params[name] = args[index];
            }
          });
          return params;
        } else {
          return ParentSwal.argsToParams(args);
        }
      }
    }]);

    return _class;
  }(ParentSwal);
}

export default withReactContent;
