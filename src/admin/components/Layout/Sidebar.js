import logo200Image from '../../assets/img/logo/logo_200.png';
import sidebarBgImage from '../../assets/img/sidebar/sidebar-4.jpg';
import SourceLink from '../../components/SourceLink';
import React from 'react';
import {
  MdAccountCircle,
  MdPeople,
  MdBook,
  MdMap,
  MdWork,
  MdPerson,
  MdNaturePeople,
  MdPeopleOutline
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink
} from 'reactstrap';
import bn from '../../utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};

// const navComponents = [
//   { to: '/buttons', name: 'buttons', exact: false, Icon: MdRadioButtonChecked },
//   {
//     to: '/button-groups',
//     name: 'button groups',
//     exact: false,
//     Icon: MdGroupWork,
//   },
//   { to: '/forms', name: 'forms', exact: false, Icon: MdChromeReaderMode },
//   { to: '/input-groups', name: 'input groups', exact: false, Icon: MdViewList },
//   {
//     to: '/dropdowns',
//     name: 'dropdowns',
//     exact: false,
//     Icon: MdArrowDropDownCircle,
//   },
//   { to: '/badges', name: 'badges', exact: false, Icon: MdStar },
//   { to: '/alerts', name: 'alerts', exact: false, Icon: MdNotificationsActive },
//   { to: '/progress', name: 'progress', exact: false, Icon: MdBrush },
//   { to: '/modals', name: 'modals', exact: false, Icon: MdViewDay },
// ];

// const navContents = [
//   { to: '/typography', name: 'typography', exact: false, Icon: MdTextFields },
//   { to: '/tables', name: 'tables', exact: false, Icon: MdBorderAll },
// ];

// const pageContents = [
//   { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
//   {
//     to: '/login-modal',
//     name: 'login modal',
//     exact: false,
//     Icon: MdViewCarousel,
//   },
// ];

const navItems = [
  // { to: '/admin/dashboard', name: 'dashboard', exact: true, Icon: MdDashboard },
  { to: '/dashboard/role', name: 'roles', exact: true, Icon: MdAccountCircle },
  { to: '/dashboard/user', name: 'users', exact: true, Icon: MdPeople },
  { to: '/dashboard/job', name: 'jobs', exact: true, Icon: MdWork },
  {
    to: '/dashboard/article',
    name: 'articles',
    exact: true,
    Icon: MdBook
  },

  {
    to: '/dashboard/interviewer',
    name: 'interviewers',
    exact: true,
    Icon: MdNaturePeople
  },

  {
    to: '/dashboard/candidate',
    name: 'candidates',
    exact: true,
    Icon: MdPeopleOutline
  },
  {
    to: '/dashboard/interview',
    name: 'interviews',
    exact: true,
    Icon: MdMap
  }

  // { to: '/cards', name: 'cards', exact: false, Icon: MdWeb },
  // { to: '/charts', name: 'charts', exact: false, Icon: MdInsertChart },
  // { to: '/widgets', name: 'widgets', exact: false, Icon: MdWidgets },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img src={logo200Image} width="100%" className="pr-2" alt="" />
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            {/* <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Components')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={bem.e('nav-item-icon')} />
                  <span className=" align-self-start">Components</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenComponents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>  */}
            {/* <Collapse isOpen={this.state.isOpenComponents}>
                {navComponents.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse> 

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contents')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSend className={bem.e('nav-item-icon')} />
                  <span className="">Contents</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContents
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenContents}>
              {navContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">Pages</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPages
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {pageContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse> */}
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
