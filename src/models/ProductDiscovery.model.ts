export interface ProductDiscovery {
    amazonId: string;
    url: string;
    name: string;
    price: number;
    variants?: ProductDiscovery[];
}