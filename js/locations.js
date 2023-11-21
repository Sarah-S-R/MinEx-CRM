function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 }, // Initial center coordinates
        zoom: 2 // Initial zoom level
    });

    // You can add additional functionality here, such as markers or labels

    var map;

        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 0, lng: 0 },
                zoom: 2
            });
        }

        function addLabel() {
            var label = document.getElementById('labelInput').value;
            var marker = new google.maps.Marker({
                position: map.getCenter(),
                map: map,
                label: label
            });
        }
}