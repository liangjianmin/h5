let urlApi, url;
switch (window.location.hostname) {
  case "www.dolabank.com":
    urlApi = 'https://www.dolabank.com/apigateway/';
    url = 'https://www.dolabank.com/';
    break;
  case "www.dolabank.top":
    urlApi = 'https://api.dolabank.top/';
    url = 'https://www.dolabank.top/';
    break;
  case "www.duolajucai.top":
    urlApi = 'https://api.duolajucai.top/';
    url = 'https://www.duolajucai.top/';
    break;
  case "www.dolabank.club":
    urlApi = 'https://api.dolabank.club/';
    url = 'https://www.dolabank.club/';
    break;
  case "www.dola.dev":
    urlApi = 'https://api.dola.dev/';
    url = 'https://www.dola.dev/';
    break;
  default:
    urlApi = 'https://www.dolabank.com/apigateway/';
    url = 'https://www.dolabank.com/';
}

export default {
    urlApi,
    url
};