import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {ErrorContext, UserContext} from '../../Context';
import { useLogout } from '../../hooks/useLogout';
import { get, update, create, remove } from '../../Api';
import { decodeUser } from '../../utils';
import Modal from 'react-modal';

import '../../css/chadlibs/edit.css';

Modal.setAppElement('#root');

const commonPOS = [
  'noun',
  'plural noun',
  'verb',
  'verb ending in -ing',
  'past tense verb',
  'adjective',
  'adverb',
  'number',
  'name',
  'name of person in room',
  'exclamation',
  'place',
  'food',
  'food plural',
  'holiday'
];

const radlibsUser = (googleUser) => {
  if (!googleUser) return {};
  return { id: decodeUser(googleUser).sub, name: decodeUser(googleUser).name, email: decodeUser(googleUser).email };
};

const HelpModal = ({ showHelp, setShowHelp }) => {
  return <Modal isOpen={showHelp} contentLabel={'Help Me!'} setAppElement={el => el}>
    <div className={'help'}>
      Write a story. Whenever you want to permit the user to supply their own part of speech (e.g. 'noun', 'verb', etc.), click the corresponding button.
      This will create a part of speech in double-curly-brackets, like &#123;&#123; noun &#125;&#125;. Later, when a user plays the RadLib, they will be asked to supply the 
      part of speech in those double-curly-brackets. To create a custom part-os-speech prompt, enter your custom prompt in the "your custom type" text box and click the button that is 
      created. 
      <div className={'closeHelp'}><button onClick={() => setShowHelp(false)}>Close</button></div>

    </div>
  </Modal>
}

const Edit = () => {
  const [err, setErr] = React.useContext(ErrorContext);
  const [user] = React.useContext(UserContext);
  const emptyLib = React.useMemo(() =>({ user: radlibsUser(user), rating: 'G' , text: '', domain: 'chadlibs'}), [user]);
  const [lib, setLib] = React.useState(emptyLib);
  const [cursor, setCursor] = React.useState(0); // track last cursor position for inserts
  const [status, setStatus] = React.useState();
  const [showHelp, setShowHelp] = React.useState(false);
  const [customButton, setCustomButton] = React.useState('');
  const { id } = useParams();
  const textareaRef = React.useRef();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const getFunc = async () => {
      const resp = await get(id);
      setLib(resp);
    };
    if (!id) {
      setLib(emptyLib);
      return;
    };
    getFunc().catch(setErr);
  }, [id, setErr, emptyLib]);

  useLogout(setErr)

  const handleChange = (e) => {
    setStatus(null);
    setErr();
    setLib(prev => ({ ...prev, [e.target.className]: e.target.value }));
  };

  const handleSave = async () => {
    const save = lib._id ? update : create;
    try {

      const resp = await save({ lib, token: user.credential});
      if (resp.error) {
        setErr(resp.error);
        return;
      }
      setLib(resp);
      setStatus('Saved!');
      navigate(`/libs/edit/${resp._id}`);
    } catch (err) {
      setErr(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const resp = await remove({ id: lib._id, token: user.credential });
      if (resp.error) {
        setErr(resp.error);
        return;
      }
      setStatus('Deleted!');
      setLib(emptyLib);
      navigate('/');
    } catch (err) {
      setErr(err);
    }
  };

  const handleClick = (e) => {
    const pos = `{{ ${e.target.value} }}`
    setLib(prev => ({ ...prev, text: prev.text.slice(0, cursor) + pos + prev.text.slice(cursor) }));
    textareaRef.current.focus()
  };

  const handleBlur = (e) => {
    setCursor(textareaRef.current.selectionStart);
  };

  const renderPOS = () => {
    const buttons = commonPOS.map(pos => {
      return <button key={pos} className='pos' onClick={handleClick} value={pos}>{pos}</button>;
    });
    return <div className='pos'>
      <div className='customButton'>
        <label className='custom'>Custom type</label>
        <input type='text'  autoCapitalize='none' className='custom' onChange={(e) => setCustomButton(e.target.value)} placeholder='your custom type'/>
        {customButton ? <button key='custom' className='pos' onClick={handleClick} value={customButton}>{customButton}</button> : null}
      </div>
      <div className={'commonPos'}>
        {buttons}
      </div>
    </div>;
  };

  if (!user) {
    return <div />;
  }

  return <div className='Edit'>
    <div className='status'>{status}</div>
    <div className='title'>
      <label>Title</label>
      <input type='text' className='title' defaultValue={lib.title} onChange={handleChange} />
    </div>
    <div className='text'>
      <label>Text</label>
      <textarea className='text' onChange={handleChange} ref={textareaRef} onBlur={handleBlur} value={lib.text}></textarea>
    </div>
    {renderPOS()}
    <div className='rating'>
      <label>Rating</label>
      <select onChange={handleChange} className='rating'>
        <option>G</option>
        <option>PG</option>
        <option>R</option>
      </select>
    </div>
    <div className={'showHelp'}>
      <button className={'helpMe'} onClick={() => setShowHelp(true)}>Help Me!</button>
      <HelpModal setShowHelp={setShowHelp} showHelp={showHelp} />
    </div>
    <div className='actions'>
      <button disabled={!lib.text || !lib.title || err} className='save' onClick={handleSave}>Save</button>
      <button disabled={!lib._id || err} className='delete' onClick={handleDelete}>Delete</button>
    </div>
  </div>;
};

export default Edit;