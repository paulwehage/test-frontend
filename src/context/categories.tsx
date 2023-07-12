import { CategoriesService } from "../services/categories/categories.service"
import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext } from "react"
import { useAuthorization } from "./authorization"

type CategoriesType = {
    value: string
    label: string
}

type CategoriesContextType = {
    categories: CategoriesType[]
    loading: boolean
    setCurrentCategory: Dispatch<SetStateAction<string>>
    currentCategory: string
}

type Props = {
    children: ReactNode;
};

const categoriesDefaultValues: CategoriesContextType = {
    categories: [],
    loading: true,
    setCurrentCategory: () => {},
    currentCategory: ""
}

const CategoriesContext = createContext<CategoriesContextType>(categoriesDefaultValues);

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }: Props) => {
    const [categories, setCategories] = React.useState<CategoriesContextType>(categoriesDefaultValues);
    const [currentCategory, setCurrentCategory] = React.useState<string>("")
    const requestStarted = React.useRef(false);
    const { alreadyChecked } = useAuthorization()

    React.useEffect(() => {
        const shouldPreventRefetch = categories.categories.length || requestStarted.current;
        if (shouldPreventRefetch || !alreadyChecked) return
        const fetchCategories = async () => {
            requestStarted.current = true;
            const categories = await CategoriesService.get()
            setCategories({ categories, loading: false, setCurrentCategory, currentCategory: "wordpress" })
        }
        fetchCategories();
    }, [categories, currentCategory, alreadyChecked])

    React.useEffect(() => {
        setCategories((props) => ({ ...props, currentCategory }))
    }, [currentCategory])

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    )
}