describe('new tasks (categories) page spec', () => {
  const categories = ['Exercise', 'Cleaning', 'Organization', 'Work', 'Mental Care', 'Health'];
  beforeEach(() => {
    cy.intercept('GET', `http://localhost:3001/api/v1/tasks`, {
      statusCode: 200,
      fixture: `testData`,
    });
  })
  categories.forEach((category) => {
    const categoryURL = (category.charAt(0).toLowerCase() + category.slice(1)).replace(' ', '');
    it(`should have an h1 of ${category} when at /${categoryURL}`, () => {
      cy.intercept('GET', `http://localhost:3001/api/v1/tasks/${categoryURL}`, {
        statusCode: 200,
        fixture: `${categoryURL}TestData`,
      });
      cy.visit(`localhost:3000/${categoryURL}`).get('.new-task-page').contains('h1', category);
    });
  });
  it('should POST a task if the save button is clicked', () => {
    cy.intercept('GET', `http://localhost:3001/api/v1/tasks/exercise`, {
        statusCode: 200,
        fixture: `exerciseTestData`,
      });
    cy.intercept('POST', 'http://localhost:3001/api/v1/savedtasks', (req) => {
      req.body = {
        "task": "Do 3 push ups.",
        "id": 1,
        "seen": false,
        "category": "Exercise",
        "saved": false
      }
      req.reply({
        statusCode: 201,
        fixture: 'savedTasks'
      })
    })  
      cy.visit('localhost:3000/exercise').get('.save-icon').click()
  })

  describe('sad path testing', () => {
    categories.forEach((category) => {
      it(`should show Loading error on ${category} page if fetch fails`, () => {
        const categoryURL = (category.charAt(0).toLowerCase() + category.slice(1)).replace(' ', '');
        cy.intercept(`http://localhost:3001/api/v1/tasks/${categoryURL}`, {
          statusCode: 404,
          body: '404 Not Found!',
          headers: { 'content-type': 'application/json' },
          // delayMs: 100,
        }).as(`failed${categoryURL}request`);
        cy.visit(`localhost:3000/${categoryURL}`).get('.task-card').contains('h1', 'Loading...');
      });
    });
  });
});