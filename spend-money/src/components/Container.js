import {useSelector} from 'react-redux'
import { SimpleGrid,Flex, } from '@chakra-ui/react'
import Card from "./Card"


function Container() {
    const data =useSelector((state)=> state.products);

    return (
        <Flex justifyContent="center" mt={5}>
            <SimpleGrid columns={[1, [null], 2, [null], 3]} spacing={3} px={2}>
                    {data.items.map((product) => (
                <Card key={product.id} item={product}></Card>
                ))}

            </SimpleGrid>
        </Flex>
  )
}

export default Container
