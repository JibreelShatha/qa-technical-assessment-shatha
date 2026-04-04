import './commands';
import { viewports } from './viewports';

beforeEach(() => {
  // 1. Look for the 'device' flag in your terminal command
  // 2. If you didn't provide one, default to 'desktop'
  const deviceName = Cypress.env('device') || 'desktop';
  
  // 3. Get the width/height from our Menu file
  const selectedViewport = viewports[deviceName];

  // 4. Tell Cypress to change the screen size visually
  cy.viewport(selectedViewport.width, selectedViewport.height);

  // Wait for the app loader to disappear before interacting with the page.
  cy.waitForAppLoader();
});
