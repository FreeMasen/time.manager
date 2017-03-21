import { Category } from './category';
export class Client {
    _id: string;
    name: string;
    categories: Category[];
    isQuickClient: boolean;
}