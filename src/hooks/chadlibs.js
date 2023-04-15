import React from 'react';
import { gapi } from 'gapi-script';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const spreadSheetId = process.env.REACT_APP_CHADLIBS_SPREADSHEET_ID
const sheetId = process.env.REACT_APP_CHADLIBS_SHEET_ID;
// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

const buildOverrides = (data) => {
  if (!data || !data.length) return null;
  const overrides = {};
  data.forEach((datum) => {
    if (datum.length !== 2) return; 
    const pos = datum[0];
    const override = datum[1];
    if (overrides[pos]) {
      overrides[pos].push(override);
    } else {
      overrides[pos] = [override];
    }
  });
  return overrides;
}

const useChadLibsOverrides = () => {
  const [data, setData] = React.useState([]);
  const [err, setErr] = React.useState();
  React.useEffect(() => {
    const load = () => {
      gapi.client.load('sheets', 'v4', () => {
        gapi.client.sheets.spreadsheets.values
          .get({
            spreadsheetId: spreadSheetId,
            range: `${sheetId}!A1:T`
          })
          .then((resp) => {
            if (!resp.result || !resp.result.values) return;
            setData(resp.result.values)
          })
          .catch(setErr)
      });
    }
    const initClient = () => {
      if (!gapi || !gapi.client) return;
      gapi.client
        .init({
          apiKey: apiKey,
          discoveryDocs: DISCOVERY_DOCS,
        })
        .then(load)
        .catch(setErr)
    }
    gapi.load('client', initClient)
  }, []);
  return [buildOverrides(data), err];
};

export default useChadLibsOverrides;