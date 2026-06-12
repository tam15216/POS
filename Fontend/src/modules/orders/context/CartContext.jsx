import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const isSameOptions = (opt1 = [], opt2 = []) => {
        if (opt1.length !== opt2.length) return false;
        const ids1 = opt1.map(o => o.Option_id).sort();
        const ids2 = opt2.map(o => o.Option_id).sort();
        return ids1.every((id, index) => id === ids2[index]);
    };

    const addToCart = (product, selectedOptions = []) => {
        const existing = cartItems.find(
            (item) =>
                item.Product_id === product.Product_id &&
                isSameOptions(item.selected_options, selectedOptions)
        );

        if (existing) {
            const updated = cartItems.map((item) => {
                if (
                    item.Product_id === product.Product_id &&
                    isSameOptions(item.selected_options, selectedOptions)
                ) {
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

        const optionsTotalPrice = selectedOptions.reduce((sum, opt) => sum + Number(opt.Price || 0), 0);
        const basePrice = Number(product.Product_price || 0);

        setCartItems([
            ...cartItems,
            {
                ...product,
                Base_price: basePrice, 
                Display_price: basePrice + optionsTotalPrice, 
                qty: 1,
                selected_options: selectedOptions
            }
        ]);
    };
    const removeFromCart = (Product_id, selectedOptions = []) => {
        setCartItems(
            cartItems.filter(
                (item) =>
                    !(item.Product_id === Product_id && isSameOptions(item.selected_options, selectedOptions))
            )
        );
    };

    const increaseQty = (Product_id, selectedOptions = []) => {
        setCartItems(
            cartItems.map((item) => {
                if (
                    item.Product_id === Product_id &&
                    isSameOptions(item.selected_options, selectedOptions)
                ) {
                    return {
                        ...item,
                        qty: item.qty + 1
                    };
                }
                return item;
            })
        );
    };

    const decreaseQty = (Product_id, selectedOptions = []) => {
        setCartItems(
            cartItems.map((item) => {
                if (
                    item.Product_id === Product_id &&
                    isSameOptions(item.selected_options, selectedOptions) &&
                    item.qty > 1
                ) {
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

    const total = cartItems.reduce((sum, item) => {
        return sum + (item.Display_price * item.qty);
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
    );
};