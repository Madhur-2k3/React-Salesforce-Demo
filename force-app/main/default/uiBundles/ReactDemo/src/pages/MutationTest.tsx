import { useState } from "react";
import { createDataSDK } from "@salesforce/sdk-data";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

/**
 * Minimal mutation test — tries to create an Account via GraphQL.
 * This page exists purely to verify whether sdk-data supports mutations.
 */

const CREATE_ACCOUNT_MUTATION = `
  mutation CreateAccount($name: String!) {
    uiapi {
      AccountCreate(input: {
        Account: {
          Name: $name
        }
      }) {
        Record {
          Id
          Name { value }
        }
      }
    }
  }
`;

type MutationResult = {
  uiapi: {
    AccountCreate: {
      Record: {
        Id: string;
        Name: { value: string };
      };
    };
  };
};

type TestStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; id: string; name: string; raw: string }
  | { type: "error"; message: string; raw: string };

export default function MutationTest() {
  const [accountName, setAccountName] = useState("");
  const [status, setStatus] = useState<TestStatus>({ type: "idle" });

  async function handleCreate() {
    if (!accountName.trim()) return;

    setStatus({ type: "loading" });

    try {
      const sdk = await createDataSDK();

      // Attempt 1: Use sdk.graphql() with mutation
      const response = await sdk.graphql?.<MutationResult, { name: string }>(
        CREATE_ACCOUNT_MUTATION,
        { name: accountName.trim() }
      );

      // Check for GraphQL-level errors
      if (response?.errors?.length) {
        setStatus({
          type: "error",
          message: response.errors.map((e) => e.message).join("; "),
          raw: JSON.stringify(response, null, 2),
        });
        return;
      }

      const record = response?.data?.uiapi?.AccountCreate?.Record;

      if (record?.Id) {
        setStatus({
          type: "success",
          id: record.Id,
          name: record.Name?.value ?? accountName,
          raw: JSON.stringify(response, null, 2),
        });
      } else {
        setStatus({
          type: "error",
          message: "Mutation returned but no Record found in response",
          raw: JSON.stringify(response, null, 2),
        });
      }
    } catch (err: any) {
      setStatus({
        type: "error",
        message: err?.message ?? "Unknown error",
        raw: String(err?.stack ?? err),
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">🧪 GraphQL Mutation Test</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Tests whether <code className="text-xs bg-muted px-1 py-0.5 rounded">sdk-data.graphql()</code> supports
        mutations. Tries to create an Account record.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Create Account via GraphQL Mutation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Account Name (e.g. Test Mutation Co)"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              disabled={status.type === "loading"}
            />
            <Button
              onClick={handleCreate}
              disabled={!accountName.trim() || status.type === "loading"}
            >
              {status.type === "loading" ? "Creating..." : "Create"}
            </Button>
          </div>

          {/* Result display */}
          {status.type === "success" && (
            <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 p-4 space-y-2">
              <p className="font-medium text-green-700 dark:text-green-400">
                ✅ Mutation works! Account created.
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                <strong>ID:</strong> {status.id}
              </p>
              <p className="text-sm text-green-600 dark:text-green-500">
                <strong>Name:</strong> {status.name}
              </p>
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer">
                  Raw response
                </summary>
                <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-x-auto">
                  {status.raw}
                </pre>
              </details>
            </div>
          )}

          {status.type === "error" && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 p-4 space-y-2">
              <p className="font-medium text-red-700 dark:text-red-400">
                ❌ Mutation failed
              </p>
              <p className="text-sm text-red-600 dark:text-red-500">
                {status.message}
              </p>
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer">
                  Raw response / error
                </summary>
                <pre className="mt-1 text-xs bg-muted p-2 rounded overflow-x-auto whitespace-pre-wrap">
                  {status.raw}
                </pre>
              </details>
            </div>
          )}
        </CardContent>
      </Card>

      {/* What we're testing */}
      <div className="mt-8 text-sm text-muted-foreground space-y-2">
        <h2 className="font-semibold text-foreground">What this tests:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Can <code className="text-xs bg-muted px-1 py-0.5 rounded">sdk.graphql()</code> execute mutations (not just queries)?</li>
          <li>Does the UI API expose <code className="text-xs bg-muted px-1 py-0.5 rounded">AccountCreate</code> mutation at API v66.0?</li>
          <li>Are the response types as expected?</li>
        </ul>
      </div>
    </div>
  );
}
