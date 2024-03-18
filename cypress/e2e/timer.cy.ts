describe('Timer', () => {
  beforeEach(() => {
    cy.clock(Date.now())
    cy.visit('/')
    cy.get('[data-cy="timer-trigger"]').click()
  })

  describe('Actions', () => {
    it('start', () => {
      cy.get('[data-cy="seconds-select"]').select('01')
      cy.get('[data-cy="start"]').contains('Start').click()
      cy.get('[data-cy="start"]').should('not.exist')
      cy.tick(500)
      cy.get('[data-cy="timer"]').should('be.visible').contains('50ms')
    })

    it('pause', () => {
      cy.get('[data-cy="seconds-select"]').select('01')
      cy.get('[data-cy="start"]').click()
      cy.tick(500)
      cy.get('[data-cy="pause"]').contains('Pause').click()
      cy.get('[data-cy="pause"]').should('not.exist')
      cy.get('[data-cy="timer"]').contains('50ms')
    })

    it('resume', () => {
      cy.get('[data-cy="seconds-select"]').select('01')
      cy.get('[data-cy="start"]').click()
      cy.tick(500)
      cy.get('[data-cy="pause"]').click()
      cy.tick(1000)
      cy.get('[data-cy="resume"]').contains('Resume').click()
      cy.get('[data-cy="resume"]').should('not.exist')
      cy.tick(250)
      cy.get('[data-cy="timer"]').contains('25ms')
    })

    it('cancel', () => {
      cy.get('[data-cy="seconds-select"]').select('01')
      cy.get('[data-cy="start"]').click()
      cy.tick(500)
      cy.get('[data-cy="reset"]').contains('Cancel').click()
      cy.get('[data-cy="reset"]').should('not.exist')
      cy.get('[data-cy="start"]').should('exist')
      cy.get('[data-cy="timer"]').should('not.exist')
    })
  })

  describe('Time View', () => {
    it('milliseconds', () => {
      cy.get('[data-cy="seconds-select"]').select('01')
      cy.get('[data-cy="start"]').click()
      cy.tick(500)
      cy.get('[data-cy="timer"]').contains('50ms')
      cy.tick(250)
      cy.get('[data-cy="timer"]').contains('25ms')
    })

    it('seconds', () => {
      cy.get('[data-cy="seconds-select"]').select('05')
      cy.get('[data-cy="start"]').click()
      cy.tick(2500)
      cy.get('[data-cy="timer"]').contains('02s 50ms')
      cy.tick(2000)
      cy.get('[data-cy="timer"]').contains('50ms')
    })

    it('minutes', () => {
      cy.get('[data-cy="minutes-select"]').select('05')
      cy.get('[data-cy="seconds-select"]').select('01')
      cy.get('[data-cy="start"]').click()
      cy.tick(1000)
      cy.get('[data-cy="timer"]').contains('05m 00s 00ms')
      cy.tick(1000 * 60 * 2.5)
      cy.get('[data-cy="timer"]').contains('02m 30s 00ms')
      cy.tick(1000 * 60 * 2)
      cy.get('[data-cy="timer"]').contains('30s 00ms')
    })

    it('hours', () => {
      cy.get('[data-cy="hours-select"]').select('02')
      cy.get('[data-cy="start"]').click()
      cy.tick(1000 * 60 * 60)
      cy.get('[data-cy="timer"]').contains('01h 00m 00s 00ms')
      cy.tick(1000 * 5)
      cy.get('[data-cy="timer"]').contains('59m 55s 00ms')
    })
  })
})