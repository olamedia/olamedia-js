;(function(obj, window, document, undefined){
    var fextend = function(f, a){
        f.prototype = Object.create(this.prototype);
        for (var k in a) {
            Object.defineProperty(f.prototype, k, Object.getOwnPropertyDescriptor(a, k));
        }
        f.prototype.constructor = f;
        f.extend = extend;
        f.fextend = fextend;
        return f;
    }, extend = function(a){
        var f = function(){
            if (this.init){
                this.init.apply(this, arguments);
            }
        };
        return fextend.call(this, f, a);
    };
    var zero = window['zero'] || {
        isUndefined: function(v){
            return 'undefined' === typeof v;
        },
        Class: extend.call(Function, {}),
        uuidv4: function(){
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        },
        localStorage: window.localStorage || null,
        WebSocket: window.WebSocket || window.MozWebSocket || null,
        JSON: window.JSON || null,
        cookie: {
            get: function(n){
                return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(n).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
            }
        },
        eon: function(el, type, listener){
            if (window.addEventListener) {
                el.addEventListener(type, listener);
            }else{ //IE8
                el.attachEvent('on' + type, listener);
            }
            return this;
        },
        on: function(type, listener) {
            return zero.eon(window, type, listener);
        },
        don: function(type, listener) {
            return zero.eon(document, type, listener);
        },
        microtime: function() {
            return (new Date()).getTime() / 1000;
        },
        mtime: function() {
            return Math.round(zero.microtime()*1000)/1000;
        },
        time: function(){
	        return Math.round(zero.microtime());
        }
    };
    obj['zero'] = zero;

})(this, window, window.document);
