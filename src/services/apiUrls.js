const baseUrl = `${import.meta.env.VITE_BASE_URL}/`;

export const apiUrls = {
  List: {
    Ipo: `${baseUrl}ipo`,
  },
};

//  run command --> json-server --watch db.json --port 8000
//  run react application --> npm run dev