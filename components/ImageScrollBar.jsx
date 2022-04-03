import {useContext} from 'react'
import Image from 'next/image'
import {Box, Icon, Flex} from '@chakra-ui/react'
import {ScrollMenu, VisibilityContext} from 'react-horizontal-scrolling-menu'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'

const LeftArrow = () => {
    const {scrollPrev} = useContext(VisibilityContext)
    return (
        <Flex justifyContent='center' alignItems='center' marginRight='1'>
            <Icon 
                as={FaArrowAltCircleLeft}
                onClick={() => scrollPrev()}
                fontSize='20'
                cursor='pointer'
            />
        </Flex>
    )
}

const RightArrow = () => {
    const {scrollNext} = useContext(VisibilityContext)
    return (
        <Flex justifyContent='center' alignItems='center' marginRight='1'>
            <Icon 
                as={FaArrowAltCircleRight}
                onClick={() => scrollNext()}
                fontSize='20'
                cursor='pointer'
            />
        </Flex>
    )
}

const ImageScrollBar = ({data}) => (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overflow: 'hidden'}}>
        {data.map(image => (
            <Box key={image.id} width='920px' itemId={image.id} overflow='hidden' p='1'>
                <Image 
                    placeholder='blur' 
                    blurDataURL={image.url} 
                    src={image.url} 
                    width={1000} height={500} 
                    alt='photos'
                    sizes='(max-width: 500px) 100px, (max-width: 1024px) 400px, 1000px'
                />
            </Box>
        ))}
    </ScrollMenu>
)

export default ImageScrollBar