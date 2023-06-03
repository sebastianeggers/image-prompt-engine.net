import { Category } from "../types";
import { artStylesData } from "./artStylesData";
import { artTechniquesData } from "./artTechniquesData";
import { artistsData } from "./artistsData";
import { materialsData } from "./materialsData";
import { videoGamesData } from "./videoGamesData";

const sortCategoryStylesByTitle = (category: Category) => {
    category.styles.sort((a,b) => a.title.localeCompare(b.title))
};

sortCategoryStylesByTitle(artistsData);
sortCategoryStylesByTitle(artStylesData);
sortCategoryStylesByTitle(artTechniquesData);
sortCategoryStylesByTitle(materialsData);
sortCategoryStylesByTitle(videoGamesData);

export const styleData: Array<Category> = [
    artistsData,
    artStylesData,
    artTechniquesData,
    videoGamesData,
    materialsData,
];