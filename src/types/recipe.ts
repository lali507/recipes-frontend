export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type KosherType = "MEAT" | "DAIRY" | "PAREVE";

// מה ששולחים ביצירה ובעדכון
export interface RecipeInput {
  title: string;           // 2–100 תווים
  description: string;     // 5–500 תווים
  ingredients: string;     // עד 5,000 תווים, שורה לכל רכיב
  instructions: string;    // עד 10,000 תווים
  prepTimeMinutes: number; // מספר שלם 1–1440
  difficulty: Difficulty;  // "EASY" | "MEDIUM" | "HARD"
  servings: number;        // מספר שלם 1–100
  kosherType: KosherType;  // "MEAT" | "DAIRY" | "PAREVE"
  isPublic?: boolean;       // ביצירה לא חובה (ברירת מחדל false), בעדכון חובה
  categoryId: number;      // מזהה מ-GET /categories
}

export interface IdName {
  id: number;
  name: string;
}

// מה שחוזר מהשרת – אותם שדות כמו בשליחה, אבל category במקום categoryId
export interface Recipe extends Omit<RecipeInput, "categoryId"> {
  id: number;
  imageUrl: string | null; // null אם אין תמונה
  category: IdName;
  author: IdName;          // בלי אימייל
  isFavorite: boolean;
  isOwner: boolean;
  canEdit: boolean;        // להציג כפתור "עריכה" רק אם true
  canDelete: boolean;      // להציג כפתור "מחיקה" רק אם true
  createdAt: string;       // תאריך ISO
  updatedAt: string;       // תאריך ISO
}

export interface FavoriteRecipe extends Recipe {
  favoritedAt: string;     // תאריך ISO
}

export type RecipeSort = "newest" | "oldest" | "prepTime" | "title";

// פרמטרים ל-GET /recipes – כולם לא חובה
export interface RecipeFilters {
  search?: string;         // חיפוש בשם, בתיאור וברכיבים
  categoryId?: number;
  difficulty?: Difficulty;
  kosherType?: KosherType;
  maxPrepTime?: number;    // עד X דקות
  sort?: RecipeSort;       // ברירת מחדל newest
  page?: number;           // ברירת מחדל 1
  limit?: number;          // ברירת מחדל 12, מקסימום 50
}


