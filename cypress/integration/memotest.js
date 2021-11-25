/// <reference types="Cypress" />


const PAGINA = "http://192.168.1.3:8080"

context("Memotest", () => {

    before(() => {
        cy.visit(PAGINA)
    })

    describe("juega al memotest", () => {
        const NUMERO_CUADROS = 12

        it("Se asegura que pueda seleccionar una dificultad del juego", () => {
            cy.get(".inicio").find("#button2").click()
        })

        it("Se asegura que hayan cuadros", () => {
            cy.get("#tabla").find(".cuadro").should("have.length", NUMERO_CUADROS)
        })

        it("Se asegura que los cuadros sean aleatorios", () => {
            cy.get(".cuadro").then((cuadros) => {
                let clasesOriginales = []
                cuadros.each(function(i, cuadro) {
                    clasesOriginales.push(cuadro.style.backgroundColor)
                })
                
                cy.visit(PAGINA)

                cy.get(".inicio").find("#button2").click()
            
                let clasesNuevas = []
                cy.get(".cuadro").then(nuevosCuadros => {
                    nuevosCuadros.each(function(i, cuadro) {
                        clasesNuevas.push(cuadro.style.backgroundColor)
                    })

                    cy.wrap(clasesOriginales).should("not.deep.equal", clasesNuevas)
                })
            })  
        })

        it("Se asegura que puede resolver el juego", () => {
            cy.get(".cuadro").then(cuadros => {
                let pares = buscarPares(cuadros)
                let listaDePares = Object.values(pares)

                console.log(listaDePares)
                listaDePares.forEach((par) => {
                    cy.get(par[0]).click();
                    cy.get(par[1]).click();
                  });
                
            })
            
        })

        it("Se asegura que exista el resultado", () => {
            cy.get('#resultado').should('have.length', 1);
        })
        
    })
})


function buscarPares(cuadros){
    

let pares = {}

cuadros.each((i, cuadro) => {
    const claseColor = cuadro.style[`background-color`]
    if (pares[claseColor]) {
        pares[claseColor].push(cuadro);
    } else {
        pares[claseColor] = [cuadro];
    }
})

return pares
}

