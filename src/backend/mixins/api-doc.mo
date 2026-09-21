mixin () {
  /// Static Markdown documentation of the backend's public API.
  public query func getApiDoc() : async Text {
    "# Robi Care Backend API\n\n"
    # "The Robi Care backend stores contact enquiries submitted through the marketing site and notifies the team by email. It also exposes the stored enquiries to the platform's data query layer (OQL) and provides the standard TMU/TeleMeetUp account and authorization endpoints.\n\n"
    # "## Contact enquiries\n\n"
    # "### `submitContactEnquiry(name : Text, email : Text, organisation : Text, message : Text) : async SubmitResult`\n\n"
    # "Public update call. Any caller, including an anonymous one, may submit an enquiry.\n\n"
    # "- `name` — required, at most 200 characters after trimming.\n"
    # "- `email` — required, at most 320 characters, must contain exactly one `@` and a dotted domain.\n"
    # "- `organisation` — optional, at most 200 characters.\n"
    # "- `message` — required, at most 5000 characters.\n\n"
    # "All fields are trimmed of surrounding whitespace before validation and storage. On success the enquiry is persisted and a notification email is sent to `hello@tmu.ai`; the result is `#ok(id)` where `id` is the stored enquiry's numeric id.\n\n"
    # "On validation failure the result is `#err(message)` with a human-readable message and nothing is stored. If the enquiry is stored but the notification email fails, the result is `#err(message)` describing the email failure — the enquiry is still persisted, so a retry would create a duplicate. The frontend should treat `#err` as a submission failure and let the user retry deliberately.\n\n"
    # "### `listContactEnquiries() : async [ContactEnquiry]`\n\n"
    # "Query call restricted to admins. Returns every stored enquiry, newest first. A non-admin caller traps with `Unauthorized: Only admins can list contact enquiries`.\n\n"
    # "`ContactEnquiry` is `{ id : Nat; name : Text; email : Text; organisation : Text; message : Text; submittedAt : Nat }`. `submittedAt` is nanoseconds since the Unix epoch.\n\n"
    # "## Data query layer (OQL)\n\n"
    # "### `schema() : async Text`\n\n"
    # "Returns the JSON schema of the queryable entities. The `contactEnquiry` entity is controller-only, so non-controller callers see it hidden.\n\n"
    # "### `execute(qJson : Text) : async Result`\n\n"
    # "Runs a JSON query against the registered entities. The `contactEnquiry` entity is controller-only: only the platform controller (and the Data Intelligence agent acting as it) can read rows. An invalid query traps with `OQL: invalid query — <detail>`.\n\n"
    # "## Authentication and authorization\n\n"
    # "The app uses the TMU/TeleMeetUp account system. The frontend pins an Internet Identity derivation origin, published at `/.well-known/ii-derivation-origin` when available; an agent already holding the user's Internet Identity authorization derives the correct per-app principal against that origin (for example `icp identity link web <name> --app <host>`). Such a delegation acts with the user's full authority in this app until it expires.\n\n"
    # "Registration is a prerequisite for role-guarded calls. A direct API caller must call `_initialize_access_control` once as a signed-in caller before any role-guarded call, including guarded queries. The first caller to initialize becomes `#admin`; every later caller becomes `#user`. A caller that never signed in through the app's own frontend is unregistered even when it belongs to the app's owner, and a signed-in caller derived against a different origin is a different principal than the one the frontend registered.\n\n"
    # "An anonymous caller receives `#guest` from `getCallerUserRole` and `false` from `isCallerAdmin`. An unregistered signed-in caller traps with `User is not registered` on `getCallerUserRole`, `isCallerAdmin`, and any admin-guarded endpoint. `assignCallerUserRole(user, role)` is admin-only and traps with `Unauthorized: Only admins can assign user roles` otherwise.\n\n"
    # "`submitContactEnquiry` is intentionally unauthenticated so prospective customers can reach the team without an account.\n";
  };
};
