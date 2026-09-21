import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import EmailClient "mo:caffeineai-email/emailClient";
import ContactLib "../lib/contact";
import Types "../types/contact";

mixin (
  accessControlState : AccessControl.AccessControlState,
  enquiries : Map.Map<Nat, Types.ContactEnquiry>,
  state : { var nextEnquiryId : Nat },
) {
  /// Submit a contact enquiry. The enquiry is stored first, so it is never
  /// lost even when the notification email fails; the email failure is
  /// reported back to the caller as an error.
  public shared func submitContactEnquiry(
    name : Text,
    email : Text,
    organisation : Text,
    message : Text,
  ) : async Types.SubmitResult {
    let normalized = ContactLib.normalize(name, email, organisation, message);
    switch (ContactLib.validate(normalized)) {
      case (?error) { return #err(error) };
      case null {};
    };

    let id = ContactLib.store(enquiries, state, normalized);
    let stored = enquiries.get(id) ?? normalized;

    let result = await EmailClient.sendServiceEmail(
      ContactLib.notificationFrom,
      [ContactLib.notificationRecipient],
      "New Robi Care enquiry from " # stored.name,
      ContactLib.notificationBody(stored),
    );

    switch (result) {
      case (#ok) { #ok(id) };
      case (#err(error)) {
        #err("Your enquiry was saved, but the notification email could not be sent: " # error);
      };
    };
  };

  /// List every stored enquiry, newest first. Restricted to admins.
  public query ({ caller }) func listContactEnquiries() : async [Types.ContactEnquiry] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list contact enquiries");
    };
    ContactLib.list(enquiries);
  };
};
