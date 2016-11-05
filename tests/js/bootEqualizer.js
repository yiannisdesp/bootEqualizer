/**
 * bootEqualizer jQuery Plugin v1.0.0
 * 
 * Dynamically make all column blocks i.e. '.col-sm-6 .col-md-4 .col-lg-4' withing a container i.e. '.row' 
 * equal in height in each row depending on screen width breakpoint.
 * The height is calculated to be equal the max height in the current row.
 *
 * bootEqualizer jQuery plugin is released under the MIT License. Feel free to use it in personal and commercial projects.
 * 
 * Copyright (c) 2016 Yiannis Despotis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and 
 * associated documentation files (the "Software"), to deal in the Software without restriction, including 
 * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR 
 * IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
;(function ( $, window, document, undefined ) {

	// plugin name
	var pluginName = 'bootEqualizer';

	// plugin constructor
	function Plugin ( element, options ) {

		// Store a reference to the source element
        this.el = element;

        // Store a jQuery reference  to the source element
        this.$el = $(element);

        // Set the instance options extending the plugin defaults and
        // the options passed by the user
        this.options = $.extend({}, $.fn[pluginName].defaults, options);

        this.execTmStart = 0;

        // Initialize the plugin instance
        this.init();
        
	}

	// Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {

        // Initialization logic
        init: function () {
        	
        	this.execTmStart = performance.now(); // count execution time

        	// onStart calculation callback
        	this.options.onStart.call();

        	this.calculate();

        },

        // recalculate public function, useful when resizing the browser
        recalculate: function () {
        	
        	this.execTmStart = performance.now(); // reset execution time start

        	this.calculate(); // just call our calculate method once more
        },

        // calculate heights on each row
        calculate: function () {
        	
        	console.log('calculation started..');

        	// initialize max height & column height
	    	var maxHeight = 0;
			var columnHeight = 0;
			var $el = this.$el;
			var options = this.options;

			// get window width
			var windowWidth = window.innerWidth;

			// define how many columns a row has using default bootstrap breakpoints
			if(options.bootstrapDefaultBreakpoints === true){
				var breakpoints = this.generateBreakpointsObjUsingBoostrapDefaults();
			} else {
			// define how many columns a row has using custom breakpoints
				var breakpoints = options.breakpoints;
			}

			var columnsPerRow = 0;
			$.each(breakpoints, function(breakpoint, columnNumber){
				if(windowWidth >= parseInt(breakpoint)) columnsPerRow = parseInt(columnNumber);
			});

			// set the same height for columns in the same row depending on window width
			// in order to be aligned correctly on different window sizes
			var counter = 1;
			var row = 1;
			var secondLoopRow = 1;
			var secondLoopCounter = 1;

			if(columnsPerRow > 0){
				// calculate total rows
				var totalRows = Math.ceil($el.children(options.column).length / columnsPerRow);
				$el.children(options.column).each(function(){

					// get current column inner height
					// reset height and measure column inner height
					columnHeight = $(this).removeAttr("style").innerHeight();

					// in case the current column height is greater that the current maxHeight noted, assign its height value to
					
					// the maxHeight variable
					if( columnHeight > maxHeight ) {
						maxHeight = columnHeight;
					}

					// based on the identified window width, columnsPerRow represents our total columns per row
					if(counter % columnsPerRow == 0){

						// apply max height in the current row
						secondLoopRow = 1;
						secondLoopCounter = 1;

						$el.children(options.column).each(function(){

							if(secondLoopRow === row){
								$(this).css({'height' : (maxHeight + options.spaceBetweenRows) + 'px'});
							}

							if(secondLoopCounter % columnsPerRow === 0){
								secondLoopRow = secondLoopRow + 1;	
							}

							secondLoopCounter = secondLoopCounter + 1;
						});

						// reset height
						maxHeight = 0;

						// step on the next row
						row = row + 1;
					}

					// increment columnCounter
					counter = counter + 1;
				});

			} else {

				// reset any applied height
				this.reset();

			}

			// onComplete calculation callback:
			this.options.onComplete.call();

			console.log('calculation finished.');
			console.log('Execution Time: ' + (performance.now() - this.execTmStart) + " milliseconds.");
        },

        // resetting removes all inline styling from $el child blocks
        reset: function () {
        	// reset any applied height to all columns
			this.$el.children(this.options.column).each(function(){
				$(this).removeAttr("style");
			});
        },

        // generate breakpoints using bootstrap default values
        generateBreakpointsObjUsingBoostrapDefaults: function () {
        	// assuming that all child elements of our attached element has the same column classes
			// read the first child element classes attribute
			var classStr = this.$el.children(this.options.column).first().attr('class');
			var classesArr = classStr.split(' '); // 
			var breakpointClasses = { // default bootstrap classes
				// xs does not need to be calculated for the reason that is a full span block
				'sm' : 0,
				'md' : 0,
				'lg' : 0
			};
			$.each(classesArr, function(index, value){
				// check for -sm-
				if(value.indexOf('-sm-') > -1) breakpointClasses['sm'] = value.split('-')[(value.split('-')).length-1];
				// check for -md-
				if(value.indexOf('-md-') > -1) breakpointClasses['md'] = value.split('-')[(value.split('-')).length-1];
				// check for -lg-
				if(value.indexOf('-lg-') > -1) breakpointClasses['lg'] = value.split('-')[(value.split('-')).length-1];
			});
			var breakpointsJsonString = "{";
			$.each(breakpointClasses, function(index, value) {
				if(value > 0){
					if( index == 'sm' ){
						// breakpoint:
						breakpointsJsonString += '"768":' + '"' + Math.ceil(12/value) + '"';
					} else if( index == 'md' ) {
						// breakpoint:
						breakpointsJsonString += '"992":' + '"' + Math.ceil(12/value) + '"';
					} else if( index == 'lg' ) {
						// breakpoint:
						breakpointsJsonString += '"1200":' + '"' + Math.ceil(12/value) + '"';
					}
				}
				breakpointsJsonString += ",";
			});
			// remove trailing ,
			breakpointsJsonString = breakpointsJsonString.replace(/,+$/,'');
			breakpointsJsonString += "}";
			console.log('calculating breakpoints finished.');
			return JSON.parse(breakpointsJsonString);
        },
        destroy: function() {
        	this.reset();
        	this.$el.removeData();
        }
    });

    /**
     * Register bootEqualizer plugin withint jQuery plugins.
     */
    $.fn[pluginName] = function(options) {
        var args = arguments;

        if (options === undefined || typeof options === 'object') {
            // Creates a new plugin instance, for each selected element, and
            // stores a reference withint the element's data
            return this.each(function() {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            // Call a public pluguin method (not starting with an underscore) for each 
            // selected element.
            if (Array.prototype.slice.call(args, 1).length == 0 && $.inArray(options, $.fn[pluginName].getters) != -1) {
                // If the user does not pass any arguments and the method allows to
                // work as a getter then break the chainability so we can return a value
                // instead the element reference.
                var instance = $.data(this[0], 'plugin_' + pluginName);
                return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
            } else {
                // Invoke the speficied method on each selected element
                return this.each(function() {
                    var instance = $.data(this, 'plugin_' + pluginName);
                    if (instance instanceof Plugin && typeof instance[options] === 'function') {
                        instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                    }
                });
            }
        }
    };

   
    /**
     * Default options
     */
    $.fn[pluginName].defaults = {

        // make use of boostrap default breakpoints
		bootstrapDefaultBreakpoints: true,

		// define columns in different breakpoints in assending order
		// Example: breakpoints: { ScreenWidth : NumberOfColumns }
		// Default Custom Values:
		breakpoints: {
			768  : 2, // screen width >= 768  -> 2 columns
			992  : 3, // screen width >= 992  -> 3 columns
			1200 : 4 // screen width >= 1200 -> 4 columns
		},

		// space in px between rows
		spaceBetweenRows: 35,

		// wrapper child element representing the column
		column: 'div',

		// define callbacks
		onStart: function() {},
		onComplete: function() {}

    };

})(jQuery, window, document);