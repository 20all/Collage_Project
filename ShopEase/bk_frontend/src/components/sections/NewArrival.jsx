import React from 'react'
import SectionHeading from './sectionheading/SectionHeading'
import Card from '../card/Card'
import Jeans from '../../assets/image/jeans.webp'
import Shirts from '../../assets/image/shirt.jpeg'
import Tshirt from '../../assets/image/tshirt.webp'
import dresses from '../../assets/image/dresses.webp'


const items = [{
    'title':'Jeans',
    imagePath:Jeans
},{
    'title':'Shirts',
    imagePath:Shirts
},{
    'title':'T-Shirts',
    imagePath:Tshirt
},{
    'title':'Dresses',
    imagePath:dresses
}]
const NewArrival = () => {
  return (
    <>
    <SectionHeading title="New Arrivals"/>
    {/* <Card /> */}
    <div className='flex flex-wrap px-5'>
        {items && items.map((item, index)=> <Card key={item?.title + index} imagePath={item.imagePath} title={item.title}/>)}
    </div>
    </>
  )
}

export default NewArrival