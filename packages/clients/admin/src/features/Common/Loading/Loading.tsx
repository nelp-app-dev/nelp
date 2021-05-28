import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import './loading.css';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: '100px',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: 'all 0.3s ease',
    zIndex: 1,
    opacity: 0,
    visibility: 'hidden',
  },
  overlay: {
    backgroundColor: 'rgb(255, 255, 255)',
    opacity: '0.7',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  show: {
    opacity: 1,
    visibility: 'visible',
  },
}));

export const Loading = ({ loading }: any) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, loading && classes.show)}>
      <div>
        <div className={classes.overlay}></div>
        <div className="loadingio-spinner-ripple-6sojmm52fvp">
          <div className="ldio-cjb4fo9uh1">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
