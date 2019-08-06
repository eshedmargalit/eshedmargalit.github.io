export function roundTruncate(x) {
  var rounded = Math.round(x * 100) / 100;
  if (rounded > 1) {
    rounded = 1;
  } else if (rounded < 0) {
    rounded = 0;
  }
  return rounded;
}

export function normalCDF(value, mean, std) {
  var gaussian = require("gaussian");
  var distribution = gaussian(mean, Math.pow(std, 2));
  var sample = distribution.cdf(value);
  return sample;
}

export function normalICDF(percentile, std) {
  var gaussian = require("gaussian");
  var distribution = gaussian(0, Math.pow(std, 2));
  var sample = distribution.ppf(percentile);
  return sample;
}

export function getROCCurve(
  signal_mean,
  signal_sigma,
  noise_mean,
  noise_sigma
) {
  var data = [];
  for (var criterion = 0; criterion < 30; criterion += 0.1) {
    var hits = 1 - normalCDF(criterion, signal_mean, signal_sigma);
    var false_positives = 1 - normalCDF(criterion, noise_mean, noise_sigma);
    var el = {
      false_positives: false_positives,
      hits: hits
    };
    data.push(el);
  }

  // make sure extremes are represented
  data.push({
    false_positives: 0,
    hits: 0
  });
  data.push({
    false_positives: 1,
    hits: 1
  });

  data.sort((a, b) => {
    return a.false_positives - b.false_positives;
  });

  return data;
}
