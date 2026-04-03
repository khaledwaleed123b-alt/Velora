
import { useState } from 'react'
import ProductsList from '../components/ProductsList';
import Filters from '../components/Filters';


const AllProducts = () => {

const [selectedCategory, setSelectedCategory] = useState("");
const [sortOption, setSortOption] = useState("");
const [searchQuery, setSearchQuery] = useState("");


  return (
    <div>


<Filters
  selectedCategory={selectedCategory}
  onSelectCategory={setSelectedCategory}
  sortOption={sortOption}
  setSortOption={setSortOption}
  searchQuery={searchQuery}
  setSearchQuery={setSearchQuery}
/>

<ProductsList
  selectedCategory={selectedCategory}
  sortOption={sortOption}
  searchQuery={searchQuery}
/>



    </div>
  )
}

export default AllProducts