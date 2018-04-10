const host = 'https://freddocf-cyberjunky.c9users.io/api';
const url = {
    API_LOGIN: `${host}/accounts/login`,
    getUrlCheckToken: (userid) => `${host}/${userid}/accessTokens`,
    
};
export default url;
