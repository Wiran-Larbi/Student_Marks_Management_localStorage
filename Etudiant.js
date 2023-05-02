export default class Etudiant{
    #id;
    #nom;
    #prenom;
    #dateNaissance;
    #filiere;
    #email;
    #telephone;
    #notes = [];
    #moyenne;

    constructeur(id="",nom="",prenom="",dateNaissance="",filiere="",email="",telephone=""){
        this.#id = id;
        this.#nom = nom;
        this.#prenom = prenom;
        this.#dateNaissance = dateNaissance;
        this.#filiere = filiere;
        this.#email = email;
        this.#telephone = telephone;
    }

    display() {
        console.log(`Nom : ${this.#nom}, Prenom : ${this.#prenom}, date Naissance : ${this.#dateNaissance}, Filiere : ${this.#filiere}, Email : ${this.#email}, Telephone : ${this.#telephone}`);
    }
    get id() {
        return this.#id;
    }

    get nom() {
        return this.#nom;
    }
    get prenom() {
        return this.#prenom;
    }
    get dateNaissance() {
        return this.#dateNaissance;
    }
    displayedDob() {
        const dob = new Date(this.#dateNaissance);
             // result in format : YYYY-MM-DD
        
        let result = `${dob.getFullYear()}-${dob.getMonth()+1}-${dob.getDate()}`;
        return result;
    }
    get filiere() {
        return this.#filiere;
    }
    get email() {
        return this.#email;
    }
    get telephone() {
        return this.#telephone;
    }
    get notes() {
        return this.#notes;
    }
    set id(id) {
        this.#id = id;
    }

    set nom(nom) {
        this.#nom = nom
    }
    set prenom(prenom) {
        this.#prenom = prenom
    }
    set dateNaissance(date) {
        this.#dateNaissance = date
    }
    set filiere(filiere) {
        this.#filiere = filiere
    }
    set email(email) {
        this.#email = email
    }
    set telephone(telephone) {
        this.#telephone = telephone
    }

    addNote(note) {
        this.#notes.push(note);
    }
    moyenne() {
         if(this.#notes.length > 0){
            let sum = 0; 
            this.#notes.forEach((note) => {
                sum += note;
             });
             this.#moyenne = sum / this.#notes.length;
             return this.#moyenne;  
         }
    }

    valide() {
        return this.#notes.length >= 4;
    }

    toString() {
        return JSON.stringify(this);
    }

}