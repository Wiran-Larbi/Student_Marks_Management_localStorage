import InputValidator from "./InputValidator.js";
import Etudiant from "./Etudiant.js";

// * Basic Variables To use
const inputValidator = new InputValidator();
const etudiant = new Etudiant();
const formEtudiant = document.getElementById("formEtudiant");
const ajouterNoteBTN = document.getElementById("ajouterNote");
const formFieldsDOM = {
        id: formEtudiant.querySelector("#id"),
        nom: formEtudiant.querySelector("#nom"),
        prenom: formEtudiant.querySelector("#prenom"),
        dateNaissance: formEtudiant.querySelector("#dateNaissance"),
        filiere: formEtudiant.querySelector("#filiere"),
        email: formEtudiant.querySelector("#email"),
        telephone: formEtudiant.querySelector("#tel"),
        note: formEtudiant.querySelector("#note1"),
        moyenne: formEtudiant.querySelector("#moyenne")
};

const clearStorage = () => {
localStorage.clear()
localStorage.setItem("count","0");
}

// ? Returns Input values from DOM corresponding to their types
const getInputValue = (inputDOM,type) => {
      let InputValue;
      let result;
      switch (type) {
          case "number":
             InputValue = inputDOM.value;
             result = parseInt(InputValue);
              return result;
            break;
          case "text":
             InputValue = inputDOM.value;
             result = InputValue;
             return result;
            break;
          case "date":
             InputValue = inputDOM.value;
             const dob = new Date(InputValue);
             // result in format : YYYY-MM-DD
             result = `${dob.getFullYear()}-${dob.getMonth()+1}-${dob.getDate()}`;
             return [result,dob];
            break;
          case "email":
            InputValue = inputDOM.value;
            result = InputValue;
            return result
           break;
          case "telephone":
            InputValue = inputDOM.value;
            result = InputValue;
            return result
           break;
          default:
            return ""
      }
}

//? returns invalid Inputs to notify client
const invalidInputs =  () => {
     
    const fieldsValidationTest = [
      inputValidator.validate(etudiant.nom,'nom'),
      inputValidator.validate(etudiant.prenom, 'nom'),
      inputValidator.validate(etudiant.dateNaissance,'date'),
      inputValidator.validate(etudiant.filiere,'filiere'),
      inputValidator.validate(etudiant.email,'email'),
      inputValidator.validate(etudiant.telephone,'tel')
    ];

    const mapToFormFields = new Map([
      [0,formFieldsDOM.nom],
      [1,formFieldsDOM.prenom],
      [2,formFieldsDOM.dateNaissance],
      [3,formFieldsDOM.filiere],
      [4,formFieldsDOM.email],
      [5,formFieldsDOM.telephone]
    ]);
    const invalidFields = [];
    const invalidIndexes = [];
    // const invalidIndexes = fieldsValidationTest.filter((field,index) => {
    //   if(field === false)
    //     return index;
    // });
    for(let index = 0; index < fieldsValidationTest.length; index++){
        if(fieldsValidationTest[index] === false)
          invalidIndexes.push(index);
    }

    if(invalidIndexes.length === 0)
      return [];
    else {
        invalidIndexes.forEach((index) => {
          invalidFields.push(mapToFormFields.get(index));
        });
      return invalidFields; 
    }
    
}

// ? Creates a row in the Table Of students
const createStudentRow = (id,nom,prenom,date,filiere,email,telephone,notes,moyenne) => {
    const table = document.getElementById("tableEtudiants");
    const studentRow = document.createElement("tr");
    const nomCell = document.createElement("td");
    nomCell.textContent = nom;
    const prenomCell = document.createElement("td");
    prenomCell.textContent = prenom;
    const dateNaissanceCell = document.createElement("td");
    dateNaissanceCell.textContent = date;
    const filiereCell = document.createElement("td");
    filiereCell.textContent = filiere;
    const emailCell = document.createElement("td");
    emailCell.textContent = email;
    const telephoneCell = document.createElement("td");
    telephoneCell.textContent = telephone;
    const notesCell = document.createElement("td");
    let notesStr = "[ ";
    notes.forEach((note,index) => {
      if(index === 0)
        notesStr += `${note}`;
      else {
        notesStr += `, ${note}`;
      }
    });
    notesCell.textContent = notesStr;
    const moyenneCell = document.createElement("td");
    moyenneCell.textContent = moyenne;

    const btns = document.createElement("td");
    const modifyBTN = document.createElement("button");
    modifyBTN.dataset.studentId = id;
    modifyBTN.classList.add("modifier");
    modifyBTN.textContent = "Modifier";
    const deleteBTN = document.createElement("button");
    deleteBTN.dataset.studentId = id;
    deleteBTN.classList.add("supprimer");
    deleteBTN.textContent = "Supprimer";

    btns.appendChild(modifyBTN);
    btns.appendChild(deleteBTN);

    studentRow.appendChild(nomCell);
    studentRow.appendChild(prenomCell);
    studentRow.appendChild(dateNaissanceCell);
    studentRow.appendChild(filiereCell);
    studentRow.appendChild(emailCell);
    studentRow.appendChild(telephoneCell);
    studentRow.appendChild(notesCell);
    studentRow.appendChild(moyenneCell);
    studentRow.appendChild(btns);
  
    table.appendChild(studentRow);
}

