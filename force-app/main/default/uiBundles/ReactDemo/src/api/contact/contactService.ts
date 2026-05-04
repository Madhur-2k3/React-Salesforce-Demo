import { createDataSDK } from "@salesforce/sdk-data";
import SEARCH_CONTACTS from "./query/searchContacts.graphql?raw";

// ── Types (we define manually since codegen skipped these) ──

/** Shape of one Contact record from the GraphQL response */
export interface ContactNode {
  Id: string;
  Name: { value: string | null } | null;
  Email: { value: string | null } | null;
  Phone: { value: string | null } | null;
  Account: {
    Name: { value: string | null } | null;
  } | null;
}

/** Full GraphQL response shape */
interface SearchContactsResponse {
  uiapi: {
    query: {
      Contact: {
        edges: Array<{ node: ContactNode }> | null;
        totalCount: number;
      } | null;
    };
  };
}

/** Fetches contacts from Salesforce via GraphQL */
export async function fetchContacts(first: number = 20): Promise<{
  contacts: ContactNode[];
  totalCount: number;
}> {
  const sdk = await createDataSDK();

  const response = await sdk.graphql?.<SearchContactsResponse, { first: number }>(
    SEARCH_CONTACTS,
    { first }
  );

  // Always check for errors — Salesforce returns 200 even on failure
  if (response?.errors?.length) {
    throw new Error(response.errors.map((e) => e.message).join("; "));
  }

  const contactData = response?.data?.uiapi?.query?.Contact;

  // Extract nodes from edges
  const contacts = (contactData?.edges ?? [])
    .map((edge) => edge.node)
    .filter(Boolean);

  return {
    contacts,
    totalCount: contactData?.totalCount ?? 0,
  };
}
