import React from 'react';
import '../css/error.css';
const Error = ({ err }) => (
  <div className={'error'}>{JSON.stringify(err)}</div>
);

export default Error;
