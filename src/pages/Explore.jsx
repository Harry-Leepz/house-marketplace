import { Link } from "react-router-dom";

import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

export const Explore = () => {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Explore</p>
      </header>
      <main>
        {/* Image Slider Goed Here */}
        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
            <img
              src={rentCategoryImage}
              alt='Inside of an apartment'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Places for Rent</p>
          </Link>
          <Link to='/category/sell'>
            <img
              src={sellCategoryImage}
              alt='Outside of a house'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Places for Sale</p>
          </Link>
        </div>
      </main>
    </div>
  );
};
