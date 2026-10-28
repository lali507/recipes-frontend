export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type KosherType = "MEAT" | "DAIRY" | "PAREVE";

export interface RecipeInput {
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes: number;
  difficulty: Difficulty;
  servings: number;
  kosherType: KosherType;
  isPublic?: boolean;
  categoryId: number;
}

export interface IdName {
  id: number;
  name: string;
}

export interface Recipe extends Omit<RecipeInput, "categoryId"> {
  id: number;
  imageUrl: string | null;
  category: IdName;
  author: IdName;
  isFavorite: boolean;
  isOwner: boolean;
  canEdit: boolean;
  canDelete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Author extends IdName {
  recipeCount: number;
}

export interface FavoriteRecipe extends Recipe {
  favoritedAt: string;
}

export type RecipeSort = "newest" | "oldest" | "prepTime" | "title";

export interface RecipeFilters {
  search?: string;
  categoryId?: number;
  authorId?: number;
  difficulty?: Difficulty;
  kosherType?: KosherType;
  maxPrepTime?: number;
  sort?: RecipeSort;
  page?: number;
  limit?: number;
}


