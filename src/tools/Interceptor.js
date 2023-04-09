const baseUrl = 'http://localhost:8080';

function addBaseUrlToUrl(url) {
        return `${baseUrl}/${url}`;
}

const fetch_ = (url, options) => {
    return fetch(addBaseUrlToUrl(url), options);
}

export default fetch_;