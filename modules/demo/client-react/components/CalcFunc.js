const getListingCost = item => {
  const listingcost = item.listing.listingCost.filter(lc => lc.weight === item.weight && lc.flavour === item.flavour);
  return listingcost.length > 0 && listingcost[0].cost;
};
const totalAmount = (orderDetails, values) => {
  let price = 0;
  orderDetails.map((item, indx) => {
    price =
      price +
      Number(getListingCost(item)) *
        Number(
          (values && values.orderDetails[indx] && values.orderDetails[indx].unit) ||
            (orderDetails[indx] && orderDetails[indx].unit)
        );
  });
  return price;
};

export { totalAmount, getListingCost };
