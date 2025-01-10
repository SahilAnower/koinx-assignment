export const getDeviation = (arr) => {
  // formula: σ = √[(Σ(xi - μ)²) / N]

  const sum = arr.reduce((acc, curr) => acc + curr, 0);
  const mean = sum / arr.length;
  const sumOfSquares = arr.reduce((acc, curr) => acc + (curr - mean) ** 2, 0);
  const variance = sumOfSquares / arr.length;
  const standardDeviation = Math.sqrt(variance);

  return standardDeviation;
};
