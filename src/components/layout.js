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
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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


class layout extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        // this.sayHi = this.sayHi.bind(this);

    }

    state = {
        open: false,
        open1: true,
    };

    handleClick = () => {
        this.setState(state => ({open: !state.open}));
    };

    handleClick1 = () => {
        this.setState(state => ({open1: !state.open1}));
    };


    render() {
        const {classes, children} = {...this.props};
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
                        <ListItem button onClick={this.handleClick}>
                            <ListItemText  primary="gatsbyjs"/>
                            {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            {[['CSS 使用', `css`], ['布局', `layout`], ['GraphQL', `data`], ['本地文件', `my-files`], ['Markdown', `md`], ['目录', `slu`]].map((text, index) => (
                                <Link to={text[1]} key={index} style={{textDecoration: `none`}}>
                                    <ListItem button>
                                        <ListItemText inset primary={text[0]}/>
                                    </ListItem>

                                </Link>
                            ))}
                        </Collapse>

                            {/*[['Object-relational mapper', `css`], ['URLs and views', `layout`], ['Templates', `data`], ['Forms', `my-files`], ['Authentication', `md`], ['Internationalization', `slu`], ['Security', `slu`], ['Admin', `slu`],['Plugin', `slu`]]*/}
                            {[['django', `django`]].map((text, index) => (
                                <Link to={text[1]} key={index} style={{textDecoration: `none`}}>
                                    <ListItem button>
                                        <ListItemText  primary={text[0]}/>
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
    }

}


export default withStyles(styles)(layout);
