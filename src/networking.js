import xs from 'xstream';
const BASE_URL = "http://localhost:3030/ewp/arrets.json";
const INTERVAL_TIME = 5000;
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

  getRequestURL(line$) {
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
