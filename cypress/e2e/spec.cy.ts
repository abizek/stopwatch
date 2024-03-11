describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.clock(Date.now())
    cy.visit('/')

    cy.get('[data-cy="elapsed"]').contains('00 : 00 . 00')
    cy.get('[data-cy="lap-elapsed"]').should('not.exist')
    cy.get('[data-cy="lap"]').contains('Lap').should('have.attr', 'disabled')
    cy.get('[data-cy="start"]').should('be.visible').contains('Start').click()
    cy.get('[data-cy="start"]').should('not.exist')
    cy.get('[data-cy="pause"]').should('be.visible').contains('Stop')
    cy.get('[data-cy="lap"]')
      .contains('Lap')
      .should('not.have.attr', 'disabled')

    cy.tick(1050)
    cy.get('[data-cy="elapsed"]').contains('00 : 01 . 05')
    cy.get('[data-cy="pause"]').click()
    cy.get('[data-cy="pause"]').should('not.exist')
    cy.get('[data-cy="resume"]').contains('Resume').should('be.visible')
    cy.get('[data-cy="reset"]').contains('Reset').should('be.visible')

    cy.tick(1050)
    cy.get('[data-cy="elapsed"]').contains('00 : 01 . 05')
    cy.get('[data-cy="resume"]').click()
    cy.get('[data-cy="resume"]').should('not.exist')
    cy.get('[data-cy="lap"]').should('be.visible')
    cy.get('[data-cy="pause"]').should('be.visible')

    cy.tick(1050)
    cy.get('[data-cy="elapsed"]').contains('00 : 02 . 10')
    cy.get('[data-cy="lap"]').click()
    cy.get('[data-cy="lap-elapsed"]')
      .contains('00 : 00 . 00')
      .should('be.visible')
    cy.contains('Lap')
    cy.contains('Lap time')
    cy.contains('Overall time')
    cy.get('[data-radix-scroll-area-viewport]').should('be.visible')
    cy.get('[data-cy="lap-time-1"]').contains('00:02.10')
    cy.get('[data-cy="overall-time-1"]').contains('00:02.10')

    cy.tick(1010)
    cy.get('[data-cy="lap-elapsed"]').contains('00 : 01 . 01')
    cy.get('[data-cy="lap"]').click()
    cy.get('[data-cy="lap-elapsed"]').contains('00 : 00 . 00')
    cy.get('[data-cy="lap-time-2"]').contains('00:01.01')
    cy.get('[data-cy="overall-time-2"]').contains('00:03.11')

    cy.tick(1020)
    cy.get('[data-cy="lap"]').click()
    cy.get('[data-cy="lap-1"]')
      .should('have.attr', 'data-stat')
      .and('match', /max/)
    cy.get('[data-cy="lap-2"]')
      .should('have.attr', 'data-stat')
      .and('match', /min/)

    cy.tick(500)
    cy.get('[data-cy="lap"]').click()
    cy.get('[data-cy="lap-1"]')
      .should('have.attr', 'data-stat')
      .and('match', /max/)
    cy.get('[data-cy="lap-4"]')
      .should('have.attr', 'data-stat')
      .and('match', /min/)

    cy.tick(1050)
    cy.get('[data-cy="lap"]').click()

    cy.tick(2500)
    cy.get('[data-cy="lap"]').click()
    cy.get('[data-cy="lap-6"]')
      .should('have.attr', 'data-stat')
      .and('match', /max/)
    cy.get('[data-cy="lap-4"]')
      .should('have.attr', 'data-stat')
      .and('match', /min/)

    cy.tick(1060)
    cy.get('[data-cy="elapsed"]').contains('00 : 09 . 24')
    cy.get('[data-cy="lap-elapsed"]').contains('00 : 01 . 06')
    cy.get('[data-cy="lap-time-6"]').contains('00:02.50').should('be.visible')
    cy.get('[data-cy="overall-time-6"]')
      .contains('00:08.18')
      .should('be.visible')
    cy.get('[data-cy="lap-time-1"]').should('not.be.visible')
    cy.get('[data-cy="overall-time-1"]').should('not.be.visible')
    cy.get('[data-radix-scroll-area-viewport]').scrollTo(0, 100)
    cy.get('[data-cy="lap-time-6"]').should('not.be.visible')
    cy.get('[data-cy="overall-time-6"]').should('not.be.visible')
    cy.get('[data-cy="lap-time-1"]').should('be.visible')
    cy.get('[data-cy="overall-time-1"]').should('be.visible')

    cy.get('[data-cy="pause"]').click()
    cy.get('[data-cy="lap-elapsed"]').should('be.visible')
    cy.get('[data-radix-scroll-area-viewport]').should('be.visible')
    cy.get('[data-cy="resume"]').should('be.visible')
    cy.get('[data-cy="reset"]').should('be.visible')

    cy.tick(1000)
    cy.get('[data-cy="elapsed"]').contains('00 : 09 . 24')
    cy.get('[data-cy="lap-elapsed"]').contains('00 : 01 . 06')
    cy.get('[data-cy="resume"]').click()

    cy.tick(1050)
    cy.get('[data-cy="pause"]').click()
    cy.get('[data-cy="elapsed"]').contains('00 : 10 . 29')
    cy.get('[data-cy="lap-elapsed"]').contains('00 : 02 . 11')

    cy.get('[data-cy="reset"]').should('be.visible').click()
    cy.tick(10000)
    cy.get('[data-cy="elapsed"]').contains('00 : 00 . 00')
    cy.get('[data-cy="lap-elapsed"]').should('not.be.visible')
    cy.get('[data-radix-scroll-area-viewport]').should('not.be.visible')
  })
})
