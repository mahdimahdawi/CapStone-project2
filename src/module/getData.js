const url = 'https://api.tvmaze.com/seasons/5/episodes';
const getData = async () => {
  let data = await fetch(url);
  data = await data.json();
  return data;
};
export default getData;