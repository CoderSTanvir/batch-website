export default function AdminPage() {
  return (
    <div className="mx-auto max-w-sm px-6 py-16">
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h1 className="mb-1 text-lg font-medium">Admin login</h1>
        <p className="mb-5 text-sm text-gray-500">
          Not yet functional — coming in a later phase.
        </p>
        <div className="space-y-3">
          <input
            disabled
            placeholder="Email"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400"
          />
          <input
            disabled
            placeholder="Password"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-400"
          />
          <button
            disabled
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-sm text-gray-400"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
