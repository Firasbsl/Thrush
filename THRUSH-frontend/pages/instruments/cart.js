import React, { useContext } from "react";
import NextLink from "next/link";
import Image from "next/image";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  Button,
  Card,
  List,
  ListItem,
} from "@material-ui/core";
import { CartContext } from "../../helpers/Context";
import { BaseLayout } from "../../components/common/layout";

import StripeCheckout from "react-stripe-checkout"

export default function CartScreen() {
  const { cartItems, setCartItems } = useContext(CartContext);

  const removeHandler = (instrumentToRemove) => {
    setCartItems(
      cartItems.filter((instrument)=> instrument !== instrumentToRemove)
    )
  }

  const tokenHandler = (token, adresses) => {
    console.log({token,adresses});
  }

  return (
    <>
      <Typography component="h1" variant="h1" color="primary">
        Shopping Cart
      </Typography>
      <div>
        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/instruments/${item._id}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell>
                        <NextLink href={`/instruments/${item._id}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="secondary" onClick={() => removeHandler(item)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal : ${cartItems.reduce((a, c) => a + c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                <StripeCheckout
                  stripeKey="pk_test_51KqryfIKRXQIRRtH9lGiIHoGrG46CfMywPEaJYb43tD9F5DHeRKOo119SCV4t8SszETeubWVNjJQypJ4Jrei6di100XIOsNQeB"
                  token={tokenHandler}
                  billingAddress
                  shippingAddress
                  amount={(cartItems.reduce((a, c) => a + c.price, 0))*100}
                  />
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

CartScreen.Layout = BaseLayout;
