import React from 'react'
import { Product } from '../models/productModel'

type Props = {
    product:Product
}

const ProductComp = ({product}: Props) => {
  return (
    <div className='flex flex-col'>
        <span>{product.name}</span>
    </div>
  )
}

export default ProductComp