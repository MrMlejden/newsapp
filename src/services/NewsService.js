import React from 'react';

const fetchHeadlineNews = async () => {
  let response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=4fb8c69bc1f849b89ee3976e4dc986ad',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return response.json();
};

export default fetchHeadlineNews;
