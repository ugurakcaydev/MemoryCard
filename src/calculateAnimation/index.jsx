const calculateAnimation = (level) => {
  const baseDuration = 1;
  return Math.max(baseDuration + level * 0.9, 0.5);
};
export default calculateAnimation;
