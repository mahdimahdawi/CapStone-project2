const url = `https://api.tvmaze.com/seasons/${episode}/episodes`;

async function getResponse() {
    const response = await fetch(url);
    if(!response.ok) {
        return 'Error fetching data'
    }
    const data = await response.json();
    return data;
}
export default getResponse;