var Vt = Object.defineProperty;
var Jt = (n, e, t) => e in n ? Vt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var H = (n, e, t) => (Jt(n, typeof e != "symbol" ? e + "" : e, t), t);
function K() {
}
function Ce(n, e) {
  for (const t in e)
    n[t] = e[t];
  return (
    /** @type {T & S} */
    n
  );
}
function wt(n) {
  return n();
}
function et() {
  return /* @__PURE__ */ Object.create(null);
}
function we(n) {
  n.forEach(wt);
}
function vt(n) {
  return typeof n == "function";
}
function ve(n, e) {
  return n != n ? e == e : n !== e || n && typeof n == "object" || typeof n == "function";
}
let Se;
function tt(n, e) {
  return n === e ? !0 : (Se || (Se = document.createElement("a")), Se.href = e, n === Se.href);
}
function Kt(n) {
  return Object.keys(n).length === 0;
}
function Et(n, e, t, r) {
  if (n) {
    const s = $t(n, e, t, r);
    return n[0](s);
  }
}
function $t(n, e, t, r) {
  return n[1] && r ? Ce(t.ctx.slice(), n[1](r(e))) : t.ctx;
}
function Tt(n, e, t, r) {
  if (n[2] && r) {
    const s = n[2](r(t));
    if (e.dirty === void 0)
      return s;
    if (typeof s == "object") {
      const i = [], o = Math.max(e.dirty.length, s.length);
      for (let l = 0; l < o; l += 1)
        i[l] = e.dirty[l] | s[l];
      return i;
    }
    return e.dirty | s;
  }
  return e.dirty;
}
function St(n, e, t, r, s, i) {
  if (s) {
    const o = $t(e, t, r, i);
    n.p(o, s);
  }
}
function Lt(n) {
  if (n.ctx.length > 32) {
    const e = [], t = n.ctx.length / 32;
    for (let r = 0; r < t; r++)
      e[r] = -1;
    return e;
  }
  return -1;
}
function Gt(n) {
  const e = {};
  for (const t in n)
    t[0] !== "$" && (e[t] = n[t]);
  return e;
}
function nt(n, e) {
  const t = {};
  e = new Set(e);
  for (const r in n)
    !e.has(r) && r[0] !== "$" && (t[r] = n[r]);
  return t;
}
function A(n, e) {
  n.appendChild(e);
}
function Qt(n, e, t) {
  const r = Xt(n);
  if (!r.getElementById(e)) {
    const s = T("style");
    s.id = e, s.textContent = t, Yt(r, s);
  }
}
function Xt(n) {
  if (!n)
    return document;
  const e = n.getRootNode ? n.getRootNode() : n.ownerDocument;
  return e && /** @type {ShadowRoot} */
  e.host ? (
    /** @type {ShadowRoot} */
    e
  ) : n.ownerDocument;
}
function Yt(n, e) {
  return A(
    /** @type {Document} */
    n.head || n,
    e
  ), e.sheet;
}
function D(n, e, t) {
  n.insertBefore(e, t || null);
}
function L(n) {
  n.parentNode && n.parentNode.removeChild(n);
}
function ze(n, e) {
  for (let t = 0; t < n.length; t += 1)
    n[t] && n[t].d(e);
}
function T(n) {
  return document.createElement(n);
}
function Zt(n) {
  return document.createElementNS("http://www.w3.org/2000/svg", n);
}
function Y(n) {
  return document.createTextNode(n);
}
function G() {
  return Y(" ");
}
function Ae() {
  return Y("");
}
function re(n, e, t, r) {
  return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r);
}
function en(n) {
  return function(e) {
    return e.preventDefault(), n.call(this, e);
  };
}
function $(n, e, t) {
  t == null ? n.removeAttribute(e) : n.getAttribute(e) !== t && n.setAttribute(e, t);
}
const tn = ["width", "height"];
function rt(n, e) {
  const t = Object.getOwnPropertyDescriptors(n.__proto__);
  for (const r in e)
    e[r] == null ? n.removeAttribute(r) : r === "style" ? n.style.cssText = e[r] : r === "__value" ? n.value = n[r] = e[r] : t[r] && t[r].set && tn.indexOf(r) === -1 ? n[r] = e[r] : $(n, r, e[r]);
}
function nn(n) {
  return Array.from(n.childNodes);
}
function se(n, e) {
  e = "" + e, n.data !== e && (n.data = /** @type {string} */
  e);
}
function me(n, e, t) {
  n.classList.toggle(e, !!t);
}
function rn(n, e, { bubbles: t = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(n, { detail: e, bubbles: t, cancelable: r });
}
class sn {
  constructor(e = !1) {
    /**
     * @private
     * @default false
     */
    H(this, "is_svg", !1);
    /** parent for creating node */
    H(this, "e");
    /** html tag nodes */
    H(this, "n");
    /** target */
    H(this, "t");
    /** anchor */
    H(this, "a");
    this.is_svg = e, this.e = this.n = null;
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  c(e) {
    this.h(e);
  }
  /**
   * @param {string} html
   * @param {HTMLElement | SVGElement} target
   * @param {HTMLElement | SVGElement} anchor
   * @returns {void}
   */
  m(e, t, r = null) {
    this.e || (this.is_svg ? this.e = Zt(
      /** @type {keyof SVGElementTagNameMap} */
      t.nodeName
    ) : this.e = T(
      /** @type {keyof HTMLElementTagNameMap} */
      t.nodeType === 11 ? "TEMPLATE" : t.nodeName
    ), this.t = t.tagName !== "TEMPLATE" ? t : (
      /** @type {HTMLTemplateElement} */
      t.content
    ), this.c(e)), this.i(r);
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  h(e) {
    this.e.innerHTML = e, this.n = Array.from(
      this.e.nodeName === "TEMPLATE" ? this.e.content.childNodes : this.e.childNodes
    );
  }
  /**
   * @returns {void} */
  i(e) {
    for (let t = 0; t < this.n.length; t += 1)
      D(this.t, this.n[t], e);
  }
  /**
   * @param {string} html
   * @returns {void}
   */
  p(e) {
    this.d(), this.h(e), this.i(this.a);
  }
  /**
   * @returns {void} */
  d() {
    this.n.forEach(L);
  }
}
function on(n) {
  const e = {};
  return n.childNodes.forEach(
    /** @param {Element} node */
    (t) => {
      e[t.slot || "default"] = !0;
    }
  ), e;
}
let ke;
function ye(n) {
  ke = n;
}
function Ne() {
  if (!ke)
    throw new Error("Function called outside component initialization");
  return ke;
}
function Re(n) {
  Ne().$$.on_mount.push(n);
}
function ln(n) {
  Ne().$$.after_update.push(n);
}
function Dt(n) {
  Ne().$$.on_destroy.push(n);
}
function Ct() {
  const n = Ne();
  return (e, t, { cancelable: r = !1 } = {}) => {
    const s = n.$$.callbacks[e];
    if (s) {
      const i = rn(
        /** @type {string} */
        e,
        t,
        { cancelable: r }
      );
      return s.slice().forEach((o) => {
        o.call(n, i);
      }), !i.defaultPrevented;
    }
    return !0;
  };
}
const ae = [], ee = [];
let de = [];
const Pe = [], cn = /* @__PURE__ */ Promise.resolve();
let je = !1;
function un() {
  je || (je = !0, cn.then(x));
}
function He(n) {
  de.push(n);
}
function fn(n) {
  Pe.push(n);
}
const Me = /* @__PURE__ */ new Set();
let fe = 0;
function x() {
  if (fe !== 0)
    return;
  const n = ke;
  do {
    try {
      for (; fe < ae.length; ) {
        const e = ae[fe];
        fe++, ye(e), an(e.$$);
      }
    } catch (e) {
      throw ae.length = 0, fe = 0, e;
    }
    for (ye(null), ae.length = 0, fe = 0; ee.length; )
      ee.pop()();
    for (let e = 0; e < de.length; e += 1) {
      const t = de[e];
      Me.has(t) || (Me.add(t), t());
    }
    de.length = 0;
  } while (ae.length);
  for (; Pe.length; )
    Pe.pop()();
  je = !1, Me.clear(), ye(n);
}
function an(n) {
  if (n.fragment !== null) {
    n.update(), we(n.before_update);
    const e = n.dirty;
    n.dirty = [-1], n.fragment && n.fragment.p(n.ctx, e), n.after_update.forEach(He);
  }
}
function dn(n) {
  const e = [], t = [];
  de.forEach((r) => n.indexOf(r) === -1 ? e.push(r) : t.push(r)), t.forEach((r) => r()), de = e;
}
const Le = /* @__PURE__ */ new Set();
let le;
function he() {
  le = {
    r: 0,
    c: [],
    p: le
    // parent group
  };
}
function ge() {
  le.r || we(le.c), le = le.p;
}
function N(n, e) {
  n && n.i && (Le.delete(n), n.i(e));
}
function B(n, e, t, r) {
  if (n && n.o) {
    if (Le.has(n))
      return;
    Le.add(n), le.c.push(() => {
      Le.delete(n), r && (t && n.d(1), r());
    }), n.o(e);
  } else
    r && r();
}
function be(n) {
  return (n == null ? void 0 : n.length) !== void 0 ? n : Array.from(n);
}
function hn(n, e) {
  const t = {}, r = {}, s = { $$scope: 1 };
  let i = n.length;
  for (; i--; ) {
    const o = n[i], l = e[i];
    if (l) {
      for (const c in o)
        c in l || (r[c] = 1);
      for (const c in l)
        s[c] || (t[c] = l[c], s[c] = 1);
      n[i] = l;
    } else
      for (const c in o)
        s[c] = 1;
  }
  for (const o in r)
    o in t || (t[o] = void 0);
  return t;
}
function gn(n, e, t) {
  const r = n.$$.props[e];
  r !== void 0 && (n.$$.bound[r] = t, t(n.$$.ctx[r]));
}
function _e(n) {
  n && n.c();
}
function ce(n, e, t) {
  const { fragment: r, after_update: s } = n.$$;
  r && r.m(e, t), He(() => {
    const i = n.$$.on_mount.map(wt).filter(vt);
    n.$$.on_destroy ? n.$$.on_destroy.push(...i) : we(i), n.$$.on_mount = [];
  }), s.forEach(He);
}
function ue(n, e) {
  const t = n.$$;
  t.fragment !== null && (dn(t.after_update), we(t.on_destroy), t.fragment && t.fragment.d(e), t.on_destroy = t.fragment = null, t.ctx = []);
}
function mn(n, e) {
  n.$$.dirty[0] === -1 && (ae.push(n), un(), n.$$.dirty.fill(0)), n.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function Ee(n, e, t, r, s, i, o = null, l = [-1]) {
  const c = ke;
  ye(n);
  const f = n.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: i,
    update: K,
    not_equal: s,
    bound: et(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    // everything else
    callbacks: et(),
    dirty: l,
    skip_bound: !1,
    root: e.target || c.$$.root
  };
  o && o(f.root);
  let d = !1;
  if (f.ctx = t ? t(n, e.props || {}, (g, E, ...a) => {
    const _ = a.length ? a[0] : E;
    return f.ctx && s(f.ctx[g], f.ctx[g] = _) && (!f.skip_bound && f.bound[g] && f.bound[g](_), d && mn(n, g)), E;
  }) : [], f.update(), d = !0, we(f.before_update), f.fragment = r ? r(f.ctx) : !1, e.target) {
    if (e.hydrate) {
      const g = nn(e.target);
      f.fragment && f.fragment.l(g), g.forEach(L);
    } else
      f.fragment && f.fragment.c();
    e.intro && N(n.$$.fragment), ce(n, e.target, e.anchor), x();
  }
  ye(c);
}
let At;
typeof HTMLElement == "function" && (At = class extends HTMLElement {
  constructor(e, t, r) {
    super();
    /** The Svelte component constructor */
    H(this, "$$ctor");
    /** Slots */
    H(this, "$$s");
    /** The Svelte component instance */
    H(this, "$$c");
    /** Whether or not the custom element is connected */
    H(this, "$$cn", !1);
    /** Component props data */
    H(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    H(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    H(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    H(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    H(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = e, this.$$s = t, r && this.attachShadow({ mode: "open" });
  }
  addEventListener(e, t, r) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
      const s = this.$$c.$on(e, t);
      this.$$l_u.set(t, s);
    }
    super.addEventListener(e, t, r);
  }
  removeEventListener(e, t, r) {
    if (super.removeEventListener(e, t, r), this.$$c) {
      const s = this.$$l_u.get(t);
      s && (s(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(i) {
        return () => {
          let o;
          return {
            c: function() {
              o = T("slot"), i !== "default" && $(o, "name", i);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(f, d) {
              D(f, o, d);
            },
            d: function(f) {
              f && L(o);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn)
        return;
      const t = {}, r = on(this);
      for (const i of this.$$s)
        i in r && (t[i] = [e(i)]);
      for (const i of this.attributes) {
        const o = this.$$g_p(i.name);
        o in this.$$d || (this.$$d[o] = De(o, i.value, this.$$p_d, "toProp"));
      }
      this.$$c = new this.$$ctor({
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: t,
          $$scope: {
            ctx: []
          }
        }
      });
      const s = () => {
        this.$$r = !0;
        for (const i in this.$$p_d)
          if (this.$$d[i] = this.$$c.$$.ctx[this.$$c.$$.props[i]], this.$$p_d[i].reflect) {
            const o = De(
              i,
              this.$$d[i],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(this.$$p_d[i].attribute || i) : this.setAttribute(this.$$p_d[i].attribute || i, o);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(s), s();
      for (const i in this.$$l)
        for (const o of this.$$l[i]) {
          const l = this.$$c.$on(i, o);
          this.$$l_u.set(o, l);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(e, t, r) {
    var s;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = De(e, r, this.$$p_d, "toProp"), (s = this.$$c) == null || s.$set({ [e]: this.$$d[e] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      this.$$cn || (this.$$c.$destroy(), this.$$c = void 0);
    });
  }
  $$g_p(e) {
    return Object.keys(this.$$p_d).find(
      (t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e
    ) || e;
  }
});
function De(n, e, t, r) {
  var i;
  const s = (i = t[n]) == null ? void 0 : i.type;
  if (e = s === "Boolean" && typeof e != "boolean" ? e != null : e, !r || !t[n])
    return e;
  if (r === "toAttribute")
    switch (s) {
      case "Object":
      case "Array":
        return e == null ? null : JSON.stringify(e);
      case "Boolean":
        return e ? "" : null;
      case "Number":
        return e ?? null;
      default:
        return e;
    }
  else
    switch (s) {
      case "Object":
      case "Array":
        return e && JSON.parse(e);
      case "Boolean":
        return e;
      case "Number":
        return e != null ? +e : e;
      default:
        return e;
    }
}
function $e(n, e, t, r, s, i) {
  let o = class extends At {
    constructor() {
      super(n, t, s), this.$$p_d = e;
    }
    static get observedAttributes() {
      return Object.keys(e).map(
        (l) => (e[l].attribute || l).toLowerCase()
      );
    }
  };
  return Object.keys(e).forEach((l) => {
    Object.defineProperty(o.prototype, l, {
      get() {
        return this.$$c && l in this.$$c ? this.$$c[l] : this.$$d[l];
      },
      set(c) {
        var f;
        c = De(l, c, e), this.$$d[l] = c, (f = this.$$c) == null || f.$set({ [l]: c });
      }
    });
  }), r.forEach((l) => {
    Object.defineProperty(o.prototype, l, {
      get() {
        var c;
        return (c = this.$$c) == null ? void 0 : c[l];
      }
    });
  }), i && (o = i(o)), n.element = /** @type {any} */
  o, o;
}
class Te {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    H(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    H(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    ue(this, 1), this.$destroy = K;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, t) {
    if (!vt(t))
      return K;
    const r = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return r.push(t), () => {
      const s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !Kt(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const bn = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(bn);
function _n(n) {
  let e, t, r, s;
  const i = (
    /*#slots*/
    n[10].default
  ), o = Et(
    i,
    n,
    /*$$scope*/
    n[9],
    null
  );
  return {
    c() {
      e = T("div"), o && o.c(), $(e, "class", "searchbox-dropdown");
    },
    m(l, c) {
      D(l, e, c), o && o.m(e, null), n[11](e), t = !0, r || (s = re(e, "mousedown", pn), r = !0);
    },
    p(l, [c]) {
      o && o.p && (!t || c & /*$$scope*/
      512) && St(
        o,
        i,
        l,
        /*$$scope*/
        l[9],
        t ? Tt(
          i,
          /*$$scope*/
          l[9],
          c,
          null
        ) : Lt(
          /*$$scope*/
          l[9]
        ),
        null
      );
    },
    i(l) {
      t || (N(o, l), t = !0);
    },
    o(l) {
      B(o, l), t = !1;
    },
    d(l) {
      l && L(e), o && o.d(l), n[11](null), r = !1, s();
    }
  };
}
function pn(n) {
  n.currentTarget.tagName !== "A" && n.preventDefault();
}
function xn(n, e, t) {
  let r, { $$slots: s = {}, $$scope: i } = e, { align: o = "left" } = e, { anchor: l = null } = e, { offset: c = [0, -1] } = e, { animationDuration: f = 350 } = e, { input: d } = e, { pageOffset: g = 20 } = e, { width: E = null } = e, a, _;
  Dt(() => {
    _ && _.classList.remove("searchbox-dropdown-visible");
  }), Re(() => {
    _ = l ? document.querySelector(l) : d;
  });
  function v() {
    if (_ && a) {
      const m = _.getBoundingClientRect(), p = document.documentElement.clientHeight, S = document.documentElement.clientWidth, W = parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10), k = Math.min(p - g * 2, p - g - m.bottom);
      t(0, a.style.width = `${E || m.width + "px"}`, a), t(0, a.style.top = `${m.bottom + c[1]}px`, a), o === "right" ? (t(0, a.style.left = "auto", a), t(0, a.style.right = `${S - (m.right + c[0])}px`, a)) : (t(0, a.style.left = `${m.left + c[0]}px`, a), t(0, a.style.right = "auto", a)), t(0, a.style.maxHeight = `${k}px`, a);
      const C = [...a.childNodes].reduce(
        (q, h) => h instanceof Element ? q + Math.max(h.getBoundingClientRect().height, h.scrollHeight) : q,
        W
      );
      t(0, a.style.height = `${Math.min(k, C)}px`, a), _.classList.add("searchbox-dropdown-visible"), setTimeout(
        () => {
          a && t(0, a.style.height = "auto", a);
        },
        f
      );
    }
  }
  function y(m) {
    ee[m ? "unshift" : "push"](() => {
      a = m, t(0, a);
    });
  }
  return n.$$set = (m) => {
    "align" in m && t(1, o = m.align), "anchor" in m && t(2, l = m.anchor), "offset" in m && t(3, c = m.offset), "animationDuration" in m && t(4, f = m.animationDuration), "input" in m && t(5, d = m.input), "pageOffset" in m && t(6, g = m.pageOffset), "width" in m && t(7, E = m.width), "$$scope" in m && t(9, i = m.$$scope);
  }, n.$$.update = () => {
    n.$$.dirty & /*el*/
    1 && (r = a && getComputedStyle(a));
  }, [
    a,
    o,
    l,
    c,
    f,
    d,
    g,
    E,
    v,
    i,
    s,
    y
  ];
}
class Nt extends Te {
  constructor(e) {
    super(), Ee(this, e, xn, _n, ve, {
      align: 1,
      anchor: 2,
      offset: 3,
      animationDuration: 4,
      input: 5,
      pageOffset: 6,
      width: 7,
      position: 8
    });
  }
  get align() {
    return this.$$.ctx[1];
  }
  set align(e) {
    this.$$set({ align: e }), x();
  }
  get anchor() {
    return this.$$.ctx[2];
  }
  set anchor(e) {
    this.$$set({ anchor: e }), x();
  }
  get offset() {
    return this.$$.ctx[3];
  }
  set offset(e) {
    this.$$set({ offset: e }), x();
  }
  get animationDuration() {
    return this.$$.ctx[4];
  }
  set animationDuration(e) {
    this.$$set({ animationDuration: e }), x();
  }
  get input() {
    return this.$$.ctx[5];
  }
  set input(e) {
    this.$$set({ input: e }), x();
  }
  get pageOffset() {
    return this.$$.ctx[6];
  }
  set pageOffset(e) {
    this.$$set({ pageOffset: e }), x();
  }
  get width() {
    return this.$$.ctx[7];
  }
  set width(e) {
    this.$$set({ width: e }), x();
  }
  get position() {
    return this.$$.ctx[8];
  }
}
$e(Nt, { align: {}, anchor: {}, offset: {}, animationDuration: {}, input: {}, pageOffset: {}, width: {} }, ["default"], ["position"], !0);
function yn(n) {
  let e;
  return {
    c() {
      e = T("div");
    },
    m(t, r) {
      D(t, e, r), n[3](e);
    },
    p: K,
    i: K,
    o: K,
    d(t) {
      t && L(e), n[3](null);
    }
  };
}
function kn(n, e, t) {
  let r, { args: s } = e, { renderer: i } = e, o;
  ln(() => {
    r instanceof Element ? o.replaceWith(r) : r && t(0, o.innerHTML = r, o);
  });
  function l(c) {
    ee[c ? "unshift" : "push"](() => {
      o = c, t(0, o);
    });
  }
  return n.$$set = (c) => {
    "args" in c && t(1, s = c.args), "renderer" in c && t(2, i = c.renderer);
  }, n.$$.update = () => {
    n.$$.dirty & /*renderer, args*/
    6 && (r = i(...s));
  }, [o, s, i, l];
}
class Oe extends Te {
  constructor(e) {
    super(), Ee(this, e, kn, yn, ve, { args: 1, renderer: 2 });
  }
  get args() {
    return this.$$.ctx[1];
  }
  set args(e) {
    this.$$set({ args: e }), x();
  }
  get renderer() {
    return this.$$.ctx[2];
  }
  set renderer(e) {
    this.$$set({ renderer: e }), x();
  }
}
$e(Oe, { args: {}, renderer: {} }, [], [], !0);
function st(n, e, t) {
  const r = n.slice();
  return r[10] = e[t], r;
}
function wn(n) {
  var S, W;
  let e, t, r, s, i, o = (
    /*item*/
    n[3].doc.title + ""
  ), l, c, f, d, g, E, a, _, v = (
    /*item*/
    n[3].doc.image && ot(n)
  ), y = (
    /*labels*/
    ((S = n[5]) == null ? void 0 : S.length) && it(n)
  ), m = (
    /*item*/
    n[3].doc.excerpt && ct(n)
  ), p = !/*forceExpanded*/
  n[1] && /*item*/
  ((W = n[3].children) == null ? void 0 : W.length) && ut(n);
  return {
    c() {
      e = T("a"), v && v.c(), t = G(), r = T("div"), s = T("div"), i = new sn(!1), l = G(), y && y.c(), c = G(), m && m.c(), g = G(), p && p.c(), E = Ae(), i.a = l, $(s, "class", "searchbox-results-title"), $(e, "href", f = /*item*/
      n[3].doc.link), $(e, "class", "searchbox-results-link"), $(e, "tabindex", "-1"), $(e, "data-ref", d = /*item*/
      n[3].ref);
    },
    m(k, C) {
      D(k, e, C), v && v.m(e, null), A(e, t), A(e, r), A(r, s), i.m(o, s), A(s, l), y && y.m(s, null), A(r, c), m && m.m(r, null), D(k, g, C), p && p.m(k, C), D(k, E, C), a || (_ = re(
        e,
        "click",
        /*onClick*/
        n[6]
      ), a = !0);
    },
    p(k, C) {
      var q, h;
      /*item*/
      k[3].doc.image ? v ? v.p(k, C) : (v = ot(k), v.c(), v.m(e, t)) : v && (v.d(1), v = null), C & /*item*/
      8 && o !== (o = /*item*/
      k[3].doc.title + "") && i.p(o), /*labels*/
      (q = k[5]) != null && q.length ? y ? y.p(k, C) : (y = it(k), y.c(), y.m(s, null)) : y && (y.d(1), y = null), /*item*/
      k[3].doc.excerpt ? m ? m.p(k, C) : (m = ct(k), m.c(), m.m(r, null)) : m && (m.d(1), m = null), C & /*item*/
      8 && f !== (f = /*item*/
      k[3].doc.link) && $(e, "href", f), C & /*item*/
      8 && d !== (d = /*item*/
      k[3].ref) && $(e, "data-ref", d), !/*forceExpanded*/
      k[1] && /*item*/
      ((h = k[3].children) != null && h.length) ? p ? p.p(k, C) : (p = ut(k), p.c(), p.m(E.parentNode, E)) : p && (p.d(1), p = null);
    },
    i: K,
    o: K,
    d(k) {
      k && (L(e), L(g), L(E)), v && v.d(), y && y.d(), m && m.d(), p && p.d(k), a = !1, _();
    }
  };
}
function vn(n) {
  let e, t;
  return e = new Oe({
    props: {
      renderer: (
        /*renderer*/
        n[4]
      ),
      args: [
        /*item*/
        n[3]
      ]
    }
  }), {
    c() {
      _e(e.$$.fragment);
    },
    m(r, s) {
      ce(e, r, s), t = !0;
    },
    p(r, s) {
      const i = {};
      s & /*renderer*/
      16 && (i.renderer = /*renderer*/
      r[4]), s & /*item*/
      8 && (i.args = [
        /*item*/
        r[3]
      ]), e.$set(i);
    },
    i(r) {
      t || (N(e.$$.fragment, r), t = !0);
    },
    o(r) {
      B(e.$$.fragment, r), t = !1;
    },
    d(r) {
      ue(e, r);
    }
  };
}
function ot(n) {
  let e, t, r;
  return {
    c() {
      e = T("div"), t = T("img"), tt(t.src, r = /*item*/
      n[3].doc.image) || $(t, "src", r), $(t, "alt", ""), $(t, "width", "48"), $(e, "class", "searchbox-results-image");
    },
    m(s, i) {
      D(s, e, i), A(e, t);
    },
    p(s, i) {
      i & /*item*/
      8 && !tt(t.src, r = /*item*/
      s[3].doc.image) && $(t, "src", r);
    },
    d(s) {
      s && L(e);
    }
  };
}
function it(n) {
  let e, t = be(
    /*labels*/
    n[5]
  ), r = [];
  for (let s = 0; s < t.length; s += 1)
    r[s] = lt(st(n, t, s));
  return {
    c() {
      for (let s = 0; s < r.length; s += 1)
        r[s].c();
      e = Ae();
    },
    m(s, i) {
      for (let o = 0; o < r.length; o += 1)
        r[o] && r[o].m(s, i);
      D(s, e, i);
    },
    p(s, i) {
      if (i & /*labels*/
      32) {
        t = be(
          /*labels*/
          s[5]
        );
        let o;
        for (o = 0; o < t.length; o += 1) {
          const l = st(s, t, o);
          r[o] ? r[o].p(l, i) : (r[o] = lt(l), r[o].c(), r[o].m(e.parentNode, e));
        }
        for (; o < r.length; o += 1)
          r[o].d(1);
        r.length = t.length;
      }
    },
    d(s) {
      s && L(e), ze(r, s);
    }
  };
}
function lt(n) {
  let e, t = (
    /*label*/
    n[10] + ""
  ), r;
  return {
    c() {
      e = T("span"), r = Y(t), $(e, "class", "searchbox-results-label");
    },
    m(s, i) {
      D(s, e, i), A(e, r);
    },
    p(s, i) {
      i & /*labels*/
      32 && t !== (t = /*label*/
      s[10] + "") && se(r, t);
    },
    d(s) {
      s && L(e);
    }
  };
}
function ct(n) {
  let e, t = (
    /*item*/
    n[3].doc.excerpt + ""
  );
  return {
    c() {
      e = T("div"), $(e, "class", "searchbox-results-excerpt");
    },
    m(r, s) {
      D(r, e, s), e.innerHTML = t;
    },
    p(r, s) {
      s & /*item*/
      8 && t !== (t = /*item*/
      r[3].doc.excerpt + "") && (e.innerHTML = t);
    },
    d(r) {
      r && L(e);
    }
  };
}
function ut(n) {
  let e, t, r = (
    /*i18n*/
    n[2].more_on_this_page.replace("{count}", String(
      /*item*/
      n[3].children.length
    )) + ""
  ), s, i, o;
  return {
    c() {
      e = T("div"), t = T("button"), s = Y(r), $(t, "type", "button"), $(e, "class", "searchbox-results-expand");
    },
    m(l, c) {
      D(l, e, c), A(e, t), A(t, s), i || (o = re(
        t,
        "click",
        /*click_handler*/
        n[8]
      ), i = !0);
    },
    p(l, c) {
      c & /*i18n, item*/
      12 && r !== (r = /*i18n*/
      l[2].more_on_this_page.replace("{count}", String(
        /*item*/
        l[3].children.length
      )) + "") && se(s, r);
    },
    d(l) {
      l && L(e), i = !1, o();
    }
  };
}
function En(n) {
  let e, t, r, s, i, o;
  const l = [vn, wn], c = [];
  function f(d, g) {
    return (
      /*renderer*/
      d[4] ? 0 : 1
    );
  }
  return t = f(n), r = c[t] = l[t](n), {
    c() {
      e = T("li"), r.c(), $(e, "class", "searchbox-results-item"), me(
        e,
        "searchbox-results-item-expanded",
        /*expanded*/
        n[0]
      );
    },
    m(d, g) {
      D(d, e, g), c[t].m(e, null), s = !0, i || (o = re(
        e,
        "click",
        /*onClick*/
        n[6]
      ), i = !0);
    },
    p(d, [g]) {
      let E = t;
      t = f(d), t === E ? c[t].p(d, g) : (he(), B(c[E], 1, 1, () => {
        c[E] = null;
      }), ge(), r = c[t], r ? r.p(d, g) : (r = c[t] = l[t](d), r.c()), N(r, 1), r.m(e, null)), (!s || g & /*expanded*/
      1) && me(
        e,
        "searchbox-results-item-expanded",
        /*expanded*/
        d[0]
      );
    },
    i(d) {
      s || (N(r), s = !0);
    },
    o(d) {
      B(r), s = !1;
    },
    d(d) {
      d && L(e), c[t].d(), i = !1, o();
    }
  };
}
function $n(n, e, t) {
  let r, { expanded: s = !1 } = e, { forceExpanded: i = !1 } = e, { i18n: o } = e, { item: l } = e, { renderer: c = null } = e;
  const f = Ct();
  function d(a) {
    l.doc.link || (a.stopPropagation(), a.preventDefault(), f("click", l));
  }
  function g() {
    f("expand", l);
  }
  const E = () => g();
  return n.$$set = (a) => {
    "expanded" in a && t(0, s = a.expanded), "forceExpanded" in a && t(1, i = a.forceExpanded), "i18n" in a && t(2, o = a.i18n), "item" in a && t(3, l = a.item), "renderer" in a && t(4, c = a.renderer);
  }, n.$$.update = () => {
    var a, _, v;
    n.$$.dirty & /*item*/
    8 && t(5, r = Array.isArray((a = l == null ? void 0 : l.doc) == null ? void 0 : a.labels) ? l.doc.labels : (v = (_ = l == null ? void 0 : l.doc) == null ? void 0 : _.labels) == null ? void 0 : v.split(/[\,\;]/).filter((y) => !!y));
  }, [
    s,
    i,
    o,
    l,
    c,
    r,
    d,
    g,
    E
  ];
}
class Ot extends Te {
  constructor(e) {
    super(), Ee(this, e, $n, En, ve, {
      expanded: 0,
      forceExpanded: 1,
      i18n: 2,
      item: 3,
      renderer: 4
    });
  }
  get expanded() {
    return this.$$.ctx[0];
  }
  set expanded(e) {
    this.$$set({ expanded: e }), x();
  }
  get forceExpanded() {
    return this.$$.ctx[1];
  }
  set forceExpanded(e) {
    this.$$set({ forceExpanded: e }), x();
  }
  get i18n() {
    return this.$$.ctx[2];
  }
  set i18n(e) {
    this.$$set({ i18n: e }), x();
  }
  get item() {
    return this.$$.ctx[3];
  }
  set item(e) {
    this.$$set({ item: e }), x();
  }
  get renderer() {
    return this.$$.ctx[4];
  }
  set renderer(e) {
    this.$$set({ renderer: e }), x();
  }
}
$e(Ot, { expanded: { type: "Boolean" }, forceExpanded: { type: "Boolean" }, i18n: {}, item: {}, renderer: {} }, [], [], !0);
function ft(n, e, t) {
  const r = n.slice();
  return r[31] = e[t], r;
}
function at(n, e, t) {
  const r = n.slice();
  return r[34] = e[t], r;
}
function dt(n) {
  let e, t, r;
  return t = new Oe({
    props: {
      renderer: (
        /*renderers*/
        n[4].header
      ),
      args: [
        /*result*/
        n[5]
      ]
    }
  }), {
    c() {
      e = T("div"), _e(t.$$.fragment), $(e, "class", "searchbox-results-header");
    },
    m(s, i) {
      D(s, e, i), ce(t, e, null), r = !0;
    },
    p(s, i) {
      const o = {};
      i[0] & /*renderers*/
      16 && (o.renderer = /*renderers*/
      s[4].header), i[0] & /*result*/
      32 && (o.args = [
        /*result*/
        s[5]
      ]), t.$set(o);
    },
    i(s) {
      r || (N(t.$$.fragment, s), r = !0);
    },
    o(s) {
      B(t.$$.fragment, s), r = !1;
    },
    d(s) {
      s && L(e), ue(t);
    }
  };
}
function ht(n) {
  let e, t, r, s, i = (
    /*categories*/
    n[8].length > 2 && gt(n)
  ), o = be(
    /*categories*/
    n[8].slice(1)
  ), l = [];
  for (let c = 0; c < o.length; c += 1)
    l[c] = mt(at(n, o, c));
  return {
    c() {
      e = T("div"), t = T("div"), r = T("ul"), i && i.c(), s = G();
      for (let c = 0; c < l.length; c += 1)
        l[c].c();
      $(t, "class", "searchbox-results-categories-wrap"), $(e, "class", "searchbox-results-categories");
    },
    m(c, f) {
      D(c, e, f), A(e, t), A(t, r), i && i.m(r, null), A(r, s);
      for (let d = 0; d < l.length; d += 1)
        l[d] && l[d].m(r, null);
    },
    p(c, f) {
      if (/*categories*/
      c[8].length > 2 ? i ? i.p(c, f) : (i = gt(c), i.c(), i.m(r, s)) : i && (i.d(1), i = null), f[0] & /*category, categories, onCategoryClick*/
      8449) {
        o = be(
          /*categories*/
          c[8].slice(1)
        );
        let d;
        for (d = 0; d < o.length; d += 1) {
          const g = at(c, o, d);
          l[d] ? l[d].p(g, f) : (l[d] = mt(g), l[d].c(), l[d].m(r, null));
        }
        for (; d < l.length; d += 1)
          l[d].d(1);
        l.length = o.length;
      }
    },
    d(c) {
      c && L(e), i && i.d(), ze(l, c);
    }
  };
}
function gt(n) {
  let e, t, r = (
    /*i18n*/
    n[1].all + ""
  ), s, i, o;
  return {
    c() {
      e = T("li"), t = T("span"), s = Y(r), $(t, "role", "button"), me(
        t,
        "active",
        /*category*/
        n[0] === "*"
      );
    },
    m(l, c) {
      D(l, e, c), A(e, t), A(t, s), i || (o = re(
        t,
        "click",
        /*click_handler*/
        n[20]
      ), i = !0);
    },
    p(l, c) {
      c[0] & /*i18n*/
      2 && r !== (r = /*i18n*/
      l[1].all + "") && se(s, r), c[0] & /*category*/
      1 && me(
        t,
        "active",
        /*category*/
        l[0] === "*"
      );
    },
    d(l) {
      l && L(e), i = !1, o();
    }
  };
}
function mt(n) {
  let e, t, r = (
    /*cat*/
    n[34] + ""
  ), s, i, o, l;
  function c() {
    return (
      /*click_handler_1*/
      n[21](
        /*cat*/
        n[34]
      )
    );
  }
  return {
    c() {
      e = T("li"), t = T("span"), s = Y(r), i = G(), $(t, "role", "button"), me(
        t,
        "active",
        /*category*/
        n[0] === /*cat*/
        n[34]
      );
    },
    m(f, d) {
      D(f, e, d), A(e, t), A(t, s), A(e, i), o || (l = re(t, "click", c), o = !0);
    },
    p(f, d) {
      n = f, d[0] & /*categories*/
      256 && r !== (r = /*cat*/
      n[34] + "") && se(s, r), d[0] & /*category, categories*/
      257 && me(
        t,
        "active",
        /*category*/
        n[0] === /*cat*/
        n[34]
      );
    },
    d(f) {
      f && L(e), o = !1, l();
    }
  };
}
function Tn(n) {
  let e, t, r = be(
    /*slicedFilteredItems*/
    n[12]
  ), s = [];
  for (let o = 0; o < r.length; o += 1)
    s[o] = bt(ft(n, r, o));
  const i = (o) => B(s[o], 1, 1, () => {
    s[o] = null;
  });
  return {
    c() {
      for (let o = 0; o < s.length; o += 1)
        s[o].c();
      e = Ae();
    },
    m(o, l) {
      for (let c = 0; c < s.length; c += 1)
        s[c] && s[c].m(o, l);
      D(o, e, l), t = !0;
    },
    p(o, l) {
      if (l[0] & /*slicedFilteredItems, i18n, forceExpanded, renderers, expandedItems, onItemClick, onItemExpand*/
      55442) {
        r = be(
          /*slicedFilteredItems*/
          o[12]
        );
        let c;
        for (c = 0; c < r.length; c += 1) {
          const f = ft(o, r, c);
          s[c] ? (s[c].p(f, l), N(s[c], 1)) : (s[c] = bt(f), s[c].c(), N(s[c], 1), s[c].m(e.parentNode, e));
        }
        for (he(), c = r.length; c < s.length; c += 1)
          i(c);
        ge();
      }
    },
    i(o) {
      if (!t) {
        for (let l = 0; l < r.length; l += 1)
          N(s[l]);
        t = !0;
      }
    },
    o(o) {
      s = s.filter(Boolean);
      for (let l = 0; l < s.length; l += 1)
        B(s[l]);
      t = !1;
    },
    d(o) {
      o && L(e), ze(s, o);
    }
  };
}
function Sn(n) {
  let e, t = (
    /*i18n*/
    n[1].no_results + ""
  ), r;
  return {
    c() {
      e = T("li"), r = Y(t), $(e, "class", "searchbox-results-text");
    },
    m(s, i) {
      D(s, e, i), A(e, r);
    },
    p(s, i) {
      i[0] & /*i18n*/
      2 && t !== (t = /*i18n*/
      s[1].no_results + "") && se(r, t);
    },
    i: K,
    o: K,
    d(s) {
      s && L(e);
    }
  };
}
function Ln(n) {
  let e, t;
  return {
    c() {
      e = T("li"), t = Y(
        /*message*/
        n[3]
      ), $(e, "class", "searchbox-results-text");
    },
    m(r, s) {
      D(r, e, s), A(e, t);
    },
    p(r, s) {
      s[0] & /*message*/
      8 && se(
        t,
        /*message*/
        r[3]
      );
    },
    i: K,
    o: K,
    d(r) {
      r && L(e);
    }
  };
}
function Dn(n) {
  let e, t = (
    /*i18n*/
    n[1].loading + ""
  ), r;
  return {
    c() {
      e = T("li"), r = Y(t), $(e, "class", "searchbox-results-text");
    },
    m(s, i) {
      D(s, e, i), A(e, r);
    },
    p(s, i) {
      i[0] & /*i18n*/
      2 && t !== (t = /*i18n*/
      s[1].loading + "") && se(r, t);
    },
    i: K,
    o: K,
    d(s) {
      s && L(e);
    }
  };
}
function bt(n) {
  var r;
  let e, t;
  return e = new Ot({
    props: {
      item: (
        /*item*/
        n[31]
      ),
      i18n: (
        /*i18n*/
        n[1]
      ),
      forceExpanded: (
        /*forceExpanded*/
        n[11]
      ),
      renderer: (
        /*renderers*/
        (r = n[4]) == null ? void 0 : r.item
      ),
      expanded: (
        /*expandedItems*/
        n[7].includes(
          /*item*/
          n[31].ref
        )
      )
    }
  }), e.$on(
    "click",
    /*click_handler_2*/
    n[22]
  ), e.$on(
    "expand",
    /*expand_handler*/
    n[23]
  ), {
    c() {
      _e(e.$$.fragment);
    },
    m(s, i) {
      ce(e, s, i), t = !0;
    },
    p(s, i) {
      var l;
      const o = {};
      i[0] & /*slicedFilteredItems*/
      4096 && (o.item = /*item*/
      s[31]), i[0] & /*i18n*/
      2 && (o.i18n = /*i18n*/
      s[1]), i[0] & /*forceExpanded*/
      2048 && (o.forceExpanded = /*forceExpanded*/
      s[11]), i[0] & /*renderers*/
      16 && (o.renderer = /*renderers*/
      (l = s[4]) == null ? void 0 : l.item), i[0] & /*expandedItems, slicedFilteredItems*/
      4224 && (o.expanded = /*expandedItems*/
      s[7].includes(
        /*item*/
        s[31].ref
      )), e.$set(o);
    },
    i(s) {
      t || (N(e.$$.fragment, s), t = !0);
    },
    o(s) {
      B(e.$$.fragment, s), t = !1;
    },
    d(s) {
      ue(e, s);
    }
  };
}
function _t(n) {
  let e, t, r = (
    /*i18n*/
    n[1].load_more + ""
  ), s, i, o;
  return {
    c() {
      e = T("li"), t = T("button"), s = Y(r), $(t, "type", "button"), $(e, "class", "searchbox-results-load-more");
    },
    m(l, c) {
      D(l, e, c), A(e, t), A(t, s), i || (o = re(t, "click", en(
        /*click_handler_3*/
        n[24]
      )), i = !0);
    },
    p(l, c) {
      c[0] & /*i18n*/
      2 && r !== (r = /*i18n*/
      l[1].load_more + "") && se(s, r);
    },
    d(l) {
      l && L(e), i = !1, o();
    }
  };
}
function pt(n) {
  let e, t, r;
  return t = new Oe({
    props: {
      renderer: (
        /*renderers*/
        n[4].footer
      ),
      args: [
        /*result*/
        n[5]
      ]
    }
  }), {
    c() {
      e = T("div"), _e(t.$$.fragment), $(e, "class", "searchbox-results-footer");
    },
    m(s, i) {
      D(s, e, i), ce(t, e, null), r = !0;
    },
    p(s, i) {
      const o = {};
      i[0] & /*renderers*/
      16 && (o.renderer = /*renderers*/
      s[4].footer), i[0] & /*result*/
      32 && (o.args = [
        /*result*/
        s[5]
      ]), t.$set(o);
    },
    i(s) {
      r || (N(t.$$.fragment, s), r = !0);
    },
    o(s) {
      B(t.$$.fragment, s), r = !1;
    },
    d(s) {
      s && L(e), ue(t);
    }
  };
}
function Cn(n) {
  var W, k, C, q;
  let e, t, r, s, i, o, l, c, f, d, g, E, a = (
    /*renderers*/
    ((W = n[4]) == null ? void 0 : W.header) && dt(n)
  ), _ = (
    /*categories*/
    ((k = n[8]) == null ? void 0 : k.length) > 1 && ht(n)
  );
  const v = [Dn, Ln, Sn, Tn], y = [];
  function m(h, O) {
    var V;
    return (
      /*loading*/
      h[2] ? 0 : (
        /*message*/
        h[3] ? 1 : (
          /*filteredItems*/
          (V = h[9]) != null && V.length ? (
            /*slicedFilteredItems*/
            h[12] ? 3 : -1
          ) : 2
        )
      )
    );
  }
  ~(i = m(n)) && (o = y[i] = v[i](n));
  let p = (
    /*filteredItems*/
    ((C = n[9]) == null ? void 0 : C.length) > /*maxItems*/
    n[6] && _t(n)
  ), S = (
    /*renderers*/
    ((q = n[4]) == null ? void 0 : q.footer) && pt(n)
  );
  return {
    c() {
      a && a.c(), e = G(), _ && _.c(), t = G(), r = T("div"), s = T("ul"), o && o.c(), l = G(), p && p.c(), c = G(), S && S.c(), f = Ae(), $(r, "class", "searchbox-results-items");
    },
    m(h, O) {
      a && a.m(h, O), D(h, e, O), _ && _.m(h, O), D(h, t, O), D(h, r, O), A(r, s), ~i && y[i].m(s, null), A(s, l), p && p.m(s, null), n[25](r), D(h, c, O), S && S.m(h, O), D(h, f, O), d = !0, g || (E = re(
        r,
        "scroll",
        /*scroll_handler*/
        n[26]
      ), g = !0);
    },
    p(h, O) {
      var I, Q, te, oe;
      /*renderers*/
      (I = h[4]) != null && I.header ? a ? (a.p(h, O), O[0] & /*renderers*/
      16 && N(a, 1)) : (a = dt(h), a.c(), N(a, 1), a.m(e.parentNode, e)) : a && (he(), B(a, 1, 1, () => {
        a = null;
      }), ge()), /*categories*/
      ((Q = h[8]) == null ? void 0 : Q.length) > 1 ? _ ? _.p(h, O) : (_ = ht(h), _.c(), _.m(t.parentNode, t)) : _ && (_.d(1), _ = null);
      let V = i;
      i = m(h), i === V ? ~i && y[i].p(h, O) : (o && (he(), B(y[V], 1, 1, () => {
        y[V] = null;
      }), ge()), ~i ? (o = y[i], o ? o.p(h, O) : (o = y[i] = v[i](h), o.c()), N(o, 1), o.m(s, l)) : o = null), /*filteredItems*/
      ((te = h[9]) == null ? void 0 : te.length) > /*maxItems*/
      h[6] ? p ? p.p(h, O) : (p = _t(h), p.c(), p.m(s, null)) : p && (p.d(1), p = null), /*renderers*/
      (oe = h[4]) != null && oe.footer ? S ? (S.p(h, O), O[0] & /*renderers*/
      16 && N(S, 1)) : (S = pt(h), S.c(), N(S, 1), S.m(f.parentNode, f)) : S && (he(), B(S, 1, 1, () => {
        S = null;
      }), ge());
    },
    i(h) {
      d || (N(a), N(o), N(S), d = !0);
    },
    o(h) {
      B(a), B(o), B(S), d = !1;
    },
    d(h) {
      h && (L(e), L(t), L(r), L(c), L(f)), a && a.d(h), _ && _.d(h), ~i && y[i].d(), p && p.d(), n[25](null), S && S.d(h), g = !1, E();
    }
  };
}
let xt = 10;
function An(n, e, t) {
  let r, s, i, { category: o = null } = e, { i18n: l } = e, { loading: c = !1 } = e, { message: f = null } = e, { renderers: d = null } = e, { result: g = null } = e;
  const E = Ct();
  let a, _ = xt, v = [], y = !1;
  Re(() => {
    requestAnimationFrame(() => {
      C();
    });
  });
  function m(b, w, z) {
    const R = o === "*" ? b : b == null ? void 0 : b.filter((F) => F.doc.category === o);
    return t(11, y = (R == null ? void 0 : R.length) === 1), R == null ? void 0 : R.reduce(
      (F, M) => {
        var P;
        return F.push(M), (P = M.children) != null && P.length && (y || v.includes(M.ref)) && F.push(...M.children), F;
      },
      []
    );
  }
  function p(b) {
    (r == null ? void 0 : r.length) === 2 ? t(0, o = r[1]) : ((r == null ? void 0 : r.length) === 1 || !(r != null && r.includes(o))) && t(0, o = "*");
  }
  function S(b) {
    E("category", b);
  }
  function W(b) {
    E("selection", b);
  }
  function k(b) {
    v.includes(b.ref) ? t(7, v = v.filter((w) => w !== b.ref)) : t(7, v = [...v, b.ref]);
  }
  function C() {
    (a == null ? void 0 : a.scrollTop) > 5, (a == null ? void 0 : a.scrollTop) + (a == null ? void 0 : a.clientHeight) >= (a == null ? void 0 : a.scrollHeight) - 50 && q();
  }
  function q() {
    t(6, _ = _ + xt);
  }
  function h() {
    a && t(10, a.scrollTop = 0, a);
  }
  function O(b, w = "focus") {
    const z = [].slice.call(a.querySelectorAll("a[tabindex]"));
    let R = a.querySelector("a:hover, a." + w);
    R || (b = 0, R = z[0]);
    const F = Math.max(0, Math.min(z.length - 1, z.indexOf(R) + b)), M = z[F];
    R == null || R.classList.remove(w), M.classList.add(w);
    const P = M.getAttribute("data-ref"), pe = P && g.items.find((X) => X.ref === P);
    pe && E("selection", pe), M.scrollIntoView({ behavior: "smooth" });
  }
  const V = () => S("*"), I = (b) => S(b), Q = (b) => W(b.detail), te = (b) => k(b.detail), oe = () => q();
  function ne(b) {
    ee[b ? "unshift" : "push"](() => {
      a = b, t(10, a);
    });
  }
  const ie = () => C();
  return n.$$set = (b) => {
    "category" in b && t(0, o = b.category), "i18n" in b && t(1, l = b.i18n), "loading" in b && t(2, c = b.loading), "message" in b && t(3, f = b.message), "renderers" in b && t(4, d = b.renderers), "result" in b && t(5, g = b.result);
  }, n.$$.update = () => {
    var b;
    n.$$.dirty[0] & /*result*/
    32 && t(8, r = (b = g == null ? void 0 : g.items) == null ? void 0 : b.reduce(
      (w, z) => (z.doc.category && !w.includes(z.doc.category) && w.push(z.doc.category), w),
      ["*"]
    )), n.$$.dirty[0] & /*categories*/
    256 && p(), n.$$.dirty[0] & /*result, category, expandedItems*/
    161 && t(9, s = m(g == null ? void 0 : g.items)), n.$$.dirty[0] & /*filteredItems, maxItems*/
    576 && t(12, i = s == null ? void 0 : s.slice(0, _));
  }, [
    o,
    l,
    c,
    f,
    d,
    g,
    _,
    v,
    r,
    s,
    a,
    y,
    i,
    S,
    W,
    k,
    C,
    q,
    h,
    O,
    V,
    I,
    Q,
    te,
    oe,
    ne,
    ie
  ];
}
class qe extends Te {
  constructor(e) {
    super(), Ee(
      this,
      e,
      An,
      Cn,
      ve,
      {
        category: 0,
        i18n: 1,
        loading: 2,
        message: 3,
        renderers: 4,
        result: 5,
        scrollToTop: 18,
        navigateItems: 19
      },
      null,
      [-1, -1]
    );
  }
  get category() {
    return this.$$.ctx[0];
  }
  set category(e) {
    this.$$set({ category: e }), x();
  }
  get i18n() {
    return this.$$.ctx[1];
  }
  set i18n(e) {
    this.$$set({ i18n: e }), x();
  }
  get loading() {
    return this.$$.ctx[2];
  }
  set loading(e) {
    this.$$set({ loading: e }), x();
  }
  get message() {
    return this.$$.ctx[3];
  }
  set message(e) {
    this.$$set({ message: e }), x();
  }
  get renderers() {
    return this.$$.ctx[4];
  }
  set renderers(e) {
    this.$$set({ renderers: e }), x();
  }
  get result() {
    return this.$$.ctx[5];
  }
  set result(e) {
    this.$$set({ result: e }), x();
  }
  get scrollToTop() {
    return this.$$.ctx[18];
  }
  get navigateItems() {
    return this.$$.ctx[19];
  }
}
$e(qe, { category: {}, i18n: {}, loading: { type: "Boolean" }, message: {}, renderers: {}, result: {} }, [], ["scrollToTop", "navigateItems"], !0);
const Nn = {
  all: "All",
  loading: "Loading...",
  load_more: "Load more",
  more_on_this_page: "{count} more on this page",
  no_results: "No results found."
};
function yt(n, e) {
  let t;
  return (...r) => {
    t && clearTimeout(t), t = setTimeout(() => {
      n(...r);
    }, e);
  };
}
function On(n) {
  Qt(n, "svelte-1t9xdi2", ":root{--searchbox-border-color:rgb(219, 219, 219);--searchbox-active-color:rgb(19, 58, 165);--searchbox-active-bg-color:rgb(233, 238, 250);--searchbox-muted-color:rgb(119, 119, 119);--searchbox-muted-bg-color:rgb(247, 247, 247);--searchbox-mark-bg:rgb(250, 248, 205);--searchbox-spacer:0.5rem;--searchbox-spacer-lg:1rem}.searchbox-results-categories{background-color:var(--searchbox-muted-bg-color);border-bottom:1px solid var(--searchbox-border-color);font-size:0.8rem;padding:0 var(--searchbox-spacer)}.searchbox-results-categories-wrap{overflow-y:visible;overflow-x:auto;margin:0 0 -1px 0}.searchbox-results-categories ul{display:flex;margin:0;padding:0;list-style:none}.searchbox-results-categories li{margin-right:var(--searchbox-spacer-lg)}.searchbox-results-categories a,.searchbox-results-categories [role=button]{border-bottom:1px solid transparent;color:var(--searchbox-muted-color);cursor:pointer;display:inline-block;padding:var(--searchbox-spacer) 0;white-space:nowrap}.searchbox-results-categories a.active,.searchbox-results-categories [role=button].active{border-bottom-color:var(--searchbox-active-color);color:var(--searchbox-active-color)}.searchbox-results-items{flex-grow:1;overflow-y:auto;overflow-x:hidden}.searchbox-results-items mark{background-color:var(--searchbox-mark-bg);color:currentColor;padding:0}.searchbox-results-items ul{margin:0;padding:0;list-style:none}.searchbox-results-items a{color:var(--searchbox-active-color)}.searchbox-results-header{background-color:var(--searchbox-muted-bg-color);border-bottom:1px solid var(--searchbox-border-color);padding:var(--searchbox-spacer)}.searchbox-results-footer{background-color:var(--searchbox-muted-bg-color);border-top:1px solid var(--searchbox-border-color);padding:var(--searchbox-spacer)}.searchbox-results:not(.compact) .searchbox-results-item:not(:last-child){border-bottom:1px solid var(--searchbox-border-color)}.searchbox-results-text{color:var(--searchbox-muted-color);padding:var(--searchbox-spacer)}.searchbox-results-load-more{color:var(--searchbox-muted-color)}.searchbox-results-load-more button{background:transparent;border:none;box-shadow:none;color:currentColor;cursor:pointer;font-size:0.8rem;outline:none;margin:0;padding:var(--searchbox-spacer);width:100%}.searchbox-results-item:not(:last-child){border-bottom:1px solid var(--searchbox-border-color)}.searchbox-results-link{display:flex;padding:var(--searchbox-spacer);text-decoration:none}.searchbox-results-link:hover{text-decoration:none}.searchbox-results-link.focus,.searchbox-results-link:hover{background-color:var(--searchbox-active-bg-color)}.searchbox-results-image{color:var(--searchbox-muted-color);margin-right:var(--searchbox-spacer)}.searchbox-results-excerpt{color:var(--searchbox-muted-color);font-size:0.8rem;margin-top:var(--searchbox-spacer)}.searchbox-results-excerpt code{font-size:0.8rem}.searchbox-results-excerpt h1,.searchbox-results-excerpt h2,.searchbox-results-excerpt h3,.searchbox-results-excerpt h4,.searchbox-results-excerpt h5,.searchbox-results-excerpt h6{font-size:0.8rem}.searchbox-results-excerpt p{margin-top:0}.searchbox-results-excerpt p:last-child{margin-bottom:0}.searchbox-results-expand{background-color:var(--searchbox-muted-bg-color);color:var(--searchbox-active-color)}.searchbox-results-expand button{background:transparent;border:none;box-shadow:none;color:currentColor;cursor:pointer;font-size:0.8rem;outline:none;margin:0;padding:var(--searchbox-spacer)}.searchbox-results-item-expanded .searchbox-results-expand{color:var(--searchbox-muted-color)}.searchbox-results-label{border:1px solid var(--searchbox-border-color);border-radius:1rem;color:var(--searchbox-muted-color);font-size:0.8rem;margin-left:var(--searchbox-spacer);padding:2px 6px}.searchbox-dropdown{background:white;border:1px solid var(--searchbox-border-color);display:flex;flex-direction:column;height:0;overflow:hidden;position:fixed;transition:height 0.3s;z-index:10000}");
}
function kt(n) {
  let e, t, r = {
    anchor: (
      /*anchor*/
      n[2]
    ),
    align: (
      /*align*/
      n[1]
    ),
    input: (
      /*input*/
      n[11]
    ),
    width: (
      /*width*/
      n[5]
    ),
    $$slots: { default: [Bn] },
    $$scope: { ctx: n }
  };
  return e = new Nt({ props: r }), n[35](e), {
    c() {
      _e(e.$$.fragment);
    },
    m(s, i) {
      ce(e, s, i), t = !0;
    },
    p(s, i) {
      const o = {};
      i[0] & /*anchor*/
      4 && (o.anchor = /*anchor*/
      s[2]), i[0] & /*align*/
      2 && (o.align = /*align*/
      s[1]), i[0] & /*input*/
      2048 && (o.input = /*input*/
      s[11]), i[0] & /*width*/
      32 && (o.width = /*width*/
      s[5]), i[0] & /*renderers, loading, error, suggestions, suggestionsResult, result, dropdownResults, category*/
      29977 | i[1] & /*$$scope*/
      64 && (o.$$scope = { dirty: i, ctx: s }), e.$set(o);
    },
    i(s) {
      t || (N(e.$$.fragment, s), t = !0);
    },
    o(s) {
      B(e.$$.fragment, s), t = !1;
    },
    d(s) {
      n[35](null), ue(e, s);
    }
  };
}
function Bn(n) {
  let e, t, r;
  function s(o) {
    n[32](o);
  }
  let i = {
    renderers: (
      /*renderers*/
      n[3]
    ),
    i18n: (
      /*i18n*/
      n[15]
    ),
    loading: (
      /*loading*/
      n[12]
    ),
    message: (
      /*error*/
      n[10]
    ),
    result: (
      /*suggestions*/
      n[4] ? (
        /*suggestionsResult*/
        n[14]
      ) : (
        /*result*/
        n[13]
      )
    )
  };
  return (
    /*category*/
    n[0] !== void 0 && (i.category = /*category*/
    n[0]), e = new qe({ props: i }), n[31](e), ee.push(() => gn(e, "category", s)), e.$on(
      "category",
      /*category_handler*/
      n[33]
    ), e.$on(
      "selection",
      /*selection_handler*/
      n[34]
    ), {
      c() {
        _e(e.$$.fragment);
      },
      m(o, l) {
        ce(e, o, l), r = !0;
      },
      p(o, l) {
        const c = {};
        l[0] & /*renderers*/
        8 && (c.renderers = /*renderers*/
        o[3]), l[0] & /*loading*/
        4096 && (c.loading = /*loading*/
        o[12]), l[0] & /*error*/
        1024 && (c.message = /*error*/
        o[10]), l[0] & /*suggestions, suggestionsResult, result*/
        24592 && (c.result = /*suggestions*/
        o[4] ? (
          /*suggestionsResult*/
          o[14]
        ) : (
          /*result*/
          o[13]
        )), !t && l[0] & /*category*/
        1 && (t = !0, c.category = /*category*/
        o[0], fn(() => t = !1)), e.$set(c);
      },
      i(o) {
        r || (N(e.$$.fragment, o), r = !0);
      },
      o(o) {
        B(e.$$.fragment, o), r = !1;
      },
      d(o) {
        n[31](null), ue(e, o);
      }
    }
  );
}
function In(n) {
  let e, t, r;
  const s = (
    /*#slots*/
    n[30].default
  ), i = Et(
    s,
    n,
    /*$$scope*/
    n[37],
    null
  );
  let o = (
    /*showDropdown*/
    n[6] && kt(n)
  ), l = [
    /*$$restProps*/
    n[18]
  ], c = {};
  for (let f = 0; f < l.length; f += 1)
    c = Ce(c, l[f]);
  return {
    c() {
      e = T("div"), i && i.c(), t = G(), o && o.c(), rt(e, c);
    },
    m(f, d) {
      D(f, e, d), i && i.m(e, null), A(e, t), o && o.m(e, null), n[36](e), r = !0;
    },
    p(f, d) {
      i && i.p && (!r || d[1] & /*$$scope*/
      64) && St(
        i,
        s,
        f,
        /*$$scope*/
        f[37],
        r ? Tt(
          s,
          /*$$scope*/
          f[37],
          d,
          null
        ) : Lt(
          /*$$scope*/
          f[37]
        ),
        null
      ), /*showDropdown*/
      f[6] ? o ? (o.p(f, d), d[0] & /*showDropdown*/
      64 && N(o, 1)) : (o = kt(f), o.c(), N(o, 1), o.m(e, null)) : o && (he(), B(o, 1, 1, () => {
        o = null;
      }), ge()), rt(e, c = hn(l, [d[0] & /*$$restProps*/
      262144 && /*$$restProps*/
      f[18]]));
    },
    i(f) {
      r || (N(i, f), N(o), r = !0);
    },
    o(f) {
      B(i, f), B(o), r = !1;
    },
    d(f) {
      f && L(e), i && i.d(f), o && o.d(), n[36](null);
    }
  };
}
function Mn(n, e, t) {
  const r = [
    "align",
    "anchor",
    "category",
    "customSearch",
    "dropdownDelay",
    "groupBy",
    "filters",
    "image",
    "limit",
    "pagefind",
    "renderers",
    "results",
    "sort",
    "strings",
    "suggestions",
    "transform",
    "width"
  ];
  let s = nt(e, r), { $$slots: i = {}, $$scope: o } = e, { align: l = void 0 } = e, { anchor: c = void 0 } = e, { category: f = "*" } = e, { customSearch: d = void 0 } = e, { dropdownDelay: g = void 0 } = e, { groupBy: E = void 0 } = e, { filters: a = void 0 } = e, { image: _ = void 0 } = e, { limit: v = 100 } = e, { pagefind: y } = e, { renderers: m = void 0 } = e, { results: p = void 0 } = e, { sort: S = void 0 } = e, { strings: W = void 0 } = e, { suggestions: k = !1 } = e, { transform: C = void 0 } = e, { width: q = void 0 } = e;
  const h = yt(Pt, 150), O = yt(Bt, 10);
  let V, I, Q, te, oe = null, ne = !1, ie, b = Object.assign({}, Nn, W || {}), w, z = !1, R, F, M = null, P = !1, pe, X;
  Dt(() => {
    document.removeEventListener("scroll", Ue), w.removeEventListener("focus", Je), w.removeEventListener("blur", Ve), w.removeEventListener("input", Ge), w.removeEventListener("keydown", Ke), ie && ie.removeEventListener("submit", We), X && X.$destroy();
  }), Re(() => {
    y ? import(
      /* @vite-ignore */
      y
    ).then((u) => {
      if (!u || typeof u.search != "function")
        throw new Error(`Imported module ${y} is not a recognizable Pagefind module.`);
      R = u;
    }).catch((u) => {
      Fe(u);
    }) : Fe("Parameter 'pagefind' is empty."), It(), ie = w.closest("form"), document.addEventListener("scroll", Ue), w.addEventListener("focus", Je), w.addEventListener("blur", Ve), w.addEventListener("input", Ge), w.addEventListener("keydown", Ke), ie && ie.addEventListener("submit", We), p && (te = document.querySelector(p), te.innerHTML = "", X = new qe({
      target: te,
      props: { category: f, i18n: b }
    }), X.$on("category", (u) => {
      Ie(u.detail);
    }));
  });
  function Fe(u) {
    t(10, oe = String(u)), console.log(u);
  }
  function Bt() {
    requestAnimationFrame(() => {
      V && P && V.position();
    });
  }
  function It() {
    t(11, w = Q.parentElement.querySelector("input")), w || (t(11, w = document.createElement("input")), t(11, w.type = "search", w), Q.parentElement.appendChild(w));
  }
  async function Mt(u) {
    return t(12, z = !0), M = null, d(u, !0).then((j) => {
      t(14, pe = Xe(j));
    }).finally(() => {
      t(12, z = !1);
    });
  }
  async function Be(u) {
    return t(12, z = !0), M = null, (d ? d(u, !1) : jt(u)).then((j) => {
      t(0, f = "*"), t(13, F = Xe(j)), X ? X.$set({ category: f, result: F }) : requestAnimationFrame(() => {
        I && P && I.scrollToTop(), O();
      });
    }).finally(() => {
      t(12, z = !1);
    });
  }
  function Ie(u) {
    t(0, f = u), I && P && I.scrollToTop(), X && X.$set({ category: f });
  }
  function Ue() {
    P && O();
  }
  function We(u) {
    u.preventDefault(), Be(w.value.trim());
  }
  function Ve() {
    ne = !1, requestAnimationFrame(() => {
      ne || t(6, P = !1);
    });
  }
  function Je() {
    ne = !0, (z || F != null && F.items) && setTimeout(
      () => {
        ne && t(6, P = !0);
      },
      g || 0
    );
  }
  function Ke(u) {
    var J, j;
    u.key === "Enter" ? (J = M == null ? void 0 : M.doc) != null && J.link ? location.assign((j = M == null ? void 0 : M.doc) == null ? void 0 : j.link) : (Be(w.value.trim()), w.blur()) : u.key === "Escape" ? ne && (u.preventDefault(), w.blur()) : u.key === "ArrowUp" || u.key === "Tab" && u.shiftKey ? (u.preventDefault(), I == null || I.navigateItems(-1)) : u.key === "ArrowDown" || u.key === "Tab" ? (u.preventDefault(), I == null || I.navigateItems(1)) : u.key === "Shift" ? u.preventDefault() : h(w.value.trim());
  }
  function Ge() {
    h(w.value.trim());
  }
  function Qe(u) {
    k ? (t(11, w.value = u.doc.suggestion || u.doc.title, w), w.setSelectionRange(w.value.length, w.value.length)) : M = u;
  }
  function Pt(u) {
    u ? (ne && !P && t(6, P = !0), k ? Mt(u) : Be(u)) : (t(13, F = null), P && t(6, P = !1));
  }
  async function jt(u) {
    let J = [];
    if (y) {
      const j = await R.search(u, { filters: a, sort: S });
      J = (await Promise.all(j.results.slice(0, v).map(async (U) => ({ id: U.id, data: await U.data() })))).map((U) => {
        var xe, Ye, Ze;
        return {
          ref: U.id,
          doc: {
            category: f ? (xe = U.data.filters[f]) == null ? void 0 : xe[0] : void 0,
            image: _ ? (Ye = U.data.meta) == null ? void 0 : Ye[_] : void 0,
            link: U.data.url,
            title: (Ze = U.data.meta) == null ? void 0 : Ze.title,
            excerpt: U.data.excerpt
          }
        };
      });
    }
    return { items: J };
  }
  function Xe(u) {
    return C && (u.items = u.items.map((J) => (J.doc = C(J.doc, J, u), J))), E && (u = Ht(u)), u;
  }
  function Ht(u) {
    const J = u.items.reduce(
      (j, Z) => {
        const U = typeof E == "function" ? E(Z.doc) : Z.doc[E];
        return j.set(U, [...j.get(U) || [], Z]), j;
      },
      /* @__PURE__ */ new Map()
    );
    return u.items = [...J.values()].reduce(
      (j, Z) => (j.push({ ...Z[0], children: Z.slice(1) }), j),
      []
    ).sort((j, Z) => {
      var U, xe;
      return ((U = j.children) == null ? void 0 : U.length) > ((xe = Z.children) == null ? void 0 : xe.length) ? -1 : 1;
    }), u;
  }
  function zt(u) {
    ee[u ? "unshift" : "push"](() => {
      I = u, t(8, I);
    });
  }
  function Rt(u) {
    f = u, t(0, f);
  }
  const qt = (u) => Ie(u.detail), Ft = (u) => Qe(u.detail);
  function Ut(u) {
    ee[u ? "unshift" : "push"](() => {
      V = u, t(7, V);
    });
  }
  function Wt(u) {
    ee[u ? "unshift" : "push"](() => {
      Q = u, t(9, Q);
    });
  }
  return n.$$set = (u) => {
    e = Ce(Ce({}, e), Gt(u)), t(18, s = nt(e, r)), "align" in u && t(1, l = u.align), "anchor" in u && t(2, c = u.anchor), "category" in u && t(0, f = u.category), "customSearch" in u && t(19, d = u.customSearch), "dropdownDelay" in u && t(20, g = u.dropdownDelay), "groupBy" in u && t(21, E = u.groupBy), "filters" in u && t(22, a = u.filters), "image" in u && t(23, _ = u.image), "limit" in u && t(24, v = u.limit), "pagefind" in u && t(25, y = u.pagefind), "renderers" in u && t(3, m = u.renderers), "results" in u && t(26, p = u.results), "sort" in u && t(27, S = u.sort), "strings" in u && t(28, W = u.strings), "suggestions" in u && t(4, k = u.suggestions), "transform" in u && t(29, C = u.transform), "width" in u && t(5, q = u.width), "$$scope" in u && t(37, o = u.$$scope);
  }, n.$$.update = () => {
    n.$$.dirty[0] & /*showDropdown*/
    64 && P && O();
  }, [
    f,
    l,
    c,
    m,
    k,
    q,
    P,
    V,
    I,
    Q,
    oe,
    w,
    z,
    F,
    pe,
    b,
    Ie,
    Qe,
    s,
    d,
    g,
    E,
    a,
    _,
    v,
    y,
    p,
    S,
    W,
    C,
    i,
    zt,
    Rt,
    qt,
    Ft,
    Ut,
    Wt,
    o
  ];
}
class Pn extends Te {
  constructor(e) {
    super(), Ee(
      this,
      e,
      Mn,
      In,
      ve,
      {
        align: 1,
        anchor: 2,
        category: 0,
        customSearch: 19,
        dropdownDelay: 20,
        groupBy: 21,
        filters: 22,
        image: 23,
        limit: 24,
        pagefind: 25,
        renderers: 3,
        results: 26,
        sort: 27,
        strings: 28,
        suggestions: 4,
        transform: 29,
        width: 5
      },
      On,
      [-1, -1]
    );
  }
  get align() {
    return this.$$.ctx[1];
  }
  set align(e) {
    this.$$set({ align: e }), x();
  }
  get anchor() {
    return this.$$.ctx[2];
  }
  set anchor(e) {
    this.$$set({ anchor: e }), x();
  }
  get category() {
    return this.$$.ctx[0];
  }
  set category(e) {
    this.$$set({ category: e }), x();
  }
  get customSearch() {
    return this.$$.ctx[19];
  }
  set customSearch(e) {
    this.$$set({ customSearch: e }), x();
  }
  get dropdownDelay() {
    return this.$$.ctx[20];
  }
  set dropdownDelay(e) {
    this.$$set({ dropdownDelay: e }), x();
  }
  get groupBy() {
    return this.$$.ctx[21];
  }
  set groupBy(e) {
    this.$$set({ groupBy: e }), x();
  }
  get filters() {
    return this.$$.ctx[22];
  }
  set filters(e) {
    this.$$set({ filters: e }), x();
  }
  get image() {
    return this.$$.ctx[23];
  }
  set image(e) {
    this.$$set({ image: e }), x();
  }
  get limit() {
    return this.$$.ctx[24];
  }
  set limit(e) {
    this.$$set({ limit: e }), x();
  }
  get pagefind() {
    return this.$$.ctx[25];
  }
  set pagefind(e) {
    this.$$set({ pagefind: e }), x();
  }
  get renderers() {
    return this.$$.ctx[3];
  }
  set renderers(e) {
    this.$$set({ renderers: e }), x();
  }
  get results() {
    return this.$$.ctx[26];
  }
  set results(e) {
    this.$$set({ results: e }), x();
  }
  get sort() {
    return this.$$.ctx[27];
  }
  set sort(e) {
    this.$$set({ sort: e }), x();
  }
  get strings() {
    return this.$$.ctx[28];
  }
  set strings(e) {
    this.$$set({ strings: e }), x();
  }
  get suggestions() {
    return this.$$.ctx[4];
  }
  set suggestions(e) {
    this.$$set({ suggestions: e }), x();
  }
  get transform() {
    return this.$$.ctx[29];
  }
  set transform(e) {
    this.$$set({ transform: e }), x();
  }
  get width() {
    return this.$$.ctx[5];
  }
  set width(e) {
    this.$$set({ width: e }), x();
  }
}
customElements.define("search-box", $e(Pn, { align: {}, anchor: {}, category: {}, customSearch: {}, dropdownDelay: {}, groupBy: {}, filters: {}, image: {}, limit: {}, pagefind: {}, renderers: {}, results: {}, sort: {}, strings: {}, suggestions: { type: "Boolean" }, transform: {}, width: {} }, ["default"], [], !1));
export {
  Pn as default
};
