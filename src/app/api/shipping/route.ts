import { NextRequest, NextResponse } from "next/server";
import { Shippo } from "shippo";

interface ShippingDetails {
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
}

interface Parcel {
    length: number;
    width: number;
    height: number;
    weight: number;
}

const shippo = new Shippo({apiKeyHeader: process.env.SHIPPO_API_KEY});
 
export const POST = async (req: NextRequest) => {
    try {
        const { shippingDetails, parcel }: { shippingDetails: ShippingDetails; parcel: Parcel } = await req.json();

        if (!shippingDetails || !parcel) {
            throw new Error("Missing required shipping details or parcel information.");
        }

        const addressFrom = await shippo.addresses.create({
            name: "Shawn Ippotle",
            company: "Shippo",
            street1: "215 Clayton St.",
            city: "San Francisco",
            state: "CA",
            zip: "94117",
            country: "US",
            phone: "+1 555 341 9393",
            email: "shippotle@shippo.com",
        });

        const shipment = {
            address_from: {
                name: "Frniro",
                street1: "123 Sender St",
                city: "Karachi",
                state: "Pakistan",
                zip: "12345",
                country: "PK",
                phone: "03464365890",
                email: "kzshafique77@gmail.com",
            },
            address_to: {
                name: `${shippingDetails.firstName} ${shippingDetails.lastName}`,
                street1: shippingDetails.streetAddress,
                city: shippingDetails.city,
                state: shippingDetails.state,
                zip: shippingDetails.postalCode,
                country: shippingDetails.country,
                phone: shippingDetails.phone,
                email: shippingDetails.email,
            },
            parcels: [
                {
                    length: parcel.length,
                    width: parcel.width,
                    height: parcel.height,
                    distance_unit: "in",
                    weight: parcel.weight,
                    mass_unit: "lb",
                },
            ],
            async: false,
        };

        // Use `addressFrom` and `shipment` or remove them
        console.log("Address From:", addressFrom);
        console.log("Shipment:", shipment);

        return NextResponse.json({
            message: "Shipment created successfully.",
        });
    } catch (error) {
        console.error("Shippo Shipping Error:", error);
        return NextResponse.json(
            {
                error: (error as Error).message || "An error occurred while creating the shipment.",
            },
            { status: 500 }
        );
    }
};

