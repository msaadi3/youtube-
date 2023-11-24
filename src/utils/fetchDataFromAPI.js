import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    params: {
        maxResults: '50',
    },
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const fetchData = async (url) => {
    await axios.get(`${BASE_URL}/${url}`, options)
        .then((response) => {
            console.log(response.data)
            // return response.data
        })
        .catch((error) => {
            console.log(error)
        })

    // try {
    //     const response = await axios.get(`${BASE_URL}/${url}`, options);
    //     const {data} = await axios.get(`${BASE_URL}/${url}`, options);
    //     console.log(response.data); return data 
    // } catch (error) {
    //     console.error(error);
    // }
}