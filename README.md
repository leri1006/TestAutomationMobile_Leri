# TestAutomationMobile_Leri
Test Mobile Automation for Todoist Application

Clone the repository. Before running the test, ensure you have the following installed: 
- Visual Studio Code as IDE (set up extension WebDriverIO)
- [Node.js](https://nodejs.org/)
- [Appium](http://appium.io/) 
- [Java] (https://www.oracle.com/id/java/technologies/downloads/)
- Android Studio (Android SDK and Emulator) --> can set your own emulator in wdio.conf.js file (no need to setup appium:app)
- all dependencies are set in this project already in node_modules.
- If user don't download the node_modules, can run "npm install" in the terminal to ensure all dependencies are downloaded.
- token, email, and password are filled in .env file

To run the test:
- Ensure Appium is set up and running, Android Emulator is setup and running
- To run the tests, use the following command: "npx wdio" or "npx wdio wdio.conf.js"
