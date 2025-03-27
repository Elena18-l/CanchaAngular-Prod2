export interface Skills{
    fisico:number;
    tecnica:number;
    fuerzaMental:number;
    habilidadEspecial:number;
    resistencia:number;
}

export interface Player {
    id: string;
    name: string;
    age: number;
    foto: string;
    portrait: string;
    team: string;
    position: string;
    stature: number;
    average: number;
    shirtNumber: number;
    skills: {
      fisico: number;
      tecnica: number;
      fuerzaMental: number;
      resistencia: number;
      habilidadEspecial: number;
    };
    bio: string;
    gallery: string[];
    video: string[];
  }