
// import { useSearchParams } from 'next/navigation';

const OrderConfirmation = () => {
    // const searchParams = useSearchParams();
    // const token = searchParams.get('token');
    // const [labelUrl, setLabelUrl] = useState<string | null>(null);
    // const [error, setError] = useState<string | null>(null);

    // useEffect(() => {
    //     if (token) {
    //         const fetchLabel = async () => {
    //             try {
    //                 const response = await fetch('/api/shipping', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                     },
    //                     body: JSON.stringify({
    //                         customerInfo: {
    //                             name: 'Customer Name', 
    //                             address: '123 Street',
    //                             city: 'City',
    //                             state: 'State',
    //                             zip: '12345',
    //                             country: 'Country',
    //                             phone: '123-456-7890',
    //                             email: 'customer@example.com',
    //                         },
    //                         products: [
    //                             {
    //                                 weight: 10, // Replace with real product data
    //                             },
    //                         ],
    //                     }),
    //                 });

    //                 if (!response.ok) {
    //                     throw new Error('Failed to generate shipping label');
    //                 }

    //                 const data = await response.json();
    //                 setLabelUrl(data.labelUrl);
    //             } catch (err) {
    //                 setError((err as Error).message);
    //             }
    //         };

    //         fetchLabel();
    //     }
    // }, [token]);

    return (
        <div>
            <h1>Order Confirmation</h1>
            {/* {error ? (
                <p>Error: {error}</p>
            ) : labelUrl ? (
                <a href={labelUrl} target="_blank" rel="noopener noreferrer">
                    Download Shipping Label
                </a>
            ) : (
                <p>Generating shipping label...</p>
            )} */}
        </div>
    );
};

export default OrderConfirmation;
