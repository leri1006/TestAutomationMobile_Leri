const { remote } = require('webdriverio');
const RestClient = require('./CustomRESTClient');
const generateRandomString = require('./function');
require('dotenv').config();

const apiToken =process.env.TODOIST_API_TOKEN; 
console.log('Using API token:', apiToken);

const restClient = new RestClient('https://api.todoist.com/rest/v2', apiToken);

describe('Create Test Project via API', () => {
    it('should create a project and verify the project ID exists', async () => {
        const project = await restClient.createProject(`Automation Test Project - ${generateRandomString(8)}`);
        console.log('Project is created with details:', project);

        if (!project.id) {
            throw new Error('Project creation is failed!');
        }
    });
}); 

