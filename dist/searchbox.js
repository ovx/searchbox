var Jt = Object.defineProperty;
var Kt = (n, e, t) => e in n ? Jt(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var z = (n, e, t) => (Kt(n, typeof e != "symbol" ? e + "" : e, t), t);
function J() {
}
function Ae(n, e) {
  for (const t in e)
    n[t] = e[t];
  return (
    /** @type {T & S} */
    n
  );
}
function vt(n) {
  return n();
}
function tt() {
  return /* @__PURE__ */ Object.create(null);
}
function ke(n) {
  n.forEach(vt);
}
function Et(n) {
  return typeof n == "function";
}
function we(n, e) {
  return n != n ? e == e : n !== e || n && typeof n == "object" || typeof n == "function";
}
let Le;
function nt(n, e) {
  return n === e ? !0 : (Le || (Le = document.createElement("a")), Le.href = e, n === Le.href);
}
function Gt(n) {
  return Object.keys(n).length === 0;
}
function $t(n, e, t, r) {
  if (n) {
    const s = Tt(n, e, t, r);
    return n[0](s);
  }
}
function Tt(n, e, t, r) {
  return n[1] && r ? Ae(t.ctx.slice(), n[1](r(e))) : t.ctx;
}
function St(n, e, t, r) {
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
function Lt(n, e, t, r, s, i) {
  if (s) {
    const o = Tt(e, t, r, i);
    n.p(o, s);
  }
}
function Dt(n) {
  if (n.ctx.length > 32) {
    const e = [], t = n.ctx.length / 32;
    for (let r = 0; r < t; r++)
      e[r] = -1;
    return e;
  }
  return -1;
}
function Qt(n) {
  const e = {};
  for (const t in n)
    t[0] !== "$" && (e[t] = n[t]);
  return e;
}
function rt(n, e) {
  const t = {};
  e = new Set(e);
  for (const r in n)
    !e.has(r) && r[0] !== "$" && (t[r] = n[r]);
  return t;
}
function A(n, e) {
  n.appendChild(e);
}
function Xt(n, e, t) {
  const r = Yt(n);
  if (!r.getElementById(e)) {
    const s = T("style");
    s.id = e, s.textContent = t, Zt(r, s);
  }
}
function Yt(n) {
  if (!n)
    return document;
  const e = n.getRootNode ? n.getRootNode() : n.ownerDocument;
  return e && /** @type {ShadowRoot} */
  e.host ? (
    /** @type {ShadowRoot} */
    e
  ) : n.ownerDocument;
}
function Zt(n, e) {
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
function Re(n, e) {
  for (let t = 0; t < n.length; t += 1)
    n[t] && n[t].d(e);
}
function T(n) {
  return document.createElement(n);
}
function en(n) {
  return document.createElementNS("http://www.w3.org/2000/svg", n);
}
function Z(n) {
  return document.createTextNode(n);
}
function G() {
  return Z(" ");
}
function Ne() {
  return Z("");
}
function oe(n, e, t, r) {
  return n.addEventListener(e, t, r), () => n.removeEventListener(e, t, r);
}
function tn(n) {
  return function(e) {
    return e.preventDefault(), n.call(this, e);
  };
}
function $(n, e, t) {
  t == null ? n.removeAttribute(e) : n.getAttribute(e) !== t && n.setAttribute(e, t);
}
const nn = ["width", "height"];
function st(n, e) {
  const t = Object.getOwnPropertyDescriptors(n.__proto__);
  for (const r in e)
    e[r] == null ? n.removeAttribute(r) : r === "style" ? n.style.cssText = e[r] : r === "__value" ? n.value = n[r] = e[r] : t[r] && t[r].set && nn.indexOf(r) === -1 ? n[r] = e[r] : $(n, r, e[r]);
}
function rn(n) {
  return Array.from(n.childNodes);
}
function ie(n, e) {
  e = "" + e, n.data !== e && (n.data = /** @type {string} */
  e);
}
function me(n, e, t) {
  n.classList.toggle(e, !!t);
}
function sn(n, e, { bubbles: t = !1, cancelable: r = !1 } = {}) {
  return new CustomEvent(n, { detail: e, bubbles: t, cancelable: r });
}
class on {
  constructor(e = !1) {
    /**
     * @private
     * @default false
     */
    z(this, "is_svg", !1);
    /** parent for creating node */
    z(this, "e");
    /** html tag nodes */
    z(this, "n");
    /** target */
    z(this, "t");
    /** anchor */
    z(this, "a");
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
    this.e || (this.is_svg ? this.e = en(
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
function ln(n) {
  const e = {};
  return n.childNodes.forEach(
    /** @param {Element} node */
    (t) => {
      e[t.slot || "default"] = !0;
    }
  ), e;
}
let xe;
function ye(n) {
  xe = n;
}
function Oe() {
  if (!xe)
    throw new Error("Function called outside component initialization");
  return xe;
}
function qe(n) {
  Oe().$$.on_mount.push(n);
}
function cn(n) {
  Oe().$$.after_update.push(n);
}
function Ct(n) {
  Oe().$$.on_destroy.push(n);
}
function At() {
  const n = Oe();
  return (e, t, { cancelable: r = !1 } = {}) => {
    const s = n.$$.callbacks[e];
    if (s) {
      const i = sn(
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
const ae = [], te = [];
let de = [];
const je = [], un = /* @__PURE__ */ Promise.resolve();
let He = !1;
function fn() {
  He || (He = !0, un.then(y));
}
function ze(n) {
  de.push(n);
}
function an(n) {
  je.push(n);
}
const Pe = /* @__PURE__ */ new Set();
let fe = 0;
function y() {
  if (fe !== 0)
    return;
  const n = xe;
  do {
    try {
      for (; fe < ae.length; ) {
        const e = ae[fe];
        fe++, ye(e), dn(e.$$);
      }
    } catch (e) {
      throw ae.length = 0, fe = 0, e;
    }
    for (ye(null), ae.length = 0, fe = 0; te.length; )
      te.pop()();
    for (let e = 0; e < de.length; e += 1) {
      const t = de[e];
      Pe.has(t) || (Pe.add(t), t());
    }
    de.length = 0;
  } while (ae.length);
  for (; je.length; )
    je.pop()();
  He = !1, Pe.clear(), ye(n);
}
function dn(n) {
  if (n.fragment !== null) {
    n.update(), ke(n.before_update);
    const e = n.dirty;
    n.dirty = [-1], n.fragment && n.fragment.p(n.ctx, e), n.after_update.forEach(ze);
  }
}
function hn(n) {
  const e = [], t = [];
  de.forEach((r) => n.indexOf(r) === -1 ? e.push(r) : t.push(r)), t.forEach((r) => r()), de = e;
}
const De = /* @__PURE__ */ new Set();
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
  le.r || ke(le.c), le = le.p;
}
function N(n, e) {
  n && n.i && (De.delete(n), n.i(e));
}
function M(n, e, t, r) {
  if (n && n.o) {
    if (De.has(n))
      return;
    De.add(n), le.c.push(() => {
      De.delete(n), r && (t && n.d(1), r());
    }), n.o(e);
  } else
    r && r();
}
function be(n) {
  return (n == null ? void 0 : n.length) !== void 0 ? n : Array.from(n);
}
function gn(n, e) {
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
function mn(n, e, t) {
  const r = n.$$.props[e];
  r !== void 0 && (n.$$.bound[r] = t, t(n.$$.ctx[r]));
}
function _e(n) {
  n && n.c();
}
function ce(n, e, t) {
  const { fragment: r, after_update: s } = n.$$;
  r && r.m(e, t), ze(() => {
    const i = n.$$.on_mount.map(vt).filter(Et);
    n.$$.on_destroy ? n.$$.on_destroy.push(...i) : ke(i), n.$$.on_mount = [];
  }), s.forEach(ze);
}
function ue(n, e) {
  const t = n.$$;
  t.fragment !== null && (hn(t.after_update), ke(t.on_destroy), t.fragment && t.fragment.d(e), t.on_destroy = t.fragment = null, t.ctx = []);
}
function bn(n, e) {
  n.$$.dirty[0] === -1 && (ae.push(n), fn(), n.$$.dirty.fill(0)), n.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ve(n, e, t, r, s, i, o = null, l = [-1]) {
  const c = xe;
  ye(n);
  const a = n.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: i,
    update: J,
    not_equal: s,
    bound: tt(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (c ? c.$$.context : [])),
    // everything else
    callbacks: tt(),
    dirty: l,
    skip_bound: !1,
    root: e.target || c.$$.root
  };
  o && o(a.root);
  let d = !1;
  if (a.ctx = t ? t(n, e.props || {}, (g, E, ...f) => {
    const _ = f.length ? f[0] : E;
    return a.ctx && s(a.ctx[g], a.ctx[g] = _) && (!a.skip_bound && a.bound[g] && a.bound[g](_), d && bn(n, g)), E;
  }) : [], a.update(), d = !0, ke(a.before_update), a.fragment = r ? r(a.ctx) : !1, e.target) {
    if (e.hydrate) {
      const g = rn(e.target);
      a.fragment && a.fragment.l(g), g.forEach(L);
    } else
      a.fragment && a.fragment.c();
    e.intro && N(n.$$.fragment), ce(n, e.target, e.anchor), y();
  }
  ye(c);
}
let Nt;
typeof HTMLElement == "function" && (Nt = class extends HTMLElement {
  constructor(e, t, r) {
    super();
    /** The Svelte component constructor */
    z(this, "$$ctor");
    /** Slots */
    z(this, "$$s");
    /** The Svelte component instance */
    z(this, "$$c");
    /** Whether or not the custom element is connected */
    z(this, "$$cn", !1);
    /** Component props data */
    z(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    z(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    z(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    z(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    z(this, "$$l_u", /* @__PURE__ */ new Map());
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
            m: function(a, d) {
              D(a, o, d);
            },
            d: function(a) {
              a && L(o);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn)
        return;
      const t = {}, r = ln(this);
      for (const i of this.$$s)
        i in r && (t[i] = [e(i)]);
      for (const i of this.attributes) {
        const o = this.$$g_p(i.name);
        o in this.$$d || (this.$$d[o] = Ce(o, i.value, this.$$p_d, "toProp"));
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
            const o = Ce(
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
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = Ce(e, r, this.$$p_d, "toProp"), (s = this.$$c) == null || s.$set({ [e]: this.$$d[e] }));
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
function Ce(n, e, t, r) {
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
function Ee(n, e, t, r, s, i) {
  let o = class extends Nt {
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
        var a;
        c = Ce(l, c, e), this.$$d[l] = c, (a = this.$$c) == null || a.$set({ [l]: c });
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
class $e {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    z(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    z(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    ue(this, 1), this.$destroy = J;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, t) {
    if (!Et(t))
      return J;
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
    this.$$set && !Gt(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const _n = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(_n);
function pn(n) {
  let e, t, r, s;
  const i = (
    /*#slots*/
    n[10].default
  ), o = $t(
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
      D(l, e, c), o && o.m(e, null), n[11](e), t = !0, r || (s = oe(e, "mousedown", yn), r = !0);
    },
    p(l, [c]) {
      o && o.p && (!t || c & /*$$scope*/
      512) && Lt(
        o,
        i,
        l,
        /*$$scope*/
        l[9],
        t ? St(
          i,
          /*$$scope*/
          l[9],
          c,
          null
        ) : Dt(
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
      M(o, l), t = !1;
    },
    d(l) {
      l && L(e), o && o.d(l), n[11](null), r = !1, s();
    }
  };
}
function yn(n) {
  n.currentTarget.tagName !== "A" && n.preventDefault();
}
function xn(n, e, t) {
  let r, { $$slots: s = {}, $$scope: i } = e, { align: o = "left" } = e, { anchor: l = null } = e, { offset: c = [0, -1] } = e, { animationDuration: a = 350 } = e, { input: d } = e, { pageOffset: g = 20 } = e, { width: E = null } = e, f, _;
  Ct(() => {
    _ && _.classList.remove("searchbox-dropdown-visible");
  }), qe(() => {
    _ = l ? document.querySelector(l) : d;
  });
  function v() {
    if (_ && f) {
      const m = _.getBoundingClientRect(), p = document.documentElement.clientHeight, S = document.documentElement.clientWidth, V = parseInt(r.borderTopWidth, 10) + parseInt(r.borderBottomWidth, 10), x = Math.min(p - g * 2, p - g - m.bottom);
      t(0, f.style.width = `${E || m.width + "px"}`, f), t(0, f.style.top = `${m.bottom + c[1]}px`, f), o === "right" ? (t(0, f.style.left = "auto", f), t(0, f.style.right = `${S - (m.right + c[0])}px`, f)) : (t(0, f.style.left = `${m.left + c[0]}px`, f), t(0, f.style.right = "auto", f)), t(0, f.style.maxHeight = `${x}px`, f);
      const C = [...f.childNodes].reduce(
        (q, h) => h instanceof Element ? q + Math.max(h.getBoundingClientRect().height, h.scrollHeight) : q,
        V
      );
      t(0, f.style.height = `${Math.min(x, C)}px`, f), _.classList.add("searchbox-dropdown-visible"), setTimeout(
        () => {
          f && t(0, f.style.height = "auto", f);
        },
        a
      );
    }
  }
  function k(m) {
    te[m ? "unshift" : "push"](() => {
      f = m, t(0, f);
    });
  }
  return n.$$set = (m) => {
    "align" in m && t(1, o = m.align), "anchor" in m && t(2, l = m.anchor), "offset" in m && t(3, c = m.offset), "animationDuration" in m && t(4, a = m.animationDuration), "input" in m && t(5, d = m.input), "pageOffset" in m && t(6, g = m.pageOffset), "width" in m && t(7, E = m.width), "$$scope" in m && t(9, i = m.$$scope);
  }, n.$$.update = () => {
    n.$$.dirty & /*el*/
    1 && (r = f && getComputedStyle(f));
  }, [
    f,
    o,
    l,
    c,
    a,
    d,
    g,
    E,
    v,
    i,
    s,
    k
  ];
}
class Ot extends $e {
  constructor(e) {
    super(), ve(this, e, xn, pn, we, {
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
    this.$$set({ align: e }), y();
  }
  get anchor() {
    return this.$$.ctx[2];
  }
  set anchor(e) {
    this.$$set({ anchor: e }), y();
  }
  get offset() {
    return this.$$.ctx[3];
  }
  set offset(e) {
    this.$$set({ offset: e }), y();
  }
  get animationDuration() {
    return this.$$.ctx[4];
  }
  set animationDuration(e) {
    this.$$set({ animationDuration: e }), y();
  }
  get input() {
    return this.$$.ctx[5];
  }
  set input(e) {
    this.$$set({ input: e }), y();
  }
  get pageOffset() {
    return this.$$.ctx[6];
  }
  set pageOffset(e) {
    this.$$set({ pageOffset: e }), y();
  }
  get width() {
    return this.$$.ctx[7];
  }
  set width(e) {
    this.$$set({ width: e }), y();
  }
  get position() {
    return this.$$.ctx[8];
  }
}
Ee(Ot, { align: {}, anchor: {}, offset: {}, animationDuration: {}, input: {}, pageOffset: {}, width: {} }, ["default"], ["position"], !0);
function kn(n) {
  let e;
  return {
    c() {
      e = T("div");
    },
    m(t, r) {
      D(t, e, r), n[3](e);
    },
    p: J,
    i: J,
    o: J,
    d(t) {
      t && L(e), n[3](null);
    }
  };
}
function wn(n, e, t) {
  let r, { args: s } = e, { renderer: i } = e, o;
  cn(() => {
    r instanceof Element ? o.replaceWith(r) : r && t(0, o.innerHTML = r, o);
  });
  function l(c) {
    te[c ? "unshift" : "push"](() => {
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
class Be extends $e {
  constructor(e) {
    super(), ve(this, e, wn, kn, we, { args: 1, renderer: 2 });
  }
  get args() {
    return this.$$.ctx[1];
  }
  set args(e) {
    this.$$set({ args: e }), y();
  }
  get renderer() {
    return this.$$.ctx[2];
  }
  set renderer(e) {
    this.$$set({ renderer: e }), y();
  }
}
Ee(Be, { args: {}, renderer: {} }, [], [], !0);
function ot(n, e, t) {
  const r = n.slice();
  return r[10] = e[t], r;
}
function vn(n) {
  var S, V;
  let e, t, r, s, i, o = (
    /*item*/
    n[3].doc.title + ""
  ), l, c, a, d, g, E, f, _, v = (
    /*item*/
    n[3].doc.image && it(n)
  ), k = (
    /*labels*/
    ((S = n[5]) == null ? void 0 : S.length) && lt(n)
  ), m = (
    /*item*/
    n[3].doc.excerpt && ut(n)
  ), p = !/*forceExpanded*/
  n[1] && /*item*/
  ((V = n[3].children) == null ? void 0 : V.length) && ft(n);
  return {
    c() {
      e = T("a"), v && v.c(), t = G(), r = T("div"), s = T("div"), i = new on(!1), l = G(), k && k.c(), c = G(), m && m.c(), g = G(), p && p.c(), E = Ne(), i.a = l, $(s, "class", "searchbox-results-title"), $(e, "href", a = /*item*/
      n[3].doc.link), $(e, "class", "searchbox-results-link"), $(e, "tabindex", "-1"), $(e, "data-ref", d = /*item*/
      n[3].ref);
    },
    m(x, C) {
      D(x, e, C), v && v.m(e, null), A(e, t), A(e, r), A(r, s), i.m(o, s), A(s, l), k && k.m(s, null), A(r, c), m && m.m(r, null), D(x, g, C), p && p.m(x, C), D(x, E, C), f || (_ = oe(
        e,
        "click",
        /*onClick*/
        n[6]
      ), f = !0);
    },
    p(x, C) {
      var q, h;
      /*item*/
      x[3].doc.image ? v ? v.p(x, C) : (v = it(x), v.c(), v.m(e, t)) : v && (v.d(1), v = null), C & /*item*/
      8 && o !== (o = /*item*/
      x[3].doc.title + "") && i.p(o), /*labels*/
      (q = x[5]) != null && q.length ? k ? k.p(x, C) : (k = lt(x), k.c(), k.m(s, null)) : k && (k.d(1), k = null), /*item*/
      x[3].doc.excerpt ? m ? m.p(x, C) : (m = ut(x), m.c(), m.m(r, null)) : m && (m.d(1), m = null), C & /*item*/
      8 && a !== (a = /*item*/
      x[3].doc.link) && $(e, "href", a), C & /*item*/
      8 && d !== (d = /*item*/
      x[3].ref) && $(e, "data-ref", d), !/*forceExpanded*/
      x[1] && /*item*/
      ((h = x[3].children) != null && h.length) ? p ? p.p(x, C) : (p = ft(x), p.c(), p.m(E.parentNode, E)) : p && (p.d(1), p = null);
    },
    i: J,
    o: J,
    d(x) {
      x && (L(e), L(g), L(E)), v && v.d(), k && k.d(), m && m.d(), p && p.d(x), f = !1, _();
    }
  };
}
function En(n) {
  let e, t;
  return e = new Be({
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
      M(e.$$.fragment, r), t = !1;
    },
    d(r) {
      ue(e, r);
    }
  };
}
function it(n) {
  let e, t, r;
  return {
    c() {
      e = T("div"), t = T("img"), nt(t.src, r = /*item*/
      n[3].doc.image) || $(t, "src", r), $(t, "alt", ""), $(t, "width", "48"), $(e, "class", "searchbox-results-image");
    },
    m(s, i) {
      D(s, e, i), A(e, t);
    },
    p(s, i) {
      i & /*item*/
      8 && !nt(t.src, r = /*item*/
      s[3].doc.image) && $(t, "src", r);
    },
    d(s) {
      s && L(e);
    }
  };
}
function lt(n) {
  let e, t = be(
    /*labels*/
    n[5]
  ), r = [];
  for (let s = 0; s < t.length; s += 1)
    r[s] = ct(ot(n, t, s));
  return {
    c() {
      for (let s = 0; s < r.length; s += 1)
        r[s].c();
      e = Ne();
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
          const l = ot(s, t, o);
          r[o] ? r[o].p(l, i) : (r[o] = ct(l), r[o].c(), r[o].m(e.parentNode, e));
        }
        for (; o < r.length; o += 1)
          r[o].d(1);
        r.length = t.length;
      }
    },
    d(s) {
      s && L(e), Re(r, s);
    }
  };
}
function ct(n) {
  let e, t = (
    /*label*/
    n[10] + ""
  ), r;
  return {
    c() {
      e = T("span"), r = Z(t), $(e, "class", "searchbox-results-label");
    },
    m(s, i) {
      D(s, e, i), A(e, r);
    },
    p(s, i) {
      i & /*labels*/
      32 && t !== (t = /*label*/
      s[10] + "") && ie(r, t);
    },
    d(s) {
      s && L(e);
    }
  };
}
function ut(n) {
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
function ft(n) {
  let e, t, r = (
    /*i18n*/
    n[2].more_on_this_page.replace("{count}", String(
      /*item*/
      n[3].children.length
    )) + ""
  ), s, i, o;
  return {
    c() {
      e = T("div"), t = T("button"), s = Z(r), $(t, "type", "button"), $(e, "class", "searchbox-results-expand");
    },
    m(l, c) {
      D(l, e, c), A(e, t), A(t, s), i || (o = oe(
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
      )) + "") && ie(s, r);
    },
    d(l) {
      l && L(e), i = !1, o();
    }
  };
}
function $n(n) {
  let e, t, r, s, i, o;
  const l = [En, vn], c = [];
  function a(d, g) {
    return (
      /*renderer*/
      d[4] ? 0 : 1
    );
  }
  return t = a(n), r = c[t] = l[t](n), {
    c() {
      e = T("li"), r.c(), $(e, "class", "searchbox-results-item"), me(
        e,
        "searchbox-results-item-expanded",
        /*expanded*/
        n[0]
      );
    },
    m(d, g) {
      D(d, e, g), c[t].m(e, null), s = !0, i || (o = oe(
        e,
        "click",
        /*onClick*/
        n[6]
      ), i = !0);
    },
    p(d, [g]) {
      let E = t;
      t = a(d), t === E ? c[t].p(d, g) : (he(), M(c[E], 1, 1, () => {
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
      M(r), s = !1;
    },
    d(d) {
      d && L(e), c[t].d(), i = !1, o();
    }
  };
}
function Tn(n, e, t) {
  let r, { expanded: s = !1 } = e, { forceExpanded: i = !1 } = e, { i18n: o } = e, { item: l } = e, { renderer: c = null } = e;
  const a = At();
  function d(f) {
    l.doc.link || (f.stopPropagation(), f.preventDefault(), a("click", l));
  }
  function g() {
    a("expand", l);
  }
  const E = () => g();
  return n.$$set = (f) => {
    "expanded" in f && t(0, s = f.expanded), "forceExpanded" in f && t(1, i = f.forceExpanded), "i18n" in f && t(2, o = f.i18n), "item" in f && t(3, l = f.item), "renderer" in f && t(4, c = f.renderer);
  }, n.$$.update = () => {
    var f, _, v;
    n.$$.dirty & /*item*/
    8 && t(5, r = Array.isArray((f = l == null ? void 0 : l.doc) == null ? void 0 : f.labels) ? l.doc.labels : (v = (_ = l == null ? void 0 : l.doc) == null ? void 0 : _.labels) == null ? void 0 : v.split(/[\,\;]/).filter((k) => !!k));
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
class Bt extends $e {
  constructor(e) {
    super(), ve(this, e, Tn, $n, we, {
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
    this.$$set({ expanded: e }), y();
  }
  get forceExpanded() {
    return this.$$.ctx[1];
  }
  set forceExpanded(e) {
    this.$$set({ forceExpanded: e }), y();
  }
  get i18n() {
    return this.$$.ctx[2];
  }
  set i18n(e) {
    this.$$set({ i18n: e }), y();
  }
  get item() {
    return this.$$.ctx[3];
  }
  set item(e) {
    this.$$set({ item: e }), y();
  }
  get renderer() {
    return this.$$.ctx[4];
  }
  set renderer(e) {
    this.$$set({ renderer: e }), y();
  }
}
Ee(Bt, { expanded: { type: "Boolean" }, forceExpanded: { type: "Boolean" }, i18n: {}, item: {}, renderer: {} }, [], [], !0);
function at(n, e, t) {
  const r = n.slice();
  return r[31] = e[t], r;
}
function dt(n, e, t) {
  const r = n.slice();
  return r[34] = e[t], r;
}
function ht(n) {
  let e, t, r;
  return t = new Be({
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
      M(t.$$.fragment, s), r = !1;
    },
    d(s) {
      s && L(e), ue(t);
    }
  };
}
function gt(n) {
  let e, t, r, s, i = (
    /*categories*/
    n[8].length > 2 && mt(n)
  ), o = be(
    /*categories*/
    n[8].slice(1)
  ), l = [];
  for (let c = 0; c < o.length; c += 1)
    l[c] = bt(dt(n, o, c));
  return {
    c() {
      e = T("div"), t = T("div"), r = T("ul"), i && i.c(), s = G();
      for (let c = 0; c < l.length; c += 1)
        l[c].c();
      $(t, "class", "searchbox-results-categories-wrap"), $(e, "class", "searchbox-results-categories");
    },
    m(c, a) {
      D(c, e, a), A(e, t), A(t, r), i && i.m(r, null), A(r, s);
      for (let d = 0; d < l.length; d += 1)
        l[d] && l[d].m(r, null);
    },
    p(c, a) {
      if (/*categories*/
      c[8].length > 2 ? i ? i.p(c, a) : (i = mt(c), i.c(), i.m(r, s)) : i && (i.d(1), i = null), a[0] & /*category, categories, onCategoryClick*/
      8449) {
        o = be(
          /*categories*/
          c[8].slice(1)
        );
        let d;
        for (d = 0; d < o.length; d += 1) {
          const g = dt(c, o, d);
          l[d] ? l[d].p(g, a) : (l[d] = bt(g), l[d].c(), l[d].m(r, null));
        }
        for (; d < l.length; d += 1)
          l[d].d(1);
        l.length = o.length;
      }
    },
    d(c) {
      c && L(e), i && i.d(), Re(l, c);
    }
  };
}
function mt(n) {
  let e, t, r = (
    /*i18n*/
    n[1].all + ""
  ), s, i, o;
  return {
    c() {
      e = T("li"), t = T("span"), s = Z(r), $(t, "role", "button"), me(
        t,
        "active",
        /*category*/
        n[0] === "*"
      );
    },
    m(l, c) {
      D(l, e, c), A(e, t), A(t, s), i || (o = oe(
        t,
        "click",
        /*click_handler*/
        n[20]
      ), i = !0);
    },
    p(l, c) {
      c[0] & /*i18n*/
      2 && r !== (r = /*i18n*/
      l[1].all + "") && ie(s, r), c[0] & /*category*/
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
function bt(n) {
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
      e = T("li"), t = T("span"), s = Z(r), i = G(), $(t, "role", "button"), me(
        t,
        "active",
        /*category*/
        n[0] === /*cat*/
        n[34]
      );
    },
    m(a, d) {
      D(a, e, d), A(e, t), A(t, s), A(e, i), o || (l = oe(t, "click", c), o = !0);
    },
    p(a, d) {
      n = a, d[0] & /*categories*/
      256 && r !== (r = /*cat*/
      n[34] + "") && ie(s, r), d[0] & /*category, categories*/
      257 && me(
        t,
        "active",
        /*category*/
        n[0] === /*cat*/
        n[34]
      );
    },
    d(a) {
      a && L(e), o = !1, l();
    }
  };
}
function Sn(n) {
  let e, t, r = be(
    /*slicedFilteredItems*/
    n[12]
  ), s = [];
  for (let o = 0; o < r.length; o += 1)
    s[o] = _t(at(n, r, o));
  const i = (o) => M(s[o], 1, 1, () => {
    s[o] = null;
  });
  return {
    c() {
      for (let o = 0; o < s.length; o += 1)
        s[o].c();
      e = Ne();
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
          const a = at(o, r, c);
          s[c] ? (s[c].p(a, l), N(s[c], 1)) : (s[c] = _t(a), s[c].c(), N(s[c], 1), s[c].m(e.parentNode, e));
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
        M(s[l]);
      t = !1;
    },
    d(o) {
      o && L(e), Re(s, o);
    }
  };
}
function Ln(n) {
  let e, t = (
    /*i18n*/
    n[1].no_results + ""
  ), r;
  return {
    c() {
      e = T("li"), r = Z(t), $(e, "class", "searchbox-results-text");
    },
    m(s, i) {
      D(s, e, i), A(e, r);
    },
    p(s, i) {
      i[0] & /*i18n*/
      2 && t !== (t = /*i18n*/
      s[1].no_results + "") && ie(r, t);
    },
    i: J,
    o: J,
    d(s) {
      s && L(e);
    }
  };
}
function Dn(n) {
  let e, t;
  return {
    c() {
      e = T("li"), t = Z(
        /*message*/
        n[3]
      ), $(e, "class", "searchbox-results-text");
    },
    m(r, s) {
      D(r, e, s), A(e, t);
    },
    p(r, s) {
      s[0] & /*message*/
      8 && ie(
        t,
        /*message*/
        r[3]
      );
    },
    i: J,
    o: J,
    d(r) {
      r && L(e);
    }
  };
}
function Cn(n) {
  let e, t = (
    /*i18n*/
    n[1].loading + ""
  ), r;
  return {
    c() {
      e = T("li"), r = Z(t), $(e, "class", "searchbox-results-text");
    },
    m(s, i) {
      D(s, e, i), A(e, r);
    },
    p(s, i) {
      i[0] & /*i18n*/
      2 && t !== (t = /*i18n*/
      s[1].loading + "") && ie(r, t);
    },
    i: J,
    o: J,
    d(s) {
      s && L(e);
    }
  };
}
function _t(n) {
  var r;
  let e, t;
  return e = new Bt({
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
      M(e.$$.fragment, s), t = !1;
    },
    d(s) {
      ue(e, s);
    }
  };
}
function pt(n) {
  let e, t, r = (
    /*i18n*/
    n[1].load_more + ""
  ), s, i, o;
  return {
    c() {
      e = T("li"), t = T("button"), s = Z(r), $(t, "type", "button"), $(e, "class", "searchbox-results-load-more");
    },
    m(l, c) {
      D(l, e, c), A(e, t), A(t, s), i || (o = oe(t, "click", tn(
        /*click_handler_3*/
        n[24]
      )), i = !0);
    },
    p(l, c) {
      c[0] & /*i18n*/
      2 && r !== (r = /*i18n*/
      l[1].load_more + "") && ie(s, r);
    },
    d(l) {
      l && L(e), i = !1, o();
    }
  };
}
function yt(n) {
  let e, t, r;
  return t = new Be({
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
      M(t.$$.fragment, s), r = !1;
    },
    d(s) {
      s && L(e), ue(t);
    }
  };
}
function An(n) {
  var V, x, C, q;
  let e, t, r, s, i, o, l, c, a, d, g, E, f = (
    /*renderers*/
    ((V = n[4]) == null ? void 0 : V.header) && ht(n)
  ), _ = (
    /*categories*/
    ((x = n[8]) == null ? void 0 : x.length) > 1 && gt(n)
  );
  const v = [Cn, Dn, Ln, Sn], k = [];
  function m(h, O) {
    var j;
    return (
      /*loading*/
      h[2] ? 0 : (
        /*message*/
        h[3] ? 1 : (
          /*filteredItems*/
          (j = h[9]) != null && j.length ? (
            /*slicedFilteredItems*/
            h[12] ? 3 : -1
          ) : 2
        )
      )
    );
  }
  ~(i = m(n)) && (o = k[i] = v[i](n));
  let p = (
    /*filteredItems*/
    ((C = n[9]) == null ? void 0 : C.length) > /*maxItems*/
    n[6] && pt(n)
  ), S = (
    /*renderers*/
    ((q = n[4]) == null ? void 0 : q.footer) && yt(n)
  );
  return {
    c() {
      f && f.c(), e = G(), _ && _.c(), t = G(), r = T("div"), s = T("ul"), o && o.c(), l = G(), p && p.c(), c = G(), S && S.c(), a = Ne(), $(r, "class", "searchbox-results-items");
    },
    m(h, O) {
      f && f.m(h, O), D(h, e, O), _ && _.m(h, O), D(h, t, O), D(h, r, O), A(r, s), ~i && k[i].m(s, null), A(s, l), p && p.m(s, null), n[25](r), D(h, c, O), S && S.m(h, O), D(h, a, O), d = !0, g || (E = oe(
        r,
        "scroll",
        /*scroll_handler*/
        n[26]
      ), g = !0);
    },
    p(h, O) {
      var Q, P, X, ne;
      /*renderers*/
      (Q = h[4]) != null && Q.header ? f ? (f.p(h, O), O[0] & /*renderers*/
      16 && N(f, 1)) : (f = ht(h), f.c(), N(f, 1), f.m(e.parentNode, e)) : f && (he(), M(f, 1, 1, () => {
        f = null;
      }), ge()), /*categories*/
      ((P = h[8]) == null ? void 0 : P.length) > 1 ? _ ? _.p(h, O) : (_ = gt(h), _.c(), _.m(t.parentNode, t)) : _ && (_.d(1), _ = null);
      let j = i;
      i = m(h), i === j ? ~i && k[i].p(h, O) : (o && (he(), M(k[j], 1, 1, () => {
        k[j] = null;
      }), ge()), ~i ? (o = k[i], o ? o.p(h, O) : (o = k[i] = v[i](h), o.c()), N(o, 1), o.m(s, l)) : o = null), /*filteredItems*/
      ((X = h[9]) == null ? void 0 : X.length) > /*maxItems*/
      h[6] ? p ? p.p(h, O) : (p = pt(h), p.c(), p.m(s, null)) : p && (p.d(1), p = null), /*renderers*/
      (ne = h[4]) != null && ne.footer ? S ? (S.p(h, O), O[0] & /*renderers*/
      16 && N(S, 1)) : (S = yt(h), S.c(), N(S, 1), S.m(a.parentNode, a)) : S && (he(), M(S, 1, 1, () => {
        S = null;
      }), ge());
    },
    i(h) {
      d || (N(f), N(o), N(S), d = !0);
    },
    o(h) {
      M(f), M(o), M(S), d = !1;
    },
    d(h) {
      h && (L(e), L(t), L(r), L(c), L(a)), f && f.d(h), _ && _.d(h), ~i && k[i].d(), p && p.d(), n[25](null), S && S.d(h), g = !1, E();
    }
  };
}
let xt = 10;
function Nn(n, e, t) {
  let r, s, i, { category: o = null } = e, { i18n: l } = e, { loading: c = !1 } = e, { message: a = null } = e, { renderers: d = null } = e, { result: g = null } = e;
  const E = At();
  let f, _ = xt, v = [], k = !1;
  qe(() => {
    requestAnimationFrame(() => {
      C();
    });
  });
  function m(b, K, w) {
    const B = o === "*" ? b : b == null ? void 0 : b.filter((Y) => Y.doc.category === o);
    return t(11, k = (B == null ? void 0 : B.length) === 1), B == null ? void 0 : B.reduce(
      (Y, R) => {
        var F;
        return Y.push(R), (F = R.children) != null && F.length && (k || v.includes(R.ref)) && Y.push(...R.children), Y;
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
  function V(b) {
    E("selection", b);
  }
  function x(b) {
    v.includes(b.ref) ? t(7, v = v.filter((K) => K !== b.ref)) : t(7, v = [...v, b.ref]);
  }
  function C() {
    (f == null ? void 0 : f.scrollTop) > 5, (f == null ? void 0 : f.scrollTop) + (f == null ? void 0 : f.clientHeight) >= (f == null ? void 0 : f.scrollHeight) - 50 && q();
  }
  function q() {
    t(6, _ = _ + xt);
  }
  function h() {
    f && t(10, f.scrollTop = 0, f);
  }
  function O(b, K = "focus") {
    const w = [].slice.call(f.querySelectorAll("a[tabindex]"));
    let B = f.querySelector("a:hover, a." + K);
    B || (b = 0, B = w[0]);
    const Y = Math.max(0, Math.min(w.length - 1, w.indexOf(B) + b)), R = w[Y];
    B == null || B.classList.remove(K), R.classList.add(K);
    const F = R.getAttribute("data-ref"), W = F && g.items.find((Se) => Se.ref === F);
    W && E("selection", W), R.scrollIntoView({ behavior: "smooth" });
  }
  const j = () => S("*"), Q = (b) => S(b), P = (b) => V(b.detail), X = (b) => x(b.detail), ne = () => q();
  function Te(b) {
    te[b ? "unshift" : "push"](() => {
      f = b, t(10, f);
    });
  }
  const re = () => C();
  return n.$$set = (b) => {
    "category" in b && t(0, o = b.category), "i18n" in b && t(1, l = b.i18n), "loading" in b && t(2, c = b.loading), "message" in b && t(3, a = b.message), "renderers" in b && t(4, d = b.renderers), "result" in b && t(5, g = b.result);
  }, n.$$.update = () => {
    var b;
    n.$$.dirty[0] & /*result*/
    32 && t(8, r = (b = g == null ? void 0 : g.items) == null ? void 0 : b.reduce(
      (K, w) => (w.doc.category && !K.includes(w.doc.category) && K.push(w.doc.category), K),
      ["*"]
    )), n.$$.dirty[0] & /*categories*/
    256 && p(), n.$$.dirty[0] & /*result, category, expandedItems*/
    161 && t(9, s = m(g == null ? void 0 : g.items)), n.$$.dirty[0] & /*filteredItems, maxItems*/
    576 && t(12, i = s == null ? void 0 : s.slice(0, _));
  }, [
    o,
    l,
    c,
    a,
    d,
    g,
    _,
    v,
    r,
    s,
    f,
    k,
    i,
    S,
    V,
    x,
    C,
    q,
    h,
    O,
    j,
    Q,
    P,
    X,
    ne,
    Te,
    re
  ];
}
class Fe extends $e {
  constructor(e) {
    super(), ve(
      this,
      e,
      Nn,
      An,
      we,
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
    this.$$set({ category: e }), y();
  }
  get i18n() {
    return this.$$.ctx[1];
  }
  set i18n(e) {
    this.$$set({ i18n: e }), y();
  }
  get loading() {
    return this.$$.ctx[2];
  }
  set loading(e) {
    this.$$set({ loading: e }), y();
  }
  get message() {
    return this.$$.ctx[3];
  }
  set message(e) {
    this.$$set({ message: e }), y();
  }
  get renderers() {
    return this.$$.ctx[4];
  }
  set renderers(e) {
    this.$$set({ renderers: e }), y();
  }
  get result() {
    return this.$$.ctx[5];
  }
  set result(e) {
    this.$$set({ result: e }), y();
  }
  get scrollToTop() {
    return this.$$.ctx[18];
  }
  get navigateItems() {
    return this.$$.ctx[19];
  }
}
Ee(Fe, { category: {}, i18n: {}, loading: { type: "Boolean" }, message: {}, renderers: {}, result: {} }, [], ["scrollToTop", "navigateItems"], !0);
const On = {
  all: "All",
  loading: "Loading...",
  load_more: "Load more",
  more_on_this_page: "{count} more on this page",
  no_results: "No results found."
};
function kt(n, e) {
  let t;
  return (...r) => {
    t && clearTimeout(t), t = setTimeout(() => {
      n(...r);
    }, e);
  };
}
function Bn(n) {
  Xt(n, "svelte-1t9xdi2", ":root{--searchbox-border-color:rgb(219, 219, 219);--searchbox-active-color:rgb(19, 58, 165);--searchbox-active-bg-color:rgb(233, 238, 250);--searchbox-muted-color:rgb(119, 119, 119);--searchbox-muted-bg-color:rgb(247, 247, 247);--searchbox-mark-bg:rgb(250, 248, 205);--searchbox-spacer:0.5rem;--searchbox-spacer-lg:1rem}.searchbox-results-categories{background-color:var(--searchbox-muted-bg-color);border-bottom:1px solid var(--searchbox-border-color);font-size:0.8rem;padding:0 var(--searchbox-spacer)}.searchbox-results-categories-wrap{overflow-y:visible;overflow-x:auto;margin:0 0 -1px 0}.searchbox-results-categories ul{display:flex;margin:0;padding:0;list-style:none}.searchbox-results-categories li{margin-right:var(--searchbox-spacer-lg)}.searchbox-results-categories a,.searchbox-results-categories [role=button]{border-bottom:1px solid transparent;color:var(--searchbox-muted-color);cursor:pointer;display:inline-block;padding:var(--searchbox-spacer) 0;white-space:nowrap}.searchbox-results-categories a.active,.searchbox-results-categories [role=button].active{border-bottom-color:var(--searchbox-active-color);color:var(--searchbox-active-color)}.searchbox-results-items{flex-grow:1;overflow-y:auto;overflow-x:hidden}.searchbox-results-items mark{background-color:var(--searchbox-mark-bg);color:currentColor;padding:0}.searchbox-results-items ul{margin:0;padding:0;list-style:none}.searchbox-results-items a{color:var(--searchbox-active-color)}.searchbox-results-header{background-color:var(--searchbox-muted-bg-color);border-bottom:1px solid var(--searchbox-border-color);padding:var(--searchbox-spacer)}.searchbox-results-footer{background-color:var(--searchbox-muted-bg-color);border-top:1px solid var(--searchbox-border-color);padding:var(--searchbox-spacer)}.searchbox-results:not(.compact) .searchbox-results-item:not(:last-child){border-bottom:1px solid var(--searchbox-border-color)}.searchbox-results-text{color:var(--searchbox-muted-color);padding:var(--searchbox-spacer)}.searchbox-results-load-more{color:var(--searchbox-muted-color)}.searchbox-results-load-more button{background:transparent;border:none;box-shadow:none;color:currentColor;cursor:pointer;font-size:0.8rem;outline:none;margin:0;padding:var(--searchbox-spacer);width:100%}.searchbox-results-item:not(:last-child){border-bottom:1px solid var(--searchbox-border-color)}.searchbox-results-link{display:flex;padding:var(--searchbox-spacer);text-decoration:none}.searchbox-results-link:hover{text-decoration:none}.searchbox-results-link.focus,.searchbox-results-link:hover{background-color:var(--searchbox-active-bg-color)}.searchbox-results-image{color:var(--searchbox-muted-color);margin-right:var(--searchbox-spacer)}.searchbox-results-excerpt{color:var(--searchbox-muted-color);font-size:0.8rem;margin-top:var(--searchbox-spacer)}.searchbox-results-excerpt code{font-size:0.8rem}.searchbox-results-excerpt h1,.searchbox-results-excerpt h2,.searchbox-results-excerpt h3,.searchbox-results-excerpt h4,.searchbox-results-excerpt h5,.searchbox-results-excerpt h6{font-size:0.8rem}.searchbox-results-excerpt p{margin-top:0}.searchbox-results-excerpt p:last-child{margin-bottom:0}.searchbox-results-expand{background-color:var(--searchbox-muted-bg-color);color:var(--searchbox-active-color)}.searchbox-results-expand button{background:transparent;border:none;box-shadow:none;color:currentColor;cursor:pointer;font-size:0.8rem;outline:none;margin:0;padding:var(--searchbox-spacer)}.searchbox-results-item-expanded .searchbox-results-expand{color:var(--searchbox-muted-color)}.searchbox-results-label{border:1px solid var(--searchbox-border-color);border-radius:1rem;color:var(--searchbox-muted-color);font-size:0.8rem;margin-left:var(--searchbox-spacer);padding:2px 6px}.searchbox-dropdown{background:white;border:1px solid var(--searchbox-border-color);display:flex;flex-direction:column;height:0;overflow:hidden;position:fixed;transition:height 0.3s;z-index:10000}");
}
function wt(n) {
  let e, t, r = {
    anchor: (
      /*anchor*/
      n[1]
    ),
    align: (
      /*align*/
      n[0]
    ),
    input: (
      /*input*/
      n[11]
    ),
    width: (
      /*width*/
      n[4]
    ),
    $$slots: { default: [In] },
    $$scope: { ctx: n }
  };
  return e = new Ot({ props: r }), n[36](e), {
    c() {
      _e(e.$$.fragment);
    },
    m(s, i) {
      ce(e, s, i), t = !0;
    },
    p(s, i) {
      const o = {};
      i[0] & /*anchor*/
      2 && (o.anchor = /*anchor*/
      s[1]), i[0] & /*align*/
      1 && (o.align = /*align*/
      s[0]), i[0] & /*input*/
      2048 && (o.input = /*input*/
      s[11]), i[0] & /*width*/
      16 && (o.width = /*width*/
      s[4]), i[0] & /*renderers, loading, error, suggestions, suggestionsResult, result, dropdownResults, selectedCategory*/
      30028 | i[1] & /*$$scope*/
      128 && (o.$$scope = { dirty: i, ctx: s }), e.$set(o);
    },
    i(s) {
      t || (N(e.$$.fragment, s), t = !0);
    },
    o(s) {
      M(e.$$.fragment, s), t = !1;
    },
    d(s) {
      n[36](null), ue(e, s);
    }
  };
}
function In(n) {
  let e, t, r;
  function s(o) {
    n[33](o);
  }
  let i = {
    renderers: (
      /*renderers*/
      n[2]
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
      n[3] ? (
        /*suggestionsResult*/
        n[14]
      ) : (
        /*result*/
        n[13]
      )
    )
  };
  return (
    /*selectedCategory*/
    n[6] !== void 0 && (i.category = /*selectedCategory*/
    n[6]), e = new Fe({ props: i }), n[32](e), te.push(() => mn(e, "category", s)), e.$on(
      "category",
      /*category_handler*/
      n[34]
    ), e.$on(
      "selection",
      /*selection_handler*/
      n[35]
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
        4 && (c.renderers = /*renderers*/
        o[2]), l[0] & /*loading*/
        4096 && (c.loading = /*loading*/
        o[12]), l[0] & /*error*/
        1024 && (c.message = /*error*/
        o[10]), l[0] & /*suggestions, suggestionsResult, result*/
        24584 && (c.result = /*suggestions*/
        o[3] ? (
          /*suggestionsResult*/
          o[14]
        ) : (
          /*result*/
          o[13]
        )), !t && l[0] & /*selectedCategory*/
        64 && (t = !0, c.category = /*selectedCategory*/
        o[6], an(() => t = !1)), e.$set(c);
      },
      i(o) {
        r || (N(e.$$.fragment, o), r = !0);
      },
      o(o) {
        M(e.$$.fragment, o), r = !1;
      },
      d(o) {
        n[32](null), ue(e, o);
      }
    }
  );
}
function Mn(n) {
  let e, t, r;
  const s = (
    /*#slots*/
    n[31].default
  ), i = $t(
    s,
    n,
    /*$$scope*/
    n[38],
    null
  );
  let o = (
    /*showDropdown*/
    n[5] && wt(n)
  ), l = [
    /*$$restProps*/
    n[18]
  ], c = {};
  for (let a = 0; a < l.length; a += 1)
    c = Ae(c, l[a]);
  return {
    c() {
      e = T("div"), i && i.c(), t = G(), o && o.c(), st(e, c);
    },
    m(a, d) {
      D(a, e, d), i && i.m(e, null), A(e, t), o && o.m(e, null), n[37](e), r = !0;
    },
    p(a, d) {
      i && i.p && (!r || d[1] & /*$$scope*/
      128) && Lt(
        i,
        s,
        a,
        /*$$scope*/
        a[38],
        r ? St(
          s,
          /*$$scope*/
          a[38],
          d,
          null
        ) : Dt(
          /*$$scope*/
          a[38]
        ),
        null
      ), /*showDropdown*/
      a[5] ? o ? (o.p(a, d), d[0] & /*showDropdown*/
      32 && N(o, 1)) : (o = wt(a), o.c(), N(o, 1), o.m(e, null)) : o && (he(), M(o, 1, 1, () => {
        o = null;
      }), ge()), st(e, c = gn(l, [d[0] & /*$$restProps*/
      262144 && /*$$restProps*/
      a[18]]));
    },
    i(a) {
      r || (N(i, a), N(o), r = !0);
    },
    o(a) {
      M(i, a), M(o), r = !1;
    },
    d(a) {
      a && L(e), i && i.d(a), o && o.d(), n[37](null);
    }
  };
}
function Pn(n, e, t) {
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
  let s = rt(e, r), { $$slots: i = {}, $$scope: o } = e, { align: l = void 0 } = e, { anchor: c = void 0 } = e, { category: a = void 0 } = e, { customSearch: d = void 0 } = e, { dropdownDelay: g = void 0 } = e, { groupBy: E = void 0 } = e, { filters: f = void 0 } = e, { image: _ = void 0 } = e, { limit: v = 100 } = e, { pagefind: k } = e, { renderers: m = void 0 } = e, { results: p = void 0 } = e, { sort: S = void 0 } = e, { strings: V = void 0 } = e, { suggestions: x = !1 } = e, { transform: C = void 0 } = e, { width: q = void 0 } = e;
  const h = kt(jt, 150), O = kt(It, 10);
  let j = "*", Q, P, X, ne, Te = null, re = !1, b, K = Object.assign({}, On, V || {}), w, B = !1, Y, R, F = null, W = !1, Se, se;
  Ct(() => {
    document.removeEventListener("scroll", Ue), w.removeEventListener("focus", Ke), w.removeEventListener("blur", Je), w.removeEventListener("input", Qe), w.removeEventListener("keydown", Ge), b && b.removeEventListener("submit", Ve), se && se.$destroy();
  }), qe(() => {
    if (k) {
      let u = k;
      u.startsWith("/") && (u = location.origin + u), import(
        /* @vite-ignore */
        u
      ).then((I) => {
        if (!I || typeof I.search != "function")
          throw new Error(`Imported module ${u} is not a recognizable Pagefind module.`);
        Y = I;
      }).catch((I) => {
        We(I);
      });
    } else
      We("Parameter 'pagefind' is empty.");
    Mt(), b = w.closest("form"), document.addEventListener("scroll", Ue), w.addEventListener("focus", Ke), w.addEventListener("blur", Je), w.addEventListener("input", Qe), w.addEventListener("keydown", Ge), b && b.addEventListener("submit", Ve), p && (ne = document.querySelector(p), ne.innerHTML = "", se = new Fe({
      target: ne,
      props: { category: j, i18n: K }
    }), se.$on("category", (u) => {
      Me(u.detail);
    }));
  });
  function We(u) {
    t(10, Te = String(u)), console.log(u);
  }
  function It() {
    requestAnimationFrame(() => {
      Q && W && Q.position();
    });
  }
  function Mt() {
    t(11, w = X.parentElement.querySelector("input")), w || (t(11, w = document.createElement("input")), t(11, w.type = "search", w), X.parentElement.appendChild(w));
  }
  async function Pt(u) {
    return t(12, B = !0), F = null, d(u, !0).then((H) => {
      t(14, Se = Ye(H));
    }).finally(() => {
      t(12, B = !1);
    });
  }
  async function Ie(u) {
    return t(12, B = !0), F = null, (d ? d(u, !1) : Ht(u)).then((H) => {
      t(6, j = "*"), t(13, R = Ye(H)), se ? se.$set({ category: j, result: R }) : requestAnimationFrame(() => {
        P && W && P.scrollToTop(), O();
      });
    }).finally(() => {
      t(12, B = !1);
    });
  }
  function Me(u) {
    t(6, j = u), P && W && P.scrollToTop(), se && se.$set({ category: j });
  }
  function Ue() {
    W && O();
  }
  function Ve(u) {
    u.preventDefault(), Ie(w.value.trim());
  }
  function Je() {
    re = !1, requestAnimationFrame(() => {
      re || t(5, W = !1);
    });
  }
  function Ke() {
    re = !0, (B || R != null && R.items) && setTimeout(
      () => {
        re && t(5, W = !0);
      },
      g || 0
    );
  }
  function Ge(u) {
    var I, H;
    u.key === "Enter" ? (I = F == null ? void 0 : F.doc) != null && I.link ? location.assign((H = F == null ? void 0 : F.doc) == null ? void 0 : H.link) : (Ie(w.value.trim()), w.blur()) : u.key === "Escape" ? re && (u.preventDefault(), w.blur()) : u.key === "ArrowUp" || u.key === "Tab" && u.shiftKey ? (u.preventDefault(), P == null || P.navigateItems(-1)) : u.key === "ArrowDown" || u.key === "Tab" ? (u.preventDefault(), P == null || P.navigateItems(1)) : u.key === "Shift" ? u.preventDefault() : h(w.value.trim());
  }
  function Qe() {
    h(w.value.trim());
  }
  function Xe(u) {
    x ? (t(11, w.value = u.doc.suggestion || u.doc.title, w), w.setSelectionRange(w.value.length, w.value.length)) : F = u;
  }
  function jt(u) {
    u ? (re && !W && t(5, W = !0), x ? Pt(u) : Ie(u)) : (t(13, R = null), W && t(5, W = !1));
  }
  async function Ht(u) {
    let I = [];
    if (k) {
      const H = await Y.search(u, { filters: f, sort: S });
      I = (await Promise.all(H.results.slice(0, v).map(async (U) => ({ id: U.id, data: await U.data() })))).map((U) => {
        var pe, Ze, et;
        return {
          ref: U.id,
          doc: {
            category: a ? (pe = U.data.filters[a]) == null ? void 0 : pe[0] : void 0,
            image: _ ? (Ze = U.data.meta) == null ? void 0 : Ze[_] : void 0,
            link: U.data.url,
            title: (et = U.data.meta) == null ? void 0 : et.title,
            excerpt: U.data.excerpt
          }
        };
      });
    }
    return { items: I };
  }
  function Ye(u) {
    return C && (u.items = u.items.map((I) => (I.doc = C(I.doc, I, u), I))), E && (u = zt(u)), u;
  }
  function zt(u) {
    const I = u.items.reduce(
      (H, ee) => {
        const U = typeof E == "function" ? E(ee.doc) : ee.doc[E];
        return H.set(U, [...H.get(U) || [], ee]), H;
      },
      /* @__PURE__ */ new Map()
    );
    return u.items = [...I.values()].reduce(
      (H, ee) => (H.push({ ...ee[0], children: ee.slice(1) }), H),
      []
    ).sort((H, ee) => {
      var U, pe;
      return ((U = H.children) == null ? void 0 : U.length) > ((pe = ee.children) == null ? void 0 : pe.length) ? -1 : 1;
    }), u;
  }
  function Rt(u) {
    te[u ? "unshift" : "push"](() => {
      P = u, t(8, P);
    });
  }
  function qt(u) {
    j = u, t(6, j);
  }
  const Ft = (u) => Me(u.detail), Wt = (u) => Xe(u.detail);
  function Ut(u) {
    te[u ? "unshift" : "push"](() => {
      Q = u, t(7, Q);
    });
  }
  function Vt(u) {
    te[u ? "unshift" : "push"](() => {
      X = u, t(9, X);
    });
  }
  return n.$$set = (u) => {
    e = Ae(Ae({}, e), Qt(u)), t(18, s = rt(e, r)), "align" in u && t(0, l = u.align), "anchor" in u && t(1, c = u.anchor), "category" in u && t(19, a = u.category), "customSearch" in u && t(20, d = u.customSearch), "dropdownDelay" in u && t(21, g = u.dropdownDelay), "groupBy" in u && t(22, E = u.groupBy), "filters" in u && t(23, f = u.filters), "image" in u && t(24, _ = u.image), "limit" in u && t(25, v = u.limit), "pagefind" in u && t(26, k = u.pagefind), "renderers" in u && t(2, m = u.renderers), "results" in u && t(27, p = u.results), "sort" in u && t(28, S = u.sort), "strings" in u && t(29, V = u.strings), "suggestions" in u && t(3, x = u.suggestions), "transform" in u && t(30, C = u.transform), "width" in u && t(4, q = u.width), "$$scope" in u && t(38, o = u.$$scope);
  }, n.$$.update = () => {
    n.$$.dirty[0] & /*showDropdown*/
    32 && W && O();
  }, [
    l,
    c,
    m,
    x,
    q,
    W,
    j,
    Q,
    P,
    X,
    Te,
    w,
    B,
    R,
    Se,
    K,
    Me,
    Xe,
    s,
    a,
    d,
    g,
    E,
    f,
    _,
    v,
    k,
    p,
    S,
    V,
    C,
    i,
    Rt,
    qt,
    Ft,
    Wt,
    Ut,
    Vt,
    o
  ];
}
class jn extends $e {
  constructor(e) {
    super(), ve(
      this,
      e,
      Pn,
      Mn,
      we,
      {
        align: 0,
        anchor: 1,
        category: 19,
        customSearch: 20,
        dropdownDelay: 21,
        groupBy: 22,
        filters: 23,
        image: 24,
        limit: 25,
        pagefind: 26,
        renderers: 2,
        results: 27,
        sort: 28,
        strings: 29,
        suggestions: 3,
        transform: 30,
        width: 4
      },
      Bn,
      [-1, -1]
    );
  }
  get align() {
    return this.$$.ctx[0];
  }
  set align(e) {
    this.$$set({ align: e }), y();
  }
  get anchor() {
    return this.$$.ctx[1];
  }
  set anchor(e) {
    this.$$set({ anchor: e }), y();
  }
  get category() {
    return this.$$.ctx[19];
  }
  set category(e) {
    this.$$set({ category: e }), y();
  }
  get customSearch() {
    return this.$$.ctx[20];
  }
  set customSearch(e) {
    this.$$set({ customSearch: e }), y();
  }
  get dropdownDelay() {
    return this.$$.ctx[21];
  }
  set dropdownDelay(e) {
    this.$$set({ dropdownDelay: e }), y();
  }
  get groupBy() {
    return this.$$.ctx[22];
  }
  set groupBy(e) {
    this.$$set({ groupBy: e }), y();
  }
  get filters() {
    return this.$$.ctx[23];
  }
  set filters(e) {
    this.$$set({ filters: e }), y();
  }
  get image() {
    return this.$$.ctx[24];
  }
  set image(e) {
    this.$$set({ image: e }), y();
  }
  get limit() {
    return this.$$.ctx[25];
  }
  set limit(e) {
    this.$$set({ limit: e }), y();
  }
  get pagefind() {
    return this.$$.ctx[26];
  }
  set pagefind(e) {
    this.$$set({ pagefind: e }), y();
  }
  get renderers() {
    return this.$$.ctx[2];
  }
  set renderers(e) {
    this.$$set({ renderers: e }), y();
  }
  get results() {
    return this.$$.ctx[27];
  }
  set results(e) {
    this.$$set({ results: e }), y();
  }
  get sort() {
    return this.$$.ctx[28];
  }
  set sort(e) {
    this.$$set({ sort: e }), y();
  }
  get strings() {
    return this.$$.ctx[29];
  }
  set strings(e) {
    this.$$set({ strings: e }), y();
  }
  get suggestions() {
    return this.$$.ctx[3];
  }
  set suggestions(e) {
    this.$$set({ suggestions: e }), y();
  }
  get transform() {
    return this.$$.ctx[30];
  }
  set transform(e) {
    this.$$set({ transform: e }), y();
  }
  get width() {
    return this.$$.ctx[4];
  }
  set width(e) {
    this.$$set({ width: e }), y();
  }
}
customElements.define("search-box", Ee(jn, { align: {}, anchor: {}, category: {}, customSearch: {}, dropdownDelay: {}, groupBy: {}, filters: {}, image: {}, limit: {}, pagefind: {}, renderers: {}, results: {}, sort: {}, strings: {}, suggestions: { type: "Boolean" }, transform: {}, width: {} }, ["default"], [], !1));
export {
  jn as default
};
