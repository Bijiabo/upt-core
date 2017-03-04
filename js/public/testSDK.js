/**
 * Created by huchunbo on 16/9/8.
 */
var requirejs, require, define, DA = {};
!
    function(global) {
        function isFunction(e) {
            return "[object Function]" === ostring.call(e)
        }
        function isArray(e) {
            return "[object Array]" === ostring.call(e)
        }
        function each(e, t) {
            if (e) {
                var i;
                for (i = 0; i < e.length && (!e[i] || !t(e[i], i, e)); i += 1);
            }
        }
        function eachReverse(e, t) {
            if (e) {
                var i;
                for (i = e.length - 1; i > -1 && (!e[i] || !t(e[i], i, e)); i -= 1);
            }
        }
        function hasProp(e, t) {
            return hasOwn.call(e, t)
        }
        function getOwn(e, t) {
            return hasProp(e, t) && e[t]
        }
        function eachProp(e, t) {
            var i;
            for (i in e) if (hasProp(e, i) && t(e[i], i)) break
        }
        function mixin(e, t, i, n) {
            return t && eachProp(t, function(t, o) {
                (i || !hasProp(e, o)) && (!n || "object" != typeof t || !t || isArray(t) || isFunction(t) || t instanceof RegExp ? e[o] = t : (e[o] || (e[o] = {}), mixin(e[o], t, i, n)))
            }), e
        }
        function bind(e, t) {
            return function() {
                return t.apply(e, arguments)
            }
        }
        function scripts() {
            return document.getElementsByTagName("script")
        }
        function defaultOnError(e) {
            throw e
        }
        function getGlobal(e) {
            if (!e) return e;
            var t = global;
            return each(e.split("."), function(e) {
                t = t[e]
            }), t
        }
        function makeError(e, t, i, n) {
            var o = new Error(t + "\nhttp://requirejs.org/docs/errors.html#" + e);
            return o.requireType = e, o.requireModules = n, i && (o.originalError = i), o
        }
        function newContext(e) {
            function t(e) {
                var t, i;
                for (t = 0; t < e.length; t++) if (i = e[t], "." === i) e.splice(t, 1), t -= 1;
                else if (".." === i) {
                    if (0 === t || 1 === t && ".." === e[2] || ".." === e[t - 1]) continue;
                    t > 0 && (e.splice(t - 1, 2), t -= 2)
                }
            }
            function i(e, i, n) {
                var o, s, a, r, l, c, u, d, h, f, p, m, v = i && i.split("/"),
                    g = S.map,
                    y = g && g["*"];
                if (e && (e = e.split("/"), u = e.length - 1, S.nodeIdCompat && jsSuffixRegExp.test(e[u]) && (e[u] = e[u].replace(jsSuffixRegExp, "")), "." === e[0].charAt(0) && v && (m = v.slice(0, v.length - 1), e = m.concat(e)), t(e), e = e.join("/")), n && g && (v || y)) {
                    a = e.split("/");
                    e: for (r = a.length; r > 0; r -= 1) {
                        if (c = a.slice(0, r).join("/"), v) for (l = v.length; l > 0; l -= 1) if (s = getOwn(g, v.slice(0, l).join("/")), s && (s = getOwn(s, c))) {
                            d = s, h = r;
                            break e
                        }!f && y && getOwn(y, c) && (f = getOwn(y, c), p = r)
                    }!d && f && (d = f, h = p),
                    d && (a.splice(0, h, d), e = a.join("/"))
                }
                return o = getOwn(S.pkgs, e), o ? o : e
            }
            function n(e) {
                isBrowser && each(scripts(), function(t) {
                    return t.getAttribute("data-requiremodule") === e && t.getAttribute("data-requirecontext") === w.contextName ? (t.parentNode.removeChild(t), !0) : void 0
                })
            }
            function o(e) {
                var t = getOwn(S.paths, e);
                return t && isArray(t) && t.length > 1 ? (t.shift(), w.require.undef(e), w.makeRequire(null, {
                    skipMap: !0
                })([e]), !0) : void 0
            }
            function s(e) {
                var t, i = e ? e.indexOf("!") : -1;
                return i > -1 && (t = e.substring(0, i), e = e.substring(i + 1, e.length)), [t, e]
            }
            function a(e, t, n, o) {
                var a, r, l, c, u = null,
                    d = t ? t.name : null,
                    h = e,
                    f = !0,
                    p = "";
                return e || (f = !1, e = "_@r" + (I += 1)), c = s(e), u = c[0], e = c[1], u && (u = i(u, d, o), r = getOwn(T, u)), e && (u ? p = r && r.normalize ? r.normalize(e, function(e) {
                    return i(e, d, o)
                }) : -1 === e.indexOf("!") ? i(e, d, o) : e : (p = i(e, d, o), c = s(p), u = c[0], p = c[1], n = !0, a = w.nameToUrl(p))), l = !u || r || n ? "" : "_unnormalized" + (N += 1), {
                    prefix: u,
                    name: p,
                    parentMap: t,
                    unnormalized: !! l,
                    url: a,
                    originalName: h,
                    isDefine: f,
                    id: (u ? u + "!" + p : p) + l
                }
            }
            function r(e) {
                var t = e.id,
                    i = getOwn(D, t);
                return i || (i = D[t] = new w.Module(e)), i
            }
            function l(e, t, i) {
                var n = e.id,
                    o = getOwn(D, n);
                !hasProp(T, n) || o && !o.defineEmitComplete ? (o = r(e), o.error && "error" === t ? i(o.error) : o.on(t, i)) : "defined" === t && i(T[n])
            }
            function c(e, t) {
                var i = e.requireModules,
                    n = !1;
                t ? t(e) : (each(i, function(t) {
                    var i = getOwn(D, t);
                    i && (i.error = e, i.events.error && (n = !0, i.emit("error", e)))
                }), n || req.onError(e))
            }
            function u() {
                globalDefQueue.length && (apsp.apply(_, [_.length, 0].concat(globalDefQueue)), globalDefQueue = [])
            }
            function d(e) {
                delete D[e], delete E[e]
            }
            function h(e, t, i) {
                var n = e.map.id;
                e.error ? e.emit("error", e.error) : (t[n] = !0, each(e.depMaps, function(n, o) {
                    var s = n.id,
                        a = getOwn(D, s);
                    !a || e.depMatched[o] || i[s] || (getOwn(t, s) ? (e.defineDep(o, T[s]), e.check()) : h(a, t, i))
                }), i[n] = !0)
            }
            function f() {
                var e, t, i = 1e3 * S.waitSeconds,
                    s = i && w.startTime + i < (new Date).getTime(),
                    a = [],
                    r = [],
                    l = !1,
                    u = !0;
                if (!y) {
                    if (y = !0, eachProp(E, function(e) {
                            var i = e.map,
                                c = i.id;
                            if (e.enabled && (i.isDefine || r.push(e), !e.error)) if (!e.inited && s) o(c) ? (t = !0, l = !0) : (a.push(c), n(c));
                            else if (!e.inited && e.fetched && i.isDefine && (l = !0, !i.prefix)) return u = !1
                        }), s && a.length) return e = makeError("timeout", "Load timeout for modules: " + a, null, a), e.contextName = w.contextName, c(e);
                    u && each(r, function(e) {
                        h(e, {}, {})
                    }), s && !t || !l || !isBrowser && !isWebWorker || x || (x = setTimeout(function() {
                        x = 0, f()
                    }, 50)), y = !1
                }
            }
            function p(e) {
                hasProp(T, e[0]) || r(a(e[0], null, !0)).init(e[1], e[2])
            }
            function m(e, t, i, n) {
                e.detachEvent && !isOpera ? n && e.detachEvent(n, t) : e.removeEventListener(i, t, !1)
            }
            function v(e) {
                var t = e.currentTarget || e.srcElement;
                return m(t, w.onScriptLoad, "load", "onreadystatechange"), m(t, w.onScriptError, "error"), {
                    node: t,
                    id: t && t.getAttribute("data-requiremodule")
                }
            }
            function g() {
                var e;
                for (u(); _.length;) {
                    if (e = _.shift(), null === e[0]) return c(makeError("mismatch", "Mismatched anonymous define() module: " + e[e.length - 1]));
                    p(e)
                }
            }
            var y, b, w, k, x, S = {
                    waitSeconds: 7,
                    baseUrl: "./",
                    paths: {},
                    bundles: {},
                    pkgs: {},
                    shim: {},
                    config: {}
                },
                D = {},
                E = {},
                A = {},
                _ = [],
                T = {},
                C = {},
                P = {},
                I = 1,
                N = 1;
            return k = {
                require: function(e) {
                    return e.require ? e.require : e.require = w.makeRequire(e.map)
                },
                exports: function(e) {
                    return e.usingExports = !0, e.map.isDefine ? e.exports ? T[e.map.id] = e.exports : e.exports = T[e.map.id] = {} : void 0
                },
                module: function(e) {
                    return e.module ? e.module : e.module = {
                        id: e.map.id,
                        uri: e.map.url,
                        config: function() {
                            return getOwn(S.config, e.map.id) || {}
                        },
                        exports: e.exports || (e.exports = {})
                    }
                }
            }, b = function(e) {
                this.events = getOwn(A, e.id) || {}, this.map = e, this.shim = getOwn(S.shim, e.id), this.depExports = [], this.depMaps = [], this.depMatched = [], this.pluginMaps = {}, this.depCount = 0
            }, b.prototype = {
                init: function(e, t, i, n) {
                    n = n || {}, this.inited || (this.factory = t, i ? this.on("error", i) : this.events.error && (i = bind(this, function(e) {
                        this.emit("error", e)
                    })), this.depMaps = e && e.slice(0), this.errback = i, this.inited = !0, this.ignore = n.ignore, n.enabled || this.enabled ? this.enable() : this.check())
                },
                defineDep: function(e, t) {
                    this.depMatched[e] || (this.depMatched[e] = !0, this.depCount -= 1, this.depExports[e] = t)
                },
                fetch: function() {
                    if (!this.fetched) {
                        this.fetched = !0, w.startTime = (new Date).getTime();
                        var e = this.map;
                        return this.shim ? void w.makeRequire(this.map, {
                            enableBuildCallback: !0
                        })(this.shim.deps || [], bind(this, function() {
                            return e.prefix ? this.callPlugin() : this.load()
                        })) : e.prefix ? this.callPlugin() : this.load()
                    }
                },
                load: function() {
                    var e = this.map.url;
                    C[e] || (C[e] = !0, w.load(this.map.id, e))
                },
                check: function() {
                    if (this.enabled && !this.enabling) {
                        var e, t, i = this.map.id,
                            n = this.depExports,
                            o = this.exports,
                            s = this.factory;
                        if (this.inited) {
                            if (this.error) this.emit("error", this.error);
                            else if (!this.defining) {
                                if (this.defining = !0, this.depCount < 1 && !this.defined) {
                                    if (isFunction(s)) {
                                        if (this.events.error && this.map.isDefine || req.onError !== defaultOnError) try {
                                            o = w.execCb(i, s, n, o)
                                        } catch (a) {
                                            e = a
                                        } else o = w.execCb(i, s, n, o);
                                        if (this.map.isDefine && void 0 === o && (t = this.module, t ? o = t.exports : this.usingExports && (o = this.exports)), e) return e.requireMap = this.map, e.requireModules = this.map.isDefine ? [this.map.id] : null, e.requireType = this.map.isDefine ? "define" : "require", c(this.error = e)
                                    } else o = s;
                                    this.exports = o, this.map.isDefine && !this.ignore && (T[i] = o, req.onResourceLoad && req.onResourceLoad(w, this.map, this.depMaps)), d(i), this.defined = !0
                                }
                                this.defining = !1, this.defined && !this.defineEmitted && (this.defineEmitted = !0, this.emit("defined", this.exports), this.defineEmitComplete = !0)
                            }
                        } else this.fetch()
                    }
                },
                callPlugin: function() {
                    var e = this.map,
                        t = e.id,
                        n = a(e.prefix);
                    this.depMaps.push(n), l(n, "defined", bind(this, function(n) {
                        var o, s, u, h = getOwn(P, this.map.id),
                            f = this.map.name,
                            p = this.map.parentMap ? this.map.parentMap.name : null,
                            m = w.makeRequire(e.parentMap, {
                                enableBuildCallback: !0
                            });
                        return this.map.unnormalized ? (n.normalize && (f = n.normalize(f, function(e) {
                                return i(e, p, !0)
                            }) || ""), s = a(e.prefix + "!" + f, this.map.parentMap), l(s, "defined", bind(this, function(e) {
                            this.init([], function() {
                                return e
                            }, null, {
                                enabled: !0,
                                ignore: !0
                            })
                        })), u = getOwn(D, s.id), void(u && (this.depMaps.push(s), this.events.error && u.on("error", bind(this, function(e) {
                            this.emit("error", e)
                        })), u.enable()))) : h ? (this.map.url = w.nameToUrl(h), void this.load()) : (o = bind(this, function(e) {
                            this.init([], function() {
                                return e
                            }, null, {
                                enabled: !0
                            })
                        }), o.error = bind(this, function(e) {
                            this.inited = !0, this.error = e, e.requireModules = [t], eachProp(D, function(e) {
                                0 === e.map.id.indexOf(t + "_unnormalized") && d(e.map.id)
                            }), c(e)
                        }), o.fromText = bind(this, function(i, n) {
                            var s = e.name,
                                l = a(s),
                                u = useInteractive;
                            n && (i = n), u && (useInteractive = !1), r(l), hasProp(S.config, t) && (S.config[s] = S.config[t]);
                            try {
                                req.exec(i)
                            } catch (d) {
                                return c(makeError("fromtexteval", "fromText eval for " + t + " failed: " + d, d, [t]))
                            }
                            u && (useInteractive = !0), this.depMaps.push(l), w.completeLoad(s), m([s], o)
                        }), void n.load(e.name, m, o, S))
                    })), w.enable(n, this), this.pluginMaps[n.id] = n
                },
                enable: function() {
                    E[this.map.id] = this, this.enabled = !0, this.enabling = !0, each(this.depMaps, bind(this, function(e, t) {
                        var i, n, o;
                        if ("string" == typeof e) {
                            if (e = a(e, this.map.isDefine ? this.map : this.map.parentMap, !1, !this.skipMap), this.depMaps[t] = e, o = getOwn(k, e.id)) return void(this.depExports[t] = o(this));
                            this.depCount += 1, l(e, "defined", bind(this, function(e) {
                                this.defineDep(t, e), this.check()
                            })), this.errback ? l(e, "error", bind(this, this.errback)) : this.events.error && l(e, "error", bind(this, function(e) {
                                this.emit("error", e)
                            }))
                        }
                        i = e.id, n = D[i], hasProp(k, i) || !n || n.enabled || w.enable(e, this)
                    })), eachProp(this.pluginMaps, bind(this, function(e) {
                        var t = getOwn(D, e.id);
                        t && !t.enabled && w.enable(e, this)
                    })), this.enabling = !1, this.check()
                },
                on: function(e, t) {
                    var i = this.events[e];
                    i || (i = this.events[e] = []), i.push(t)
                },
                emit: function(e, t) {
                    each(this.events[e], function(e) {
                        e(t)
                    }), "error" === e && delete this.events[e]
                }
            }, w = {
                config: S,
                contextName: e,
                registry: D,
                defined: T,
                urlFetched: C,
                defQueue: _,
                Module: b,
                makeModuleMap: a,
                nextTick: req.nextTick,
                onError: c,
                configure: function(e) {
                    e.baseUrl && "/" !== e.baseUrl.charAt(e.baseUrl.length - 1) && (e.baseUrl += "/");
                    var t = S.shim,
                        i = {
                            paths: !0,
                            bundles: !0,
                            config: !0,
                            map: !0
                        };
                    eachProp(e, function(e, t) {
                        i[t] ? (S[t] || (S[t] = {}), mixin(S[t], e, !0, !0)) : S[t] = e
                    }), e.bundles && eachProp(e.bundles, function(e, t) {
                        each(e, function(e) {
                            e !== t && (P[e] = t)
                        })
                    }), e.shim && (eachProp(e.shim, function(e, i) {
                        isArray(e) && (e = {
                            deps: e
                        }), !e.exports && !e.init || e.exportsFn || (e.exportsFn = w.makeShimExports(e)), t[i] = e
                    }), S.shim = t), e.packages && each(e.packages, function(e) {
                        var t, i;
                        e = "string" == typeof e ? {
                            name: e
                        } : e, i = e.name, t = e.location, t && (S.paths[i] = e.location), S.pkgs[i] = e.name + "/" + (e.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
                    }), eachProp(D, function(e, t) {
                        e.inited || e.map.unnormalized || (e.map = a(t))
                    }), (e.deps || e.callback) && w.require(e.deps || [], e.callback)
                },
                makeShimExports: function(e) {
                    function t() {
                        var t;
                        return e.init && (t = e.init.apply(global, arguments)), t || e.exports && getGlobal(e.exports)
                    }
                    return t
                },
                makeRequire: function(t, o) {
                    function s(i, n, l) {
                        var u, d, h;
                        return o.enableBuildCallback && n && isFunction(n) && (n.__requireJsBuild = !0), "string" == typeof i ? isFunction(n) ? c(makeError("requireargs", "Invalid require call"), l) : t && hasProp(k, i) ? k[i](D[t.id]) : req.get ? req.get(w, i, t, s) : (d = a(i, t, !1, !0), u = d.id, hasProp(T, u) ? T[u] : c(makeError("notloaded", 'Module name "' + u + '" has not been loaded yet for context: ' + e + (t ? "" : ". Use require([])")))) : (g(), w.nextTick(function() {
                            g(), h = r(a(null, t)), h.skipMap = o.skipMap, h.init(i, n, l, {
                                enabled: !0
                            }), f()
                        }), s)
                    }
                    return o = o || {}, mixin(s, {
                        isBrowser: isBrowser,
                        toUrl: function(e) {
                            var n, o = e.lastIndexOf("."),
                                s = e.split("/")[0],
                                a = "." === s || ".." === s;
                            return -1 !== o && (!a || o > 1) && (n = e.substring(o, e.length), e = e.substring(0, o)), w.nameToUrl(i(e, t && t.id, !0), n, !0)
                        },
                        defined: function(e) {
                            return hasProp(T, a(e, t, !1, !0).id)
                        },
                        specified: function(e) {
                            return e = a(e, t, !1, !0).id, hasProp(T, e) || hasProp(D, e)
                        }
                    }), t || (s.undef = function(e) {
                        u();
                        var i = a(e, t, !0),
                            o = getOwn(D, e);
                        n(e), delete T[e], delete C[i.url], delete A[e], eachReverse(_, function(t, i) {
                            t[0] === e && _.splice(i, 1)
                        }), o && (o.events.defined && (A[e] = o.events), d(e))
                    }), s
                },
                enable: function(e) {
                    var t = getOwn(D, e.id);
                    t && r(e).enable()
                },
                completeLoad: function(e) {
                    var t, i, n, s = getOwn(S.shim, e) || {},
                        a = s.exports;
                    for (u(); _.length;) {
                        if (i = _.shift(), null === i[0]) {
                            if (i[0] = e, t) break;
                            t = !0
                        } else i[0] === e && (t = !0);
                        p(i)
                    }
                    if (n = getOwn(D, e), !t && !hasProp(T, e) && n && !n.inited) {
                        if (!(!S.enforceDefine || a && getGlobal(a))) return o(e) ? void 0 : c(makeError("nodefine", "No define call for " + e, null, [e]));
                        p([e, s.deps || [], s.exportsFn])
                    }
                    f()
                },
                nameToUrl: function(e, t, i) {
                    var n, o, s, a, r, l, c, u = getOwn(S.pkgs, e);
                    if (u && (e = u), c = getOwn(P, e)) return w.nameToUrl(c, t, i);
                    if (req.jsExtRegExp.test(e)) r = e + (t || "");
                    else {
                        for (n = S.paths, o = e.split("/"), s = o.length; s > 0; s -= 1) if (a = o.slice(0, s).join("/"), l = getOwn(n, a)) {
                            isArray(l) && (l = l[0]), o.splice(0, s, l);
                            break
                        }
                        r = o.join("/"), r += t || (/^data\:|\?/.test(r) || i ? "" : ".js"), r = ("/" === r.charAt(0) || r.match(/^[\w\+\.\-]+:/) ? "" : S.baseUrl) + r
                    }
                    return S.urlArgs ? r + ((-1 === r.indexOf("?") ? "?" : "&") + S.urlArgs) : r
                },
                load: function(e, t) {
                    req.load(w, e, t)
                },
                execCb: function(e, t, i, n) {
                    return t.apply(n, i)
                },
                onScriptLoad: function(e) {
                    if ("load" === e.type || readyRegExp.test((e.currentTarget || e.srcElement).readyState)) {
                        interactiveScript = null;
                        var t = v(e);
                        w.completeLoad(t.id)
                    }
                },
                onScriptError: function(e) {
                    var t = v(e);
                    return o(t.id) ? void 0 : c(makeError("scripterror", "Script error for: " + t.id, e, [t.id]))
                }
            }, w.require = w.makeRequire(), w
        }
        function getInteractiveScript() {
            return interactiveScript && "interactive" === interactiveScript.readyState ? interactiveScript : (eachReverse(scripts(), function(e) {
                return "interactive" === e.readyState ? interactiveScript = e : void 0
            }), interactiveScript)
        }
        var req, s, head, baseElement, dataMain, src, interactiveScript, currentlyAddingScript, mainScript, subPath, version = "2.1.17",
            commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,
            cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
            jsSuffixRegExp = /\.js$/,
            currDirRegExp = /^\.\//,
            op = Object.prototype,
            ostring = op.toString,
            hasOwn = op.hasOwnProperty,
            ap = Array.prototype,
            apsp = ap.splice,
            isBrowser = !("undefined" == typeof window || "undefined" == typeof navigator || !window.document),
            isWebWorker = !isBrowser && "undefined" != typeof importScripts,
            readyRegExp = isBrowser && "PLAYSTATION 3" === navigator.platform ? /^complete$/ : /^(complete|loaded)$/,
            defContextName = "_",
            isOpera = "undefined" != typeof opera && "[object Opera]" === opera.toString(),
            contexts = {},
            cfg = {},
            globalDefQueue = [],
            useInteractive = !1;
        if ("undefined" == typeof define) {
            if ("undefined" != typeof requirejs) {
                if (isFunction(requirejs)) return;
                cfg = requirejs, requirejs = void 0
            }
            "undefined" == typeof require || isFunction(require) || (cfg = require, require = void 0), req = requirejs = function(e, t, i, n) {
                var o, s, a = defContextName;
                return isArray(e) || "string" == typeof e || (s = e, isArray(t) ? (e = t, t = i, i = n) : e = []), s && s.context && (a = s.context), o = getOwn(contexts, a), o || (o = contexts[a] = req.s.newContext(a)), s && o.configure(s), o.require(e, t, i)
            }, req.config = function(e) {
                return req(e)
            }, req.nextTick = "undefined" != typeof setTimeout ?
                function(e) {
                    setTimeout(e, 4)
                } : function(e) {
                e()
            }, require || (require = req), req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, req.isBrowser = isBrowser, s = req.s = {
                contexts: contexts,
                newContext: newContext
            }, req({}), each(["toUrl", "undef", "defined", "specified"], function(e) {
                req[e] = function() {
                    var t = contexts[defContextName];
                    return t.require[e].apply(t, arguments)
                }
            }), isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = defaultOnError, req.createNode = function(e, t, i) {
                var n = e.xhtml ? document.createElementNS(document.location.protocol + "//www.w3.org/1999/xhtml", "html:script") : document.createElement("script");
                return n.type = e.scriptType || "text/javascript", n.charset = "utf-8", n.async = !0, n
            }, req.load = function(e, t, i) {
                var n, o = e && e.config || {};
                if (isBrowser) return n = req.createNode(o, t, i), n.setAttribute("data-requirecontext", e.contextName), n.setAttribute("data-requiremodule", t), !n.attachEvent || n.attachEvent.toString && n.attachEvent.toString().indexOf("[native code") < 0 || isOpera ? (n.addEventListener("load", e.onScriptLoad, !1), n.addEventListener("error", e.onScriptError, !1)) : (useInteractive = !0, n.attachEvent("onreadystatechange", e.onScriptLoad)), n.src = i, currentlyAddingScript = n, baseElement ? head.insertBefore(n, baseElement) : head.appendChild(n), currentlyAddingScript = null, n;
                if (isWebWorker) try {
                    importScripts(i), e.completeLoad(t)
                } catch (s) {
                    e.onError(makeError("importscripts", "importScripts failed for " + t + " at " + i, s, [t]))
                }
            }, isBrowser && !cfg.skipDataMain && eachReverse(scripts(), function(e) {
                return head || (head = e.parentNode), dataMain = e.getAttribute("data-main"), dataMain ? (mainScript = dataMain, cfg.baseUrl || (src = mainScript.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath), mainScript = mainScript.replace(jsSuffixRegExp, ""), req.jsExtRegExp.test(mainScript) && (mainScript = dataMain), cfg.deps = cfg.deps ? cfg.deps.concat(mainScript) : [mainScript], !0) : void 0
            }), define = function(e, t, i) {
                var n, o;
                "string" != typeof e && (i = t, t = e, e = null), isArray(t) || (i = t, t = null), !t && isFunction(i) && (t = [], i.length && (i.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(e, i) {
                    t.push(i)
                }), t = (1 === i.length ? ["require"] : ["require", "exports", "module"]).concat(t))), useInteractive && (n = currentlyAddingScript || getInteractiveScript(), n && (e || (e = n.getAttribute("data-requiremodule")), o = contexts[n.getAttribute("data-requirecontext")])), (o ? o.defQueue : globalDefQueue).push([e, t, i])
            }, define.amd = {
                jQuery: !0
            }, req.exec = function(text) {
                return eval(text)
            }, req(cfg)
        }
    }(this), require.config({
    paths: {
        highcharts: "//gaic.alicdn.com/aic/h5/release/jslib/sdk/highcharts.src",
        highcharts_s: "//gaic.alicdn.com/aic/h5/release/jslib/sdk/standalone-framework.src",
        Q: "//gaic.alicdn.com/aic/h5/release/jslib/q",
        xscroll: "//gaic.alicdn.com/aic/h5/release/jslib/xscroll/xscroll",
        infinite: "//gaic.alicdn.com/aic/h5/release/jslib/xscroll/infinite",
        pullup: "//gaic.alicdn.com/aic/h5/release/jslib/xscroll/pullup",
        pulldown: "//gaic.alicdn.com/aic/h5/release/jslib/xscroll/pulldown",
        user: "//gaic.alicdn.com/aic/h5/release/jslib/sdk/user",
        cookbook: "//gaic.alicdn.com/aic/h5/release/cookbook/cookbook",
        cookbook_test: "//gaic.alicdn.com/aic/h5/test/cookbook/cookbook_test",
        asevented: "//g.alicdn.com/aic/sdk/asevented",
        "user-selector-s": "//gaic.alicdn.com/aic/h5/release/jslib/sdk/user-selector-s",
        "user-selector-m": "//gaic.alicdn.com/aic/h5/release/jslib/sdk/user-selector-m",
        component: "//gaic.alicdn.com/aic/h5/alpha/components/js/alinkUI"
    },
    shim: {
        highcharts: {
            exports: "Highcharts",
            deps: ["highcharts_s"]
        },
        xscroll: {
            exports: "XScroll",
            deps: ["pullup", "infinite", "pulldown"]
        }
    }
}), require(["__sdk_main__"], function() {}), function() {
    window.addEventListener("DOMContentLoaded", function() {
        g__DomElapsed__ = +new Date
    })
}(), define("__sdk_init__", function() {});
var Zepto = function() {
    function e(e) {
        return null == e ? String(e) : H[Y.call(e)] || "object"
    }
    function t(t) {
        return "function" == e(t)
    }
    function i(e) {
        return null != e && e == e.window
    }
    function n(e) {
        return null != e && e.nodeType == e.DOCUMENT_NODE
    }
    function o(t) {
        return "object" == e(t)
    }
    function s(e) {
        return o(e) && !i(e) && Object.getPrototypeOf(e) == Object.prototype
    }
    function a(e) {
        return "number" == typeof e.length
    }
    function r(e) {
        return C.call(e, function(e) {
            return null != e
        })
    }
    function l(e) {
        return e.length > 0 ? S.fn.concat.apply([], e) : e
    }
    function c(e) {
        return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
    }
    function u(e) {
        return e in N ? N[e] : N[e] = new RegExp("(^|\\s)" + e + "(\\s|$)")
    }
    function d(e, t) {
        return "number" != typeof t || M[c(e)] ? t : t + "px"
    }
    function h(e) {
        var t, i;
        return I[e] || (t = P.createElement(e), P.body.appendChild(t), i = getComputedStyle(t, "").getPropertyValue("display"), t.parentNode.removeChild(t), "none" == i && (i = "block"), I[e] = i), I[e]
    }
    function f(e) {
        return "children" in e ? T.call(e.children) : S.map(e.childNodes, function(e) {
            return 1 == e.nodeType ? e : void 0
        })
    }
    function p(e, t, i) {
        for (x in t) i && (s(t[x]) || Z(t[x])) ? (s(t[x]) && !s(e[x]) && (e[x] = {}), Z(t[x]) && !Z(e[x]) && (e[x] = []), p(e[x], t[x], i)) : t[x] !== k && (e[x] = t[x])
    }
    function m(e, t) {
        return null == t ? S(e) : S(e).filter(t)
    }
    function v(e, i, n, o) {
        return t(i) ? i.call(e, n, o) : i
    }
    function g(e, t, i) {
        null == i ? e.removeAttribute(t) : e.setAttribute(t, i)
    }
    function y(e, t) {
        var i = e.className || "",
            n = i && i.baseVal !== k;
        return t === k ? n ? i.baseVal : i : void(n ? i.baseVal = t : e.className = t)
    }
    function b(e) {
        try {
            return e ? "true" == e || ("false" == e ? !1 : "null" == e ? null : +e + "" == e ? +e : /^[\[\{]/.test(e) ? S.parseJSON(e) : e) : e
        } catch (t) {
            return e
        }
    }
    function w(e, t) {
        t(e);
        for (var i = 0, n = e.childNodes.length; n > i; i++) w(e.childNodes[i], t)
    }
    var k, x, S, D, E, A, _ = [],
        T = _.slice,
        C = _.filter,
        P = window.document,
        I = {},
        N = {},
        M = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        },
        V = /^\s*<(\w+|!)[^>]*>/,
        O = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        L = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        R = /^(?:body|html)$/i,
        $ = /([A-Z])/g,
        F = ["val", "css", "html", "text", "data", "width", "height", "offset"],
        B = ["after", "prepend", "before", "append"],
        W = P.createElement("table"),
        X = P.createElement("tr"),
        j = {
            tr: P.createElement("tbody"),
            tbody: W,
            thead: W,
            tfoot: W,
            td: X,
            th: X,
            "*": P.createElement("div")
        },
        q = /complete|loaded|interactive/,
        U = /^[\w-]*$/,
        H = {},
        Y = H.toString,
        z = {},
        J = P.createElement("div"),
        K = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        Z = Array.isArray ||
            function(e) {
                return e instanceof Array
            };
    return z.matches = function(e, t) {
        if (!t || !e || 1 !== e.nodeType) return !1;
        var i = e.webkitMatchesSelector || e.mozMatchesSelector || e.oMatchesSelector || e.matchesSelector;
        if (i) return i.call(e, t);
        var n, o = e.parentNode,
            s = !o;
        return s && (o = J).appendChild(e), n = ~z.qsa(o, t).indexOf(e), s && J.removeChild(e), n
    }, E = function(e) {
        return e.replace(/-+(.)?/g, function(e, t) {
            return t ? t.toUpperCase() : ""
        })
    }, A = function(e) {
        return C.call(e, function(t, i) {
            return e.indexOf(t) == i
        })
    }, z.fragment = function(e, t, i) {
        var n, o, a;
        return O.test(e) && (n = S(P.createElement(RegExp.$1))), n || (e.replace && (e = e.replace(L, "<$1></$2>")), t === k && (t = V.test(e) && RegExp.$1), t in j || (t = "*"), a = j[t], a.innerHTML = "" + e, n = S.each(T.call(a.childNodes), function() {
            a.removeChild(this)
        })), s(i) && (o = S(n), S.each(i, function(e, t) {
            F.indexOf(e) > -1 ? o[e](t) : o.attr(e, t)
        })), n
    }, z.Z = function(e, t) {
        return e = e || [], e.__proto__ = S.fn, e.selector = t || "", e
    }, z.isZ = function(e) {
        return e instanceof z.Z
    }, z.init = function(e, i) {
        var n;
        if (!e) return z.Z();
        if ("string" == typeof e) if (e = e.trim(), "<" == e[0] && V.test(e)) n = z.fragment(e, RegExp.$1, i), e = null;
        else {
            if (i !== k) return S(i).find(e);
            n = z.qsa(P, e)
        } else {
            if (t(e)) return S(P).ready(e);
            if (z.isZ(e)) return e;
            if (Z(e)) n = r(e);
            else if (o(e)) n = [e], e = null;
            else if (V.test(e)) n = z.fragment(e.trim(), RegExp.$1, i), e = null;
            else {
                if (i !== k) return S(i).find(e);
                n = z.qsa(P, e)
            }
        }
        return z.Z(n, e)
    }, S = function(e, t) {
        return z.init(e, t)
    }, S.extend = function(e) {
        var t, i = T.call(arguments, 1);
        return "boolean" == typeof e && (t = e, e = i.shift()), i.forEach(function(i) {
            p(e, i, t)
        }), e
    }, z.qsa = function(e, t) {
        var i, o = "#" == t[0],
            s = !o && "." == t[0],
            a = o || s ? t.slice(1) : t,
            r = U.test(a);
        return n(e) && r && o ? (i = e.getElementById(a)) ? [i] : [] : 1 !== e.nodeType && 9 !== e.nodeType ? [] : T.call(r && !o ? s ? e.getElementsByClassName(a) : e.getElementsByTagName(t) : e.querySelectorAll(t))
    }, S.contains = P.documentElement.contains ?
        function(e, t) {
            return e !== t && e.contains(t)
        } : function(e, t) {
        for (; t && (t = t.parentNode);) if (t === e) return !0;
        return !1
    }, S.type = e, S.isFunction = t, S.isWindow = i, S.isArray = Z, S.isPlainObject = s, S.isEmptyObject = function(e) {
        var t;
        for (t in e) return !1;
        return !0
    }, S.inArray = function(e, t, i) {
        return _.indexOf.call(t, e, i)
    }, S.camelCase = E, S.trim = function(e) {
        return null == e ? "" : String.prototype.trim.call(e)
    }, S.uuid = 0, S.support = {}, S.expr = {}, S.map = function(e, t) {
        var i, n, o, s = [];
        if (a(e)) for (n = 0; n < e.length; n++) i = t(e[n], n), null != i && s.push(i);
        else for (o in e) i = t(e[o], o), null != i && s.push(i);
        return l(s)
    }, S.each = function(e, t) {
        var i, n;
        if (a(e)) {
            for (i = 0; i < e.length; i++) if (t.call(e[i], i, e[i]) === !1) return e
        } else for (n in e) if (t.call(e[n], n, e[n]) === !1) return e;
        return e
    }, S.grep = function(e, t) {
        return C.call(e, t)
    }, window.JSON && (S.parseJSON = JSON.parse), S.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(e, t) {
        H["[object " + t + "]"] = t.toLowerCase()
    }), S.fn = {
        forEach: _.forEach,
        reduce: _.reduce,
        push: _.push,
        sort: _.sort,
        indexOf: _.indexOf,
        concat: _.concat,
        map: function(e) {
            return S(S.map(this, function(t, i) {
                return e.call(t, i, t)
            }))
        },
        slice: function() {
            return S(T.apply(this, arguments))
        },
        ready: function(e) {
            return q.test(P.readyState) && P.body ? e(S) : P.addEventListener("DOMContentLoaded", function() {
                e(S)
            }, !1), this
        },
        get: function(e) {
            return e === k ? T.call(this) : this[e >= 0 ? e : e + this.length]
        },
        toArray: function() {
            return this.get()
        },
        size: function() {
            return this.length
        },
        remove: function() {
            return this.each(function() {
                null != this.parentNode && this.parentNode.removeChild(this)
            })
        },
        each: function(e) {
            return _.every.call(this, function(t, i) {
                return e.call(t, i, t) !== !1
            }), this
        },
        filter: function(e) {
            return t(e) ? this.not(this.not(e)) : S(C.call(this, function(t) {
                return z.matches(t, e)
            }))
        },
        add: function(e, t) {
            return S(A(this.concat(S(e, t))))
        },
        is: function(e) {
            return this.length > 0 && z.matches(this[0], e)
        },
        not: function(e) {
            var i = [];
            if (t(e) && e.call !== k) this.each(function(t) {
                e.call(this, t) || i.push(this)
            });
            else {
                var n = "string" == typeof e ? this.filter(e) : a(e) && t(e.item) ? T.call(e) : S(e);
                this.forEach(function(e) {
                    n.indexOf(e) < 0 && i.push(e)
                })
            }
            return S(i)
        },
        has: function(e) {
            return this.filter(function() {
                return o(e) ? S.contains(this, e) : S(this).find(e).size()
            })
        },
        eq: function(e) {
            return -1 === e ? this.slice(e) : this.slice(e, +e + 1)
        },
        first: function() {
            var e = this[0];
            return e && !o(e) ? e : S(e)
        },
        last: function() {
            var e = this[this.length - 1];
            return e && !o(e) ? e : S(e)
        },
        find: function(e) {
            var t, i = this;
            return t = e ? "object" == typeof e ? S(e).filter(function() {
                var e = this;
                return _.some.call(i, function(t) {
                    return S.contains(t, e)
                })
            }) : 1 == this.length ? S(z.qsa(this[0], e)) : this.map(function() {
                return z.qsa(this, e)
            }) : S()
        },
        closest: function(e, t) {
            var i = this[0],
                o = !1;
            for ("object" == typeof e && (o = S(e)); i && !(o ? o.indexOf(i) >= 0 : z.matches(i, e));) i = i !== t && !n(i) && i.parentNode;
            return S(i)
        },
        parents: function(e) {
            for (var t = [], i = this; i.length > 0;) i = S.map(i, function(e) {
                return (e = e.parentNode) && !n(e) && t.indexOf(e) < 0 ? (t.push(e), e) : void 0
            });
            return m(t, e)
        },
        parent: function(e) {
            return m(A(this.pluck("parentNode")), e)
        },
        children: function(e) {
            return m(this.map(function() {
                return f(this)
            }), e)
        },
        contents: function() {
            return this.map(function() {
                return T.call(this.childNodes)
            })
        },
        siblings: function(e) {
            return m(this.map(function(e, t) {
                return C.call(f(t.parentNode), function(e) {
                    return e !== t
                })
            }), e)
        },
        empty: function() {
            return this.each(function() {
                this.innerHTML = ""
            })
        },
        pluck: function(e) {
            return S.map(this, function(t) {
                return t[e]
            })
        },
        show: function() {
            return this.each(function() {
                "none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
            })
        },
        replaceWith: function(e) {
            return this.before(e).remove()
        },
        wrap: function(e) {
            var i = t(e);
            if (this[0] && !i) var n = S(e).get(0),
                o = n.parentNode || this.length > 1;
            return this.each(function(t) {
                S(this).wrapAll(i ? e.call(this, t) : o ? n.cloneNode(!0) : n)
            })
        },
        wrapAll: function(e) {
            if (this[0]) {
                S(this[0]).before(e = S(e));
                for (var t;
                     (t = e.children()).length;) e = t.first();
                S(e).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            var i = t(e);
            return this.each(function(t) {
                var n = S(this),
                    o = n.contents(),
                    s = i ? e.call(this, t) : e;
                o.length ? o.wrapAll(s) : n.append(s)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                S(this).replaceWith(S(this).children())
            }), this
        },
        clone: function() {
            return this.map(function() {
                return this.cloneNode(!0)
            })
        },
        hide: function() {
            return this.css("display", "none")
        },
        toggle: function(e) {
            return this.each(function() {
                var t = S(this);
                (e === k ? "none" == t.css("display") : e) ? t.show() : t.hide()
            })
        },
        prev: function(e) {
            return S(this.pluck("previousElementSibling")).filter(e || "*")
        },
        next: function(e) {
            return S(this.pluck("nextElementSibling")).filter(e || "*")
        },
        html: function(e) {
            return 0 in arguments ? this.each(function(t) {
                var i = this.innerHTML;
                S(this).empty().append(v(this, e, t, i))
            }) : 0 in this ? this[0].innerHTML : null
        },
        text: function(e) {
            return 0 in arguments ? this.each(function(t) {
                var i = v(this, e, t, this.textContent);
                this.textContent = null == i ? "" : "" + i
            }) : 0 in this ? this[0].textContent : null
        },
        attr: function(e, t) {
            var i;
            return "string" != typeof e || 1 in arguments ? this.each(function(i) {
                if (1 === this.nodeType) if (o(e)) for (x in e) g(this, x, e[x]);
                else g(this, e, v(this, t, i, this.getAttribute(e)))
            }) : this.length && 1 === this[0].nodeType ? !(i = this[0].getAttribute(e)) && e in this[0] ? this[0][e] : i : k
        },
        removeAttr: function(e) {
            return this.each(function() {
                1 === this.nodeType && e.split(" ").forEach(function(e) {
                    g(this, e)
                }, this)
            })
        },
        prop: function(e, t) {
            return e = K[e] || e, 1 in arguments ? this.each(function(i) {
                this[e] = v(this, t, i, this[e])
            }) : this[0] && this[0][e]
        },
        data: function(e, t) {
            var i = "data-" + e.replace($, "-$1").toLowerCase(),
                n = 1 in arguments ? this.attr(i, t) : this.attr(i);
            return null !== n ? b(n) : k
        },
        val: function(e) {
            return 0 in arguments ? this.each(function(t) {
                this.value = v(this, e, t, this.value)
            }) : this[0] && (this[0].multiple ? S(this[0]).find("option").filter(function() {
                return this.selected
            }).pluck("value") : this[0].value)
        },
        offset: function(e) {
            if (e) return this.each(function(t) {
                var i = S(this),
                    n = v(this, e, t, i.offset()),
                    o = i.offsetParent().offset(),
                    s = {
                        top: n.top - o.top,
                        left: n.left - o.left
                    };
                "static" == i.css("position") && (s.position = "relative"), i.css(s)
            });
            if (!this.length) return null;
            var t = this[0].getBoundingClientRect();
            return {
                left: t.left + window.pageXOffset,
                top: t.top + window.pageYOffset,
                width: Math.round(t.width),
                height: Math.round(t.height)
            }
        },
        css: function(t, i) {
            if (arguments.length < 2) {
                var n, o = this[0];
                if (!o) return;
                if (n = getComputedStyle(o, ""), "string" == typeof t) return o.style[E(t)] || n.getPropertyValue(t);
                if (Z(t)) {
                    var s = {};
                    return S.each(t, function(e, t) {
                        s[t] = o.style[E(t)] || n.getPropertyValue(t)
                    }), s
                }
            }
            var a = "";
            if ("string" == e(t)) i || 0 === i ? a = c(t) + ":" + d(t, i) : this.each(function() {
                this.style.removeProperty(c(t))
            });
            else for (x in t) t[x] || 0 === t[x] ? a += c(x) + ":" + d(x, t[x]) + ";" : this.each(function() {
                this.style.removeProperty(c(x))
            });
            return this.each(function() {
                this.style.cssText += ";" + a
            })
        },
        index: function(e) {
            return e ? this.indexOf(S(e)[0]) : this.parent().children().indexOf(this[0])
        },
        hasClass: function(e) {
            return e ? _.some.call(this, function(e) {
                return this.test(y(e))
            }, u(e)) : !1
        },
        addClass: function(e) {
            return e ? this.each(function(t) {
                if ("className" in this) {
                    D = [];
                    var i = y(this),
                        n = v(this, e, t, i);
                    n.split(/\s+/g).forEach(function(e) {
                        S(this).hasClass(e) || D.push(e)
                    }, this), D.length && y(this, i + (i ? " " : "") + D.join(" "))
                }
            }) : this
        },
        removeClass: function(e) {
            return this.each(function(t) {
                if ("className" in this) {
                    if (e === k) return y(this, "");
                    D = y(this), v(this, e, t, D).split(/\s+/g).forEach(function(e) {
                        D = D.replace(u(e), " ")
                    }), y(this, D.trim())
                }
            })
        },
        toggleClass: function(e, t) {
            return e ? this.each(function(i) {
                var n = S(this),
                    o = v(this, e, i, y(this));
                o.split(/\s+/g).forEach(function(e) {
                    (t === k ? !n.hasClass(e) : t) ? n.addClass(e) : n.removeClass(e)
                })
            }) : this
        },
        scrollTop: function(e) {
            if (this.length) {
                var t = "scrollTop" in this[0];
                return e === k ? t ? this[0].scrollTop : this[0].pageYOffset : this.each(t ?
                    function() {
                        this.scrollTop = e
                    } : function() {
                    this.scrollTo(this.scrollX, e)
                })
            }
        },
        scrollLeft: function(e) {
            if (this.length) {
                var t = "scrollLeft" in this[0];
                return e === k ? t ? this[0].scrollLeft : this[0].pageXOffset : this.each(t ?
                    function() {
                        this.scrollLeft = e
                    } : function() {
                    this.scrollTo(e, this.scrollY)
                })
            }
        },
        position: function() {
            if (this.length) {
                var e = this[0],
                    t = this.offsetParent(),
                    i = this.offset(),
                    n = R.test(t[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : t.offset();
                return i.top -= parseFloat(S(e).css("margin-top")) || 0, i.left -= parseFloat(S(e).css("margin-left")) || 0, n.top += parseFloat(S(t[0]).css("border-top-width")) || 0, n.left += parseFloat(S(t[0]).css("border-left-width")) || 0, {
                    top: i.top - n.top,
                    left: i.left - n.left
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || P.body; e && !R.test(e.nodeName) && "static" == S(e).css("position");) e = e.offsetParent;
                return e
            })
        }
    }, S.fn.detach = S.fn.remove, ["width", "height"].forEach(function(e) {
        var t = e.replace(/./, function(e) {
            return e[0].toUpperCase()
        });
        S.fn[e] = function(o) {
            var s, a = this[0];
            return o === k ? i(a) ? a["inner" + t] : n(a) ? a.documentElement["scroll" + t] : (s = this.offset()) && s[e] : this.each(function(t) {
                a = S(this), a.css(e, v(this, o, t, a[e]()))
            })
        }
    }), B.forEach(function(t, i) {
        var n = i % 2;
        S.fn[t] = function() {
            var t, o, s = S.map(arguments, function(i) {
                    return t = e(i), "object" == t || "array" == t || null == i ? i : z.fragment(i)
                }),
                a = this.length > 1;
            return s.length < 1 ? this : this.each(function(e, t) {
                o = n ? t : t.parentNode, t = 0 == i ? t.nextSibling : 1 == i ? t.firstChild : 2 == i ? t : null;
                var r = S.contains(P.documentElement, o);
                s.forEach(function(e) {
                    if (a) e = e.cloneNode(!0);
                    else if (!o) return S(e).remove();
                    o.insertBefore(e, t), r && w(e, function(e) {
                        null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src || window.eval.call(window, e.innerHTML);
                    })
                })
            })
        }, S.fn[n ? t + "To" : "insert" + (i ? "Before" : "After")] = function(e) {
            return S(e)[t](this), this
        }
    }), z.Z.prototype = S.fn, z.uniq = A, z.deserializeValue = b, S.zepto = z, S
}();
window.Zepto = Zepto, void 0 === window.$ && (window.$ = Zepto), function(e) {
    function t(e) {
        return e._zid || (e._zid = h++)
    }
    function i(e, i, s, a) {
        if (i = n(i), i.ns) var r = o(i.ns);
        return (v[t(e)] || []).filter(function(e) {
            return e && (!i.e || e.e == i.e) && (!i.ns || r.test(e.ns)) && (!s || t(e.fn) === t(s)) && (!a || e.sel == a)
        })
    }
    function n(e) {
        var t = ("" + e).split(".");
        return {
            e: t[0],
            ns: t.slice(1).sort().join(" ")
        }
    }
    function o(e) {
        return new RegExp("(?:^| )" + e.replace(" ", " .* ?") + "(?: |$)")
    }
    function s(e, t) {
        return e.del && !y && e.e in b || !! t
    }
    function a(e) {
        return w[e] || y && b[e] || e
    }
    function r(i, o, r, l, u, h, f) {
        var p = t(i),
            m = v[p] || (v[p] = []);
        o.split(/\s/).forEach(function(t) {
            if ("ready" == t) return e(document).ready(r);
            var o = n(t);
            o.fn = r, o.sel = u, o.e in w && (r = function(t) {
                var i = t.relatedTarget;
                return !i || i !== this && !e.contains(this, i) ? o.fn.apply(this, arguments) : void 0
            }), o.del = h;
            var p = h || r;
            o.proxy = function(e) {
                if (e = c(e), !e.isImmediatePropagationStopped()) {
                    e.data = l;
                    var t = p.apply(i, e._args == d ? [e] : [e].concat(e._args));
                    return t === !1 && (e.preventDefault(), e.stopPropagation()), t
                }
            }, o.i = m.length, m.push(o), "addEventListener" in i && i.addEventListener(a(o.e), o.proxy, s(o, f))
        })
    }
    function l(e, n, o, r, l) {
        var c = t(e);
        (n || "").split(/\s/).forEach(function(t) {
            i(e, t, o, r).forEach(function(t) {
                delete v[c][t.i], "removeEventListener" in e && e.removeEventListener(a(t.e), t.proxy, s(t, l))
            })
        })
    }
    function c(t, i) {
        return (i || !t.isDefaultPrevented) && (i || (i = t), e.each(D, function(e, n) {
            var o = i[e];
            t[e] = function() {
                return this[n] = k, o && o.apply(i, arguments)
            }, t[n] = x
        }), (i.defaultPrevented !== d ? i.defaultPrevented : "returnValue" in i ? i.returnValue === !1 : i.getPreventDefault && i.getPreventDefault()) && (t.isDefaultPrevented = k)), t
    }
    function u(e) {
        var t, i = {
            originalEvent: e
        };
        for (t in e) S.test(t) || e[t] === d || (i[t] = e[t]);
        return c(i, e)
    }
    var d, h = 1,
        f = Array.prototype.slice,
        p = e.isFunction,
        m = function(e) {
            return "string" == typeof e
        },
        v = {},
        g = {},
        y = "onfocusin" in window,
        b = {
            focus: "focusin",
            blur: "focusout"
        },
        w = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
    g.click = g.mousedown = g.mouseup = g.mousemove = "MouseEvents", e.event = {
        add: r,
        remove: l
    }, e.proxy = function(i, n) {
        var o = 2 in arguments && f.call(arguments, 2);
        if (p(i)) {
            var s = function() {
                return i.apply(n, o ? o.concat(f.call(arguments)) : arguments)
            };
            return s._zid = t(i), s
        }
        if (m(n)) return o ? (o.unshift(i[n], i), e.proxy.apply(null, o)) : e.proxy(i[n], i);
        throw new TypeError("expected function")
    }, e.fn.bind = function(e, t, i) {
        return this.on(e, t, i)
    }, e.fn.unbind = function(e, t) {
        return this.off(e, t)
    }, e.fn.one = function(e, t, i, n) {
        return this.on(e, t, i, n, 1)
    };
    var k = function() {
            return !0
        },
        x = function() {
            return !1
        },
        S = /^([A-Z]|returnValue$|layer[XY]$)/,
        D = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
    e.fn.delegate = function(e, t, i) {
        return this.on(t, e, i)
    }, e.fn.undelegate = function(e, t, i) {
        return this.off(t, e, i)
    }, e.fn.live = function(t, i) {
        return e(document.body).delegate(this.selector, t, i), this
    }, e.fn.die = function(t, i) {
        return e(document.body).undelegate(this.selector, t, i), this
    }, e.fn.on = function(t, i, n, o, s) {
        var a, c, h = this;
        return t && !m(t) ? (e.each(t, function(e, t) {
            h.on(e, i, n, t, s)
        }), h) : (m(i) || p(o) || o === !1 || (o = n, n = i, i = d), (p(n) || n === !1) && (o = n, n = d), o === !1 && (o = x), h.each(function(d, h) {
            s && (a = function(e) {
                return l(h, e.type, o), o.apply(this, arguments)
            }), i && (c = function(t) {
                var n, s = e(t.target).closest(i, h).get(0);
                return s && s !== h ? (n = e.extend(u(t), {
                    currentTarget: s,
                    liveFired: h
                }), (a || o).apply(s, [n].concat(f.call(arguments, 1)))) : void 0
            }), r(h, t, o, n, i, c || a)
        }))
    }, e.fn.off = function(t, i, n) {
        var o = this;
        return t && !m(t) ? (e.each(t, function(e, t) {
            o.off(e, i, t)
        }), o) : (m(i) || p(n) || n === !1 || (n = i, i = d), n === !1 && (n = x), o.each(function() {
            l(this, t, n, i)
        }))
    }, e.fn.trigger = function(t, i) {
        return t = m(t) || e.isPlainObject(t) ? e.Event(t) : c(t), t._args = i, this.each(function() {
            t.type in b && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, i)
        })
    }, e.fn.triggerHandler = function(t, n) {
        var o, s;
        return this.each(function(a, r) {
            o = u(m(t) ? e.Event(t) : t), o._args = n, o.target = r, e.each(i(r, t.type || t), function(e, t) {
                return s = t.proxy(o), o.isImmediatePropagationStopped() ? !1 : void 0
            })
        }), s
    }, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
        e.fn[t] = function(e) {
            return 0 in arguments ? this.bind(t, e) : this.trigger(t)
        }
    }), e.Event = function(e, t) {
        m(e) || (t = e, e = t.type);
        var i = document.createEvent(g[e] || "Events"),
            n = !0;
        if (t) for (var o in t)"bubbles" == o ? n = !! t[o] : i[o] = t[o];
        return i.initEvent(e, n, !0), c(i)
    }
}(Zepto), function(e) {
    function t(t, i, n) {
        var o = e.Event(i);
        return e(t).trigger(o, n), !o.isDefaultPrevented()
    }
    function i(e, i, n, o) {
        return e.global ? t(i || y, n, o) : void 0
    }
    function n(t) {
        t.global && 0 === e.active++ && i(t, null, "ajaxStart")
    }
    function o(t) {
        t.global && !--e.active && i(t, null, "ajaxStop")
    }
    function s(e, t) {
        var n = t.context;
        return t.beforeSend.call(n, e, t) === !1 || i(t, n, "ajaxBeforeSend", [e, t]) === !1 ? !1 : void i(t, n, "ajaxSend", [e, t])
    }
    function a(e, t, n, o) {
        var s = n.context,
            a = "success";
        n.success.call(s, e, a, t), o && o.resolveWith(s, [e, a, t]), i(n, s, "ajaxSuccess", [t, n, e]), l(a, t, n)
    }
    function r(e, t, n, o, s) {
        var a = o.context;
        o.error.call(a, n, t, e), s && s.rejectWith(a, [n, t, e]), i(o, a, "ajaxError", [n, o, e || t]), l(t, n, o)
    }
    function l(e, t, n) {
        var s = n.context;
        n.complete.call(s, t, e), i(n, s, "ajaxComplete", [t, n]), o(n)
    }
    function c() {}
    function u(e) {
        return e && (e = e.split(";", 2)[0]), e && (e == S ? "html" : e == x ? "json" : w.test(e) ? "script" : k.test(e) && "xml") || "text"
    }
    function d(e, t) {
        return "" == t ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
    }
    function h(t) {
        t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() || (t.url = d(t.url, t.data), t.data = void 0)
    }
    function f(t, i, n, o) {
        return e.isFunction(i) && (o = n, n = i, i = void 0), e.isFunction(n) || (o = n, n = void 0), {
            url: t,
            data: i,
            success: n,
            dataType: o
        }
    }
    function p(t, i, n, o) {
        var s, a = e.isArray(i),
            r = e.isPlainObject(i);
        e.each(i, function(i, l) {
            s = e.type(l), o && (i = n ? o : o + "[" + (r || "object" == s || "array" == s ? i : "") + "]"), !o && a ? t.add(l.name, l.value) : "array" == s || !n && "object" == s ? p(t, l, n, i) : t.add(i, l)
        })
    }
    var m, v, g = 0,
        y = window.document,
        b = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        w = /^(?:text|application)\/javascript/i,
        k = /^(?:text|application)\/xml/i,
        x = "application/json",
        S = "text/html",
        D = /^\s*$/,
        E = y.createElement("a");
    E.href = window.location.href, e.active = 0, e.ajaxJSONP = function(t, i) {
        if (!("type" in t)) return e.ajax(t);
        var n, o, l = t.jsonpCallback,
            c = (e.isFunction(l) ? l() : l) || "jsonp" + ++g,
            u = y.createElement("script"),
            d = window[c],
            h = function(t) {
                e(u).triggerHandler("error", t || "abort")
            },
            f = {
                abort: h
            };
        return i && i.promise(f), e(u).on("load error", function(s, l) {
            clearTimeout(o), e(u).off().remove(), "error" != s.type && n ? a(n[0], f, t, i) : r(null, l || "error", f, t, i), window[c] = d, n && e.isFunction(d) && d(n[0]), d = n = void 0
        }), s(f, t) === !1 ? (h("abort"), f) : (window[c] = function() {
            n = arguments
        }, u.src = t.url.replace(/\?(.+)=\?/, "?$1=" + c), y.head.appendChild(u), t.timeout > 0 && (o = setTimeout(function() {
            h("timeout")
        }, t.timeout)), f)
    }, e.ajaxSettings = {
        type: "GET",
        beforeSend: c,
        success: c,
        error: c,
        complete: c,
        context: null,
        global: !0,
        xhr: function() {
            return new window.XMLHttpRequest
        },
        accepts: {
            script: "text/javascript, application/javascript, application/x-javascript",
            json: x,
            xml: "application/xml, text/xml",
            html: S,
            text: "text/plain"
        },
        crossDomain: !1,
        timeout: 0,
        processData: !0,
        cache: !0
    }, e.ajax = function(t) {
        var i, o = e.extend({}, t || {}),
            l = e.Deferred && e.Deferred();
        for (m in e.ajaxSettings) void 0 === o[m] && (o[m] = e.ajaxSettings[m]);
        n(o), o.crossDomain || (i = y.createElement("a"), i.href = o.url, i.href = i.href, o.crossDomain = E.protocol + "//" + E.host != i.protocol + "//" + i.host), o.url || (o.url = window.location.toString()), h(o);
        var f = o.dataType,
            p = /\?.+=\?/.test(o.url);
        if (p && (f = "jsonp"), o.cache !== !1 && (t && t.cache === !0 || "script" != f && "jsonp" != f) || (o.url = d(o.url, "_=" + Date.now())), "jsonp" == f) return p || (o.url = d(o.url, o.jsonp ? o.jsonp + "=?" : o.jsonp === !1 ? "" : "callback=?")), e.ajaxJSONP(o, l);
        var g, b = o.accepts[f],
            w = {},
            k = function(e, t) {
                w[e.toLowerCase()] = [e, t]
            },
            x = /^([\w-]+:)\/\//.test(o.url) ? RegExp.$1 : window.location.protocol,
            S = o.xhr(),
            A = S.setRequestHeader;
        if (l && l.promise(S), o.crossDomain || k("X-Requested-With", "XMLHttpRequest"), k("Accept", b || "*/*"), (b = o.mimeType || b) && (b.indexOf(",") > -1 && (b = b.split(",", 2)[0]), S.overrideMimeType && S.overrideMimeType(b)), (o.contentType || o.contentType !== !1 && o.data && "GET" != o.type.toUpperCase()) && k("Content-Type", o.contentType || "application/x-www-form-urlencoded"), o.headers) for (v in o.headers) k(v, o.headers[v]);
        if (S.setRequestHeader = k, S.onreadystatechange = function() {
                if (4 == S.readyState) {
                    S.onreadystatechange = c, clearTimeout(g);
                    var t, i = !1;
                    if (S.status >= 200 && S.status < 300 || 304 == S.status || 0 == S.status && "file:" == x) {
                        f = f || u(o.mimeType || S.getResponseHeader("content-type")), t = S.responseText;
                        try {
                            "script" == f ? (1, eval)(t) : "xml" == f ? t = S.responseXML : "json" == f && (t = D.test(t) ? null : e.parseJSON(t))
                        } catch (n) {
                            i = n
                        }
                        i ? r(i, "parsererror", S, o, l) : a(t, S, o, l)
                    } else r(S.statusText || null, S.status ? "error" : "abort", S, o, l)
                }
            }, s(S, o) === !1) return S.abort(), r(null, "abort", S, o, l), S;
        if (o.xhrFields) for (v in o.xhrFields) S[v] = o.xhrFields[v];
        var _ = "async" in o ? o.async : !0;
        S.open(o.type, o.url, _, o.username, o.password);
        for (v in w) A.apply(S, w[v]);
        return o.timeout > 0 && (g = setTimeout(function() {
            S.onreadystatechange = c, S.abort(), r(null, "timeout", S, o, l)
        }, o.timeout)), S.send(o.data ? o.data : null), S
    }, e.get = function() {
        return e.ajax(f.apply(null, arguments))
    }, e.post = function() {
        var t = f.apply(null, arguments);
        return t.type = "POST", e.ajax(t)
    }, e.getJSON = function() {
        var t = f.apply(null, arguments);
        return t.dataType = "json", e.ajax(t)
    }, e.fn.load = function(t, i, n) {
        if (!this.length) return this;
        var o, s = this,
            a = t.split(/\s/),
            r = f(t, i, n),
            l = r.success;
        return a.length > 1 && (r.url = a[0], o = a[1]), r.success = function(t) {
            s.html(o ? e("<div>").html(t.replace(b, "")).find(o) : t), l && l.apply(s, arguments)
        }, e.ajax(r), this
    };
    var A = encodeURIComponent;
    e.param = function(t, i) {
        var n = [];
        return n.add = function(t, i) {
            e.isFunction(i) && (i = i()), null == i && (i = ""), this.push(A(t) + "=" + A(i))
        }, p(n, t, i), n.join("&").replace(/%20/g, "+")
    }
}(Zepto), function(e) {
    e.fn.serializeArray = function() {
        var t, i, n = [],
            o = function(e) {
                return e.forEach ? e.forEach(o) : void n.push({
                    name: t,
                    value: e
                })
            };
        return this[0] && e.each(this[0].elements, function(n, s) {
            i = s.type, t = s.name, t && "fieldset" != s.nodeName.toLowerCase() && !s.disabled && "submit" != i && "reset" != i && "button" != i && "file" != i && ("radio" != i && "checkbox" != i || s.checked) && o(e(s).val())
        }), n
    }, e.fn.serialize = function() {
        var e = [];
        return this.serializeArray().forEach(function(t) {
            e.push(encodeURIComponent(t.name) + "=" + encodeURIComponent(t.value))
        }), e.join("&")
    }, e.fn.submit = function(t) {
        if (0 in arguments) this.bind("submit", t);
        else if (this.length) {
            var i = e.Event("submit");
            this.eq(0).trigger(i), i.isDefaultPrevented() || this.get(0).submit()
        }
        return this
    }
}(Zepto), function(e) {
    "__proto__" in {} || e.extend(e.zepto, {
        Z: function(t, i) {
            return t = t || [], e.extend(t, e.fn), t.selector = i || "", t.__Z = !0, t
        },
        isZ: function(t) {
            return "array" === e.type(t) && "__Z" in t
        }
    });
    try {
        getComputedStyle(void 0)
    } catch (t) {
        var i = getComputedStyle;
        window.getComputedStyle = function(e) {
            try {
                return i(e)
            } catch (t) {
                return null
            }
        }
    }
}(Zepto), $$ = Dom7 = $, ["width", "height"].forEach(function(e) {
    var t = e.replace(/./, function(e) {
        return e[0].toUpperCase()
    });
    $.fn["outer" + t] = function(t) {
        var i = this;
        if (i) {
            var n = i[e](),
                o = {
                    width: ["left", "right"],
                    height: ["top", "bottom"]
                };
            return o[e].forEach(function(e) {
                t && (n += parseInt(i.css("margin-" + e), 10))
            }), n
        }
        return null
    }
}), define("zepto", function(e) {
    return function() {
        var t;
        return t || e.zepto
    }
}(this)), !
    function(e, t) {
        function i(e, t) {
            e = e.toString().split("."), t = t.toString().split(".");
            for (var i = 0; i < e.length || i < t.length; i++) {
                var n = parseInt(e[i], 10),
                    o = parseInt(t[i], 10);
                if (window.isNaN(n) && (n = 0), window.isNaN(o) && (o = 0), o > n) return -1;
                if (n > o) return 1
            }
            return 0
        }
        function n(e, t) {
            r && i(l, "2.4.0") < 0 ? setTimeout(function() {
                e && e(t)
            }, 1) : e && e(t)
        }
        var o = e.document,
            s = e.navigator.userAgent,
            a = /iPhone|iPad|iPod/i.test(s),
            r = /Android/i.test(s),
            l = s.match(/(?:OS|Android)[\/\s](\d+[._]\d+(?:[._]\d+)?)/i),
            c = s.match(/WindVane[\/\s](\d+[._]\d+[._]\d+)/),
            u = Object.prototype.hasOwnProperty,
            d = t.windvane = e.WindVane || (e.WindVane = {}),
            h = e.WindVane_Native,
            f = {},
            p = 1,
            m = [],
            v = 3,
            g = "hybrid",
            y = "wv_hybrid",
            b = "iframe_",
            w = "suc_",
            k = "err_",
            x = "defer_",
            S = "param_";
        l = l ? (l[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0", c = c ? (c[1] || "0.0.0").replace(/\_/g, ".") : "0.0.0";
        var D = {
                call: function(e, n, o, s, l, u) {
                    var d, f;
                    return "number" == typeof arguments[arguments.length - 1] && (u = arguments[arguments.length - 1]), "function" != typeof s && (s = null), "function" != typeof l && (l = null), t.promise && (f = t.promise.deferred()), d = u > 0 ? setTimeout(function() {
                        D.onFailure(d, {
                            ret: ["WV_ERR::TIMEOUT"]
                        })
                    }, u) : E.getSid(), E.registerCall(d, s, l, f), r ? i(c, "2.7.0") >= 0 ? E.callMethodByPrompt(e, n, E.buildParam(o), d + "") : h && h.callMethod && h.callMethod(e, n, E.buildParam(o), d + "") : a && E.callMethodByIframe(e, n, E.buildParam(o), d + ""), f ? f.promise() : void 0
                },
                fireEvent: function(e, t, i) {
                    var n = o.createEvent("HTMLEvents");
                    n.initEvent(e, !1, !0), !t && i && E.chunks[i] && (t = E.chunks[i].join("")), n.param = E.parseParam(t), o.dispatchEvent(n)
                },
                getParam: function(e) {
                    return E.params[S + e] || ""
                },
                setData: function(e, t) {
                    E.chunks[e] = E.chunks[e] || [], E.chunks[e].push(t)
                },
                onSuccess: function(e, t) {
                    clearTimeout(e);
                    var i = E.unregisterCall(e),
                        o = i.success,
                        s = i.deferred;
                    !t && E.chunks[e] && (t = E.chunks[e].join(""), delete E.chunks[e]);
                    var a = E.parseParam(t);
                    n(function(e) {
                        o && o(e), s && s.resolve(e)
                    }, a.value || a), E.onComplete(e)
                },
                onFailure: function(e, t) {
                    clearTimeout(e);
                    var i = E.unregisterCall(e),
                        o = i.failure,
                        s = i.deferred;
                    !t && E.chunks[e] && (t = E.chunks[e].join(""), delete E.chunks[e]);
                    var a = E.parseParam(t);
                    n(function(e) {
                        o && o(e), s && s.reject(e)
                    }, a.value || a), E.onComplete(e)
                }
            },
            E = {
                params: {},
                chunks: {},
                buildParam: function(e) {
                    return e && "object" == typeof e ? JSON.stringify(e) : e || ""
                },
                parseParam: function(e) {
                    var t;
                    if (e && "string" == typeof e) try {
                        t = JSON.parse(e)
                    } catch (i) {
                        t = {
                            ret: ["WV_ERR::PARAM_PARSE_ERROR"]
                        }
                    } else t = e || {};
                    return t
                },
                getSid: function() {
                    return Math.floor(Math.random() * (1 << 50)) + "" + p++
                },
                registerCall: function(e, t, i, n) {
                    t && (f[w + e] = t), i && (f[k + e] = i), n && (f[x + e] = n)
                },
                unregisterCall: function(e) {
                    var t = w + e,
                        i = k + e,
                        n = x + e,
                        o = {
                            success: f[t],
                            failure: f[i],
                            deferred: f[n]
                        };
                    return delete f[t], delete f[i], o.deferred && delete f[n], o
                },
                useIframe: function(e, t) {
                    var i = b + e,
                        n = m.pop();
                    n || (n = o.createElement("iframe"), n.setAttribute("frameborder", "0"), n.style.cssText = "width:0;height:0;border:0;display:none;"), n.setAttribute("id", i), n.setAttribute("src", t), n.parentNode || setTimeout(function() {
                        o.body.appendChild(n)
                    }, 5)
                },
                retrieveIframe: function(e) {
                    var t = b + e,
                        i = o.querySelector("#" + t);
                    m.length >= v ? o.body.removeChild(i) : m.push(i)
                },
                callMethodByIframe: function(e, t, i, n) {
                    var o = g + "://" + e + ":" + n + "/" + t + "?" + i;
                    this.params[S + n] = i, this.useIframe(n, o)
                },
                callMethodByPrompt: function(e, t, i, n) {
                    var o = g + "://" + e + ":" + n + "/" + t + "?" + i,
                        s = y + ":";
                    this.params[S + n] = i, window.prompt(o, s)
                },
                onComplete: function(e) {
                    a && this.retrieveIframe(e), delete this.params[S + e]
                }
            };
        for (var A in D) u.call(d, A) || (d[A] = D[A])
    }(window, window.lib || (window.lib = {})), define("windvane", function(e) {
    return function() {
        var t;
        return t || e.windvane
    }
}(this)), define("text", [], function() {
    var e, t, i, n, o, s = {},
        a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
        r = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        l = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        c = "undefined" != typeof location && location.href,
        u = c && location.protocol && location.protocol.replace(/\:/, ""),
        d = c && location.hostname,
        h = c && (location.port || void 0),
        f = {},
        p = s.config && s.config() || {};
    e = {
        version: "2.0.9",
        strip: function(e) {
            if (e) {
                e = e.replace(r, "");
                var t = e.match(l);
                t && (e = t[1])
            } else e = "";
            return e
        },
        jsEscape: function(e) {
            return e.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
        },
        createXhr: p.createXhr ||
        function() {
            var e, t, i;
            if ("undefined" != typeof XMLHttpRequest) return new XMLHttpRequest;
            if ("undefined" != typeof ActiveXObject) for (t = 0; 3 > t; t += 1) {
                i = a[t];
                try {
                    e = new ActiveXObject(i)
                } catch (n) {}
                if (e) {
                    a = [i];
                    break
                }
            }
            return e
        },
        parseName: function(e) {
            var t, i, n, o = !1,
                s = e.indexOf("."),
                a = 0 === e.indexOf("./") || 0 === e.indexOf("../");
            return -1 !== s && (!a || s > 1) ? (t = e.substring(0, s), i = e.substring(s + 1, e.length)) : t = e, n = i || t, s = n.indexOf("!"), -1 !== s && (o = "strip" === n.substring(s + 1), n = n.substring(0, s), i ? i = n : t = n), {
                moduleName: t,
                ext: i,
                strip: o
            }
        },
        xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
        useCrossHTML: function(e) {
            return e.indexOf(".html") > -1 ? !0 : !1
        },
        useXhr: function(t, i, n, o) {
            var s, a, r, l = e.xdRegExp.exec(t);
            return l ? (s = l[2], a = l[3], a = a.split(":"), r = a[1], a = a[0], !(s && s !== i || a && a.toLowerCase() !== n.toLowerCase() || (r || a) && r !== o)) : !0
        },
        finishLoad: function(t, i, n, o) {
            n = i ? e.strip(n) : n, p.isBuild && (f[t] = n), o(n)
        },
        load: function(t, i, n, o) {
            if (o.isBuild && !o.inlineText) return void n();
            p.isBuild = o.isBuild;
            var s = e.parseName(t),
                a = s.moduleName + (s.ext ? "." + s.ext : ""),
                r = i.toUrl(a),
                l = p.useXhr || e.useXhr;
            !c || l(r, u, d, h) ? e.get(r, function(i) {
                e.finishLoad(t, s.strip, i, n)
            }, function(e) {
                n.error && n.error(e)
            }) : e.useCrossHTML(r) ? m(r, function(t) {
                e.finishLoad(s.moduleName + "." + s.ext, s.strip, t.content, n)
            }) : i([a], function(t) {
                e.finishLoad(s.moduleName + "." + s.ext, s.strip, t, n)
            })
        },
        write: function(t, i, n, o) {
            if (f.hasOwnProperty(i)) {
                var s = e.jsEscape(f[i]);
                n.asModule(t + "!" + i, "define(function () { return '" + s + "';});\n")
            }
        },
        writeFile: function(t, i, n, o, s) {
            var a = e.parseName(i),
                r = a.ext ? "." + a.ext : "",
                l = a.moduleName + r,
                c = n.toUrl(a.moduleName + r) + ".js";
            e.load(l, n, function(i) {
                var n = function(e) {
                    return o(c, e)
                };
                n.asModule = function(e, t) {
                    return o.asModule(e, c, t)
                }, e.write(t, l, n, s)
            }, s)
        }
    };
    var m = function(e, t) {};
    return "node" === p.env || !p.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] ? (t = require.nodeRequire("fs"), e.get = function(e, i, n) {
        try {
            var o = t.readFileSync(e, "utf8");
            0 === o.indexOf("\ufeff") && (o = o.substring(1)), i(o)
        } catch (s) {
            n(s)
        }
    }) : "xhr" === p.env || !p.env && e.createXhr() ? e.get = function(t, i, n, o) {
        var s, a = e.createXhr();
        if (a.open("GET", t, !0), o) for (s in o) o.hasOwnProperty(s) && a.setRequestHeader(s.toLowerCase(), o[s]);
        p.onXhr && p.onXhr(a, t), a.onreadystatechange = function(e) {
            var o, s;
            4 === a.readyState && (o = a.status, o > 399 && 600 > o ? (s = new Error(t + " HTTP status: " + o), s.xhr = a, n(s)) : i(a.responseText), p.onXhrComplete && p.onXhrComplete(a, t))
        }, a.send(null)
    } : "rhino" === p.env || !p.env && "undefined" != typeof Packages && "undefined" != typeof java ? e.get = function(e, t) {
        var i, n, o = "utf-8",
            s = new java.io.File(e),
            a = java.lang.System.getProperty("line.separator"),
            r = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s), o)),
            l = "";
        try {
            for (i = new java.lang.StringBuffer, n = r.readLine(), n && n.length() && 65279 === n.charAt(0) && (n = n.substring(1)), null !== n && i.append(n); null !== (n = r.readLine());) i.append(a), i.append(n);
            l = String(i.toString())
        } finally {
            r.close()
        }
        t(l)
    } : ("xpconnect" === p.env || !p.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (i = Components.classes, n = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), o = "@mozilla.org/windows-registry-key;1" in i, e.get = function(e, t) {
        var s, a, r, l = {};
        o && (e = e.replace(/\//g, "\\")), r = new FileUtils.File(e);
        try {
            s = i["@mozilla.org/network/file-input-stream;1"].createInstance(n.nsIFileInputStream), s.init(r, 1, 0, !1), a = i["@mozilla.org/intl/converter-input-stream;1"].createInstance(n.nsIConverterInputStream), a.init(s, "utf-8", s.available(), n.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), a.readString(s.available(), l), a.close(), s.close(), t(l.value)
        } catch (c) {
            throw new Error((r && r.path || "") + ": " + c)
        }
    }), e
}), define("css", [], function() {
    if ("undefined" == typeof window) return {
        load: function(e, t, i) {
            i()
        }
    };
    var e = document.getElementsByTagName("head")[0],
        t = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0,
        i = !1,
        n = !0;
    t[1] || t[7] ? i = parseInt(t[1]) < 6 || parseInt(t[7]) <= 9 : t[2] || t[8] ? n = !1 : t[4] && (i = parseInt(t[4]) < 18);
    var o = {};
    o.pluginBuilder = "./css-builder";
    var s, a, r, l = function() {
            s = document.createElement("style"), e.appendChild(s), a = s.styleSheet || s.sheet
        },
        c = 0,
        u = [],
        d = function(e) {
            c++, 32 == c && (l(), c = 0), a.addImport(e), s.onload = function() {
                h()
            }
        },
        h = function() {
            r();
            var e = u.shift();
            return e ? (r = e[1], void d(e[0])) : void(r = null)
        },
        f = function(e, t) {
            if (a && a.addImport || l(), a && a.addImport) r ? u.push([e, t]) : (d(e), r = t);
            else {
                s.textContent = '@import "' + e + '";';
                var i = setInterval(function() {
                    try {
                        s.sheet.cssRules, clearInterval(i), t()
                    } catch (e) {}
                }, 10)
            }
        },
        p = function(t, i) {
            var o = document.createElement("link");
            if (o.type = "text/css", o.rel = "stylesheet", n) o.onload = function() {
                o.onload = function() {}, setTimeout(i, 7)
            };
            else var s = setInterval(function() {
                for (var e = 0; e < document.styleSheets.length; e++) {
                    var t = document.styleSheets[e];
                    if (t.href == o.href) return clearInterval(s), i()
                }
            }, 10);
            o.href = t, e.appendChild(o)
        };
    return o.normalize = function(e, t) {
        return ".css" == e.substr(e.length - 4, 4) && (e = e.substr(0, e.length - 4)), t(e)
    }, o.load = function(e, t, n, o) {
        (i ? f : p)(t.toUrl(e + ".css"), n)
    }, o
}), function() {
    function e(t, n) {
        function o(e, t) {
            return function() {
                return e.apply(t, arguments)
            }
        }
        var s;
        if (n = n || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = n.touchBoundary || 10, this.layer = t, this.tapDelay = n.tapDelay || 200, this.tapTimeout = n.tapTimeout || 700, !e.notNeeded(t)) {
            for (var a = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], r = this, l = 0, c = a.length; c > l; l++) r[a[l]] = o(r[a[l]], r);
            i && (t.addEventListener("mouseover", this.onMouse, !0), t.addEventListener("mousedown", this.onMouse, !0), t.addEventListener("mouseup", this.onMouse, !0)), t.addEventListener("click", this.onClick, !0), t.addEventListener("touchstart", this.onTouchStart, !1), t.addEventListener("touchmove", this.onTouchMove, !1), t.addEventListener("touchend", this.onTouchEnd, !1), t.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (t.removeEventListener = function(e, i, n) {
                var o = Node.prototype.removeEventListener;
                "click" === e ? o.call(t, e, i.hijacked || i, n) : o.call(t, e, i, n)
            }, t.addEventListener = function(e, i, n) {
                var o = Node.prototype.addEventListener;
                "click" === e ? o.call(t, e, i.hijacked || (i.hijacked = function(e) {
                        e.propagationStopped || i(e)
                    }), n) : o.call(t, e, i, n)
            }), "function" == typeof t.onclick && (s = t.onclick, t.addEventListener("click", function(e) {
                s(e)
            }, !1), t.onclick = null)
        }
    }
    var t = navigator.userAgent.indexOf("Windows Phone") >= 0,
        i = navigator.userAgent.indexOf("Android") > 0 && !t,
        n = /iP(ad|hone|od)/.test(navigator.userAgent) && !t,
        o = n && /OS 4_\d(_\d)?/.test(navigator.userAgent),
        s = n && /OS [6-7]_\d/.test(navigator.userAgent),
        a = navigator.userAgent.indexOf("BB10") > 0;
    e.prototype.needsClick = function(e) {
        switch (e.nodeName.toLowerCase()) {
            case "button":
            case "select":
            case "textarea":
                if (e.disabled) return !0;
                break;
            case "input":
                if (n && "file" === e.type || e.disabled) return !0;
                break;
            case "label":
            case "iframe":
            case "video":
                return !0
        }
        return /\bneedsclick\b/.test(e.className)
    }, e.prototype.needsFocus = function(e) {
        switch (e.nodeName.toLowerCase()) {
            case "textarea":
                return !0;
            case "select":
                return !i;
            case "input":
                switch (e.type) {
                    case "button":
                    case "checkbox":
                    case "file":
                    case "image":
                    case "radio":
                    case "submit":
                        return !1
                }
                return !e.disabled && !e.readOnly;
            default:
                return /\bneedsfocus\b/.test(e.className)
        }
    }, e.prototype.sendClick = function(e, t) {
        var i, n;
        document.activeElement && document.activeElement !== e && document.activeElement.blur(), n = t.changedTouches[0], i = document.createEvent("MouseEvents"), i.initMouseEvent(this.determineEventType(e), !0, !0, window, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), i.forwardedTouchEvent = !0, e.dispatchEvent(i)
    }, e.prototype.determineEventType = function(e) {
        return i && "select" === e.tagName.toLowerCase() ? "mousedown" : "click"
    }, e.prototype.focus = function(e) {
        var t;
        n && e.setSelectionRange && 0 !== e.type.indexOf("date") && "time" !== e.type && "month" !== e.type ? (t = e.value.length, e.setSelectionRange(t, t)) : e.focus()
    }, e.prototype.updateScrollParent = function(e) {
        var t, i;
        if (t = e.fastClickScrollParent, !t || !t.contains(e)) {
            i = e;
            do {
                if (i.scrollHeight > i.offsetHeight) {
                    t = i, e.fastClickScrollParent = i;
                    break
                }
                i = i.parentElement
            } while (i)
        }
        t && (t.fastClickLastScrollTop = t.scrollTop)
    }, e.prototype.getTargetElementFromEventTarget = function(e) {
        return e.nodeType === Node.TEXT_NODE ? e.parentNode : e
    }, e.prototype.onTouchStart = function(e) {
        var t, i, s;
        if (e.targetTouches.length > 1) return !0;
        if (t = this.getTargetElementFromEventTarget(e.target), i = e.targetTouches[0], n) {
            if (s = window.getSelection(), s.rangeCount && !s.isCollapsed) return !0;
            if (!o) {
                if (i.identifier && i.identifier === this.lastTouchIdentifier) return e.preventDefault(), !1;
                this.lastTouchIdentifier = i.identifier, this.updateScrollParent(t)
            }
        }
        return this.trackingClick = !0, this.trackingClickStart = e.timeStamp, this.targetElement = t, this.touchStartX = i.pageX, this.touchStartY = i.pageY, e.timeStamp - this.lastClickTime < this.tapDelay && e.preventDefault(), !0
    }, e.prototype.touchHasMoved = function(e) {
        var t = e.changedTouches[0],
            i = this.touchBoundary;
        return Math.abs(t.pageX - this.touchStartX) > i || Math.abs(t.pageY - this.touchStartY) > i ? !0 : !1
    }, e.prototype.onTouchMove = function(e) {
        return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
    }, e.prototype.findControl = function(e) {
        return void 0 !== e.control ? e.control : e.htmlFor ? document.getElementById(e.htmlFor) : e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
    }, e.prototype.onTouchEnd = function(e) {
        var t, a, r, l, c, u = this.targetElement;
        if (!this.trackingClick) return !0;
        if (e.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
        if (e.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
        if (this.cancelNextClick = !1, this.lastClickTime = e.timeStamp, a = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, s && (c = e.changedTouches[0], u = document.elementFromPoint(c.pageX - window.pageXOffset, c.pageY - window.pageYOffset) || u, u.fastClickScrollParent = this.targetElement.fastClickScrollParent), r = u.tagName.toLowerCase(), "label" === r) {
            if (t = this.findControl(u)) {
                if (this.focus(u), i) return !1;
                u = t
            }
        } else if (this.needsFocus(u)) return e.timeStamp - a > 100 || n && window.top !== window && "input" === r ? (this.targetElement = null, !1) : (this.focus(u), this.sendClick(u, e), n && "select" === r || (this.targetElement = null, e.preventDefault()), !1);
        return n && !o && (l = u.fastClickScrollParent, l && l.fastClickLastScrollTop !== l.scrollTop) ? !0 : (this.needsClick(u) || (e.preventDefault(), this.sendClick(u, e)), !1)
    }, e.prototype.onTouchCancel = function() {
        this.trackingClick = !1, this.targetElement = null
    }, e.prototype.onMouse = function(e) {
        return this.targetElement ? e.forwardedTouchEvent ? !0 : e.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.propagationStopped = !0, e.stopPropagation(), e.preventDefault(), !1) : !0 : !0
    }, e.prototype.onClick = function(e) {
        var t;
        return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === e.target.type && 0 === e.detail ? !0 : (t = this.onMouse(e), t || (this.targetElement = null), t)
    }, e.prototype.destroy = function() {
        var e = this.layer;
        i && (e.removeEventListener("mouseover", this.onMouse, !0), e.removeEventListener("mousedown", this.onMouse, !0), e.removeEventListener("mouseup", this.onMouse, !0)), e.removeEventListener("click", this.onClick, !0), e.removeEventListener("touchstart", this.onTouchStart, !1), e.removeEventListener("touchmove", this.onTouchMove, !1), e.removeEventListener("touchend", this.onTouchEnd, !1), e.removeEventListener("touchcancel", this.onTouchCancel, !1)
    }, e.notNeeded = function(e) {
        var t, n, o, s;
        if ("undefined" == typeof window.ontouchstart) return !0;
        if (n = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
            if (!i) return !0;
            if (t = document.querySelector("meta[name=viewport]")) {
                if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
                if (n > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
        }
        if (a && (o = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), o[1] >= 10 && o[2] >= 3 && (t = document.querySelector("meta[name=viewport]")))) {
            if (-1 !== t.content.indexOf("user-scalable=no")) return !0;
            if (document.documentElement.scrollWidth <= window.outerWidth) return !0
        }
        return "none" === e.style.msTouchAction || "manipulation" === e.style.touchAction ? !0 : (s = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], s >= 27 && (t = document.querySelector("meta[name=viewport]"), t && (-1 !== t.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === e.style.touchAction || "manipulation" === e.style.touchAction ? !0 : !1)
    }, e.attach = function(t, i) {
        return new e(t, i)
    }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define("fastclick", [], function() {
        return e
    }) : "undefined" != typeof module && module.exports ? (module.exports = e.attach, module.exports.FastClick = e) : window.FastClick = e, setTimeout(function() {
        e.attach(document.body)
    }, 1e3)
}(), function() {
    function e(e, t, i) {
        !
            function(n) {
                e[t] = e[i], e[i] = n
            }(e[t])
    }
    var t, i = function(e) {
        var t = this;
        Object.keys(e).forEach(function(i) {
            t[i] = e[i]
        })
    };
    i.prototype = {
        toString: function() {
            return JSON.stringify(this)
        }
    };
    var n = function(e, t) {
        this.old = e, this["new"] = t
    };
    n.prototype = {
        contains: function(e) {
            return e.length < this.length ? e["new"] >= this["new"] && e["new"] < this["new"] + this.length : !1
        },
        toString: function() {
            return this.length + " element subset, first mapping: old " + this.old + " \u2192 new " + this["new"]
        }
    };
    var o = function(e) {
            var t = [];
            return "#text" !== e.nodeName && "#comment" !== e.nodeName && (t.push(e.nodeName), e.attributes && (e.attributes["class"] && t.push(e.nodeName + "." + e.attributes["class"].replace(/ /g, ".")), e.attributes.id && t.push(e.nodeName + "#" + e.attributes.id))), t
        },
        s = function(e) {
            var t = {},
                i = {};
            return e.forEach(function(e) {
                o(e).forEach(function(e) {
                    var n = e in t,
                        o = e in i;
                    n || o ? n && (delete t[e], i[e] = !0) : t[e] = !0
                })
            }), t
        },
        a = function(e, t) {
            var i = s(e),
                n = s(t),
                o = {};
            return Object.keys(i).forEach(function(e) {
                n[e] && (o[e] = !0)
            }), o
        },
        r = function(e) {
            return delete e.outerDone, delete e.innerDone, delete e.valueDone, e.childNodes ? e.childNodes.every(r) : !0
        },
        l = function(e, t) {
            var i, n;
            if (!["nodeName", "value", "checked", "selected", "data"].every(function(i) {
                    return e[i] !== t[i] ? !1 : !0
                })) return !1;
            if (Boolean(e.attributes) !== Boolean(t.attributes)) return !1;
            if (Boolean(e.childNodes) !== Boolean(t.childNodes)) return !1;
            if (e.attributes) {
                if (i = Object.keys(e.attributes), n = Object.keys(t.attributes), i.length !== n.length) return !1;
                if (!i.every(function(i) {
                        return e.attributes[i] !== t.attributes[i] ? !1 : void 0
                    })) return !1
            }
            if (e.childNodes) {
                if (e.childNodes.length !== t.childNodes.length) return !1;
                if (!e.childNodes.every(function(e, i) {
                        return l(e, t.childNodes[i])
                    })) return !1
            }
            return !0
        },
        c = function(e, t, i, n, o) {
            var s, r, l;
            if (!e || !t) return !1;
            if (e.nodeName !== t.nodeName) return !1;
            if ("#text" === e.nodeName) return o ? !0 : e.data === t.data;
            if (e.nodeName in i) return !0;
            if (e.attributes && t.attributes) {
                if (e.attributes.id && e.attributes.id === t.attributes.id) {
                    var u = e.nodeName + "#" + e.attributes.id;
                    if (u in i) return !0
                }
                if (e.attributes["class"] && e.attributes["class"] === t.attributes["class"]) {
                    var d = e.nodeName + "." + e.attributes["class"].replace(/ /g, ".");
                    if (d in i) return !0
                }
            }
            return n ? !0 : (r = e.childNodes ? e.childNodes.slice().reverse() : [], l = t.childNodes ? t.childNodes.slice().reverse() : [], r.length !== l.length ? !1 : o ? r.every(function(e, t) {
                return e.nodeName === l[t].nodeName
            }) : (s = a(r, l), r.every(function(e, t) {
                return c(e, l[t], s, !0, !0)
            })))
        },
        u = function(e) {
            return JSON.parse(JSON.stringify(e))
        },
        d = function(e, t, i, s) {
            var r, l, u = 0,
                d = [],
                h = Array.apply(null, new Array(e.length + 1)).map(function() {
                    return []
                }),
                f = a(e, t),
                p = e.length === t.length;
            return p && e.some(function(e, i) {
                var n = o(e),
                    s = o(t[i]);
                return n.length !== s.length ? (p = !1, !0) : (n.some(function(e, t) {
                    return e !== s[t] ? (p = !1, !0) : void 0
                }), p ? void 0 : !0)
            }), e.forEach(function(e, n) {
                t.forEach(function(t, o) {
                    i[n] || s[o] || !c(e, t, f, p) ? h[n + 1][o + 1] = 0 : (h[n + 1][o + 1] = h[n][o] ? h[n][o] + 1 : 1, h[n + 1][o + 1] >= u && (u = h[n + 1][o + 1], d = [n + 1, o + 1]))
                })
            }), 0 === u ? !1 : (r = [d[0] - u, d[1] - u], l = new n(r[0], r[1]), l.length = u, l)
        },
        h = function(e, t) {
            return Array.apply(null, new Array(e)).map(function() {
                return t
            })
        },
        f = function(e, t, i) {
            var n = e.childNodes ? h(e.childNodes.length, !0) : [],
                o = t.childNodes ? h(t.childNodes.length, !0) : [],
                s = 0;
            return i.forEach(function(e) {
                var t, i = e.old + e.length,
                    a = e["new"] + e.length;
                for (t = e.old; i > t; t += 1) n[t] = s;
                for (t = e["new"]; a > t; t += 1) o[t] = s;
                s += 1
            }), {
                gaps1: n,
                gaps2: o
            }
        },
        p = function(e, t) {
            for (var i = e.childNodes ? e.childNodes : [], n = t.childNodes ? t.childNodes : [], o = h(i.length, !1), s = h(n.length, !1), a = [], r = !0, l = function() {
                return arguments[1]
            }, c = function(e) {
                o[r.old + e] = !0, s[r["new"] + e] = !0
            }; r;) r = d(i, n, o, s), r && (a.push(r), Array.apply(null, new Array(r.length)).map(l).forEach(c));
            return a
        },
        m = function() {
            this.list = []
        };
    m.prototype = {
        list: !1,
        add: function(e) {
            var t = this.list;
            e.forEach(function(e) {
                t.push(e)
            })
        },
        forEach: function(e) {
            this.list.forEach(e)
        }
    };
    var v = function(e) {
        var t, i = {
            debug: !1,
            diffcap: 10,
            maxDepth: !1,
            valueDiffing: !0,
            textDiff: function() {
                arguments[0].data = arguments[3]
            }
        };
        "undefined" == typeof e && (e = {});
        for (t in i)"undefined" == typeof e[t] ? this[t] = i[t] : this[t] = e[t]
    };
    v.prototype = {
        diff: function(e, i) {
            var n = this.nodeToObj(e),
                o = this.nodeToObj(i);
            return t = 0, this.debug && (this.t1Orig = this.nodeToObj(e), this.t2Orig = this.nodeToObj(i)), this.tracker = new m, this.findDiffs(n, o)
        },
        findDiffs: function(e, i) {
            var n;
            do {
                if (this.debug && (t += 1, t > this.diffcap)) throw window.diffError = [this.t1Orig, this.t2Orig], new Error("surpassed diffcap:" + JSON.stringify(this.t1Orig) + " -> " + JSON.stringify(this.t2Orig));
                n = this.findNextDiff(e, i, []), 0 === n.length && (l(e, i) || (r(e), n = this.findNextDiff(e, i, []))), n.length > 0 && (this.tracker.add(n), this.applyVirtual(e, n))
            } while (n.length > 0);
            return this.tracker.list
        },
        findNextDiff: function(e, t, i) {
            var n;
            if (this.maxDepth && i.length > this.maxDepth) return [];
            if (!e.outerDone) {
                if (n = this.findOuterDiff(e, t, i), n.length > 0) return e.outerDone = !0, n;
                e.outerDone = !0
            }
            if (!e.innerDone) {
                if (n = this.findInnerDiff(e, t, i), n.length > 0) return n;
                e.innerDone = !0
            }
            if (this.valueDiffing && !e.valueDone) {
                if (n = this.findValueDiff(e, t, i), n.length > 0) return e.valueDone = !0, n;
                e.valueDone = !0
            }
            return []
        },
        findOuterDiff: function(e, t, n) {
            var o, s, a = [];
            return e.nodeName !== t.nodeName ? [new i({
                action: "replaceElement",
                oldValue: u(e),
                newValue: u(t),
                route: n
            })] : e.data !== t.data ? "#text" === e.nodeName ? [new i({
                action: "modifyComment",
                route: n,
                oldValue: e.data,
                newValue: t.data
            })] : [new i({
                action: "modifyTextElement",
                route: n,
                oldValue: e.data,
                newValue: t.data
            })] : (o = e.attributes ? Object.keys(e.attributes).sort() : [], s = t.attributes ? Object.keys(t.attributes).sort() : [], o.forEach(function(o) {
                var r = s.indexOf(o); - 1 === r ? a.push(new i({
                    action: "removeAttribute",
                    route: n,
                    name: o,
                    value: e.attributes[o]
                })) : (s.splice(r, 1), e.attributes[o] !== t.attributes[o] && a.push(new i({
                    action: "modifyAttribute",
                    route: n,
                    name: o,
                    oldValue: e.attributes[o],
                    newValue: t.attributes[o]
                })))
            }), s.forEach(function(e) {
                a.push(new i({
                    action: "addAttribute",
                    route: n,
                    name: e,
                    value: t.attributes[e]
                }))
            }), a)
        },
        nodeToObj: function(e) {
            var t = {},
                i = this;
            return t.nodeName = e.nodeName, "#text" === t.nodeName || "#comment" === t.nodeName ? t.data = e.data : (e.attributes && e.attributes.length > 0 && (t.attributes = {}, Array.prototype.slice.call(e.attributes).forEach(function(e) {
                t.attributes[e.name] = e.value
            })), e.childNodes && e.childNodes.length > 0 && (t.childNodes = [], Array.prototype.slice.call(e.childNodes).forEach(function(e) {
                t.childNodes.push(i.nodeToObj(e))
            })), this.valueDiffing && (e.value && (t.value = e.value), e.checked && (t.checked = e.checked), e.selected && (t.selected = e.selected))), t
        },
        objToNode: function(e, t) {
            var i, n = this;
            return "#text" === e.nodeName ? i = document.createTextNode(e.data) : "#comment" === e.nodeName ? i = document.createComment(e.data) : ("svg" === e.nodeName || t ? (i = document.createElementNS("http://www.w3.org/2000/svg", e.nodeName), t = !0) : i = document.createElement(e.nodeName), e.attributes && Object.keys(e.attributes).forEach(function(t) {
                i.setAttribute(t, e.attributes[t])
            }), e.childNodes && e.childNodes.forEach(function(e) {
                i.appendChild(n.objToNode(e, t))
            }), this.valueDiffing && (e.value && (i.value = e.value), e.checked && (i.checked = e.checked), e.selected && (i.selected = e.selected))), i
        },
        findInnerDiff: function(e, t, n) {
            var o, s, a, r, l, c = e.childNodes && t.childNodes ? p(e, t) : [],
                d = e.childNodes ? e.childNodes : [],
                h = t.childNodes ? t.childNodes : [],
                f = [],
                m = 0;
            if (c.length > 1) return this.attemptGroupRelocation(e, t, c, n);
            for (s = Math.max(d.length, h.length), d.length !== h.length && (o = !0), l = 0; s > l; l += 1) a = d[l], r = h[l], o && (a && !r ? "#text" === a.nodeName ? (f.push(new i({
                action: "removeTextElement",
                route: n.concat(m),
                value: a.data
            })), m -= 1) : (f.push(new i({
                action: "removeElement",
                route: n.concat(m),
                element: u(a)
            })), m -= 1) : r && !a && ("#text" === r.nodeName ? f.push(new i({
                action: "addTextElement",
                route: n.concat(m),
                value: r.data
            })) : f.push(new i({
                action: "addElement",
                route: n.concat(m),
                element: u(r)
            })))), a && r && (f = f.concat(this.findNextDiff(a, r, n.concat(m)))), m += 1;
            return e.innerDone = !0, f
        },
        attemptGroupRelocation: function(e, t, n, o) {
            var s, a, r, l, d, h, p, m, v, g = f(e, t, n),
                y = g.gaps1,
                b = g.gaps2,
                w = Math.min(y.length, b.length),
                k = [];
            for (m = 0, p = 0; w > m; p += 1, m += 1) if (y[m] === !0) if (l = e.childNodes[p], "#text" === l.nodeName) {
                if ("#text" === t.childNodes[m].nodeName && l.data !== t.childNodes[m].data) {
                    for (h = p; e.childNodes.length > h + 1 && "#text" === e.childNodes[h + 1].nodeName;) if (h += 1, t.childNodes[m].data === e.childNodes[h].data) {
                        d = !0;
                        break
                    }
                    d || k.push(new i({
                        action: "modifyTextElement",
                        route: o.concat(m),
                        oldValue: l.data,
                        newValue: t.childNodes[m].data
                    }))
                }
                k.push(new i({
                    action: "removeTextElement",
                    route: o.concat(m),
                    value: l.data
                })), y.splice(m, 1), w = Math.min(y.length, b.length), m -= 1
            } else k.push(new i({
                action: "removeElement",
                route: o.concat(m),
                element: u(l)
            })), y.splice(m, 1), w = Math.min(y.length, b.length), m -= 1;
            else if (b[m] === !0) l = t.childNodes[m], "#text" === l.nodeName ? (k.push(new i({
                action: "addTextElement",
                route: o.concat(m),
                value: l.data
            })), y.splice(m, 0, !0), w = Math.min(y.length, b.length), p -= 1) : (k.push(new i({
                action: "addElement",
                route: o.concat(m),
                element: u(l)
            })), y.splice(m, 0, !0), w = Math.min(y.length, b.length), p -= 1);
            else if (y[m] !== b[m]) {
                if (k.length > 0) return k;
                if (r = n[y[m]], a = Math.min(r["new"], e.childNodes.length - r.length), a !== r.old) {
                    for (s = !1, v = 0; v < r.length; v += 1) c(e.childNodes[a + v], e.childNodes[r.old + v], [], !1, !0) || (s = !0);
                    if (s) return [new i({
                        action: "relocateGroup",
                        groupLength: r.length,
                        from: r.old,
                        to: a,
                        route: o
                    })]
                }
            }
            return k
        },
        findValueDiff: function(e, t, n) {
            var o = [];
            return e.selected !== t.selected && o.push(new i({
                action: "modifySelected",
                oldValue: e.selected,
                newValue: t.selected,
                route: n
            })), (e.value || t.value) && e.value !== t.value && "OPTION" !== e.nodeName && o.push(new i({
                action: "modifyValue",
                oldValue: e.value,
                newValue: t.value,
                route: n
            })), e.checked !== t.checked && o.push(new i({
                action: "modifyChecked",
                oldValue: e.checked,
                newValue: t.checked,
                route: n
            })), o
        },
        applyVirtual: function(e, t) {
            var i = this;
            return 0 === t.length ? !0 : (t.forEach(function(t) {
                i.applyVirtualDiff(e, t)
            }), !0)
        },
        getFromVirtualRoute: function(e, t) {
            var i, n, o = e;
            for (t = t.slice(); t.length > 0;) {
                if (!o.childNodes) return !1;
                n = t.splice(0, 1)[0], i = o, o = o.childNodes[n]
            }
            return {
                node: o,
                parentNode: i,
                nodeIndex: n
            }
        },
        applyVirtualDiff: function(e, t) {
            var i, n, o, s = this.getFromVirtualRoute(e, t.route),
                a = s.node,
                r = s.parentNode,
                l = s.nodeIndex;
            switch (t.action) {
                case "addAttribute":
                    a.attributes || (a.attributes = {}), a.attributes[t.name] = t.value, "checked" === t.name ? a.checked = !0 : "selected" === t.name ? a.selected = !0 : "INPUT" === a.nodeName && "value" === t.name && (a.value = t.value);
                    break;
                case "modifyAttribute":
                    a.attributes[t.name] = t.newValue, "INPUT" === a.nodeName && "value" === t.name && (a.value = t.value);
                    break;
                case "removeAttribute":
                    delete a.attributes[t.name], 0 === Object.keys(a.attributes).length && delete a.attributes, "checked" === t.name ? delete a.checked : "selected" === t.name ? delete a.selected : "INPUT" === a.nodeName && "value" === t.name && delete a.value;
                    break;
                case "modifyTextElement":
                    a.data = t.newValue, "TEXTAREA" === r.nodeName && (r.value = t.newValue);
                    break;
                case "modifyValue":
                    a.value = t.newValue;
                    break;
                case "modifyComment":
                    a.data = t.newValue;
                    break;
                case "modifyChecked":
                    a.checked = t.newValue;
                    break;
                case "modifySelected":
                    a.selected = t.newValue;
                    break;
                case "replaceElement":
                    i = u(t.newValue), i.outerDone = !0, i.innerDone = !0, i.valueDone = !0, r.childNodes[l] = i;
                    break;
                case "relocateGroup":
                    a.childNodes.splice(t.from, t.groupLength).reverse().forEach(function(e) {
                        a.childNodes.splice(t.to, 0, e)
                    });
                    break;
                case "removeElement":
                    r.childNodes.splice(l, 1);
                    break;
                case "addElement":
                    n = t.route.slice(), o = n.splice(n.length - 1, 1)[0], a = this.getFromVirtualRoute(e, n).node, i = u(t.element), i.outerDone = !0, i.innerDone = !0, i.valueDone = !0, a.childNodes || (a.childNodes = []), o >= a.childNodes.length ? a.childNodes.push(i) : a.childNodes.splice(o, 0, i);
                    break;
                case "removeTextElement":
                    r.childNodes.splice(l, 1), "TEXTAREA" === r.nodeName && delete r.value;
                    break;
                case "addTextElement":
                    n = t.route.slice(), o = n.splice(n.length - 1, 1)[0], i = {}, i.nodeName = "#text", i.data = t.value, a = this.getFromVirtualRoute(e, n).node, a.childNodes || (a.childNodes = []), o >= a.childNodes.length ? a.childNodes.push(i) : a.childNodes.splice(o, 0, i), "TEXTAREA" === a.nodeName && (a.value = t.newValue);
                    break;
                default:
                    console.log("unknown action")
            }
        },
        apply: function(e, t) {
            var i = this;
            return 0 === t.length ? !0 : (t.forEach(function(t) {
                return i.applyDiff(e, t) ? void 0 : !1
            }), !0)
        },
        getFromRoute: function(e, t) {
            t = t.slice();
            for (var i, n = e; t.length > 0;) {
                if (!n.childNodes) return !1;
                i = t.splice(0, 1)[0], n = n.childNodes[i]
            }
            return n
        },
        applyDiff: function(e, t) {
            var i, n, o, s, a = this.getFromRoute(e, t.route);
            switch (t.action) {
                case "addAttribute":
                    if (!a || !a.setAttribute) return !1;
                    a.setAttribute(t.name, t.value);
                    break;
                case "modifyAttribute":
                    if (!a || !a.setAttribute) return !1;
                    a.setAttribute(t.name, t.newValue);
                    break;
                case "removeAttribute":
                    if (!a || !a.removeAttribute) return !1;
                    a.removeAttribute(t.name);
                    break;
                case "modifyTextElement":
                    if (!a || 3 !== a.nodeType) return !1;
                    this.textDiff(a, a.data, t.oldValue, t.newValue);
                    break;
                case "modifyValue":
                    if (!a || "undefined" == typeof a.value) return !1;
                    a.value = t.newValue;
                    break;
                case "modifyComment":
                    if (!a || "undefined" == typeof a.data) return !1;
                    a.data = t.newValue;
                    break;
                case "modifyChecked":
                    if (!a || "undefined" == typeof a.checked) return !1;
                    a.checked = t.newValue;
                    break;
                case "modifySelected":
                    if (!a || "undefined" == typeof a.selected) return !1;
                    a.selected = t.newValue;
                    break;
                case "replaceElement":
                    a.parentNode.replaceChild(this.objToNode(t.newValue), a);
                    break;
                case "relocateGroup":
                    Array.apply(null, new Array(t.groupLength)).map(function() {
                        return a.removeChild(a.childNodes[t.from])
                    }).forEach(function(e, i) {
                        0 === i && (n = a.childNodes[t.to]), a.insertBefore(e, n)
                    });
                    break;
                case "removeElement":
                    a.parentNode.removeChild(a);
                    break;
                case "addElement":
                    o = t.route.slice(), s = o.splice(o.length - 1, 1)[0], a = this.getFromRoute(e, o), a.insertBefore(this.objToNode(t.element), a.childNodes[s]);
                    break;
                case "removeTextElement":
                    if (!a || 3 !== a.nodeType) return !1;
                    a.parentNode.removeChild(a);
                    break;
                case "addTextElement":
                    if (o = t.route.slice(), s = o.splice(o.length - 1, 1)[0], i = document.createTextNode(t.value), a = this.getFromRoute(e, o), !a || !a.childNodes) return !1;
                    a.insertBefore(i, a.childNodes[s]);
                    break;
                default:
                    console.log("unknown action")
            }
            return !0
        },
        undo: function(e, t) {
            t = t.slice();
            var i = this;
            t.length || (t = [t]), t.reverse(), t.forEach(function(t) {
                i.undoDiff(e, t)
            })
        },
        undoDiff: function(t, i) {
            switch (i.action) {
                case "addAttribute":
                    i.action = "removeAttribute", this.applyDiff(t, i);
                    break;
                case "modifyAttribute":
                    e(i, "oldValue", "newValue"), this.applyDiff(t, i);
                    break;
                case "removeAttribute":
                    i.action = "addAttribute", this.applyDiff(t, i);
                    break;
                case "modifyTextElement":
                    e(i, "oldValue", "newValue"), this.applyDiff(t, i);
                    break;
                case "modifyValue":
                    e(i, "oldValue", "newValue"), this.applyDiff(t, i);
                    break;
                case "modifyComment":
                    e(i, "oldValue", "newValue"), this.applyDiff(t, i);
                    break;
                case "modifyChecked":
                    e(i, "oldValue", "newValue"), this.applyDiff(t, i);
                    break;
                case "modifySelected":
                    e(i, "oldValue", "newValue"), this.applyDiff(t, i);
                    break;
                case "replaceElement":
                    e(i, "oldValue", "newValue"), this.applyDiff(t, i);
                    break;
                case "relocateGroup":
                    e(i, "from", "to"), this.applyDiff(t, i);
                    break;
                case "removeElement":
                    i.action = "addElement", this.applyDiff(t, i);
                    break;
                case "addElement":
                    i.action = "removeElement", this.applyDiff(t, i);
                    break;
                case "removeTextElement":
                    i.action = "addTextElement", this.applyDiff(t, i);
                    break;
                case "addTextElement":
                    i.action = "removeTextElement", this.applyDiff(t, i);
                    break;
                default:
                    console.log("unknown action")
            }
        }
    }, "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = v), exports.diffDOM = v) : this.diffDOM = v
}.call(this), define("diffDOM", function() {}), define("overwriteHTMLFN", [], function() {
    var e = document.createElement("div");
    !
        function() {
            $.fn.superHtml = $.fn.html, $.fn.html = diffDOM ?
                function(t, i) {
                    if (i) return e.innerHTML = t, e.innerHTML != t ? this : (dd = new diffDOM, dd.apply(this[0], dd.diff(this[0], e)), this.eq(0).trigger("virtualdomrendered"), this);
                    var n = this.superHtml.apply(this, arguments);
                    return n
                } : $.fn.superHtml
        }(window.Zepto)
}), function() {
    function e(e) {
        function t(t, i, n, o, s, a) {
            for (; s >= 0 && a > s; s += e) {
                var r = o ? o[s] : s;
                n = i(n, t[r], r, t)
            }
            return n
        }
        return function(i, n, o, s) {
            n = b(n, s, 4);
            var a = !A(i) && y.keys(i),
                r = (a || i).length,
                l = e > 0 ? 0 : r - 1;
            return arguments.length < 3 && (o = i[a ? a[l] : l], l += e), t(i, n, o, a, l, r)
        }
    }
    function t(e) {
        return function(t, i, n) {
            i = w(i, n);
            for (var o = E(t), s = e > 0 ? 0 : o - 1; s >= 0 && o > s; s += e) if (i(t[s], s, t)) return s;
            return -1
        }
    }
    function i(e, t, i) {
        return function(n, o, s) {
            var a = 0,
                r = E(n);
            if ("number" == typeof s) e > 0 ? a = s >= 0 ? s : Math.max(s + r, a) : r = s >= 0 ? Math.min(s + 1, r) : s + r + 1;
            else if (i && s && r) return s = i(n, o), n[s] === o ? s : -1;
            if (o !== o) return s = t(u.call(n, a, r), y.isNaN), s >= 0 ? s + a : -1;
            for (s = e > 0 ? a : r - 1; s >= 0 && r > s; s += e) if (n[s] === o) return s;
            return -1
        }
    }
    function n(e, t) {
        var i = I.length,
            n = e.constructor,
            o = y.isFunction(n) && n.prototype || r,
            s = "constructor";
        for (y.has(e, s) && !y.contains(t, s) && t.push(s); i--;) s = I[i], s in e && e[s] !== o[s] && !y.contains(t, s) && t.push(s)
    }
    var o = this,
        s = o._,
        a = Array.prototype,
        r = Object.prototype,
        l = Function.prototype,
        c = a.push,
        u = a.slice,
        d = r.toString,
        h = r.hasOwnProperty,
        f = Array.isArray,
        p = Object.keys,
        m = l.bind,
        v = Object.create,
        g = function() {},
        y = function(e) {
            return e instanceof y ? e : this instanceof y ? void(this._wrapped = e) : new y(e)
        };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = y), exports._ = y) : o._ = y, y.VERSION = "1.8.3";
    var b = function(e, t, i) {
            if (void 0 === t) return e;
            switch (null == i ? 3 : i) {
                case 1:
                    return function(i) {
                        return e.call(t, i)
                    };
                case 2:
                    return function(i, n) {
                        return e.call(t, i, n)
                    };
                case 3:
                    return function(i, n, o) {
                        return e.call(t, i, n, o)
                    };
                case 4:
                    return function(i, n, o, s) {
                        return e.call(t, i, n, o, s)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        },
        w = function(e, t, i) {
            return null == e ? y.identity : y.isFunction(e) ? b(e, t, i) : y.isObject(e) ? y.matcher(e) : y.property(e)
        };
    y.iteratee = function(e, t) {
        return w(e, t, 1 / 0)
    };
    var k = function(e, t) {
            return function(i) {
                var n = arguments.length;
                if (2 > n || null == i) return i;
                for (var o = 1; n > o; o++) for (var s = arguments[o], a = e(s), r = a.length, l = 0; r > l; l++) {
                    var c = a[l];
                    t && void 0 !== i[c] || (i[c] = s[c])
                }
                return i
            }
        },
        x = function(e) {
            if (!y.isObject(e)) return {};
            if (v) return v(e);
            g.prototype = e;
            var t = new g;
            return g.prototype = null, t
        },
        S = function(e) {
            return function(t) {
                return null == t ? void 0 : t[e]
            }
        },
        D = Math.pow(2, 53) - 1,
        E = S("length"),
        A = function(e) {
            var t = E(e);
            return "number" == typeof t && t >= 0 && D >= t
        };
    y.each = y.forEach = function(e, t, i) {
        t = b(t, i);
        var n, o;
        if (A(e)) for (n = 0, o = e.length; o > n; n++) t(e[n], n, e);
        else {
            var s = y.keys(e);
            for (n = 0, o = s.length; o > n; n++) t(e[s[n]], s[n], e)
        }
        return e
    }, y.map = y.collect = function(e, t, i) {
        t = w(t, i);
        for (var n = !A(e) && y.keys(e), o = (n || e).length, s = Array(o), a = 0; o > a; a++) {
            var r = n ? n[a] : a;
            s[a] = t(e[r], r, e)
        }
        return s
    }, y.reduce = y.foldl = y.inject = e(1), y.reduceRight = y.foldr = e(-1), y.find = y.detect = function(e, t, i) {
        var n;
        return n = A(e) ? y.findIndex(e, t, i) : y.findKey(e, t, i), void 0 !== n && -1 !== n ? e[n] : void 0
    }, y.filter = y.select = function(e, t, i) {
        var n = [];
        return t = w(t, i), y.each(e, function(e, i, o) {
            t(e, i, o) && n.push(e)
        }), n
    }, y.reject = function(e, t, i) {
        return y.filter(e, y.negate(w(t)), i)
    }, y.every = y.all = function(e, t, i) {
        t = w(t, i);
        for (var n = !A(e) && y.keys(e), o = (n || e).length, s = 0; o > s; s++) {
            var a = n ? n[s] : s;
            if (!t(e[a], a, e)) return !1
        }
        return !0
    }, y.some = y.any = function(e, t, i) {
        t = w(t, i);
        for (var n = !A(e) && y.keys(e), o = (n || e).length, s = 0; o > s; s++) {
            var a = n ? n[s] : s;
            if (t(e[a], a, e)) return !0
        }
        return !1
    }, y.contains = y.includes = y.include = function(e, t, i, n) {
        return A(e) || (e = y.values(e)), ("number" != typeof i || n) && (i = 0), y.indexOf(e, t, i) >= 0
    }, y.invoke = function(e, t) {
        var i = u.call(arguments, 2),
            n = y.isFunction(t);
        return y.map(e, function(e) {
            var o = n ? t : e[t];
            return null == o ? o : o.apply(e, i)
        })
    }, y.pluck = function(e, t) {
        return y.map(e, y.property(t))
    }, y.where = function(e, t) {
        return y.filter(e, y.matcher(t))
    }, y.findWhere = function(e, t) {
        return y.find(e, y.matcher(t))
    }, y.max = function(e, t, i) {
        var n, o, s = -(1 / 0),
            a = -(1 / 0);
        if (null == t && null != e) {
            e = A(e) ? e : y.values(e);
            for (var r = 0, l = e.length; l > r; r++) n = e[r], n > s && (s = n)
        } else t = w(t, i), y.each(e, function(e, i, n) {
            o = t(e, i, n), (o > a || o === -(1 / 0) && s === -(1 / 0)) && (s = e, a = o)
        });
        return s
    }, y.min = function(e, t, i) {
        var n, o, s = 1 / 0,
            a = 1 / 0;
        if (null == t && null != e) {
            e = A(e) ? e : y.values(e);
            for (var r = 0, l = e.length; l > r; r++) n = e[r], s > n && (s = n)
        } else t = w(t, i), y.each(e, function(e, i, n) {
            o = t(e, i, n), (a > o || o === 1 / 0 && s === 1 / 0) && (s = e, a = o)
        });
        return s
    }, y.shuffle = function(e) {
        for (var t, i = A(e) ? e : y.values(e), n = i.length, o = Array(n), s = 0; n > s; s++) t = y.random(0, s), t !== s && (o[s] = o[t]), o[t] = i[s];
        return o
    }, y.sample = function(e, t, i) {
        return null == t || i ? (A(e) || (e = y.values(e)), e[y.random(e.length - 1)]) : y.shuffle(e).slice(0, Math.max(0, t))
    }, y.sortBy = function(e, t, i) {
        return t = w(t, i), y.pluck(y.map(e, function(e, i, n) {
            return {
                value: e,
                index: i,
                criteria: t(e, i, n)
            }
        }).sort(function(e, t) {
            var i = e.criteria,
                n = t.criteria;
            if (i !== n) {
                if (i > n || void 0 === i) return 1;
                if (n > i || void 0 === n) return -1
            }
            return e.index - t.index
        }), "value")
    };
    var _ = function(e) {
        return function(t, i, n) {
            var o = {};
            return i = w(i, n), y.each(t, function(n, s) {
                var a = i(n, s, t);
                e(o, n, a)
            }), o
        }
    };
    y.groupBy = _(function(e, t, i) {
        y.has(e, i) ? e[i].push(t) : e[i] = [t]
    }), y.indexBy = _(function(e, t, i) {
        e[i] = t
    }), y.countBy = _(function(e, t, i) {
        y.has(e, i) ? e[i]++ : e[i] = 1
    }), y.toArray = function(e) {
        return e ? y.isArray(e) ? u.call(e) : A(e) ? y.map(e, y.identity) : y.values(e) : []
    }, y.size = function(e) {
        return null == e ? 0 : A(e) ? e.length : y.keys(e).length
    }, y.partition = function(e, t, i) {
        t = w(t, i);
        var n = [],
            o = [];
        return y.each(e, function(e, i, s) {
            (t(e, i, s) ? n : o).push(e)
        }), [n, o]
    }, y.first = y.head = y.take = function(e, t, i) {
        return null != e ? null == t || i ? e[0] : y.initial(e, e.length - t) : void 0
    }, y.initial = function(e, t, i) {
        return u.call(e, 0, Math.max(0, e.length - (null == t || i ? 1 : t)))
    }, y.last = function(e, t, i) {
        return null != e ? null == t || i ? e[e.length - 1] : y.rest(e, Math.max(0, e.length - t)) : void 0
    }, y.rest = y.tail = y.drop = function(e, t, i) {
        return u.call(e, null == t || i ? 1 : t)
    }, y.compact = function(e) {
        return y.filter(e, y.identity)
    };
    var T = function(e, t, i, n) {
        for (var o = [], s = 0, a = n || 0, r = E(e); r > a; a++) {
            var l = e[a];
            if (A(l) && (y.isArray(l) || y.isArguments(l))) {
                t || (l = T(l, t, i));
                var c = 0,
                    u = l.length;
                for (o.length += u; u > c;) o[s++] = l[c++]
            } else i || (o[s++] = l)
        }
        return o
    };
    y.flatten = function(e, t) {
        return T(e, t, !1)
    }, y.without = function(e) {
        return y.difference(e, u.call(arguments, 1))
    }, y.uniq = y.unique = function(e, t, i, n) {
        y.isBoolean(t) || (n = i, i = t, t = !1), null != i && (i = w(i, n));
        for (var o = [], s = [], a = 0, r = E(e); r > a; a++) {
            var l = e[a],
                c = i ? i(l, a, e) : l;
            t ? (a && s === c || o.push(l), s = c) : i ? y.contains(s, c) || (s.push(c), o.push(l)) : y.contains(o, l) || o.push(l)
        }
        return o
    }, y.union = function() {
        return y.uniq(T(arguments, !0, !0))
    }, y.intersection = function(e) {
        for (var t = [], i = arguments.length, n = 0, o = E(e); o > n; n++) {
            var s = e[n];
            if (!y.contains(t, s)) {
                for (var a = 1; i > a && y.contains(arguments[a], s); a++);
                a === i && t.push(s)
            }
        }
        return t
    }, y.difference = function(e) {
        var t = T(arguments, !0, !0, 1);
        return y.filter(e, function(e) {
            return !y.contains(t, e)
        })
    }, y.zip = function() {
        return y.unzip(arguments)
    }, y.unzip = function(e) {
        for (var t = e && y.max(e, E).length || 0, i = Array(t), n = 0; t > n; n++) i[n] = y.pluck(e, n);
        return i
    }, y.object = function(e, t) {
        for (var i = {}, n = 0, o = E(e); o > n; n++) t ? i[e[n]] = t[n] : i[e[n][0]] = e[n][1];
        return i
    }, y.findIndex = t(1), y.findLastIndex = t(-1), y.sortedIndex = function(e, t, i, n) {
        i = w(i, n, 1);
        for (var o = i(t), s = 0, a = E(e); a > s;) {
            var r = Math.floor((s + a) / 2);
            i(e[r]) < o ? s = r + 1 : a = r
        }
        return s
    }, y.indexOf = i(1, y.findIndex, y.sortedIndex), y.lastIndexOf = i(-1, y.findLastIndex), y.range = function(e, t, i) {
        null == t && (t = e || 0, e = 0), i = i || 1;
        for (var n = Math.max(Math.ceil((t - e) / i), 0), o = Array(n), s = 0; n > s; s++, e += i) o[s] = e;
        return o
    };
    var C = function(e, t, i, n, o) {
        if (!(n instanceof t)) return e.apply(i, o);
        var s = x(e.prototype),
            a = e.apply(s, o);
        return y.isObject(a) ? a : s
    };
    y.bind = function(e, t) {
        if (m && e.bind === m) return m.apply(e, u.call(arguments, 1));
        if (!y.isFunction(e)) throw new TypeError("Bind must be called on a function");
        var i = u.call(arguments, 2),
            n = function() {
                return C(e, n, t, this, i.concat(u.call(arguments)))
            };
        return n
    }, y.partial = function(e) {
        var t = u.call(arguments, 1),
            i = function() {
                for (var n = 0, o = t.length, s = Array(o), a = 0; o > a; a++) s[a] = t[a] === y ? arguments[n++] : t[a];
                for (; n < arguments.length;) s.push(arguments[n++]);
                return C(e, i, this, this, s)
            };
        return i
    }, y.bindAll = function(e) {
        var t, i, n = arguments.length;
        if (1 >= n) throw new Error("bindAll must be passed function names");
        for (t = 1; n > t; t++) i = arguments[t], e[i] = y.bind(e[i], e);
        return e
    }, y.memoize = function(e, t) {
        var i = function(n) {
            var o = i.cache,
                s = "" + (t ? t.apply(this, arguments) : n);
            return y.has(o, s) || (o[s] = e.apply(this, arguments)), o[s]
        };
        return i.cache = {}, i
    }, y.delay = function(e, t) {
        var i = u.call(arguments, 2);
        return setTimeout(function() {
            return e.apply(null, i)
        }, t)
    }, y.defer = y.partial(y.delay, y, 1), y.throttle = function(e, t, i) {
        var n, o, s, a = null,
            r = 0;
        i || (i = {});
        var l = function() {
            r = i.leading === !1 ? 0 : y.now(), a = null, s = e.apply(n, o), a || (n = o = null)
        };
        return function() {
            var c = y.now();
            r || i.leading !== !1 || (r = c);
            var u = t - (c - r);
            return n = this, o = arguments, 0 >= u || u > t ? (a && (clearTimeout(a), a = null), r = c, s = e.apply(n, o), a || (n = o = null)) : a || i.trailing === !1 || (a = setTimeout(l, u)), s
        }
    }, y.debounce = function(e, t, i) {
        var n, o, s, a, r, l = function() {
            var c = y.now() - a;
            t > c && c >= 0 ? n = setTimeout(l, t - c) : (n = null, i || (r = e.apply(s, o), n || (s = o = null)))
        };
        return function() {
            s = this, o = arguments, a = y.now();
            var c = i && !n;
            return n || (n = setTimeout(l, t)), c && (r = e.apply(s, o), s = o = null), r
        }
    }, y.wrap = function(e, t) {
        return y.partial(t, e)
    }, y.negate = function(e) {
        return function() {
            return !e.apply(this, arguments)
        }
    }, y.compose = function() {
        var e = arguments,
            t = e.length - 1;
        return function() {
            for (var i = t, n = e[t].apply(this, arguments); i--;) n = e[i].call(this, n);
            return n
        }
    }, y.after = function(e, t) {
        return function() {
            return --e < 1 ? t.apply(this, arguments) : void 0
        }
    }, y.before = function(e, t) {
        var i;
        return function() {
            return --e > 0 && (i = t.apply(this, arguments)), 1 >= e && (t = null), i
        }
    }, y.once = y.partial(y.before, 2);
    var P = !{
            toString: null
        }.propertyIsEnumerable("toString"),
        I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    y.keys = function(e) {
        if (!y.isObject(e)) return [];
        if (p) return p(e);
        var t = [];
        for (var i in e) y.has(e, i) && t.push(i);
        return P && n(e, t), t
    }, y.allKeys = function(e) {
        if (!y.isObject(e)) return [];
        var t = [];
        for (var i in e) t.push(i);
        return P && n(e, t), t
    }, y.values = function(e) {
        for (var t = y.keys(e), i = t.length, n = Array(i), o = 0; i > o; o++) n[o] = e[t[o]];
        return n
    }, y.mapObject = function(e, t, i) {
        t = w(t, i);
        for (var n, o = y.keys(e), s = o.length, a = {}, r = 0; s > r; r++) n = o[r], a[n] = t(e[n], n, e);
        return a
    }, y.pairs = function(e) {
        for (var t = y.keys(e), i = t.length, n = Array(i), o = 0; i > o; o++) n[o] = [t[o], e[t[o]]];
        return n
    }, y.invert = function(e) {
        for (var t = {}, i = y.keys(e), n = 0, o = i.length; o > n; n++) t[e[i[n]]] = i[n];
        return t
    }, y.functions = y.methods = function(e) {
        var t = [];
        for (var i in e) y.isFunction(e[i]) && t.push(i);
        return t.sort()
    }, y.extend = k(y.allKeys), y.extendOwn = y.assign = k(y.keys), y.findKey = function(e, t, i) {
        t = w(t, i);
        for (var n, o = y.keys(e), s = 0, a = o.length; a > s; s++) if (n = o[s], t(e[n], n, e)) return n
    }, y.pick = function(e, t, i) {
        var n, o, s = {},
            a = e;
        if (null == a) return s;
        y.isFunction(t) ? (o = y.allKeys(a), n = b(t, i)) : (o = T(arguments, !1, !1, 1), n = function(e, t, i) {
            return t in i
        }, a = Object(a));
        for (var r = 0, l = o.length; l > r; r++) {
            var c = o[r],
                u = a[c];
            n(u, c, a) && (s[c] = u)
        }
        return s
    }, y.omit = function(e, t, i) {
        if (y.isFunction(t)) t = y.negate(t);
        else {
            var n = y.map(T(arguments, !1, !1, 1), String);
            t = function(e, t) {
                return !y.contains(n, t)
            }
        }
        return y.pick(e, t, i)
    }, y.defaults = k(y.allKeys, !0), y.create = function(e, t) {
        var i = x(e);
        return t && y.extendOwn(i, t), i
    }, y.clone = function(e) {
        return y.isObject(e) ? y.isArray(e) ? e.slice() : y.extend({}, e) : e
    }, y.tap = function(e, t) {
        return t(e), e
    }, y.isMatch = function(e, t) {
        var i = y.keys(t),
            n = i.length;
        if (null == e) return !n;
        for (var o = Object(e), s = 0; n > s; s++) {
            var a = i[s];
            if (t[a] !== o[a] || !(a in o)) return !1
        }
        return !0
    };
    var N = function(e, t, i, n) {
        if (e === t) return 0 !== e || 1 / e === 1 / t;
        if (null == e || null == t) return e === t;
        e instanceof y && (e = e._wrapped), t instanceof y && (t = t._wrapped);
        var o = d.call(e);
        if (o !== d.call(t)) return !1;
        switch (o) {
            case "[object RegExp]":
            case "[object String]":
                return "" + e == "" + t;
            case "[object Number]":
                return +e !== +e ? +t !== +t : 0 === +e ? 1 / +e === 1 / t : +e === +t;
            case "[object Date]":
            case "[object Boolean]":
                return +e === +t
        }
        var s = "[object Array]" === o;
        if (!s) {
            if ("object" != typeof e || "object" != typeof t) return !1;
            var a = e.constructor,
                r = t.constructor;
            if (a !== r && !(y.isFunction(a) && a instanceof a && y.isFunction(r) && r instanceof r) && "constructor" in e && "constructor" in t) return !1
        }
        i = i || [], n = n || [];
        for (var l = i.length; l--;) if (i[l] === e) return n[l] === t;
        if (i.push(e), n.push(t), s) {
            if (l = e.length, l !== t.length) return !1;
            for (; l--;) if (!N(e[l], t[l], i, n)) return !1
        } else {
            var c, u = y.keys(e);
            if (l = u.length, y.keys(t).length !== l) return !1;
            for (; l--;) if (c = u[l], !y.has(t, c) || !N(e[c], t[c], i, n)) return !1
        }
        return i.pop(), n.pop(), !0
    };
    y.isEqual = function(e, t) {
        return N(e, t)
    }, y.isEmpty = function(e) {
        return null == e ? !0 : A(e) && (y.isArray(e) || y.isString(e) || y.isArguments(e)) ? 0 === e.length : 0 === y.keys(e).length
    }, y.isElement = function(e) {
        return !(!e || 1 !== e.nodeType)
    }, y.isArray = f ||
        function(e) {
            return "[object Array]" === d.call(e)
        }, y.isObject = function(e) {
        var t = typeof e;
        return "function" === t || "object" === t && !! e
    }, y.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(e) {
        y["is" + e] = function(t) {
            return d.call(t) === "[object " + e + "]"
        }
    }), y.isArguments(arguments) || (y.isArguments = function(e) {
        return y.has(e, "callee")
    }), "function" != typeof / . / && "object" != typeof Int8Array && (y.isFunction = function(e) {
        return "function" == typeof e || !1
    }), y.isFinite = function(e) {
        return isFinite(e) && !isNaN(parseFloat(e))
    }, y.isNaN = function(e) {
        return y.isNumber(e) && e !== +e
    }, y.isBoolean = function(e) {
        return e === !0 || e === !1 || "[object Boolean]" === d.call(e)
    }, y.isNull = function(e) {
        return null === e
    }, y.isUndefined = function(e) {
        return void 0 === e
    }, y.has = function(e, t) {
        return null != e && h.call(e, t)
    }, y.noConflict = function() {
        return o._ = s, this
    }, y.identity = function(e) {
        return e
    }, y.constant = function(e) {
        return function() {
            return e
        }
    }, y.noop = function() {}, y.property = S, y.propertyOf = function(e) {
        return null == e ?
            function() {} : function(t) {
            return e[t]
        }
    }, y.matcher = y.matches = function(e) {
        return e = y.extendOwn({}, e), function(t) {
            return y.isMatch(t, e)
        }
    }, y.times = function(e, t, i) {
        var n = Array(Math.max(0, e));
        t = b(t, i, 1);
        for (var o = 0; e > o; o++) n[o] = t(o);
        return n
    }, y.random = function(e, t) {
        return null == t && (t = e, e = 0), e + Math.floor(Math.random() * (t - e + 1))
    }, y.now = Date.now ||
        function() {
            return (new Date).getTime()
        };
    var M = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        },
        V = y.invert(M),
        O = function(e) {
            var t = function(t) {
                    return e[t]
                },
                i = "(?:" + y.keys(e).join("|") + ")",
                n = RegExp(i),
                o = RegExp(i, "g");
            return function(e) {
                return e = null == e ? "" : "" + e, n.test(e) ? e.replace(o, t) : e
            }
        };
    y.escape = O(M), y.unescape = O(V), y.result = function(e, t, i) {
        var n = null == e ? void 0 : e[t];
        return void 0 === n && (n = i), y.isFunction(n) ? n.call(e) : n
    };
    var L = 0;
    y.uniqueId = function(e) {
        var t = ++L + "";
        return e ? e + t : t
    }, y.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var R = /(.)^/,
        $ = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        },
        F = /\\|'|\r|\n|\u2028|\u2029/g,
        B = function(e) {
            return "\\" + $[e]
        };
    y.template = function(e, t, i) {
        !t && i && (t = i), t = y.defaults({}, t, y.templateSettings);
        var n = RegExp([(t.escape || R).source, (t.interpolate || R).source, (t.evaluate || R).source].join("|") + "|$", "g"),
            o = 0,
            s = "__p+='";
        e.replace(n, function(t, i, n, a, r) {
            return s += e.slice(o, r).replace(F, B), o = r + t.length, i ? s += "'+\n((__t=(" + i + "))==null?'':_.escape(__t))+\n'" : n ? s += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : a && (s += "';\n" + a + "\n__p+='"), t
        }), s += "';\n", t.variable || (s = "with(obj||{}){\n" + s + "}\n"), s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
        try {
            var a = new Function(t.variable || "obj", "_", s)
        } catch (r) {
            throw r.source = s, r
        }
        var l = function(e) {
                return a.call(this, e, y)
            },
            c = t.variable || "obj";
        return l.source = "function(" + c + "){\n" + s + "}", l
    }, y.chain = function(e) {
        var t = y(e);
        return t._chain = !0, t
    };
    var W = function(e, t) {
        return e._chain ? y(t).chain() : t
    };
    y.mixin = function(e) {
        y.each(y.functions(e), function(t) {
            var i = y[t] = e[t];
            y.prototype[t] = function() {
                var e = [this._wrapped];
                return c.apply(e, arguments), W(this, i.apply(y, e))
            }
        })
    }, y.mixin(y), y.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(e) {
        var t = a[e];
        y.prototype[e] = function() {
            var i = this._wrapped;
            return t.apply(i, arguments), "shift" !== e && "splice" !== e || 0 !== i.length || delete i[0], W(this, i)
        }
    }), y.each(["concat", "join", "slice"], function(e) {
        var t = a[e];
        y.prototype[e] = function() {
            return W(this, t.apply(this._wrapped, arguments))
        }
    }), y.prototype.value = function() {
        return this._wrapped
    }, y.prototype.valueOf = y.prototype.toJSON = y.prototype.value, y.prototype.toString = function() {
        return "" + this._wrapped
    }, "function" == typeof define && define.amd && define("underscore", [], function() {
        return y
    })
}.call(this), function() {
    var e = [],
        t = e.slice;
    _.inherit = function(e, i) {
        function n() {
            _.isFunction(this.initialize) && this.initialize.apply(this, arguments)
        }
        if (0 === arguments.length || arguments.length > 2) throw "\u53c2\u6570\u9519\u8bef";
        var o = null,
            s = t.call(arguments);
        if ("function" == typeof s[0] && (o = s.shift()), s = s[0], n.superclass = o, o) {
            var a = function() {};
            a.prototype = o.prototype, n.prototype = new a
        }
        var r = n.superclass && n.superclass.prototype;
        for (var l in s) {
            var c = s[l];
            if (r && "function" == typeof c) {
                var u = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(c.toString())[1].replace(/\s/g, "").split(",");
                "$super" !== u[0] && "t" !== u[0] || !r[l] || (c = function(e, i) {
                    return function() {
                        var n = this,
                            o = [function() {
                                return r[e].apply(n, arguments)
                            }];
                        return i.apply(this, o.concat(t.call(arguments)))
                    }
                }(l, c))
            }
            if (_.isObject(n.prototype[l]) && _.isObject(c) && "function" != typeof n.prototype[l] && "fuction" != typeof c) {
                var d = {};
                _.extend(d, n.prototype[l]), _.extend(d, c), n.prototype[l] = d
            } else n.prototype[l] = c
        }
        return n.prototype.initialize || (n.prototype.initialize = function() {}), n.prototype.constructor = n, n
    }
}(), function() {
    _.removeAllSpace = function(e) {
        return e.replace(/\s+/g, "")
    }
}(), function() {
    function e(e, t, i, n, o) {
        var s = Math.abs(e - t),
            a = Math.abs(i - n),
            r = s >= a ? e - t > 0 ? "left" : "right" : i - n > 0 ? "up" : "down";
        return o && ("left" == r || "right" == r ? a / s > o && (r = "") : ("up" == r || "down" == r) && s / a > o && (r = "")), r
    }
    function t(t, i, l, c, u) {
        t && t.on(s, function(e) {
            var t = e.touches && e.touches[0] || e;
            o.x1 = t.pageX, o.y1 = t.pageY
        }).on(a, function(e) {
            var t = e.touches && e.touches[0] || e;
            o.x2 = t.pageX, o.y2 = t.pageY, c || e.preventDefault()
        }).on(r, function(t) {
            if (o.x2 && Math.abs(o.x1 - o.x2) > n || o.y2 && Math.abs(o.y1 - o.y2) > n) {
                var s = e(o.x1, o.x2, o.y1, o.y2, u);
                i === s && "function" == typeof l && l()
            } else "tap" === i && "function" == typeof l && l()
        })
    }
    function i(e) {
        e && e.off(s).off(a).off(r)
    }
    var n = 20,
        o = {},
        s = "touchstart",
        a = "touchmove",
        r = "touchend";
    "ontouchstart" in window || (s = "mousedown", a = "mousemove", r = "mouseup"), _.flip = t, _.flipDestroy = i
}(), function() {
    _.dateUtil = {
        formatNum: function(e) {
            return 10 > e ? "0" + e : e
        },
        parse: function(e, t) {
            if ("undefined" == typeof e) return null;
            if ("string" == typeof t) {
                var i = (new Date(t), t.replace(/[^ymd]/g, "").split(""));
                if (!i && 3 != i.length) return null;
                for (var t = t.replace(/y|m|d/g, function(e) {
                    switch (e) {
                        case "y":
                            return "(\\d{4})";
                        case "m":
                        case "d":
                            return "(\\d{1,2})"
                    }
                }), n = new RegExp(t, "g"), o = n.exec(e), s = {}, a = 0, r = i.length; r > a; a++) s[i[a]] = o[a + 1];
                return new Date(s.y, s.m - 1, s.d)
            }
            return null
        },
        format: function(e, t) {
            return arguments.length < 2 && !e.getTime && (t = e, e = new Date), "string" != typeof t && (t = "Y\u5e74M\u6708D\u65e5 H\u65f6F\u5206S\u79d2"), t.replace(/Y|y|M|m|D|d|H|h|F|f|S|s/g, function(t) {
                switch (t) {
                    case "y":
                        return (e.getFullYear() + "").slice(2);
                    case "Y":
                        return e.getFullYear();
                    case "m":
                        return e.getMonth() + 1;
                    case "M":
                        return _.dateUtil.formatNum(e.getMonth() + 1);
                    case "d":
                        return e.getDate();
                    case "D":
                        return _.dateUtil.formatNum(e.getDate());
                    case "h":
                        return e.getHours();
                    case "H":
                        return _.dateUtil.formatNum(e.getHours());
                    case "f":
                        return e.getMinutes();
                    case "F":
                        return _.dateUtil.formatNum(e.getMinutes());
                    case "s":
                        return e.getSeconds();
                    case "S":
                        return _.dateUtil.formatNum(e.getSeconds())
                }
            })
        },
        isDate: function(e) {
            return "object" == typeof e && e instanceof Date ? !0 : !1
        },
        isLeapYear: function(e) {
            return _.dateUtil.isDate(e) && (e = e.getFullYear()), e % 4 == 0 && e % 100 != 0 || e % 400 == 0 ? !0 : !1
        },
        getDaysOfMonth: function(e, t) {
            return t--, _.dateUtil.isDate(e) && (t = e.getMonth(), e = e.getFullYear()), [31, _.dateUtil.isLeapYear(e) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][t]
        },
        getBeginDayOfMouth: function(e, t) {
            t--, "object" == typeof e && e instanceof Date && (t = e.getMonth(), e = e.getFullYear());
            var i = new Date(e, t, 1);
            return i.getDay()
        }
    }
}(), function() {
    var e = {};
    _.setInterval = function(t, i, n) {
        n || (n = "g"), e[n] || (e[n] = []), e[n].push(setInterval(t, i));
    }, _.clearInterval = function(t, i) {
        var n, o, s, a, r, l, c;
        if ("number" == typeof t) for (n in e) for (o = e[n], a = 0, r = o.length; r > a; a++) if (t == o[a]) return o.splice(a, 1), void clearInterval(t);
        if ("string" == typeof t) for (i = t, l = e[i], c = l.length; 0 != c;) _.clearInterval(l[l.length - 1]);
        if (0 == arguments.length) for (s in e) _.clearInterval(s)
    }
}(), define("underscore_extend", function() {}), function(e, t, i) {
    function n(e, i) {
        this.wrapper = "string" == typeof e ? t.querySelector(e) : e, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
            resizeScrollbars: !0,
            mouseWheelSpeed: 20,
            snapThreshold: .334,
            startX: 0,
            startY: 0,
            scrollY: !0,
            directionLockThreshold: 5,
            momentum: !0,
            bounce: !0,
            bounceTime: 600,
            bounceEasing: "",
            preventDefault: !0,
            preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
            },
            HWCompositing: !0,
            useTransition: !0,
            useTransform: !0
        };
        for (var n in i) this.options[n] = i[n];
        this.translateZ = this.options.HWCompositing && r.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = r.hasTransition && this.options.useTransition, this.options.useTransform = r.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" == this.options.eventPassthrough ? !1 : this.options.scrollY, this.options.scrollX = "horizontal" == this.options.eventPassthrough ? !1 : this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? r.ease[this.options.bounceEasing] || r.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, 3 == this.options.probeType && (this.options.useTransition = !1), this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
    }
    function o(e, i, n) {
        var o = t.createElement("div"),
            s = t.createElement("div");
        return n === !0 && (o.style.cssText = "position:absolute;z-index:9999", s.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), s.className = "iScrollIndicator", "h" == e ? (n === !0 && (o.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", s.style.height = "100%"), o.className = "iScrollHorizontalScrollbar") : (n === !0 && (o.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", s.style.width = "100%"), o.className = "iScrollVerticalScrollbar"), o.style.cssText += ";overflow:hidden", i || (o.style.pointerEvents = "none"), o.appendChild(s), o
    }
    function s(i, n) {
        this.wrapper = "string" == typeof n.el ? t.querySelector(n.el) : n.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = i, this.options = {
            listenX: !0,
            listenY: !0,
            interactive: !1,
            resize: !0,
            defaultScrollbars: !1,
            shrink: !1,
            fade: !1,
            speedRatioX: 0,
            speedRatioY: 0
        };
        for (var o in n) this.options[o] = n[o];
        this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (r.addEvent(this.indicator, "touchstart", this), r.addEvent(e, "touchend", this)), this.options.disablePointer || (r.addEvent(this.indicator, "MSPointerDown", this), r.addEvent(e, "MSPointerUp", this)), this.options.disableMouse || (r.addEvent(this.indicator, "mousedown", this), r.addEvent(e, "mouseup", this))), this.options.fade && (this.wrapperStyle[r.style.transform] = this.scroller.translateZ, this.wrapperStyle[r.style.transitionDuration] = r.isBadAndroid ? "0.001s" : "0ms", this.wrapperStyle.opacity = "0")
    }
    var a = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame ||
        function(t) {
            e.setTimeout(t, 1e3 / 60)
        }, r = function() {
        function n(e) {
            return a === !1 ? !1 : "" === a ? e : a + e.charAt(0).toUpperCase() + e.substr(1)
        }
        var o = {},
            s = t.createElement("div").style,
            a = function() {
                for (var e, t = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, n = t.length; n > i; i++) if (e = t[i] + "ransform", e in s) return t[i].substr(0, t[i].length - 1);
                return !1
            }();
        o.getTime = Date.now ||
            function() {
                return (new Date).getTime()
            }, o.extend = function(e, t) {
            for (var i in t) e[i] = t[i]
        }, o.addEvent = function(e, t, i, n) {
            e.addEventListener(t, i, !! n)
        }, o.removeEvent = function(e, t, i, n) {
            e.removeEventListener(t, i, !! n)
        }, o.momentum = function(e, t, n, o, s, a) {
            var r, l, c = e - t,
                u = i.abs(c) / n;
            return a = void 0 === a ? 6e-4 : a, r = e + u * u / (2 * a) * (0 > c ? -1 : 1), l = u / a, o > r ? (r = s ? o - s / 2.5 * (u / 8) : o, c = i.abs(r - e), l = c / u) : r > 0 && (r = s ? s / 2.5 * (u / 8) : 0, c = i.abs(e) + r, l = c / u), {
                destination: i.round(r),
                duration: l
            }
        };
        var r = n("transform");
        return o.extend(o, {
            hasTransform: r !== !1,
            hasPerspective: n("perspective") in s,
            hasTouch: "ontouchstart" in e,
            hasPointer: navigator.msPointerEnabled,
            hasTransition: n("transition") in s
        }), o.isBadAndroid = /Android /.test(e.navigator.appVersion) && !/Chrome\/\d/.test(e.navigator.appVersion), o.extend(o.style = {}, {
            transform: r,
            transitionTimingFunction: n("transitionTimingFunction"),
            transitionDuration: n("transitionDuration"),
            transitionDelay: n("transitionDelay"),
            transformOrigin: n("transformOrigin")
        }), o.hasClass = function(e, t) {
            var i = new RegExp("(^|\\s)" + t + "(\\s|$)");
            return i.test(e.className)
        }, o.addClass = function(e, t) {
            if (!o.hasClass(e, t)) {
                var i = e.className.split(" ");
                i.push(t), e.className = i.join(" ")
            }
        }, o.removeClass = function(e, t) {
            if (o.hasClass(e, t)) {
                var i = new RegExp("(^|\\s)" + t + "(\\s|$)", "g");
                e.className = e.className.replace(i, " ")
            }
        }, o.offset = function(e) {
            for (var t = -e.offsetLeft, i = -e.offsetTop; e = e.offsetParent;) t -= e.offsetLeft, i -= e.offsetTop;
            return {
                left: t,
                top: i
            }
        }, o.preventDefaultException = function(e, t) {
            for (var i in t) if (t[i].test(e[i])) return !0;
            return !1
        }, o.extend(o.eventType = {}, {
            touchstart: 1,
            touchmove: 1,
            touchend: 1,
            mousedown: 2,
            mousemove: 2,
            mouseup: 2,
            MSPointerDown: 3,
            MSPointerMove: 3,
            MSPointerUp: 3
        }), o.extend(o.ease = {}, {
            quadratic: {
                style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                fn: function(e) {
                    return e * (2 - e)
                }
            },
            circular: {
                style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                fn: function(e) {
                    return i.sqrt(1 - --e * e)
                }
            },
            back: {
                style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                fn: function(e) {
                    var t = 4;
                    return (e -= 1) * e * ((t + 1) * e + t) + 1
                }
            },
            bounce: {
                style: "",
                fn: function(e) {
                    return (e /= 1) < 1 / 2.75 ? 7.5625 * e * e : 2 / 2.75 > e ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : 2.5 / 2.75 > e ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
                }
            },
            elastic: {
                style: "",
                fn: function(e) {
                    var t = .22,
                        n = .4;
                    return 0 === e ? 0 : 1 == e ? 1 : n * i.pow(2, -10 * e) * i.sin((e - t / 4) * (2 * i.PI) / t) + 1
                }
            }
        }), o.tap = function(e, i) {
            var n = t.createEvent("Event");
            n.initEvent(i, !0, !0), n.pageX = e.pageX, n.pageY = e.pageY, e.target.dispatchEvent(n)
        }, o.click = function(e) {
            var i, n = e.target;
            /(SELECT|INPUT|TEXTAREA)/i.test(n.tagName) || (i = t.createEvent("MouseEvents"), i.initMouseEvent("click", !0, !0, e.view, 1, n.screenX, n.screenY, n.clientX, n.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), i._constructed = !0, n.dispatchEvent(i))
        }, o
    }();
    n.prototype = {
        version: "5.1.1",
        _init: function() {
            this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
        },
        destroy: function() {
            this._initEvents(!0), this._execEvent("destroy")
        },
        _transitionEnd: function(e) {
            e.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
        },
        _start: function(e) {
            if ((1 == r.eventType[e.type] || 0 === e.button) && this.enabled && (!this.initiated || r.eventType[e.type] === this.initiated)) {
                !this.options.preventDefault || r.isBadAndroid || r.preventDefaultException(e.target, this.options.preventDefaultException) || e.preventDefault();
                var t, n = e.touches ? e.touches[0] : e;
                this.initiated = r.eventType[e.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this._transitionTime(), this.startTime = r.getTime(), this.options.useTransition && this.isInTransition ? (this.isInTransition = !1, t = this.getComputedPosition(), this._translate(i.round(t.x), i.round(t.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = n.pageX, this.pointY = n.pageY, this._execEvent("beforeScrollStart")
            }
        },
        _move: function(e) {
            if (this.enabled && r.eventType[e.type] === this.initiated) {
                this.options.preventDefault && e.preventDefault();
                var t, n, o, s, a = e.touches ? e.touches[0] : e,
                    l = a.pageX - this.pointX,
                    c = a.pageY - this.pointY,
                    u = r.getTime();
                if (this.pointX = a.pageX, this.pointY = a.pageY, this.distX += l, this.distY += c, o = i.abs(this.distX), s = i.abs(this.distY), !(u - this.endTime > 300 && 10 > o && 10 > s)) {
                    if (this.directionLocked || this.options.freeScroll || (o > s + this.options.directionLockThreshold ? this.directionLocked = "h" : s >= o + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
                        if ("vertical" == this.options.eventPassthrough) e.preventDefault();
                        else if ("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
                        c = 0
                    } else if ("v" == this.directionLocked) {
                        if ("horizontal" == this.options.eventPassthrough) e.preventDefault();
                        else if ("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
                        l = 0
                    }
                    l = this.hasHorizontalScroll ? l : 0, c = this.hasVerticalScroll ? c : 0, t = this.x + l, n = this.y + c, (t > 0 || t < this.maxScrollX) && (t = this.options.bounce ? this.x + l / 3 : t > 0 ? 0 : this.maxScrollX), (n > 0 || n < this.maxScrollY) && (n = this.options.bounce ? this.y + c / 3 : n > 0 ? 0 : this.maxScrollY), this.directionX = l > 0 ? -1 : 0 > l ? 1 : 0, this.directionY = c > 0 ? -1 : 0 > c ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(t, n), u - this.startTime > 300 && (this.startTime = u, this.startX = this.x, this.startY = this.y, 1 == this.options.probeType && this._execEvent("scroll")), this.options.probeType > 1 && this._execEvent("scroll")
                }
            }
        },
        _end: function(e) {
            if (this.enabled && r.eventType[e.type] === this.initiated) {
                this.options.preventDefault && !r.preventDefaultException(e.target, this.options.preventDefaultException) && e.preventDefault();
                var t, n, o = (e.changedTouches ? e.changedTouches[0] : e, r.getTime() - this.startTime),
                    s = i.round(this.x),
                    a = i.round(this.y),
                    l = i.abs(s - this.startX),
                    c = i.abs(a - this.startY),
                    u = 0,
                    d = "";
                if (this.isInTransition = 0, this.initiated = 0, this.endTime = r.getTime(), !this.resetPosition(this.options.bounceTime)) {
                    if (this.scrollTo(s, a), !this.moved) return this.options.tap && r.tap(e, this.options.tap), this.options.click && r.click(e), void this._execEvent("scrollCancel");
                    if (this._events.flick && 200 > o && 100 > l && 100 > c) return void this._execEvent("flick");
                    if (this.options.momentum && 300 > o && (t = this.hasHorizontalScroll ? r.momentum(this.x, this.startX, o, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                            destination: s,
                            duration: 0
                        }, n = this.hasVerticalScroll ? r.momentum(this.y, this.startY, o, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                            destination: a,
                            duration: 0
                        }, s = t.destination, a = n.destination, u = i.max(t.duration, n.duration), this.isInTransition = 1), this.options.snap) {
                        var h = this._nearestSnap(s, a);
                        this.currentPage = h, u = this.options.snapSpeed || i.max(i.max(i.min(i.abs(s - h.x), 1e3), i.min(i.abs(a - h.y), 1e3)), 300), s = h.x, a = h.y, this.directionX = 0, this.directionY = 0, d = this.options.bounceEasing
                    }
                    return s != this.x || a != this.y ? ((s > 0 || s < this.maxScrollX || a > 0 || a < this.maxScrollY) && (d = r.ease.quadratic), void this.scrollTo(s, a, u, d)) : void this._execEvent("scrollEnd")
                }
            }
        },
        _resize: function() {
            var e = this;
            clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
                e.refresh()
            }, this.options.resizePolling)
        },
        resetPosition: function(e) {
            var t = this.x,
                i = this.y;
            return e = e || 0, !this.hasHorizontalScroll || this.x > 0 ? t = 0 : this.x < this.maxScrollX && (t = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), t == this.x && i == this.y ? !1 : (this.scrollTo(t, i, e, this.options.bounceEasing), !0)
        },
        disable: function() {
            this.enabled = !1
        },
        enable: function() {
            this.enabled = !0
        },
        refresh: function() {
            this.wrapper.offsetHeight;
            this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = r.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
        },
        on: function(e, t) {
            this._events[e] || (this._events[e] = []), this._events[e].push(t)
        },
        off: function(e, t) {
            if (this._events[e]) {
                var i = this._events[e].indexOf(t);
                i > -1 && this._events[e].splice(i, 1)
            }
        },
        _execEvent: function(e) {
            if (this._events[e]) {
                var t = 0,
                    i = this._events[e].length;
                if (i) for (; i > t; t++) this._events[e][t].apply(this, [].slice.call(arguments, 1))
            }
        },
        scrollBy: function(e, t, i, n) {
            e = this.x + e, t = this.y + t, i = i || 0, this.scrollTo(e, t, i, n)
        },
        scrollTo: function(e, t, i, n) {
            n = n || r.ease.circular, this.isInTransition = this.options.useTransition && i > 0, !i || this.options.useTransition && n.style ? (this._transitionTimingFunction(n.style), this._transitionTime(i), this._translate(e, t)) : this._animate(e, t, i, n.fn)
        },
        scrollToElement: function(e, t, n, o, s) {
            if (e = e.nodeType ? e : this.scroller.querySelector(e)) {
                var a = r.offset(e);
                a.left -= this.wrapperOffset.left, a.top -= this.wrapperOffset.top, n === !0 && (n = i.round(e.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), o === !0 && (o = i.round(e.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), a.left -= n || 0, a.top -= o || 0, a.left = a.left > 0 ? 0 : a.left < this.maxScrollX ? this.maxScrollX : a.left, a.top = a.top > 0 ? 0 : a.top < this.maxScrollY ? this.maxScrollY : a.top, t = void 0 === t || null === t || "auto" === t ? i.max(i.abs(this.x - a.left), i.abs(this.y - a.top)) : t, this.scrollTo(a.left, a.top, t, s)
            }
        },
        _transitionTime: function(e) {
            if (e = e || 0, this.scrollerStyle[r.style.transitionDuration] = e + "ms", !e && r.isBadAndroid && (this.scrollerStyle[r.style.transitionDuration] = "0.001s"), this.indicators) for (var t = this.indicators.length; t--;) this.indicators[t].transitionTime(e)
        },
        _transitionTimingFunction: function(e) {
            if (this.scrollerStyle[r.style.transitionTimingFunction] = e, this.indicators) for (var t = this.indicators.length; t--;) this.indicators[t].transitionTimingFunction(e)
        },
        _translate: function(e, t) {
            if (this.options.useTransform ? this.scrollerStyle[r.style.transform] = "translate(" + e + "px," + t + "px)" + this.translateZ : (e = i.round(e), t = i.round(t), this.scrollerStyle.left = e + "px", this.scrollerStyle.top = t + "px"), this.x = e, this.y = t, this.indicators) for (var n = this.indicators.length; n--;) this.indicators[n].updatePosition()
        },
        _initEvents: function(t) {
            var i = t ? r.removeEvent : r.addEvent,
                n = this.options.bindToWrapper ? this.wrapper : e;
            i(e, "orientationchange", this), i(e, "resize", this), this.options.click && i(this.wrapper, "click", this, !0), this.options.disableMouse || (i(this.wrapper, "mousedown", this), i(n, "mousemove", this), i(n, "mousecancel", this), i(n, "mouseup", this)), r.hasPointer && !this.options.disablePointer && (i(this.wrapper, "MSPointerDown", this), i(n, "MSPointerMove", this), i(n, "MSPointerCancel", this), i(n, "MSPointerUp", this)), r.hasTouch && !this.options.disableTouch && (i(this.wrapper, "touchstart", this), i(n, "touchmove", this), i(n, "touchcancel", this), i(n, "touchend", this)), i(this.scroller, "transitionend", this), i(this.scroller, "webkitTransitionEnd", this), i(this.scroller, "oTransitionEnd", this), i(this.scroller, "MSTransitionEnd", this)
        },
        getComputedPosition: function() {
            var t, i, n = e.getComputedStyle(this.scroller, null);
            return this.options.useTransform ? (n = n[r.style.transform].split(")")[0].split(", "), t = +(n[12] || n[4]), i = +(n[13] || n[5])) : (t = +n.left.replace(/[^-\d.]/g, ""), i = +n.top.replace(/[^-\d.]/g, "")), {
                x: t,
                y: i
            }
        },
        _initIndicators: function() {
            function e(e) {
                for (var t = r.indicators.length; t--;) e.call(r.indicators[t])
            }
            var t, i = this.options.interactiveScrollbars,
                n = "string" != typeof this.options.scrollbars,
                a = [],
                r = this;
            this.indicators = [], this.options.scrollbars && (this.options.scrollY && (t = {
                el: o("v", i, this.options.scrollbars),
                interactive: i,
                defaultScrollbars: !0,
                customStyle: n,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenX: !1
            }, this.wrapper.appendChild(t.el), a.push(t)), this.options.scrollX && (t = {
                el: o("h", i, this.options.scrollbars),
                interactive: i,
                defaultScrollbars: !0,
                customStyle: n,
                resize: this.options.resizeScrollbars,
                shrink: this.options.shrinkScrollbars,
                fade: this.options.fadeScrollbars,
                listenY: !1
            }, this.wrapper.appendChild(t.el), a.push(t))), this.options.indicators && (a = a.concat(this.options.indicators));
            for (var l = a.length; l--;) this.indicators.push(new s(this, a[l]));
            this.options.fadeScrollbars && (this.on("scrollEnd", function() {
                e(function() {
                    this.fade()
                })
            }), this.on("scrollCancel", function() {
                e(function() {
                    this.fade()
                })
            }), this.on("scrollStart", function() {
                e(function() {
                    this.fade(1)
                })
            }), this.on("beforeScrollStart", function() {
                e(function() {
                    this.fade(1, !0)
                })
            })), this.on("refresh", function() {
                e(function() {
                    this.refresh()
                })
            }), this.on("destroy", function() {
                e(function() {
                    this.destroy()
                }), delete this.indicators
            })
        },
        _initWheel: function() {
            r.addEvent(this.wrapper, "wheel", this), r.addEvent(this.wrapper, "mousewheel", this), r.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
                r.removeEvent(this.wrapper, "wheel", this), r.removeEvent(this.wrapper, "mousewheel", this), r.removeEvent(this.wrapper, "DOMMouseScroll", this)
            })
        },
        _wheel: function(e) {
            if (this.enabled) {
                e.preventDefault(), e.stopPropagation();
                var t, n, o, s, a = this;
                if (void 0 === this.wheelTimeout && a._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
                        a._execEvent("scrollEnd"), a.wheelTimeout = void 0
                    }, 400), "deltaX" in e) t = -e.deltaX, n = -e.deltaY;
                else if ("wheelDeltaX" in e) t = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed, n = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
                else if ("wheelDelta" in e) t = n = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
                else {
                    if (!("detail" in e)) return;
                    t = n = -e.detail / 3 * this.options.mouseWheelSpeed
                }
                if (t *= this.options.invertWheelDirection, n *= this.options.invertWheelDirection, this.hasVerticalScroll || (t = n, n = 0), this.options.snap) return o = this.currentPage.pageX, s = this.currentPage.pageY, t > 0 ? o-- : 0 > t && o++, n > 0 ? s-- : 0 > n && s++, void this.goToPage(o, s);
                o = this.x + i.round(this.hasHorizontalScroll ? t : 0), s = this.y + i.round(this.hasVerticalScroll ? n : 0), o > 0 ? o = 0 : o < this.maxScrollX && (o = this.maxScrollX), s > 0 ? s = 0 : s < this.maxScrollY && (s = this.maxScrollY), this.scrollTo(o, s, 0), this.options.probeType > 1 && this._execEvent("scroll")
            }
        },
        _initSnap: function() {
            this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
                var e, t, n, o, s, a, r = 0,
                    l = 0,
                    c = 0,
                    u = this.options.snapStepX || this.wrapperWidth,
                    d = this.options.snapStepY || this.wrapperHeight;
                if (this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
                    if (this.options.snap === !0) for (n = i.round(u / 2), o = i.round(d / 2); c > -this.scrollerWidth;) {
                        for (this.pages[r] = [], e = 0, s = 0; s > -this.scrollerHeight;) this.pages[r][e] = {
                            x: i.max(c, this.maxScrollX),
                            y: i.max(s, this.maxScrollY),
                            width: u,
                            height: d,
                            cx: c - n,
                            cy: s - o
                        }, s -= d, e++;
                        c -= u, r++
                    } else for (a = this.options.snap, e = a.length, t = -1; e > r; r++)(0 === r || a[r].offsetLeft <= a[r - 1].offsetLeft) && (l = 0, t++), this.pages[l] || (this.pages[l] = []), c = i.max(-a[r].offsetLeft, this.maxScrollX), s = i.max(-a[r].offsetTop, this.maxScrollY), n = c - i.round(a[r].offsetWidth / 2), o = s - i.round(a[r].offsetHeight / 2), this.pages[l][t] = {
                        x: c,
                        y: s,
                        width: a[r].offsetWidth,
                        height: a[r].offsetHeight,
                        cx: n,
                        cy: o
                    }, c > this.maxScrollX && l++;
                    this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = i.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
                }
            }), this.on("flick", function() {
                var e = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.x - this.startX), 1e3), i.min(i.abs(this.y - this.startY), 1e3)), 300);
                this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, e)
            })
        },
        _nearestSnap: function(e, t) {
            if (!this.pages.length) return {
                x: 0,
                y: 0,
                pageX: 0,
                pageY: 0
            };
            var n = 0,
                o = this.pages.length,
                s = 0;
            if (i.abs(e - this.absStartX) < this.snapThresholdX && i.abs(t - this.absStartY) < this.snapThresholdY) return this.currentPage;
            for (e > 0 ? e = 0 : e < this.maxScrollX && (e = this.maxScrollX), t > 0 ? t = 0 : t < this.maxScrollY && (t = this.maxScrollY); o > n; n++) if (e >= this.pages[n][0].cx) {
                e = this.pages[n][0].x;
                break
            }
            for (o = this.pages[n].length; o > s; s++) if (t >= this.pages[0][s].cy) {
                t = this.pages[0][s].y;
                break
            }
            return n == this.currentPage.pageX && (n += this.directionX, 0 > n ? n = 0 : n >= this.pages.length && (n = this.pages.length - 1), e = this.pages[n][0].x), s == this.currentPage.pageY && (s += this.directionY, 0 > s ? s = 0 : s >= this.pages[0].length && (s = this.pages[0].length - 1), t = this.pages[0][s].y), {
                x: e,
                y: t,
                pageX: n,
                pageY: s
            }
        },
        goToPage: function(e, t, n, o) {
            o = o || this.options.bounceEasing, e >= this.pages.length ? e = this.pages.length - 1 : 0 > e && (e = 0), t >= this.pages[e].length ? t = this.pages[e].length - 1 : 0 > t && (t = 0);
            var s = this.pages[e][t].x,
                a = this.pages[e][t].y;
            n = void 0 === n ? this.options.snapSpeed || i.max(i.max(i.min(i.abs(s - this.x), 1e3), i.min(i.abs(a - this.y), 1e3)), 300) : n, this.currentPage = {
                x: s,
                y: a,
                pageX: e,
                pageY: t
            }, this.scrollTo(s, a, n, o)
        },
        next: function(e, t) {
            var i = this.currentPage.pageX,
                n = this.currentPage.pageY;
            i++, i >= this.pages.length && this.hasVerticalScroll && (i = 0, n++), this.goToPage(i, n, e, t)
        },
        prev: function(e, t) {
            var i = this.currentPage.pageX,
                n = this.currentPage.pageY;
            i--, 0 > i && this.hasVerticalScroll && (i = 0, n--), this.goToPage(i, n, e, t)
        },
        _initKeys: function(t) {
            var i, n = {
                pageUp: 33,
                pageDown: 34,
                end: 35,
                home: 36,
                left: 37,
                up: 38,
                right: 39,
                down: 40
            };
            if ("object" == typeof this.options.keyBindings) for (i in this.options.keyBindings)"string" == typeof this.options.keyBindings[i] && (this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0));
            else this.options.keyBindings = {};
            for (i in n) this.options.keyBindings[i] = this.options.keyBindings[i] || n[i];
            r.addEvent(e, "keydown", this), this.on("destroy", function() {
                r.removeEvent(e, "keydown", this)
            })
        },
        _key: function(e) {
            if (this.enabled) {
                var t, n = this.options.snap,
                    o = n ? this.currentPage.pageX : this.x,
                    s = n ? this.currentPage.pageY : this.y,
                    a = r.getTime(),
                    l = this.keyTime || 0,
                    c = .25;
                switch (this.options.useTransition && this.isInTransition && (t = this.getComputedPosition(), this._translate(i.round(t.x), i.round(t.y)), this.isInTransition = !1), this.keyAcceleration = 200 > a - l ? i.min(this.keyAcceleration + c, 50) : 0, e.keyCode) {
                    case this.options.keyBindings.pageUp:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? o += n ? 1 : this.wrapperWidth : s += n ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.pageDown:
                        this.hasHorizontalScroll && !this.hasVerticalScroll ? o -= n ? 1 : this.wrapperWidth : s -= n ? 1 : this.wrapperHeight;
                        break;
                    case this.options.keyBindings.end:
                        o = n ? this.pages.length - 1 : this.maxScrollX, s = n ? this.pages[0].length - 1 : this.maxScrollY;
                        break;
                    case this.options.keyBindings.home:
                        o = 0, s = 0;
                        break;
                    case this.options.keyBindings.left:
                        o += n ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.up:
                        s += n ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.right:
                        o -= n ? -1 : 5 + this.keyAcceleration >> 0;
                        break;
                    case this.options.keyBindings.down:
                        s -= n ? 1 : 5 + this.keyAcceleration >> 0;
                        break;
                    default:
                        return
                }
                if (n) return void this.goToPage(o, s);
                o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollX && (o = this.maxScrollX, this.keyAcceleration = 0), s > 0 ? (s = 0, this.keyAcceleration = 0) : s < this.maxScrollY && (s = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(o, s, 0), this.keyTime = a
            }
        },
        _animate: function(e, t, i, n) {
            function o() {
                var h, f, p, m = r.getTime();
                return m >= d ? (s.isAnimating = !1, s._translate(e, t), void(s.resetPosition(s.options.bounceTime) || s._execEvent("scrollEnd"))) : (m = (m - u) / i, p = n(m), h = (e - l) * p + l, f = (t - c) * p + c, s._translate(h, f), s.isAnimating && a(o), void(3 == s.options.probeType && s._execEvent("scroll")))
            }
            var s = this,
                l = this.x,
                c = this.y,
                u = r.getTime(),
                d = u + i;
            this.isAnimating = !0, o()
        },
        handleEvent: function(e) {
            switch (e.type) {
                case "touchstart":
                case "MSPointerDown":
                case "mousedown":
                    this._start(e);
                    break;
                case "touchmove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(e);
                    break;
                case "touchend":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(e);
                    break;
                case "orientationchange":
                case "resize":
                    this._resize();
                    break;
                case "transitionend":
                case "webkitTransitionEnd":
                case "oTransitionEnd":
                case "MSTransitionEnd":
                    this._transitionEnd(e);
                    break;
                case "wheel":
                case "DOMMouseScroll":
                case "mousewheel":
                    this._wheel(e);
                    break;
                case "keydown":
                    this._key(e);
                    break;
                case "click":
                    e._constructed || (e.preventDefault(), e.stopPropagation())
            }
        }
    }, s.prototype = {
        handleEvent: function(e) {
            switch (e.type) {
                case "touchstart":
                case "MSPointerDown":
                case "mousedown":
                    this._start(e);
                    break;
                case "touchmove":
                case "MSPointerMove":
                case "mousemove":
                    this._move(e);
                    break;
                case "touchend":
                case "MSPointerUp":
                case "mouseup":
                case "touchcancel":
                case "MSPointerCancel":
                case "mousecancel":
                    this._end(e)
            }
        },
        destroy: function() {
            this.options.interactive && (r.removeEvent(this.indicator, "touchstart", this), r.removeEvent(this.indicator, "MSPointerDown", this), r.removeEvent(this.indicator, "mousedown", this), r.removeEvent(e, "touchmove", this), r.removeEvent(e, "MSPointerMove", this), r.removeEvent(e, "mousemove", this), r.removeEvent(e, "touchend", this), r.removeEvent(e, "MSPointerUp", this), r.removeEvent(e, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
        },
        _start: function(t) {
            var i = t.touches ? t.touches[0] : t;
            t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = i.pageX, this.lastPointY = i.pageY, this.startTime = r.getTime(), this.options.disableTouch || r.addEvent(e, "touchmove", this), this.options.disablePointer || r.addEvent(e, "MSPointerMove", this), this.options.disableMouse || r.addEvent(e, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
        },
        _move: function(e) {
            var t, i, n, o, s = e.touches ? e.touches[0] : e,
                a = r.getTime();
            this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, t = s.pageX - this.lastPointX, this.lastPointX = s.pageX, i = s.pageY - this.lastPointY, this.lastPointY = s.pageY, n = this.x + t, o = this.y + i, this._pos(n, o), 1 == this.scroller.options.probeType && a - this.startTime > 300 ? (this.startTime = a, this.scroller._execEvent("scroll")) : this.scroller.options.probeType > 1 && this.scroller._execEvent("scroll"), e.preventDefault(), e.stopPropagation()
        },
        _end: function(t) {
            if (this.initiated) {
                if (this.initiated = !1, t.preventDefault(), t.stopPropagation(), r.removeEvent(e, "touchmove", this), r.removeEvent(e, "MSPointerMove", this), r.removeEvent(e, "mousemove", this), this.scroller.options.snap) {
                    var n = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
                        o = this.options.snapSpeed || i.max(i.max(i.min(i.abs(this.scroller.x - n.x), 1e3), i.min(i.abs(this.scroller.y - n.y), 1e3)), 300);
                    (this.scroller.x != n.x || this.scroller.y != n.y) && (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = n, this.scroller.scrollTo(n.x, n.y, o, this.scroller.options.bounceEasing))
                }
                this.moved && this.scroller._execEvent("scrollEnd")
            }
        },
        transitionTime: function(e) {
            e = e || 0, this.indicatorStyle[r.style.transitionDuration] = e + "ms", !e && r.isBadAndroid && (this.indicatorStyle[r.style.transitionDuration] = "0.001s")
        },
        transitionTimingFunction: function(e) {
            this.indicatorStyle[r.style.transitionTimingFunction] = e
        },
        refresh: function() {
            this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (r.addClass(this.wrapper, "iScrollBothScrollbars"), r.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (r.removeClass(this.wrapper, "iScrollBothScrollbars"), r.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
            this.wrapper.offsetHeight;
            this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = i.max(i.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = i.max(i.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
        },
        updatePosition: function() {
            var e = this.options.listenX && i.round(this.sizeRatioX * this.scroller.x) || 0,
                t = this.options.listenY && i.round(this.sizeRatioY * this.scroller.y) || 0;
            this.options.ignoreBoundaries || (e < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = i.max(this.indicatorWidth + e, 8), this.indicatorStyle.width = this.width + "px"), e = this.minBoundaryX) : e > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = i.max(this.indicatorWidth - (e - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", e = this.maxPosX + this.indicatorWidth - this.width) : e = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), t < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = i.max(this.indicatorHeight + 3 * t, 8), this.indicatorStyle.height = this.height + "px"), t = this.minBoundaryY) : t > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = i.max(this.indicatorHeight - 3 * (t - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", t = this.maxPosY + this.indicatorHeight - this.height) : t = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")), this.x = e, this.y = t, this.scroller.options.useTransform ? this.indicatorStyle[r.style.transform] = "translate(" + e + "px," + t + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = e + "px", this.indicatorStyle.top = t + "px")
        },
        _pos: function(e, t) {
            0 > e ? e = 0 : e > this.maxPosX && (e = this.maxPosX), 0 > t ? t = 0 : t > this.maxPosY && (t = this.maxPosY), e = this.options.listenX ? i.round(e / this.sizeRatioX) : this.scroller.x, t = this.options.listenY ? i.round(t / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(e, t)
        },
        fade: function(e, t) {
            if (!t || this.visible) {
                clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
                var i = e ? 250 : 500,
                    n = e ? 0 : 300;
                e = e ? "1" : "0", this.wrapperStyle[r.style.transitionDuration] = i + "ms", this.fadeTimeout = setTimeout(function(e) {
                    this.wrapperStyle.opacity = e, this.visible = +e
                }.bind(this, e), n)
            }
        }
    }, n.utils = r, "undefined" != typeof module && module.exports ? module.exports = n : e.IScroll = n
}(window, document, Math), define("IScroll", function(e) {
    return function() {
        var t;
        return t || e.IScroll
    }
}(this)), define("text!tpl/ui-loadding-box.html", [], function() {
    return '<div class="ui-loadding-box">\n	<style>\n		.ui-loadding-box{\n		position: fixed;\n		top:0;\n		left:0;\n		z-index: 99999;\n		width:100%;\n		height: 100%;\n		/*background-color: rgba(0,0,0,0.5);*/\n	}\n	.ui-loadding-box div{\n		position: absolute;\n		top: 50%;\n		left: 50%;\n		width: 120px;\n		height: 100px;\n		margin: -50px 0 0 -60px;\n		border-radius: 4px;\n		background-color: rgba(0,0,0,0.5);\n		text-align: center;\n	}\n	.ui-loadding-box img{\n		display: inline-block;\n		width:30px;\n		margin:20px 0 8px;\n	}\n	.ui-loadding-box h5{\n		margin:0;\n		color: #fff;\n		font-weight: normal;\n		font-size: 14px;\n	}\n	/*\u65cb\u8f6c\u52a8\u753b*/\n	.rotare-animate{\n		animation:animate 1.5s infinite;\n		animation-timing-function:linear;\n		-webkit-animation:animate 1.5s infinite; /* Safari and Chrome */\n		-webkit-animation-timing-function:linear;\n	}\n	@keyframes animate{  \n		100% {\n			transform:rotate(360deg);\n			-ms-transform:rotate(360deg); 	/* IE 9 */\n			-moz-transform:rotate(360deg); 	/* Firefox */\n			-webkit-transform:rotate(360deg); /* Safari \u548c Chrome */\n			-o-transform:rotate(360deg); 	/* Opera */\n		} \n	}\n	@-webkit-keyframes animate{ \n		100% {\n			transform:rotate(360deg);\n			-ms-transform:rotate(360deg); 	/* IE 9 */\n			-moz-transform:rotate(360deg); 	/* Firefox */\n			-webkit-transform:rotate(360deg); /* Safari \u548c Chrome */\n			-o-transform:rotate(360deg); 	/* Opera */\n		} \n	}\n	@-moz-keyframesanimate{ \n		100% {\n			transform:rotate(360deg);\n			-ms-transform:rotate(360deg); 	/* IE 9 */\n			-moz-transform:rotate(360deg); 	/* Firefox */\n			-webkit-transform:rotate(360deg); /* Safari \u548c Chrome */\n			-o-transform:rotate(360deg); 	/* Opera */\n		} \n	}\n	 @-ms-keyframesanimate{ \n		100% {\n			transform:rotate(360deg);\n			-ms-transform:rotate(360deg); 	/* IE 9 */\n			-moz-transform:rotate(360deg); 	/* Firefox */\n			-webkit-transform:rotate(360deg); /* Safari \u548c Chrome */\n			-o-transform:rotate(360deg); 	/* Opera */\n		} \n	}\n	</style>\n	<div>\n		<img src="//gaic.alicdn.com/aic/h5/release/sdk/__static__/f3bb39-TB1lXUMKVXXXXa_XpXXXXXXXXXX-128-128.gif">\n		<h5>\u540c\u6b65\u8bbe\u5907\u72b6\u6001</h5>\n	</div>\n</div>'
}), define("_sdk_tool", [], function() {
    function e(e) {
        var t, n;
        t = [];
        for (n in e) t.push(i(n) + ": " + i(e[n]));
        return "{" + t.join(", ") + "}"
    }
    function t(e) {
        var t, n, o;
        for (t = [], n = 0, o = e.length; o > n; n++) t.push(i(e[n]));
        return "[" + t.join(", ") + "]"
    }
    function i(i) {
        return "[object Function]" == o.call(i) ? i.toString() : "[object Array]" == o.call(i) ? t(i) : "[object String]" == o.call(i) ? '"' + i.replace('"', '\\"') + '"' : i === Object(i) ? e(i) : i.toString()
    }
    var n = document.createElement("div"),
        o = Object.prototype.toString,
        s = {
            modal: function(e) {
                e = e || {};
                var t = "",
                    i = "";
                if (e.buttons && e.buttons.length > 0) for (var o = 0; o < e.buttons.length; o++) i += '<span class="modal-button' + (e.buttons[o].bold ? " modal-button-bold" : "") + '">' + e.buttons[o].text + "</span>";
                var a = e.title ? '<div class="modal-title">' + e.title + "</div>" : "",
                    r = e.text ? '<div class="modal-text">' + e.text + "</div>" : "",
                    l = e.afterText ? e.afterText : "",
                    c = e.buttons && 0 !== e.buttons.length ? "" : "modal-no-buttons",
                    u = e.modalCls || "";
                t = '<div class="modal ' + u + " " + c + '"><div class="modal-inner">' + (a + r + l) + '</div><div class="modal-buttons">' + i + "</div></div>", n.innerHTML = t;
                var d = $(n).children();
                return $("body").append(d[0]), d.find(".modal-button").each(function(t, i) {
                    $(i).on("click", function(i) {
                        e.buttons[t].close !== !1 && s.closeModal(d), e.buttons[t].onClick && e.buttons[t].onClick(d, i), e.onClick && e.onClick(d, t)
                    })
                }), s.openModal(d), d[0]
            },
            alert: function(e, t, i) {
                return "function" == typeof t && (i = arguments[1], t = void 0), s.modal({
                    text: e || "",
                    title: "undefined" == typeof t ? "\u63d0\u793a" : t,
                    buttons: [{
                        text: "\u786e\u5b9a",
                        bold: !0,
                        onClick: i
                    }]
                })
            },
            openModal: function(e) {
                e = $(e);
                var t = e.hasClass("popover"),
                    i = e.hasClass("popup"),
                    n = e.hasClass("login-screen");
                t || i || n || e.css({
                    marginTop: -Math.round(e.outerHeight() / 2) + "px"
                });
                var o;
                n || (0 !== $(".modal-overlay").length || i || $("body").append('<div class="modal-overlay"></div>'), 0 === $(".popup-overlay").length && i && $("body").append('<div class="popup-overlay"></div>'), o = i ? $(".popup-overlay") : $(".modal-overlay"));
                e[0].clientLeft;
                return e.trigger("open"), n || o.addClass("modal-overlay-visible"), e.removeClass("modal-out").addClass("modal-in").show(), setTimeout(function() {
                    e.hasClass("modal-out") ? e.trigger("closed") : e.trigger("opened")
                }, 300), !0
            },
            closeModal: function() {
                $(".modal,.modal-overlay").remove()
            },
            urlParam: function(e) {
                return e = e || window.location.search, "string" != typeof e ? {} : (e = e.trim().replace(/^(\?|#|&)/, ""), e ? e.split("&").reduce(function(e, t) {
                    var i = t.replace(/\+/g, " ").split("="),
                        n = i[0],
                        o = i[1];
                    return n = decodeURIComponent(n), o = void 0 === o ? null : decodeURIComponent(o), e.hasOwnProperty(n) ? Array.isArray(e[n]) ? e[n].push(o) : e[n] = [e[n], o] : e[n] = o, e
                }, {}) : {})
            },
            beginSeconds: function(e, t) {
                var i;
                e || (e = new Date), t ? (_day = isNaN(t.day) ? 0 : t.day, _year = isNaN(t.year) ? 0 : t.year, _month = isNaN(t.month) ? 0 : t.month) : (e = new Date, e.setHours(0), e.setMinutes(0), e.setSeconds(0), _day = 0, _year = 0, _month = 0), i = new Date(e.getTime());
                var n = Date.UTC(i.getFullYear() - _year, i.getMonth() - _month, i.getDate() - _day, i.getHours() - 8, i.getMinutes(), i.getSeconds());
                return parseInt(n / 1e3)
            },
            dateFormat: function(e, t) {
                var i = {
                    "M+": e.getMonth() + 1,
                    "d+": e.getDate(),
                    "h+": e.getHours(),
                    "m+": e.getMinutes(),
                    "s+": e.getSeconds(),
                    "q+": Math.floor((e.getMonth() + 3) / 3),
                    S: e.getMilliseconds()
                };
                /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
                for (var n in i) new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[n] : ("00" + i[n]).substr(("" + i[n]).length)));
                return t
            },
            serialiseObject: function(e) {
                var t = [];
                for (var i in e) e.hasOwnProperty(i) && t.push(i + "=" + e[i]);
                return t.join("&")
            },
            hideToast: function(e) {
                var t = $(".toast-ct." + e);
                t && t.remove()
            },
            toast: function(e) {
                var t, i, n = e.cls || "cls",
                    o = "." + n,
                    a = $(".toast-ct").length;
                if (t = $(".toast-ct" + o), t.length || ($(document.body).append('<div class="toast-ct ' + n + '"><div class="toast"></div></div>'), t = $(".toast-ct" + o)), i = t.find(".toast"), t = i.parent(), i.html(e.message), !t.hasClass("show")) {
                    t.addClass("show");
                    var r = t.height(),
                        l = t.css("bottom").replace("px", "");
                    l = parseInt(l) + r * a + 10 * a, t.css("bottom", l + "px"), e.hold || !
                        function(e, t) {
                            setTimeout(function() {
                                s.hideToast(e)
                            }, t || 5e3)
                        }(n, e.duration)
                }
            },
            tip: function(e) {
                s.toast({
                    message: e,
                    cls: "cls",
                    duration: 3e3
                })
            },
            loadshow: function(e, t) {
                var i = this.loadEl || (this.loadEl = document.querySelector(".ui-load"));
                i || ($("body").append('<div class="ui-load"><div class="ui-loadtext"><i class="iconfont">&#xe625;</i><span id="J_loadtxt"></span></div></div>'), i = this.loadEl = document.querySelector(".ui-load")), e && (i.querySelector("#J_loadtxt").innerHTML = e), i.style.display = "block", t && setTimeout(function() {
                    i.style.display = "none"
                }, t)
            },
            loadhide: function() {
                var e = this.loadEl || (this.loadEl = document.querySelector(".ui-load"));
                e && (e.style.display = "none")
            },
            bindEvents: function(e, t) {
                t === !0 && this.unbindEvents(e);
                for (var i in e) e[i].selector ? $(e[i].element).on(e[i].event, e[i].selector, e[i].handler) : $(e[i].element).on(e[i].event, e[i].handler)
            },
            unbindEvents: function(e) {
                for (var t in e) e[t].selector ? $(e[t].element).off(e[t].event, e[t].selector, e[t].handler) : $(e[t].element).off(e[t].event, e[t].handler)
            },
            map: function() {
                var e = 0,
                    t = new Object,
                    i = {
                        put: function(i, n) {
                            this.containsKey(i) || e++, t[i] = n
                        },
                        get: function(e) {
                            return this.containsKey(e) ? t[e] : null
                        },
                        remove: function(i) {
                            delete t[i] && e--
                        },
                        containsKey: function(e) {
                            return e in t
                        },
                        containsValue: function(e) {
                            for (var i in t) if (t[i] == e) return !0;
                            return !1
                        },
                        values: function() {
                            var i = new Array(e);
                            for (var n in t) i.push(t[n]);
                            return i
                        },
                        keys: function() {
                            var i = new Array(e);
                            for (var n in t) i.push(n);
                            return i
                        },
                        size: function() {
                            return e
                        }
                    };
                return i
            },
            showNotNetworkTip: function(e) {
                e = e || "0";
                var t = '<div class="not-network" style="top:' + e + '"><div class="network"><h1>\u8be5\u8bbe\u5907\u5df2\u65ad\u5f00\u7f51\u7edc</h1><p>\u8bf7\u5c06\u8bbe\u5907\u8fde\u4e0a\u60a8\u7684\u7f51\u7edc\uff0c\u60a8\u53ef\u4ee5\u5c1d\u8bd5\u4ee5\u4e0b\u64cd\u4f5c\uff1a</p><ul><li>\u68c0\u67e5\u667a\u80fd\u8bbe\u5907\u7684\u7535\u6e90\u662f\u5426\u63d2\u597d\u3002</li><li>\u68c0\u67e5\u5bb6\u91cc\u7684\u8def\u7531\u5668\u662f\u5426\u6210\u529f\u8fde\u7f51\uff0c\u6216\u5c1d\u8bd5\u91cd\u542f\u8def\u7531\u5668\u3002</li></ul></div></div>',
                    i = $(t),
                    n = $("html")[0];
                this.showNotNetworkTip._style_overflow = n.style.overflow, n.style.overflow = "hidden", $(n).append(i)
            },
            hideNotNetworkTip: function() {
                $("html")[0].style.overflow = this.showNotNetworkTip._style_overflow, $(".not-network").remove()
            },
            openTimer: function(e) {
                e = e || {}, e.__d = "20151118", DA.loadPage("http://g.alicdn.com/aic/sdk/extra-components/timeCase/index.html", _.extend({
                    fromUrl: location.href.replace("#", "")
                }, e))
            },
            obj_to_string: function(e) {
                return i(e)
            },
            getUTCANormalDiff: function() {
                var e = new Date,
                    t = e.getUTCFullYear(),
                    i = e.getUTCMonth(),
                    n = e.getUTCDate(),
                    o = e.getUTCHours(),
                    s = e.getUTCMinutes(),
                    a = e.getUTCSeconds(),
                    r = new Date(t, i, n, o, s, a).getTime(),
                    l = e.getTime() - r,
                    c = Math.round(l / 36e5);
                return c
            },
            getUTCHours: function(e) {
                var t = s.getUTCANormalDiff();
                return e -= t, 0 > e ? 24 + e : e
            },
            getUTCTimeZone: function() {
                var e = new Date,
                    t = -e.getTimezoneOffset() / 60;
                return t = t > 0 ? "+" + t : "-" + t
            },
            uiLoaddingBox: function(e) {
                return "remove" == e ? void $(".ui-loadding-box").remove() : void require(["text!./tpl/ui-loadding-box.html"], function(e) {
                    $(".ui-loadding-box").remove(), $("body").append(e)
                })
            },
            ifDeviceHome: function() {
                DA.nativeStorage.getStorage({
                    itemKey: "r:" + DA.modelName + ":deviceHome"
                }, function(e) {
                    var t = e["r:" + DA.modelName + ":deviceHome"];
                    t.split("?")[0] == location.href.split("?")[0] ? DA.Params.ifDeviceHome = !0 : DA.Params.ifDeviceHome = !1
                }, function() {
                    DA.Params.ifDeviceHome = !1
                })
            },
            ifBackDeviceHome: function() {
                var e = JSON.parse(localStorage.workingModel || "[]");
                if (!(e.indexOf(DA.model) > -1)) {
                    if (DA.Params.backDeviceHome) return void s.backDeviceHome();
                    if (!DA.Params.banReturnDeviceHome) {
                        var t = {
                            method: "appstore/getModelAppSupportStatus",
                            params: {
                                app_category: 1,
                                model: DA.model
                            }
                        };
                        DA.alinkRequestWsfProxy(t, function(e) {
                            e.result.data && s.backDeviceHome()
                        })
                    }
                }
            },
            backDeviceHome: function() {
                -1 != location.href.indexOf(DA.model + "/app.html") && DA.Params.ifDeviceHome || (DA.uiLoaddingBox(), DA.Params.deviceLoading = !0, setTimeout(function() {
                    DA.back("deviceHome"), $(".ui-loadding-box").remove()
                }, 1e3))
            },
            addNotReturnTag: function() {
                var e = JSON.parse(localStorage.workingModel || "[]");
                DA.Params.notReturnTag = !0, DA.model && DA.Params.notReturnTag && -1 == e.indexOf(DA.model) && (e.push(DA.model), localStorage.workingModel = JSON.stringify(e))
            }
        };
    return DA.toast = s.toast, DA.hideToast = s.hideToast, DA.tip = s.tip, DA.urlParam = s.urlParam, DA.getUTCHours = s.getUTCHours, DA.bindEvents = s.bindEvents, DA.unbindEvents = s.unbindEvents, DA.map = s.map(), DA.loadshow = s.loadshow, DA.loadhide = s.loadhide, DA.modal = s.modal, DA.closeModal = s.closeModal, DA.alert = s.alert, DA.openTimer = s.openTimer, DA.appTool = s, DA.obj_to_string = s.obj_to_string, DA.getUTCTimeZone = s.getUTCTimeZone, DA.uiLoaddingBox = s.uiLoaddingBox, DA.ifDeviceHome = s.ifDeviceHome, DA.ifBackDeviceHome = s.ifBackDeviceHome, DA.addNotReturnTag = s.addNotReturnTag, s
}), define("_sdk_api", ["windvane", "_sdk_tool"], function(e, t) {
    var i = {
            wsfLoginCalled: 0,
            request: {
                token: "",
                host: "com.aliyun.alink",
                hostType: "app",
                version: "1.0.0",
                target: "",
                account: ""
            },
            repCode: {
                LOGIN_TOKEN_ILLEGAL: {
                    3084: 1
                },
                APP_NOT_LOGIN: {
                    3002: 1,
                    INVOKE_LOGIN_ERROR: 1
                },
                SUCCESS: {
                    1000: 1
                },
                INVOKE_NET_ERROR: {
                    INVOKE_NET_ERROR: 1
                },
                INVOKE_SERVER_ERROR: {
                    INVOKE_SERVER_ERROR: 1
                }
            },
            _afterCallbacks: [],
            __alinkRequestWsfProxy: function(e, t, n) {
                if (console.log("alinkRequestWsfProxy:", e), 0 == i.wsfLoginCalled || 1 == i.wsfLoginCalled) {
                    var o = arguments,
                        s = function(e) {
                            return function() {
                                i.alinkRequestWsfProxy.apply(i, e)
                            }
                        }(o);
                    return i._afterCallbacks.push(s), void(0 == i.wsfLoginCalled && (i.wsfLoginCalled = 1, i.loginUser({}, function(e) {
                        i.wsfLoginCalled = 2, i.alinkRequestWsfProxy = i._alinkRequestWsfProxy;
                        var t = e.code || e.result.code;
                        i.repCode.LOGIN_TOKEN_ILLEGAL[t] && DA.loginTip();
                        for (var n = i._afterCallbacks.length - 1; n >= 0; n--) i._afterCallbacks[n]()
                    })))
                }
            },
            alinkRequestWsfProxy: function(e, t, n, o) {
                e = e || {}, t = t ||
                    function() {}, n = n ||
                    function() {}, e.request = o || i.request, i.wv.call("AlinkRequest", "wsfProxy", e, t, n)
            },
            alinkBleRequestWsfProxy: function(e, t, n, o) {
                e = e || {}, t = t ||
                    function() {}, n = n ||
                    function() {}, e.request = o || i.request, this.wv.call("AlinkRequest", "bleProxy", e, t, n)
            },
            alinkRequestMtopProxy: function(e, t, n) {
                if (e = e || {}, t = t ||
                        function() {}, n = n ||
                        function() {}, "sandbox" == DA.Params.loginEnv) i.getAjaxJsonp(e, t, n);
                else {
                    var o = {
                        api: e.method,
                        v: "1.0",
                        post: "1",
                        param: e.params || {}
                    };
                    i.wv.call("MtopWVPlugin", "send", o, t, n)
                }
            },
            wv: {
                call: function(e, t, n, o, s) {
                    window.WindVane && window.WindVane.call(e, t, n || {}, function(e) {
                        console.log("WSF\u63a5\u53e3\u8c03\u7528: ", n.method, "\u5165\u53c2", n, " & \u8fd4\u56de\u6570\u636e: ", e);
                        var t = e.code || e.result && e.result.code || "";
                        return i.repCode.LOGIN_TOKEN_ILLEGAL[t] && !DA.query.testmode ? void DA.loginTip() : (1e3 == t && e.result && !e.result.msg && (e.result.msg = "success"), void(o && o(e)))
                    }, s)
                }
            },
            getAjaxJsonp: function(e, t, i) {
                DA.getCurrentAccountInfo({}, function(n) {
                    var o = "sandbox_1c55c17e6a8523aff28b1c32efbcb67d_" + n.account + "_" + n.nickName,
                        s = {
                            data: {
                                requestContext: JSON.stringify({
                                    alink: "1.0",
                                    jsonrpc: "2.0",
                                    requestId: "1464624360052",
                                    lang: "en",
                                    time: Date.parse(new Date)
                                }),
                                token: encodeURI(o)
                            }
                        };
                    $.extend(s.data, e.params), s.data = JSON.stringify(s.data), $.ajax({
                        dataType: "jsonp",
                        type: "get",
                        url: "http://appserver.alink.tbsandbox.com/rest/api3.do?data=" + s.data + "&api=" + e.method,
                        jsonpCallback: "testmethod",
                        data: JSON.stringify(s),
                        success: function(e) {
                            t(e)
                        },
                        error: function(e) {
                            i(e)
                        }
                    })
                })
            },
            isInApp: function() {
                return "-1" != navigator.userAgent.indexOf("WindVane")
            }(),
            pushWebView: function(e, n, o) {
                if (e.url = e.url.replace(/http:|https:/, location.protocol), i.isInApp) {
                    var s = t.urlParam(e.url);
                    s.model && DA.nativeStorage.getStorage({
                        itemKey: "h5RQ:" + s.model
                    }, function(t) {
                        if (t["h5RQ:" + s.model]) {
                            var i = t["h5RQ:" + s.model];
                            console.log("tmpQueue" + i);
                            try {
                                i = JSON.parse(i), i.push(e.url), DA.nativeStorage.setStorage({
                                    itemKey: "h5RQ:" + s.model,
                                    itemValue: JSON.stringify(i)
                                })
                            } catch (n) {}
                        }
                    }), console.log("-----------url-------", e.url), i.wv.call("AlinkHybrid", "pushWebView", e, function() {
                        console.log(arguments)
                    }, function() {
                        console.log(arguments)
                    })
                } else window.location.href = e.url
            },
            popWebView: function(e, t, i) {
                e = e || {}, this.isInApp ? this.wv.call("AlinkHybrid", "popWebView", e, t, i) : e.url ? window.location.href = e.url : window.history.back()
            }
        },
        n = ["getAppInfo", "loginUser", "getCurrentAccountInfo", "queryCaseSnapshot", "getDeviceDetailInfo", "setDeviceProperty", "getDeviceProperty", "getDeviceStatusHistory", "getDeviceDataHistory", "reassignDevData", "checkProvisionSupporting", "startDeviceProvision", "stopDeviceProvision", "stopDiscover", "startDiscover", "requestRouterNameInfo", "requestRouterUUID", "discoverLocalDevices", "registerDeviceByUser", "bindDeviceByUser", "unbindDeviceByUser", "dismissUserFromDevice", "setDeviceStatus", "postDeviceDataArray", "getDeviceStatusHistory", "getOutdoorWeather", "updateDeviceInfo", "getDeviceStatus", "getDeviceStatusArray", "getDeviceInfo", "getAlinkTime", "getDevicesByUser", "getUsersByDevice", "getModelInfo", "requestWifiLevel", "getUserFriend", "createUserFriend", "deleteUserFriend", "getUserDataArray", "postUserDataArray", "getUserDataHistory", "backupAppData", "retrieveAppData", "getCameraLiveStreamingURL", "msgcenter_getAlarmHistory", "msgcenter_updateAlarmStatus", "msgcenter_getUserPushConfig", "msgcenter_postUserPushConfig", "setDeviceStatusArray", "appstore_getAppAvailableTag", "appstore_getAppControlInstructions", "appstore_getDeviceApp", "appstore_getAppDetailedInfo", "appstore_getUserDevApp", "appstore_markFavoriteApp", "appstore_unMarkFavoriteApp", "appstore_getAppUpdateStatus", "appstore_runApp", "appstore_getUserContext", "appstore_updateUserContext", "appstore_getAppAdjustableAttribute", "case_queryCaseSnapshot", "case_queryCase", "case_queryCaseTemplateList", "case_queryCaseList", "case_updateCaseState", "case_updateCase", "case_addCase", "case_removeCase", "case_runCase", "case_stopCase", "case_queryDeviceRunSnapshot", "case_queryDeviceList", "case_addTemplateCase", "case_updateTemplateCase", "case_queryTemplateCase", "case_queryTemplateCaseList", "case_getAdvicePlan", "case_updatePM25Value", "case_queryDeviceSchedule", "case_feedbackAdvicePlan", "case_queryPM25Value", "case_queryLocationSet", "case_switchTemplateCase", "case_queryCaseAccount", "dt.getDynamicData", "dt.calculateAlgorithm", "dt.getDynamicData", "dt.assignDeviceData", "requestRemoteService", "scanURL", "doSetRegions", "app.support.getErrorCodeInfo"],
        o = ["initialize", "isInitialized", "close", "isEnabled", "isConnected", "connect", "reconnect", "discover", "characteristics", "disconnect", "startScan", "stopScan", "isScanning", "read", "write", "subscribe", "unsubscribe", "readDescriptor", "writeDescriptor", "descriptors", "rssi", "services"];
    DA.ble = DA.ble ? DA.ble : {}, o.forEach(function(e) {
        DA.ble[e] = function(t, n, o, s) {
            var a = {
                method: e,
                params: t
            };
            i.alinkBleRequestWsfProxy(a, n, o, s)
        }
    }), n.forEach(function(e) {
        DA[e] = function(t, n, o, s) {
            var a = e.replace("_", "/"),
                r = {
                    method: a,
                    params: t
                };
            i.alinkRequestWsfProxy(r, n, o, s)
        }
    });
    var s = ["toLogin", "logout", "switchH5RootUrl", "pushWebView", "pushReactNative", "popWebView", "toggleSwipeBack", "WVAlinkUserTrack"];
    s.forEach(function(e) {
        DA[e] = function(t, n, o) {
            i.wv.call("AlinkHybrid", e, t || {}, n, o)
        }
    });
    var a = ["getLocation", "searchLocation"];
    a.forEach(function(e) {
        DA[e] = function(t, n, o) {
            i.wv.call("WVLocation", e, t || {}, n, o)
        }
    }), DA.hasNetWork = function(e) {
        i.wv.call("WVNetwork", "getNetworkType", {}, function(t) {
            e("NONE" !== t.type)
        })
    }, DA.playSystemSound = function(e, t, n) {
        i.wv.call("WVAudio", "playSystemSound", e || {}, t, n)
    }, DA.backupDeviceData = function(e, t, n, o, s) {
        var a = {
                method: "backupDeviceData",
                params: t
            },
            s = i.request;
        s.uuid = e, i.alinkRequestWsfProxy(a, n, o, s)
    }, DA.retrieveDeviceData = function(e, t, n, o, s) {
        var a = {
                method: "retrieveDeviceData",
                params: t
            },
            s = i.request;
        s.uuid = e, i.alinkRequestWsfProxy(a, n, o, s)
    }, DA.getOutdoorWeather = function(e, t, n) {
        var o = {
            method: "service.weather.query",
            params: e
        };
        i.alinkRequestWsfProxy(o, t, n)
    }, DA.getRemoteContent = function(e, t, n) {
        i.wv.call("AlinkRequest", "doGetRemoteContent", {
            url: e
        }, t, n)
    }, DA.scanURL = function(e, t) {
        i.wv.call("AlinkRequest", "scanURL", "", e, t)
    }, DA.recordUT = function(e, t, n, o) {
        i.wv.call("AlinkUserTrack", "commitEvent", {
            eventID: e,
            properties: t
        }, n ||
            function() {}, o ||
            function() {})
    }, DA.nativeStorage = {
        setStorage: function(e, t, n) {
            var o = {
                method: "setItem",
                params: e
            };
            i.wv.call("AlinkHybrid", "storage", o, t ||
                function() {}, n ||
                function() {})
        },
        getStorage: function(e, t, n) {
            var o = {
                method: "getItem",
                params: e
            };
            i.wv.call("AlinkHybrid", "storage", o, t ||
                function() {}, n ||
                function() {})
        },
        removeStorage: function(e, t, n) {
            var o = {
                method: "removeItem",
                params: e
            };
            i.wv.call("AlinkHybrid", "storage", o, t ||
                function() {}, n ||
                function() {})
        }
    }, DA.getSubDeviceInfo = function(e, t) {
        var i = e.muuid,
            n = e.suuid;
        DA.getDeviceInfo({
            uuid: n
        }, function(e) {
            var i = e.result || {};
            "success" == i.msg && (console.log("getSubDeviceInfoWithCallback", JSON.stringify(e.result.data)), t && t(e.result.data))
        }, function() {}, {
            token: "",
            host: "com.aliyun.alink",
            hostType: "app",
            version: "1.0.0",
            target: i,
            account: ""
        })
    }, DA.getDeviceInfo = function(e, t, n, o) {
        function s(e) {
            if (e && e.result && 1e3 == e.result.code && e.result.data && e.result.data.length) {
                var i = e.result.data[0];
                i.nickName = i.displayName ? i.displayName : i.nickName || i.name, i.nickName = i.nickName ? i.nickName : "", e.result.data = i
            }
            t && t(e)
        }
        var a = {
            method: "app.queryDeviceInfo",
            params: {
                uuids: [e.uuid]
            }
        };
        i.alinkRequestWsfProxy(a, s, n, o)
    }, DA.call = function(e, t, i, n) {
        window.WindVane.call(e, t, i, function(e) {
            n(e)
        }, function(e) {
            console.log("deviceWatcher opened fail: " + JSON.stringify(e))
        })
    }, DA.watch = function(e, t) {
        DA.call("AlinkSdkDeviceWatcher", "watch", {
            uuids: e,
            started: !0
        }, function(e) {
            t(e)
        })
    }, DA.getSubDevicesByGateway = function(e, t, n, o) {
        var s = {
                method: "getSubDevicesByGateway",
                params: e
            },
            t = t ||
                function() {}, n = n ||
                function() {}, o = o || i.request;
        i.alinkRequestWsfProxy(s, function(e) {
            e && e.result && 1e3 == e.result.code && (DA.subUUIDs = [], e.result.data.forEach(function(e) {
                DA.subUUIDs.push(e.uuid)
            }), DA.watch(DA.subUUIDs, function(e) {
                console.log("deviceWatcher opened on subDevice " + DA.subUUIDs, e)
            })), t(e)
        }, n, o)
    }, setTimeout(function() {
        DA.toggleSwipeBack({
            enable: "1"
        })
    }, 1e3), window.alert = DA.alert = function(e) {
        var t = {
            message: e.toString(),
            okbutton: "\u786e \u5b9a"
        };
        window.WindVane.call("WVUIDialog", "alert", t, function(e) {}, function(e) {})
    };
    var r, l, c;
    return document.addEventListener("wv.dialog", function(e) {
        e.param.type == c.okbutton ? r && r() : e.param.type == c.canclebutton && l && l()
    }, !1), window.confirm = DA.confirm = function(e, t, i) {
        return r = t, l = i, c = {
            message: e.msg.toString(),
            okbutton: e.ok || "\u786e \u5b9a",
            canclebutton: e.cancel || "\u53d6 \u6d88",
            _index: 10087
        }, window.WindVane.call("WVUIDialog", "confirm", c, function(e) {}, function(e) {}), !1
    }, DA.alinkRequestWsfProxy = i.alinkRequestWsfProxy, DA.alinkRequestMtopProxy = i.alinkRequestMtopProxy, i
}), define("_sdk_storage", [], function() {
    function e(e) {
        if (this.enabled = function() {
                try {
                    return "localStorage" in window && null !== window.localStorage
                } catch (e) {
                    return !1
                }
            }(), this.session = {}, this.enabled) try {
            this.session = JSON.parse(localStorage.getItem(e)) || {}
        } catch (t) {}
        this.save = function() {
            return this.enabled && localStorage.setItem(e, JSON.stringify(this.session)), this.session
        }, this.set = function(e, t) {
            return this.session[e] = t, this.save(), this.session[e]
        }, this.get = function(e) {
            return this.session[e]
        }, this.remove = function(e) {
            return delete this.session[e], this.save()
        }, this.clear = function() {
            return this.session = {}, this.save()
        }
    }
    return e
}), define("text!tpl/deviceError.html", [], function() {
    return '<div class="errorPage">\n    <div class="navbar">\n        <div class="navbar-inner">\n            <div class="left">\n                <a href="#" class="icon-only popwebview"><i class="iconfont">&#xe618;</i></a>\n            </div>\n        </div>\n    </div>\n	<div class="errorInfo">\n		<div class="mainErrorInfo">\n			<i class="alink_iconfont errorIcon" style=\'font-family: "iconfont" !important;\'>&#x3102;</i>\n			<p class="mainErrorDescription">\u60a8\u7684"<%=errorDevice%>"\u53d1\u751f\u5f02\u5e38\uff0c\u8bf7\u6839\u636e\u63d0\u793a\u8fdb\u884c\u540e\u7eed\u5904\u7406\uff0c\u5e76\u6ce8\u610f\u64cd\u4f5c\u5b89\u5168</p>\n		</div>\n		<ul class="detailErrorList">\n			<li class="detailErrorItem">\n				<span class="itemKey">\u5f02\u5e38\u4ee3\u7801: </span>\n				<span class="itemValue"><%=errorCode%></span>\n			</li>\n			<li class="detailErrorItem">\n				<span class="itemKey">\u5f02\u5e38\u63cf\u8ff0: </span>\n				<span class="itemValue"><%=errorDescription%></span>\n			</li>\n			<li class="detailErrorItem">\n				<span class="itemKey">\u89e3\u51b3\u65b9\u6848: </span>\n				<span class="itemValue"><%=solution%></span>\n			</li>\n			<li class="detailErrorItem hidden">\n				<span class="itemKey">\u552e\u540e\u7535\u8bdd: </span>\n				<span class="itemValue itemTelValue"><%=telephone%></span>\n			</li>\n		</ul>\n	</div>\n	<div class="btnbox">\n		<div class="ui-main-btn J_to_maintain_location hidden">\u67e5\u770b\u7ef4\u4fee\u7f51\u70b9</div>\n		<div class="ui-main-btn J_to_call hidden">\u547c\u53eb\u552e\u540e</div>\n		<div class="ui-main-btn J_to_feedback hidden">\u5728\u7ebf\u53cd\u9988</div>\n	</div>\n	<!-- \u5237\u65b0 -->\n	<div class="refresh" onclick="location.reload();">\n		<div class="circle refreshIcon">\n			<i class="iconfont">\ue6a8</i>	\n		</div>\n		<p>\u5237\u65b0\u8bd5\u8bd5</p>\n	</div>\n</div>\n'
}), define("_sdk_error_code", ["text!./tpl/deviceError.html"], function(e) {
    var t, i, n, o, s = {
        errorCodeInfo: [{
            code: "SDK_E1",
            solution: "\u8bf7\u7a0d\u5019\u518d\u8bd5\u6216\u8bbe\u7f6e\u60a8\u7684\u7f51\u7edc",
            codeDesc: "\u5f53\u524d\u7f51\u7edc\u4e0d\u4f73\uff0c\u65e0\u6cd5\u64cd\u4f5c"
        }, {
            code: "SDK_E2",
            solution: "\u65b0\u8bbe\u5907\u521d\u59cb\u5316\u4e2d\uff0c\u8bf71\u5206\u949f\u4ee5\u540e\u518d\u5c1d\u8bd5",
            codeDesc: "\u8bbe\u5907\u6570\u636e\u51fa\u9519\u4e86"
        }, {
            code: "SDK_E3",
            solution: "\u8bf7\u60a8\u91cd\u65b0\u7ed1\u5b9a",
            codeDesc: "\u60a8\u7684\u8bbe\u5907\u5df2\u7ecf\u88ab\u89e3\u7ed1"
        }, {
            code: "SDK_E4",
            solution: "\u8bf7\u67e5\u770b\u95ee\u9898\u63cf\u8ff0",
            codeDesc: ""
        }, {
            code: "SDK_E5",
            solution: "\u8bf7\u60a8\u91cd\u542f\u60a8\u7684\u8bbe\u5907\u6216\u8005\u91cd\u65b0\u6253\u5f00\u963f\u91cc\u5c0f\u667a\uff0c\u5982\u95ee\u9898\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u6211\u4eec\u7684\u5ba2\u670d\u70ed\u7ebf\uff01",
            codeDesc: ""
        }, {
            code: "SDK_E6",
            solution: "\u8bf7\u60a8\u91cd\u542f\u60a8\u7684\u8bbe\u5907\u6216\u8005\u91cd\u65b0\u6253\u5f00\u963f\u91cc\u5c0f\u667a\uff0c\u5982\u95ee\u9898\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u6211\u4eec\u7684\u5ba2\u670d\u70ed\u7ebf\uff01",
            codeDesc: ""
        }],
        errorCode: "",
        errorCodeArray: ["SDK_E1", "SDK_E2", "SDK_E3", "SDK_E4", "SDK_E5", "SDK_E6"],
        feedBackEnabled: !1,
        originLength: 0,
        maintenanceCall: "",
        isMaintLoationsEnabled: !1,
        feedBackEnabled: !1
    };
    DA.errorPage = function(t) {
        if (t = t || {}, "remove" == t.status) return void $(".errorPage").remove();
        var t = {
                errorDevice: t.errorDevice || DA.deviceName || DA.displayName,
                errorCode: t.code,
                errorDescription: t.codeDesc,
                solution: t.solution,
                telephone: t.maintenanceCall
            },
            i = _.template(e)(t);
        DA.nativeCmp.topbar.hideNavbar(function() {
            console.log("set success")
        }, function() {
            console.log("set fail")
        }), $("body").append(i), document.body.addEventListener("touchmove", self.preventEvt, !1), t.isMaintLoationsEnabled && $(".J_to_maintain_location").removeClass("hidden"), t.feedBackEnabled && $(".J_to_feedback").removeClass("hidden"), t.telephone && $(".J_to_call,.detailErrorItem").removeClass("hidden"), $(".page-content").addClass("error-page-show"), a.errorPageBind(t.code)
    };
    var a = {
        init: function(e, s, a, r) {
            t = e, i = s, n = a, o = r
        },
        getErrorInfo: function(e) {
            return s.errorCode ? void e(s) : DA.deviceErrorInfo && DA.deviceErrorInfo[DA.model] ? void e(DA.deviceErrorInfo[DA.model]) : void this.getDeviceErrorCode(DA.model, function(t) {
                if (t && t.errorCodeInfo && t.errorCodeInfo.length > 0) {
                    var i = t.errorCodeInfo,
                        n = [];
                    for (var o in i) n.push(i[o].code);
                    s.errorCodeArray = s.errorCodeArray.concat(n), s.errorCodeInfo = s.errorCodeInfo.concat(t.errorCodeInfo), s.errorCode = t.errorCode, s.originLength = i.length, s.feedBackEnabled = !0, s.maintenanceCall = t.maintenanceCall, s.isMaintLoationsEnabled = t.isMaintLoationsEnabled
                }
                DA.deviceErrorInfo = {}, DA.deviceErrorInfo[DA.model] = s, e(s)
            })
        },
        getDeviceErrorCode: function(e, t) {
            var n = {
                method: "app.support.getErrorCodeInfo",
                params: {
                    model: e || DA.modelName
                }
            };
            i.alinkRequestWsfProxy(n, function(e) {
                1e3 == e.result.code ? (console.log("getEC result", e), t && t(e.result.data)) : t && t(!1)
            })
        },
        checkError: function(e, t) {
            var i = this;
            this.getErrorInfo(function(n) {
                if (!n) return void(t && t(!1));
                var o = n.errorCode,
                    s = (n.errorCodeInfo, n.errorCodeArray);
                if (!e[o] || DA.uuid != e.uuid) return void(t && t(!1));
                if (s.length > 0 && e[o]) {
                    var a = s.indexOf(e[o].value);
                    if ("-1" != a) i.errorPage(e[o].value), t && t(!0);
                    else {
                        var r = $(".errorPage");
                        r.length > 0 && (r.remove(), document.body.removeEventListener("touchmove", this.preventEvt, !1), $(".page-content").removeClass("error-page-show"), window.location.reload()), t && t(!1)
                    }
                } else t && t(!1)
            })
        },
        errorPage: function(t, i) {
            var n = this;
            i = i || {};
            var o = s.errorCodeArray.indexOf(t),
                a = s.errorCodeInfo[o],
                r = i.solution ? i.solution : a.solution,
                l = i.codeDesc ? i.codeDesc : a.codeDesc;
            if ($(".errorPage").length > 0) {
                if (t == localStorage.getItem(DA.uuid + "-errorCode")) return;
                localStorage.setItem(DA.uuid + "-errorCode", t), $(".errorPage").remove(), document.body.removeEventListener("touchmove", this.preventEvt, !1)
            }
            var c = {
                    errorDevice: DA.deviceName || DA.displayName,
                    errorCode: t,
                    errorDescription: l,
                    solution: r,
                    telephone: s.maintenanceCall
                },
                u = _.template(e)(c);
            DA.nativeCmp.topbar.hideNavbar(function() {
                console.log("set success")
            }, function() {
                console.log("set fail")
            }), $("body").append(u), document.body.addEventListener("touchmove", n.preventEvt, !1), s.isMaintLoationsEnabled && $(".J_to_maintain_location").removeClass("hidden"), s.feedBackEnabled && $(".J_to_feedback").removeClass("hidden"), s.maintenanceCall && $(".J_to_call,.detailErrorItem").removeClass("hidden"), $(".page-content").addClass("error-page-show"), n.errorPageBind(t), console.info("\u9519\u8bef--\u8bbe\u5907error", s)
        },
        preventEvt: function(e) {
            e.preventDefault()
        },
        errorPageBind: function(e) {
            var t = $(document.body);
            t.on("click", ".J_to_maintain_location", function() {
                n.loadPage("http://gaic.alicdn.com/aic/h5/" + n.getEnv().env + "/feedback-system/repair-network/app.html")
            }), t.on("click", ".J_to_call", function() {
                var e = $(".itemTelValue").html();
                location.href = "tel://" + e
            }), t.on("click", ".J_to_feedback", function() {
                n.loadPage("http://gaic.alicdn.com/aic/h5/" + n.getEnv().env + "/feedback-system/app.html", {
                    from: "DEVICE_APP_PANEL",
                    EC: e
                })
            }), t.on("click", ".popwebview", function() {
                i.popWebView()
            })
        }
    };
    return a
}), define("text!tpl/loadingDeviceInfo.html", [], function() {
    return '<div class="loadingDeviceInfo">\n	<div class="box">\n		<a href="#" class="back"><i class="iconfont">\ue618</i></a>\n		<img src="//gaic.alicdn.com/aic/h5/release/sdk/__static__/470472-TB1Fio0LFXXXXbRXVXXYjFlTXXX-167-167.gif" alt="">\n    	<h5>\u8bbe\u5907\u6b63\u5728\u521d\u59cb\u5316</h5>\n		<span>\u9884\u8ba1\u9700\u8981\u51e0\u79d2\u65f6\u95f4\uff0c\u8bf7\u7a0d\u7b49...</span>\n	</div>\n</div>\n'
}), define("_sdk_loading", ["text!./tpl/loadingDeviceInfo.html"], function(e) {
    return DA.setLoadingTime = function(e) {
        DA.loadingTime = e.val
    }, {
        loadingDeviceInfo: function(t) {
            $(".loadingDeviceInfo").remove(), $("body").append(e), $("body").on("click", ".back", function() {
                DA.back()
            })
        }
    }
}), define("_sdk_alink", ["_sdk_tool", "_sdk_api", "_sdk_storage", "_sdk_error_code", "_sdk_loading"], function(e, t, i, n, o) {
    function s(e) {
        return DA.h5Env ? void(e && e()) : void window.WindVane.call("AlinkRequest", "getEnvStatus", {}, function(t) {
            if (console.log("env", t), t && t.h5env) {
                DA.h5Env = t.h5env || "release";
                var i = t.h5env;
                "test" == i || "omn" == i || "factory" == i ? DA.h5Env = "test" : ("awp" == i || "awpcdn" == i) && (DA.h5Env = "release"), e && e()
            } else DA.h5Env = "release", e && e()
        }, function(t) {
            DA.h5Env = "release", e && e()
        })
    }
    function a() {
        var e = {},
            t = navigator.userAgent,
            i = Dom7,
            n = t.match(/(Android);?[\s\/]+([\d.]+)?/),
            o = t.match(/(iPad).*OS\s([\d_]+)/),
            s = t.match(/(iPod)(.*OS\s([\d_]+))?/),
            a = !o && t.match(/(iPhone\sOS)\s([\d_]+)/);
        if (e.ios = e.android = e.iphone = e.ipad = !1, n && (e.os = "android", e.osVersion = n[2], e.android = !0), (o || a || s) && (e.os = "ios", e.ios = !0), a && !s && (e.osVersion = a[2].replace(/_/g, "."), e.iphone = !0), o && (e.osVersion = o[2].replace(/_/g, "."), e.ipad = !0), s && (e.osVersion = s[3] ? s[3].replace(/_/g, ".") : null, e.iphone = !0), e.ios && e.osVersion && t.indexOf("Version/") >= 0 && "10" === e.osVersion.split(".")[0] && (e.osVersion = t.toLowerCase().split("version/")[1].split(" ")[0]), e.webView = (a || o || s) && t.match(/.*AppleWebKit(?!.*Safari)/i), e.os && "ios" === e.os) {
            var r = e.osVersion.split(".");
            e.minimalUi = !e.webView && (s || a) && (1 * r[0] === 7 ? 1 * r[1] >= 1 : 1 * r[0] > 7) && i('meta[name="viewport"]').length > 0 && i('meta[name="viewport"]').attr("content").indexOf("minimal-ui") >= 0
        }
        var l = i(window).width(),
            c = i(window).height();
        e.statusBar = !1, e.webView && l * c === screen.width * screen.height ? e.statusBar = !0 : e.statusBar = !1;
        var u = [];
        if (e.pixelRatio = window.devicePixelRatio || 1, e.pixelRatio >= 2 && u.push("retina"), e.os && (u.push(e.os, e.os + "-" + e.osVersion.split(".")[0], e.os + "-" + e.osVersion.replace(/\./g, "-")), "ios" === e.os)) for (var d = parseInt(e.osVersion.split(".")[0], 10), h = d - 1; h >= 6; h--) u.push("ios-gt-" + h);
        return e.statusBar ? u.push("with-statusbar-overlay") : i("html").removeClass("with-statusbar-overlay"), u.length > 0 && i("html").addClass(u.join(" ")), e
    }
    var r = {
            token: "",
            host: "com.aliyun.alink",
            hostType: "app",
            version: "1.0.0",
            target: "",
            account: ""
        },
        l = [];
    DA.sceneMap || (DA.sceneMap = {});
    var c = function(e, t) {
            DA.sceneMap[e] = t
        },
        u = function(e) {
            return DA.sceneMap[e]
        };
    s();
    var d = {
            loginTip: function() {
                e.toast({
                    message: '\u4eb2!\u60a8\u9700\u8981\u767b\u5f55\u540e\u624d\u80fd\u8fdb\u884c\u64cd\u4f5c,<span class="blue">\u70b9\u51fb\u767b\u5f55</span>',
                    cls: "J-toLogin",
                    hold: !0
                }), window._GLOBAL_NEED_LOGIN = !0
            },
            notNetworkTip: function() {
                e.toast({
                    message: "\u4eb2! \u5f53\u524d\u7f51\u7edc\u4e0d\u53ef\u7528,\u8bf7\u68c0\u67e5\u60a8\u7684\u7f51\u7edc\u8bbe\u7f6e",
                    cls: "network-tip-down",
                    hold: !0
                })
            },
            bindPushData: function(e) {
                _.each(e, function(e, t) {
                    _.isFunction(e) && c(t, e)
                })
            },
            sendApp: function(e, t) {
                var i = u(e);
                d.log(e, JSON.stringify(t)), i && i(t)
            },
            getDeviceStatus: function(i, o, s, a) {
                if ("qixuanbug" != i) {
                    s = s || {}, s = _.defaults(s, r);
                    var l = i || DA.uuid,
                        c = {
                            uuid: l,
                            attrSet: []
                        },
                        u = {
                            method: "getDeviceStatus",
                            params: c
                        };
                    t.alinkRequestWsfProxy(u, function(t) {
                        if (DA.Params.deviceLoading) return void(DA.Params.deviceLoading = !1);
                        try {
                            if ("INVOKE_NET_ERROR" == t.code) return void n.errorPage("SDK_E1");
                            if (!t.result || "success" != t.result.msg) {
                                if (t.result && "no bind relation" === t.result.msg) return void n.errorPage("SDK_E3");
                                if (t.result && 3084 == t.result.code) return void n.errorPage("SDK_E3");
                                if ("function" == typeof e.loadhide && e.loadhide(), "release" == DA.h5Env) n.errorPage("SDK_E1");
                                else {
                                    var r = {
                                        codeDesc: JSON.stringify(t.result)
                                    };
                                    n.errorPage("SDK_E4", r)
                                }
                                return
                            }
                            var l = t.result.data,
                                c = 0,
                                u = !1;
                            if (_.each(l, function(e, t) {
                                    "onlineState" == t ? u = !0 : "uuid" != t && c++
                                }), location.href.indexOf("from=") > -1) var h = location.href.split("from=")[1].split("&")[0];
                            else var h = "";
                            if (u && 0 == c && "ignoreNoData" != a && "provisionFinish" == h) return void d.noDataLoading(i, o, s, a);
                            if (l.onlineState && "off" == l.onlineState.value && "provisionFinish" == h && DA.Params.loadingOnlineTime) {
                                var f = d.offLineLoading(i, o, s, a);
                                if (!f) return
                            }
                            DA.Params.loadingOnlineTime = !1, $(".loadingDeviceInfo").remove(), n.checkError(t.result.data, function(e) {
                                e || o && o(t.result.data)
                            })
                        } catch (p) {
                            var m = new Date,
                                v = m.getMonth() + 1,
                                g = m.getFullYear() + "-" + v + "-" + m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds(),
                                y = DA.h5Env || "release",
                                b = '\u884c\u6570\uff1a<span class="red">' + p.line + '</span><br>\u9519\u8bef\u4fe1\u606f\uff1a<span class="red">' + p.message + "</span><br>\u6587\u4ef6\uff1a" + p.sourceURL + JSON.stringify(t),
                                r = {
                                    solution: "\u8bf7\u60a8\u91cd\u542f\u60a8\u7684\u8bbe\u5907\u6216\u8005\u91cd\u65b0\u6253\u5f00\u963f\u91cc\u5c0f\u667a\uff0c\u5982\u95ee\u9898\u672a\u89e3\u51b3\uff0c\u8bf7\u8054\u7cfb\u6211\u4eec\u7684\u5ba2\u670d\u70ed\u7ebf!",
                                    codeDesc: g + " \u8bbe\u5907" + DA.uuid + "\u51fa\u73b0\u672a\u77e5\u5f02\u5e38"
                                };
                            "release" != y && (r = {
                                solution: b,
                                codeDesc: g + " \u8bbe\u5907" + DA.uuid + "\u51fa\u73b0\u672a\u77e5\u5f02\u5e38"
                            }), n.errorPage("SDK_E5", r)
                        }
                    }, function(e) {
                        var t = {
                            solution: "\u8bf7\u7a0d\u5019\u518d\u8bd5\u6216\u8bbe\u7f6e\u60a8\u7684\u7f51\u7edc",
                            codeDesc: "\u5f53\u524d\u7f51\u7edc\u4e0d\u4f73\uff0c\u65e0\u6cd5\u64cd\u4f5c"
                        };
                        "release" != h5Env && (t = {
                            solution: "\u8bf7\u67e5\u770b\u95ee\u9898\u63cf\u8ff0",
                            codeDesc: JSON.stringify(e)
                        }), n.errorPage("SDK_E6", t)
                    }, s)
                }
            },
            setDeviceStatus: function(i, n, o, s) {
                var a = [];
                if (s = s || {}, i = i || DA.uuid, !i) return void console.error("uuid\u4e0d\u5b58\u5728");
                s = _.defaults(s, r);
                for (var l in n) a.push(l);
                n.attrSet = a, n.uuid = i;
                var c = {
                    method: "setDeviceStatus",
                    params: n
                };
                d.log("\u6307\u4ee4\u4e0b\u53d1 - setDeviceStatus:", JSON.stringify(n)), t.alinkRequestWsfProxy(c, function(t) {
                    if (t.result) {
                        if ("success" == t.result.msg) return void(o && o(!0, t));
                        if ("no bind relation" === t.result.msg) return DA.loadshow('\u5f88\u62b1\u6b49\uff0c\u60a8\u7684\u8bbe\u5907\u5df2\u7ecf\u88ab\u89e3\u7ed1\uff0c\u8bf7\u60a8<span class="red">\u91cd\u65b0\u7ed1\u5b9a</span>'), void(o && o(!1, t));
                        o && o(!1, t)
                    }
                    e.loadshow("\u6307\u4ee4\u4e0b\u53d1\u5931\u8d25", 3e3)
                }, function(t) {
                    e.loadshow("\u6307\u4ee4\u4e0b\u53d1\u5931\u8d25", 3e3), o && o(!1, t)
                }, s)
            },
            setSubDeviceStatus: function(e, t, i) {
                var n = e.muuid,
                    o = e.suuid;
                d.setDeviceStatus(o, t, i, {
                    target: n
                })
            },
            getSubDeviceStatus: function(e, t) {
                var i = e.muuid,
                    n = e.suuid;
                d.getDeviceStatus(n, t, {
                    target: i
                })
            },
            error: function(e, t, i) {},
            sendLog: function(e) {},
            log: function(e, t) {
                var i = new Date;
                t = "\u3010" + i.getHours() + ":" + i.getMinutes() + ":" + i.getSeconds() + "\u3011\u3010" + e + "\u3011" + t, console.debug(t);
                var n = function() {
                    var e = {
                        group: "deviceLog",
                        action: "send",
                        uuid: DA.uuid,
                        content: t
                    };
                    "undefined" != typeof ws && ws.isReady ? ws.send(JSON.stringify(e)) : l.push(e)
                };
                "getDeviceStatus" == e ? setTimeout(n, 2e3) : n()
            },
            setEnv: function(e) {
                DA.h5Env || s()
            },
            getEnv: function() {
                return {
                    env: DA.h5Env || "release"
                }
            },
            loadPage: function(i, n) {
                var o;
                if (0 == i.indexOf("http://") || 0 == i.indexOf("https://")) {
                    var s = DA.h5Env || "release",
                        a = DA.query;
                    n = n || {}, n.name = encodeURI(n.name), n = _.defaults(n, {
                        env: s
                    }), n = _.defaults(n, a);
                    var r = {};
                    for (var l in n) r[encodeURIComponent(l)] = encodeURIComponent(n[l]);
                    var c = e.serialiseObject(r) || "";
                    o = i + "?" + c
                } else o = d.getWebUrl(i, n);
                o && (o = o.replace(/http:|https:/, location.protocol), DA.nativeStorage.setStorage({
                    itemKey: "r:" + DA.modelName + ":" + i,
                    itemValue: o
                }), t.pushWebView({
                    url: o
                }))
            },
            _getWebUrlConfig: function(t, i) {
                i = i ? i : {};
                var n = DA.h5Env || "release",
                    o = DA.query;
                i = _.defaults(i, {
                    env: n
                }), i = _.defaults(i, o);
                var s = {};
                for (var a in i) s[encodeURIComponent(a)] = encodeURIComponent(i[a]);
                var r = e.serialiseObject(s) || "";
                return "." == t[0] && "/" == t[1] ? t = t.substring(2, t.length) : "/" == t[0] && (t = t.substring(1, t.length)), {
                    appName: t,
                    queryString: r,
                    queryParam: o
                }
            },
            getWebUrl: function(e, t) {
                var i = location.protocol + "//" + window.location.host,
                    n = d._getWebUrlConfig(e, t),
                    e = n.appName,
                    o = n.queryString,
                    s = n.queryParam,
                    a = "",
                    r = DA.h5Env || "release";
                return "dev" == r ? (i = i + "/alink/device/" + DA.modelName, a = i + "/" + e + "?" + o) : "jssdk" == r ? (i = i + "/" + DA.modelName, a = i + "/" + e + "?" + o) : a = "test" == r || "alpha" == r ? i + "/aic/h5/test/" + s.cdnpath + "/" + e + "?" + o : i + "/aic/h5/release/" + s.cdnpath + "/" + e + "?" + o, a
            },
            back: function(e, i, n) {
                e ? DA.nativeStorage.getStorage({
                    itemKey: "r:" + DA.modelName + ":" + e
                }, function(i) {
                    var o = i["r:" + DA.modelName + ":" + e];
                    return o ? void t.popWebView({
                        url: o,
                        animation: n || ""
                    }) : void t.popWebView()
                }, function() {
                    t.popWebView()
                }) : t.popWebView()
            },
            scanJSSDK: function(t, n) {
                var o = function() {
                        DA.scanURL(function(e) {
                            var i = e.url,
                                n = t.model;
                            return -1 == i.indexOf(n) ? void setTimeout(function() {
                                alert("URL\u4e0d\u5408\u6cd5\uff0c\u8def\u5f84\u5fc5\u987b\u5305\u542b" + n)
                            }, 300) : void a(i)
                        })
                    },
                    s = new i("jssdkurl"),
                    a = function(i) {
                        var o = _.defaults(t, n),
                            a = e.serialiseObject(o);
                        i = i.indexOf("?") > 1 ? i + "&" + a : i + "?" + a, s.set(t.uuid + "jssdkurl", {
                            url: i,
                            host: t.host
                        }), DA.pushWebView({
                            url: i
                        })
                    },
                    r = s.get(t.uuid + "jssdkurl");
                r && r.url && confirm("\u662f\u5426\u4f7f\u7528\u8be5\u5730\u5740") ? DA.pushWebView({
                    url: r.url
                }) : o()
            },
            istoDevice: !1,
            pushDevice: function(t) {
                if (!d.istoDevice) {
                    d.istoDevice = !0, t = t || {};
                    var i = DA.h5Env || "release",
                        n = DA.h5Env;
                    if ("jssdk" == i) d.scanJSSDK(t, n);
                    else {
                        var o = "";
                        if (t.version) {
                            var s = t.version.split(";"),
                                o = s[1] || "";
                            o = o.trim(), o = o ? "_" + o : "", t.uiversion = o
                        }
                        var a = _.defaults(t, {
                                env: i
                            }),
                            r = {};
                        for (var l in a) r[encodeURIComponent(l)] = encodeURIComponent(a[l]);
                        var c = e.serialiseObject(r),
                            u = "http://aliplus.yunos.com/api/devicerouter?" + c;
                        DA.pushWebView({
                            url: u
                        })
                    }
                    setTimeout(function() {
                        d.istoDevice = !1
                    }, 300)
                }
            },
            h5Record: function(t, i) {
                var n = document.location.protocol + "//log.mmstat.com/aliz.",
                    o = e.serialiseObject(i),
                    s = n + t + "?" + o;
                console.debug("H5\u6253\u70b9\u6253\u5f80" + s);
                var a = new Image;
                a.src = s
            },
            getCurrentPage: function(e) {
                DA.model ? DA.nativeStorage.getStorage({
                    itemKey: "h5RQ:" + DA.model
                }, function(t) {
                    if (t["h5RQ:" + DA.model]) {
                        var i = t["h5RQ:" + DA.model];
                        try {
                            i = JSON.parse(i), i.length > 0 && e(i[i.length - 1])
                        } catch (n) {
                            e(!1)
                        }
                    } else e(!1)
                }) : e(!1)
            },
            noDataLoading: function(e, t, i, o) {
                d.addLoadingInfo(DA.Params.loadingInfoTime, function() {
                    DA.Params.loadingInfoTime = 0
                });
                var s = DA.loadingTime || DA.Params.loadingTime;
                DA.Params.loadingInfoTime == s ? ($(".loadingDeviceInfo").remove(), n.errorPage("SDK_E2"), $(".errorPage .refresh").show()) : setTimeout(function() {
                    DA.Params.loadingInfoTime++, d.getDeviceStatus(e, t, i, o)
                }, 1e3)
            },
            offLineLoading: function(e, t, i, n) {
                d.addLoadingInfo(DA.Params.loadingOnlineStateTime, function() {
                    DA.Params.loadingOnlineStateTime = 0
                });
                var o = 1e3;
                return 5 == DA.Params.loadingOnlineTime && 0 == DA.Params.loadingOnlineStateTime ? o = 4e3 : 5 == DA.Params.loadingOnlineTime && 1 == DA.Params.loadingOnlineStateTime && (o = 3e3), DA.Params.loadingOnlineStateTime != DA.Params.loadingOnlineTime ? (setTimeout(function() {
                    DA.Params.loadingOnlineStateTime++, d.getDeviceStatus(e, t, i, n)
                }, o), !1) : !0
            },
            addLoadingInfo: function(e, t) {
                e || (o.loadingDeviceInfo(), t())
            }
        },
        h = e.urlParam();
    return d.setEnv(h), DA.loginTip = d.loginTip, DA.query = h, DA.uuid = h.uuid, DA.modelName = h.model, DA.Storage = i, DA.h5Record = d.h5Record, DA.getCurrentPage = d.getCurrentPage, DA.bindPushData = d.bindPushData, DA.getDeviceStatus = d.getDeviceStatus, DA.setDeviceStatus = d.setDeviceStatus, DA.setSubDeviceStatus = d.setSubDeviceStatus, DA.getSubDeviceStatus = d.getSubDeviceStatus, DA.getWebUrl = d.getWebUrl, DA.getWebUrlParam = d._getWebUrlConfig, DA.loadPage = d.loadPage, DA.back = d.back, DA.pushDevice = d.pushDevice, DA.loadWidget = d.loadWidget, DA.Params = {
        loadingTime: 30,
        loadingOnlineTime: 5,
        ifDeviceHome: DA.ifDeviceHome()
    }, DA.log = d.log, DA.AlinkUI = {}, s(function() {
        DA.getCurrentAccountInfo({}, function(e) {
            if (e.account || e.userId) {
                var t = e.nickName || e.nick,
                    i = e.account || e.userId;
                if (DA.nickName = t, DA.userId = i, "release" != DA.h5Env) {
                    var n = document.createElement("link");
                    n.type = "text/css", n.rel = "stylesheet", n.href = "//aliplus.yunos.com/public/plugins/morris/morris.css", document.body.appendChild(n), setTimeout(function() {
                        var e = function(e) {
                            var t = "https:" == document.location.protocol ? " wss://" : " ws://",
                                i = "aliplus.yunos.com";
                            window.ws = new WebSocket(t + i + "/socket/", "alinkapp-protocol"), ws.isReady = !1, ws.onopen = function() {
                                ws.isReady = !0, ws.send(JSON.stringify({
                                    action: "register",
                                    group: "deviceLog",
                                    uuid: DA.uuid
                                })), e()
                            }, ws.onerror = function() {
                                ws.isReady = !1
                            }, ws.onclose = function() {
                                ws.isReady = !1
                            }
                        };
                        e(function() {
                            l.length > 0 && _.each(l, function(e) {
                                ws.isReady && ws.send(JSON.stringify(e))
                            })
                        })
                    }, 1e3)
                }
            }
        })
    }), DA.getDeviceInfo({
        uuid: DA.uuid
    }, function(e) {
        var t = e.result || {};
        if (console.log(e), "success" == t.msg) {
            var i = t.data;
            DA.deviceInfo = i, DA.deviceName = i.nickName, DA.model = i.model;
            var n = window.location,
                o = DA.query.cdnpath + "/app.html";
            (n.pathname.indexOf(DA.model + "/app.html") > 0 || n.pathname.indexOf(o) > 0) && (DA.nativeStorage.setStorage({
                itemKey: "r:" + DA.model + ":deviceHome",
                itemValue: n.href
            }), console.log("status change"), DA.nativeStorage.setStorage({
                itemKey: "h5RQ:" + DA.model,
                itemValue: JSON.stringify(["deviceHome"])
            }))
        }
    }), DA.onReady = function(e) {
        DA.target ? DA.getDeviceStatus(DA.uuid, function(t) {
            e && e.call(DA, t)
        }, {
            target: DA.target
        }) : DA.getDeviceStatus(DA.uuid, function(t) {
            e && e.call(DA, t)
        })
    }, DA.hasNetWork(function(e) {
        DA.networkIsAvailable = e
    }), DA.syncData = function() {}, DA.require = function(e, t) {
        require(["//gaic.alicdn.com/tms/requireconfig.js"], function(i) {
            require.config(i), require(e, t)
        })
    }, $(document).on("click", ".J-toLogin", function() {
        DA.toLogin()
    }), a(), n.init(e, t, d, i), console.log(DA.uiLoaddingBox, "DA.uiLoaddingBox"), d
}), define("_sdk_event", ["_sdk_alink", "_sdk_error_code"], function(e, t) {
    function i(e, t, i, n) {
        window.WindVane.call(e, t, i, function(e) {
            n(e)
        }, function(e) {
            console.log("deviceWatcher opened fail: " + JSON.stringify(e))
        })
    }
    function n(e, t) {
        i("AlinkSdkDeviceWatcher", "watch", {
            uuids: e,
            started: !0
        }, function(e) {
            t(e)
        })
    }
    var o = navigator.userAgent.match(/(Android)/i),
        s = function(i) {
            var o = i.param.method,
                s = i.param.params;
            return console.log("downStream-----", i), "attachSubDevice" == o ? void(s.uuid == DA.uuid && (s.clients.forEach(function(e) {
                DA.subUUIDs.push(e)
            }), e.sendApp(o, s), n(DA.subUUIDs, function(e) {
                console.log("deviceWatcher opened on subDevice" + DA.subUUIDs, e)
            }))) : "deviceStatusChange" != o && "deviceStatusChangeArray" != o ? DA.uuid == s.uuid ? void e.sendApp(o, s) : void 0 : (s instanceof Array == 1 && (s = i.param.params[0]), -1 != _.indexOf(DA.subUUIDs, s.uuid) ? void t.checkError(s, function(t) {
                console.log("res------", t), !t && e.sendApp(o, s)
            }) : (DA.uuid != s.uuid ? "" : console.log("\u6307\u4ee4\u4e0a\u62a5 - deviceStatusChange:", JSON.stringify(s)), DA.uuid != s.uuid || DA.model ? DA.uuid == s.uuid ? void t.checkError(s, function(t) {
                console.log("res------", t), !t && e.sendApp("deviceStatusChange", s)
            }) : void 0 : void e.sendApp(o, s)))
        };
    document.addEventListener("bleStatusAndStream", function(t) {
        try {
            console.log("bleStatusAndStream", t);
            var i = t.param.method,
                n = t.param.data;
            i && e.sendApp(i, n)
        } catch (t) {
            console.error(t)
        }
    }), document.addEventListener("downStream", s), document.addEventListener("netWorkStatusChange", function(t) {
        if (void 0 == t.param.wifilevel || t.param.status) {
            var i = !0;
            "down" == t.param.status ? i = !1 : "up" == t.param.status && (i = !0), e.sendApp("netWorkStatusChange", i), DA.networkIsAvailable = i
        }
    }, !1), document.addEventListener("WV.Event.APP.Active", function(t) {
        console.log("\u6d4b\u8bd5active"), (0 == document.hidden || 0 == document.webkitHidden) && (DA.syncData(), e.sendApp("APP_Active", DA.networkIsAvailable)), DA.ifDeviceHome(), o && DA.model ? DA.nativeStorage.getStorage({
            itemKey: "h5RQ:" + DA.model
        }, function(e) {
            if (e["h5RQ:" + DA.model]) {
                var t = e["h5RQ:" + DA.model];
                try {
                    t = JSON.parse(t), t.length > 1 && (t.pop(), DA.nativeStorage.setStorage({
                        itemKey: "h5RQ:" + DA.model,
                        itemValue: JSON.stringify(t)
                    }))
                } catch (i) {}
            }
        }) : DA.model && DA.ifBackDeviceHome()
    }), document.addEventListener("backToFront", function(e) {
        console.log("\u6d4b\u8bd5backToFront"), o && DA.model && DA.ifBackDeviceHome()
    }), document.addEventListener("WV.Event.APP.Background", function(e) {
        if (DA.ifDeviceHome(), !DA.Params.banReturnDeviceHome) {
            var t = {
                method: "appstore/getModelAppSupportStatus",
                params: {
                    app_category: 1,
                    model: DA.model
                }
            };
            DA.alinkRequestWsfProxy(t, function(e) {
                e.result.data && (DA.Params.backDeviceHome = !0)
            })
        }
    }), DA.uuid && n([DA.uuid], function(e) {
        console.log("deviceWatcher opened on " + DA.uuid, e)
    });
    var a = function() {
        DA.back()
    };
    document.addEventListener("back", a, !1), DA.removeBackEventListener = function() {
        document.removeEventListener("back", a, !1)
    }, DA.removeDownStreamEventListener = function() {
        document.removeEventListener("downStream", s, !1)
    }
}), define("_sdk_bletool", [], function() {
    var e = navigator.userAgent.match(/(Android)/i),
        t = {
            encodedStringToBytes: function(e) {
                for (var t = atob(e), i = new Uint8Array(t.length), n = 0; n < i.length; n++) i[n] = t.charCodeAt(n);
                return i
            },
            bytesToEncodedString: function(e) {
                return btoa(String.fromCharCode.apply(null, e))
            },
            stringToBytes: function(e) {
                for (var t = new ArrayBuffer(2 * e.length), i = new Uint16Array(t), n = 0; n < e.length; n++) i[n] = e.charCodeAt(n);
                return new Uint8Array(i)
            },
            bytesToString: function(e) {
                return String.fromCharCode.apply(null, new Uint16Array(e))
            },
            unsignedByteToInt: function(e) {
                return 255 & e
            },
            unsignedByBytesToInt: function(e, t) {
                return unsignedByByteToInt(e) + (unsignedByByteToInt(t) << 8)
            },
            unsignedToSigned: function(e, t) {
                return 0 != (e & 1 << t - 1) && (e = -1 * ((1 << t - 1) - (e & (1 << t - 1) - 1))), e
            },
            bytesToFloat: function(e, i) {
                var n = t.unsignedToSigned(t.unsignedByteToInt(e) + ((15 & t.unsignedByteToInt(i)) << 8), 12),
                    o = t.unsignedToSigned(t.unsignedByteToInt(i) >> 4, 4);
                return n * Math.pow(10, o)
            },
            encodedStringToArr: function(e) {
                return t.advertisementToArr(e)
            },
            advertisementToArr: function(e) {
                var i = t.encodedStringToBytes(e);
                return Array.prototype.slice.call(i)
            },
            parseAdv: function(e) {
                for (var i, n = t.advertisementToArr(e), o = (n.length, {}), s = 255, a = 0; a < n.length && 0 != n[a];) i = n[a], o[i] = n.splice(a, i + 1), o[i].splice(0, 1), o[i][0] == s && (t.parseSymbol(o, o[i]), t.parseMac(o, o[i]));
                console.log("p:", o)
            },
            parseMac: function(e, t) {
                function i(e) {
                    return 1 == e.length ? "0" + e : e
                }
                for (var n = [].concat(t).splice(0, 6), o = [], s = n.length, a = 0; s > a; a++) o.push(i(n[a].toString(16)));
                e.mac = o.join(":").toUpperCase()
            },
            parseSymbol: function(e, t) {
                var i = [].concat(t);
                i = i.splice(6, i.length), e.model = i[0] + "" + i[1], e.protocolVersion = i[2], e.companyId = {
                    bytes: [i[3], i[4]]
                }, e.companyId.isXioazhi = 1 == e.companyId.bytes[0] && 168 == e.companyId.bytes[1], e.companyId.isXiaozhi = e.companyId.isXioazhi
            },
            _fastParseAdv: function(e) {
                var i = "string" == typeof e ? t.advertisementToArr(e) : e,
                    n = i.reverse(),
                    o = {};
                return n = n.splice(0, 11), t.parseSymbol(o, n), t.parseMac(o, n), console.log("fastParseAdv:", o), o
            },
            fastParseAdv: function(e) {
                return t._fastParseAdv(e)
            },
            ad_fastParseAdv: function(e) {
                function i(e) {
                    for (var t, i, n = [].concat(e), o = 255, s = 0; s < n.length; s++) if (t = n[s], i = n.splice(s + 1, t), i[0] == o) return i
                }
                console.log("str:", e);
                var n = t.advertisementToArr(e),
                    o = i(n);
                return o ? t._fastParseAdv(o) : {
                    companyId: {}
                }
            },
            hexToBase64: function(e) {
                return btoa(String.fromCharCode.apply(null, e.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")))
            }
        };
    return e && (t.fastParseAdv = t.ad_fastParseAdv), DA.ble = DA.ble ? DA.ble : {}, DA.ble.tool = t, t
}), define("_sdk_topbar", ["_sdk_api"], function(e) {
    document.addEventListener("AlinkComponentNavigationBar.buttonClicked", function(e) {
        t.triggerBtnClick(e.param)
    }, !1);
    var t = {
        setNavbar: function(e, t, i) {
            this._cfg = e, i = i ||
                function() {};
            var n = this;
            this._showNav(function(e) {
                n._setTitle(function(e) {
                    n._setIconfont(e, function(e) {
                        n._onDone(t, e)
                    }, i)
                }, i)
            }, i)
        },
        setTitle: function(t, i, n) {
            e.wv.call("AlinkComponentNavigationBar", "setTitle", {
                title: t
            }, i, n)
        },
        removeRightBtnByName: function(t, i, n) {
            if (this._cfg && this._cfg.rightButton) {
                for (var o = [], s = 0; s < this._cfg.rightButton.length; s++) this._cfg.rightButton[s].name == t && o.push(s);
                for (var s = 0; s < o.length; s++) this._cfg.rightButton.splice(o[s], 1)
            }
            e.wv.call("AlinkComponentNavigationBar", "removeButton", {
                name: t
            }, i, n)
        },
        hideNavbar: function(t, i) {
            e.wv.call("AlinkComponentNavigationBar", "hide", {}, t, i)
        },
        triggerBtnClick: function(e) {
            for (var t, i = this._cfg.rightButton || [], n = 0; n < i.length; n++) t = i[n], t.name == e.name && t.handler()
        },
        _onDone: function(e, t) {
            t && t.success && e && e()
        },
        _showNav: function(t, i) {
            e.wv.call("AlinkComponentNavigationBar", "show", {
                type: this._cfg.type
            }, t, i)
        },
        _setTitle: function(t, i) {
            e.wv.call("AlinkComponentNavigationBar", "setTitle", {
                title: this._cfg.title
            }, function(e) {
                t({
                    param: e.param,
                    success: !0
                })
            }, t)
        },
        _setIconfont: function(e, t, i) {
            var n = this;
            if (e.success) {
                var o = this._cfg.rightButton;
                if (console.log(o, o.length), o && o.length) for (var s = 0; s < o.length; s++) {
                    var a = o[s].iconfont;
                    n.addBtn(a, o[s].name, function(e) {
                        t({
                            param: e.param,
                            success: !0
                        })
                    }, t)
                } else console.log(defer), defer.resolve(e)
            } else i()
        },
        addBtn: function(t, i, n, o) {
            e.wv.call("AlinkComponentNavigationBar", "addButton", {
                iconFont: t,
                name: i
            }, n, o)
        },
        addTextBtn: function(t, i, n) {
            e.wv.call("AlinkComponentNavigationBar", "addButton", t, i, n), this._addBtn(t)
        },
        addIconfontBtn: function(t, i, n) {
            e.wv.call("AlinkComponentNavigationBar", "addButton", t, i, n), this._addBtn(t)
        },
        _addBtn: function(e) {
            this._cfg && this._cfg.rightButton && this._cfg.rightButton.push ? this._cfg.rightButton.push(e) : (this._cfg = {
                rightButton: []
            }, this._addBtn(e))
        },
        setAlpha: function(t, i, n) {
            clearTimeout(this.navAlphaTimer), this.navAlphaTimer = setTimeout(function() {
                e.wv.call("AlinkComponentNavigationBar", "setSwitchProgress", {
                    progress: t + ""
                }, i, n)
            }, 250)
        },
        support: function(e) {
            DA.getAppInfo({}, function(t) {
                e && e(t.appVersion.substr(0, 1) >= 3)
            }, function() {})
        }
    };
    return DA.nativeCmp = DA.nativeCmp || {}, DA.nativeCmp.topbar = t, t
}), define("_sdk_native_component", ["_sdk_api"], function(e) {
    var t = {
        makeTimer: function(e, t, i) {
            var i = function() {
                DA.confirm({
                    msg: "\u9884\u7ea6\u5b9a\u65f6\u529f\u80fd\u5168\u65b0\u4e0a\u7ebf\uff0c\u8f7b\u51fb\u201c\u786e\u8ba4\u66f4\u65b0\u201d\u4ee5\u66f4\u65b0\u5c0f\u667a\u65b0\u7248\u672c\u5662",
                    ok: "\u786e\u8ba4\u66f4\u65b0",
                    cancel: "\u53d6\u6d88"
                }, function() {
                    DA.pushWebView({
                        url: "https://alimarket.taobao.com/markets/alink/download",
                        isUseToolBar: "1"
                    })
                })
            };
            window.WindVane.call("AlinkComponentTimer", "showCaseList", e, t, i)
        }
    };
    DA = window.DA || {}, DA.nativeCmp = DA.nativeCmp || {}, DA.nativeCmp.makeTimer = t.makeTimer;
    var i = ["showDelayList"];
    return i.forEach(function(e) {
        DA.nativeCmp[e] = function(t, i, n) {
            window.WindVane.call("AlinkComponentTimer", e, t || {}, i, n)
        }
    }), t
}), define("_sdk_webview_data", ["_sdk_alink"], function(e) {
    var t = navigator.userAgent.match(/(Android)/i),
        i = {
            init: function() {
                var e = t ? "webviewvisibilitychange" : "visibilitychange";
                document.addEventListener(e, i.onVisibilitychange), t && document.querySelector("html").classList.add("android")
            },
            sendDataToWebView: function(e, t) {
                var i = document.createElement("a");
                i.href = e, e = i.origin + i.pathname, DA.nativeStorage.setStorage({
                    itemKey: e,
                    itemValue: JSON.stringify(t)
                })
            },
            onWebViewData: function(e) {
                var t = i.onWebViewData.listeners = i.onWebViewData.listeners ? i.onWebViewData.listeners : [];
                t.push(e)
            },
            onVisibilitychange: function(n) {
                var o = location.href,
                    s = document.createElement("a");
                s.href = o, o = s.origin + s.pathname, DA.nativeStorage.getStorage({
                    itemKey: o
                }, function(e) {
                    if (e = e && e[o] ? JSON.parse(e[o]) : null, console.log("visibilitychange:url", o, e), 0 == document.hidden && i.onWebViewData.listeners && i.onWebViewData.listeners.length && e) {
                        for (var t = 0; t < i.onWebViewData.listeners.length; t++) i.onWebViewData.listeners[t](e);
                        DA.nativeStorage.removeStorage({
                            itemKey: o
                        })
                    }
                }), e.sendApp("pageActiveChange", document.hidden), !t && DA.model && DA.nativeStorage.getStorage({
                    itemKey: "h5RQ:" + DA.model
                }, function(e) {
                    if (e["h5RQ:" + DA.model]) {
                        var t = e["h5RQ:" + DA.model];
                        try {
                            t = JSON.parse(t), document.hidden || t.length > 1 && (t.pop(), DA.nativeStorage.setStorage({
                                itemKey: "h5RQ:" + DA.model,
                                itemValue: JSON.stringify(t)
                            }))
                        } catch (i) {}
                    }
                })
            }
        };
    return i.init(), DA.sendDataToWebView = i.sendDataToWebView, DA.onWebViewData = i.onWebViewData, i
}), function(e, t, i) {
    function n(e, t) {
        return this instanceof n ? this.init(e, t) : new n(e, t)
    }
    function o(e, t) {
        return e.changedTouches ? e.changedTouches[0][t] : e[t]
    }
    function s(e) {
        return c(e, function(e) {
            return h.style[e] !== i
        })
    }
    function a(e, t, n) {
        var o = p[t];
        o ? e[o] = n : e[t] !== i ? (p[t] = t, e[t] = n) : c(f, function(o) {
            var s = l(o) + l(t);
            return e[s] !== i ? (p[t] = s, e[s] = n, !0) : void 0
        })
    }
    function r(e) {
        if (h.style[e] !== i) return e;
        var t;
        return c(f, function(n) {
            var o = l(n) + l(e);
            return h.style[o] !== i ? (t = "-" + n + "-" + e, !0) : void 0
        }), t
    }
    function l(e) {
        return e.charAt(0).toUpperCase() + e.substr(1)
    }
    function c(e, t) {
        for (var i = 0, n = e.length; n > i; i++) if (t(e[i], i)) return !0;
        return !1
    }
    function u(e, t, i, n) {
        var o = Math.abs(e - i),
            s = Math.abs(t - n),
            a = Math.sqrt(Math.pow(o, 2) + Math.pow(s, 2));
        return {
            x: o,
            y: s,
            z: a
        }
    }
    function d(e) {
        var t = e.y / e.z,
            i = Math.acos(t);
        return 180 / (Math.PI / i)
    }
    var h = t.createElement("div"),
        f = ["webkit", "moz", "o", "ms"],
        p = {},
        m = n.support = {},
        v = !1,
        g = 5,
        y = 55;
    m.transform3d = s(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]), m.transform = s(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"]), m.transition = s(["transitionProperty", "WebkitTransitionProperty", "MozTransitionProperty", "OTransitionProperty", "msTransitionProperty"]), m.addEventListener = "addEventListener" in e, m.mspointer = e.navigator.msPointerEnabled, m.cssAnimation = (m.transform3d || m.transform) && m.transition;
    var b = ["touch", "mouse"],
        w = {
            start: {
                touch: "touchstart",
                mouse: "mousedown"
            },
            move: {
                touch: "touchmove",
                mouse: "mousemove"
            },
            end: {
                touch: "touchend",
                mouse: "mouseup"
            }
        };
    m.addEventListener && (t.addEventListener("gesturestart", function() {
        v = !0
    }), t.addEventListener("gestureend", function() {
        v = !1
    })), n.prototype.init = function(e, n) {
        var o = this;
        if (o.element = e, "string" == typeof e && (o.element = t.querySelector(e)), !o.element) throw new Error("element not found");
        return m.mspointer && (o.element.style.msTouchAction = "pan-y"), n = n || {}, o.distance = n.distance, o.maxPoint = n.maxPoint, o.disableTouch = n.disableTouch === i ? !1 : n.disableTouch, o.disable3d = n.disable3d === i ? !1 : n.disable3d, o.transitionDuration = n.transitionDuration === i ? "350ms" : n.transitionDuration + "ms", o.currentPoint = 0, o.currentX = 0, o.animation = !1, o.use3d = m.transform3d, o.disable3d === !0 && (o.use3d = !1), m.cssAnimation ? o._setStyle({
            transitionProperty: r("transform"),
            transitionTimingFunction: "cubic-bezier(0,0,0.25,1)",
            transitionDuration: "0ms",
            transform: o._getTranslate(0)
        }) : o._setStyle({
            position: "relative",
            left: "0px"
        }), o.refresh(), b.forEach(function(e) {
            o.element.addEventListener(w.start[e], o, !1)
        }), o
    }, n.prototype.handleEvent = function(e) {
        var t = this;
        switch (e.type) {
            case w.start.touch:
                t._touchStart(e, "touch");
                break;
            case w.start.mouse:
                t._touchStart(e, "mouse");
                break;
            case w.move.touch:
                t._touchMove(e, "touch");
                break;
            case w.move.mouse:
                t._touchMove(e, "mouse");
                break;
            case w.end.touch:
                t._touchEnd(e, "touch");
                break;
            case w.end.mouse:
                t._touchEnd(e, "mouse");
                break;
            case "click":
                t._click(e)
        }
    }, n.prototype.refresh = function() {
        var e = this;
        e._maxPoint = e.maxPoint === i ?
            function() {
                for (var t, i = e.element.childNodes, n = -1, o = 0, s = i.length; s > o; o++) t = i[o], 1 === t.nodeType && n++;
                return n
            }() : e.maxPoint, e.distance === i ? e._maxPoint < 0 ? e._distance = 0 : e._distance = e.element.scrollWidth / (e._maxPoint + 1) : e._distance = e.distance, e._maxX = -e._distance * e._maxPoint, e.moveToPoint()
    }, n.prototype.hasNext = function() {
        var e = this;
        return e.currentPoint < e._maxPoint
    }, n.prototype.hasPrev = function() {
        var e = this;
        return e.currentPoint > 0
    }, n.prototype.toNext = function(e) {
        var t = this;
        t.hasNext() && t.moveToPoint(t.currentPoint + 1, e)
    }, n.prototype.toPrev = function(e) {
        var t = this;
        t.hasPrev() && t.moveToPoint(t.currentPoint - 1, e)
    }, n.prototype.moveToPoint = function(e, t) {
        var n = this;
        t = t === i ? n.transitionDuration : t + "ms";
        var o = n.currentPoint;
        e === i && (e = n.currentPoint), 0 > e ? n.currentPoint = 0 : e > n._maxPoint ? n.currentPoint = n._maxPoint : n.currentPoint = parseInt(e, 10), m.cssAnimation ? n._setStyle({
            transitionDuration: t
        }) : n.animation = !0, n._setX(-n.currentPoint * n._distance, t), o !== n.currentPoint && (n._triggerEvent("fsmoveend", !0, !1), n._triggerEvent("fspointmove", !0, !1))
    }, n.prototype._setX = function(e, t) {
        var i = this;
        i.currentX = e, m.cssAnimation ? i.element.style[p.transform] = i._getTranslate(e) : i.animation ? i._animate(e, t || i.transitionDuration) : i.element.style.left = e + "px"
    }, n.prototype._touchStart = function(e, i) {
        var n = this;
        if (!(n.disableTouch || n.scrolling || v)) {
            n.element.addEventListener(w.move[i], n, !1), t.addEventListener(w.end[i], n, !1);
            var s = e.target.tagName;
            "mouse" === i && "SELECT" !== s && "INPUT" !== s && "TEXTAREA" !== s && "BUTTON" !== s && e.preventDefault(), m.cssAnimation ? n._setStyle({
                transitionDuration: "0ms"
            }) : n.animation = !1, n.scrolling = !0, n.moveReady = !1, n.startPageX = o(e, "pageX"), n.startPageY = o(e, "pageY"), n.basePageX = n.startPageX, n.directionX = 0, n.startTime = e.timeStamp, n._triggerEvent("fstouchstart", !0, !1)
        }
    }, n.prototype._touchMove = function(e, t) {
        var i = this;
        if (i.scrolling && !v) {
            var n, s, a = o(e, "pageX"),
                r = o(e, "pageY");
            if (i.moveReady) {
                e.preventDefault(), n = a - i.basePageX, s = i.currentX + n, (s >= 0 || s < i._maxX) && (s = Math.round(i.currentX + n / 3)), i.directionX = 0 === n ? i.directionX : n > 0 ? -1 : 1;
                var l = !i._triggerEvent("fstouchmove", !0, !0, {
                    delta: n,
                    direction: i.directionX
                });
                l ? i._touchAfter({
                    moved: !1,
                    originalPoint: i.currentPoint,
                    newPoint: i.currentPoint,
                    cancelled: !0
                }) : i._setX(s)
            } else {
                var c = u(i.startPageX, i.startPageY, a, r);
                c.z > g && (d(c) > y ? (e.preventDefault(), i.moveReady = !0, i.element.addEventListener("click", i, !0)) : i.scrolling = !1)
            }
            i.basePageX = a
        }
    }, n.prototype._touchEnd = function(e, i) {
        var n = this;
        if (n.element.removeEventListener(w.move[i], n, !1), t.removeEventListener(w.end[i], n, !1), n.scrolling) {
            var o = -n.currentX / n._distance;
            o = n.directionX > 0 ? Math.ceil(o) : n.directionX < 0 ? Math.floor(o) : Math.round(o), 0 > o ? o = 0 : o > n._maxPoint && (o = n._maxPoint), n._touchAfter({
                moved: o !== n.currentPoint,
                originalPoint: n.currentPoint,
                newPoint: o,
                cancelled: !1
            }), n.moveToPoint(o)
        }
    }, n.prototype._click = function(e) {
        e.stopPropagation(), e.preventDefault()
    }, n.prototype._touchAfter = function(e) {
        var t = this;
        t.scrolling = !1, t.moveReady = !1, setTimeout(function() {
            t.element.removeEventListener("click", t, !0)
        }, 200), t._triggerEvent("fstouchend", !0, !1, e)
    }, n.prototype._setStyle = function(e) {
        var t = this,
            i = t.element.style;
        for (var n in e) a(i, n, e[n])
    }, n.prototype._animate = function(e, t) {
        var i = this,
            n = i.element,
            o = +new Date,
            s = parseInt(n.style.left, 10),
            a = e,
            r = parseInt(t, 10),
            l = function(e, t) {
                return -(e /= t) * (e - 2)
            },
            c = setInterval(function() {
                var e, t, i = new Date - o;
                i > r ? (clearInterval(c), t = a) : (e = l(i, r), t = e * (a - s) + s), n.style.left = t + "px"
            }, 10)
    }, n.prototype.destroy = function() {
        var e = this;
        b.forEach(function(t) {
            e.element.removeEventListener(w.start[t], e, !1)
        })
    }, n.prototype._getTranslate = function(e) {
        var t = this;
        return t.use3d ? "translate3d(" + e + "px, 0, 0)" : "translate(" + e + "px, 0)"
    }, n.prototype._triggerEvent = function(e, i, n, o) {
        var s = this,
            a = t.createEvent("Event");
        if (a.initEvent(e, i, n), o) for (var r in o) o.hasOwnProperty(r) && (a[r] = o[r]);
        return s.element.dispatchEvent(a)
    }, "object" == typeof exports ? module.exports = n : "function" == typeof define && define.amd ? define("flipsnap", [], function() {
        return DA = e.DA ? DA : {}, DA.Flipsnap = n, n
    }) : e.Flipsnap = n
}(window, window.document), define("UIView", [], function() {
    var e = function() {
            var e = 3e3;
            return function(t) {
                return t + ++e
            }
        }(),
        t = {},
        i = function(e, i) {
            t[e] = i
        },
        n = function(e) {
            return t[e]
        };
    return DA.getUI = function(e) {
        return n(e)
    }, _.inherit({
        register: function(e, t) {
            i(e, t)
        },
        propertys: function() {
            this.domhook = $("body"), this.id = _.uniqueId("ui-view-"), this.template = "", this.uiStyle = null, this.shadowDom = null, this.shadowStyle = null, this.shadowRoot = null, this.openShadowDom = !1, this.domhook[0].createShadowRoot || (this.openShadowDom = !1), this.datamodel = {}, this.events = {}, this.eventArr = {}, this.status = "init", this.animateShowAction = null, this.animateHideAction = null
        },
        on: function(e, t, i) {
            this.eventArr[e] || (this.eventArr[e] = []), i ? this.eventArr[e].splice(0, 0, t) : this.eventArr[e].push(t)
        },
        off: function(e, t) {
            this.eventArr[e] && (t ? this.eventArr[e] = _.without(this.eventArr[e], t) : this.eventArr[e] = [])
        },
        trigger: function(e) {
            var t, i, n = Array.prototype.slice,
                o = n.call(arguments, 1),
                s = this.eventArr,
                a = [];
            if (s[e]) for (t = 0, i = s[e].length; i > t; t++) a[a.length] = s[e][t].apply(this, o);
            return a
        },
        bindEvents: function() {
            var e = this.events,
                t = this.$el;
            if (this.openShadowDom && (t = this.shadowRoot), !e && !(e = _.result(this, "events"))) return this;
            this.unBindEvents();
            var i, n, o, s, a, r = /^(\S+)\s*(.*)$/;
            for (i in e) n = e[i], _.isFunction(n) || (n = this[e[i]]), n && (o = i.match(r), s = o[1], a = o[2], n = _.bind(n, this), s += ".delegateUIEvents" + this.id, "" === a ? t.on(s, n) : t.on(s, a, n));
            return this
        },
        unBindEvents: function() {
            var e = this.$el;
            return this.openShadowDom && (e = this.shadowRoot), e.off(".delegateUIEvents" + this.id), this
        },
        createRoot: function(e) {
            if (this.domhook[0]) {
                this.$el = this.domhook, this.$el[0].id = this.id;
                var t = this.getInlineStyle();
                t = t || "", this.openShadowDom ? (this.shadowRoot = $(this.$el[0].createShadowRoot()), this.shadowDom = $('<div class="js_shadow_root">' + e + "</div>"), this.shadowStyle = $(t), this.shadowRoot.append(this.shadowStyle), this.shadowRoot.append(this.shadowDom)) : this.$el.html(t + e), this.autoshow || (this.$el[0].style.display = "none")
            }
        },
        getInlineStyle: function() {
            if (!_.isString(this.uiStyle)) return null;
            var e = this.uiStyle,
                t = this.id;
            return this.openShadowDom || (e = e.replace(/(\s*)([^\{\}]+)\{/g, function(e, i, n) {
                return i + n.replace(/([^,]+)/g, "#" + t + " $1") + "{"
            })), e = "<style >" + e + "</style>", this.formateStyle = e, e
        },
        render: function(e) {
            var t = this.getViewModel() || {},
                i = this.template;
            return this.template ? (t && (i = _.template(this.template)(t)), "function" == typeof e && e.call(this), i) : ""
        },
        refresh: function(e) {
            var t = "";
            this.resetPropery(), e ? this.create() : (t = this.render(), this.openShadowDom ? this.shadowDom.html(t) : this.$el.html(this.formateStyle + t)), this.initElement(), "hide" != this.status && this.show(), this.trigger("onRefresh")
        },
        _isAddEvent: function(e) {
            return "onCreate" == e || "onPreShow" == e || "onShow" == e || "onRefresh" == e || "onHide" == e ? !0 : !1
        },
        setOption: function(e) {
            for (var t in e)"datamodel" != t && "events" != t ? this._isAddEvent(t) ? this.on(t, e[t]) : this[t] = e[t] : _.extend(this[t], e[t])
        },
        initialize: function(e) {
            this.propertys(), this.setOption(e), this.resetPropery(), this.setTemplate(), this.addEvent(), this.create(), this.addSysEvents(), this.initElement()
        },
        setTemplate: function() {},
        addSysEvents: function() {
            "function" == typeof this.availableFn && (this.removeSysEvents(), this.$el.on("click.system" + this.id, $.proxy(function(e) {
                this.availableFn() || (e.preventDefault(), e.stopImmediatePropagation && e.stopImmediatePropagation())
            }, this)))
        },
        removeSysEvents: function() {
            this.$el.off(".system" + this.id)
        },
        $: function(e) {
            return this.openShadowDom ? this.shadowDom.find(e) : this.$el.find(e)
        },
        resetPropery: function() {},
        addEvent: function() {},
        create: function() {
            this.trigger("onPreCreate"), this.createRoot(this.render()), this.status = "create", this.trigger("onCreate")
        },
        initElement: function() {},
        show: function() {
            this.domhook[0] && this.$el[0] && (this.trigger("onPreShow"), "function" == typeof this.animateShowAction ? this.animateShowAction.call(this, this.$el) : this.$el.show(), this.status = "show", this.bindEvents(), this.trigger("onShow"))
        },
        hide: function() {
            this.$el && "show" === this.status && (this.trigger("onPreHide"), "function" == typeof this.animateHideAction ? this.animateHideAction.call(this, this.$el) : this.$el.hide(), this.status = "hide", this.unBindEvents(), this.removeSysEvents(), this.trigger("onHide"))
        },
        destroy: function() {
            this.status = "destroy", this.unBindEvents(), this.removeSysEvents(), this.$el.remove(), this.trigger("onDestroy"), delete this
        },
        getViewModel: function() {
            return this.datamodel
        },
        setzIndexTop: function(t, i) {
            t || (t = this.$el), (!i || i > 10) && (i = 0), i = 1e3 * i, t.css("z-index", e(i))
        }
    })
}), define("datetime-compatible", [], function() {
    function e(e, t) {
        for (var i = [], n = e; t > n; n++) i[n] = n + "";
        return i
    }
    function t(e, t) {
        if (0 == e) return e;
        var i = e + "",
            n = t - i.length;
        if (0 == n) return i;
        if (n >= 1) for (var o = 0; n > o; o++) i = "0" + i;
        return i
    }
    function i(e) {
        e = e || {}, this.key = e.tplParams.key, this.cfg = e, this.cfg.onChange = this.cfg.onChange ||
            function() {}, this.init(e), this.setMaxAndMin()
    }
    String.prototype.format = function() {
        var e, t = Array.prototype.slice.call(arguments),
            i = this;
        1 === t.length && "object" == typeof t[0] && (t = t[0]);
        for (var n = 0; e = /{(\d+|\w+)?}/gm.exec(i); n++) {
            var o = e[1];
            i = o ? i.replace(new RegExp("\\{" + o + "\\}", "gm"), t[o]) : i.replace("{}", t[n])
        }
        return i
    };
    var o = ['<div class="dtc-item">', '     <span class="sub">', '      <span class="handler">-</span>', "     </span>", '     <div class="time-item">', '      <span class="time-entry">{value}</span>', '      <span class="units">{unit}</span>', "     </div> ", '     <span class="plus">', '      <span class="handler">+</span>', "     </span>", "  </div>"].join(""),
        s = function(e) {
            var t = document.createElement("div");
            return t.innerHTML = e, t.firstChild ? t.firstChild : !1
        },
        a = {
            preset: "diy",
            data: [{
                key: "hour",
                resource: e(0, 13),
                value: 1,
                unit: "\u65f6"
            }, {
                key: "min",
                resource: e(0, 60),
                value: 12,
                unit: "\u5206"
            }, {
                key: "sec",
                resource: e(0, 60),
                value: 30,
                unit: "\u79d2"
            }]
        };
    i.prototype = {
        key: "",
        initBefore: function(e) {
            e.tplParams.value = t(e.tplParams.value, 2);
            var i = o.format(e.tplParams),
                n = s(i);
            this.el = n
        },
        render: function(e) {
            $(e || this.cfg.ct).append(this.el)
        },
        init: function(e) {
            this.initBefore(e), this.render();
            var t = $(this.el),
                i = (t.find(".sub .handler"), t.find(".plus .handler"), t.find(".time-entry"));
            this.timeEntry = i, t.on("click", ".sub .handler", this.onSubClick.bind(this)), t.on("click", ".plus .handler", this.onPlusClick.bind(this)), this._setValue(e.tplParams.value), this.setOffsetValue(), this.bindTapHold()
        },
        setOffsetValue: function() {
            var e = $(this.el).find(".handler");
            this.handlerOffset = {
                x: e.height(),
                y: e.width()
            }
        },
        bindTapHold: function() {
            var e = $(this.el);
            e.on("touchstart", this.touchstart.bind(this)), e.on("touchend", this.touchend.bind(this)), e.on("touchmove", this.touchmove.bind(this)), e.on("touchcancel", this.touchcancel.bind(this))
        },
        holdTap: function() {
            console.log("holdTap"), this.cancelHold !== !0
        },
        touchstart: function(e) {
            if (clearInterval(this.holdTimer), -1 != e.target.className.indexOf("handler")) {
                var t = e.changedTouches[0],
                    i = this;
                this.__holdOpt = {
                    el: e.target,
                    x: t.pageX,
                    y: t.pageY,
                    top: e.target.offsetTop,
                    left: e.target.offsetLeft,
                    isPlus: -1 != e.target.parentNode.className.indexOf("plus")
                }, this.cancelHold = !1, this.holdTimer = setInterval(function() {
                    i.cancelHold ? clearInterval(i.holdTimer) : i.holdTap()
                }, 1e3)
            }
        },
        touchmove: function(e) {
            var t = e.changedTouches[0],
                i = this.__holdOpt.top,
                n = this.__holdOpt.left;
            (i + this.handlerOffset.y < t.pageY || n + this.handlerOffset.x < t.pageX) && (this.cancelHold = !0, console.log("cancelHold"))
        },
        touchend: function(e) {
            this.cancelHold = !0
        },
        touchcancel: function() {
            this.cancelHold = !0
        },
        setMaxAndMin: function() {
            var e = this.cfg;
            this.cfg.max = e.tplParams.resource[e.tplParams.resource.length - 1], this.cfg.min = e.tplParams.resource[0]
        },
        onSubClick: function(e) {
            var t = this.timeEntry[0],
                i = this.cfg.min,
                n = Number(t.innerHTML),
                o = n;
            this.key;
            if (n || n >= 0) {
                n -= 1;
                var s = {
                    ov: o,
                    v: n
                };
                n >= i && o != n && n >= 0 && this._changeValue(s)
            }
        },
        onPlusClick: function(e) {
            var t = this.timeEntry[0],
                i = this.cfg.max,
                n = Number(t.innerHTML),
                o = n;
            this.key;
            if (n || n >= 0) {
                n += 1;
                var s = {
                    ov: o,
                    v: n
                };
                i >= n && o != n && i >= n && this._changeValue(s)
            }
        },
        _changeValue: function(e) {
            this._setValue(n), this.ov = e.ov, this.v = e.v, this.cfg.onChange(key, e), this.ov = this.v
        },
        updateData: function(e) {
            this.cfg.tplParams.resource = e, this.setMaxAndMin()
        },
        _setValue: function(e) {
            this.timeEntry[0].innerHTML = t(e, 2), this._value = parseInt(e)
        }
    };
    var r = function(e) {
        this.init(e)
    };
    return r.prototype = {
        init: function(e) {
            e = e || {}, e.ct = s('<div class="date-time-compatible"></div>'), this.cfg = e, this.components = [], this.cfg.onChange = this.cfg.onChange.bind(this);
            for (var t = _.extend(a, e), n = 0; n < t.data.length; n++) this[t.data[n].key] = new i({
                tplParams: t.data[n],
                ct: e.ct,
                onChange: this.onChange.bind(this)
            }), this.components.push(this[t.data[n].key])
        },
        onChange: function(e, t) {
            for (var i = {}, n = 0; n < this.components.length; n++) i[this.components[n].key] = this.components[n]._value;
            this.cfg.onChange && this.cfg.onChange(i)
        },
        render: function(e) {
            var t = $(e);
            t.html(""), t.append(this.cfg.ct)
        },
        setData: function(e) {
            for (var t in e) this[t] && this[t]._setValue(e[t])
        }
    }, r
}), define("datetime", ["underscore", "IScroll", "datetime-compatible"], function(e, t, i) {
    function n() {
        return P++
    }
    function o(t) {
        return t = t || {}, t = e.defaults(t, E), this.opts = t, "diy" == t.preset && t.demotion ? new i(t) : (this.opts.gap ? _.h = "\u5c0f\u65f6" : _.h = "\u65f6", this.guid = n(), this.loop = [], this.height = t.height || "200", this.caniuse(t.presets), this.disabled = !1, void r.call(this))
    }
    function s(e) {
        e = e.split(" ");
        var t = e[0].split("-"),
            i = e[1].split(":");
        return {
            y: parseInt(t[0]),
            m: parseInt(t[1]) - 1,
            rm: parseInt(t[1]),
            d: parseInt(t[2]),
            h: parseInt(i[0]),
            i: parseInt(i[1]),
            s: parseInt(i[2])
        }
    }
    function a(e) {
        x = new Date;
        try {
            e = e.split(":");
            var t = !! e[2],
                i = parseInt(e[0], 10),
                n = parseInt(e[1], 10),
                o = 0;
            return t && (o = parseInt(e[2], 10), o = o >= 0 && 60 > o ? o : sec(x)), i = i >= 0 && 24 > i ? i : hour(x), n = n >= 0 && 60 > n ? n : minu(x), {
                h: i,
                i: n,
                s: o,
                hasSecond: t
            }
        } catch (s) {
            return {
                h: I._h(x),
                i: I._i(x),
                s: I._s(x),
                hasSecond: !1
            }
        }
    }
    function r() {
        var e = this,
            t = e.opts;
        if (!e.isSupport) switch (t.preset) {
            case "date":
                c.call(e, t);
                break;
            case "time":
                u.call(e, t);
                break;
            case "week":
                d.call(e, t);
                break;
            case "diy":
                h.call(e, t)
        }
    }
    function l(e, t) {
        return e.updateData = function(i) {
            i.toString() != e.map.toString() && (e.map = i, "m" == e.key ? V(t, e, e.rv, e.key, e.ul) : V(t, e, e.v, e.key, e.ul), e.xscroll.refresh())
        }, e
    }
    function c(t) {
        var i = this,
            n = t.minDate.getFullYear() || n,
            o = t.maxDate.getFullYear() || o;
        try {
            var a = s(t.date)
        } catch (r) {
            var c = e.isDate(t.date) ? t.date : x,
                a = {
                    y: I._y(c),
                    m: I._m(c),
                    rm: I._rm(c) + 1,
                    d: I._d(c),
                    h: I._h(c),
                    i: I._i(c),
                    s: I._s(c)
                }
        }
        i.loop = ["y", "m", "d"], i.monthDay = N(a.y, a.m), i.y = new l({
            top: g(a.y - n),
            v: a.y,
            ov: a.y,
            st: n,
            et: o,
            lis: [],
            map: f(n, o)
        }), i.m = new l({
            top: g(a.rm - 1),
            v: a.m,
            ov: a.m,
            rv: a.rm,
            orv: a.rm,
            st: 1,
            et: 12,
            lis: [],
            map: f(1, 12)
        }), i.d = new l({
            top: g(a.d - 1),
            v: a.d,
            ov: a.d,
            st: 1,
            et: 31,
            lis: [],
            map: f(1, 31)
        }), i.html = p.call(i, "date", i.loop)
    }
    function u(e) {
        var t = this,
            i = a(e.date);
        i.hasSecond ? t.loop = ["h", "i", "s"] : t.loop = ["h", "i"], t.loop.forEach(function(e) {
            if ("h" == e) var n = f(0, 23);
            else if ("i" == e || "s" == e) var n = f(0, 59);
            t[e] = new l({
                top: g(i[e] - 0),
                v: i[e],
                index: y(n, i[e]),
                lis: [],
                map: n
            })
        }), t.html = p.call(t, "time", t.loop)
    }
    function d(e) {
        var t = this;
        a(e.date);
        t.w = new l({
            v: {
                0: !1,
                1: !1,
                2: !1,
                3: !1,
                4: !1,
                5: !1,
                6: !1
            },
            ul: "",
            lis: [],
            map: f(0, 6)
        }), t.html = p.call(t, "week"), b(t.w.ul).on("click", function(e) {
            e.stopImmediatePropagation();
            var i = b(e.target);
            if ("li" == i[0].tagName.toLowerCase()) {
                var n = i.attr("data-index"),
                    o = t.w.lis[n];
                o.toggleClass(A), t.w.v[n] = !t.w.v[n]
            }
        })
    }
    function h(e) {
        var t = this;
        if (e.data.length) {
            var i = e.data;
            t.loop.length = 0, i.forEach(function(e) {
                t[e.key] = new l({
                    key: e.key,
                    v: e.value,
                    index: 0,
                    oIndex: 0,
                    et: e.resource.length - 1,
                    ul: "",
                    lis: [],
                    map: e.resource
                }, t);
                var i = y(e.resource, e.value);
                t[e.key].index = i, t[e.key].top = g(i), _[e.key] = e.unit, t.loop.push(e.key)
            }), t.html = p.call(t, "diy", t.loop)
        }
    }
    function f(e, t) {
        for (var i = [], n = e; t >= n; n++) i.push(n);
        return i
    }
    function p(e, t) {
        var i = this,
            n = C('<div class="ui-datetime-wrap" style="height: ' + i.height + 'px;"></div>');
        i.adw = n;
        var o = (i.height / 40 - 1) / 2 * 40,
            s = C('<div class="ui-datetime-line" style="top: ' + o + 'px;"></div>');
        n.appendChild(s);
        var a = function() {
                var e = C('<ul class="ui-datetime-week"></ul>');
                return T.forEach(function(t, n) {
                    var o = C('<li data-index="' + n + '">' + t + "</li>");
                    e.appendChild(o), i.w.lis.push(b(o))
                }), i.w.ul = e, e
            },
            r = function(e, t, n) {
                var o = C('<div id="ui-datetime-' + i.guid + "-ad-" + n + '" class="ui-datetime-item" style="height:' + i.height + 'px"></div>'),
                    s = e.map,
                    a = s.length,
                    r = 40 * a + "px;",
                    l = C('<ul style="' + r + '" class="xs-content"></ul>');
                return V(i, e, t, n, l), e.ul = l, o.appendChild(l), o
            },
            l = function() {
                return t.forEach(function(e) {
                    var t = i[e];
                    if ("m" == e) var o = r(t, t.rv, e);
                    else var o = r(t, t.v, e);
                    n.appendChild(o)
                }), n
            };
        return "week" == e ? a() : l()
    }
    function m(e) {
        var t = this;
        t.loop.forEach(function(e) {
            if (t[e]) {
                var i = 0,
                    n = new IScroll("#ui-datetime-" + t.guid + "-ad-" + e, {
                        bounceEasing: "ease",
                        bounceTime: 1200
                    });
                n.scrollToIng = !0, n.scrollTo(0, t[e].top, 0, IScroll.utils.ease.circular, k, "correct");
                n.on("scrollEnd", function(n) {
                    var o = this.y;
                    i = Math.round(o / 40), t[e].top != o && (t[e].top = 40 * i, t.changeValue(e), t.syncStatus(), t.opts.onChange && setTimeout(function() {
                        var e = t.getTime(),
                            i = {};
                        t.loop.forEach(function(e) {
                            i[e] = t[e]
                        }), t.opts.onChange.call(i, e)
                    }, 0))
                }), t[e].xscroll = n
            }
        })
    }
    function v(e) {
        return Math.abs(e) / 40
    }
    function g(e) {
        return 0 - 40 * e
    }
    function y(e, t) {
        var i = 0,
            n = t.toString();
        return e.forEach(function(e, t) {
            n == e.toString() && (i = t)
        }), i
    }
    var b = $,
        w = document,
        k = function() {},
        x = new Date,
        S = x.getFullYear() - 10,
        D = x.getFullYear() + 10,
        E = {
            preset: "date",
            replace: !1,
            minDate: new Date(S, 1, 1, 0, 0),
            maxDate: new Date(D, 12, 31, 23, 59),
            date: x,
            stepMinute: 5
        },
        A = "selected",
        _ = {
            y: "\u5e74",
            m: "\u6708",
            d: "\u65e5",
            h: "\u65f6",
            i: "\u5206",
            s: "\u79d2"
        },
        T = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
        C = function(e) {
            var t = document.createElement("div");
            return t.innerHTML = e, t.firstChild ? t.firstChild : !1
        },
        P = 0,
        I = {
            _y: function(e) {
                return e.getFullYear()
            },
            _m: function(e) {
                return e.getMonth()
            },
            _rm: function(e) {
                return e.getMonth() + 1
            },
            _d: function(e) {
                return e.getDate()
            },
            _h: function(e) {
                return e.getHours()
            },
            _i: function(e) {
                return e.getMinutes()
            },
            _s: function(e) {
                return e.getSeconds()
            }
        },
        N = function(e, t) {
            return 32 - new Date(e, t, 32).getDate()
        },
        M = ["date", "datetime", "datetime-local", "month", "time"],
        V = function(e, t, i, n, o) {
            var s = t.map,
                a = y(t.map, i);
            len = s.length, start = 0, end = len - 1;
            var r = 40 * len + "px;";
            o.style.height = r, o.innerHTML = "";
            for (var l = "", c = _[n], u = 0; 2 > u; u++) o.appendChild(C("<li></li>"));
            e[n].lis.length = 0;
            for (var u = 0; u < len; u++) {
                l = a === u ? '<li class="selected">' + s[u] + " " + c + "</li>" : "<li>" + s[u] + " " + c + "</li>";
                var d = C(l);
                e[n].lis.push(d), o.appendChild(d)
            }
            return e[n].lihook = C("<li></li>"), o.appendChild(e[n].lihook), o.appendChild(C("<li></li>")), o
        };
    return o.prototype.caniuse = function() {
        var t = this,
            i = t.opts,
            n = w.createElement("input");
        return n.type = i.preset, t.inputElem = n, e.contains(M, i.preset) ? (n.setAttribute("type", i.preset), t.isSupport = !1) : t.isSupport = !1, t.isSupport
    }, o.prototype.setData = function(e) {
        var t = this;
        e || (e = t._syncTime()), t.loop.forEach(function(i) {
            if (t[i] && void 0 !== e[i]) {
                var n = t[i];
                n.ov = t[i].v, n.v = e[i], n.index = y(t[i].map, n.v), n.oIndex = y(t[i].map, n.ov), n.top = g(n.index)
            }
        }), t.syncStatus(), t.syncScroll()
    }, o.prototype.setTime = function(t) {
        var i = this;
        if ("diy" != i.opts.preset) {
            var n = 1;
            if (t) {
                if (e.isDate(t)) n = 2;
                else if ("string" == typeof t) if (n = 3, "date" == i.opts.preset) var o = s(t);
                else var o = a(t)
            } else {
                var r = i._syncTime();
                n = 1
            }
            i.loop.forEach(function(e) {
                if (i[e]) {
                    var s = i[e];
                    return s.ov = i[e].v, "m" === e && (s.orv = i[e].rv), 1 === n ? (s.v = r[e], void("m" === e ? (s.rv = r.rm, s.index = y(s.map, s.rv), s.top = g(s.index)) : (s.index = y(s.map, s.v), s.top = g(s.index)))) : 2 === n ? (s.v = I["_" + e](t), "m" == e ? (s.rv = I._rm(t), s.index = y(s.map, s.rv), void(s.top = g(s.index))) : (s.index = y(s.map, s.v), void(s.top = g(s.index)))) : 3 === n ? (s.v = o[e], void("m" == e ? (s.rv = o.rm, s.index = y(s.map, s.rv), s.top = g(s.index)) : (s.index = y(s.map, s.v), s.top = g(s.index)))) : void 0
                }
            }), i.syncStatus(), i.syncScroll()
        }
    }, o.prototype.getTime = function() {
        var e = this,
            t = {};
        return e.loop.forEach(function(i) {
            e[i] && (t[i] = e[i].v, "m" === i && (t.rm = e[i].rv))
        }), t
    }, o.prototype.getWeek = function() {
        var e = this.w.v,
            t = [];
        for (var i in e) e[i] && t.push(parseInt(i, 10) + 1);
        return t
    }, o.prototype.setWeek = function(e) {
        for (var t = this, i = t.w.v, n = t.w.lis, o = e.length, s = {}, a = 0; o > a; a++) s[e[a] - 1] = !0;
        for (var r = 0; 7 > r; r++) void 0 === s[r] ? (i[r] = !1, n[r].removeClass(A)) : (i[r] = !0, n[r].addClass(A))
    }, o.prototype._syncTime = function() {
        var e = this,
            t = {};
        return e.loop.forEach(function(i) {
            if (e[i]) {
                var n = e[i].top,
                    o = e[i].map[v(n)];
                t[i] = o, "m" === i && (t.rm = y(e[i].map, o), t.m = t.rm - 1)
            }
        }), t
    }, o.prototype.correctDayHTML = function(e, t) {
        var i = this;
        Math.abs(e - t);
        if (i.m) {
            if (t > e) for (var n = e; t > n; n++) b(i.d.lis[n]).insertBefore(i.d.lihook);
            else if (e > t) for (var n = e; n > t; n--) i.d.lis[n - 1].remove();
            i.monthDay = t
        }
    }, o.prototype.changeValue = function(e) {
        var t = this;
        if (!t.m && !t.h) return void t.setData();
        if (t.setTime(), "d" != e && t.m) {
            var i = N(t.y.v, t.m.rv - 1);
            t.monthDay !== i && (t.correctDayHTML(t.monthDay, i), t.d.xscroll.refresh())
        }
    }, o.prototype.syncScroll = function() {
        var e = this,
            t = 0;
        if (e.loop.forEach(function(i) {
                if (e[i]) {
                    var n = e[i];
                    if ("m" === i) var o = g(y(n.map, n.rv));
                    else var o = g(y(n.map, n.v));
                    "d" === i && (t = o), n.xscroll.scrollToIng = !0, n.xscroll.scrollTo(0, o, 300, IScroll.utils.ease.circular, k, "correct")
                }
            }), e.m) {
            var i = N(e.y.v, e.m.rv - 1),
                n = e.d;
            e.monthDay !== i ? (e.correctDayHTML(e.monthDay, i), n.xscroll.refresh(), n.scrollToIng = !0, n.xscroll.scrollTo(0, t, 300, IScroll.utils.ease.circular, k, "correct")) : (n.scrollToIng = !0, n.xscroll.scrollTo(0, t, 300, IScroll.utils.ease.circular, k, "correct"))
        }
    }, o.prototype.syncStatus = function() {
        var e = this;
        e.loop.forEach(function(t) {
            if (e[t]) {
                var i = e[t];
                if ("m" === t) var n = y(i.map, i.orv),
                    o = y(i.map, i.rv);
                else var n = y(i.map, i.ov),
                    o = y(i.map, i.v);
                n != o && (i.lis[n].className = "", i.lis[o].className = "selected")
            }
        })
    }, o.prototype.setDisabled = function() {
        var e = this;
        e.loop.forEach(function(t) {
            e[t].xscroll.disable()
        })
    }, o.prototype.setEnabled = function() {
        var e = this;
        e.loop.forEach(function(t) {
            e[t].xscroll.enable()
        })
    }, o.prototype.render = function(e) {
        var t = this;
        t.isSupport ? e.append(inputElem) : (e.html(""), e.append(t.html), t.correctDayHTML(31, t.monthDay), m.call(t, e))
    }, DA.Datetime = o, o
}), define("text!components/mode/mode.text.html", [], function() {
    return '<ul class="ui-mode" data-key="<%=key%>">\n    <%for(var i = 0, len = map.length; i < len; i++) { %>\n    <li data-value="<%=map[i].value%>" data-index="<%=i%>">\n        <i class="symbol"><%=map[i].text%></i>\n    </li>\n    <% } %>\n</ul>'
}), define("text!components/mode/mode.icon.html", [], function() {
    return '<ul class="ui-mode" data-key="<%=key%>">\n    <%for(var i = 0, len = map.length; i < len; i++) { %>\n    <li data-value="<%=map[i].value%>" data-index="<%=i%>">\n        <i class="iconfont symbol"><%=map[i].icon%></i>\n        <em class="desc"><%=map[i].text%></em>\n    </li>\n    <% } %>\n</ul>'
}), define("mode", ["UIView", "text!./components/mode/mode.text.html", "text!./components/mode/mode.icon.html"], function(e, t, i) {
    var n = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.datamodel = {
                currentValue: null
            }, this.needRootWrapper = !1, this.events = {
                "click li": "clickAction"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            "text" == this.tpl ? this.template = t : _.isFunction(this.tpl) ? this.template = this.tpl() : "icon" == this.tpl ? this.template = i : this.template = this.tpl.toString()
        },
        initElement: function() {
            this.el = this.$(".ui-mode"), this.show(), this.updateValue(this.datamodel.value), this.register(this.uiname, this)
        },
        onItemClick: function(e, t, i) {},
        setDeviceStatus: function(e, t) {
            e = e || DA.uuid, t || (t = {}, t[this.datamodel.key] = {
                value: this.datamodel.value
            }), DA.setDeviceStatus(e, t)
        },
        getValue: function() {
            return this.datamodel.value
        },
        updateValue: function(e) {
            this.$(".ui-mode li").removeClass("ui-mode-on"), this.$('.ui-mode li[data-value="' + e + '"]').addClass("ui-mode-on"), this.datamodel.value = e
        },
        clickAction: function(e) {
            var t = $(e.currentTarget),
                i = t.attr("data-index"),
                n = t.attr("data-value");
            if (this.datamodel.value === n) {
                if (!this.force_send) return
            } else {
                if ("function" == typeof this.onClickBefore && !this.onClickBefore()) return;
                this.$(".ui-mode li").removeClass("ui-mode-on"), t.addClass("ui-mode-on"), this.datamodel.value = n
            }
            var o = this.datamodel.map[i];
            "function" == typeof this.onItemClick && this.onItemClick.call(this, o, i, e)
        }
    });
    return DA.Mode = n, n
}), define("text!components/switch/switch.text.html", [], function() {
    return '<div class="ui-switch ui-switch-off" data-key="<%=key%>">\n    <a href="#" class="symbol"><%=text%></a>\n</div>'
}), define("text!components/switch/switch.icon.html", [], function() {
    return '<div class="ui-switch ui-switch-off" data-key="<%=key%>">\n    <i class="iconfont-bg"></i>\n    <i class="iconfont symbol"><%=icon%></i>\n    <em><%=text%></em>\n</div>'
}), define("switch", ["UIView", "text!./components/switch/switch.text.html", "text!./components/switch/switch.icon.html"], function(e, t, i, n, o) {
    var s = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.datamodel = {
                checkedFlag: !1
            }, this.needRootWrapper = !1, this.events = {
                click: "clickAction"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            "text" == this.tpl ? this.template = t : _.isFunction(this.tpl) ? this.template = this.tpl() : "icon" == this.tpl ? this.template = i : this.template = this.tpl.toString()
        },
        initElement: function() {
            this.el = this.$(".ui-switch"), this.show(), this.updateValue(this.datamodel.value), this.register(this.uiname, this)
        },
        changed: function(e) {},
        checked: function() {
            ("function" != typeof this.checkAvailabe || this.checkAvailabe()) && (this.getStatus() || ("function" != typeof this.onClickBefore || this.onClickBefore()) && (this.el.addClass("ui-switch-on"), this.el.removeClass("ui-switch-off"), this.datamodel.checkedFlag = !0, this._triggerChanged()))
        },
        unChecked: function() {
            ("function" != typeof this.checkAvailabe || this.checkAvailabe()) && this.getStatus() && ("function" != typeof this.onClickBefore || this.onClickBefore()) && (this.el.removeClass("ui-switch-on"), this.el.addClass("ui-switch-off"), this.datamodel.checkedFlag = !1, this._triggerChanged())
        },
        setDeviceStatus: function(e, t) {
            if (e = e || DA.uuid, !t) {
                t = {};
                var i = this.getStatus(),
                    n = i ? this.datamodel.map.on : this.datamodel.map.off;
                t[this.datamodel.key] = {
                    value: n
                }
            }
            DA.setDeviceStatus(e, t)
        },
        updateValue: function(e) {
            this.datamodel.value = e, e == this.datamodel.map.on ? (this.datamodel.checkedFlag = !0, this.el.addClass("ui-switch-on"), this.el.removeClass("ui-switch-off")) : (this.datamodel.checkedFlag = !1, this.el.removeClass("ui-switch-on"), this.el.addClass("ui-switch-off"))
        },
        getValue: function() {
            var e = this.getStatus(),
                t = e ? this.datamodel.map.on : this.datamodel.map.off;
            return t
        },
        _triggerChanged: function() {
            "function" == typeof this.changed && this.changed.call(this, this.getStatus())
        },
        getStatus: function() {
            return this.datamodel.checkedFlag
        },
        clickAction: function() {
            this._disabled || (this.datamodel.value = this.getValue(), this.getStatus() ? this.unChecked() : this.checked())
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        disabled: function() {
            this._disabled = !0, this.el.removeClass("ui-switch-on").removeClass("ui-switch-off"), this.el.addClass("ui-switch-disabled")
        },
        enabled: function() {
            this._disabled = !1, this.el.removeClass("ui-switch-disabled"), this.getStatus() ? this.el.addClass("ui-switch-on") : this.el.addClass("ui-switch-off")
        }
    });
    return DA.Switch = s, s
}), define("halfbox", ["UIView", "underscore"], function(e, t) {
    var i = $,
        n = function(e) {
            return e.preventDefault(), !1
        },
        o = function() {},
        s = {
            height: 320,
            overlayClickClose: !0,
            onOpenBefore: o,
            onOpenAfter: o,
            onCloseBefore: o,
            onCloseAfter: o
        },
        a = 0,
        r = function() {
            return "halfbox-" + a++
        },
        l = t.inherit(e, {
            propertys: function($super) {
                $super(), this.domhook = $('<div class="ui-half-box-ct"></div>'), $(document.body).append(this.domhook)
            },
            initialize: function($super, e, n) {
                n = t.defaults(n, s), $super(n), e = t.defaults(e, s);
                var o = this;
                return o.guid = r(), o.canOverlayClickClose = e.overlayClickClose, $(".ui-halfbox-wrap").remove(), $(".ui-halfbox-overlay").remove(), o.handle = $('<div class="ui-halfbox-wrap"></div>')[0], o.overlay = $('<div class="ui-halfbox-overlay"></div>')[0], o.height = e.height + "px", o.handle.style.height = 0, t.isString(e.content) ? o.handle.innerHTML = e.content : o.handle.appendChild(e.content), this.domhook[0].appendChild(o.handle), this.domhook[0].appendChild(o.overlay), o.config = e, i(o.overlay).on("click", function() {
                    o.canOverlayClickClose && o.close()
                }), o
            },
            open: function() {
                var e = this,
                    t = e.config;
                return t.onOpenBefore && t.onOpenBefore.call(e), document.body.addEventListener("touchmove", n, !1), e.domhook.show(), e.overlay.style.zIndex = 8999, e.handle.style.height = e.height, e.overlay.style.opacity = .4, t.onOpenAfter && setTimeout(function() {
                    t.onOpenAfter.call(e)
                }, 500), e
            },
            close: function() {
                var e = this,
                    t = e.config;
                document.body.removeEventListener("touchmove", n, !1);
                var i = !0;
                t.onCloseBefore && (i = t.onCloseBefore.call(e) !== !1), (i || "none" != e.domhook.css("display") ? e.domhook.hide() : e.domhook.show()) || (e.domhook.remove(), t.onCloseAfter && setTimeout(function() {
                    t.onCloseAfter.call(e)
                }, 500))
            },
            setCanOverlayClickClose: function(e) {
                self.canOverlayClickClose = e
            },
            setHeight: function(e) {
                var t = this;
                t.height = e + "px", t.handle.style.height = t.height
            },
            getHandle: function() {
                return this.handle
            },
            setTemplate: function() {},
            initElement: function() {},
            clickAction: function(e) {}
        });
    return DA.HalfBox = l, l
}), define("pipsSlider-component", ["UIView", "underscore"], function(e, t) {
    function i(e) {
        for (var t = [], i = e.parentNode; n(i);) t.push(i), i = i.parentNode;
        return t
    }
    function n(e) {
        return e ? 0 !== e.offsetWidth || 0 !== e.offsetHeight ? !1 : !0 : !1
    }
    function o(e, t) {
        var n = i(e),
            o = n.length,
            s = [],
            a = e[t];
        if (o) {
            for (var r = 0; o > r; r++) s[r] = n[r].style.display, n[r].style.display = "block", n[r].style.height = "0", n[r].style.overflow = "hidden", n[r].style.visibility = "hidden";
            a = e[t];
            for (var l = 0; o > l; l++) n[l].style.display = s[l], n[l].style.height = "", n[l].style.overflow = "", n[l].style.visibility = ""
        }
        return a
    }
    var s = ($, $(document)),
        a = {
            element: "",
            state: "off",
            min: 0,
            max: 100,
            value: 50,
            step: 1,
            onInit: function() {},
            onSlide: function(e, t) {},
            onSlideEnd: function(e, t) {},
            onTouchEnd: function(e, t) {}
        },
        r = function(e) {
            var t = document.createElement("div");
            return t.innerHTML = e, t.firstChild ? t.firstChild : !1
        },
        l = function() {
            var e = Math.random().toString(36);
            return "alinkpipslider" + e
        };
    return DA.AlinkPipsSlider = t.inherit(e, {
        initialize: function($super, e, i) {
            var n = this;
            i = t.defaults(i, a), n.opts = i, n.startEvent = "touchstart", n.moveEvent = "touchmove", n.endEvent = "touchend", n.cancelEvent = "touchcancel";
            var o = "slider-" + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            n.onSlide = i.onSlide, n.onSlideEnd = i.onSlideEnd, n.onSlideStart = i.onSlideStart, n.onTouchEnd = i.onTouchEnd, n.uuid = l(), n.min = parseFloat(i.min || 0), n.max = parseFloat(i.max || 100), n.value = parseFloat(i.value || n.min), n.step = parseFloat(i.step || 1), n.pipsValue = i.pipsValue || [1, 2, 3], n.pipsDesc = i.pipsDesc || ["\u5c0f", "\u4e2d", "\u5927", "\u81ea\u52a8"], n.unit = i.unit || "", n.disabled = i.disabled || !1, n.mutex = i.mutex || [], n.pipsStart = i.pipsStart || 0, n.enabledPips = i.enabledPips || [], n.el = $(i.element), n.sliderLabel = $('<div class="ui-slider-label">' + i.sliderLabel + "</div>"), n.sliderCont = $('<div class="ui-slider-cont"></div>'), n.range = $('<div class="ui-slider-range" />'), n.handle = $('<div class="ui-slider-handle" />'), n.sliderValue = $('<div class="ui-slider-value"></div>'), n.slider = $('<div class="ui-slider-bar ' + o + '" id="' + n.uuid + '" />'), n.sliderbg = $('<div class="ui-slider-bg" />'), n.sliderMin = $('<div class="ui-slider-min-value">' + n.pipsDesc[n.min] + "</div>"), n.sliderMax = $('<div class="ui-slider-max-value">' + n.pipsDesc[n.max] + "</div>"), n.slider.append(n.sliderbg), n.slider.append(n.range), n.slider.append(n.handle), n.slider.append(n.sliderValue), n.sliderCont.append(n.slider), n.sliderCont.append(n.sliderMin), n.sliderCont.append(n.sliderMax), n.el.append(n.sliderLabel), n.el.append(n.sliderCont), this.handleDown = t.bind(this.handleDown, this), this.handleMove = t.bind(this.handleMove, this), this.handleEnd = t.bind(this.handleEnd, this), n.init(), n.setPips(), s.on(n.startEvent, "." + o, n.handleDown)
        },
        offEvent: function() {
            var e = this;
            s.off(e.moveEvent, e.handleMove), s.off(e.endEvent, e.handleEnd), s.off(e.cancelEvent, e.handleCancel)
        },
        setPips: function() {
            for (var e, t = this, i = '<div class="pips J_pip-scale">', n = t.pipsValue.length, o = 0; n - 2 > o; o++) i += '<i class="pip-scale" style="width:' + (t.slider.width() - n - 1) / (n - 1) + 'px"></i>';
            i += "</div>", e = r(i), e = $(e), t.el.find(".J_pip-scale").remove(), t.slider.append(e)
        },
        init: function() {
            this.onInit && "function" == typeof this.onInit && this.onInit(), this.update()
        },
        update: function() {
            this.handleWidth = o(this.handle[0], "offsetWidth"), this.sliderWidth = o(this.slider[0], "offsetWidth"), this.grabX = this.handleWidth / 2, this.position = this.getPositionFromValue(this.value), this.setPosition(this.position), this.setPips()
        },
        getPositionFromValue: function(e) {
            var t, i;
            return t = (e - this.min) / (this.max - this.min), i = t * this.sliderWidth
        },
        cap: function(e, t, i) {
            return t > e ? t : e > i ? i : e
        },
        getPositionFromNode: function(e) {
            for (var t = 0; null !== e;) t += e.offsetLeft, e = e.offsetParent;
            return t
        },
        getRelativePosition: function(e) {
            var t = this.slider[0].getBoundingClientRect().left,
                i = 0;
            return i = e.touches[0].pageX, i - t
        },
        getPositionFromValue: function(e) {
            var t, i;
            return t = (e - this.min) / (this.max - this.min), i = t * this.sliderWidth
        },
        adjustValue: function(e) {
            var t = this,
                i = t.enabledPips,
                n = !1;
            if (0 == i.length) return !0;
            for (var o in i) i[o] == e && (n = !0);
            return 1 == n ? !0 : !1
        },
        getValueFromPosition: function(e) {
            var t, i;
            return t = e / (this.sliderWidth || 1), i = this.step * Math.round(t * (this.max - this.min) / this.step) + this.min, Number(i.toFixed(2))
        },
        setPosition: function(e) {
            var t, i, n = this;
            t = n.getValueFromPosition(n.cap(e, 0, n.sliderWidth)) / n.step * n.step, i = n.getPositionFromValue(t), n.range[0].style.width = i + "px", n.handle[0].style.left = i + "px", n.sliderValue[0].style.left = i + "px", n.sliderValue[0].innerHTML = "<em>" + n.pipsDesc[t] + "</em>" + n.unit;
            var o = $(n.sliderValue[0]);
            n.sliderValue[0].style.marginLeft = -o.width() / 2 + "px", n.position = i, n.value = t, n.onSlide && "function" == typeof n.onSlide && n.onSlide(i, t)
        },
        handleDown: function(e) {
            var t = this;
            if (e.preventDefault(), 0 != t.disabled) return void t.offEvent();
            if (s.on(t.moveEvent, t.handleMove), s.on(t.endEvent, t.handleEnd), s.on(t.cancelEvent, t.handleCancel), t.opts.isLockAnsyc && t.onSlideStart && t.onSlideStart(), t.pipsStart = t.value, !((" " + e.target.className + " ").replace(/[\n\t]/g, " ").indexOf("slider-handle") > -1)) {
                var i = t.getRelativePosition(e),
                    n = t.slider[0].getBoundingClientRect().left,
                    o = t.getPositionFromNode(t.handle[0]) - n;
                t.setPosition(i - t.grabX), i >= o && i < o + t.handleWidth && (t.grabX = i - o)
            }
        },
        handleMove: function(e) {
            var t = this;
            e.preventDefault();
            var i = t.getRelativePosition(e);
            t.setPosition(i - t.grabX)
        },
        handleEnd: function(e) {
            var t = this;
            e.preventDefault();
            var i = t.value,
                n = t.adjustValue(i);
            if (0 == n) {
                var o = t.getPositionFromValue(t.pipsStart);
                t.setPosition(o - t.grabX), t.tip("\u8be5\u6a21\u5f0f\u4e0b\u4e0d\u80fd\u8bbe\u7f6e\u4e3a" + t.pipsDesc[i])
            }
            t.pipsStart != t.value ? (t.onSlideEnd && "function" == typeof t.onSlideEnd && t.onSlideEnd(t.position, t.pipsValue[t.value], t.opts), t.onTouchEnd && "function" == typeof t.onTouchEnd && t.onTouchEnd(t.position, t.pipsValue[t.value], t.opts)) : t.setPosition(t.getPositionFromValue(t.pipsStart)), t.offEvent()
        },
        tip: function(e) {
            DA.toast({
                message: e,
                cls: "cls",
                duration: 3e3
            })
        },
        handleCancel: function(e) {
            e.preventDefault();
            var t = this,
                i = t.getPositionFromValue(t.pipsStart);
            t.setPosition(i), t.offEvent()
        }
    }), DA.AlinkPipsSlider
}), define("pipsSlider", ["pipsSlider-component"], function(e) {
    var t = ($(document), {
            pipsSliderName: "",
            pipsSliderLabel: "",
            type: "PipsSlider",
            state: "off",
            min: 0,
            max: 2,
            value: 2,
            pipsValue: [0, 1, 2],
            pipsDesc: ["\u5c0f", "\u4e2d", "\u5927"],
            unit: "",
            disabled: !1,
            unUseWarnText: "",
            mutex: {},
            isLockAnsyc: !0
        }),
        i = function(i) {
            i = _.defaults(i, t);
            var n = function(t) {
                var i = this;
                return t.onSlideEnd = this.onSlideEnd.bind(this), i.changed = t.changed ||
                    function() {}, i.datamodel = t.datamodel, t.onSlideStart = i.onSlideStart, i.slider = new e(null, t), i.el = i.slider.el, t.name && i.slider.register(t.name, this), this.uiname = t.name, i
            };
            return n.prototype.setValue = function(e) {
                var t = this,
                    i = t.slider.pipsValue;
                for (var n in i) console.log(t.datamodel.isDisabledSetValue), t.datamodel.isDisabledSetValue && i[n] == e && (t.slider.value = n), i[n] == e && 0 == t.slider.disabled && (t.slider.value = n);
                t.value = t.slider.value, t.slider.update()
            }, n.prototype.setDeviceStatus = function(e, t) {
                e = e || DA.uuid, t || (t = {}, t[this.datamodel.key] = {
                    value: this.datamodel.value
                }), DA.setDeviceStatus(e, t)
            }, n.prototype.setEnabledPips = function() {
                var e = this,
                    t = arguments,
                    i = [],
                    n = e.slider.pipsValue;
                for (var o in n) for (var s in t) n[o] == t[s] && (i[s] = o);
                e.slider.enabledPips = i
            }, n.prototype.getValue = function() {
                return this.slider.pipsValue[this.slider.value]
            }, n.prototype.getPipsStart = function() {
                return this.slider.pipsStart
            }, n.prototype.disabled = function() {
                var e = this;
                e.el.addClass("slider-disabled"), e.isDisabled = !0, e.off()
            }, n.prototype.resize = function() {
                var e = this;
                e.slider.value = e.value, e.slider.update()
            }, n.prototype.enabled = function() {
                var e = this;
                e.el.removeClass("slider-disabled"), e.isDisabled = !1, e.on()
            }, n.prototype.off = function() {
                var e = this;
                e.slider.disabled = !0
            }, n.prototype.on = function() {
                var e = this;
                e.slider.disabled = !1
            }, n.prototype.onSlideStart = function() {
                document._appControlling = !0
            }, n.prototype.onSlideEnd = function(e, t, i) {
                this.datamodel.value = t, this.changed(t)
            }, n.prototype.onTouchEnd = function(e, t) {
                this.opts.onTouchEnd && this.opts.onTouchEnd(e, t)
            }, new n(i)
        };
    return DA.PipsSlider = i
}), define("slider-component", ["UIView", "underscore"], function(e, t) {
    function i(e) {
        for (var t = [], i = e.parentNode; n(i);) t.push(i), i = i.parentNode;
        return t
    }
    function n(e) {
        return e ? 0 !== e.offsetWidth || 0 !== e.offsetHeight ? !1 : !0 : !1
    }
    function o(e, t) {
        var n = i(e),
            o = n.length,
            s = [],
            a = e[t];
        if (o) {
            for (var r = 0; o > r; r++) s[r] = n[r].style.display, n[r].style.display = "block", n[r].style.height = "0", n[r].style.overflow = "hidden", n[r].style.visibility = "hidden";
            a = e[t];
            for (var l = 0; o > l; l++) n[l].style.display = s[l], n[l].style.height = "", n[l].style.overflow = "", n[l].style.visibility = ""
        }
        return a
    }
    var s = $(document),
        a = {
            element: "",
            state: "off",
            min: 0,
            max: 100,
            value: 50,
            step: 1,
            onInit: function() {},
            onSlide: function(e, t) {},
            onSlideEnd: function(e, t) {},
            onTouchEnd: function(e, t) {}
        },
        r = function() {
            var e = Math.random().toString(36);
            return "alinkslider" + e
        };
    return DA.AlinkSlider = t.inherit(e, {
        initialize: function($super, e, i) {
            var n = this;
            i = t.defaults(i, a), n.opts = i;
            var o = "slider-" + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            n.startEvent = "touchstart", n.moveEvent = "touchmove", n.endEvent = "touchend", n.onSlide = i.onSlide, n.onSlideStart = i.onSlideStart, n.onSlideEnd = i.onSlideEnd, n.onTouchEnd = i.onTouchEnd, n.uuid = r(), n.min = parseFloat(i.min || 0), n.max = parseFloat(i.max || 100), n.minDesc = i.minDesc, n.maxDesc = i.maxDesc, n.value = parseFloat(i.value || n.min + (n.max - n.min) / 2), n.step = parseFloat(i.step || 1), n.unit = i.unit || "", n.disabled = i.disabled || !1, n.el = $(i.element);
            var l = n.step.toString().split(".");
            n.numberFix = l[1] ? l[1].length : 0, n.sliderLabel = $('<div class="ui-slider-label">' + i.sliderLabel + "</div>"), n.sliderCont = $('<div class="ui-slider-cont"></div>'), n.range = $('<div class="ui-slider-range" />'), n.handle = $('<div class="ui-slider-handle" />'), n.sliderValue = $('<div class="ui-slider-value"></div>'), n.slider = $('<div class="ui-slider-bar ' + o + '" id="' + n.uuid + '" />'), n.sliderbg = $('<div class="ui-slider-bg" />'), n.sliderMinDesc = $('<div class="ui-slider-min-desc">' + n.minDesc + "</div>"), n.sliderMaxDesc = $('<div class="ui-slider-max-desc">' + n.maxDesc + "</div>"), n.sliderMin = $('<div class="ui-slider-min-value">' + n.min + "</div>"), n.sliderMax = $('<div class="ui-slider-max-value">' + n.max + "</div>"), n.slider.append(n.range), n.slider.append(n.sliderbg), n.slider.append(n.handle), n.sliderCont.append(n.slider), n.minDesc && n.maxDesc ? (n.sliderCont.append(n.sliderMinDesc), n.sliderCont.append(n.sliderMaxDesc)) : (n.slider.append(n.sliderValue), n.sliderCont.append(n.sliderMin), n.sliderCont.append(n.sliderMax)), n.el.append(n.sliderLabel), n.el.append(n.sliderCont), this.handleDown = t.bind(this.handleDown, this), this.handleMove = t.bind(this.handleMove, this), this.handleEnd = t.bind(this.handleEnd, this), n.init(), s.on(n.startEvent, "." + o, n.handleDown)
        },
        updateConfig: function(e) {
            var t = this,
                i = t.opts;
            i.min = e.min || i.min, i.max = e.max || i.max, i.minDesc = e.minDesc || i.minDesc, i.value = e.value || i.value, i.step = e.step || i.step, i.unit = e.unit || i.unit, i.disabled = e.disabled || i.disabled, t.min = parseFloat(i.min || 0), t.max = parseFloat(i.max || 100), t.minDesc = i.minDesc, t.maxDesc = i.maxDesc, t.value = parseFloat(i.value || t.min + (t.max - t.min) / 2), t.step = parseFloat(i.step || 1), t.unit = i.unit || "", t.disabled = i.disabled || !1;
            var n = t.step.toString().split(".");
            t.numberFix = n[1] ? n[1].length : 0, t.sliderMinDesc.text(t.minDesc), t.sliderMaxDesc.text(t.maxDesc), t.sliderMin.text(t.min), t.sliderMax.text(t.max), t.update()
        },
        init: function() {
            this.onInit && "function" == typeof this.onInit && this.onInit(), this.update()
        },
        update: function() {
            this.handleWidth = o(this.handle[0], "offsetWidth"), this.sliderWidth = o(this.slider[0], "offsetWidth"), this.grabX = this.handleWidth / 2, this.position = this.getPositionFromValue(this.value), this.setPosition(this.position)
        },
        getPositionFromValue: function(e) {
            var t, i;
            return t = (e - this.min) / (this.max - this.min), i = t * this.sliderWidth
        },
        cap: function(e, t, i) {
            return t > e ? t : e > i ? i : e
        },
        getPositionFromNode: function(e) {
            for (var t = 0; null !== e;) t += e.offsetLeft, e = e.offsetParent;
            return t
        },
        getRelativePosition: function(e) {
            var t = this.slider[0].getBoundingClientRect().left,
                i = e.touches[0].pageX;
            return i - t
        },
        getPositionFromValue: function(e) {
            var t, i;
            return t = (e - this.min) / (this.max - this.min), i = t * this.sliderWidth
        },
        getValueFromPosition: function(e) {
            var t, i;
            return t = e / (this.sliderWidth || 1), i = this.step * Math.round(t * (this.max - this.min) / this.step) + this.min, Number(i.toFixed(2))
        },
        setPosition: function(e) {
            var t, i, n = this;
            t = n.getValueFromPosition(n.cap(e, 0, n.sliderWidth)) / n.step * n.step;
            var o = new Number(t);
            t = parseFloat(o.toFixed(n.numberFix)), i = n.getPositionFromValue(t), n.range[0].style.width = i + "px", n.handle[0].style.left = i + "px", n.sliderValue[0].style.left = i + "px", n.sliderValue[0].innerHTML = "<em>" + t + "</em>" + n.unit;
            var s = $(n.sliderValue[0]);
            n.sliderValue[0].style.marginLeft = -s.width() / 2 + "px", n.position = i, n.value = t, n.onSlide && "function" == typeof n.onSlide && n.onSlide(i, t)
        },
        handleDown: function(e) {
            var t = this;
            if (e.preventDefault(), 0 != t.disabled) return s.off(t.moveEvent, t.handleMove), void s.off(t.endEvent, t.handleEnd);
            if (s.on(t.moveEvent, t.handleMove), s.on(t.endEvent, t.handleEnd), t.opts.isLockAnsyc && t.onSlideStart && t.onSlideStart(), !((" " + e.target.className + " ").replace(/[\n\t]/g, " ").indexOf("slider-handle") > -1)) {
                var i = t.getRelativePosition(e),
                    n = t.slider[0].getBoundingClientRect().left,
                    o = t.getPositionFromNode(t.handle[0]) - n;
                t.setPosition(i - t.grabX), i >= o && i < o + t.handleWidth && (t.grabX = i - o)
            }
        },
        handleMove: function(e) {
            var t = this;
            e.preventDefault();
            var i = t.getRelativePosition(e);
            t.setPosition(i - t.grabX)
        },
        handleEnd: function(e) {
            var t = this;
            e.preventDefault(), s.off(t.moveEvent, t.handleMove), s.off(t.endEvent, t.handleEnd), t.onSlideEnd && "function" == typeof t.onSlideEnd && t.onSlideEnd(t.position, t.value), t.onTouchEnd && "function" == typeof t.onTouchEnd && t.onTouchEnd(t.position, t.value)
        }
    }), DA.AlinkSlider
}), define("slider", ["slider-component"], function(e) {
    var t = {
            element: "",
            sliderName: "",
            sliderLabel: "",
            type: "slider",
            state: "off",
            minValue: 0,
            maxValue: 100,
            currentValue: 50,
            step: 5,
            unit: "\u2103",
            disabled: !1,
            unUseWarnText: "",
            mutex: [],
            isLockAnsyc: !0
        },
        i = function(i) {
            i = _.defaults(i, t);
            var n = function(t) {
                var i = this;
                return t.onSlideEnd = _.bind(i.onSlideEnd, this), t.onSlideStart = i.onSlideStart, i.changed = t.changed ||
                    function() {}, i.datamodel = t.datamodel, i.slider = new e(null, t), i.el = i.slider.el, i._disabledSetValue = !1, t.name && i.slider.register(t.name, this), this.uiname = t.name, i
            };
            return n.prototype.updateConfig = function(e) {
                this.slider.updateConfig(e), e.value && (this.value = e.value)
            }, n.prototype.setDeviceStatus = function(e, t) {
                e = e || DA.uuid, t || (t = {}, t[this.datamodel.key] = {
                    value: this.datamodel.value
                }), DA.setDeviceStatus(e, t)
            }, n.prototype.setValue = function(e) {
                var t = this;
                t._disabledSetValue || (t.slider.value = e, t.value = e, t.slider.update())
            }, n.prototype.disabledSetValue = function() {
                this._disabledSetValue = !0
            }, n.prototype.disabled = function() {
                var e = this;
                e.el.addClass("slider-disabled"), e.isDisabled = !0, e.off()
            }, n.prototype.resize = function() {
                var e = this;
                e.slider.value = e.value, e.slider.update()
            }, n.prototype.enabled = function() {
                var e = this;
                e.el.removeClass("slider-disabled"), e.isDisabled = !1, e.on()
            }, n.prototype.off = function() {
                var e = this;
                e.slider.disabled = !0
            }, n.prototype.on = function() {
                var e = this;
                e.slider.disabled = !1
            }, n.prototype.getValue = function() {
                return this.slider.value
            }, n.prototype.onSlideStart = function() {
                document._appControlling = !0
            }, n.prototype.onSlideEnd = function(e, t, i) {
                this.datamodel.value = t, this.changed(t)
            }, n.prototype.onTouchEnd = function(e, t) {
                this.opts.onTouchEnd && this.opts.onTouchEnd(e, t)
            }, new n(i)
        };
    return DA.Slider = i
}), define("selectMode", ["UIView", "underscore"], function(e, t) {
    var i = t.inherit(e, {
            initialize: function($super, e, t) {
                this.$el = this.rootElement = $(e.rootElement), this.changed = e.changed || this.changed, this.bindEvents(), e.name && this.register(e.name, this), this.uiname = e.name
            },
            bindEvents: function() {
                var e = this.$el[0].className + Math.random().toString(36).substring(2);
                this.$el.addClass(e), $(document.body).on("click", "." + e + " .ui-select-mode-btn", t.bind(this.clickAction, this))
            },
            changed: function(e) {},
            switchBtn: function(e, t) {
                this._triggerChanged(e, t)
            },
            setDeviceStatus: function(e, t) {
                if (e = e || DA.uuid, !t) var t = this.getStatus();
                DA.setDeviceStatus(e, t)
            },
            updateValue: function(e) {
                this.rootElement.find(".ui-select-mode-btn").removeClass("current").eq(e).addClass("current")
            },
            getValue: function() {
                var e = this.getStatus(),
                    t = e ? this.datamodel.map.on : this.datamodel.map.off;
                return t
            },
            _triggerChanged: function(e, t) {
                "function" == typeof this.changed && this.changed.apply(this, [e, t])
            },
            getStatus: function() {
                var e = this.rootElement.find(".current").attr("data-mode");
                return JSON.parse(e)
            },
            clickAction: function(e) {
                this.rootElement.find(".ui-select-mode-btn").removeClass("current");
                var t = $(e.currentTarget),
                    i = t.attr("data-mode");
                this.datamode = JSON.parse(i), t.addClass("current"), this.switchBtn(t[0], this.datamode)
            }
        }),
        n = function(e) {
            return this instanceof i ? void 0 : new i(e)
        };
    return DA.SelectMode = n, n
}), define("text!components2/functionGroup/functionGroup.html", [], function() {
    return '<div class="ui-function-check" aria-label=\'\u529f\u80fd\u9009\u62e9\u533a\'>\n  <% if(typeof(uiTitle) != \'undefined\'){ %>\n    <div class="ui-item-label" aria-label=\'\u529f\u80fd\u9009\u62e9\u533a\u6807\u9898<%=uiTitle%>\'><%=uiTitle%></div> \n  <% } %>\n  <ul>\n      <%for(var i = 0, len = map.length; i < len; i++) { %>\n      <li data-value="<%=map[i].checkedValue%>" data-index="<%=i%>" data-key="<%=map[i].key%>" >\n        <div class="out-circle" >       \n          <div class="out-mincircle">\n            <div class="checkImg">\n              <% if(typeof(map[i].icon) != \'undefined\'){ %>\n                <i class="iconfont" aria-label=\'<%=map[i].txt%>\u6309\u94ae\'><%=map[i].icon%></i>\n              <% } %>\n              <% if(typeof(map[i].img) != \'undefined\'){ %>\n                <img src="<%=map[i].img%>" alt="<%=map[i].txt%>\u6309\u94ae">\n              <% } %>\n              <% if(typeof(map[i].innerText) != \'undefined\'){ %>\n                <p class="innerText"><%=map[i].innerText%></p> \n              <% } %>\n              </div>\n          </div>\n        </div>\n          <p class="labelText"><%=map[i].txt%></p> \n       </li>\n      <% } %>\n  </ul>\n</div>\n'
}), define("funtionCheck", ["UIView", "text!./components2/functionGroup/functionGroup.html"], function(e, t) {
    var i = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.needRootWrapper = !1, this.events = {
                "click ul li .checkImg": "clickAction"
            }, this.targetItem = {}, this.targetItem.checkedFlag = !1
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : t
        },
        initElement: function() {
            var e = this;
            this.el = this.$(".ui-function-check"), this.el.find("ul li").addClass("ui-function-check-col-" + this.datamodel.checkNum), this.datamodel.map && $.each(this.datamodel.map, function(t, i) {
                var n = "";
                e.datamodel.value == i.checkedValue ? (i.checkedFlag = !0, n = i.checkedValue) : (i.checkedFlag = !1, n = i.uncheckedValue), e.setValue({
                    Index: t,
                    Value: n
                })
            }), this.show(), this.register(this.uiname, this)
        },
        onItemClick: function(e, t, i) {},
        checked: function(e, t) {
            this.getStatus() || (e.addClass("ui-function-check-on"), t.activeImg && e.find("img").attr("src", t.activeImg), this.targetItem.checkedFlag = !0, this.targetItem.currentValue = this.targetItem.checkedValue, this._triggerChanged())
        },
        unchecked: function(e, t) {
            this.getStatus() && (e.removeClass("ui-function-check-on"), t.activeImg && e.find("img").attr("src", t.img), this.targetItem.checkedFlag = !1, this.targetItem.currentValue = this.targetItem.uncheckedValue, this._triggerChanged())
        },
        setDeviceStatus: function(e, t) {
            var t = {};
            t[this.targetItem.key] = {
                value: this.targetItem.currentValue.toString()
            }, console.log("setDeviceStatus data", t), e = e || DA.uuid, DA.setDeviceStatus(e, t)
        },
        setValue: function(e) {
            var t = e.Index,
                i = e.Value,
                n = this.datamodel.map[t];
            if (n) {
                var o = this.el.find("li").eq(t);
                i == n.checkedValue ? (o.addClass("ui-function-check-on"), n.activeImg && o.find("img").attr("src", n.activeImg), n.checkedFlag = !0) : (o.removeClass("ui-function-check-on"), n.activeImg && o.find("img").attr("src", n.img), n.checkedFlag = !1)
            }
        },
        getValue: function(e) {
            var t = this.datamodel.map[e];
            return t ? t.checkedFlag ? t.checkedValue.toString() : t.uncheckedValue.toString() : void console.error("getValue\u53c2\u6570\u4e0d\u5408\u6cd5")
        },
        _triggerChanged: function(e) {
            "function" == typeof this.changed && this.changed()
        },
        getStatus: function() {
            return this.targetItem.checkedFlag
        },
        clickAction: function(e) {
            if (e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation(), !this._disabled) {
                var t = $(e.currentTarget).parents("li");
                if (!t.hasClass("disable")) {
                    var i = t.attr("data-index"),
                        n = t.attr("data-value").toString(),
                        o = this.datamodel.map[i];
                    this.targetItem = o, n && ("function" != typeof this.onClickBefore || this.onClickBefore()) && (this.getStatus() ? this.unchecked(t, o) : this.checked(t, o), "function" == typeof this.onItemClick && this.onItemClick.call(this, o, i, e))
                }
            }
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        disabled: function(e) {
            if (e) for (var t = e.length - 1; t >= 0; t--) $(this.el.find("li")[e[t]]).addClass("disable");
            else this._disabled = !0, this.el.addClass("disable"), this.el.find(".ui-function-check-on").addClass("disable")
        },
        enabled: function() {
            this._disabled = !1, this.el.removeClass("disable").find("li").removeClass("disable"), this.el.find(".ui-function-check-on").removeClass("disable")
        }
    });
    return window.DA.AlinkUI.FunctionCheck = i, i
}), define("funtionRadio", ["UIView", "text!./components2/functionGroup/functionGroup.html"], function(e, t) {
    var i = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.needRootWrapper = !1, this.events = {
                "click ul li .checkImg": "clickAction"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : t
        },
        initElement: function() {
            this.el = this.$(".ui-function-check"), this.el.find("ul li").addClass("ui-function-check-col-" + this.datamodel.checkNum), this.show(), this.setValue(this.datamodel.value), this.register(this.uiname, this)
        },
        onItemClick: function(e, t, i) {},
        setDeviceStatus: function(e, t) {
            t || (t = {}, t[this.datamodel.key] = {
                value: this.datamodel.value.toString()
            }), e = e || DA.uuid, DA.setDeviceStatus(e, t)
        },
        setValue: function(e) {
            var t = this,
                i = this.el.find("li[data-value='" + e + "']");
            if (i) {
                var n = this.datamodel.map[$(i).attr("data-index")];
                this.el.find("li").removeClass("ui-function-check-on"), this.datamodel.map[0].activeImg && $.each(this.el.find("li .checkImg img"), function(e, i) {
                    $(i).attr("src", t.datamodel.map[e].img)
                }), e != this.datamodel.unCheckedValue && (i.addClass("ui-function-check-on"), n.activeImg && i.find("img").attr("src", n.activeImg)), this.datamodel.value = e.toString()
            }
        },
        getValue: function() {
            return this.datamodel.value.toString()
        },
        _triggerChanged: function(e) {
            "function" == typeof this.changed && this.changed()
        },
        clickAction: function(e) {
            if (e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation(), !this._disabled && ("function" != typeof this.onClickBefore || this.onClickBefore())) {
                var t = $(e.currentTarget).parents("li"),
                    i = t.attr("data-index"),
                    n = t.attr("data-value").toString(),
                    o = this.datamodel.map[i];
                if (n) {
                    if (1 == this.clickTocancel && n == this.datamodel.value) this.setValue(this.datamodel.unCheckedValue);
                    else {
                        if (n == this.datamodel.value && !this.force_send) return;
                        this.setValue(n)
                    }
                    "function" == typeof this.onItemClick && this.onItemClick.call(this, o, i, e), this._triggerChanged()
                }
            }
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        disabled: function() {
            this._disabled = !0, this.el.addClass("disable").find(".ui-function-check-on").addClass("disable")
        },
        enabled: function() {
            this._disabled = !1, this.el.removeClass("disable").find(".ui-function-check-on").removeClass("disable")
        }
    });
    return window.DA.AlinkUI.FunctionRadio = i, i
}), function(e, t) {
    function i(e) {
        return e.replace(/([a-z])([A-Z])/, "$1-$2").toLowerCase()
    }
    function n(e) {
        return o ? o + e : e.toLowerCase()
    }
    var o, s, a, r, l, c, u, d, h, f, p = "",
        m = {
            Webkit: "webkit",
            Moz: "",
            O: "o"
        },
        v = document.createElement("div"),
        g = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        y = {};
    e.each(m, function(e, i) {
        return v.style[e + "TransitionProperty"] !== t ? (p = "-" + e.toLowerCase() + "-", o = i, !1) : void 0
    }), s = p + "transform", y[a = p + "transition-property"] = y[r = p + "transition-duration"] = y[c = p + "transition-delay"] = y[l = p + "transition-timing-function"] = y[u = p + "animation-name"] = y[d = p + "animation-duration"] = y[f = p + "animation-delay"] = y[h = p + "animation-timing-function"] = "", e.fx = {
        off: o === t && v.style.transitionProperty === t,
        speeds: {
            _default: 400,
            fast: 200,
            slow: 600
        },
        cssPrefix: p,
        transitionEnd: n("TransitionEnd"),
        animationEnd: n("AnimationEnd")
    }, e.fn.animate = function(i, n, o, s, a) {
        return e.isFunction(n) && (s = n, o = t, n = t), e.isFunction(o) && (s = o, o = t), e.isPlainObject(n) && (o = n.easing, s = n.complete, a = n.delay, n = n.duration), n && (n = ("number" == typeof n ? n : e.fx.speeds[n] || e.fx.speeds._default) / 1e3), a && (a = parseFloat(a) / 1e3), this.anim(i, n, o, s, a)
    }, e.fn.anim = function(n, o, p, m, v) {
        var b, w, k, x = {},
            S = "",
            D = this,
            E = e.fx.transitionEnd,
            A = !1;
        if (o === t && (o = e.fx.speeds._default / 1e3), v === t && (v = 0), e.fx.off && (o = 0), "string" == typeof n) x[u] = n, x[d] = o + "s", x[f] = v + "s", x[h] = p || "linear", E = e.fx.animationEnd;
        else {
            w = [];
            for (b in n) g.test(b) ? S += b + "(" + n[b] + ") " : (x[b] = n[b], w.push(i(b)));
            S && (x[s] = S, w.push(s)), o > 0 && "object" == typeof n && (x[a] = w.join(", "), x[r] = o + "s", x[c] = v + "s", x[l] = p || "linear")
        }
        return k = function(t) {
            if ("undefined" != typeof t) {
                if (t.target !== t.currentTarget) return;
                e(t.target).unbind(E, k)
            } else e(this).unbind(E, k);
            A = !0, e(this).css(y), m && m.call(this)
        }, o > 0 && (this.bind(E, k), setTimeout(function() {
            A || k.call(D)
        }, 1e3 * (o + v) + 25)), this.size() && this.get(0).clientLeft, this.css(x), 0 >= o && setTimeout(function() {
            D.each(function() {
                k.call(this)
            })
        }, 0), this
    }, v = null
}(Zepto), define("fx", function() {}), function(e, t) {
    function i(i, n, o, s, a) {
        "function" != typeof n || a || (a = n, n = t);
        var r = {
            opacity: o
        };
        return s && (r.scale = s, i.css(e.fx.cssPrefix + "transform-origin", "0 0")), i.animate(r, n, null, a)
    }
    function n(t, n, o, s) {
        return i(t, n, 0, o, function() {
            a.call(e(this)), s && s.call(this)
        })
    }
    var o = window.document,
        s = (o.documentElement, e.fn.show),
        a = e.fn.hide,
        r = e.fn.toggle;
    e.fn.show = function(e, n) {
        return s.call(this), e === t ? e = 0 : this.css("opacity", 0), i(this, e, 1, "1,1", n)
    }, e.fn.hide = function(e, i) {
        return e === t ? a.call(this) : n(this, e, "0,0", i)
    }, e.fn.toggle = function(i, n) {
        return i === t || "boolean" == typeof i ? r.call(this, i) : this.each(function() {
            var t = e(this);
            t["none" == t.css("display") ? "show" : "hide"](i, n)
        })
    }, e.fn.fadeTo = function(e, t, n) {
        return i(this, e, t, null, n)
    }, e.fn.fadeIn = function(e, t) {
        var i = this.css("opacity");
        return i > 0 ? this.css("opacity", 0) : i = 1, s.call(this).fadeTo(e, i, t)
    }, e.fn.fadeOut = function(e, t) {
        return n(this, e, null, t)
    }, e.fn.fadeToggle = function(t, i) {
        return this.each(function() {
            var n = e(this);
            n[0 == n.css("opacity") || "none" == n.css("display") ? "fadeIn" : "fadeOut"](t, i)
        })
    }
}(Zepto), define("fx_methods", function() {}), define("text!components2/grid/grid.html", [], function() {
    return '<div class="ui-grid"  aria-label="\u6805\u683c\u9009\u9879\u6846">\n  <% if(typeof(uiTitle) != \'undefined\'){ %>\n    <div class="ui-item-label" aria-label="\u6805\u683c\u6807\u9898<%=uiTitle%>"><%=uiTitle%></div> \n  <% } %>\n  <ul>\n    <li class="mask" ></li>\n      <%for(var i = 0, len = map.length; i < len; i++) { %>\n      <li data-value="<%=map[i].value%>" data-index="<%=i%>" data-key="<%=map[i].key%>" aria-label="\u6805\u683c\u9009\u9879<%=map[i].txt%>">\n          <i class="iconfont" aria-label="\u6805\u683c\u9009\u9879<%=map[i].txt%>"><%=map[i].icon%></i>\n          <% if(typeof(map[i].img) != \'undefined\'){ %>\n            <img src="<%=map[i].img%>" alt="<%=map[i].txt%>">\n          <% } %>\n          <div><%=map[i].txt%></div>    \n       </li>\n      <% } %>\n  </ul>\n</div>\n'
}), define("grid", ["UIView", "fx", "fx_methods", "text!./components2/grid/grid.html"], function(e, t, n, o) {
    var s = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.needRootWrapper = !1, this.events = {
                "click ul li": "clickAction"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, this.firstChange = !0, $super(t)
        },
        setTemplate: function() {
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : o
        },
        initElement: function() {
            this.el = this.$(".ui-grid"), this.el.find("ul li").addClass("ui-grid-col-" + this.datamodel.gridNum);
            var e = this.datamodel.map.length % this.datamodel.gridNum;
            if (0 != e) {
                var t = this.datamodel.gridNum - e;
                for (i = 0; i < t; i++) this.el.find("ul li").parent().append('<li class="ui-grid-col-' + this.datamodel.gridNum + '">')
            }
            this.show(), this.setValue(this.datamodel.value), this.register(this.uiname, this)
        },
        setDeviceStatus: function(e, t) {
            t || (t = {}, t[this.datamodel.key] = {
                value: this.datamodel.value.toString()
            }), console.log(t), e = e || DA.uuid, DA.setDeviceStatus(e, t)
        },
        setValue: function(e) {
            var t = this,
                i = this.el.find("li[data-value='" + e + "']"),
                n = i.offset(),
                o = this.datamodel.map[$(i).attr("data-index")];
            this.el.find("li").removeClass("ui-grid-on"), this.datamodel.map[0].img && $.each(this.el.find("ul li img"), function(e, i) {
                $(i).attr("src", t.datamodel.map[e].img)
            }), i.length ? (i.addClass("ui-grid-on"), this.datamodel.map[0].img && i.find("img").attr("src", o.activeImg), this.firstChange ? (this.firstChange = !1, this.el.find(".mask").removeClass("hidden").css({
                left: n.left - 1,
                top: n.top - this.el.find("ul").offset().top - 1
            })) : this.el.find(".mask").removeClass("hidden").animate({
                left: n.left - 1,
                top: n.top - this.el.find("ul").offset().top - 1
            }, 200, "ease-out")) : this.el.find(".mask").addClass("hidden"), this.datamodel.value = e.toString()
        },
        getValue: function() {
            return this.datamodel.value.toString()
        },
        _triggerChanged: function(e) {
            "function" == typeof this.changed && this.changed()
        },
        clickAction: function(e) {
            var t = this;
            if (e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation(), !this._disabled) {
                var i = $(e.currentTarget);
                if (i.hasClass("mask")) {
                    if ("function" == typeof this.onItemClick) {
                        var n = i.offset(),
                            o = Math.round((n.top - this.el.find("ul").offset().top) / n.height) * t.datamodel.gridNum + Math.round(n.left / n.width),
                            s = t.datamodel.map[o];
                        this.onItemClick.call(this, s, o, e)
                    }
                } else {
                    if (!i.attr("data-index")) return;
                    var o = i.attr("data-index"),
                        a = i.attr("data-value").toString(),
                        s = this.datamodel.map[o];
                    if (i.hasClass("disabled")) return void("function" == typeof this.onDisabledClick && this.onDisabledClick.call(this, s, o));
                    if (a == this.datamodel.value) {
                        if (!this.force_send) return
                    } else if ("function" == typeof this.onClickBefore && !this.onClickBefore()) return;
                    this.setValue(a), this._triggerChanged(), "function" == typeof this.onItemClick && this.onItemClick.call(this, s, o, e)
                }
            }
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        disabled: function(e) {
            if (e) for (var t = e.length - 1; t >= 0; t--) $(this.el.find("ul li")[e[t] + 1]).addClass("disabled");
            else this._disabled = !0, this.el.find("ul").addClass("disabled")
        },
        enabled: function() {
            this._disabled = !1, this.el.find("ul,li").removeClass("disabled")
        }
    });
    return window.DA.AlinkUI.Grid = s, s
}), define("text!components2/itemList/itemList.html", [], function() {
    return '<div class="ui-item-list">\n  <% if(typeof(uiTitle) != \'undefined\'){ %>\n    <div class="ui-item-label"><%=uiTitle%></div> \n  <% } %>\n  <ul>\n    <%for(var i = 0, len = map.length; i < len; i++) { %>\n    <li>\n      <a href="javascript:void(0)" class="ui-item-link ui-label-checkbox">\n        <% if(typeof(map[i].leftIcon) != \'undefined\'){ %>\n          <div class="ui-item-media"><i class="iconfont"><%=map[i].leftIcon%></i>\n          </div>\n        <% } %>\n        <div class="ui-item-inner ui-item-line">\n          <div class="ui-item-title-row">\n            <div class="ui-item-title">\n              <div class="ui-item-navtitle"><%=map[i].title%></div>\n              <div class="ui-item-subtitle">\n                <%=map[i].subtitle%></div>\n            </div>            \n            <div class="ui-item-after">\n              <span class="ui-aftertxt"><%=map[i].after%></span>\n              <i class="iconfont"><%=map[i].rightIcon%></i>\n            </div>\n          </div>\n        </div>\n      </a>\n    </li>\n    <% } %>\n  </ul>\n</div>'
}), define("itemList", ["UIView", "text!./components2/itemList/itemList.html"], function(e, t) {
    var i = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.needRootWrapper = !1, this.checkedFlag = !1, this.events = {
                "click .ui-item-link": "clickAction"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : t
        },
        initElement: function() {
            this.el = this.$(".ui-item-link"), this.show(), this.register(this.uiname, this)
        },
        onItemClick: function(e, t, i) {},
        clickAction: function(e) {
            var t = $(e.currentTarget),
                i = t.parents("li").index(),
                n = this.datamodel.map[i];
            this._disabled || ("function" != typeof this.onClickBefore || this.onClickBefore()) && "function" == typeof this.onItemClick && this.onItemClick.call(this, n, i, e)
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        disabled: function(e) {
            if (e) for (var t = e.length - 1; t >= 0; t--) $(this.el[e[t]]).addClass("disable");
            else this._disabled = !0, this.el.addClass("disable")
        },
        enabled: function() {
            this._disabled = !1, this.el.removeClass("disable")
        },
        updateUI: function(e) {
            var t = e.Index,
                i = $(this.el[t]);
            e.title && i.find(".ui-item-navtitle").html(e.title), e.subtitle && i.find(".ui-item-subtitle").html(e.subtitle), e.after && i.find(".ui-aftertxt").html(e.after), e.rightIcon && i.find(".ui-item-after .iconfont").html(e.rightIcon)
        }
    });
    return window.DA.AlinkUI.ItemList = i, i
}), define("text!components2/itemList/LRadioItem.html", [], function() {
    return '<div class="ui-item-list" >\n  <% if(typeof(uiTitle) != \'undefined\'){ %>\n    <div class="ui-item-label"><%=uiTitle%></div> \n  <% } %>\n  <ul>\n    <%for(var i = 0, len = map.length; i < len; i++) { %>\n    <li>\n      <a href="javascript:void(0)" class="ui-item-link ui-label-checkbox" data-value=<%=map[i].checkedValue%>>\n        <div class="ui-item-media"><i class="iconfont check-icon"></i>\n        </div>\n        <div class="ui-item-inner ui-item-line">\n          <div class="ui-item-title-row">\n            <div class="ui-item-title">\n              <div class="ui-item-navtitle"><%=map[i].title%></div>\n              <div class="ui-item-subtitle">\n                <%=map[i].subtitle%></div>\n            </div>\n            <div class="ui-item-after">\n              <span class="ui-aftertxt"><%=map[i].after%></span>\n              <i class="iconfont"><%=map[i].rightIcon%></i>\n            </div>\n          </div>\n        </div>\n      </a>\n    </li>\n    <% } %>\n  </ul>\n</div>'
}), define("text!components2/itemList/RRadioItem.html", [], function() {
    return '<div class="ui-item-list" >\n  <% if(typeof(uiTitle) != \'undefined\'){ %>\n    <div class="ui-item-label"><%=uiTitle%></div> \n  <% } %>\n  <ul>\n    <%for(var i = 0, len = map.length; i < len; i++) { %>\n    <li>\n      <a href="javascript:void(0)" class="ui-item-link ui-label-checkbox" data-value=<%=map[i].checkedValue%>>\n        <div class="ui-item-media">\n          <i class="iconfont"><%=map[i].leftIcon%></i>\n        </div>\n        <div class="ui-item-inner ui-item-line">\n          <div class="ui-item-title-row">\n            <div class="ui-item-title">\n              <div class="ui-item-navtitle">\n                <%=map[i].title%>\n              </div>\n              <div class="ui-item-subtitle">\n                <%=map[i].subtitle%></div>\n            </div>\n            <div class="ui-item-after">\n              <span class="ui-aftertxt"><%=map[i].after%></span>\n              <i class="iconfont check-icon"></i>\n            </div>\n          </div>\n        </div>\n      </a>\n    </li>\n    <% } %>\n  </ul>\n</div>'
}), define("checkItemList", ["UIView", "text!./components2/itemList/LRadioItem.html", "text!./components2/itemList/RRadioItem.html"], function(e, t, i) {
    var n = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.needRootWrapper = !1, this.datamodel.map && $.each(this.datamodel.map, function(e, t) {
                t.checkedFlag = !1
            }), this.targetItem = {}, this.targetItem.checkedFlag = !1, this.events = {
                "click .ui-item-link": "clickItemLink",
                "click .ui-item-media": "clickItemMedia",
                "click .ui-item-inner": "clickItemInner"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : "rightCheck" == this.type ? i : t
        },
        initElement: function() {
            var e = this;
            this.el = this.$(".ui-item-link"), !$(this.el.find(".ui-item-media i.iconfont"))[0].innerHTML && "leftCheck" != this.type && this.el.find(".ui-item-media").hide(), this.datamodel.map && $.each(this.datamodel.map, function(t, i) {
                var n = i.checkedFlag ? i.checkedValue : i.uncheckedValue;
                e.setValue({
                    Index: t,
                    Value: n
                })
            }), this.show(), this.register(this.uiname, this)
        },
        onItemClick: function(e, t, i) {},
        checked: function(e) {
            this.getStatus() || ($(e.currentTarget).find(".check-icon").html("&#xe74c;"), this.targetItem.checkedFlag = !0, this.targetItem.currentValue = this.targetItem.checkedValue, this._triggerChanged())
        },
        unchecked: function(e) {
            this.getStatus() && ($(e.currentTarget).find(".check-icon").html("&#xe77c;"), this.targetItem.checkedFlag = !1, this.targetItem.currentValue = this.targetItem.uncheckedValue, this._triggerChanged())
        },
        setDeviceStatus: function(e) {
            var t = {};
            t[this.targetItem.key] = {
                value: this.targetItem.currentValue.toString()
            }, console.log("setDeviceStatus data", t), e = e || DA.uuid, DA.setDeviceStatus(e, t)
        },
        setValue: function(e) {
            var t = e.Index,
                i = e.Value,
                n = this.datamodel.map[t];
            if (n) {
                n.currentValue = i;
                var o = this.el.eq(t).find(".check-icon");
                this.targetItem = n, i == n.checkedValue ? (o.html("&#xe74c;"), this.targetItem.checkedFlag = !0) : (o.html("&#xe77c;"), this.targetItem.checkedFlag = !1)
            }
        },
        getValue: function(e, t) {
            console.log(e, "index", t);
            var i = this.datamodel.map[e];
            return i ? i.checkedFlag ? i.checkedValue.toString() : i.uncheckedValue.toString() : void console.error("getValue\u53c2\u6570\u4e0d\u5408\u6cd5")
        },
        _triggerChanged: function(e) {
            "function" == typeof this.changed && this.changed.call(this, this.getStatus())
        },
        getStatus: function() {
            return this.targetItem.checkedFlag
        },
        clickItemLink: function(e) {
            this.separate || this.clickMediaOrLink(e)
        },
        clickItemMedia: function(e) {
            this.clickMediaOrLink(e)
        },
        clickItemInner: function(e) {
            e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
            var t = $(e.currentTarget),
                i = t.parents("li").index();
            this._disabled || $(this.el[i]).hasClass("disable") || (this.targetItem = this.datamodel.map[i], "function" == typeof this.onClickItemInner && this.onClickItemInner.call(this, this.targetItem, i))
        },
        clickMediaOrLink: function(e) {
            e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
            var t = $(e.currentTarget),
                i = t.parents("li").index();
            this.targetItem = this.datamodel.map[i], this._disabled || $(this.el[i]).hasClass("disable") || ("function" != typeof this.checkAvailabe || this.checkAvailabe()) && ("function" != typeof this.onClickBefore || this.onClickBefore()) && (this.getStatus() ? this.unchecked(e) : this.checked(e), "function" == typeof this.onItemClick && this.onItemClick.call(this, this.targetItem, i))
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        disabled: function(e) {
            if (e) for (var t = e.length - 1; t >= 0; t--) $(this.el[e[t]]).addClass("disable");
            else this._disabled = !0, this.el.addClass("disable")
        },
        enabled: function() {
            this._disabled = !1, this.el.removeClass("disable")
        },
        updateUI: function(e) {
            var t = e.Index,
                i = $(this.el[t]);
            e.title && i.find(".ui-item-navtitle").html(e.title), e.subtitle && i.find(".ui-item-subtitle").html(e.subtitle), e.after && i.find(".ui-aftertxt").html(e.after), e.rightIcon && i.find(".ui-item-after .iconfont").html(e.rightIcon)
        }
    });
    return window.DA.AlinkUI.CheckItemList = n, n
}), define("radioItemList", ["UIView", "text!./components2/itemList/LRadioItem.html", "text!./components2/itemList/RRadioItem.html"], function(e, t, i) {
    var n = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.needRootWrapper = !1, this.checkedFlag = !1, this.events = {
                "click .ui-item-link": "clickItemLink",
                "click .ui-item-media": "clickItemMedia",
                "click .ui-item-inner": "clickItemInner"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : "rightCheck" == this.type ? i : t
        },
        initElement: function() {
            this.el = this.$(".ui-item-link"), !$(this.el.find(".ui-item-media i.iconfont"))[0].innerHTML && "leftCheck" != this.type && this.el.find(".ui-item-media").hide(), this.datamodel.value = this.datamodel.value.toString(), this.setValue(this.datamodel.value), this.show(), this.register(this.uiname, this)
        },
        onItemClick: function(e, t, i) {},
        setDeviceStatus: function(e) {
            var t = {};
            t[this.datamodel.key] = {
                value: this.datamodel.value
            }, console.log("setDeviceStatus data", t), e = e || DA.uuid, DA.setDeviceStatus(e, t)
        },
        setValue: function(e) {
            this.datamodel.value = e.toString(), this.el.find(".check-icon").removeClass("active").html("&#xe77c;"), this.$(".ui-item-link[data-value = '" + e + "']").find(".check-icon").addClass("active").html("&#xe74c;")
        },
        getValue: function(e) {
            return this.datamodel.value.toString()
        },
        _triggerChanged: function(e) {
            "function" == typeof this.changed && this.changed()
        },
        clickItemLink: function(e) {
            this.separate || this.clickMediaOrLink(e)
        },
        clickItemMedia: function(e) {
            this.clickMediaOrLink(e)
        },
        clickItemInner: function(e) {
            e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
            var t = $(e.currentTarget),
                i = t.parents("li").index(),
                n = this.datamodel.map[i];
            "function" == typeof this.onClickItemInner && this.onClickItemInner.call(this, n, i)
        },
        clickMediaOrLink: function(e) {
            e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation();
            var t = $(e.currentTarget),
                i = this.separate ? t.parents("a").attr("data-value").toString() : t.attr("data-value").toString();
            if (!this._disabled) {
                if (1 == this.clickTocancel && i == this.datamodel.value) this.el.find(".check-icon").removeClass("active").html("&#xe77c;"), this.setValue(this.datamodel.unCheckedValue);
                else {
                    if (this.el.find(".check-icon").removeClass("active").html("&#xe77c;"), t.find(".check-icon").addClass("active").html("&#xe74c;"), i == this.datamodel.value) {
                        if (!this.force_send) return
                    } else if ("function" == typeof this.onClickBefore && !this.onClickBefore()) return;
                    this.datamodel.value = i
                }
                if (("function" != typeof this.checkAvailabe || this.checkAvailabe()) && ("function" != typeof this.onClickBefore || this.onClickBefore())) {
                    var n = t.parents("li").index(),
                        o = this.datamodel.map[n];
                    "function" == typeof this.onItemClick && this.onItemClick.call(this, o, n), this._triggerChanged()
                }
            }
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        disabled: function() {
            this._disabled = !0, this.el.addClass("disable")
        },
        enabled: function() {
            this._disabled = !1, this.el.removeClass("disable")
        },
        updateUI: function(e) {
            var t = e.Index,
                i = $(this.el[t]);
            e.title && i.find(".ui-item-navtitle").html(e.title), e.subtitle && i.find(".ui-item-subtitle").html(e.subtitle), e.after && i.find(".ui-aftertxt").html(e.after), e.rightIcon && i.find(".ui-item-after .iconfont").html(e.rightIcon)
        }
    });
    return window.DA.AlinkUI.RadioItemList = n, n
}), define("text!components2/modal/modal.html", [], function() {
    return '<div class="ui-modal-box" >\n	<div class="ui-modal-inner" >\n		<div class="ui-modal-title" aria-label=\'\u5f39\u7a97\u6807\u9898<%=title%>\'><%=title%></div>\n		<% if(typeof(text) != \'undefined\'){ %>\n		<div class="ui-modal-text" aria-label=\'\u5f39\u7a97\u5185\u5bb9<%=text%>\'><%=text%></div>\n		<% } %>\n	</div>\n	<% if(button!=false){ %>\n	<div class="ui-modal-buttons">\n			<%for(var i = 0, len = button.length; i < len; i++) { %>\n			<div class="ui-modal-button"><%=button[i].text%></div>\n			<% } %>\n	</div> \n	<% } %>\n</div> '
}), define("modal", ["UIView", "text!./components2/modal/modal.html"], function(e, t) {
    var i = _.inherit(e, {
        propertys: function($super) {
            $super(), this.needRootWrapper = !1, this.events = {
                "click .ui-modal-button": "clickAction"
            }
        },
        initialize: function($super, e, t) {
            this.uiname = e, $super(t)
        },
        setTemplate: function() {
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : t
        },
        initElement: function() {
            this.el = this.$(".ui-modal"), this.register(this.uiname, this)
        },
        clickAction: function(e) {
            if ("function" != typeof this.onClickBefore || this.onClickBefore()) {
                var t = $(e.currentTarget).index();
                "function" == typeof this.datamodel.button[t].click && this.datamodel.button[t].click()
            }
        },
        openModal: function() {
            document.body.addEventListener("touchmove", this.preventEvt, !1);
            var e = this;
            this.$el.show(100, function() {
                e.show()
            });
            var t = this.$(".ui-modal-box"),
                i = (window.innerHeight - t.height()) / 2;
            t.css({
                "margin-left": -t.width() / 2,
                left: "50%",
                top: i
            })
        },
        closeModal: function() {
            document.body.removeEventListener("touchmove", this.preventEvt, !1);
            var e = this;
            this.$el.animate({
                opacity: 0
            }, 100, function() {
                e.hide()
            })
        },
        setValue: function(e, t) {
            0 != e && this.$el.find(".ui-modal-title").text(e || ""), 0 != t && this.$el.find(".ui-modal-text").text(t || "")
        },
        preventEvt: function(e) {
            e.preventDefault()
        }
    });
    return window.DA.AlinkUI.Modal = i, i
}), define("text!components2/numAdjustment/numAdjustment.html", [], function() {
    return "<div class='ui-tem_div' aria-label='\u6570\u5b57\u8c03\u8282\u5668 \u5f53\u524d\u6e29\u5ea6<%=value%><%=unit%>'>\r\n    <span class='ui-tm-left' aria-label='\u51cf\u5c0f\u6309\u94ae'>-</span>\r\n    <span class='ui-tm-right' aria-label='\u589e\u5927\u6309\u94ae'>+</span>\r\n	<div class='ui-aq-all' aria-label='\u5f53\u524d\u6e29\u5ea6<%=value%><%=unit%>'>\r\n		<p><%=text%></p>\r\n		<div class='ui-aq-span'>\r\n	   	<div class=\"ui-tem_value\">\r\n	   		<span class=\"ui-tm-num\" ><%=value%></span>\r\n	   		<span class=\"ui-tm-unit\"><%=unit%></span>\r\n	   	</div>\r\n	   </div>\r\n	</div>\r\n</div>"
}), define("numAdjustment", ["UIView", "text!./components2/numAdjustment/numAdjustment.html"], function(e, t) {
    var i = _.inherit(e, {
        propertys: function($super) {
            $super()
        },
        initialize: function($super, e, t) {
            this.uiname = e, this.clickUp = t.clickUp, this.clickDown = t.clickDown, this.nStatus = t.nStatus, this.max = t.max, this.min = t.min, this.automatic = t.automatic ? t.automatic : !0, t.datamodel.value = t.datamodel.value > this.max ? this.max : t.datamodel.value, t.datamodel.value = t.datamodel.value < this.min ? this.min : t.datamodel.value, this.pro = 0 | t.datamodel.value, this.newStyle = t.newStyle ? t.newStyle : !1, this.bgColor = t.bgColor ? t.bgColor : "#32b1eb", this.interval = t.interval || 1, this.waitTime = t.waitTime || !1, $super(t)
        },
        setTemplate: function() {
            this.template = t
        },
        initElement: function() {
            this.el = this.$(".ui-tem_div"), this.show(), this.register(this.uiname, this), this.newStyle && this.el.addClass("newStyle"), this.el.css({
                background: this.bgColor
            }), this.automatic && (this.min == this.pro ? this.el.find(".ui-tm-left").addClass("hidden") : "", this.max == this.pro ? this.el.find(".ui-tm-right").addClass("hidden") : "")
        },
        setDeviceStatus: function(e, t) {
            if (!t) {
                t = {};
                var i = this.pro;
                t[this.datamodel.key] = {
                    value: i.toString()
                }
            }
            e = e || DA.uuid, DA.setDeviceStatus(e, t)
        },
        getValue: function() {
            return this.pro
        },
        setValue: function(e) {
            var t = parseInt(e);
            $(".ui-tm-num").html(t), this.pro = t
        },
        addEvent: function() {
            function e(e) {
                t.waitTime ? t.waitSet = setTimeout(function() {
                    e()
                }, t.waitTime) : e()
            }
            var t = this;
            $("body").on("click", ".ui-tm-right", function() {
                clearTimeout(t.waitSet), t.pro != t.max && (t.automatic && t.el.find(".ui-tm-left").removeClass("hidden"), t.pro += t.interval, t.pro >= t.max && (t.pro = t.max, t.automatic && t.el.find(".ui-tm-right").addClass("hidden")), t.el.find(".ui-tm-num").text(t.pro), e(function() {
                    t.setValue(t.pro), t.clickUp && t.clickUp()
                }))
            }), $("body").on("click", ".ui-tm-left", function() {
                clearTimeout(t.waitSet), t.pro != t.min && (t.automatic && t.el.find(".ui-tm-right").removeClass("hidden"), t.pro -= t.interval, t.pro <= t.min && (t.pro = t.min, t.automatic && t.el.find(".ui-tm-left").addClass("hidden")), t.el.find(".ui-tm-num").text(t.pro), e(function() {
                    t.setValue(t.pro), t.clickUp && t.clickUp()
                }))
            })
        },
        getStatus: function() {
            return this.pro
        },
        disabled: function() {
            this.el.find(".ui-tm-right, .ui-tm-left").addClass("hidden")
        },
        disabledLeft: function() {
            this.el.find(".ui-tm-left").addClass("hidden")
        },
        disabledRight: function() {
            this.el.find(".ui-tm-right").addClass("hidden")
        },
        enabledLeft: function() {
            this.el.find(".ui-tm-left").removeClass("hidden")
        },
        enabledRight: function() {
            this.el.find(".ui-tm-right").removeClass("hidden")
        },
        enabled: function() {
            this.el.find(".ui-tm-right, .ui-tm-left").removeClass("hidden")
        },
        setColor: function(e) {
            this.el.css({
                background: e
            })
        },
        setNumRange: function(e, t) {
            this.max = t, this.min = e
        }
    });
    return window.DA.AlinkUI.NumAdjustment = i, i
}), define("text!components2/offNet/offNet.html", [], function() {
    return '<div class="section" aria-label=\'\u8bbe\u5907\u65ad\u7f51\u63d0\u793a\u8499\u5c42\uff0c\u8bf7\u6309\u7167\u4e0b\u9762\u7684\u6587\u5b57\u8fdb\u884c\u64cd\u4f5c\'>\n	<div class="refresh">\n		<div class="circle refreshIcon">\n			<i class="iconfont">&#xe6a8;</i>	\n		</div>\n		<p>\u5237\u65b0\u8bd5\u8bd5</p>\n	</div>\n</div>\n<div class="section bottom-section">\n	<h2>\u8be5\u8bbe\u5907\u5df2\u65ad\u5f00\u8fde\u63a5\uff01</h2>\n	<p>\u8bf7\u5c06\u8bbe\u5907\u8fde\u4e0a\u60a8\u7684\u7f51\u7edc\uff0c\u53ef\u5c1d\u8bd5\u4ee5\u4e0b\u64cd\u4f5c</p>\n	<ul class="tips">\n		<li>1.\u70b9\u51fb\u5237\u65b0\u6309\u94ae</li>\n		<li>2.\u68c0\u67e5\u5bb6\u91cc\u7684\u8def\u7531\u5668\u662f\u5426\u6210\u529f\u8054\u7f51\uff0c\u6216\u5c1d\u8bd5\u91cd\u542f\u8def\u7531\u5668</li>\n		<li>3.\u68c0\u67e5\u667a\u80fd\u8bbe\u5907\u7684\u7535\u6e90\u63d2\u5934\u662f\u5426\u63d2\u597d</li>\n	</ul>\n	<div class="control-section">\n	<%for(var i = 0, len = button.length; i < len; i++) { %>\n		<div class="control-btn"><%=button[i].text%></div>\n	<% } %>\n	</div>		\n</div>\n'
}), define("offNet", ["UIView", "text!./components2/offNet/offNet.html"], function(e, t) {
    var i = _.inherit(e, {
        propertys: function($super) {
            $super(), this.needRootWrapper = !1, this.events = {
                "click .refresh .circle": "clickRefresh",
                "click .control-btn": "clickCtrlBtn"
            }
        },
        initialize: function($super, e, t) {
            this.uiname = e, $super(t)
        },
        setTemplate: function() {
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : t
        },
        initElement: function() {
            this.el = this.$(".ui-offNet"), this.register(this.uiname, this)
        },
        clickRefresh: function() {
            location.reload()
        },
        clickCtrlBtn: function(e) {
            var t = $(e.currentTarget).index();
            "function" == typeof this.datamodel.button[t].click && this.datamodel.button[t].click()
        },
        showUI: function() {
            $("body").addClass("offnet-noscroll").scrollTop("0"), $(".ui-offNet").show(), this.show()
        },
        hideUI: function() {
            document.body.removeEventListener("touchmove", this.preventEvt, !1), $("body").removeClass("offnet-noscroll"), $(".ui-offNet").hide(), this.hide()
        },
        preventEvt: function(e) {
            e.preventDefault()
        }
    });
    return window.DA.AlinkUI.OffNet = i, i
}), define("components2/slider/slider-component", ["UIView", "underscore"], function(e, t) {
    function i(e) {
        for (var t = [], i = e.parentNode; n(i);) t.push(i), i = i.parentNode;
        return t
    }
    function n(e) {
        return e ? 0 !== e.offsetWidth || 0 !== e.offsetHeight ? !1 : !0 : !1
    }
    function o(e, t) {
        var n = i(e),
            o = n.length,
            s = [],
            a = e[t];
        if (o) {
            for (var r = 0; o > r; r++) s[r] = n[r].style.display, n[r].style.display = "block", n[r].style.height = "0", n[r].style.overflow = "hidden", n[r].style.visibility = "hidden";
            a = e[t];
            for (var l = 0; o > l; l++) n[l].style.display = s[l], n[l].style.height = "", n[l].style.overflow = "", n[l].style.visibility = ""
        }
        return a
    }
    var s = $(document),
        a = {
            element: "",
            state: "off",
            min: 0,
            max: 100,
            value: 50,
            step: 1,
            onInit: function() {},
            onSlide: function(e, t) {},
            onSlideMove: function(e, t) {},
            onSlideEnd: function(e, t) {},
            onTouchEnd: function(e, t) {}
        },
        r = function() {
            var e = Math.random().toString(36);
            return "alinkslider" + e
        },
        l = t.inherit(e, {
            initialize: function(e) {
                var i = this;
                e = t.defaults(e, a), i.opts = e;
                var n = "slider-" + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                i.startEvent = "touchstart", i.moveEvent = "touchmove", i.endEvent = "touchend", i.onSlide = e.onSlide, i.onSlideStart = e.onSlideStart, i.onSlideMove = e.onSlideMove, i.onSlideEnd = e.onSlideEnd, i.onTouchEnd = e.onTouchEnd, i.uuid = r(), i.min = parseFloat(e.min || 0), i.max = parseFloat(e.max || 100), i.minDesc = e.minDesc, i.maxDesc = e.maxDesc, i.value = parseFloat(e.value || i.min + (i.max - i.min) / 2), i.step = parseFloat(e.step || 1), i.unit = e.unit || "", i.disabled = e.disabled || !1, i.el = $(e.element);
                var o = i.step.toString().split(".");
                i.numberFix = o[1] ? o[1].length : 0, i.sliderLabel = $('<div class="ui-slider-label">' + e.sliderLabel + "</div>"), i.sliderCont = $('<div class="ui-slider-cont"></div>'), i.range = $('<div class="ui-slider-range" />'), i.handle = $('<div class="ui-slider-handle" />'), i.sliderValue = $('<div class="ui-slider-value"></div>'), i.slider = $('<div class="ui-slider-bar ' + n + '" id="' + i.uuid + '" />'), i.sliderbg = $('<div class="ui-slider-bg" />'), i.sliderMinDesc = $('<div class="ui-slider-min-desc">' + i.minDesc + "</div>"), i.sliderMaxDesc = $('<div class="ui-slider-max-desc">' + i.maxDesc + "</div>"), i.sliderMin = $('<div class="ui-slider-min-value">' + i.min + i.unit + "</div>"), i.sliderMax = $('<div class="ui-slider-max-value">' + i.max + i.unit + "</div>"), i.slider.append(i.range), i.slider.append(i.sliderbg), i.slider.append(i.handle), i.sliderCont.append(i.slider), i.minDesc && i.maxDesc ? (i.sliderCont.append(i.sliderMinDesc), i.sliderCont.append(i.sliderMaxDesc)) : (i.slider.append(i.sliderValue), i.sliderCont.append(i.sliderMin), i.sliderCont.append(i.sliderMax)), i.el.append(i.sliderLabel), i.el.append(i.sliderCont), this.handleDown = t.bind(this.handleDown, this), this.handleMove = t.bind(this.handleMove, this), this.handleEnd = t.bind(this.handleEnd, this), i.init(), s.on(i.startEvent, "." + n, i.handleDown)
            },
            updateConfig: function(e) {
                var t = this,
                    i = t.opts;
                i.min = e.min || i.min, i.max = e.max || i.max, i.minDesc = e.minDesc || i.minDesc, i.value = e.value || i.value, i.step = e.step || i.step, i.unit = e.unit || i.unit, i.disabled = e.disabled || i.disabled, t.min = parseFloat(i.min || 0), t.max = parseFloat(i.max || 100), t.minDesc = i.minDesc, t.maxDesc = i.maxDesc, t.value = parseFloat(i.value || t.min + (t.max - t.min) / 2), t.step = parseFloat(i.step || 1), t.unit = i.unit || "", t.disabled = i.disabled || !1;
                var n = t.step.toString().split(".");
                t.numberFix = n[1] ? n[1].length : 0, t.sliderMinDesc.text(t.minDesc), t.sliderMaxDesc.text(t.maxDesc), t.sliderMin.text(t.min), t.sliderMax.text(t.max), t.update()
            },
            init: function() {
                this.onInit && "function" == typeof this.onInit && this.onInit(), this.update()
            },
            update: function() {
                this.handleWidth = o(this.handle[0], "offsetWidth"), this.sliderWidth = o(this.slider[0], "offsetWidth"), this.grabX = this.handleWidth / 2, this.position = this.getPositionFromValue(this.value), this.setPosition(this.position)
            },
            getPositionFromValue: function(e) {
                var t, i;
                return t = (e - this.min) / (this.max - this.min), i = t * this.sliderWidth
            },
            cap: function(e, t, i) {
                return t > e ? t : e > i ? i : e
            },
            getPositionFromNode: function(e) {
                for (var t = 0; null !== e;) t += e.offsetLeft, e = e.offsetParent;
                return t
            },
            getRelativePosition: function(e) {
                var t = this.slider[0].getBoundingClientRect().left,
                    i = e.touches[0].pageX;
                return i - t
            },
            getPositionFromValue: function(e) {
                var t, i;
                return t = (e - this.min) / (this.max - this.min), i = t * this.sliderWidth
            },
            getValueFromPosition: function(e) {
                var t, i;
                return t = e / (this.sliderWidth || 1), i = this.step * Math.round(t * (this.max - this.min) / this.step) + this.min, Number(i.toFixed(2))
            },
            setPosition: function(e) {
                var t, i, n = this;
                t = n.getValueFromPosition(n.cap(e, 0, n.sliderWidth)) / n.step * n.step;
                var o = new Number(t);
                t = parseFloat(o.toFixed(n.numberFix)), i = n.getPositionFromValue(t), n.range[0].style.width = i + "px", n.handle[0].style.left = i + "px", n.sliderValue[0].style.left = i + "px", n.sliderValue[0].innerHTML = t + n.unit;
                var s = $(n.sliderValue[0]);
                n.sliderValue[0].style.marginLeft = -s.width() / 2 + "px", n.position = i, n.value = t, n.onSlide && "function" == typeof n.onSlide && n.onSlide(i, t)
            },
            handleDown: function(e) {
                var t = this;
                if (e.preventDefault(), 0 != t.disabled) return s.off(t.moveEvent, t.handleMove), void s.off(t.endEvent, t.handleEnd);
                if (s.on(t.moveEvent, t.handleMove), s.on(t.endEvent, t.handleEnd), t.opts.isLockAnsyc && t.onSlideStart && t.onSlideStart(), !((" " + e.target.className + " ").replace(/[\n\t]/g, " ").indexOf("slider-handle") > -1)) {
                    var i = t.getRelativePosition(e),
                        n = t.slider[0].getBoundingClientRect().left,
                        o = t.getPositionFromNode(t.handle[0]) - n;
                    t.setPosition(i - t.grabX), i >= o && i < o + t.handleWidth && (t.grabX = i - o)
                }
            },
            handleMove: function(e) {
                var t = this;
                e.preventDefault();
                var i = t.getRelativePosition(e);
                t.setPosition(i - t.grabX), t.onSlideMove && "function" == typeof t.onSlideMove && t.onSlideMove(t.position, t.value)
            },
            handleEnd: function(e) {
                var t = this;
                e.preventDefault(), s.off(t.moveEvent, t.handleMove), s.off(t.endEvent, t.handleEnd), t.onSlideEnd && "function" == typeof t.onSlideEnd && t.onSlideEnd(t.position, t.value), t.onTouchEnd && "function" == typeof t.onTouchEnd && t.onTouchEnd(t.position, t.value)
            }
        });
    return l
}), define("slider2", ["./components2/slider/slider-component"], function(e) {
    var t = {
            element: "",
            sliderName: "",
            sliderLabel: "",
            type: "slider",
            state: "off",
            minValue: 0,
            maxValue: 100,
            currentValue: 50,
            moveChange: !1,
            step: 5,
            unit: "\u2103",
            disabled: !1,
            unUseWarnText: "",
            mutex: [],
            isLockAnsyc: !0
        },
        i = function(i) {
            i = _.defaults(i, t);
            var n = function(i) {
                var n = this;
                return i.onSlideEnd = _.bind(n.onSlideEnd, this), i.onSlideMove = _.bind(n.onSlideMove, this), i.onSlideStart = n.onSlideStart, n.changed = i.changed ||
                    function() {}, n.datamodel = i.datamodel, n.slider = new e(i), n.el = n.slider.el, n._disabledSetValue = !1, i.name && n.slider.register(i.name, this), this.uiname = i.name, this.datamodel.value = i.value || t.currentValue, n
            };
            return n.prototype.updateConfig = function(e) {
                this.slider.updateConfig(e), e.value && (this.value = e.value)
            }, n.prototype.setDeviceStatus = function(e, t) {
                e = e || DA.uuid, t || (t = {}, t[this.datamodel.key] = {
                    value: this.datamodel.value.toString()
                }), DA.setDeviceStatus(e, t)
            }, n.prototype.setValue = function(e) {
                var t = this;
                t._disabledSetValue || (t.slider.value = e.toString(), t.value = e.toString(), t.slider.update())
            }, n.prototype.disabledSetValue = function() {
                this._disabledSetValue = !0
            }, n.prototype.disabled = function() {
                var e = this;
                e.el.addClass("slider-disabled"), e.isDisabled = !0, e.off()
            }, n.prototype.resize = function() {
                var e = this;
                e.slider.value = e.value, e.slider.update()
            }, n.prototype.enabled = function() {
                var e = this;
                e.el.removeClass("slider-disabled"), e.isDisabled = !1, e.on()
            }, n.prototype.off = function() {
                var e = this;
                e.slider.disabled = !0
            }, n.prototype.on = function() {
                var e = this;
                e.slider.disabled = !1
            }, n.prototype.getValue = function() {
                return this.slider.value.toString()
            }, n.prototype.onSlideStart = function() {
                document._appControlling = !0
            }, n.prototype.onSlideMove = function(e, t, n) {
                if (i.moveChange) {
                    if (this.datamodel.value == t) return;
                    this.datamodel.value = t, this.changed(t)
                }
            }, n.prototype.onSlideEnd = function(e, t, i) {
                this.datamodel.value != t && (this.datamodel.value = t, this.changed(t))
            }, n.prototype.onTouchEnd = function(e, t) {
                this.opts.onTouchEnd && this.opts.onTouchEnd(e, t)
            }, new n(i)
        };
    return window.DA.AlinkUI.Slider = i, Slider = i
}), define("components2/slider/pipsSlider-component", ["UIView", "underscore"], function(e, t) {
    function i(e) {
        for (var t = [], i = e.parentNode; n(i);) t.push(i), i = i.parentNode;
        return t
    }
    function n(e) {
        return e ? 0 !== e.offsetWidth || 0 !== e.offsetHeight ? !1 : !0 : !1
    }
    function o(e, t) {
        var n = i(e),
            o = n.length,
            s = [],
            a = e[t];
        if (o) {
            for (var r = 0; o > r; r++) s[r] = n[r].style.display, n[r].style.display = "block", n[r].style.height = "0", n[r].style.overflow = "hidden", n[r].style.visibility = "hidden";
            a = e[t];
            for (var l = 0; o > l; l++) n[l].style.display = s[l], n[l].style.height = "", n[l].style.overflow = "", n[l].style.visibility = ""
        }
        return a
    }
    var s = ($, $(document)),
        a = {
            element: "",
            state: "off",
            min: 0,
            max: 100,
            value: 50,
            step: 1,
            onInit: function() {},
            onSlide: function(e, t) {},
            onSlideMove: function(e, t) {},
            onSlideEnd: function(e, t) {},
            onTouchEnd: function(e, t) {}
        },
        r = function(e) {
            var t = document.createElement("div");
            return t.innerHTML = e, t.firstChild ? t.firstChild : !1
        },
        l = function() {
            var e = Math.random().toString(36);
            return "alinkpipslider" + e
        },
        c = t.inherit(e, {
            initialize: function($super, e) {
                var i = this;
                e = t.defaults(e, a), i.opts = e, i.startEvent = "touchstart", i.moveEvent = "touchmove", i.endEvent = "touchend", i.cancelEvent = "touchcancel";
                var n = "slider-" + Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
                i.onSlide = e.onSlide, i.onSlideEnd = e.onSlideEnd, i.onSlideMove = e.onSlideMove, i.onSlideStart = e.onSlideStart, i.onTouchEnd = e.onTouchEnd, i.uuid = l(), i.min = parseFloat(e.min || 0), i.max = parseFloat(e.max || 100), i.value = parseFloat(e.value || i.min), i.step = parseFloat(e.step || 1), i.pipsValue = e.pipsValue || [1, 2, 3], i.pipsDesc = e.pipsDesc || ["\u5c0f", "\u4e2d", "\u5927", "\u81ea\u52a8"], i.unit = e.unit || "", i.disabled = e.disabled || !1, i.mutex = e.mutex || [], i.pipsStart = e.pipsStart || 0, i.enabledPips = e.enabledPips || [], i.el = $(e.element), i.sliderLabel = $('<div class="ui-slider-label ui-pipslider-label">' + e.sliderLabel + "</div>"), i.sliderCont = $('<div class="ui-slider-cont"></div>'), i.range = $('<div class="ui-slider-range" />'), i.handle = $('<div class="ui-slider-handle" />'), i.slider = $('<div class="ui-slider-bar ' + n + '" id="' + i.uuid + '" />');
                for (var o = "", r = "", c = i.min; c < i.max + 1; c++) o += '<div class="ui-slider-Desc">' + i.pipsDesc[c] + "</div>", c < i.max && (r += '<div class="ui-slider-spot"></div>');
                i.sliderXLabel = $("<div class='ui-slider-Xlabel'>" + o + "</div>"), i.sliderbg = $('<div class="ui-slider-bg ui-slider-spot-bg">' + r + "</div>"), i.slider.append(i.sliderbg), i.slider.append(i.range), i.slider.append(i.handle), i.sliderCont.append(i.slider), i.sliderCont.append(i.sliderXLabel), i.el.append(i.sliderLabel), i.el.append(i.sliderCont), this.handleDown = t.bind(this.handleDown, this), this.handleMove = t.bind(this.handleMove, this), this.handleEnd = t.bind(this.handleEnd, this), i.init(), i.setWidth(i.slider), s.on(i.startEvent, "." + n, i.handleDown)
            },
            offEvent: function() {
                var e = this;
                s.off(e.moveEvent, e.handleMove), s.off(e.endEvent, e.handleEnd), s.off(e.cancelEvent, e.handleCancel)
            },
            setPips: function() {
                for (var e, t = this, i = '<div class="pips J_pip-scale">', n = t.pipsValue.length, o = 0; n - 1 > o; o++) i += '<span class="pip-scale" ></span>';
                i += "</div>", e = r(i), e = $(e), t.el.find(".J_pip-scale").remove(), t.slider.append(e)
            },
            setWidth: function(e) {
                var t = e.closest(".ui-slider-cont"),
                    i = e.find(".ui-slider-spot").length,
                    n = e.width() / i,
                    o = n / 2,
                    s = t.find(".ui-slider-Desc");
                s.css({
                    width: n
                }).eq(0).css({
                    marginRight: "-" + o + "px",
                    left: "-" + o + "px",
                    position: "relative"
                }), s.eq(i).css({
                    marginLeft: "-" + o + "px",
                    right: "-" + o + "px",
                    position: "relative"
                });
                var a = $(window).width() - 10;
                $allWidth = (i + 1) * s.width(), $allWidth > a && (o = ($allWidth - a) / 2, s.eq(0).css({
                    paddingLeft: o + "px",
                    paddingRight: o + "px"
                }), s.eq(i).css({
                    paddingLeft: o + "px",
                    paddingRight: o + "px"
                }))
            },
            init: function() {
                this.onInit && "function" == typeof this.onInit && this.onInit(), this.update()
            },
            update: function() {
                this.handleWidth = o(this.handle[0], "offsetWidth"), this.sliderWidth = o(this.slider[0], "offsetWidth"), this.grabX = this.handleWidth / 2, this.position = this.getPositionFromValue(this.value), this.setPosition(this.position)
            },
            getPositionFromValue: function(e) {
                var t, i;
                return t = (e - this.min) / (this.max - this.min), i = t * this.sliderWidth
            },
            cap: function(e, t, i) {
                return t > e ? t : e > i ? i : e
            },
            getPositionFromNode: function(e) {
                for (var t = 0; null !== e;) t += e.offsetLeft, e = e.offsetParent;
                return t
            },
            getRelativePosition: function(e) {
                var t = this.slider[0].getBoundingClientRect().left,
                    i = 0;
                return i = e.touches[0].pageX, i - t
            },
            getPositionFromValue: function(e) {
                var t, i;
                return t = (e - this.min) / (this.max - this.min), i = t * this.sliderWidth
            },
            adjustValue: function(e) {
                var t = this,
                    i = t.enabledPips,
                    n = !1;
                if (0 == i.length) return !0;
                for (var o in i) i[o] == e && (n = !0);
                return 1 == n ? !0 : !1
            },
            getValueFromPosition: function(e) {
                var t, i;
                return t = e / (this.sliderWidth || 1), i = this.step * Math.round(t * (this.max - this.min) / this.step) + this.min, Number(i.toFixed(2))
            },
            setPosition: function(e) {
                var t, i, n = this;
                t = n.getValueFromPosition(n.cap(e, 0, n.sliderWidth)) / n.step * n.step, i = n.getPositionFromValue(t), n.range[0].style.width = i + "px", n.handle[0].style.left = i + "px", $(n.sliderXLabel.find(".ui-slider-Desc")).removeClass("currentXLabel"), $(n.sliderXLabel.find(".ui-slider-Desc")[t - this.min]).addClass("currentXLabel"), n.position = i, n.value = t, n.onSlide && "function" == typeof n.onSlide && n.onSlide(i, t)
            },
            handleDown: function(e) {
                var t = this;
                if (e.preventDefault(), 0 != t.disabled) return void t.offEvent();
                if (s.on(t.moveEvent, t.handleMove), s.on(t.endEvent, t.handleEnd), s.on(t.cancelEvent, t.handleCancel), t.opts.isLockAnsyc && t.onSlideStart && t.onSlideStart(), t.pipsStart = t.value, !((" " + e.target.className + " ").replace(/[\n\t]/g, " ").indexOf("slider-handle") > -1)) {
                    var i = t.getRelativePosition(e),
                        n = t.slider[0].getBoundingClientRect().left,
                        o = t.getPositionFromNode(t.handle[0]) - n;
                    t.setPosition(i - t.grabX), i >= o && i < o + t.handleWidth && (t.grabX = i - o)
                }
            },
            handleMove: function(e) {
                var t = this;
                e.preventDefault();
                var i = t.getRelativePosition(e);
                t.setPosition(i - t.grabX), t.pipsStart != t.value && t.onSlideMove && "function" == typeof t.onSlideMove && t.onSlideMove(t.position, t.pipsValue[t.value], t.opts)
            },
            handleEnd: function(e) {
                var t = this;
                e.preventDefault();
                var i = t.value,
                    n = t.adjustValue(i);
                if (0 == n) {
                    var o = t.getPositionFromValue(t.pipsStart);
                    t.setPosition(o - t.grabX), t.tip("\u8be5\u6a21\u5f0f\u4e0b\u4e0d\u80fd\u8bbe\u7f6e\u4e3a" + t.pipsDesc[i])
                }
                t.pipsStart != t.value ? (t.onSlideEnd && "function" == typeof t.onSlideEnd && t.onSlideEnd(t.position, t.pipsValue[t.value], t.opts), t.onTouchEnd && "function" == typeof t.onTouchEnd && t.onTouchEnd(t.position, t.pipsValue[t.value], t.opts)) : t.setPosition(t.getPositionFromValue(t.pipsStart)), t.offEvent()
            },
            tip: function(e) {
                DA.toast({
                    message: e,
                    cls: "cls",
                    duration: 3e3
                })
            },
            handleCancel: function(e) {
                e.preventDefault();
                var t = this,
                    i = t.getPositionFromValue(t.pipsStart);
                t.setPosition(i), t.offEvent()
            }
        });
    return c
}), define("pipsSlider2", ["./components2/slider/pipsSlider-component"], function(e) {
    var t = ($(document), {
            pipsSliderName: "",
            pipsSliderLabel: "",
            type: "PipsSlider",
            state: "off",
            min: 0,
            max: 2,
            value: 2,
            moveChange: !1,
            pipsValue: [0, 1, 2],
            pipsDesc: ["\u5c0f", "\u4e2d", "\u5927"],
            unit: "",
            disabled: !1,
            unUseWarnText: "",
            mutex: {},
            isLockAnsyc: !0
        }),
        i = function($super, i) {
            i = _.defaults(i, t);
            var n = function(i) {
                var n = this;
                return i.onSlideEnd = _.bind(n.onSlideEnd, this), i.onSlideMove = _.bind(n.onSlideMove, this), n.changed = i.changed ||
                    function() {}, n.datamodel = i.datamodel, i.onSlideStart = n.onSlideStart, n.slider = new e(i), n.el = n.slider.el, this.datamodel.value = i.value || t.currentValue, i.name && n.slider.register(i.name, this), this.uiname = i.name, n
            };
            return n.prototype.setValue = function(e) {
                var t = this,
                    i = t.slider.pipsValue;
                for (var n in i) t.datamodel.isDisabledSetValue && i[n] == e && (t.slider.value = n), i[n] == e && 0 == t.slider.disabled && (t.slider.value = n);
                t.value = t.slider.value, t.slider.update()
            }, n.prototype.setDeviceStatus = function(e, t) {
                t || (t = {}, t[this.datamodel.key] = {
                    value: this.datamodel.value
                }), e = e || DA.uuid, DA.setDeviceStatus(e, t)
            }, n.prototype.setEnabledPips = function() {
                var e = this,
                    t = arguments,
                    i = [],
                    n = e.slider.pipsValue;
                for (var o in n) for (var s in t) n[o] == t[s] && (i[s] = o);
                e.slider.enabledPips = i
            }, n.prototype.getValue = function() {
                return this.slider.pipsValue[this.slider.value].toString()
            }, n.prototype.getPipsStart = function() {
                return this.slider.pipsStart
            }, n.prototype.disabled = function() {
                var e = this;
                e.el.addClass("slider-disabled"), e.el.find(".ui-slider-spot,.ui-slider-spot-bg").addClass("disabled"), e.el.find(".currentXLabel").addClass("disabled"), e.isDisabled = !0, e.off()
            }, n.prototype.resize = function() {
                var e = this;
                e.slider.value = e.value, e.slider.update()
            }, n.prototype.enabled = function() {
                var e = this;
                e.el.removeClass("slider-disabled"), e.el.find(".ui-slider-spot,.ui-slider-spot-bg").removeClass("disabled"), e.el.find(".currentXLabel").removeClass("disabled"), e.isDisabled = !1, e.on()
            }, n.prototype.off = function() {
                var e = this;
                e.slider.disabled = !0
            }, n.prototype.on = function() {
                var e = this;
                e.slider.disabled = !1
            }, n.prototype.onSlideStart = function() {
                document._appControlling = !0
            }, n.prototype.onSlideMove = function(e, t, n) {
                if (i.moveChange) {
                    if (this.datamodel.value == t) return;
                    this.datamodel.value = t, this.changed(t)
                }
            }, n.prototype.onSlideEnd = function(e, t, i) {
                this.datamodel.value = t, this.changed(t)
            }, n.prototype.onTouchEnd = function(e, t) {
                this.opts.onTouchEnd && this.opts.onTouchEnd(e, t)
            }, new n(i)
        };
    return window.DA.AlinkUI.PipsSlider = i, PipsSlider = i
}), define("text!components2/switch/switchItem.html", [], function() {
    return '<div class="ui-item-list ui-switch-sec">\n  <ul>\n    <li>\n      <a href="javascript:void(0)" class="ui-item-link">\n        <% if(typeof(icon) != \'undefined\'){ %>\n        <div class="ui-item-media"> \n          <i class="iconfont left-icon"><%=icon%></i>\n        </div>\n        <% } %>\n        <div class="ui-item-inner">\n          <div class="ui-item-title-row">\n            <div class="ui-item-title">\n              <div class="ui-item-navtitle"><%=title%></div>\n              <div class="ui-item-subtitle"><%=subtitle%></div>\n            </div>\n            <div class="ui-item-after">\n              <div class=\'ui-switch\'>\n                <div class=\'ui-switch-check\'></div>\n              </div> \n              <i class="iconfont"></i>\n            </div>\n          </div>\n        </div>\n      </a>\n    </li>\n  </ul>\n</div>'
}), define("switch2", ["UIView", "text!./components2/switch/switchItem.html"], function(e, t) {
    var i = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.datamodel = {
                checkedFlag: !1
            }, this.needRootWrapper = !1, this.events = {
                "click .ui-switch-check": "clickAction"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            switch (this.tpl) {
                case "switchItem":
                    this.template = t;
                    break;
                case "switch":
                    this.template = "<div class='ui-switch' aria-label='\u5f00\u5173\u6309\u94ae'><div class='ui-switch-check'></div></div>";
                    break;
                default:
                    this.template = _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString()
            }
        },
        initElement: function() {
            this.el = this.$(".ui-switch"), this.show(), this.setValue(this.datamodel.value), this.register(this.uiname, this)
        },
        turnOn: function() {
            ("function" != typeof this.checkAvailabe || this.checkAvailabe()) && (this.getStatus() || ("function" != typeof this.onClickBefore || this.onClickBefore()) && (this.datamodel.checkedFlag = !0, this._triggerChanged(), this.el.find(".ui-switch-check").addClass("ui-switch-on").removeClass("ui-switch-off")))
        },
        turnOff: function() {
            ("function" != typeof this.checkAvailabe || this.checkAvailabe()) && this.getStatus() && ("function" != typeof this.onClickBefore || this.onClickBefore()) && (this.datamodel.checkedFlag = !1, this._triggerChanged(), this.el.find(".ui-switch-check").removeClass("ui-switch-on").addClass("ui-switch-off"))
        },
        setDeviceStatus: function(e, t) {
            if (!t) {
                t = {};
                var i = this.getStatus(),
                    n = i ? this.datamodel.map.on : this.datamodel.map.off;
                t[this.datamodel.key] = {
                    value: n.toString()
                }
            }
            e = e || DA.uuid, DA.setDeviceStatus(e, t)
        },
        setValue: function(e) {
            this.datamodel.value = e, e == this.datamodel.map.on ? (this.el.find(".ui-switch-check").addClass("ui-switch-on").removeClass("ui-switch-off"), this.datamodel.checkedFlag = !0) : (this.el.find(".ui-switch-check").removeClass("ui-switch-on").addClass("ui-switch-off"), this.datamodel.checkedFlag = !1)
        },
        getValue: function() {
            var e = this.getStatus(),
                t = e ? this.datamodel.map.on : this.datamodel.map.off;
            return t.toString()
        },
        _triggerChanged: function() {
            "function" == typeof this.changed && this.changed.call(this, this.getStatus())
        },
        getStatus: function() {
            return this.datamodel.checkedFlag
        },
        clickAction: function(e) {
            e.preventDefault(), e.stopImmediatePropagation(), e.stopPropagation(), this._disabled || (this.el.find(".ui-switch-check").hasClass("ui-switch-animate") || this.el.find(".ui-switch-check").addClass("ui-switch-animate"), this.datamodel.value = this.getValue(), this.getStatus() ? this.turnOff(e) : this.turnOn(e))
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        disabled: function() {
            this._disabled = !0, this.el.find(".ui-switch-check").addClass("disable")
        },
        enabled: function() {
            this._disabled = !1, this.el.find(".ui-switch-check").removeClass("disable")
        },
        updateUI: function(e) {
            var t = $(this.el).parents(".ui-item-title-row");
            e.title && t.find(".ui-item-navtitle").html(e.title), e.subtitle && t.find(".ui-item-subtitle").html(e.subtitle)
        }
    });
    return DA.AlinkUI.Switch = i, i
}), define("switchButton", ["UIView"], function(e) {
    var t = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.datamodel = {
                checkedFlag: !1
            }, this.events = {
                "click .ui-order-btn": "clickOrderBtn",
                "click .ui-switch-btn": "clickSwitchBtn"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            var e = 0 == this.datamodel.powerIcon ? "" : '<i class="iconfont">' + (this.datamodel.powerIcon || "&#xe629;") + "</i>",
                t = this.datamodel.button ? '<div class="ui-order-btn">' + this.datamodel.button[0].text + '</div><div class="ui-switch-btn half-width">' : '<div class="ui-switch-btn">',
                i = '<div class="ui-switch-btn-group">' + t + e + "<span>" + (this.datamodel.button && this.datamodel.button[0].powerbtn || "\u5f00\u542f") + "<span></div></div>";
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : i
        },
        initElement: function() {
            this.el = this.$(".ui-switch-btn"), this.show();
            var e = '<div class="switch-overlay"></div>';
            $("body").append(e), this.setValue(this.datamodel.value), this.register(this.uiname, this)
        },
        setDeviceStatus: function(e, t) {
            if (!t) {
                t = {};
                var i = this.getStatus(),
                    n = i ? this.datamodel.map.on : this.datamodel.map.off;
                t[this.datamodel.key] = {
                    value: n.toString()
                }
            }
            e = e || DA.uuid, DA.setDeviceStatus(e, t)
        },
        setValue: function(e) {
            var t = this;
            this.datamodel.value = e, e == this.datamodel.map.on ? (document.body.removeEventListener("touchmove", t.preventEvt), $(".switch-overlay").animate({
                opacity: 0
            }, 100, function() {
                $(document.body).removeClass("mask poweroff-noscroll")
            }), this.el.addClass("on").find("span").html(this.datamodel.button && this.datamodel.button[1].powerbtn || "\u5173\u95ed"), this.datamodel.button && this.el.prev(".ui-order-btn").addClass("on").html(this.datamodel.button[0].text), this.datamodel.checkedFlag = !0) : (document.body.addEventListener("touchmove", t.preventEvt), $(document.body).addClass("mask poweroff-noscroll"), $(".switch-overlay").css({
                opacity: 1
            }), this.el.removeClass("on").find("span").html(this.datamodel.button && this.datamodel.button[0].powerbtn || "\u5f00\u542f"), this.datamodel.button && this.el.prev(".ui-order-btn").removeClass("on").html(this.datamodel.button[1].text), this.datamodel.checkedFlag = !1)
        },
        getValue: function() {
            var e = this.getStatus(),
                t = e ? this.datamodel.map.on : this.datamodel.map.off;
            return t.toString()
        },
        _triggerChanged: function() {
            "function" == typeof this.changed && this.changed.call(this, this.getStatus())
        },
        getStatus: function() {
            return this.datamodel.checkedFlag
        },
        clickSwitchBtn: function() {
            if (!this._disabled && ("function" != typeof this.checkAvailabe || this.checkAvailabe()) && ("function" != typeof this.onClickBefore || this.onClickBefore())) {
                var e = this.datamodel.map.on,
                    t = this.datamodel.map.off;
                this.getValue() == e ? this.setValue(t) : this.setValue(e), this._triggerChanged()
            }
        },
        clickOrderBtn: function() {
            var e = this.getStatus() ? 1 : 0;
            "function" == typeof this.datamodel.button[e].click && this.datamodel.button[e].click.call(this, this.getStatus())
        },
        checkAvailabe: function() {
            return !this._disabled
        },
        preventEvt: function(e) {
            e.preventDefault()
        }
    });
    return DA.AlinkUI.SwitchButton = t, t
}), define("tip", ["UIView"], function(e) {
    var t = _.inherit(e, {
        propertys: function($super) {
            $super(), this._disabled = !1, this.needRootWrapper = !1, this.events = {
                click: "clickAction"
            }
        },
        initialize: function($super, e, t) {
            t.disabled = this.disabled, t.enabled = this.enabled, this.uiname = e, $super(t)
        },
        setTemplate: function() {
            this.template = '<div class="ui-tip ui-<%=type%>-tip" data-key="<%=key%>"><%=text%></div>'
        },
        initElement: function() {
            this.el = this.$(".ui-tips"), this.show(), this.register(this.uiname, this)
        },
        clickAction: function() {
            this._disabled || ("function" != typeof this.onClickBefore || this.onClickBefore()) && "function" == typeof this.clickEvt && this.clickEvt()
        },
        disabled: function() {
            this._disabled = !0, this.el.addClass("disable")
        },
        enabled: function() {
            this._disabled = !1, this.el.removeClass("disable")
        }
    });
    return DA.AlinkUI.Tip = t, t
}), define("toast", ["UIView"], function(e) {
    var t = _.inherit(e, {
        propertys: function($super) {
            $super()
        },
        initialize: function($super, e, t) {
            this.uiname = e, $super(t)
        },
        setTemplate: function() {
            var e = '<div class="ui-toast-block">' + this.text || "</div>";
            this.template = this.tpl ? _.isFunction(this.tpl) ? this.tpl() : this.tpl.toString() : e
        },
        initElement: function() {
            this.el = this.$(".ui-toast-block"), this.register(this.uiname, this)
        },
        showUI: function() {
            var e = this.el,
                t = this.time || 1e3;
            $(".ui-toast").hide(), clearTimeout(i), this.show(), e.show(), e.css({
                "margin-left": -e.width() / 2,
                "margin-top": -e.height() / 2,
                left: "50%",
                top: "50%"
            });
            var i = setTimeout(function() {
                e.fadeOut(), $(".ui-toast").fadeOut()
            }, t)
        }
    });
    return DA.AlinkUI.Toast = t, t
}), define("__sdk_main__", ["zepto", "windvane", "text", "css", "fastclick", "diffDOM", "overwriteHTMLFN", "underscore", "underscore_extend", "IScroll", "_sdk_alink", "_sdk_error_code", "_sdk_loading", "_sdk_api", "_sdk_event", "_sdk_storage", "_sdk_tool", "_sdk_bletool", "_sdk_topbar", "_sdk_native_component", "_sdk_webview_data", "flipsnap", "UIView", "datetime", "mode", "switch", "halfbox", "pipsSlider", "slider", "selectMode", "funtionCheck", "funtionRadio", "grid", "itemList", "checkItemList", "radioItemList", "modal", "numAdjustment", "offNet", "slider2", "pipsSlider2", "switch2", "switchButton", "tip", "toast"], function() {
    var e = function() {},
        t = navigator.userAgent.indexOf("Android") >= 0 ? !0 : !1;
    t && ($(document).on("click", "a", function(e) {
        var t = e.target,
            i = e.currentTarget;
        return "A" == t.tagName && "#" == $(t).attr("href") ? !1 : "A" == i.tagName && "#" == $(i).attr("href") ? !1 : void 0
    }), window.WindVane.call("AlinkSdkHybrid", "pageReady", {}, e, e), window.WindVane.call("AlinkSdkHybrid", "setMaxPageNumber", {
        max: "3"
    }, e, e))
});