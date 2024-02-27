class constant {
  constructor(val=1) {
    this.value = val;
  }

  update(val) {
    this.value = val;
  }
};

const physParameters = {
  originGravity : 1,
  particleGravity : 1,
  electricConstant : 1,
  maxVelocityConstant : 1,
  airResistanceConstant : 1
}

const simParameters = {
  stepSize: 1/60,
  paused: false
}

export { physParameters, simParameters }