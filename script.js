// Map panes requires Leaflet 1.x
// See Leaflet tutorial http://leafletjs.com/examples/map-panes.html
// template by http://github.com/jackdougherty/leaflet-map/
var tabnum = "0";
// set up the map center and zoom level
var map = L.map('map', {
  center: [41.8, -72.5], // [41.5, -72.7] for Connecticut; [41.76, -72.67] for Hartford county or city
  zoom: 10.2, // zoom 9 for Connecticut; 10 for Hartford county, 12 for Hartford city
});

// customize link to view source code; add your own GitHub repository
//map.attributionControl
//.setPrefix('Reference:' + '<br />' + '2010-14 American Community Survey 5-Year Estimates,' + '<br />' + '2009-13 American Community Survey 5-Year Estimates,' + '<br />' + '2009-13 American Community Survey 5-Year Estimates' + '<br />' + '2015 (2015 Benchmark) CT Dept. of Labor' + '<br />' + 'View <a href="http://github.com/ngocdo67/leaflet-map-panes">code on GitHub</a>, created with' + '<br />' +  '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
map.attributionControl
.setPrefix('Reference:' + '<br />' + 'Capital Workforce Partners 2014-15 Program Year' + '<br />' + 'View <a href="http://github.com/ngocdo67/leaflet-map-panes">code on GitHub</a>, created with' + '<br />' + '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');

// This pane is above markers but below popups
// see default pane z-index levels: https://github.com/Leaflet/Leaflet/blob/master/dist/leaflet.css#L73
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;

// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';

// optional: add legend to toggle any baselayers and/or overlays
// global variable with (null, null) allows indiv layers to be added inside functions below
var controlLayers = L.control.layers( null, null, {
  position: "topright", // suggested: bottomright for CT (in Long Island Sound); topleft for Hartford region
  collapsed: false // false = open by default
})/*.addTo(map)*/;

// REMOVE AFTER MAP CONSTRUCTION: optional Zoom Label (also in index.html)
//L.control.zoomLabel().addTo(map);

// optional: reposition zoom control other than default topleft
//L.control.zoom({position: "topright"}).addTo(map);

/* BASELAYERS */
var lightNoLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// ArcGIS Online tile layer, hosted on subscription service http://trincoll.maps.arcgis.com
/*var arcGISLabels = L.esri.tiledMapLayer({
    url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/ConnecticutTownLabels/MapServer",
    pane: 'labels'
});
controlLayers.addBaseLayer(arcGISLabels, 'ArcGIS Online Labels'); // replaced addOverlay with addBaseLayer for radio buttons

// free CartoDB labels only layer, but insufficient detail
var lightOnlyLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    pane: 'labels'
});
controlLayers.addBaseLayer(lightOnlyLabels, 'CartoDB Labels');

// Mapbox
var mapboxLabels = L.tileLayer('https://{s}.tiles.mapbox.com/v3/gmapsmania.f8637bc8/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    pane: 'labels'
});
controlLayers.addBaseLayer(mapboxLabels, 'GMapsMania Mapbox Labels');*/ // originally: addOverlay

// ArcGIS Online tile layer, hosted on subscription service http://trincoll.maps.arcgis.com
var arcGISLabelsCWP = L.esri.tiledMapLayer({
    url: "http://tiles.arcgis.com/tiles/5rblLCKLgS4Td60j/arcgis/rest/services/CapitalWorkforcePartners37towns/MapServer",
    pane: 'labels'
}).addTo(map);
//controlLayers.addBaseLayer(arcGISLabelsCWP, 'ArcGIS CWP Labels'); // replaced addOverlay with addBaseLayer for radio buttons

