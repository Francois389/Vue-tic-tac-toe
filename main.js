const app = Vue.createApp({
    data() {
        return {
            title: 'Tic Tac Toe',
            historique: [[['', '', ''], ['', '', ''], ['', '', '']]],
            pions: ['X', 'O'],
            nbTour: 0,
            existeGagnant: false,
            information: 'Cliquez sur une case pour commencer',
            alignementGagnant: [],
        }
    },
    methods: {
        gestionDuClick(ligne, colonne) {
            if (this.historique[this.nbTour][ligne][colonne] !== '') {
                return
            }
            if (!this.existeGagnant) {
                let nouvelleGrille;

                //Copie de la grille actuelle
                nouvelleGrille = JSON.parse(JSON.stringify(this.historique[this.nbTour]))

                this.historique.push(nouvelleGrille)
                this.historique[this.nbTour + 1][ligne][colonne] = this.pions[this.nbTour % 2]
                this.nbTour++

                const gagnant = this.estGagne()
                if (gagnant !== '') {
                    this.affichageGagnant(gagnant)
                } else if (this.nbTour === 9 && !this.existeGagnant) {
                    this.information = 'Match nul'
                } else {
                    this.information = `C'est au tour du joueur ${this.pions[this.nbTour % 2]}`
                }
            }
        },
        affichageGagnant(gagnant) {
            this.existeGagnant = true
            this.information = `Le joueur ${gagnant} a gagné`
        },
        estGagne() {
            for (let i = 0; i < 3; i++) {
                //On regarde les lignes
                if (   this.historique[this.nbTour][i][0] !== ''
                    && this.historique[this.nbTour][i][0] === this.historique[this.nbTour][i][1]
                    && this.historique[this.nbTour][i][0] === this.historique[this.nbTour][i][2]) {

                    this.alignementGagnant = [i * 3, i * 3 + 1, i * 3 + 2];
                    return this.historique[this.nbTour][i][0]
                }
                //On regarde les colonnes
                if (   this.historique[this.nbTour][0][i] !== ''
                    && this.historique[this.nbTour][0][i] === this.historique[this.nbTour][1][i]
                    && this.historique[this.nbTour][0][i] === this.historique[this.nbTour][2][i]) {

                    this.alignementGagnant = [i, 3 + i, 2 * 3 + i];
                    return this.historique[this.nbTour][0][i]
                }
            }
            //On regarde la diagonale NO-SE
            if (   this.historique[this.nbTour][0][0] !== ''
                && this.historique[this.nbTour][0][0] === this.historique[this.nbTour][1][1]
                && this.historique[this.nbTour][0][0] === this.historique[this.nbTour][2][2]) {

                this.alignementGagnant = [0, 4, 8];
                return this.historique[this.nbTour][0][0]
            }
            //On regarde la diagonale NE-SO
            if (   this.historique[this.nbTour][0][2] !== ''
                && this.historique[this.nbTour][0][2] === this.historique[this.nbTour][1][1]
                && this.historique[this.nbTour][0][2] === this.historique[this.nbTour][2][0]) {

                this.alignementGagnant = [2, 4, 6];
                return this.historique[this.nbTour][0][2]
            }
            return ''
        },
        gestionVoyageTemporel(index) {
            this.historique.splice(index + 1)
            this.nbTour = index
            this.existeGagnant = false
            this.information = `C'est au tour du joueur ${this.pions[this.nbTour % 2]}`
            this.alignementGagnant = []

            console.log(index)
        }
    },
});
