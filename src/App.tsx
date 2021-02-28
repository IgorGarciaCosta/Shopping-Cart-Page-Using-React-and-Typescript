import { useState } from 'react'
import { useQuery } from 'react-query'

//Components
import Item from './Item/Item'
import Drawer from '@material-ui/core/Drawer'
import LinearProgress from '@material-ui/core/LinearProgress'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import AddShoppingIcons from '@material-ui/icons/AddShoppingCart'
import Badge from '@material-ui/core/Badge'

//Styles
import { Wrapper } from './App.styles'

//types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title:string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  //i use 2 awaits because of the json convertion
  await (await fetch('https://fakestoreapi.com/products')).json();


const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts);

  console.log(data);

  const getTotalItems = () => null;

  const handleAddToCart = (clickItem: CartItemType) => null;

  const handleRemoveToCart = () => null;

  if(isLoading) return<LinearProgress />;//progress bar at the top
  if(error) return <div>Something went wrong...</div>

  return (
    <Wrapper>
      <Grid container spacing={3}>
        {data?.map(item=>(
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart}/>

          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;