import React from 'react';
import { gapi } from 'gapi-script';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const spreadSheetId = process.env.REACT_APP_GOOGLE_SPREADSHEET_ID
const sheetId = process.env.REACT_APP_GOOGLE_SHEET_ID;

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

// buildSongList converts nested arrays of csv song data into an object
const buildSongList = (songData) => {
  if (!songData.length) return {};
  const data = [...songData];
  const fields = data.shift();
  return data.map((datum) => {
    const song = {};
    fields.forEach((field, i) => {
      song[field] = datum[i] || '';
    });
    return song;
  });
}

const useSongList = () => {
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
  return [buildSongList(data), err];
};

export default useSongList;