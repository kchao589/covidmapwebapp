mapboxgl.accessToken =
            'pk.eyJ1Ijoia2NoYW81ODkiLCJhIjoiY21rb2ppZ3ZnMDE4ODNxcHBkd2c2cTU5biJ9.3r2ICzOPgm8Ce-m6q0GcJQ';
let map = new mapboxgl.Map({
    container: 'map',
    projection: 'albers',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 0,
    minZoom: 4,
    center: [-98, 39]
});
const grades = [4, 5, 6],
    colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
    radii = [5, 15, 20];
map.on('load', () => {
    map.addSource('cases', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.json'
    });
    map.addLayer({
        'id': 'covid-cases',
        'type': 'circle',
        'source': 'cases',
        'minzoom': 0,
        'paint': {
            'circle-radius': {
                'property': 'cases',
                'stops': [
                    [grades[0], radii[0]],
                    [grades[1], radii[1]],
                    [grades[2], radii[2]]
                ]
            },
            'circle-color': {
                'property': 'cases',
                'stops': [
                    [grades[0], colors[0]],
                    [grades[1], colors[1]],
                    [grades[2], colors[2]]
                ]
            },
            'circle-stroke-color': 'white',
            'circle-stroke-width': 1,
            'circle-opacity': 0.6
        }
    });
    map.on('click', 'covid-cases', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>Cases:</strong> ${event.features[0].properties.cases}`)
            .addTo(map);
    });
});
const legend = document.getElementById('legend');
var labels = ['<strong>Cases</strong>'],
    vbreak;
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    dot_radii = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
        'px; height: ' +
        dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
        '</span></p>');
}
const source =
    '<p style="text-align: right; font-size:10pt">Source: <a href="https://earthquake.usgs.gov/earthquakes/">USGS</a></p>';
legend.innerHTML = labels.join('') + source;