// ? Loads Date from local Storage to Table
const loadLocalStorageDataIntoDOM = () => {
    const count = parseInt(localStorage.getItem("count"));   
    if( count === 0)
      return;
    else {
      for(let student = 1; student <= count; student++){
        if(localStorage.getItem(String(student)) != null){
          let student_deserialized = JSON.parse(localStorage.getItem(String(student)));
          createStudentRow(student_deserialized.id,student_deserialized.nom,student_deserialized.prenom,student_deserialized.dateNaissance.slice(0,10),student_deserialized.filiere,student_deserialized.email,student_deserialized.telephone,student_deserialized.notes,student_deserialized.moyenne);
        }
      }
    }
}


// const unitTest1 = () => {
//    console.log(`Nom : ${getInputValue(formFieldsDOM.nom,"text")}, Prenom : ${getInputValue(formFieldsDOM.prenom,"text")}, Date de Naissance : ${getInputValue(formFieldsDOM.dateNaissance,"date")[0]}, Filiere : ${getInputValue(formFieldsDOM.filiere,"text")}, Telephone : ${getInputValue(formFieldsDOM.telephone,"telephone")}`);
// }w




// ? Handling modify buttons
const modifyButtons = document.querySelectorAll('.modifier');

modifyButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const studentID = event.target;

    // console.log(`Student that need to be modified is : ${studentID.dataset.studentId}`);

    // ? Loading Data into Form Fields
    const studentToModify = JSON.parse(localStorage.getItem(studentID.dataset.studentId));
    console.log(studentToModify);
    // ! Loading
    formFieldsDOM.id.value = studentToModify.id;
    formFieldsDOM.nom.value = studentToModify.nom;
    formFieldsDOM.prenom.value = studentToModify.prenom;
    const date = new Date(studentToModify.dateNaissance);
    formFieldsDOM.dateNaissance.valueAsDate = date;
    formFieldsDOM.filiere.value = studentToModify.filiere;
    formFieldsDOM.email.value = studentToModify.email;
    formFieldsDOM.telephone.value = studentToModify.telephone;
    formFieldsDOM.moyenne.value = studentToModify.moyenne;

  })

});

// ? Handling delete buttons
const deleteButtons = document.querySelectorAll('.supprimer');

deleteButtons.forEach((button) => {
  button.addEventListener('click',(event) => {
    const studentID = event.target;
    // console.log(`Student that need to be modified is : ${studentID.dataset.studentId}`);
    // ? Deleting Student from LocalStorage
    localStorage.removeItem(studentID.dataset.studentId);
    // ? Removing Student From Table DOM
    const row_to_delete = studentID.parentNode.parentNode;
    row_to_delete.remove(); 


  });

});

// ? Loading stored student in LocalStorage
loadLocalStorageDataIntoDOM();

//? Handling add note button : adds note to student notes
ajouterNoteBTN.addEventListener("click",() => {
    const noteValue = parseFloat(formFieldsDOM.note.value);
    if(noteValue !== NaN && noteValue >= 0 && noteValue <= 20){
      etudiant.addNote(noteValue);
      formFieldsDOM.note.value = '';
      formFieldsDOM.moyenne.disabled = false;
      formFieldsDOM.moyenne.value = etudiant.moyenne();
    }
})


// ? Handling Submit Of Student
formEtudiant.addEventListener("submit", (event) => {
    event.preventDefault();

    //? Getting All The input Value
    if(getInputValue(formFieldsDOM.id,"number") === 0)
      etudiant.id = parseInt(localStorage.getItem("count"));
    else
      etudiant.id = getInputValue(formFieldsDOM.id,"number");


    localStorage.setItem("count",parseInt(localStorage.getItem("count")) + 1);
    etudiant.nom = getInputValue(formFieldsDOM.nom,"text");
    etudiant.prenom = getInputValue(formFieldsDOM.prenom,"text");
    etudiant.dateNaissance = getInputValue(formFieldsDOM.dateNaissance,"date")[1];
    etudiant.filiere = getInputValue(formFieldsDOM.filiere,"text");
    etudiant.email = getInputValue(formFieldsDOM.email,"email");
    etudiant.telephone = getInputValue(formFieldsDOM.telephone,"telephone");

    // etudiant.display();

    //? Returning The invalid Fields in the form inputs :
    const InvalidInputs = invalidInputs();    
    
    // ? Changing Invalid Fields To Red
    if(InvalidInputs.length !== 0)
      InvalidInputs.forEach((invalid) => {
        invalid.classList.add("failed");
      });
    else{
      
      if(!etudiant.valide()){
         formFieldsDOM.note.classList.add("failed");
      }else{
        //? We will Add the Student to the Table
        createStudentRow(etudiant.id,etudiant.nom,etudiant.prenom,etudiant.displayedDob(),etudiant.filiere,etudiant.email,etudiant.telephone,etudiant.notes,etudiant.moyenne());
        //? Storing Student Object into LocalStorage
        const etudiant_object = {
            id: etudiant.id,
            nom: etudiant.nom,
            prenom: etudiant.prenom,
            dateNaissance: etudiant.dateNaissance,
            filiere: etudiant.filiere,
            email: etudiant.email,
            telephone: etudiant.telephone,
            notes: etudiant.notes,
            moyenne: etudiant.moyenne()
        }
        const etudiant_serialized = JSON.stringify(etudiant_object);
        localStorage.setItem(String(etudiant.id),etudiant_serialized);


        // ? Make them green then empty the fields for next entries student
        for(let field in formFieldsDOM) {
          const fieldDOM = formFieldsDOM[field];
            fieldDOM.value = '';
            fieldDOM.classList.add("success");
        }
      }
    }
});