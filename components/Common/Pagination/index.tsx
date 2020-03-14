import { Component } from "react";
import styles from './index.module.scss';
import { Hidden } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

interface IPageControlsProps {
    onChangePage: (event: any, value: number) => void;
    totalPages: number;
    currentPage: number;
}

export default class PageControls extends Component<IPageControlsProps, {}> {
    render() {
        const props = this.props;

        return (
            <div className={styles.paginationContainer}>
              <Hidden smDown>
                  <Pagination 
                    count={props.totalPages} 
                    defaultPage={props.currentPage} 
                    page={props.currentPage}
                    color="primary" 
                    variant="outlined"
                    size="large"
                    onChange={props.onChangePage}
                  />
              </Hidden>
              <Hidden mdUp xsDown>
                  <Pagination 
                    count={props.totalPages} 
                    defaultPage={props.currentPage} 
                    page={props.currentPage}
                    color="primary" 
                    variant="outlined"
                    onChange={props.onChangePage}
                  />
              </Hidden>
              <Hidden smUp>
                  <Pagination 
                    count={props.totalPages} 
                    defaultPage={props.currentPage} 
                    page={props.currentPage}
                    color="primary" 
                    variant="outlined"
                    size="small"
                    onChange={props.onChangePage}
                  />
              </Hidden>
            </div>
          );
    }
}