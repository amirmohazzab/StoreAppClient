export interface IAdminProductForm {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    description: string;
    summary: string;
    productType: string;
    productBrand: string;
    productTypeId: number;
    productBrandId: number;

    mainImage: File;
    gallery?: File[];

    colors?: string[];
    sizes?: string[];
}

export interface IAdminProduct {
    id: number;
    title: string;
    price: number;
    oldPrice?: number;
    description: string;
    summary: string;
    productType: string;
    productBrand: string;
    productTypeId: number;
    productBrandId: number;
    categoryId: number;
    productCategoryName: string;
    productBrandName: string;
    productTypeName: string;

    mainImage: string;
    gallery?: string[];

    colors?: string[];
    sizes?: string[];
}