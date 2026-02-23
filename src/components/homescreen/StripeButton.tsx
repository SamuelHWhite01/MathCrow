
import { getApp } from "@firebase/app";
import {
  getStripePayments,
  getProducts,
  createCheckoutSession,
} from "@invertase/firestore-stripe-payments";

function StripeButton(){
    const app = getApp();
    const payments = getStripePayments(app, {
        productsCollection: "products",
        customersCollection: "customers",
        });
    
    async function handleStripeButton(){
        const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
        });

        if (!products.length) {
            console.error("No products found");
            return;
        }
        //console.log(products)

        // pick the first price
        const priceId = products[0].prices?.[0]?.id;

        if (!priceId) {
            console.error("No price found on product");
            return;
        }

        const session = await createCheckoutSession(payments, {
            price: priceId,
        });

        window.location.assign(session.url);
       
    }
  return (
    <button  onClick={handleStripeButton} className="p-2 bg-[#2596be] text-white rounded-lg font-bold text-[5vh] h-[10vh] w-[20vw] hover:cursor-pointer
    hover:scale-110 transform transition-transform duration-150">
        Stripe
    </button>
  );
};

export default StripeButton;
