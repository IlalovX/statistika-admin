// src/context/CategoriesContext.tsx
import { createContext, useContext } from 'react'
import type { Category } from '../hooks/useRoleCategoriesList'

export const CategoriesContext = createContext<Category[]>([])
export const useCategories = () => useContext(CategoriesContext)
