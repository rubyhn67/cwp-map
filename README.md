# cwp-map
Leaflet JS custom map panes, with CT town labels displayed on top of thematic polygon map

## Demo on Nora's repo (designed for zoom levels 10-14)
http://rubyhn67.github.io/cwp-map/index.html

## Requires
- Leaflet 1.x
- ArcGIS Online account (subscription)

## Overview of steps:
- Create ArcGIS map with town labels (hide boundaries from view)
- Publish as Tile Layer on ArcGIS Online service (Trinity College subscription) http://www.arcgis.com/home/item.html?id=31c6f4f4360f4ab7b330b129086216de
- Use esri-leaflet to display town labels tile layer
- See Leaflet custom map panes tutorial to display layers at different z-levels http://leafletjs.com/examples/map-panes.html

## Questions for MAGIC
- Can your team create a better ArcGIS tile layer of town names? In my version, some towns display multiple labels (see Torrington and Winchester)
- If yes, can MAGIC host this label-only tile layer on your server? I’m thinking it would be a better long-term public solution than Trinity’s ArcGIS Online account.

## Alternatives considered
- Also tried free CartoDB light labels only layer, but insufficient detail
- Also tried creating labels-only tile layer in Mapbox Studio Classic, and MapBox Studio, but appears to require a subscription beyond free level; this testing example comes from http://googlemapsmania.blogspot.com/2016/02/switching-map-labels-in-leaflet.html

## To Do
- Rebuild geojson data file for pop density
- change from click to hover, and add legend to display colors and hover data
- other minor changes
