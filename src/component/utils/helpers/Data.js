import { ActivateCustomer,DeactivateCustomer,viewAllCustomers} from '../../../services/AdminServices'

export const sanitizeData = (data, keysToBeIncluded, setCustomers) => {
    const handleAction = async (customerId, isActive) => {
        try {
            if (isActive) {
                await DeactivateCustomer(customerId);
            } else {
                await ActivateCustomer(customerId);
            }
            const updatedData = await viewAllCustomers();
            if (updatedData && updatedData.content) {
                const sanitizedData = sanitizeData(updatedData, [
                    "customer_id",
                    "firstName",
                    "lastName",
                    "email",
                    "active"
                ], setCustomers);
                setCustomers(sanitizedData);
            } else {
                setCustomers([]);
            }
        } catch (error) {
            console.error("Error handling action:", error);
        }
    };

    const sanitizedContent = data.content.map(customer => {
        const sanitizedCustomer = {};
        keysToBeIncluded.forEach(key => {
            if (customer[key] !== undefined) {
                sanitizedCustomer[key] = customer[key];
            }
        });

        sanitizedCustomer['action'] = (
            <button
                className="button"
                onClick={() => handleAction(customer.customer_id, sanitizedCustomer['active'])}
            >
                {sanitizedCustomer['active'] ? 'Deactivate' : 'Activate'}
            </button>
        );

        return sanitizedCustomer;
    });

    return {
        ...data,
        content: sanitizedContent,
    };
};

export const sanitizeTransactionData = (data) => {
    const sanitizedContent = data.content.map(transaction => {
        const sanitizedTransaction = {
            id:0,
            senderAccount:"N/A"
        };
        Object.keys(transaction).forEach(key => {
            if (key === "senderAccount" || key === "receiverAccount") {
                sanitizedTransaction[key] = transaction[key].accountNumber;
            } else {
                sanitizedTransaction[key] = transaction[key];
            }
        });
        return sanitizedTransaction;
    });

    return {
        ...data,
        content: sanitizedContent,
    };
};