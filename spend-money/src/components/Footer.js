import { useSelector, useDispatch } from "react-redux";
import { updateCount } from "../redux/productsSlice";
import { Center, Box, Text, Link, Button } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

function Footer() {
  const data = useSelector((state) => state.products);

  const dispatch = useDispatch();

  return (
    <Box
      mt={5}
      bg="green.400"
      pos="sticky"
      bottom={0}
      zIndex={2}
      boxShadow="lg"
    >
      {data.money !== data.initialMoney && (
        <>
          <Center bg="none">
            <TableContainer m={2} w="100%" overflowY="auto" h={150}>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Products</Th>
                    <Th>Price</Th>
                    <Th></Th>
                    <Th>Count</Th>
                    <Th>Cost</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.items.map(
                    (product) =>
                      product.count > 0 && (
                        <Tr key={product.id}>
                          <Td w="30%">{product.productName}</Td>
                          <Td w="15%">{`$${new Intl.NumberFormat(
                            "en-US"
                          ).format(product.productPrice)}`}</Td>
                          <Td w="5%">
                            <Button
                              colorScheme="red"
                              size="xs"
                              mr={1}
                              onClick={() =>
                                dispatch(
                                  updateCount({
                                    id: product.id,
                                    count: product.count - 1,
                                  })
                                )
                              }
                            >
                              -
                            </Button>
                            <Button
                              colorScheme="teal"
                              size="xs"
                              onClick={() =>
                                dispatch(
                                  updateCount({
                                    id: product.id,
                                    count: product.count + 1,
                                  })
                                )
                              }
                            >
                              +
                            </Button>
                          </Td>
                          <Td w="15%">{`x${product.count}`}</Td>
                          <Td w="20%">{`$${new Intl.NumberFormat(
                            "en-US"
                          ).format(product.count * product.productPrice)}`}</Td>
                          <Td w="10%">
                            <Button
                              colorScheme="red"
                              size="xs"
                              onClick={() =>
                                dispatch(
                                  updateCount({ id: product.id, count: 0 })
                                )
                              }
                            >
                              Remove
                            </Button>
                          </Td>
                        </Tr>
                      )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
          <Center bg="none">
            <Text bg="none" mb={1} fontSize={20} fontWeight={500}>
              Total:{" "}
              {`$${new Intl.NumberFormat("en-US").format(
                data.initialMoney - data.money
              )}`}
            </Text>
          </Center>
        </>
      )}
      <Center bg="beige">
        <Text bg="none" fontSize={22} fontWeight={100}>
          Coded by{" "}
          <Link href="https://www.linkedin.com/in/onur-gunduz-4a9971268/">
            Onur Gunduz
          </Link>
        </Text>
      </Center>
    </Box>
  );
}

export default Footer;
