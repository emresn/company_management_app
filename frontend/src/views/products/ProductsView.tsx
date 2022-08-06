import React, { useState } from 'react'
import ProductComp from '../../components/ProductComp'
import { ProductDummy, ProductDummy2 } from '../../data/productDummy'
import { Product } from '../../models/productModel'

type Props = {}

const ProductsView = (props: Props) => {
  const ProductList:Product[] = [ProductDummy, ProductDummy2, ProductDummy,ProductDummy2,ProductDummy,ProductDummy2,ProductDummy,ProductDummy2]

  const [selected, setSelected] = useState<number>();


  return (
    <div className='flex flex-col mx-4'>
      <h4>Products</h4>
      <hr className='border border-b border-gray-700 my-4 ' />
      <div className='grid grid-cols-5 gap-4'>
        {ProductList.map((e,idx)=> <ProductComp key={`${e.id}-${idx}`} idx={idx} product={e} selected={selected} setSelected={setSelected} /> )}
      </div>
    </div>
  )
}

export default ProductsView