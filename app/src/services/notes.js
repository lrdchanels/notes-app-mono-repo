const baseUrl = 'https://notes-api-drab.vercel.app/api/notes';

export const getAll = async() => {
  const data = await fetch(baseUrl)

  return await data.json()
}

export const create = async(newObject) => {
  const data = await fetch(baseUrl, {
    method: 'POST',
    body: JSON.stringify(newObject),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  return await data.json()
}

export const update = async(id, newObject) => {
  const data = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newObject),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  return await data.json()
}