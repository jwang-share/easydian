/* ===================================================
 * Copyright 2012 Twitter, Inc. & Spirent Communications
 * 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Originally came from twitter bootstrap,
 * but modified by Spirent Communication
 * ========================================================== */
!function ($) {

    "use strict"; // jshint ;_;


    /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
    * ======================================================= */

    $(function () {
        $.support.transition = (function () {
            var transitionEnd = (function () {
                var el = document.createElement('bootstrap'),
                    transEndEventNames = {
                        'WebkitTransition' : 'webkitTransitionEnd',
                        'MozTransition'    : 'transitionend',
                        'OTransition'      : 'oTransitionEnd otransitionend',
                        'transition'       : 'transitionend'
                    }, name

                for (name in transEndEventNames){
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name]
                    }
                }
            }())

            return transitionEnd && { end: transitionEnd }
        })()
    })
}(window.jQuery);

!function ($) {
    "use strict"; // jshint ;_;

    /*====================== MODAL ======================*/
    /**
     * MODAL CLASS DEFINITION
     * ====================== */
    var Modal = function (element, options) {
        this.options = options;
        this.$element = $(element)
            .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));
        this.options.remote && this.$element.find('.modal-body').load(this.options.remote);
    }

    Modal.prototype = {
        constructor: Modal,
        toggle: function () {
            return this[!this.isShown ? 'show' : 'hide']();
        },
        show: function () {
            var that = this;
            var e = $.Event('show');
            this.center();
            this.$element.trigger(e);
            this.$element.focus();
            if(this.isShown) return
            this.isShown = true;
            this.escape();
            if(this.$element.find('input').length > 0) {
                this.$element.find('input:first').focus();
            }
            this.backdrop(function () {
                var transition = $.support.transition && that.$element.hasClass('fade');
                if(!that.$element.parent().length) {
                    that.$element.appendTo(document.body);
                }
                that.$element.show();
                if(transition) {
                    that.$element[0].offsetWidth;
                }
                that.$element.addClass('in').attr('aria-hidden', false);
                that.enforceFocus();
                transition ?
                    that.$element.one($.support.transition.end, function() {
                        that.$element.focus().trigger('shown')}) :
                    that.$element.focus().trigger('shown');
            });
        },
        hide: function (e) {
            e && e.preventDefault();
            var that = this;
            e = $.Event('hide');
            this.$element.trigger(e);
            if(!this.isShown || e.isDefaultPrevented()) return
            this.isShown = false;
            this.escape();
            $(document).off('focusin.modal');
            this.hideModal();
        },
        enforceFocus: function () {
            var that = this;
            $(document).on('focusin.modal', function (e) {
                if(that.$element[0] !== e.target && !that.$element.has(e.target).length) {
                    that.$element.focus();
                }
            });
        },
        escape: function () {
            var that = this;
            if (this.isShown && this.options.keyboard) {
                this.$element.on('keyup.dismiss.modal', function ( e ) {
                    e.which == 27 && that.hide();
                });
            } else if (!this.isShown) {
                this.$element.off('keyup.dismiss.modal');
            }
        },
        hideWithTransition: function () {
            var that = this, timeout = setTimeout(function () {
                that.$element.off($.support.transition.end);
                that.hideModal();
            }, 500);
            this.$element.one($.support.transition.end, function () {
                clearTimeout(timeout);
                that.hideModal();
            });
        },
        hideModal: function () {
            var that = this;
            this.$element.remove();
            this.backdrop(function () {
                that.removeBackdrop();
                that.$element.trigger('hidden');
            });
        },
        removeBackdrop: function () {
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null;
        },
        center: function() {
            this.$element.css({
                position: 'fixed',
                top: "50%",
                left: "50%",
                marginTop: - (this.$element.outerHeight() / 2),
                marginLeft: - (this.$element.outerWidth() / 2),
                zIndex: this.options.zIndex + 1
            });
        },
        backdrop: function (callback) {
            var that = this, animate = this.$element.hasClass('fade') ? 'fade' : ''
            if (this.isShown && this.options.backdrop) {
                this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
                this.$backdrop.click(
                    this.options.backdrop == 'static' ?
                    $.proxy(this.$element[0].focus, this.$element[0])
                    : $.proxy(this.hide, this)
                );
                this.$backdrop.addClass('in');
                if (!callback) return;
                callback();
            } else if(!this.isShown && this.$backdrop) {
                this.$backdrop.removeClass('in');
                callback();
            } else if (callback) {
                callback();
            }
        }
    }

    /**
     * MODAL PLUGIN DEFINITION
     * ======================= */
    var old = $.fn.modal;
    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('modal');
            var options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option);
            if (!data) $this.data('modal', (data = new Modal(this, options)));
            if (typeof option == 'string') data[option]();
            else if (options.show) data.show();
        });
    }

    $.fn.modal.defaults = {
        backdrop: true,
        keyboard: true,
        show: true
    }

    $.fn.modal.Constructor = Modal;


    /**
     * MODAL NO CONFLICT
     * ================= */
    $.fn.modal.noConflict = function () {
        $.fn.modal = old;
        return this;
    }


    /**
     * MODAL DATA-API
     * ============== */

    $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
        var $this = $(this);
        var href = $this.attr('href');
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')));
        var option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data());
        e.preventDefault();
        $target.modal(option).one('hide', function () {
            $this.focus();
        });
    });
}(window.jQuery);

