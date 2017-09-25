import React, { Component } from 'react';
import Particles from 'react-particles-js';
import particlesConfig from '../static/libs/particles.json';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flux-container">
        <div className="particles-container">
          <Particles params={particlesConfig} />
        </div>
        <main className="flux-hero">
          <img src="/static/imgs/flux_gem.png" alt="Flux Logo" />
          <h1>Decentralized Data Harvesting via Blockchain</h1>
          <h2>Our ICO is coming.</h2>
        </main>
      </div>
    );
  }
}

export default Splash;
