import axios from 'axios';

const token = 'd75052c5-54a3-4efe-bd37-cddd523c5946'
const apiKey = '9171c586-2beb-44ff-99d2-0bbc04375247'

export const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
    }
})