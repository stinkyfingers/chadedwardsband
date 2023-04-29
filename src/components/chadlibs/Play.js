import React from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../Api';
import useChadLibsOverrides from '../../hooks/chadlibs';
import '../../css/chadlibs/play.css';
import {ErrorContext} from "../../Context";

const populate = (text, inputs) => {
  const regex = /{{[a-zA-Z0-9 "!@#$%^&()-_+=;':,./]*}}/;
  for (const i in inputs) {
    text = text.replace(regex, inputs[i].term);
  };
  return text;
};

const libInputs = (lib) => {
  const regex = /{{[a-zA-Z0-9 "!@#$%^&()-_+=;':,./]*}}/g;
  return lib.text.match(regex).map((term) => (term.replace('{{', '').replace('}}','').trim(' ')));
}

const Play = () => {
  const [chadlibsOverrides, chadlibsOverridesErr] = useChadLibsOverrides();
  const [, setErr] = React.useContext(ErrorContext);
  const [lib, setLib] = React.useState();
  const [inputs, setInputs] =  React.useState();
  const [updated, setUpdated] = React.useState(false);
  const { id } = useParams();
  
  React.useEffect(() => {
    if (!chadlibsOverrides || !lib) {
      setInputs([]);
      return;
    };
    if (updated) return;
    const data = libInputs(lib);
    const rawInputs = data.map((datum) => ({ pos: datum, chadified: false }));
    const overrides = chadlibsOverrides;
    setInputs(rawInputs.map((input) => {
      // randomness - usually return input
      if (Math.random() * 10 < 7) {
        return ({ ...input, chadified: false });
      }
      const replacements = overrides[input.pos];
      if (!replacements || !replacements.length) return ({ ...input, chadified: false });
      const randomIndex = Math.floor(Math.random()*replacements.length);
      const randomTerm = replacements[randomIndex];
      overrides[input.pos].splice(randomIndex);
      return ({ ...input, chadified: true, term: randomTerm });
    }));
    setUpdated(true);
  }, [lib, chadlibsOverrides, updated]);
 
  React.useEffect(() => {
    const getFunc = async () => {
      const resp = await get(id);
      setLib(resp);
    };
    if (!id) return;
    getFunc().catch(setErr);
  }, [id, setErr]);

  const handleTermChange = (e, i) => {
    setErr(null);
    const modifiedInput = inputs[i]
    modifiedInput.term = e.target.value;
    setInputs(prev => {
      prev[i] = modifiedInput;
      return prev
    });
  };

  const handlePopulate = () => {
    let ok = true;
    inputs.forEach((input) => {
      if (!input.term) {
        ok = false;
      }
    });
    if (!ok) {
      setErr("Fill in all fields");
      return;
    }
    const res = populate(lib.text, inputs);
    setLib(prev => ({ ...lib, complete: res }));
  };

  const handleReset = () => {
    setErr(null);
    setUpdated(false);
    setLib(prev => ({ ...prev, complete: null }));
    setInputs([]);
  };

  const renderPopulate = () => {
    if (!inputs) { // handle no inputs
      setLib(prev => ({ ...lib, complete: lib.text }));
      return;
    };

    const terms =  inputs.map((term, i) => (
      <div key={`term-${i}`} className='term'>
        <label className='term'>{term.pos}</label>
        {
          term.chadified === true ?
            <input type='text' readOnly defaultValue="Chadified!" className="chadified" />
            :
            <input type='text' autoCapitalize={'none'} onChange={(e) => handleTermChange(e, i)} />
        }
      </div>
    ));
    return <>
        {terms}
        <div className='actions'>
          <button onClick={handlePopulate} className='submit'>Submit</button>
        </div>
      </>;
  };

  const renderComplete = () => <div className='complete'>
    <div className='text'>{lib.complete}</div>
    <div className='actions'>
      <button className='reset' onClick={handleReset}>Play Again</button>
    </div>
  </div>

  if (!lib) return null;

  return (
    <div className='Play'>
      { chadlibsOverridesErr && <div className='error'>Looks like Chad is asleep right now. You can play by yourself.</div>}
      <div className='title'>"{lib.title}"</div>
      {lib.complete ? renderComplete() : renderPopulate()}
    </div>
  );
};

export default Play;