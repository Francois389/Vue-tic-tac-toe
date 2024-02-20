const app = Vue.createApp({
    data() {
        return {
            title: 'Tic Tac Toe',
            grille: [['', '', ''], ['', '', ''], ['', '', '']],
            pions: ['X', 'O'],
            nbTour: 0,
            existeGagnant: false,
            information: 'Cliquez sur une case pour commencer',
            alignementGagnant: [],
        }
    },
    methods: {
        gestionDuClick(ligne, colonne) {
            if (this.grille[ligne][colonne] !== '') {
                return
            }
            if (!this.existeGagnant) {
                this.grille[ligne][colonne] = this.pions[this.nbTour % 2]
                this.nbTour++

                const gagnant = this.estGagne(this.grille)
                console.log(this.alignementGagnant)
                if (gagnant !== '') {
                    this.affichageGagnant(gagnant)
                } else if (this.nbTour === 9 && !this.existeGagnant) {
                    this.information = 'Match nul'
                } else {
                    this.information = `C'est au tour du joueur ${this.pions[this.nbTour % 2]}`
                }
            }
        },
        reinitialiser() {
            this.grille = [['', '', ''], ['', '', ''], ['', '', '']];
            this.nbTour = 0;
            this.existeGagnant = false;
            this.information = 'Cliquez sur une case pour commencer';
            this.alignementGagnant = [];
        },
        affichageGagnant(gagnant) {
            this.existeGagnant = true
            this.information = `Le joueur ${gagnant} a gagné`
        },
        estGagne() {
            for (let i = 0; i < 3; i++) {
                //On regarde les lignes
                if (this.grille[i][0] !== '' && this.grille[i][0] === this.grille[i][1] && this.grille[i][0] === this.grille[i][2]) {
                    this.alignementGagnant = [i * 3, i * 3 + 1, i * 3 + 2];
                    return this.grille[i][0]
                }
                //On regarde les colonnes
                if (this.grille[0][i] !== '' && this.grille[0][i] === this.grille[1][i] && this.grille[0][i] === this.grille[2][i]) {
                    this.alignementGagnant = [i, 3 + i, 2 * 3 + i];
                    return this.grille[0][i]
                }
            }
            //On regarde la diagonale NO-SE
            if (this.grille[0][0] !== '' && this.grille[0][0] === this.grille[1][1] && this.grille[0][0] === this.grille[2][2]) {
                this.alignementGagnant = [0, 4, 8];
                return this.grille[0][0]
            }
            //On regarde la diagonale NE-SO
            if (this.grille[0][2] !== '' && this.grille[0][2] === this.grille[1][1] && this.grille[0][2] === this.grille[2][0]) {
                this.alignementGagnant = [2, 4, 6];
                return this.grille[0][2]
            }
            return ''
        }
    },
});
