import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { AiFillTag } from 'react-icons/ai';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { Switch, Route, useHistory } from 'react-router-dom';
import { ProductList } from '../../Product/ProductList';
import { ProductCreate } from '../../Product/ProductCreate';
import { ProductEdit } from '../../Product/ProductEdit';
import { Nav } from './Nav/Nav';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 12,
  },

  title: {
    flexGrow: 1,
  },

  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },

  list: {
    width: 250,
  },
}));

export const Layout = ({ children }: any) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  // const { id }: any = useParams();
  // const { data = {} }: any = useProduct(id || '');

  const navigate = (to: string, open: boolean) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
    history.push(to);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Nav onMenuButtonClick={() => setOpen(true)} />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className={clsx(classes.list)} role="presentation">
          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                SALES
              </ListSubheader>
            }
            style={{ width: '100%' }}
          >
            <ListItem
              button
              onClick={navigate('/products', false)}
              selected={true}
            >
              <ListItemIcon>
                <AiFillTag fontSize="1.5rem" />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
            <ListItem button onClick={navigate('/orders', false)}>
              <ListItemIcon>
                <RiShoppingCart2Fill fontSize="1.5rem" />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
};
