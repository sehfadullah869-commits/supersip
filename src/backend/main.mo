import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Stripe "mo:caffeineai-stripe/stripe";
import ProductTypes "types/products";
import OrderTypes "types/orders";
import Common "types/common";
import ProductsLib "lib/products";
import ProductsMixin "mixins/products-api";
import OrdersMixin "mixins/orders-api";

actor {
  // --- Authorization ---
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // --- Products state (seeded on first deploy) ---
  let products = Map.empty<Common.ProductId, ProductTypes.Product>();
  do {
    ignore ProductsLib.seedSampleProducts(products, 1);
  };

  include ProductsMixin(accessControlState, products);

  // --- Orders state ---
  let orders = Map.empty<Common.OrderId, OrderTypes.Order>();

  include OrdersMixin(accessControlState, products, orders);

  // --- Stripe state ---
  var stripeConfiguration : ?Stripe.StripeConfiguration = null;

  public query func isStripeConfigured() : async Bool {
    stripeConfiguration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfiguration := ?config;
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    let config = switch (stripeConfiguration) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.getSessionStatus(config, sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    let config = switch (stripeConfiguration) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    await Stripe.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };
};
