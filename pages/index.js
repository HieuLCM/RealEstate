import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button} from '@chakra-ui/react'
import { baseUrl, fetchApi } from '../utils/fetchApi'

import Property from '../components/Property'

const Banner = ({purpose, imageUrl, title1, title2, linkName, desc1, desc2, buttonText}) => (
  <Flex flexWrap='wrap' justifyContent="center" alignItems='center' m='10' marginTop='6'>
    <Image src={imageUrl} width={500} height={300} alt='banner' />
    <Box p={5}>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='30' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text color='gray.700' paddingTop={3} paddingBottom={3} fontSize='lg'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home({propertyForSale, propertyForRent}) {

  return (
    <Box>
      <Banner 
        purpose='RENT A HOME'
        title1='Retal Homes for'
        title2='Everyone'
        desc1='Explore apartments, villas, homes...'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />

      <Flex flexWrap='wrap'>
        {propertyForRent.map(property => <Property key={property.id} property = {property}/>)}
      </Flex>

      <Banner 
        purpose='BUY A HOME'
        title1='Find, Buy & Own Your'
        title2='Dream Home'
        desc1='Explore appartments, villas, homes...'
        desc2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
      />

      <Flex flexWrap='wrap'>
        {propertyForSale.map(property => <Property key={property.id} property = {property}/>)}
      </Flex>

    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`)
  return {
    props: {
      propertyForSale : propertyForSale?.hits,
      propertyForRent : propertyForRent.hits
    }
  }
}