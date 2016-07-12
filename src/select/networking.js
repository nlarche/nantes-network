/* global SERVER_URL */
import xs from 'xstream';
const BASE_URL = SERVER_URL + "ewp/arrets.json";
const CATEGORY = 'station';

export default {
  processResponse(HTTP) {
    return HTTP
      .select(CATEGORY)      
      .flatten()
      .map(res => {
        return { station: JSON.parse(res.text) }
      })      
  },

  getRequestURL() {
    return xs.of({
      url: `${BASE_URL}`,
      method: 'GET',
      category: CATEGORY,
      headers: {
        "Content-Type": "application/json",
        "Accept-language": "fr_FR"
      },
    });
  }
}
