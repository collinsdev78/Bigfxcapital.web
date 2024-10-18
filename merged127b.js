$(document).ready((function() {
    function e(e) {
        let o = new Date;
        return o.setFullYear(o.getFullYear() - e), o.getFullYear() + "-" + o.getMonth() + "-" + o.getDate()
    }
    $((function() {
        $("#startDate").datepicker({
            format: "yyyy-mm-dd",
            autoclose: !0,
            setDate: e(20),
            endDate: e(18)
        }), $("#startDate").datepicker("setDate", e(20))
    })), $("form").hasClass("formValidator") && $("form.formValidator").each((function() {
        $.validator.addMethod("regex", (function(e, o, t) {
            return t.test(e)
        }), "Please enter a valid email address."), $.validator.addMethod("regx", (function(e, o, t) {
            return t.test(e)
        }), "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character, but cannot contain whitespace."), $.validator.addMethod("check_date_of_birth", (function(e, o) {
            let t = new Date(e),
                s = new Date;
            return s.setFullYear(s.getFullYear() - 18), t.getTime() <= s.getTime()
        }), "You must be at least 18 years of age."), $(this).validate({
            rules: {
                password: {
                    regx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{6,}$/
                },
                password_confirmation: {
                    equalTo: "#password"
                },
                email: {
                    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                },
                individual_email: {
                    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                },
                officer_email: {
                    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                },
                primary_email: {
                    regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                },
                individual_email_confirmation: {
                    equalTo: "#individual_email"
                },
                officer_email_confirmation: {
                    equalTo: "#officer_email"
                },
                primary_email_confirmation: {
                    equalTo: "#primary_email"
                },
                birth_date: {
                    check_date_of_birth: !0
                }
            }
        })
    })), $(".sign-up-form").on("submit", (function() {
        $("#sign-up-submit").prop("disabled", !0), $(".fa-spin").removeClass("d-none").addClass("d-block"), $("#sign-up-form").valid() ? ($("#sign-up-submit").prop("disabled", !0), $(".fa-spin").removeClass("d-none").addClass("d-block")) : ($("#sign-up-submit").prop("disabled", !1), $(".fa-spin").removeClass("d-block").addClass("d-none")), setTimeout((() => {
            $("#sign-up-submit").prop("disabled", !1), $(".fa-spin").removeClass("d-block").addClass("d-none")
        }), 1e6)
    })), $(".checkbox-btn").on("click", (function() {
        $(this).toggleClass("clicked"), $(this).hasClass("clicked") ? $("#sign-up-submit").prop("disabled", !1) : $("#sign-up-submit").prop("disabled", !0)
    })), $(".view-icon").on("click", (function(e) {
        $(this).removeClass("d-block"), $(this).addClass("d-none"), $(".view-off-icon").removeClass("d-none"), $(".view-off-icon").addClass("d-block"), $("#password").attr("type", "text")
    })), $(".view-off-icon").on("click", (function(e) {
        $(this).removeClass("d-block"), $(this).addClass("d-none"), $(".view-icon").removeClass("d-none"), $(".view-icon").addClass("d-block"), $("#password").attr("type", "password")
    })), $(".confirm-view-icon").on("click", (function(e) {
        $(this).removeClass("d-block"), $(this).addClass("d-none"), $(".confirm-view-off-icon").removeClass("d-none"), $(".confirm-view-off-icon").addClass("d-block"), $("#confirm-password").attr("type", "text")
    })), $(".confirm-view-off-icon").on("click", (function(e) {
        $(this).removeClass("d-block"), $(this).addClass("d-none"), $(".confirm-view-icon").removeClass("d-none"), $(".confirm-view-icon").addClass("d-block"), $("#confirm-password").attr("type", "password")
    }))
})),
function(e, o, t) {
    "use strict";
    t(".js-submit-form").on("submit", (function(e) {
        e.preventDefault();
        const o = t(this).serializeArray();
        t.ajax({
            method: t(this).data("method"),
            url: t(this).data("url"),
            headers: {
                "X-CSRF-Token": t('meta[name="csrf-token"]').attr("content")
            },
            data: o
        }).done((e => {
            console.log("dodabr", e)
        })).fail((e => {
            console.log("los", e.responseJSON)
        }))
    }));
    const s = () => {
        const o = "Message not send, please try again.";
        let s = null,
            n = {};
        const a = function(o) {
                return e.localStorage.getItem(o)
            },
            i = function() {
                s.fields.each((function(e, o) {
                    var s, a;
                    s = t(o).attr("name"), a = t(o).val(), n[s] = a
                }))
            },
            l = function() {
                var o, t;
                s.fields.val(""), d(), o = "sent", t = null == a("sent") || null == a("sent") ? 0 : parseInt(a("sent")) + 1, e.localStorage.setItem(o, t)
            },
            r = function(e) {
                setTimeout((() => {
                    s.message.html(e).removeClass("visibility-hidden"), s.loader.hide(), s.button.attr("disabled", "disabled"), setTimeout((() => {
                        s.message.html("").addClass("visibility-hidden"), s.button.removeAttr("disabled"), s.button.find("span").show()
                    }), 2e3), clearTimeout()
                }), 1e3)
            },
            d = function() {
                s.fields.removeClass("error")
            },
            c = function(e) {
                return d(), 202 === e.status_code || "ok" === e.status && e.errors && 0 === e.errors.length ? (r(e.message), void l()) : void("ok" !== e.status || "duplicate_entry" !== e.status_code ? (t.each(e.errors, (function(e, o) {
                    var t;
                    t = o.field, o.message, s.fields.filter(`[name='${t}']`).addClass("error")
                })), r(e.message)) : r(e.message))
            },
            u = function(e) {
                r(o)
            },
            m = function(o) {
                if (!s.button.is("[disabled]")) {
                    if (null != e.localStorage.getItem("sent") && parseInt(e.localStorage.getItem("sent")) > 2) return r("Poslali ste maksimalan broj poruka. PokusĹˇajte ponovo."), void l();
                    s.button.find("span").hide(), s.loader.show(), n.token = o, t.ajax({
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json",
                        processData: !1,
                        url: "./sendEmail.php",
                        data: JSON.stringify(n)
                    }).done(c).fail(u)
                }
            };
        return {
            init: function() {
                s = {
                    button: t("[form-submit]"),
                    fields: t("[form-field]"),
                    message: t("[form-message]"),
                    loader: t("[form-loader]")
                }, s.button.on("click", (function() {
                    i(), m()
                }))
            }
        }
    };
    e.Form = s(), "object" == typeof module && "object" == typeof module.exports && (module.exports = s())
}(window, document, $), $(document).ready((function() {
    $(".burger").click((() => {
        $(".burger").toggleClass("active"), $(".nav__links").toggleClass("active"), $(".navigation").toggleClass("active"), $("body").toggleClass("scroll-disabled")
    })), $(".scroll-top").click((() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0
    })), window.addEventListener("scroll", (e => {
        0 == window.scrollY ? ($(".scroll-top").addClass("disappearing"), $(".scroll-top").removeClass("appearing")) : ($(".scroll-top").removeClass("disappearing"), $(".scroll-top").addClass("appearing"))
    })), $(".dropdown-wrapper").on("click", (function() {
        $(this).find(".dropdown-content").hasClass("show") ? ($(this).find(".dropdown-content").removeClass("show"), $(this).removeClass("active")) : ($(".dropdown-content").removeClass("show"), $(this).find(".dropdown-content").addClass("show"), $(this).addClass("active"))
    })), $(document).on("click", (function(e) {
        0 === $(e.target).closest(".dropdown-wrapper").length && ($(".dropdown-content").removeClass("show"), $(".dropdown-wrapper").removeClass("active"))
    }));
    let e = document.querySelector(".first-animated-svg-wrapper svg"),
        o = document.querySelector(".second-animated-svg-wrapper svg"),
        t = document.querySelector(".third-animated-svg-wrapper svg"),
        s = document.querySelector(".fourth-animated-svg-wrapper svg"),
        n = document.querySelector(".fifth-animated-svg-wrapper svg"),
        a = document.querySelector(".sixth-animated-svg-wrapper svg"),
        i = document.querySelector(".seventh-animated-svg-wrapper svg"),
        l = document.querySelector(".eighth-animated-svg-wrapper svg");
    e && o && t ? window.addEventListener("scroll", (s => {
        ! function() {
            let o = window.scrollY + document.querySelector(".first-animated-svg-wrapper").getBoundingClientRect().top;
            window.scrollY > o - 900 && e.classList.add("active")
        }(),
        function() {
            let e = window.scrollY + document.querySelector(".second-animated-svg-wrapper").getBoundingClientRect().top;
            window.scrollY > e - 900 && o.classList.add("active")
        }(),
        function() {
            let e = window.scrollY + document.querySelector(".third-animated-svg-wrapper").getBoundingClientRect().top;
            window.scrollY > e - 600 && t.classList.add("active")
        }()
    })) : s && n ? window.addEventListener("scroll", (e => {
        ! function() {
            let e = window.scrollY + document.querySelector(".fourth-animated-svg-wrapper").getBoundingClientRect().top;
            window.scrollY > e - 600 && s.classList.add("active")
        }(),
        function() {
            let e = window.scrollY + document.querySelector(".fifth-animated-svg-wrapper").getBoundingClientRect().top;
            window.scrollY > e - 600 && n.classList.add("active")
        }()
    })) : a ? window.addEventListener("scroll", (e => {
        ! function() {
            let e = window.scrollY + document.querySelector(".sixth-animated-svg-wrapper").getBoundingClientRect().top;
            window.scrollY > e - 700 && a.classList.add("active");
            window.scrollY > e - 350 && ($(".grey-box").removeClass("hide"), $(".grey-box").addClass("show"))
        }()
    })) : i ? window.addEventListener("scroll", (e => {
        ! function() {
            let e = window.scrollY + document.querySelector(".seventh-animated-svg-wrapper").getBoundingClientRect().top;
            window.scrollY > e - 600 && i.classList.add("active")
        }()
    })) : l ? window.addEventListener("scroll", (e => {
        ! function() {
            let e = window.scrollY + document.querySelector(".eighth-animated-svg-wrapper").getBoundingClientRect().top;
            window.scrollY > e - 600 && l.classList.add("active")
        }()
    })) : console.log("null"), $(".owl1").owlCarousel({
        margin: 60,
        stagePadding: 30,
        items: 1,
        dots: !0
    }), $(".owl2").owlCarousel({
        margin: 30,
        stagePadding: 30,
        items: 1,
        dots: !0
    }), $(".accordion-content").on("click", ".accordion-title-wrapper", (function() {
        $(".accordion-body-wrapper").slideUp().removeClass("active"), $(".accordion-plus").removeClass("accordion-minus"), $(this).next().is(":hidden") ? ($(this).next().slideDown().addClass("active"), $(this).find(".accordion-plus").addClass("accordion-minus")) : ($(this).next().slideUp(), $(this).find(".accordion-plus").removeClass("accordion-minus"))
    })), $(".expandable").on("click", (function() {
        $(this).hasClass("active") ? ($(this).removeClass("active"), $(this).closest(".mobile-menu-item").find(".collapse").slideUp()) : ($(this).addClass("active"), $(this).closest(".mobile-menu-item").find(".collapse").slideDown())
    })), $("#currentYear").html((new Date).getFullYear())
}));