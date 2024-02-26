class constant {
  constructor(val=1) {
    this.value = val;
  }

  update(val) {
    this.value = val;
  }
};

const physParameters = {
  originGravity : 1e-4,
  particleGravity : .1,
  electricConstant : .3,
  maxVelocityConstant : .1,
  airResistanceConstant : 1
  
}

const stepSize = 1/60;

export { physParameters }