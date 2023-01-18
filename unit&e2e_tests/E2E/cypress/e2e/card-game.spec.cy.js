/// <reference types="cypress" />
describe('CardGame', ()=> {
  beforeEach(()=> {
    cy.visit('http://127.0.0.1:5500/e2e/index.html');
    cy.viewport(1180, 720)
  });

  it('создается поле 4*4', ()=>{
    cy.get('input').type('16');
    cy.contains('Начнём игру!').click();
    cy.get('.card').should((card) => {
      expect(card).to.have.length(16)
    })
    cy.contains('1').click();
    cy.get('.open').should((card) => {
      expect(card).to.have.length(1)
    })
    cy.get('.card').then( cards =>{
      let firstCard = cards[0].textContent;
      cy.get('.field div:first').click();
      for(let i = 1; i < cards.length; i++){
        cy.get(cards[i]).click();
        cy.wait(1000)
        if(cards[i].textContent === firstCard){
          cy.get('.field div:first').should('.success');
          cy.get('.card').eq(i).should('.success');
          break;
        }
      }
    })
  });
})
