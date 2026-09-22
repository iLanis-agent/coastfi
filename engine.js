/* CoastFI engine - pure functions for financial-independence math. */
(function (root) {
  'use strict';
  var MAX_MONTHS = 720; // 60 years

  // The number: annual expenses covered at a safe withdrawal rate (default 4%)
  function fiNumber(annualExpenses, swr) {
    swr = swr || 0.04;
    return annualExpenses / swr;
  }

  // Months until savings reach target, growing monthly with contributions.
  // Returns {months, reachable} - unreachable if 60 years isn't enough.
  function monthsToTarget(savings, monthlyContrib, annualReturn, target) {
    if (savings >= target) return { months: 0, reachable: true };
    var r = Math.pow(1 + annualReturn, 1 / 12) - 1;
    var s = savings, m = 0;
    // no-growth and no-contribution: never
    if (r <= 0 && monthlyContrib <= 0) return { months: Infinity, reachable: false };
    while (m < MAX_MONTHS) {
      s = s * (1 + r) + monthlyContrib;
      m++;
      if (s >= target) return { months: m, reachable: true };
    }
    return { months: Infinity, reachable: false };
  }

  // Coast number: what you need TODAY so growth alone hits FI by retireAge.
  function coastNumber(fi, annualReturn, yearsToRetire) {
    if (yearsToRetire <= 0) return fi;
    return fi / Math.pow(1 + annualReturn, yearsToRetire);
  }

  function plan(input) {
    var fi = fiNumber(input.annualExpenses, input.swr);
    var yearsLeft = Math.max(0, (input.retireAge || 65) - (input.currentAge || 30));
    var toFI = monthsToTarget(input.savings, input.monthlyContrib, input.annualReturn, fi);
    var coast = coastNumber(fi, input.annualReturn, yearsLeft);
    return {
      fi: Math.round(fi),
      yearsToFI: toFI.reachable ? Math.round(toFI.months / 12 * 10) / 10 : null,
      fiAge: toFI.reachable ? Math.round(((input.currentAge || 30) + toFI.months / 12) * 10) / 10 : null,
      coastNumber: Math.round(coast),
      coastReached: input.savings >= coast,
      progress: fi > 0 ? Math.min(1, input.savings / fi) : 0
    };
  }

  var api = { fiNumber: fiNumber, monthsToTarget: monthsToTarget, coastNumber: coastNumber, plan: plan };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.CoastFI = api;
})(typeof window !== 'undefined' ? window : this);
