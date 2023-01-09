import { createContext, useState, ReactNode, useEffect } from 'react';

import {
  StorageCartProps,
  storageProductSave,
  storageProductRemove,
  storageProductGetAll,
} from '../storage/storageCart';

import { tagCartUpdate } from '../notifications/notificationsTags';

export type CartContextDataProps = {
  addProductCart: (newProduct: StorageCartProps) => Promise<void>;
  removeProductCart: (productId: string) => Promise<void>;
  cart: StorageCartProps[];
}

type CartContextProviderProps = {
  children: ReactNode;
}

export const CartContext = createContext<CartContextDataProps>({} as CartContextDataProps);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cart, setCart] = useState<StorageCartProps[]>([]);

  async function addProductCart(newProduct: StorageCartProps) {
    try {
      const storageResponse = await storageProductSave(newProduct);
      setCart(storageResponse);
      tagCartUpdate(storageResponse.length.toString());
    } catch (error) {
      throw error;
    }
  }

  async function removeProductCart(productId: string) {
    try {
      const response = await storageProductRemove(productId);
      setCart(response);
      tagCartUpdate(response.length.toString());
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    storageProductGetAll()
      .then(products => setCart(products))
      .catch(error => console.log(error));
  }, []);

  return (
    <CartContext.Provider value={{
      cart,
      addProductCart,
      removeProductCart,
    }}>
      {children}
    </CartContext.Provider>
  )
}