!function ($) {

  "use strict"; // jshint ;_;

    /*====================== DROPDOWN ======================*/
    /**
     * DROPDOWN CLASS DEFINITION
     * ========================= */
    var toggle = '[data-toggle=dropdown]'
    var Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle);
        $('html').on('click.dropdown.data-api', function () {
            $el.parent().removeClass('open');
        });
    }

    Dropdown.prototype = {
        constructor: Dropdown,
        toggle: function(e) {
            var $this = $(this), $parent, isActive;
            if ($this.is('.disabled, :disabled')) return
            $parent = getParent($this);
            isActive = $parent.hasClass('open');
            clearMenus();
            if (!isActive) {
                $parent.toggleClass('open');
            }
            $this.focus();
            return false
        },
        keydown: function(e) {
            var $this, $items, $active, $parent, isActive, index;
            if (!/(38|40|27)/.test(e.keyCode)) return
            $this = $(this);
            e.preventDefault();
            e.stopPropagation();
            if ($this.is('.disabled, :disabled')) return
            $parent = getParent($this);
            isActive = $parent.hasClass('open');
            if (!isActive || (isActive && e.keyCode == 27)) {
                if (e.which == 27) $parent.find(toggle).focus();
                return $this.click();
            }
            $items = $('[role=menu] li:not(.divider):visible a', $parent);
            if (!$items.length) return
            index = $items.index($items.filter(':focus'));
            if (e.keyCode == 38 && index > 0) index--;
            if (e.keyCode == 40 && index < $items.length - 1) index++;
            if (!~index) index = 0;
            $items.eq(index).focus();
        }
    }

    function clearMenus() {
        $(toggle).each(function () {
            getParent($(this)).removeClass('open');
        });
    }

    function getParent($this) {
        var selector = $this.attr('data-target'), $parent;
        if (!selector) {
            selector = $this.attr('href');
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
        }
        $parent = selector && $(selector);
        if (!$parent || !$parent.length) $parent = $this.parent();
        return $parent;
    }


    /**
     * DROPDOWN PLUGIN DEFINITION
     * ========================== */
    var old = $.fn.dropdown
    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('dropdown');
            if (!data) $this.data('dropdown', (data = new Dropdown(this)));
            if (typeof option == 'string') data[option].call($this);
        });
    }

    $.fn.dropdown.Constructor = Dropdown

    /**
     * DROPDOWN NO CONFLICT
     * ==================== */

    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old;
        return this;
    }

    /**
     * APPLY TO STANDARD DROPDOWN ELEMENTS
     * =================================== */

    $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown);
}(window.jQuery);

!function ($) {

  "use strict"; // jshint ;_;

    /**
     * TAB CLASS DEFINITION
     * ==================== */

    var Tab = function (element) {
        this.element = $(element);
    }

    Tab.prototype = {
        constructor: Tab,
        show: function () {
            var $this    = this.element;
            var $ul      = $this.closest('ul:not(.dropdown-menu)');
            var selector = $this.attr('data-target');
            var previous, $target, e;

            if(!selector) {
                selector = $this.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
            }
            if( $this.parent('li').hasClass('active') ) return;
            previous = $ul.find('.active:last a')[0];
            e = $.Event('show', {
                relatedTarget: previous
            });
            $this.trigger(e);
            if (e.isDefaultPrevented()) return;
            $target = $(selector);
            this.activate($this.parent('li'), $ul);
            this.activate($target, $target.parent(), function () {
                $this.trigger({
                    type: 'shown',
                    relatedTarget: previous
                });
            });
        },
        activate: function ( element, container, callback) {
            var $active = container.find('> .active');
            var transition = callback && $.support.transition && $active.hasClass('fade');

            function next() {
                $active
                .removeClass('active')
                .find('> .dropdown-menu > .active')
                .removeClass('active');

                element.addClass('active');

                if (transition) {
                    element[0].offsetWidth; // reflow for transition
                    element.addClass('in');
                } else {
                    element.removeClass('fade');
                }

                if ( element.parent('.dropdown-menu') ) {
                    element.closest('li.dropdown').addClass('active');
                }

                callback && callback();
            }

            transition ?
                $active.one($.support.transition.end, next) :
                next();

            $active.removeClass('in')
        }
    }


    /**
     * TAB PLUGIN DEFINITION
     * ===================== */

    var old = $.fn.tab;

    $.fn.tab = function ( option ) {
        return this.each(function () {
            var $this = $(this);
            var data  = $this.data('tab');
            if (!data) $this.data('tab', (data = new Tab(this)));
            if (typeof option == 'string') data[option]();
        });
    }

    $.fn.tab.Constructor = Tab;


    /* TAB NO CONFLICT
    * =============== */

    $.fn.tab.noConflict = function () {
        $.fn.tab = old;
        return this;
    }


    /* TAB DATA-API
    * ============ */

    $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
        e.preventDefault();
        $(this).tab('show');
        var drop_area_height = $('#content').height();
        var drop_area_width  = $('#content').width();
        $('#profile_drop_area').css('height', drop_area_height + 'px');
        $('#profile_drop_area').css('width', drop_area_width + 'px');
        spirentUtils.position_footer();
    });
}(window.jQuery);

