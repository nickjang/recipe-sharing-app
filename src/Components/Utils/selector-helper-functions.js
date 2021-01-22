/* Selector helper functions */

/**
  * Sort selectors of project by their start 
  * days in ascending order
  */
export function sortSelectors(selectors) {
  selectors.sort((selector1, selector2) => {
    if (selector1[0] > selector2[0]) return 1;
    else if (selector1[0] === selector2[0]) return 0;
    return -1;
  });
};

/**
 * Get the most recent day of two days.
 */
export function mostRecentDay(day1, day2) {
  if (day1 >= day2) return day1;
  return day2;
};