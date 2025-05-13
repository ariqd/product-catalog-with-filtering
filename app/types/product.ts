export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage?: number;
    rating: number;
    stock: number;
    brand: string;
    thumbnail: string;
    images: string[];
    reviews: object[];
    sku: string[];
    weight: number;
    dimensions: object;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    returnPolicy: string;
    minimumOrderQuantity: number;
}