!function ($) {

  "use strict"; // jshint ;_;

    /**
     * BUTTON PUBLIC CLASS DEFINITION
     * ============================== */

    var Button = function (element, options) {
        this.$element = $(element);
        this.options  = $.extend({}, $.fn.button.defaults, options);
    }

    Button.prototype.setState = function (state) {
        var d    = 'disabled';
        var $el  = this.$element;
        var data = $el.data();
        var val  = $el.is('input') ? 'val' : 'html';

        state = state + 'Text';
        data.resetText || $el.data('resetText', $el[val]());

        $el[val](data[state] || this.options[state]);

        // push to event loop to allow forms to submit
        setTimeout(function () {
            state == 'loadingText' ?
                $el.addClass(d).attr(d, d) :
                $el.removeClass(d).removeAttr(d);
        }, 0)
    }

    Button.prototype.toggle = function () {
        var $parent = this.$element.closest('[data-toggle="buttons-radio"]');
        var $switch_btn = this.$element.closest('[data-toggle="button-switch"]');
        $parent && $parent.find('.active').removeClass('active');
        this.$element.toggleClass('active');
        if($switch_btn && this.$element.hasClass('on')) {
            var end_point = ($switch_btn.width() / 2) + 3;
            this.$element.removeClass('active').removeClass('on').addClass('off').attr('checked','');
            this.$element.animate({
                'left': end_point + 'px'
            }, 500);
        } else if($switch_btn && this.$element.hasClass('off')) {
            this.$element.removeClass('active').removeClass('off').addClass('on').removeAttr('checked');
            this.$element.animate({
                'left': '0px'
            }, 500);
        }
    }


    /**
     * BUTTON PLUGIN DEFINITION
     * ======================== */

    var old = $.fn.button;

    $.fn.button = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('button');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('button', (data = new Button(this, options)));
            if (option == 'toggle') data.toggle();
            else if (option) data.setState(option);
        });
    }

    $.fn.button.defaults = {
        loadingText: 'loading...'
    }

    $.fn.button.Constructor = Button;


    /**
     * BUTTON NO CONFLICT
     * ================== */

    $.fn.button.noConflict = function () {
        $.fn.button = old;
        return this;
    }


    /**
     * BUTTON DATA-API
     * =============== */

    $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
        var $btn = $(e.target);
        if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
        $btn.button('toggle');
    });
}(window.jQuery);

