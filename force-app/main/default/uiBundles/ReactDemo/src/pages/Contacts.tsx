import { useEffect, useState } from "react";
import { fetchContacts, type ContactNode } from "../api/contact/contactService";

/** Helper: extracts `value` from a Salesforce field like { value: "..." } */
function fv(field: { value: string | null } | null | undefined): string {
  return field?.value ?? "—";
}

export default function Contacts() {
  const [contacts, setContacts] = useState<ContactNode[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts(50)
      .then((result) => {
        setContacts(result.contacts);
        setTotalCount(result.totalCount);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // ── Loading state ──
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Contacts</h1>
        <p className="text-gray-500">Loading contacts...</p>
      </div>
    );
  }

  // ── Error state ──
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-6">Contacts</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700 font-medium">Failed to load contacts</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  // ── Success state ──
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">Contacts</h1>
      <p className="text-gray-500 text-sm mb-6">
        {totalCount} contact{totalCount !== 1 ? "s" : ""} found
      </p>

      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found in this org.</p>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-gray-50 border-b text-sm font-medium text-gray-500">
            <span>Name</span>
            <span>Email</span>
            <span>Phone</span>
            <span>Account</span>
          </div>

          {/* Table Rows */}
          {contacts.map((contact) => (
            <div
              key={contact.Id}
              className="grid grid-cols-4 gap-4 px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">{fv(contact.Name)}</span>
              <span className="text-sm text-gray-600">{fv(contact.Email)}</span>
              <span className="text-sm text-gray-600">{fv(contact.Phone)}</span>
              <span className="text-sm text-gray-500">{fv(contact.Account?.Name)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
