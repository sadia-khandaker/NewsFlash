describe('Testing functionality of login', () => {
    beforeEach(() => {
        // reset and seed the database prior to every test
       // cy.exec('npm run db:reset && npm run db:seed')

        // seed a user in the DB that we can control from our tests
        // assuming it generates a random password for us
        cy.request('POST', 'mongodb+srv://student:NewsFlash@cluster.ldaqohm.mongodb.net/?retryWrites=true&w=majority', { email: 'janelane@gmail.com', password: 'aStr0ngp@$$W0RD!' })
            .its('body')
            .as('currentUser')
    });
    it('sets auth cookie when logging via form submission', function () {
        const { email, password } = this.currentUser;

        cy.visit('/login');

        cy.get('input[name=email]').type(email);

        cy.get('input[name=password]').type(`${password}{enter}`);

        cy.url().should('include', '/home');

        cy.getCookie('your-session-cookie').should('exist');

        cy.get('h3').should('contain', 'NewsFlash');
    });
});