module {
  /// A contact enquiry submitted through the Robi Care contact form.
  /// `id` is the primary key; `submittedAt` is nanoseconds since the epoch.
  public type ContactEnquiry = {
    id : Nat;
    name : Text;
    email : Text;
    organisation : Text;
    message : Text;
    submittedAt : Nat;
  };

  /// Caller-visible outcome of a contact form submission.
  public type SubmitResult = {
    #ok : Nat;
    #err : Text;
  };
};
