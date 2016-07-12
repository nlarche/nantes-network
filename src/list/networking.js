/* global SERVER_URL */
import xs from 'xstream';
const BASE_URL = SERVER_URL + "ewp/tempsattente.json"; 
const INTERVAL_TIME = 30000;
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
    const interval$ = xs.periodic(INTERVAL_TIME).startWith(0);
    const lineURL$ = line$
      .filter(l => l.value !== undefined)
      .startWith({
        value: 'COMM'
      })
      .map(l => ({
        url: `${BASE_URL}/${l.value}`,
        method: 'GET',
        category: CATEGORY,
        headers: {
          "Content-Type": "application/json",
          "Accept-language": "fr_FR"
        },
      }));
    const final$ = xs.combine(lineURL$, interval$).map(([line, int]) => line);
    return final$
  }
}
