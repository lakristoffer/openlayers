/**
 * @requires OpenLayers/Control.js
 * @requires OpenLayers/Util/hideFromOldIE.js
 */

OpenLayers.Control.Help = OpenLayers.Class( OpenLayers.Control, {
    
    // remember that suffixes are added to this class: ItemActive or ItemInactive
    btnClass: 'olControlButtonHelp',
    
    elemsToHideSelector: '',
    
    title: null,

    widget: null,
    
    cnt: null,

    initialize: function(options) {
        var self = this;
        OpenLayers.Control.prototype.initialize.apply(self,[options]);

        //self.elemsToHideSelector = self.classElemToHide.join(',');
        self.type = OpenLayers.Control.TYPE_BUTTON;
        this.title = OpenLayers.Lang.translate('Keyboard shortcuts');        
    }, // initialize
    
    draw: function () {
        var self = this, 
            cName = 'help-button nkButton',
            mapped,
            btn;

	    mapped = 'OpenLayers_Control_Help' + self.map.id;
        btn    = OpenLayers.Util.createButton( mapped, null, null, null, 'static');
                    
        OpenLayers.Event.observe(btn, 'click', OpenLayers.Function.bind(self.toggleWidget, self));

        OpenLayers.Util.appendToggleToolClick({'self':self});
        
        btn.title = self.title;
        btn.className = btn.className === "" ? cName : btn.className + " " + cName;
        btn.innerHTML = OpenLayers.Util.hideFromOldIE('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="41.618px" height="72px" viewBox="0 0 41.618 72" class="icon question"><path d="M 36.117,4.629 C 32.458,1.486 27.459,-0.004 21.374,0 16.892,0 13.007,0.542 9.71,1.67 6.514,2.768 3.661,4.166 1.168,5.874 L 0,6.673 6.149,18.478 7.635,17.45 c 0.741,-0.509 1.598,-1.019 2.578,-1.522 0.962,-0.498 1.968,-0.934 3.028,-1.318 1.044,-0.372 2.087,-0.665 3.126,-0.871 1.022,-0.196 1.981,-0.29 2.86,-0.29 2.915,-0.013 4.613,0.652 5.312,1.445 0.896,0.979 1.388,2.249 1.399,4.14 -0.008,1.426 -0.334,2.528 -0.947,3.456 -0.731,1.094 -1.651,2.167 -2.79,3.21 -1.196,1.105 -2.488,2.256 -3.878,3.462 -1.515,1.313 -2.853,2.858 -4.016,4.617 -1.199,1.816 -2.116,3.93 -2.772,6.338 -0.464,1.674 -0.679,3.544 -0.679,5.598 0,1.027 0.057,2.1 0.162,3.224 l 0.138,1.441 h 1.45 11.943 v -1.592 c 0,-2.441 0.411,-4.333 1.128,-5.698 0.802,-1.553 1.77,-2.896 2.902,-4.065 1.179,-1.204 2.489,-2.349 3.917,-3.421 1.586,-1.189 3.042,-2.562 4.358,-4.111 1.369,-1.61 2.498,-3.536 3.391,-5.754 0.94,-2.343 1.373,-5.163 1.373,-8.474 C 41.64,12.119 39.773,7.74 36.117,4.629 M 18.203,54.54 c -2.533,-0.01 -4.812,0.76 -6.497,2.344 -1.72,1.583 -2.575,3.843 -2.558,6.341 -0.017,2.502 0.838,4.762 2.546,6.377 1.667,1.608 3.932,2.398 6.447,2.398 0.021,0 0.04,0 0.062,-0.002 2.642,0.01 4.99,-0.758 6.692,-2.401 1.707,-1.61 2.563,-3.87 2.545,-6.372 0.019,-2.498 -0.838,-4.758 -2.558,-6.341 -1.71,-1.602 -4.044,-2.354 -6.679,-2.344" /></svg>');

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
     

    hideControls: function () {        
    	OpenLayers.Element.removeClass( this.div, 'active' );
    }, //hideControls


    showControls: function () {
        // user OS sniffing to display correct key name/symbol
        var mac = (navigator.platform && navigator.platform.indexOf('Mac') !== -1) || (navigator.userAgent && navigator.userAgent.indexOf('iPhone') !== -1);
        var ctrlKey = mac ? '⌘ ' : 'Ctrl + ';
        var html = '<div class="header">';
        html += '<h1 class="h">' + OpenLayers.Lang.translate('Keyboard shortcuts') + '</h1>';
        html += '<p>' + OpenLayers.Lang.translate('You can navigate using the following keyboard shortcuts') + ':</p>';
        html += '<p>' + OpenLayers.Lang.translate('Press TAB to change selected control. Press ENTER to activate the selected control.') + '</p>';
        html += '</div>';
        html += '<div class="shortcuts-panel"><table><thead><tr><th scope="col">' + OpenLayers.Lang.translate('Keyboard shortcut') + '</th><th scope="col">' + OpenLayers.Lang.translate('Function') + '</th></tr></thead><tbody>';
        html += '<tr><td>F11</td><td>Fullskjerm</td></tr>';
        html += '<tr><td>' + ctrlKey + 'P</td><td>Skriv ut</td></tr>';
        html += '<tr><td>+ og -</td><td>Zoom</td></tr>';
        html += '<tr><td>Piltaster</td><td>Panorere</td></tr>';
        html += '<tr><td>Home, End, PageUp, PageDown</td><td>Panorere raskt</td></tr>';
        html += '</tbody></table></div>';
        this.cnt.innerHTML = html;

	OpenLayers.Util.renderToggleToolClick({'self':this});
    	OpenLayers.Element.addClass( this.div, 'active' );
    }, // showControls

    enable: function () {
    }, // enable

    disable: function () {
    }, // disable
   
    toggleWidget: function () {
        OpenLayers.Element.hasClass( this.div, 'active' ) ? this.hideControls() : this.showControls();
    }, // toggleWidget
    
    toggleControls: function () {
        var self = this;
    }, //togglecontrols
    
    CLASS_NAME: "OpenLayers.Control.Help"
}); // OpenLayers.Control.GetURL
