import { getCookie } from '../services/cookies';

export const url = 'http://localhost:8888/';
// export const url = 'https://restauration-api--mds.herokuapp.com/';

export async function get(authenURL: string) {
  return fetch(url + authenURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('restauration')}`,
    },
  });
}

export async function remove(authenURL: string) {
  await fetch(url + authenURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('restauration')}`,
    },
  });
}

export async function post(authenURL: string, body: any) {
  const res = await fetch(url + authenURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('restauration')}`,
    },
    body: JSON.stringify(body),
  });
  return res;
}

export async function put(authenURL: string, body: any) {
  const res = await fetch(url + authenURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('restauration')}`,
    },
    body: JSON.stringify(body),
  });
  return res;
}
