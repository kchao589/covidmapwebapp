# Lab 3: Covid Web Map Application

### Introduction
This project consists of two maps displaying Covid information from the United States in two different forms. The first map is a choropleth
map showing Covid rates per thousand people by US county. As the rate increases, the symbolizing color darkens. The second map is a proportional 
symbol map showing the number of Covid cases in the US, also at the county level. As a county's number of cases increases, the corresponding 
circle on the map also increases in size.

#### Incomplete Map
In this project, the legend and symbology for the proportional symbol map aren't fully fuctional. I was unable to determine how to best 
create a scaling system to make each circle correspond with the amount of cases in that county. The circles do show the number of cases 
in each county when clicked, but the sizes don't reflect this, and the legend also has this issue. 

### Data Sources
The Covid case/death data comes from The New York Times.
The population data used to calculate Covid rates is the 2018 ACS 5 year estimates.
The US county boundary shapefile was downloaded from the US Census Bureau.

This project also made use of the Google Font library, as well as the MapBox GL JS API.

### Map Screenshots
<img width="1918" height="1020" alt="covid rates county map" src="https://github.com/user-attachments/assets/4f6490c7-b066-4ce9-8a8b-b1ff8e8df6ed" />
<img width="1918" height="1018" alt="covid cases county map" src="https://github.com/user-attachments/assets/17fc82ac-a9c2-459f-a187-39a0e5e49dcb" />
