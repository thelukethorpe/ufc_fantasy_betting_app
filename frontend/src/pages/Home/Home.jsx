import React from 'react'
import { makeStyles, Paper, Typography } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import CarouselImage1 from './carousel_1.png'
import CarouselImage2 from './carousel_2.png'
import CarouselImage3 from './carousel_3.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  carousel: {
    width: '80%',
    margin: 'auto',
    paddingTop: theme.spacing(10)
  },
  carouselItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: '50% 25%',
    backgroundSize: 'cover',
    height: '50vh'
  }
}))

const Home = () => {
  const classes = useStyles()
  const carouselItems = [
    {
      name: 'UFC Fantasy Betting',
      description: 'Coming soon',
      image: `url(${CarouselImage1})`
    },
    {
      name: 'Bet on real UFC events with virtual money',
      description: 'Betting odds updated hourly',
      image: `url(${CarouselImage2})`
    },
    {
      name: 'Start with $1500',
      description: '',
      image: `url(${CarouselImage3})`
    }
  ]

  return (
    <div>
      <Carousel className={classes.carousel}>
        {
          carouselItems.map((item, i) => <CarouselItem key={i} item={item}
                                                       className={classes.carouselItem}/>)
        }
      </Carousel>
    </div>
  )
}

const CarouselItem = (props) => {
  return (
    <Paper className={props.className} maxWidth="1920px"
           style={{ backgroundImage: props.item.image }}>
      <Typography variant="h1" align="center"
                  color="secondary">{props.item.name}</Typography>
      <br/>
      <Typography variant="h4" align="center"
                  color="secondary">{props.item.description}</Typography>
    </Paper>
  )
}

export default Home
