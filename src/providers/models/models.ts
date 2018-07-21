
export interface Category {
    categoryName: string,
    description: string
}
export interface User {
    email: string;
    password: string;
}

export interface Product {
    profilePic: string;
    productName: string;
    storeName: string;
    storePrice: string;
    category: string;
    productDescription: string;
}

export interface Store {
    storeName: string,
    storeLocation: string
}

export interface FileUpload {
    $key: string;
    name: string;
    url: string;
    file: File;
}