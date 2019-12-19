import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import AdminMenu from "../../components/adminMenu/AdminMenu";
import Detail from "../detail/Detail";
import NotFound from "../../components/notFound/NotFound";
import style from './style.css'
import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/admin'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AdminNewArticle from "../adminNewArticle/AdminNewArticle";
import AdminManagerArticle from "../adminManagerArticle/AdminManagerArticle";
import AdminManagerComment from "../adminManagerComment/AdminManagerComment";
import DataPanel from "../dataPanel/DataPanel"
import DataPanelDetail from '../dataPanelDetail/DataPanelDetail'

const {change_location_admin} = actions;

class Admin extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {url} = this.props.match;
        if(this.props.userInfo&&this.props.userInfo.userType){
            return (
                <div>
                    {
                        this.props.userInfo.userType === 'admin' ?
                            <div className={style.container}>
                                <div className={style.menuContainer}>
                                    <AdminMenu history={this.props.history}
                                               url={this.props.adminUrl}
                                               changeUrl={this.props.change_location_admin}/>
                                </div>
                                <div className={style.contentContainer}>
                                    <Switch>
                                        <Route path={`${url}/newArticle`} component={AdminNewArticle}/>
                                        <Route path={`${url}/managerArticle`} component={AdminManagerArticle}/>
                                        <Route path={`${url}/managerComment`} component={AdminManagerComment}/>
                                        <Route path={`${url}/calculate`} component={DataPanel}/>
                                        <Route path={`${url}/calculateShow`} component={DataPanelDetail}/>
                                        <Route component={NotFound}/>
                                    </Switch>
                                </div>
                            </div> :
                            <Redirect to='/'/>
                    }
                </div>
            )
        }else{
            return <NotFound/>
        }
    }
    componentWillReceiveProps() {
        this.props.change_location_admin(window.location.pathname.replace(/\/admin/, "")||'/');
    }
}
Admin.defaultProps = {
    adminUrl: '/'
};

Admin.propTypes = {
    adminUrl: PropTypes.string,
    change_location_admin: PropTypes.func
};

function mapStateToProps(state) {
    const {url} = state.admin.adminGlobalState;
    return {
        adminUrl: url,
        userInfo:state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        change_location_admin: bindActionCreators(change_location_admin, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin)