import { Category } from "../types";
import { artStylesData } from "./artStylesData";
import { artTechniquesData } from "./artTechniquesData";
import { artistsData } from "./artistsData";

const sortCategoryStylesByTitle = (category: Category) => {
    category.styles.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
};

sortCategoryStylesByTitle(artistsData);
sortCategoryStylesByTitle(artStylesData);
sortCategoryStylesByTitle(artTechniquesData);

export const styleData: Array<Category> = [
    artistsData,
    artStylesData,
    artTechniquesData,
];