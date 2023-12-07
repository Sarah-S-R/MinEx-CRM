let map;
let markers = [];

function initMap() {
    const options = {
        center: { lat: 47.5556, lng: -52.7453 },
        zoom: 9
    };

    map = new google.maps.Map(document.getElementById("map"), options);

    // Load saved locations from local storage
    const storedLocations = JSON.parse(localStorage.getItem("locations")) || [];
    storedLocations.forEach(location => {
        placeMarker(location.lat, location.lng, location.label, true);
    });

    // Handle click event on the map
    map.addListener("click", (event) => {
        const clickedLat = event.latLng.lat();
        const clickedLng = event.latLng.lng();
        const label = prompt("Enter label for this location:");

        // Place a draggable marker at the clicked location
        placeMarker(clickedLat, clickedLng, label, true);
        saveLocations();
    });
}

function placeMarker(lat, lng, label, draggable) {
    const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: label,
        draggable: draggable,
        animation: google.maps.Animation.DROP,
    });

    // Add click event listener to the marker
    marker.addListener("click", () => {
        const confirmDelete = confirm(`Delete marker with label "${label}"?`);
        if (confirmDelete) {
            // Remove the marker
            marker.setMap(null);
            markers = markers.filter(m => m !== marker);
            saveLocations();
            updateMarkerCount();
        }
    });

    // Add right-click event listener to show context menu
    marker.addListener("rightclick", (event) => {
        event.preventDefault(); // Prevent the default context menu
        showContextMenu(marker);
    });

    // Add hover event listeners to show/hide info window
    marker.addListener("mouseover", () => {
        showInfoWindow(marker);
    });

    marker.addListener("mouseout", () => {
        closeInfoWindow();
    });

    // Add dragend event listener to update marker position
    marker.addListener("dragend", () => {
        saveLocations();
    });

    markers.push(marker);
    updateMarkerCount();
}

function addLabel() {
    const label = document.getElementById("labelInput").value;
    placeMarker(map.getCenter().lat(), map.getCenter().lng(), label, true);
    saveLocations();
}

function deleteAllLabels() {
    markers.forEach(marker => {
        marker.setMap(null);
    });
    markers = [];
    saveLocations();
    updateMarkerCount();
}

function showInfoWindow(marker) {
    const label = marker.getTitle();
    const infoWindow = new google.maps.InfoWindow();
    infoWindow.setContent(`<h2>${label}</h2>
        <button onclick="editLabel('${label}')">Edit</button>
        <button onclick="deleteMarker('${label}')">Delete</button>`);
    infoWindow.open(map, marker);
}

function closeInfoWindow() {
    const infoWindows = markers.map(marker => marker.infoWindow);
    infoWindows.forEach(infoWindow => infoWindow.close());
}

function showContextMenu(marker) {
    const label = marker.getTitle();
    const contextMenu = new google.maps.InfoWindow();
    contextMenu.setContent(`<button onclick="editLabel('${label}')">Edit</button>
        <button onclick="deleteMarker('${label}')">Delete</button>`);
    contextMenu.setPosition(marker.getPosition());
    contextMenu.open(map);
}

function editLabel(label) {
    const marker = markers.find(marker => marker.getTitle() === label);

    if (marker) {
        const newLabel = prompt(`Edit label for ${label}:`, label);
        if (newLabel !== null) {
            marker.setTitle(newLabel);
            saveLocations();
            updateMarkerCount();
        }
    }
}

function deleteMarker(label) {
    const marker = markers.find(marker => marker.getTitle() === label);

    if (marker) {
        marker.setMap(null);
        markers = markers.filter(m => m !== marker);
        saveLocations();
        updateMarkerCount();
    }
}

function updateMarkerCount() {
    const markerCountElement = document.getElementById("markerCount");

    if (markerCountElement) {
        const count = countMarkers();
        markerCountElement.textContent = `${count}`;
        console.log("Marker count:", count);
    }
}
function saveLocations() {
    const locations = markers.map(marker => ({
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng(),
        label: marker.getTitle(),
    }));

    console.log("Saved locations:", locations);

    localStorage.setItem("locations", JSON.stringify(locations));
}

// Function to count markers
function countMarkers() {
    return markers.length;
}

// Call updateMarkerCount after loading saved locations
updateMarkerCount();

function refreshPage() {
    // Reload the current page
    location.reload();
  }
  