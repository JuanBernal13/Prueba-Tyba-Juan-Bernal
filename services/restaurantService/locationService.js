const { Client } = require('@googlemaps/google-maps-services-js');
const { calculateDistance, validateCoordinates } = require('../../utils/restaurantUtils');

class LocationService {
    constructor() {
        this.client = new Client({});
        this.apiKey = process.env.GOOGLE_MAPS_API_KEY;
        
        if (!this.apiKey) {
            throw new Error('Key no encontrada en las variables de entorno para google maps');
        }
    }

    async searchRestaurants(latitud, longitud) {
        const params = {
            query: 'Restaurante',
            key: this.apiKey,
            language: 'es'
        };

        if (latitud && longitud && validateCoordinates(latitud, longitud)) {
            params.location = `${latitud},${longitud}`;
        }

        try {
            const response = await this.client.textSearch({ params });

            if (response.data.status !== 'OK' && response.data.status !== 'ZERO_RESULTS') {
                throw new Error(`Google API error: ${response.data.status}`);
            }

            const restaurants = response.data.results.slice(0, 15).map(place => {
                const restaurant = {
                    id: place.place_id,
                    nombre: place.name || 'No disponible',
                    latitud: place.geometry.location.lat,
                    longitud: place.geometry.location.lng,
                    tipo: place.types?.find(type => !['restaurant', 'food', 'establishment'].includes(type)) || 'No especificado',
                    rating: place.rating || null,
                    precio: place.price_level || null,
                    direccion: place.formatted_address || 'Dirección no disponible',
                    abierto: place.opening_hours?.open_now || null
                };

                if (latitud && longitud) {
                    restaurant.distancia = calculateDistance(
                        latitud, longitud, 
                        place.geometry.location.lat, 
                        place.geometry.location.lng
                    );
                }

                return restaurant;
            });

            //Ordenar los restaurantes por distancia para presentar los mas cercanos al usuario
            return latitud && longitud 
                ? restaurants.sort((a, b) => a.distancia - b.distancia)
                : restaurants;

        } catch (error) {
            throw new Error(`Error al buscar restaurantes: ${error.message}`);
        }
    }
}

module.exports = new LocationService(); 