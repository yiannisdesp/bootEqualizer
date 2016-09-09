# bootEqualizer jQuery Plugin v0.0.9

Automatically equalize column heights on different breakpoints.
Default breakpoints were set from bootstrap 3 grid.

### Dependencies
 - jQuery 1.9+

#### Installation
 - Include bootEqualizer.min.js

#### How it works

##### HTML:
	
	<!-- Columns wrapper -->
    <div id="bootEqualizer">
	    <!-- Column -->
	    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 bootEqualizer-column">
		    <!-- Column content -->
	    </div>
	    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 bootEqualizer-column">
		    <!-- Column content -->
	    </div>
	    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 bootEqualizer-column">
		    <!-- Column content -->
	    </div>
	    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 bootEqualizer-column">
		    <!-- Column content -->
	    </div>
    </div>

##### JavaScript:

    $("#bootEqualizer").bootEqualizer(); // with default options
    $("#bootEqualizer").bootEqualizer({ // with custom options
	    // options here
    });


#### Options

    {
	    // define columns in different breakpoints in assending order
		breakpoints: {
			768:2,
			992:3,
			1200:4
		},
		
		// row margins in px
		rowSpace: 50,
		
		// element child columns class
		columnClass: 'bootEqualizer-column'
	}


### License
bootEqualizer plugin is released under the [MIT License](http://en.wikipedia.org/wiki/MIT_License). Feel free to use it in personal and commercial projects.
