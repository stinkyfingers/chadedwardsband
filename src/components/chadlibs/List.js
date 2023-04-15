import React from 'react';
import { Link } from 'react-router-dom';
import {ErrorContext, UserContext} from '../../Context';
import { list } from '../../Api';
import { decodeUser } from '../../utils';

import '../../css/chadlibs/list.css';

const List = () => {
  const [libs, setLibs] = React.useState([]);
  const [user] = React.useContext(UserContext);
  const [, setErr] = React.useContext(ErrorContext);

  React.useEffect(() => {
    const listFunc = async () => {
      const resp = await list();
      setLibs(resp);
    };
    listFunc().catch(e => console.log(e));
  }, [setErr]);

  const renderLibs = () => {
    if (!libs) return null;
    const data = libs.map(lib =>
      <tr key={lib._id} className='libRow'>
        <td><Link to={`/libs/play/${lib._id}`}><button className='play'>Play</button></Link></td>
        { user && decodeUser(user).sub === lib.user.id ? <td><Link to={`/libs/edit/${lib._id}`}><button className='edit'>Edit</button></Link></td> : <td /> }
        <td>{lib.title}</td>
        <td>{lib.rating}</td>
        <td className='user'>{lib.user.name}</td>
        <td className='created'>{(new Date(lib.created)).toUTCString()}</td>
      </tr>
    );
    return <table className='libs'>
      <thead>
        <tr key='header'>
          <th />
          <th />
          <th>Title</th>
          <th>Rating</th>
          <th>User ID</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>{data}</tbody>
    </table>;
  }

  return <div className='List'>
    <div className='instructions'>
      <div>
        Playing ChadLibs is remarkably similar to the classic similarly-named story-crafting game. It's easy - just click "Play" on a story below, and you'll
        be prompted for different parts-of-speech. When you're done, hit "Submit" and you'll be presented your hilarious new prose. The catch is: occasionally 
        Chad will randomly fill in a part-of-speech for you with an undeniably Chad-like response. 
      </div>
    </div>
    {renderLibs()}
  </div>
};

export default List;