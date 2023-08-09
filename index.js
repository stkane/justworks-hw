export function validatePercentagesAddUpTo100(purchasePercentages) {
  const percentagesTotal = Object.values(purchasePercentages).reduce(
    (total, percentage) => total + percentage,
    0
  );
  if (percentagesTotal !== 100)
    throw new Error("specified percentages do not add up to 100");
}

