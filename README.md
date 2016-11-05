# bootEqualizer jQuery Plugin v1.0.0

Dynamically make all column blocks i.e. '.col-sm-6 .col-md-4 .col-lg-4' withing a container i.e. '.row' 
equal in height in each row depending on screen width breakpoint.
The height is calculated to be equal the max height in the current row.

This plugin may be useful for you only when you have dynamically generated content inside bootstrap rows with unpredicted different heights.


[Documentation & Demo](https://yiannisdesp.github.io/bootEqualizer/)

### Dependencies
 - jQuery 1.9+

#### Installation
 - Include bootEqualizer.min.js after jQuery

#### How it works

##### HTML:
	
	<div id="my-columns-wrapper">

	     <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
	         <!-- Column content -->
	     </div>
	     
	     <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
	         <!-- Column content -->
		 </div>
		 
	     <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
	         <!-- Column content -->
	     </div>
	     
	     <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
	         <!-- Column content -->
	     </div>
	</div>

##### JavaScript:

    // with default options
    $("#my-columns-wrapper").bootEqualizer();
    
    // with custom options
    $("#my-columns-wrapper").bootEqualizer({
        // options here
    });
    
    // a class can also be used for multiple elements like:
    $(".my-columns-wrapper").bootEqualizer();
    
    [IMPORTANT]
    // in order to work when the window is resized,
    // we must call the method: recalculate: (see methods section below)
    $(window).resize(function(){
        $('#bootEqualizer').bootEqualizer('recalculate');
    });


#### Options

   

    {
        // make use of boostrap default breakpoints
        bootstrapDefaultBreakpoints: true,
    
        // The following option is used only when
        // bootstrapDefaultBreakpoints is set to false
        //
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
        column: 'div'
    }

#### Callbacks

    // Currently there are 2 callbacks which can
    // be used like:

    $("#my-columns-wrapper").bootEqualizer({
        onStart: function() {
            // do something before calculation starts
        },
        onComplete: function() {
            // do something after the calculation finishes
        }
    });


#### Methods

    // recalculate Method recalculates the column height within the
    // new screen dimensions
    
    $("#my-columns-wrapper").bootEqualizer('recalculate');

    // destroy Method removes the calculated height from the dom
    
    $("#my-columns-wrapper").bootEqualizer('destroy');

### License
bootEqualizer plugin is released under the [MIT License](http://en.wikipedia.org/wiki/MIT_License). Feel free to use it in personal and commercial projects.