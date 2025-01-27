import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CartItem {
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface BillingDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    streetAddress: string;
    postalCode: string;
    state?: string;  
}


export const POST = async (req: NextRequest) => {
    try {
        const { items, billingDetails }: { items: CartItem[]; billingDetails: BillingDetails } = await req.json();

        const customer = await stripe.customers.create({
            address: {
                city: billingDetails.city,
                country: billingDetails.country,
                line1: billingDetails.streetAddress,
                postal_code: billingDetails.postalCode,
                state: billingDetails.state,
            },
            name: `${billingDetails.firstName} ${billingDetails.lastName}`,
            phone: billingDetails.phone,
            email: billingDetails.email,
        });
        console.log(customer)

        const lineItems = items.map(item => ({
            quantity: item.quantity,
            price_data: {
                currency: "PKR",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price * 100,
            },
        }));

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            success_url: `http://localhost:3000/order-confirmation?token=${customer.id}`,
            cancel_url: `http://localhost:3000/cancel?token=${customer.id}`,
            line_items: lineItems,
        });

        return NextResponse.json({ message: checkoutSession, url: checkoutSession.url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
};
