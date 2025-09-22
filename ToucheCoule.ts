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
// Lien d'aide pour cette partie = https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Placer les bateaux aléatoirement
placerBateaux(): void {
    while (this.bateaux.length < this.nbBateaux) {
        const x = Math.floor(Math.random() * this.taille);
        const y = Math.floor(Math.random() * this.taille);
        // Verifier si aucun bateaux n'est existant a cette case
        if(!this.bateaux.some(b => b.x === x && b.y === y)) {
            this.bateaux.push({x, y });
        }
    }
}

// Effectuer un tir
tirer(x: number, y:number): string {
    // Si le nombre d'essaie max est atteint, alors " "
    if (this.essais >= this.maxEssais) return "❌ Limite d'essais atteinte";
    // Si la case ne correspond pas a X ou Y, alors " "
    if(!this.estValide(x,y)) return "⚠️ Coordonées invalides";
    // Si l'emplacement choisi est égal a X ou Y, alors " "
    if(this.grille[y][x] !== " ") return "⚠️ CAse déja jouée";

    this.essais++;

    // Si on clique sur une case, on met "X" ou "o" en fonction des conditions
    const touche = this.bateaux.find(b => b.x === x && b.y === y);
    if (touche) {
        this.grille[y][x] = "X";
        this.bateaux = this.bateaux.filter(b => !(b.x === x && b.y === y));
        return "🎯 Touché !";
    } else {
        this.grille[y][x] = "o";
        return "🌊 Manqué...";
    }
}


/* La partie se termine quand les conditions suivantes sont atteinte : 
    - Le nombre d'essaie MAX 
    - Tous les bateaux sont touché
*/
partieTermine(): boolean {
    return this.essais >= this.maxEssais || this.bateaux.length === 0;
}

// On affiche la "table" de jeux aifn d'y voir plus clair
afficherGrille(): void {
    console.log("\nGrille :");

    // J'ai demander a CHATGPT pour qu'il me mette des repère sur la grille pour savoir ou choisir la case
    // En-tête : numéros de colonnes
    let header = "   "; // espace pour l’index des lignes
        for (let j = 0; j < this.taille; j++) {
            header += ` ${j.toString().padStart(2, " ")} `;
    }
    console.log(header);

    // En fonction de la taille de la grille, alors fait autant de case
    for (let i = 0; i < this.taille; i++) {
        let ligne = `${i} |`; // numéro de ligne
        for (let j= 0; j < this.taille; j++) {
            // On met les guillement a l'envert (` `) car sinon, les symbole "" ou '' vont apparaitre la variable en commentaire
            ligne += ` ${this.grille[i][j]} |`;
        }
        // On affiche "|"
        console.log(ligne);
    }
    console.log(`Essais : ${this.essais}/${this.maxEssais}`);
}
// On gagne la partie quand tous les bateaux ont été trouvé, donc si il restent 0 bateaux a trouvé
// Donc Boolean car si cette condition est VRAI alors on applique la variable
victoire(): boolean {
    return this.bateaux.length === 0;
}

estValide(x: number, y:number): boolean {
    return x >= 0 && x < this.taille && y >= 0 && y < this.taille;
}

}