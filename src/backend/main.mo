import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import ContactTypes "types/contact";
import ContactMixin "mixins/contact";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;

  let enquiries : Map.Map<Nat, ContactTypes.ContactEnquiry>;
  let contactState : { var nextEnquiryId : Nat };

  include MixinAuthorization(accessControlState, null);
  include ContactMixin(accessControlState, enquiries, contactState);
  include ApiDocMixin();
  include Expose({
    entities = [
      enquiries.toEntity("contactEnquiry", "ContactEnquiry", "id")
        .sample({
          id = 0;
          name = "";
          email = "";
          organisation = "";
          message = "";
          submittedAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });
};
