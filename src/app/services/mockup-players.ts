import {Player} from './player';

export const Players: Player[] = [
  {id: 1, name: 'Takenori Akagi', age: 18, team: 'Shohoku', stature: 193, average: 9.6, shirtNumber: 4, position: 'Pivot', foto:'assets/playerFullImage/akagi.png', portrait:'/assets/logo.png', gallery:['assets/gallery/hanamichi1.png','assets/gallery/hanamichi2.png','assets/gallery/hanamichi3.png','assets/gallery/hanamichi4.png'], bio:'Capitán y pívot de Shohoku, conocido por su seriedad y disciplina. Sueña con llevar al equipo al campeonato nacional y es considerado el mejor pívot de la prefectura de Kanagawa.', skills: {fisico:10, tecnica:9, fuerzaMental:9,habilidadEspecial:10, resistencia:9} },
  {id: 2, name: 'Kiminoru Kogure', age: 18, team: 'Shohoku', stature: 178, average: 8.4, shirtNumber: 5, position: 'Alero', foto:'logo.png', portrait:'/assets/logo.png', gallery:['assets/gallery/hanamichi1.png','assets/gallery/hanamichi2.png','assets/gallery/hanamichi3.png','assets/gallery/hanamichi4.png'], bio:'Subcapitán y escolta suplente de Shohoku. Amigo cercano de Akagi desde la secundaria, es un jugador confiable y apoyo moral para el equipo, destacando por su actitud amable y perseverancia.',skills: {fisico:7, tecnica:8, fuerzaMental:8,habilidadEspecial:7, resistencia:8}},
  {id: 3, name: 'Ryouta Miyagi', age: 17, team: 'Shohoku', stature: 168, average: 9, shirtNumber: 7, position: 'Base', foto:'logo.png', portrait:'/assets/logo.png',  gallery:['assets/gallery/hanamichi1.png','assets/gallery/hanamichi2.png','assets/gallery/hanamichi.png','assets/gallery/hanamichi4.png'], bio:'Base titular de Shohoku, destacado por su velocidad y habilidades defensivas. Tras superar conflictos personales, se convierte en un miembro clave del equipo y desarrolla una estrecha amistad con Sakuragi.',skills: {fisico:8, tecnica:10, fuerzaMental:10,habilidadEspecial:7, resistencia:10}},   
  {id: 4, name: 'Hanamichi Sakuragi', age: 15, team: 'Shohoku', stature: 189.2, average: 9, shirtNumber: 10, position: 'Ala-Pivot', foto:'logo.png', portrait:'/assets/logo.png', gallery:['assets/gallery/hanamichi1.png','assets/gallery/hanamichi2.png','assets/gallery/hanamichi3.png','assets/gallery/hanamichi4.png'], bio:'Hanamichi Sakuragi es un estudiante de Shohoku con carácter impulsivo y talento nato para el baloncesto. Inicialmente, lo desprecia, pero al unirse al equipo por Haruko Akagi, se convierte en un jugador clave, destacando en rebotes y mejorando su técnica con esfuerzo y determinación.',skills: {fisico:10, tecnica:8, fuerzaMental:8,habilidadEspecial:10, resistencia:10}},  
  {id: 5, name: 'Kaede Rukawa', age: 15, team: 'Shohoku', stature: 187, average: 9.2, shirtNumber: 11, position: 'Alero', foto:'logo.png', portrait:'/assets/logo.png',  gallery:['assets/gallery/hanamichi1.png','assets/gallery/hanamichi2.png','assets/gallery/hanamichi3.png','assets/gallery/hanamichi4.png'], bio:'Alero estrella de Shohoku, es talentoso, frío y extremadamente competitivo. Su sueño es jugar en la NBA, y su increíble habilidad ofensiva lo convierte en el mayor anotador del equipo. Aunque rivaliza con Sakuragi, juntos fortalecen a Shohoku en su camino al campeonato.',skills: {fisico:9, tecnica:10, fuerzaMental:9,habilidadEspecial:10, resistencia:8}},   
  {id: 6, name: 'Hisashi Mitsui', age: 18, team: 'Shohoku', stature: 176, average: 8.4, shirtNumber: 14, position: 'Escolta', foto:'logo.png', portrait:'/assets/logo.png',  gallery:['assets/gallery/hanamichi1.png','assets/gallery/hanamichi2.png','assets/gallery/hanamichi3.png','assets/gallery/hanamichi4.png'], bio:'Escolta titular de Shohoku, reconocido por su habilidad en los tiros de tres puntos. Tras una lesión y un período alejado del baloncesto, regresa al equipo, aportando experiencia y precisión en momentos clave.',skills: {fisico:7, tecnica:10, fuerzaMental:9,habilidadEspecial:10, resistencia:6}},
];



 /*   id:number;
    name:string;
    age:number;
    image:string; <= cuando tengamos las imagenes lo descomentamos
    team:string;
    stature: number;
    average: number;
    shirtNumber: number;
    position: string;*/