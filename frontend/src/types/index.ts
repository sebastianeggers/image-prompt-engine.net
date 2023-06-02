export type Style = {
    title: string,
    thumbnail?: string,
    description?: string,
    prompts: Array<string>,
};

export type Category = {
    title: string,
    styles: Array<Style>,
};