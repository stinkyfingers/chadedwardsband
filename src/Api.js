const liveEndpoint = "https://server.john-shenk.com/chadedwardsapi";
// const localEndpoint = "https://server.john-shenk.com/chadedwardsapi";
const localEndpoint = "http://localhost:8088";
const liveBadlibsEndpoint = "https://server.john-shenk.com/badlibs"; 
const localBadlibsEndpoint = 'http://localhost:8088';
// const localBadlibsEndpoint = "https://server.john-shenk.com/badlibs";
const chatGPT = "https://api.openai.com/v1";

const { NODE_ENV, REACT_APP_ENV } = process.env;
const badLibsAPI = () => {
  if (NODE_ENV === 'development' && REACT_APP_ENV !== 'live') {
    return localBadlibsEndpoint;
  }
  return liveBadlibsEndpoint;
};

const chadEdwardsAPI = () => {
  if (NODE_ENV === 'development' && REACT_APP_ENV !== 'live') {
    return localEndpoint;
  }
  return liveEndpoint;
}

export const list = async() => {
  const res = await fetch(`${badLibsAPI()}/lib/all?domain=chadlibs`);
  const data = await res.json();
  return data;
};

export const get = async(id) => {
  const res = await fetch(`${badLibsAPI()}/lib/get?id=${id}`);
  const data = await res.json();
  return data;
};

export const update = async({ lib, token }) => {
  const res = await fetch(`${badLibsAPI()}/lib/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(lib)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const create = async({ lib, token }) => {
  const res = await fetch(`${badLibsAPI()}/lib/create`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(lib)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const remove = async({ id, token }) => {
  const res = await fetch(`${badLibsAPI()}/lib/delete?id=${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const auth = async({ user }) => {
  const res = await fetch(`${badLibsAPI()}/auth/upsert`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const checkAuth = async({ token }) => {
  const res = await fetch(`${badLibsAPI()}/auth/health`, {
    method: 'GET',
    headers: {
      'Authorization': token
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const chatGptCompletion = async({ messages }) => {
  const gptToken = process.env.REACT_APP_GPT_KEY;
  const res = await fetch(`${chatGPT}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${gptToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7
    })
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const submitRequest = async({ request }) => {
  const res = await fetch(`${chadEdwardsAPI()}/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://www.chadedwardsband.com'
    },
    body: JSON.stringify(request)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
}