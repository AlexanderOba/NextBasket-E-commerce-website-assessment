import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/Cart';
import { TiDelete } from "react-icons/ti";

interface ProductItem {
    id: number | string;
    thumbnail: string;
    title: string;
    quantity: number;
    price: number;
}

const Cart: React.FC = () => {
    const [counts, setCounts] = useState<{ [itemId: string]: number }>({});
    const product = useSelector((state: any) => state.cartList);

    const dispatch = useDispatch();

    const increment = (price: number, itemId: string | number, quantity: number) => {
        const currentCount = counts[itemId] || quantity || 0;
        const newCount = { ...counts, [itemId]: currentCount + 1 };
        setCounts(newCount);

        dispatch(cartActions.updateQuantityAndSubtotal({
            id: itemId,
            quantity: newCount[itemId],
            subtotal: newCount[itemId] * price,
        }));
    };

    const decrement = (price: number, itemId: string | number, quantity: number) => {
        const currentCount = counts[itemId] || quantity || 0;
        if (currentCount > 0) {
            const newCount = { ...counts, [itemId]: currentCount - 1 };
            setCounts(newCount);

            dispatch(cartActions.updateQuantityAndSubtotal({
                id: itemId,
                quantity: newCount[itemId],
                subtotal: newCount[itemId] * price,
            }));
        }
    };

    const handleDelete = (id: number | string) => {
        dispatch(cartActions.deleteFromCart(id));
    };

    const totalAmount = product?.itemsList?.reduce((acc: number, data: ProductItem) => {
        return acc + data?.quantity * data?.price;
    }, 0);

    return (
        <div>
            <p className='text-[#252B42] text-md mb-7 font-semibold border-b border-gray-300 pb-3'>Shopping Cart</p>
            {product?.itemsList?.map((data: ProductItem) => (
                <div key={data?.id} className='mb-7'>
                    <div className='flex mb-5 items-start justify-between'>
                        <div className="w-[35%] mr-3 h-[141px]">
                            <Image src={data?.thumbnail} alt="furiniture 1" width={359} height={359} className="w-full h-full" />
                        </div>
                        <div className='w-[45%] text-[#737373]'>
                            <p className='text-[#252B42] text-[17px] font-normal mb-3'>{data?.title}</p>
                            <div className=" mb-7">
                                <span onClick={() => decrement(data.price, data.id, data?.quantity)} className="inline-block border border-gray-300 rounded-md px-3 py-2 cursor-pointer mr-4">-</span>
                                <span>{counts[data.id] || data?.quantity}</span>
                                <span onClick={() => increment(data.price, data.id, data?.quantity)} className="inline-block border border-gray-300 rounded-md px-3 py-2 cursor-pointer ml-4">+</span>
                            </div>
                        </div>
                        <div>
                            <TiDelete onClick={() => handleDelete(data.id)} className='text-[#252B42] text-[27px] cursor-pointer' />
                        </div>
                    </div>
                    <div className='border-gray-300 text-[17px] font-semibold border-b pb-3 text-[#737373] flex justify-end'>
                        Subtotal({counts[data.id] || data?.quantity}) : <span className='text-[#252B42]'>${(counts[data.id] || data?.quantity) * data?.price}</span>
                    </div>
                </div>
            ))}
            <div className='font-semibold pt-6 text-[#737373] flex justify-end'>
                Total Amount: <span className=''>${totalAmount}</span>
            </div>
        </div>
    );
};

export default Cart;