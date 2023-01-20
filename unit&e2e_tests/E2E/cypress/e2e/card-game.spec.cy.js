/// <reference types="cypress" />

describe('CardGame', ()=> {
  beforeEach(()=> {
    cy.visit('http://127.0.0.1:5500/index.html');
    cy.viewport(1180, 720);

  });

  it("В начальном состоянии игра должна иметь поле четыре на четыре клетки, в каждой клетке цифра должна быть невидима", () => {
    cy.get('input').type('16');
    cy.contains('Начнём игру!').click();
    cy.get('.card').should((card) => {
      expect(card).to.have.length(16)
    });
  });

  it("При нажатии на одну произвольную карточкуб она осталётся открытой", () => {
    cy.get('input').type('16');
    cy.contains('Начнём игру!').click();
    cy.get('.card').should((card) => {
      expect(card).to.have.length(16)
    });
    cy.contains('1').click();
    cy.get('.open').should((card) => {
      expect(card).to.have.length(1)
    })
  });

  it("Нажимаем на левую верхнюю карточку,а затем на следующую, если это не пара, то повторять со следующей карточкой, пока не будет найдена пара. Найденная пара карточек осталась видимой.", () => {
    cy.get('input').type('16');
    cy.contains('Начнём игру!').click();
    let firstCard = 0;
    let secondCard = 1;
    let firstValue = '0';
    let secondValue = '?';

    function clickCard(){
      cy.get('.card').then( cards =>{
        cy.get(cards).eq(firstCard).click().then((first)=>{
          firstValue = first.text();
        });
        cy.get(cards).eq(secondCard).click().then((second)=>{
          secondValue = second.text();
        });
        if(firstValue === secondValue){
          cy.get('.card').eq(firstCard).should('not.have.text', '');
          cy.get('.card').eq(secondCard).should('not.have.text', '');
        }else{
          secondCard +=1;
          clickCard();
        }
      })
    }
    clickCard();
  });

  it("Нажимаем на левую верхнюю карточку, затем на следующую, если это пара, то повторять со следующими двумя карточками, пока не найдутся непарные карточки, которые после нажатия на вторую карточку обе становятся невидимыми.", () => {
    cy.get('input').type('16');
    cy.contains('Начнём игру!').click();
    let firstCard = 0;
    let secondCard = 1;
    let firstValue = '0';
    let secondValue = '?';

    function clickCard(){
      cy.get('.card').then( cards =>{
        cy.get(cards).eq(firstCard).click().then((first)=>{
          firstValue = first.text();
        });
        cy.get(cards).eq(secondCard).click().then((second)=>{
          secondValue = second.text();
        });
        if(firstValue === secondValue){
          secondCard +=1;
          clickCard();
        }else{
          cy.get('.card').eq(firstCard).should('not.have.text', '');
          cy.get('.card').eq(secondCard).should('not.have.text', '');
        }
      })
    }
    clickCard();
  });
})

