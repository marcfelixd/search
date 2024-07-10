// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
// });

// export const searchAPI = async (query) => {
//   try {
//     const response = await api.post('/search', { query });
//     return response.data;
//   } catch (error) {
//     console.error('Error during search:', error);
//     throw error;
//   }
// };

import axios from 'axios';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

const API_BASE_URL = CORS_PROXY + "https://my-flask-app-2gm2h4jy2q-od.a.run.app"

// const API_BASE_URL = process.env.REACT_APP_API_URL;

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://my-flask-app';
const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

export const searchAPI = async (query) => {
  try {
    const response = await api.post('/get_structured_document', {
      question: query
    });

    const data = response.data;

    // Transformation des données pour correspondre à la structure attendue par le composant SearchEngine
    return {
      answer: data.Answer,
      followup_questions: data.Follow_up_questions,
      relevants_documents: data.Relevant_documents.map(doc => ({
        content: doc.snapshot_content,
        title: doc.titre,
        urls: doc.url
      }))
    };
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
};