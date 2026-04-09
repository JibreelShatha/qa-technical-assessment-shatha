import './commands';
import { viewports } from './viewports';

// Suppress known React hydration errors thrown by the VegaStars application.
// React error #418 = SSR hydration mismatch (server HTML vs client render).
// React error #423 = related hydration recovery failure.
// These are application-level bugs reported in https://github.com/JibreelShatha/qa-technical-assessment-shatha/issues/7,
// not test failures. They occur on game pages during initial render.
Cypress.on('uncaught:exception', (err) => {
  if (
    err.message.includes('Minified React error #418') ||
    err.message.includes('Minified React error #423')
  ) {
    return false;
  }
});

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
