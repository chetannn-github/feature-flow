const BASE = import.meta.env.MODE === "Production" ? "https://feature-flow.onrender.com" : 'http://localhost:4000';

async function handleRes(res) {
 
  if (!res.ok) throw new Error('Internal Server Error ' + res.status)
  let result = await res.json();
  console.log(result);
  return result;
}

async function get(path, token) {
  const headers = {}
  if (token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(BASE + path, { headers })
  return await handleRes(res)
}

async function post(path, body, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(BASE + path, { method: 'POST', headers, body: JSON.stringify(body) })
  return await handleRes(res)
}

async function put(path, body, token) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(BASE + path, { method: 'PUT', headers, body: JSON.stringify(body) })
  return await handleRes(res)
}

async function del(path, token) {
  const headers = {}
  if (token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(BASE + path, { method: 'DELETE', headers })
  return await handleRes(res)
}


async function patch(path, token) {
  const headers = {}
  if (token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(BASE + path, { method: 'PATCH', headers })
  return await handleRes(res)
}

export default { get, post, patch , del, put}
