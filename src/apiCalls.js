export const fetchData = type => {
  const data = fetch(
    `https://what-s-cookin-starter-kit.herokuapp.com/api/v1/${type}`
  )
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
  return data;
};
