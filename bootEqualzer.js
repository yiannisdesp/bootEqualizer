/**
 * bootEqualizer jQuery Plugin v0.0.9
 * Set automatically equal height on each column under a parent column container using breakpoints
 * Yiannis Despotis, 2016
 */
(function($){

	$.fn.bootEqualizer = function(options) {

		// Define plugin settings
		var settings = $.extend({
			// define columns in different breakpoints in assending order
			breakpoints: {
				768:2,
				992:3,
				1200:4
			},
			// extra margin
			rowSpace: 50,
			// element child columns class
			columnClass: 'bootEqualizer-column'
	    }, options );

		// initialize max height & column height
	    var maxHeight = 0;
		var columnHeight = 0;

		// main functionality
		function equalizeColumns(containerElement){
			
			// get window width
			var windowWidth = window.innerWidth;

			// define how many columns a row has
			var columnsPerRow = 0;
			$.each(settings.breakpoints, function(breakpoint, columnNumber){
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
				var totalRows = Math.ceil($(containerElement).children("." + settings.columnClass).length / columnsPerRow);
				$(containerElement + " ." + settings.columnClass).each(function(){

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

						$(containerElement + " ." + settings.columnClass).each(function(){

							if(secondLoopRow === row){
								$(this).css({'height' : (maxHeight + settings.rowSpace) + 'px'});
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
				$(containerElement + " ." + settings.columnClass).each(function(){
					$(this).removeAttr("style");
				});
			}
		}

		function recalculateOnResize(containerElement) {
			// recalculate on window resize
			$(window).resize(function(){
				equalizeColumns(containerElement);
			});
		}

		// container jQuery element
		var $containerElement;
		// container identifier
		var containerElement;

		// calculate on each attached element
		return this.each(function() {

			$containerElement = $(this);

			// identify class or ID
        	var IDAttribute = $containerElement.attr('id');
        	var classAttribute = $containerElement.attr("class");
        	var className = "";
        	if(classAttribute !== typeof undefined && classAttribute !== false && classAttribute !== undefined){
        		className = classAttribute.replace(new RegExp(" ", 'g'), ".");
        	}
			
			// For some browsers, 'attr' is undefined; for others, 'attr' is false.  Check for both.
			if (typeof IDAttribute !== typeof undefined && IDAttribute !== false && IDAttribute !== undefined) {
			    // take ID
			    containerElement = "#" + IDAttribute;
			}else{
				// take class
				containerElement = "." + className;
			}
			
			// bind on resize event
			recalculateOnResize(containerElement);
			// calculate
			equalizeColumns(containerElement);

		});

	}
}) (jQuery);