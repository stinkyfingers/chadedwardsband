import React from 'react';
import { gapi } from 'gapi-script';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const spreadSheetId = '1lbC33SQ6gI-saq3soF-VejTL996XfDwlWJS4hUrtQEc'; // TODO
// TODO cache, 300 requests per minute rate limit

// reference: https://blog.416serg.me/building-an-app-using-google-sheets-api-react-d69681d22ce1

// Array of API discovery doc URLs for APIs
const DISCOVERY_DOCS = [
  // 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
  // 'https://www.googleapis.com/discovery/v1/apis/docs/v3/rest',
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = [
  // 'https://www.googleapis.com/auth/drive.metadata.readonly',
  // 'https://www.googleapis.com/auth/docs.metadata.readonly',
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

const SongList = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const load = () => {
      gapi.client.load('sheets','v4', () => {
        gapi.client.sheets.spreadsheets.values
          .get({
            spreadsheetId: spreadSheetId,
            range: 'Sheet1!A1:T'
          })
          .then((resp) => {
            setData(resp.result.values)
          });
      });
    }
    const initClient = () => {
      if (!gapi) return;
      gapi.client
        .init({
          apiKey: apiKey,
          discoveryDocs: DISCOVERY_DOCS,
        })
        .then((resp) => {
          load()
        })
    }
    gapi.load('client', initClient)
  }, []);
  
  console.log(data)
  return (
    <div className="songlist">
      GS
    </div>
  )
};

export default SongList;