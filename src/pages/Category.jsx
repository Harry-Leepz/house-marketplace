import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { ListingItem } from "../components/ListingItem";

import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import { Loading } from "../components/Loading";

export const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // get refernce for firestore collection
        const listingsRef = collection(db, "listings");
        // create a query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        // execute query and create snapshot
        const querySnapshot = await getDocs(q);

        const listings = [];

        querySnapshot.forEach((document) => {
          return listings.push({
            id: document.id,
            data: document.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Ooops, Somethign went wrong, Could not fetch Listings!!!");
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div>
      <header>
        <p className='pageHeader'>
          {params.categoryName === "rent"
            ? "Places For Rent"
            : "Places For Sale"}
        </p>
      </header>

      {loading ? (
        <Loading />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem key={listing.id} data={listing.data} />
              ))}
            </ul>
          </main>
        </>
      ) : (
        <p>No Listings for {params.categoryName}</p>
      )}
    </div>
  );
};
