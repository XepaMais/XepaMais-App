const CHAVE_PADRAO = 'AIzaSyBXOjzHfR4E1F2aVvoVwsfFPX33BZto2H8';

export const GOOGLE_MAPS_LOADER = {
  id: 'google-map-script',
  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || CHAVE_PADRAO,
  libraries: ['places'],
};
