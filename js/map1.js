mapboxgl.accessToken =
    'pk.eyJ1Ijoia2NoYW81ODkiLCJhIjoiY21rb2ppZ3ZnMDE4ODNxcHBkd2c2cTU5biJ9.3r2ICzOPgm8Ce-m6q0GcJQ';
const map = new mapboxgl.Map({
    container: 'map',
    projection: 'albers',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 4,
    center: [-98, 39]
});

async function geojsonFetch() {
    let response = await fetch('assets/us-covid-2020-rates.json');
    let rate_data = await response.json();

    map.on('load', function loadingData() {
        map.addSource('rate_data', {
            type: 'geojson',
            data: rate_data
        });

        map.addLayer({
            'id': 'rate_data_layer',
            'type': 'fill',
            'source': 'rate_data',
            'paint': {
                'fill-color': [
                    'step',
                    ['get', 'rates'],
                    '#FFF5F0',
                    10,
                    '#FEE0D2',
                    20,
                    '#FCBBA1',
                    30,
                    '#FC9272',
                    40,
                    '#FB6A4A',
                    50,
                    '#EF3B2C',
                    60,
                    '#CB181D',
                    70,
                    "#A50F15",
                    80,
                    '#67000D',
                    90,
                    '#000000'
                ],
                'fill-outline-color': '#BBBBBB',
                'fill-opacity': 0.7,
            }
        });

        const layers = [
            '0-9%',
            '10-19%',
            '20-29%',
            '30-39%',
            '40-49%',
            '50-59%',
            '60-69%',
            '70-79%',
            '80-89%',
            '>90%'
        ];
        const colors = [
            '#FFF5F0',
            '#FEE0D2',
            '#FCBBA1',
            '#FC9272',
            '#FB6A4A',
            '#EF3B2C',
            '#CB181D',
            '#A50F15',
            '#67000D',
            '#000000'
        ];

        const legend = document.getElementById('legend');
        legend.innerHTML = "<b>Covid Rates<br>(cases/1000 people)</b><br><br>";


        layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });
    });

    map.on('mousemove', ({point}) => {
        const county = map.queryRenderedFeatures(point, {
            layers: ['rate_data_layer']
        });
        document.getElementById('text-description').innerHTML = county.length ?
            `<h3>${county[0].properties.county} County, ${county[0].properties.state}</h3><p><strong><em>${county[0].properties.rates}</strong> % rate per 1000 people</em></p>` :
            `<p>Hover over a county!</p>`;
    });
}

geojsonFetch();