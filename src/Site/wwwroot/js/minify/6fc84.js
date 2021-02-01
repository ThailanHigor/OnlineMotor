jQuery(document).ready(function (e) {
    function t(t) {
        return !!n() && (!e(document.body).hasClass("disable-job-manager-form-state-storage") && !t.data("disable-form-state-storage"))
    }

    function n() {
        return window.sessionStorage && "function" == typeof window.sessionStorage.setItem
    }

    function i(t) {
        var n = e("div.job_listings").index(t),
            i = t.data("post_id");
        return void 0 !== i && i || (i = window.location.href.replace(location.hash, "")), _ + i + "_" + n
    }

    function a(e, n) {
        if (!t(e)) return !1;
        "object" != typeof n && (n = {});
        var a = i(e);
        try {
            return window.sessionStorage.setItem(a, JSON.stringify(n))
        } catch (e) { }
        return !1
    }

    function o(e) {
        if (!t(e)) return !1;
        var n = i(e);
        try {
            var a = window.sessionStorage.getItem(n);
            if (a) return JSON.parse(a)
        } catch (e) { }
        return !1
    }

    function r(e, n) {
        if (!t(e) || !e) return !1;
        var i = o(e);
        return !!i && (i.persist_results = n, a(e, i))
    }

    function s(e) {
        if (!t(e) || !e) return !1;
        var n = o(e);
        if (!n) return !1;
        var i = e.find(".job_filters");
        return n.form = i.serialize(), a(e, n)
    }

    function l(e, n) {
        if (!t(e)) return !1;
        var i = o(e);
        i || (i = {
            persist_results: !1
        });
        var r = e.find(".job_listings");
        return n.html = r.html(), i.results = n, a(e, i)
    }

    function d(e) {
        if (!t(e)) return !1;
        var n = i(e);
        try {
            window.sessionStorage.removeItem(n)
        } catch (e) {
            return !1
        }
        return !0
    }

    function c(e) {
        if (!t(e)) return !1;
        var n = o(e);
        return n || (n = {}), n.results = null, a(e, n)
    }

    function u(e) {
        if (!t(e)) return !1;
        var n = o(e);
        return n || (n = {}), n.form = null, a(e, n)
    }

    function g(t, n, i) {
        var a = t.find(".job_listings"),
            o = t.find(".showing_jobs");
        if ("boolean" != typeof i && (i = !1), "string" == typeof n.showing && n.showing) {
            var r = jQuery("<span>").html(n.showing);
            o.show().html("").html(n.showing_links).prepend(r)
        } else o.hide();
        return n.showing_all ? o.addClass("wp-job-manager-showing-all") : o.removeClass("wp-job-manager-showing-all"), n.html && (i ? a.append(n.html) : a.html(n.html)), !0 === t.data("show_pagination") ? (t.find(".job-manager-pagination").remove(), n.pagination && t.append(n.pagination)) : (!n.found_jobs || n.max_num_pages <= n.data.page ? e(".load_more_jobs:not(.load_previous)", t).hide() : e(".load_more_jobs", t).show(), e(".load_more_jobs", t).removeClass("loading").data("page", n.data.page), e("li.job_listing", a).css("visibility", "visible")), !0
    }
    var _ = "job_listing_";
    e(document).on("click", "a", function () {
        e("div.job_listings").each(function () {
            s(e(this))
        })
    }), e(document).on("submit", "form", function () {
        e("div.job_listings").each(function () {
            s(e(this))
        })
    });
    var f = [];
    if (e("div.job_listings").on("click", "li.job_listing a", function () {
        r(e(this).closest("div.job_listings"), !0)
    }).on("click", ".job-manager-pagination a", function () {
        var t = e(this).closest("div.job_listings"),
            n = e(this).data("page");
        return t.triggerHandler("update_results", [n, !1]), e("body, html").animate({
            scrollTop: t.offset().top
        }, 600), !1
    }).on("update_results", function (t, n, i) {
        var a, o, r, s = "",
            c = e(this),
            u = c.find(".job_filters"),
            _ = c.find(".job_listings"),
            p = c.data("per_page"),
            h = c.data("orderby"),
            m = c.data("order"),
            b = c.data("featured"),
            j = c.data("filled"),
            v = c.data("job_types"),
            w = c.data("post_status"),
            y = e("div.job_listings").index(this);
        if (!(y < 0)) {
            if (d(c), f[y] && f[y].abort(), i && 1 !== n || (e("li.job_listing, li.no_job_listings_found", _).css("visibility", "hidden"), _.addClass("loading")), c.find(".load_more_jobs").data("page", n), !0 === c.data("show_filters")) {
                var k = [];
                e(':input[name="filter_job_type[]"]:checked, :input[name="filter_job_type[]"][type="hidden"], :input[name="filter_job_type"]', u).each(function () {
                    k.push(e(this).val())
                }), a = u.find(':input[name^="search_categories"]').map(function () {
                    return e(this).val()
                }).get(), o = "", r = "";
                var S = u.find(':input[name="search_keywords"]'),
                    x = u.find(':input[name="search_location"]');
                S.val() !== S.attr("placeholder") && (o = S.val()), x.val() !== x.attr("placeholder") && (r = x.val()), s = {
                    lang: job_manager_ajax_filters.lang,
                    search_keywords: o,
                    search_location: r,
                    search_categories: a,
                    filter_job_type: k,
                    filter_post_status: w,
                    per_page: p,
                    orderby: h,
                    order: m,
                    page: n,
                    featured: b,
                    filled: j,
                    show_pagination: c.data("show_pagination"),
                    form_data: u.serialize()
                }
            } else a = c.data("categories"), o = c.data("keywords"), r = c.data("location"), a && ("string" != typeof a && (a = String(a)), a = a.split(",")), s = {
                lang: job_manager_ajax_filters.lang,
                search_categories: a,
                search_keywords: o,
                search_location: r,
                filter_post_status: w,
                filter_job_type: v,
                per_page: p,
                orderby: h,
                order: m,
                page: n,
                featured: b,
                filled: j,
                show_pagination: c.data("show_pagination")
            };
            f[y] = e.ajax({
                type: "POST",
                url: job_manager_ajax_filters.ajax_url.toString().replace("%%endpoint%%", "get_listings"),
                data: s,
                success: function (e) {
                    if (e) try {
                        e.data = s, g(c, e, i), _.removeClass("loading"), c.triggerHandler("updated_results", e), l(c, e)
                    } catch (e) {
                        window.console && window.console.log(e)
                    }
                },
                error: function (e, t, n) {
                    window.console && "abort" !== t && window.console.log(t + ": " + n)
                },
                statusCode: {
                    404: function () {
                        window.console && window.console.log("Error 404: Ajax Endpoint cannot be reached. Go to Settings > Permalinks and save to resolve.")
                    }
                }
            })
        }
    }), e("#search_keywords, #search_location, .job_types :input, #search_categories, .job-manager-filter").change(function () {
        var t = e(this).closest("div.job_listings");
        t.triggerHandler("update_results", [1, !1]), a(t)
    }).on("keyup", function (t) {
        13 === t.which && e(this).trigger("change")
    }), e(".job_filters").on("click", ".reset", function () {
        var t = e(this).closest("div.job_listings"),
            n = e(this).closest("form");
        return n.find(':input[name="search_keywords"], :input[name="search_location"], .job-manager-filter').not(':input[type="hidden"]').val("").trigger("change.select2"), n.find(':input[name^="search_categories"]').not(':input[type="hidden"]').val("").trigger("change.select2"), e(':input[name="filter_job_type[]"]', n).not(':input[type="hidden"]').attr("checked", "checked"), t.triggerHandler("reset"), t.triggerHandler("update_results", [1, !1]), a(t), !1
    }).on("submit", function () {
        return !1
    }), e(document.body).on("click", ".load_more_jobs", function () {
        var t = e(this).closest("div.job_listings"),
            n = parseInt(e(this).data("page") || 1, 10);
        return e(this).addClass("loading"), n += 1, e(this).data("page", n), t.triggerHandler("update_results", [n, !0]), !1
    }), e.isFunction(e.fn.select2) && "undefined" != typeof job_manager_select2_args) {
        var p = job_manager_select2_args;
        p.allowClear = !0, p.minimumResultsForSearch = 10, e('select[name^="search_categories"]:visible').select2(p)
    }
    e(window).on("load", function () {
        e("div.job_listings").each(function () {
            var t = e(this),
                n = t.find(".job_filters"),
                i = !1,
                a = o(t);
            a && (a.results && (i = g(t, a.results), r(t, !1), u(t)), "string" == typeof a.form && "" !== a.form && (n.find("input[type=checkbox]").prop("checked", !1), n.deserialize(a.form), n.find(':input[name^="search_categories"]').not(':input[type="hidden"]').trigger("change.select2"))), !i && n.length > 0 && t.triggerHandler("update_results", [1, !1])
        })
    }), e(window).on("unload", function () {
        return e("div.job_listings").each(function () {
            var t = o(e(this));
            t && !t.persist_results && c(e(this))
        }), !0
    })
});;
/*!
 * jQuery UI Touch Punch 0.2.3
 *
 * Copyright 2011–2014, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
! function (a) {
    function f(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0],
                d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    }
    if (a.support.touch = "ontouchend" in document, a.support.touch) {
        var e, b = a.ui.mouse.prototype,
            c = b._mouseInit,
            d = b._mouseDestroy;
        b._touchStart = function (a) {
            var b = this;
            !e && b._mouseCapture(a.originalEvent.changedTouches[0]) && (e = !0, b._touchMoved = !1, f(a, "mouseover"), f(a, "mousemove"), f(a, "mousedown"))
        }, b._touchMove = function (a) {
            e && (this._touchMoved = !0, f(a, "mousemove"))
        }, b._touchEnd = function (a) {
            e && (f(a, "mouseup"), f(a, "mouseout"), this._touchMoved || f(a, "click"), e = !1)
        }, b._mouseInit = function () {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), c.call(b)
        }, b._mouseDestroy = function () {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), d.call(b)
        }
    }
}(jQuery);