import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Badge, Nav, NavItem } from "reactstrap";
import classNames from "classnames";
import nav from "./_nav";
import { connect } from "react-redux";
// import * as sidebaractions from "../../actions/sidebaractions"
import {getthatpics} from "../../actions/sidebaractions";
import { bindActionCreators } from "redux";
import {addLoader,removeLoader} from "../../actions/loader";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entered: "",
    };
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle("open");
  }

  changeGallery(e, v) {
    var result = [
      "Mobiles",
      "SmartPhones",
      "Laptops",
      "Desktops",
      "Tvs",
      "Gadgets",
      "Electronics",
      "Fashions",
      "Decoratives",
      "Furniture",
    ];
    console.log('---------------tamil----------------------')
    if (result.indexOf(window.location.href.split("/")[5]) > -1 && this.state.entered != window.location.href) {
      this.props.actions.addLoader({})
      console.log('--------window.location.href--------')
        this.setState({ entered: window.location.href });
        this.props.actions.getthatpics(window.location.href.split("/")[5]);
        setTimeout(() => {
          this.props.actions.removeLoader({})
      }, 5000);
    }
  }

  activeRoute(routeName, props) {
    // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    return props.location.pathname.indexOf(routeName) > -1
      ? "nav-item nav-dropdown open"
      : "nav-item nav-dropdown";
  }

  // todo Sidebar nav secondLevel
  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    const props = this.props;
    const activeRoute = this.activeRoute;
    const handleClick = this.handleClick;

    // badge addon to NavItem
    const badge = (badge) => {
      if (badge) {
        const classes = classNames(badge.class);
        return (
          <Badge className={classes} color={badge.variant}>
            {badge.text}
          </Badge>
        );
      }
    };

    // simple wrapper for nav-title item
    const wrapper = (item) => {
      return !item.wrapper
        ? item.name
        : React.createElement(
            item.wrapper.element,
            item.wrapper.attributes,
            item.name
          );
    };

    // nav list section title
    const title = (title, key) => {
      const classes = classNames("nav-title", title.class);
      return (
        <li key={key} className={classes}>
          {wrapper(title)}{" "}
        </li>
      );
    };

    // nav list divider
    const divider = (divider, key) => <li key={key} className="divider"></li>;

    // nav item with nav link
    const navItem = (item, key) => {
      const classes = classNames("nav-link", item.class);
      return (
        <NavItem key={key}>
          <NavLink
            to={item.url}
            className={classes}
            activeClassName="active"
            onClick={this.changeGallery(item, item)}
          >
            <i className={item.icon}></i>
            {item.name}
            {badge(item.badge)}
          </NavLink>
        </NavItem>
      );
    };

    // nav dropdown
    const navDropdown = (item, key) => {
      return (
        <li key={key} className={activeRoute(item.url, props)}>
          <a
            className="nav-link nav-dropdown-toggle"
            href="#"
            onClick={handleClick.bind(this)}
          >
            <i className={item.icon}></i> {item.name}
          </a>
          <ul className="nav-dropdown-items">{navList(item.children)}</ul>
        </li>
      );
    };

    // nav link
    const navLink = (item, idx) =>
      item.title
        ? title(item, idx)
        : item.divider
        ? divider(item, idx)
        : item.children
        ? navDropdown(item, idx)
        : navItem(item, idx);

    // nav list
    const navList = (items) => {
      return items.map((item, index) => navLink(item, index));
    };

    // sidebar-nav root
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <Nav>{navList(nav.items)}</Nav>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { listData } = state.list;
  console.log(state.list.listData.length, "fine-----");
  return { listData };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({getthatpics,addLoader,removeLoader,}, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
