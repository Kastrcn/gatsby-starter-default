import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SEO from '../components/seo'
import {Link} from 'gatsby'

const drawerWidth = 240;


const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    toolbar: theme.mixins.toolbar,
});

const layout = (props) => {
    const {classes, children} = props;
    return (
        <div className={classes.root}>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Home
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.toolbar}/>
                <List>
                    {[['Home', '/'], ['CSS 使用', `css`], ['LAYOUT', `layout`], ['DATA', `data`], ['My Files', `my-files`], ['MD', `md`], ['slu', `/`]].map((text, index) => (
                        <Link to={text[1]} key={index} style={{textDecoration: `none`}}>
                            <ListItem button>
                                <ListItemText primary={text[0]}/>
                            </ListItem>
                        </Link>
                    ))}
                </List>

            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}/>
                {children}
            </main>
        </div>
    )
};


export default withStyles(styles)(layout);
