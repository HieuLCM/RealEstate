import {useEffect, useState} from 'react'
import {Flex, Select, Box, Text, Input, Spinner, Icon, Button} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import {MdCancel} from 'react-icons/md'
import Image from 'next/image'

import { filterData, getFilterValues } from '../utils/filterData'
import { baseUrl, fetchApi } from '../utils/fetchApi'
import noresult from '../assets/noresult.svg'

const SearchFilters = () => {
    const [filters] = useState(filterData)
    const [searchTerm, setSearchTerm] = useState('')
    const [showLocation, setShowLocation] = useState(false)
    const [locationData, setLocationData] = useState()
    const [loading, setLoading ] = useState(false)


    const router = useRouter()
    const path = router.pathname;
    const { query } = router

    const searchProperties = (filterValues) => {

        const values = getFilterValues({...query, ...filterValues})

        values.forEach((item) => {
            query[item.name] = item.value
        })

        router.push({pathname: path, query: query})
    }

    useEffect(() => {
        if (searchTerm !== '') {
            const fetchData = async () => {
                setLoading(true)
                const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`)
                setLoading(false)
                setLocationData(data?.hits)
            } 
            fetchData()
        }
    }, [searchTerm])

    return (
        <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
            {filters.map((filter)=> (
                <Box key={filter.queryName}>
                    <Select 
                        onChange={(e) => searchProperties({[filter.queryName]: e.target.value})} 
                        placeholder= {filter.placeholder}
                        w='fit-content'
                        p='2'
                    >
                        {filter?.items?.map(item => (
                            <option key={item.name} value={item.value}>{item.name}</option>
                        ))}
                    </Select>
                </Box>
            ))}
            <Flex flexDirection='column'>
                <Button onClick={() => setShowLocation(!showLocation)} marginTop='2' border='1px' borderColor='gray.200' w='auto'>
                    Search by Location
                </Button>
                {showLocation  && 
                    <Flex paddingTop='2' flexDirection='column' pos='relative'>
                        <Input
                            placeholder='Type Here'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            focusBorderColor='gray.300'
                            w='300px'
                        />
                        {searchTerm !== '' && 
                            <Icon 
                                as={MdCancel}
                                pos='absolute'
                                cursor='pointer'
                                right='8'
                                top='5'
                                zIndex='100'
                                onClick={() => setSearchTerm('')}
                            />
                        }
                        {loading && <Spinner margin='auto' marginTop='3' />}
                        {locationData && <Box maxHeight='300' overflow='auto' w='320px'>
                            {locationData?.map(location => (
                                <Box
                                    key={location.id}
                                    onClick={() => {
                                        searchProperties({locationExternalIDs: location.externalID});
                                        setShowLocation(false)
                                        setSearchTerm(location.name)
                                    }}    
                                >
                                    <Text cursor='pointer' bg='gray.200' p='2' borderBottom='1px' borderColor='gray.100' >
                                        {location.name}
                                    </Text>
                                    
                                </Box>
                            ))}
                            {!loading && !locationData?.length && (
                                <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5' >
                                    <Image src={noresult} width='200px' height='200px' />
                                    <Text fontSize='xl' marginTop='3'>
                                    Not Found
                                    </Text>
                                </Flex>
                            )}
                        </Box>}
                    </Flex>
                }
            </Flex>
        </Flex>
    )
}

export default SearchFilters