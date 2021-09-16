export class Recipe {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public servings: number,
    public prepTime: number,
    public cookTime: number,
  ) {}
}
