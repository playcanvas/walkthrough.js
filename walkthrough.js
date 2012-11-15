window.WT = {};
(function (container) {
    var Position = {
        TOP: 'top',
        LEFT: 'left',
        BOTTOM: 'bottom',
        RIGHT: 'right',
        CENTER: 'center'
    };

    var Walkthrough = function (name, options) {
        this.name = name;

        this.initialStep = 0;
        this.currentStep = 0;
        this.steps = [];
    
        this.spacing = 5;
        this.boxPadding = 10;
        this.boxWidth = 400;
        this.boxHeight = 100;
        this.opacity = 0.9;
        this.color = '#eee';
        this.backgroundColor = '#111';
        
        this.outlineColor = '#666';
        this.outlineWidth = 2;
        this.outlinePadding = 6;

        this.highlightColor = '#ffffdd';
        this.highlightDuration = 1500;

        this.logUrl = "/account/walkthroughs/{0}";

        // override the default values with options
        $.extend(this, options)

        var css = [
            ".walkthrough-box {",
            "  font-family: helvetica, arial, sans-serif;",
            "  font-size: 14px;",
            format("  background: {0};", this.backgroundColor),
            format("  border: {0} solid {1}px;", this.outlineColor, this.outlineWidth),
            format("  padding: {0}px;", this.boxPadding),
            format("  color: {0};", this.color),
            format("  opacity: {0};", this.opacity),
            // "  border-radius: 8px;",
            // "  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);",
            "  position: absolute;",
            format("  width: {0}px;", this.boxWidth),
            format("  height: {0}px;", this.boxHeight),
            "z-index: 99999;",
            "box-sizing: content-box;",
            "}",
            ".walkthrough-links {",
            "  font-size: 0.9em;",
            "  position: absolute;",
            "  padding: 10px;",
            "  color: #333;",
            "}",
            ".walkthrough-nav-links {",
            "  bottom: 0px;",
            "  right: 0px;",
            "}",
            ".walkthrough-skip-links {",
            "  bottom: 0px;",
            "  left: 0px;",
            "}",
            ".walkthrough-box a {",
            "  color: #6379A8;",
            "  text-decoration: none;",
            "  cursor: pointer;",
            "}",
            ".walkthrough-box a:hover {",
            "  text-decoration: underline;",
            "}",
            ".walkthrough-box pre {",
            "  font-family: monospace;",
            "  padding: 10px 0px;",
            "}",
            ".walkthrough-box h4 {",
            "  font-weight: bold;",
            "  margin-bottom: 3px;",
            "}",
            ".walkthrough-box p {",
            "  margin-top: 5px;",
            "  margin-bottom: 5px;",
            "}",
            ".walkthrough-box-bottom:before {",
            "  position: absolute;",
            "  display: inline-block;",
            "  border-left: 7px solid transparent;",
            "  border-right: 7px solid transparent;",
            format("  border-bottom: 7px solid {0};", this.outlineColor),
            "  border-bottom-color: rgba(0, 0, 0, 0.2);",
            "  left: 20px;",
            "  top: -8px;",
            "  content: '';",
            "}",
            ".walkthrough-box-bottom:after {",
            "  position: absolute;",
            "  display: inline-block;",
            "  border-left: 6px solid transparent;",
            "  border-right: 6px solid transparent;",
            format("  border-bottom: 6px solid {0};", this.backgroundColor),
            "  left: 21px;",
            "  top: -6px;",
            "  content: '';",
            "}",
            ".walkthrough-box-left:before {",
            "  position: absolute;",
            "  display: inline-block;",
            "  border-bottom: 7px solid transparent;",
            "  border-top: 7px solid transparent;",
            format("  border-left: 7px solid {0};", this.outlineColor),
            "  border-left-color: rgba(0, 0, 0, 0.2);",
            "  right: -8px;",
            "  top: 20px;",
            "  content: '';",
            "}",
            ".walkthrough-box-left:after {",
            "  position: absolute;",
            "  display: inline-block;",
            "  border-bottom: 6px solid transparent;",
            "  border-top: 6px solid transparent;",
            format("  border-left: 6px solid {0};", this.backgroundColor),
            "  right: -6px;",
            "  top: 21px;",
            "  content: '';",
            "}",
            ".walkthrough-box-arrow-left:before {",
            "  left: 20px;",
            "}",
            ".walkthrough-box-arrow-left:after {",
            "  left: 21px;",
            "}",
            ".walkthrough-box-arrow-right:before {",
            "  right: 20px;",
            "}",
            ".walkthrough-box-arrow-right:after {",
            "  right: 20px;",
            "}",
            ".walkthrough-box-top:before {",
            "  position: absolute;",
            "  display: inline-block;",
            "  border-left: 7px solid transparent;",
            "  border-right: 7px solid transparent;",
            format("  border-top: 8px solid {0};", this.outlineColor),
            "  border-top-color: rgba(0, 0, 0, 0.2);",
//            "  left: 20px;",
            "  bottom: -7px;",
            "  content: '';",
            "}",
            ".walkthrough-box-top:after {",
            "  position: absolute;",
            "  display: inline-block;",
            "  border-left: 6px solid transparent;",
            "  border-right: 6px solid transparent;",
            format("  border-top: 6px solid {0};", this.backgroundColor),
//            "  left: 21px;",
            "  bottom: -6px;",
            "  content: '';",
            "}",
            ".walkthrough-box-right:before {",
            "  position: absolute;",
            "  display: inline-block;",
            "  border-top: 7px solid transparent;",
            format("  border-right: 7px solid {0};", this.outlineColor),
            "  border-top: 7px solid transparent;",
            "  border-right-color: rgba(0, 0, 0, 0.2);",
            "  left: -8px;",
            "  top: 20px;",
            "  content: '';",
            "}",
            ".walkthrough-box-right:after {",
            "  position: absolute;",
            "  display: inline-block;",
            "  border-top: 6px solid transparent;",
            format("  border-right: 6px solid {0};", this.backgroundColor),
            "  border-bottom: 6px solid transparent;",
            "  left: -6px;",
            "  top: 21px;",
            "  content: '';",
            "}",
            ".walkthrough-controls {",
            "  width: 190px;",
            "  position: absolute;",
            "  top: 80%;",
            "  left: 50%;",
            "  margin-left: -50px;",
            "}",
            ".walkthrough-controls button {",
            "  width: 75px;",
            "  height: 32px;",
            "  margin: 10px;",
            "}",
            ".walkthrough-outline {",
            "  position: absolute;",
            format("  padding: {0}px;", this.outlinePadding),
            format("  border: {0}px solid {1};", this.outlineWidth, this.outlineColor),
            "}"
        ].join('\n');

        var style = document.createElement('style');
        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        document.getElementsByTagName('head')[0].appendChild(style);

        // Load current position if we have done this tutorial before
    };

    Walkthrough.prototype = {
        start: function (step) {
            var self = this;
            $(document).ready(function () {
                if (!self.isComplete()) {
                    self._loadPosition();
                    self.initialStep = step || self._calculateInitialStep();
                    self.currentStep = self.initialStep - 1;
                    self.next();
                }
            });
        },

        addStep: function (data) {
            data = $.extend({
                position: 'bottom',
                // outlineColor: '#333',
                // outlineWidth: 2,
                // outlinePadding: 6,
                offsetX: 0,
                offsetY: 0,
                highlight: true
            }, data);

            this.steps.push({
                data: data
            });
        },

        next: function () {
            // Increment step and render new element
            this.currentStep++;
            if (this.currentStep < this.steps.length) {
                this._doStep(this.currentStep, this.currentStep - 1);
            } else {
                this.currentStep = this.steps.length - 1;
                this.complete();
            }

            this._savePosition();
        },

        prev: function () {
            // Increment step and render new element
            this.currentStep--;
            if (this.currentStep >= this.initialStep) {
                this._doStep(this.currentStep, this.currentStep + 1);
            } else {
                this.currentStep = this.initialStep;
            }

            this._savePosition();
        },

        /**
        * Do the work of changing which step is being displayed, without 
        * modifying the local storage or current index.
        */
        _doStep: function (currentIndex, previousIndex) {
            // remove previous step's element
            var prevStep = this.steps[previousIndex];
            if (prevStep) {
                this._unbindStep(prevStep);
                if (prevStep.$el) {
                    prevStep.$el.fadeOut('fast', function () {
                        prevStep.$el.remove();
                    });                        
                }
            }

            var step = this.steps[currentIndex];
            if (step.data.page) {
                // Test regular expression in page against current URL
                var re = new RegExp(step.data.page);
                if (!re.test(window.location.href)) {
                    return;
                }
            }
            
            if ($(step.data.el).length) {
                this._bindStep(step);                    
                this._renderStep(step);
                this._logStep(this.isComplete());
            }
        },

        isComplete: function () {
            var complete  = localStorage.getItem(format("{0}:complete", this.name));
            return !!complete;
        },

        complete: function () {
            var step = this.steps[this.currentStep];
            step.$el.remove();

            this.setComplete();
        },

        setComplete: function () {
            if (!this.completed) {
                this._logStep(true);    
            }

            this.completed = true;
            localStorage.setItem(format("{0}:complete", this.name), true);            
        },

        reset: function () {
            localStorage.removeItem(format('{0}:current', this.name));
            localStorage.removeItem(format('{0}:complete', this.name));

            // send a reset message to the server
            $.ajax({
                type: "DELETE",
                url: format(this.logUrl, this.name) + "/reset",
            });
        },

        /**
        * @private
        * @method
        * @name Walkthrough#_bindStep
        * @description Bind to events on element if trigger function is provided
        */
        _bindStep: function (step) {
            var self = this;
            var $el;
            $el = $(step.data.el).first();
            
            if (typeof(step.data.trigger) === 'function') {
                step.handler = function (e) {
                    var newValue = e.currentTarget.value;
                    var result = step.data.trigger.call(self, newValue);
                    if (result) {
                        self.next();
                    }
                };
                $el.on('input', step.handler);
            } else if (typeof(step.data.trigger) === 'number') {
                step.handler = function () {
                    self.next();
                };
                step.timeout = setTimeout(step.handler, step.data.trigger);
            } else if (step.data.trigger === 'input') {
                step.handler = function (e) {
                    self.next();
                };
                $el.on('input', step.handler);
            } else if (typeof(step.data.trigger) === 'string') {
                // Bind to event
                step.handler = function (e) {
                    self.next();
                };
                if (step.data.target) {
                    $("body").on(step.data.trigger, step.data.target, step.handler);    
                } else {
                    $el.on(step.data.trigger, step.handler);
                }
                
            }

            if (step.data.disable) {
                $(step.data.disable).attr('disabled', true);
            }
            if (step.data.enable) {
                $(step.data.enable).attr('disabled', false);
            }
        },


        /**
        * @private
        * @method
        * @name Walkthrough#_unbindStep
        * @description Remove event listeners from target elements
        */
        _unbindStep: function (step) {
            var $el = $(step.data.el).first();
            if (typeof(step.data.trigger) === 'function' || step.data.trigger === 'input') {
                if (step.handler) {
                    $el.off('input', step.handler);    
                }
            } else if (typeof(step.data.trigger) === 'number') {
                clearTimeout(step.timeout);
                delete step.timeout;
            } else if (step.data.trigger === 'click') {
                if (step.handler) {
                    $el.off('click', step.handler);    
                }
            }
        },

        _savePosition: function () {
            localStorage.setItem(format('{0}:current', this.name), this.currentStep);
        },

        _loadPosition: function () {
            var current = localStorage.getItem(format('{0}:current', this.name));
            if (current) {
                this.currentStep = parseInt(current);    
            }
        },

        _renderStep: function (step) {
            var data = step.data;
            var $el = $(data.el).first();

            var position = this._calculatePosition($el, data);

            var height = data.height || this.boxHeight;
            var width = data.width || this.boxWidth;

            var $box = this._generateBox(position.x, position.y, height, width, data);
            $box.hide();
            $(document.body).append($box);
            $box.fadeIn('fast');
    
            // If available from jQuery UI activate 'highlight' effect
            if (step.data.highlight && $el.effect) {
                $el.effect('highlight', {
                    color: this.highlightColor,
                }, this.highlightDuration);                
            }

            // store rendered element
            step.$el = $box;

            if (step.data.poll === true) {
                this._beginPolling();
            } else if (step.data.poll === false) {
                this._endPolling();
            }

            // Check for 'last' property which marks walkthrough as complete.
            if (step.data.last) {
                this.setComplete();
            }
        },

        _logStep: function (complete) {
            var data = {
                step: this.currentStep,
                complete: complete || false
            };
        
            var url = format(this.logUrl, this.name);
            $.ajax({
                type: 'POST',
                url: url,
                data: JSON.stringify(data),
                success: function () {},
                error: function (jqXhr, textStatus, errorThrown) {
                    console.error('Walkthrough logging failed: ' + textStatus);
                },
                contentType: 'application/json'
            });
        },

        _calculateInitialStep: function () {
            var i;
            for (i = this.currentStep; i >= 0; i--) {
                if (this.steps[i].data.first) {
                    return i;
                }
            }

            return 0;
        },

        _calculatePosition: function ($el, data) {
            var height = data.height || this.boxHeight + (this.boxPadding*2) + (this.outlineWidth*2);
            var width = data.width || this.boxWidth + (this.boxPadding*2) + (this.outlineWidth*2);

            var pos = $el.offset();
            var marginTop = parseInt($el.css('margin-top').slice(0,-2));
            var marginLeft = parseInt($el.css('margin-left').slice(0,-2));

            var x, y;

            if (typeof(data.x) === 'undefined') {
                if (data.position === Position.LEFT) {
                    // left of element
                    x = pos.left - this.spacing - width;
                } else if (data.position === Position.RIGHT) {
                    // right of elements
                    x = pos.left + $el.outerWidth(true) + this.spacing;
                } else if (data.position === Position.CENTER) {
                    x = (window.innerWidth - width) / 2;
                } else {
                    // flush with element
                    if (!data.reverseX) {
                        x = pos.left + marginLeft;
                    } else {
                        x = pos.left + marginLeft + $el.width() - width;
                    }
                };
            } else {
                x = data.x;
            }
            x += data.offsetX;

            if (typeof(data.y) === 'undefined') {
                if (data.position === Position.TOP) {
                    // position above the element
                    y = pos.top - this.spacing - height;
                } else if (data.position === Position.BOTTOM) {
                    // position below the element
                    y = pos.top + $el.outerHeight(true) + this.spacing;
                } else if (data.position === Position.CENTER) {
                    y = (window.innerHeight - height) / 2;
                } else {
                    // flush with element
                    y = pos.top + marginTop;
                }
            } else {
                y = data.y;
            }
            y += data.offsetY;

            return {
                x: x,
                y: y
            };
        },

        _generateBox: function (x, y, height, width, data) {
            var $div = $('<div />');
            var prevTag = this._isPrevEnabled() ? 'a' : 'span';
            var nextTag = this._isNextEnabled() ? 'a' : 'span';
            var nextWording = (this.currentStep < this.steps.length - 1) ? "next" : "finish";
            var $links = $(format('<div class="walkthrough-links walkthrough-nav-links"><{0} id="walkthrough-prev">prev</{1}> | <{2} id="walkthrough-next">{3}</{4}></div>', prevTag, prevTag, nextTag, nextWording, nextTag));
            
            var $skipEl = $('<div class="walkthrough-links walkthrough-skip-links"><a id="walkthrough-skip">finish</a></div>');

            $div.css('top', y)
            $div.css('left', x);

            $div.addClass('walkthrough-box')
            $div.addClass(format('walkthrough-box-{0}', data.position));
            
            if (data.position === Position.TOP || data.position === Position.BOTTOM) {
                if (data.reverseX) {
                    $div.addClass('walkthrough-box-arrow-right');
                }
                else {
                    $div.addClass('walkthrough-box-arrow-left');
                }
            }
            
            $div.height(height);
            $div.width(width);
            $div.html(data.html);

            $div.append($skipEl);
            $div.append($links);

            $div.find('#walkthrough-prev').bind('click', this.prev.bind(this));
            $div.find('#walkthrough-next').bind('click', this.next.bind(this))
            $div.find('#walkthrough-skip').bind('click', this.complete.bind(this));
            return $div;
        },

        _isPrevEnabled: function () {
            if (this.currentStep > this.initialStep) {
                return true;
            }

            return false;
        },

        _isNextEnabled: function () {
            var step = this.steps[this.currentStep];

            // if (!step.$el || step.$el.length === 0) {
            //     return false;
            // }

            if (step.data.trigger) {
                return false;
            }

            return true;
        },

        _beginPolling: function () {
            this._pollingStart = this.currentStep;
            this._pollingInterval = setInterval(function () {
                this._loadPosition();
                if (this.currentStep > this._pollingStart) {
                    this._doStep(this.currentStep, this.currentStep - 1);
                }
            }.bind(this), 500);
        },

        _endPolling: function () {
            clearInterval(this._pollingInterval);
            this._pollingStart = -1;
            this._pollingInterval = null;
        }

    };

    function format () {
        var s = arguments[0];
        var i, len = arguments.length - 1;
        for (i = 0; i < len; i++) {
            s = s.replace('{' + i + '}', arguments[i+1]);
        }

        return s;
    };

    container.config = {};
    container.Walkthrough = Walkthrough;
}(window.WT));