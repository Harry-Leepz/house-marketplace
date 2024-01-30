import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export const CreateListing = () => {
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      // check the current authentication state
      onAuthStateChanged(auth, (user) => {
        // if a user is authenticated, update formdata with the user id from firebase auth
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/sign-in");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const onMutateHandler = () => {};

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Create A Listing</p>
      </header>

      <main>
        <form onSubmit={onSubmitHandler}>
          {/* Sell / Rent */}
          <label className='formLabel'>Sell / Rent</label>
          <div className='formButtons'>
            <button
              type='button'
              className={type === "sale" ? "formButtonActive" : "formButton"}
              value='sale'
              id='type'
              onClick={onMutateHandler}
            >
              Sell
            </button>
            <button
              type='button'
              className={type === "rent" ? "formButtonActive" : "formButton"}
              value='rent'
              id='type'
              onClick={onMutateHandler}
            >
              Rent
            </button>
          </div>

          {/* Name */}
          <label className='formLabel'>Name</label>
          <input
            className='formInputName'
            type='text'
            id='name'
            value={name}
            onChange={onMutateHandler}
            maxLength='32'
            minLength='10'
            required
          />

          {/* Bedrooms and Bathrooms */}
          <div className='formRooms flex'>
            <div>
              <label className='formLabel'>Bedrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bedrooms'
                value={bedrooms}
                onChange={onMutateHandler}
                min='1'
                max='50'
                required
              />
            </div>
            <div>
              <label className='formLabel'>Bathrooms</label>
              <input
                className='formInputSmall'
                type='number'
                id='bathrooms'
                value={bathrooms}
                onChange={onMutateHandler}
                min='1'
                max='50'
                required
              />
            </div>
          </div>

          {/* Parking  */}
          <label className='formLabel'>Parking spot</label>
          <div className='formButtons'>
            <button
              className={parking ? "formButtonActive" : "formButton"}
              type='button'
              id='parking'
              value={true}
              onClick={onMutateHandler}
              min='1'
              max='50'
            >
              Yes
            </button>
            <button
              className={
                !parking && parking !== null ? "formButtonActive" : "formButton"
              }
              type='button'
              id='parking'
              value={false}
              onClick={onMutateHandler}
            >
              No
            </button>
          </div>

          {/* Furnished */}
          <label className='formLabel'>Furnished</label>
          <div className='formButtons'>
            <button
              className={furnished ? "formButtonActive" : "formButton"}
              type='button'
              id='furnished'
              value={true}
              onClick={onMutateHandler}
            >
              Yes
            </button>
            <button
              className={
                !furnished && furnished !== null
                  ? "formButtonActive"
                  : "formButton"
              }
              type='button'
              id='furnished'
              value={false}
              onClick={onMutateHandler}
            >
              No
            </button>
          </div>

          {/* Address */}
          <label className='formLabel'>Address</label>
          <textarea
            className='formInputAddress'
            type='text'
            id='address'
            value={address}
            onChange={onMutateHandler}
            required
          />

          {!geolocationEnabled && (
            <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={onMutateHandler}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Longitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={onMutateHandler}
                  required
                />
              </div>
            </div>
          )}

          {/* Offer */}
          <label className='formLabel'>Offer</label>
          <div className='formButtons'>
            <button
              className={offer ? "formButtonActive" : "formButton"}
              type='button'
              id='offer'
              value={true}
              onClick={onMutateHandler}
            >
              Yes
            </button>
            <button
              className={
                !offer && offer !== null ? "formButtonActive" : "formButton"
              }
              type='button'
              id='offer'
              value={false}
              onClick={onMutateHandler}
            >
              No
            </button>
          </div>

          {/* Pricing */}
          <label className='formLabel'>Regular Price</label>
          <div className='formPriceDiv'>
            <input
              className='formInputSmall'
              type='number'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutateHandler}
              min='50'
              max='750000000'
              required
            />
            {type === "rent" && <p className='formPriceText'>$ / Month</p>}
          </div>

          {offer && (
            <>
              <label className='formLabel'>Discounted Price</label>
              <input
                className='formInputSmall'
                type='number'
                id='discountedPrice'
                value={discountedPrice}
                onChange={onMutateHandler}
                min='50'
                max='750000000'
                required={offer}
              />
            </>
          )}

          {/* Image Upload */}
          <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutateHandler}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};
