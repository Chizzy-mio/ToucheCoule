export class ToucheCoule {
    taille: number;
    nbBateaux: number;
    grille: string[][];
    maxEssais: number;
    bateaux: {x: number; y:number}[];
    essais: number;

    constructor(taille: number = 5, nbBateaux: number = 3, maxEssais: number = 15) {
        // On construit notre base d'éléments en leur donnant leur valeur
        this.taille = taille;
        this.nbBateaux = nbBateaux;
        this.maxEssais = maxEssais;

        this.grille = [];
        this.bateaux = [];
        this.essais = 0;

        this.initialiserGrille();
        this.placerBateaux();
    }

// Initialiser la grille 
initialiserGrille(): void {
  for (let i = 0; i < this.taille; i++) {
        this.grille[i] = [];
    for (let j = 0; j < this.taille; j++) {
        this.grille[i][j] = " ";
    }
  }
}







}