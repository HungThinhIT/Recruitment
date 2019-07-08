import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import RouterURL from '../RouterURL';
import './career.css';
import Footer from '../Footer';
import careerdata from '../data/careerdata.json';

export default class Careers extends Component {
  render() {
    return (

      <section id="joblistings">
        <div className="site-wrap">
          <div className="site-mobile-menu site-navbar-target">
            <div className="site-mobile-menu-header">
              <div className="site-mobile-menu-close mt-3">
                <span className="icon-close2 js-menu-toggle" />
              </div>
            </div>
            <div className="site-mobile-menu-body" />
          </div> {/* .site-mobile-menu */}
          {/* NAVBAR */}
          <header className="site-navbar mt-3">
            <div className="container-fluid">
              <RouterURL />
            </div>
          </header>
          {/* HOME */}
          <section className="home-section section-hero inner-page overlay bg-image" style={{ backgroundImage: 'url("/candidate/images/hero_1.jpg")' }} id="career">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-md-12">
                  <div className="mb-5 text-center">
                    <h1 className="text-white font-weight-bold">Job Opportunities</h1>
                    <p>Find your dream jobs in my Company.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="site-section">
            <div className="container">
              <div className="row mb-5 justify-content-center">
                <div className="col-md-7 text-center">
                  <h2 className="section-title mb-2">Job Opening</h2>
                </div>
                {/* <div className="col-1 ml-11">
                  <input type="text" placeholder="search"></input>
                </div>
                <div className="col-1 ml-auto">
                <button type="submit">search</button>
                </div> */}
              </div>
              <div className="row pagination-wrap">
                <div className="col-md-6 text-center text-md-left">
                  <div className="custom-pagination ml-auto">
                    <a href="#" className="prev">Previous</a>
                    <div className="d-inline-block">
                      <a href="#" className="active">1</a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <a href="#">4</a>
                    </div>
                    <a href="#" className="next">Next</a>
                  </div>
                </div>
              </div>
              <p>

              </p>
              {careerdata.map((p, index)=> { 
                return <div className="mb-1">
                    <div className="row align-items-start job-item border pb-1 mb-1 pt-1">
                  <div className="col-md-2">
                  <NavLink to={"/describe"} key={index}><img src={p.img} alt="Image" className="img-fluid" /></NavLink>
                  </div>
                  <div className="col-md-4">
                    <span className={p.color}>{p.position}</span>
                    <h2><NavLink to={"/describe"} key={index}>{p.name}</NavLink></h2>
                    <p className="meta">Publisher: <strong>John Stewart</strong> In: <strong>Design</strong></p>
                  </div>
                  <div className="col-md-3 text-center justify-content-center align-items-center">
                    <h3>{p.namelocal}</h3>
                    <span className="meta">{p.local}</span>
                  </div>
                  <div className="col-md-3 text-md-right justify-content-center">
                    <strong className="text-black">{p.salary}</strong>
                  </div>
                </div>
                </div>
              })}
              <div className="row pagination-wrap">
                <div className="col-md-6 text-center text-md-left">
                  <div className="custom-pagination ml-auto">
                    <a href="#" className="prev">Previous</a>
                    <div className="d-inline-block">
                      <a href="#" className="active">1</a>
                      <a href="#">2</a>
                      <a href="#">3</a>
                      <a href="#">4</a>
                    </div>
                    <a href="#" className="next">Next</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <Footer />
        </div>
      </section>

    )
  }
}