export interface IProduct{
    id: number,
    title: string,
    price: number,
    pictureUrl: string,
    productTypeId?: number,
    productBrandId?: number,
    productType?: string,
    productBrand?: string,
    description?: string,
    isActive?: boolean,
    summary?: string,
    liked?: boolean; 
    likeCount: number,
    viewCount: number,
    colors: string[],
    oldPrice: number,
    sizes: string[],
    thumbnails: string[],
    averageRating?: number;   
    reviewCount?: number; 
    galleryImages: string[];
}