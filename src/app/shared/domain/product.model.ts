export interface Product {
    id:           number;
    nombre:       string;
    descripcion:  string;
    categoria_id: number;
    precio:       number;
    stock:        number;
}

export interface ProductOnCart extends Product {
    count:        number;
}


export const NULL_PRODUCT: Product = {
    id: 0,
    nombre: '',
    descripcion: '',
    categoria_id: 0,
    precio: 0,
    stock: 0
};