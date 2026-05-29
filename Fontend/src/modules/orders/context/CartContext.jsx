import { createContext , useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children}) => {
    const [cartItems , setCartItems] = useState([]);

    const addToCart = (product) => {
        const existing = cartItems.find(
            (item) => item.Product_id === product.Product_id
        );

        if (existing) {
            const updated = cartItems.map((item) => {
                if (item.Product_id === product.Product_id){
                    return {
                        ...item,
                        qty: item.qty + 1 
                    };
                }
                return item;
            });

            setCartItems(updated);

            return;
        }
        setCartItems([
            ...cartItems,
            {
                ...product,
                qty:1
            }
        ]);
    };

    const removeFromCart = (Product_id) => {
        setCartItems(
            cartItems.filter(
                (item)  => item.Product_id != Product_id
            )
        );
    };

    const increaseQty = (Product_id) => {
        setCartItems(
            cartItems.map((item) =>{
                if (item.Product_id === Product_id){
                    return {
                        ...item,
                        qty: item.qty + 1
                    };
                }
                return item;
            })
        );
    };

    const decreaseQty = (Product_id) => {
        setCartItems(
            cartItems.map((item) => {
                if(item.Product_id === Product_id && item.qty > 1){
                    return {
                        ...item,
                        qty: item.qty - 1
                    };
                }
                return item;
            })
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const total = cartItems.reduceRight((sum , item) => {
        return sum + (
            item.Product_price * item.qty
        );
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQty,
                decreaseQty,
                clearCart,
                total
            }}
        >
            {children}
        </CartContext.Provider>
    )
}