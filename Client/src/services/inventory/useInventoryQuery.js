import { useQuery } from "@tanstack/react-query";

import { getProducts } from "./inventory.api";

import { inventoryKeys } from "./inventory.key";

// GET ALL PRODUCTS
export const useProducts = () => {
  return useQuery({
    queryKey: inventoryKeys.all,

    queryFn: getProducts,
  });
};