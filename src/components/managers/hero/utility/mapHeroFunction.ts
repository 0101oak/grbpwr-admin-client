import { common_HeroFullInsert, common_HeroType } from 'api/proto-http/admin';
import { common_HeroFull } from 'api/proto-http/frontend';


export const heroTypes: { value: common_HeroType; label: string }[] = [
    { value: 'HERO_TYPE_MAIN', label: 'main add' },
    { value: 'HERO_TYPE_SINGLE', label: 'single add' },
    { value: 'HERO_TYPE_DOUBLE', label: 'double add' },
    { value: 'HERO_TYPE_FEATURED_PRODUCTS', label: 'featured products' },
    { value: 'HERO_TYPE_FEATURED_PRODUCTS_TAG', label: 'featured products tag' }
]

export const mapHeroFunction = (hero?: common_HeroFull | undefined): common_HeroFullInsert => {
    return {
        entities: hero?.entities?.map((entity) => ({
            type: entity.type,
            main: {
                single: {
                    headline: entity.main?.single?.headline,
                    mediaId: entity.main?.single?.media?.id,
                    exploreLink: entity.main?.single?.exploreLink,
                    exploreText: entity.main?.single?.exploreText,
                },
                tag: entity.main?.tag,
                description: entity.main?.description,
            },
            single: {
                headline: entity.single?.headline,
                mediaId: entity.single?.media?.id,
                exploreLink: entity.single?.exploreLink,
                exploreText: entity.single?.exploreText,
            },
            double: {
                left: {
                    headline: entity.double?.left?.headline,
                    mediaId: entity.double?.left?.media?.id,
                    exploreLink: entity.double?.left?.exploreLink,
                    exploreText: entity.double?.left?.exploreText,
                },
                right: {
                    headline: entity.double?.right?.headline,
                    mediaId: entity.double?.right?.media?.id,
                    exploreLink: entity.double?.right?.exploreLink,
                    exploreText: entity.double?.right?.exploreText,
                },
            },
            featuredProducts: {
                productIds:
                    entity.featuredProducts?.products
                        ?.map((product) => product.id)
                        .filter((id): id is number => id !== undefined) || [],
                headline: entity.featuredProducts?.headline,
                exploreLink: entity.featuredProducts?.exploreLink,
                exploreText: entity.featuredProducts?.exploreText,
            },
            featuredProductsTag: {
                tag: entity.featuredProductsTag?.tag,
                headline: entity.featuredProductsTag?.products?.headline,
                exploreLink: entity.featuredProductsTag?.products?.exploreLink,
                exploreText: entity.featuredProductsTag?.products?.exploreText,
            }
        })),
    };
};

export const emptyHeroForm: common_HeroFullInsert = {
    entities: [
        {
            type: 'HERO_TYPE_UNKNOWN' as common_HeroType,
            main: {
                single: {
                    mediaId: 0,
                    headline: '',
                    exploreLink: '',
                    exploreText: ''
                },
                tag: '',
                description: ''
            },
            single: {
                headline: '',
                mediaId: 0,
                exploreLink: '',
                exploreText: ''
            },
            double: {
                left: {
                    headline: '',
                    mediaId: 0,
                    exploreLink: '',
                    exploreText: ''
                },
                right: {
                    headline: '',
                    mediaId: 0,
                    exploreLink: '',
                    exploreText: ''
                }
            },
            featuredProducts: {
                productIds: [],
                headline: '',
                exploreLink: '',
                exploreText: ''
            },
            featuredProductsTag: {
                tag: '',
                headline: '',
                exploreLink: '',
                exploreText: ''
            }
        }
    ]
}


