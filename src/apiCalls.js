export const fetchData = type => {
  const data = fetch(
    `http://localhost:3001/api/v1/${type}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`GET ERROR: Response not OK >>> STATUS ${response.status} - ${response.statusText}`)
      }
      return response.json()
    })
    .then(data => data)
    .catch(error => alert(`GET ERROR >>> STATUS ${error.status} - ${error.statusText}`));
  return data;
};

export const postData = (endpoint, resource) => {
  return fetch(`http://localhost:3001/api/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(resource),
  })
    .then(response => {
      if (response.status !== 201) {
        throw new Error(`POST ERROR: Resource not created >>> STATUS ${response.status} - ${response.statusText}`)
      }
      return response.json()
    })
    .then(data => data)
    .catch(error => alert(`POST ERROR >>> STATUS ${error.status} - ${error.statusText}`))
}
