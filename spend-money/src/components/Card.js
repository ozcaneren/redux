import { useEffect, useState } from "react";
import { Box, Button, Image, Input, Text, Center } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { updateCount } from "../redux/productsSlice";

function Card(product) {
  const [count, setCount] = useState(parseInt(product.item.count));
  const [isSellable, setIsSellable] = useState(true);
  const [isBuyable, setIsBuyable] = useState(false);
  const money = useSelector((state) => state.products.money);

  const dispatch = useDispatch();

  useEffect(() => {
    count > 0 ? setIsSellable(false) : setIsSellable(true);
    dispatch(updateCount({ id: product.item.id, count }));
  }, [count, product.item.id, dispatch]);

  useEffect(() => {
    product.item.productPrice > money
      ? setIsBuyable(true)
      : setIsBuyable(false);
  }, [money, product.item.productPrice]);

  useEffect(() => {
    setCount(product.item.count);
  }, [product]);

  const handleInputChange = (value) => {
    const max = Math.floor(money / product.item.productPrice) + count;
    if (value && value > 0) {
      if (value > max && money >= 0) {
        setCount(max);
      } else {
        setCount(value);
      }
    } else {
      setCount(0);
    }
  };

  return (
    <Box p={4} bg="white" boxShadow="xl">
      <Center bg="none" h={250}>
        <Image src={product.item.image} m="auto" />
      </Center>
      <Center bg="none">
        <Text bg="none" fontSize={25} fontWeight={500}>
          {product.item.productName}
        </Text>
      </Center>
      <Center bg="none">
        <Text bg="none" color="green">
          {`$${new Intl.NumberFormat("en-US").format(
            product.item.productPrice
          )}`}
        </Text>
      </Center>
      <Center mt={5} bg="none">
        <Button
          colorScheme="red"
          mr={3}
          w="30%"
          onClick={() => setCount(count - 1)}
          isDisabled={isSellable}
        >
          Sell
        </Button>
        <Input
          type="number"
          textAlign="center"
          w="30%"
          value={count}
          onChange={(e) => handleInputChange(parseInt(e.target.value))}
        />
        <Button
          colorScheme="teal"
          ml={3}
          w="30%"
          onClick={() => setCount(count + 1)}
          isDisabled={isBuyable}
        >
          Buy
        </Button>
      </Center>
    </Box>
  );
}

export default Card;
