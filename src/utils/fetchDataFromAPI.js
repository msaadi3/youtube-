import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com'

const options = {
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const fetchDataFromAPI = async (url) => {
    try {
        const response = await axios.get(`${BASE_URL}/${url}`, options);
        // console.log(response);
        return response
    } catch (error) {
        console.error(error);
        return null
    }
}


