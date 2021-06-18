import fetch, { Request, RequestInit } from 'node-fetch';

export class ResponseError extends Error {
  public status = 500;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public json?: Record<any, any>;
}

async function fetchJson<T>(
  url: string | Request,
  init?: RequestInit,
  typeOfContent?: string,
): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': typeOfContent || 'application/json',
      ...init?.headers,
    },
  });

  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  const body = await response.text();
  const error = new ResponseError(body);

  error.status = response.status;

  try {
    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.startsWith('application/json');

    if (isJson) {
      error.json = JSON.parse(body);
    }
  } catch (jsonError) {
    // Not able to parse body, so no need to set `error.json`
  }

  throw error;
}

export default fetchJson;
