! function (C, d, e, n) {
    function t(t) {
        var a = this;
        a.$form = t, a.$attributeFields = t.find(".variations select"), a.$singleVariation = t.find(".single_variation"), a.$singleVariationWrap = t.find(".single_variation_wrap"), a.$resetVariations = t.find(".reset_variations"), a.$product = t.closest(".product"), a.variationData = t.data("product_variations"), a.useAjax = !1 === a.variationData, a.xhr = !1, a.loading = !0, a.$singleVariationWrap.show(), a.$form.off(".wc-variation-form"), a.getChosenAttributes = a.getChosenAttributes.bind(a), a.findMatchingVariations = a.findMatchingVariations.bind(a), a.isMatch = a.isMatch.bind(a), a.toggleResetLink = a.toggleResetLink.bind(a), t.on("click.wc-variation-form", ".reset_variations", {
            variationForm: a
        }, a.onReset), t.on("reload_product_variations", {
            variationForm: a
        }, a.onReload), t.on("hide_variation", {
            variationForm: a
        }, a.onHide), t.on("show_variation", {
            variationForm: a
        }, a.onShow), t.on("click", ".single_add_to_cart_button", {
            variationForm: a
        }, a.onAddToCart), t.on("reset_data", {
            variationForm: a
        }, a.onResetDisplayedVariation), t.on("reset_image", {
            variationForm: a
        }, a.onResetImage), t.on("change.wc-variation-form", ".variations select", {
            variationForm: a
        }, a.onChange), t.on("found_variation.wc-variation-form", {
            variationForm: a
        }, a.onFoundVariation), t.on("check_variations.wc-variation-form", {
            variationForm: a
        }, a.onFindVariation), t.on("update_variation_values.wc-variation-form", {
            variationForm: a
        }, a.onUpdateAttributes), setTimeout(function () {
            t.trigger("check_variations"), t.trigger("wc_variation_form"), a.loading = !1
        }, 100)
    }
    t.prototype.onReset = function (t) {
        t.preventDefault(), t.data.variationForm.$attributeFields.val("").change(), t.data.variationForm.$form.trigger("reset_data")
    }, t.prototype.onReload = function (t) {
        var a = t.data.variationForm;
        a.variationData = a.$form.data("product_variations"), a.useAjax = !1 === a.variationData, a.$form.trigger("check_variations")
    }, t.prototype.onHide = function (t) {
        t.preventDefault(), t.data.variationForm.$form.find(".single_add_to_cart_button").removeClass("wc-variation-is-unavailable").addClass("disabled wc-variation-selection-needed"), t.data.variationForm.$form.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-enabled").addClass("woocommerce-variation-add-to-cart-disabled")
    }, t.prototype.onShow = function (t, a, i) {
        t.preventDefault(), i ? (t.data.variationForm.$form.find(".single_add_to_cart_button").removeClass("disabled wc-variation-selection-needed wc-variation-is-unavailable"), t.data.variationForm.$form.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-disabled").addClass("woocommerce-variation-add-to-cart-enabled")) : (t.data.variationForm.$form.find(".single_add_to_cart_button").removeClass("wc-variation-selection-needed").addClass("disabled wc-variation-is-unavailable"), t.data.variationForm.$form.find(".woocommerce-variation-add-to-cart").removeClass("woocommerce-variation-add-to-cart-enabled").addClass("woocommerce-variation-add-to-cart-disabled")), wp.mediaelement && t.data.variationForm.$form.find(".wp-audio-shortcode, .wp-video-shortcode").not(".mejs-container").filter(function () {
            return !C(this).parent().hasClass("mejs-mediaelement")
        }).mediaelementplayer(wp.mediaelement.settings)
    }, t.prototype.onAddToCart = function (t) {
        C(this).is(".disabled") && (t.preventDefault(), C(this).is(".wc-variation-is-unavailable") ? d.alert(wc_add_to_cart_variation_params.i18n_unavailable_text) : C(this).is(".wc-variation-selection-needed") && d.alert(wc_add_to_cart_variation_params.i18n_make_a_selection_text))
    }, t.prototype.onResetDisplayedVariation = function (t) {
        var a = t.data.variationForm;
        a.$product.find(".product_meta").find(".sku").wc_reset_content(), a.$product.find(".product_weight, .woocommerce-product-attributes-item--weight .woocommerce-product-attributes-item__value").wc_reset_content(), a.$product.find(".product_dimensions, .woocommerce-product-attributes-item--dimensions .woocommerce-product-attributes-item__value").wc_reset_content(), a.$form.trigger("reset_image"), a.$singleVariation.slideUp(200).trigger("hide_variation")
    }, t.prototype.onResetImage = function (t) {
        t.data.variationForm.$form.wc_variations_image_update(!1)
    }, t.prototype.onFindVariation = function (t) {
        var a = t.data.variationForm,
            i = a.getChosenAttributes(),
            e = i.data;
        if (i.count === i.chosenCount)
            if (a.useAjax) a.xhr && a.xhr.abort(), a.$form.block({
                message: null,
                overlayCSS: {
                    background: "#fff",
                    opacity: .6
                }
            }), e.product_id = parseInt(a.$form.data("product_id"), 10), e.custom_data = a.$form.data("custom_data"), a.xhr = C.ajax({
                url: wc_add_to_cart_variation_params.wc_ajax_url.toString().replace("%%endpoint%%", "get_variation"),
                type: "POST",
                data: e,
                success: function (t) {
                    t ? a.$form.trigger("found_variation", [t]) : (a.$form.trigger("reset_data"), i.chosenCount = 0, a.loading || (a.$form.find(".single_variation").after('<p class="wc-no-matching-variations woocommerce-info">' + wc_add_to_cart_variation_params.i18n_no_matching_variations_text + "</p>"), a.$form.find(".wc-no-matching-variations").slideDown(200)))
                },
                complete: function () {
                    a.$form.unblock()
                }
            });
            else {
                a.$form.trigger("update_variation_values");
                var r = a.findMatchingVariations(a.variationData, e).shift();
                r ? a.$form.trigger("found_variation", [r]) : (a.$form.trigger("reset_data"), i.chosenCount = 0, a.loading || (a.$form.find(".single_variation").after('<p class="wc-no-matching-variations woocommerce-info">' + wc_add_to_cart_variation_params.i18n_no_matching_variations_text + "</p>"), a.$form.find(".wc-no-matching-variations").slideDown(200)))
            }
        else a.$form.trigger("update_variation_values"), a.$form.trigger("reset_data");
        a.toggleResetLink(0 < i.chosenCount)
    }, t.prototype.onFoundVariation = function (t, a) {
        var i = t.data.variationForm,
            e = i.$product.find(".product_meta").find(".sku"),
            r = i.$product.find(".product_weight, .woocommerce-product-attributes-item--weight .woocommerce-product-attributes-item__value"),
            o = i.$product.find(".product_dimensions, .woocommerce-product-attributes-item--dimensions .woocommerce-product-attributes-item__value"),
            n = i.$singleVariationWrap.find(".quantity"),
            s = !0,
            c = !1,
            _ = "";
        a.sku ? e.wc_set_content(a.sku) : e.wc_reset_content(), a.weight ? r.wc_set_content(a.weight_html) : r.wc_reset_content(), a.dimensions ? o.wc_set_content(C.parseHTML(a.dimensions_html)[0].data) : o.wc_reset_content(), i.$form.wc_variations_image_update(a), a.variation_is_visible ? (c = m("variation-template"), a.variation_id) : c = m("unavailable-variation-template"), _ = (_ = (_ = c({
            variation: a
        })).replace("/*<![CDATA[*/", "")).replace("/*]]>*/", ""), i.$singleVariation.html(_), i.$form.find('input[name="variation_id"], input.variation_id').val(a.variation_id).change(), "yes" === a.is_sold_individually ? (n.find("input.qty").val("1").attr("min", "1").attr("max", ""), n.hide()) : (n.find("input.qty").attr("min", a.min_qty).attr("max", a.max_qty), n.show()), a.is_purchasable && a.is_in_stock && a.variation_is_visible || (s = !1), C.trim(i.$singleVariation.text()) ? i.$singleVariation.slideDown(200).trigger("show_variation", [a, s]) : i.$singleVariation.show().trigger("show_variation", [a, s])
    }, t.prototype.onChange = function (t) {
        var a = t.data.variationForm;
        a.$form.find('input[name="variation_id"], input.variation_id').val("").change(), a.$form.find(".wc-no-matching-variations").remove(), a.useAjax || a.$form.trigger("woocommerce_variation_select_change"), a.$form.trigger("check_variations"), a.$form.trigger("woocommerce_variation_has_changed")
    }, t.prototype.addSlashes = function (t) {
        return t = (t = t.replace(/'/g, "\\'")).replace(/"/g, '\\"')
    }, t.prototype.onUpdateAttributes = function (t) {
        var y = t.data.variationForm,
            F = y.getChosenAttributes().data;
        y.useAjax || (y.$attributeFields.each(function (t, a) {
            var i, e = C(a),
                r = e.data("attribute_name") || e.attr("name"),
                o = C(a).data("show_option_none"),
                n = ":gt(0)",
                s = C("<select/>"),
                c = e.val() || "",
                _ = !0;
            if (!e.data("attribute_html")) {
                var d = e.clone();
                d.find("option").removeAttr("disabled attached").removeAttr("selected"), e.data("attribute_options", d.find("option" + n).get()), e.data("attribute_html", d.html())
            }
            s.html(e.data("attribute_html"));
            var m = C.extend(!0, {}, F);
            m[r] = "";
            var l = y.findMatchingVariations(y.variationData, m);
            for (var v in l)
                if ("undefined" != typeof l[v]) {
                    var g = l[v].attributes;
                    for (var f in g)
                        if (g.hasOwnProperty(f)) {
                            var u = g[f],
                                h = "";
                            if (f === r)
                                if (l[v].variation_is_active && (h = "enabled"), u) {
                                    u = C("<div/>").html(u).text();
                                    var p = s.find("option");
                                    if (p.length)
                                        for (var w = 0, b = p.length; w < b; w++) {
                                            var $ = C(p[w]);
                                            if (u === $.val()) {
                                                $.addClass("attached " + h);
                                                break
                                            }
                                        }
                                } else s.find("option:gt(0)").addClass("attached " + h)
                        }
                } i = s.find("option.attached").length, c && (_ = !1, 0 !== i && s.find("option.attached.enabled").each(function () {
                    var t = C(this).val();
                    if (c === t) return !(_ = !0)
                })), 0 < i && c && _ && "no" === o && (s.find("option:first").remove(), n = ""), s.find("option" + n + ":not(.attached)").remove(), e.html(s.html()), e.find("option" + n + ":not(.enabled)").prop("disabled", !0), c ? _ ? e.val(c) : e.val("").change() : e.val("")
        }), y.$form.trigger("woocommerce_update_variation_values"))
    }, t.prototype.getChosenAttributes = function () {
        var i = {},
            e = 0,
            r = 0;
        return this.$attributeFields.each(function () {
            var t = C(this).data("attribute_name") || C(this).attr("name"),
                a = C(this).val() || "";
            0 < a.length && r++, e++, i[t] = a
        }), {
            count: e,
            chosenCount: r,
            data: i
        }
    }, t.prototype.findMatchingVariations = function (t, a) {
        for (var i = [], e = 0; e < t.length; e++) {
            var r = t[e];
            this.isMatch(r.attributes, a) && i.push(r)
        }
        return i
    }, t.prototype.isMatch = function (t, a) {
        var i = !0;
        for (var e in t)
            if (t.hasOwnProperty(e)) {
                var r = t[e],
                    o = a[e];
                r !== n && o !== n && 0 !== r.length && 0 !== o.length && r !== o && (i = !1)
            } return i
    }, t.prototype.toggleResetLink = function (t) {
        t ? "hidden" === this.$resetVariations.css("visibility") && this.$resetVariations.css("visibility", "visible").hide().fadeIn() : this.$resetVariations.css("visibility", "hidden")
    }, C.fn.wc_variation_form = function () {
        return new t(this), this
    }, C.fn.wc_set_content = function (t) {
        n === this.attr("data-o_content") && this.attr("data-o_content", this.text()), this.text(t)
    }, C.fn.wc_reset_content = function () {
        n !== this.attr("data-o_content") && this.text(this.attr("data-o_content"))
    }, C.fn.wc_set_variation_attr = function (t, a) {
        n === this.attr("data-o_" + t) && this.attr("data-o_" + t, this.attr(t) ? this.attr(t) : ""), !1 === a ? this.removeAttr(t) : this.attr(t, a)
    }, C.fn.wc_reset_variation_attr = function (t) {
        n !== this.attr("data-o_" + t) && this.attr(t, this.attr("data-o_" + t))
    }, C.fn.wc_maybe_trigger_slide_position_reset = function (t) {
        var a = C(this),
            i = a.closest(".product").find(".images"),
            e = !1,
            r = t && t.image_id ? t.image_id : "";
        a.attr("current-image") !== r && (e = !0), a.attr("current-image", r), e && i.trigger("woocommerce_gallery_reset_slide_position")
    }, C.fn.wc_variations_image_update = function (t) {
        var a = this,
            i = a.closest(".product"),
            e = i.find(".images"),
            r = i.find(".flex-control-nav"),
            o = r.find("li:eq(0) img"),
            n = e.find(".woocommerce-product-gallery__image, .woocommerce-product-gallery__image--placeholder").eq(0),
            s = n.find(".wp-post-image"),
            c = n.find("a").eq(0);
        if (t && t.image && t.image.src && 1 < t.image.src.length) {
            0 < r.find('li img[data-o_src="' + t.image.gallery_thumbnail_src + '"]').length && a.wc_variations_image_reset();
            var _ = r.find('li img[src="' + t.image.gallery_thumbnail_src + '"]');
            if (0 < _.length) return _.trigger("click"), a.attr("current-image", t.image_id), void d.setTimeout(function () {
                C(d).trigger("resize"), e.trigger("woocommerce_gallery_init_zoom")
            }, 20);
            s.wc_set_variation_attr("src", t.image.src), s.wc_set_variation_attr("height", t.image.src_h), s.wc_set_variation_attr("width", t.image.src_w), s.wc_set_variation_attr("srcset", t.image.srcset), s.wc_set_variation_attr("sizes", t.image.sizes), s.wc_set_variation_attr("title", t.image.title), s.wc_set_variation_attr("data-caption", t.image.caption), s.wc_set_variation_attr("alt", t.image.alt), s.wc_set_variation_attr("data-src", t.image.full_src), s.wc_set_variation_attr("data-large_image", t.image.full_src), s.wc_set_variation_attr("data-large_image_width", t.image.full_src_w), s.wc_set_variation_attr("data-large_image_height", t.image.full_src_h), n.wc_set_variation_attr("data-thumb", t.image.src), o.wc_set_variation_attr("src", t.image.gallery_thumbnail_src), c.wc_set_variation_attr("href", t.image.full_src)
        } else a.wc_variations_image_reset();
        d.setTimeout(function () {
            C(d).trigger("resize"), a.wc_maybe_trigger_slide_position_reset(t), e.trigger("woocommerce_gallery_init_zoom")
        }, 20)
    }, C.fn.wc_variations_image_reset = function () {
        var t = this.closest(".product"),
            a = t.find(".images"),
            i = t.find(".flex-control-nav").find("li:eq(0) img"),
            e = a.find(".woocommerce-product-gallery__image, .woocommerce-product-gallery__image--placeholder").eq(0),
            r = e.find(".wp-post-image"),
            o = e.find("a").eq(0);
        r.wc_reset_variation_attr("src"), r.wc_reset_variation_attr("width"), r.wc_reset_variation_attr("height"), r.wc_reset_variation_attr("srcset"), r.wc_reset_variation_attr("sizes"), r.wc_reset_variation_attr("title"), r.wc_reset_variation_attr("data-caption"), r.wc_reset_variation_attr("alt"), r.wc_reset_variation_attr("data-src"), r.wc_reset_variation_attr("data-large_image"), r.wc_reset_variation_attr("data-large_image_width"), r.wc_reset_variation_attr("data-large_image_height"), e.wc_reset_variation_attr("data-thumb"), i.wc_reset_variation_attr("src"), o.wc_reset_variation_attr("href")
    }, C(function () {
        "undefined" != typeof wc_add_to_cart_variation_params && C(".variations_form").each(function () {
            C(this).wc_variation_form()
        })
    });
    var m = function (t) {
        var a = e.getElementById("tmpl-" + t).textContent,
            i = !1;
        return (i = (i = (i = i || /<#\s?data\./.test(a)) || /{{{?\s?data\.(?!variation\.).+}}}?/.test(a)) || /{{{?\s?data\.variation\.[\w-]*[^\s}]/.test(a)) ? wp.template(t) : function (t) {
            var o = t.variation || {};
            return a.replace(/({{{?)\s?data\.variation\.([\w-]*)\s?(}}}?)/g, function (t, a, i, e) {
                if (a.length !== e.length) return "";
                var r = o[i] || "";
                return 2 === a.length ? d.escape(r) : r
            })
        }
    }
}(jQuery, window, document);;
jQuery.fn.highlight = function (pat) {
    function innerHighlight(node, pat) {
        var skip = 0;
        if (node.nodeType == 3) {
            var pos = node.data.toUpperCase().indexOf(pat);
            pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
            if (pos >= 0) {
                var spannode = document.createElement('span');
                spannode.className = 'highlight';
                var middlebit = node.splitText(pos);
                var endbit = middlebit.splitText(pat.length);
                var middleclone = middlebit.cloneNode(true);
                spannode.appendChild(middleclone);
                middlebit.parentNode.replaceChild(spannode, middlebit);
                skip = 1;
            }
        } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
            for (var i = 0; i < node.childNodes.length; ++i) {
                i += innerHighlight(node.childNodes[i], pat);
            }
        }
        return skip;
    }
    return this.length && pat && pat.length ? this.each(function () {
        innerHighlight(this, pat.toUpperCase());
    }) : this;
};
jQuery.fn.removeHighlight = function () {
    return this.find("span.highlight").each(function () {
        this.parentNode.firstChild.nodeName;
        with (this.parentNode) {
            replaceChild(this.firstChild, this);
            normalize();
        }
    }).end();
};;
! function (t, i) {
    "object" == typeof exports && "undefined" != typeof module ? i(exports) : "function" == typeof define && define.amd ? define(["exports"], i) : i(t.L = {})
}(this, function (t) {
    "use strict";
    var i = Object.freeze;

    function h(t) {
        var i, e, n, o;
        for (e = 1, n = arguments.length; e < n; e++)
            for (i in o = arguments[e]) t[i] = o[i];
        return t
    }
    Object.freeze = function (t) {
        return t
    };
    var s = Object.create || function (t) {
        return e.prototype = t, new e
    };

    function e() { }

    function a(t, i) {
        var e = Array.prototype.slice;
        if (t.bind) return t.bind.apply(t, e.call(arguments, 1));
        var n = e.call(arguments, 2);
        return function () {
            return t.apply(i, n.length ? n.concat(e.call(arguments)) : arguments)
        }
    }
    var n = 0;

    function u(t) {
        return t._leaflet_id = t._leaflet_id || ++n, t._leaflet_id
    }

    function o(t, i, e) {
        var n, o, s, r;
        return r = function () {
            n = !1, o && (s.apply(e, o), o = !1)
        }, s = function () {
            n ? o = arguments : (t.apply(e, arguments), setTimeout(r, i), n = !0)
        }
    }

    function r(t, i, e) {
        var n = i[1],
            o = i[0],
            s = n - o;
        return t === n && e ? t : ((t - o) % s + s) % s + o
    }

    function l() {
        return !1
    }

    function c(t, i) {
        return i = void 0 === i ? 6 : i, +(Math.round(t + "e+" + i) + "e-" + i)
    }

    function _(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
    }

    function d(t) {
        return _(t).split(/\s+/)
    }

    function p(t, i) {
        for (var e in t.hasOwnProperty("options") || (t.options = t.options ? s(t.options) : {}), i) t.options[e] = i[e];
        return t.options
    }

    function m(t, i, e) {
        var n = [];
        for (var o in t) n.push(encodeURIComponent(e ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
        return (i && -1 !== i.indexOf("?") ? "&" : "?") + n.join("&")
    }
    var f = /\{ *([\w_-]+) *\}/g;

    function g(t, n) {
        return t.replace(f, function (t, i) {
            var e = n[i];
            if (void 0 === e) throw new Error("No value provided for variable " + t);
            return "function" == typeof e && (e = e(n)), e
        })
    }
    var v = Array.isArray || function (t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    };

    function y(t, i) {
        for (var e = 0; e < t.length; e++)
            if (t[e] === i) return e;
        return -1
    }
    var x = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

    function w(t) {
        return window["webkit" + t] || window["moz" + t] || window["ms" + t]
    }
    var P = 0;

    function b(t) {
        var i = +new Date,
            e = Math.max(0, 16 - (i - P));
        return P = i + e, window.setTimeout(t, e)
    }
    var T = window.requestAnimationFrame || w("RequestAnimationFrame") || b,
        z = window.cancelAnimationFrame || w("CancelAnimationFrame") || w("CancelRequestAnimationFrame") || function (t) {
            window.clearTimeout(t)
        };

    function M(t, i, e) {
        if (!e || T !== b) return T.call(window, a(t, i));
        t.call(i)
    }

    function C(t) {
        t && z.call(window, t)
    }
    var S = (Object.freeze || Object)({
        freeze: i,
        extend: h,
        create: s,
        bind: a,
        lastId: n,
        stamp: u,
        throttle: o,
        wrapNum: r,
        falseFn: l,
        formatNum: c,
        trim: _,
        splitWords: d,
        setOptions: p,
        getParamString: m,
        template: g,
        isArray: v,
        indexOf: y,
        emptyImageUrl: x,
        requestFn: T,
        cancelFn: z,
        requestAnimFrame: M,
        cancelAnimFrame: C
    });

    function Z() { }
    Z.extend = function (t) {
        function i() {
            this.initialize && this.initialize.apply(this, arguments), this.callInitHooks()
        }
        var e = i.__super__ = this.prototype,
            n = s(e);
        for (var o in (n.constructor = i).prototype = n, this) this.hasOwnProperty(o) && "prototype" !== o && "__super__" !== o && (i[o] = this[o]);
        return t.statics && (h(i, t.statics), delete t.statics), t.includes && (function (t) {
            if ("undefined" == typeof L || !L || !L.Mixin) return;
            t = v(t) ? t : [t];
            for (var i = 0; i < t.length; i++) t[i] === L.Mixin.Events && console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.", (new Error).stack)
        }(t.includes), h.apply(null, [n].concat(t.includes)), delete t.includes), n.options && (t.options = h(s(n.options), t.options)), h(n, t), n._initHooks = [], n.callInitHooks = function () {
            if (!this._initHooksCalled) {
                e.callInitHooks && e.callInitHooks.call(this), this._initHooksCalled = !0;
                for (var t = 0, i = n._initHooks.length; t < i; t++) n._initHooks[t].call(this)
            }
        }, i
    }, Z.include = function (t) {
        return h(this.prototype, t), this
    }, Z.mergeOptions = function (t) {
        return h(this.prototype.options, t), this
    }, Z.addInitHook = function (t) {
        var i = Array.prototype.slice.call(arguments, 1),
            e = "function" == typeof t ? t : function () {
                this[t].apply(this, i)
            };
        return this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(e), this
    };
    var E = {
        on: function (t, i, e) {
            if ("object" == typeof t)
                for (var n in t) this._on(n, t[n], i);
            else
                for (var o = 0, s = (t = d(t)).length; o < s; o++) this._on(t[o], i, e);
            return this
        },
        off: function (t, i, e) {
            if (t)
                if ("object" == typeof t)
                    for (var n in t) this._off(n, t[n], i);
                else
                    for (var o = 0, s = (t = d(t)).length; o < s; o++) this._off(t[o], i, e);
            else delete this._events;
            return this
        },
        _on: function (t, i, e) {
            this._events = this._events || {};
            var n = this._events[t];
            n || (n = [], this._events[t] = n), e === this && (e = void 0);
            for (var o = {
                fn: i,
                ctx: e
            }, s = n, r = 0, a = s.length; r < a; r++)
                if (s[r].fn === i && s[r].ctx === e) return;
            s.push(o)
        },
        _off: function (t, i, e) {
            var n, o, s;
            if (this._events && (n = this._events[t]))
                if (i) {
                    if (e === this && (e = void 0), n)
                        for (o = 0, s = n.length; o < s; o++) {
                            var r = n[o];
                            if (r.ctx === e && r.fn === i) return r.fn = l, this._firingCount && (this._events[t] = n = n.slice()), void n.splice(o, 1)
                        }
                } else {
                    for (o = 0, s = n.length; o < s; o++) n[o].fn = l;
                    delete this._events[t]
                }
        },
        fire: function (t, i, e) {
            if (!this.listens(t, e)) return this;
            var n = h({}, i, {
                type: t,
                target: this,
                sourceTarget: i && i.sourceTarget || this
            });
            if (this._events) {
                var o = this._events[t];
                if (o) {
                    this._firingCount = this._firingCount + 1 || 1;
                    for (var s = 0, r = o.length; s < r; s++) {
                        var a = o[s];
                        a.fn.call(a.ctx || this, n)
                    }
                    this._firingCount--
                }
            }
            return e && this._propagateEvent(n), this
        },
        listens: function (t, i) {
            var e = this._events && this._events[t];
            if (e && e.length) return !0;
            if (i)
                for (var n in this._eventParents)
                    if (this._eventParents[n].listens(t, i)) return !0;
            return !1
        },
        once: function (t, i, e) {
            if ("object" == typeof t) {
                for (var n in t) this.once(n, t[n], i);
                return this
            }
            var o = a(function () {
                this.off(t, i, e).off(t, o, e)
            }, this);
            return this.on(t, i, e).on(t, o, e)
        },
        addEventParent: function (t) {
            return this._eventParents = this._eventParents || {}, this._eventParents[u(t)] = t, this
        },
        removeEventParent: function (t) {
            return this._eventParents && delete this._eventParents[u(t)], this
        },
        _propagateEvent: function (t) {
            for (var i in this._eventParents) this._eventParents[i].fire(t.type, h({
                layer: t.target,
                propagatedFrom: t.target
            }, t), !0)
        }
    };
    E.addEventListener = E.on, E.removeEventListener = E.clearAllEventListeners = E.off, E.addOneTimeEventListener = E.once, E.fireEvent = E.fire, E.hasEventListeners = E.listens;
    var k = Z.extend(E);

    function B(t, i, e) {
        this.x = e ? Math.round(t) : t, this.y = e ? Math.round(i) : i
    }
    var A = Math.trunc || function (t) {
        return 0 < t ? Math.floor(t) : Math.ceil(t)
    };

    function I(t, i, e) {
        return t instanceof B ? t : v(t) ? new B(t[0], t[1]) : null == t ? t : "object" == typeof t && "x" in t && "y" in t ? new B(t.x, t.y) : new B(t, i, e)
    }

    function O(t, i) {
        if (t)
            for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++) this.extend(e[n])
    }

    function R(t, i) {
        return !t || t instanceof O ? t : new O(t, i)
    }

    function N(t, i) {
        if (t)
            for (var e = i ? [t, i] : t, n = 0, o = e.length; n < o; n++) this.extend(e[n])
    }

    function D(t, i) {
        return t instanceof N ? t : new N(t, i)
    }

    function j(t, i, e) {
        if (isNaN(t) || isNaN(i)) throw new Error("Invalid LatLng object: (" + t + ", " + i + ")");
        this.lat = +t, this.lng = +i, void 0 !== e && (this.alt = +e)
    }

    function W(t, i, e) {
        return t instanceof j ? t : v(t) && "object" != typeof t[0] ? 3 === t.length ? new j(t[0], t[1], t[2]) : 2 === t.length ? new j(t[0], t[1]) : null : null == t ? t : "object" == typeof t && "lat" in t ? new j(t.lat, "lng" in t ? t.lng : t.lon, t.alt) : void 0 === i ? null : new j(t, i, e)
    }
    B.prototype = {
        clone: function () {
            return new B(this.x, this.y)
        },
        add: function (t) {
            return this.clone()._add(I(t))
        },
        _add: function (t) {
            return this.x += t.x, this.y += t.y, this
        },
        subtract: function (t) {
            return this.clone()._subtract(I(t))
        },
        _subtract: function (t) {
            return this.x -= t.x, this.y -= t.y, this
        },
        divideBy: function (t) {
            return this.clone()._divideBy(t)
        },
        _divideBy: function (t) {
            return this.x /= t, this.y /= t, this
        },
        multiplyBy: function (t) {
            return this.clone()._multiplyBy(t)
        },
        _multiplyBy: function (t) {
            return this.x *= t, this.y *= t, this
        },
        scaleBy: function (t) {
            return new B(this.x * t.x, this.y * t.y)
        },
        unscaleBy: function (t) {
            return new B(this.x / t.x, this.y / t.y)
        },
        round: function () {
            return this.clone()._round()
        },
        _round: function () {
            return this.x = Math.round(this.x), this.y = Math.round(this.y), this
        },
        floor: function () {
            return this.clone()._floor()
        },
        _floor: function () {
            return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
        },
        ceil: function () {
            return this.clone()._ceil()
        },
        _ceil: function () {
            return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
        },
        trunc: function () {
            return this.clone()._trunc()
        },
        _trunc: function () {
            return this.x = A(this.x), this.y = A(this.y), this
        },
        distanceTo: function (t) {
            var i = (t = I(t)).x - this.x,
                e = t.y - this.y;
            return Math.sqrt(i * i + e * e)
        },
        equals: function (t) {
            return (t = I(t)).x === this.x && t.y === this.y
        },
        contains: function (t) {
            return t = I(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
        },
        toString: function () {
            return "Point(" + c(this.x) + ", " + c(this.y) + ")"
        }
    }, O.prototype = {
        extend: function (t) {
            return t = I(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
        },
        getCenter: function (t) {
            return new B((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
        },
        getBottomLeft: function () {
            return new B(this.min.x, this.max.y)
        },
        getTopRight: function () {
            return new B(this.max.x, this.min.y)
        },
        getTopLeft: function () {
            return this.min
        },
        getBottomRight: function () {
            return this.max
        },
        getSize: function () {
            return this.max.subtract(this.min)
        },
        contains: function (t) {
            var i, e;
            return (t = "number" == typeof t[0] || t instanceof B ? I(t) : R(t)) instanceof O ? (i = t.min, e = t.max) : i = e = t, i.x >= this.min.x && e.x <= this.max.x && i.y >= this.min.y && e.y <= this.max.y
        },
        intersects: function (t) {
            t = R(t);
            var i = this.min,
                e = this.max,
                n = t.min,
                o = t.max,
                s = o.x >= i.x && n.x <= e.x,
                r = o.y >= i.y && n.y <= e.y;
            return s && r
        },
        overlaps: function (t) {
            t = R(t);
            var i = this.min,
                e = this.max,
                n = t.min,
                o = t.max,
                s = o.x > i.x && n.x < e.x,
                r = o.y > i.y && n.y < e.y;
            return s && r
        },
        isValid: function () {
            return !(!this.min || !this.max)
        }
    }, N.prototype = {
        extend: function (t) {
            var i, e, n = this._southWest,
                o = this._northEast;
            if (t instanceof j) e = i = t;
            else {
                if (!(t instanceof N)) return t ? this.extend(W(t) || D(t)) : this;
                if (i = t._southWest, e = t._northEast, !i || !e) return this
            }
            return n || o ? (n.lat = Math.min(i.lat, n.lat), n.lng = Math.min(i.lng, n.lng), o.lat = Math.max(e.lat, o.lat), o.lng = Math.max(e.lng, o.lng)) : (this._southWest = new j(i.lat, i.lng), this._northEast = new j(e.lat, e.lng)), this
        },
        pad: function (t) {
            var i = this._southWest,
                e = this._northEast,
                n = Math.abs(i.lat - e.lat) * t,
                o = Math.abs(i.lng - e.lng) * t;
            return new N(new j(i.lat - n, i.lng - o), new j(e.lat + n, e.lng + o))
        },
        getCenter: function () {
            return new j((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
        },
        getSouthWest: function () {
            return this._southWest
        },
        getNorthEast: function () {
            return this._northEast
        },
        getNorthWest: function () {
            return new j(this.getNorth(), this.getWest())
        },
        getSouthEast: function () {
            return new j(this.getSouth(), this.getEast())
        },
        getWest: function () {
            return this._southWest.lng
        },
        getSouth: function () {
            return this._southWest.lat
        },
        getEast: function () {
            return this._northEast.lng
        },
        getNorth: function () {
            return this._northEast.lat
        },
        contains: function (t) {
            t = "number" == typeof t[0] || t instanceof j || "lat" in t ? W(t) : D(t);
            var i, e, n = this._southWest,
                o = this._northEast;
            return t instanceof N ? (i = t.getSouthWest(), e = t.getNorthEast()) : i = e = t, i.lat >= n.lat && e.lat <= o.lat && i.lng >= n.lng && e.lng <= o.lng
        },
        intersects: function (t) {
            t = D(t);
            var i = this._southWest,
                e = this._northEast,
                n = t.getSouthWest(),
                o = t.getNorthEast(),
                s = o.lat >= i.lat && n.lat <= e.lat,
                r = o.lng >= i.lng && n.lng <= e.lng;
            return s && r
        },
        overlaps: function (t) {
            t = D(t);
            var i = this._southWest,
                e = this._northEast,
                n = t.getSouthWest(),
                o = t.getNorthEast(),
                s = o.lat > i.lat && n.lat < e.lat,
                r = o.lng > i.lng && n.lng < e.lng;
            return s && r
        },
        toBBoxString: function () {
            return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
        },
        equals: function (t, i) {
            return !!t && (t = D(t), this._southWest.equals(t.getSouthWest(), i) && this._northEast.equals(t.getNorthEast(), i))
        },
        isValid: function () {
            return !(!this._southWest || !this._northEast)
        }
    };
    var H, F = {
        latLngToPoint: function (t, i) {
            var e = this.projection.project(t),
                n = this.scale(i);
            return this.transformation._transform(e, n)
        },
        pointToLatLng: function (t, i) {
            var e = this.scale(i),
                n = this.transformation.untransform(t, e);
            return this.projection.unproject(n)
        },
        project: function (t) {
            return this.projection.project(t)
        },
        unproject: function (t) {
            return this.projection.unproject(t)
        },
        scale: function (t) {
            return 256 * Math.pow(2, t)
        },
        zoom: function (t) {
            return Math.log(t / 256) / Math.LN2
        },
        getProjectedBounds: function (t) {
            if (this.infinite) return null;
            var i = this.projection.bounds,
                e = this.scale(t);
            return new O(this.transformation.transform(i.min, e), this.transformation.transform(i.max, e))
        },
        infinite: !(j.prototype = {
            equals: function (t, i) {
                return !!t && (t = W(t), Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng)) <= (void 0 === i ? 1e-9 : i))
            },
            toString: function (t) {
                return "LatLng(" + c(this.lat, t) + ", " + c(this.lng, t) + ")"
            },
            distanceTo: function (t) {
                return U.distance(this, W(t))
            },
            wrap: function () {
                return U.wrapLatLng(this)
            },
            toBounds: function (t) {
                var i = 180 * t / 40075017,
                    e = i / Math.cos(Math.PI / 180 * this.lat);
                return D([this.lat - i, this.lng - e], [this.lat + i, this.lng + e])
            },
            clone: function () {
                return new j(this.lat, this.lng, this.alt)
            }
        }),
        wrapLatLng: function (t) {
            var i = this.wrapLng ? r(t.lng, this.wrapLng, !0) : t.lng;
            return new j(this.wrapLat ? r(t.lat, this.wrapLat, !0) : t.lat, i, t.alt)
        },
        wrapLatLngBounds: function (t) {
            var i = t.getCenter(),
                e = this.wrapLatLng(i),
                n = i.lat - e.lat,
                o = i.lng - e.lng;
            if (0 == n && 0 == o) return t;
            var s = t.getSouthWest(),
                r = t.getNorthEast();
            return new N(new j(s.lat - n, s.lng - o), new j(r.lat - n, r.lng - o))
        }
    },
        U = h({}, F, {
            wrapLng: [-180, 180],
            R: 6371e3,
            distance: function (t, i) {
                var e = Math.PI / 180,
                    n = t.lat * e,
                    o = i.lat * e,
                    s = Math.sin((i.lat - t.lat) * e / 2),
                    r = Math.sin((i.lng - t.lng) * e / 2),
                    a = s * s + Math.cos(n) * Math.cos(o) * r * r,
                    h = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return this.R * h
            }
        }),
        V = 6378137,
        q = {
            R: V,
            MAX_LATITUDE: 85.0511287798,
            project: function (t) {
                var i = Math.PI / 180,
                    e = this.MAX_LATITUDE,
                    n = Math.max(Math.min(e, t.lat), -e),
                    o = Math.sin(n * i);
                return new B(this.R * t.lng * i, this.R * Math.log((1 + o) / (1 - o)) / 2)
            },
            unproject: function (t) {
                var i = 180 / Math.PI;
                return new j((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * i, t.x * i / this.R)
            },
            bounds: (H = V * Math.PI, new O([-H, -H], [H, H]))
        };

    function G(t, i, e, n) {
        if (v(t)) return this._a = t[0], this._b = t[1], this._c = t[2], void (this._d = t[3]);
        this._a = t, this._b = i, this._c = e, this._d = n
    }

    function K(t, i, e, n) {
        return new G(t, i, e, n)
    }
    G.prototype = {
        transform: function (t, i) {
            return this._transform(t.clone(), i)
        },
        _transform: function (t, i) {
            return i = i || 1, t.x = i * (this._a * t.x + this._b), t.y = i * (this._c * t.y + this._d), t
        },
        untransform: function (t, i) {
            return i = i || 1, new B((t.x / i - this._b) / this._a, (t.y / i - this._d) / this._c)
        }
    };
    var Y, X = h({}, U, {
        code: "EPSG:3857",
        projection: q,
        transformation: (Y = .5 / (Math.PI * q.R), K(Y, .5, -Y, .5))
    }),
        J = h({}, X, {
            code: "EPSG:900913"
        });

    function $(t) {
        return document.createElementNS("http://www.w3.org/2000/svg", t)
    }

    function Q(t, i) {
        var e, n, o, s, r, a, h = "";
        for (e = 0, o = t.length; e < o; e++) {
            for (n = 0, s = (r = t[e]).length; n < s; n++) h += (n ? "L" : "M") + (a = r[n]).x + " " + a.y;
            h += i ? Zt ? "z" : "x" : ""
        }
        return h || "M0 0"
    }
    var tt = document.documentElement.style,
        it = "ActiveXObject" in window,
        et = it && !document.addEventListener,
        nt = "msLaunchUri" in navigator && !("documentMode" in document),
        ot = kt("webkit"),
        st = kt("android"),
        rt = kt("android 2") || kt("android 3"),
        at = parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1], 10),
        ht = st && kt("Google") && at < 537 && !("AudioNode" in window),
        ut = !!window.opera,
        lt = kt("chrome"),
        ct = kt("gecko") && !ot && !ut && !it,
        _t = !lt && kt("safari"),
        dt = kt("phantom"),
        pt = "OTransition" in tt,
        mt = 0 === navigator.platform.indexOf("Win"),
        ft = it && "transition" in tt,
        gt = "WebKitCSSMatrix" in window && "m11" in new window.WebKitCSSMatrix && !rt,
        vt = "MozPerspective" in tt,
        yt = !window.L_DISABLE_3D && (ft || gt || vt) && !pt && !dt,
        xt = "undefined" != typeof orientation || kt("mobile"),
        wt = xt && ot,
        Pt = xt && gt,
        Lt = !window.PointerEvent && window.MSPointerEvent,
        bt = !(!window.PointerEvent && !Lt),
        Tt = !window.L_NO_TOUCH && (bt || "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch),
        zt = xt && ut,
        Mt = xt && ct,
        Ct = 1 < (window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI),
        St = !!document.createElement("canvas").getContext,
        Zt = !(!document.createElementNS || !$("svg").createSVGRect),
        Et = !Zt && function () {
            try {
                var t = document.createElement("div");
                t.innerHTML = '<v:shape adj="1"/>';
                var i = t.firstChild;
                return i.style.behavior = "url(#default#VML)", i && "object" == typeof i.adj
            } catch (t) {
                return !1
            }
        }();

    function kt(t) {
        return 0 <= navigator.userAgent.toLowerCase().indexOf(t)
    }
    var Bt = (Object.freeze || Object)({
        ie: it,
        ielt9: et,
        edge: nt,
        webkit: ot,
        android: st,
        android23: rt,
        androidStock: ht,
        opera: ut,
        chrome: lt,
        gecko: ct,
        safari: _t,
        phantom: dt,
        opera12: pt,
        win: mt,
        ie3d: ft,
        webkit3d: gt,
        gecko3d: vt,
        any3d: yt,
        mobile: xt,
        mobileWebkit: wt,
        mobileWebkit3d: Pt,
        msPointer: Lt,
        pointer: bt,
        touch: Tt,
        mobileOpera: zt,
        mobileGecko: Mt,
        retina: Ct,
        canvas: St,
        svg: Zt,
        vml: Et
    }),
        At = Lt ? "MSPointerDown" : "pointerdown",
        It = Lt ? "MSPointerMove" : "pointermove",
        Ot = Lt ? "MSPointerUp" : "pointerup",
        Rt = Lt ? "MSPointerCancel" : "pointercancel",
        Nt = ["INPUT", "SELECT", "OPTION"],
        Dt = {},
        jt = !1,
        Wt = 0;

    function Ht(t, i, e, n) {
        return "touchstart" === i ? function (t, i, e) {
            var n = a(function (t) {
                if ("mouse" !== t.pointerType && t.MSPOINTER_TYPE_MOUSE && t.pointerType !== t.MSPOINTER_TYPE_MOUSE) {
                    if (!(Nt.indexOf(t.target.tagName) < 0)) return;
                    Di(t)
                }
                qt(t, i)
            });
            t["_leaflet_touchstart" + e] = n, t.addEventListener(At, n, !1), jt || (document.documentElement.addEventListener(At, Ft, !0), document.documentElement.addEventListener(It, Ut, !0), document.documentElement.addEventListener(Ot, Vt, !0), document.documentElement.addEventListener(Rt, Vt, !0), jt = !0)
        }(t, e, n) : "touchmove" === i ? function (t, i, e) {
            var n = function (t) {
                (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) && qt(t, i)
            };
            t["_leaflet_touchmove" + e] = n, t.addEventListener(It, n, !1)
        }(t, e, n) : "touchend" === i && function (t, i, e) {
            var n = function (t) {
                qt(t, i)
            };
            t["_leaflet_touchend" + e] = n, t.addEventListener(Ot, n, !1), t.addEventListener(Rt, n, !1)
        }(t, e, n), this
    }

    function Ft(t) {
        Dt[t.pointerId] = t, Wt++
    }

    function Ut(t) {
        Dt[t.pointerId] && (Dt[t.pointerId] = t)
    }

    function Vt(t) {
        delete Dt[t.pointerId], Wt--
    }

    function qt(t, i) {
        for (var e in t.touches = [], Dt) t.touches.push(Dt[e]);
        t.changedTouches = [t], i(t)
    }
    var Gt = Lt ? "MSPointerDown" : bt ? "pointerdown" : "touchstart",
        Kt = Lt ? "MSPointerUp" : bt ? "pointerup" : "touchend",
        Yt = "_leaflet_";

    function Xt(t, o, i) {
        var s, r, a = !1;

        function e(t) {
            var i;
            if (bt) {
                if (!nt || "mouse" === t.pointerType) return;
                i = Wt
            } else i = t.touches.length;
            if (!(1 < i)) {
                var e = Date.now(),
                    n = e - (s || e);
                r = t.touches ? t.touches[0] : t, a = 0 < n && n <= 250, s = e
            }
        }

        function n(t) {
            if (a && !r.cancelBubble) {
                if (bt) {
                    if (!nt || "mouse" === t.pointerType) return;
                    var i, e, n = {};
                    for (e in r) i = r[e], n[e] = i && i.bind ? i.bind(r) : i;
                    r = n
                }
                r.type = "dblclick", r.button = 0, o(r), s = null
            }
        }
        return t[Yt + Gt + i] = e, t[Yt + Kt + i] = n, t[Yt + "dblclick" + i] = o, t.addEventListener(Gt, e, !1), t.addEventListener(Kt, n, !1), t.addEventListener("dblclick", o, !1), this
    }

    function Jt(t, i) {
        var e = t[Yt + Gt + i],
            n = t[Yt + Kt + i],
            o = t[Yt + "dblclick" + i];
        return t.removeEventListener(Gt, e, !1), t.removeEventListener(Kt, n, !1), nt || t.removeEventListener("dblclick", o, !1), this
    }
    var $t, Qt, ti, ii, ei, ni = yi(["transform", "webkitTransform", "OTransform", "MozTransform", "msTransform"]),
        oi = yi(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]),
        si = "webkitTransition" === oi || "OTransition" === oi ? oi + "End" : "transitionend";

    function ri(t) {
        return "string" == typeof t ? document.getElementById(t) : t
    }

    function ai(t, i) {
        var e = t.style[i] || t.currentStyle && t.currentStyle[i];
        if ((!e || "auto" === e) && document.defaultView) {
            var n = document.defaultView.getComputedStyle(t, null);
            e = n ? n[i] : null
        }
        return "auto" === e ? null : e
    }

    function hi(t, i, e) {
        var n = document.createElement(t);
        return n.className = i || "", e && e.appendChild(n), n
    }

    function ui(t) {
        var i = t.parentNode;
        i && i.removeChild(t)
    }

    function li(t) {
        for (; t.firstChild;) t.removeChild(t.firstChild)
    }

    function ci(t) {
        var i = t.parentNode;
        i && i.lastChild !== t && i.appendChild(t)
    }

    function _i(t) {
        var i = t.parentNode;
        i && i.firstChild !== t && i.insertBefore(t, i.firstChild)
    }

    function di(t, i) {
        if (void 0 !== t.classList) return t.classList.contains(i);
        var e = gi(t);
        return 0 < e.length && new RegExp("(^|\\s)" + i + "(\\s|$)").test(e)
    }

    function pi(t, i) {
        if (void 0 !== t.classList)
            for (var e = d(i), n = 0, o = e.length; n < o; n++) t.classList.add(e[n]);
        else if (!di(t, i)) {
            var s = gi(t);
            fi(t, (s ? s + " " : "") + i)
        }
    }

    function mi(t, i) {
        void 0 !== t.classList ? t.classList.remove(i) : fi(t, _((" " + gi(t) + " ").replace(" " + i + " ", " ")))
    }

    function fi(t, i) {
        void 0 === t.className.baseVal ? t.className = i : t.className.baseVal = i
    }

    function gi(t) {
        return t.correspondingElement && (t = t.correspondingElement), void 0 === t.className.baseVal ? t.className : t.className.baseVal
    }

    function vi(t, i) {
        "opacity" in t.style ? t.style.opacity = i : "filter" in t.style && function (t, i) {
            var e = !1,
                n = "DXImageTransform.Microsoft.Alpha";
            try {
                e = t.filters.item(n)
            } catch (t) {
                if (1 === i) return
            }
            i = Math.round(100 * i), e ? (e.Enabled = 100 !== i, e.Opacity = i) : t.style.filter += " progid:" + n + "(opacity=" + i + ")"
        }(t, i)
    }

    function yi(t) {
        for (var i = document.documentElement.style, e = 0; e < t.length; e++)
            if (t[e] in i) return t[e];
        return !1
    }

    function xi(t, i, e) {
        var n = i || new B(0, 0);
        t.style[ni] = (ft ? "translate(" + n.x + "px," + n.y + "px)" : "translate3d(" + n.x + "px," + n.y + "px,0)") + (e ? " scale(" + e + ")" : "")
    }

    function wi(t, i) {
        t._leaflet_pos = i, yt ? xi(t, i) : (t.style.left = i.x + "px", t.style.top = i.y + "px")
    }

    function Pi(t) {
        return t._leaflet_pos || new B(0, 0)
    }
    if ("onselectstart" in document) $t = function () {
        Ei(window, "selectstart", Di)
    }, Qt = function () {
        Bi(window, "selectstart", Di)
    };
    else {
        var Li = yi(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
        $t = function () {
            if (Li) {
                var t = document.documentElement.style;
                ti = t[Li], t[Li] = "none"
            }
        }, Qt = function () {
            Li && (document.documentElement.style[Li] = ti, ti = void 0)
        }
    }

    function bi() {
        Ei(window, "dragstart", Di)
    }

    function Ti() {
        Bi(window, "dragstart", Di)
    }

    function zi(t) {
        for (; - 1 === t.tabIndex;) t = t.parentNode;
        t.style && (Mi(), ei = (ii = t).style.outline, t.style.outline = "none", Ei(window, "keydown", Mi))
    }

    function Mi() {
        ii && (ii.style.outline = ei, ei = ii = void 0, Bi(window, "keydown", Mi))
    }

    function Ci(t) {
        for (; !((t = t.parentNode).offsetWidth && t.offsetHeight || t === document.body););
        return t
    }

    function Si(t) {
        var i = t.getBoundingClientRect();
        return {
            x: i.width / t.offsetWidth || 1,
            y: i.height / t.offsetHeight || 1,
            boundingClientRect: i
        }
    }
    var Zi = (Object.freeze || Object)({
        TRANSFORM: ni,
        TRANSITION: oi,
        TRANSITION_END: si,
        get: ri,
        getStyle: ai,
        create: hi,
        remove: ui,
        empty: li,
        toFront: ci,
        toBack: _i,
        hasClass: di,
        addClass: pi,
        removeClass: mi,
        setClass: fi,
        getClass: gi,
        setOpacity: vi,
        testProp: yi,
        setTransform: xi,
        setPosition: wi,
        getPosition: Pi,
        disableTextSelection: $t,
        enableTextSelection: Qt,
        disableImageDrag: bi,
        enableImageDrag: Ti,
        preventOutline: zi,
        restoreOutline: Mi,
        getSizedParentNode: Ci,
        getScale: Si
    });

    function Ei(t, i, e, n) {
        if ("object" == typeof i)
            for (var o in i) Ai(t, o, i[o], e);
        else
            for (var s = 0, r = (i = d(i)).length; s < r; s++) Ai(t, i[s], e, n);
        return this
    }
    var ki = "_leaflet_events";

    function Bi(t, i, e, n) {
        if ("object" == typeof i)
            for (var o in i) Ii(t, o, i[o], e);
        else if (i)
            for (var s = 0, r = (i = d(i)).length; s < r; s++) Ii(t, i[s], e, n);
        else {
            for (var a in t[ki]) Ii(t, a, t[ki][a]);
            delete t[ki]
        }
        return this
    }

    function Ai(i, t, e, n) {
        var o = t + u(e) + (n ? "_" + u(n) : "");
        if (i[ki] && i[ki][o]) return this;
        var s = function (t) {
            return e.call(n || i, t || window.event)
        },
            r = s;
        bt && 0 === t.indexOf("touch") ? Ht(i, t, s, o) : !Tt || "dblclick" !== t || bt && lt ? "addEventListener" in i ? "mousewheel" === t ? i.addEventListener("onwheel" in i ? "wheel" : "mousewheel", s, !1) : "mouseenter" === t || "mouseleave" === t ? (s = function (t) {
            t = t || window.event, Ki(i, t) && r(t)
        }, i.addEventListener("mouseenter" === t ? "mouseover" : "mouseout", s, !1)) : ("click" === t && st && (s = function (t) {
            ! function (t, i) {
                var e = t.timeStamp || t.originalEvent && t.originalEvent.timeStamp,
                    n = Ui && e - Ui;
                if (n && 100 < n && n < 500 || t.target._simulatedClick && !t._simulated) return ji(t);
                Ui = e, i(t)
            }(t, r)
        }), i.addEventListener(t, s, !1)) : "attachEvent" in i && i.attachEvent("on" + t, s) : Xt(i, s, o), i[ki] = i[ki] || {}, i[ki][o] = s
    }

    function Ii(t, i, e, n) {
        var o = i + u(e) + (n ? "_" + u(n) : ""),
            s = t[ki] && t[ki][o];
        if (!s) return this;
        bt && 0 === i.indexOf("touch") ? function (t, i, e) {
            var n = t["_leaflet_" + i + e];
            "touchstart" === i ? t.removeEventListener(At, n, !1) : "touchmove" === i ? t.removeEventListener(It, n, !1) : "touchend" === i && (t.removeEventListener(Ot, n, !1), t.removeEventListener(Rt, n, !1))
        }(t, i, o) : !Tt || "dblclick" !== i || bt && lt ? "removeEventListener" in t ? "mousewheel" === i ? t.removeEventListener("onwheel" in t ? "wheel" : "mousewheel", s, !1) : t.removeEventListener("mouseenter" === i ? "mouseover" : "mouseleave" === i ? "mouseout" : i, s, !1) : "detachEvent" in t && t.detachEvent("on" + i, s) : Jt(t, o), t[ki][o] = null
    }

    function Oi(t) {
        return t.stopPropagation ? t.stopPropagation() : t.originalEvent ? t.originalEvent._stopped = !0 : t.cancelBubble = !0, Gi(t), this
    }

    function Ri(t) {
        return Ai(t, "mousewheel", Oi), this
    }

    function Ni(t) {
        return Ei(t, "mousedown touchstart dblclick", Oi), Ai(t, "click", qi), this
    }

    function Di(t) {
        return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
    }

    function ji(t) {
        return Di(t), Oi(t), this
    }

    function Wi(t, i) {
        if (!i) return new B(t.clientX, t.clientY);
        var e = Si(i),
            n = e.boundingClientRect;
        return new B((t.clientX - n.left) / e.x - i.clientLeft, (t.clientY - n.top) / e.y - i.clientTop)
    }
    var Hi = mt && lt ? 2 * window.devicePixelRatio : ct ? window.devicePixelRatio : 1;

    function Fi(t) {
        return nt ? t.wheelDeltaY / 2 : t.deltaY && 0 === t.deltaMode ? -t.deltaY / Hi : t.deltaY && 1 === t.deltaMode ? 20 * -t.deltaY : t.deltaY && 2 === t.deltaMode ? 60 * -t.deltaY : t.deltaX || t.deltaZ ? 0 : t.wheelDelta ? (t.wheelDeltaY || t.wheelDelta) / 2 : t.detail && Math.abs(t.detail) < 32765 ? 20 * -t.detail : t.detail ? t.detail / -32765 * 60 : 0
    }
    var Ui, Vi = {};

    function qi(t) {
        Vi[t.type] = !0
    }

    function Gi(t) {
        var i = Vi[t.type];
        return Vi[t.type] = !1, i
    }

    function Ki(t, i) {
        var e = i.relatedTarget;
        if (!e) return !0;
        try {
            for (; e && e !== t;) e = e.parentNode
        } catch (t) {
            return !1
        }
        return e !== t
    }
    var Yi = (Object.freeze || Object)({
        on: Ei,
        off: Bi,
        stopPropagation: Oi,
        disableScrollPropagation: Ri,
        disableClickPropagation: Ni,
        preventDefault: Di,
        stop: ji,
        getMousePosition: Wi,
        getWheelDelta: Fi,
        fakeStop: qi,
        skipped: Gi,
        isExternalTarget: Ki,
        addListener: Ei,
        removeListener: Bi
    }),
        Xi = k.extend({
            run: function (t, i, e, n) {
                this.stop(), this._el = t, this._inProgress = !0, this._duration = e || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = Pi(t), this._offset = i.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
            },
            stop: function () {
                this._inProgress && (this._step(!0), this._complete())
            },
            _animate: function () {
                this._animId = M(this._animate, this), this._step()
            },
            _step: function (t) {
                var i = +new Date - this._startTime,
                    e = 1e3 * this._duration;
                i < e ? this._runFrame(this._easeOut(i / e), t) : (this._runFrame(1), this._complete())
            },
            _runFrame: function (t, i) {
                var e = this._startPos.add(this._offset.multiplyBy(t));
                i && e._round(), wi(this._el, e), this.fire("step")
            },
            _complete: function () {
                C(this._animId), this._inProgress = !1, this.fire("end")
            },
            _easeOut: function (t) {
                return 1 - Math.pow(1 - t, this._easeOutPower)
            }
        }),
        Ji = k.extend({
            options: {
                crs: X,
                center: void 0,
                zoom: void 0,
                minZoom: void 0,
                maxZoom: void 0,
                layers: [],
                maxBounds: void 0,
                renderer: void 0,
                zoomAnimation: !0,
                zoomAnimationThreshold: 4,
                fadeAnimation: !0,
                markerZoomAnimation: !0,
                transform3DLimit: 8388608,
                zoomSnap: 1,
                zoomDelta: 1,
                trackResize: !0
            },
            initialize: function (t, i) {
                i = p(this, i), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this._sizeChanged = !0, this._initContainer(t), this._initLayout(), this._onResize = a(this._onResize, this), this._initEvents(), i.maxBounds && this.setMaxBounds(i.maxBounds), void 0 !== i.zoom && (this._zoom = this._limitZoom(i.zoom)), i.center && void 0 !== i.zoom && this.setView(W(i.center), i.zoom, {
                    reset: !0
                }), this.callInitHooks(), this._zoomAnimated = oi && yt && !zt && this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), Ei(this._proxy, si, this._catchTransitionEnd, this)), this._addLayers(this.options.layers)
            },
            setView: function (t, i, e) {
                if ((i = void 0 === i ? this._zoom : this._limitZoom(i), t = this._limitCenter(W(t), i, this.options.maxBounds), e = e || {}, this._stop(), this._loaded && !e.reset && !0 !== e) && (void 0 !== e.animate && (e.zoom = h({
                    animate: e.animate
                }, e.zoom), e.pan = h({
                    animate: e.animate,
                    duration: e.duration
                }, e.pan)), this._zoom !== i ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, i, e.zoom) : this._tryAnimatedPan(t, e.pan))) return clearTimeout(this._sizeTimer), this;
                return this._resetView(t, i), this
            },
            setZoom: function (t, i) {
                return this._loaded ? this.setView(this.getCenter(), t, {
                    zoom: i
                }) : (this._zoom = t, this)
            },
            zoomIn: function (t, i) {
                return t = t || (yt ? this.options.zoomDelta : 1), this.setZoom(this._zoom + t, i)
            },
            zoomOut: function (t, i) {
                return t = t || (yt ? this.options.zoomDelta : 1), this.setZoom(this._zoom - t, i)
            },
            setZoomAround: function (t, i, e) {
                var n = this.getZoomScale(i),
                    o = this.getSize().divideBy(2),
                    s = (t instanceof B ? t : this.latLngToContainerPoint(t)).subtract(o).multiplyBy(1 - 1 / n),
                    r = this.containerPointToLatLng(o.add(s));
                return this.setView(r, i, {
                    zoom: e
                })
            },
            _getBoundsCenterZoom: function (t, i) {
                i = i || {}, t = t.getBounds ? t.getBounds() : D(t);
                var e = I(i.paddingTopLeft || i.padding || [0, 0]),
                    n = I(i.paddingBottomRight || i.padding || [0, 0]),
                    o = this.getBoundsZoom(t, !1, e.add(n));
                if ((o = "number" == typeof i.maxZoom ? Math.min(i.maxZoom, o) : o) === 1 / 0) return {
                    center: t.getCenter(),
                    zoom: o
                };
                var s = n.subtract(e).divideBy(2),
                    r = this.project(t.getSouthWest(), o),
                    a = this.project(t.getNorthEast(), o);
                return {
                    center: this.unproject(r.add(a).divideBy(2).add(s), o),
                    zoom: o
                }
            },
            fitBounds: function (t, i) {
                if (!(t = D(t)).isValid()) throw new Error("Bounds are not valid.");
                var e = this._getBoundsCenterZoom(t, i);
                return this.setView(e.center, e.zoom, i)
            },
            fitWorld: function (t) {
                return this.fitBounds([
                    [-90, -180],
                    [90, 180]
                ], t)
            },
            panTo: function (t, i) {
                return this.setView(t, this._zoom, {
                    pan: i
                })
            },
            panBy: function (t, i) {
                if (i = i || {}, !(t = I(t).round()).x && !t.y) return this.fire("moveend");
                if (!0 !== i.animate && !this.getSize().contains(t)) return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom()), this;
                if (this._panAnim || (this._panAnim = new Xi, this._panAnim.on({
                    step: this._onPanTransitionStep,
                    end: this._onPanTransitionEnd
                }, this)), i.noMoveStart || this.fire("movestart"), !1 !== i.animate) {
                    pi(this._mapPane, "leaflet-pan-anim");
                    var e = this._getMapPanePos().subtract(t).round();
                    this._panAnim.run(this._mapPane, e, i.duration || .25, i.easeLinearity)
                } else this._rawPanBy(t), this.fire("move").fire("moveend");
                return this
            },
            flyTo: function (n, o, t) {
                if (!1 === (t = t || {}).animate || !yt) return this.setView(n, o, t);
                this._stop();
                var s = this.project(this.getCenter()),
                    r = this.project(n),
                    i = this.getSize(),
                    a = this._zoom;
                n = W(n), o = void 0 === o ? a : o;
                var h = Math.max(i.x, i.y),
                    u = h * this.getZoomScale(a, o),
                    l = r.distanceTo(s) || 1,
                    c = 1.42,
                    _ = c * c;

                function e(t) {
                    var i = (u * u - h * h + (t ? -1 : 1) * _ * _ * l * l) / (2 * (t ? u : h) * _ * l),
                        e = Math.sqrt(i * i + 1) - i;
                    return e < 1e-9 ? -18 : Math.log(e)
                }

                function d(t) {
                    return (Math.exp(t) - Math.exp(-t)) / 2
                }

                function p(t) {
                    return (Math.exp(t) + Math.exp(-t)) / 2
                }
                var m = e(0);

                function f(t) {
                    return h * (p(m) * function (t) {
                        return d(t) / p(t)
                    }(m + c * t) - d(m)) / _
                }
                var g = Date.now(),
                    v = (e(1) - m) / c,
                    y = t.duration ? 1e3 * t.duration : 1e3 * v * .8;
                return this._moveStart(!0, t.noMoveStart),
                    function t() {
                        var i = (Date.now() - g) / y,
                            e = function (t) {
                                return 1 - Math.pow(1 - t, 1.5)
                            }(i) * v;
                        i <= 1 ? (this._flyToFrame = M(t, this), this._move(this.unproject(s.add(r.subtract(s).multiplyBy(f(e) / l)), a), this.getScaleZoom(h / function (t) {
                            return h * (p(m) / p(m + c * t))
                        }(e), a), {
                            flyTo: !0
                        })) : this._move(n, o)._moveEnd(!0)
                    }.call(this), this
            },
            flyToBounds: function (t, i) {
                var e = this._getBoundsCenterZoom(t, i);
                return this.flyTo(e.center, e.zoom, i)
            },
            setMaxBounds: function (t) {
                return (t = D(t)).isValid() ? (this.options.maxBounds && this.off("moveend", this._panInsideMaxBounds), this.options.maxBounds = t, this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : (this.options.maxBounds = null, this.off("moveend", this._panInsideMaxBounds))
            },
            setMinZoom: function (t) {
                var i = this.options.minZoom;
                return this.options.minZoom = t, this._loaded && i !== t && (this.fire("zoomlevelschange"), this.getZoom() < this.options.minZoom) ? this.setZoom(t) : this
            },
            setMaxZoom: function (t) {
                var i = this.options.maxZoom;
                return this.options.maxZoom = t, this._loaded && i !== t && (this.fire("zoomlevelschange"), this.getZoom() > this.options.maxZoom) ? this.setZoom(t) : this
            },
            panInsideBounds: function (t, i) {
                this._enforcingBounds = !0;
                var e = this.getCenter(),
                    n = this._limitCenter(e, this._zoom, D(t));
                return e.equals(n) || this.panTo(n, i), this._enforcingBounds = !1, this
            },
            panInside: function (t, i) {
                var e = I((i = i || {}).paddingTopLeft || i.padding || [0, 0]),
                    n = I(i.paddingBottomRight || i.padding || [0, 0]),
                    o = this.getCenter(),
                    s = this.project(o),
                    r = this.project(t),
                    a = this.getPixelBounds(),
                    h = a.getSize().divideBy(2),
                    u = R([a.min.add(e), a.max.subtract(n)]);
                if (!u.contains(r)) {
                    this._enforcingBounds = !0;
                    var l = s.subtract(r),
                        c = I(r.x + l.x, r.y + l.y);
                    (r.x < u.min.x || r.x > u.max.x) && (c.x = s.x - l.x, 0 < l.x ? c.x += h.x - e.x : c.x -= h.x - n.x), (r.y < u.min.y || r.y > u.max.y) && (c.y = s.y - l.y, 0 < l.y ? c.y += h.y - e.y : c.y -= h.y - n.y), this.panTo(this.unproject(c), i), this._enforcingBounds = !1
                }
                return this
            },
            invalidateSize: function (t) {
                if (!this._loaded) return this;
                t = h({
                    animate: !1,
                    pan: !0
                }, !0 === t ? {
                    animate: !0
                } : t);
                var i = this.getSize();
                this._sizeChanged = !0, this._lastCenter = null;
                var e = this.getSize(),
                    n = i.divideBy(2).round(),
                    o = e.divideBy(2).round(),
                    s = n.subtract(o);
                return s.x || s.y ? (t.animate && t.pan ? this.panBy(s) : (t.pan && this._rawPanBy(s), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(a(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
                    oldSize: i,
                    newSize: e
                })) : this
            },
            stop: function () {
                return this.setZoom(this._limitZoom(this._zoom)), this.options.zoomSnap || this.fire("viewreset"), this._stop()
            },
            locate: function (t) {
                if (t = this._locateOptions = h({
                    timeout: 1e4,
                    watch: !1
                }, t), !("geolocation" in navigator)) return this._handleGeolocationError({
                    code: 0,
                    message: "Geolocation not supported."
                }), this;
                var i = a(this._handleGeolocationResponse, this),
                    e = a(this._handleGeolocationError, this);
                return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(i, e, t) : navigator.geolocation.getCurrentPosition(i, e, t), this
            },
            stopLocate: function () {
                return navigator.geolocation && navigator.geolocation.clearWatch && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
            },
            _handleGeolocationError: function (t) {
                var i = t.code,
                    e = t.message || (1 === i ? "permission denied" : 2 === i ? "position unavailable" : "timeout");
                this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
                    code: i,
                    message: "Geolocation error: " + e + "."
                })
            },
            _handleGeolocationResponse: function (t) {
                var i = new j(t.coords.latitude, t.coords.longitude),
                    e = i.toBounds(2 * t.coords.accuracy),
                    n = this._locateOptions;
                if (n.setView) {
                    var o = this.getBoundsZoom(e);
                    this.setView(i, n.maxZoom ? Math.min(o, n.maxZoom) : o)
                }
                var s = {
                    latlng: i,
                    bounds: e,
                    timestamp: t.timestamp
                };
                for (var r in t.coords) "number" == typeof t.coords[r] && (s[r] = t.coords[r]);
                this.fire("locationfound", s)
            },
            addHandler: function (t, i) {
                if (!i) return this;
                var e = this[t] = new i(this);
                return this._handlers.push(e), this.options[t] && e.enable(), this
            },
            remove: function () {
                if (this._initEvents(!0), this._containerId !== this._container._leaflet_id) throw new Error("Map container is being reused by another instance");
                try {
                    delete this._container._leaflet_id, delete this._containerId
                } catch (t) {
                    this._container._leaflet_id = void 0, this._containerId = void 0
                }
                var t;
                for (t in void 0 !== this._locationWatchId && this.stopLocate(), this._stop(), ui(this._mapPane), this._clearControlPos && this._clearControlPos(), this._resizeRequest && (C(this._resizeRequest), this._resizeRequest = null), this._clearHandlers(), this._loaded && this.fire("unload"), this._layers) this._layers[t].remove();
                for (t in this._panes) ui(this._panes[t]);
                return this._layers = [], this._panes = [], delete this._mapPane, delete this._renderer, this
            },
            createPane: function (t, i) {
                var e = hi("div", "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""), i || this._mapPane);
                return t && (this._panes[t] = e), e
            },
            getCenter: function () {
                return this._checkIfLoaded(), this._lastCenter && !this._moved() ? this._lastCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
            },
            getZoom: function () {
                return this._zoom
            },
            getBounds: function () {
                var t = this.getPixelBounds();
                return new N(this.unproject(t.getBottomLeft()), this.unproject(t.getTopRight()))
            },
            getMinZoom: function () {
                return void 0 === this.options.minZoom ? this._layersMinZoom || 0 : this.options.minZoom
            },
            getMaxZoom: function () {
                return void 0 === this.options.maxZoom ? void 0 === this._layersMaxZoom ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
            },
            getBoundsZoom: function (t, i, e) {
                t = D(t), e = I(e || [0, 0]);
                var n = this.getZoom() || 0,
                    o = this.getMinZoom(),
                    s = this.getMaxZoom(),
                    r = t.getNorthWest(),
                    a = t.getSouthEast(),
                    h = this.getSize().subtract(e),
                    u = R(this.project(a, n), this.project(r, n)).getSize(),
                    l = yt ? this.options.zoomSnap : 1,
                    c = h.x / u.x,
                    _ = h.y / u.y,
                    d = i ? Math.max(c, _) : Math.min(c, _);
                return n = this.getScaleZoom(d, n), l && (n = Math.round(n / (l / 100)) * (l / 100), n = i ? Math.ceil(n / l) * l : Math.floor(n / l) * l), Math.max(o, Math.min(s, n))
            },
            getSize: function () {
                return this._size && !this._sizeChanged || (this._size = new B(this._container.clientWidth || 0, this._container.clientHeight || 0), this._sizeChanged = !1), this._size.clone()
            },
            getPixelBounds: function (t, i) {
                var e = this._getTopLeftPoint(t, i);
                return new O(e, e.add(this.getSize()))
            },
            getPixelOrigin: function () {
                return this._checkIfLoaded(), this._pixelOrigin
            },
            getPixelWorldBounds: function (t) {
                return this.options.crs.getProjectedBounds(void 0 === t ? this.getZoom() : t)
            },
            getPane: function (t) {
                return "string" == typeof t ? this._panes[t] : t
            },
            getPanes: function () {
                return this._panes
            },
            getContainer: function () {
                return this._container
            },
            getZoomScale: function (t, i) {
                var e = this.options.crs;
                return i = void 0 === i ? this._zoom : i, e.scale(t) / e.scale(i)
            },
            getScaleZoom: function (t, i) {
                var e = this.options.crs;
                i = void 0 === i ? this._zoom : i;
                var n = e.zoom(t * e.scale(i));
                return isNaN(n) ? 1 / 0 : n
            },
            project: function (t, i) {
                return i = void 0 === i ? this._zoom : i, this.options.crs.latLngToPoint(W(t), i)
            },
            unproject: function (t, i) {
                return i = void 0 === i ? this._zoom : i, this.options.crs.pointToLatLng(I(t), i)
            },
            layerPointToLatLng: function (t) {
                var i = I(t).add(this.getPixelOrigin());
                return this.unproject(i)
            },
            latLngToLayerPoint: function (t) {
                return this.project(W(t))._round()._subtract(this.getPixelOrigin())
            },
            wrapLatLng: function (t) {
                return this.options.crs.wrapLatLng(W(t))
            },
            wrapLatLngBounds: function (t) {
                return this.options.crs.wrapLatLngBounds(D(t))
            },
            distance: function (t, i) {
                return this.options.crs.distance(W(t), W(i))
            },
            containerPointToLayerPoint: function (t) {
                return I(t).subtract(this._getMapPanePos())
            },
            layerPointToContainerPoint: function (t) {
                return I(t).add(this._getMapPanePos())
            },
            containerPointToLatLng: function (t) {
                var i = this.containerPointToLayerPoint(I(t));
                return this.layerPointToLatLng(i)
            },
            latLngToContainerPoint: function (t) {
                return this.layerPointToContainerPoint(this.latLngToLayerPoint(W(t)))
            },
            mouseEventToContainerPoint: function (t) {
                return Wi(t, this._container)
            },
            mouseEventToLayerPoint: function (t) {
                return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
            },
            mouseEventToLatLng: function (t) {
                return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
            },
            _initContainer: function (t) {
                var i = this._container = ri(t);
                if (!i) throw new Error("Map container not found.");
                if (i._leaflet_id) throw new Error("Map container is already initialized.");
                Ei(i, "scroll", this._onScroll, this), this._containerId = u(i)
            },
            _initLayout: function () {
                var t = this._container;
                this._fadeAnimated = this.options.fadeAnimation && yt, pi(t, "leaflet-container" + (Tt ? " leaflet-touch" : "") + (Ct ? " leaflet-retina" : "") + (et ? " leaflet-oldie" : "") + (_t ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
                var i = ai(t, "position");
                "absolute" !== i && "relative" !== i && "fixed" !== i && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
            },
            _initPanes: function () {
                var t = this._panes = {};
                this._paneRenderers = {}, this._mapPane = this.createPane("mapPane", this._container), wi(this._mapPane, new B(0, 0)), this.createPane("tilePane"), this.createPane("shadowPane"), this.createPane("overlayPane"), this.createPane("markerPane"), this.createPane("tooltipPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (pi(t.markerPane, "leaflet-zoom-hide"), pi(t.shadowPane, "leaflet-zoom-hide"))
            },
            _resetView: function (t, i) {
                wi(this._mapPane, new B(0, 0));
                var e = !this._loaded;
                this._loaded = !0, i = this._limitZoom(i), this.fire("viewprereset");
                var n = this._zoom !== i;
                this._moveStart(n, !1)._move(t, i)._moveEnd(n), this.fire("viewreset"), e && this.fire("load")
            },
            _moveStart: function (t, i) {
                return t && this.fire("zoomstart"), i || this.fire("movestart"), this
            },
            _move: function (t, i, e) {
                void 0 === i && (i = this._zoom);
                var n = this._zoom !== i;
                return this._zoom = i, this._lastCenter = t, this._pixelOrigin = this._getNewPixelOrigin(t), (n || e && e.pinch) && this.fire("zoom", e), this.fire("move", e)
            },
            _moveEnd: function (t) {
                return t && this.fire("zoomend"), this.fire("moveend")
            },
            _stop: function () {
                return C(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
            },
            _rawPanBy: function (t) {
                wi(this._mapPane, this._getMapPanePos().subtract(t))
            },
            _getZoomSpan: function () {
                return this.getMaxZoom() - this.getMinZoom()
            },
            _panInsideMaxBounds: function () {
                this._enforcingBounds || this.panInsideBounds(this.options.maxBounds)
            },
            _checkIfLoaded: function () {
                if (!this._loaded) throw new Error("Set map center and zoom first.")
            },
            _initEvents: function (t) {
                this._targets = {};
                var i = t ? Bi : Ei;
                i((this._targets[u(this._container)] = this)._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup", this._handleDOMEvent, this), this.options.trackResize && i(window, "resize", this._onResize, this), yt && this.options.transform3DLimit && (t ? this.off : this.on).call(this, "moveend", this._onMoveEnd)
            },
            _onResize: function () {
                C(this._resizeRequest), this._resizeRequest = M(function () {
                    this.invalidateSize({
                        debounceMoveend: !0
                    })
                }, this)
            },
            _onScroll: function () {
                this._container.scrollTop = 0, this._container.scrollLeft = 0
            },
            _onMoveEnd: function () {
                var t = this._getMapPanePos();
                Math.max(Math.abs(t.x), Math.abs(t.y)) >= this.options.transform3DLimit && this._resetView(this.getCenter(), this.getZoom())
            },
            _findEventTargets: function (t, i) {
                for (var e, n = [], o = "mouseout" === i || "mouseover" === i, s = t.target || t.srcElement, r = !1; s;) {
                    if ((e = this._targets[u(s)]) && ("click" === i || "preclick" === i) && !t._simulated && this._draggableMoved(e)) {
                        r = !0;
                        break
                    }
                    if (e && e.listens(i, !0)) {
                        if (o && !Ki(s, t)) break;
                        if (n.push(e), o) break
                    }
                    if (s === this._container) break;
                    s = s.parentNode
                }
                return n.length || r || o || !Ki(s, t) || (n = [this]), n
            },
            _handleDOMEvent: function (t) {
                if (this._loaded && !Gi(t)) {
                    var i = t.type;
                    "mousedown" !== i && "keypress" !== i && "keyup" !== i && "keydown" !== i || zi(t.target || t.srcElement), this._fireDOMEvent(t, i)
                }
            },
            _mouseEvents: ["click", "dblclick", "mouseover", "mouseout", "contextmenu"],
            _fireDOMEvent: function (t, i, e) {
                if ("click" === t.type) {
                    var n = h({}, t);
                    n.type = "preclick", this._fireDOMEvent(n, n.type, e)
                }
                if (!t._stopped && (e = (e || []).concat(this._findEventTargets(t, i))).length) {
                    var o = e[0];
                    "contextmenu" === i && o.listens(i, !0) && Di(t);
                    var s = {
                        originalEvent: t
                    };
                    if ("keypress" !== t.type && "keydown" !== t.type && "keyup" !== t.type) {
                        var r = o.getLatLng && (!o._radius || o._radius <= 10);
                        s.containerPoint = r ? this.latLngToContainerPoint(o.getLatLng()) : this.mouseEventToContainerPoint(t), s.layerPoint = this.containerPointToLayerPoint(s.containerPoint), s.latlng = r ? o.getLatLng() : this.layerPointToLatLng(s.layerPoint)
                    }
                    for (var a = 0; a < e.length; a++)
                        if (e[a].fire(i, s, !0), s.originalEvent._stopped || !1 === e[a].options.bubblingMouseEvents && -1 !== y(this._mouseEvents, i)) return
                }
            },
            _draggableMoved: function (t) {
                return (t = t.dragging && t.dragging.enabled() ? t : this).dragging && t.dragging.moved() || this.boxZoom && this.boxZoom.moved()
            },
            _clearHandlers: function () {
                for (var t = 0, i = this._handlers.length; t < i; t++) this._handlers[t].disable()
            },
            whenReady: function (t, i) {
                return this._loaded ? t.call(i || this, {
                    target: this
                }) : this.on("load", t, i), this
            },
            _getMapPanePos: function () {
                return Pi(this._mapPane) || new B(0, 0)
            },
            _moved: function () {
                var t = this._getMapPanePos();
                return t && !t.equals([0, 0])
            },
            _getTopLeftPoint: function (t, i) {
                return (t && void 0 !== i ? this._getNewPixelOrigin(t, i) : this.getPixelOrigin()).subtract(this._getMapPanePos())
            },
            _getNewPixelOrigin: function (t, i) {
                var e = this.getSize()._divideBy(2);
                return this.project(t, i)._subtract(e)._add(this._getMapPanePos())._round()
            },
            _latLngToNewLayerPoint: function (t, i, e) {
                var n = this._getNewPixelOrigin(e, i);
                return this.project(t, i)._subtract(n)
            },
            _latLngBoundsToNewLayerBounds: function (t, i, e) {
                var n = this._getNewPixelOrigin(e, i);
                return R([this.project(t.getSouthWest(), i)._subtract(n), this.project(t.getNorthWest(), i)._subtract(n), this.project(t.getSouthEast(), i)._subtract(n), this.project(t.getNorthEast(), i)._subtract(n)])
            },
            _getCenterLayerPoint: function () {
                return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
            },
            _getCenterOffset: function (t) {
                return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
            },
            _limitCenter: function (t, i, e) {
                if (!e) return t;
                var n = this.project(t, i),
                    o = this.getSize().divideBy(2),
                    s = new O(n.subtract(o), n.add(o)),
                    r = this._getBoundsOffset(s, e, i);
                return r.round().equals([0, 0]) ? t : this.unproject(n.add(r), i)
            },
            _limitOffset: function (t, i) {
                if (!i) return t;
                var e = this.getPixelBounds(),
                    n = new O(e.min.add(t), e.max.add(t));
                return t.add(this._getBoundsOffset(n, i))
            },
            _getBoundsOffset: function (t, i, e) {
                var n = R(this.project(i.getNorthEast(), e), this.project(i.getSouthWest(), e)),
                    o = n.min.subtract(t.min),
                    s = n.max.subtract(t.max);
                return new B(this._rebound(o.x, -s.x), this._rebound(o.y, -s.y))
            },
            _rebound: function (t, i) {
                return 0 < t + i ? Math.round(t - i) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(i))
            },
            _limitZoom: function (t) {
                var i = this.getMinZoom(),
                    e = this.getMaxZoom(),
                    n = yt ? this.options.zoomSnap : 1;
                return n && (t = Math.round(t / n) * n), Math.max(i, Math.min(e, t))
            },
            _onPanTransitionStep: function () {
                this.fire("move")
            },
            _onPanTransitionEnd: function () {
                mi(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
            },
            _tryAnimatedPan: function (t, i) {
                var e = this._getCenterOffset(t)._trunc();
                return !(!0 !== (i && i.animate) && !this.getSize().contains(e)) && (this.panBy(e, i), !0)
            },
            _createAnimProxy: function () {
                var t = this._proxy = hi("div", "leaflet-proxy leaflet-zoom-animated");
                this._panes.mapPane.appendChild(t), this.on("zoomanim", function (t) {
                    var i = ni,
                        e = this._proxy.style[i];
                    xi(this._proxy, this.project(t.center, t.zoom), this.getZoomScale(t.zoom, 1)), e === this._proxy.style[i] && this._animatingZoom && this._onZoomTransitionEnd()
                }, this), this.on("load moveend", function () {
                    var t = this.getCenter(),
                        i = this.getZoom();
                    xi(this._proxy, this.project(t, i), this.getZoomScale(i, 1))
                }, this), this._on("unload", this._destroyAnimProxy, this)
            },
            _destroyAnimProxy: function () {
                ui(this._proxy), delete this._proxy
            },
            _catchTransitionEnd: function (t) {
                this._animatingZoom && 0 <= t.propertyName.indexOf("transform") && this._onZoomTransitionEnd()
            },
            _nothingToAnimate: function () {
                return !this._container.getElementsByClassName("leaflet-zoom-animated").length
            },
            _tryAnimatedZoom: function (t, i, e) {
                if (this._animatingZoom) return !0;
                if (e = e || {}, !this._zoomAnimated || !1 === e.animate || this._nothingToAnimate() || Math.abs(i - this._zoom) > this.options.zoomAnimationThreshold) return !1;
                var n = this.getZoomScale(i),
                    o = this._getCenterOffset(t)._divideBy(1 - 1 / n);
                return !(!0 !== e.animate && !this.getSize().contains(o)) && (M(function () {
                    this._moveStart(!0, !1)._animateZoom(t, i, !0)
                }, this), !0)
            },
            _animateZoom: function (t, i, e, n) {
                this._mapPane && (e && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = i, pi(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
                    center: t,
                    zoom: i,
                    noUpdate: n
                }), setTimeout(a(this._onZoomTransitionEnd, this), 250))
            },
            _onZoomTransitionEnd: function () {
                this._animatingZoom && (this._mapPane && mi(this._mapPane, "leaflet-zoom-anim"), this._animatingZoom = !1, this._move(this._animateToCenter, this._animateToZoom), M(function () {
                    this._moveEnd(!0)
                }, this))
            }
        });

    function $i(t) {
        return new Qi(t)
    }
    var Qi = Z.extend({
        options: {
            position: "topright"
        },
        initialize: function (t) {
            p(this, t)
        },
        getPosition: function () {
            return this.options.position
        },
        setPosition: function (t) {
            var i = this._map;
            return i && i.removeControl(this), this.options.position = t, i && i.addControl(this), this
        },
        getContainer: function () {
            return this._container
        },
        addTo: function (t) {
            this.remove(), this._map = t;
            var i = this._container = this.onAdd(t),
                e = this.getPosition(),
                n = t._controlCorners[e];
            return pi(i, "leaflet-control"), -1 !== e.indexOf("bottom") ? n.insertBefore(i, n.firstChild) : n.appendChild(i), this._map.on("unload", this.remove, this), this
        },
        remove: function () {
            return this._map && (ui(this._container), this.onRemove && this.onRemove(this._map), this._map.off("unload", this.remove, this), this._map = null), this
        },
        _refocusOnMap: function (t) {
            this._map && t && 0 < t.screenX && 0 < t.screenY && this._map.getContainer().focus()
        }
    });
    Ji.include({
        addControl: function (t) {
            return t.addTo(this), this
        },
        removeControl: function (t) {
            return t.remove(), this
        },
        _initControlPos: function () {
            var n = this._controlCorners = {},
                o = "leaflet-",
                s = this._controlContainer = hi("div", o + "control-container", this._container);

            function t(t, i) {
                var e = o + t + " " + o + i;
                n[t + i] = hi("div", e, s)
            }
            t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
        },
        _clearControlPos: function () {
            for (var t in this._controlCorners) ui(this._controlCorners[t]);
            ui(this._controlContainer), delete this._controlCorners, delete this._controlContainer
        }
    });
    var te = Qi.extend({
        options: {
            collapsed: !0,
            position: "topright",
            autoZIndex: !0,
            hideSingleBase: !1,
            sortLayers: !1,
            sortFunction: function (t, i, e, n) {
                return e < n ? -1 : n < e ? 1 : 0
            }
        },
        initialize: function (t, i, e) {
            for (var n in p(this, e), this._layerControlInputs = [], this._layers = [], this._lastZIndex = 0, this._handlingClick = !1, t) this._addLayer(t[n], n);
            for (n in i) this._addLayer(i[n], n, !0)
        },
        onAdd: function (t) {
            this._initLayout(), this._update(), (this._map = t).on("zoomend", this._checkDisabledLayers, this);
            for (var i = 0; i < this._layers.length; i++) this._layers[i].layer.on("add remove", this._onLayerChange, this);
            return this._container
        },
        addTo: function (t) {
            return Qi.prototype.addTo.call(this, t), this._expandIfNotCollapsed()
        },
        onRemove: function () {
            this._map.off("zoomend", this._checkDisabledLayers, this);
            for (var t = 0; t < this._layers.length; t++) this._layers[t].layer.off("add remove", this._onLayerChange, this)
        },
        addBaseLayer: function (t, i) {
            return this._addLayer(t, i), this._map ? this._update() : this
        },
        addOverlay: function (t, i) {
            return this._addLayer(t, i, !0), this._map ? this._update() : this
        },
        removeLayer: function (t) {
            t.off("add remove", this._onLayerChange, this);
            var i = this._getLayer(u(t));
            return i && this._layers.splice(this._layers.indexOf(i), 1), this._map ? this._update() : this
        },
        expand: function () {
            pi(this._container, "leaflet-control-layers-expanded"), this._section.style.height = null;
            var t = this._map.getSize().y - (this._container.offsetTop + 50);
            return t < this._section.clientHeight ? (pi(this._section, "leaflet-control-layers-scrollbar"), this._section.style.height = t + "px") : mi(this._section, "leaflet-control-layers-scrollbar"), this._checkDisabledLayers(), this
        },
        collapse: function () {
            return mi(this._container, "leaflet-control-layers-expanded"), this
        },
        _initLayout: function () {
            var t = "leaflet-control-layers",
                i = this._container = hi("div", t),
                e = this.options.collapsed;
            i.setAttribute("aria-haspopup", !0), Ni(i), Ri(i);
            var n = this._section = hi("section", t + "-list");
            e && (this._map.on("click", this.collapse, this), st || Ei(i, {
                mouseenter: this.expand,
                mouseleave: this.collapse
            }, this));
            var o = this._layersLink = hi("a", t + "-toggle", i);
            o.href = "#", o.title = "Layers", Tt ? (Ei(o, "click", ji), Ei(o, "click", this.expand, this)) : Ei(o, "focus", this.expand, this), e || this.expand(), this._baseLayersList = hi("div", t + "-base", n), this._separator = hi("div", t + "-separator", n), this._overlaysList = hi("div", t + "-overlays", n), i.appendChild(n)
        },
        _getLayer: function (t) {
            for (var i = 0; i < this._layers.length; i++)
                if (this._layers[i] && u(this._layers[i].layer) === t) return this._layers[i]
        },
        _addLayer: function (t, i, e) {
            this._map && t.on("add remove", this._onLayerChange, this), this._layers.push({
                layer: t,
                name: i,
                overlay: e
            }), this.options.sortLayers && this._layers.sort(a(function (t, i) {
                return this.options.sortFunction(t.layer, i.layer, t.name, i.name)
            }, this)), this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex)), this._expandIfNotCollapsed()
        },
        _update: function () {
            if (!this._container) return this;
            li(this._baseLayersList), li(this._overlaysList), this._layerControlInputs = [];
            var t, i, e, n, o = 0;
            for (e = 0; e < this._layers.length; e++) n = this._layers[e], this._addItem(n), i = i || n.overlay, t = t || !n.overlay, o += n.overlay ? 0 : 1;
            return this.options.hideSingleBase && (t = t && 1 < o, this._baseLayersList.style.display = t ? "" : "none"), this._separator.style.display = i && t ? "" : "none", this
        },
        _onLayerChange: function (t) {
            this._handlingClick || this._update();
            var i = this._getLayer(u(t.target)),
                e = i.overlay ? "add" === t.type ? "overlayadd" : "overlayremove" : "add" === t.type ? "baselayerchange" : null;
            e && this._map.fire(e, i)
        },
        _createRadioElement: function (t, i) {
            var e = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (i ? ' checked="checked"' : "") + "/>",
                n = document.createElement("div");
            return n.innerHTML = e, n.firstChild
        },
        _addItem: function (t) {
            var i, e = document.createElement("label"),
                n = this._map.hasLayer(t.layer);
            t.overlay ? ((i = document.createElement("input")).type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = n) : i = this._createRadioElement("leaflet-base-layers_" + u(this), n), this._layerControlInputs.push(i), i.layerId = u(t.layer), Ei(i, "click", this._onInputClick, this);
            var o = document.createElement("span");
            o.innerHTML = " " + t.name;
            var s = document.createElement("div");
            return e.appendChild(s), s.appendChild(i), s.appendChild(o), (t.overlay ? this._overlaysList : this._baseLayersList).appendChild(e), this._checkDisabledLayers(), e
        },
        _onInputClick: function () {
            var t, i, e = this._layerControlInputs,
                n = [],
                o = [];
            this._handlingClick = !0;
            for (var s = e.length - 1; 0 <= s; s--) t = e[s], i = this._getLayer(t.layerId).layer, t.checked ? n.push(i) : t.checked || o.push(i);
            for (s = 0; s < o.length; s++) this._map.hasLayer(o[s]) && this._map.removeLayer(o[s]);
            for (s = 0; s < n.length; s++) this._map.hasLayer(n[s]) || this._map.addLayer(n[s]);
            this._handlingClick = !1, this._refocusOnMap()
        },
        _checkDisabledLayers: function () {
            for (var t, i, e = this._layerControlInputs, n = this._map.getZoom(), o = e.length - 1; 0 <= o; o--) t = e[o], i = this._getLayer(t.layerId).layer, t.disabled = void 0 !== i.options.minZoom && n < i.options.minZoom || void 0 !== i.options.maxZoom && n > i.options.maxZoom
        },
        _expandIfNotCollapsed: function () {
            return this._map && !this.options.collapsed && this.expand(), this
        },
        _expand: function () {
            return this.expand()
        },
        _collapse: function () {
            return this.collapse()
        }
    }),
        ie = Qi.extend({
            options: {
                position: "topleft",
                zoomInText: "+",
                zoomInTitle: "Zoom in",
                zoomOutText: "&#x2212;",
                zoomOutTitle: "Zoom out"
            },
            onAdd: function (t) {
                var i = "leaflet-control-zoom",
                    e = hi("div", i + " leaflet-bar"),
                    n = this.options;
                return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, i + "-in", e, this._zoomIn), this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, i + "-out", e, this._zoomOut), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), e
            },
            onRemove: function (t) {
                t.off("zoomend zoomlevelschange", this._updateDisabled, this)
            },
            disable: function () {
                return this._disabled = !0, this._updateDisabled(), this
            },
            enable: function () {
                return this._disabled = !1, this._updateDisabled(), this
            },
            _zoomIn: function (t) {
                !this._disabled && this._map._zoom < this._map.getMaxZoom() && this._map.zoomIn(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
            },
            _zoomOut: function (t) {
                !this._disabled && this._map._zoom > this._map.getMinZoom() && this._map.zoomOut(this._map.options.zoomDelta * (t.shiftKey ? 3 : 1))
            },
            _createButton: function (t, i, e, n, o) {
                var s = hi("a", e, n);
                return s.innerHTML = t, s.href = "#", s.title = i, s.setAttribute("role", "button"), s.setAttribute("aria-label", i), Ni(s), Ei(s, "click", ji), Ei(s, "click", o, this), Ei(s, "click", this._refocusOnMap, this), s
            },
            _updateDisabled: function () {
                var t = this._map,
                    i = "leaflet-disabled";
                mi(this._zoomInButton, i), mi(this._zoomOutButton, i), !this._disabled && t._zoom !== t.getMinZoom() || pi(this._zoomOutButton, i), !this._disabled && t._zoom !== t.getMaxZoom() || pi(this._zoomInButton, i)
            }
        });
    Ji.mergeOptions({
        zoomControl: !0
    }), Ji.addInitHook(function () {
        this.options.zoomControl && (this.zoomControl = new ie, this.addControl(this.zoomControl))
    });
    var ee = Qi.extend({
        options: {
            position: "bottomleft",
            maxWidth: 100,
            metric: !0,
            imperial: !0
        },
        onAdd: function (t) {
            var i = "leaflet-control-scale",
                e = hi("div", i),
                n = this.options;
            return this._addScales(n, i + "-line", e), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), e
        },
        onRemove: function (t) {
            t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
        },
        _addScales: function (t, i, e) {
            t.metric && (this._mScale = hi("div", i, e)), t.imperial && (this._iScale = hi("div", i, e))
        },
        _update: function () {
            var t = this._map,
                i = t.getSize().y / 2,
                e = t.distance(t.containerPointToLatLng([0, i]), t.containerPointToLatLng([this.options.maxWidth, i]));
            this._updateScales(e)
        },
        _updateScales: function (t) {
            this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t)
        },
        _updateMetric: function (t) {
            var i = this._getRoundNum(t),
                e = i < 1e3 ? i + " m" : i / 1e3 + " km";
            this._updateScale(this._mScale, e, i / t)
        },
        _updateImperial: function (t) {
            var i, e, n, o = 3.2808399 * t;
            5280 < o ? (i = o / 5280, e = this._getRoundNum(i), this._updateScale(this._iScale, e + " mi", e / i)) : (n = this._getRoundNum(o), this._updateScale(this._iScale, n + " ft", n / o))
        },
        _updateScale: function (t, i, e) {
            t.style.width = Math.round(this.options.maxWidth * e) + "px", t.innerHTML = i
        },
        _getRoundNum: function (t) {
            var i = Math.pow(10, (Math.floor(t) + "").length - 1),
                e = t / i;
            return i * (e = 10 <= e ? 10 : 5 <= e ? 5 : 3 <= e ? 3 : 2 <= e ? 2 : 1)
        }
    }),
        ne = Qi.extend({
            options: {
                position: "bottomright",
                prefix: '<a href="https://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
            },
            initialize: function (t) {
                p(this, t), this._attributions = {}
            },
            onAdd: function (t) {
                for (var i in (t.attributionControl = this)._container = hi("div", "leaflet-control-attribution"), Ni(this._container), t._layers) t._layers[i].getAttribution && this.addAttribution(t._layers[i].getAttribution());
                return this._update(), this._container
            },
            setPrefix: function (t) {
                return this.options.prefix = t, this._update(), this
            },
            addAttribution: function (t) {
                return t && (this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update()), this
            },
            removeAttribution: function (t) {
                return t && this._attributions[t] && (this._attributions[t]--, this._update()), this
            },
            _update: function () {
                if (this._map) {
                    var t = [];
                    for (var i in this._attributions) this._attributions[i] && t.push(i);
                    var e = [];
                    this.options.prefix && e.push(this.options.prefix), t.length && e.push(t.join(", ")), this._container.innerHTML = e.join(" | ")
                }
            }
        });
    Ji.mergeOptions({
        attributionControl: !0
    }), Ji.addInitHook(function () {
        this.options.attributionControl && (new ne).addTo(this)
    });
    Qi.Layers = te, Qi.Zoom = ie, Qi.Scale = ee, Qi.Attribution = ne, $i.layers = function (t, i, e) {
        return new te(t, i, e)
    }, $i.zoom = function (t) {
        return new ie(t)
    }, $i.scale = function (t) {
        return new ee(t)
    }, $i.attribution = function (t) {
        return new ne(t)
    };
    var oe = Z.extend({
        initialize: function (t) {
            this._map = t
        },
        enable: function () {
            return this._enabled || (this._enabled = !0, this.addHooks()), this
        },
        disable: function () {
            return this._enabled && (this._enabled = !1, this.removeHooks()), this
        },
        enabled: function () {
            return !!this._enabled
        }
    });
    oe.addTo = function (t, i) {
        return t.addHandler(i, this), this
    };
    var se, re = {
        Events: E
    },
        ae = Tt ? "touchstart mousedown" : "mousedown",
        he = {
            mousedown: "mouseup",
            touchstart: "touchend",
            pointerdown: "touchend",
            MSPointerDown: "touchend"
        },
        ue = {
            mousedown: "mousemove",
            touchstart: "touchmove",
            pointerdown: "touchmove",
            MSPointerDown: "touchmove"
        },
        le = k.extend({
            options: {
                clickTolerance: 3
            },
            initialize: function (t, i, e, n) {
                p(this, n), this._element = t, this._dragStartTarget = i || t, this._preventOutline = e
            },
            enable: function () {
                this._enabled || (Ei(this._dragStartTarget, ae, this._onDown, this), this._enabled = !0)
            },
            disable: function () {
                this._enabled && (le._dragging === this && this.finishDrag(), Bi(this._dragStartTarget, ae, this._onDown, this), this._enabled = !1, this._moved = !1)
            },
            _onDown: function (t) {
                if (!t._simulated && this._enabled && (this._moved = !1, !di(this._element, "leaflet-zoom-anim") && !(le._dragging || t.shiftKey || 1 !== t.which && 1 !== t.button && !t.touches || ((le._dragging = this)._preventOutline && zi(this._element), bi(), $t(), this._moving)))) {
                    this.fire("down");
                    var i = t.touches ? t.touches[0] : t,
                        e = Ci(this._element);
                    this._startPoint = new B(i.clientX, i.clientY), this._parentScale = Si(e), Ei(document, ue[t.type], this._onMove, this), Ei(document, he[t.type], this._onUp, this)
                }
            },
            _onMove: function (t) {
                if (!t._simulated && this._enabled)
                    if (t.touches && 1 < t.touches.length) this._moved = !0;
                    else {
                        var i = t.touches && 1 === t.touches.length ? t.touches[0] : t,
                            e = new B(i.clientX, i.clientY)._subtract(this._startPoint);
                        (e.x || e.y) && (Math.abs(e.x) + Math.abs(e.y) < this.options.clickTolerance || (e.x /= this._parentScale.x, e.y /= this._parentScale.y, Di(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = Pi(this._element).subtract(e), pi(document.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, window.SVGElementInstance && this._lastTarget instanceof SVGElementInstance && (this._lastTarget = this._lastTarget.correspondingUseElement), pi(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(e), this._moving = !0, C(this._animRequest), this._lastEvent = t, this._animRequest = M(this._updatePosition, this, !0)))
                    }
            },
            _updatePosition: function () {
                var t = {
                    originalEvent: this._lastEvent
                };
                this.fire("predrag", t), wi(this._element, this._newPos), this.fire("drag", t)
            },
            _onUp: function (t) {
                !t._simulated && this._enabled && this.finishDrag()
            },
            finishDrag: function () {
                for (var t in mi(document.body, "leaflet-dragging"), this._lastTarget && (mi(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null), ue) Bi(document, ue[t], this._onMove, this), Bi(document, he[t], this._onUp, this);
                Ti(), Qt(), this._moved && this._moving && (C(this._animRequest), this.fire("dragend", {
                    distance: this._newPos.distanceTo(this._startPos)
                })), this._moving = !1, le._dragging = !1
            }
        });

    function ce(t, i) {
        if (!i || !t.length) return t.slice();
        var e = i * i;
        return t = function (t, i) {
            var e = t.length,
                n = new (typeof Uint8Array != void 0 + "" ? Uint8Array : Array)(e);
            n[0] = n[e - 1] = 1,
                function t(i, e, n, o, s) {
                    var r, a, h, u = 0;
                    for (a = o + 1; a <= s - 1; a++) h = fe(i[a], i[o], i[s], !0), u < h && (r = a, u = h);
                    n < u && (e[r] = 1, t(i, e, n, o, r), t(i, e, n, r, s))
                }(t, n, i, 0, e - 1);
            var o, s = [];
            for (o = 0; o < e; o++) n[o] && s.push(t[o]);
            return s
        }(t = function (t, i) {
            for (var e = [t[0]], n = 1, o = 0, s = t.length; n < s; n++) r = t[n], a = t[o], void 0, h = a.x - r.x, u = a.y - r.y, i < h * h + u * u && (e.push(t[n]), o = n);
            var r, a, h, u;
            o < s - 1 && e.push(t[s - 1]);
            return e
        }(t, e), e)
    }

    function _e(t, i, e) {
        return Math.sqrt(fe(t, i, e, !0))
    }

    function de(t, i, e, n, o) {
        var s, r, a, h = n ? se : me(t, e),
            u = me(i, e);
        for (se = u; ;) {
            if (!(h | u)) return [t, i];
            if (h & u) return !1;
            a = me(r = pe(t, i, s = h || u, e, o), e), s === h ? (t = r, h = a) : (i = r, u = a)
        }
    }

    function pe(t, i, e, n, o) {
        var s, r, a = i.x - t.x,
            h = i.y - t.y,
            u = n.min,
            l = n.max;
        return 8 & e ? (s = t.x + a * (l.y - t.y) / h, r = l.y) : 4 & e ? (s = t.x + a * (u.y - t.y) / h, r = u.y) : 2 & e ? (s = l.x, r = t.y + h * (l.x - t.x) / a) : 1 & e && (s = u.x, r = t.y + h * (u.x - t.x) / a), new B(s, r, o)
    }

    function me(t, i) {
        var e = 0;
        return t.x < i.min.x ? e |= 1 : t.x > i.max.x && (e |= 2), t.y < i.min.y ? e |= 4 : t.y > i.max.y && (e |= 8), e
    }

    function fe(t, i, e, n) {
        var o, s = i.x,
            r = i.y,
            a = e.x - s,
            h = e.y - r,
            u = a * a + h * h;
        return 0 < u && (1 < (o = ((t.x - s) * a + (t.y - r) * h) / u) ? (s = e.x, r = e.y) : 0 < o && (s += a * o, r += h * o)), a = t.x - s, h = t.y - r, n ? a * a + h * h : new B(s, r)
    }

    function ge(t) {
        return !v(t[0]) || "object" != typeof t[0][0] && void 0 !== t[0][0]
    }

    function ve(t) {
        return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."), ge(t)
    }
    var ye = (Object.freeze || Object)({
        simplify: ce,
        pointToSegmentDistance: _e,
        closestPointOnSegment: function (t, i, e) {
            return fe(t, i, e)
        },
        clipSegment: de,
        _getEdgeIntersection: pe,
        _getBitCode: me,
        _sqClosestPointOnSegment: fe,
        isFlat: ge,
        _flat: ve
    });

    function xe(t, i, e) {
        var n, o, s, r, a, h, u, l, c, _ = [1, 4, 2, 8];
        for (o = 0, u = t.length; o < u; o++) t[o]._code = me(t[o], i);
        for (r = 0; r < 4; r++) {
            for (l = _[r], n = [], o = 0, s = (u = t.length) - 1; o < u; s = o++) a = t[o], h = t[s], a._code & l ? h._code & l || ((c = pe(h, a, l, i, e))._code = me(c, i), n.push(c)) : (h._code & l && ((c = pe(h, a, l, i, e))._code = me(c, i), n.push(c)), n.push(a));
            t = n
        }
        return t
    }
    var we, Pe = (Object.freeze || Object)({
        clipPolygon: xe
    }),
        Le = {
            project: function (t) {
                return new B(t.lng, t.lat)
            },
            unproject: function (t) {
                return new j(t.y, t.x)
            },
            bounds: new O([-180, -90], [180, 90])
        },
        be = {
            R: 6378137,
            R_MINOR: 6356752.314245179,
            bounds: new O([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
            project: function (t) {
                var i = Math.PI / 180,
                    e = this.R,
                    n = t.lat * i,
                    o = this.R_MINOR / e,
                    s = Math.sqrt(1 - o * o),
                    r = s * Math.sin(n),
                    a = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - r) / (1 + r), s / 2);
                return n = -e * Math.log(Math.max(a, 1e-10)), new B(t.lng * i * e, n)
            },
            unproject: function (t) {
                for (var i, e = 180 / Math.PI, n = this.R, o = this.R_MINOR / n, s = Math.sqrt(1 - o * o), r = Math.exp(-t.y / n), a = Math.PI / 2 - 2 * Math.atan(r), h = 0, u = .1; h < 15 && 1e-7 < Math.abs(u); h++) i = s * Math.sin(a), i = Math.pow((1 - i) / (1 + i), s / 2), a += u = Math.PI / 2 - 2 * Math.atan(r * i) - a;
                return new j(a * e, t.x * e / n)
            }
        },
        Te = (Object.freeze || Object)({
            LonLat: Le,
            Mercator: be,
            SphericalMercator: q
        }),
        ze = h({}, U, {
            code: "EPSG:3395",
            projection: be,
            transformation: (we = .5 / (Math.PI * be.R), K(we, .5, -we, .5))
        }),
        Me = h({}, U, {
            code: "EPSG:4326",
            projection: Le,
            transformation: K(1 / 180, 1, -1 / 180, .5)
        }),
        Ce = h({}, F, {
            projection: Le,
            transformation: K(1, 0, -1, 0),
            scale: function (t) {
                return Math.pow(2, t)
            },
            zoom: function (t) {
                return Math.log(t) / Math.LN2
            },
            distance: function (t, i) {
                var e = i.lng - t.lng,
                    n = i.lat - t.lat;
                return Math.sqrt(e * e + n * n)
            },
            infinite: !0
        });
    F.Earth = U, F.EPSG3395 = ze, F.EPSG3857 = X, F.EPSG900913 = J, F.EPSG4326 = Me, F.Simple = Ce;
    var Se = k.extend({
        options: {
            pane: "overlayPane",
            attribution: null,
            bubblingMouseEvents: !0
        },
        addTo: function (t) {
            return t.addLayer(this), this
        },
        remove: function () {
            return this.removeFrom(this._map || this._mapToAdd)
        },
        removeFrom: function (t) {
            return t && t.removeLayer(this), this
        },
        getPane: function (t) {
            return this._map.getPane(t ? this.options[t] || t : this.options.pane)
        },
        addInteractiveTarget: function (t) {
            return this._map._targets[u(t)] = this
        },
        removeInteractiveTarget: function (t) {
            return delete this._map._targets[u(t)], this
        },
        getAttribution: function () {
            return this.options.attribution
        },
        _layerAdd: function (t) {
            var i = t.target;
            if (i.hasLayer(this)) {
                if (this._map = i, this._zoomAnimated = i._zoomAnimated, this.getEvents) {
                    var e = this.getEvents();
                    i.on(e, this), this.once("remove", function () {
                        i.off(e, this)
                    }, this)
                }
                this.onAdd(i), this.getAttribution && i.attributionControl && i.attributionControl.addAttribution(this.getAttribution()), this.fire("add"), i.fire("layeradd", {
                    layer: this
                })
            }
        }
    });
    Ji.include({
        addLayer: function (t) {
            if (!t._layerAdd) throw new Error("The provided object is not a Layer.");
            var i = u(t);
            return this._layers[i] || ((this._layers[i] = t)._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t)), this
        },
        removeLayer: function (t) {
            var i = u(t);
            return this._layers[i] && (this._loaded && t.onRemove(this), t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()), delete this._layers[i], this._loaded && (this.fire("layerremove", {
                layer: t
            }), t.fire("remove")), t._map = t._mapToAdd = null), this
        },
        hasLayer: function (t) {
            return !!t && u(t) in this._layers
        },
        eachLayer: function (t, i) {
            for (var e in this._layers) t.call(i, this._layers[e]);
            return this
        },
        _addLayers: function (t) {
            for (var i = 0, e = (t = t ? v(t) ? t : [t] : []).length; i < e; i++) this.addLayer(t[i])
        },
        _addZoomLimit: function (t) {
            !isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[u(t)] = t, this._updateZoomLevels())
        },
        _removeZoomLimit: function (t) {
            var i = u(t);
            this._zoomBoundLayers[i] && (delete this._zoomBoundLayers[i], this._updateZoomLevels())
        },
        _updateZoomLevels: function () {
            var t = 1 / 0,
                i = -1 / 0,
                e = this._getZoomSpan();
            for (var n in this._zoomBoundLayers) {
                var o = this._zoomBoundLayers[n].options;
                t = void 0 === o.minZoom ? t : Math.min(t, o.minZoom), i = void 0 === o.maxZoom ? i : Math.max(i, o.maxZoom)
            }
            this._layersMaxZoom = i === -1 / 0 ? void 0 : i, this._layersMinZoom = t === 1 / 0 ? void 0 : t, e !== this._getZoomSpan() && this.fire("zoomlevelschange"), void 0 === this.options.maxZoom && this._layersMaxZoom && this.getZoom() > this._layersMaxZoom && this.setZoom(this._layersMaxZoom), void 0 === this.options.minZoom && this._layersMinZoom && this.getZoom() < this._layersMinZoom && this.setZoom(this._layersMinZoom)
        }
    });
    var Ze = Se.extend({
        initialize: function (t, i) {
            var e, n;
            if (p(this, i), this._layers = {}, t)
                for (e = 0, n = t.length; e < n; e++) this.addLayer(t[e])
        },
        addLayer: function (t) {
            var i = this.getLayerId(t);
            return this._layers[i] = t, this._map && this._map.addLayer(t), this
        },
        removeLayer: function (t) {
            var i = t in this._layers ? t : this.getLayerId(t);
            return this._map && this._layers[i] && this._map.removeLayer(this._layers[i]), delete this._layers[i], this
        },
        hasLayer: function (t) {
            return !!t && (t in this._layers || this.getLayerId(t) in this._layers)
        },
        clearLayers: function () {
            return this.eachLayer(this.removeLayer, this)
        },
        invoke: function (t) {
            var i, e, n = Array.prototype.slice.call(arguments, 1);
            for (i in this._layers) (e = this._layers[i])[t] && e[t].apply(e, n);
            return this
        },
        onAdd: function (t) {
            this.eachLayer(t.addLayer, t)
        },
        onRemove: function (t) {
            this.eachLayer(t.removeLayer, t)
        },
        eachLayer: function (t, i) {
            for (var e in this._layers) t.call(i, this._layers[e]);
            return this
        },
        getLayer: function (t) {
            return this._layers[t]
        },
        getLayers: function () {
            var t = [];
            return this.eachLayer(t.push, t), t
        },
        setZIndex: function (t) {
            return this.invoke("setZIndex", t)
        },
        getLayerId: function (t) {
            return u(t)
        }
    }),
        Ee = Ze.extend({
            addLayer: function (t) {
                return this.hasLayer(t) ? this : (t.addEventParent(this), Ze.prototype.addLayer.call(this, t), this.fire("layeradd", {
                    layer: t
                }))
            },
            removeLayer: function (t) {
                return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), Ze.prototype.removeLayer.call(this, t), this.fire("layerremove", {
                    layer: t
                })) : this
            },
            setStyle: function (t) {
                return this.invoke("setStyle", t)
            },
            bringToFront: function () {
                return this.invoke("bringToFront")
            },
            bringToBack: function () {
                return this.invoke("bringToBack")
            },
            getBounds: function () {
                var t = new N;
                for (var i in this._layers) {
                    var e = this._layers[i];
                    t.extend(e.getBounds ? e.getBounds() : e.getLatLng())
                }
                return t
            }
        }),
        ke = Z.extend({
            options: {
                popupAnchor: [0, 0],
                tooltipAnchor: [0, 0]
            },
            initialize: function (t) {
                p(this, t)
            },
            createIcon: function (t) {
                return this._createIcon("icon", t)
            },
            createShadow: function (t) {
                return this._createIcon("shadow", t)
            },
            _createIcon: function (t, i) {
                var e = this._getIconUrl(t);
                if (!e) {
                    if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
                    return null
                }
                var n = this._createImg(e, i && "IMG" === i.tagName ? i : null);
                return this._setIconStyles(n, t), n
            },
            _setIconStyles: function (t, i) {
                var e = this.options,
                    n = e[i + "Size"];
                "number" == typeof n && (n = [n, n]);
                var o = I(n),
                    s = I("shadow" === i && e.shadowAnchor || e.iconAnchor || o && o.divideBy(2, !0));
                t.className = "leaflet-marker-" + i + " " + (e.className || ""), s && (t.style.marginLeft = -s.x + "px", t.style.marginTop = -s.y + "px"), o && (t.style.width = o.x + "px", t.style.height = o.y + "px")
            },
            _createImg: function (t, i) {
                return (i = i || document.createElement("img")).src = t, i
            },
            _getIconUrl: function (t) {
                return Ct && this.options[t + "RetinaUrl"] || this.options[t + "Url"]
            }
        });
    var Be = ke.extend({
        options: {
            iconUrl: "marker-icon.png",
            iconRetinaUrl: "marker-icon-2x.png",
            shadowUrl: "marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        },
        _getIconUrl: function (t) {
            return Be.imagePath || (Be.imagePath = this._detectIconPath()), (this.options.imagePath || Be.imagePath) + ke.prototype._getIconUrl.call(this, t)
        },
        _detectIconPath: function () {
            var t = hi("div", "leaflet-default-icon-path", document.body),
                i = ai(t, "background-image") || ai(t, "backgroundImage");
            return document.body.removeChild(t), i = null === i || 0 !== i.indexOf("url") ? "" : i.replace(/^url\(["']?/, "").replace(/marker-icon\.png["']?\)$/, "")
        }
    }),
        Ae = oe.extend({
            initialize: function (t) {
                this._marker = t
            },
            addHooks: function () {
                var t = this._marker._icon;
                this._draggable || (this._draggable = new le(t, t, !0)), this._draggable.on({
                    dragstart: this._onDragStart,
                    predrag: this._onPreDrag,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this).enable(), pi(t, "leaflet-marker-draggable")
            },
            removeHooks: function () {
                this._draggable.off({
                    dragstart: this._onDragStart,
                    predrag: this._onPreDrag,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this).disable(), this._marker._icon && mi(this._marker._icon, "leaflet-marker-draggable")
            },
            moved: function () {
                return this._draggable && this._draggable._moved
            },
            _adjustPan: function (t) {
                var i = this._marker,
                    e = i._map,
                    n = this._marker.options.autoPanSpeed,
                    o = this._marker.options.autoPanPadding,
                    s = Pi(i._icon),
                    r = e.getPixelBounds(),
                    a = e.getPixelOrigin(),
                    h = R(r.min._subtract(a).add(o), r.max._subtract(a).subtract(o));
                if (!h.contains(s)) {
                    var u = I((Math.max(h.max.x, s.x) - h.max.x) / (r.max.x - h.max.x) - (Math.min(h.min.x, s.x) - h.min.x) / (r.min.x - h.min.x), (Math.max(h.max.y, s.y) - h.max.y) / (r.max.y - h.max.y) - (Math.min(h.min.y, s.y) - h.min.y) / (r.min.y - h.min.y)).multiplyBy(n);
                    e.panBy(u, {
                        animate: !1
                    }), this._draggable._newPos._add(u), this._draggable._startPos._add(u), wi(i._icon, this._draggable._newPos), this._onDrag(t), this._panRequest = M(this._adjustPan.bind(this, t))
                }
            },
            _onDragStart: function () {
                this._oldLatLng = this._marker.getLatLng(), this._marker.closePopup().fire("movestart").fire("dragstart")
            },
            _onPreDrag: function (t) {
                this._marker.options.autoPan && (C(this._panRequest), this._panRequest = M(this._adjustPan.bind(this, t)))
            },
            _onDrag: function (t) {
                var i = this._marker,
                    e = i._shadow,
                    n = Pi(i._icon),
                    o = i._map.layerPointToLatLng(n);
                e && wi(e, n), i._latlng = o, t.latlng = o, t.oldLatLng = this._oldLatLng, i.fire("move", t).fire("drag", t)
            },
            _onDragEnd: function (t) {
                C(this._panRequest), delete this._oldLatLng, this._marker.fire("moveend").fire("dragend", t)
            }
        }),
        Ie = Se.extend({
            options: {
                icon: new Be,
                interactive: !0,
                keyboard: !0,
                title: "",
                alt: "",
                zIndexOffset: 0,
                opacity: 1,
                riseOnHover: !1,
                riseOffset: 250,
                pane: "markerPane",
                shadowPane: "shadowPane",
                bubblingMouseEvents: !1,
                draggable: !1,
                autoPan: !1,
                autoPanPadding: [50, 50],
                autoPanSpeed: 10
            },
            initialize: function (t, i) {
                p(this, i), this._latlng = W(t)
            },
            onAdd: function (t) {
                this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._zoomAnimated && t.on("zoomanim", this._animateZoom, this), this._initIcon(), this.update()
            },
            onRemove: function (t) {
                this.dragging && this.dragging.enabled() && (this.options.draggable = !0, this.dragging.removeHooks()), delete this.dragging, this._zoomAnimated && t.off("zoomanim", this._animateZoom, this), this._removeIcon(), this._removeShadow()
            },
            getEvents: function () {
                return {
                    zoom: this.update,
                    viewreset: this.update
                }
            },
            getLatLng: function () {
                return this._latlng
            },
            setLatLng: function (t) {
                var i = this._latlng;
                return this._latlng = W(t), this.update(), this.fire("move", {
                    oldLatLng: i,
                    latlng: this._latlng
                })
            },
            setZIndexOffset: function (t) {
                return this.options.zIndexOffset = t, this.update()
            },
            getIcon: function () {
                return this.options.icon
            },
            setIcon: function (t) {
                return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this
            },
            getElement: function () {
                return this._icon
            },
            update: function () {
                if (this._icon && this._map) {
                    var t = this._map.latLngToLayerPoint(this._latlng).round();
                    this._setPos(t)
                }
                return this
            },
            _initIcon: function () {
                var t = this.options,
                    i = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"),
                    e = t.icon.createIcon(this._icon),
                    n = !1;
                e !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (e.title = t.title), "IMG" === e.tagName && (e.alt = t.alt || "")), pi(e, i), t.keyboard && (e.tabIndex = "0"), this._icon = e, t.riseOnHover && this.on({
                    mouseover: this._bringToFront,
                    mouseout: this._resetZIndex
                });
                var o = t.icon.createShadow(this._shadow),
                    s = !1;
                o !== this._shadow && (this._removeShadow(), s = !0), o && (pi(o, i), o.alt = ""), this._shadow = o, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), this._initInteraction(), o && s && this.getPane(t.shadowPane).appendChild(this._shadow)
            },
            _removeIcon: function () {
                this.options.riseOnHover && this.off({
                    mouseover: this._bringToFront,
                    mouseout: this._resetZIndex
                }), ui(this._icon), this.removeInteractiveTarget(this._icon), this._icon = null
            },
            _removeShadow: function () {
                this._shadow && ui(this._shadow), this._shadow = null
            },
            _setPos: function (t) {
                wi(this._icon, t), this._shadow && wi(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
            },
            _updateZIndex: function (t) {
                this._icon.style.zIndex = this._zIndex + t
            },
            _animateZoom: function (t) {
                var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
                this._setPos(i)
            },
            _initInteraction: function () {
                if (this.options.interactive && (pi(this._icon, "leaflet-interactive"), this.addInteractiveTarget(this._icon), Ae)) {
                    var t = this.options.draggable;
                    this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new Ae(this), t && this.dragging.enable()
                }
            },
            setOpacity: function (t) {
                return this.options.opacity = t, this._map && this._updateOpacity(), this
            },
            _updateOpacity: function () {
                var t = this.options.opacity;
                this._icon && vi(this._icon, t), this._shadow && vi(this._shadow, t)
            },
            _bringToFront: function () {
                this._updateZIndex(this.options.riseOffset)
            },
            _resetZIndex: function () {
                this._updateZIndex(0)
            },
            _getPopupAnchor: function () {
                return this.options.icon.options.popupAnchor
            },
            _getTooltipAnchor: function () {
                return this.options.icon.options.tooltipAnchor
            }
        });
    var Oe = Se.extend({
        options: {
            stroke: !0,
            color: "#3388ff",
            weight: 3,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
            dashArray: null,
            dashOffset: null,
            fill: !1,
            fillColor: null,
            fillOpacity: .2,
            fillRule: "evenodd",
            interactive: !0,
            bubblingMouseEvents: !0
        },
        beforeAdd: function (t) {
            this._renderer = t.getRenderer(this)
        },
        onAdd: function () {
            this._renderer._initPath(this), this._reset(), this._renderer._addPath(this)
        },
        onRemove: function () {
            this._renderer._removePath(this)
        },
        redraw: function () {
            return this._map && this._renderer._updatePath(this), this
        },
        setStyle: function (t) {
            return p(this, t), this._renderer && (this._renderer._updateStyle(this), this.options.stroke && t.hasOwnProperty("weight") && this._updateBounds()), this
        },
        bringToFront: function () {
            return this._renderer && this._renderer._bringToFront(this), this
        },
        bringToBack: function () {
            return this._renderer && this._renderer._bringToBack(this), this
        },
        getElement: function () {
            return this._path
        },
        _reset: function () {
            this._project(), this._update()
        },
        _clickTolerance: function () {
            return (this.options.stroke ? this.options.weight / 2 : 0) + this._renderer.options.tolerance
        }
    }),
        Re = Oe.extend({
            options: {
                fill: !0,
                radius: 10
            },
            initialize: function (t, i) {
                p(this, i), this._latlng = W(t), this._radius = this.options.radius
            },
            setLatLng: function (t) {
                return this._latlng = W(t), this.redraw(), this.fire("move", {
                    latlng: this._latlng
                })
            },
            getLatLng: function () {
                return this._latlng
            },
            setRadius: function (t) {
                return this.options.radius = this._radius = t, this.redraw()
            },
            getRadius: function () {
                return this._radius
            },
            setStyle: function (t) {
                var i = t && t.radius || this._radius;
                return Oe.prototype.setStyle.call(this, t), this.setRadius(i), this
            },
            _project: function () {
                this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds()
            },
            _updateBounds: function () {
                var t = this._radius,
                    i = this._radiusY || t,
                    e = this._clickTolerance(),
                    n = [t + e, i + e];
                this._pxBounds = new O(this._point.subtract(n), this._point.add(n))
            },
            _update: function () {
                this._map && this._updatePath()
            },
            _updatePath: function () {
                this._renderer._updateCircle(this)
            },
            _empty: function () {
                return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
            },
            _containsPoint: function (t) {
                return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
            }
        });
    var Ne = Re.extend({
        initialize: function (t, i, e) {
            if ("number" == typeof i && (i = h({}, e, {
                radius: i
            })), p(this, i), this._latlng = W(t), isNaN(this.options.radius)) throw new Error("Circle radius cannot be NaN");
            this._mRadius = this.options.radius
        },
        setRadius: function (t) {
            return this._mRadius = t, this.redraw()
        },
        getRadius: function () {
            return this._mRadius
        },
        getBounds: function () {
            var t = [this._radius, this._radiusY || this._radius];
            return new N(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)))
        },
        setStyle: Oe.prototype.setStyle,
        _project: function () {
            var t = this._latlng.lng,
                i = this._latlng.lat,
                e = this._map,
                n = e.options.crs;
            if (n.distance === U.distance) {
                var o = Math.PI / 180,
                    s = this._mRadius / U.R / o,
                    r = e.project([i + s, t]),
                    a = e.project([i - s, t]),
                    h = r.add(a).divideBy(2),
                    u = e.unproject(h).lat,
                    l = Math.acos((Math.cos(s * o) - Math.sin(i * o) * Math.sin(u * o)) / (Math.cos(i * o) * Math.cos(u * o))) / o;
                !isNaN(l) && 0 !== l || (l = s / Math.cos(Math.PI / 180 * i)), this._point = h.subtract(e.getPixelOrigin()), this._radius = isNaN(l) ? 0 : h.x - e.project([u, t - l]).x, this._radiusY = h.y - r.y
            } else {
                var c = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
                this._point = e.latLngToLayerPoint(this._latlng), this._radius = this._point.x - e.latLngToLayerPoint(c).x
            }
            this._updateBounds()
        }
    });
    var De = Oe.extend({
        options: {
            smoothFactor: 1,
            noClip: !1
        },
        initialize: function (t, i) {
            p(this, i), this._setLatLngs(t)
        },
        getLatLngs: function () {
            return this._latlngs
        },
        setLatLngs: function (t) {
            return this._setLatLngs(t), this.redraw()
        },
        isEmpty: function () {
            return !this._latlngs.length
        },
        closestLayerPoint: function (t) {
            for (var i, e, n = 1 / 0, o = null, s = fe, r = 0, a = this._parts.length; r < a; r++)
                for (var h = this._parts[r], u = 1, l = h.length; u < l; u++) {
                    var c = s(t, i = h[u - 1], e = h[u], !0);
                    c < n && (n = c, o = s(t, i, e))
                }
            return o && (o.distance = Math.sqrt(n)), o
        },
        getCenter: function () {
            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
            var t, i, e, n, o, s, r, a = this._rings[0],
                h = a.length;
            if (!h) return null;
            for (i = t = 0; t < h - 1; t++) i += a[t].distanceTo(a[t + 1]) / 2;
            if (0 === i) return this._map.layerPointToLatLng(a[0]);
            for (n = t = 0; t < h - 1; t++)
                if (o = a[t], s = a[t + 1], i < (n += e = o.distanceTo(s))) return r = (n - i) / e, this._map.layerPointToLatLng([s.x - r * (s.x - o.x), s.y - r * (s.y - o.y)])
        },
        getBounds: function () {
            return this._bounds
        },
        addLatLng: function (t, i) {
            return i = i || this._defaultShape(), t = W(t), i.push(t), this._bounds.extend(t), this.redraw()
        },
        _setLatLngs: function (t) {
            this._bounds = new N, this._latlngs = this._convertLatLngs(t)
        },
        _defaultShape: function () {
            return ge(this._latlngs) ? this._latlngs : this._latlngs[0]
        },
        _convertLatLngs: function (t) {
            for (var i = [], e = ge(t), n = 0, o = t.length; n < o; n++) e ? (i[n] = W(t[n]), this._bounds.extend(i[n])) : i[n] = this._convertLatLngs(t[n]);
            return i
        },
        _project: function () {
            var t = new O;
            this._rings = [], this._projectLatlngs(this._latlngs, this._rings, t), this._bounds.isValid() && t.isValid() && (this._rawPxBounds = t, this._updateBounds())
        },
        _updateBounds: function () {
            var t = this._clickTolerance(),
                i = new B(t, t);
            this._pxBounds = new O([this._rawPxBounds.min.subtract(i), this._rawPxBounds.max.add(i)])
        },
        _projectLatlngs: function (t, i, e) {
            var n, o, s = t[0] instanceof j,
                r = t.length;
            if (s) {
                for (o = [], n = 0; n < r; n++) o[n] = this._map.latLngToLayerPoint(t[n]), e.extend(o[n]);
                i.push(o)
            } else
                for (n = 0; n < r; n++) this._projectLatlngs(t[n], i, e)
        },
        _clipPoints: function () {
            var t = this._renderer._bounds;
            if (this._parts = [], this._pxBounds && this._pxBounds.intersects(t))
                if (this.options.noClip) this._parts = this._rings;
                else {
                    var i, e, n, o, s, r, a, h = this._parts;
                    for (n = i = 0, o = this._rings.length; i < o; i++)
                        for (e = 0, s = (a = this._rings[i]).length; e < s - 1; e++)(r = de(a[e], a[e + 1], t, e, !0)) && (h[n] = h[n] || [], h[n].push(r[0]), r[1] === a[e + 1] && e !== s - 2 || (h[n].push(r[1]), n++))
                }
        },
        _simplifyPoints: function () {
            for (var t = this._parts, i = this.options.smoothFactor, e = 0, n = t.length; e < n; e++) t[e] = ce(t[e], i)
        },
        _update: function () {
            this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
        },
        _updatePath: function () {
            this._renderer._updatePoly(this)
        },
        _containsPoint: function (t, i) {
            var e, n, o, s, r, a, h = this._clickTolerance();
            if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
            for (e = 0, s = this._parts.length; e < s; e++)
                for (n = 0, o = (r = (a = this._parts[e]).length) - 1; n < r; o = n++)
                    if ((i || 0 !== n) && _e(t, a[o], a[n]) <= h) return !0;
            return !1
        }
    });
    De._flat = ve;
    var je = De.extend({
        options: {
            fill: !0
        },
        isEmpty: function () {
            return !this._latlngs.length || !this._latlngs[0].length
        },
        getCenter: function () {
            if (!this._map) throw new Error("Must add layer to map before using getCenter()");
            var t, i, e, n, o, s, r, a, h, u = this._rings[0],
                l = u.length;
            if (!l) return null;
            for (s = r = a = 0, t = 0, i = l - 1; t < l; i = t++) e = u[t], n = u[i], o = e.y * n.x - n.y * e.x, r += (e.x + n.x) * o, a += (e.y + n.y) * o, s += 3 * o;
            return h = 0 === s ? u[0] : [r / s, a / s], this._map.layerPointToLatLng(h)
        },
        _convertLatLngs: function (t) {
            var i = De.prototype._convertLatLngs.call(this, t),
                e = i.length;
            return 2 <= e && i[0] instanceof j && i[0].equals(i[e - 1]) && i.pop(), i
        },
        _setLatLngs: function (t) {
            De.prototype._setLatLngs.call(this, t), ge(this._latlngs) && (this._latlngs = [this._latlngs])
        },
        _defaultShape: function () {
            return ge(this._latlngs[0]) ? this._latlngs[0] : this._latlngs[0][0]
        },
        _clipPoints: function () {
            var t = this._renderer._bounds,
                i = this.options.weight,
                e = new B(i, i);
            if (t = new O(t.min.subtract(e), t.max.add(e)), this._parts = [], this._pxBounds && this._pxBounds.intersects(t))
                if (this.options.noClip) this._parts = this._rings;
                else
                    for (var n, o = 0, s = this._rings.length; o < s; o++)(n = xe(this._rings[o], t, !0)).length && this._parts.push(n)
        },
        _updatePath: function () {
            this._renderer._updatePoly(this, !0)
        },
        _containsPoint: function (t) {
            var i, e, n, o, s, r, a, h, u = !1;
            if (!this._pxBounds || !this._pxBounds.contains(t)) return !1;
            for (o = 0, a = this._parts.length; o < a; o++)
                for (s = 0, r = (h = (i = this._parts[o]).length) - 1; s < h; r = s++) e = i[s], n = i[r], e.y > t.y != n.y > t.y && t.x < (n.x - e.x) * (t.y - e.y) / (n.y - e.y) + e.x && (u = !u);
            return u || De.prototype._containsPoint.call(this, t, !0)
        }
    });
    var We = Ee.extend({
        initialize: function (t, i) {
            p(this, i), this._layers = {}, t && this.addData(t)
        },
        addData: function (t) {
            var i, e, n, o = v(t) ? t : t.features;
            if (o) {
                for (i = 0, e = o.length; i < e; i++)((n = o[i]).geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
                return this
            }
            var s = this.options;
            if (s.filter && !s.filter(t)) return this;
            var r = He(t, s);
            return r ? (r.feature = Ke(t), r.defaultOptions = r.options, this.resetStyle(r), s.onEachFeature && s.onEachFeature(t, r), this.addLayer(r)) : this
        },
        resetStyle: function (t) {
            return t.options = h({}, t.defaultOptions), this._setLayerStyle(t, this.options.style), this
        },
        setStyle: function (i) {
            return this.eachLayer(function (t) {
                this._setLayerStyle(t, i)
            }, this)
        },
        _setLayerStyle: function (t, i) {
            t.setStyle && ("function" == typeof i && (i = i(t.feature)), t.setStyle(i))
        }
    });

    function He(t, i) {
        var e, n, o, s, r = "Feature" === t.type ? t.geometry : t,
            a = r ? r.coordinates : null,
            h = [],
            u = i && i.pointToLayer,
            l = i && i.coordsToLatLng || Fe;
        if (!a && !r) return null;
        switch (r.type) {
            case "Point":
                return e = l(a), u ? u(t, e) : new Ie(e);
            case "MultiPoint":
                for (o = 0, s = a.length; o < s; o++) e = l(a[o]), h.push(u ? u(t, e) : new Ie(e));
                return new Ee(h);
            case "LineString":
            case "MultiLineString":
                return n = Ue(a, "LineString" === r.type ? 0 : 1, l), new De(n, i);
            case "Polygon":
            case "MultiPolygon":
                return n = Ue(a, "Polygon" === r.type ? 1 : 2, l), new je(n, i);
            case "GeometryCollection":
                for (o = 0, s = r.geometries.length; o < s; o++) {
                    var c = He({
                        geometry: r.geometries[o],
                        type: "Feature",
                        properties: t.properties
                    }, i);
                    c && h.push(c)
                }
                return new Ee(h);
            default:
                throw new Error("Invalid GeoJSON object.")
        }
    }

    function Fe(t) {
        return new j(t[1], t[0], t[2])
    }

    function Ue(t, i, e) {
        for (var n, o = [], s = 0, r = t.length; s < r; s++) n = i ? Ue(t[s], i - 1, e) : (e || Fe)(t[s]), o.push(n);
        return o
    }

    function Ve(t, i) {
        return i = "number" == typeof i ? i : 6, void 0 !== t.alt ? [c(t.lng, i), c(t.lat, i), c(t.alt, i)] : [c(t.lng, i), c(t.lat, i)]
    }

    function qe(t, i, e, n) {
        for (var o = [], s = 0, r = t.length; s < r; s++) o.push(i ? qe(t[s], i - 1, e, n) : Ve(t[s], n));
        return !i && e && o.push(o[0]), o
    }

    function Ge(t, i) {
        return t.feature ? h({}, t.feature, {
            geometry: i
        }) : Ke(i)
    }

    function Ke(t) {
        return "Feature" === t.type || "FeatureCollection" === t.type ? t : {
            type: "Feature",
            properties: {},
            geometry: t
        }
    }
    var Ye = {
        toGeoJSON: function (t) {
            return Ge(this, {
                type: "Point",
                coordinates: Ve(this.getLatLng(), t)
            })
        }
    };

    function Xe(t, i) {
        return new We(t, i)
    }
    Ie.include(Ye), Ne.include(Ye), Re.include(Ye), De.include({
        toGeoJSON: function (t) {
            var i = !ge(this._latlngs);
            return Ge(this, {
                type: (i ? "Multi" : "") + "LineString",
                coordinates: qe(this._latlngs, i ? 1 : 0, !1, t)
            })
        }
    }), je.include({
        toGeoJSON: function (t) {
            var i = !ge(this._latlngs),
                e = i && !ge(this._latlngs[0]),
                n = qe(this._latlngs, e ? 2 : i ? 1 : 0, !0, t);
            return i || (n = [n]), Ge(this, {
                type: (e ? "Multi" : "") + "Polygon",
                coordinates: n
            })
        }
    }), Ze.include({
        toMultiPoint: function (i) {
            var e = [];
            return this.eachLayer(function (t) {
                e.push(t.toGeoJSON(i).geometry.coordinates)
            }), Ge(this, {
                type: "MultiPoint",
                coordinates: e
            })
        },
        toGeoJSON: function (n) {
            var t = this.feature && this.feature.geometry && this.feature.geometry.type;
            if ("MultiPoint" === t) return this.toMultiPoint(n);
            var o = "GeometryCollection" === t,
                s = [];
            return this.eachLayer(function (t) {
                if (t.toGeoJSON) {
                    var i = t.toGeoJSON(n);
                    if (o) s.push(i.geometry);
                    else {
                        var e = Ke(i);
                        "FeatureCollection" === e.type ? s.push.apply(s, e.features) : s.push(e)
                    }
                }
            }), o ? Ge(this, {
                geometries: s,
                type: "GeometryCollection"
            }) : {
                        type: "FeatureCollection",
                        features: s
                    }
        }
    });
    var Je = Xe,
        $e = Se.extend({
            options: {
                opacity: 1,
                alt: "",
                interactive: !1,
                crossOrigin: !1,
                errorOverlayUrl: "",
                zIndex: 1,
                className: ""
            },
            initialize: function (t, i, e) {
                this._url = t, this._bounds = D(i), p(this, e)
            },
            onAdd: function () {
                this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.options.interactive && (pi(this._image, "leaflet-interactive"), this.addInteractiveTarget(this._image)), this.getPane().appendChild(this._image), this._reset()
            },
            onRemove: function () {
                ui(this._image), this.options.interactive && this.removeInteractiveTarget(this._image)
            },
            setOpacity: function (t) {
                return this.options.opacity = t, this._image && this._updateOpacity(), this
            },
            setStyle: function (t) {
                return t.opacity && this.setOpacity(t.opacity), this
            },
            bringToFront: function () {
                return this._map && ci(this._image), this
            },
            bringToBack: function () {
                return this._map && _i(this._image), this
            },
            setUrl: function (t) {
                return this._url = t, this._image && (this._image.src = t), this
            },
            setBounds: function (t) {
                return this._bounds = D(t), this._map && this._reset(), this
            },
            getEvents: function () {
                var t = {
                    zoom: this._reset,
                    viewreset: this._reset
                };
                return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
            },
            setZIndex: function (t) {
                return this.options.zIndex = t, this._updateZIndex(), this
            },
            getBounds: function () {
                return this._bounds
            },
            getElement: function () {
                return this._image
            },
            _initImage: function () {
                var t = "IMG" === this._url.tagName,
                    i = this._image = t ? this._url : hi("img");
                pi(i, "leaflet-image-layer"), this._zoomAnimated && pi(i, "leaflet-zoom-animated"), this.options.className && pi(i, this.options.className), i.onselectstart = l, i.onmousemove = l, i.onload = a(this.fire, this, "load"), i.onerror = a(this._overlayOnError, this, "error"), !this.options.crossOrigin && "" !== this.options.crossOrigin || (i.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin), this.options.zIndex && this._updateZIndex(), t ? this._url = i.src : (i.src = this._url, i.alt = this.options.alt)
            },
            _animateZoom: function (t) {
                var i = this._map.getZoomScale(t.zoom),
                    e = this._map._latLngBoundsToNewLayerBounds(this._bounds, t.zoom, t.center).min;
                xi(this._image, e, i)
            },
            _reset: function () {
                var t = this._image,
                    i = new O(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
                    e = i.getSize();
                wi(t, i.min), t.style.width = e.x + "px", t.style.height = e.y + "px"
            },
            _updateOpacity: function () {
                vi(this._image, this.options.opacity)
            },
            _updateZIndex: function () {
                this._image && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._image.style.zIndex = this.options.zIndex)
            },
            _overlayOnError: function () {
                this.fire("error");
                var t = this.options.errorOverlayUrl;
                t && this._url !== t && (this._url = t, this._image.src = t)
            }
        }),
        Qe = $e.extend({
            options: {
                autoplay: !0,
                loop: !0,
                keepAspectRatio: !0
            },
            _initImage: function () {
                var t = "VIDEO" === this._url.tagName,
                    i = this._image = t ? this._url : hi("video");
                if (pi(i, "leaflet-image-layer"), this._zoomAnimated && pi(i, "leaflet-zoom-animated"), i.onselectstart = l, i.onmousemove = l, i.onloadeddata = a(this.fire, this, "load"), t) {
                    for (var e = i.getElementsByTagName("source"), n = [], o = 0; o < e.length; o++) n.push(e[o].src);
                    this._url = 0 < e.length ? n : [i.src]
                } else {
                    v(this._url) || (this._url = [this._url]), !this.options.keepAspectRatio && i.style.hasOwnProperty("objectFit") && (i.style.objectFit = "fill"), i.autoplay = !!this.options.autoplay, i.loop = !!this.options.loop;
                    for (var s = 0; s < this._url.length; s++) {
                        var r = hi("source");
                        r.src = this._url[s], i.appendChild(r)
                    }
                }
            }
        });
    var tn = $e.extend({
        _initImage: function () {
            var t = this._image = this._url;
            pi(t, "leaflet-image-layer"), this._zoomAnimated && pi(t, "leaflet-zoom-animated"), t.onselectstart = l, t.onmousemove = l
        }
    });
    var en = Se.extend({
        options: {
            offset: [0, 7],
            className: "",
            pane: "popupPane"
        },
        initialize: function (t, i) {
            p(this, t), this._source = i
        },
        onAdd: function (t) {
            this._zoomAnimated = t._zoomAnimated, this._container || this._initLayout(), t._fadeAnimated && vi(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && vi(this._container, 1), this.bringToFront()
        },
        onRemove: function (t) {
            t._fadeAnimated ? (vi(this._container, 0), this._removeTimeout = setTimeout(a(ui, void 0, this._container), 200)) : ui(this._container)
        },
        getLatLng: function () {
            return this._latlng
        },
        setLatLng: function (t) {
            return this._latlng = W(t), this._map && (this._updatePosition(), this._adjustPan()), this
        },
        getContent: function () {
            return this._content
        },
        setContent: function (t) {
            return this._content = t, this.update(), this
        },
        getElement: function () {
            return this._container
        },
        update: function () {
            this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
        },
        getEvents: function () {
            var t = {
                zoom: this._updatePosition,
                viewreset: this._updatePosition
            };
            return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        },
        isOpen: function () {
            return !!this._map && this._map.hasLayer(this)
        },
        bringToFront: function () {
            return this._map && ci(this._container), this
        },
        bringToBack: function () {
            return this._map && _i(this._container), this
        },
        _prepareOpen: function (t, i, e) {
            if (i instanceof Se || (e = i, i = t), i instanceof Ee)
                for (var n in t._layers) {
                    i = t._layers[n];
                    break
                }
            if (!e)
                if (i.getCenter) e = i.getCenter();
                else {
                    if (!i.getLatLng) throw new Error("Unable to get source layer LatLng.");
                    e = i.getLatLng()
                } return this._source = i, this.update(), e
        },
        _updateContent: function () {
            if (this._content) {
                var t = this._contentNode,
                    i = "function" == typeof this._content ? this._content(this._source || this) : this._content;
                if ("string" == typeof i) t.innerHTML = i;
                else {
                    for (; t.hasChildNodes();) t.removeChild(t.firstChild);
                    t.appendChild(i)
                }
                this.fire("contentupdate")
            }
        },
        _updatePosition: function () {
            if (this._map) {
                var t = this._map.latLngToLayerPoint(this._latlng),
                    i = I(this.options.offset),
                    e = this._getAnchor();
                this._zoomAnimated ? wi(this._container, t.add(e)) : i = i.add(t).add(e);
                var n = this._containerBottom = -i.y,
                    o = this._containerLeft = -Math.round(this._containerWidth / 2) + i.x;
                this._container.style.bottom = n + "px", this._container.style.left = o + "px"
            }
        },
        _getAnchor: function () {
            return [0, 0]
        }
    }),
        nn = en.extend({
            options: {
                maxWidth: 300,
                minWidth: 50,
                maxHeight: null,
                autoPan: !0,
                autoPanPaddingTopLeft: null,
                autoPanPaddingBottomRight: null,
                autoPanPadding: [5, 5],
                keepInView: !1,
                closeButton: !0,
                autoClose: !0,
                closeOnEscapeKey: !0,
                className: ""
            },
            openOn: function (t) {
                return t.openPopup(this), this
            },
            onAdd: function (t) {
                en.prototype.onAdd.call(this, t), t.fire("popupopen", {
                    popup: this
                }), this._source && (this._source.fire("popupopen", {
                    popup: this
                }, !0), this._source instanceof Oe || this._source.on("preclick", Oi))
            },
            onRemove: function (t) {
                en.prototype.onRemove.call(this, t), t.fire("popupclose", {
                    popup: this
                }), this._source && (this._source.fire("popupclose", {
                    popup: this
                }, !0), this._source instanceof Oe || this._source.off("preclick", Oi))
            },
            getEvents: function () {
                var t = en.prototype.getEvents.call(this);
                return (void 0 !== this.options.closeOnClick ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), this.options.keepInView && (t.moveend = this._adjustPan), t
            },
            _close: function () {
                this._map && this._map.closePopup(this)
            },
            _initLayout: function () {
                var t = "leaflet-popup",
                    i = this._container = hi("div", t + " " + (this.options.className || "") + " leaflet-zoom-animated"),
                    e = this._wrapper = hi("div", t + "-content-wrapper", i);
                if (this._contentNode = hi("div", t + "-content", e), Ni(e), Ri(this._contentNode), Ei(e, "contextmenu", Oi), this._tipContainer = hi("div", t + "-tip-container", i), this._tip = hi("div", t + "-tip", this._tipContainer), this.options.closeButton) {
                    var n = this._closeButton = hi("a", t + "-close-button", i);
                    n.href = "#close", n.innerHTML = "&#215;", Ei(n, "click", this._onCloseButtonClick, this)
                }
            },
            _updateLayout: function () {
                var t = this._contentNode,
                    i = t.style;
                i.width = "", i.whiteSpace = "nowrap";
                var e = t.offsetWidth;
                e = Math.min(e, this.options.maxWidth), e = Math.max(e, this.options.minWidth), i.width = e + 1 + "px", i.whiteSpace = "", i.height = "";
                var n = t.offsetHeight,
                    o = this.options.maxHeight,
                    s = "leaflet-popup-scrolled";
                o && o < n ? (i.height = o + "px", pi(t, s)) : mi(t, s), this._containerWidth = this._container.offsetWidth
            },
            _animateZoom: function (t) {
                var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center),
                    e = this._getAnchor();
                wi(this._container, i.add(e))
            },
            _adjustPan: function () {
                if (this.options.autoPan) {
                    this._map._panAnim && this._map._panAnim.stop();
                    var t = this._map,
                        i = parseInt(ai(this._container, "marginBottom"), 10) || 0,
                        e = this._container.offsetHeight + i,
                        n = this._containerWidth,
                        o = new B(this._containerLeft, -e - this._containerBottom);
                    o._add(Pi(this._container));
                    var s = t.layerPointToContainerPoint(o),
                        r = I(this.options.autoPanPadding),
                        a = I(this.options.autoPanPaddingTopLeft || r),
                        h = I(this.options.autoPanPaddingBottomRight || r),
                        u = t.getSize(),
                        l = 0,
                        c = 0;
                    s.x + n + h.x > u.x && (l = s.x + n - u.x + h.x), s.x - l - a.x < 0 && (l = s.x - a.x), s.y + e + h.y > u.y && (c = s.y + e - u.y + h.y), s.y - c - a.y < 0 && (c = s.y - a.y), (l || c) && t.fire("autopanstart").panBy([l, c])
                }
            },
            _onCloseButtonClick: function (t) {
                this._close(), ji(t)
            },
            _getAnchor: function () {
                return I(this._source && this._source._getPopupAnchor ? this._source._getPopupAnchor() : [0, 0])
            }
        });
    Ji.mergeOptions({
        closePopupOnClick: !0
    }), Ji.include({
        openPopup: function (t, i, e) {
            return t instanceof nn || (t = new nn(e).setContent(t)), i && t.setLatLng(i), this.hasLayer(t) ? this : (this._popup && this._popup.options.autoClose && this.closePopup(), this._popup = t, this.addLayer(t))
        },
        closePopup: function (t) {
            return t && t !== this._popup || (t = this._popup, this._popup = null), t && this.removeLayer(t), this
        }
    }), Se.include({
        bindPopup: function (t, i) {
            return t instanceof nn ? (p(t, i), (this._popup = t)._source = this) : (this._popup && !i || (this._popup = new nn(i, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !0), this
        },
        unbindPopup: function () {
            return this._popup && (this.off({
                click: this._openPopup,
                keypress: this._onKeyPress,
                remove: this.closePopup,
                move: this._movePopup
            }), this._popupHandlersAdded = !1, this._popup = null), this
        },
        openPopup: function (t, i) {
            return this._popup && this._map && (i = this._popup._prepareOpen(this, t, i), this._map.openPopup(this._popup, i)), this
        },
        closePopup: function () {
            return this._popup && this._popup._close(), this
        },
        togglePopup: function (t) {
            return this._popup && (this._popup._map ? this.closePopup() : this.openPopup(t)), this
        },
        isPopupOpen: function () {
            return !!this._popup && this._popup.isOpen()
        },
        setPopupContent: function (t) {
            return this._popup && this._popup.setContent(t), this
        },
        getPopup: function () {
            return this._popup
        },
        _openPopup: function (t) {
            var i = t.layer || t.target;
            this._popup && this._map && (ji(t), i instanceof Oe ? this.openPopup(t.layer || t.target, t.latlng) : this._map.hasLayer(this._popup) && this._popup._source === i ? this.closePopup() : this.openPopup(i, t.latlng))
        },
        _movePopup: function (t) {
            this._popup.setLatLng(t.latlng)
        },
        _onKeyPress: function (t) {
            13 === t.originalEvent.keyCode && this._openPopup(t)
        }
    });
    var on = en.extend({
        options: {
            pane: "tooltipPane",
            offset: [0, 0],
            direction: "auto",
            permanent: !1,
            sticky: !1,
            interactive: !1,
            opacity: .9
        },
        onAdd: function (t) {
            en.prototype.onAdd.call(this, t), this.setOpacity(this.options.opacity), t.fire("tooltipopen", {
                tooltip: this
            }), this._source && this._source.fire("tooltipopen", {
                tooltip: this
            }, !0)
        },
        onRemove: function (t) {
            en.prototype.onRemove.call(this, t), t.fire("tooltipclose", {
                tooltip: this
            }), this._source && this._source.fire("tooltipclose", {
                tooltip: this
            }, !0)
        },
        getEvents: function () {
            var t = en.prototype.getEvents.call(this);
            return Tt && !this.options.permanent && (t.preclick = this._close), t
        },
        _close: function () {
            this._map && this._map.closeTooltip(this)
        },
        _initLayout: function () {
            var t = "leaflet-tooltip " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide");
            this._contentNode = this._container = hi("div", t)
        },
        _updateLayout: function () { },
        _adjustPan: function () { },
        _setPosition: function (t) {
            var i = this._map,
                e = this._container,
                n = i.latLngToContainerPoint(i.getCenter()),
                o = i.layerPointToContainerPoint(t),
                s = this.options.direction,
                r = e.offsetWidth,
                a = e.offsetHeight,
                h = I(this.options.offset),
                u = this._getAnchor();
            t = "top" === s ? t.add(I(-r / 2 + h.x, -a + h.y + u.y, !0)) : "bottom" === s ? t.subtract(I(r / 2 - h.x, -h.y, !0)) : "center" === s ? t.subtract(I(r / 2 + h.x, a / 2 - u.y + h.y, !0)) : "right" === s || "auto" === s && o.x < n.x ? (s = "right", t.add(I(h.x + u.x, u.y - a / 2 + h.y, !0))) : (s = "left", t.subtract(I(r + u.x - h.x, a / 2 - u.y - h.y, !0))), mi(e, "leaflet-tooltip-right"), mi(e, "leaflet-tooltip-left"), mi(e, "leaflet-tooltip-top"), mi(e, "leaflet-tooltip-bottom"), pi(e, "leaflet-tooltip-" + s), wi(e, t)
        },
        _updatePosition: function () {
            var t = this._map.latLngToLayerPoint(this._latlng);
            this._setPosition(t)
        },
        setOpacity: function (t) {
            this.options.opacity = t, this._container && vi(this._container, t)
        },
        _animateZoom: function (t) {
            var i = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
            this._setPosition(i)
        },
        _getAnchor: function () {
            return I(this._source && this._source._getTooltipAnchor && !this.options.sticky ? this._source._getTooltipAnchor() : [0, 0])
        }
    });
    Ji.include({
        openTooltip: function (t, i, e) {
            return t instanceof on || (t = new on(e).setContent(t)), i && t.setLatLng(i), this.hasLayer(t) ? this : this.addLayer(t)
        },
        closeTooltip: function (t) {
            return t && this.removeLayer(t), this
        }
    }), Se.include({
        bindTooltip: function (t, i) {
            return t instanceof on ? (p(t, i), (this._tooltip = t)._source = this) : (this._tooltip && !i || (this._tooltip = new on(i, this)), this._tooltip.setContent(t)), this._initTooltipInteractions(), this._tooltip.options.permanent && this._map && this._map.hasLayer(this) && this.openTooltip(), this
        },
        unbindTooltip: function () {
            return this._tooltip && (this._initTooltipInteractions(!0), this.closeTooltip(), this._tooltip = null), this
        },
        _initTooltipInteractions: function (t) {
            if (t || !this._tooltipHandlersAdded) {
                var i = t ? "off" : "on",
                    e = {
                        remove: this.closeTooltip,
                        move: this._moveTooltip
                    };
                this._tooltip.options.permanent ? e.add = this._openTooltip : (e.mouseover = this._openTooltip, e.mouseout = this.closeTooltip, this._tooltip.options.sticky && (e.mousemove = this._moveTooltip), Tt && (e.click = this._openTooltip)), this[i](e), this._tooltipHandlersAdded = !t
            }
        },
        openTooltip: function (t, i) {
            return this._tooltip && this._map && (i = this._tooltip._prepareOpen(this, t, i), this._map.openTooltip(this._tooltip, i), this._tooltip.options.interactive && this._tooltip._container && (pi(this._tooltip._container, "leaflet-clickable"), this.addInteractiveTarget(this._tooltip._container))), this
        },
        closeTooltip: function () {
            return this._tooltip && (this._tooltip._close(), this._tooltip.options.interactive && this._tooltip._container && (mi(this._tooltip._container, "leaflet-clickable"), this.removeInteractiveTarget(this._tooltip._container))), this
        },
        toggleTooltip: function (t) {
            return this._tooltip && (this._tooltip._map ? this.closeTooltip() : this.openTooltip(t)), this
        },
        isTooltipOpen: function () {
            return this._tooltip.isOpen()
        },
        setTooltipContent: function (t) {
            return this._tooltip && this._tooltip.setContent(t), this
        },
        getTooltip: function () {
            return this._tooltip
        },
        _openTooltip: function (t) {
            var i = t.layer || t.target;
            this._tooltip && this._map && this.openTooltip(i, this._tooltip.options.sticky ? t.latlng : void 0)
        },
        _moveTooltip: function (t) {
            var i, e, n = t.latlng;
            this._tooltip.options.sticky && t.originalEvent && (i = this._map.mouseEventToContainerPoint(t.originalEvent), e = this._map.containerPointToLayerPoint(i), n = this._map.layerPointToLatLng(e)), this._tooltip.setLatLng(n)
        }
    });
    var sn = ke.extend({
        options: {
            iconSize: [12, 12],
            html: !1,
            bgPos: null,
            className: "leaflet-div-icon"
        },
        createIcon: function (t) {
            var i = t && "DIV" === t.tagName ? t : document.createElement("div"),
                e = this.options;
            if (e.html instanceof Element ? (li(i), i.appendChild(e.html)) : i.innerHTML = !1 !== e.html ? e.html : "", e.bgPos) {
                var n = I(e.bgPos);
                i.style.backgroundPosition = -n.x + "px " + -n.y + "px"
            }
            return this._setIconStyles(i, "icon"), i
        },
        createShadow: function () {
            return null
        }
    });
    ke.Default = Be;
    var rn = Se.extend({
        options: {
            tileSize: 256,
            opacity: 1,
            updateWhenIdle: xt,
            updateWhenZooming: !0,
            updateInterval: 200,
            zIndex: 1,
            bounds: null,
            minZoom: 0,
            maxZoom: void 0,
            maxNativeZoom: void 0,
            minNativeZoom: void 0,
            noWrap: !1,
            pane: "tilePane",
            className: "",
            keepBuffer: 2
        },
        initialize: function (t) {
            p(this, t)
        },
        onAdd: function () {
            this._initContainer(), this._levels = {}, this._tiles = {}, this._resetView(), this._update()
        },
        beforeAdd: function (t) {
            t._addZoomLimit(this)
        },
        onRemove: function (t) {
            this._removeAllTiles(), ui(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = void 0
        },
        bringToFront: function () {
            return this._map && (ci(this._container), this._setAutoZIndex(Math.max)), this
        },
        bringToBack: function () {
            return this._map && (_i(this._container), this._setAutoZIndex(Math.min)), this
        },
        getContainer: function () {
            return this._container
        },
        setOpacity: function (t) {
            return this.options.opacity = t, this._updateOpacity(), this
        },
        setZIndex: function (t) {
            return this.options.zIndex = t, this._updateZIndex(), this
        },
        isLoading: function () {
            return this._loading
        },
        redraw: function () {
            return this._map && (this._removeAllTiles(), this._update()), this
        },
        getEvents: function () {
            var t = {
                viewprereset: this._invalidateAll,
                viewreset: this._resetView,
                zoom: this._resetView,
                moveend: this._onMoveEnd
            };
            return this.options.updateWhenIdle || (this._onMove || (this._onMove = o(this._onMoveEnd, this.options.updateInterval, this)), t.move = this._onMove), this._zoomAnimated && (t.zoomanim = this._animateZoom), t
        },
        createTile: function () {
            return document.createElement("div")
        },
        getTileSize: function () {
            var t = this.options.tileSize;
            return t instanceof B ? t : new B(t, t)
        },
        _updateZIndex: function () {
            this._container && void 0 !== this.options.zIndex && null !== this.options.zIndex && (this._container.style.zIndex = this.options.zIndex)
        },
        _setAutoZIndex: function (t) {
            for (var i, e = this.getPane().children, n = -t(-1 / 0, 1 / 0), o = 0, s = e.length; o < s; o++) i = e[o].style.zIndex, e[o] !== this._container && i && (n = t(n, +i));
            isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex())
        },
        _updateOpacity: function () {
            if (this._map && !et) {
                vi(this._container, this.options.opacity);
                var t = +new Date,
                    i = !1,
                    e = !1;
                for (var n in this._tiles) {
                    var o = this._tiles[n];
                    if (o.current && o.loaded) {
                        var s = Math.min(1, (t - o.loaded) / 200);
                        vi(o.el, s), s < 1 ? i = !0 : (o.active ? e = !0 : this._onOpaqueTile(o), o.active = !0)
                    }
                }
                e && !this._noPrune && this._pruneTiles(), i && (C(this._fadeFrame), this._fadeFrame = M(this._updateOpacity, this))
            }
        },
        _onOpaqueTile: l,
        _initContainer: function () {
            this._container || (this._container = hi("div", "leaflet-layer " + (this.options.className || "")), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container))
        },
        _updateLevels: function () {
            var t = this._tileZoom,
                i = this.options.maxZoom;
            if (void 0 !== t) {
                for (var e in this._levels) this._levels[e].el.children.length || e === t ? (this._levels[e].el.style.zIndex = i - Math.abs(t - e), this._onUpdateLevel(e)) : (ui(this._levels[e].el), this._removeTilesAtZoom(e), this._onRemoveLevel(e), delete this._levels[e]);
                var n = this._levels[t],
                    o = this._map;
                return n || ((n = this._levels[t] = {}).el = hi("div", "leaflet-tile-container leaflet-zoom-animated", this._container), n.el.style.zIndex = i, n.origin = o.project(o.unproject(o.getPixelOrigin()), t).round(), n.zoom = t, this._setZoomTransform(n, o.getCenter(), o.getZoom()), n.el.offsetWidth, this._onCreateLevel(n)), this._level = n
            }
        },
        _onUpdateLevel: l,
        _onRemoveLevel: l,
        _onCreateLevel: l,
        _pruneTiles: function () {
            if (this._map) {
                var t, i, e = this._map.getZoom();
                if (e > this.options.maxZoom || e < this.options.minZoom) this._removeAllTiles();
                else {
                    for (t in this._tiles) (i = this._tiles[t]).retain = i.current;
                    for (t in this._tiles)
                        if ((i = this._tiles[t]).current && !i.active) {
                            var n = i.coords;
                            this._retainParent(n.x, n.y, n.z, n.z - 5) || this._retainChildren(n.x, n.y, n.z, n.z + 2)
                        } for (t in this._tiles) this._tiles[t].retain || this._removeTile(t)
                }
            }
        },
        _removeTilesAtZoom: function (t) {
            for (var i in this._tiles) this._tiles[i].coords.z === t && this._removeTile(i)
        },
        _removeAllTiles: function () {
            for (var t in this._tiles) this._removeTile(t)
        },
        _invalidateAll: function () {
            for (var t in this._levels) ui(this._levels[t].el), this._onRemoveLevel(t), delete this._levels[t];
            this._removeAllTiles(), this._tileZoom = void 0
        },
        _retainParent: function (t, i, e, n) {
            var o = Math.floor(t / 2),
                s = Math.floor(i / 2),
                r = e - 1,
                a = new B(+o, +s);
            a.z = +r;
            var h = this._tileCoordsToKey(a),
                u = this._tiles[h];
            return u && u.active ? u.retain = !0 : (u && u.loaded && (u.retain = !0), n < r && this._retainParent(o, s, r, n))
        },
        _retainChildren: function (t, i, e, n) {
            for (var o = 2 * t; o < 2 * t + 2; o++)
                for (var s = 2 * i; s < 2 * i + 2; s++) {
                    var r = new B(o, s);
                    r.z = e + 1;
                    var a = this._tileCoordsToKey(r),
                        h = this._tiles[a];
                    h && h.active ? h.retain = !0 : (h && h.loaded && (h.retain = !0), e + 1 < n && this._retainChildren(o, s, e + 1, n))
                }
        },
        _resetView: function (t) {
            var i = t && (t.pinch || t.flyTo);
            this._setView(this._map.getCenter(), this._map.getZoom(), i, i)
        },
        _animateZoom: function (t) {
            this._setView(t.center, t.zoom, !0, t.noUpdate)
        },
        _clampZoom: function (t) {
            var i = this.options;
            return void 0 !== i.minNativeZoom && t < i.minNativeZoom ? i.minNativeZoom : void 0 !== i.maxNativeZoom && i.maxNativeZoom < t ? i.maxNativeZoom : t
        },
        _setView: function (t, i, e, n) {
            var o = this._clampZoom(Math.round(i));
            (void 0 !== this.options.maxZoom && o > this.options.maxZoom || void 0 !== this.options.minZoom && o < this.options.minZoom) && (o = void 0);
            var s = this.options.updateWhenZooming && o !== this._tileZoom;
            n && !s || (this._tileZoom = o, this._abortLoading && this._abortLoading(), this._updateLevels(), this._resetGrid(), void 0 !== o && this._update(t), e || this._pruneTiles(), this._noPrune = !!e), this._setZoomTransforms(t, i)
        },
        _setZoomTransforms: function (t, i) {
            for (var e in this._levels) this._setZoomTransform(this._levels[e], t, i)
        },
        _setZoomTransform: function (t, i, e) {
            var n = this._map.getZoomScale(e, t.zoom),
                o = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(i, e)).round();
            yt ? xi(t.el, o, n) : wi(t.el, o)
        },
        _resetGrid: function () {
            var t = this._map,
                i = t.options.crs,
                e = this._tileSize = this.getTileSize(),
                n = this._tileZoom,
                o = this._map.getPixelWorldBounds(this._tileZoom);
            o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = i.wrapLng && !this.options.noWrap && [Math.floor(t.project([0, i.wrapLng[0]], n).x / e.x), Math.ceil(t.project([0, i.wrapLng[1]], n).x / e.y)], this._wrapY = i.wrapLat && !this.options.noWrap && [Math.floor(t.project([i.wrapLat[0], 0], n).y / e.x), Math.ceil(t.project([i.wrapLat[1], 0], n).y / e.y)]
        },
        _onMoveEnd: function () {
            this._map && !this._map._animatingZoom && this._update()
        },
        _getTiledPixelBounds: function (t) {
            var i = this._map,
                e = i._animatingZoom ? Math.max(i._animateToZoom, i.getZoom()) : i.getZoom(),
                n = i.getZoomScale(e, this._tileZoom),
                o = i.project(t, this._tileZoom).floor(),
                s = i.getSize().divideBy(2 * n);
            return new O(o.subtract(s), o.add(s))
        },
        _update: function (t) {
            var i = this._map;
            if (i) {
                var e = this._clampZoom(i.getZoom());
                if (void 0 === t && (t = i.getCenter()), void 0 !== this._tileZoom) {
                    var n = this._getTiledPixelBounds(t),
                        o = this._pxBoundsToTileRange(n),
                        s = o.getCenter(),
                        r = [],
                        a = this.options.keepBuffer,
                        h = new O(o.getBottomLeft().subtract([a, -a]), o.getTopRight().add([a, -a]));
                    if (!(isFinite(o.min.x) && isFinite(o.min.y) && isFinite(o.max.x) && isFinite(o.max.y))) throw new Error("Attempted to load an infinite number of tiles");
                    for (var u in this._tiles) {
                        var l = this._tiles[u].coords;
                        l.z === this._tileZoom && h.contains(new B(l.x, l.y)) || (this._tiles[u].current = !1)
                    }
                    if (1 < Math.abs(e - this._tileZoom)) this._setView(t, e);
                    else {
                        for (var c = o.min.y; c <= o.max.y; c++)
                            for (var _ = o.min.x; _ <= o.max.x; _++) {
                                var d = new B(_, c);
                                if (d.z = this._tileZoom, this._isValidTile(d)) {
                                    var p = this._tiles[this._tileCoordsToKey(d)];
                                    p ? p.current = !0 : r.push(d)
                                }
                            }
                        if (r.sort(function (t, i) {
                            return t.distanceTo(s) - i.distanceTo(s)
                        }), 0 !== r.length) {
                            this._loading || (this._loading = !0, this.fire("loading"));
                            var m = document.createDocumentFragment();
                            for (_ = 0; _ < r.length; _++) this._addTile(r[_], m);
                            this._level.el.appendChild(m)
                        }
                    }
                }
            }
        },
        _isValidTile: function (t) {
            var i = this._map.options.crs;
            if (!i.infinite) {
                var e = this._globalTileRange;
                if (!i.wrapLng && (t.x < e.min.x || t.x > e.max.x) || !i.wrapLat && (t.y < e.min.y || t.y > e.max.y)) return !1
            }
            if (!this.options.bounds) return !0;
            var n = this._tileCoordsToBounds(t);
            return D(this.options.bounds).overlaps(n)
        },
        _keyToBounds: function (t) {
            return this._tileCoordsToBounds(this._keyToTileCoords(t))
        },
        _tileCoordsToNwSe: function (t) {
            var i = this._map,
                e = this.getTileSize(),
                n = t.scaleBy(e),
                o = n.add(e);
            return [i.unproject(n, t.z), i.unproject(o, t.z)]
        },
        _tileCoordsToBounds: function (t) {
            var i = this._tileCoordsToNwSe(t),
                e = new N(i[0], i[1]);
            return this.options.noWrap || (e = this._map.wrapLatLngBounds(e)), e
        },
        _tileCoordsToKey: function (t) {
            return t.x + ":" + t.y + ":" + t.z
        },
        _keyToTileCoords: function (t) {
            var i = t.split(":"),
                e = new B(+i[0], +i[1]);
            return e.z = +i[2], e
        },
        _removeTile: function (t) {
            var i = this._tiles[t];
            i && (ui(i.el), delete this._tiles[t], this.fire("tileunload", {
                tile: i.el,
                coords: this._keyToTileCoords(t)
            }))
        },
        _initTile: function (t) {
            pi(t, "leaflet-tile");
            var i = this.getTileSize();
            t.style.width = i.x + "px", t.style.height = i.y + "px", t.onselectstart = l, t.onmousemove = l, et && this.options.opacity < 1 && vi(t, this.options.opacity), st && !rt && (t.style.WebkitBackfaceVisibility = "hidden")
        },
        _addTile: function (t, i) {
            var e = this._getTilePos(t),
                n = this._tileCoordsToKey(t),
                o = this.createTile(this._wrapCoords(t), a(this._tileReady, this, t));
            this._initTile(o), this.createTile.length < 2 && M(a(this._tileReady, this, t, null, o)), wi(o, e), this._tiles[n] = {
                el: o,
                coords: t,
                current: !0
            }, i.appendChild(o), this.fire("tileloadstart", {
                tile: o,
                coords: t
            })
        },
        _tileReady: function (t, i, e) {
            i && this.fire("tileerror", {
                error: i,
                tile: e,
                coords: t
            });
            var n = this._tileCoordsToKey(t);
            (e = this._tiles[n]) && (e.loaded = +new Date, this._map._fadeAnimated ? (vi(e.el, 0), C(this._fadeFrame), this._fadeFrame = M(this._updateOpacity, this)) : (e.active = !0, this._pruneTiles()), i || (pi(e.el, "leaflet-tile-loaded"), this.fire("tileload", {
                tile: e.el,
                coords: t
            })), this._noTilesToLoad() && (this._loading = !1, this.fire("load"), et || !this._map._fadeAnimated ? M(this._pruneTiles, this) : setTimeout(a(this._pruneTiles, this), 250)))
        },
        _getTilePos: function (t) {
            return t.scaleBy(this.getTileSize()).subtract(this._level.origin)
        },
        _wrapCoords: function (t) {
            var i = new B(this._wrapX ? r(t.x, this._wrapX) : t.x, this._wrapY ? r(t.y, this._wrapY) : t.y);
            return i.z = t.z, i
        },
        _pxBoundsToTileRange: function (t) {
            var i = this.getTileSize();
            return new O(t.min.unscaleBy(i).floor(), t.max.unscaleBy(i).ceil().subtract([1, 1]))
        },
        _noTilesToLoad: function () {
            for (var t in this._tiles)
                if (!this._tiles[t].loaded) return !1;
            return !0
        }
    });
    var an = rn.extend({
        options: {
            minZoom: 0,
            maxZoom: 18,
            subdomains: "abc",
            errorTileUrl: "",
            zoomOffset: 0,
            tms: !1,
            zoomReverse: !1,
            detectRetina: !1,
            crossOrigin: !1
        },
        initialize: function (t, i) {
            this._url = t, (i = p(this, i)).detectRetina && Ct && 0 < i.maxZoom && (i.tileSize = Math.floor(i.tileSize / 2), i.zoomReverse ? (i.zoomOffset--, i.minZoom++) : (i.zoomOffset++, i.maxZoom--), i.minZoom = Math.max(0, i.minZoom)), "string" == typeof i.subdomains && (i.subdomains = i.subdomains.split("")), st || this.on("tileunload", this._onTileRemove)
        },
        setUrl: function (t, i) {
            return this._url === t && void 0 === i && (i = !0), this._url = t, i || this.redraw(), this
        },
        createTile: function (t, i) {
            var e = document.createElement("img");
            return Ei(e, "load", a(this._tileOnLoad, this, i, e)), Ei(e, "error", a(this._tileOnError, this, i, e)), !this.options.crossOrigin && "" !== this.options.crossOrigin || (e.crossOrigin = !0 === this.options.crossOrigin ? "" : this.options.crossOrigin), e.alt = "", e.setAttribute("role", "presentation"), e.src = this.getTileUrl(t), e
        },
        getTileUrl: function (t) {
            var i = {
                r: Ct ? "@2x" : "",
                s: this._getSubdomain(t),
                x: t.x,
                y: t.y,
                z: this._getZoomForUrl()
            };
            if (this._map && !this._map.options.crs.infinite) {
                var e = this._globalTileRange.max.y - t.y;
                this.options.tms && (i.y = e), i["-y"] = e
            }
            return g(this._url, h(i, this.options))
        },
        _tileOnLoad: function (t, i) {
            et ? setTimeout(a(t, this, null, i), 0) : t(null, i)
        },
        _tileOnError: function (t, i, e) {
            var n = this.options.errorTileUrl;
            n && i.getAttribute("src") !== n && (i.src = n), t(e, i)
        },
        _onTileRemove: function (t) {
            t.tile.onload = null
        },
        _getZoomForUrl: function () {
            var t = this._tileZoom,
                i = this.options.maxZoom;
            return this.options.zoomReverse && (t = i - t), t + this.options.zoomOffset
        },
        _getSubdomain: function (t) {
            var i = Math.abs(t.x + t.y) % this.options.subdomains.length;
            return this.options.subdomains[i]
        },
        _abortLoading: function () {
            var t, i;
            for (t in this._tiles) this._tiles[t].coords.z !== this._tileZoom && ((i = this._tiles[t].el).onload = l, i.onerror = l, i.complete || (i.src = x, ui(i), delete this._tiles[t]))
        },
        _removeTile: function (t) {
            var i = this._tiles[t];
            if (i) return ht || i.el.setAttribute("src", x), rn.prototype._removeTile.call(this, t)
        },
        _tileReady: function (t, i, e) {
            if (this._map && (!e || e.getAttribute("src") !== x)) return rn.prototype._tileReady.call(this, t, i, e)
        }
    });

    function hn(t, i) {
        return new an(t, i)
    }
    var un = an.extend({
        defaultWmsParams: {
            service: "WMS",
            request: "GetMap",
            layers: "",
            styles: "",
            format: "image/jpeg",
            transparent: !1,
            version: "1.1.1"
        },
        options: {
            crs: null,
            uppercase: !1
        },
        initialize: function (t, i) {
            this._url = t;
            var e = h({}, this.defaultWmsParams);
            for (var n in i) n in this.options || (e[n] = i[n]);
            var o = (i = p(this, i)).detectRetina && Ct ? 2 : 1,
                s = this.getTileSize();
            e.width = s.x * o, e.height = s.y * o, this.wmsParams = e
        },
        onAdd: function (t) {
            this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
            var i = 1.3 <= this._wmsVersion ? "crs" : "srs";
            this.wmsParams[i] = this._crs.code, an.prototype.onAdd.call(this, t)
        },
        getTileUrl: function (t) {
            var i = this._tileCoordsToNwSe(t),
                e = this._crs,
                n = R(e.project(i[0]), e.project(i[1])),
                o = n.min,
                s = n.max,
                r = (1.3 <= this._wmsVersion && this._crs === Me ? [o.y, o.x, s.y, s.x] : [o.x, o.y, s.x, s.y]).join(","),
                a = an.prototype.getTileUrl.call(this, t);
            return a + m(this.wmsParams, a, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + r
        },
        setParams: function (t, i) {
            return h(this.wmsParams, t), i || this.redraw(), this
        }
    });
    an.WMS = un, hn.wms = function (t, i) {
        return new un(t, i)
    };
    var ln = Se.extend({
        options: {
            padding: .1,
            tolerance: 0
        },
        initialize: function (t) {
            p(this, t), u(this), this._layers = this._layers || {}
        },
        onAdd: function () {
            this._container || (this._initContainer(), this._zoomAnimated && pi(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update(), this.on("update", this._updatePaths, this)
        },
        onRemove: function () {
            this.off("update", this._updatePaths, this), this._destroyContainer()
        },
        getEvents: function () {
            var t = {
                viewreset: this._reset,
                zoom: this._onZoom,
                moveend: this._update,
                zoomend: this._onZoomEnd
            };
            return this._zoomAnimated && (t.zoomanim = this._onAnimZoom), t
        },
        _onAnimZoom: function (t) {
            this._updateTransform(t.center, t.zoom)
        },
        _onZoom: function () {
            this._updateTransform(this._map.getCenter(), this._map.getZoom())
        },
        _updateTransform: function (t, i) {
            var e = this._map.getZoomScale(i, this._zoom),
                n = Pi(this._container),
                o = this._map.getSize().multiplyBy(.5 + this.options.padding),
                s = this._map.project(this._center, i),
                r = this._map.project(t, i).subtract(s),
                a = o.multiplyBy(-e).add(n).add(o).subtract(r);
            yt ? xi(this._container, a, e) : wi(this._container, a)
        },
        _reset: function () {
            for (var t in this._update(), this._updateTransform(this._center, this._zoom), this._layers) this._layers[t]._reset()
        },
        _onZoomEnd: function () {
            for (var t in this._layers) this._layers[t]._project()
        },
        _updatePaths: function () {
            for (var t in this._layers) this._layers[t]._update()
        },
        _update: function () {
            var t = this.options.padding,
                i = this._map.getSize(),
                e = this._map.containerPointToLayerPoint(i.multiplyBy(-t)).round();
            this._bounds = new O(e, e.add(i.multiplyBy(1 + 2 * t)).round()), this._center = this._map.getCenter(), this._zoom = this._map.getZoom()
        }
    }),
        cn = ln.extend({
            getEvents: function () {
                var t = ln.prototype.getEvents.call(this);
                return t.viewprereset = this._onViewPreReset, t
            },
            _onViewPreReset: function () {
                this._postponeUpdatePaths = !0
            },
            onAdd: function () {
                ln.prototype.onAdd.call(this), this._draw()
            },
            _initContainer: function () {
                var t = this._container = document.createElement("canvas");
                Ei(t, "mousemove", o(this._onMouseMove, 32, this), this), Ei(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), Ei(t, "mouseout", this._handleMouseOut, this), this._ctx = t.getContext("2d")
            },
            _destroyContainer: function () {
                C(this._redrawRequest), delete this._ctx, ui(this._container), Bi(this._container), delete this._container
            },
            _updatePaths: function () {
                if (!this._postponeUpdatePaths) {
                    for (var t in this._redrawBounds = null, this._layers) this._layers[t]._update();
                    this._redraw()
                }
            },
            _update: function () {
                if (!this._map._animatingZoom || !this._bounds) {
                    ln.prototype._update.call(this);
                    var t = this._bounds,
                        i = this._container,
                        e = t.getSize(),
                        n = Ct ? 2 : 1;
                    wi(i, t.min), i.width = n * e.x, i.height = n * e.y, i.style.width = e.x + "px", i.style.height = e.y + "px", Ct && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y), this.fire("update")
                }
            },
            _reset: function () {
                ln.prototype._reset.call(this), this._postponeUpdatePaths && (this._postponeUpdatePaths = !1, this._updatePaths())
            },
            _initPath: function (t) {
                this._updateDashArray(t);
                var i = (this._layers[u(t)] = t)._order = {
                    layer: t,
                    prev: this._drawLast,
                    next: null
                };
                this._drawLast && (this._drawLast.next = i), this._drawLast = i, this._drawFirst = this._drawFirst || this._drawLast
            },
            _addPath: function (t) {
                this._requestRedraw(t)
            },
            _removePath: function (t) {
                var i = t._order,
                    e = i.next,
                    n = i.prev;
                e ? e.prev = n : this._drawLast = n, n ? n.next = e : this._drawFirst = e, delete t._order, delete this._layers[u(t)], this._requestRedraw(t)
            },
            _updatePath: function (t) {
                this._extendRedrawBounds(t), t._project(), t._update(), this._requestRedraw(t)
            },
            _updateStyle: function (t) {
                this._updateDashArray(t), this._requestRedraw(t)
            },
            _updateDashArray: function (t) {
                if ("string" == typeof t.options.dashArray) {
                    var i, e, n = t.options.dashArray.split(/[, ]+/),
                        o = [];
                    for (e = 0; e < n.length; e++) {
                        if (i = Number(n[e]), isNaN(i)) return;
                        o.push(i)
                    }
                    t.options._dashArray = o
                } else t.options._dashArray = t.options.dashArray
            },
            _requestRedraw: function (t) {
                this._map && (this._extendRedrawBounds(t), this._redrawRequest = this._redrawRequest || M(this._redraw, this))
            },
            _extendRedrawBounds: function (t) {
                if (t._pxBounds) {
                    var i = (t.options.weight || 0) + 1;
                    this._redrawBounds = this._redrawBounds || new O, this._redrawBounds.extend(t._pxBounds.min.subtract([i, i])), this._redrawBounds.extend(t._pxBounds.max.add([i, i]))
                }
            },
            _redraw: function () {
                this._redrawRequest = null, this._redrawBounds && (this._redrawBounds.min._floor(), this._redrawBounds.max._ceil()), this._clear(), this._draw(), this._redrawBounds = null
            },
            _clear: function () {
                var t = this._redrawBounds;
                if (t) {
                    var i = t.getSize();
                    this._ctx.clearRect(t.min.x, t.min.y, i.x, i.y)
                } else this._ctx.clearRect(0, 0, this._container.width, this._container.height)
            },
            _draw: function () {
                var t, i = this._redrawBounds;
                if (this._ctx.save(), i) {
                    var e = i.getSize();
                    this._ctx.beginPath(), this._ctx.rect(i.min.x, i.min.y, e.x, e.y), this._ctx.clip()
                }
                this._drawing = !0;
                for (var n = this._drawFirst; n; n = n.next) t = n.layer, (!i || t._pxBounds && t._pxBounds.intersects(i)) && t._updatePath();
                this._drawing = !1, this._ctx.restore()
            },
            _updatePoly: function (t, i) {
                if (this._drawing) {
                    var e, n, o, s, r = t._parts,
                        a = r.length,
                        h = this._ctx;
                    if (a) {
                        for (h.beginPath(), e = 0; e < a; e++) {
                            for (n = 0, o = r[e].length; n < o; n++) s = r[e][n], h[n ? "lineTo" : "moveTo"](s.x, s.y);
                            i && h.closePath()
                        }
                        this._fillStroke(h, t)
                    }
                }
            },
            _updateCircle: function (t) {
                if (this._drawing && !t._empty()) {
                    var i = t._point,
                        e = this._ctx,
                        n = Math.max(Math.round(t._radius), 1),
                        o = (Math.max(Math.round(t._radiusY), 1) || n) / n;
                    1 != o && (e.save(), e.scale(1, o)), e.beginPath(), e.arc(i.x, i.y / o, n, 0, 2 * Math.PI, !1), 1 != o && e.restore(), this._fillStroke(e, t)
                }
            },
            _fillStroke: function (t, i) {
                var e = i.options;
                e.fill && (t.globalAlpha = e.fillOpacity, t.fillStyle = e.fillColor || e.color, t.fill(e.fillRule || "evenodd")), e.stroke && 0 !== e.weight && (t.setLineDash && t.setLineDash(i.options && i.options._dashArray || []), t.globalAlpha = e.opacity, t.lineWidth = e.weight, t.strokeStyle = e.color, t.lineCap = e.lineCap, t.lineJoin = e.lineJoin, t.stroke())
            },
            _onClick: function (t) {
                for (var i, e, n = this._map.mouseEventToLayerPoint(t), o = this._drawFirst; o; o = o.next)(i = o.layer).options.interactive && i._containsPoint(n) && !this._map._draggableMoved(i) && (e = i);
                e && (qi(t), this._fireEvent([e], t))
            },
            _onMouseMove: function (t) {
                if (this._map && !this._map.dragging.moving() && !this._map._animatingZoom) {
                    var i = this._map.mouseEventToLayerPoint(t);
                    this._handleMouseHover(t, i)
                }
            },
            _handleMouseOut: function (t) {
                var i = this._hoveredLayer;
                i && (mi(this._container, "leaflet-interactive"), this._fireEvent([i], t, "mouseout"), this._hoveredLayer = null)
            },
            _handleMouseHover: function (t, i) {
                for (var e, n, o = this._drawFirst; o; o = o.next)(e = o.layer).options.interactive && e._containsPoint(i) && (n = e);
                n !== this._hoveredLayer && (this._handleMouseOut(t), n && (pi(this._container, "leaflet-interactive"), this._fireEvent([n], t, "mouseover"), this._hoveredLayer = n)), this._hoveredLayer && this._fireEvent([this._hoveredLayer], t)
            },
            _fireEvent: function (t, i, e) {
                this._map._fireDOMEvent(i, e || i.type, t)
            },
            _bringToFront: function (t) {
                var i = t._order;
                if (i) {
                    var e = i.next,
                        n = i.prev;
                    e && ((e.prev = n) ? n.next = e : e && (this._drawFirst = e), i.prev = this._drawLast, (this._drawLast.next = i).next = null, this._drawLast = i, this._requestRedraw(t))
                }
            },
            _bringToBack: function (t) {
                var i = t._order;
                if (i) {
                    var e = i.next,
                        n = i.prev;
                    n && ((n.next = e) ? e.prev = n : n && (this._drawLast = n), i.prev = null, i.next = this._drawFirst, this._drawFirst.prev = i, this._drawFirst = i, this._requestRedraw(t))
                }
            }
        });

    function _n(t) {
        return St ? new cn(t) : null
    }
    var dn = function () {
        try {
            return document.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
                function (t) {
                    return document.createElement("<lvml:" + t + ' class="lvml">')
                }
        } catch (t) {
            return function (t) {
                return document.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
            }
        }
    }(),
        pn = {
            _initContainer: function () {
                this._container = hi("div", "leaflet-vml-container")
            },
            _update: function () {
                this._map._animatingZoom || (ln.prototype._update.call(this), this.fire("update"))
            },
            _initPath: function (t) {
                var i = t._container = dn("shape");
                pi(i, "leaflet-vml-shape " + (this.options.className || "")), i.coordsize = "1 1", t._path = dn("path"), i.appendChild(t._path), this._updateStyle(t), this._layers[u(t)] = t
            },
            _addPath: function (t) {
                var i = t._container;
                this._container.appendChild(i), t.options.interactive && t.addInteractiveTarget(i)
            },
            _removePath: function (t) {
                var i = t._container;
                ui(i), t.removeInteractiveTarget(i), delete this._layers[u(t)]
            },
            _updateStyle: function (t) {
                var i = t._stroke,
                    e = t._fill,
                    n = t.options,
                    o = t._container;
                o.stroked = !!n.stroke, o.filled = !!n.fill, n.stroke ? (i || (i = t._stroke = dn("stroke")), o.appendChild(i), i.weight = n.weight + "px", i.color = n.color, i.opacity = n.opacity, n.dashArray ? i.dashStyle = v(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : i.dashStyle = "", i.endcap = n.lineCap.replace("butt", "flat"), i.joinstyle = n.lineJoin) : i && (o.removeChild(i), t._stroke = null), n.fill ? (e || (e = t._fill = dn("fill")), o.appendChild(e), e.color = n.fillColor || n.color, e.opacity = n.fillOpacity) : e && (o.removeChild(e), t._fill = null)
            },
            _updateCircle: function (t) {
                var i = t._point.round(),
                    e = Math.round(t._radius),
                    n = Math.round(t._radiusY || e);
                this._setPath(t, t._empty() ? "M0 0" : "AL " + i.x + "," + i.y + " " + e + "," + n + " 0,23592600")
            },
            _setPath: function (t, i) {
                t._path.v = i
            },
            _bringToFront: function (t) {
                ci(t._container)
            },
            _bringToBack: function (t) {
                _i(t._container)
            }
        },
        mn = Et ? dn : $,
        fn = ln.extend({
            getEvents: function () {
                var t = ln.prototype.getEvents.call(this);
                return t.zoomstart = this._onZoomStart, t
            },
            _initContainer: function () {
                this._container = mn("svg"), this._container.setAttribute("pointer-events", "none"), this._rootGroup = mn("g"), this._container.appendChild(this._rootGroup)
            },
            _destroyContainer: function () {
                ui(this._container), Bi(this._container), delete this._container, delete this._rootGroup, delete this._svgSize
            },
            _onZoomStart: function () {
                this._update()
            },
            _update: function () {
                if (!this._map._animatingZoom || !this._bounds) {
                    ln.prototype._update.call(this);
                    var t = this._bounds,
                        i = t.getSize(),
                        e = this._container;
                    this._svgSize && this._svgSize.equals(i) || (this._svgSize = i, e.setAttribute("width", i.x), e.setAttribute("height", i.y)), wi(e, t.min), e.setAttribute("viewBox", [t.min.x, t.min.y, i.x, i.y].join(" ")), this.fire("update")
                }
            },
            _initPath: function (t) {
                var i = t._path = mn("path");
                t.options.className && pi(i, t.options.className), t.options.interactive && pi(i, "leaflet-interactive"), this._updateStyle(t), this._layers[u(t)] = t
            },
            _addPath: function (t) {
                this._rootGroup || this._initContainer(), this._rootGroup.appendChild(t._path), t.addInteractiveTarget(t._path)
            },
            _removePath: function (t) {
                ui(t._path), t.removeInteractiveTarget(t._path), delete this._layers[u(t)]
            },
            _updatePath: function (t) {
                t._project(), t._update()
            },
            _updateStyle: function (t) {
                var i = t._path,
                    e = t.options;
                i && (e.stroke ? (i.setAttribute("stroke", e.color), i.setAttribute("stroke-opacity", e.opacity), i.setAttribute("stroke-width", e.weight), i.setAttribute("stroke-linecap", e.lineCap), i.setAttribute("stroke-linejoin", e.lineJoin), e.dashArray ? i.setAttribute("stroke-dasharray", e.dashArray) : i.removeAttribute("stroke-dasharray"), e.dashOffset ? i.setAttribute("stroke-dashoffset", e.dashOffset) : i.removeAttribute("stroke-dashoffset")) : i.setAttribute("stroke", "none"), e.fill ? (i.setAttribute("fill", e.fillColor || e.color), i.setAttribute("fill-opacity", e.fillOpacity), i.setAttribute("fill-rule", e.fillRule || "evenodd")) : i.setAttribute("fill", "none"))
            },
            _updatePoly: function (t, i) {
                this._setPath(t, Q(t._parts, i))
            },
            _updateCircle: function (t) {
                var i = t._point,
                    e = Math.max(Math.round(t._radius), 1),
                    n = "a" + e + "," + (Math.max(Math.round(t._radiusY), 1) || e) + " 0 1,0 ",
                    o = t._empty() ? "M0 0" : "M" + (i.x - e) + "," + i.y + n + 2 * e + ",0 " + n + 2 * -e + ",0 ";
                this._setPath(t, o)
            },
            _setPath: function (t, i) {
                t._path.setAttribute("d", i)
            },
            _bringToFront: function (t) {
                ci(t._path)
            },
            _bringToBack: function (t) {
                _i(t._path)
            }
        });

    function gn(t) {
        return Zt || Et ? new fn(t) : null
    }
    Et && fn.include(pn), Ji.include({
        getRenderer: function (t) {
            var i = t.options.renderer || this._getPaneRenderer(t.options.pane) || this.options.renderer || this._renderer;
            return i || (i = this._renderer = this._createRenderer()), this.hasLayer(i) || this.addLayer(i), i
        },
        _getPaneRenderer: function (t) {
            if ("overlayPane" === t || void 0 === t) return !1;
            var i = this._paneRenderers[t];
            return void 0 === i && (i = this._createRenderer({
                pane: t
            }), this._paneRenderers[t] = i), i
        },
        _createRenderer: function (t) {
            return this.options.preferCanvas && _n(t) || gn(t)
        }
    });
    var vn = je.extend({
        initialize: function (t, i) {
            je.prototype.initialize.call(this, this._boundsToLatLngs(t), i)
        },
        setBounds: function (t) {
            return this.setLatLngs(this._boundsToLatLngs(t))
        },
        _boundsToLatLngs: function (t) {
            return [(t = D(t)).getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
        }
    });
    fn.create = mn, fn.pointsToPath = Q, We.geometryToLayer = He, We.coordsToLatLng = Fe, We.coordsToLatLngs = Ue, We.latLngToCoords = Ve, We.latLngsToCoords = qe, We.getFeature = Ge, We.asFeature = Ke, Ji.mergeOptions({
        boxZoom: !0
    });
    var yn = oe.extend({
        initialize: function (t) {
            this._map = t, this._container = t._container, this._pane = t._panes.overlayPane, this._resetStateTimeout = 0, t.on("unload", this._destroy, this)
        },
        addHooks: function () {
            Ei(this._container, "mousedown", this._onMouseDown, this)
        },
        removeHooks: function () {
            Bi(this._container, "mousedown", this._onMouseDown, this)
        },
        moved: function () {
            return this._moved
        },
        _destroy: function () {
            ui(this._pane), delete this._pane
        },
        _resetState: function () {
            this._resetStateTimeout = 0, this._moved = !1
        },
        _clearDeferredResetState: function () {
            0 !== this._resetStateTimeout && (clearTimeout(this._resetStateTimeout), this._resetStateTimeout = 0)
        },
        _onMouseDown: function (t) {
            if (!t.shiftKey || 1 !== t.which && 1 !== t.button) return !1;
            this._clearDeferredResetState(), this._resetState(), $t(), bi(), this._startPoint = this._map.mouseEventToContainerPoint(t), Ei(document, {
                contextmenu: ji,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseMove: function (t) {
            this._moved || (this._moved = !0, this._box = hi("div", "leaflet-zoom-box", this._container), pi(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
            var i = new O(this._point, this._startPoint),
                e = i.getSize();
            wi(this._box, i.min), this._box.style.width = e.x + "px", this._box.style.height = e.y + "px"
        },
        _finish: function () {
            this._moved && (ui(this._box), mi(this._container, "leaflet-crosshair")), Qt(), Ti(), Bi(document, {
                contextmenu: ji,
                mousemove: this._onMouseMove,
                mouseup: this._onMouseUp,
                keydown: this._onKeyDown
            }, this)
        },
        _onMouseUp: function (t) {
            if ((1 === t.which || 1 === t.button) && (this._finish(), this._moved)) {
                this._clearDeferredResetState(), this._resetStateTimeout = setTimeout(a(this._resetState, this), 0);
                var i = new N(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
                this._map.fitBounds(i).fire("boxzoomend", {
                    boxZoomBounds: i
                })
            }
        },
        _onKeyDown: function (t) {
            27 === t.keyCode && this._finish()
        }
    });
    Ji.addInitHook("addHandler", "boxZoom", yn), Ji.mergeOptions({
        doubleClickZoom: !0
    });
    var xn = oe.extend({
        addHooks: function () {
            this._map.on("dblclick", this._onDoubleClick, this)
        },
        removeHooks: function () {
            this._map.off("dblclick", this._onDoubleClick, this)
        },
        _onDoubleClick: function (t) {
            var i = this._map,
                e = i.getZoom(),
                n = i.options.zoomDelta,
                o = t.originalEvent.shiftKey ? e - n : e + n;
            "center" === i.options.doubleClickZoom ? i.setZoom(o) : i.setZoomAround(t.containerPoint, o)
        }
    });
    Ji.addInitHook("addHandler", "doubleClickZoom", xn), Ji.mergeOptions({
        dragging: !0,
        inertia: !rt,
        inertiaDeceleration: 3400,
        inertiaMaxSpeed: 1 / 0,
        easeLinearity: .2,
        worldCopyJump: !1,
        maxBoundsViscosity: 0
    });
    var wn = oe.extend({
        addHooks: function () {
            if (!this._draggable) {
                var t = this._map;
                this._draggable = new le(t._mapPane, t._container), this._draggable.on({
                    dragstart: this._onDragStart,
                    drag: this._onDrag,
                    dragend: this._onDragEnd
                }, this), this._draggable.on("predrag", this._onPreDragLimit, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDragWrap, this), t.on("zoomend", this._onZoomEnd, this), t.whenReady(this._onZoomEnd, this))
            }
            pi(this._map._container, "leaflet-grab leaflet-touch-drag"), this._draggable.enable(), this._positions = [], this._times = []
        },
        removeHooks: function () {
            mi(this._map._container, "leaflet-grab"), mi(this._map._container, "leaflet-touch-drag"), this._draggable.disable()
        },
        moved: function () {
            return this._draggable && this._draggable._moved
        },
        moving: function () {
            return this._draggable && this._draggable._moving
        },
        _onDragStart: function () {
            var t = this._map;
            if (t._stop(), this._map.options.maxBounds && this._map.options.maxBoundsViscosity) {
                var i = D(this._map.options.maxBounds);
                this._offsetLimit = R(this._map.latLngToContainerPoint(i.getNorthWest()).multiplyBy(-1), this._map.latLngToContainerPoint(i.getSouthEast()).multiplyBy(-1).add(this._map.getSize())), this._viscosity = Math.min(1, Math.max(0, this._map.options.maxBoundsViscosity))
            } else this._offsetLimit = null;
            t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
        },
        _onDrag: function (t) {
            if (this._map.options.inertia) {
                var i = this._lastTime = +new Date,
                    e = this._lastPos = this._draggable._absPos || this._draggable._newPos;
                this._positions.push(e), this._times.push(i), this._prunePositions(i)
            }
            this._map.fire("move", t).fire("drag", t)
        },
        _prunePositions: function (t) {
            for (; 1 < this._positions.length && 50 < t - this._times[0];) this._positions.shift(), this._times.shift()
        },
        _onZoomEnd: function () {
            var t = this._map.getSize().divideBy(2),
                i = this._map.latLngToLayerPoint([0, 0]);
            this._initialWorldOffset = i.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x
        },
        _viscousLimit: function (t, i) {
            return t - (t - i) * this._viscosity
        },
        _onPreDragLimit: function () {
            if (this._viscosity && this._offsetLimit) {
                var t = this._draggable._newPos.subtract(this._draggable._startPos),
                    i = this._offsetLimit;
                t.x < i.min.x && (t.x = this._viscousLimit(t.x, i.min.x)), t.y < i.min.y && (t.y = this._viscousLimit(t.y, i.min.y)), t.x > i.max.x && (t.x = this._viscousLimit(t.x, i.max.x)), t.y > i.max.y && (t.y = this._viscousLimit(t.y, i.max.y)), this._draggable._newPos = this._draggable._startPos.add(t)
            }
        },
        _onPreDragWrap: function () {
            var t = this._worldWidth,
                i = Math.round(t / 2),
                e = this._initialWorldOffset,
                n = this._draggable._newPos.x,
                o = (n - i + e) % t + i - e,
                s = (n + i + e) % t - i - e,
                r = Math.abs(o + e) < Math.abs(s + e) ? o : s;
            this._draggable._absPos = this._draggable._newPos.clone(), this._draggable._newPos.x = r
        },
        _onDragEnd: function (t) {
            var i = this._map,
                e = i.options,
                n = !e.inertia || this._times.length < 2;
            if (i.fire("dragend", t), n) i.fire("moveend");
            else {
                this._prunePositions(+new Date);
                var o = this._lastPos.subtract(this._positions[0]),
                    s = (this._lastTime - this._times[0]) / 1e3,
                    r = e.easeLinearity,
                    a = o.multiplyBy(r / s),
                    h = a.distanceTo([0, 0]),
                    u = Math.min(e.inertiaMaxSpeed, h),
                    l = a.multiplyBy(u / h),
                    c = u / (e.inertiaDeceleration * r),
                    _ = l.multiplyBy(-c / 2).round();
                _.x || _.y ? (_ = i._limitOffset(_, i.options.maxBounds), M(function () {
                    i.panBy(_, {
                        duration: c,
                        easeLinearity: r,
                        noMoveStart: !0,
                        animate: !0
                    })
                })) : i.fire("moveend")
            }
        }
    });
    Ji.addInitHook("addHandler", "dragging", wn), Ji.mergeOptions({
        keyboard: !0,
        keyboardPanDelta: 80
    });
    var Pn = oe.extend({
        keyCodes: {
            left: [37],
            right: [39],
            down: [40],
            up: [38],
            zoomIn: [187, 107, 61, 171],
            zoomOut: [189, 109, 54, 173]
        },
        initialize: function (t) {
            this._map = t, this._setPanDelta(t.options.keyboardPanDelta), this._setZoomDelta(t.options.zoomDelta)
        },
        addHooks: function () {
            var t = this._map._container;
            t.tabIndex <= 0 && (t.tabIndex = "0"), Ei(t, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.on({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        removeHooks: function () {
            this._removeHooks(), Bi(this._map._container, {
                focus: this._onFocus,
                blur: this._onBlur,
                mousedown: this._onMouseDown
            }, this), this._map.off({
                focus: this._addHooks,
                blur: this._removeHooks
            }, this)
        },
        _onMouseDown: function () {
            if (!this._focused) {
                var t = document.body,
                    i = document.documentElement,
                    e = t.scrollTop || i.scrollTop,
                    n = t.scrollLeft || i.scrollLeft;
                this._map._container.focus(), window.scrollTo(n, e)
            }
        },
        _onFocus: function () {
            this._focused = !0, this._map.fire("focus")
        },
        _onBlur: function () {
            this._focused = !1, this._map.fire("blur")
        },
        _setPanDelta: function (t) {
            var i, e, n = this._panKeys = {},
                o = this.keyCodes;
            for (i = 0, e = o.left.length; i < e; i++) n[o.left[i]] = [-1 * t, 0];
            for (i = 0, e = o.right.length; i < e; i++) n[o.right[i]] = [t, 0];
            for (i = 0, e = o.down.length; i < e; i++) n[o.down[i]] = [0, t];
            for (i = 0, e = o.up.length; i < e; i++) n[o.up[i]] = [0, -1 * t]
        },
        _setZoomDelta: function (t) {
            var i, e, n = this._zoomKeys = {},
                o = this.keyCodes;
            for (i = 0, e = o.zoomIn.length; i < e; i++) n[o.zoomIn[i]] = t;
            for (i = 0, e = o.zoomOut.length; i < e; i++) n[o.zoomOut[i]] = -t
        },
        _addHooks: function () {
            Ei(document, "keydown", this._onKeyDown, this)
        },
        _removeHooks: function () {
            Bi(document, "keydown", this._onKeyDown, this)
        },
        _onKeyDown: function (t) {
            if (!(t.altKey || t.ctrlKey || t.metaKey)) {
                var i, e = t.keyCode,
                    n = this._map;
                if (e in this._panKeys) n._panAnim && n._panAnim._inProgress || (i = this._panKeys[e], t.shiftKey && (i = I(i).multiplyBy(3)), n.panBy(i), n.options.maxBounds && n.panInsideBounds(n.options.maxBounds));
                else if (e in this._zoomKeys) n.setZoom(n.getZoom() + (t.shiftKey ? 3 : 1) * this._zoomKeys[e]);
                else {
                    if (27 !== e || !n._popup || !n._popup.options.closeOnEscapeKey) return;
                    n.closePopup()
                }
                ji(t)
            }
        }
    });
    Ji.addInitHook("addHandler", "keyboard", Pn), Ji.mergeOptions({
        scrollWheelZoom: !0,
        wheelDebounceTime: 40,
        wheelPxPerZoomLevel: 60
    });
    var Ln = oe.extend({
        addHooks: function () {
            Ei(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0
        },
        removeHooks: function () {
            Bi(this._map._container, "mousewheel", this._onWheelScroll, this)
        },
        _onWheelScroll: function (t) {
            var i = Fi(t),
                e = this._map.options.wheelDebounceTime;
            this._delta += i, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
            var n = Math.max(e - (+new Date - this._startTime), 0);
            clearTimeout(this._timer), this._timer = setTimeout(a(this._performZoom, this), n), ji(t)
        },
        _performZoom: function () {
            var t = this._map,
                i = t.getZoom(),
                e = this._map.options.zoomSnap || 0;
            t._stop();
            var n = this._delta / (4 * this._map.options.wheelPxPerZoomLevel),
                o = 4 * Math.log(2 / (1 + Math.exp(-Math.abs(n)))) / Math.LN2,
                s = e ? Math.ceil(o / e) * e : o,
                r = t._limitZoom(i + (0 < this._delta ? s : -s)) - i;
            this._delta = 0, this._startTime = null, r && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + r) : t.setZoomAround(this._lastMousePos, i + r))
        }
    });
    Ji.addInitHook("addHandler", "scrollWheelZoom", Ln), Ji.mergeOptions({
        tap: !0,
        tapTolerance: 15
    });
    var bn = oe.extend({
        addHooks: function () {
            Ei(this._map._container, "touchstart", this._onDown, this)
        },
        removeHooks: function () {
            Bi(this._map._container, "touchstart", this._onDown, this)
        },
        _onDown: function (t) {
            if (t.touches) {
                if (Di(t), this._fireClick = !0, 1 < t.touches.length) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
                var i = t.touches[0],
                    e = i.target;
                this._startPos = this._newPos = new B(i.clientX, i.clientY), e.tagName && "a" === e.tagName.toLowerCase() && pi(e, "leaflet-active"), this._holdTimeout = setTimeout(a(function () {
                    this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
                }, this), 1e3), this._simulateEvent("mousedown", i), Ei(document, {
                    touchmove: this._onMove,
                    touchend: this._onUp
                }, this)
            }
        },
        _onUp: function (t) {
            if (clearTimeout(this._holdTimeout), Bi(document, {
                touchmove: this._onMove,
                touchend: this._onUp
            }, this), this._fireClick && t && t.changedTouches) {
                var i = t.changedTouches[0],
                    e = i.target;
                e && e.tagName && "a" === e.tagName.toLowerCase() && mi(e, "leaflet-active"), this._simulateEvent("mouseup", i), this._isTapValid() && this._simulateEvent("click", i)
            }
        },
        _isTapValid: function () {
            return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
        },
        _onMove: function (t) {
            var i = t.touches[0];
            this._newPos = new B(i.clientX, i.clientY), this._simulateEvent("mousemove", i)
        },
        _simulateEvent: function (t, i) {
            var e = document.createEvent("MouseEvents");
            e._simulated = !0, i.target._simulatedClick = !0, e.initMouseEvent(t, !0, !0, window, 1, i.screenX, i.screenY, i.clientX, i.clientY, !1, !1, !1, !1, 0, null), i.target.dispatchEvent(e)
        }
    });
    Tt && !bt && Ji.addInitHook("addHandler", "tap", bn), Ji.mergeOptions({
        touchZoom: Tt && !rt,
        bounceAtZoomLimits: !0
    });
    var Tn = oe.extend({
        addHooks: function () {
            pi(this._map._container, "leaflet-touch-zoom"), Ei(this._map._container, "touchstart", this._onTouchStart, this)
        },
        removeHooks: function () {
            mi(this._map._container, "leaflet-touch-zoom"), Bi(this._map._container, "touchstart", this._onTouchStart, this)
        },
        _onTouchStart: function (t) {
            var i = this._map;
            if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
                var e = i.mouseEventToContainerPoint(t.touches[0]),
                    n = i.mouseEventToContainerPoint(t.touches[1]);
                this._centerPoint = i.getSize()._divideBy(2), this._startLatLng = i.containerPointToLatLng(this._centerPoint), "center" !== i.options.touchZoom && (this._pinchStartLatLng = i.containerPointToLatLng(e.add(n)._divideBy(2))), this._startDist = e.distanceTo(n), this._startZoom = i.getZoom(), this._moved = !1, this._zooming = !0, i._stop(), Ei(document, "touchmove", this._onTouchMove, this), Ei(document, "touchend", this._onTouchEnd, this), Di(t)
            }
        },
        _onTouchMove: function (t) {
            if (t.touches && 2 === t.touches.length && this._zooming) {
                var i = this._map,
                    e = i.mouseEventToContainerPoint(t.touches[0]),
                    n = i.mouseEventToContainerPoint(t.touches[1]),
                    o = e.distanceTo(n) / this._startDist;
                if (this._zoom = i.getScaleZoom(o, this._startZoom), !i.options.bounceAtZoomLimits && (this._zoom < i.getMinZoom() && o < 1 || this._zoom > i.getMaxZoom() && 1 < o) && (this._zoom = i._limitZoom(this._zoom)), "center" === i.options.touchZoom) {
                    if (this._center = this._startLatLng, 1 == o) return
                } else {
                    var s = e._add(n)._divideBy(2)._subtract(this._centerPoint);
                    if (1 == o && 0 === s.x && 0 === s.y) return;
                    this._center = i.unproject(i.project(this._pinchStartLatLng, this._zoom).subtract(s), this._zoom)
                }
                this._moved || (i._moveStart(!0, !1), this._moved = !0), C(this._animRequest);
                var r = a(i._move, i, this._center, this._zoom, {
                    pinch: !0,
                    round: !1
                });
                this._animRequest = M(r, this, !0), Di(t)
            }
        },
        _onTouchEnd: function () {
            this._moved && this._zooming ? (this._zooming = !1, C(this._animRequest), Bi(document, "touchmove", this._onTouchMove), Bi(document, "touchend", this._onTouchEnd), this._map.options.zoomAnimation ? this._map._animateZoom(this._center, this._map._limitZoom(this._zoom), !0, this._map.options.zoomSnap) : this._map._resetView(this._center, this._map._limitZoom(this._zoom))) : this._zooming = !1
        }
    });
    Ji.addInitHook("addHandler", "touchZoom", Tn), Ji.BoxZoom = yn, Ji.DoubleClickZoom = xn, Ji.Drag = wn, Ji.Keyboard = Pn, Ji.ScrollWheelZoom = Ln, Ji.Tap = bn, Ji.TouchZoom = Tn, Object.freeze = i, t.version = "1.5.1+HEAD.2e3e0ff", t.Control = Qi, t.control = $i, t.Browser = Bt, t.Evented = k, t.Mixin = re, t.Util = S, t.Class = Z, t.Handler = oe, t.extend = h, t.bind = a, t.stamp = u, t.setOptions = p, t.DomEvent = Yi, t.DomUtil = Zi, t.PosAnimation = Xi, t.Draggable = le, t.LineUtil = ye, t.PolyUtil = Pe, t.Point = B, t.point = I, t.Bounds = O, t.bounds = R, t.Transformation = G, t.transformation = K, t.Projection = Te, t.LatLng = j, t.latLng = W, t.LatLngBounds = N, t.latLngBounds = D, t.CRS = F, t.GeoJSON = We, t.geoJSON = Xe, t.geoJson = Je, t.Layer = Se, t.LayerGroup = Ze, t.layerGroup = function (t, i) {
        return new Ze(t, i)
    }, t.FeatureGroup = Ee, t.featureGroup = function (t) {
        return new Ee(t)
    }, t.ImageOverlay = $e, t.imageOverlay = function (t, i, e) {
        return new $e(t, i, e)
    }, t.VideoOverlay = Qe, t.videoOverlay = function (t, i, e) {
        return new Qe(t, i, e)
    }, t.SVGOverlay = tn, t.svgOverlay = function (t, i, e) {
        return new tn(t, i, e)
    }, t.DivOverlay = en, t.Popup = nn, t.popup = function (t, i) {
        return new nn(t, i)
    }, t.Tooltip = on, t.tooltip = function (t, i) {
        return new on(t, i)
    }, t.Icon = ke, t.icon = function (t) {
        return new ke(t)
    }, t.DivIcon = sn, t.divIcon = function (t) {
        return new sn(t)
    }, t.Marker = Ie, t.marker = function (t, i) {
        return new Ie(t, i)
    }, t.TileLayer = an, t.tileLayer = hn, t.GridLayer = rn, t.gridLayer = function (t) {
        return new rn(t)
    }, t.SVG = fn, t.svg = gn, t.Renderer = ln, t.Canvas = cn, t.canvas = _n, t.Path = Oe, t.CircleMarker = Re, t.circleMarker = function (t, i) {
        return new Re(t, i)
    }, t.Circle = Ne, t.circle = function (t, i, e) {
        return new Ne(t, i, e)
    }, t.Polyline = De, t.polyline = function (t, i) {
        return new De(t, i)
    }, t.Polygon = je, t.polygon = function (t, i) {
        return new je(t, i)
    }, t.Rectangle = vn, t.rectangle = function (t, i) {
        return new vn(t, i)
    }, t.Map = Ji, t.map = function (t, i) {
        return new Ji(t, i)
    };
    var zn = window.L;
    t.noConflict = function () {
        return window.L = zn, this
    }, window.L = t
});;
L.GridLayer.GoogleMutant = L.GridLayer.extend({
    options: {
        minZoom: 0,
        maxZoom: 23,
        tileSize: 256,
        subdomains: 'abc',
        errorTileUrl: '',
        attribution: '',
        opacity: 1,
        continuousWorld: false,
        noWrap: false,
        type: 'roadmap',
        maxNativeZoom: 21
    },
    initialize: function (options) {
        L.GridLayer.prototype.initialize.call(this, options);
        this._ready = !!window.google && !!window.google.maps && !!window.google.maps.Map;
        this._GAPIPromise = this._ready ? Promise.resolve(window.google) : new Promise(function (resolve, reject) {
            var checkCounter = 0;
            var intervalId = null;
            intervalId = setInterval(function () {
                if (checkCounter >= 10) {
                    clearInterval(intervalId);
                    return reject(new Error('window.google not found after 10 attempts'));
                }
                if (!!window.google && !!window.google.maps && !!window.google.maps.Map) {
                    clearInterval(intervalId);
                    return resolve(window.google);
                }
                checkCounter++;
            }, 500);
        });
        this._tileCallbacks = {};
        this._freshTiles = {};
        this._imagesPerTile = (this.options.type === 'hybrid') ? 2 : 1;
        this._boundOnMutatedImage = this._onMutatedImage.bind(this);
    },
    onAdd: function (map) {
        L.GridLayer.prototype.onAdd.call(this, map);
        this._initMutantContainer();
        this._GAPIPromise.then(function () {
            this._ready = true;
            this._map = map;
            this._initMutant();
            map.on('viewreset', this._reset, this);
            if (this.options.updateWhenIdle) {
                map.on('moveend', this._update, this);
            } else {
                map.on('move', this._update, this);
            }
            map.on('zoomend', this._handleZoomAnim, this);
            map.on('resize', this._resize, this);
            google.maps.event.addListenerOnce(this._mutant, 'idle', function () {
                this._checkZoomLevels();
                this._mutantIsReady = true;
            }.bind(this));
            map._controlCorners.bottomright.style.marginBottom = '20px';
            map._controlCorners.bottomleft.style.marginBottom = '20px';
            this._reset();
            this._update();
            if (this._subLayers) {
                for (var layerName in this._subLayers) {
                    this._subLayers[layerName].setMap(this._mutant);
                }
            }
        }.bind(this));
    },
    onRemove: function (map) {
        L.GridLayer.prototype.onRemove.call(this, map);
        this._observer.disconnect();
        map._container.removeChild(this._mutantContainer);
        google.maps.event.clearListeners(map, 'idle');
        google.maps.event.clearListeners(this._mutant, 'idle');
        map.off('viewreset', this._reset, this);
        map.off('move', this._update, this);
        map.off('moveend', this._update, this);
        map.off('zoomend', this._handleZoomAnim, this);
        map.off('resize', this._resize, this);
        if (map._controlCorners) {
            map._controlCorners.bottomright.style.marginBottom = '0em';
            map._controlCorners.bottomleft.style.marginBottom = '0em';
        }
    },
    getAttribution: function () {
        return this.options.attribution;
    },
    setElementSize: function (e, size) {
        e.style.width = size.x + 'px';
        e.style.height = size.y + 'px';
    },
    addGoogleLayer: function (googleLayerName, options) {
        if (!this._subLayers) this._subLayers = {};
        return this._GAPIPromise.then(function () {
            var Constructor = google.maps[googleLayerName];
            var googleLayer = new Constructor(options);
            googleLayer.setMap(this._mutant);
            this._subLayers[googleLayerName] = googleLayer;
            return googleLayer;
        }.bind(this));
    },
    removeGoogleLayer: function (googleLayerName) {
        var googleLayer = this._subLayers && this._subLayers[googleLayerName];
        if (!googleLayer) return;
        googleLayer.setMap(null);
        delete this._subLayers[googleLayerName];
    },
    _initMutantContainer: function () {
        if (!this._mutantContainer) {
            this._mutantContainer = L.DomUtil.create('div', 'leaflet-google-mutant leaflet-top leaflet-left');
            this._mutantContainer.id = '_MutantContainer_' + L.Util.stamp(this._mutantContainer);
            this._mutantContainer.style.zIndex = '800';
            this._mutantContainer.style.pointerEvents = 'none';
            L.DomEvent.off(this._mutantContainer);
        }
        this._map.getContainer().appendChild(this._mutantContainer);
        this.setOpacity(this.options.opacity);
        this.setElementSize(this._mutantContainer, this._map.getSize());
        this._attachObserver(this._mutantContainer);
    },
    _initMutant: function () {
        if (!this._ready || !this._mutantContainer) return;
        if (this._mutant) {
            this._resize();
            return;
        }
        this._mutantCenter = new google.maps.LatLng(0, 0);
        var map = new google.maps.Map(this._mutantContainer, {
            center: this._mutantCenter,
            zoom: 0,
            tilt: 0,
            mapTypeId: this.options.type,
            disableDefaultUI: true,
            keyboardShortcuts: false,
            draggable: false,
            disableDoubleClickZoom: true,
            scrollwheel: false,
            streetViewControl: false,
            styles: this.options.styles || {},
            backgroundColor: 'transparent'
        });
        this._mutant = map;
        google.maps.event.addListenerOnce(map, 'idle', function () {
            var nodes = this._mutantContainer.querySelectorAll('a');
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].style.pointerEvents = 'auto';
            }
        }.bind(this));
        this.fire('spawned', {
            mapObject: map
        });
    },
    _attachObserver: function _attachObserver(node) {
        if (!this._observer)
            this._observer = new MutationObserver(this._onMutations.bind(this));
        this._observer.observe(node, {
            childList: true,
            subtree: true
        });
        Array.prototype.forEach.call(node.querySelectorAll('img'), this._boundOnMutatedImage);
    },
    _onMutations: function _onMutations(mutations) {
        for (var i = 0; i < mutations.length; ++i) {
            var mutation = mutations[i];
            for (var j = 0; j < mutation.addedNodes.length; ++j) {
                var node = mutation.addedNodes[j];
                if (node instanceof HTMLImageElement) {
                    this._onMutatedImage(node);
                } else if (node instanceof HTMLElement) {
                    Array.prototype.forEach.call(node.querySelectorAll('img'), this._boundOnMutatedImage);
                    if (node.style.backgroundColor === 'white') {
                        L.DomUtil.remove(node);
                    }
                    if (node.textContent.indexOf('For development purposes only') === 0) {
                        L.DomUtil.remove(node);
                    }
                    Array.prototype.forEach.call(node.querySelectorAll('div[draggable=false][style*="text-align: center"]'), L.DomUtil.remove);
                }
            }
        }
    },
    _roadRegexp: /!1i(\d+)!2i(\d+)!3i(\d+)!/,
    _satRegexp: /x=(\d+)&y=(\d+)&z=(\d+)/,
    _staticRegExp: /StaticMapService\.GetMapImage/,
    _onMutatedImage: function _onMutatedImage(imgNode) {
        var coords;
        var match = imgNode.src.match(this._roadRegexp);
        var sublayer = 0;
        if (match) {
            coords = {
                z: match[1],
                x: match[2],
                y: match[3]
            };
            if (this._imagesPerTile > 1) {
                imgNode.style.zIndex = 1;
                sublayer = 1;
            }
        } else {
            match = imgNode.src.match(this._satRegexp);
            if (match) {
                coords = {
                    x: match[1],
                    y: match[2],
                    z: match[3]
                };
            }
            sublayer = 0;
        }
        if (coords) {
            var tileKey = this._tileCoordsToKey(coords);
            imgNode.style.position = 'absolute';
            imgNode.style.visibility = 'hidden';
            var key = tileKey + '/' + sublayer;
            this._freshTiles[key] = imgNode;
            if (key in this._tileCallbacks && this._tileCallbacks[key]) {
                this._tileCallbacks[key].pop()(imgNode);
                if (!this._tileCallbacks[key].length) {
                    delete this._tileCallbacks[key];
                }
            } else {
                if (this._tiles[tileKey]) {
                    var c = this._tiles[tileKey].el;
                    var oldImg = (sublayer === 0) ? c.firstChild : c.firstChild.nextSibling;
                    var cloneImgNode = this._clone(imgNode);
                    c.replaceChild(cloneImgNode, oldImg);
                }
            }
        } else if (imgNode.src.match(this._staticRegExp)) {
            imgNode.style.visibility = 'hidden';
        }
    },
    createTile: function (coords, done) {
        var key = this._tileCoordsToKey(coords);
        var tileContainer = L.DomUtil.create('div');
        tileContainer.dataset.pending = this._imagesPerTile;
        done = done.bind(this, null, tileContainer);
        for (var i = 0; i < this._imagesPerTile; i++) {
            var key2 = key + '/' + i;
            if (key2 in this._freshTiles) {
                var imgNode = this._freshTiles[key2];
                tileContainer.appendChild(this._clone(imgNode));
                tileContainer.dataset.pending--;
            } else {
                this._tileCallbacks[key2] = this._tileCallbacks[key2] || [];
                this._tileCallbacks[key2].push((function (c) {
                    return function (imgNode) {
                        c.appendChild(this._clone(imgNode));
                        c.dataset.pending--;
                        if (!parseInt(c.dataset.pending)) {
                            done();
                        }
                    }.bind(this);
                }.bind(this))(tileContainer));
            }
        }
        if (!parseInt(tileContainer.dataset.pending)) {
            L.Util.requestAnimFrame(done);
        }
        return tileContainer;
    },
    _clone: function (imgNode) {
        var clonedImgNode = imgNode.cloneNode(true);
        clonedImgNode.style.visibility = 'visible';
        return clonedImgNode;
    },
    _checkZoomLevels: function () {
        var zoomLevel = this._map.getZoom();
        var gMapZoomLevel = this._mutant.getZoom();
        if (!zoomLevel || !gMapZoomLevel) return;
        if ((gMapZoomLevel !== zoomLevel) || (gMapZoomLevel > this.options.maxNativeZoom)) {
            this._setMaxNativeZoom(gMapZoomLevel);
        }
    },
    _setMaxNativeZoom: function (zoomLevel) {
        if (zoomLevel != this.options.maxNativeZoom) {
            this.options.maxNativeZoom = zoomLevel;
            this._resetView();
        }
    },
    _reset: function () {
        this._initContainer();
    },
    _update: function () {
        if (this._mutant) {
            var center = this._map.getCenter();
            var _center = new google.maps.LatLng(center.lat, center.lng);
            this._mutant.setCenter(_center);
            var zoom = this._map.getZoom();
            var fractionalLevel = zoom !== Math.round(zoom);
            var mutantZoom = this._mutant.getZoom();
            if (!fractionalLevel && (zoom != mutantZoom)) {
                this._mutant.setZoom(zoom);
                if (this._mutantIsReady) this._checkZoomLevels();
            }
        }
        L.GridLayer.prototype._update.call(this);
    },
    _resize: function () {
        var size = this._map.getSize();
        if (this._mutantContainer.style.width === size.x && this._mutantContainer.style.height === size.y)
            return;
        this.setElementSize(this._mutantContainer, size);
        if (!this._mutant) return;
        google.maps.event.trigger(this._mutant, 'resize');
    },
    _handleZoomAnim: function () {
        if (!this._mutant) return;
        var center = this._map.getCenter();
        var _center = new google.maps.LatLng(center.lat, center.lng);
        this._mutant.setCenter(_center);
        this._mutant.setZoom(Math.round(this._map.getZoom()));
    },
    _removeTile: function (key) {
        if (!this._mutant) return;
        setTimeout(this._pruneTile.bind(this, key), 1000);
        return L.GridLayer.prototype._removeTile.call(this, key);
    },
    _pruneTile: function (key) {
        var gZoom = this._mutant.getZoom();
        var tileZoom = key.split(':')[2];
        var googleBounds = this._mutant.getBounds();
        var sw = googleBounds.getSouthWest();
        var ne = googleBounds.getNorthEast();
        var gMapBounds = L.latLngBounds([
            [sw.lat(), sw.lng()],
            [ne.lat(), ne.lng()]
        ]);
        for (var i = 0; i < this._imagesPerTile; i++) {
            var key2 = key + '/' + i;
            if (key2 in this._freshTiles) {
                var tileBounds = this._map && this._keyToBounds(key);
                var stillVisible = this._map && tileBounds.overlaps(gMapBounds) && (tileZoom == gZoom);
                if (!stillVisible) delete this._freshTiles[key2];
            }
        }
    }
});
L.gridLayer.googleMutant = function (options) {
    return new L.GridLayer.GoogleMutant(options);
};;
this.L = this.L || {};
this.L.Control = this.L.Control || {};
this.L.Control.Geocoder = (function (L) {
    'use strict';
    L = L && L.hasOwnProperty('default') ? L['default'] : L;
    var lastCallbackId = 0;
    var badChars = /[&<>"'`]/g;
    var possible = /[&<>"'`]/;
    var escape = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };

    function escapeChar(chr) {
        return escape[chr];
    }

    function htmlEscape(string) {
        if (string == null) {
            return '';
        } else if (!string) {
            return string + '';
        }
        string = '' + string;
        if (!possible.test(string)) {
            return string;
        }
        return string.replace(badChars, escapeChar);
    }

    function jsonp(url, params, callback, context, jsonpParam) {
        var callbackId = '_l_geocoder_' + lastCallbackId++;
        params[jsonpParam || 'callback'] = callbackId;
        window[callbackId] = L.Util.bind(callback, context);
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url + getParamString(params);
        script.id = callbackId;
        document.getElementsByTagName('head')[0].appendChild(script);
    }

    function getJSON(url, params, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState !== 4) {
                return;
            }
            if (xmlHttp.status !== 200 && xmlHttp.status !== 304) {
                callback('');
                return;
            }
            callback(xmlHttp.response);
        };
        xmlHttp.open('GET', url + getParamString(params), true);
        xmlHttp.responseType = 'json';
        xmlHttp.setRequestHeader('Accept', 'application/json');
        xmlHttp.send(null);
    }

    function template(str, data) {
        return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
            var value = data[key];
            if (value === undefined) {
                value = '';
            } else if (typeof value === 'function') {
                value = value(data);
            }
            return htmlEscape(value);
        });
    }

    function getParamString(obj, existingUrl, uppercase) {
        var params = [];
        for (var i in obj) {
            var key = encodeURIComponent(uppercase ? i.toUpperCase() : i);
            var value = obj[i];
            if (!L.Util.isArray(value)) {
                params.push(key + '=' + encodeURIComponent(value));
            } else {
                for (var j = 0; j < value.length; j++) {
                    params.push(key + '=' + encodeURIComponent(value[j]));
                }
            }
        }
        return (!existingUrl || existingUrl.indexOf('?') === -1 ? '?' : '&') + params.join('&');
    }
    var ArcGis = L.Class.extend({
        options: {
            service_url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
        },
        initialize: function (accessToken, options) {
            L.setOptions(this, options);
            this._accessToken = accessToken;
        },
        geocode: function (query, cb, context) {
            var params = {
                SingleLine: query,
                outFields: 'Addr_Type',
                forStorage: false,
                maxLocations: 10,
                f: 'json'
            };
            if (this._key && this._key.length) {
                params.token = this._key;
            }
            getJSON(this.options.service_url + '/findAddressCandidates', L.extend(params, this.options.geocodingQueryParams), function (data) {
                var results = [],
                    loc, latLng, latLngBounds;
                if (data.candidates && data.candidates.length) {
                    for (var i = 0; i <= data.candidates.length - 1; i++) {
                        loc = data.candidates[i];
                        latLng = L.latLng(loc.location.y, loc.location.x);
                        latLngBounds = L.latLngBounds(L.latLng(loc.extent.ymax, loc.extent.xmax), L.latLng(loc.extent.ymin, loc.extent.xmin));
                        results[i] = {
                            name: loc.address,
                            bbox: latLngBounds,
                            center: latLng
                        };
                    }
                }
                cb.call(context, results);
            });
        },
        suggest: function (query, cb, context) {
            return this.geocode(query, cb, context);
        },
        reverse: function (location, scale, cb, context) {
            var params = {
                location: encodeURIComponent(location.lng) + ',' + encodeURIComponent(location.lat),
                distance: 100,
                f: 'json'
            };
            getJSON(this.options.service_url + '/reverseGeocode', params, function (data) {
                var result = [],
                    loc;
                if (data && !data.error) {
                    loc = L.latLng(data.location.y, data.location.x);
                    result.push({
                        name: data.address.Match_addr,
                        center: loc,
                        bounds: L.latLngBounds(loc, loc)
                    });
                }
                cb.call(context, result);
            });
        }
    });

    function arcgis(accessToken, options) {
        return new ArcGis(accessToken, options);
    }
    var Bing = L.Class.extend({
        initialize: function (key) {
            this.key = key;
        },
        geocode: function (query, cb, context) {
            jsonp('https://dev.virtualearth.net/REST/v1/Locations', {
                query: query,
                key: this.key
            }, function (data) {
                var results = [];
                if (data.resourceSets.length > 0) {
                    for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
                        var resource = data.resourceSets[0].resources[i],
                            bbox = resource.bbox;
                        results[i] = {
                            name: resource.name,
                            bbox: L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
                            center: L.latLng(resource.point.coordinates)
                        };
                    }
                }
                cb.call(context, results);
            }, this, 'jsonp');
        },
        reverse: function (location, scale, cb, context) {
            jsonp('//dev.virtualearth.net/REST/v1/Locations/' + location.lat + ',' + location.lng, {
                key: this.key
            }, function (data) {
                var results = [];
                for (var i = data.resourceSets[0].resources.length - 1; i >= 0; i--) {
                    var resource = data.resourceSets[0].resources[i],
                        bbox = resource.bbox;
                    results[i] = {
                        name: resource.name,
                        bbox: L.latLngBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]),
                        center: L.latLng(resource.point.coordinates)
                    };
                }
                cb.call(context, results);
            }, this, 'jsonp');
        }
    });

    function bing(key) {
        return new Bing(key);
    }
    var Google = L.Class.extend({
        options: {
            serviceUrl: 'https://maps.googleapis.com/maps/api/geocode/json',
            geocodingQueryParams: {},
            reverseQueryParams: {}
        },
        initialize: function (key, options) {
            this._key = key;
            L.setOptions(this, options);
            this.options.serviceUrl = this.options.service_url || this.options.serviceUrl;
        },
        geocode: function (query, cb, context) {
            var params = {
                address: query
            };
            if (this._key && this._key.length) {
                params.key = this._key;
            }
            params = L.Util.extend(params, this.options.geocodingQueryParams);
            getJSON(this.options.serviceUrl, params, function (data) {
                var results = [],
                    loc, latLng, latLngBounds;
                if (data.results && data.results.length) {
                    for (var i = 0; i <= data.results.length - 1; i++) {
                        loc = data.results[i];
                        latLng = L.latLng(loc.geometry.location);
                        latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
                        results[i] = {
                            name: loc.formatted_address,
                            bbox: latLngBounds,
                            center: latLng,
                            properties: loc.address_components
                        };
                    }
                }
                cb.call(context, results);
            });
        },
        reverse: function (location, scale, cb, context) {
            var params = {
                latlng: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng)
            };
            params = L.Util.extend(params, this.options.reverseQueryParams);
            if (this._key && this._key.length) {
                params.key = this._key;
            }
            getJSON(this.options.serviceUrl, params, function (data) {
                var results = [],
                    loc, latLng, latLngBounds;
                if (data.results && data.results.length) {
                    for (var i = 0; i <= data.results.length - 1; i++) {
                        loc = data.results[i];
                        latLng = L.latLng(loc.geometry.location);
                        latLngBounds = L.latLngBounds(L.latLng(loc.geometry.viewport.northeast), L.latLng(loc.geometry.viewport.southwest));
                        results[i] = {
                            name: loc.formatted_address,
                            bbox: latLngBounds,
                            center: latLng,
                            properties: loc.address_components
                        };
                    }
                }
                cb.call(context, results);
            });
        }
    });

    function google(key, options) {
        return new Google(key, options);
    }
    var HERE = L.Class.extend({
        options: {
            geocodeUrl: 'http://geocoder.api.here.com/6.2/geocode.json',
            reverseGeocodeUrl: 'http://reverse.geocoder.api.here.com/6.2/reversegeocode.json',
            app_id: '<insert your app_id here>',
            app_code: '<insert your app_code here>',
            geocodingQueryParams: {},
            reverseQueryParams: {}
        },
        initialize: function (options) {
            L.setOptions(this, options);
        },
        geocode: function (query, cb, context) {
            var params = {
                searchtext: query,
                gen: 9,
                app_id: this.options.app_id,
                app_code: this.options.app_code,
                jsonattributes: 1
            };
            params = L.Util.extend(params, this.options.geocodingQueryParams);
            this.getJSON(this.options.geocodeUrl, params, cb, context);
        },
        reverse: function (location, scale, cb, context) {
            var params = {
                prox: encodeURIComponent(location.lat) + ',' + encodeURIComponent(location.lng),
                mode: 'retrieveAddresses',
                app_id: this.options.app_id,
                app_code: this.options.app_code,
                gen: 9,
                jsonattributes: 1
            };
            params = L.Util.extend(params, this.options.reverseQueryParams);
            this.getJSON(this.options.reverseGeocodeUrl, params, cb, context);
        },
        getJSON: function (url, params, cb, context) {
            getJSON(url, params, function (data) {
                var results = [],
                    loc, latLng, latLngBounds;
                if (data.response.view && data.response.view.length) {
                    for (var i = 0; i <= data.response.view[0].result.length - 1; i++) {
                        loc = data.response.view[0].result[i].location;
                        latLng = L.latLng(loc.displayPosition.latitude, loc.displayPosition.longitude);
                        latLngBounds = L.latLngBounds(L.latLng(loc.mapView.topLeft.latitude, loc.mapView.topLeft.longitude), L.latLng(loc.mapView.bottomRight.latitude, loc.mapView.bottomRight.longitude));
                        results[i] = {
                            name: loc.address.label,
                            bbox: latLngBounds,
                            center: latLng
                        };
                    }
                }
                cb.call(context, results);
            });
        }
    });

    function here(options) {
        return new HERE(options);
    }
    var LatLng = L.Class.extend({
        options: {
            next: undefined,
            sizeInMeters: 10000
        },
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },
        geocode: function (query, cb, context) {
            var match;
            var center;
            if ((match = query.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/))) {
                center = L.latLng((/N/i.test(match[1]) ? 1 : -1) * parseFloat(match[2]), (/E/i.test(match[3]) ? 1 : -1) * parseFloat(match[4]));
            } else if ((match = query.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/))) {
                center = L.latLng((/N/i.test(match[2]) ? 1 : -1) * parseFloat(match[1]), (/E/i.test(match[4]) ? 1 : -1) * parseFloat(match[3]));
            } else if ((match = query.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/))) {
                center = L.latLng((/N/i.test(match[1]) ? 1 : -1) * (parseFloat(match[2]) + parseFloat(match[3] / 60)), (/E/i.test(match[4]) ? 1 : -1) * (parseFloat(match[5]) + parseFloat(match[6] / 60)));
            } else if ((match = query.match(/^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/))) {
                center = L.latLng((/N/i.test(match[3]) ? 1 : -1) * (parseFloat(match[1]) + parseFloat(match[2] / 60)), (/E/i.test(match[6]) ? 1 : -1) * (parseFloat(match[4]) + parseFloat(match[5] / 60)));
            } else if ((match = query.match(/^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/))) {
                center = L.latLng((/N/i.test(match[1]) ? 1 : -1) * (parseFloat(match[2]) + parseFloat(match[3] / 60 + parseFloat(match[4] / 3600))), (/E/i.test(match[5]) ? 1 : -1) * (parseFloat(match[6]) + parseFloat(match[7] / 60) + parseFloat(match[8] / 3600)));
            } else if ((match = query.match(/^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/))) {
                center = L.latLng((/N/i.test(match[4]) ? 1 : -1) * (parseFloat(match[1]) + parseFloat(match[2] / 60 + parseFloat(match[3] / 3600))), (/E/i.test(match[8]) ? 1 : -1) * (parseFloat(match[5]) + parseFloat(match[6] / 60) + parseFloat(match[7] / 3600)));
            } else if ((match = query.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/))) {
                center = L.latLng(parseFloat(match[1]), parseFloat(match[2]));
            }
            if (center) {
                var results = [{
                    name: query,
                    center: center,
                    bbox: center.toBounds(this.options.sizeInMeters)
                }];
                cb.call(context, results);
            } else if (this.options.next) {
                this.options.next.geocode(query, cb, context);
            }
        }
    });

    function latLng(options) {
        return new LatLng(options);
    }
    var Mapbox = L.Class.extend({
        options: {
            serviceUrl: 'https://api.mapbox.com/geocoding/v5/mapbox.places/',
            geocodingQueryParams: {},
            reverseQueryParams: {}
        },
        initialize: function (accessToken, options) {
            L.setOptions(this, options);
            this.options.geocodingQueryParams.access_token = accessToken;
            this.options.reverseQueryParams.access_token = accessToken;
        },
        geocode: function (query, cb, context) {
            var params = this.options.geocodingQueryParams;
            if (typeof params.proximity !== 'undefined' && params.proximity.hasOwnProperty('lat') && params.proximity.hasOwnProperty('lng')) {
                params.proximity = params.proximity.lng + ',' + params.proximity.lat;
            }
            getJSON(this.options.serviceUrl + encodeURIComponent(query) + '.json', params, function (data) {
                var results = [],
                    loc, latLng, latLngBounds;
                if (data.features && data.features.length) {
                    for (var i = 0; i <= data.features.length - 1; i++) {
                        loc = data.features[i];
                        latLng = L.latLng(loc.center.reverse());
                        if (loc.hasOwnProperty('bbox')) {
                            latLngBounds = L.latLngBounds(L.latLng(loc.bbox.slice(0, 2).reverse()), L.latLng(loc.bbox.slice(2, 4).reverse()));
                        } else {
                            latLngBounds = L.latLngBounds(latLng, latLng);
                        }
                        var properties = {
                            text: loc.text,
                            address: loc.address
                        };
                        for (var j = 0; j < loc.context.length; j++) {
                            var id = loc.context[j].id.split('.')[0];
                            properties[id] = loc.context[j].text;
                        }
                        results[i] = {
                            name: loc.place_name,
                            bbox: latLngBounds,
                            center: latLng,
                            properties: properties
                        };
                    }
                }
                cb.call(context, results);
            });
        },
        suggest: function (query, cb, context) {
            return this.geocode(query, cb, context);
        },
        reverse: function (location, scale, cb, context) {
            getJSON(this.options.serviceUrl +
                encodeURIComponent(location.lng) + ',' +
                encodeURIComponent(location.lat) + '.json', this.options.reverseQueryParams,
                function (data) {
                    var results = [],
                        loc, latLng, latLngBounds;
                    if (data.features && data.features.length) {
                        for (var i = 0; i <= data.features.length - 1; i++) {
                            loc = data.features[i];
                            latLng = L.latLng(loc.center.reverse());
                            if (loc.hasOwnProperty('bbox')) {
                                latLngBounds = L.latLngBounds(L.latLng(loc.bbox.slice(0, 2).reverse()), L.latLng(loc.bbox.slice(2, 4).reverse()));
                            } else {
                                latLngBounds = L.latLngBounds(latLng, latLng);
                            }
                            results[i] = {
                                name: loc.place_name,
                                bbox: latLngBounds,
                                center: latLng
                            };
                        }
                    }
                    cb.call(context, results);
                });
        }
    });

    function mapbox(accessToken, options) {
        return new Mapbox(accessToken, options);
    }
    var MapQuest = L.Class.extend({
        options: {
            serviceUrl: 'https://www.mapquestapi.com/geocoding/v1'
        },
        initialize: function (key, options) {
            this._key = decodeURIComponent(key);
            L.Util.setOptions(this, options);
        },
        _formatName: function () {
            var r = [],
                i;
            for (i = 0; i < arguments.length; i++) {
                if (arguments[i]) {
                    r.push(arguments[i]);
                }
            }
            return r.join(', ');
        },
        geocode: function (query, cb, context) {
            getJSON(this.options.serviceUrl + '/address', {
                key: this._key,
                location: query,
                limit: 5,
                outFormat: 'json'
            }, L.bind(function (data) {
                var results = [],
                    loc, latLng;
                if (data.results && data.results[0].locations) {
                    for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
                        loc = data.results[0].locations[i];
                        latLng = L.latLng(loc.latLng);
                        results[i] = {
                            name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
                            bbox: L.latLngBounds(latLng, latLng),
                            center: latLng
                        };
                    }
                }
                cb.call(context, results);
            }, this));
        },
        reverse: function (location, scale, cb, context) {
            getJSON(this.options.serviceUrl + '/reverse', {
                key: this._key,
                location: location.lat + ',' + location.lng,
                outputFormat: 'json'
            }, L.bind(function (data) {
                var results = [],
                    loc, latLng;
                if (data.results && data.results[0].locations) {
                    for (var i = data.results[0].locations.length - 1; i >= 0; i--) {
                        loc = data.results[0].locations[i];
                        latLng = L.latLng(loc.latLng);
                        results[i] = {
                            name: this._formatName(loc.street, loc.adminArea4, loc.adminArea3, loc.adminArea1),
                            bbox: L.latLngBounds(latLng, latLng),
                            center: latLng
                        };
                    }
                }
                cb.call(context, results);
            }, this));
        }
    });

    function mapQuest(key, options) {
        return new MapQuest(key, options);
    }
    var Neutrino = L.Class.extend({
        options: {
            userId: '<insert your userId here>',
            apiKey: '<insert your apiKey here>',
            serviceUrl: 'https://neutrinoapi.com/'
        },
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },
        geocode: function (query, cb, context) {
            getJSON(this.options.serviceUrl + 'geocode-address', {
                apiKey: this.options.apiKey,
                userId: this.options.userId,
                address: query.split(/\s+/).join('.')
            }, function (data) {
                var results = [],
                    latLng, latLngBounds;
                if (data.hasOwnProperty('locations')) {
                    data.geometry = data.locations[0];
                    latLng = L.latLng(data.geometry['latitude'], data.geometry['longitude']);
                    latLngBounds = L.latLngBounds(latLng, latLng);
                    results[0] = {
                        name: data.geometry.address,
                        bbox: latLngBounds,
                        center: latLng
                    };
                }
                cb.call(context, results);
            });
        },
        suggest: function (query, cb, context) {
            return this.geocode(query, cb, context);
        },
        reverse: function (location, scale, cb, context) {
            getJSON(this.options.serviceUrl + 'geocode-reverse', {
                apiKey: this.options.apiKey,
                userId: this.options.userId,
                latitude: location.lat,
                longitude: location.lng
            }, function (data) {
                var results = [],
                    latLng, latLngBounds;
                if (data.status.status == 200 && data.found) {
                    latLng = L.latLng(location.lat, location.lng);
                    latLngBounds = L.latLngBounds(latLng, latLng);
                    results[0] = {
                        name: data.address,
                        bbox: latLngBounds,
                        center: latLng
                    };
                }
                cb.call(context, results);
            });
        }
    });

    function neutrino(accessToken) {
        return new Neutrino(accessToken);
    }
    var Nominatim = L.Class.extend({
        options: {
            serviceUrl: 'https://nominatim.openstreetmap.org/',
            geocodingQueryParams: {},
            reverseQueryParams: {},
            htmlTemplate: function (r) {
                var a = r.address,
                    parts = [];
                if (a.road || a.building) {
                    parts.push('{building} {road} {house_number}');
                }
                if (a.city || a.town || a.village || a.hamlet) {
                    parts.push('<span class="' +
                        (parts.length > 0 ? 'leaflet-control-geocoder-address-detail' : '') + '">{postcode} {city} {town} {village} {hamlet}</span>');
                }
                if (a.state || a.country) {
                    parts.push('<span class="' +
                        (parts.length > 0 ? 'leaflet-control-geocoder-address-context' : '') + '">{state} {country}</span>');
                }
                return template(parts.join('<br/>'), a, true);
            }
        },
        initialize: function (options) {
            L.Util.setOptions(this, options);
        },
        geocode: function (query, cb, context) {
            getJSON(this.options.serviceUrl + 'search', L.extend({
                q: query,
                limit: 5,
                format: 'json',
                addressdetails: 1
            }, this.options.geocodingQueryParams), L.bind(function (data) {
                var results = [];
                for (var i = data.length - 1; i >= 0; i--) {
                    var bbox = data[i].boundingbox;
                    for (var j = 0; j < 4; j++) bbox[j] = parseFloat(bbox[j]);
                    results[i] = {
                        icon: data[i].icon,
                        name: data[i].display_name,
                        html: this.options.htmlTemplate ? this.options.htmlTemplate(data[i]) : undefined,
                        bbox: L.latLngBounds([bbox[0], bbox[2]], [bbox[1], bbox[3]]),
                        center: L.latLng(data[i].lat, data[i].lon),
                        properties: data[i]
                    };
                }
                cb.call(context, results);
            }, this));
        },
        reverse: function (location, scale, cb, context) {
            getJSON(this.options.serviceUrl + 'reverse', L.extend({
                lat: location.lat,
                lon: location.lng,
                zoom: Math.round(Math.log(scale / 256) / Math.log(2)),
                addressdetails: 1,
                format: 'json'
            }, this.options.reverseQueryParams), L.bind(function (data) {
                var result = [],
                    loc;
                if (data && data.lat && data.lon) {
                    loc = L.latLng(data.lat, data.lon);
                    result.push({
                        name: data.display_name,
                        html: this.options.htmlTemplate ? this.options.htmlTemplate(data) : undefined,
                        center: loc,
                        bounds: L.latLngBounds(loc, loc),
                        properties: data
                    });
                }
                cb.call(context, result);
            }, this));
        }
    });

    function nominatim(options) {
        return new Nominatim(options);
    }
    var OpenLocationCode = L.Class.extend({
        options: {
            OpenLocationCode: undefined,
            codeLength: undefined
        },
        initialize: function (options) {
            L.setOptions(this, options);
        },
        geocode: function (query, cb, context) {
            try {
                var decoded = this.options.OpenLocationCode.decode(query);
                var result = {
                    name: query,
                    center: L.latLng(decoded.latitudeCenter, decoded.longitudeCenter),
                    bbox: L.latLngBounds(L.latLng(decoded.latitudeLo, decoded.longitudeLo), L.latLng(decoded.latitudeHi, decoded.longitudeHi))
                };
                cb.call(context, [result]);
            } catch (e) {
                console.warn(e);
                cb.call(context, []);
            }
        },
        reverse: function (location, scale, cb, context) {
            try {
                var code = this.options.OpenLocationCode.encode(location.lat, location.lng, this.options.codeLength);
                var result = {
                    name: code,
                    center: L.latLng(location.lat, location.lng),
                    bbox: L.latLngBounds(L.latLng(location.lat, location.lng), L.latLng(location.lat, location.lng))
                };
                cb.call(context, [result]);
            } catch (e) {
                console.warn(e);
                cb.call(context, []);
            }
        }
    });

    function openLocationCode(options) {
        return new OpenLocationCode(options);
    }
    var Pelias = L.Class.extend({
        options: {
            serviceUrl: 'https://api.geocode.earth/v1',
            geocodingQueryParams: {},
            reverseQueryParams: {}
        },
        initialize: function (apiKey, options) {
            L.Util.setOptions(this, options);
            this._apiKey = apiKey;
            this._lastSuggest = 0;
        },
        geocode: function (query, cb, context) {
            var _this = this;
            getJSON(this.options.serviceUrl + '/search', L.extend({
                api_key: this._apiKey,
                text: query
            }, this.options.geocodingQueryParams), function (data) {
                cb.call(context, _this._parseResults(data, 'bbox'));
            });
        },
        suggest: function (query, cb, context) {
            var _this = this;
            getJSON(this.options.serviceUrl + '/autocomplete', L.extend({
                api_key: this._apiKey,
                text: query
            }, this.options.geocodingQueryParams), L.bind(function (data) {
                if (data.geocoding.timestamp > this._lastSuggest) {
                    this._lastSuggest = data.geocoding.timestamp;
                    cb.call(context, _this._parseResults(data, 'bbox'));
                }
            }, this));
        },
        reverse: function (location, scale, cb, context) {
            var _this = this;
            getJSON(this.options.serviceUrl + '/reverse', L.extend({
                api_key: this._apiKey,
                'point.lat': location.lat,
                'point.lon': location.lng
            }, this.options.reverseQueryParams), function (data) {
                cb.call(context, _this._parseResults(data, 'bounds'));
            });
        },
        _parseResults: function (data, bboxname) {
            var results = [];
            L.geoJson(data, {
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng);
                },
                onEachFeature: function (feature, layer) {
                    var result = {},
                        bbox, center;
                    if (layer.getBounds) {
                        bbox = layer.getBounds();
                        center = bbox.getCenter();
                    } else if (layer.feature.bbox) {
                        center = layer.getLatLng();
                        bbox = L.latLngBounds(L.GeoJSON.coordsToLatLng(layer.feature.bbox.slice(0, 2)), L.GeoJSON.coordsToLatLng(layer.feature.bbox.slice(2, 4)));
                    } else {
                        center = layer.getLatLng();
                        bbox = L.latLngBounds(center, center);
                    }
                    result.name = layer.feature.properties.label;
                    result.center = center;
                    result[bboxname] = bbox;
                    result.properties = layer.feature.properties;
                    results.push(result);
                }
            });
            return results;
        }
    });

    function pelias(apiKey, options) {
        return new Pelias(apiKey, options);
    }
    var GeocodeEarth = Pelias;
    var geocodeEarth = pelias;
    var Mapzen = Pelias;
    var mapzen = pelias;
    var Openrouteservice = Mapzen.extend({
        options: {
            serviceUrl: 'https://api.openrouteservice.org/geocode'
        }
    });

    function openrouteservice(apiKey, options) {
        return new Openrouteservice(apiKey, options);
    }
    var Photon = L.Class.extend({
        options: {
            serviceUrl: 'https://photon.komoot.de/api/',
            reverseUrl: 'https://photon.komoot.de/reverse/',
            nameProperties: ['name', 'street', 'suburb', 'hamlet', 'town', 'city', 'state', 'country']
        },
        initialize: function (options) {
            L.setOptions(this, options);
        },
        geocode: function (query, cb, context) {
            var params = L.extend({
                q: query
            }, this.options.geocodingQueryParams);
            getJSON(this.options.serviceUrl, params, L.bind(function (data) {
                cb.call(context, this._decodeFeatures(data));
            }, this));
        },
        suggest: function (query, cb, context) {
            return this.geocode(query, cb, context);
        },
        reverse: function (latLng, scale, cb, context) {
            var params = L.extend({
                lat: latLng.lat,
                lon: latLng.lng
            }, this.options.reverseQueryParams);
            getJSON(this.options.reverseUrl, params, L.bind(function (data) {
                cb.call(context, this._decodeFeatures(data));
            }, this));
        },
        _decodeFeatures: function (data) {
            var results = [],
                i, f, c, latLng, extent, bbox;
            if (data && data.features) {
                for (i = 0; i < data.features.length; i++) {
                    f = data.features[i];
                    c = f.geometry.coordinates;
                    latLng = L.latLng(c[1], c[0]);
                    extent = f.properties.extent;
                    if (extent) {
                        bbox = L.latLngBounds([extent[1], extent[0]], [extent[3], extent[2]]);
                    } else {
                        bbox = L.latLngBounds(latLng, latLng);
                    }
                    results.push({
                        name: this._decodeFeatureName(f),
                        html: this.options.htmlTemplate ? this.options.htmlTemplate(f) : undefined,
                        center: latLng,
                        bbox: bbox,
                        properties: f.properties
                    });
                }
            }
            return results;
        },
        _decodeFeatureName: function (f) {
            return (this.options.nameProperties || []).map(function (p) {
                return f.properties[p];
            }).filter(function (v) {
                return !!v;
            }).join(', ');
        }
    });

    function photon(options) {
        return new Photon(options);
    }
    var What3Words = L.Class.extend({
        options: {
            serviceUrl: 'https://api.what3words.com/v2/'
        },
        initialize: function (accessToken) {
            this._accessToken = accessToken;
        },
        geocode: function (query, cb, context) {
            getJSON(this.options.serviceUrl + 'forward', {
                key: this._accessToken,
                addr: query.split(/\s+/).join('.')
            }, function (data) {
                var results = [],
                    latLng, latLngBounds;
                if (data.hasOwnProperty('geometry')) {
                    latLng = L.latLng(data.geometry['lat'], data.geometry['lng']);
                    latLngBounds = L.latLngBounds(latLng, latLng);
                    results[0] = {
                        name: data.words,
                        bbox: latLngBounds,
                        center: latLng
                    };
                }
                cb.call(context, results);
            });
        },
        suggest: function (query, cb, context) {
            return this.geocode(query, cb, context);
        },
        reverse: function (location, scale, cb, context) {
            getJSON(this.options.serviceUrl + 'reverse', {
                key: this._accessToken,
                coords: [location.lat, location.lng].join(',')
            }, function (data) {
                var results = [],
                    latLng, latLngBounds;
                if (data.status.status == 200) {
                    latLng = L.latLng(data.geometry['lat'], data.geometry['lng']);
                    latLngBounds = L.latLngBounds(latLng, latLng);
                    results[0] = {
                        name: data.words,
                        bbox: latLngBounds,
                        center: latLng
                    };
                }
                cb.call(context, results);
            });
        }
    });

    function what3words(accessToken) {
        return new What3Words(accessToken);
    }
    var geocoders = Object.freeze({
        ArcGis: ArcGis,
        arcgis: arcgis,
        Bing: Bing,
        bing: bing,
        Google: Google,
        google: google,
        HERE: HERE,
        here: here,
        LatLng: LatLng,
        latLng: latLng,
        Mapbox: Mapbox,
        mapbox: mapbox,
        MapQuest: MapQuest,
        mapQuest: mapQuest,
        Neutrino: Neutrino,
        neutrino: neutrino,
        Nominatim: Nominatim,
        nominatim: nominatim,
        OpenLocationCode: OpenLocationCode,
        openLocationCode: openLocationCode,
        Pelias: Pelias,
        pelias: pelias,
        GeocodeEarth: GeocodeEarth,
        geocodeEarth: geocodeEarth,
        Mapzen: Mapzen,
        mapzen: mapzen,
        Openrouteservice: Openrouteservice,
        openrouteservice: openrouteservice,
        Photon: Photon,
        photon: photon,
        What3Words: What3Words,
        what3words: what3words
    });
    var Geocoder = L.Control.extend({
        options: {
            showResultIcons: false,
            collapsed: true,
            expand: 'touch',
            position: 'topright',
            placeholder: 'Search...',
            errorMessage: 'Nothing found.',
            queryMinLength: 1,
            suggestMinLength: 3,
            suggestTimeout: 250,
            defaultMarkGeocode: true
        },
        includes: L.Evented.prototype || L.Mixin.Events,
        initialize: function (options) {
            L.Util.setOptions(this, options);
            if (!this.options.geocoder) {
                this.options.geocoder = new Nominatim();
            }
            this._requestCount = 0;
        },
        addThrobberClass: function () {
            L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-throbber');
        },
        removeThrobberClass: function () {
            L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-throbber');
        },
        onAdd: function (map) {
            var className = 'leaflet-control-geocoder',
                container = L.DomUtil.create('div', className + ' leaflet-bar'),
                icon = L.DomUtil.create('button', className + '-icon', container),
                form = (this._form = L.DomUtil.create('div', className + '-form', container)),
                input;
            this._map = map;
            this._container = container;
            icon.innerHTML = '&nbsp;';
            icon.type = 'button';
            input = this._input = L.DomUtil.create('input', '', form);
            input.type = 'text';
            input.placeholder = this.options.placeholder;
            L.DomEvent.disableClickPropagation(input);
            this._errorElement = L.DomUtil.create('div', className + '-form-no-error', container);
            this._errorElement.innerHTML = this.options.errorMessage;
            this._alts = L.DomUtil.create('ul', className + '-alternatives leaflet-control-geocoder-alternatives-minimized', container);
            L.DomEvent.disableClickPropagation(this._alts);
            L.DomEvent.addListener(input, 'keydown', this._keydown, this);
            if (this.options.geocoder.suggest) {
                L.DomEvent.addListener(input, 'input', this._change, this);
            }
            L.DomEvent.addListener(input, 'blur', function () {
                if (this.options.collapsed && !this._preventBlurCollapse) {
                    this._collapse();
                }
                this._preventBlurCollapse = false;
            }, this);
            if (this.options.collapsed) {
                if (this.options.expand === 'click') {
                    L.DomEvent.addListener(container, 'click', function (e) {
                        if (e.button === 0 && e.detail !== 2) {
                            this._toggle();
                        }
                    }, this);
                } else if (L.Browser.touch && this.options.expand === 'touch') {
                    L.DomEvent.addListener(container, 'touchstart mousedown', function (e) {
                        this._toggle();
                        e.preventDefault();
                        e.stopPropagation();
                    }, this);
                } else {
                    L.DomEvent.addListener(container, 'mouseover', this._expand, this);
                    L.DomEvent.addListener(container, 'mouseout', this._collapse, this);
                    this._map.on('movestart', this._collapse, this);
                }
            } else {
                this._expand();
                if (L.Browser.touch) {
                    L.DomEvent.addListener(container, 'touchstart', function () {
                        this._geocode();
                    }, this);
                } else {
                    L.DomEvent.addListener(container, 'click', function () {
                        this._geocode();
                    }, this);
                }
            }
            if (this.options.defaultMarkGeocode) {
                this.on('markgeocode', this.markGeocode, this);
            }
            this.on('startgeocode', this.addThrobberClass, this);
            this.on('finishgeocode', this.removeThrobberClass, this);
            this.on('startsuggest', this.addThrobberClass, this);
            this.on('finishsuggest', this.removeThrobberClass, this);
            L.DomEvent.disableClickPropagation(container);
            return container;
        },
        _geocodeResult: function (results, suggest) {
            if (!suggest && results.length === 1) {
                this._geocodeResultSelected(results[0]);
            } else if (results.length > 0) {
                this._alts.innerHTML = '';
                this._results = results;
                L.DomUtil.removeClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
                L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-options-open');
                for (var i = 0; i < results.length; i++) {
                    this._alts.appendChild(this._createAlt(results[i], i));
                }
            } else {
                L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-options-error');
                L.DomUtil.addClass(this._errorElement, 'leaflet-control-geocoder-error');
            }
        },
        markGeocode: function (result) {
            result = result.geocode || result;
            this._map.fitBounds(result.bbox);
            if (this._geocodeMarker) {
                this._map.removeLayer(this._geocodeMarker);
            }
            this._geocodeMarker = new L.Marker(result.center).bindPopup(result.html || result.name).addTo(this._map).openPopup();
            return this;
        },
        _geocode: function (suggest) {
            var value = this._input.value;
            if (!suggest && value.length < this.options.queryMinLength) {
                return;
            }
            var requestCount = ++this._requestCount,
                mode = suggest ? 'suggest' : 'geocode',
                eventData = {
                    input: value
                };
            this._lastGeocode = value;
            if (!suggest) {
                this._clearResults();
            }
            this.fire('start' + mode, eventData);
            this.options.geocoder[mode](value, function (results) {
                if (requestCount === this._requestCount) {
                    eventData.results = results;
                    this.fire('finish' + mode, eventData);
                    this._geocodeResult(results, suggest);
                }
            }, this);
        },
        _geocodeResultSelected: function (result) {
            this.fire('markgeocode', {
                geocode: result
            });
        },
        _toggle: function () {
            if (L.DomUtil.hasClass(this._container, 'leaflet-control-geocoder-expanded')) {
                this._collapse();
            } else {
                this._expand();
            }
        },
        _expand: function () {
            L.DomUtil.addClass(this._container, 'leaflet-control-geocoder-expanded');
            this._input.select();
            this.fire('expand');
        },
        _collapse: function () {
            L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-expanded');
            L.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
            L.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
            L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-open');
            L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-error');
            this._input.blur();
            this.fire('collapse');
        },
        _clearResults: function () {
            L.DomUtil.addClass(this._alts, 'leaflet-control-geocoder-alternatives-minimized');
            this._selection = null;
            L.DomUtil.removeClass(this._errorElement, 'leaflet-control-geocoder-error');
            L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-open');
            L.DomUtil.removeClass(this._container, 'leaflet-control-geocoder-options-error');
        },
        _createAlt: function (result, index) {
            var li = L.DomUtil.create('li', ''),
                a = L.DomUtil.create('a', '', li),
                icon = this.options.showResultIcons && result.icon ? L.DomUtil.create('img', '', a) : null,
                text = result.html ? undefined : document.createTextNode(result.name),
                mouseDownHandler = function mouseDownHandler(e) {
                    this._preventBlurCollapse = true;
                    L.DomEvent.stop(e);
                    this._geocodeResultSelected(result);
                    L.DomEvent.on(li, 'click', function () {
                        if (this.options.collapsed) {
                            this._collapse();
                        } else {
                            this._clearResults();
                        }
                    }, this);
                };
            if (icon) {
                icon.src = result.icon;
            }
            li.setAttribute('data-result-index', index);
            if (result.html) {
                a.innerHTML = a.innerHTML + result.html;
            } else {
                a.appendChild(text);
            }
            L.DomEvent.addListener(li, 'mousedown touchstart', mouseDownHandler, this);
            return li;
        },
        _keydown: function (e) {
            var _this = this,
                select = function select(dir) {
                    if (_this._selection) {
                        L.DomUtil.removeClass(_this._selection, 'leaflet-control-geocoder-selected');
                        _this._selection = _this._selection[dir > 0 ? 'nextSibling' : 'previousSibling'];
                    }
                    if (!_this._selection) {
                        _this._selection = _this._alts[dir > 0 ? 'firstChild' : 'lastChild'];
                    }
                    if (_this._selection) {
                        L.DomUtil.addClass(_this._selection, 'leaflet-control-geocoder-selected');
                    }
                };
            switch (e.keyCode) {
                case 27:
                    if (this.options.collapsed) {
                        this._collapse();
                    } else {
                        this._clearResults();
                    }
                    break;
                case 38:
                    select(-1);
                    break;
                case 40:
                    select(1);
                    break;
                case 13:
                    if (this._selection) {
                        var index = parseInt(this._selection.getAttribute('data-result-index'), 10);
                        this._geocodeResultSelected(this._results[index]);
                        this._clearResults();
                    } else {
                        this._geocode();
                    }
                    break;
                default:
                    return;
            }
            L.DomEvent.preventDefault(e);
        },
        _change: function () {
            var v = this._input.value;
            if (v !== this._lastGeocode) {
                clearTimeout(this._suggestTimeout);
                if (v.length >= this.options.suggestMinLength) {
                    this._suggestTimeout = setTimeout(L.bind(function () {
                        this._geocode(true);
                    }, this), this.options.suggestTimeout);
                } else {
                    this._clearResults();
                }
            }
        }
    });

    function geocoder(options) {
        return new Geocoder(options);
    }
    L.Util.extend(Geocoder, geocoders);
    L.Util.extend(L.Control, {
        Geocoder: Geocoder,
        geocoder: geocoder
    });
    return Geocoder;
}(L));;
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("leaflet")) : "function" == typeof define && define.amd ? define(["exports", "leaflet"], e) : e((t.L = t.L || {}, t.L.esri = {}), t.L)
}(this, function (t, e) {
    "use strict";
    var i = window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest,
        s = "" === document.documentElement.style.pointerEvents,
        r = {
            cors: i,
            pointerEvents: s
        },
        n = {
            attributionWidthOffset: 55
        },
        o = 0;

    function a(t) {
        var e = "";
        for (var i in t.f = t.f || "json", t)
            if (t.hasOwnProperty(i)) {
                var s, r = t[i],
                    n = Object.prototype.toString.call(r);
                e.length && (e += "&"), s = "[object Array]" === n ? "[object Object]" === Object.prototype.toString.call(r[0]) ? JSON.stringify(r) : r.join(",") : "[object Object]" === n ? JSON.stringify(r) : "[object Date]" === n ? r.valueOf() : r, e += encodeURIComponent(i) + "=" + encodeURIComponent(s)
            } return e
    }

    function u(t, i) {
        var s = new window.XMLHttpRequest;
        return s.onerror = function (r) {
            s.onreadystatechange = e.Util.falseFn, t.call(i, {
                error: {
                    code: 500,
                    message: "XMLHttpRequest error"
                }
            }, null)
        }, s.onreadystatechange = function () {
            var r, n;
            if (4 === s.readyState) {
                try {
                    r = JSON.parse(s.responseText)
                } catch (t) {
                    r = null, n = {
                        code: 500,
                        message: "Could not parse response as JSON. This could also be caused by a CORS or XMLHttpRequest error."
                    }
                } !n && r.error && (n = r.error, r = null), s.onerror = e.Util.falseFn, t.call(i, n, r)
            }
        }, s.ontimeout = function () {
            this.onerror()
        }, s
    }

    function l(t, e, i, s) {
        var r = u(i, s);
        return r.open("POST.html", t), void 0 !== s && null !== s && void 0 !== s.options && (r.timeout = s.options.timeout), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"), r.send(a(e)), r
    }

    function h(t, e, i, s) {
        var r = u(i, s);
        return r.open("GET.html", t + "?" + a(e), !0), void 0 !== s && null !== s && void 0 !== s.options && (r.timeout = s.options.timeout), r.send(null), r
    }

    function c(t, e, i, s) {
        var n = a(e),
            o = u(i, s),
            l = (t + "?" + n).length;
        if (l <= 2e3 && r.cors ? o.open("GET.html", t + "?" + n) : l > 2e3 && r.cors && (o.open("POST.html", t), o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8")), void 0 !== s && null !== s && void 0 !== s.options && (o.timeout = s.options.timeout), l <= 2e3 && r.cors) o.send(null);
        else {
            if (!(l > 2e3 && r.cors)) return l <= 2e3 && !r.cors ? p(t, e, i, s) : void M("a request to " + t + " was longer then 2000 characters and this browser cannot make a cross-domain post request. Please use a proxy http://esri.github.io/esri-leaflet/api-reference/request.html");
            o.send(n)
        }
        return o
    }

    function p(t, i, s, r) {
        window._EsriLeafletCallbacks = window._EsriLeafletCallbacks || {};
        var n = "c" + o;
        i.callback = "window._EsriLeafletCallbacks." + n, window._EsriLeafletCallbacks[n] = function (t) {
            if (!0 !== window._EsriLeafletCallbacks[n]) {
                var e, i = Object.prototype.toString.call(t);
                "[object Object]" !== i && "[object Array]" !== i && (e = {
                    error: {
                        code: 500,
                        message: "Expected array or object as JSONP response"
                    }
                }, t = null), !e && t.error && (e = t, t = null), s.call(r, e, t), window._EsriLeafletCallbacks[n] = !0
            }
        };
        var u = e.DomUtil.create("script", null, document.body);
        return u.type = "text/javascript", u.src = t + "?" + a(i), u.id = n, u.onerror = function (t) {
            if (t && !0 !== window._EsriLeafletCallbacks[n]) {
                s.call(r, {
                    error: {
                        code: 500,
                        message: "An unknown error occurred"
                    }
                }), window._EsriLeafletCallbacks[n] = !0
            }
        }, e.DomUtil.addClass(u, "esri-leaflet-jsonp"), o++, {
            id: n,
            url: u.src,
            abort: function () {
                window._EsriLeafletCallbacks._callback[n]({
                    code: 0,
                    message: "Request aborted."
                })
            }
        }
    }
    var d = r.cors ? h : p;
    d.CORS = h, d.JSONP = p;
    var m = {
        request: c,
        get: d,
        post: l
    };

    function f(t) {
        return function (t, e) {
            for (var i = 0; i < t.length; i++)
                if (t[i] !== e[i]) return !1;
            return !0
        }(t[0], t[t.length - 1]) || t.push(t[0]), t
    }

    function y(t) {
        for (var e, i = 0, s = 0, r = t.length, n = t[s]; s < r - 1; s++) i += ((e = t[s + 1])[0] - n[0]) * (e[1] + n[1]), n = e;
        return i >= 0
    }

    function g(t, e, i, s) {
        var r = (s[0] - i[0]) * (t[1] - i[1]) - (s[1] - i[1]) * (t[0] - i[0]),
            n = (e[0] - t[0]) * (t[1] - i[1]) - (e[1] - t[1]) * (t[0] - i[0]),
            o = (s[1] - i[1]) * (e[0] - t[0]) - (s[0] - i[0]) * (e[1] - t[1]);
        if (0 !== o) {
            var a = r / o,
                u = n / o;
            if (a >= 0 && a <= 1 && u >= 0 && u <= 1) return !0
        }
        return !1
    }

    function _(t, e) {
        for (var i = 0; i < t.length - 1; i++)
            for (var s = 0; s < e.length - 1; s++)
                if (g(t[i], t[i + 1], e[s], e[s + 1])) return !0;
        return !1
    }

    function v(t, e) {
        var i = _(t, e),
            s = function (t, e) {
                for (var i = !1, s = -1, r = t.length, n = r - 1; ++s < r; n = s)(t[s][1] <= e[1] && e[1] < t[n][1] || t[n][1] <= e[1] && e[1] < t[s][1]) && e[0] < (t[n][0] - t[s][0]) * (e[1] - t[s][1]) / (t[n][1] - t[s][1]) + t[s][0] && (i = !i);
                return i
            }(t, e[0]);
        return !(i || !s)
    }

    function b(t) {
        var e = [],
            i = t.slice(0),
            s = f(i.shift().slice(0));
        if (s.length >= 4) {
            y(s) || s.reverse(), e.push(s);
            for (var r = 0; r < i.length; r++) {
                var n = f(i[r].slice(0));
                n.length >= 4 && (y(n) && n.reverse(), e.push(n))
            }
        }
        return e
    }

    function x(t) {
        var e = {};
        for (var i in t) t.hasOwnProperty(i) && (e[i] = t[i]);
        return e
    }

    function S(t, e) {
        var i = {};
        if (t.features) {
            i.type = "FeatureCollection", i.features = [];
            for (var s = 0; s < t.features.length; s++) i.features.push(S(t.features[s], e))
        }
        if ("number" == typeof t.x && "number" == typeof t.y && (i.type = "Point", i.coordinates = [t.x, t.y], "number" == typeof t.z && i.coordinates.push(t.z)), t.points && (i.type = "MultiPoint", i.coordinates = t.points.slice(0)), t.paths && (1 === t.paths.length ? (i.type = "LineString", i.coordinates = t.paths[0].slice(0)) : (i.type = "MultiLineString", i.coordinates = t.paths.slice(0))), t.rings && (i = function (t) {
            for (var e, i, s = [], r = [], n = 0; n < t.length; n++) {
                var o = f(t[n].slice(0));
                if (!(o.length < 4))
                    if (y(o)) {
                        var a = [o.slice().reverse()];
                        s.push(a)
                    } else r.push(o.slice().reverse())
            }
            for (var u = []; r.length;) {
                i = r.pop();
                var l = !1;
                for (e = s.length - 1; e >= 0; e--)
                    if (v(s[e][0], i)) {
                        s[e].push(i), l = !0;
                        break
                    } l || u.push(i)
            }
            for (; u.length;) {
                i = u.pop();
                var h = !1;
                for (e = s.length - 1; e >= 0; e--)
                    if (_(s[e][0], i)) {
                        s[e].push(i), h = !0;
                        break
                    } h || s.push([i.reverse()])
            }
            return 1 === s.length ? {
                type: "Polygon",
                coordinates: s[0]
            } : {
                    type: "MultiPolygon",
                    coordinates: s
                }
        }(t.rings.slice(0))), "number" == typeof t.xmin && "number" == typeof t.ymin && "number" == typeof t.xmax && "number" == typeof t.ymax && (i.type = "Polygon", i.coordinates = [
            [
                [t.xmax, t.ymax],
                [t.xmin, t.ymax],
                [t.xmin, t.ymin],
                [t.xmax, t.ymin],
                [t.xmax, t.ymax]
            ]
        ]), (t.geometry || t.attributes) && (i.type = "Feature", i.geometry = t.geometry ? S(t.geometry) : null, i.properties = t.attributes ? x(t.attributes) : null, t.attributes)) try {
            i.id = function (t, e) {
                for (var i = e ? [e, "OBJECTID", "FID"] : ["OBJECTID", "FID"], s = 0; s < i.length; s++) {
                    var r = i[s];
                    if (r in t && ("string" == typeof t[r] || "number" == typeof t[r])) return t[r]
                }
                throw Error("No valid id attribute found")
            }(t.attributes, e)
        } catch (t) { }
        return JSON.stringify(i.geometry) === JSON.stringify({}) && (i.geometry = null), t.spatialReference && t.spatialReference.wkid && 4326 !== t.spatialReference.wkid && console.warn("Object converted in non-standard crs - " + JSON.stringify(t.spatialReference)), i
    }

    function L(t, e) {
        e = e || "OBJECTID";
        var i, s = {
            wkid: 4326
        },
            r = {};
        switch (t.type) {
            case "Point":
                r.x = t.coordinates[0], r.y = t.coordinates[1], r.spatialReference = s;
                break;
            case "MultiPoint":
                r.points = t.coordinates.slice(0), r.spatialReference = s;
                break;
            case "LineString":
                r.paths = [t.coordinates.slice(0)], r.spatialReference = s;
                break;
            case "MultiLineString":
                r.paths = t.coordinates.slice(0), r.spatialReference = s;
                break;
            case "Polygon":
                r.rings = b(t.coordinates.slice(0)), r.spatialReference = s;
                break;
            case "MultiPolygon":
                r.rings = function (t) {
                    for (var e = [], i = 0; i < t.length; i++)
                        for (var s = b(t[i]), r = s.length - 1; r >= 0; r--) {
                            var n = s[r].slice(0);
                            e.push(n)
                        }
                    return e
                }(t.coordinates.slice(0)), r.spatialReference = s;
                break;
            case "Feature":
                t.geometry && (r.geometry = L(t.geometry, e)), r.attributes = t.properties ? x(t.properties) : {}, t.id && (r.attributes[e] = t.id);
                break;
            case "FeatureCollection":
                for (r = [], i = 0; i < t.features.length; i++) r.push(L(t.features[i], e));
                break;
            case "GeometryCollection":
                for (r = [], i = 0; i < t.geometries.length; i++) r.push(L(t.geometries[i], e))
        }
        return r
    }

    function I(t, e) {
        return L(t, e)
    }

    function A(t, e) {
        return S(t, e)
    }

    function T(t) {
        if ("NaN" !== t.xmin && "NaN" !== t.ymin && "NaN" !== t.xmax && "NaN" !== t.ymax) {
            var i = e.latLng(t.ymin, t.xmin),
                s = e.latLng(t.ymax, t.xmax);
            return e.latLngBounds(i, s)
        }
        return null
    }

    function w(t) {
        return {
            xmin: (t = e.latLngBounds(t)).getSouthWest().lng,
            ymin: t.getSouthWest().lat,
            xmax: t.getNorthEast().lng,
            ymax: t.getNorthEast().lat,
            spatialReference: {
                wkid: 4326
            }
        }
    }
    var R = /^(OBJECTID|FID|OID|ID)$/i;

    function O(t) {
        var e;
        if (t.objectIdFieldName) e = t.objectIdFieldName;
        else if (t.fields) {
            for (var i = 0; i <= t.fields.length - 1; i++)
                if ("esriFieldTypeOID" === t.fields[i].type) {
                    e = t.fields[i].name;
                    break
                } if (!e)
                for (i = 0; i <= t.fields.length - 1; i++)
                    if (t.fields[i].name.match(R)) {
                        e = t.fields[i].name;
                        break
                    }
        }
        return e
    }

    function P(t) {
        for (var e in t.attributes)
            if (e.match(R)) return e
    }

    function C(t, e) {
        var i, s = t.features || t.results,
            r = s.length;
        i = e || O(t);
        var n = {
            type: "FeatureCollection",
            features: []
        };
        if (r)
            for (var o = s.length - 1; o >= 0; o--) {
                var a = A(s[o], i || P(s[o]));
                n.features.push(a)
            }
        return n
    }

    function F(t) {
        return "/" !== (t = e.Util.trim(t))[t.length - 1] && (t += "https://www.demoapus-wp1.com/"), t
    }

    function k(t) {
        if (-1 !== t.url.indexOf("?")) {
            t.requestParams = t.requestParams || {};
            var e = t.url.substring(t.url.indexOf("?") + 1);
            t.url = t.url.split("?")[0], t.requestParams = JSON.parse('{"' + decodeURI(e).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        }
        return t.url = F(t.url.split("?")[0]), t
    }

    function U(t) {
        return /^(?!.*utility\.arcgis\.com).*\.arcgis\.com.*FeatureServer/i.test(t)
    }

    function G(t) {
        var e;
        switch (t) {
            case "Point":
                e = "esriGeometryPoint";
                break;
            case "MultiPoint":
                e = "esriGeometryMultipoint";
                break;
            case "LineString":
            case "MultiLineString":
                e = "esriGeometryPolyline";
                break;
            case "Polygon":
            case "MultiPolygon":
                e = "esriGeometryPolygon"
        }
        return e
    }

    function M() {
        console && console.warn && console.warn.apply(console, arguments)
    }

    function q(t) {
        return t.getSize().x - n.attributionWidthOffset + "px"
    }

    function D(t) {
        if (t.attributionControl && !t.attributionControl._esriAttributionAdded) {
            t.attributionControl.setPrefix('<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | Powered by <a href="https://www.esri.com/">Esri</a>');
            var i = document.createElement("style");
            i.type = "text/css", i.innerHTML = ".esri-truncated-attribution:hover {white-space: normal;}", document.getElementsByTagName("head")[0].appendChild(i), e.DomUtil.addClass(t.attributionControl._container, "esri-truncated-attribution:hover");
            var s = document.createElement("style");
            s.type = "text/css", s.innerHTML = ".esri-truncated-attribution {vertical-align: -3px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;transition: 0s white-space;transition-delay: 1s;max-width: " + q(t) + ";}", document.getElementsByTagName("head")[0].appendChild(s), e.DomUtil.addClass(t.attributionControl._container, "esri-truncated-attribution"), t.on("resize", function (e) {
                t.attributionControl._container.style.maxWidth = q(e.target)
            }), t.attributionControl._esriAttributionAdded = !0
        }
    }

    function E(t) {
        var i = {
            geometry: null,
            geometryType: null
        };
        return t instanceof e.LatLngBounds ? (i.geometry = w(t), i.geometryType = "esriGeometryEnvelope", i) : (t.getLatLng && (t = t.getLatLng()), t instanceof e.LatLng && (t = {
            type: "Point",
            coordinates: [t.lng, t.lat]
        }), t instanceof e.GeoJSON && (t = t.getLayers()[0].feature.geometry, i.geometry = I(t), i.geometryType = G(t.type)), t.toGeoJSON && (t = t.toGeoJSON()), "Feature" === t.type && (t = t.geometry), "Point" === t.type || "LineString" === t.type || "Polygon" === t.type || "MultiPolygon" === t.type ? (i.geometry = I(t), i.geometryType = G(t.type), i) : void M("invalid geometry passed to spatial query. Should be L.LatLng, L.LatLngBounds, L.Marker or a GeoJSON Point, Line, Polygon or MultiPolygon object"))
    }

    function B(t, i) {
        r.cors && c(t, {}, e.Util.bind(function (t, s) {
            if (!t) {
                i._esriAttributions = [];
                for (var r = 0; r < s.contributors.length; r++)
                    for (var n = s.contributors[r], o = 0; o < n.coverageAreas.length; o++) {
                        var a = n.coverageAreas[o],
                            u = e.latLng(a.bbox[0], a.bbox[1]),
                            l = e.latLng(a.bbox[2], a.bbox[3]);
                        i._esriAttributions.push({
                            attribution: n.attribution,
                            score: a.score,
                            bounds: e.latLngBounds(u, l),
                            minZoom: a.zoomMin,
                            maxZoom: a.zoomMax
                        })
                    }
                i._esriAttributions.sort(function (t, e) {
                    return e.score - t.score
                }), z({
                    target: i
                })
            }
        }, this))
    }

    function z(t) {
        var i = t.target,
            s = i._esriAttributions;
        if (i && i.attributionControl) {
            var r = i.attributionControl._container.querySelector(".esri-dynamic-attribution");
            if (r && s) {
                for (var n = "", o = i.getBounds(), a = e.latLngBounds(o.getSouthWest().wrap(), o.getNorthEast().wrap()), u = i.getZoom(), l = 0; l < s.length; l++) {
                    var h = s[l],
                        c = h.attribution;
                    !n.match(c) && h.bounds.intersects(a) && u >= h.minZoom && u <= h.maxZoom && (n += ", " + c)
                }
                n = n.substr(2), r.innerHTML = n, r.style.maxWidth = q(i), i.fire("attributionupdated", {
                    attribution: n
                })
            }
        }
    }
    var N = {
        warn: M,
        cleanUrl: F,
        getUrlParams: k,
        isArcgisOnline: U,
        geojsonTypeToArcGIS: G,
        responseToFeatureCollection: C,
        geojsonToArcGIS: I,
        arcgisToGeoJSON: A,
        boundsToExtent: w,
        extentToBounds: T,
        calcAttributionWidth: q,
        setEsriAttribution: D,
        _setGeometry: E,
        _getAttributionData: B,
        _updateMapAttribution: z,
        _findIdAttributeFromFeature: P,
        _findIdAttributeFromResponse: O
    },
        Z = e.Class.extend({
            options: {
                proxy: !1,
                useCors: i
            },
            generateSetter: function (t, i) {
                return e.Util.bind(function (e) {
                    return this.params[t] = e, this
                }, i)
            },
            initialize: function (t) {
                if (t.request && t.options ? (this._service = t, e.Util.setOptions(this, t.options)) : (e.Util.setOptions(this, t), this.options.url = F(t.url)), this.params = e.Util.extend({}, this.params || {}), this.setters)
                    for (var i in this.setters) {
                        var s = this.setters[i];
                        this[i] = this.generateSetter(s, this)
                    }
            },
            token: function (t) {
                return this._service ? this._service.authenticate(t) : this.params.token = t, this
            },
            format: function (t) {
                return this.params.returnUnformattedValues = !t, this
            },
            request: function (t, i) {
                return this.options.requestParams && e.Util.extend(this.params, this.options.requestParams), this._service ? this._service.request(this.path, this.params, t, i) : this._request("request", this.path, this.params, t, i)
            },
            _request: function (t, e, i, s, r) {
                var n = this.options.proxy ? this.options.proxy + "?" + this.options.url + e : this.options.url + e;
                return "get" !== t && "request" !== t || this.options.useCors ? m[t](n, i, s, r) : m.get.JSONP(n, i, s, r)
            }
        });
    var j = Z.extend({
        setters: {
            offset: "resultOffset",
            limit: "resultRecordCount",
            fields: "outFields",
            precision: "geometryPrecision",
            featureIds: "objectIds",
            returnGeometry: "returnGeometry",
            returnM: "returnM",
            transform: "datumTransformation",
            token: "token"
        },
        path: "query",
        params: {
            returnGeometry: !0,
            where: "1=1",
            outSr: 4326,
            outFields: "*"
        },
        within: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelContains", this
        },
        intersects: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelIntersects", this
        },
        contains: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelWithin", this
        },
        crosses: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelCrosses", this
        },
        touches: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelTouches", this
        },
        overlaps: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelOverlaps", this
        },
        bboxIntersects: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelEnvelopeIntersects", this
        },
        indexIntersects: function (t) {
            return this._setGeometryParams(t), this.params.spatialRel = "esriSpatialRelIndexIntersects", this
        },
        nearby: function (t, i) {
            return t = e.latLng(t), this.params.geometry = [t.lng, t.lat], this.params.geometryType = "esriGeometryPoint", this.params.spatialRel = "esriSpatialRelIntersects", this.params.units = "esriSRUnit_Meter", this.params.distance = i, this.params.inSr = 4326, this
        },
        where: function (t) {
            return this.params.where = t, this
        },
        between: function (t, e) {
            return this.params.time = [t.valueOf(), e.valueOf()], this
        },
        simplify: function (t, e) {
            var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
            return this.params.maxAllowableOffset = i / t.getSize().y * e, this
        },
        orderBy: function (t, e) {
            return e = e || "ASC", this.params.orderByFields = this.params.orderByFields ? this.params.orderByFields + "," : "", this.params.orderByFields += [t, e].join(" "), this
        },
        run: function (t, e) {
            return this._cleanParams(), this.options.isModern || U(this.options.url) ? (this.params.f = "geojson", this.request(function (i, s) {
                this._trapSQLerrors(i), t.call(e, i, s, s)
            }, this)) : this.request(function (i, s) {
                this._trapSQLerrors(i), t.call(e, i, s && C(s), s)
            }, this)
        },
        count: function (t, e) {
            return this._cleanParams(), this.params.returnCountOnly = !0, this.request(function (e, i) {
                t.call(this, e, i && i.count, i)
            }, e)
        },
        ids: function (t, e) {
            return this._cleanParams(), this.params.returnIdsOnly = !0, this.request(function (e, i) {
                t.call(this, e, i && i.objectIds, i)
            }, e)
        },
        bounds: function (t, e) {
            return this._cleanParams(), this.params.returnExtentOnly = !0, this.request(function (i, s) {
                s && s.extent && T(s.extent) ? t.call(e, i, T(s.extent), s) : (i = {
                    message: "Invalid Bounds"
                }, t.call(e, i, null, s))
            }, e)
        },
        distinct: function () {
            return this.params.returnGeometry = !1, this.params.returnDistinctValues = !0, this
        },
        pixelSize: function (t) {
            var i = e.point(t);
            return this.params.pixelSize = [i.x, i.y], this
        },
        layer: function (t) {
            return this.path = t + "/query", this
        },
        _trapSQLerrors: function (t) {
            t && "400" === t.code && M("one common syntax error in query requests is encasing string values in double quotes instead of single quotes")
        },
        _cleanParams: function () {
            delete this.params.returnIdsOnly, delete this.params.returnExtentOnly, delete this.params.returnCountOnly
        },
        _setGeometryParams: function (t) {
            this.params.inSr = 4326;
            var e = E(t);
            this.params.geometry = e.geometry, this.params.geometryType = e.geometryType
        }
    });

    function W(t) {
        return new j(t)
    }
    var J = Z.extend({
        setters: {
            contains: "contains",
            text: "searchText",
            fields: "searchFields",
            spatialReference: "sr",
            sr: "sr",
            layers: "layers",
            returnGeometry: "returnGeometry",
            maxAllowableOffset: "maxAllowableOffset",
            precision: "geometryPrecision",
            dynamicLayers: "dynamicLayers",
            returnZ: "returnZ",
            returnM: "returnM",
            gdbVersion: "gdbVersion",
            token: "token"
        },
        path: "find",
        params: {
            sr: 4326,
            contains: !0,
            returnGeometry: !0,
            returnZ: !0,
            returnM: !1
        },
        layerDefs: function (t, e) {
            return this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ";" : "", this.params.layerDefs += [t, e].join(":"), this
        },
        simplify: function (t, e) {
            var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
            return this.params.maxAllowableOffset = i / t.getSize().y * e, this
        },
        run: function (t, e) {
            return this.request(function (i, s) {
                t.call(e, i, s && C(s), s)
            }, e)
        }
    });

    function Q(t) {
        return new J(t)
    }
    var V = Z.extend({
        path: "identify",
        between: function (t, e) {
            return this.params.time = [t.valueOf(), e.valueOf()], this
        }
    });
    var H = V.extend({
        setters: {
            layers: "layers",
            precision: "geometryPrecision",
            tolerance: "tolerance",
            returnGeometry: "returnGeometry"
        },
        params: {
            sr: 4326,
            layers: "all",
            tolerance: 3,
            returnGeometry: !0
        },
        on: function (t) {
            var e = w(t.getBounds()),
                i = t.getSize();
            return this.params.imageDisplay = [i.x, i.y, 96], this.params.mapExtent = [e.xmin, e.ymin, e.xmax, e.ymax], this
        },
        at: function (t) {
            return 2 === t.length && (t = e.latLng(t)), this._setGeometryParams(t), this
        },
        layerDef: function (t, e) {
            return this.params.layerDefs = this.params.layerDefs ? this.params.layerDefs + ";" : "", this.params.layerDefs += [t, e].join(":"), this
        },
        simplify: function (t, e) {
            var i = Math.abs(t.getBounds().getWest() - t.getBounds().getEast());
            return this.params.maxAllowableOffset = i / t.getSize().y * e, this
        },
        run: function (t, e) {
            return this.request(function (i, s) {
                if (i) t.call(e, i, void 0, s);
                else {
                    var r = C(s);
                    s.results = s.results.reverse();
                    for (var n = 0; n < r.features.length; n++) {
                        r.features[n].layerId = s.results[n].layerId
                    }
                    t.call(e, void 0, r, s)
                }
            })
        },
        _setGeometryParams: function (t) {
            var e = E(t);
            this.params.geometry = e.geometry, this.params.geometryType = e.geometryType
        }
    });

    function K(t) {
        return new H(t)
    }
    var X = V.extend({
        setters: {
            setMosaicRule: "mosaicRule",
            setRenderingRule: "renderingRule",
            setPixelSize: "pixelSize",
            returnCatalogItems: "returnCatalogItems",
            returnGeometry: "returnGeometry"
        },
        params: {
            returnGeometry: !1
        },
        at: function (t) {
            return t = e.latLng(t), this.params.geometry = JSON.stringify({
                x: t.lng,
                y: t.lat,
                spatialReference: {
                    wkid: 4326
                }
            }), this.params.geometryType = "esriGeometryPoint", this
        },
        getMosaicRule: function () {
            return this.params.mosaicRule
        },
        getRenderingRule: function () {
            return this.params.renderingRule
        },
        getPixelSize: function () {
            return this.params.pixelSize
        },
        run: function (t, e) {
            return this.request(function (i, s) {
                t.call(e, i, s && this._responseToGeoJSON(s), s)
            }, this)
        },
        _responseToGeoJSON: function (t) {
            var e = t.location,
                i = t.catalogItems,
                s = t.catalogItemVisibilities,
                r = {
                    pixel: {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [e.x, e.y]
                        },
                        crs: {
                            type: "EPSG",
                            properties: {
                                code: e.spatialReference.wkid
                            }
                        },
                        properties: {
                            OBJECTID: t.objectId,
                            name: t.name,
                            value: t.value
                        },
                        id: t.objectId
                    }
                };
            if (t.properties && t.properties.Values && (r.pixel.properties.values = t.properties.Values), i && i.features && (r.catalogItems = C(i), s && s.length === r.catalogItems.features.length))
                for (var n = s.length - 1; n >= 0; n--) r.catalogItems.features[n].properties.catalogItemVisibility = s[n];
            return r
        }
    });

    function $(t) {
        return new X(t)
    }
    var Y = e.Evented.extend({
        options: {
            proxy: !1,
            useCors: i,
            timeout: 0
        },
        initialize: function (t) {
            t = t || {}, this._requestQueue = [], this._authenticating = !1, e.Util.setOptions(this, t), this.options.url = F(this.options.url)
        },
        get: function (t, e, i, s) {
            return this._request("get", t, e, i, s)
        },
        post: function (t, e, i, s) {
            return this._request("post", t, e, i, s)
        },
        request: function (t, e, i, s) {
            return this._request("request", t, e, i, s)
        },
        metadata: function (t, e) {
            return this._request("get", "", {}, t, e)
        },
        authenticate: function (t) {
            return this._authenticating = !1, this.options.token = t, this._runQueue(), this
        },
        getTimeout: function () {
            return this.options.timeout
        },
        setTimeout: function (t) {
            this.options.timeout = t
        },
        _request: function (t, i, s, r, n) {
            this.fire("requeststart", {
                url: this.options.url + i,
                params: s,
                method: t
            }, !0);
            var o = this._createServiceCallback(t, i, s, r, n);
            if (this.options.token && (s.token = this.options.token), this.options.requestParams && e.Util.extend(s, this.options.requestParams), !this._authenticating) {
                var a = this.options.proxy ? this.options.proxy + "?" + this.options.url + i : this.options.url + i;
                return "get" !== t && "request" !== t || this.options.useCors ? m[t](a, s, o, n) : m.get.JSONP(a, s, o, n)
            }
            this._requestQueue.push([t, i, s, r, n])
        },
        _createServiceCallback: function (t, i, s, r, n) {
            return e.Util.bind(function (o, a) {
                !o || 499 !== o.code && 498 !== o.code || (this._authenticating = !0, this._requestQueue.push([t, i, s, r, n]), this.fire("authenticationrequired", {
                    authenticate: e.Util.bind(this.authenticate, this)
                }, !0), o.authenticate = e.Util.bind(this.authenticate, this)), r.call(n, o, a), o ? this.fire("requesterror", {
                    url: this.options.url + i,
                    params: s,
                    message: o.message,
                    code: o.code,
                    method: t
                }, !0) : this.fire("requestsuccess", {
                    url: this.options.url + i,
                    params: s,
                    response: a,
                    method: t
                }, !0), this.fire("requestend", {
                    url: this.options.url + i,
                    params: s,
                    method: t
                }, !0)
            }, this)
        },
        _runQueue: function () {
            for (var t = this._requestQueue.length - 1; t >= 0; t--) {
                var e = this._requestQueue[t];
                this[e.shift()].apply(this, e)
            }
            this._requestQueue = []
        }
    });
    var tt = Y.extend({
        identify: function () {
            return K(this)
        },
        find: function () {
            return Q(this)
        },
        query: function () {
            return W(this)
        }
    });

    function et(t) {
        return new tt(t)
    }
    var it = Y.extend({
        query: function () {
            return W(this)
        },
        identify: function () {
            return $(this)
        }
    });

    function st(t) {
        return new it(t)
    }
    var rt = Y.extend({
        options: {
            idAttribute: "OBJECTID"
        },
        query: function () {
            return W(this)
        },
        addFeature: function (t, e, i) {
            this.addFeatures(t, e, i)
        },
        addFeatures: function (t, e, i) {
            for (var s = t.features ? t.features : [t], r = s.length - 1; r >= 0; r--) delete s[r].id;
            return t = I(t), t = s.length > 1 ? t : [t], this.post("addFeatures", {
                features: t
            }, function (t, s) {
                var r = s && s.addResults ? s.addResults.length > 1 ? s.addResults : s.addResults[0] : void 0;
                e && e.call(i, t || s.addResults[0].error, r)
            }, i)
        },
        updateFeature: function (t, e, i) {
            this.updateFeatures(t, e, i)
        },
        updateFeatures: function (t, e, i) {
            var s = t.features ? t.features : [t];
            return t = I(t, this.options.idAttribute), t = s.length > 1 ? t : [t], this.post("updateFeatures", {
                features: t
            }, function (t, s) {
                var r = s && s.updateResults ? s.updateResults.length > 1 ? s.updateResults : s.updateResults[0] : void 0;
                e && e.call(i, t || s.updateResults[0].error, r)
            }, i)
        },
        deleteFeature: function (t, e, i) {
            this.deleteFeatures(t, e, i)
        },
        deleteFeatures: function (t, e, i) {
            return this.post("deleteFeatures", {
                objectIds: t
            }, function (t, s) {
                var r = s && s.deleteResults ? s.deleteResults.length > 1 ? s.deleteResults : s.deleteResults[0] : void 0;
                e && e.call(i, t || s.deleteResults[0].error, r)
            }, i)
        }
    });

    function nt(t) {
        return new rt(t)
    }
    var ot = "https:" !== window.location.protocol ? "http:" : "https:",
        at = e.TileLayer.extend({
            statics: {
                TILES: {
                    Streets: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            attribution: "USGS, NOAA",
                            attributionUrl: "https://static.arcgis.com/attribution/World_Street_Map"
                        }
                    },
                    Topographic: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            attribution: "USGS, NOAA",
                            attributionUrl: "https://static.arcgis.com/attribution/World_Topo_Map"
                        }
                    },
                    Oceans: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            attribution: "USGS, NOAA",
                            attributionUrl: "https://static.arcgis.com/attribution/Ocean_Basemap"
                        }
                    },
                    OceansLabels: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            pane: s ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    NationalGeographic: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            attribution: "National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp."
                        }
                    },
                    DarkGray: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            attribution: "HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors"
                        }
                    },
                    DarkGrayLabels: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            pane: s ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    Gray: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            attribution: "HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors"
                        }
                    },
                    GrayLabels: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 16,
                            subdomains: ["server", "services"],
                            pane: s ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    Imagery: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            attribution: "DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community",
                            attributionUrl: "https://static.arcgis.com/attribution/World_Imagery"
                        }
                    },
                    ImageryLabels: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            pane: s ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    ImageryTransportation: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            subdomains: ["server", "services"],
                            pane: s ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    ShadedRelief: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 13,
                            subdomains: ["server", "services"],
                            attribution: "USGS"
                        }
                    },
                    ShadedReliefLabels: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 12,
                            subdomains: ["server", "services"],
                            pane: s ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    Terrain: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 13,
                            subdomains: ["server", "services"],
                            attribution: "USGS, NOAA"
                        }
                    },
                    TerrainLabels: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 13,
                            subdomains: ["server", "services"],
                            pane: s ? "esri-labels" : "tilePane",
                            attribution: ""
                        }
                    },
                    USATopo: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 15,
                            subdomains: ["server", "services"],
                            attribution: "USGS, National Geographic Society, i-cubed"
                        }
                    },
                    ImageryClarity: {
                        urlTemplate: ot + "//clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            attribution: "Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community"
                        }
                    },
                    Physical: {
                        urlTemplate: ot + "//{s}.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 8,
                            subdomains: ["server", "services"],
                            attribution: "U.S. National Park Service"
                        }
                    },
                    ImageryFirefly: {
                        urlTemplate: ot + "//fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}",
                        options: {
                            minZoom: 1,
                            maxZoom: 19,
                            attribution: "Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community",
                            attributionUrl: "https://static.arcgis.com/attribution/World_Imagery"
                        }
                    }
                }
            },
            initialize: function (t, i) {
                var s;
                if ("object" == typeof t && t.urlTemplate && t.options) s = t;
                else {
                    if ("string" != typeof t || !at.TILES[t]) throw new Error('L.esri.BasemapLayer: Invalid parameter. Use one of "Streets", "Topographic", "Oceans", "OceansLabels", "NationalGeographic", "Physical", "Gray", "GrayLabels", "DarkGray", "DarkGrayLabels", "Imagery", "ImageryLabels", "ImageryTransportation", "ImageryClarity", "ImageryFirefly", ShadedRelief", "ShadedReliefLabels", "Terrain", "TerrainLabels" or "USATopo"');
                    s = at.TILES[t]
                }
                var r = e.Util.extend(s.options, i);
                e.Util.setOptions(this, r), this.options.token && -1 === s.urlTemplate.indexOf("token=") && (s.urlTemplate += "?token=" + this.options.token), this.options.proxy && (s.urlTemplate = this.options.proxy + "?" + s.urlTemplate), e.TileLayer.prototype.initialize.call(this, s.urlTemplate, r)
            },
            onAdd: function (t) {
                D(t), "esri-labels" === this.options.pane && this._initPane(), this.options.attributionUrl && B((this.options.proxy ? this.options.proxy + "?" : "") + this.options.attributionUrl, t), t.on("moveend", z), e.TileLayer.prototype.onAdd.call(this, t)
            },
            onRemove: function (t) {
                t.off("moveend", z), e.TileLayer.prototype.onRemove.call(this, t)
            },
            _initPane: function () {
                if (!this._map.getPane(this.options.pane)) {
                    var t = this._map.createPane(this.options.pane);
                    t.style.pointerEvents = "none", t.style.zIndex = 500
                }
            },
            getAttribution: function () {
                if (this.options.attribution) var t = '<span class="esri-dynamic-attribution">' + this.options.attribution + "</span>";
                return t
            }
        });
    var ut = e.TileLayer.extend({
        options: {
            zoomOffsetAllowance: .1,
            errorTileUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAA1BMVEUzNDVszlHHAAAAAXRSTlMAQObYZgAAAAlwSFlzAAAAAAAAAAAB6mUWpAAAADZJREFUeJztwQEBAAAAgiD/r25IQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7waBAAABw08RwAAAAABJRU5ErkJggg=="
        },
        statics: {
            MercatorZoomLevels: {
                0: 156543.033928,
                1: 78271.5169639999,
                2: 39135.7584820001,
                3: 19567.8792409999,
                4: 9783.93962049996,
                5: 4891.96981024998,
                6: 2445.98490512499,
                7: 1222.99245256249,
                8: 611.49622628138,
                9: 305.748113140558,
                10: 152.874056570411,
                11: 76.4370282850732,
                12: 38.2185141425366,
                13: 19.1092570712683,
                14: 9.55462853563415,
                15: 4.77731426794937,
                16: 2.38865713397468,
                17: 1.19432856685505,
                18: .597164283559817,
                19: .298582141647617,
                20: .14929107082381,
                21: .07464553541191,
                22: .0373227677059525,
                23: .0186613838529763
            }
        },
        initialize: function (t) {
            t = k(t = e.Util.setOptions(this, t)), this.tileUrl = (t.proxy ? t.proxy + "?" : "") + t.url + "tile/{z}/{y}/{x}" + (t.requestParams && Object.keys(t.requestParams).length > 0 ? e.Util.getParamString(t.requestParams) : ""), -1 !== t.url.indexOf("{s}") && t.subdomains && (t.url = t.url.replace("{s}", t.subdomains[0])), this.service = et(t), this.service.addEventParent(this), new RegExp(/tiles.arcgis(online)?\.com/g).test(t.url) && (this.tileUrl = this.tileUrl.replace("://tiles", "://tiles{s}"), t.subdomains = ["1", "2", "3", "4"]), this.options.token && (this.tileUrl += "?token=" + this.options.token), e.TileLayer.prototype.initialize.call(this, this.tileUrl, t)
        },
        getTileUrl: function (t) {
            var i = this._getZoomForUrl();
            return e.Util.template(this.tileUrl, e.Util.extend({
                s: this._getSubdomain(t),
                x: t.x,
                y: t.y,
                z: this._lodMap && this._lodMap[i] ? this._lodMap[i] : i
            }, this.options))
        },
        createTile: function (t, i) {
            var s = document.createElement("img");
            return e.DomEvent.on(s, "load", e.Util.bind(this._tileOnLoad, this, i, s)), e.DomEvent.on(s, "error", e.Util.bind(this._tileOnError, this, i, s)), this.options.crossOrigin && (s.crossOrigin = ""), s.alt = "", !this._lodMap || this._lodMap && this._lodMap[this._getZoomForUrl()] ? s.src = this.getTileUrl(t) : this.once("lodmap", function () {
                s.src = this.getTileUrl(t)
            }, this), s
        },
        onAdd: function (t) {
            D(t), this._lodMap || this.metadata(function (i, s) {
                if (!i && s.spatialReference) {
                    var r = s.spatialReference.latestWkid || s.spatialReference.wkid;
                    if (!this.options.attribution && t.attributionControl && s.copyrightText && (this.options.attribution = s.copyrightText, t.attributionControl.addAttribution(this.getAttribution())), t.options.crs !== e.CRS.EPSG3857 || 102100 !== r && 3857 !== r) t.options.crs && t.options.crs.code && t.options.crs.code.indexOf(r) > -1 || M("L.esri.TiledMapLayer%20is%20using%20a%20non-mercator%20sp/esri.github.io/esri-leaflet/examples/non-mercator-projection.html");
                    else {
                        this._lodMap = {};
                        for (var n = s.tileInfo.lods, o = ut.MercatorZoomLevels, a = 0; a < n.length; a++) {
                            var u = n[a];
                            for (var l in o) {
                                var h = o[l];
                                if (this._withinPercentage(u.resolution, h, this.options.zoomOffsetAllowance)) {
                                    this._lodMap[l] = u.level;
                                    break
                                }
                            }
                        }
                        this.fire("lodmap")
                    }
                }
            }, this), e.TileLayer.prototype.onAdd.call(this, t)
        },
        metadata: function (t, e) {
            return this.service.metadata(t, e), this
        },
        identify: function () {
            return this.service.identify()
        },
        find: function () {
            return this.service.find()
        },
        query: function () {
            return this.service.query()
        },
        authenticate: function (t) {
            var e = "?token=" + t;
            return this.tileUrl = this.options.token ? this.tileUrl.replace(/\?token=(.+)/g, e) : this.tileUrl + e, this.options.token = t, this.service.authenticate(t), this
        },
        _withinPercentage: function (t, e, i) {
            return Math.abs(t / e - 1) < i
        }
    });
    var lt = e.ImageOverlay.extend({
        onAdd: function (t) {
            this._topLeft = t.getPixelBounds().min, e.ImageOverlay.prototype.onAdd.call(this, t)
        },
        _reset: function () {
            this._map.options.crs === e.CRS.EPSG3857 ? e.ImageOverlay.prototype._reset.call(this) : e.DomUtil.setPosition(this._image, this._topLeft.subtract(this._map.getPixelOrigin()))
        }
    }),
        ht = e.Layer.extend({
            options: {
                opacity: 1,
                position: "front",
                f: "image",
                useCors: i,
                attribution: null,
                interactive: !1,
                alt: ""
            },
            onAdd: function (t) {
                D(t), this.options.zIndex && (this.options.position = null), this._update = e.Util.throttle(this._update, this.options.updateInterval, this), t.on("moveend", this._update, this), this._currentImage && this._currentImage._bounds.equals(this._map.getBounds()) ? t.addLayer(this._currentImage) : this._currentImage && (this._map.removeLayer(this._currentImage), this._currentImage = null), this._update(), this._popup && (this._map.on("click", this._getPopupData, this), this._map.on("dblclick", this._resetPopupState, this)), this.metadata(function (e, i) {
                    !e && !this.options.attribution && t.attributionControl && i.copyrightText && (this.options.attribution = i.copyrightText, t.attributionControl.addAttribution(this.getAttribution()))
                }, this)
            },
            onRemove: function (t) {
                this._currentImage && this._map.removeLayer(this._currentImage), this._popup && (this._map.off("click", this._getPopupData, this), this._map.off("dblclick", this._resetPopupState, this)), this._map.off("moveend", this._update, this)
            },
            bindPopup: function (t, i) {
                return this._shouldRenderPopup = !1, this._lastClick = !1, this._popup = e.popup(i), this._popupFunction = t, this._map && (this._map.on("click", this._getPopupData, this), this._map.on("dblclick", this._resetPopupState, this)), this
            },
            unbindPopup: function () {
                return this._map && (this._map.closePopup(this._popup), this._map.off("click", this._getPopupData, this), this._map.off("dblclick", this._resetPopupState, this)), this._popup = !1, this
            },
            bringToFront: function () {
                return this.options.position = "front", this._currentImage && (this._currentImage.bringToFront(), this._setAutoZIndex(Math.max)), this
            },
            bringToBack: function () {
                return this.options.position = "back", this._currentImage && (this._currentImage.bringToBack(), this._setAutoZIndex(Math.min)), this
            },
            setZIndex: function (t) {
                return this.options.zIndex = t, this._currentImage && this._currentImage.setZIndex(t), this
            },
            _setAutoZIndex: function (t) {
                if (this._currentImage) {
                    for (var e, i = this._currentImage.getPane().children, s = -t(-1 / 0, 1 / 0), r = 0, n = i.length; r < n; r++) e = i[r].style.zIndex, i[r] !== this._currentImage._image && e && (s = t(s, +e));
                    isFinite(s) && (this.options.zIndex = s + t(-1, 1), this.setZIndex(this.options.zIndex))
                }
            },
            getAttribution: function () {
                return this.options.attribution
            },
            getOpacity: function () {
                return this.options.opacity
            },
            setOpacity: function (t) {
                return this.options.opacity = t, this._currentImage && this._currentImage.setOpacity(t), this
            },
            getTimeRange: function () {
                return [this.options.from, this.options.to]
            },
            setTimeRange: function (t, e) {
                return this.options.from = t, this.options.to = e, this._update(), this
            },
            metadata: function (t, e) {
                return this.service.metadata(t, e), this
            },
            authenticate: function (t) {
                return this.service.authenticate(t), this
            },
            redraw: function () {
                this._update()
            },
            _renderImage: function (t, e, i) {
                if (this._map) {
                    if (i && (t = "data:" + i + ";base64," + t), !t) return;
                    var s = new lt(t, e, {
                        opacity: 0,
                        crossOrigin: this.options.useCors,
                        alt: this.options.alt,
                        pane: this.options.pane || this.getPane(),
                        interactive: this.options.interactive
                    }).addTo(this._map),
                        r = function (t) {
                            if (s.off("error", r, this), this._map) {
                                var i = t.target,
                                    n = this._currentImage;
                                i._bounds.equals(e) && i._bounds.equals(this._map.getBounds()) ? (this._currentImage = i, "front" === this.options.position ? this.bringToFront() : "back" === this.options.position && this.bringToBack(), this.options.zIndex && this.setZIndex(this.options.zIndex), this._map && this._currentImage._map ? this._currentImage.setOpacity(this.options.opacity) : this._currentImage._map.removeLayer(this._currentImage), n && this._map && this._map.removeLayer(n), n && n._map && n._map.removeLayer(n)) : this._map.removeLayer(i)
                            }
                            this.fire("load", {
                                bounds: e
                            })
                        };
                    s.once("error", function () {
                        this._map.removeLayer(s), this.fire("error"), s.off("load", r, this)
                    }, this), s.once("load", r, this), this.fire("loading", {
                        bounds: e
                    })
                }
            },
            _update: function () {
                if (this._map) {
                    var t = this._map.getZoom(),
                        i = this._map.getBounds();
                    if (!(this._animatingZoom || this._map._panTransition && this._map._panTransition._inProgress))
                        if (t > this.options.maxZoom || t < this.options.minZoom) this._currentImage && (this._currentImage._map.removeLayer(this._currentImage), this._currentImage = null);
                        else {
                            var s = this._buildExportParams();
                            e.Util.extend(s, this.options.requestParams), s ? this._requestExport(s, i) : this._currentImage && (this._currentImage._map.removeLayer(this._currentImage), this._currentImage = null)
                        }
                }
            },
            _renderPopup: function (t, i, s, r) {
                if (t = e.latLng(t), this._shouldRenderPopup && this._lastClick.equals(t)) {
                    var n = this._popupFunction(i, s, r);
                    n && this._popup.setLatLng(t).setContent(n).openOn(this._map)
                }
            },
            _resetPopupState: function (t) {
                this._shouldRenderPopup = !1, this._lastClick = t.latlng
            },
            _calculateBbox: function () {
                var t = this._map.getPixelBounds(),
                    i = this._map.unproject(t.getBottomLeft()),
                    s = this._map.unproject(t.getTopRight()),
                    r = this._map.options.crs.project(s),
                    n = this._map.options.crs.project(i),
                    o = e.bounds(r, n);
                return [o.getBottomLeft().x, o.getBottomLeft().y, o.getTopRight().x, o.getTopRight().y].join(",")
            },
            _calculateImageSize: function () {
                var t = this._map.getPixelBounds(),
                    e = this._map.getSize(),
                    i = this._map.unproject(t.getBottomLeft()),
                    s = this._map.unproject(t.getTopRight()),
                    r = this._map.latLngToLayerPoint(s).y,
                    n = this._map.latLngToLayerPoint(i).y;
                return (r > 0 || n < e.y) && (e.y = n - r), e.x + "," + e.y
            }
        }),
        ct = ht.extend({
            options: {
                updateInterval: 150,
                format: "jpgpng",
                transparent: !0,
                f: "image"
            },
            query: function () {
                return this.service.query()
            },
            identify: function () {
                return this.service.identify()
            },
            initialize: function (t) {
                t = k(t), this.service = st(t), this.service.addEventParent(this), e.Util.setOptions(this, t)
            },
            setPixelType: function (t) {
                return this.options.pixelType = t, this._update(), this
            },
            getPixelType: function () {
                return this.options.pixelType
            },
            setBandIds: function (t) {
                return e.Util.isArray(t) ? this.options.bandIds = t.join(",") : this.options.bandIds = t.toString(), this._update(), this
            },
            getBandIds: function () {
                return this.options.bandIds
            },
            setNoData: function (t, i) {
                return e.Util.isArray(t) ? this.options.noData = t.join(",") : this.options.noData = t.toString(), i && (this.options.noDataInterpretation = i), this._update(), this
            },
            getNoData: function () {
                return this.options.noData
            },
            getNoDataInterpretation: function () {
                return this.options.noDataInterpretation
            },
            setRenderingRule: function (t) {
                this.options.renderingRule = t, this._update()
            },
            getRenderingRule: function () {
                return this.options.renderingRule
            },
            setMosaicRule: function (t) {
                this.options.mosaicRule = t, this._update()
            },
            getMosaicRule: function () {
                return this.options.mosaicRule
            },
            _getPopupData: function (t) {
                var i = e.Util.bind(function (i, s, r) {
                    i || setTimeout(e.Util.bind(function () {
                        this._renderPopup(t.latlng, i, s, r)
                    }, this), 300)
                }, this),
                    s = this.identify().at(t.latlng);
                this.options.mosaicRule && s.setMosaicRule(this.options.mosaicRule), s.run(i), this._shouldRenderPopup = !0, this._lastClick = t.latlng
            },
            _buildExportParams: function () {
                var t = parseInt(this._map.options.crs.code.split(":")[1], 10),
                    e = {
                        bbox: this._calculateBbox(),
                        size: this._calculateImageSize(),
                        format: this.options.format,
                        transparent: this.options.transparent,
                        bboxSR: t,
                        imageSR: t
                    };
                return this.options.from && this.options.to && (e.time = this.options.from.valueOf() + "," + this.options.to.valueOf()), this.options.pixelType && (e.pixelType = this.options.pixelType), this.options.interpolation && (e.interpolation = this.options.interpolation), this.options.compressionQuality && (e.compressionQuality = this.options.compressionQuality), this.options.bandIds && (e.bandIds = this.options.bandIds), (0 === this.options.noData || this.options.noData) && (e.noData = this.options.noData), this.options.noDataInterpretation && (e.noDataInterpretation = this.options.noDataInterpretation), this.service.options.token && (e.token = this.service.options.token), this.options.renderingRule && (e.renderingRule = JSON.stringify(this.options.renderingRule)), this.options.mosaicRule && (e.mosaicRule = JSON.stringify(this.options.mosaicRule)), e
            },
            _requestExport: function (t, i) {
                "json" === this.options.f ? this.service.request("exportImage", t, function (t, e) {
                    t || (this.options.token && (e.href += "?token=" + this.options.token), this.options.proxy && (e.href = this.options.proxy + "?" + e.href), this._renderImage(e.href, i))
                }, this) : (t.f = "image", this._renderImage(this.options.url + "exportImage" + e.Util.getParamString(t), i))
            }
        });
    var pt = ht.extend({
        options: {
            updateInterval: 150,
            layers: !1,
            layerDefs: !1,
            timeOptions: !1,
            format: "png24",
            transparent: !0,
            f: "json"
        },
        initialize: function (t) {
            t = k(t), this.service = et(t), this.service.addEventParent(this), (t.proxy || t.token) && "json" !== t.f && (t.f = "json"), e.Util.setOptions(this, t)
        },
        getDynamicLayers: function () {
            return this.options.dynamicLayers
        },
        setDynamicLayers: function (t) {
            return this.options.dynamicLayers = t, this._update(), this
        },
        getLayers: function () {
            return this.options.layers
        },
        setLayers: function (t) {
            return this.options.layers = t, this._update(), this
        },
        getLayerDefs: function () {
            return this.options.layerDefs
        },
        setLayerDefs: function (t) {
            return this.options.layerDefs = t, this._update(), this
        },
        getTimeOptions: function () {
            return this.options.timeOptions
        },
        setTimeOptions: function (t) {
            return this.options.timeOptions = t, this._update(), this
        },
        query: function () {
            return this.service.query()
        },
        identify: function () {
            return this.service.identify()
        },
        find: function () {
            return this.service.find()
        },
        _getPopupData: function (t) {
            var i, s = e.Util.bind(function (i, s, r) {
                i || setTimeout(e.Util.bind(function () {
                    this._renderPopup(t.latlng, i, s, r)
                }, this), 300)
            }, this);
            if ((i = this.options.popup ? this.options.popup.on(this._map).at(t.latlng) : this.identify().on(this._map).at(t.latlng)).params.maxAllowableOffset || i.simplify(this._map, .5), this.options.popup && this.options.popup.params && this.options.popup.params.layers || (this.options.layers ? i.layers("visible:" + this.options.layers.join(",")) : i.layers("visible")), this.options.layerDefs && "string" != typeof this.options.layerDefs && !i.params.layerDefs)
                for (var r in this.options.layerDefs) this.options.layerDefs.hasOwnProperty(r) && i.layerDef(r, this.options.layerDefs[r]);
            i.run(s), this._shouldRenderPopup = !0, this._lastClick = t.latlng
        },
        _buildExportParams: function () {
            var t = parseInt(this._map.options.crs.code.split(":")[1], 10),
                e = {
                    bbox: this._calculateBbox(),
                    size: this._calculateImageSize(),
                    dpi: 96,
                    format: this.options.format,
                    transparent: this.options.transparent,
                    bboxSR: t,
                    imageSR: t
                };
            if (this.options.dynamicLayers && (e.dynamicLayers = this.options.dynamicLayers), this.options.layers) {
                if (0 === this.options.layers.length) return;
                e.layers = "show:" + this.options.layers.join(",")
            }
            return this.options.layerDefs && (e.layerDefs = "string" == typeof this.options.layerDefs ? this.options.layerDefs : JSON.stringify(this.options.layerDefs)), this.options.timeOptions && (e.timeOptions = JSON.stringify(this.options.timeOptions)), this.options.from && this.options.to && (e.time = this.options.from.valueOf() + "," + this.options.to.valueOf()), this.service.options.token && (e.token = this.service.options.token), this.options.proxy && (e.proxy = this.options.proxy), this.options.disableCache && (e._ts = Date.now()), e
        },
        _requestExport: function (t, i) {
            "json" === this.options.f ? this.service.request("export", t, function (t, e) {
                t || (this.options.token && (e.href += "?token=" + this.options.token), this.options.proxy && (e.href = this.options.proxy + "?" + e.href), e.href ? this._renderImage(e.href, i) : this._renderImage(e.imageData, i, e.contentType))
            }, this) : (t.f = "image", this._renderImage(this.options.url + "export" + e.Util.getParamString(t), i))
        }
    });
    var dt = e.Layer.extend({
        options: {
            cellSize: 512,
            updateInterval: 150
        },
        initialize: function (t) {
            t = e.setOptions(this, t), this._zooming = !1
        },
        onAdd: function (t) {
            this._map = t, this._update = e.Util.throttle(this._update, this.options.updateInterval, this), this._reset(), this._update()
        },
        onRemove: function () {
            this._map.removeEventListener(this.getEvents(), this), this._removeCells()
        },
        getEvents: function () {
            return {
                moveend: this._update,
                zoomstart: this._zoomstart,
                zoomend: this._reset
            }
        },
        addTo: function (t) {
            return t.addLayer(this), this
        },
        removeFrom: function (t) {
            return t.removeLayer(this), this
        },
        _zoomstart: function () {
            this._zooming = !0
        },
        _reset: function () {
            this._removeCells(), this._cells = {}, this._activeCells = {}, this._cellsToLoad = 0, this._cellsTotal = 0, this._cellNumBounds = this._getCellNumBounds(), this._resetWrap(), this._zooming = !1
        },
        _resetWrap: function () {
            var t = this._map,
                e = t.options.crs;
            if (!e.infinite) {
                var i = this._getCellSize();
                e.wrapLng && (this._wrapLng = [Math.floor(t.project([0, e.wrapLng[0]]).x / i), Math.ceil(t.project([0, e.wrapLng[1]]).x / i)]), e.wrapLat && (this._wrapLat = [Math.floor(t.project([e.wrapLat[0], 0]).y / i), Math.ceil(t.project([e.wrapLat[1], 0]).y / i)])
            }
        },
        _getCellSize: function () {
            return this.options.cellSize
        },
        _update: function () {
            if (this._map) {
                var t = this._map.getPixelBounds(),
                    i = this._getCellSize(),
                    s = e.bounds(t.min.divideBy(i).floor(), t.max.divideBy(i).floor());
                this._removeOtherCells(s), this._addCells(s), this.fire("cellsupdated")
            }
        },
        _addCells: function (t) {
            var i, s, r, n = [],
                o = t.getCenter(),
                a = this._map.getZoom();
            for (i = t.min.y; i <= t.max.y; i++)
                for (s = t.min.x; s <= t.max.x; s++)(r = e.point(s, i)).z = a, this._isValidCell(r) && n.push(r);
            var u = n.length;
            if (0 !== u)
                for (this._cellsToLoad += u, this._cellsTotal += u, n.sort(function (t, e) {
                    return t.distanceTo(o) - e.distanceTo(o)
                }), s = 0; s < u; s++) this._addCell(n[s])
        },
        _isValidCell: function (t) {
            var i = this._map.options.crs;
            if (!i.infinite) {
                var s = this._cellNumBounds;
                if (!s) return !1;
                if (!i.wrapLng && (t.x < s.min.x || t.x > s.max.x) || !i.wrapLat && (t.y < s.min.y || t.y > s.max.y)) return !1
            }
            if (!this.options.bounds) return !0;
            var r = this._cellCoordsToBounds(t);
            return e.latLngBounds(this.options.bounds).intersects(r)
        },
        _cellCoordsToBounds: function (t) {
            var i = this._map,
                s = this.options.cellSize,
                r = t.multiplyBy(s),
                n = r.add([s, s]),
                o = i.wrapLatLng(i.unproject(r, t.z)),
                a = i.wrapLatLng(i.unproject(n, t.z));
            return e.latLngBounds(o, a)
        },
        _cellCoordsToKey: function (t) {
            return t.x + ":" + t.y
        },
        _keyToCellCoords: function (t) {
            var i = t.split(":"),
                s = parseInt(i[0], 10),
                r = parseInt(i[1], 10);
            return e.point(s, r)
        },
        _removeOtherCells: function (t) {
            for (var e in this._cells) t.contains(this._keyToCellCoords(e)) || this._removeCell(e)
        },
        _removeCell: function (t) {
            var e = this._activeCells[t];
            e && (delete this._activeCells[t], this.cellLeave && this.cellLeave(e.bounds, e.coords), this.fire("cellleave", {
                bounds: e.bounds,
                coords: e.coords
            }))
        },
        _removeCells: function () {
            for (var t in this._cells) {
                var e = this._cells[t].bounds,
                    i = this._cells[t].coords;
                this.cellLeave && this.cellLeave(e, i), this.fire("cellleave", {
                    bounds: e,
                    coords: i
                })
            }
        },
        _addCell: function (t) {
            this._wrapCoords(t);
            var e = this._cellCoordsToKey(t),
                i = this._cells[e];
            i && !this._activeCells[e] && (this.cellEnter && this.cellEnter(i.bounds, t), this.fire("cellenter", {
                bounds: i.bounds,
                coords: t
            }), this._activeCells[e] = i), i || (i = {
                coords: t,
                bounds: this._cellCoordsToBounds(t)
            }, this._cells[e] = i, this._activeCells[e] = i, this.createCell && this.createCell(i.bounds, t), this.fire("cellcreate", {
                bounds: i.bounds,
                coords: t
            }))
        },
        _wrapCoords: function (t) {
            t.x = this._wrapLng ? e.Util.wrapNum(t.x, this._wrapLng) : t.x, t.y = this._wrapLat ? e.Util.wrapNum(t.y, this._wrapLat) : t.y
        },
        _getCellNumBounds: function () {
            var t = this._map.getPixelWorldBounds(),
                i = this._getCellSize();
            return t ? e.bounds(t.min.divideBy(i).floor(), t.max.divideBy(i).ceil().subtract([1, 1])) : null
        }
    });

    function mt(t) {
        this.values = [].concat(t || [])
    }
    mt.prototype.query = function (t) {
        var e = this.getIndex(t);
        return this.values[e]
    }, mt.prototype.getIndex = function (t) {
        this.dirty && this.sort();
        for (var e, i, s = 0, r = this.values.length - 1; s <= r;)
            if (e = (s + r) / 2 | 0, +(i = this.values[Math.round(e)]).value < +t) s = e + 1;
            else {
                if (!(+i.value > +t)) return e;
                r = e - 1
            } return Math.abs(~r)
    }, mt.prototype.between = function (t, e) {
        var i = this.getIndex(t),
            s = this.getIndex(e);
        if (0 === i && 0 === s) return [];
        for (; this.values[i - 1] && this.values[i - 1].value === t;) i--;
        for (; this.values[s + 1] && this.values[s + 1].value === e;) s++;
        return this.values[s] && this.values[s].value === e && this.values[s + 1] && s++, this.values.slice(i, s)
    }, mt.prototype.insert = function (t) {
        return this.values.splice(this.getIndex(t.value), 0, t), this
    }, mt.prototype.bulkAdd = function (t, e) {
        return this.values = this.values.concat([].concat(t || [])), e ? this.sort() : this.dirty = !0, this
    }, mt.prototype.sort = function () {
        return this.values.sort(function (t, e) {
            return +e.value - +t.value
        }).reverse(), this.dirty = !1, this
    };
    var ft = dt.extend({
        options: {
            attribution: null,
            where: "1=1",
            fields: ["*"],
            from: !1,
            to: !1,
            timeField: !1,
            timeFilterMode: "server",
            simplifyFactor: 0,
            precision: 6
        },
        initialize: function (t) {
            if (dt.prototype.initialize.call(this, t), t = k(t), t = e.Util.setOptions(this, t), this.service = nt(t), this.service.addEventParent(this), "*" !== this.options.fields[0]) {
                for (var i = !1, s = 0; s < this.options.fields.length; s++) this.options.fields[s].match(/^(OBJECTID|FID|OID|ID)$/i) && (i = !0);
                !1 === i && M("no known esriFieldTypeOID field detected in fields Array.  Please add an attribute field containing unique IDs to ensure the layer can be drawn correctly.")
            }
            this.options.timeField.start && this.options.timeField.end ? (this._startTimeIndex = new mt, this._endTimeIndex = new mt) : this.options.timeField && (this._timeIndex = new mt), this._cache = {}, this._currentSnapshot = [], this._activeRequests = 0
        },
        onAdd: function (t) {
            return D(t), this.service.metadata(function (e, i) {
                if (!e) {
                    var s = i.supportedQueryFormats,
                        r = !1;
                    !1 === this.service.options.isModern && (r = !0), !r && s && -1 !== s.indexOf("geoJSON") && (this.service.options.isModern = !0), i.objectIdField && (this.service.options.idAttribute = i.objectIdField), !this.options.attribution && t.attributionControl && i.copyrightText && (this.options.attribution = i.copyrightText, t.attributionControl.addAttribution(this.getAttribution()))
                }
            }, this), t.on("zoomend", this._handleZoomChange, this), dt.prototype.onAdd.call(this, t)
        },
        onRemove: function (t) {
            return t.off("zoomend", this._handleZoomChange, this), dt.prototype.onRemove.call(this, t)
        },
        getAttribution: function () {
            return this.options.attribution
        },
        createCell: function (t, e) {
            this._visibleZoom() && this._requestFeatures(t, e)
        },
        _requestFeatures: function (t, i, s) {
            return this._activeRequests++, 1 === this._activeRequests && this.fire("loading", {
                bounds: t
            }, !0), this._buildQuery(t).run(function (r, n, o) {
                o && o.exceededTransferLimit && this.fire("drawlimitexceeded"), !r && n && n.features.length && e.Util.requestAnimFrame(e.Util.bind(function () {
                    this._addFeatures(n.features, i), this._postProcessFeatures(t)
                }, this)), r || !n || n.features.length || this._postProcessFeatures(t), r && this._postProcessFeatures(t), s && s.call(this, r, n)
            }, this)
        },
        _postProcessFeatures: function (t) {
            this._activeRequests--, this._activeRequests <= 0 && this.fire("load", {
                bounds: t
            })
        },
        _cacheKey: function (t) {
            return t.z + ":" + t.x + ":" + t.y
        },
        _addFeatures: function (t, e) {
            var i = this._cacheKey(e);
            this._cache[i] = this._cache[i] || [];
            for (var s = t.length - 1; s >= 0; s--) {
                var r = t[s].id; - 1 === this._currentSnapshot.indexOf(r) && this._currentSnapshot.push(r), -1 === this._cache[i].indexOf(r) && this._cache[i].push(r)
            }
            this.options.timeField && this._buildTimeIndexes(t), this.createLayers(t)
        },
        _buildQuery: function (t) {
            var i = this.service.query().intersects(t).where(this.options.where).fields(this.options.fields).precision(this.options.precision);
            return this.options.requestParams && e.Util.extend(i.params, this.options.requestParams), this.options.simplifyFactor && i.simplify(this._map, this.options.simplifyFactor), "server" === this.options.timeFilterMode && this.options.from && this.options.to && i.between(this.options.from, this.options.to), i
        },
        setWhere: function (t, i, s) {
            this.options.where = t && t.length ? t : "1=1";
            for (var r = [], n = [], o = 0, a = null, u = e.Util.bind(function (t, u) {
                if (t && (a = t), u)
                    for (var l = u.features.length - 1; l >= 0; l--) n.push(u.features[l].id);
                --o <= 0 && this._visibleZoom() && (this._currentSnapshot = n, e.Util.requestAnimFrame(e.Util.bind(function () {
                    this.removeLayers(r), this.addLayers(n), i && i.call(s, a)
                }, this)))
            }, this), l = this._currentSnapshot.length - 1; l >= 0; l--) r.push(this._currentSnapshot[l]);
            for (var h in this._activeCells) {
                o++;
                var c = this._keyToCellCoords(h),
                    p = this._cellCoordsToBounds(c);
                this._requestFeatures(p, h, u)
            }
            return this
        },
        getWhere: function () {
            return this.options.where
        },
        getTimeRange: function () {
            return [this.options.from, this.options.to]
        },
        setTimeRange: function (t, i, s, r) {
            var n = this.options.from,
                o = this.options.to,
                a = 0,
                u = null,
                l = e.Util.bind(function (e) {
                    e && (u = e), this._filterExistingFeatures(n, o, t, i), a--, s && a <= 0 && s.call(r, u)
                }, this);
            if (this.options.from = t, this.options.to = i, this._filterExistingFeatures(n, o, t, i), "server" === this.options.timeFilterMode)
                for (var h in this._activeCells) {
                    a++;
                    var c = this._keyToCellCoords(h),
                        p = this._cellCoordsToBounds(c);
                    this._requestFeatures(p, h, l)
                }
            return this
        },
        refresh: function () {
            for (var t in this._activeCells) {
                var e = this._keyToCellCoords(t),
                    i = this._cellCoordsToBounds(e);
                this._requestFeatures(i, t)
            }
            this.redraw && this.once("load", function () {
                this.eachFeature(function (t) {
                    this._redraw(t.feature.id)
                }, this)
            }, this)
        },
        _filterExistingFeatures: function (t, i, s, r) {
            var n = t && i ? this._getFeaturesInTimeRange(t, i) : this._currentSnapshot,
                o = this._getFeaturesInTimeRange(s, r);
            if (o.indexOf)
                for (var a = 0; a < o.length; a++) {
                    var u = n.indexOf(o[a]);
                    u >= 0 && n.splice(u, 1)
                }
            e.Util.requestAnimFrame(e.Util.bind(function () {
                this.removeLayers(n), this.addLayers(o)
            }, this))
        },
        _getFeaturesInTimeRange: function (t, e) {
            var i, s = [];
            if (this.options.timeField.start && this.options.timeField.end) {
                var r = this._startTimeIndex.between(t, e),
                    n = this._endTimeIndex.between(t, e);
                i = r.concat(n)
            } else i = this._timeIndex.between(t, e);
            for (var o = i.length - 1; o >= 0; o--) s.push(i[o].id);
            return s
        },
        _buildTimeIndexes: function (t) {
            var e, i;
            if (this.options.timeField.start && this.options.timeField.end) {
                var s = [],
                    r = [];
                for (e = t.length - 1; e >= 0; e--) i = t[e], s.push({
                    id: i.id,
                    value: new Date(i.properties[this.options.timeField.start])
                }), r.push({
                    id: i.id,
                    value: new Date(i.properties[this.options.timeField.end])
                });
                this._startTimeIndex.bulkAdd(s), this._endTimeIndex.bulkAdd(r)
            } else {
                var n = [];
                for (e = t.length - 1; e >= 0; e--) i = t[e], n.push({
                    id: i.id,
                    value: new Date(i.properties[this.options.timeField])
                });
                this._timeIndex.bulkAdd(n)
            }
        },
        _featureWithinTimeRange: function (t) {
            if (!this.options.from || !this.options.to) return !0;
            var e = +this.options.from.valueOf(),
                i = +this.options.to.valueOf();
            if ("string" == typeof this.options.timeField) {
                var s = +t.properties[this.options.timeField];
                return s >= e && s <= i
            }
            if (this.options.timeField.start && this.options.timeField.end) {
                var r = +t.properties[this.options.timeField.start],
                    n = +t.properties[this.options.timeField.end];
                return r >= e && r <= i || n >= e && n <= i
            }
        },
        _visibleZoom: function () {
            if (!this._map) return !1;
            var t = this._map.getZoom();
            return !(t > this.options.maxZoom || t < this.options.minZoom)
        },
        _handleZoomChange: function () {
            if (this._visibleZoom())
                for (var t in this._activeCells) {
                    var e = this._activeCells[t].coords,
                        i = this._cacheKey(e);
                    this._cache[i] && this.addLayers(this._cache[i])
                } else this.removeLayers(this._currentSnapshot), this._currentSnapshot = []
        },
        authenticate: function (t) {
            return this.service.authenticate(t), this
        },
        metadata: function (t, e) {
            return this.service.metadata(t, e), this
        },
        query: function () {
            return this.service.query()
        },
        _getMetadata: function (t) {
            this._metadata ? t(void 0, this._metadata) : this.metadata(e.Util.bind(function (e, i) {
                this._metadata = i, t(e, this._metadata)
            }, this))
        },
        addFeature: function (t, e, i) {
            this.addFeatures(t, e, i)
        },
        addFeatures: function (t, i, s) {
            this._getMetadata(e.Util.bind(function (r, n) {
                if (r) i && i.call(this, r, null);
                else {
                    var o = t.features ? t.features : [t];
                    this.service.addFeatures(t, e.Util.bind(function (t, e) {
                        if (!t) {
                            for (var r = o.length - 1; r >= 0; r--) o[r].properties[n.objectIdField] = o.length > 1 ? e[r].objectId : e.objectId, o[r].id = o.length > 1 ? e[r].objectId : e.objectId;
                            this.createLayers(o)
                        }
                        i && i.call(s, t, e)
                    }, this))
                }
            }, this))
        },
        updateFeature: function (t, e, i) {
            this.updateFeatures(t, e, i)
        },
        updateFeatures: function (t, e, i) {
            var s = t.features ? t.features : [t];
            this.service.updateFeatures(t, function (t, r) {
                if (!t) {
                    for (var n = s.length - 1; n >= 0; n--) this.removeLayers([s[n].id], !0);
                    this.createLayers(s)
                }
                e && e.call(i, t, r)
            }, this)
        },
        deleteFeature: function (t, e, i) {
            this.deleteFeatures(t, e, i)
        },
        deleteFeatures: function (t, e, i) {
            return this.service.deleteFeatures(t, function (t, s) {
                var r = s.length ? s : [s];
                if (!t && r.length > 0)
                    for (var n = r.length - 1; n >= 0; n--) this.removeLayers([r[n].objectId], !0);
                e && e.call(i, t, s)
            }, this)
        }
    }),
        yt = ft.extend({
            options: {
                cacheLayers: !0
            },
            initialize: function (t) {
                ft.prototype.initialize.call(this, t), this._originalStyle = this.options.style, this._layers = {}
            },
            onRemove: function (t) {
                for (var e in this._layers) t.removeLayer(this._layers[e]), this.fire("removefeature", {
                    feature: this._layers[e].feature,
                    permanent: !1
                }, !0);
                return ft.prototype.onRemove.call(this, t)
            },
            createNewLayer: function (t) {
                var i = e.GeoJSON.geometryToLayer(t, this.options);
                return i && (i.defaultOptions = i.options), i
            },
            _updateLayer: function (t, i) {
                var s = [],
                    r = this.options.coordsToLatLng || e.GeoJSON.coordsToLatLng;
                switch (i.properties && (t.feature.properties = i.properties), i.geometry.type) {
                    case "Point":
                        s = e.GeoJSON.coordsToLatLng(i.geometry.coordinates), t.setLatLng(s);
                        break;
                    case "LineString":
                        s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 0, r), t.setLatLngs(s);
                        break;
                    case "MultiLineString":
                    case "Polygon":
                        s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 1, r), t.setLatLngs(s);
                        break;
                    case "MultiPolygon":
                        s = e.GeoJSON.coordsToLatLngs(i.geometry.coordinates, 2, r), t.setLatLngs(s)
                }
            },
            createLayers: function (t) {
                for (var e = t.length - 1; e >= 0; e--) {
                    var i, s = t[e],
                        r = this._layers[s.id];
                    this._visibleZoom() && r && !this._map.hasLayer(r) && (this._map.addLayer(r), this.fire("addfeature", {
                        feature: r.feature
                    }, !0)), r && this.options.simplifyFactor > 0 && (r.setLatLngs || r.setLatLng) && this._updateLayer(r, s), r || ((i = this.createNewLayer(s)) ? (i.feature = s, i.addEventParent(this), this.options.onEachFeature && this.options.onEachFeature(i.feature, i), this._layers[i.feature.id] = i, this.setFeatureStyle(i.feature.id, this.options.style), this.fire("createfeature", {
                        feature: i.feature
                    }, !0), this._visibleZoom() && (!this.options.timeField || this.options.timeField && this._featureWithinTimeRange(s)) && this._map.addLayer(i)) : M("invalid GeoJSON encountered"))
                }
            },
            addLayers: function (t) {
                for (var e = t.length - 1; e >= 0; e--) {
                    var i = this._layers[t[e]];
                    i && this._map.addLayer(i)
                }
            },
            removeLayers: function (t, e) {
                for (var i = t.length - 1; i >= 0; i--) {
                    var s = t[i],
                        r = this._layers[s];
                    r && (this.fire("removefeature", {
                        feature: r.feature,
                        permanent: e
                    }, !0), this._map.removeLayer(r)), r && e && delete this._layers[s]
                }
            },
            cellEnter: function (t, i) {
                this._visibleZoom() && !this._zooming && this._map && e.Util.requestAnimFrame(e.Util.bind(function () {
                    var t = this._cacheKey(i),
                        e = this._cellCoordsToKey(i),
                        s = this._cache[t];
                    this._activeCells[e] && s && this.addLayers(s)
                }, this))
            },
            cellLeave: function (t, i) {
                this._zooming || e.Util.requestAnimFrame(e.Util.bind(function () {
                    if (this._map) {
                        var t = this._cacheKey(i),
                            e = this._cellCoordsToKey(i),
                            s = this._cache[t],
                            r = this._map.getBounds();
                        if (!this._activeCells[e] && s) {
                            for (var n = !0, o = 0; o < s.length; o++) {
                                var a = this._layers[s[o]];
                                a && a.getBounds && r.intersects(a.getBounds()) && (n = !1)
                            }
                            n && this.removeLayers(s, !this.options.cacheLayers), !this.options.cacheLayers && n && (delete this._cache[t], delete this._cells[e], delete this._activeCells[e])
                        }
                    }
                }, this))
            },
            resetStyle: function () {
                return this.options.style = this._originalStyle, this.eachFeature(function (t) {
                    this.resetFeatureStyle(t.feature.id)
                }, this), this
            },
            setStyle: function (t) {
                return this.options.style = t, this.eachFeature(function (e) {
                    this.setFeatureStyle(e.feature.id, t)
                }, this), this
            },
            resetFeatureStyle: function (t) {
                var i = this._layers[t],
                    s = this._originalStyle || e.Path.prototype.options;
                return i && (e.Util.extend(i.options, i.defaultOptions), this.setFeatureStyle(t, s)), this
            },
            setFeatureStyle: function (t, e) {
                var i = this._layers[t];
                return "function" == typeof e && (e = e(i.feature)), i.setStyle && i.setStyle(e), this
            },
            eachActiveFeature: function (t, e) {
                if (this._map) {
                    var i = this._map.getBounds();
                    for (var s in this._layers) - 1 !== this._currentSnapshot.indexOf(this._layers[s].feature.id) && ("function" == typeof this._layers[s].getLatLng && i.contains(this._layers[s].getLatLng()) ? t.call(e, this._layers[s]) : "function" == typeof this._layers[s].getBounds && i.intersects(this._layers[s].getBounds()) && t.call(e, this._layers[s]))
                }
                return this
            },
            eachFeature: function (t, e) {
                for (var i in this._layers) t.call(e, this._layers[i]);
                return this
            },
            getFeature: function (t) {
                return this._layers[t]
            },
            bringToBack: function () {
                this.eachFeature(function (t) {
                    t.bringToBack && t.bringToBack()
                })
            },
            bringToFront: function () {
                this.eachFeature(function (t) {
                    t.bringToFront && t.bringToFront()
                })
            },
            redraw: function (t) {
                return t && this._redraw(t), this
            },
            _redraw: function (t) {
                var i = this._layers[t],
                    s = i.feature;
                if (i && i.setIcon && this.options.pointToLayer && this.options.pointToLayer) {
                    var r = this.options.pointToLayer(s, e.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])).options.icon;
                    i.setIcon(r)
                }
                if (i && i.setStyle && this.options.pointToLayer) {
                    var n = this.options.pointToLayer(s, e.latLng(s.geometry.coordinates[1], s.geometry.coordinates[0])).options;
                    this.setFeatureStyle(s.id, n)
                }
                i && i.setStyle && this.options.style && this.resetStyle(s.id)
            }
        });
    t.VERSION = "2.2.4", t.Support = r, t.options = n, t.Util = N, t.get = d, t.post = l, t.request = c, t.Task = Z, t.task = function (t) {
        return t = k(t), new Z(t)
    }, t.Query = j, t.query = W, t.Find = J, t.find = Q, t.Identify = V, t.identify = function (t) {
        return new V(t)
    }, t.IdentifyFeatures = H, t.identifyFeatures = K, t.IdentifyImage = X, t.identifyImage = $, t.Service = Y, t.service = function (t) {
        return t = k(t), new Y(t)
    }, t.MapService = tt, t.mapService = et, t.ImageService = it, t.imageService = st, t.FeatureLayerService = rt, t.featureLayerService = nt, t.BasemapLayer = at, t.basemapLayer = function (t, e) {
        return new at(t, e)
    }, t.TiledMapLayer = ut, t.tiledMapLayer = function (t, e) {
        return new ut(t, e)
    }, t.RasterLayer = ht, t.ImageMapLayer = ct, t.imageMapLayer = function (t, e) {
        return new ct(t, e)
    }, t.DynamicMapLayer = pt, t.dynamicMapLayer = function (t, e) {
        return new pt(t, e)
    }, t.FeatureManager = ft, t.FeatureLayer = yt, t.featureLayer = function (t) {
        return new yt(t)
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});;
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports, require("leaflet"), require("esri-leaflet")) : "function" == typeof define && define.amd ? define(["exports", "leaflet", "esri-leaflet"], t) : t((e.L = e.L || {}, e.L.esri = e.L.esri || {}, e.L.esri.Geocoding = {}), e.L, e.L.esri)
}(this, function (e, t, s) {
    "use strict";

    function i(e) {
        return new p(e)
    }

    function o(e) {
        return new f(e)
    }

    function r(e) {
        return new v(e)
    }

    function n(e) {
        return new m(e)
    }

    function a(e, t) {
        return new _(e, t)
    }

    function l(e) {
        return new y(e)
    }

    function u(e) {
        return new x(e)
    }

    function d(e) {
        return new b(e)
    }

    function h(e) {
        return new C(e)
    }

    function c(e) {
        return new S(e)
    }
    var g = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/",
        p = s.Task.extend({
            path: "findAddressCandidates",
            params: {
                outSr: 4326,
                forStorage: !1,
                outFields: "*",
                maxLocations: 20
            },
            setters: {
                address: "address",
                neighborhood: "neighborhood",
                city: "city",
                subregion: "subregion",
                region: "region",
                postal: "postal",
                country: "country",
                text: "singleLine",
                category: "category",
                token: "token",
                key: "magicKey",
                fields: "outFields",
                forStorage: "forStorage",
                maxLocations: "maxLocations",
                countries: "sourceCountry"
            },
            initialize: function (e) {
                e = e || {}, e.url = e.url || g, s.Task.prototype.initialize.call(this, e)
            },
            within: function (e) {
                return e = t.latLngBounds(e), this.params.searchExtent = s.Util.boundsToExtent(e), this
            },
            nearby: function (e, s) {
                var i = t.latLng(e);
                return this.params.location = i.lng + "," + i.lat, this.params.distance = Math.min(Math.max(s, 2e3), 5e4), this
            },
            run: function (e, t) {
                return this.options.customParam && (this.params[this.options.customParam] = this.params.singleLine, delete this.params.singleLine), this.request(function (s, i) {
                    var o = this._processGeocoderResponse,
                        r = s ? void 0 : o(i);
                    e.call(t, s, {
                        results: r
                    }, i)
                }, this)
            },
            _processGeocoderResponse: function (e) {
                for (var i = [], o = 0; o < e.candidates.length; o++) {
                    var r = e.candidates[o];
                    if (r.extent) var n = s.Util.extentToBounds(r.extent);
                    i.push({
                        text: r.address,
                        bounds: n,
                        score: r.score,
                        latlng: t.latLng(r.location.y, r.location.x),
                        properties: r.attributes
                    })
                }
                return i
            }
        }),
        f = s.Task.extend({
            path: "reverseGeocode",
            params: {
                outSR: 4326,
                returnIntersection: !1
            },
            setters: {
                distance: "distance",
                language: "langCode",
                intersection: "returnIntersection"
            },
            initialize: function (e) {
                e = e || {}, e.url = e.url || g, s.Task.prototype.initialize.call(this, e)
            },
            latlng: function (e) {
                var s = t.latLng(e);
                return this.params.location = s.lng + "," + s.lat, this
            },
            run: function (e, s) {
                return this.request(function (i, o) {
                    var r;
                    r = i ? void 0 : {
                        latlng: t.latLng(o.location.y, o.location.x),
                        address: o.address
                    }, e.call(s, i, r, o)
                }, this)
            }
        }),
        v = s.Task.extend({
            path: "suggest",
            params: {},
            setters: {
                text: "text",
                category: "category",
                countries: "countryCode",
                maxSuggestions: "maxSuggestions"
            },
            initialize: function (e) {
                e = e || {}, e.url || (e.url = g, e.supportsSuggest = !0), s.Task.prototype.initialize.call(this, e)
            },
            within: function (e) {
                e = t.latLngBounds(e), e = e.pad(.5);
                var i = e.getCenter(),
                    o = e.getNorthWest();
                return this.params.location = i.lng + "," + i.lat, this.params.distance = Math.min(Math.max(i.distanceTo(o), 2e3), 5e4), this.params.searchExtent = s.Util.boundsToExtent(e), this
            },
            nearby: function (e, s) {
                var i = t.latLng(e);
                return this.params.location = i.lng + "," + i.lat, this.params.distance = Math.min(Math.max(s, 2e3), 5e4), this
            },
            run: function (e, t) {
                if (this.options.supportsSuggest) return this.request(function (s, i) {
                    e.call(t, s, i, i)
                }, this);
                console.warn("this geocoding service does not support asking for suggestions")
            }
        }),
        m = s.Service.extend({
            initialize: function (e) {
                e = e || {}, e.url ? (s.Service.prototype.initialize.call(this, e), this._confirmSuggestSupport()) : (e.url = g, e.supportsSuggest = !0, s.Service.prototype.initialize.call(this, e))
            },
            geocode: function () {
                return i(this)
            },
            reverse: function () {
                return o(this)
            },
            suggest: function () {
                return r(this)
            },
            _confirmSuggestSupport: function () {
                this.metadata(function (e, t) {
                    e || (t.capabilities && t.capabilities.indexOf("Suggest") > -1 ? this.options.supportsSuggest = !0 : this.options.supportsSuggest = !1, this.options.customParam = t.singleLineAddressField.name)
                }, this)
            }
        }),
        _ = t.Evented.extend({
            options: {
                zoomToResult: !0,
                useMapBounds: 12,
                searchBounds: null
            },
            initialize: function (e, s) {
                if (t.Util.setOptions(this, s), this._control = e, !s || !s.providers || !s.providers.length) throw new Error("You must specify at least one provider");
                this._providers = s.providers
            },
            _geocode: function (e, s, i) {
                var o, r = 0,
                    n = [],
                    a = t.Util.bind(function (t, s) {
                        r--, t || (s && (n = n.concat(s)), r <= 0 && (o = this._boundsFromResults(n), this.fire("results", {
                            results: n,
                            bounds: o,
                            latlng: o ? o.getCenter() : void 0,
                            text: e
                        }, !0), this.options.zoomToResult && o && this._control._map.fitBounds(o), this.fire("load")))
                    }, this);
                if (s) r++, i.results(e, s, this._searchBounds(), a);
                else
                    for (var l = 0; l < this._providers.length; l++) r++, this._providers[l].results(e, s, this._searchBounds(), a)
            },
            _suggest: function (e) {
                var s = this._providers.length,
                    i = t.Util.bind(function (e, i) {
                        return t.Util.bind(function (t, o) {
                            if (!t) {
                                var r;
                                if (s -= 1, e.length < 2) return this._suggestions.innerHTML = "", void (this._suggestions.style.display = "none");
                                if (o.length)
                                    for (r = 0; r < o.length; r++) o[r].provider = i;
                                else this._control._renderSuggestions(o);
                                if (i._lastRender !== e && i.nodes) {
                                    for (r = 0; r < i.nodes.length; r++) i.nodes[r].parentElement && this._control._suggestions.removeChild(i.nodes[r]);
                                    i.nodes = []
                                }
                                o.length && this._control._input.value === e && (this._control.clearSuggestions(i.nodes), i._lastRender = e, i.nodes = this._control._renderSuggestions(o), this._control._nodes = [])
                            }
                        }, this)
                    }, this);
                this._pendingSuggestions = [];
                for (var o = 0; o < this._providers.length; o++) {
                    var r = this._providers[o],
                        n = r.suggestions(e, this._searchBounds(), i(e, r));
                    this._pendingSuggestions.push(n)
                }
            },
            _searchBounds: function () {
                return null !== this.options.searchBounds ? this.options.searchBounds : !1 === this.options.useMapBounds ? null : !0 === this.options.useMapBounds ? this._control._map.getBounds() : this.options.useMapBounds <= this._control._map.getZoom() ? this._control._map.getBounds() : null
            },
            _boundsFromResults: function (e) {
                if (e.length) {
                    for (var s = t.latLngBounds([0, 0], [0, 0]), i = [], o = [], r = e.length - 1; r >= 0; r--) {
                        var n = e[r];
                        o.push(n.latlng), n.bounds && n.bounds.isValid() && !n.bounds.equals(s) && i.push(n.bounds)
                    }
                    for (var a = t.latLngBounds(o), l = 0; l < i.length; l++) a.extend(i[l]);
                    return a
                }
            },
            _getAttribution: function () {
                for (var e = [], t = this._providers, s = 0; s < t.length; s++) t[s].options.attribution && e.push(t[s].options.attribution);
                return e.join(", ")
            }
        }),
        y = m.extend({
            options: {
                label: "Places and Addresses",
                maxResults: 5
            },
            suggestions: function (e, t, s) {
                var i = this.suggest().text(e);
                return t && i.within(t), this.options.countries && i.countries(this.options.countries), this.options.categories && i.category(this.options.categories), i.maxSuggestions(this.options.maxResults), i.run(function (e, t, i) {
                    var o = [];
                    if (!e)
                        for (; i.suggestions.length && o.length <= this.options.maxResults - 1;) {
                            var r = i.suggestions.shift();
                            r.isCollection || o.push({
                                text: r.text,
                                unformattedText: r.text,
                                magicKey: r.magicKey
                            })
                        }
                    s(e, o)
                }, this)
            },
            results: function (e, t, s, i) {
                var o = this.geocode().text(e);
                return t && o.key(t), o.maxLocations(this.options.maxResults), s && o.within(s), this.options.forStorage && o.forStorage(!0), this.options.countries && o.countries(this.options.countries), this.options.categories && o.category(this.options.categories), o.run(function (e, t) {
                    i(e, t.results)
                }, this)
            }
        }),
        x = t.Control.extend({
            includes: t.Evented.prototype,
            options: {
                position: "topleft",
                collapseAfterResult: !0,
                expanded: !1,
                allowMultipleResults: !0,
                placeholder: "Search for places or addresses",
                title: "Location Search"
            },
            initialize: function (e) {
                t.Util.setOptions(this, e), e && e.providers && e.providers.length || (e || (e = {}), e.providers = [l()]), this._geosearchCore = a(this, e), this._geosearchCore._providers = e.providers, this._geosearchCore.addEventParent(this);
                for (var s = 0; s < this._geosearchCore._providers.length; s++) this._geosearchCore._providers[s].addEventParent(this);
                this._geosearchCore._pendingSuggestions = [], t.Control.prototype.initialize.call(e)
            },
            _renderSuggestions: function (e) {
                var s;
                e.length > 0 && (this._suggestions.style.display = "block"), this._suggestions.style.maxHeight = this._map.getSize().y - this._suggestions.offsetTop - this._wrapper.offsetTop - 10 + "px";
                for (var i, o, r = [], n = [], a = 0; a < e.length; a++) {
                    var l = e[a];
                    if (!o && this._geosearchCore._providers.length > 1 && s !== l.provider.options.label && (o = t.DomUtil.create("span", "geocoder-control-header", this._suggestions), o.textContent = l.provider.options.label, o.innerText = l.provider.options.label, s = l.provider.options.label, r.push(o)), i || (i = t.DomUtil.create("ul", "geocoder-control-list", this._suggestions)), -1 === n.indexOf(l.text)) {
                        var u = t.DomUtil.create("li", "geocoder-control-suggestion", i);
                        u.innerHTML = l.text, u.provider = l.provider, u["data-magic-key"] = l.magicKey, u.unformattedText = l.unformattedText
                    } else
                        for (var d = 0; d < i.childNodes.length; d++) i.childNodes[d].innerHTML === l.text && (i.childNodes[d]["data-magic-key"] += "," + l.magicKey);
                    n.push(l.text)
                }
                return t.DomUtil.removeClass(this._input, "geocoder-control-loading"), r.push(i), r
            },
            _boundsFromResults: function (e) {
                if (e.length) {
                    for (var s = t.latLngBounds([0, 0], [0, 0]), i = [], o = [], r = e.length - 1; r >= 0; r--) {
                        var n = e[r];
                        o.push(n.latlng), n.bounds && n.bounds.isValid() && !n.bounds.equals(s) && i.push(n.bounds)
                    }
                    for (var a = t.latLngBounds(o), l = 0; l < i.length; l++) a.extend(i[l]);
                    return a
                }
            },
            clear: function () {
                this._suggestions.innerHTML = "", this._suggestions.style.display = "none", this.options.collapseAfterResult && (this._input.value = "", this._input.placeholder = "", t.DomUtil.removeClass(this._wrapper, "geocoder-control-expanded")), !this._map.scrollWheelZoom.enabled() && this._map.options.scrollWheelZoom && this._map.scrollWheelZoom.enable()
            },
            clearSuggestions: function () {
                if (this._nodes)
                    for (var e = 0; e < this._nodes.length; e++) this._nodes[e].parentElement && this._suggestions.removeChild(this._nodes[e])
            },
            _setupClick: function () {
                t.DomUtil.addClass(this._wrapper, "geocoder-control-expanded"), this._input.focus()
            },
            disable: function () {
                this._input.disabled = !0, t.DomUtil.addClass(this._input, "geocoder-control-input-disabled"), t.DomEvent.removeListener(this._wrapper, "click", this._setupClick, this)
            },
            enable: function () {
                this._input.disabled = !1, t.DomUtil.removeClass(this._input, "geocoder-control-input-disabled"), t.DomEvent.addListener(this._wrapper, "click", this._setupClick, this)
            },
            getAttribution: function () {
                for (var e = [], t = 0; t < this._providers.length; t++) this._providers[t].options.attribution && e.push(this._providers[t].options.attribution);
                return e.join(", ")
            },
            geocodeSuggestion: function (e) {
                var t = e.target || e.srcElement;
                t.classList.length < 1 && (t = t.parentNode), this._geosearchCore._geocode(t.unformattedText, t["data-magic-key"], t.provider), this.clear()
            },
            onAdd: function (e) {
                s.Util.setEsriAttribution(e), this._map = e, this._wrapper = t.DomUtil.create("div", "geocoder-control"), this._input = t.DomUtil.create("input", "geocoder-control-input leaflet-bar", this._wrapper), this._input.title = this.options.title, this.options.expanded && (t.DomUtil.addClass(this._wrapper, "geocoder-control-expanded"), this._input.placeholder = this.options.placeholder), this._suggestions = t.DomUtil.create("div", "geocoder-control-suggestions leaflet-bar", this._wrapper);
                var i = this._geosearchCore._getAttribution();
                return e.attributionControl && e.attributionControl.addAttribution(i), t.DomEvent.addListener(this._input, "focus", function (e) {
                    this._input.placeholder = this.options.placeholder, t.DomUtil.addClass(this._wrapper, "geocoder-control-expanded")
                }, this), t.DomEvent.addListener(this._wrapper, "click", this._setupClick, this), t.DomEvent.addListener(this._suggestions, "mousedown", this.geocodeSuggestion, this), t.DomEvent.addListener(this._input, "blur", function (e) {
                    this.clear()
                }, this), t.DomEvent.addListener(this._input, "keydown", function (e) {
                    var s = (e.target || e.srcElement).value;
                    t.DomUtil.addClass(this._wrapper, "geocoder-control-expanded");
                    for (var i, o = this._suggestions.querySelectorAll(".geocoder-control-suggestion"), r = this._suggestions.querySelectorAll(".geocoder-control-selected")[0], n = 0; n < o.length; n++)
                        if (o[n] === r) {
                            i = n;
                            break
                        } switch (e.keyCode) {
                            case 13:
                                r ? (this._input.value = r.innerText, this._geosearchCore._geocode(r.unformattedText, r["data-magic-key"], r.provider), this.clear()) : this.options.allowMultipleResults && s.length >= 2 ? (this._geosearchCore._geocode(this._input.value, void 0), this.clear()) : 1 === o.length ? (t.DomUtil.addClass(o[0], "geocoder-control-selected"), this._geosearchCore._geocode(o[0].innerHTML, o[0]["data-magic-key"], o[0].provider)) : (this.clear(), this._input.blur()), t.DomEvent.preventDefault(e);
                                break;
                            case 38:
                                r && t.DomUtil.removeClass(r, "geocoder-control-selected");
                                var a = o[i - 1];
                                r && a ? t.DomUtil.addClass(a, "geocoder-control-selected") : t.DomUtil.addClass(o[o.length - 1], "geocoder-control-selected"), t.DomEvent.preventDefault(e);
                                break;
                            case 40:
                                r && t.DomUtil.removeClass(r, "geocoder-control-selected");
                                var l = o[i + 1];
                                r && l ? t.DomUtil.addClass(l, "geocoder-control-selected") : t.DomUtil.addClass(o[0], "geocoder-control-selected"), t.DomEvent.preventDefault(e);
                                break;
                            default:
                                for (var u = 0; u < this._geosearchCore._pendingSuggestions.length; u++) {
                                    var d = this._geosearchCore._pendingSuggestions[u];
                                    d && d.abort && !d.id && d.abort()
                                }
                        }
                }, this), t.DomEvent.addListener(this._input, "keyup", t.Util.throttle(function (e) {
                    var s = e.which || e.keyCode,
                        i = (e.target || e.srcElement).value;
                    return i.length < 2 ? (this._suggestions.innerHTML = "", this._suggestions.style.display = "none", void t.DomUtil.removeClass(this._input, "geocoder-control-loading")) : 27 === s ? (this._suggestions.innerHTML = "", void (this._suggestions.style.display = "none")) : void (13 !== s && 38 !== s && 40 !== s && this._input.value !== this._lastValue && (this._lastValue = this._input.value, t.DomUtil.addClass(this._input, "geocoder-control-loading"), this._geosearchCore._suggest(i)))
                }, 50, this), this), t.DomEvent.disableClickPropagation(this._wrapper), t.DomEvent.addListener(this._suggestions, "mouseover", function (t) {
                    e.scrollWheelZoom.enabled() && e.options.scrollWheelZoom && e.scrollWheelZoom.disable()
                }), t.DomEvent.addListener(this._suggestions, "mouseout", function (t) {
                    !e.scrollWheelZoom.enabled() && e.options.scrollWheelZoom && e.scrollWheelZoom.enable()
                }), this._geosearchCore.on("load", function (e) {
                    t.DomUtil.removeClass(this._input, "geocoder-control-loading"), this.clear(), this._input.blur()
                }, this), this._wrapper
            }
        }),
        b = s.FeatureLayerService.extend({
            options: {
                label: "Feature Layer",
                maxResults: 5,
                bufferRadius: 1e3,
                formatSuggestion: function (e) {
                    return e.properties[this.options.searchFields[0]]
                }
            },
            initialize: function (e) {
                s.FeatureLayerService.prototype.initialize.call(this, e), "string" == typeof this.options.searchFields && (this.options.searchFields = [this.options.searchFields]), this._suggestionsQuery = this.query(), this._resultsQuery = this.query()
            },
            suggestions: function (e, t, s) {
                var i = this._suggestionsQuery.where(this._buildQuery(e)).returnGeometry(!1);
                return t && i.intersects(t), this.options.idField && i.fields([this.options.idField].concat(this.options.searchFields)), i.run(function (e, t, i) {
                    if (e) s(e, []);
                    else {
                        this.options.idField = i.objectIdFieldName;
                        for (var o = [], r = t.features.length - 1; r >= 0; r--) {
                            var n = t.features[r];
                            o.push({
                                text: this.options.formatSuggestion.call(this, n),
                                unformattedText: n.properties[this.options.searchFields[0]],
                                magicKey: n.id
                            })
                        }
                        s(e, o.slice(0, this.options.maxResults))
                    }
                }, this)
            },
            results: function (e, s, i, o) {
                var r = this._resultsQuery;
                return s ? (delete r.params.where, r.featureIds([s])) : r.where(this._buildQuery(e)), i && r.within(i), r.run(t.Util.bind(function (e, t) {
                    for (var s = [], i = 0; i < t.features.length; i++) {
                        var r = t.features[i];
                        if (r) {
                            var n = this._featureBounds(r),
                                a = {
                                    latlng: n.getCenter(),
                                    bounds: n,
                                    text: this.options.formatSuggestion.call(this, r),
                                    properties: r.properties,
                                    geojson: r
                                };
                            s.push(a), delete this._resultsQuery.params.objectIds
                        }
                    }
                    o(e, s)
                }, this))
            },
            orderBy: function (e, t) {
                this._suggestionsQuery.orderBy(e, t)
            },
            _buildQuery: function (e) {
                for (var t = [], s = this.options.searchFields.length - 1; s >= 0; s--) {
                    var i = 'upper("' + this.options.searchFields[s] + '")';
                    t.push(i + " LIKE upper('%" + e + "%')")
                }
                return this.options.where ? this.options.where + " AND (" + t.join(" OR ") + ")" : t.join(" OR ")
            },
            _featureBounds: function (e) {
                var s = t.geoJson(e);
                if ("Point" === e.geometry.type) {
                    var i = s.getBounds().getCenter(),
                        o = this.options.bufferRadius / 40075017 * 360 / Math.cos(180 / Math.PI * i.lat),
                        r = this.options.bufferRadius / 40075017 * 360;
                    return t.latLngBounds([i.lat - r, i.lng - o], [i.lat + r, i.lng + o])
                }
                return s.getBounds()
            }
        }),
        C = s.MapService.extend({
            options: {
                layers: [0],
                label: "Map Service",
                bufferRadius: 1e3,
                maxResults: 5,
                formatSuggestion: function (e) {
                    return e.properties[e.displayFieldName] + " <small>" + e.layerName + "</small>"
                }
            },
            initialize: function (e) {
                s.MapService.prototype.initialize.call(this, e), this._getIdFields()
            },
            suggestions: function (e, t, s) {
                return this.find().text(e).fields(this.options.searchFields).returnGeometry(!1).layers(this.options.layers).run(function (e, t, i) {
                    var o = [];
                    if (!e) {
                        var r = Math.min(this.options.maxResults, t.features.length);
                        i.results = i.results.reverse();
                        for (var n = 0; n < r; n++) {
                            var a = t.features[n],
                                l = i.results[n],
                                u = l.layerId,
                                d = this._idFields[u];
                            a.layerId = u, a.layerName = this._layerNames[u], a.displayFieldName = this._displayFields[u], d && o.push({
                                text: this.options.formatSuggestion.call(this, a),
                                unformattedText: a.properties[a.displayFieldName],
                                magicKey: l.attributes[d] + ":" + u
                            })
                        }
                    }
                    s(e, o.reverse())
                }, this)
            },
            results: function (e, t, s, i) {
                var o, r = [];
                if (t) {
                    var n = t.split(":")[0],
                        a = t.split(":")[1];
                    o = this.query().layer(a).featureIds(n)
                } else o = this.find().text(e).fields(this.options.searchFields).layers(this.options.layers);
                return o.run(function (e, t, s) {
                    if (!e) {
                        s.results && (s.results = s.results.reverse());
                        for (var o = 0; o < t.features.length; o++) {
                            var n = t.features[o];
                            if (a = a || s.results[o].layerId, n && void 0 !== a) {
                                var l = this._featureBounds(n);
                                n.layerId = a, n.layerName = this._layerNames[a], n.displayFieldName = this._displayFields[a];
                                var u = {
                                    latlng: l.getCenter(),
                                    bounds: l,
                                    text: this.options.formatSuggestion.call(this, n),
                                    properties: n.properties,
                                    geojson: n
                                };
                                r.push(u)
                            }
                        }
                    }
                    i(e, r.reverse())
                }, this)
            },
            _featureBounds: function (e) {
                var s = t.geoJson(e);
                if ("Point" === e.geometry.type) {
                    var i = s.getBounds().getCenter(),
                        o = this.options.bufferRadius / 40075017 * 360 / Math.cos(180 / Math.PI * i.lat),
                        r = this.options.bufferRadius / 40075017 * 360;
                    return t.latLngBounds([i.lat - r, i.lng - o], [i.lat + r, i.lng + o])
                }
                return s.getBounds()
            },
            _layerMetadataCallback: function (e) {
                return t.Util.bind(function (t, s) {
                    if (!t) {
                        this._displayFields[e] = s.displayField, this._layerNames[e] = s.name;
                        for (var i = 0; i < s.fields.length; i++) {
                            var o = s.fields[i];
                            if ("esriFieldTypeOID" === o.type) {
                                this._idFields[e] = o.name;
                                break
                            }
                        }
                    }
                }, this)
            },
            _getIdFields: function () {
                this._idFields = {}, this._displayFields = {}, this._layerNames = {};
                for (var e = 0; e < this.options.layers.length; e++) {
                    var t = this.options.layers[e];
                    this.get(t, {}, this._layerMetadataCallback(t))
                }
            }
        }),
        S = m.extend({
            options: {
                label: "Geocode Server",
                maxResults: 5
            },
            suggestions: function (e, t, s) {
                if (this.options.supportsSuggest) {
                    var i = this.suggest().text(e);
                    return t && i.within(t), i.run(function (e, t, i) {
                        var o = [];
                        if (!e)
                            for (; i.suggestions.length && o.length <= this.options.maxResults - 1;) {
                                var r = i.suggestions.shift();
                                r.isCollection || o.push({
                                    text: r.text,
                                    unformattedText: r.text,
                                    magicKey: r.magicKey
                                })
                            }
                        s(e, o)
                    }, this)
                }
                return s(void 0, []), !1
            },
            results: function (e, t, s, i) {
                var o = this.geocode().text(e);
                return t && o.key(t), o.maxLocations(this.options.maxResults), s && o.within(s), o.run(function (e, t) {
                    i(e, t.results)
                }, this)
            }
        });
    e.VERSION = "2.2.14", e.Geocode = p, e.geocode = i, e.ReverseGeocode = f, e.reverseGeocode = o, e.Suggest = v, e.suggest = r, e.GeocodeService = m, e.geocodeService = n, e.Geosearch = x, e.geosearch = u, e.GeosearchCore = _, e.geosearchCore = a, e.ArcgisOnlineProvider = y, e.arcgisOnlineProvider = l, e.FeatureLayerProvider = b, e.featureLayerProvider = d, e.MapServiceProvider = C, e.mapServiceProvider = h, e.GeocodeServiceProvider = S, e.geocodeServiceProvider = c, e.WorldGeocodingServiceUrl = g, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});;
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e.Leaflet = e.Leaflet || {}, e.Leaflet.markercluster = e.Leaflet.markercluster || {}))
}(this, function (e) {
    "use strict";
    var t = L.MarkerClusterGroup = L.FeatureGroup.extend({
        options: {
            maxClusterRadius: 80,
            iconCreateFunction: null,
            clusterPane: L.Marker.prototype.options.pane,
            spiderfyOnMaxZoom: !0,
            showCoverageOnHover: !0,
            zoomToBoundsOnClick: !0,
            singleMarkerMode: !1,
            disableClusteringAtZoom: null,
            removeOutsideVisibleBounds: !0,
            animate: !0,
            animateAddingMarkers: !1,
            spiderfyDistanceMultiplier: 1,
            spiderLegPolylineOptions: {
                weight: 1.5,
                color: "#222",
                opacity: .5
            },
            chunkedLoading: !1,
            chunkInterval: 200,
            chunkDelay: 50,
            chunkProgress: null,
            polygonOptions: {}
        },
        initialize: function (e) {
            L.Util.setOptions(this, e), this.options.iconCreateFunction || (this.options.iconCreateFunction = this._defaultIconCreateFunction), this._featureGroup = L.featureGroup(), this._featureGroup.addEventParent(this), this._nonPointGroup = L.featureGroup(), this._nonPointGroup.addEventParent(this), this._inZoomAnimation = 0, this._needsClustering = [], this._needsRemoving = [], this._currentShownBounds = null, this._queue = [], this._childMarkerEventHandlers = {
                dragstart: this._childMarkerDragStart,
                move: this._childMarkerMoved,
                dragend: this._childMarkerDragEnd
            };
            var t = L.DomUtil.TRANSITION && this.options.animate;
            L.extend(this, t ? this._withAnimation : this._noAnimation), this._markerCluster = t ? L.MarkerCluster : L.MarkerClusterNonAnimated
        },
        addLayer: function (e) {
            if (e instanceof L.LayerGroup) return this.addLayers([e]);
            if (!e.getLatLng) return this._nonPointGroup.addLayer(e), this.fire("layeradd", {
                layer: e
            }), this;
            if (!this._map) return this._needsClustering.push(e), this.fire("layeradd", {
                layer: e
            }), this;
            if (this.hasLayer(e)) return this;
            this._unspiderfy && this._unspiderfy(), this._addLayer(e, this._maxZoom), this.fire("layeradd", {
                layer: e
            }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons();
            var t = e,
                i = this._zoom;
            if (e.__parent)
                for (; t.__parent._zoom >= i;) t = t.__parent;
            return this._currentShownBounds.contains(t.getLatLng()) && (this.options.animateAddingMarkers ? this._animationAddLayer(e, t) : this._animationAddLayerNonAnimated(e, t)), this
        },
        removeLayer: function (e) {
            return e instanceof L.LayerGroup ? this.removeLayers([e]) : e.getLatLng ? this._map ? e.__parent ? (this._unspiderfy && (this._unspiderfy(), this._unspiderfyLayer(e)), this._removeLayer(e, !0), this.fire("layerremove", {
                layer: e
            }), this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), e.off(this._childMarkerEventHandlers, this), this._featureGroup.hasLayer(e) && (this._featureGroup.removeLayer(e), e.clusterShow && e.clusterShow()), this) : this : (!this._arraySplice(this._needsClustering, e) && this.hasLayer(e) && this._needsRemoving.push({
                layer: e,
                latlng: e._latlng
            }), this.fire("layerremove", {
                layer: e
            }), this) : (this._nonPointGroup.removeLayer(e), this.fire("layerremove", {
                layer: e
            }), this)
        },
        addLayers: function (e, t) {
            if (!L.Util.isArray(e)) return this.addLayer(e);
            var i, n = this._featureGroup,
                r = this._nonPointGroup,
                s = this.options.chunkedLoading,
                o = this.options.chunkInterval,
                a = this.options.chunkProgress,
                h = e.length,
                l = 0,
                u = !0;
            if (this._map) {
                var _ = (new Date).getTime(),
                    d = L.bind(function () {
                        for (var c = (new Date).getTime(); h > l; l++) {
                            if (s && 0 === l % 200) {
                                var p = (new Date).getTime() - c;
                                if (p > o) break
                            }
                            if (i = e[l], i instanceof L.LayerGroup) u && (e = e.slice(), u = !1), this._extractNonGroupLayers(i, e), h = e.length;
                            else if (i.getLatLng) {
                                if (!this.hasLayer(i) && (this._addLayer(i, this._maxZoom), t || this.fire("layeradd", {
                                    layer: i
                                }), i.__parent && 2 === i.__parent.getChildCount())) {
                                    var f = i.__parent.getAllChildMarkers(),
                                        m = f[0] === i ? f[1] : f[0];
                                    n.removeLayer(m)
                                }
                            } else r.addLayer(i), t || this.fire("layeradd", {
                                layer: i
                            })
                        }
                        a && a(l, h, (new Date).getTime() - _), l === h ? (this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds)) : setTimeout(d, this.options.chunkDelay)
                    }, this);
                d()
            } else
                for (var c = this._needsClustering; h > l; l++) i = e[l], i instanceof L.LayerGroup ? (u && (e = e.slice(), u = !1), this._extractNonGroupLayers(i, e), h = e.length) : i.getLatLng ? this.hasLayer(i) || c.push(i) : r.addLayer(i);
            return this
        },
        removeLayers: function (e) {
            var t, i, n = e.length,
                r = this._featureGroup,
                s = this._nonPointGroup,
                o = !0;
            if (!this._map) {
                for (t = 0; n > t; t++) i = e[t], i instanceof L.LayerGroup ? (o && (e = e.slice(), o = !1), this._extractNonGroupLayers(i, e), n = e.length) : (this._arraySplice(this._needsClustering, i), s.removeLayer(i), this.hasLayer(i) && this._needsRemoving.push({
                    layer: i,
                    latlng: i._latlng
                }), this.fire("layerremove", {
                    layer: i
                }));
                return this
            }
            if (this._unspiderfy) {
                this._unspiderfy();
                var a = e.slice(),
                    h = n;
                for (t = 0; h > t; t++) i = a[t], i instanceof L.LayerGroup ? (this._extractNonGroupLayers(i, a), h = a.length) : this._unspiderfyLayer(i)
            }
            for (t = 0; n > t; t++) i = e[t], i instanceof L.LayerGroup ? (o && (e = e.slice(), o = !1), this._extractNonGroupLayers(i, e), n = e.length) : i.__parent ? (this._removeLayer(i, !0, !0), this.fire("layerremove", {
                layer: i
            }), r.hasLayer(i) && (r.removeLayer(i), i.clusterShow && i.clusterShow())) : (s.removeLayer(i), this.fire("layerremove", {
                layer: i
            }));
            return this._topClusterLevel._recalculateBounds(), this._refreshClustersIcons(), this._topClusterLevel._recursivelyAddChildrenToMap(null, this._zoom, this._currentShownBounds), this
        },
        clearLayers: function () {
            return this._map || (this._needsClustering = [], this._needsRemoving = [], delete this._gridClusters, delete this._gridUnclustered), this._noanimationUnspiderfy && this._noanimationUnspiderfy(), this._featureGroup.clearLayers(), this._nonPointGroup.clearLayers(), this.eachLayer(function (e) {
                e.off(this._childMarkerEventHandlers, this), delete e.__parent
            }, this), this._map && this._generateInitialClusters(), this
        },
        getBounds: function () {
            var e = new L.LatLngBounds;
            this._topClusterLevel && e.extend(this._topClusterLevel._bounds);
            for (var t = this._needsClustering.length - 1; t >= 0; t--) e.extend(this._needsClustering[t].getLatLng());
            return e.extend(this._nonPointGroup.getBounds()), e
        },
        eachLayer: function (e, t) {
            var i, n, r, s = this._needsClustering.slice(),
                o = this._needsRemoving;
            for (this._topClusterLevel && this._topClusterLevel.getAllChildMarkers(s), n = s.length - 1; n >= 0; n--) {
                for (i = !0, r = o.length - 1; r >= 0; r--)
                    if (o[r].layer === s[n]) {
                        i = !1;
                        break
                    } i && e.call(t, s[n])
            }
            this._nonPointGroup.eachLayer(e, t)
        },
        getLayers: function () {
            var e = [];
            return this.eachLayer(function (t) {
                e.push(t)
            }), e
        },
        getLayer: function (e) {
            var t = null;
            return e = parseInt(e, 10), this.eachLayer(function (i) {
                L.stamp(i) === e && (t = i)
            }), t
        },
        hasLayer: function (e) {
            if (!e) return !1;
            var t, i = this._needsClustering;
            for (t = i.length - 1; t >= 0; t--)
                if (i[t] === e) return !0;
            for (i = this._needsRemoving, t = i.length - 1; t >= 0; t--)
                if (i[t].layer === e) return !1;
            return !(!e.__parent || e.__parent._group !== this) || this._nonPointGroup.hasLayer(e)
        },
        zoomToShowLayer: function (e, t) {
            "function" != typeof t && (t = function () { });
            var i = function () {
                !e._icon && !e.__parent._icon || this._inZoomAnimation || (this._map.off("moveend", i, this), this.off("animationend", i, this), e._icon ? t() : e.__parent._icon && (this.once("spiderfied", t, this), e.__parent.spiderfy()))
            };
            e._icon && this._map.getBounds().contains(e.getLatLng()) ? t() : e.__parent._zoom < Math.round(this._map._zoom) ? (this._map.on("moveend", i, this), this._map.panTo(e.getLatLng())) : (this._map.on("moveend", i, this), this.on("animationend", i, this), e.__parent.zoomToBounds())
        },
        onAdd: function (e) {
            this._map = e;
            var t, i, n;
            if (!isFinite(this._map.getMaxZoom())) throw "Map has no maxZoom specified";
            for (this._featureGroup.addTo(e), this._nonPointGroup.addTo(e), this._gridClusters || this._generateInitialClusters(), this._maxLat = e.options.crs.projection.MAX_LATITUDE, t = 0, i = this._needsRemoving.length; i > t; t++) n = this._needsRemoving[t], n.newlatlng = n.layer._latlng, n.layer._latlng = n.latlng;
            for (t = 0, i = this._needsRemoving.length; i > t; t++) n = this._needsRemoving[t], this._removeLayer(n.layer, !0), n.layer._latlng = n.newlatlng;
            this._needsRemoving = [], this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds(), this._map.on("zoomend", this._zoomEnd, this), this._map.on("moveend", this._moveEnd, this), this._spiderfierOnAdd && this._spiderfierOnAdd(), this._bindEvents(), i = this._needsClustering, this._needsClustering = [], this.addLayers(i, !0)
        },
        onRemove: function (e) {
            e.off("zoomend", this._zoomEnd, this), e.off("moveend", this._moveEnd, this), this._unbindEvents(), this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", ""), this._spiderfierOnRemove && this._spiderfierOnRemove(), delete this._maxLat, this._hideCoverage(), this._featureGroup.remove(), this._nonPointGroup.remove(), this._featureGroup.clearLayers(), this._map = null
        },
        getVisibleParent: function (e) {
            for (var t = e; t && !t._icon;) t = t.__parent;
            return t || null
        },
        _arraySplice: function (e, t) {
            for (var i = e.length - 1; i >= 0; i--)
                if (e[i] === t) return e.splice(i, 1), !0
        },
        _removeFromGridUnclustered: function (e, t) {
            for (var i = this._map, n = this._gridUnclustered, r = Math.floor(this._map.getMinZoom()); t >= r && n[t].removeObject(e, i.project(e.getLatLng(), t)); t--);
        },
        _childMarkerDragStart: function (e) {
            e.target.__dragStart = e.target._latlng
        },
        _childMarkerMoved: function (e) {
            if (!this._ignoreMove && !e.target.__dragStart) {
                var t = e.target._popup && e.target._popup.isOpen();
                this._moveChild(e.target, e.oldLatLng, e.latlng), t && e.target.openPopup()
            }
        },
        _moveChild: function (e, t, i) {
            e._latlng = t, this.removeLayer(e), e._latlng = i, this.addLayer(e)
        },
        _childMarkerDragEnd: function (e) {
            var t = e.target.__dragStart;
            delete e.target.__dragStart, t && this._moveChild(e.target, t, e.target._latlng)
        },
        _removeLayer: function (e, t, i) {
            var n = this._gridClusters,
                r = this._gridUnclustered,
                s = this._featureGroup,
                o = this._map,
                a = Math.floor(this._map.getMinZoom());
            t && this._removeFromGridUnclustered(e, this._maxZoom);
            var h, l = e.__parent,
                u = l._markers;
            for (this._arraySplice(u, e); l && (l._childCount--, l._boundsNeedUpdate = !0, !(l._zoom < a));) t && l._childCount <= 1 ? (h = l._markers[0] === e ? l._markers[1] : l._markers[0], n[l._zoom].removeObject(l, o.project(l._cLatLng, l._zoom)), r[l._zoom].addObject(h, o.project(h.getLatLng(), l._zoom)), this._arraySplice(l.__parent._childClusters, l), l.__parent._markers.push(h), h.__parent = l.__parent, l._icon && (s.removeLayer(l), i || s.addLayer(h))) : l._iconNeedsUpdate = !0, l = l.__parent;
            delete e.__parent
        },
        _isOrIsParent: function (e, t) {
            for (; t;) {
                if (e === t) return !0;
                t = t.parentNode
            }
            return !1
        },
        fire: function (e, t, i) {
            if (t && t.layer instanceof L.MarkerCluster) {
                if (t.originalEvent && this._isOrIsParent(t.layer._icon, t.originalEvent.relatedTarget)) return;
                e = "cluster" + e
            }
            L.FeatureGroup.prototype.fire.call(this, e, t, i)
        },
        listens: function (e, t) {
            return L.FeatureGroup.prototype.listens.call(this, e, t) || L.FeatureGroup.prototype.listens.call(this, "cluster" + e, t)
        },
        _defaultIconCreateFunction: function (e) {
            var t = e.getChildCount(),
                i = " marker-cluster-";
            return i += 10 > t ? "small" : 100 > t ? "medium" : "large", new L.DivIcon({
                html: "<div><span>" + t + "</span></div>",
                className: "marker-cluster" + i,
                iconSize: new L.Point(40, 40)
            })
        },
        _bindEvents: function () {
            var e = this._map,
                t = this.options.spiderfyOnMaxZoom,
                i = this.options.showCoverageOnHover,
                n = this.options.zoomToBoundsOnClick;
            (t || n) && this.on("clusterclick", this._zoomOrSpiderfy, this), i && (this.on("clustermouseover", this._showCoverage, this), this.on("clustermouseout", this._hideCoverage, this), e.on("zoomend", this._hideCoverage, this))
        },
        _zoomOrSpiderfy: function (e) {
            for (var t = e.layer, i = t; 1 === i._childClusters.length;) i = i._childClusters[0];
            i._zoom === this._maxZoom && i._childCount === t._childCount && this.options.spiderfyOnMaxZoom ? t.spiderfy() : this.options.zoomToBoundsOnClick && t.zoomToBounds(), e.originalEvent && 13 === e.originalEvent.keyCode && this._map._container.focus()
        },
        _showCoverage: function (e) {
            var t = this._map;
            this._inZoomAnimation || (this._shownPolygon && t.removeLayer(this._shownPolygon), e.layer.getChildCount() > 2 && e.layer !== this._spiderfied && (this._shownPolygon = new L.Polygon(e.layer.getConvexHull(), this.options.polygonOptions), t.addLayer(this._shownPolygon)))
        },
        _hideCoverage: function () {
            this._shownPolygon && (this._map.removeLayer(this._shownPolygon), this._shownPolygon = null)
        },
        _unbindEvents: function () {
            var e = this.options.spiderfyOnMaxZoom,
                t = this.options.showCoverageOnHover,
                i = this.options.zoomToBoundsOnClick,
                n = this._map;
            (e || i) && this.off("clusterclick", this._zoomOrSpiderfy, this), t && (this.off("clustermouseover", this._showCoverage, this), this.off("clustermouseout", this._hideCoverage, this), n.off("zoomend", this._hideCoverage, this))
        },
        _zoomEnd: function () {
            this._map && (this._mergeSplitClusters(), this._zoom = Math.round(this._map._zoom), this._currentShownBounds = this._getExpandedVisibleBounds())
        },
        _moveEnd: function () {
            if (!this._inZoomAnimation) {
                var e = this._getExpandedVisibleBounds();
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, e), this._topClusterLevel._recursivelyAddChildrenToMap(null, Math.round(this._map._zoom), e), this._currentShownBounds = e
            }
        },
        _generateInitialClusters: function () {
            var e = Math.ceil(this._map.getMaxZoom()),
                t = Math.floor(this._map.getMinZoom()),
                i = this.options.maxClusterRadius,
                n = i;
            "function" != typeof i && (n = function () {
                return i
            }), null !== this.options.disableClusteringAtZoom && (e = this.options.disableClusteringAtZoom - 1), this._maxZoom = e, this._gridClusters = {}, this._gridUnclustered = {};
            for (var r = e; r >= t; r--) this._gridClusters[r] = new L.DistanceGrid(n(r)), this._gridUnclustered[r] = new L.DistanceGrid(n(r));
            this._topClusterLevel = new this._markerCluster(this, t - 1)
        },
        _addLayer: function (e, t) {
            var i, n, r = this._gridClusters,
                s = this._gridUnclustered,
                o = Math.floor(this._map.getMinZoom());
            for (this.options.singleMarkerMode && this._overrideMarkerIcon(e), e.on(this._childMarkerEventHandlers, this); t >= o; t--) {
                i = this._map.project(e.getLatLng(), t);
                var a = r[t].getNearObject(i);
                if (a) return a._addChild(e), e.__parent = a, void 0;
                if (a = s[t].getNearObject(i)) {
                    var h = a.__parent;
                    h && this._removeLayer(a, !1);
                    var l = new this._markerCluster(this, t, a, e);
                    r[t].addObject(l, this._map.project(l._cLatLng, t)), a.__parent = l, e.__parent = l;
                    var u = l;
                    for (n = t - 1; n > h._zoom; n--) u = new this._markerCluster(this, n, u), r[n].addObject(u, this._map.project(a.getLatLng(), n));
                    return h._addChild(u), this._removeFromGridUnclustered(a, t), void 0
                }
                s[t].addObject(e, i)
            }
            this._topClusterLevel._addChild(e), e.__parent = this._topClusterLevel
        },
        _refreshClustersIcons: function () {
            this._featureGroup.eachLayer(function (e) {
                e instanceof L.MarkerCluster && e._iconNeedsUpdate && e._updateIcon()
            })
        },
        _enqueue: function (e) {
            this._queue.push(e), this._queueTimeout || (this._queueTimeout = setTimeout(L.bind(this._processQueue, this), 300))
        },
        _processQueue: function () {
            for (var e = 0; e < this._queue.length; e++) this._queue[e].call(this);
            this._queue.length = 0, clearTimeout(this._queueTimeout), this._queueTimeout = null
        },
        _mergeSplitClusters: function () {
            var e = Math.round(this._map._zoom);
            this._processQueue(), this._zoom < e && this._currentShownBounds.intersects(this._getExpandedVisibleBounds()) ? (this._animationStart(), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), this._zoom, this._getExpandedVisibleBounds()), this._animationZoomIn(this._zoom, e)) : this._zoom > e ? (this._animationStart(), this._animationZoomOut(this._zoom, e)) : this._moveEnd()
        },
        _getExpandedVisibleBounds: function () {
            return this.options.removeOutsideVisibleBounds ? L.Browser.mobile ? this._checkBoundsMaxLat(this._map.getBounds()) : this._checkBoundsMaxLat(this._map.getBounds().pad(1)) : this._mapBoundsInfinite
        },
        _checkBoundsMaxLat: function (e) {
            var t = this._maxLat;
            return void 0 !== t && (e.getNorth() >= t && (e._northEast.lat = 1 / 0), e.getSouth() <= -t && (e._southWest.lat = -1 / 0)), e
        },
        _animationAddLayerNonAnimated: function (e, t) {
            if (t === e) this._featureGroup.addLayer(e);
            else if (2 === t._childCount) {
                t._addToMap();
                var i = t.getAllChildMarkers();
                this._featureGroup.removeLayer(i[0]), this._featureGroup.removeLayer(i[1])
            } else t._updateIcon()
        },
        _extractNonGroupLayers: function (e, t) {
            var i, n = e.getLayers(),
                r = 0;
            for (t = t || []; r < n.length; r++) i = n[r], i instanceof L.LayerGroup ? this._extractNonGroupLayers(i, t) : t.push(i);
            return t
        },
        _overrideMarkerIcon: function (e) {
            var t = e.options.icon = this.options.iconCreateFunction({
                getChildCount: function () {
                    return 1
                },
                getAllChildMarkers: function () {
                    return [e]
                }
            });
            return t
        }
    });
    L.MarkerClusterGroup.include({
        _mapBoundsInfinite: new L.LatLngBounds(new L.LatLng(-1 / 0, -1 / 0), new L.LatLng(1 / 0, 1 / 0))
    }), L.MarkerClusterGroup.include({
        _noAnimation: {
            _animationStart: function () { },
            _animationZoomIn: function (e, t) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()), this.fire("animationend")
            },
            _animationZoomOut: function (e, t) {
                this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()), this.fire("animationend")
            },
            _animationAddLayer: function (e, t) {
                this._animationAddLayerNonAnimated(e, t)
            }
        },
        _withAnimation: {
            _animationStart: function () {
                this._map._mapPane.className += " leaflet-cluster-anim", this._inZoomAnimation++
            },
            _animationZoomIn: function (e, t) {
                var i, n = this._getExpandedVisibleBounds(),
                    r = this._featureGroup,
                    s = Math.floor(this._map.getMinZoom());
                this._ignoreMove = !0, this._topClusterLevel._recursively(n, e, s, function (s) {
                    var o, a = s._latlng,
                        h = s._markers;
                    for (n.contains(a) || (a = null), s._isSingleParent() && e + 1 === t ? (r.removeLayer(s), s._recursivelyAddChildrenToMap(null, t, n)) : (s.clusterHide(), s._recursivelyAddChildrenToMap(a, t, n)), i = h.length - 1; i >= 0; i--) o = h[i], n.contains(o._latlng) || r.removeLayer(o)
                }), this._forceLayout(), this._topClusterLevel._recursivelyBecomeVisible(n, t), r.eachLayer(function (e) {
                    e instanceof L.MarkerCluster || !e._icon || e.clusterShow()
                }), this._topClusterLevel._recursively(n, e, t, function (e) {
                    e._recursivelyRestoreChildPositions(t)
                }), this._ignoreMove = !1, this._enqueue(function () {
                    this._topClusterLevel._recursively(n, e, s, function (e) {
                        r.removeLayer(e), e.clusterShow()
                    }), this._animationEnd()
                })
            },
            _animationZoomOut: function (e, t) {
                this._animationZoomOutSingle(this._topClusterLevel, e - 1, t), this._topClusterLevel._recursivelyAddChildrenToMap(null, t, this._getExpandedVisibleBounds()), this._topClusterLevel._recursivelyRemoveChildrenFromMap(this._currentShownBounds, Math.floor(this._map.getMinZoom()), e, this._getExpandedVisibleBounds())
            },
            _animationAddLayer: function (e, t) {
                var i = this,
                    n = this._featureGroup;
                n.addLayer(e), t !== e && (t._childCount > 2 ? (t._updateIcon(), this._forceLayout(), this._animationStart(), e._setPos(this._map.latLngToLayerPoint(t.getLatLng())), e.clusterHide(), this._enqueue(function () {
                    n.removeLayer(e), e.clusterShow(), i._animationEnd()
                })) : (this._forceLayout(), i._animationStart(), i._animationZoomOutSingle(t, this._map.getMaxZoom(), this._zoom)))
            }
        },
        _animationZoomOutSingle: function (e, t, i) {
            var n = this._getExpandedVisibleBounds(),
                r = Math.floor(this._map.getMinZoom());
            e._recursivelyAnimateChildrenInAndAddSelfToMap(n, r, t + 1, i);
            var s = this;
            this._forceLayout(), e._recursivelyBecomeVisible(n, i), this._enqueue(function () {
                if (1 === e._childCount) {
                    var o = e._markers[0];
                    this._ignoreMove = !0, o.setLatLng(o.getLatLng()), this._ignoreMove = !1, o.clusterShow && o.clusterShow()
                } else e._recursively(n, i, r, function (e) {
                    e._recursivelyRemoveChildrenFromMap(n, r, t + 1)
                });
                s._animationEnd()
            })
        },
        _animationEnd: function () {
            this._map && (this._map._mapPane.className = this._map._mapPane.className.replace(" leaflet-cluster-anim", "")), this._inZoomAnimation--, this.fire("animationend")
        },
        _forceLayout: function () {
            L.Util.falseFn(document.body.offsetWidth)
        }
    }), L.markerClusterGroup = function (e) {
        return new L.MarkerClusterGroup(e)
    };
    var i = L.MarkerCluster = L.Marker.extend({
        options: L.Icon.prototype.options,
        initialize: function (e, t, i, n) {
            L.Marker.prototype.initialize.call(this, i ? i._cLatLng || i.getLatLng() : new L.LatLng(0, 0), {
                icon: this,
                pane: e.options.clusterPane
            }), this._group = e, this._zoom = t, this._markers = [], this._childClusters = [], this._childCount = 0, this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._bounds = new L.LatLngBounds, i && this._addChild(i), n && this._addChild(n)
        },
        getAllChildMarkers: function (e, t) {
            e = e || [];
            for (var i = this._childClusters.length - 1; i >= 0; i--) this._childClusters[i].getAllChildMarkers(e);
            for (var n = this._markers.length - 1; n >= 0; n--) t && this._markers[n].__dragStart || e.push(this._markers[n]);
            return e
        },
        getChildCount: function () {
            return this._childCount
        },
        zoomToBounds: function (e) {
            for (var t, i = this._childClusters.slice(), n = this._group._map, r = n.getBoundsZoom(this._bounds), s = this._zoom + 1, o = n.getZoom(); i.length > 0 && r > s;) {
                s++;
                var a = [];
                for (t = 0; t < i.length; t++) a = a.concat(i[t]._childClusters);
                i = a
            }
            r > s ? this._group._map.setView(this._latlng, s) : o >= r ? this._group._map.setView(this._latlng, o + 1) : this._group._map.fitBounds(this._bounds, e)
        },
        getBounds: function () {
            var e = new L.LatLngBounds;
            return e.extend(this._bounds), e
        },
        _updateIcon: function () {
            this._iconNeedsUpdate = !0, this._icon && this.setIcon(this)
        },
        createIcon: function () {
            return this._iconNeedsUpdate && (this._iconObj = this._group.options.iconCreateFunction(this), this._iconNeedsUpdate = !1), this._iconObj.createIcon()
        },
        createShadow: function () {
            return this._iconObj.createShadow()
        },
        _addChild: function (e, t) {
            this._iconNeedsUpdate = !0, this._boundsNeedUpdate = !0, this._setClusterCenter(e), e instanceof L.MarkerCluster ? (t || (this._childClusters.push(e), e.__parent = this), this._childCount += e._childCount) : (t || this._markers.push(e), this._childCount++), this.__parent && this.__parent._addChild(e, !0)
        },
        _setClusterCenter: function (e) {
            this._cLatLng || (this._cLatLng = e._cLatLng || e._latlng)
        },
        _resetBounds: function () {
            var e = this._bounds;
            e._southWest && (e._southWest.lat = 1 / 0, e._southWest.lng = 1 / 0), e._northEast && (e._northEast.lat = -1 / 0, e._northEast.lng = -1 / 0)
        },
        _recalculateBounds: function () {
            var e, t, i, n, r = this._markers,
                s = this._childClusters,
                o = 0,
                a = 0,
                h = this._childCount;
            if (0 !== h) {
                for (this._resetBounds(), e = 0; e < r.length; e++) i = r[e]._latlng, this._bounds.extend(i), o += i.lat, a += i.lng;
                for (e = 0; e < s.length; e++) t = s[e], t._boundsNeedUpdate && t._recalculateBounds(), this._bounds.extend(t._bounds), i = t._wLatLng, n = t._childCount, o += i.lat * n, a += i.lng * n;
                this._latlng = this._wLatLng = new L.LatLng(o / h, a / h), this._boundsNeedUpdate = !1
            }
        },
        _addToMap: function (e) {
            e && (this._backupLatlng = this._latlng, this.setLatLng(e)), this._group._featureGroup.addLayer(this)
        },
        _recursivelyAnimateChildrenIn: function (e, t, i) {
            this._recursively(e, this._group._map.getMinZoom(), i - 1, function (e) {
                var i, n, r = e._markers;
                for (i = r.length - 1; i >= 0; i--) n = r[i], n._icon && (n._setPos(t), n.clusterHide())
            }, function (e) {
                var i, n, r = e._childClusters;
                for (i = r.length - 1; i >= 0; i--) n = r[i], n._icon && (n._setPos(t), n.clusterHide())
            })
        },
        _recursivelyAnimateChildrenInAndAddSelfToMap: function (e, t, i, n) {
            this._recursively(e, n, t, function (r) {
                r._recursivelyAnimateChildrenIn(e, r._group._map.latLngToLayerPoint(r.getLatLng()).round(), i), r._isSingleParent() && i - 1 === n ? (r.clusterShow(), r._recursivelyRemoveChildrenFromMap(e, t, i)) : r.clusterHide(), r._addToMap()
            })
        },
        _recursivelyBecomeVisible: function (e, t) {
            this._recursively(e, this._group._map.getMinZoom(), t, null, function (e) {
                e.clusterShow()
            })
        },
        _recursivelyAddChildrenToMap: function (e, t, i) {
            this._recursively(i, this._group._map.getMinZoom() - 1, t, function (n) {
                if (t !== n._zoom)
                    for (var r = n._markers.length - 1; r >= 0; r--) {
                        var s = n._markers[r];
                        i.contains(s._latlng) && (e && (s._backupLatlng = s.getLatLng(), s.setLatLng(e), s.clusterHide && s.clusterHide()), n._group._featureGroup.addLayer(s))
                    }
            }, function (t) {
                t._addToMap(e)
            })
        },
        _recursivelyRestoreChildPositions: function (e) {
            for (var t = this._markers.length - 1; t >= 0; t--) {
                var i = this._markers[t];
                i._backupLatlng && (i.setLatLng(i._backupLatlng), delete i._backupLatlng)
            }
            if (e - 1 === this._zoom)
                for (var n = this._childClusters.length - 1; n >= 0; n--) this._childClusters[n]._restorePosition();
            else
                for (var r = this._childClusters.length - 1; r >= 0; r--) this._childClusters[r]._recursivelyRestoreChildPositions(e)
        },
        _restorePosition: function () {
            this._backupLatlng && (this.setLatLng(this._backupLatlng), delete this._backupLatlng)
        },
        _recursivelyRemoveChildrenFromMap: function (e, t, i, n) {
            var r, s;
            this._recursively(e, t - 1, i - 1, function (e) {
                for (s = e._markers.length - 1; s >= 0; s--) r = e._markers[s], n && n.contains(r._latlng) || (e._group._featureGroup.removeLayer(r), r.clusterShow && r.clusterShow())
            }, function (e) {
                for (s = e._childClusters.length - 1; s >= 0; s--) r = e._childClusters[s], n && n.contains(r._latlng) || (e._group._featureGroup.removeLayer(r), r.clusterShow && r.clusterShow())
            })
        },
        _recursively: function (e, t, i, n, r) {
            var s, o, a = this._childClusters,
                h = this._zoom;
            if (h >= t && (n && n(this), r && h === i && r(this)), t > h || i > h)
                for (s = a.length - 1; s >= 0; s--) o = a[s], o._boundsNeedUpdate && o._recalculateBounds(), e.intersects(o._bounds) && o._recursively(e, t, i, n, r)
        },
        _isSingleParent: function () {
            return this._childClusters.length > 0 && this._childClusters[0]._childCount === this._childCount
        }
    });
    L.Marker.include({
        clusterHide: function () {
            var e = this.options.opacity;
            return this.setOpacity(0), this.options.opacity = e, this
        },
        clusterShow: function () {
            return this.setOpacity(this.options.opacity)
        }
    }), L.DistanceGrid = function (e) {
        this._cellSize = e, this._sqCellSize = e * e, this._grid = {}, this._objectPoint = {}
    }, L.DistanceGrid.prototype = {
        addObject: function (e, t) {
            var i = this._getCoord(t.x),
                n = this._getCoord(t.y),
                r = this._grid,
                s = r[n] = r[n] || {},
                o = s[i] = s[i] || [],
                a = L.Util.stamp(e);
            this._objectPoint[a] = t, o.push(e)
        },
        updateObject: function (e, t) {
            this.removeObject(e), this.addObject(e, t)
        },
        removeObject: function (e, t) {
            var i, n, r = this._getCoord(t.x),
                s = this._getCoord(t.y),
                o = this._grid,
                a = o[s] = o[s] || {},
                h = a[r] = a[r] || [];
            for (delete this._objectPoint[L.Util.stamp(e)], i = 0, n = h.length; n > i; i++)
                if (h[i] === e) return h.splice(i, 1), 1 === n && delete a[r], !0
        },
        eachObject: function (e, t) {
            var i, n, r, s, o, a, h, l = this._grid;
            for (i in l) {
                o = l[i];
                for (n in o)
                    for (a = o[n], r = 0, s = a.length; s > r; r++) h = e.call(t, a[r]), h && (r--, s--)
            }
        },
        getNearObject: function (e) {
            var t, i, n, r, s, o, a, h, l = this._getCoord(e.x),
                u = this._getCoord(e.y),
                _ = this._objectPoint,
                d = this._sqCellSize,
                c = null;
            for (t = u - 1; u + 1 >= t; t++)
                if (r = this._grid[t])
                    for (i = l - 1; l + 1 >= i; i++)
                        if (s = r[i])
                            for (n = 0, o = s.length; o > n; n++) a = s[n], h = this._sqDist(_[L.Util.stamp(a)], e), (d > h || d >= h && null === c) && (d = h, c = a);
            return c
        },
        _getCoord: function (e) {
            var t = Math.floor(e / this._cellSize);
            return isFinite(t) ? t : e
        },
        _sqDist: function (e, t) {
            var i = t.x - e.x,
                n = t.y - e.y;
            return i * i + n * n
        }
    },
        function () {
            L.QuickHull = {
                getDistant: function (e, t) {
                    var i = t[1].lat - t[0].lat,
                        n = t[0].lng - t[1].lng;
                    return n * (e.lat - t[0].lat) + i * (e.lng - t[0].lng)
                },
                findMostDistantPointFromBaseLine: function (e, t) {
                    var i, n, r, s = 0,
                        o = null,
                        a = [];
                    for (i = t.length - 1; i >= 0; i--) n = t[i], r = this.getDistant(n, e), r > 0 && (a.push(n), r > s && (s = r, o = n));
                    return {
                        maxPoint: o,
                        newPoints: a
                    }
                },
                buildConvexHull: function (e, t) {
                    var i = [],
                        n = this.findMostDistantPointFromBaseLine(e, t);
                    return n.maxPoint ? (i = i.concat(this.buildConvexHull([e[0], n.maxPoint], n.newPoints)), i = i.concat(this.buildConvexHull([n.maxPoint, e[1]], n.newPoints))) : [e[0]]
                },
                getConvexHull: function (e) {
                    var t, i = !1,
                        n = !1,
                        r = !1,
                        s = !1,
                        o = null,
                        a = null,
                        h = null,
                        l = null,
                        u = null,
                        _ = null;
                    for (t = e.length - 1; t >= 0; t--) {
                        var d = e[t];
                        (i === !1 || d.lat > i) && (o = d, i = d.lat), (n === !1 || d.lat < n) && (a = d, n = d.lat), (r === !1 || d.lng > r) && (h = d, r = d.lng), (s === !1 || d.lng < s) && (l = d, s = d.lng)
                    }
                    n !== i ? (_ = a, u = o) : (_ = l, u = h);
                    var c = [].concat(this.buildConvexHull([_, u], e), this.buildConvexHull([u, _], e));
                    return c
                }
            }
        }(), L.MarkerCluster.include({
            getConvexHull: function () {
                var e, t, i = this.getAllChildMarkers(),
                    n = [];
                for (t = i.length - 1; t >= 0; t--) e = i[t].getLatLng(), n.push(e);
                return L.QuickHull.getConvexHull(n)
            }
        }), L.MarkerCluster.include({
            _2PI: 2 * Math.PI,
            _circleFootSeparation: 25,
            _circleStartAngle: 0,
            _spiralFootSeparation: 28,
            _spiralLengthStart: 11,
            _spiralLengthFactor: 5,
            _circleSpiralSwitchover: 9,
            spiderfy: function () {
                if (this._group._spiderfied !== this && !this._group._inZoomAnimation) {
                    var e, t = this.getAllChildMarkers(null, !0),
                        i = this._group,
                        n = i._map,
                        r = n.latLngToLayerPoint(this._latlng);
                    this._group._unspiderfy(), this._group._spiderfied = this, t.length >= this._circleSpiralSwitchover ? e = this._generatePointsSpiral(t.length, r) : (r.y += 10, e = this._generatePointsCircle(t.length, r)), this._animationSpiderfy(t, e)
                }
            },
            unspiderfy: function (e) {
                this._group._inZoomAnimation || (this._animationUnspiderfy(e), this._group._spiderfied = null)
            },
            _generatePointsCircle: function (e, t) {
                var i, n, r = this._group.options.spiderfyDistanceMultiplier * this._circleFootSeparation * (2 + e),
                    s = r / this._2PI,
                    o = this._2PI / e,
                    a = [];
                for (s = Math.max(s, 35), a.length = e, i = 0; e > i; i++) n = this._circleStartAngle + i * o, a[i] = new L.Point(t.x + s * Math.cos(n), t.y + s * Math.sin(n))._round();
                return a
            },
            _generatePointsSpiral: function (e, t) {
                var i, n = this._group.options.spiderfyDistanceMultiplier,
                    r = n * this._spiralLengthStart,
                    s = n * this._spiralFootSeparation,
                    o = n * this._spiralLengthFactor * this._2PI,
                    a = 0,
                    h = [];
                for (h.length = e, i = e; i >= 0; i--) e > i && (h[i] = new L.Point(t.x + r * Math.cos(a), t.y + r * Math.sin(a))._round()), a += s / r + 5e-4 * i, r += o / a;
                return h
            },
            _noanimationUnspiderfy: function () {
                var e, t, i = this._group,
                    n = i._map,
                    r = i._featureGroup,
                    s = this.getAllChildMarkers(null, !0);
                for (i._ignoreMove = !0, this.setOpacity(1), t = s.length - 1; t >= 0; t--) e = s[t], r.removeLayer(e), e._preSpiderfyLatlng && (e.setLatLng(e._preSpiderfyLatlng), delete e._preSpiderfyLatlng), e.setZIndexOffset && e.setZIndexOffset(0), e._spiderLeg && (n.removeLayer(e._spiderLeg), delete e._spiderLeg);
                i.fire("unspiderfied", {
                    cluster: this,
                    markers: s
                }), i._ignoreMove = !1, i._spiderfied = null
            }
        }), L.MarkerClusterNonAnimated = L.MarkerCluster.extend({
            _animationSpiderfy: function (e, t) {
                var i, n, r, s, o = this._group,
                    a = o._map,
                    h = o._featureGroup,
                    l = this._group.options.spiderLegPolylineOptions;
                for (o._ignoreMove = !0, i = 0; i < e.length; i++) s = a.layerPointToLatLng(t[i]), n = e[i], r = new L.Polyline([this._latlng, s], l), a.addLayer(r), n._spiderLeg = r, n._preSpiderfyLatlng = n._latlng, n.setLatLng(s), n.setZIndexOffset && n.setZIndexOffset(1e6), h.addLayer(n);
                this.setOpacity(.3), o._ignoreMove = !1, o.fire("spiderfied", {
                    cluster: this,
                    markers: e
                })
            },
            _animationUnspiderfy: function () {
                this._noanimationUnspiderfy()
            }
        }), L.MarkerCluster.include({
            _animationSpiderfy: function (e, t) {
                var i, n, r, s, o, a, h = this,
                    l = this._group,
                    u = l._map,
                    _ = l._featureGroup,
                    d = this._latlng,
                    c = u.latLngToLayerPoint(d),
                    p = L.Path.SVG,
                    f = L.extend({}, this._group.options.spiderLegPolylineOptions),
                    m = f.opacity;
                for (void 0 === m && (m = L.MarkerClusterGroup.prototype.options.spiderLegPolylineOptions.opacity), p ? (f.opacity = 0, f.className = (f.className || "") + " leaflet-cluster-spider-leg") : f.opacity = m, l._ignoreMove = !0, i = 0; i < e.length; i++) n = e[i], a = u.layerPointToLatLng(t[i]), r = new L.Polyline([d, a], f), u.addLayer(r), n._spiderLeg = r, p && (s = r._path, o = s.getTotalLength() + .1, s.style.strokeDasharray = o, s.style.strokeDashoffset = o), n.setZIndexOffset && n.setZIndexOffset(1e6), n.clusterHide && n.clusterHide(), _.addLayer(n), n._setPos && n._setPos(c);
                for (l._forceLayout(), l._animationStart(), i = e.length - 1; i >= 0; i--) a = u.layerPointToLatLng(t[i]), n = e[i], n._preSpiderfyLatlng = n._latlng, n.setLatLng(a), n.clusterShow && n.clusterShow(), p && (r = n._spiderLeg, s = r._path, s.style.strokeDashoffset = 0, r.setStyle({
                    opacity: m
                }));
                this.setOpacity(.3), l._ignoreMove = !1, setTimeout(function () {
                    l._animationEnd(), l.fire("spiderfied", {
                        cluster: h,
                        markers: e
                    })
                }, 200)
            },
            _animationUnspiderfy: function (e) {
                var t, i, n, r, s, o, a = this,
                    h = this._group,
                    l = h._map,
                    u = h._featureGroup,
                    _ = e ? l._latLngToNewLayerPoint(this._latlng, e.zoom, e.center) : l.latLngToLayerPoint(this._latlng),
                    d = this.getAllChildMarkers(null, !0),
                    c = L.Path.SVG;
                for (h._ignoreMove = !0, h._animationStart(), this.setOpacity(1), i = d.length - 1; i >= 0; i--) t = d[i], t._preSpiderfyLatlng && (t.closePopup(), t.setLatLng(t._preSpiderfyLatlng), delete t._preSpiderfyLatlng, o = !0, t._setPos && (t._setPos(_), o = !1), t.clusterHide && (t.clusterHide(), o = !1), o && u.removeLayer(t), c && (n = t._spiderLeg, r = n._path, s = r.getTotalLength() + .1, r.style.strokeDashoffset = s, n.setStyle({
                    opacity: 0
                })));
                h._ignoreMove = !1, setTimeout(function () {
                    var e = 0;
                    for (i = d.length - 1; i >= 0; i--) t = d[i], t._spiderLeg && e++;
                    for (i = d.length - 1; i >= 0; i--) t = d[i], t._spiderLeg && (t.clusterShow && t.clusterShow(), t.setZIndexOffset && t.setZIndexOffset(0), e > 1 && u.removeLayer(t), l.removeLayer(t._spiderLeg), delete t._spiderLeg);
                    h._animationEnd(), h.fire("unspiderfied", {
                        cluster: a,
                        markers: d
                    })
                }, 200)
            }
        }), L.MarkerClusterGroup.include({
            _spiderfied: null,
            unspiderfy: function () {
                this._unspiderfy.apply(this, arguments)
            },
            _spiderfierOnAdd: function () {
                this._map.on("click", this._unspiderfyWrapper, this), this._map.options.zoomAnimation && this._map.on("zoomstart", this._unspiderfyZoomStart, this), this._map.on("zoomend", this._noanimationUnspiderfy, this), L.Browser.touch || this._map.getRenderer(this)
            },
            _spiderfierOnRemove: function () {
                this._map.off("click", this._unspiderfyWrapper, this), this._map.off("zoomstart", this._unspiderfyZoomStart, this), this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._map.off("zoomend", this._noanimationUnspiderfy, this), this._noanimationUnspiderfy()
            },
            _unspiderfyZoomStart: function () {
                this._map && this._map.on("zoomanim", this._unspiderfyZoomAnim, this)
            },
            _unspiderfyZoomAnim: function (e) {
                L.DomUtil.hasClass(this._map._mapPane, "leaflet-touching") || (this._map.off("zoomanim", this._unspiderfyZoomAnim, this), this._unspiderfy(e))
            },
            _unspiderfyWrapper: function () {
                this._unspiderfy()
            },
            _unspiderfy: function (e) {
                this._spiderfied && this._spiderfied.unspiderfy(e)
            },
            _noanimationUnspiderfy: function () {
                this._spiderfied && this._spiderfied._noanimationUnspiderfy()
            },
            _unspiderfyLayer: function (e) {
                e._spiderLeg && (this._featureGroup.removeLayer(e), e.clusterShow && e.clusterShow(), e.setZIndexOffset && e.setZIndexOffset(0), this._map.removeLayer(e._spiderLeg), delete e._spiderLeg)
            }
        }), L.MarkerClusterGroup.include({
            refreshClusters: function (e) {
                return e ? e instanceof L.MarkerClusterGroup ? e = e._topClusterLevel.getAllChildMarkers() : e instanceof L.LayerGroup ? e = e._layers : e instanceof L.MarkerCluster ? e = e.getAllChildMarkers() : e instanceof L.Marker && (e = [e]) : e = this._topClusterLevel.getAllChildMarkers(), this._flagParentsIconsNeedUpdate(e), this._refreshClustersIcons(), this.options.singleMarkerMode && this._refreshSingleMarkerModeMarkers(e), this
            },
            _flagParentsIconsNeedUpdate: function (e) {
                var t, i;
                for (t in e)
                    for (i = e[t].__parent; i;) i._iconNeedsUpdate = !0, i = i.__parent
            },
            _refreshSingleMarkerModeMarkers: function (e) {
                var t, i;
                for (t in e) i = e[t], this.hasLayer(i) && i.setIcon(this._overrideMarkerIcon(i))
            }
        }), L.Marker.include({
            refreshIconOptions: function (e, t) {
                var i = this.options.icon;
                return L.setOptions(i, e), this.setIcon(i), t && this.__parent && this.__parent._group.refreshClusters(this), this
            }
        }), e.MarkerClusterGroup = t, e.MarkerCluster = i
});;
L.HtmlIcon = L.Icon.extend({
    options: {},
    initialize: function (options) {
        L.Util.setOptions(this, options);
    },
    createIcon: function () {
        var div = document.createElement('div');
        div.innerHTML = this.options.html;
        return div;
    },
    createShadow: function () {
        return null;
    }
});;
(function (jQuery, undefined) {
    var push = Array.prototype.push,
        rcheck = /^(?:radio|checkbox)$/i,
        rplus = /\+/g,
        rselect = /^(?:option|select-one|select-multiple)$/i,
        rvalue = /^(?:button|color|date|datetime|datetime-local|email|hidden|month|number|password|range|reset|search|submit|tel|text|textarea|time|url|week)$/i;

    function getElements(elements) {
        return elements.map(function () {
            return this.elements ? jQuery.makeArray(this.elements) : this;
        }).filter(":input:not(:disabled)").get();
    }

    function getElementsByName(elements) {
        var current, elementsByName = {};
        jQuery.each(elements, function (i, element) {
            current = elementsByName[element.name];
            elementsByName[element.name] = current === undefined ? element : (jQuery.isArray(current) ? current.concat(element) : [current, element]);
        });
        return elementsByName;
    }
    jQuery.fn.deserialize = function (data, options) {
        var i, length, elements = getElements(this),
            normalized = [];
        if (!data || !elements.length) {
            return this;
        }
        if (jQuery.isArray(data)) {
            normalized = data;
        } else if (jQuery.isPlainObject(data)) {
            var key, value;
            for (key in data) {
                jQuery.isArray(value = data[key]) ? push.apply(normalized, jQuery.map(value, function (v) {
                    return {
                        name: key,
                        value: v
                    };
                })) : push.call(normalized, {
                    name: key,
                    value: value
                });
            }
        } else if (typeof data === "string") {
            var parts;
            data = data.split("&");
            for (i = 0, length = data.length; i < length; i++) {
                parts = data[i].split("=");
                push.call(normalized, {
                    name: decodeURIComponent(parts[0].replace(rplus, "%20")),
                    value: decodeURIComponent(parts[1].replace(rplus, "%20"))
                });
            }
        }
        if (!(length = normalized.length)) {
            return this;
        }
        var current, element, j, len, name, property, type, value, change = jQuery.noop,
            complete = jQuery.noop,
            names = {};
        options = options || {};
        elements = getElementsByName(elements);
        if (jQuery.isFunction(options)) {
            complete = options;
        } else {
            change = jQuery.isFunction(options.change) ? options.change : change;
            complete = jQuery.isFunction(options.complete) ? options.complete : complete;
        }
        for (i = 0; i < length; i++) {
            current = normalized[i];
            name = current.name;
            value = current.value;
            if (!(element = elements[name])) {
                continue;
            }
            type = (len = element.length) ? element[0] : element;
            type = (type.type || type.nodeName).toLowerCase();
            property = null;
            if (rvalue.test(type)) {
                if (len) {
                    j = names[name];
                    element = element[names[name] = (j == undefined) ? 0 : ++j];
                }
                change.call(element, (element.value = value));
            } else if (rcheck.test(type)) {
                property = "checked";
            } else if (rselect.test(type)) {
                property = "selected";
            }
            if (property) {
                if (!len) {
                    element = [element];
                    len = 1;
                }
                for (j = 0; j < len; j++) {
                    current = element[j];
                    if (current.value == value) {
                        change.call(current, (current[property] = true) && value);
                    }
                }
            }
        }
        complete.call(this);
        return this;
    };
})(jQuery);