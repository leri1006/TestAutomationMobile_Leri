const axios = require('axios');

class RestClient {
    constructor(baseUrl, token) {
        this.baseUrl = baseUrl;
        this.token = token;
        this.headers = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }

    async createProject(projectName) {
        const data = {
            name: projectName
        };
        const response = await axios.post(`${this.baseUrl}/projects`, data, { headers: this.headers });
        return response.data;
    }
}

module.exports = RestClient;