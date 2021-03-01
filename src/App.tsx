import { useState } from 'react'
import { useQuery } from 'react-query'

//Components
import Cart from './Cart/Cart'
import Item from './Item/Item'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

//Styles
import { Wrapper, StyledButton } from './App.styles'

//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  //i use 2 awaits because of the json convertion
  await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts);

  console.log(data);

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      //is the item already added in the cart?
      const isItemInCart = prev.find(item => item.id === clickedItem.id)

      //if existis, i search for this item in the list and increment the amount of it
      if (isItemInCart) {
        return prev.map(item => (
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ))
      }
      //first time item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveToCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((ack, item) => {
        if (item.id === id) {//if the id is that from the item i shall delete
          if (item.amount === 1) return ack;//if theres just one item, get it out from the list

          return [...ack, { ...item, amount: item.amount - 1 }]//if there are more than 1, return a new array with minus 1 of this item
        } else {
          return [...ack, item];//otherwise, return the item as it is
        }
      }, [] as CartItemType[])//the accumulator starts with an empty array and i specify with a CartItemType array
    ))
  };

  if (isLoading) return <LinearProgress />;//progress bar at the top
  if (error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveToCart} />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />

        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />

          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;