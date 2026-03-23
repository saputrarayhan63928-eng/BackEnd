export declare const getAllCategories: () => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}[]>;
export declare const createCategory: (name: string) => Promise<{
    name: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=category.service.d.ts.map