const app = Vue.createApp({
    data() {
        return {
            title: 'Tic Tac Toe',
            grille: [['', '', ''], ['', '', ''], ['', '', '']],
            pions: ['X', 'O'],
            nbTour: 0,
        }
    },
    methods: {
        gestionDuClick(ligne, colonne) {
            this.grille[ligne][colonne] = this.pions[this.nbTour % 2]
            this.nbTour++
        }
    }
})