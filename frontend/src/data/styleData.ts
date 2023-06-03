import { Category } from "../types";
import { artStylesData } from "./artStylesData";
import { artTechniquesData } from "./artTechniquesData";
import { artistsData } from "./artistsData";
import { videoGamesData } from "./videoGamesData";

const sortCategoryStylesByTitle = (category: Category) => {
    // category.styles.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
    category.styles.sort((a,b) => a.title.localeCompare(b.title))
};

sortCategoryStylesByTitle(artistsData);
sortCategoryStylesByTitle(artStylesData);
sortCategoryStylesByTitle(artTechniquesData);
sortCategoryStylesByTitle(videoGamesData);

export const styleData: Array<Category> = [
    artistsData,
    artStylesData,
    artTechniquesData,
    videoGamesData,
];