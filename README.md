# AQI Comparator
Users can quickly look up the Air Quality Index of the nearest city (IP-based geolocation) and another city of the user's choice. The goal is to provide a simple and convenient way for users to get air quality information that may inform decisions on remote work/relocation or recreational travel.

**Demo:** On request - both to avoid exposing API key per AirVisual API policy, and owing to limited monthly call rate. The API key is currently redacted; otherwise everything is present in this repo.

![AQI lookup demo screen](https://i.postimg.cc/zD74Ng75/aqi-demoscreen.jpg)

## How it's made:
**Tech used:** HTML, CSS, JavaScript.
This uses the AirVisual API. To the left, the user's current city is determined through IP-based geolocation and the API call returns the current or latest AQI on record. 

To the left of the interface, the user chooses by country/state/city, with each choice providing the query parameter for the next API call. The response returns the AQI of the selected city. 

Users can then reset and search for another city.

## Optimizations
* Earlier efforts have helped streamline the existing code with more efficient methods to reset the dropdowns, and there are likely more streamlining opportunities.
* Address API key exposure: For a live website, the API key would be exposed regardless as this is currently all client-side code. Based on the goal of conveniently providing access to air quality information, requiring the user to obtain their own API key may defeat the purpose. Instead, I could build this out as part of a larger one-stop resource to support travel/relocation.
* Reduce request volume: The current approach makes a high volume of requests per click to dynamically populate the dropdowns. It is designed to work around existing limitations on the current access tier of the API. 
* Expose more information: More in terms of the design, making the explanatory text on AQI more prominent, as well as surfacing more weather and specific pollution data for the user to see either in charts (change over specified interval) they could manipulate directly.
* Filter or sort by AQI: Providing more options for search that allows for users to seek out potential destinations by air quality instead. This could also be more easily solved with a different access tier/API key.

## Lessons learned
I used .gitignore to protect files and variables for the first time in this project, where other projects made use of fully public APIs that did not limit traffic.
I would build this differently now, mainly to better reflect OOP principles. 
Combining design cues with the current "reset" button functionality directs the user clearly to the next step while limiting irrelevant input that could otherwise result in invalid API calls. This was the simplest solution, but I would like to find a more elegant one.

## Other projects
**Memory Challenge**: https://github.com/h-yung/memory-challenge
