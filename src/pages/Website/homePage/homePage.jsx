import Categories from "../categories/categories";
import CategoriesLinks from "./categoriesLinks";
import LandingPage from "./landingPage";
import LatestProduct from "./product/latestProduct";
import LatestRated from "./product/latestRated";
import TopRated from "./product/topRated";

// show the Home Pages
export default function HomePage() {
    return (
        <div className="bg-gray-100">
        <LandingPage/>
        <CategoriesLinks/>
        <LatestProduct/>
        <div className="flex flex-wrap justify-center">
            <TopRated/>
            <LatestRated/>
        </div>
        </div>
    )
}