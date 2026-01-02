import React from 'react'
import SectionHeading from './sectionheading/SectionHeading'
import Card from '../card/Card'
import Jeans from '../../assets/image/jeans.webp'
import Shirts from '../../assets/image/shirt.jpeg'
import Tshirt from '../../assets/image/tshirt.webp'
import dresses from '../../assets/image/dresses.webp'
import Joggers from '../../assets/image/joggers.webp'
import Kurtis from '../../assets/image/kurtis.webp'
// import Carousel from 'react-multi-carousel/lib/Carousel' // Old import style // causing issues like Carousel is returning object but the browser expecting a component or string
import CarouselModule from 'react-multi-carousel'
import { responsive } from '../../utils/Sections.constants'

const Carousel = CarouselModule.default || CarouselModule // this handles the object returning of carousel module

const items = [{
    'title': 'Jeans',
    imagePath: Jeans
}, {
    'title': 'Shirts',
    imagePath: Shirts
}, {
    'title': 'T-Shirts',
    imagePath: Tshirt
}, {
    'title': 'Dresses',
    imagePath: dresses
}, {
    'title': 'Joggers',
    imagePath: Joggers
},
{
    'title': 'Kurtis',
    imagePath: Kurtis
}
]
const NewArrival = () => {
    console.log({
        Card,
        SectionHeading,
        Carousel
    })

    return (
        <>
            <SectionHeading title="New Arrivals" />
            {/* <Card /> */}
            {/* <Carousel
                responsive={responsive}
                autoPlay={false}
                swipeable={true}
                draggable={false}
                showDots={false}
                infinite={true}
                keyBoardControl={true}
                partialVisbile={true}
                >
                {items && items?.map((item, index) => <Card key={item?.title + index} title={item.title} imagePath={item.imagePath} />)}
            </Carousel> */}
            <Carousel
                responsive={responsive}
                autoPlay={false}
                swipeable={true}
                draggable={false}
                showDots={false}
                infinite={false}
                partialVisible={false}
                itemClass={'react-slider-custom-item'}
                className='px-8'
            >
                {items.map((item, index) => (
                    <Card
                        key={item.title + index}
                        title={item.title}
                        imagePath={item.imagePath}
                    />
                ))}
            </Carousel>

        </>
    )
}

export default NewArrival