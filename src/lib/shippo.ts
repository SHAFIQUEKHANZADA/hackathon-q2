// // /lib/shippo.js
// import Shippo from 'shippo';

// const shippo = new Shippo(process.env.SHIPPO_API_KEY);

// export const createShipment = async (fromAddress, toAddress, parcel) => {
//   try {
//     const shipment = await shippo.shipments.create({
//       address_from: fromAddress,
//       address_to: toAddress,
//       parcels: [parcel],
//     });
//     return shipment;
//   } catch (error) {
//     console.error('Error creating shipment:', error);
//     throw error;
//   }
// };

// export const getShippingRates = async (shipmentId) => {
//   try {
//     const rates = await shippo.rates.list(shipmentId);
//     return rates;
//   } catch (error) {
//     console.error('Error getting shipping rates:', error);
//     throw error;
//   }
// };

// export const createShippingLabel = async (shipmentId, serviceLevelToken) => {
//   try {
//     const label = await shippo.transactions.create({
//       shipment: shipmentId,
//       servicelevel_token: serviceLevelToken,
//     });
//     return label;
//   } catch (error) {
//     console.error('Error creating shipping label:', error);
//     throw error;
//   }
// };
