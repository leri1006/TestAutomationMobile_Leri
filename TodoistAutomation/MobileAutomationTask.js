const { remote } = require('webdriverio');
const RestClient = require('./CustomRESTClient');
const generateRandomString = require('./function');
require('dotenv').config();

const apiToken =process.env.TODOIST_API_TOKEN; 
console.log('Using API token:', apiToken);

let driver;
before(async () => {
    driver = await browser;
});

const restClient = new RestClient('https://api.todoist.com/rest/v2', apiToken);

describe('Todoist Mobile Automation', () => {

    let projectName
    it('should create a project via API and verify the project ID exists', async () => {
       //To generate a project name
        projectName = `Automation Test Project - ${generateRandomString(8)}`;

        //To create a project via API
        const project = await restClient.createProject(projectName);
        console.log('Project is created with details:', project);

        //To ensure the projectID exists
        if (!project.id) {
            throw new Error('Project creation is failed!');
        }
    });

    it ('login and verify the new project on mobile', async () => {
        //CLick welcome email button
        const welcomeEmailButton = await driver.$('id=com.todoist:id/btn_welcome_email');
        await welcomeEmailButton.click();
        console.log('Clicked on the welcome email button.');

        //Enter email
        const emailInput = await driver.$('id=com.todoist:id/email_exists_input');
        await emailInput.setValue('lookinggoodthrift@gmail.com');
        console.log('Entered email address.');

         //Click continue button
        const continueButton = await driver.$('id=com.todoist:id/btn_continue_with_email');
        await continueButton.click();
        console.log('Clicked continue with email button.');
        
        //Enter password
        const passwordInput = await driver.$('id=com.todoist:id/log_in_password');
        await passwordInput.setValue('Orange@2024');
        console.log('Entered password.');
        
         //Click login button
        const btnLogin = await driver.$('id=com.todoist:id/btn_log_in');
        await btnLogin.click();
        console.log('Clicked login button.');

        await driver.pause(5000); 
        console.log('Paused for 5 seconds to allow login to complete.');

        await driver.execute('mobile: hideKeyboard'); //To hide the keyboard emulator after using it to input value
        console.log('Keyboard hidden.');

        //Verify "Today" text is displayed
        const todayTextElement = await driver.$('//android.widget.TextView[@text="Today"]');
        await todayTextElement.waitForDisplayed({ timeout: 5000 });
        const isDisplayed = await todayTextElement.isDisplayed();
        console.log('Today text is displayed.');
        
        //Click on the menu button
        const menuButton = await driver.$('//android.widget.ImageButton[@content-desc="Menu"]');
        await menuButton.click();
        console.log('Clicked on the menu button.');

        //Verify the new project is displayed
        const newProjectisDisplayed = await driver.$(`android=new UiSelector().text("${projectName}")`);
        await newProjectisDisplayed.waitForDisplayed({ timeout: 5000 });
        console.log(`New project "${projectName}" is displayed.`);
        
    });
}); 

