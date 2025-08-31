const liveEndpoint = "https://server.john-shenk.com/chadedwardsapi";
// const localEndpoint = "https://server.john-shenk.com/chadedwardsapi";
const localEndpoint = "http://localhost:8087";
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
      'Content-Type': 'application/json',
      'Origin': 'https://www.chadedwardsband.com'
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
      'Authorization': token,
      'Origin': 'https://www.chadedwardsband.com'
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
  try {
    const res = await fetch(`${chatGPT}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${gptToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7
      })
    });
    if (!res.ok) {
      let errorData;
      try {
        errorData = await res.json();
      } catch {
        errorData = { message: res.statusText };
      }
      return { error: errorData.message || `HTTP ${res.status}` };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    return { error: err.message || 'Unknown network error' };
  }
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
};

export const listRequests = async() => {
  const res = await fetch(`${chadEdwardsAPI()}/requests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://www.chadedwardsband.com'
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.message };
  }
  return data;
};

export const apiAuth = async({ admin }) => {
  const url = `${chadEdwardsAPI()}/auth`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://www.chadedwardsband.com',
      'Authorization': `Bearer ${admin.access_token}`
    },
  })
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
}

export const googleUser = async(token) => {
  const url = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
}

export const listGooglePhotos = async(jwt, nextPageToken) => {
  const url = `https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=50${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
};

export const getGooglePhotos = async(jwt, ids) => {
  const idQuery = ids.map(id => `mediaItemIds=${id}`).join('&');
  const url = `https://photoslibrary.googleapis.com/v1/mediaItems:batchGet?${idQuery}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${jwt}`
    }
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
};

export const sendPhotos = async(jwt, photos) => {
  const photoRequests = Object.values(photos).map((photo) => {
    return ({
      url: photo.baseUrl,
      filename: photo.filename,
      mimeType: photo.mimeType,
      id: photo.id,
      metadata: photo.metadata
    })
  });
  const url = `${chadEdwardsAPI()}/photos/upload`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': jwt,
      'Content-Type': 'application/json',
      'Origin': 'https://www.chadedwardsband.com'
    },
    body: JSON.stringify(photoRequests)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
}

export const listPhotos = async(jwt) => {
  const url = `${chadEdwardsAPI()}/photos/list`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': jwt,
      'Content-Type': 'application/json',
      'Origin': 'https://www.chadedwardsband.com'
    },
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
}

export const updateMetadata = async(jwt, metadata) => {
  const url = `${chadEdwardsAPI()}/photos/update`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': jwt,
      'Content-Type': 'application/json',
      'Origin': 'https://www.chadedwardsband.com'
    },
    body: JSON.stringify(metadata)
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
}

export const deletePhoto = async(jwt, name) => {
  const url = `${chadEdwardsAPI()}/photos/delete?name=${name}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': jwt,
      'Content-Type': 'application/json',
      'Origin': 'https://www.chadedwardsband.com'
    },
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
}

export const geocode = async(address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`;
  const res = await fetch(url, {
    method: 'GET',
  });
  const data = await res.json();
  if (res.status !== 200) {
    return { error: data.error };
  }
  return data;
}