function resetAttribute (tabnum){
  map.attributionControl.removeAttribution ("Reference");
  if (tabnum.localeCompare("1") == 0) {
    map.attributionControl
    .setPrefix('Reference:' + '<br />' + 'Capital Workforce Partner 2014-15 Program Year' + '<br />' + 'View <a href="http://github.com/ngocdo67/leaflet-map-panes">code on GitHub</a>, created with' + '<br />' +  '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
  } else if (tabnum.localeCompare("2") == 0) {
    map.attributionControl
    .setPrefix('Reference:' + '<br />' + '2010-2014 American Community Survey 5-Year Estimates' + '<br />' + 'View <a href="http://github.com/ngocdo67/leaflet-map-panes">code on GitHub</a>, created with' + '<br />' +  '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
  } else if (tabnum.localeCompare("3") == 0) {
    map.attributionControl
    .setPrefix('Reference:' + '<br />' + '2009-2013 American Community Survey 5-Year Estimates' + '<br />' + 'View <a href="http://github.com/ngocdo67/leaflet-map-panes">code on GitHub</a>, created with' + '<br />' +  '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
  } else if (tabnum.localeCompare("4") == 0) {
    map.attributionControl
    .setPrefix('Reference:' + '<br />' + '2009-2013 American Community Survey 5-Year Estimates' + '<br />' + 'View <a href="http://github.com/ngocdo67/leaflet-map-panes">code on GitHub</a>, created with' + '<br />' +  '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
  } else if (tabnum.localeCompare("5") == 0) {
    map.attributionControl
    .setPrefix('Reference:' + '<br />' + '2015 CT Dept. of Labor	' + '<br />' + 'View <a href="http://github.com/ngocdo67/leaflet-map-panes">code on GitHub</a>, created with' + '<br />' +  '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>');
  }
}
function getColor(d) {
  console.log(d);
  if(tabnum.localeCompare("2") == 0){
    if (d > -1) {
      return d > 47  ? '#F6AA00' :
      d > 43  ? '#F8B824' :
      d > 39   ? '#FFD54F' :
      d > 35   ? '#FDD976' :
      '#FFE699';
    } else {
      return "#ffffff";
    }
  } else if(tabnum.localeCompare("3") == 0){
    if (d > -1) {
      return d > 106000  ? '#FFE699' :
      d > 86000  ? '#FDD976' :
      d > 66000   ? '#FFD54F' :
      d > 46000   ? '#F8B824' :
      '#F6AA00';
    } else {
      return "#ffffff";
    }
  } else if(tabnum.localeCompare("4") == 0){
    if (d > -1) {
      return d > 0.29  ? '#F6AA00' :
      d > 0.22  ? '#F8B824' :
      d > 0.15   ? '#FFD54F' :
      d > 0.08   ? '#FDD976' :
      '#FFE699';
    } else {
      return "#ffffff";
    }
  } else if(tabnum.localeCompare("5") == 0){
    if (d > -1) {
      return d > 0.086  ? '#F6AA00' :
      d > 0.076  ? '#F8B824' :
      d > 0.066   ? '#FFD54F' :
      d > 0.055   ? '#FDD976' :
      '#FFE699';
    } else {
      return "#ffffff";
    }
  } else {
    return '#fdd017';
  }
}

function style (feature) {
  var color = '';
  return {
    fillColor: getColor(feature.properties[tabnum]),
    weight: 1,
    opacity: 1,
    color: '#000000',
    dashArray: '1',
    fillOpacity: 0.7
  }
}

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
  if(tabnum.localeCompare("2") == 0){
    var age = props.properties[tabnum];
    this._div.innerHTML = '<h4>Median Age</h4>' +  (props ?
        'Age: ' + checkNull(age.toFixed(1)) + ' years old' + '<br />' +
        '<i>Click on a town for full profile in PDF</i>'
        : 'Hover over a town');
  } else if(tabnum.localeCompare("3") == 0){
    this._div.innerHTML = '<h4>Median Household Income</h4>' +  (props ?
        'Income: $' + checkNull(props.properties[tabnum]) + '<br />' +
        '<i>Click on a town for full profile in PDF</i>'
        : 'Hover over a town');
  } else if(tabnum.localeCompare("4") == 0){
    var povertyRate = props.properties[tabnum] * 100;
    this._div.innerHTML = '<h4>People in Poverty</h4>' +  (props ?
        'Poverty: ' + checkNull(povertyRate.toFixed(1)) + ' %' + '<br />' +
        '<i>Click on a town for full profile in PDF</i>'
        : 'Hover over a town');
  } else if(tabnum.localeCompare("5") == 0){
    var unemployment = props.properties[tabnum] * 100;
    this._div.innerHTML = '<h4>Unemployment Rate</h4>' +  (props ?
        'Unemployment Rate: ' + checkNull(unemployment.toFixed(1)) + ' %' + '<br />' +
        '<i>Click on a town for full profile in PDF</i>'
        : 'Hover over a town');
  } else {
    this._div.innerHTML = '<h4>Number of People Served</h4>' +  (props ?
        'Adult: ' + checkNull(props.properties.adult) + '<br />' + 'Youth: ' + checkNull(props.properties.youth)
         + '<br />' + '<i>Click on a town for full profile in PDF</i>'
        : 'Hover over a town');
  }
};

info.addTo(map);

var legend = L.control({position: "bottomright"});

legend.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info legend');
  this.update();
  return this._div;
}
legend.update = function (props) {
  var length = 5,
    grades2 = [30, 35, 39, 43, 47],
    grades3 = [25000, 46000, 66000, 86000, 106000],
    grades4 = [0.01, 0.08, 0.15, 0.22, 0.29],
    grades5 = [0.01, 0.056, 0.066, 0.076, 0.086],
    labels = [],
    from, to;
  for (var i = 0; i < length; i++) {
    if (tabnum.localeCompare("2") == 0) {
      from = grades2[i];
      to = grades2[i + 1];
      labels.push(
      '<i style="background:' + getColor(from) + '"></i> ' +
      (from).toFixed(1) + (to ? '&ndash;' + (to-1).toFixed(1) : '+'));
    } else if (tabnum.localeCompare("3") == 0){
      from = grades3[i];
      to = grades3[i + 1];
      labels.push(
      '<i style="background:' + getColor(from) + '"></i> ' +
      checkNull(from) + (to ? '&ndash;' + checkNull(to-1) : '+'));
    } else if (tabnum.localeCompare("4") == 0){
      from = grades4[i];
      to = grades4[i + 1];
      labels.push(
      '<i style="background:' + getColor(from) + '"></i> ' +
      (from*100).toFixed(1) + (to ? '&ndash;' + (to*100-0.1).toFixed(1) : '+'));
    } else if (tabnum.localeCompare("5") == 0){
      from = grades5[i];
      to = grades5[i + 1];
      labels.push(
      '<i style="background:' + getColor(from) + '"></i> ' +
      (from*100).toFixed(1) + (to ? '&ndash;' + (to*100-0.1).toFixed(1) : '+'));
    } else {
      from = 0;
      to = 0;
    }
  }
  this._div.innerHTML = labels.join('<br>');
  return this._div;
}

legend.addTo(map);

//legend.addTo(map);
/*var legend = L.control();

// Modify grades to match the range cutoffs inserted above
// In this example, the last grade will appear as "2+"
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    length = 5,
    grades2 = [30.00, 33.63, 37.26, 40.90, 44.53],
    grades3 = [25000, 45000, 65000, 85000, 105000],
    grades4 = [1, 7.52, 14.05, 20.58, 27.11, 27.12],
    grades5 = [1, 5.2, 6.8, 8.4, 10],
    labels = [],
    from, to;

  for (var i = 0; i < length; i++) {
    if (tabnum.localeCompare("2") == 0) {
      from = grades2[i];
      to = grades2[i + 1];
    } else if (tabnum.localeCompare("3") == 0){
      from = grades3[i];
      to = grades3[i + 1]
    } else if (tabnum.localeCompare("4") == 0){
      from = grades4[i];
      to = grades4[i + 1]
    } else {
      from = grades5[i];
      to = grades5[i + 1]
    }
    labels.push(
      '<i style="background:' + getColor(from + 1) + '"></i> ' +
      from + (to ? '&ndash;' + to : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};

//if (tabnum.localeCompare("2") == 0 || tabnum.localeCompare("3") == 0 ||  tabnum.localeCompare("4") == 0 || tabnum.localeCompare("5") == 0){
  legend.addTo(map);
//}*/


var geoJsonLayer = 0;
/* POLYGON OVERLAY */
// load polygon geojson, using data to define fillColor, from local directory
// *TO DO* rebuild file for pop density
// *TO DO* change from click to hover, and add legend to display colors and hover data
$.getJSON("cwp-37-towns-v8.json", function (data) {   // insert pathname to your local directory file
  geoJsonLayer = L.geoJson(data, {
    style: style,
    onEachFeature: function( feature, layer) {
      layer.on({
        mouseover: function (e) {
          var layer = e.target;
          var popupText = "<b>" + feature.properties.name + "</b>"   // replace labels with those from your own geojson
         + "<br><a href='" + feature.properties.profile + "'>Town Profile</a>";
          layer.bindPopup(popupText); //add this for popup text
          layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
          });

          if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
          }
          info.update(feature);
        },
        mouseout: function (e) {
          geoJsonLayer.resetStyle(e.target);
          info.update();
        }/*,
        click: function (e) {
          window.location.href = (feature.properties.profile);
        }*/ // Go to website when clicked
      });
    }
  }).addTo(map);
  //controlLayers.addOverlay(geoJsonLayer, 'Towns Served');  // insert your 'Title' to add to legend
  //controlLayers.addOverlay(geoJsonLayer, 'CT Pop 2010');  // insert your 'Title' to add to legend
});

function checkNull(val) {
  if (val == 0) {
    return "--";
  }
  if (val != null || val == "NaN") {
    return comma(val);
  } else {
    return "--";
  }
}

function comma(val){
  while (/(\d+)(\d{3})/.test(val.toString())){
    val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
  }
  return val;
}

$(".toolItem").click(function() {
  $(".toolItem").removeClass("selected");
  $(this).addClass("selected");
  tabnum = $(this).html().split(".")[0];
  geoJsonLayer.setStyle(style);
  legend.update(tabnum);
  resetAttribute(tabnum);
});
