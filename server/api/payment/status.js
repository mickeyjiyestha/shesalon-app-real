import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // Get order_id from query parameters
    const query = getQuery(event);
    const orderId = query.order_id;

    if (!orderId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "order_id is required" }),
      };
    }

    // Midtrans API base URL (sandbox or production)
    const baseUrl = "https://api.sandbox.midtrans.com";

    // Server key for Basic Auth
    const serverKey = "SB-Mid-server-sGgwR0-jQD0jlZaMT0jy6jGL";

    // Create Basic Auth header (Base64 encoded)
    const auth = Buffer.from(`${serverKey}:`).toString("base64");

    // Make request to Midtrans API
    const response = await fetch(`${baseUrl}/v2/${orderId}/status`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
    });

    // Parse response
    const data = await response.json();

    // Return the data
    return data;
  } catch (error) {
    console.error("Error fetching payment status:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch payment status" }),
    };
  }
});
