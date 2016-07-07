import xs from 'xstream';
const BASE_URL = "http://localhost:3030/ewp/tempsattente.json/";
const INTERVAL_TIME = 5000;
const CATEGORY = 'liste';

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
    return line$
      .filter(l => l.value !== undefined)
      .startWith({
        value: 'COMM'
      })
      .map(l => ({
        url: `${BASE_URL}${l.value}`,
        method: 'GET',
        category: CATEGORY,
        headers: {
          "Content-Type": "application/json",
          "Accept-language": "fr_FR"
        },
      }));
  }
}
