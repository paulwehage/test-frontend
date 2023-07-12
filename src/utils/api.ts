import { Auth } from "aws-amplify";

type Fetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;


async function fetchToken() {
  const sToken = (await Auth.currentSession()).getIdToken().getJwtToken();  
  return sToken;
}

let token = '';

const fetchAbsolute = (fetch: Fetch, base_url: string) => {    
    return async (url: string, init?: RequestInit | undefined) => {
      if (!token) {
        token = await fetchToken();
      }      
      if (url.startsWith('/')) return fetch(base_url + url, { ...init, headers: { ...init?.headers, Authorization: `Bearer ${token}` } })      
      return fetch(url, { ...init, headers: { ...init?.headers, Authorization: `Bearer ${token}` } });
    }
  }
  
  export const api = fetchAbsolute(fetch, process.env.REACT_APP_API_DOMAIN!);
  