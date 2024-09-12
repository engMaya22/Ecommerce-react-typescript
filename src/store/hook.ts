import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '.'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()//var holds all actions I have get categories, get products ..
export const useAppSelector = useSelector.withTypes<RootState>()//var holds all states I have categories, products ..