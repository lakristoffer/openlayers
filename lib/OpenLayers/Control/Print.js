/**
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/Util/hideFromOldIE.js
 */
OpenLayers.Control.Print = 
    OpenLayers.Class(OpenLayers.Control, {
    
    // remember that suffixes are added to this class: ItemActive or ItemInactive
    btnClass: 'olControlButtonPrint',
    title: null,
    widget: null,
    cnt: null,

    initialize: function(options) {
        OpenLayers.Control.prototype.initialize.apply(this, [options]);

        this.type = OpenLayers.Control.TYPE_BUTTON;
        OpenLayers.Util.extend(OpenLayers.Lang.nb, {
            'Print': 'Skriv ut'
        });
        
        this.title = OpenLayers.Lang.translate('Print');
    }, // initialize
    
    draw: function () {
        var self   = this, cName = 'Print-button nkButton';
	    var mapped = 'OpenLayers_Control_Print' + self.map.id;
        var btn    = OpenLayers.Util.createButton( mapped, null, null, null, 'static');
                    
        OpenLayers.Event.observe(btn, 'click', 
            OpenLayers.Function.bind( self.printPage, self )
        );
        
        btn.title = self.title;
        btn.className = btn.className === "" ? cName : btn.className + " " + cName;
        btn.innerHTML = OpenLayers.Util.hideFromOldIE('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" preserveAspectRatio="xMinYMid meet" class="icon print"><path d="M17.617,2H6.383v3.299h11.234V2z M21.026,6.487H2.974C2.437,6.487,2,6.934,2,7.483v7.327h2.934v-4.448h14.133v4.448H22V7.483C22,6.934,21.564,6.487,21.026,6.487z M19.885,8.929c-0.43,0-0.779-0.356-0.779-0.796s0.35-0.797,0.779-0.797s0.778,0.357,0.778,0.797S20.314,8.929,19.885,8.929z M16.787,20.828h-4.701c-1.703,0-0.883-4.129-0.883-4.129s-3.937,0.979-3.987-0.867v-3.79H6.069v5.339l0.336,0.344L10.586,22h7.347v-9.958h-1.146V20.828z" /></svg>');

        if (self.div == null) {
            self.div = btn;
        } else {
            self.div.appendChild(btn);
        }

    	self.cnt = document.createElement("div");
        OpenLayers.Element.addClass(self.cnt, "cnt");

        self.widget = OpenLayers.Util.createWidget( self.cnt, 1 );
        self.div.appendChild( self.widget );
  
        return self.div;
    }, // draw
     
    printPage: function () {
        if (window && window.print) {
            window.print();
        }
    },

    hideControls: function () {        
    	OpenLayers.Element.removeClass( this.div, 'active' );
    }, //hideControls

    showControls: function () {
        var html = '<h1 class="h">' + OpenLayers.Lang.translate('Print') + '</h1>';
    	this.cnt.innerHTML = html;
    	OpenLayers.Element.addClass( this.div, 'active' );
    }, // showControls

    enable: function () {
    }, // enable

    disable: function () {
    }, // disable
   
    togglePrintPreview: function () {
    	OpenLayers.Element.hasClass( this.div, 'active' ) ? this.hideControls() : this.showControls();
    }, // toggleGetURL
    
    toggleControls: function () {      
	   var self = this;
    },//togglecontrols
    
    CLASS_NAME: "OpenLayers.Control.Print"
}); // OpenLayers.Control.Print
