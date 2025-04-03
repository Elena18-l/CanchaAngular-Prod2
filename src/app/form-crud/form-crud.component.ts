// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Output } from '@angular/core';
// import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { addDoc, collection, doc, Firestore, setDoc } from 'firebase/firestore';
// import { PlayerService } from '../services/playerService';
// import { Player } from '../services/player';

// @Component({
//   selector: 'app-form-crud',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './form-crud.component.html',
//   styleUrl: './form-crud.component.css'
// })

// export class FormCrudComponent {
//   @Output() close = new EventEmitter<void>();
//   @Output() playerAdded = new EventEmitter<Player>(); // Emitir el jugador añadido

//   playerForm = new FormGroup({
//     id: new FormControl(''), //valor inicial vacío poma.
//     name: new FormControl('', Validators.required),
//     position: new FormControl('', Validators.required),
//     shirtNumber: new FormControl(null, Validators.required),
//     age: new FormControl(null, Validators.required),
//     stature: new FormControl(null, Validators.required),
//     average: new FormControl(null, Validators.required),
//     bio: new FormControl('', Validators.required),
//     team: new FormControl('', Validators.required),
//     portrait: new FormControl(''),
//     foto: new FormControl(''),
//     video: new FormArray([]), // Array dinámico de videos
//     gallery: new FormArray([]), // Array dinámico de imágenes en la galería
//     skills: new FormGroup({
//       fisico: new FormControl(null, Validators.required),
//       fuerzaMental: new FormControl(null, Validators.required),
//       habilidadEspecial: new FormControl(null, Validators.required),
//       resistencia: new FormControl(null, Validators.required),
//       tecnica: new FormControl(null, Validators.required),
//     }),
//   });

//   constructor(private firestore: Firestore, private playerService: PlayerService) {}



//   isFormOpen = false;

//   openForm() {
//     console.log('abriendo formulario.lolololo');
//     const playersRef = collection(this.firestore, 'players');
//     const tempDocRef = doc(playersRef); // Genera un ID sin crear documento
//     console.log('ID generado:', tempDocRef.id);
//     this.playerForm.patchValue({ id: tempDocRef.id });
//     this.isFormOpen = true;
//   }

//   closeForm() {
//     this.isFormOpen = false;
//   }


//   async addPlayer() {
//     if (!this.playerForm.valid) {  
//       console.log('Formulario inválido');
//       this.playerForm.markAllAsTouched(); // Marcar errores en el formulario
//       return;  // Detener el proceso, pero sin cerrar el modal
//     }
  
//     try {
//       const playersRef = collection(this.firestore, 'players');
//       console.log('Intentando añadir jugador a Firestore...');
  
//       const docRef = await addDoc(playersRef, this.playerForm.value);
//       console.log('Jugador añadido con éxito, ID:', docRef.id);

//       const playerData = {
//         ...this.playerForm.value,
//         id: docRef.id,
//         name: this.playerForm.value.name || '',
//         position: this.playerForm.value.position || '',
//         shirtNumber: this.playerForm.value.shirtNumber || 0,
//         age: this.playerForm.value.age || 0,
//         stature: this.playerForm.value.stature || 0,
//         average: this.playerForm.value.average || 0,
//         bio: this.playerForm.value.bio || '',
//         team: this.playerForm.value.team || '',
//         portrait: this.playerForm.value.portrait || '',
//         foto: this.playerForm.value.foto || '',
//         video: this.playerForm.value.video || [],
//         gallery: this.playerForm.value.gallery || [],
//         skills: {
//           fisico: this.playerForm.value.skills?.fisico || 0,
//           fuerzaMental: this.playerForm.value.skills?.fuerzaMental || 0,
//           habilidadEspecial: this.playerForm.value.skills?.habilidadEspecial || 0,
//           resistencia: this.playerForm.value.skills?.resistencia || 0,
//           tecnica: this.playerForm.value.skills?.tecnica || 0,
//         },
//       };



  
//       await setDoc(doc(playersRef, docRef.id), playerData);
//       this.playerAdded.emit(playerData);
//       this.closeModal();
//     } catch (error) {
//       console.error('🔥 Error al añadir jugador:', error);
//       alert('Error al añadir jugador: ' + (error as any).message);
//     }
//   }
  

//   onSubmit() {
//     console.log('Formulario enviado:', this.playerForm.value);
  
//     if (this.playerForm.invalid) {
//       console.log('Formulario inválido');
//       this.playerForm.markAllAsTouched();
//       return;
//     }
  
//     const playerData = { ...this.playerForm.value, id: this.playerForm.value.id || '' } as unknown as Player;
//     this.playerService.addPlayer(playerData).subscribe({
//       next: () => {
//         console.log('Jugador añadido con éxito');
//         this.closeModal();
//       },
//       error: (err) => console.error('Error al añadir jugador:', err),
//     });
//   }

//   closeModal() {
//     this.close.emit();
//   }
// }