!function ($) {

  "use strict"; // jshint ;_;

    /**
     * AFFIX CLASS DEFINITION
     * ====================== */

    var Affix = function (element, options) {
        this.options = $.extend({}, $.fn.affix.defaults, options);
        this.$window = $(window)
            .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
            .on('click.affix.data-api', $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this));
        this.$element = $(element);
        this.checkPosition();
    }

    Affix.prototype.checkPosition = function () {
        if (!this.$element.is(':visible')) return;

        var scrollHeight = $(document).height();
        var scrollTop    = this.$window.scrollTop();
        var position     = this.$element.offset();
        var offset       = this.options.offset;
        var offsetBottom = offset.bottom;
        var offsetTop    = offset.top;
        var reset        = 'affix affix-top affix-bottom';
        var affix;

        if (typeof offset != 'object') offsetBottom = offsetTop = offset;
        if (typeof offsetTop == 'function') offsetTop = offset.top();
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom();

        affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
        false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
        'bottom' : offsetTop != null && scrollTop <= offsetTop ?
        'top'    : false;

        if (this.affixed === affix) return;

        this.affixed = affix;
        this.unpin = affix == 'bottom' ? position.top - scrollTop : null;

        this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''));
    }

    /**
     * AFFIX PLUGIN DEFINITION
     * ======================= */

    var old = $.fn.affix;

    $.fn.affix = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('affix');
            var options = typeof option == 'object' && option;
            if (!data) $this.data('affix', (data = new Affix(this, options)));
            if (typeof option == 'string') data[option]();
        });
    }

    $.fn.affix.Constructor = Affix;

    $.fn.affix.defaults = {
        offset: 0
    }

    /**
     * AFFIX NO CONFLICT
     * ================= */

    $.fn.affix.noConflict = function () {
        $.fn.affix = old;
        return this;
    }

    /**
     * AFFIX DATA-API
     * ============== */

    $(window).on('load', function () {
        $('[data-spy="affix"]').each(function () {
            var $spy = $(this), data = $spy.data();

            data.offset = data.offset || {};

            data.offsetBottom && (data.offset.bottom = data.offsetBottom);
            data.offsetTop && (data.offset.top = data.offsetTop);

            $spy.affix(data);
        });
    });
}(window.jQuery);

!function ($) {

  "use strict"; // jshint ;_;

    /**
     * COLLAPSE PUBLIC CLASS DEFINITION
     * ================================ */

    var Collapse = function (element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.collapse.defaults, options);

        if (this.options.parent) {
            this.$parent = $(this.options.parent);
        }

        this.options.toggle && this.toggle();
    }

    Collapse.prototype = {
        constructor: Collapse,
        dimension: function () {
            var hasWidth = this.$element.hasClass('width');
            return hasWidth ? 'width' : 'height';
        },
        show: function () {
            var dimension, scroll, actives, hasData;

            if (this.transitioning || this.$element.hasClass('in')) return;

            dimension = this.dimension();
            scroll = $.camelCase(['scroll', dimension].join('-'));
            actives = this.$parent && this.$parent.find('> .accordion-group > .in');

            if (actives && actives.length) {
                hasData = actives.data('collapse');
                if (hasData && hasData.transitioning) return;
                actives.collapse('hide');
                hasData || actives.data('collapse', null);
            }

            this.$element[dimension](0);
            this.transition('addClass', $.Event('show'), 'shown');
            $.support.transition && this.$element[dimension](this.$element[0][scroll]);
        },
        hide: function () {
            var dimension;
            if (this.transitioning || !this.$element.hasClass('in')) return;
            dimension = this.dimension();
            this.reset(this.$element[dimension]());
            this.transition('removeClass', $.Event('hide'), 'hidden');
            this.$element[dimension](0);
        },
        reset: function (size) {
            var dimension = this.dimension();

            this.$element
            .removeClass('collapse')
            [dimension](size || 'auto')
            [0].offsetWidth;

            this.$element[size !== null ? 'addClass' : 'removeClass']('collapse');

            return this;
        },
        transition: function (method, startEvent, completeEvent) {
            var that = this;
            var complete = function () {
                if (startEvent.type == 'show') that.reset();
                that.transitioning = 0;
                that.$element.trigger(completeEvent);
            };

            this.$element.trigger(startEvent);

            if (startEvent.isDefaultPrevented()) return;

            this.transitioning = 1;

            this.$element[method]('in');

            $.support.transition && this.$element.hasClass('collapse') ?
                this.$element.one($.support.transition.end, complete) :
                complete();
        },
        toggle: function () {
            this[this.$element.hasClass('in') ? 'hide' : 'show']();
        }
    }


    /**
     * COLLAPSE PLUGIN DEFINITION
     * ========================== */

    var old = $.fn.collapse;

    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('collapse');
            var options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option);
            if (!data) $this.data('collapse', (data = new Collapse(this, options)));
            if (typeof option == 'string') data[option]();
        });
    }

    $.fn.collapse.defaults = {
        toggle: true
    }

    $.fn.collapse.Constructor = Collapse;


    /**
     * COLLAPSE NO CONFLICT
     * ==================== */

    $.fn.collapse.noConflict = function () {
        $.fn.collapse = old;
        return this;
    }


    /**
     * COLLAPSE DATA-API
     * ================= */

    $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
        var $this = $(this), href;
        var target = $this.attr('data-target') || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); //strip for ie7
        var option = $(target).data('collapse') ? 'toggle' : $this.data();
        
        // Make at least one item is opened
        if($this.parents('.accordion-group').children('.accordion-body').hasClass('in')){
            e.stopPropagation();
        } else {
            $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
            $(target).collapse(option);
        }
    });

}(window.jQuery);