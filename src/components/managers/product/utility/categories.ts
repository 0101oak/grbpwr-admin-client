import { common_Category } from "api/proto-http/admin";

interface ProcessedCategory {
    id: number;
    name: string;
    subCategories: {
        id: number;
        name: string;
        types: {
            id: number;
            name: string;
        }[];
    }[];
}

export const processCategories = (categories: common_Category[]): ProcessedCategory[] => {
    const topCategories = categories.filter(cat => cat.level === 'top_category');

    return topCategories.map(topCat => {
        const subCategories = categories.filter(cat =>
            cat.level === 'sub_category' && cat.parentId === topCat.id!
        );

        if (subCategories.length === 0) {
            const directTypes = categories.filter(cat =>
                cat.level === 'type' && cat.parentId === topCat.id!
            );

            return {
                id: topCat.id!,
                name: topCat.name!,
                subCategories: [{
                    id: topCat.id!,
                    name: topCat.name!,
                    types: directTypes.map(type => ({
                        id: type.id!,
                        name: type.name!
                    }))
                }]
            };
        }

        const processedSubCategories = subCategories.map(subCat => {
            const types = categories.filter(cat =>
                cat.level === 'type' && cat.parentId === subCat.id!
            );

            return {
                id: subCat.id!,
                name: subCat.name!,
                types: types.map(type => ({
                    id: type.id!,
                    name: type.name!
                }))
            };
        });

        return {
            id: topCat.id!,
            name: topCat.name!,
            subCategories: processedSubCategories
        };
    });
};