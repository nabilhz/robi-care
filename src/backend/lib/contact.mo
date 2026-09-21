import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Types "../types/contact";

module {
  /// The address every enquiry is stored for and notified to.
  public let notificationRecipient = "hello@tmu.ai";

  /// The `from` username used for the notification email.
  public let notificationFrom = "no-reply";

  /// Maximum accepted length per field, guarding against oversized payloads.
  let maxNameLength = 200;
  let maxEmailLength = 320;
  let maxOrganisationLength = 200;
  let maxMessageLength = 5000;

  /// Trim surrounding whitespace from every field.
  public func normalize(name : Text, email : Text, organisation : Text, message : Text) : Types.ContactEnquiry = {
    id = 0;
    name = name.trim(#predicate(func c = c == ' '));
    email = email.trim(#predicate(func c = c == ' '));
    organisation = organisation.trim(#predicate(func c = c == ' '));
    message = message.trim(#predicate(func c = c == ' '));
    submittedAt = 0;
  };

  /// Validate a normalized enquiry, returning a caller-facing error message
  /// when a field is missing, malformed, or too long.
  public func validate(enquiry : Types.ContactEnquiry) : ?Text {
    if (enquiry.name.size() == 0) {
      return ?"Please enter your name.";
    };
    if (enquiry.name.size() > maxNameLength) {
      return ?"Name is too long.";
    };
    if (enquiry.email.size() == 0) {
      return ?"Please enter your email address.";
    };
    if (enquiry.email.size() > maxEmailLength) {
      return ?"Email address is too long.";
    };
    if (not isEmailShaped(enquiry.email)) {
      return ?"Please enter a valid email address.";
    };
    if (enquiry.organisation.size() > maxOrganisationLength) {
      return ?"Organisation is too long.";
    };
    if (enquiry.message.size() == 0) {
      return ?"Please enter a message.";
    };
    if (enquiry.message.size() > maxMessageLength) {
      return ?"Message is too long.";
    };
    null;
  };

  /// Minimal shape check: exactly one `@`, non-empty local part, and a
  /// domain part containing a dot with non-empty labels.
  func isEmailShaped(email : Text) : Bool {
    let parts = email.split(#char '@').toArray();
    if (parts.size() != 2) {
      return false;
    };
    let local = parts[0];
    let domain = parts[1];
    if (local.size() == 0 or domain.size() == 0) {
      return false;
    };
    let labels = domain.split(#char '.').toArray();
    if (labels.size() < 2) {
      return false;
    };
    labels.all(func part = part.size() > 0);
  };

  /// Persist an enquiry under the next id and return that id.
  public func store(
    enquiries : Map.Map<Nat, Types.ContactEnquiry>,
    state : { var nextEnquiryId : Nat },
    enquiry : Types.ContactEnquiry,
  ) : Nat {
    let id = state.nextEnquiryId;
    state.nextEnquiryId := id + 1;
    enquiries.add(id, { enquiry with id; submittedAt = Time.now().toNat() });
    id;
  };

  /// List every stored enquiry, newest first.
  public func list(enquiries : Map.Map<Nat, Types.ContactEnquiry>) : [Types.ContactEnquiry] {
    let all = enquiries.values().toArray();
    all.sort(func (a, b) = Nat.compare(b.id, a.id));
  };

  /// Render the notification email body for an enquiry.
  public func notificationBody(enquiry : Types.ContactEnquiry) : Text {
    "<h2>New Robi Care enquiry</h2>"
    # "<p><strong>Name:</strong> " # escapeHtml(enquiry.name) # "</p>"
    # "<p><strong>Email:</strong> " # escapeHtml(enquiry.email) # "</p>"
    # "<p><strong>Organisation:</strong> " # escapeHtml(enquiry.organisation) # "</p>"
    # "<p><strong>Message:</strong></p><p>" # escapeHtml(enquiry.message) # "</p>"
    # "<p><em>Enquiry #" # enquiry.id.toText() # "</em></p>";
  };

  /// Escape the characters that would otherwise break the HTML email body.
  func escapeHtml(value : Text) : Text {
    value.replace(#char '&', "&amp;").replace(#char '<', "&lt;").replace(#char '>', "&gt;");
  };
};
