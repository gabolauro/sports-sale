export interface Sport {
    id:          number;
    nombre:      string;
    descripcion: string;
}

export const NULL_SPORT: Sport = {
    id: 0,
    nombre: '',
    descripcion: '',
};