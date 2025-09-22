import { ToucheCoule } from "./ToucheCoule.js";
import readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const jeu = new ToucheCoule(5, 3, 15);

console.log("=== Jeu Touché-Coulé ===");
console.log("Entrez des coordonnées X Y (ex: 1 3)");

function tour() {
  jeu.afficherGrille();
  if (jeu.partieTermine()) {
    console.log(jeu.victoire() ? "🏆 Victoire !" : "💥 Perdu !");
    rl.close();
    return;
  }

  rl.question("Tir : ", reponse => {
    const [sx, sy] = reponse.trim().split(/\s+/);
    const x = Number(sx);
    const y = Number(sy);
    console.log(jeu.tirer(x, y));
    tour();
  });
}

tour();