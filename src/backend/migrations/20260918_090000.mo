import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type UserRole = {
    #admin;
    #user;
    #guest;
  };

  type AccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  };

  type ContactEnquiry = {
    id : Nat;
    name : Text;
    email : Text;
    organisation : Text;
    message : Text;
    submittedAt : Nat;
  };

  type NewActor = {
    accessControlState : AccessControlState;
    enquiries : Map.Map<Nat, ContactEnquiry>;
    contactState : { var nextEnquiryId : Nat };
  };

  public func migration(_old : {}) : NewActor {
    {
      accessControlState = {
        var adminAssigned = false;
        userRoles = Map.empty();
      };
      enquiries = Map.empty();
      contactState = { var nextEnquiryId = 0 };
    };
  };
};
