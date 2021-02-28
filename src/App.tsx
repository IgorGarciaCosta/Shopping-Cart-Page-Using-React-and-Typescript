import { useState } from 'react'
import { useQuery } from 'react-query'

//Components
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
  is: number;
  category: string;
  description: string;
  image: string;
  price: number;
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

  const handleAddToCart = () => null;

  const handleRemoveToCart = () => null;

  if(isLoading) return<LinearProgress />;//progress bar at the top
  if(error) return <div>Something went wrong...</div>

  return (
    <div className="App">
      Start
    </div>
  );
}

export default App;
//npm start