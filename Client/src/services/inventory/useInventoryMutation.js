import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  addProduct,
  updateProduct,
  deleteProduct,
  updateStock,
} from "./inventory.api";

import { inventoryKeys } from "./inventory.key";

// ADD PRODUCT
export const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.all,
      });
    },
  });
};

// UPDATE PRODUCT
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.all,
      });
    },
  });
};

// DELETE PRODUCT
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.all,
      });
    },
  });
};

// UPDATE STOCK
export const useUpdateStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStock,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryKeys.all,
      });
    },
  });
};